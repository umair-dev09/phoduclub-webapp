"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import GroupName from '@/components/DashboardComponents/CommunityComponents/groupName';
import ChatHead from '@/components/DashboardComponents/CommunityComponents/chatHead';
import Bottomtext from '@/components/DashboardComponents/CommunityComponents/BottomText';
import LoadingData from '@/components/Loading';
import { useRouter, useSearchParams } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '@/firebase';
import { doc, getDoc, getDocs, collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import DetailsHead from '@/components/DashboardComponents/CommunityComponents/detailsHead';
import DetailsContent from '@/components/DashboardComponents/CommunityComponents/detailsContent';
import OtherChat from '@/components/DashboardComponents/CommunityComponents/otherchat';
import BottomText from '@/components/DashboardComponents/CommunityComponents/BottomText';
import OwnChat from '@/components/DashboardComponents/CommunityComponents/ownChat';
import { PopoverContent, PopoverTrigger, Popover } from '@nextui-org/popover';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
type Channel = {
  channelId: string;
  channelName: string;
  channelEmoji: string;
};

type ChannelHeading = {
  headingId: string;
  headingName: string;
  channels: Channel[];
};

type GroupData = {
  communityName: string | null;
  membersId: string[] | null;
};

type Chat = {
  message: string;
  messageType: string;
  fileUrl: string;
  senderId: string;
  timestamp: any; // Firebase Timestamp
  chatId: string;
  fileName: string;
  fileSize: number;
  isReplying: boolean;
  replyingToId: string;
  replyingToChatId: string;
  replyingToMsg: string;
  replyingToMsgType: string;
  replyingToFileUrl: string;
  replyingToFileName: string;
};

export default function CommunityName() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const communityId = searchParams.get('communityId');
  // const { communityName } = params;
  const [groupData, setGroupData] = useState<GroupData | null>(null);
  const [channelHeadings, setChannelHeadings] = useState<ChannelHeading[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]); // State to hold chat messages
  const bottomRef = useRef<HTMLDivElement>(null); // Reference for auto-scrolling
  const [showReplyLayout, setShowReplyLayout] = useState(false); // State lifted to parent
  const [replyData, setReplyData] = useState<{ message: string | null; senderId: string | null; messageType: string | null; fileUrl: string | null; fileName: string | null; chatId: string | null; } | null>(null); // Holds reply message data

  // State for selected channel info
  const [selectedChannel, setSelectedChannel] = useState<{
    channelId: string;
    channelName: string;
    channelEmoji: string;
    headingId?: string; // Adding headingId to the selected channel state
  } | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        console.error('No user is logged in');
        router.push("/login");
        setError(true);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        if (user) {
          const groupDoc = doc(db, `communities/${communityId}`);
          const groupSnapshot = await getDoc(groupDoc);

          if (groupSnapshot.exists()) {
            const data = groupSnapshot.data() as GroupData;
            setGroupData(data);
            setLoading(false);
          } else {
            console.error('No user data found!');
            setError(true);
            setLoading(false);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchGroupData();
    }
  }, [user, communityId]);

  useEffect(() => {
    const fetchChannelHeadings = async () => {
      try {
        const headingsRef = collection(db, `communities/${communityId}/channelsHeading`);
        const headingsSnapshot = await getDocs(headingsRef);

        const headingsData: ChannelHeading[] = [];

        for (const headingDoc of headingsSnapshot.docs) {
          const headingId = headingDoc.id;
          const headingData = headingDoc.data();
          const channelsRef = collection(db, `communities/${communityId}/channelsHeading/${headingId}/channels`);
          const channelsSnapshot = await getDocs(channelsRef);

          const channels: Channel[] = channelsSnapshot.docs.map(channelDoc => ({
            channelId: channelDoc.id,
            channelName: channelDoc.data().channelName,
            channelEmoji: channelDoc.data().channelEmoji,
          }));

          headingsData.push({
            headingId,
            headingName: headingData.headingName,
            channels,
          });
        }

        setChannelHeadings(headingsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching channels data: ", error);
        setLoading(false);
      }
    };

    fetchChannelHeadings();
  }, [communityId]);

  // Fetch Chats for the selected channel
  useEffect(() => {
    if (selectedChannel) {
      const fetchChats = async () => {
        try {
          const chatsRef = collection(db, `communities/${communityId}/channelsHeading/${selectedChannel.headingId}/channels/${selectedChannel.channelId}/chats`);
          const q = query(chatsRef, orderBy('timestamp', 'asc')); // Order by timestamp
          const unsubscribe = onSnapshot(q, (snapshot) => {
            const chatData = snapshot.docs.map(doc => doc.data()) as Chat[];
            setChats(chatData);
          });

          return () => unsubscribe();
        } catch (error) {
          setError(true);
        }
      };

      fetchChats();
    }
  }, [communityId, selectedChannel]);

  // Scroll to the latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <LoadingData />;
  }

  if (loading ) {
    return <LoadingData />;
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp) return ""; // Return empty string if timestamp is null
    const date = new Date(timestamp.toDate());
    return date.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const shouldShowDateHeader = (current: Chat, previous: Chat | null) => {
    if (!previous) return true; // Show date for the first message
    if (!current.timestamp || !previous.timestamp) return false; // Avoid error if timestamp is missing

    const currentDate = current.timestamp.toDate().setHours(0, 0, 0, 0);
    const previousDate = previous.timestamp.toDate().setHours(0, 0, 0, 0);
    return currentDate !== previousDate; // Show date if different
  };

  const handleReply = (message: string | null, senderId: string | null, messageType: string | null, fileUrl: string | null, fileName: string | null, chatId: string | null) => {
    setReplyData({ message, senderId, messageType, fileUrl, fileName, chatId }); // Set the data to be replied to
    setShowReplyLayout(true); // Show the reply layout
  };

  return (
    <div className="flex h-full flex-row">
      {/* Middle Section */}
      <div className="flex flex-col w-[230px] bg-white border-r border-b border-lightGrey">
        <GroupName communityId={communityId} />
        <div className="flex flex-col justify-start items-center mx-4 mt-[15px] gap-6">
          <div className="ChannelHeadingDiv w-full h-auto">
            {channelHeadings.map((heading) => (
              <div key={heading.headingId} className="ChannelHeadingDiv w-full h-auto mb-[13px]">
                <div className="mb-[12px] px-2">
                  <h3 className="ChannelHeading text-base text-[#182230]">{heading.headingName}</h3>
                </div>

                <div className="flex flex-col gap-2">
                  {heading.channels.map((channel) => (
                    <button
                      key={channel.channelId}
                      className="ChannelName flex flex-row items-center justify-between pr-3 group rounded-[7px] transition-colors hover:bg-[#F8F0FF]"
                      onClick={() => {
                        setSelectedChannel({ ...channel, headingId: heading.headingId });
                      }}                    >
                      <div className="flex flex-row items-center gap-2 p-[6px]">
                        <p>{channel.channelEmoji}</p>
                        <p className="text-[13px] font-semibold text-[#4B5563]">{channel.channelName}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='w-full border-t border-[#e8e8e8]'>
          <div className='mx-4 mt-3'>
            <button
              className="ChannelName flex flex-row w-full items-center justify-between pr-3 group rounded-[7px] transition-colors hover:bg-[#F8F0FF]"
            >
              <div className="flex flex-row items-center gap-2 p-[6px]">
                <p>🔖</p>
                <p className="text-[13px] font-semibold text-[#4B5563]">All Bookmarks</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-1 flex-col border-r border-b border-lightGrey h-auto">
        {selectedChannel ? (
          <>

            <div className="flex items-center justify-between h-[72px] bg-white border-b border-lightGrey">
              {/* Pass the selected channel info to ChatHead */}
              <ChatHead channelId={selectedChannel?.channelId ?? null} channelName={selectedChannel?.channelName ?? null} channelEmoji={selectedChannel?.channelEmoji ?? null} />
              <div className="flex flex-row mr-6 gap-4">
                <button>
                  <Image src="/icons/search.svg" alt="search icon" width={18} height={18} />
                </button>
                <button className="transition-colors hover:bg-neutral-100" onClick={() => setIsCollapsed(!isCollapsed)}>
                  <Image src="/icons/collapseDetails.svg" alt="collapse details icon" width={24} height={24} />
                </button>
              </div>
            </div>
            <div className="overflow-y-auto p-4 flex flex-col flex-1 gap-4 overflow-x-hidden">
              {chats.map((chat, index) => (
                <React.Fragment key={index}>
                  {shouldShowDateHeader(chat, chats[index - 1]) && (
                    <div className="chat-date-header text-gray-500 text-center my-2 text-[14px]">
                      {formatDate(chat.timestamp)} {/* Only call formatDate if timestamp is valid */}
                    </div>
                  )}
                  {chat.senderId === user?.uid ? (
                    <OwnChat handleReply={handleReply} setShowReplyLayout={setShowReplyLayout} message={chat.message} messageType={chat.messageType} fileUrl={chat.fileUrl} fileName={chat.fileName} fileSize={chat.fileSize} senderId={chat.senderId} timestamp={chat.timestamp} isReplying={chat.isReplying} replyingToId={chat.replyingToId} replyingToMsg={chat.replyingToMsg} replyingToMsgType={chat.replyingToMsgType} replyingToFileName={chat.replyingToFileName} replyingToFileUrl={chat.replyingToFileUrl} replyingToChatId={chat.replyingToChatId} chatId={chat.chatId} communityId={communityId ?? ''} channelId={selectedChannel.channelId} headingId={selectedChannel.headingId ?? ''} isAdmin={false}/>
                  ) : (
                    <OtherChat  handleReply={handleReply} setShowReplyLayout={setShowReplyLayout} message={chat.message} messageType={chat.messageType} fileUrl={chat.fileUrl} fileName={chat.fileName} fileSize={chat.fileSize} senderId={chat.senderId} timestamp={chat.timestamp} isReplying={chat.isReplying} replyingToId={chat.replyingToId} replyingToMsg={chat.replyingToMsg} replyingToMsgType={chat.replyingToMsgType} replyingToFileName={chat.replyingToFileName} replyingToFileUrl={chat.replyingToFileUrl} replyingToChatId={chat.replyingToChatId} chatId={chat.chatId} communityId={communityId ?? ''} channelId={selectedChannel.channelId} headingId={selectedChannel.headingId ?? ''} isAdmin={false} />
                  )}
                </React.Fragment>
              ))}
              <div ref={bottomRef} />
            </div>
            <div>
              <BottomText showReplyLayout={showReplyLayout} setShowReplyLayout={setShowReplyLayout} replyData={replyData} channelId={selectedChannel?.channelId} communityId={communityId} headingId={selectedChannel.headingId ?? ''} />
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <h3 className="text-lg font-semibold text-gray-600">Select a channel</h3>
          </div>
        )}

      </div>

      {/* Right Sidebar */}
      {selectedChannel ? (
        <div
        className={`bg-white h-full transition-all duration-500 ease-in-out overflow-hidden ${isCollapsed ? "max-w-[16.875rem]" : "max-w-0"
        }`}
    style={{
        width: isCollapsed ? "16.875rem" : "0",
    }}        >
          <div className="flex items-center justify-center min-h-[72px] border-b border-lightGrey">
            <div className="flex flex-row justify-between w-full mx-6">
              <h3 className="text-base">Details</h3>
              <div className="flex flex-row items-center gap-[6px]">
                <Image src="/icons/membersIcon.svg" alt="members icon" width={18} height={18} />
                <p className="text-sm text-[#4B5563]">57</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col overflow-y-auto">
            {/* Details Section */}
            <div className="mt-6 px-6 transition-all">
              <div className="group h-auto">
                <div className="flex flex-row justify-between mb-3">
                  <div className="flex flex-row gap-2">
                    <Image className="hidden group-hover:flex" src='/icons/winnerBatch.svg' alt="premiun" width={20} height={20} />
                    <h3 className="text-[#182230]">Admin</h3>
                  </div>
                  <div className="flex justify-center items-center w-6 h-6 bg-[#F7F8FB] border border-[#D4D9E9] rounded-sm text-xs text-[#4B5563]">1</div>
                </div>
              </div>
            </div>
            <Popover placement="left">
              <PopoverTrigger>
                <div className="h-auto px-6 transition-all group  cursor-pointer">
                  <div className="flex flex-row items-center my-1 gap-2">
                    <div className="relative w-9 h-9">
                      <Image src='/images/DP.png' alt="DP" width={32} height={32} />
                      <div className="absolute right-0 bottom-0 w-3 h-3 bg-neutral-400 rounded-full border-2 border-white group-hover:bg-green-500"></div>
                    </div>
                    <p className="text-[#4B5563] text-[13px] font-medium">Dummy  User</p>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent>
                <div className='w-auto h-auto flex flex-col rounded-[16px] bg-white'>
                  <div className='flex flex-col gap-3 p-[14px] bg-[#9012FF] rounded-t-[16px] rounded-b-md '>
                    <div className='flex flex-row gap-[14px] items-center'>
                      <Image className="rounded-full" src='/images/DP.png' alt="DP" width={60} height={60} />
                      <div className='flex flex-col'>
                        <h4 className='text-[14px] font-semibold text-white'>Dummy User</h4>
                        <span className='text-[12px] text-white'>leslie#9843</span>
                      </div>
                      <button className='mb-4 ml-2'> <Image src='/icons/three-dots.svg' alt="Three Dots" width={22} height={22} /> </button>
                    </div>
                    <button className='rounded-md px-6 py-2 bg-white border-[1.5px] border-[#EAECF0]' onClick={() => router.push('/community/general-chat')}>
                      <h4 className='text-[14px] font-semibold '>Send Message Request</h4>
                    </button>
                  </div>
                  <div className='p-[14px]'>
                    <p className='font-medium text-[14px] '>Preparing Exams</p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>




          </div>
        </div>
      ) : (
        <>
        </>
      )}
     <ToastContainer />
    </div>
  );
}
