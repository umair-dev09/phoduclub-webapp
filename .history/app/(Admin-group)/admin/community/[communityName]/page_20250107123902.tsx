'use client';
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
import OwnChat from '@/components/DashboardComponents/CommunityComponents/ownChat';
import { PopoverContent, PopoverTrigger, Popover } from '@nextui-org/popover';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import MembersDetailsArea from '@/components/DashboardComponents/CommunityComponents/MembersDetailsArea';
import Delete from "@/components/AdminComponents/Community/AllDialogs/DeleteChannel";
import ChannelRequests from "@/components/AdminComponents/Community/AllDialogs/ChannelRequests";
import Channelinfo from "@/components/AdminComponents/Community/AllDialogs/Channelinfo";
import Groupinfo from "@/components/AdminComponents/Community/AllDialogs/Groupinfo";
import DeleteGroup from "@/components/AdminComponents/Community/AllDialogs/DeleteGroup";
import DeleteCategory from "@/components/AdminComponents/Community/AllDialogs/DeleteCategory";
import EditDetails from "@/components/AdminComponents/Community/AllDialogs/EditDetails";
import CreateCategory from "@/components/AdminComponents/Community/AllDialogs/CreateCategory";
import CreateChannel from "@/components/AdminComponents/Community/AllDialogs/Createchannel";
import OwnChats from "@/components/AdminComponents/Community/Chats/OwnChats";
import OtherChats from "@/components/AdminComponents/Community/Chats/OtherChats";
import BottomText from '@/components/AdminComponents/Community/BottomText';
import AddMembersChannel from '@/components/AdminComponents/Community/AllDialogs/AddMembersChannel';

type Channel = {
  channelId: string;
  channelName: string;
  channelEmoji: string;
  channelDescription: string;
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


function Chatinfo() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const communityId = searchParams.get('communityId');
  // const { communityName } = params;
  const isAutoScrolling = useRef(false);
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
    channelDescription: string;
    headingId?: string; // Adding headingId to the selected channel state
    members: { id: string, isAdmin: boolean }[] | null;
    channelRequests: { id: string, requestDate: string }[] | null;
    declinedRequests: string[];
  } | null>(null);

  const [text, setText] = useState("");
  const [height, setHeight] = useState("32px");
  const [isDetailsVisible, setIsDetailsVisible] = useState(true);
  // STATES FOR THE DIALOGS
  const [createChannel, setCreateChannel] = useState(false);
  const [deleteCategoryDialog, setDeleteCategoryDialog] = useState(false);
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [createCategoryDialog, setCreateCategoryDialog] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [channelName, setChannelName] = useState('');
  const [channelDescription, setChannelDescription] = useState('');
  const [channelId, setChannelId] = useState('');
  const [isEditingChannel, setIsEditingChannel] = useState(false);
  const [channelEmoji, setChannelEmoji] = useState("");
  const [addMembersChannelDialog, setAddMembersChannelDialog] = useState(false);
  const [activePopover, setActivePopover] = useState<string | null>(null);
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
    const fetchChannelHeadingsRealtime = () => {
      try {
        const headingsRef = collection(db, `communities/${communityId}/channelsHeading`);

        // Set up a real-time listener for channel headings
        const unsubscribeHeadings = onSnapshot(headingsRef, (headingsSnapshot) => {
          const headingsData: ChannelHeading[] = [];
          const channelListeners: (() => void)[] = []; // Array to store channel listeners for cleanup

          headingsSnapshot.docs.forEach((headingDoc) => {
            const headingId = headingDoc.id;
            const headingData = headingDoc.data();

            const channelsRef = collection(
              db,
              `communities/${communityId}/channelsHeading/${headingId}/channels`
            );

            // Set up a real-time listener for channels under each heading
            const unsubscribeChannels = onSnapshot(channelsRef, (channelsSnapshot) => {
              const channels: Channel[] = channelsSnapshot.docs.map((channelDoc) => ({
                channelId: channelDoc.id,
                channelName: channelDoc.data().channelName,
                channelEmoji: channelDoc.data().channelEmoji,
                channelDescription: channelDoc.data().channelDescription,
                members: channelDoc.data().members,
                channelRequests: channelDoc.data().channelRequests,
                declinedRequests: channelDoc.data().declinedRequests,
              }));

              // Update the headingsData array with the new channels
              const existingHeadingIndex = headingsData.findIndex((h) => h.headingId === headingId);
              if (existingHeadingIndex !== -1) {
                headingsData[existingHeadingIndex] = {
                  ...headingsData[existingHeadingIndex],
                  channels,
                };
              } else {
                headingsData.push({
                  headingId,
                  headingName: headingData.headingName,
                  channels,
                });
              }

              // Update state
              setChannelHeadings([...headingsData]);
            });

            // Store the channel listener for cleanup
            channelListeners.push(unsubscribeChannels);
          });

          // Cleanup all channel listeners when the component unmounts or `communityId` changes
          return () => {
            channelListeners.forEach((unsubscribe) => unsubscribe());
          };
        });

        // Cleanup the heading listener
        return () => {
          unsubscribeHeadings();
        };
      } catch (error) {
        console.error("Error fetching channels data in real-time: ", error);
        setLoading(false);
      }
    };

    const unsubscribe = fetchChannelHeadingsRealtime();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [communityId, db]);



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



  // Reset the flag whenever a new channel is selected
  useEffect(() => {
    if (selectedChannel) {
      initialLoadRef.current = true; // Reset the initial load flag
    }
  }, [selectedChannel]);

  // Update the effect that handles scrolling when new messages are added
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
    }
  }, [chats, user?.uid]);


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
      const chatElement = chatId && chatRefs.current ? chatRefs.current[chatId] : null;
      if (chatElement) {
        chatElement.scrollIntoView({
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
      const element = chatId && chatRefs.current ? chatRefs.current[chatId] : null;
      if (element) {
        element.scrollIntoView({
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
  // Modify the handleScroll function to prevent interference during auto-scroll
  const handleScroll = () => {
    if (containerRef.current && !isAutoScrolling.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight <= 50;
      setShowScrollButton(!isNearBottom);
    }
  };

  // Modify the scrollToBottom function
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


  const handlePopoverOpen = (headingId: string) => {
    setActivePopover(headingId);

  };

  // Update the scrollToReply function with correct types
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






  return (
    <div className="flex h-full flex-row">
      {/* Middle Section */}
      <div className="flex flex-col w-[230px] bg-white border-r border-b border-lightGrey">
        <GroupName communityId={communityId} isAdmin={true} />
        <div className="flex flex-col justify-start items-center h-full mt-[15px] gap-6">
          <div className="ChannelHeadingDiv w-full h-auto px-4 overflow-y-auto">
            {channelHeadings.map((heading) => (
              <div key={heading.headingId} className="ChannelHeadingDiv w-full h-auto mb-[13px]">
                <div className="flex flex-row justify-between items-center mb-[12px] px-2">
                  <h3 className="ChannelHeading text-base text-[#182230]">{heading.headingName}</h3>
                  <Popover placement="bottom-start"
                    isOpen={activePopover === heading.headingId}  // Use heading.headingId instead of heading
                    onOpenChange={(open) => open ? handlePopoverOpen(heading.headingId) : setActivePopover(null)}
                  >
                    <PopoverTrigger>
                      <button className='focus:outline-none'>
                        <Image src="/icons/plus-dark.svg" alt="plus-dark" width={18} height={18} />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto py-1 px-0 bg-white border border-lightGrey rounded-md flex flex-col">
                      <button className='flex flex-row gap-2 items-center h-10 w-[173px] px-4 hover:bg-[#EAECF0]'
                        onClick={() => {
                          setCreateCategoryDialog(true); setCategoryName(''); setCategoryId(''); setIsEditingCategory(false);
                          setActivePopover(null);
                        }}>
                        <Image
                          src="/icons/Create-category.svg"
                          width={18}
                          height={18}
                          alt="Create-category"
                        />
                        <span className='font-normal text-[#0C111D] text-sm'>Create category</span>
                      </button>
                      <button className='flex flex-row gap-2 items-center h-10 w-[173px] px-4 hover:bg-[#EAECF0]'
                        onClick={() => {
                          setIsEditingCategory(true); setCreateCategoryDialog(true); setCategoryName(heading.headingName); setCategoryId(heading.headingId);
                          setActivePopover(null);
                        }}>
                        <Image
                          src="/icons/edit-02.svg"
                          width={18}
                          height={18}
                          alt="pencil-edit"
                        />
                        <span className='font-normal text-[#0C111D] text-sm'>Edit details</span>
                      </button>
                      <button className='flex flex-row gap-2 items-center h-10 w-[173px] px-4 hover:bg-[#FEE4E2]'
                        onClick={() => {
                          setDeleteCategoryDialog(true); setCategoryName(heading.headingName); setCategoryId(heading.headingId);
                          setActivePopover(null);
                        }}>
                        <Image
                          src="/icons/delete.svg"
                          width={18}
                          height={18}
                          alt="delete"
                        />
                        <span className='font-normal text-[#DE3024] text-sm'>Delete category</span>
                      </button>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="flex flex-col gap-2">
                  {heading.channels.map((channel) => (
                    <button
                      key={channel.channelId}
                      className={`ChannelName flex flex-row items-center justify-between pr-3 group rounded-[7px] transition-colors hover:bg-[#F8F0FF] ${selectedChannel?.channelId === channel.channelId ? 'bg-[#F8F0FF]' : 'bg-[#FFFFFF]'} `}
                      onClick={() => {
                        setSelectedChannel({ ...channel, headingId: heading.headingId });
                      }}                    >
                      <div className="flex flex-row items-center gap-2 p-[6px]">
                        <p>{channel.channelEmoji}</p>
                        <p className="text-[13px] font-semibold text-[#4B5563]">{channel.channelName}</p>
                      </div>
                    </button>
                  ))}
                  <button className='flex flex-row items-center justify-center w-full px-2 py-[0.375rem] gap-2 border border-lightGrey rounded-full'
                    onClick={() => { setCreateChannel(true); setCategoryId(heading.headingId); setIsEditingChannel(false); setChannelName(''); setChannelDescription(''); setChannelEmoji(''); }}>
                    <Image src='/icons/plus-dark.svg' alt='create channel' width={18} height={18} />
                    <p className='text-[0.813rem] text-[#182230] font-semibold leading-6'>Create Channel</p>
                  </button>
                </div>

              </div>
            ))}
            {channelHeadings.length < 1 && (
              <button className='flex flex-row items-center justify-center w-full px-2 py-[0.375rem] gap-2 border border-lightGrey rounded-full'
                onClick={() => { setCreateCategoryDialog(true); setCategoryName(''); setCategoryId(''); setIsEditingCategory(false); }}>
                <Image src='/icons/plus-dark.svg' alt='create channel' width={18} height={18} />
                <p className='text-[0.813rem] text-[#182230] font-semibold leading-6'>Create Category</p>
              </button>
            )}

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
              <ChatHead isAdmin={true} channelDescription={selectedChannel.channelDescription || ''} communityId={communityId} categoryId={selectedChannel.headingId || ''} channelId={selectedChannel?.channelId ?? null} channelName={selectedChannel?.channelName ?? null} channelEmoji={selectedChannel?.channelEmoji ?? null} channelRequests={selectedChannel.channelRequests || []} setSelectedChannel={setSelectedChannel} members={selectedChannel.members} />
              <div className="flex flex-row mr-4 gap-4">
                <Popover placement="bottom" isOpen={searchOpen} onClose={() => { setSearchOpen(false); setSearchQuery('') }}>
                  <PopoverTrigger>
                    <button onClick={() => setSearchOpen(true)}>
                      <Image className='w-[18px] h-[18px]' src="/icons/search.svg" alt="search icon" width={18} height={18} />
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
                {/* <button className="transition-colors hover:bg-neutral-100" onClick={() => setIsCollapsed(!isCollapsed)}>
                  <Image src="/icons/collapseDetails.svg" alt="collapse details icon" width={24} height={24} />
                </button> */}
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
                          isCurrentUserAdmin={true}
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
                          isCurrentUserAdmin={true}
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
                  className="flex items-center justify-center absolute bottom-[85px] right-4 bg-white border pt-[2px] text-white rounded-full shadow-md hover:bg-[#f7f7f7] transition-all w-[38px] h-[38px]"
                >
                  <Image
                    src="/icons/Arrow-down-1.svg"
                    alt="Scroll to bottom"
                    width={22}
                    height={22}
                  />
                </button>
              )}
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
      {createChannel && <CreateChannel open={createChannel} openAddMembers={() => setAddMembersChannelDialog(true)} onClose={() => setCreateChannel(false)} headingId={categoryId} channelEmoji={channelEmoji} setChannelEmoji={setChannelEmoji} channelId={channelId} isEditing={isEditingChannel} communityId={communityId || ''} channelName={channelName} setChannelName={setChannelName} channelDescription={channelDescription} setChannelDescription={setChannelDescription} setChannelId={setChannelId} />}
      {createCategoryDialog && <CreateCategory open={createCategoryDialog} onClose={() => setCreateCategoryDialog(false)} communityId={communityId || ''} isEditing={isEditingCategory} categoryName={categoryName} setCategoryName={setCategoryName} categoryId={categoryId} />}
      {deleteCategoryDialog && <DeleteCategory open={deleteCategoryDialog} onClose={() => setDeleteCategoryDialog(false)} communityId={communityId || ''} categoryName={categoryName} categoryId={categoryId} />}
      {addMembersChannelDialog && <AddMembersChannel communityId={communityId || ''} headingId={categoryId} channelId={channelId} open={addMembersChannelDialog} onClose={() => setAddMembersChannelDialog(false)} groupMembers={groupData?.members || []} />}
      <ToastContainer />
    </div>

    // <div className="grid grid-cols-[16.875rem_1fr_auto] w-full h-full">
    //     {/* Sidebar */}
    //     <div className="grid grid-rows-[4.5rem_1fr] w-full bg-white border-r border-lightGrey">
    //         <div className="flex flex-row items-center p-6 justify-between group gap-2 border-b border-lightGrey">
    //             <div className='flex flex-row gap-2 items-center'>
    //                 <div className="rounded-full w-[44px] h-[44px] bg-[#C0EAFF] items-center flex justify-center border-2 border-solid border-[#FFFFFF]">
    //                     <h1 className="text-[#124B68] text-base font-bold">J</h1>
    //                 </div>
    //                 <div className='flex flex-col '>
    //                     <p className='font-semibold text-normal text-sm'>JEE - 2024</p>
    //                     <div className='gap-1 flex flex-row'>
    //                         <Image
    //                             src="/icons/communityicon.svg"
    //                             width={18}
    //                             height={18}
    //                             alt="communiy-icon" />
    //                         <span className='text-sm text-[#4B5563] font-normal'>100</span>
    //                     </div>
    //                 </div>
    //             </div>

    //         </div>

    //         <div className="flex flex-col p-4 gap-2">
    //             <div className='flex flex-row justify-between items-center px-2'>
    //                 <span className='text-base text-[#182230] font-semibold'>General</span>
    //                 <Popover placement="bottom-start">
    //                     <PopoverTrigger>
    //                         <button className='focus:outline-none'>
    //                             <Image src="/icons/plus-dark.svg" alt="plus-dark" width={18} height={18} />
    //                         </button>
    //                     </PopoverTrigger>
    //                     <PopoverContent className="w-auto py-1 px-0 bg-white border border-lightGrey rounded-md flex flex-col">
    //                         <button className='flex flex-row gap-2 items-center h-10 w-[173px] px-4 hover:bg-[#EAECF0]'
    //                             onClick={() => setCreateCategoryDialog(true)}>
    //                             <Image
    //                                 src="/icons/Create-category.svg"
    //                                 width={18}
    //                                 height={18}
    //                                 alt="Create-category"
    //                             />
    //                             <span className='font-normal text-[#0C111D] text-sm'>Create category</span>
    //                         </button>
    //                         <button className='flex flex-row gap-2 items-center h-10 w-[173px] px-4 hover:bg-[#EAECF0]'
    //                             onClick={() => setEditDetailsDialog(true)}>
    //                             <Image
    //                                 src="/icons/edit-02.svg"
    //                                 width={18}
    //                                 height={18}
    //                                 alt="pencil-edit"
    //                             />
    //                             <span className='font-normal text-[#0C111D] text-sm'>Edit details</span>
    //                         </button>
    //                         <button className='flex flex-row gap-2 items-center h-10 w-[173px] px-4 hover:bg-[#EAECF0]'
    //                             onClick={() => setDeleteCategoryDialog(true)}>
    //                             <Image
    //                                 src="/icons/delete.svg"
    //                                 width={18}
    //                                 height={18}
    //                                 alt="delete"
    //                             />
    //                             <span className='font-normal text-[#DE3024] text-sm'>Delete category</span>
    //                         </button>
    //                     </PopoverContent>
    //                 </Popover>
    //             </div>
    //             {["Admin Only", "Marketing", "Sales", "Customer Support"].map((item, idx) => (
    //                 <button
    //                     key={idx}
    //                     className="flex flex-row w-full px-2 py-[0.375rem] gap-2 rounded-[0.438rem] transition-colors duration-200 hover:bg-[#F8F0FF]"
    //                 >
    //                     <div>{["😎", "📢", "📊", "🎧"][idx]}</div>
    //                     <p className="text-[0.813rem] text-[#4B5563] font-semibold leading-6">{item}</p>
    //                 </button>
    //             ))}
    //             <button className='flex flex-row items-center justify-center w-full px-2 py-[0.375rem] gap-2 border border-lightGrey rounded-full'
    //                 onClick={() => setCreateChannel(true)}>
    //                 <Image src='/icons/plus-dark.svg' alt='create channel' width={18} height={18} />
    //                 <p className='text-[0.813rem] text-[#182230] font-semibold leading-6'>Create Channel</p>
    //             </button>
    //         </div>
    //     </div>

    //     {/* Main Chat Area */}
    //     <div className="grid grid-rows-[4.5rem_1fr_auto] w-full">
    //         <div className="flex flex-row items-center justify-between px-6 bg-white border-b border-lightGrey">

    //             <div className="flex flex-row gap-4">
    //                 <button>
    //                     <Image src="/icons/search.svg" alt="search" width={18} height={18} />
    //                 </button>
    //                 <button onClick={() => setIsDetailsVisible(!isDetailsVisible)}>
    //                     <Image src="/icons/collapseDetails.svg" alt="collapse" width={24} height={24} />
    //                 </button>
    //             </div>
    //         </div>
    //         <div className="w-full pt-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.02)]">
    //             {/* <OwnChats /> */}
    //             <OtherChats />
    //         </div>
    //         <div className="flex flex-row items-center min-h-[6.25rem] px-6 py-6 gap-2 bg-white">
    //             <div className="border border-solid bg-[#FCFCFD] border-[#D0D5DD] h-auto w-full rounded-md flex flex-row items-center p-2 justify-between">
    //                 <textarea
    //                     placeholder="Type your message here..."
    //                     className="w-full max-h-[120px] bg-[#FCFCFD] overflow-y-auto resize-none px-3 rounded-md outline-none font-normal text-sm leading-tight pt-[5px]"
    //                     style={{ height: height }}
    //                     value={text}
    //                     onChange={handleInput}
    //                 />
    //                 <Popover placement="bottom">
    //                     <PopoverTrigger>
    //                         <button className="transition-colors hover:bg-neutral-100 hover:rounded-[100px] focus:outline-none">
    //                             <Image src="/icons/files.svg" alt="attachment icon" width={21} height={21} />
    //                         </button>
    //                     </PopoverTrigger>
    //                     <PopoverContent className="w-auto py-1 px-0 bg-white border border-lightGrey rounded-md">
    //                         {["Image", "Video", "Documents"].map((item, idx) => (
    //                             <button
    //                                 key={idx}
    //                                 className="flex flex-row items-center justify-start w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7]"
    //                             >
    //                                 <Image
    //                                     src={`/icons/${item.toLowerCase()}-icon.svg`}
    //                                     alt={`${item} icon`}
    //                                     width={20}
    //                                     height={20}
    //                                 />
    //                                 <span className="font-normal text-[#0C111D] text-sm">{item}</span>
    //                             </button>
    //                         ))}
    //                     </PopoverContent>
    //                 </Popover>
    //             </div>
    //             <button disabled={!text.trim()}>
    //                 <Image
    //                     src={text.trim() ? "/icons/sendCommunity.svg" : "/icons/send.svg"}
    //                     alt="send icon"
    //                     width={24}
    //                     height={24}
    //                 />
    //             </button>
    //         </div>
    //     </div>

    //     {/* Collapsible Details Section */}
    //     <div
    //         className={`h-full transition-all duration-500 ease-in-out overflow-hidden ${isDetailsVisible ? "max-w-[16.875rem]" : "max-w-0"
    //             }`}
    //         style={{
    //             width: isDetailsVisible ? "16.875rem" : "0",
    //         }}
    //     >
    //         <div className="grid grid-rows-[4.5rem_1fr] w-full h-full bg-white border-l border-lightGrey">
    //             <div className="flex flex-row items-center justify-between px-4 border-b border-lightGrey">
    //                 <h4 className="text-base text-[#182230] font-semibold leading-[1.26rem]">Details</h4>
    //                 <div className="flex flex-row items-center gap-1">
    //                     <Image src="/icons/membersIcon.svg" alt="members" width={18} height={18} />
    //                     <p className="flex items-center text-sm text-[#4B5563] font-normal leading-6">6</p>
    //                 </div>
    //             </div>
    //             <div className="flex flex-col p-4 gap-4">
    //                 <div className="flex flex-col px-2 gap-2 overflow-auto">
    //                     <div className="flex flex-row justify-between whitespace-nowrap">
    //                         <h4 className="text-base text-[#182230] font-semibold leading-6">Admin</h4>
    //                         <p className="flex items-center justify-center w-6 h-6 text-xs text-[#4B5563] font-normal bg-[#F7F8FB] border border-lightGrey rounded-sm">
    //                             1
    //                         </p>
    //                     </div>
    //                     <div className="flex flex-col gap-4">
    //                         {["Darlene Robertson"].map((name, idx) => (
    //                             <div
    //                                 key={idx}
    //                                 className="flex flex-row items-center group py-1 gap-2 whitespace-nowrap"
    //                             >
    //                                 {/* Profile Picture Container */}
    //                                 <div className="relative flex-shrink-0 w-9 h-9">
    //                                     <Image
    //                                         className="rounded-full"
    //                                         src="/images/DP.png"
    //                                         alt="dp"
    //                                         width={36}
    //                                         height={36}
    //                                     />
    //                                     {/* Status Indicator */}
    //                                     <div className="absolute right-0 bottom-0 w-3 h-3 bg-[#98A2B3] border-2 border-white rounded-full transition-colors duration-150 group-hover:bg-[#17B26A]"></div>
    //                                 </div>
    //                                 <p className="text-[0.813rem] text-[#4B5563] font-medium leading-6 whitespace-nowrap">{name}</p>
    //                             </div>
    //                         ))}
    //                     </div>
    //                 </div>
    //                 <div className="flex flex-col px-2 gap-2 overflow-auto">
    //                     <div className="flex flex-row justify-between whitespace-nowrap">
    //                         <h4 className="text-base text-[#182230] font-semibold leading-6">Chief Moderator</h4>
    //                         <p className="flex items-center justify-center w-6 h-6 text-xs text-[#4B5563] font-normal bg-[#F7F8FB] border border-lightGrey rounded-sm">
    //                             1
    //                         </p>
    //                     </div>
    //                     <div className="flex flex-col gap-4">
    //                         {["Darlene Robertson"].map((name, idx) => (
    //                             <div
    //                                 key={idx}
    //                                 className="flex flex-row items-center group py-1 gap-2 whitespace-nowrap"
    //                             >
    //                                 {/* Profile Picture Container */}
    //                                 <div className="relative flex-shrink-0 w-9 h-9">
    //                                     <Image
    //                                         className="rounded-full"
    //                                         src="/images/DP.png"
    //                                         alt="dp"
    //                                         width={36}
    //                                         height={36}
    //                                     />
    //                                     {/* Status Indicator */}
    //                                     <div className="absolute right-0 bottom-0 w-3 h-3 bg-[#98A2B3] border-2 border-white rounded-full transition-colors duration-150 group-hover:bg-[#17B26A]"></div>
    //                                 </div>
    //                                 <p className="text-[0.813rem] text-[#4B5563] font-medium leading-6 whitespace-nowrap">{name}</p>
    //                             </div>
    //                         ))}
    //                     </div>
    //                 </div>
    //                 <div className="flex flex-col px-2 gap-2 overflow-auto">
    //                     <div className="flex flex-row justify-between whitespace-nowrap">
    //                         <h4 className="text-base text-[#182230] font-semibold leading-6">Teachers</h4>
    //                         <p className="flex items-center justify-center w-6 h-6 text-xs text-[#4B5563] font-normal bg-[#F7F8FB] border border-lightGrey rounded-sm">
    //                             4
    //                         </p>
    //                     </div>
    //                     <div className="flex flex-col gap-4">
    //                         {["Darlene Robertson", "John Doe", "Jane Cooper", "Devon Lane"].map((name, idx) => (
    //                             <div
    //                                 key={idx}
    //                                 className="flex flex-row items-center group py-1 gap-2 whitespace-nowrap"
    //                             >
    //                                 {/* Profile Picture Container */}
    //                                 <div className="relative flex-shrink-0 w-9 h-9">
    //                                     <Image
    //                                         className="rounded-full"
    //                                         src="/images/DP.png"
    //                                         alt="dp"
    //                                         width={36}
    //                                         height={36}
    //                                     />
    //                                     {/* Status Indicator */}
    //                                     <div className="absolute right-0 bottom-0 w-3 h-3 bg-[#98A2B3] border-2 border-white rounded-full transition-colors duration-150 group-hover:bg-[#17B26A]"></div>
    //                                 </div>
    //                                 <p className="text-[0.813rem] text-[#4B5563] font-medium leading-6 whitespace-nowrap">{name}</p>
    //                             </div>
    //                         ))}
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>

    // </div>
  );
}

export default Chatinfo;