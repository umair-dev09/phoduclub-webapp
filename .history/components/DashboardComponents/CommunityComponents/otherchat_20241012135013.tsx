"use client";
import Image from "next/image";
import { useState } from "react";

function ChartArea() {
    const [isExpanded, setIsExpanded] = useState(false);

    const messageStart = "Hey In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.";

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    // Calculate the maximum length for the truncated message
    const maxLength = 150; // Adjust this value as needed
    const truncatedMessage = isExpanded ? messageStart : messageStart.split(/\s+/).slice(0, maxLength).join(" ") + '...'; // Split by words, take first N, and join back

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
                            {truncatedMessage} {/* Display the truncated or full message */}
                        </span>
                        <div className="mt-2 flex justify-end"> {/* Align button to the right */}
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
