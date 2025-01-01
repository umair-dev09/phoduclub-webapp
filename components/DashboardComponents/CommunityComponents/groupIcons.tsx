"use client";
import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged, User } from 'firebase/auth'; // Import the User type from Firebase
import { auth } from "@/firebase";
import { useRouter } from 'next/navigation';
import Image from "next/image";


type CommunityData = {
  communityName: string | null;
  communityId: string | null;
  communityImg: string | null;
  members: { id: string, isAdmin: boolean }[] | null;
};

function GroupIcons() {
  const [communities, setCommunities] = useState<CommunityData[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [selectedCommunityId, setSelectedCommunityId] = useState<string | null>(null); // State to track selected item
  const [selectedButton, setSelectedButton] = useState<string | null>(null); // State to track selected button
  const db = getFirestore();
  const router = useRouter();

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
    const fetchUserCommunities = async () => {
      if (user) {
        const userId = user.uid; // Get the current user's ID
        const communityRef = collection(db, "communities");
        const communitySnapshot = await getDocs(communityRef);

        const userCommunities: CommunityData[] = [];

        communitySnapshot.forEach((doc) => {
          const community = doc.data();
          const members = community.members || [];

          // Check if the current user ID exists in the members array
          const isUserInCommunity = members.some((member: { id: string }) => member.id === userId);

          if (isUserInCommunity) {
            userCommunities.push({
              communityName: community.communityName,
              communityId: community.communityId,
              members,
              communityImg: community.communityImg,
            });
          }
        });

        setCommunities(userCommunities);
      }
    };

    fetchUserCommunities();
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
    router.push('/community/general-chat')
  };
  return (
    <div>
      <div className="flex items-center justify-center h-[72px] border-b border-lightGrey">
        <button className={`group flex items-center justify-center relative w-[46px] h-[46px] rounded-full border-[#C74FE6] border-2 ${selectedButton === "message" ? "border-darkPurple" : "hover:border-darkPurple"}`}
          onClick={onMessageButtonClick}>
          <div className={`flex items-center justify-center w-[42px] h-[42px] rounded-full bg-[#C74FE6] border-[#C74FE6] border-2 text-[#624C18] font-bold ${selectedButton === "message" ? "border-white" : "group-hover:border-white"}`}>
            <Image src="/icons/messageIcon.svg" alt="message icon" width={18} height={18} />
          </div>
          {/* <div className="absolute top-6 left-6 px-2 py-1 bg-red-600 rounded-full text-white text-xs font-medium hidden group-hover:flex">
            6
          </div> */}
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

            {/* <div className="absolute top-6 left-6 px-2 py-1 bg-red-600 rounded-full text-white text-xs font-medium hidden group-hover:flex">
              {index + 1}
            </div> */}
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

