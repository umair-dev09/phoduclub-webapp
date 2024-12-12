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
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MembersDetailsArea from '@/components/AdminComponents/InternalChat/MembersDetailsArea';
type Channel = {
  channelId: string;
  channelName: string;
  channelEmoji: string;
  members: { id: string }[] | null;
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
  isDeleted: boolean;
  mentions: { userId: string, id: string }[];
};

function InternalChat() {
  const [text, setText] = useState("");
  const [height, setHeight] = useState("32px");
  const [isDetailsVisible, setIsDetailsVisible] = useState(true);
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showReplyLayout, setShowReplyLayout] = useState(false); // State lifted to parent
  const [replyData, setReplyData] = useState<{ message: string | null; senderId: string | null; messageType: string | null; fileUrl: string | null; fileName: string | null; chatId: string | null; } | null>(null); // Holds reply message data
  const internalchatId = 'opDrECJzGnlBFDkcDmRg';
  const [channels, setChannels] = useState<Channel[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]); // State to hold chat messages
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<{
    channelId: string;
    channelName: string;
    channelEmoji: string;
    members: { id: string }[] | null;
  } | null>(null);
  const chatRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [highlightedChatId, setHighlightedChatId] = useState<string | null>(null);
  const [isDelayed, setIsDelayed] = useState(false); // State to handle the delay before showing chats
  const [searchQuery, setSearchQuery] = useState(""); // Stores the search text
  const [searchResults, setSearchResults] = useState<number[]>([]); // Stores the indices of messages containing the search text
  const [currentResultIndex, setCurrentResultIndex] = useState(-1); // Tracks which result is currently active
  const [showScrollButton, setShowScrollButton] = useState(false); // New state to control button visibility
  const containerRef = useRef<HTMLDivElement | null>(null); // Ref for the scrollable container

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
    if (!internalchatId) return;

    const channelsRef = collection(db, `internalchat/${internalchatId}/channels`);

    // Listen to real-time updates
    const unsubscribe = onSnapshot(
      channelsRef,
      (snapshot) => {
        const channelsData: Channel[] = snapshot.docs.map((channelDoc) => ({
          channelId: channelDoc.id,
          channelName: channelDoc.data().channelName,
          channelEmoji: channelDoc.data().channelEmoji,
          members: channelDoc.data().members,
        }));
        setChannels(channelsData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching real-time channels data: ", error);
        setLoading(false);
      }
    );

    // Cleanup subscription on component unmount or dependency change
    return () => unsubscribe();
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

  // Scroll to the last message immediately after chats are updated
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, [chats]); // Run this effect every time chats are updated

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      setCurrentResultIndex(-1);
      return;
    }

    const results = chats
      .map((chat, index) =>
        chat.message && typeof chat.message === "string" &&
          chat.message.toLowerCase().includes(searchQuery.toLowerCase())
          ? index
          : -1
      )
      .filter((index) => index !== -1);

    setSearchResults(results);
    setCurrentResultIndex(results.length > 0 ? 0 : -1);
  }, [searchQuery, chats]);

  useEffect(() => {
    if (currentResultIndex >= 0) {
      const chatId = chats[searchResults[currentResultIndex]]?.chatId;

      if (chatId && chatRefs.current[chatId]) {
        chatRefs.current[chatId].scrollIntoView({
          behavior: "auto",
          block: "center",
        });
      }
    }
  }, [currentResultIndex, chats, searchResults]);

  const handleSearchUp = () => {
    if (searchResults.length === 0) return;
    setCurrentResultIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : searchResults.length - 1 // Cycle to the last result if at the first
    );
  };

  const handleSearchDown = () => {
    if (searchResults.length === 0) return;
    setCurrentResultIndex((prevIndex) =>
      prevIndex < searchResults.length - 1 ? prevIndex + 1 : 0 // Cycle to the first result if at the last
    );
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      // If the user has scrolled up, show the button
      if (scrollHeight - scrollTop > clientHeight + 50) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    }
  };

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
    setShowScrollButton(false); // Hide the button after scrolling
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const scrollToReply = (replyingToChatId: string) => {
    const element = chatRefs.current[replyingToChatId];
    if (element) {
      element.scrollIntoView({ behavior: 'instant', block: 'center' });

      // Highlight the message
      setHighlightedChatId(replyingToChatId);

      // Remove the highlight after 2 seconds
      setTimeout(() => setHighlightedChatId(null), 700);
    }
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
                <Popover placement="bottom" isOpen={searchOpen} onClose={() => { setSearchOpen(false); setSearchQuery('') }}>
                  <PopoverTrigger>
                    <button onClick={() => setSearchOpen(true)}>
                      <Image src="/icons/search.svg" alt="search icon" width={18} height={18} />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className='flex flex-row p-2 gap-3 items-center justify-center'>
                      <input
                        id="input"
                        placeholder='Search...'
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='w-[220px] h-[36px] rounded-md border-solid border-[1px] border-[#d0d5dd] px-[8px] hover:border-none hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB] focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] focus:border-none'
                      />
                      <div className='text-[13px] text-gray-400 mr-1'>{searchResults.length > 0 ? `${currentResultIndex + 1}/${searchResults.length}` : '0/0'}</div>
                      <button onClick={handleSearchUp}><Image src="/icons/Arrow-up.svg" alt="search up icon" width={22} height={22} /></button>
                      <button onClick={handleSearchDown}><Image src="/icons/arrow-down-1.svg" alt="search down icon" width={22} height={22} /></button>
                      <div className='w-[1.5px]  h-[15px] bg-[#e0e0e0] mr-1 ml-[2px]' />
                      <button onClick={() => { setSearchOpen(false); setSearchQuery('') }}><Image src="/icons/cancel.svg" alt="close icon" width={18} height={18} /></button>
                    </div>
                  </PopoverContent>
                </Popover>
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
            <div
              className="overflow-y-auto p-4 flex flex-col flex-1 gap-4 overflow-x-hidden relative"
              ref={containerRef}
              onScroll={handleScroll}
            >
              {chats.map((chat, index) => {
                const highlightedText =
                  searchQuery && searchQuery.trim() !== "" && chat.message
                    ? chat.message
                      .split(new RegExp(`(${searchQuery})`, "gi"))
                      .map((part, i) =>
                        part && part.toLowerCase() === searchQuery.toLowerCase() ? (
                          <span key={i} className="bg-[#d1a7ff] font-bold">
                            {part}
                          </span>
                        ) : (
                          part
                        )
                      )
                    : chat.message || ""; // Fallback to empty string if `chat.message` is null or undefined
                return (
                  <React.Fragment key={index}>
                    {shouldShowDateHeader(chat, chats[index - 1]) && (
                      <div className="chat-date-header text-gray-500 text-center my-2 text-[14px]">
                        {formatDate(chat.timestamp)} {/* Only call formatDate if timestamp is valid */}
                      </div>
                    )}
                    <div
                      ref={(el) => {
                        if (el) {
                          // Store reference for the current chat message
                          chatRefs.current[chat.chatId] = el;

                          // Assign the bottom reference to the last message for initial scrolling
                          if (index === chats.length - 1) {
                            bottomRef.current = el;
                          }
                        }
                      }}
                    >
                      {chat.senderId === user?.uid ? (
                        <OwnChat
                          handleReply={handleReply}
                          scrollToReply={scrollToReply}
                          isHighlighted={highlightedChatId === chat.chatId}
                          setShowReplyLayout={setShowReplyLayout}
                          currentUserId={user.uid}
                          highlightedText={highlightedText}
                          messageType={chat.messageType}
                          mentions={chat.mentions}
                          fileUrl={chat.fileUrl}
                          fileName={chat.fileName}
                          fileSize={chat.fileSize}
                          senderId={chat.senderId}
                          timestamp={chat.timestamp}
                          isReplying={chat.isReplying}
                          replyingToId={chat.replyingToId}
                          replyingToMsg={chat.replyingToMsg}
                          replyingToMsgType={chat.replyingToMsgType}
                          replyingToFileName={chat.replyingToFileName}
                          replyingToFileUrl={chat.replyingToFileUrl}
                          replyingToChatId={chat.replyingToChatId}
                          chatId={chat.chatId}
                          channelId={selectedChannel.channelId}
                          message={chat.message}
                          isDeleted={chat.isDeleted}
                          internalChatId={internalchatId} />
                      ) : (
                        <OtherChat
                          handleReply={handleReply}
                          scrollToReply={scrollToReply}
                          currentUserId={user?.uid || ''}
                          isHighlighted={highlightedChatId === chat.chatId}
                          setShowReplyLayout={setShowReplyLayout}
                          highlightedText={highlightedText}
                          messageType={chat.messageType}
                          fileUrl={chat.fileUrl}
                          mentions={chat.mentions}
                          fileName={chat.fileName}
                          fileSize={chat.fileSize}
                          senderId={chat.senderId}
                          timestamp={chat.timestamp}
                          isReplying={chat.isReplying}
                          replyingToId={chat.replyingToId}
                          replyingToMsg={chat.replyingToMsg}
                          replyingToMsgType={chat.replyingToMsgType}
                          replyingToFileName={chat.replyingToFileName}
                          replyingToFileUrl={chat.replyingToFileUrl}
                          replyingToChatId={chat.replyingToChatId}
                          chatId={chat.chatId}
                          channelId={selectedChannel.channelId}
                          message={chat.message}
                          isDeleted={chat.isDeleted}
                          internalChatId={internalchatId} />
                      )}
                    </div>
                  </React.Fragment>
                );
              })}

            </div>

            <div className='relative'>
              {showScrollButton && (

                <button
                  onClick={scrollToBottom}
                  className="flex items-center justify-center absolute bottom-[85px] right-3 bg-white border pt-[2px] text-white rounded-full shadow-md hover:bg-[#f7f7f7] transition-all w-[38px] h-[38px]"
                >
                  <Image
                    src="/icons/Arrow-down-1.svg"
                    alt="Scroll to bottom"
                    width={22}
                    height={22}
                  />
                </button>
              )}
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
          className={`flex flex-col bg-white h-full transition-all duration-500 ease-in-out overflow-hidden ${isCollapsed ? "max-w-[16.875rem]" : "max-w-0"
            }`}
          style={{
            width: isCollapsed ? "16.875rem" : "0",
          }}        >
          <div className="flex items-center justify-center min-h-[72px] border-b border-lightGrey">
            <div className="flex flex-row justify-between w-full mx-6">
              <h3 className="text-base">Details</h3>
              <div className="flex flex-row items-center gap-[6px]">
                <Image src="/icons/membersIcon.svg" alt="members icon" width={18} height={18} />
                <p className="text-sm text-[#4B5563]">{selectedChannel.members?.length || 0}</p>
              </div>
            </div>
          </div>
          <div className='flex flex-col flex-grow overflow-y-auto'><MembersDetailsArea members={selectedChannel.members || []} /></div>

        </div>
      ) : (
        <>
        </>
      )}

      {openDialogue && <CreateChannelDialogue open={true} onClose={() => setOpenDialogue(false)} internalChatId={internalchatId} />}
      <ToastContainer />
    </div>

  );
}

export default InternalChat;