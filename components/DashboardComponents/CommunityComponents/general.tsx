import React from "react";
import Image from "next/image";

function General() {
    return (
        <div className="w-full h-auto">
            <div className="mb-3 px-2"><h3 className="text-base text-[#182230]">General</h3></div>
            <div className="flex flex-col gap-3">
                <button className="flex flex-row items-center justify-between pr-3 group rounded-[7px] transition-colors hover:bg-[#F8F0FF]">
                    <div className="flex flex-row items-center gap-2 p-2 ">
                        <Image src='/icons/studymaterial.png' alt="bookstack icon" width={16} height={24} />
                        <p className="text-[13px] font-semibold text-[#4B5563]">Study materials</p>
                    </div>
                    <div className="hidden flex-row items-center gap-2 transition-all group-hover:flex">
                        <Image src='/icons/notification-off-02.svg' alt="notification off" width={16} height={16} />
                        <div className="w-2 h-2 rounded-full bg-white transition-colors group-hover:bg-[#DE3024]"></div>
                    </div>
                </button>
                <button className="flex flex-row items-center justify-between pr-3 group rounded-[7px] transition-colors hover:bg-[#F8F0FF]">
                    <div className="flex flex-row items-center gap-2 p-2">
                        <Image src='/icons/QuizTalk.png' width={16} height={24} alt="bookstack icon" />
                        <p className="text-[13px] font-semibold text-[#4B5563]">Quiz talk</p>
                    </div>
                    <div className="hidden flex-row items-center gap-2 transition-all group-hover:flex">
                        <Image src='/icons/notification-off-02.svg' alt="notification off" width={16} height={16} />
                        <div className="w-2 h-2 rounded-full bg-white transition-colors group-hover:bg-[#DE3024]"></div>
                    </div>
                </button>
            </div>
        </div>
    );
}

export default General;