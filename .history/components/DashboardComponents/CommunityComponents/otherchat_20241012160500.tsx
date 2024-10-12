"use client";
import Image from "next/image";
import { useState } from "react";

function ChartArea() {
    const messageStart = `Hey 
In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available`;
    const messageStart1 = `Hey everyone, 
Welcome to the channel`

    // New state to manage the expansion of the message
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="mx-6 h-full w-full mt-6 flex flex-col gap-6">
            <div className="w-full h-auto flex flex-col">
                <div className="gap-2 flex items-center">
                    <div className="relative">
                        <Image src='/icons/profile-pic2.svg' alt="DP" width={40} height={40} />
                        <Image className="absolute right-0 bottom-0" src='/icons/winnerBatch.svg' alt="Batch" width={18} height={18} />
                    </div>
                    <span className="text-[#182230] font-semibold text-sm">Brooklyn Simmons</span>
                    <span className="font-normal text-sm text-[#475467]">3:24 PM</span>
                </div>
                <div className="ml-11 flex">
                    <div className="bg-white rounded-md border border-solid border-[#EAECF0] max-w-[400px] px-4 py-3 inline-block">
                        {/* Regular message */}
                        <span className="break-words whitespace-pre-wrap font-normal text-[#182230] text-sm ">
                            {isExpanded ? messageStart : messageStart.slice(0, 150) + '...'}
                        </span>
                        <button
                            onClick={handleToggle}
                            className="text-[#9012FF] font-semibold text-sm  ml-[2px]"
                        >
                            {isExpanded ? 'Show Less' : 'Show More'}
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-full h-auto flex flex-col">
                <div className="gap-2 flex items-center">
                    <Image
                        src="/icons/JennyWillsion.png"
                        width={36}
                        height={36}
                        alt="Others-chat-profile"
                    />
                    <span className="text-[#182230] font-semibold text-sm">Brooklyn Simmons</span>
                    <span className="font-normal text-sm text-[#475467]">Admin</span>
                    <span className="font-normal text-sm text-[#475467]">3:24 PM</span>
                </div>
                <div className="ml-11 flex">
                    <div className="bg-white rounded-md border border-solid border-[#EAECF0] max-w-[400px] px-4 py-3 inline-block">
                        {/* Regular message */}
                        <span className="break-words whitespace-pre-wrap font-normal text-[#182230] text-sm ">
                            {messageStart1}


                        </span>

                    </div>


                </div>
            </div>
        </div>
    );
}

export default ChartArea;
