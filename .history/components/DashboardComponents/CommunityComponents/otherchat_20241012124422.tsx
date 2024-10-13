"use client";
import Image from "next/image";
function ChartArea() {
    return (
        <div className="mx-6 h-full w-full mt-6">
            <div className="w-full h-auto flex flex-col">
                <div className="gap-2 flex items-center">
                    <Image
                        src="/icons/profile-pic.png"
                        width={36}
                        height={36}
                        alt="Others-chat-profile-Image"
                    />
                    <span className="text-[#182230] font-semibold text-sm">Brooklyn Simmons</span>
                    <span className="font-normal text-xs text-[#475467]">3:24 PM</span>
                </div>
                <div className="ml-11 bg-white rounded-md border border-solid border-[#EAECF0] max-w-[400px] break-words px-4 py-3 inline-flex">
                    hy
                </div>

                <div className="ml-11 bg-white rounded-md border border-solid border-[#EAECF0] max-w-[400px] break-words px-4 py-3 inline-flex">
                    hy
                </div>

            </div>
        </div>
    );
}

export default ChartArea;