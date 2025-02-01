import React from "react";
import Image from "next/image";
import { PopoverContent, PopoverTrigger, Popover } from '@nextui-org/popover';
import { useState, useRef, useEffect, forwardRef, useMemo } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { deleteDoc, doc, Timestamp, collection, getDoc, setDoc, onSnapshot, getDocs } from "firebase/firestore";
import { db, auth } from "@/firebase";
import { getAuth } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingData from "@/components/Loading";
import MessageLoading from "@/components/MessageLoading";
import CommunityVideoPlayer from "@/components/CommunityVideoPlayer";
import MediaViewDialog from "./MediaViewDialog";
import Delete from "./Delete";
import MemberClickDialog from "./MemberClickDialog";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Tooltip } from "@nextui-org/react";

type OtherChatProps = {
  message: string | null;
  messageType: string | null;
  isReplying: boolean;
  replyingToId: string | null;
  replyingToChatId: string | null;
  replyingToMsg: string | null;
  replyingToMsgType: string | null;
  replyingToFileUrl: string;
  replyingToFileName: string | null;
  fileUrl: string;
  fileName: string | null;
  fileSize: number;
  senderId: string | null;
  timestamp: Timestamp | null;
  chatId: string;
  communityId: string;
  headingId: string;
  channelId: string;
  isDeleted: boolean;
  adminThatDeletedId: string;
  isDeletedByAdmin: boolean;
  highlightedText: string | React.ReactNode[];
  isAdmin: boolean;
  isCurrentUserAdmin: boolean;
  currentUserId: string;
  isHighlighted: boolean; // New prop
  mentions: { userId: string; id: string, isAdmin: boolean, }[];
  scrollToReply: (replyingToChatId: string) => void;
  setShowReplyLayout: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  handleReply: (message: string | null, senderId: string | null, messageType: string | null, fileUrl: string | null, fileName: string | null, chatId: string | null) => void; // New prop to handle reply data
}

type ReactionCount = {
  emoji: string;
  count: number;
};

type UserData = {
  name: string;
  profilePic: string;
  role: string;
  isPremium: string;
  userId: string;
};

interface Mention {
  id: string;
  userId: string;
  isAdmin: boolean;
}

interface Props {
  highlightedText: string | React.ReactNode[];
  mentions: Mention[];
  setOpenDialogue: (open: boolean) => void;
  setId: (id: string) => void;
  setAdmin: (isAdmin: boolean) => void;
}

function OtherChat({ message, currentUserId, adminThatDeletedId, isDeletedByAdmin, isCurrentUserAdmin, setLoading, mentions, isDeleted, highlightedText, messageType, fileUrl, fileName, isHighlighted, isAdmin, scrollToReply, fileSize, senderId, timestamp, communityId, headingId, channelId, chatId, isReplying, replyingToId, replyingToChatId, replyingToFileName, replyingToFileUrl, replyingToMsg, replyingToMsgType, setShowReplyLayout, handleReply }: OtherChatProps) {
  const [reactions, setReactions] = useState<ReactionCount[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showBookmark, setShowBookmark] = useState(false); // Use a single index to track the active button
  const [showMediaDialog, setShowMediaDialog] = useState(false); // Use a single index to track the active button
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [sender, setSenderData] = useState<UserData | null>(null);
  const [openDialogue, setOpenDialogue] = useState(false);
  const [userLoading, setUserLoading] = useState(true);
  const [id, setId] = useState<string>('');
  const [admin, setAdmin] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsExpanded(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!senderId) return;
    const fetchUserData = async () => {
      try {
        // Reference the document in Firestore
        const userDocRef = isAdmin
          ? doc(db, "admin", senderId)
          : doc(db, "users", senderId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          // Set the user data
          setSenderData(userDoc.data() as UserData);
          // setLoading(false);
          setUserLoading(false);
        } else {
          console.log("User not found");
        }

      } catch (err) {
        console.log("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, [isAdmin, senderId]);


  const reactionsRef = useMemo(() => {
    return collection(
      db,
      `communities/${communityId}/channelsHeading/${headingId}/channels/${channelId}/chats/${chatId}/reactions`
    );
  }, [communityId, headingId, channelId, chatId]);

  // Firestore listener for reactions
  useEffect(() => {
    const unsubscribe = onSnapshot(reactionsRef, (snapshot) => {
      const emojiCountMap: Record<string, number> = {};

      snapshot.forEach((doc) => {
        const { emoji } = doc.data();
        if (emoji) {
          emojiCountMap[emoji] = (emojiCountMap[emoji] || 0) + 1;
        }
      });

      const updatedReactions = Object.entries(emojiCountMap).map(([emoji, count]) => ({
        emoji,
        count,
      }));

      setReactions(updatedReactions);
    });

    return () => unsubscribe();
  }, [reactionsRef]);

  const renderMessageWithMentions = () => {
    if (!highlightedText || !mentions) return highlightedText;

    const maxWords = 30;

    const isUrl = (text: string) => {
      try {
        new URL(text);
        return true;
      } catch {
        return false;
      }
    };

    const processTextPart = (text: string, key: number | string) => {
      if (isUrl(text)) {
        return (
          <a
            key={key}
            href={text}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {text}
          </a>
        );
      }
      return text;
    };

    const processMention = (part: string, index: number | string) => {
      if (part.startsWith("@")) {
        const mentionName = part.substring(1).trim();
        const mention = mentions.find((m) => m.userId === mentionName || m.id === mentionName);

        if (mention) {
          return (
            <span
              key={index}
              style={{ color: "#C74FE6", cursor: "pointer" }}
              onClick={() => {
                setOpenDialogue(true);
                setId(mention.id);
                setAdmin(mention.isAdmin);
              }}
            >
              {part}
            </span>
          );
        }
      }
      return processTextPart(part, index);
    };

    // Regex to find mentions
    const mentionRegex = /(@[\w#]+)/g;

    const processHighlightedText = () => {
      if (typeof highlightedText === "string") {
        const parts = highlightedText.split(mentionRegex);
        return parts.map((part, index) => processMention(part, index));
      }

      if (Array.isArray(highlightedText)) {
        return highlightedText.map((node, index) => {
          if (typeof node === "string") {
            const parts = node.split(mentionRegex);
            return parts.map((part, innerIndex) => processMention(part, `${index}-${innerIndex}`));
          }
          return node;
        });
      }
      return null;
    };

    const fullContent = processHighlightedText();

    const getWordCount = (content: any): number => {
      if (typeof content === "string") {
        return content.trim().split(/\s+/).length;
      }
      if (Array.isArray(content)) {
        return content.reduce((count, node) => {
          if (typeof node === "string") {
            return count + node.trim().split(/\s+/).length;
          }
          return count;
        }, 0);
      }
      return 0;
    };

    const wordCount = getWordCount(fullContent);

    // Limit to 20 words initially if not expanded
    const getTruncatedContent = () => {
      if (isExpanded) {
        return fullContent;  // Show full content when expanded
      }

      if (wordCount <= maxWords) {
        return fullContent;  // Show full content if less than maxWords
      }

      if (typeof highlightedText === "string") {
        const words = highlightedText.split(/\s+/);
        return words.slice(0, maxWords).join(" ") + "...";  // Show truncated content
      }

      if (Array.isArray(fullContent)) {
        let wordCounter = 0;
        return fullContent.reduce((acc: React.ReactNode[], node) => {
          if (wordCounter >= maxWords) return acc;

          if (typeof node === "string") {
            const words = node.split(/\s+/);
            const remainingWords = maxWords - wordCounter;
            wordCounter += words.length;
            if (wordCounter > maxWords) {
              acc.push(words.slice(0, remainingWords).join(" ") + "...");
            } else {
              acc.push(node);
            }
          } else {
            acc.push(node);
            wordCounter += 1;
          }
          return acc;
        }, []);
      }
      return null;
    };

    return (
      <div>
        <span>{getTruncatedContent()}</span>
        {wordCount > maxWords && !isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="text-blue-500 hover:underline ml-2"
          >
            View More
          </button>
        )}
      </div>
    );
  };

  const handleReplyMessage = () => {
    setShowReplyLayout(true);
    setIsOpen(false);
    handleReply(message, senderId, messageType, fileUrl, fileName, chatId); // Pass the message and senderId to the parent
  }
  // Check if firestoreTimestamp is null or undefined
  if (!timestamp) {
    return <MessageLoading />
  }
  // Convert Firestore timestamp to JavaScript Date object
  const date = timestamp.toDate();

  // Format the date to 3:24 PM format
  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);


  const handleCopy = async () => {
    if (message) {
      try {
        await navigator.clipboard.writeText(message);
        toast.success("Message copied!"); // Show success message
        setIsOpen(false);
      } catch (error) {
        console.error("Failed to copy message: ", error);
      }
    }
  };

  const formatFileSize = (size: number): string => {
    if (size < 1024) return `${size} bytes`;
    else if (size >= 1024 && size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    else if (size >= 1024 * 1024 && size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    else return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };

  const handleDownload = (fileUrl: string, fileName: string) => {
    // Create an anchor element
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName; // This ensures the file is downloaded, not opened
    link.target = '_blank'; // Optional: in case the file is large, it opens in a new tab
    document.body.appendChild(link); // Append the link to the body
    link.click(); // Trigger the download
    document.body.removeChild(link); // Remove the link after download starts
  };

  const handleBookMarkClick = () => {
    setIsOpen(false);
  }

  const handleAddReaction = async (emoji: EmojiClickData) => {
    try {

      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.error("User not authenticated.");
        return;
      }

      const userId = currentUser.uid;

      const reactionsRef = doc(db, `communities/${communityId}/channelsHeading/${headingId}/channels/${channelId}/chats/${chatId}/reactions`, userId);

      await setDoc(reactionsRef, { emoji: emoji.emoji, userId });

      setIsOpen(false);

      console.log("Reaction added successfully with reactionId!");
    } catch (error) {
      console.error("Error adding reaction: ", error);
    }
  };
  const handleDeleteReaction = async (emoji: string) => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.error("User not authenticated.");
        return;
      }

      const userId = currentUser.uid;
      const reactionDocRef = doc(db, `communities/${communityId}/channelsHeading/${headingId}/channels/${channelId}/chats/${chatId}/reactions`, userId);

      const reactionDoc = await getDoc(reactionDocRef);
      if (reactionDoc.exists() && reactionDoc.data().emoji === emoji) {
        await deleteDoc(reactionDocRef);
        console.log("Reaction deleted successfully!");
      } else {
        console.log("Reaction not found or does not match.");
      }
    } catch (error) {
      console.error("Error deleting reaction: ", error);
    }
  };
  // const [adminId, setAdminId] = useState('');

  // useEffect(() => {
  //   const fetchAdminName = async () => {
  //     try {
  //       if (!adminThatDeletedId || !isDeletedByAdmin) {
  //         setAdminId('');
  //         return;
  //       }

  //       const adminDocRef = doc(db, "admin", adminThatDeletedId);
  //       const adminDoc = await getDoc(adminDocRef);

  //       if (adminDoc.exists()) {
  //         const adminData = adminDoc.data() as UserData;
  //         setAdminId(adminData.userId);
  //       } else {
  //         console.log("Admin not found");
  //         setAdminId('Admin');
  //       }
  //     } catch (err) {
  //       console.log("Failed to fetch admin data");
  //       setAdminId('Admin');
  //     }
  //   };

  //   fetchAdminName();
  // }, [isDeletedByAdmin, adminThatDeletedId]);
  return (
    <div className="w-full h-auto flex flex-col pr-[10%] ">
      <div className="gap-2 flex items-center">
        <button className="relative" onClick={() => { setOpenDialogue(true); setId(senderId || ''); setAdmin(isAdmin) }}>
          {userLoading ? (
            <Skeleton width={40} height={40} borderRadius={1000} />
          ) : (
            <Image className="w-[40px] h-[40px] rounded-full" src={sender?.profilePic || '/icons/profile-pic2.svg'} alt="DP" width={40} height={40} />
          )}
          {!isAdmin && sender?.isPremium && (
            <Image className="absolute right-0 bottom-0" src='/icons/winnerBatch.svg' alt="Batch" width={18} height={18} />
          )}
        </button>
        <button className="flex items-center justify-center" onClick={() => { setOpenDialogue(true); setId(senderId || ''); setAdmin(isAdmin) }}>
          <span className={`text-[#182230] font-semibold text-sm self-center ${userLoading ? 'mt-[-4px]' : ''}`}>{sender?.name || <Skeleton width={120} height={20} />}</span> </button>
        {isAdmin && (
          <span className="font-normal text-sm text-[#475467]">{sender?.role}</span>
        )}
        <span className="font-normal text-sm text-[#475467]">{formattedTime}</span>
        {/* {showBookmark && (<Image src='/icons/bookmark1.svg' alt='Bookmark icon' width={12} height={12} />)} */}
      </div>

      <div className="ml-11 flex flex-row gap-2 items-center relative group">
        <div className={`flex flex-col px-4 py-3 transition-all duration-500 border border-[#EAECF0] ${isHighlighted ? 'bg-[#EAECF0]' : 'bg-white'} rounded-xl gap-[8px]  ${messageType === 'image' || messageType === 'document' ? 'max-w-[380px]' : 'max-w-[600px]'} `}>
          {/*Image Layout*/}
          {messageType === 'image' && !isDeleted && fileUrl && (
            <div>
              <button onClick={() => setShowMediaDialog(true)}>
                <Image className='w-[360px] self-end h-[320px] mt-[3px] mb-[-4px] object-cover' src={fileUrl} alt="image" width={360} height={320} quality={100} />
              </button>
            </div>
          )}
          {messageType === 'video' && !isDeleted && fileUrl && (
            <button onClick={() => setShowMediaDialog(true)}>
              <CommunityVideoPlayer videoSrc={fileUrl} />
            </button>
          )}
          {/*Document Layout*/}
          {messageType === 'document' && !isDeleted && fileUrl && (
            <div className="w-[350px] h-auto rounded-md mt-[3px] bg-[#f2f4f7] border border-[#d0d5dd] flex flex-row p-3 justify-between">
              <div className="flex flex-row gap-2 items-start mr-[10px] w-[300px]">
                <Image className="mt-1" src="/icons/file-02.svg" width={16} height={16} alt="File" />
                <div className="flex flex-col break-all">
                  <p className="text-[13px]">{fileName}</p>
                  <p className="text-[11px]">{formatFileSize(fileSize)}</p>
                </div>
              </div>
              <button className="w-[24px] h-[24px]" onClick={() => handleDownload(fileUrl, fileName ?? '')}>
                <Image className='w-[24px] h-[24px]' src="/icons/download.svg" width={24} height={24} alt="Download" />
              </button>
            </div>
          )}

          {isReplying && !isDeleted && (
            <div className="flex flex-row p-[10px] bg-[#F2F4F7] border border-[#D0D5DD] rounded-md text-xs gap-1 justify-between cursor-pointer"
              onClick={() => scrollToReply(replyingToChatId || '')}>
              <div className="flex flex-col mr-6 justify-center">
                <div className="flex flex-row gap-2">
                  {replyingToId === currentUserId ? (
                    <h4 className="font-semibold">You</h4>
                  ) : (
                    <h4 className="font-semibold">Marvin McKinney</h4>
                  )}                        {/* <div className="">Admin</div> */}
                </div>
                <div className="flex flex-row gap-1 mt-[2px] ">
                  {replyingToMsgType === 'image' && (
                    <Image src='/icons/image.svg' alt='attachment icon' width={12} height={12} />
                  )}
                  {replyingToMsgType === 'video' && (
                    <Image src='/icons/vedio.svg' alt='attachment icon' width={12} height={12} />
                  )}
                  {replyingToMsgType === 'document' && (
                    <Image src='/icons/file-02.svg' alt='attachment icon' width={12} height={12} />
                  )}
                  <div className="break-all">
                    {replyingToMsg !== null && replyingToMsgType !== 'document'
                      ? replyingToMsg // Show message if it's not null and not a document
                      : replyingToMsgType === 'document'
                        ? replyingToFileName // Always show fileName for document
                        : (replyingToMsgType === 'image' && 'Image') ||
                        (replyingToMsgType === 'video' && 'Video') ||
                        'Unknown Type'}</div>
                </div>
              </div>
              {replyingToMsgType === 'image' && (
                <Image className="rounded-sm min-h-[40px] object-cover" src={replyingToFileUrl} alt='Image' width={50} height={45} />
              )}
            </div>
          )}
          <div className="text-sm break-all w-full max-w-full ">
            {isDeleted ? (
              <div className="italic text-[#475467]">{isDeletedByAdmin ? <>
                This message was deleted by <span className="text-[#C74FE6] cursor-pointer" onClick={() => { setOpenDialogue(true); setId(adminThatDeletedId); setAdmin(true) }}>@{adminThatDeletedId}</span>
              </> : 'This message was deleted'}</div>
            ) : (
              <div>
                {renderMessageWithMentions()}
              </div>
            )}
          </div>
        </div>

        <Popover
          placement="bottom-start"
          isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}
        >
          <PopoverTrigger>
            <button
              // onClick={handlePopoverToggle}
              className='w-[48px] h-[26px] rounded-[54px] border border-solid border-[#6770A9]  hover:bg-[#D0D5DD] flex invisible min-w-[46px] items-center justify-center focus:outline-none bg-[#F2F4F7] ml-1 group-hover:flex group-hover:visible'
            >
              <Image
                src="/icons/arrow-down.svg"
                width={12}
                height={12}
                alt="Arrow-down"
                className="mr-1"
              />
              <Image
                src="/icons/smile.svg"
                width={16}
                height={16}
                alt="Smile"
              />
            </button>
          </PopoverTrigger>

          <PopoverContent className="p-0">
            <div
              className='flex flex-col bg-[#FFFFFF] w-auto h-auto border border-[#EAECF0] rounded-[12px] '
            >
              {/* Emoji list */}
              <EmojiPicker onEmojiClick={handleAddReaction} height={280} searchDisabled={true} reactions={['1f44d', '1f496', '1f602', '1f60d', '1f62e']}
                style={{
                  border: "none",
                }}
                previewConfig={
                  {
                    showPreview: false, // defaults to: true
                  }
                }
                reactionsDefaultOpen={true} allowExpandReactions={true} hiddenEmojis={['1f595']} />

              {/* Other options */}
              <button onClick={handleReplyMessage} className='flex flex-row items-center gap-2 w-30 px-4 py-[10px] transition-colors hover:bg-neutral-100'>
                <Image src='/icons/Reply.svg' alt='search icon' width={19} height={19} />
                <span className='font-normal text-[#0C111D] text-sm'>Reply</span>
              </button>
              {highlightedText && (
                <button onClick={handleCopy} className='flex flex-row items-center gap-2 w-30 px-4 py-[10px] transition-colors hover:bg-neutral-100'>
                  <Image src='/icons/copy.svg' alt='search icon' width={18} height={18} />
                  <span className='font-normal text-[#0C111D] text-sm'>Copy</span>
                </button>
              )}
              {/* <button className='flex flex-row items-center gap-2 w-30 px-4 py-[10px] transition-colors hover:bg-neutral-100' onClick={() => { setShowBookmark(true); setIsOpen(false); }}>
                <Image src='/icons/Bookmark.svg' alt='search icon' width={18} height={18} />
                <span className='font-normal text-[#0C111D] text-sm'>Bookmark</span>
              </button> */}
              {/* {!isCurrentUserAdmin && !isAdmin && (
      
                  <button className='flex flex-row items-center gap-2 w-30 px-4 pt-[10px] pb-3 transition-colors hover:bg-neutral-100 rounded-br-md rounded-bl-md cursor-not-allowed'>
                    <Image src='/icons/Report.svg' alt='search icon' width={17} height={17} />
                    <span className='font-normal text-[#0C111D] text-sm'>Report Message</span>
                  </button>
              )} */}
              {isCurrentUserAdmin && !isAdmin && (
                <button className='flex flex-row items-center gap-2 w-30 px-4 pt-[10px] pb-3 transition-colors hover:bg-neutral-100 rounded-br-md rounded-bl-md '>
                  <Image src='/icons/user-block-red-01.svg' alt='search icon' width={17} height={17} />
                  <span className='font-normal text-[#DE3024] text-sm'>Mute User</span>
                </button>
              )}
              {isCurrentUserAdmin && !isAdmin && (
                <button onClick={() => setDeleteDialog(true)} className='flex flex-row items-center gap-2 w-30 px-4 pt-[10px] pb-3 transition-colors hover:bg-neutral-100 rounded-br-md rounded-bl-md '>
                  <Image src='/icons/delete.svg' alt='search icon' width={17} height={17} />
                  <span className='font-normal text-[#DE3024] text-sm'>Delete Message</span>
                </button>
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>
      {!isDeleted && (
        <div className="flex flex-row justify-start mt-1 gap-2 h-auto w-full ml-11 flex-wrap">
          {reactions.map((reaction) => (
            <button
              key={reaction.emoji}
              onClick={() => handleDeleteReaction(reaction.emoji)}
              className={`rounded-[54px] border border-solid border-[#D0D5DD] h-[26px] w-auto p-1 flex flex-row justify-center items-center gap-1 transition-colors duration-200 
                                      bg-[#F2F4F7] text-[#475467] hover:bg-[#F8F0FF] hover:border-[#7400E0]`}
            >
              <p className="text-sm">{reaction.emoji}</p>
              <span className="font-medium text-xs">{reaction.count}</span>
            </button>
          ))}
        </div>
      )}
      {showMediaDialog && <MediaViewDialog open={true} onClose={() => setShowMediaDialog(false)} src={fileUrl} mediaType={messageType || ''} />}

      {openDialogue && (
        <MemberClickDialog open={true} onClose={() => setOpenDialogue(false)} id={id} isAdmin={admin} isCurrentUserAdmin={false} />
      )}

      {deleteDialog && <Delete communityId={communityId} headingId={headingId} channelId={channelId} chatId={chatId} open={true} onClose={() => setDeleteDialog(false)} deletedByAdmin={true} adminThatDeletedId={auth.currentUser?.uid || ''} />}

    </div>

  );
}

export default OtherChat;
