'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import CreateChannelDialogue from '@/components/AdminComponents/InternalChat/CreateChannelDialogue';
import OwnChats from '@/components/AdminComponents/Community/Chats/OwnChats';
import OtherChats from '@/components/AdminComponents/Community/Chats/OtherChats';
import { auth, db } from '@/firebase';
import { doc, getDoc, getDocs, collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import LoadingData from '@/components/Loading';
import MessageTypeArea from '@/components/AdminComponents/InternalChat/MessageTypeArea';
import { onAuthStateChanged, User } from 'firebase/auth';
import OwnChat from '@/components/AdminComponents/InternalChat/ownChat';
import OtherChat from '@/components/AdminComponents/InternalChat/otherchat';

type Channel = {
  channelId: string;
  channelName: string;
  channelEmoji: string;
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

function InternalChat() {
  const [text, setText] = useState("");
  const [height, setHeight] = useState("32px");
  const [isDetailsVisible, setIsDetailsVisible] = useState(true);
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [showReplyLayout, setShowReplyLayout] = useState(false); // State lifted to parent
  const [replyData, setReplyData] = useState<{ message: string | null; senderId: string | null; messageType: string | null; fileUrl: string | null; fileName: string | null; chatId: string | null; } | null>(null); // Holds reply message data
  const internalchatId = 'opDrECJzGnlBFDkcDmRg';
  const [channels, setChannels] = useState<Channel[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]); // State to hold chat messages
  const bottomRef = useRef<HTMLDivElement>(null); // Reference for auto-scrolling
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<{
    channelId: string;
    channelName: string;
    channelEmoji: string;
  } | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        console.error('No user is logged in');
        router.push("/admin/login");
        setError(true);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setText(e.target.value);

    e.target.style.height = "32px";
    const newHeight = e.target.scrollHeight <= 120 ? e.target.scrollHeight : 120;
    e.target.style.height = `${newHeight}px`;

    setHeight(newHeight < 120 ? "32px" : "120px");
  };
  const [openDialogue, setOpenDialogue] = useState(false);
  const [addMemberDialogue, setAddMemberDialogue] = useState(false);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const channelsRef = collection(db, `internalchat/${internalchatId}/channels`);
        const channelsSnapshot = await getDocs(channelsRef);

        const channels: Channel[] = channelsSnapshot.docs.map(channelDoc => ({
          channelId: channelDoc.id,
          channelName: channelDoc.data().channelName,
          channelEmoji: channelDoc.data().channelEmoji,
        }));
        setChannels(channels);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching channels data: ", error);
        setLoading(false);
      }
    };

    fetchChannels();
  }, [internalchatId]);

  // Fetch Chats for the selected channel
  useEffect(() => {
    if (selectedChannel) {
      const fetchChats = async () => {
        try {
          const chatsRef = collection(db, `internalchat/${internalchatId}/channels/${selectedChannel.channelId}/chats`);
          const q = query(chatsRef, orderBy('timestamp', 'asc'));
          const unsubscribe = onSnapshot(q, (snapshot) => {
            const chatData = snapshot.docs.map(doc => doc.data()) as Chat[];
            setChats(chatData);
          });

          return () => unsubscribe();
        } catch (error) {
          setError(true);
          console.error("Error fetching chats data: ", error);
        }
      };

      fetchChats();
    }
  }, [internalchatId, selectedChannel]);

  // Scroll to the latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const shouldShowDateHeader = (current: Chat, previous: Chat | null) => {
    if (!previous) return true; // Show date for the first message
    if (!current.timestamp || !previous.timestamp) return false; // Avoid error if timestamp is missing

    const currentDate = current.timestamp.toDate().setHours(0, 0, 0, 0);
    const previousDate = previous.timestamp.toDate().setHours(0, 0, 0, 0);
    return currentDate !== previousDate; // Show date if different
  };
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

  const handleReply = (message: string | null, senderId: string | null, messageType: string | null, fileUrl: string | null, fileName: string | null, chatId: string | null) => {
    setReplyData({ message, senderId, messageType, fileUrl, fileName, chatId }); // Set the data to be replied to
    setShowReplyLayout(true); // Show the reply layout
  };

  if (!isMounted) {
    return <LoadingData />;
  }

  if (loading || error) {
    return <LoadingData />
  }

  return (
    <div className="flex w-full h-full flex-row">
      {/* Middle Section */}
      <div className="flex flex-col w-[230px] bg-white border-r border-b border-lightGrey">
        {/* <GroupName communityId={communityId} /> */}
        <div className='border-b h-[72px]'>

        </div>
        <div className="flex flex-col justify-start items-center mx-4 mt-[15px] gap-6">
          <div className="ChannelHeadingDiv w-full h-auto">
            <div className="flex flex-col gap-2">
              {channels.map((channel, index) => (
                <button
                  key={channel.channelId}
                  className="ChannelName flex flex-row items-center justify-between pr-3 group rounded-[7px] transition-colors hover:bg-[#F8F0FF]"
                  onClick={() => {
                    setSelectedChannel({ ...channel });
                  }}                    >
                  <div className="flex flex-row items-center gap-2 p-[6px]">
                    <p className='text-medium'>{channel.channelEmoji}</p>
                    <p className="text-[14px] font-semibold text-[#4B5563]">{channel.channelName}</p>
                  </div>
                </button>
              ))}
              <button className='flex flex-row items-center justify-center w-full px-2 py-[0.375rem] gap-2 border border-lightGrey rounded-full'
                onClick={() => setOpenDialogue(true)}
              >
                <Image src='/icons/plus-dark.svg' alt='create channel' width={18} height={18} />
                <p className='text-[0.813rem] text-[#182230] font-semibold leading-6'>Create Channel</p>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Chat Area */}
      <div className="flex flex-1 flex-col border-r border-b border-lightGrey h-auto">
        {selectedChannel ? (
          <>

            <div className="flex items-center justify-between h-[72px] bg-white border-b border-lightGrey">
              {/* Pass the selected channel info to ChatHead */}
              <div className="flex flex-row items-center gap-2 p-[6px] ml-3">
                <p className='text-medium'>{selectedChannel.channelEmoji}</p>
                <p className="text-[15px] font-semibold text-[#4B5563]">{selectedChannel.channelName}</p>
              </div>
              <div className="flex flex-row mr-6 gap-4">
                <button>
                  <Image src="/icons/search.svg" alt="search icon" width={18} height={18} />
                </button>
                <button
                  className="transition-colors hover:bg-neutral-100"
                  onClick={() => setIsDetailsVisible(!isDetailsVisible)}
                >
                  {isDetailsVisible ? (
                    <Image src="/icons/collapseDetails.svg" alt="collapse details icon" width={24} height={24} />
                  ) : (
                    <Image src="/icons/collaspeDetails-2.svg" alt="collapse details icon" width={24} height={24} />
                  )}
                </button>

              </div>
            </div>
            <div className="overflow-y-auto p-4 flex flex-col flex-1 gap-4 overflow-x-hidden">
              {chats.map((chat, index) => (
                <React.Fragment key={index}>
                  {shouldShowDateHeader(chat, chats[index - 1]) && (
                    <div className="chat-date-header text-gray-500 text-center my-2 text-[14px]">
                      {formatDate(chat.timestamp)}
                    </div>
                  )}
                  {chat.senderId === user?.uid ? (
                    <OwnChat handleReply={handleReply} setShowReplyLayout={setShowReplyLayout} message={chat.message} messageType={chat.messageType} fileUrl={chat.fileUrl} fileName={chat.fileName} fileSize={chat.fileSize} senderId={chat.senderId} timestamp={chat.timestamp} isReplying={chat.isReplying} replyingToId={chat.replyingToId} replyingToMsg={chat.replyingToMsg} replyingToMsgType={chat.replyingToMsgType} replyingToFileName={chat.replyingToFileName} replyingToFileUrl={chat.replyingToFileUrl} replyingToChatId={chat.replyingToChatId} chatId={chat.chatId} internalChatId={internalchatId ?? ''} channelId={selectedChannel.channelId} />
                  ) : (
                    <OtherChat message={chat.message} senderId={chat.senderId} timestamp={chat.timestamp} />
                  )}
                </React.Fragment>
              ))}
              <div ref={bottomRef} />
            </div>
            <div>
              <MessageTypeArea showReplyLayout={showReplyLayout} setShowReplyLayout={setShowReplyLayout} replyData={replyData} channelId={selectedChannel?.channelId} internalChatId={internalchatId} />
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
          className={`bg-white h-full transition-all duration-500 ease-in-out overflow-hidden ${isDetailsVisible ? "max-w-[16.875rem]" : "max-w-0"
            }`}
          style={{
            width: isDetailsVisible ? "16.875rem" : "0",
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

      {openDialogue && <CreateChannelDialogue open={true} onClose={() => setOpenDialogue(false)} internalChatId={internalchatId} />}

    </div>

  );
}

export default InternalChat;