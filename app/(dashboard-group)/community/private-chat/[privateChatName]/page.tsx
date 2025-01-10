'use client';
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import React, { ReactNode, useEffect, useRef } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { getFirestore, doc, getDoc, onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { useState } from "react";
import RequestSentNotes from "@/components/DashboardComponents/CommunityComponents/RequestSentNotes";
import LoadingData from "@/components/Loading";
import { auth, db } from "@/firebase";
import OwnChatP from "@/components/DashboardComponents/CommunityComponents/PrivateChatComponents/OwnChatP";
import OtherChatP from "@/components/DashboardComponents/CommunityComponents/PrivateChatComponents/OtherChatP";
import BottomTextP from "@/components/DashboardComponents/CommunityComponents/PrivateChatComponents/BottomTextP";
import { ToastContainer } from "react-toastify";

interface UserData {
    name: string;
    profilePic: string;
    isOnline: boolean;
}

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

function privateChatArea() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const currentUserId = auth.currentUser?.uid;
const pChatId = searchParams.get('pId');
const chatUserId = pChatId ? pChatId.split('_').filter(id => id !== currentUserId)[0] : null;
const [chatStatus, setChatStatus] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null); // Ref for the scrollable container
  const [showScrollButton, setShowScrollButton] = useState(false); // New state to control button visibility
  const isAutoScrolling = useRef(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [chats, setChats] = useState<Chat[]>([]); // State to hold chat messages
  const [searchQuery, setSearchQuery] = useState(""); // Stores the search text
  const chatRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
const [showReplyLayout, setShowReplyLayout] = useState(false); // State lifted to parent
  const [replyData, setReplyData] = useState<{ message: string | null; senderId: string | null; messageType: string | null; fileUrl: string | null; fileName: string | null; chatId: string | null; } | null>(null); // Holds reply message data
  const [highlightedChatId, setHighlightedChatId] = useState<string | null>(null);

  useEffect(() => {
    if (pChatId) {
        const chatDoc = doc(db, "privatechats", pChatId);
        const unsubscribeChat = onSnapshot(chatDoc, (chatSnapshot) => {
        if (chatSnapshot.exists()) {
            setChatStatus(chatSnapshot.data().chatStatus);
            setLoading(false);
        }
    });

    return () => unsubscribeChat();
}
}, [pChatId]);

useEffect(() => {
    if(chatUserId){
    const userDoc = doc(db, "users", chatUserId);

    const unsubscribeUser = onSnapshot(userDoc, (userSnapshot) => {
        if (userSnapshot.exists()) {
            setUserData(userSnapshot.data() as UserData);
            setLoading(false);
        }
    });

    return () => unsubscribeUser();
}
}, [chatUserId]);

useEffect(() => {
    if (pChatId) {
      const fetchChats = async () => {
        try {
          const chatsRef = collection(db, `privatechats/${pChatId}/chats`);
          const q = query(chatsRef, orderBy('timestamp', 'asc')); // Order by timestamp
          const unsubscribe = onSnapshot(q, (snapshot) => {
            const chatData = snapshot.docs.map((doc) => doc.data()) as Chat[];
            setChats(chatData);
          });
  
          return unsubscribe;
        } catch (error) {
          console.error("Error fetching chats: ", error);
        }
      };
  
      fetchChats();
    }
  }, [pChatId]);

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
      } else if (lastChat.senderId === currentUserId|| isNearBottom) {
        // User's own message or already near bottom - scroll smoothly
        scrollToBottom('smooth');
      }
    }
  }, [chats, currentUserId]);

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

//***********************Codes for search featrue****************************/
//   useEffect(() => {
//     if (searchQuery.trim() === "") {
//       setSearchResults([]);
//       setCurrentResultIndex(-1);
//       return;
//     }

//     const results = chats
//       .map((chat, index) =>
//         chat.message && typeof chat.message === "string" &&
//           chat.message.toLowerCase().includes(searchQuery.toLowerCase())
//           ? index
//           : -1
//       )
//       .filter((index) => index !== -1);

//     setSearchResults(results);
//     setCurrentResultIndex(results.length > 0 ? 0 : -1);
//   }, [searchQuery, chats]);

//   useEffect(() => {
//     if (currentResultIndex >= 0) {
//       const chatId = chats[searchResults[currentResultIndex]]?.chatId;

//       if (chatId && chatRefs.current[chatId]) {
//         const chatElement = chatRefs.current[chatId];
//         if (chatElement) {
//           chatElement.scrollIntoView({
//             behavior: "auto",
//             block: "center",
//           });
//         }
//       }
//     }
//   }, [currentResultIndex, chats, searchResults]);

//   const handleSearchUp = () => {
//     if (searchResults.length === 0) return;

//     // For single result, always scroll to it
//     if (searchResults.length === 1) {
//       setCurrentResultIndex(0);
//       const chatId = chats[searchResults[0]]?.chatId;
//       if (chatId && chatRefs.current[chatId]) {
//         chatRefs.current[chatId]?.scrollIntoView({
//           behavior: "auto",
//           block: "center"
//         });
//       }
//       return;
//     }

//     // For multiple results, cycle through them
//     setCurrentResultIndex((prevIndex) =>
//       prevIndex > 0 ? prevIndex - 1 : searchResults.length - 1
//     );
//   };

//   const handleSearchDown = () => {
//     if (searchResults.length === 0) return;

//     // For single result, always scroll to it
//     if (searchResults.length === 1) {
//       setCurrentResultIndex(0);
//       const chatId = chats[searchResults[0]]?.chatId;
//       if (chatId && chatRefs.current[chatId]) {
//         chatRefs.current[chatId]?.scrollIntoView({
//           behavior: "auto",
//           block: "center"
//         });
//       }
//       return;
//     }

//     // For multiple results, cycle through them
//     setCurrentResultIndex((prevIndex) =>
//       prevIndex < searchResults.length - 1 ? prevIndex + 1 : 0
//     );
//   };


  useEffect(() => {
    setIsMounted(true);
  }, []);

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





  if (!isMounted) {
    return <LoadingData />;
  }

    if(loading){
        return <LoadingData />
    }


    return(
        <div className="flex flex-col h-full ">
            {/* Chat Head */}
            <div className="flex flex-row items-center justify-between px-6 h-[72px] bg-white border-b border-lightGrey">
            <div className="flex flex-row items-center gap-2">
                <div className="relative ">
                <Image className="rounded-full w-10 h-10" src={userData?.profilePic || '/images/DP.png'} alt="DP" width={36} height={36} />
                <div className={`absolute right-0 bottom-0 w-[14px] h-[14px] ${userData?.isOnline ? 'bg-green-500' : 'bg-neutral-400'} rounded-full border-2 border-white `}></div>
                </div>
                <p className="text-[#4B5563] text-[16px] font-semibold">{userData?.name}</p>
            </div>
            <Popover placement="bottom-end">
                <PopoverTrigger>
                <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                    <button className="border-none outline-none p-0 bg-transparent ">
                    <Image src='/icons/more-vertical.svg' alt="more options" width={24} height={24} />
                    </button>
                </button>
                </PopoverTrigger>
                <PopoverContent className='flex flex-col bg-white w-auto h-auto py-1 px-0 border border-lightGrey rounded-md shadow-md'>
                <button
                    className='flex flex-row items-center gap-2 w-[183px] px-4 py-[10px] transition-colors  hover:bg-neutral-100'
                    // onClick={closePopover}
                >
                    <Image src='/icons/user-sharing.svg' alt='mark as read' width={18} height={18} />
                    <p className='text-sm'>View profile</p>
                </button>
                <button
                    className='flex flex-row items-center gap-2 w-[183px] px-4 py-[10px] transition-colors  hover:bg-neutral-100'
                    // onClick={closePopover}
                >
                    <Image src='/icons/folder-02.svg' alt='media' width={18} height={18} />
                    <p className='text-sm'>Media</p>
                </button>
                <button
                    className='flex flex-row items-center gap-2 w-[183px] px-4 py-[10px] transition-colors  hover:bg-neutral-100'
                    // onClick={closePopover}
                >
                    <Image src='/icons/user-block-red-01.svg' alt='exit group' width={18} height={18} />
                    <p className='text-sm text-red-600'>Block user</p>
                </button>
                </PopoverContent>
            </Popover>
            </div>
            {chatStatus === 'requested' && <RequestSentNotes />}
            {chatStatus === 'accepted' && (
                <div className="flex flex-col flex-1">
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
                      {chat.senderId === currentUserId ? (
                        <OwnChatP
                          handleReply={handleReply}
                          scrollToReply={scrollToReply}
                          isHighlighted={highlightedChatId === chat.chatId}
                          setShowReplyLayout={setShowReplyLayout}
                          currentUserId={currentUserId}
                          highlightedText={highlightedText}
                          messageType={chat.messageType}
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
                          pChatId={pChatId || ''}
                          message={chat.message}
                          isDeleted={chat.isDeleted}
                        />
                      ) : (
                        <OtherChatP
                          handleReply={handleReply}
                          scrollToReply={scrollToReply}
                          currentUserId={currentUserId || ''}
                          isHighlighted={highlightedChatId === chat.chatId}
                          setShowReplyLayout={setShowReplyLayout}
                          highlightedText={highlightedText}
                          messageType={chat.messageType}
                          fileUrl={chat.fileUrl}
                          pChatId={pChatId || ''}
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
                          message={chat.message}
                          isDeleted={chat.isDeleted}
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
              <BottomTextP
               showReplyLayout={showReplyLayout}
               setShowReplyLayout={setShowReplyLayout}
               replyData={replyData}
               pChatId={pChatId || ''}
             />
                </div>
                </div>
            )}
            {chatStatus === 'declined' && (
              <div className="flex flex-col flex-1 w-full gap-3 items-center justify-center">
                 <p className="text-[#667085]  text-center w-[50%]">Your chat request was declined by the user. You can try to send chat request again but its not recommended to send chat request to same user multiple times.</p>
                 <button className="py-[0.625rem] px-6 text-white text-sm shadow-inner-button font-semibold border border-solid w-[300px]  border-white bg-[#9012FF] hover:bg-[#6D0DCC]  rounded-md">Send Request Again</button>
              </div>
             )}
             <ToastContainer/>
        </div>
    );

}
export default privateChatArea;