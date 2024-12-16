import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

interface DisscusionDisplayProps {
    message: string;
    userId: string;
    timestamp: string;
    messageId: string;
    isAdmin: boolean;
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

function DiscussionDisplay({message, userId, timestamp, messageId, isAdmin}:DisscusionDisplayProps) {
    const [sender, setSenderData] = useState<UserData | null>(null);
    const [userLoading, setUserLoading] = useState(true);

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

  return(
    <div className=" flex flex-col gap-4 px-6 py-4 h-auto w-full border-t">
                {/* first comment */}
                <div className="flex flex-col  gap-3 ">
                    <div className="flex flex-row w-full justify-between items-center">
                        <div className=" flex flex-row gap-3 items-center justify-center">
                            <Image className="w-11 h-11 rounded-full"
                                src={sender?.profilePic || "/icons/profile-pic.png"}
                                width={46}
                                height={46}
                                alt=" Proflie -Image" />
                            <div className="flex flex-col gap-1">
                                <div className="flex flex-row gap-2 items-center justify-center">
                                <span className="font-medium text-sm text-[#1D2939]">{sender?.name}</span>
                                {isAdmin && (
                                <span className="text-[#1D2939] text-sm ">{sender?.role}</span>
                                )}
                                </div>
                                <span className="font-normal text-sm text-[#1D2939] opacity-[50%]">{sender?.userId}</span>
                            </div>
                        </div>
                        <span className="text-sm font-normal text-[#1D2939] opacity-[50%] flex items-center">
                          {getTimeAgo(timestamp)}
                         </span>
                    </div>
                    <div className='text-[#3b3b3b] text-sm font-normal break-all ml-2 mt-2 mr-8' dangerouslySetInnerHTML={{
                                    __html: message || '',
                                }}/>
                        {/* <ExpandableText content={message} /> */}
                    
                    <div className="flex flex-row gap-6 items-center">
                        <button className="flex flex-row gap-1">
                            <Image
                                src="/icons/upvote.svg"
                                width={20}
                                height={20}
                                alt="upvote_button"
                                className=""

                            />
                            <span className="font-normal text-[#141B34] text-sm">24</span>
                            <span className=" font-normal text-[#141B34] text-sm">upvote</span>
                        </button>
                        <button>
                            <span className="view-replies font-semibold text-sm text-[#9012FF]">View all Replies</span>
                        </button>
                    </div>
                </div>
                </div>
  );
}
export default DiscussionDisplay;