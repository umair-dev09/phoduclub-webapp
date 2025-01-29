import { auth, db } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { PopoverContent, PopoverTrigger, Popover } from '@nextui-org/popover';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { toast } from "react-toastify";
interface DisscusionDisplayProps {
    message: string;
    userId: string;
    timestamp: string;
    messageId: string;
    isAdmin: boolean;
    courseId: string;
    sectionId: string;
    contentId: string;
    upvotes: string[];
    deleted: boolean;
    isPinned: boolean;
    isReplying: boolean;
    replyingToId: string;
    replyingToMsgId: string;
    replyingToAdmin: boolean;
    isReplyingToMainMsg: boolean;
    replies?: DisscusionDisplayProps[]; // Add replies prop
    setShowReplyLayout: (value: boolean) => void;
    setHandleReply: React.Dispatch<React.SetStateAction<{
        message: string;
        senderId: string;
        chatId: string;
        displayUserId: string;
        isReplying: boolean;
        replyingToMsgId: string;
        replyingToAdmin: boolean;
    }>>;
}
type UserData = {
    name: string;
    profilePic: string;
    role: string;
    isPremium: string;
    userId: string;
};

function getTimeAgo(timestamp: string): string {
    // Parse the timestamp into a Date object
    const past = new Date(timestamp);

    // Validate the parsed date
    if (isNaN(past.getTime())) {
        return "Invalid date";
    }

    const now = new Date();
    const secondsDiff = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (secondsDiff < 60) return "Just now";
    const minutesDiff = Math.floor(secondsDiff / 60);
    if (minutesDiff < 60) return `${minutesDiff} min${minutesDiff > 1 ? "s" : ""} ago`;
    const hoursDiff = Math.floor(minutesDiff / 60);
    if (hoursDiff < 24) return `${hoursDiff} hour${hoursDiff > 1 ? "s" : ""} ago`;
    const daysDiff = Math.floor(hoursDiff / 24);
    if (daysDiff < 7) return `${daysDiff} day${daysDiff > 1 ? "s" : ""} ago`;
    const weeksDiff = Math.floor(daysDiff / 7);
    if (weeksDiff < 4) return `${weeksDiff} week${weeksDiff > 1 ? "s" : ""} ago`;
    const monthsDiff = Math.floor(daysDiff / 30);
    if (monthsDiff < 12) return `${monthsDiff} month${monthsDiff > 1 ? "s" : ""} ago`;
    const yearsDiff = Math.floor(monthsDiff / 12);
    return `${yearsDiff} year${yearsDiff > 1 ? "s" : ""} ago`;
}

function DiscussionDisplay({ message, userId, timestamp, messageId, isReplyingToMainMsg, replyingToAdmin, setShowReplyLayout, setHandleReply, isAdmin, courseId, sectionId, contentId, isPinned, upvotes, deleted, replies = [], isReplying, replyingToId, replyingToMsgId }: DisscusionDisplayProps) {
    const [sender, setSenderData] = useState<UserData | null>(null);
    const [replySender, setReplySenderData] = useState<UserData | null>(null);
    const [userLoading, setUserLoading] = useState(true);
    const [popoveropen, setPopoverOpen] = useState(false);
    const [deletedialog, setDeleteDialog] = useState(false);
    const currentUserId = auth.currentUser?.uid;
    const [showReplies, setShowReplies] = useState(false);

    const handleReplyMessage = () => {
        setShowReplyLayout(true);
        setHandleReply({
            message: message,
            senderId: userId,
            chatId: messageId,
            displayUserId: sender?.userId || '',
            isReplying: isReplying,
            replyingToMsgId: replyingToMsgId,
            replyingToAdmin: isAdmin,
        });
      }
    useEffect(() => {
        if (!userId) return;
        const fetchUserData = async () => {
            try {
                // Reference the document in Firestore
                const userDocRef = isAdmin
                    ? doc(db, "admin", userId)
                    : doc(db, "users", userId);
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
    }, [isAdmin, userId]);

    useEffect(() => {
        if (!replyingToId) return;
        const fetchUserData = async () => {
            try {
                // Reference the document in Firestore
                const userDocRef = replyingToAdmin
                    ? doc(db, "admin", replyingToId)
                    : doc(db, "users", replyingToId);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    // Set the user data
                    setReplySenderData(userDoc.data() as UserData);
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
    }, [replyingToAdmin, replyingToId]);

    const handleDelete = async () => {
        if (!currentUserId) return;
        const discussionRef = doc(db, 'course', courseId, 'sections', sectionId, 'content', contentId, 'Disscussion', messageId);
        try {
            await updateDoc(discussionRef, { message: "This message was deleted", deleted: true });
            console.log("Message deleted successfully");
            toast.success("Message deleted successfully");
            setDeleteDialog(false);
        } catch (error) {
            console.error("Error deleting message: ", error);
        }
    };

    const handlePin = async () => {
        if (!currentUserId) return;
        const discussionRef = doc(db, 'course', courseId, 'sections', sectionId, 'content', contentId, 'Disscussion', messageId);
        try {
            if(isPinned){
                await updateDoc(discussionRef, {  isPinned: false });
            }
            else{
                await updateDoc(discussionRef, {  isPinned: true });
            }
            console.log("Message pinned successfully");
            toast.success("Message pinned successfully");
            setDeleteDialog(false);
        } catch (error) {
            console.error("Error deleting message: ", error);
        }
    };

    interface ExpandableTextProps {
        content: string; // Ensures 'content' is a string
        wordLimit?: number; // Optional word limit, default to 100
    }

    const ExpandableText: React.FC<ExpandableTextProps> = ({ content, wordLimit = 100 }) => {
        const [isExpanded, setIsExpanded] = useState(false);
        // Split the content into words
        const words = content.split(' ');
        // Check if content exceeds the word limit
        const exceedsLimit = words.length > wordLimit;
        // Truncated and full content
        const displayedContent = isExpanded || !exceedsLimit
            ? content
            : words.slice(0, wordLimit).join(' ') + '...';

        return (
            <div>
                <p>{displayedContent}</p>
                {exceedsLimit && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-[#9012FF] font-semibold text-sm"
                    >
                        {isExpanded ? 'Show Less' : 'Show More'}
                    </button>
                )}
            </div>
        );
    };

    const handleAddUpvote = async () => {
        {
            if (!currentUserId) return;
            const discussionRef = doc(db, 'course', courseId, 'sections', sectionId, 'content', contentId, 'Disscussion', messageId);
            try {
                const discussionDoc = await getDoc(discussionRef);
                if (discussionDoc.exists()) {
                    const discussionData = discussionDoc.data();
                    const upvotes = discussionData.upvotes || [];
                    const updatedUpvotes = upvotes.includes(currentUserId)
                        ? upvotes.filter((id: string) => id !== currentUserId)
                        : [...upvotes, currentUserId];
                    await updateDoc(discussionRef, { upvotes: updatedUpvotes });
                    console.log("Upvotes updated successfully");
                }
            } catch (error) {
                console.error("Error updating upvotes: ", error);
            }
        }
    };

    return (
        <div className=" flex flex-col gap-4 px-6 py-4 h-auto w-full border-t">
            {/* first comment */}
            <div className="flex flex-col  gap-3 ">
                <div className="flex flex-row w-full justify-between items-center">
                    <div className=" flex flex-row gap-[10px] items-center justify-center">
                        <Image className="w-11 h-11 rounded-full"
                            src={sender?.profilePic || "/defaultDP.svg"}
                            width={46}
                            height={46}
                            alt=" Proflie -Image" />
                        <div className="flex flex-col items-start">
                            <div className="flex flex-row gap-2 items-center justify-center">
                                <span className="font-medium text-sm text-[#1D2939]">{sender?.name || 'User'}</span>
                                {isAdmin && (
                                    <span className="text-[#1D2939] text-sm ">{sender?.role || 'Admin'}</span>
                                )}
                            </div>
                            <span className="font-normal text-sm text-[#1D2939] opacity-[50%]">{sender?.userId || 'user#123'}</span>
                        </div>
                    </div>
                    
                    <div className="flex flex-row gap-1 items-center justify-center">
                        {isPinned && (
                        <Image className="mr-1"
                        src="/icons/pin-icon.svg"
                        width={14}
                        height={14}
                        alt="Pin"
                        />
                        )}
                        <span className="text-sm font-normal text-[#1D2939] opacity-[50%] flex items-center">
                            {getTimeAgo(timestamp)}
                        </span>
                        
                        {(!deleted && userId === currentUserId) && (
                        <Popover placement="bottom-end"
                            isOpen={popoveropen}
                            onOpenChange={(open) => setPopoverOpen(open)}>
                            <PopoverTrigger>
                                <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]"
                                >
                                    <button className="min-w-[20px] min-h-[20px] mt-[2px]">
                                        <Image
                                            src="/icons/three-dots.svg"
                                            width={20}
                                            height={20}
                                            alt="Three-dots"
                                        />
                                    </button>
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="h-auto w-auto px-0 border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-md flex flex-col py-[4px] shadow-lg">
                                {isAdmin && (
                                <button
                                    onClick={() => {setPopoverOpen(false); handlePin();}}
                                    className="flex flex-row h-[40px] w-full px-3 gap-2 hover:bg-[#F2F4F7] items-center">

                                    <Image
                                        src="/icons/pin-icon.svg"
                                        width={18}
                                        height={18}
                                        alt="Pin"
                                    />
                                    <span className="text-[#0C111D] text-sm font-medium">{isPinned ? 'Unpin' : 'Pin'}</span>
                                </button>
                                  )} 

                                <button
                                    onClick={() => {
                                        setPopoverOpen(false);
                                        setDeleteDialog(true);

                                    }}
                                    className="flex flex-row h-[40px] w-full px-3 gap-2 hover:bg-[#FEE4E2] items-center">
                                    <Image
                                        src="/icons/delete.svg"
                                        width={18}
                                        height={18}
                                        alt="Delete"
                                    />
                                    <span className="text-[#DE3024] text-sm font-medium">Delete message</span>
                                </button>

                            </PopoverContent>
                        </Popover>
                        )}
                    </div>

                </div>
                <div className="rounded-md bg-white break-all">
                    <div className={`text-[#3b3b3b] text-sm font-normal break-all ml-2 mt-1 mr-8 ${deleted ? 'italic' : ''}`} dangerouslySetInnerHTML={{
                            __html: !isReplying 
                                ? message || ''
                                : isReplyingToMainMsg
                                    ? message || ''
                                    : `<span class="text-purple">@${replySender?.userId}</span> ${message.replace(/<p>/g, '').replace(/<\/p>/g, '')}`
                        }} />
                </div>
                {/* <ExpandableText content={message} /> */}

                <div className="flex flex-row gap-6 items-center justify-start ">
                    <button
                        className="flex flex-row gap-[6px] items-center justify-center"
                        onClick={handleAddUpvote}
                    >
                        {(upvotes ?? []).includes(currentUserId ?? '') ? (
                            <>
                                <Image
                                    src="/icons/circle-arrow-up-02.svg"
                                    width={20}
                                    height={20}
                                    alt="upvote_button"
                                />
                                <div className="flex flex-row gap-[2px] items-center justify-center">
                                    <span className="font-normal text-[#7400E0] text-sm">{upvotes?.length || 0}</span>
                                    <span className=" font-normal text-[#7400E0] text-sm">Upvote</span>
                                </div>

                            </>
                        ) : (
                            <>
                                <Image
                                    src="/icons/upvote.svg"
                                    width={20}
                                    height={20}
                                    alt="upvote_button"
                                />
                                <div className="flex flex-row gap-[2px] items-center justify-center">
                                    <span className="font-normal text-[#141B34] text-sm">{upvotes?.length || 0}</span>
                                    <span className=" font-normal text-[#141B34] text-sm">Upvote</span>
                                </div>
                            </>
                        )}



                    </button>
                    {!deleted && (
                    <button className=" flex flex-row gap-[6px] pb-[3px]"
                    onClick={() => {
                        const element = document.getElementById('discussion-input');
                        element?.scrollIntoView({ behavior: 'smooth' });
                        handleReplyMessage();
                    }}>
                    <Image
                                    src="/icons/comment-icon.svg"
                                    width={18}
                                    height={18}
                                    alt="three-icon" />
                                <span className="text-[#1D2939] font-normal text-sm">Reply</span>
                    </button>
                    )}
                    {Array.isArray(replies) && replies.length > 0 && (
                        <button 
                            onClick={() => setShowReplies(!showReplies)}
                            className="flex flex-row gap-[6px] pb-[3px] text-[#9012FF] font-semibold text-sm"
                        >
                            <span>
                                {showReplies ? 'Hide' : 'View'} {replies.length} {replies.length === 1 ? 'Reply' : 'Replies'}
                            </span>
                        </button>
                    )}
                </div>
            </div>
            {showReplies && Array.isArray(replies) && replies.length > 0 && (
                <div className="ml-[24px]">
                    {replies.map(reply => (
                        <DiscussionDisplay 
                            key={reply.messageId}
                            {...reply}
                            courseId={courseId}
                            sectionId={sectionId}
                            contentId={contentId}
                        />
                    ))}
                </div>
            )}
            <Modal isOpen={deletedialog} onOpenChange={(isOpen) => !isOpen && setDeleteDialog(false)} hideCloseButton >

                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-row justify-between items-center gap-1">
                            <h1 className="text-[#1D2939] font-bold text-lg">
                                Delete Message
                            </h1>
                            <button
                                className="w-[32px] h-[32px] rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]"
                                onClick={() => setDeleteDialog(false)}
                            >
                                <Image
                                    src="/icons/cancel.svg"
                                    alt="Cancel"
                                    width={20}
                                    height={20}
                                />
                            </button>
                        </ModalHeader>
                        <ModalBody >
                            <span className="text-sm font-normal text-[#667085]">
                                Are you sure you want to delete this message? This action cannot be undone.</span>

                        </ModalBody>
                        <ModalFooter className="border-t border-lightGrey">
                            <Button variant="light" className="py-[0.625rem] px-6 border-2  border-solid border-[#EAECF0] font-semibold text-sm text-[#1D2939] rounded-md hover:bg-[#F2F4F7]" onClick={() => setDeleteDialog(false)} >Cancel</Button>
                            <Button className={`py-[0.625rem] px-6 text-white font-semibold shadow-inner-button  hover:bg-[#B0201A] bg-[#BB241A] border border-white rounded-md`} onClick={() => handleDelete()}>Delete</Button>
                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal >
        </div >
    );
}
export default DiscussionDisplay;