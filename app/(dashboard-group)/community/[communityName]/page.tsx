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
import { doc, getDoc, getDocs, collection, query, orderBy, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';
import DetailsHead from '@/components/DashboardComponents/CommunityComponents/detailsHead';
import DetailsContent from '@/components/DashboardComponents/CommunityComponents/detailsContent';
import OtherChat from '@/components/DashboardComponents/CommunityComponents/otherchat';
import BottomText from '@/components/DashboardComponents/CommunityComponents/BottomText';
import OwnChat from '@/components/DashboardComponents/CommunityComponents/ownChat';
import { PopoverContent, PopoverTrigger, Popover } from '@nextui-org/popover';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Delete from '@/components/DashboardComponents/CommunityComponents/Delete';
import MembersDetailsArea from '@/components/DashboardComponents/CommunityComponents/MembersDetailsArea';

type Channel = {
  channelId: string;
  channelName: string;
  channelEmoji: string;
  members: { id: string, isAdmin: boolean }[] | null;
  channelRequests: { id: string, requestDate: string }[];
  declinedRequests: string[];
};

type ChannelHeading = {
  headingId: string;
  headingName: string;
  channels: Channel[];
};

type GroupData = {
  communityName: string | null;
  members: { id: string, isAdmin: boolean }[] | null;
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
  adminThatDeletedId: string;
  isDeletedByAdmin: boolean;
  isAdmin: boolean;
  mentions: { userId: string; id: string, isAdmin: boolean, }[];
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
  const [searchOpen, setSearchOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [chats, setChats] = useState<Chat[]>([]); // State to hold chat messages
  const [showReplyLayout, setShowReplyLayout] = useState(false); // State lifted to parent
  const [replyData, setReplyData] = useState<{ message: string | null; senderId: string | null; messageType: string | null; fileUrl: string | null; fileName: string | null; chatId: string | null; } | null>(null); // Holds reply message data
  const chatRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [highlightedChatId, setHighlightedChatId] = useState<string | null>(null);
  const [isDelayed, setIsDelayed] = useState(false); // State to handle the delay before showing chats
  const [searchQuery, setSearchQuery] = useState(""); // Stores the search text
  const [searchResults, setSearchResults] = useState<number[]>([]); // Stores the indices of messages containing the search text
  const [currentResultIndex, setCurrentResultIndex] = useState(-1); // Tracks which result is currently active
  const [showScrollButton, setShowScrollButton] = useState(false); // New state to control button visibility
  const containerRef = useRef<HTMLDivElement | null>(null); // Ref for the scrollable container

  // State for selected channel info
  const [selectedChannel, setSelectedChannel] = useState<{
    channelId: string;
    channelName: string;
    channelEmoji: string;
    headingId?: string; // Adding headingId to the selected channel state
    members: { id: string, isAdmin: boolean }[] | null;
    channelRequests: { id: string, requestDate: string }[] | null;
    declinedRequests: string[];
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
    const fetchHeadingsAndChannels = async () => {
      try {
        // Store channel listeners to clean them up later
        const channelListeners: { [key: string]: () => void } = {};

        // Listen to headings in real-time
        const unsubscribeHeadings = onSnapshot(
          collection(db, `communities/${communityId}/channelsHeading`),
          async (headingsSnapshot) => {
            const headingIds = headingsSnapshot.docs.map(doc => doc.id);

            // Clean up listeners for headings that no longer exist
            Object.keys(channelListeners).forEach(headingId => {
              if (!headingIds.includes(headingId)) {
                channelListeners[headingId]();
                delete channelListeners[headingId];
              }
            });

            // Set up or update listeners for each heading
            headingsSnapshot.docs.forEach(headingDoc => {
              const headingId = headingDoc.id;
              const headingData = headingDoc.data();

              // Set up channel listener if it doesn't exist
              if (!channelListeners[headingId]) {
                channelListeners[headingId] = onSnapshot(
                  collection(db, `communities/${communityId}/channelsHeading/${headingId}/channels`),
                  (channelsSnapshot) => {
                    const channels: Channel[] = channelsSnapshot.docs.map(channelDoc => ({
                      channelId: channelDoc.id,
                      channelName: channelDoc.data().channelName,
                      channelEmoji: channelDoc.data().channelEmoji,
                      members: channelDoc.data().members,
                      channelRequests: channelDoc.data().channelRequests,
                      declinedRequests: channelDoc.data().declinedRequests,
                    }));

                    // Update headings data
                    setChannelHeadings(prev => {
                      const newHeadings = prev.filter(h => h.headingId !== headingId);
                      return [...newHeadings, {
                        headingId,
                        headingName: headingData.headingName,
                        channels,
                      }].sort((a, b) => a.headingName.localeCompare(b.headingName));
                    });

                    // Update selected channel if it exists and belongs to this heading
                    if (selectedChannel?.channelId && selectedChannel.headingId === headingId) {
                      const updatedChannel = channels.find(c => c.channelId === selectedChannel.channelId);
                      if (updatedChannel) {
                        setSelectedChannel(currentSelected => {
                          if (currentSelected?.channelId === updatedChannel.channelId) {
                            return {
                              ...updatedChannel,
                              headingId: headingId
                            };
                          }
                          return currentSelected;
                        });
                      }
                    }
                  }
                );
              }
            });
          }
        );

        // Add specific listener for selected channel if it exists
        if (selectedChannel?.channelId && selectedChannel.headingId) {
          const channelRef = doc(db, `communities/${communityId}/channelsHeading/${selectedChannel.headingId}/channels/${selectedChannel.channelId}`);
          const unsubscribeChannel = onSnapshot(channelRef, (channelDoc) => {
            if (channelDoc.exists()) {
              const channelData = channelDoc.data();
              setSelectedChannel(current => ({
                ...current!,
                channelName: channelData.channelName,
                channelEmoji: channelData.channelEmoji,
                members: channelData.members,
                channelRequests: channelData.channelRequests,
              }));
            }
          });

          return () => {
            unsubscribeHeadings();
            Object.values(channelListeners).forEach(unsubscribe => unsubscribe());
            unsubscribeChannel();
          };
        }

        return () => {
          unsubscribeHeadings();
          Object.values(channelListeners).forEach(unsubscribe => unsubscribe());
        };

      } catch (error) {
        console.error("Error setting up listeners: ", error);
        setLoading(false);
      }
    };

    fetchHeadingsAndChannels();
  }, [communityId, selectedChannel?.channelId, selectedChannel?.headingId]);

  const handleChannelRequest = async () => {
    if (!selectedChannel || !user?.uid) return;

    try {
      const channelRef = doc(db, `communities/${communityId}/channelsHeading/${selectedChannel.headingId}/channels/${selectedChannel.channelId}`);

      // Create request object with ID and timestamp
      const requestData = {
        id: user.uid,
        requestDate: new Date(),
      };

      // Get current channel data
      const channelDoc = await getDoc(channelRef);
      const channelData = channelDoc.data();

      // Filter out the user's ID from declinedRequests
      const updatedDeclinedRequests = (channelData?.declinedRequests || []).filter(
        (id: string) => id !== user.uid
      );

      // Update both channelRequests and declinedRequests
      await updateDoc(channelRef, {
        channelRequests: arrayUnion(requestData),
        declinedRequests: updatedDeclinedRequests,
      });

      toast.success("Request sent successfully!");
    } catch (error) {
      console.error("Error sending request:", error);
      toast.error("Failed to send request");
    }
  };

  // Fetch Chats for the selected channel
  useEffect(() => {
    if (selectedChannel) {
      const fetchChats = async () => {
        try {
          const chatsRef = collection(
            db,
            `communities/${communityId}/channelsHeading/${selectedChannel.headingId}/channels/${selectedChannel.channelId}/chats`
          );
          const q = query(chatsRef, orderBy('timestamp', 'asc')); // Order by timestamp

          // Listen only to the currently selected channel
          const unsubscribe = onSnapshot(q, (snapshot) => {
            if (selectedChannel) {
              const chatData = snapshot.docs.map((doc) => doc.data()) as Chat[];
              setChats(chatData);
            }
          });

          return () => unsubscribe();
        } catch (error) {
          console.error("Error fetching chats: ", error);
          setError(true);
        }
      };

      fetchChats();
    }
  }, [communityId, selectedChannel]);


  // Scroll to the last message immediately after chats are updated
  const initialLoadRef = useRef(true); // Tracks if the user just selected a channel

  useEffect(() => {
    const chatContainer = containerRef.current;

    if (!chatContainer) return;

    // Attach the existing `handleScroll` function
    chatContainer.addEventListener("scroll", handleScroll);

    // Clean up the event listener
    return () => {
      chatContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Effect to handle scrolling when new messages are added
  useEffect(() => {
    if (bottomRef.current && chats.length > 0) {
      const lastChat = chats[chats.length - 1]; // Get the last chat message

      // Scroll logic based on `showScrollButton` state
      if (initialLoadRef.current) {
        // Scroll to the latest message on the first load or channel selection
        bottomRef.current.scrollIntoView({ behavior: "auto" });
        initialLoadRef.current = false;
      } else if (!showScrollButton || lastChat.senderId === user?.uid) {
        // Scroll if the user is at the bottom (showScrollButton is false) or the last message is from the current user
        bottomRef.current.scrollIntoView({ behavior: "auto" });
      }
    }
  }, [chats, showScrollButton, user]);

  // Reset the flag whenever a new channel is selected
  useEffect(() => {
    if (selectedChannel) {
      initialLoadRef.current = true; // Reset the initial load flag
    }
  }, [selectedChannel]);

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
        const chatElement = chatRefs.current[chatId];
        if (chatElement) {
          chatElement.scrollIntoView({
            behavior: "auto",
            block: "center",
          });
        }
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

  if (!isMounted) {
    return <LoadingData />;
  }

  if (loading) {
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


  return (
    <div className="flex h-full flex-row">
      {/* Middle Section */}
      <div className="flex flex-col w-[230px] bg-white border-r border-b border-lightGrey">
        <GroupName communityId={communityId} isAdmin={false} />
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
                      className={`ChannelName flex flex-row items-center justify-between pr-3 group rounded-[7px] transition-colors hover:bg-[#F8F0FF] ${selectedChannel?.channelId === channel.channelId ? 'bg-[#F8F0FF]' : 'bg-[#FFFFFF]'}`}
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
        {/* <div className='w-full border-t border-[#e8e8e8]'>
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
        </div> */}
      </div>

      {/* Chat Area */}
      <div className="flex flex-1 flex-col border-r border-b border-lightGrey h-auto">
        {selectedChannel ? (
          <>

            <div className="flex items-center justify-between h-[72px] bg-white border-b border-lightGrey">
              {/* Pass the selected channel info to ChatHead */}
              <ChatHead isAdmin={false} channelId={selectedChannel?.channelId ?? null} channelName={selectedChannel?.channelName ?? null} channelEmoji={selectedChannel?.channelEmoji ?? null} communityId={communityId} categoryId={selectedChannel.headingId || ''} channelDescription={''} channelRequests={selectedChannel.channelRequests || []} />
              <div className="flex flex-row mr-4 gap-4">
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
                      <button onClick={handleSearchDown}><Image src="/icons/Arrow-down-1.svg" alt="search down icon" width={22} height={22} /></button>
                      <div className='w-[1.5px]  h-[15px] bg-[#e0e0e0] mr-1 ml-[2px]' />
                      <button onClick={() => { setSearchOpen(false); setSearchQuery('') }}><Image src="/icons/cancel.svg" alt="close icon" width={18} height={18} /></button>
                    </div>
                  </PopoverContent>
                </Popover>
                <button
                  className="flex w-[30px] h-[30px] transition-colors hover:bg-neutral-100 rounded-full items-center"
                  onClick={() => setIsCollapsed(!isCollapsed)}
                >
                  {isCollapsed ? (
                    <Image className='w-[26px] h-[26px] pl-[-2px]' src="/icons/collapseDetails.svg" alt="collapse details icon" width={26} height={26} />
                  ) : (
                    <Image className='w-[26px] h-[26px] pl-[-2px]' src="/icons/collaspeDetails-2.svg" alt="collapse details icon" width={26} height={26} />
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
                          communityId={communityId ?? ""}
                          channelId={selectedChannel.channelId}
                          headingId={selectedChannel.headingId ?? ""}
                          isAdmin={chat.isAdmin}
                          isCurrentUserAdmin={false}
                          message={chat.message}
                          isDeleted={chat.isDeleted}
                          isDeletedByAdmin={chat.isDeletedByAdmin}
                          adminThatDeletedId={chat.adminThatDeletedId}
                        />
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
                          communityId={communityId ?? ""}
                          channelId={selectedChannel.channelId}
                          headingId={selectedChannel.headingId ?? ""}
                          isAdmin={chat.isAdmin}
                          isCurrentUserAdmin={false}
                          message={chat.message}
                          isDeleted={chat.isDeleted}
                          isDeletedByAdmin={chat.isDeletedByAdmin}
                          adminThatDeletedId={chat.adminThatDeletedId}
                          setLoading={setLoading}
                        />
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
              {selectedChannel.members?.some(member => member.id === user?.uid) ? (
                <BottomText
                  showReplyLayout={showReplyLayout}
                  setShowReplyLayout={setShowReplyLayout}
                  replyData={replyData}
                  channelId={selectedChannel?.channelId}
                  communityId={communityId}
                  headingId={selectedChannel.headingId ?? ''}
                />
              ) : (
                <div className='flex flex-col items-center justify-center w-full h-auto py-4 bg-white'>
                  {(selectedChannel.channelRequests ?? []).some(request => request.id === (user?.uid ?? '')) ? (
                    <p className='text-sm text-center px-4'>
                      Your request to join this channel has been sent successfully. You will be able to view messages and interact with others once the admin approves your request.
                    </p>
                  ) : (
                    <>
                      {(selectedChannel.declinedRequests ?? []).includes(user?.uid ?? '') ? (
                        <p className='text-sm'>Your request was declined by the admin. Please try again.</p>
                      ) : (
                        <p className='text-sm'>You need to be a member of this channel to send messages.</p>
                      )}
                      <button onClick={handleChannelRequest}>
                        <p className='text-purple underline text-sm'>Request to join</p>
                      </button>
                    </>
                  )}
                </div>
              )}
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
      <ToastContainer />
    </div>
  );
}
