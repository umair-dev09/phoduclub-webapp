"use client";
import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, query, where, onSnapshot, doc } from "firebase/firestore";
import { onAuthStateChanged, User } from 'firebase/auth'; // Import the User type from Firebase
import { auth } from "@/firebase";
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Image from "next/image";


type CommunityData = {
  communityName: string | null;
  communityId: string | null;
  communityImg: string | null;
  members: { id: string, isAdmin: boolean }[] | null;
  totalNotifications: number;
};


function GroupIcons() {
   const searchParams = useSearchParams(); // Get query params, e.g., "?qId=B8yw93YJcBaGL3x0KRvN"
      
  const [communities, setCommunities] = useState<CommunityData[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [selectedCommunityId, setSelectedCommunityId] = useState<string | null>(null); // State to track selected item
  const [selectedButton, setSelectedButton] = useState<string | null>(null); // State to track selected button
  const db = getFirestore();
  const router = useRouter();
  const cId = searchParams?.get('communityId');
  const pathname = usePathname();
  const pCheck = pathname === '/community/private-chat';
  const pId = searchParams?.get('pId');
  const currentUserId = auth.currentUser?.uid;
      const [personalChatNotifications, setPersonalChatNotifications] = useState<number>(0);
  
  useEffect(() => {
    if (pCheck || pId) {
      setSelectedCommunityId(null);
      setSelectedButton('message');
    }
  
  }, [pCheck, pId]);

  useEffect(() => {
    if(cId){
      setSelectedCommunityId(cId);
      setSelectedButton(null);
    }
  },[cId]);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        console.error('No user is logged in');
        setError(true);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!currentUserId) return;

    const unsubscribe = onSnapshot(doc(db, 'users', currentUserId), (docSnapshot) => {
        const personalChatNotifications = docSnapshot.data()?.personalChatNotifications || [];
        setPersonalChatNotifications(personalChatNotifications.length);
    });

    return () => unsubscribe();
}, [currentUserId]);

  useEffect(() => {
    if (!user) return;

    const userId = user.uid;
    const communityRef = collection(db, "communities");
    const q = query(communityRef, where("members", "array-contains", { id: userId, isAdmin: false }));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userCommunities: CommunityData[] = [];
      const notificationCounters: { [key: string]: number } = {};

      const communityUnsubscribes = snapshot.docs.map(doc => {
        const community = doc.data();
        const communityId = community.communityId;
        notificationCounters[communityId] = 0;

        userCommunities.push({
          communityName: community.communityName,
          communityId: communityId,
          members: community.members,
          communityImg: community.communityImg,
          totalNotifications: 0,
        });

        const channelsRef = collection(db, "communities", communityId, "channelsHeading");
        return onSnapshot(channelsRef, (headingSnapshot) => {
          const channelUnsubscribes = headingSnapshot.docs.map(headingDoc => {
            const channelsCollectionRef = collection(headingDoc.ref, "channels");
            return onSnapshot(channelsCollectionRef, (channelsSnapshot) => {
              let communityNotifications = 0;
              
              channelsSnapshot.docs.forEach(channelDoc => {
                const channelData = channelDoc.data();
                const notifications = channelData.channelNotification || [];
                if (notifications.includes(userId)) {
                  communityNotifications++;
                }
              });

              notificationCounters[communityId] = communityNotifications;
              const updatedCommunities = userCommunities.map(comm => ({
                ...comm,
                totalNotifications: notificationCounters[comm.communityId || ''] || 0
              }));
              setCommunities(updatedCommunities);
            });
          });

          return () => channelUnsubscribes.forEach(unsub => unsub());
        });
      });

      setCommunities(userCommunities);

      return () => {
        communityUnsubscribes.forEach(unsubscribe => unsubscribe());
      };
    });

    return () => unsubscribe();
  }, [user, db]);

  const onItemClick = (communityName: string | null, communityId: string | null) => {
    if (communityName && communityId) {

      setSelectedCommunityId(communityId);
      setSelectedButton(null);
      router.push(`/community/${communityName.toLowerCase().replace(/\s+/g, '-')}/?communityId=${communityId}`);

    }
  };

  const onMessageButtonClick = () => {
    setSelectedButton("message");
    setSelectedCommunityId(null);
    router.push('/community/private-chat');
  };
  return (
    <div>
      <div className="flex items-center justify-center h-[72px] border-b border-lightGrey">
        <button className={`group flex items-center justify-center relative w-[46px] h-[46px] rounded-full border-[#C74FE6] border-2 ${selectedButton === "message" ? "border-darkPurple" : "hover:border-darkPurple"}`}
          onClick={onMessageButtonClick}>
          <div className={`flex items-center justify-center w-[42px] h-[42px] rounded-full bg-[#C74FE6] border-[#C74FE6] border-2 text-[#624C18] font-bold ${selectedButton === "message" ? "border-white" : "group-hover:border-white"}`}>
            <Image src="/icons/messageIcon.svg" alt="message icon" width={18} height={18} />
          </div>
          {personalChatNotifications >= 1 &&(
          <div className="absolute top-6 left-6 px-2 py-1 bg-red-600 rounded-full text-white text-xs font-medium">
          {personalChatNotifications}
        </div>
          )}
        
        </button>
      </div>

      <div className="flex flex-col justify-start items-center pt-[15px]">
        {communities.map((community, index) => (
            <button
            key={community.communityId}
            className={`group flex items-center justify-center relative w-[46px] h-[46px] mb-[10px] rounded-full border-2  ${selectedCommunityId === community.communityId ? "border-darkPurple" : "hover:border-darkPurple"}`}
            onClick={() => onItemClick(community.communityName, community.communityId)}
            >
            <Image className="w-10 h-10 rounded-full" src={community.communityImg || "/icons/messageIcon.svg"} alt="group icon" width={42} height={42} quality={100} />
            {community.totalNotifications >= 1 && selectedCommunityId !== community.communityId && (
            <div className="absolute top-6 left-6 px-2 py-1 bg-red-600 rounded-full text-white text-xs font-medium ">
              {community.totalNotifications}
            </div>
            )}
            </button>
        ))}
      </div>
    </div>

  );
}

export default GroupIcons;
function setError(arg0: boolean) {
  throw new Error("Function not implemented.");
}

