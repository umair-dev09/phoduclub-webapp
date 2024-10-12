"use client";
import Image from "next/image";

function ChartArea() {
    const messageStart = "hy";
    const specialText = "@everyone";

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
                        <span className="break-words whitespace-pre-wrap font-normal text-[#182230] text-sm">
                            {messageStart}
                        </span>

                        {/* Special styled "@everyone" */}
                        <span
                            className="text-[#C74FE6] font-poppins text-sm font-semibold "
                        >
                            {specialText}
                        </span>

                        {/* Custom message after */}
                        <span className="break-words whitespace-pre-wrap font-normal text-[#182230] text-sm">

                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChartArea;
