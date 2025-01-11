"use client";

import React, { ReactNode, useEffect } from "react";
import Image from "next/image";
import ChatMembers from "@/components/DashboardComponents/CommunityComponents/chatMembers";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { auth, db } from "@/firebase";
import { arrayRemove, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
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
    isAdmin: boolean;
    isBlocked?: boolean;  // Added isBlocked property
    isNotification?: boolean;
}

function generateChatId(userId1: string, userId2: string) {
    const sortedIds = [userId1, userId2].sort();
    return sortedIds.join("_");
}

function PrivateChatLayout({ children }: GeneralChatLayoutProps) {
    const searchParams = useSearchParams();
    const [chatUsers, setChatUsers] = useState<ChatUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [receivedRequestsCount, setReceivedRequestsCount] = useState<number>(0);
    // const [blockedUsers, setBlockedUsers] = useState<string[]>([]);  // New state for blocked users
    const currentUserId = auth.currentUser?.uid;
    const router = useRouter();
    const [selectedPrivateId, setSelectedPrivateId] = useState<string | null>(null);
    const pId = searchParams?.get('pId');

    useEffect(() => {
        if(pId){
            setSelectedPrivateId(pId);
        }
    },[pId]);

    useEffect(() => {
        if (!currentUserId) return;
    
        const unsubscribe = onSnapshot(doc(db, 'admin', currentUserId), (docSnapshot) => {
            const receivedRequests = docSnapshot.data()?.receivedRequests || [];
            setReceivedRequestsCount(receivedRequests.length);
        });
    
        return () => unsubscribe();
    }, [currentUserId]);

    useEffect(() => {
        if (!currentUserId) return;
    
        const unsubscribe = onSnapshot(doc(db, 'admin', currentUserId), async (docSnapshot) => {
            const chatList = docSnapshot.data()?.chatList || [];
            const currentBlockedUsers = docSnapshot.data()?.blockedUsers || [];  // Get current blocked users
            const currentChatNotifications = docSnapshot.data()?.personalChatNotifications || [];  // Get current blocked users

            const usersData = await Promise.all(
                chatList.map(async (chatItem: { id: string; isAdmin: boolean }) => {
                    const collection = chatItem.isAdmin ? 'admin' : 'users';
                    const userDoc = await getDoc(doc(db, collection, chatItem.id));
                    const userData = userDoc.data();
    
                    return {
                        uniqueId: chatItem.id,
                        name: userData?.name || 'Unknown User',
                        profilePic: userData?.profilePic || '/images/DP.png',
                        isOnline: userData?.isOnline,
                        isAdmin: chatItem.isAdmin ? true : false,
                        isBlocked: currentBlockedUsers.includes(chatItem.id),  // Set blocked status
                        isNotification: currentChatNotifications.includes(chatItem.id),
                    };
                })
            );
    
            setChatUsers(usersData);
            setLoading(false);
    
            const userUnsubscribes = chatList.map((chatItem: { id: string; isAdmin: boolean }) =>
                onSnapshot(doc(db, chatItem.isAdmin ? 'admin' : 'users', chatItem.id), (userSnapshot) => {
                    const updatedUserData = userSnapshot.data();
                    setChatUsers((prevUsers) =>
                        prevUsers.map((user) =>
                            user.uniqueId === chatItem.id
                                ? {
                                      ...user,
                                      name: updatedUserData?.name || 'Unknown User',
                                      profilePic: updatedUserData?.profilePic || '/images/DP.png',
                                      isOnline: updatedUserData?.isOnline,
                                      isAdmin: chatItem.isAdmin ? true : false,
                                      isBlocked: currentBlockedUsers.includes(chatItem.id)  // Maintain blocked status
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
                <div className='flex flex-row items-center justify-between min-h-[72px] border-b border-lightGrey'>
                    <h2 className="ml-6 font-semibold text-[#182230]">Private Chats</h2>
                    <div className="flex flex-row items-center mr-6 gap-2">
                        <Image src='/icons/membersIcon.svg' alt="number of members" width={18} height={18} />
                        <p className="text-sm text-[#4B5563]">{chatUsers.length || 0}</p>
                    </div>
                </div>
                <div className="flex flex-col px-3 pb-6 mt-4 gap-2 overflow-y-auto">
                    {receivedRequestsCount >= 1 && (
                        <>
                            <button className="flex flex-row items-center justify-between w-full h-auto px-3 py-3 rounded-md bg-white hover:bg-[#F8F0FF]"
                                onClick={() => router.push('/admin/community/private-chat/new-requests')}>
                                <h3 className="text-base">New Requests</h3>
                                <div className="flex flex-row gap-1 items-center">
                                    <Image src='/icons/user-add.svg' alt="number of members" width={18} height={18} />
                                    <span className="text-[#9012FF] text-sm">{receivedRequestsCount}</span>
                                </div>
                            </button>
                            <hr/> 
                        </>
                    )}
               
                    {chatUsers.map((user, index) => (
                        <button key={index} 
                            className={`flex flex-row items-center justify-between w-full h-auto my-1 px-[10px] py-[6px] hover:bg-[#F8F0FF] ${selectedPrivateId === generateChatId(currentUserId || '', user.uniqueId) ? 'bg-[#F8F0FF]' : 'bg-white'} rounded-[7px]`}
                            onClick={() => {
                                router.push(`/admin/community/private-chat/${user.name.toLowerCase().replace(/\s+/g, '-')}/?pId=${generateChatId(currentUserId || '', user.uniqueId)}&admin=${user.isAdmin}`);
                                setSelectedPrivateId(generateChatId(currentUserId || '', user.uniqueId));
                                if(currentUserId && user.uniqueId){
                                        const fetchChats = async () => {
                                      const userDoc = doc(db, user.isAdmin ? "admin" : "users", currentUserId);
                                          await updateDoc(userDoc, {
                                             personalChatNotifications: arrayRemove(user.uniqueId),
                                          });
                                        };
                                        fetchChats();
                                       }
                            }}>
                            <div className="flex flex-row items-center gap-2">
                                <div className="relative">
                                    <Image className="rounded-full w-10 h-10" src={user.profilePic || '/images/DP.png'} alt="DP" width={40} height={40} quality={100}/>
                                    <div className={`absolute right-0 bottom-0 w-[14px] h-[14px] ${user.isOnline ? 'bg-green-500' : 'bg-neutral-400'} rounded-full border-2 border-white`}/>
                                </div>
                                <p className="text-[#4B5563] text-[14px] font-medium">{user.name}</p>
                            </div>
                            <div className="gap-2 flex flex-row items-center justify-center">
                                {user.isBlocked && (  // Only show blocked icon if user is blocked
                                    <Image src='/icons/message-blocked.svg' alt="Blocked icon" width={16} height={16} />
                                )}
                                {user.isNotification && (  // Only show blocked icon if user is blocked
                                <div className="w-2 h-2 rounded-full bg-[#DE3024]"></div>
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex flex-1 flex-col border-lightGrey">
                {children}
            </div>
        </div>
    );
}

export default PrivateChatLayout;