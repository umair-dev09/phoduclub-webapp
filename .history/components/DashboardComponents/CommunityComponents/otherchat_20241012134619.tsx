"use client";
import { useState } from "react";
import Image from "next/image";

function ChartArea() {
    // Message text
    const messageStart = "Hey In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. ";
    const messageEnd = "Lorem ipsum may be used as a placeholder before the final copy is available.";

    // State to control the expansion of text
    const [isExpanded, setIsExpanded] = useState(false);

    // Toggle the expanded state
    const toggleExpanded = () => {
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
                        {/* Message Content */}
                        <span className="break-words whitespace-pre-wrap font-normal text-[#182230] text-sm">
                            {/* Display the first part of the message */}
                            {messageStart}

                            {/* Conditionally display the rest of the message if expanded */}
                            {isExpanded && messageEnd}
                        </span>

                        {/* Show More / Show Less button */}
                        <div className="">
                            <button onClick={toggleExpanded} className="text-[#9012FF] font-semibold text-sm">
                                {isExpanded ? 'Show Less' : 'Show More'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChartArea;
