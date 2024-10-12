"use client";
import Image from "next/image";

function ChartArea() {
    const messageStart = `Hey @everyone 
    this is jabir ali talking to you from the Amity `;


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
                        {/* Regular message */}
                        <span className="break-words whitespace-pre-wrap font-normal text-[#182230] text-sm ">
                            {messageStart}
                        </span>


                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChartArea;
