"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import GroupName from '@/components/DashboardComponents/CommunityComponents/groupName';
import ChatHead from '@/components/DashboardComponents/CommunityComponents/chatHead';
import LoadingData from '@/components/Loading';
import { useRouter, useSearchParams } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '@/firebase';
import { doc, getDoc, getDocs, collection, query, orderBy, onSnapshot, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import OtherChat from '@/components/DashboardComponents/CommunityComponents/otherchat';
import BottomText from '@/components/DashboardComponents/CommunityComponents/BottomText';
import OwnChat from '@/components/DashboardComponents/CommunityComponents/ownChat';
import { PopoverContent, PopoverTrigger, Popover } from '@nextui-org/popover';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MembersDetailsArea from '@/components/DashboardComponents/CommunityComponents/MembersDetailsArea';

type Channel = {
  channelId: string;
  channelName: string;
  channelEmoji: string;
  channelDescription: string;
  members: { id: string, isAdmin: boolean }[] | null;
  channelRequests: { id: string, requestDate: string }[];
  declinedRequests: string[];
  notificationsMuted: { id: string, mutedUntil: string }[];
};

type ChannelHeading = {
  headingId: string;
  headingName: string;
  channels: Channel[];
};

type GroupData = {
  communityName: string | null;
  members: { id: string, isAdmin: boolean }[] | null;
  groupExitedMembers: string[],
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
  const [isCollapsed, setIsCollapsed] = useState(true);
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
  const isAutoScrolling = useRef(false);
  const [notificationStatus, setNotificationStatus] = useState<{ [key: string]: boolean }>({});
  const currentUserId = auth.currentUser?.uid;
  // State for selected channel info
  const [selectedChannel, setSelectedChannel] = useState<{
    channelId: string;
    channelName: string;
    channelEmoji: string;
    channelDescription: string;
    notificationsMuted: { id: string, mutedUntil: string }[] | null;
    headingId?: string;
    members: {
      id: string;
      isAdmin: boolean;
    }[] | null;
    channelRequests: {
      id: string;
      requestDate: string;
    }[] | null;
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
    if (!user || !communityId || !auth.currentUser) return;

    const currentUser = auth.currentUser;
    const channelListeners: { [headingId: string]: () => void } = {};

    // Listen to headings
    const unsubscribeHeadings = onSnapshot(
      collection(db, `communities/${communityId}/channelsHeading`),
      async (headingsSnapshot) => {
        const headingsData = new Map<string, { headingName: string }>();

        // Store heading data
        headingsSnapshot.docs.forEach((doc) => {
          headingsData.set(doc.id, { headingName: doc.data().headingName });
        });

        // Clean up listeners for removed headings
        Object.keys(channelListeners).forEach((headingId) => {
          if (!headingsData.has(headingId)) {
            channelListeners[headingId]();
            delete channelListeners[headingId];
          }
        });

        const notifications: { [key: string]: boolean } = {};

        // Set up or update channel listeners for each heading
        await Promise.all(
          headingsSnapshot.docs.map(async (headingDoc) => {
            const headingId = headingDoc.id;
            const headingData = headingDoc.data();

            // Fetch channels for each heading
            if (!channelListeners[headingId]) {
              const channelsRef = collection(
                db,
                `communities/${communityId}/channelsHeading/${headingId}/channels`
              );

              channelListeners[headingId] = onSnapshot(channelsRef, async (channelsSnapshot) => {
                const channels: Channel[] = channelsSnapshot.docs.map((channelDoc) => {
                  const channelData = channelDoc.data();

                  // Determine notification status for current user
                  const notificationKey = `${headingId}-${channelDoc.id}`;
                  notifications[notificationKey] = channelData.channelNotification?.includes(
                    currentUser.uid
                  );

                  return {
                    channelId: channelDoc.id,
                    channelName: channelData.channelName,
                    channelDescription: channelData.channelDescription,
                    channelEmoji: channelData.channelEmoji,
                    members: channelData.members || [],
                    channelRequests: channelData.channelRequests || [],
                    declinedRequests: channelData.declinedRequests || [],
                    notificationsMuted: channelData.notificationsMuted || { id: '', mutedUntil: '' },
                  };
                });

                // Update channelHeadings state while preserving other headings
                setChannelHeadings((prevHeadings) => {
                  const updatedHeadings = prevHeadings.filter(
                    (h) => h.headingId !== headingId
                  );
                  return [
                    ...updatedHeadings,
                    {
                      headingId,
                      headingName: headingData.headingName,
                      channels,
                    },
                  ].sort((a, b) => a.headingName.localeCompare(b.headingName));
                });

                // Update notification status after processing channels
                setNotificationStatus((prev) => ({
                  ...prev,
                  ...notifications,
                }));
              });
            }
          })
        );
      }
    );

    // Cleanup function
    return () => {
      unsubscribeHeadings();
      Object.values(channelListeners).forEach((unsubscribe) => unsubscribe());
    };
  }, [user, communityId]);



  // Second useEffect to handle ONLY selected channel updates
  useEffect(() => {
    if (!selectedChannel?.channelId || !selectedChannel.headingId || !communityId) return;

    const channelRef = doc(
      db,
      `communities/${communityId}/channelsHeading/${selectedChannel.headingId}/channels/${selectedChannel.channelId}`
    );

    const unsubscribeSelectedChannel = onSnapshot(channelRef, (channelDoc) => {
      if (channelDoc.exists()) {
        const channelData = channelDoc.data();
        setSelectedChannel(current => {
          // Only update if this is still the selected channel
          if (current?.channelId === selectedChannel.channelId) {
            return {
              ...current,
              channelName: channelData.channelName,
              channelEmoji: channelData.channelEmoji,
              members: channelData.members,
              channelRequests: channelData.channelRequests,
              declinedRequests: channelData.declinedRequests,
              notificationsMuted: channelData.notificationsMuted,
            };
          }
          return current;
        });
      }
    });

    return () => {
      unsubscribeSelectedChannel();
    };
  }, [communityId, selectedChannel?.channelId, selectedChannel?.headingId]);

  // Third useEffect for selected channel's chats (remains the same as before)
  useEffect(() => {
    if (!selectedChannel?.channelId || !selectedChannel.headingId || !communityId) return;

    const chatsRef = collection(
      db,
      `communities/${communityId}/channelsHeading/${selectedChannel.headingId}/channels/${selectedChannel.channelId}/chats`
    );
    const q = query(chatsRef, orderBy('timestamp', 'asc'));

    const unsubscribeChats = onSnapshot(q, (snapshot) => {
      if (selectedChannel?.channelId) {
        const chatData = snapshot.docs.map((doc) => doc.data()) as Chat[];
        setChats(chatData);
      }
    });

    return () => {
      setChats([]);
      unsubscribeChats();
    };
  }, [communityId, selectedChannel?.channelId, selectedChannel?.headingId]);
  // Fourth useEffect to handle group data
  useEffect(() => {
    if (!user || !communityId) return;

    const groupDocRef = doc(db, `communities/${communityId}`);
    const unsubscribe = onSnapshot(groupDocRef, (groupSnapshot) => {
      if (groupSnapshot.exists()) {
        const data = groupSnapshot.data() as GroupData;
        setGroupData(data);
      } else {
        console.error('No group data found!');
        setError(true);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, communityId]);

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
      const lastChat = chats[chats.length - 1];
      const chatContainer = containerRef.current;

      if (!chatContainer) return;

      const { scrollTop, scrollHeight, clientHeight } = chatContainer;
      const isNearBottom = scrollHeight - scrollTop - clientHeight <= 150;

      if (initialLoadRef.current) {
        // Initial load - scroll instantly
        scrollToBottom('auto');
        initialLoadRef.current = false;
      } else if (lastChat.senderId === user?.uid || isNearBottom) {
        // User's own message or already near bottom - scroll smoothly
        scrollToBottom('smooth');
      }
      //   const fetchNotifications = async () => {
      //   if (!currentUserId) return;

      //   try {
      //     // Reference to the channel document in Firestore
      //     const channelRef = doc(
      //       db,
      //       `communities/${communityId}/channelsHeading/${selectedChannel?.headingId}/channels/${selectedChannel?.channelId}`
      //     );

      //     // Get current channel data
      //     const channelSnap = await getDoc(channelRef);

      //     if (channelSnap.exists()) {
      //       const channelData = channelSnap.data();
      //       const channelNotification = channelData.channelNotification || [];

      //       // Remove the currentUserId from the channelNotification array
      //       const updatedChannelNotification = channelNotification.filter(
      //         (userId: string) => userId !== currentUserId
      //       );

      //       // Update the Firestore document with the new channelNotification array
      //       await updateDoc(channelRef, {
      //         channelNotification: updatedChannelNotification,
      //       });

      //       // Update the local notificationStatus state to reflect this change
      //       setNotificationStatus((prevStatus) => {
      //         const updatedStatus = { ...prevStatus };
      //         const notificationKey = `${selectedChannel?.headingId}-${selectedChannel?.channelId}`;
      //         delete updatedStatus[notificationKey]; // Remove the entry for the specific channel
      //         return updatedStatus;
      //       });

      //       console.log('Notification removed successfully');
      //     } else {
      //       console.error('Channel not found');
      //     }
      //   } catch (error) {
      //     console.error('Error removing notification:', error);
      //   }
      // };
      // fetchNotifications();
    }
  }, [chats, user?.uid]);

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

    // For single result, always scroll to it
    if (searchResults.length === 1) {
      setCurrentResultIndex(0);
      const chatId = chats[searchResults[0]]?.chatId;
      if (chatId && chatRefs.current[chatId]) {
        chatRefs.current[chatId]?.scrollIntoView({
          behavior: "auto",
          block: "center"
        });
      }
      return;
    }

    // For multiple results, cycle through them
    setCurrentResultIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : searchResults.length - 1
    );
  };

  const handleSearchDown = () => {
    if (searchResults.length === 0) return;

    // For single result, always scroll to it
    if (searchResults.length === 1) {
      setCurrentResultIndex(0);
      const chatId = chats[searchResults[0]]?.chatId;
      if (chatId && chatRefs.current[chatId]) {
        chatRefs.current[chatId]?.scrollIntoView({
          behavior: "auto",
          block: "center"
        });
      }
      return;
    }

    // For multiple results, cycle through them
    setCurrentResultIndex((prevIndex) =>
      prevIndex < searchResults.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handleScroll = () => {
    if (containerRef.current && !isAutoScrolling.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight <= 50;
      setShowScrollButton(!isNearBottom);
    }
  };

  const scrollToBottom = (behavior: ScrollBehavior = 'auto') => {
    if (bottomRef.current && containerRef.current) {
      isAutoScrolling.current = true;

      const scrollOptions: ScrollIntoViewOptions = {
        behavior,
        block: 'end' as ScrollLogicalPosition,
      };

      bottomRef.current.scrollIntoView(scrollOptions);

      // Reset the auto-scrolling flag after animation completes
      setTimeout(() => {
        isAutoScrolling.current = false;
      }, behavior === 'auto' ? 300 : 0);

      setShowScrollButton(false);
    }
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
      isAutoScrolling.current = true;

      const scrollOptions: ScrollIntoViewOptions = {
        behavior: 'auto',
        block: 'center' as ScrollLogicalPosition
      };

      element.scrollIntoView(scrollOptions);

      // Highlight the message
      setHighlightedChatId(replyingToChatId);

      // Reset auto-scrolling flag and remove highlight
      setTimeout(() => {
        isAutoScrolling.current = false;
        setHighlightedChatId(null);
      }, 700);
    }
  };

  const handleRemoveNotification = async (headingId: string, channelId: string) => {
    if (!currentUserId) return;

    try {
      // Reference to the channel document in Firestore
      const channelRef = doc(
        db,
        `communities/${communityId}/channelsHeading/${headingId}/channels/${channelId}`
      );

      // Get current channel data
      const channelSnap = await getDoc(channelRef);

      if (channelSnap.exists()) {
        const channelData = channelSnap.data();
        const channelNotification = channelData.channelNotification || [];

        // Remove the currentUserId from the channelNotification array
        const updatedChannelNotification = channelNotification.filter(
          (userId: string) => userId !== currentUserId
        );

        // Update the Firestore document with the new channelNotification array
        await updateDoc(channelRef, {
          channelNotification: updatedChannelNotification,
        });

        // Update the local notificationStatus state to reflect this change
        setNotificationStatus((prevStatus) => {
          const updatedStatus = { ...prevStatus };
          const notificationKey = `${headingId}-${channelId}`;
          delete updatedStatus[notificationKey]; // Remove the entry for the specific channel
          return updatedStatus;
        });

        console.log('Notification removed successfully');
      } else {
        console.error('Channel not found');
      }
    } catch (error) {
      console.error('Error removing notification:', error);
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
                  {heading.channels.map((channel) => {
                    // Construct notification key for each channel
                    const notificationKey = `${heading.headingId}-${channel.channelId}`;
                    const hasNotification = notificationStatus[notificationKey];

                    return (
                      <button
                        key={channel.channelId}
                        className={`ChannelName flex flex-row items-center justify-between pr-3 group rounded-[7px] transition-colors hover:bg-[#F8F0FF] ${selectedChannel?.channelId === channel.channelId ? 'bg-[#F8F0FF]' : 'bg-[#FFFFFF]'}`}
                        onClick={() => {
                          setSelectedChannel({ ...channel, headingId: heading.headingId });
                          handleRemoveNotification(heading.headingId, channel.channelId);
                        }}
                      >
                        <div className="flex flex-row items-center justify-between p-[6px] w-full">
                          <div className="flex flex-row items-center gap-2">
                            <p>{channel.channelEmoji}</p>
                            <p className="text-[13px] font-semibold text-[#4B5563]">{channel.channelName}</p>
                          </div>
                          {Array.isArray(channel?.notificationsMuted) &&
                            channel.notificationsMuted.some(mute => mute.id === currentUserId) && (
                              <Image
                                src='/icons/notification-off-02.svg'
                                alt="Muted"
                                width={16}
                                height={16}
                              />
                            )}
                          {/* Conditionally render notification */}
                          {hasNotification &&
                            selectedChannel?.channelId !== channel.channelId &&
                            !channel.notificationsMuted?.some(mute =>
                              mute.id === currentUserId
                            ) && (
                              <div className="w-2 h-2 rounded-full bg-[#DE3024]"></div> // Notification Indicator
                            )}
                        </div>
                      </button>
                    );
                  })}
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
              {/* <ChatHead isAdmin={false} channelId={selectedChannel?.channelId ?? null} channelName={selectedChannel?.channelName ?? null} channelEmoji={selectedChannel?.channelEmoji ?? null} communityId={communityId} categoryId={selectedChannel.headingId || ''} channelDescription={''} channelRequests={selectedChannel.channelRequests || []} setSelectedChannel={setSelectedChannel} members={selectedChannel.members} /> */}
              <ChatHead
                isAdmin={false}
                notificationsMuted={selectedChannel.notificationsMuted}
                channelId={selectedChannel?.channelId ?? null}
                channelName={selectedChannel?.channelName ?? null}
                channelEmoji={selectedChannel?.channelEmoji ?? null}
                communityId={communityId}
                categoryId={selectedChannel.headingId || ''}
                channelDescription={''}
                channelRequests={selectedChannel.channelRequests || []}
                setSelectedChannel={setSelectedChannel}
                members={selectedChannel.members}
                chats={chats} // Add the chats prop here
              />
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
                  onClick={() => scrollToBottom()}
                  className="flex items-center justify-center absolute bottom-[85px]  right-4 bg-white border pt-[2px] text-white rounded-full shadow-md hover:bg-[#f7f7f7] transition-all w-[38px] h-[38px]"
                >
                  <Image
                    src="/icons/Arrow-down-1.svg"
                    alt="Scroll to bottom"
                    width={22}
                    height={22}
                  />
                </button>
              )}
              {(groupData?.groupExitedMembers ?? []).includes(user?.uid ?? '') ? (
                <div className='flex flex-col z-10 items-center justify-center w-full h-auto py-4 bg-white'>
                  <p className='text-sm text-center px-4'>
                    You can’t send message to this cannel because you have left the group.
                  </p>
                </div>
              ) : (
                <>
                  {selectedChannel.members?.some(member => member.id === user?.uid) ? (

                    <BottomText
                      showReplyLayout={showReplyLayout}
                      setShowReplyLayout={setShowReplyLayout}
                      replyData={replyData}
                      channelId={selectedChannel?.channelId}
                      communityId={communityId}
                      headingId={selectedChannel.headingId ?? ''}
                      channelMembers={selectedChannel.members || []}
                    />
                  ) : (
                    <div className='flex flex-col items-center justify-center z-10 w-full h-auto py-4 bg-white'>
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
                </>
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
          <div className='flex flex-col flex-grow overflow-y-auto'><MembersDetailsArea members={selectedChannel.members || []} isCurrentUserAdmin={false} /></div>
        </div>
      ) : (
        <>
        </>
      )}
      <ToastContainer />
    </div>
  );
}
