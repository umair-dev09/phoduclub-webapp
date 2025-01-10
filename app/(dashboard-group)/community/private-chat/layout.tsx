"use client";

import React, { ReactNode, useEffect } from "react";
import Image from "next/image";
import ChatMembers from "@/components/DashboardComponents/CommunityComponents/chatMembers";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth, db } from "@/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import LoadingData from "@/components/Loading";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface GeneralChatLayoutProps {
    children: ReactNode;
}
interface ChatUser {
    uniqueId: string;
    name: string;
    profilePic: string;
    isOnline: boolean;
  }

  function generateChatId(userId1:string, userId2:string) {
    // Sort user IDs alphabetically
    const sortedIds = [userId1, userId2].sort();
    // Join them with an underscore to create the chat ID
    return sortedIds.join("_");
  }
  

function PrivateChatLayout({ children }: GeneralChatLayoutProps) {
       const searchParams = useSearchParams(); // Get query params, e.g., "?qId=B8yw93YJcBaGL3x0KRvN"
    const [chatUsers, setChatUsers] = useState<ChatUser[]>([]);
    const [loading, setLoading] = useState(true);
    // const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    // const [isMutePopoverOpen, setIsMutePopoverOpen] = useState(false);
    // const [isMuted, setIsMuted] = useState(false); // Tracks mute state
    const currentUserId = auth.currentUser?.uid;
    const router = useRouter();
      const [selectedPrivateId, setSelectedPrivateId] = useState<string | null>(null); // State to track selected item
      const pId = searchParams?.get('pId');
    useEffect(() => {
        if(pId){
          setSelectedPrivateId(pId);
        }
      },[pId]);
    // // Function to close both popovers
    // const closePopover = () => setIsPopoverOpen(false);
    // const closeMutePopover = () => setIsMutePopoverOpen(false);
    // const closeBothPopovers = () => {
    //     closeMutePopover();
    //     closePopover();
    // };

    // // Toggles mute state
    // const toggleMute = () => setIsMuted(prev => !prev);

    useEffect(() => {
        if (!currentUserId) return;
    
        const unsubscribe = onSnapshot(doc(db, 'users', currentUserId), async (docSnapshot) => {
            const chatList = docSnapshot.data()?.chatList || [];
    
            // Fetch details for each user in chat list
            const usersData = await Promise.all(
                chatList.map(async (uniqueId: string) => {
                    const userDoc = await getDoc(doc(db, 'users', uniqueId));
                    const userData = userDoc.data();
    
                    return {
                        uniqueId,
                        name: userData?.name || 'Unknown User',
                        profilePic: userData?.profilePic || '/images/DP.png',
                        isOnline: userData?.isOnline,
                    };
                })
            );
    
            setChatUsers(usersData);
            setLoading(false);
    
            // Listen for changes in each user's document
            const userUnsubscribes = chatList.map((uniqueId: string) =>
                onSnapshot(doc(db, 'users', uniqueId), (userSnapshot) => {
                    const updatedUserData = userSnapshot.data();
                    setChatUsers((prevUsers) =>
                        prevUsers.map((user) =>
                            user.uniqueId === uniqueId
                                ? {
                                      ...user,
                                      name: updatedUserData?.name || 'Unknown User',
                                      profilePic: updatedUserData?.profilePic || '/images/DP.png',
                                      isOnline: updatedUserData?.isOnline,
                                  }
                                : user
                        )
                    );
                })
            );
    
            return () => {
                unsubscribe();
                userUnsubscribes.forEach((unsub: () => void) => unsub());
            };
        });
    
        return () => unsubscribe();
    }, [currentUserId]);


      if(loading){
        return <LoadingData/>
      }

    return (
        <div className="flex flex-row h-full">
    
            <div className="flex flex-col w-[270px] bg-white border-r border-lightGrey">
                <div className='flex flex-row items-center justify-between h-[72px] border-b border-lightGrey'>
                    <h2 className="ml-6 font-semibold text-[#182230]">Private Chats</h2>
                    <div className="flex flex-row items-center mr-6 gap-2">
                        <Image src='/icons/membersIcon.svg' alt="number of members" width={18} height={18} />
                        <p className="text-sm text-[#4B5563]">{chatUsers.length || 0}</p>
                    </div>
                </div>
                <div className="flex flex-col mx-4 mt-4 gap-2">
                 <div className="flex flex-row items-center justify-between w-full h-auto my-1 px-2 py-[6px] rounded-md bg-white">
                    <h3 className="text-base">New Requests</h3>
                 </div>   
                {chatUsers.map((user, index) => (
                    <button key={index} className={`flex flex-row items-center justify-between w-full h-auto my-1 px-2 py-[6px] ${selectedPrivateId === generateChatId(currentUserId ||'', user.uniqueId) ? 'bg-[#F8F0FF]' : 'bg-white'} rounded-[7px]  `} 
                    onClick={() => {router.push(`/community/private-chat/${user.name.toLowerCase().replace(/\s+/g, '-')}/?pId=${generateChatId(currentUserId || '', user.uniqueId)}`);
                     setSelectedPrivateId(generateChatId(currentUserId || '', user.uniqueId))}}>
                        <div className="flex flex-row items-center gap-2">
                            <div className="relative">
                                <Image className=" rounded-full w-10 h-10 " src={user.profilePic || '/images/DP.png'} alt="DP" width={40} height={40} quality={100}/>
                                <div className={`absolute right-0 bottom-0 w-[14px] h-[14px] ${user.isOnline ? 'bg-green-500' : 'bg-neutral-400'} rounded-full border-2 border-white`}/>
                            </div>
                            <p className="text-[#4B5563] text-[14px] font-medium">{user.name}</p>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-white transition-colors group-hover:bg-[#DE3024]"></div>
                    </button>
                    ))}
                </div>
            </div>
            <div className="flex flex-1 flex-col border-lightGrey">
                {children}
            </div>
            <ToastContainer/>
        </div>
    );
}

export default PrivateChatLayout;