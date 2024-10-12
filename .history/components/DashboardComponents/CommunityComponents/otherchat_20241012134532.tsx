"use client";
import Image from "next/image";
import { useState } from "react";

function ChartArea() {
    const [isExpanded, setIsExpanded] = useState(false);

    const messageStart = "Hey In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.";

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="mx-6 h-full w-full mt-6">
            <div className="w-full h-auto flex flex-col">
                <div className="gap-2 flex items-center">
                    <Image
                        src="/icons/profile-pic.png"
                        width={36}
                        height={36}
                        alt="Others-chat-profile"
                    />
                    <span className="text-[#182230] font-semibold text-sm">Brooklyn Simmons</span>
                    <span className="font-normal text-xs text-[#475467]">3:24 PM</span>
                </div>
                <div className="ml-11 flex">
                    <div className="bg-white rounded-md border border-solid border-[#EAECF0] max-w-[400px] px-4 py-3 inline-block">
                        <span className="break-words whitespace-pre-wrap font-normal text-[#182230] text-sm">
                            {/* Conditionally show part of the message or the full message */}
                            {isExpanded
                                ? messageStart // show full message if expanded
                                : `${messageStart.substring(0, 100)}...`} {/* Truncated text */}
                        </span>

                        <div className="">
                            {/* Show "Show More" or "Show Less" button */}
                            <button
                                onClick={toggleExpand}
                                className="text-[#9012FF] font-semibold text-sm"
                            >
                                {isExpanded ? "Show Less" : "Show More"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChartArea;
