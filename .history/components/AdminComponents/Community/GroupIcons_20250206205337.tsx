"use client";
import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, query, onSnapshot, where } from "firebase/firestore";
import { onAuthStateChanged, User } from 'firebase/auth'; // Import the User type from Firebase
import { auth } from "@/firebase";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import CreateGroup from "@/components/AdminComponents/Community/AllDialogs/CreateGroup";
import AddMembersGroup from "./AllDialogs/AddMembersGroup";

type CommunityData = {
  communityName: string | null;
  communityId: string | null;
  communityImg: string | null;
  members: { id: string, isAdmin: boolean }[] | null;
  totalNotifications: number;
};

function GroupIcons() {
  const [communities, setCommunities] = useState<CommunityData[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [selectedCommunityId, setSelectedCommunityId] = useState<string | null>(null); // State to track selected item
  const [selectedButton, setSelectedButton] = useState<string | null>(null); // State to track selected button
  const db = getFirestore();
  const router = useRouter();
  const [creategroup, setcreategroup] = useState(false);
  const [openAddMembers, setOpenAddMembers] = useState(false);
  const [communityId, setCommunityId] = useState('');
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
    const communityRef = collection(db, "communities");

    const unsubscribe = onSnapshot(communityRef, (snapshot) => {
      const allCommunities: CommunityData[] = [];
      const notificationCounters: { [key: string]: number } = {};

      const communityUnsubscribes = snapshot.docs.map(doc => {
        const community = doc.data();
        const communityId = community.communityId;
        notificationCounters[communityId] = 0;

        allCommunities.push({
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
                if (notifications.includes(user?.uid)) {
                  communityNotifications++;
                }
              });

              notificationCounters[communityId] = communityNotifications;
              const updatedCommunities = allCommunities.map(comm => ({
                ...comm,
                totalNotifications: notificationCounters[comm.communityId || ''] || 0
              }));
              setCommunities(updatedCommunities);
            });
          });

          return () => channelUnsubscribes.forEach(unsub => unsub());
        });
      });

      setCommunities(allCommunities);

      return () => {
        communityUnsubscribes.forEach(unsubscribe => unsubscribe());
      };
    });

    return () => unsubscribe();
  }, [db, user]);

  const onItemClick = (communityName: string | null, communityId: string | null) => {
    if (communityName && communityId) {

      setSelectedCommunityId(communityId);
      setSelectedButton(null); // Reset the message button when a community is selected
      router.push(`/admin/community/${communityName.toLowerCase().replace(/\s+/g, '-')}/?communityId=${communityId}`);
    }
  };

  const onMessageButtonClick = () => {
    setSelectedButton("message"); // Mark the message button as selected
    setSelectedCommunityId(null); // Deselect any selected community
    router.push('/admin/community/private-chat');
  };
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-center h-[72px] py-3  border-b border-lightGrey">
        <button className={`group flex items-center justify-center relative w-[46px] h-[46px] rounded-full border-[#C74FE6] border-2 ${selectedButton === "message" ? "border-darkPurple" : "hover:border-darkPurple"}`}
          onClick={onMessageButtonClick}
        >
          <div className={`flex items-center justify-center w-[42px] h-[42px] rounded-full bg-[#C74FE6] border-[#C74FE6] border-2 text-[#624C18] font-bold ${selectedButton === "message" ? "border-white" : "group-hover:border-white"}`}>
            <Image src="/icons/messageIcon.svg" alt="message icon" width={18} height={18} />
          </div>
          <div className="absolute top-6 left-6 px-2 py-1 bg-red-600 rounded-full text-white text-xs font-medium hidden group-hover:flex">
            6
          </div>
        </button>
      </div>

      <div className="flex flex-col justify-start items-center py-[15px] overflow-y-auto ">
        {communities.map((community, index) => (
          <button
            key={community.communityId}
            className={`group flex items-center justify-center relative w-[46px] h-[46px] mb-[10px] rounded-full border-2  ${selectedCommunityId === community.communityId ? "border-darkPurple" : "hover:border-darkPurple"}`}
            onClick={() => onItemClick(community.communityName, community.communityId)}
          >
            <Image
              className="w-10 h-10 rounded-full object-cover my-[1px]"
              src={"/icons/default-community.svg"}
              alt="group icon"
              width={42}
              height={42}
              quality={100}
            />
            {community.totalNotifications >= 1 && selectedCommunityId !== community.communityId && (
              <div className="absolute top-6 left-6 px-2 py-1 bg-red-600 rounded-full text-white text-xs font-medium ">
                {community.totalNotifications}
              </div>
            )}
          </button>
        ))}
        <button className='flex items-center justify-center mt-1'
          onClick={() => setcreategroup(true)}>
          <div className="flex items-center justify-center w-[2.75rem] h-[2.75rem] bg-[#EAECF0] rounded-full ">
            <Image src="/icons/plus-dark.svg" alt="plus-dark" width={18} height={18} />
          </div>
        </button>
      </div>

      {setcreategroup && <CreateGroup open={creategroup} onClose={() => setcreategroup(false)} openAddMembers={() => setOpenAddMembers(true)} setCommunityId={setCommunityId} />}
      {openAddMembers && <AddMembersGroup open={openAddMembers} onClose={() => setOpenAddMembers(false)} communityId={communityId} />}
    </div>

  );
}

export default GroupIcons;
function setError(arg0: boolean) {
  throw new Error("Function not implemented.");
}

