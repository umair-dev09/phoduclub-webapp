import React from "react";
import Image from "next/image";

function General() {
    return (
        <div className="w-full h-auto">
            <div className="mb-3 px-[6px]"><h3 className="text-base text-[#182230]">General</h3></div>
            <div className="flex flex-col gap-3">
                <div className="flex flex-row items-center justify-between pr-3 group rounded-[7px] transition-colors hover:bg-[#F8F0FF]">
                    <div className="flex flex-row items-center gap-2 p-[6px] ">
                        <Image src='/icons/studymaterial.png' alt="bookstack icon" width={16} height={24} />
                        <p className="text-[13px] font-semibold text-[#4B5563]">Study materials</p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-white transition-colors group-hover:bg-[#DE3024]"></div>
                </div>
                <div className="flex flex-row items-center justify-between pr-3 group rounded-[7px] transition-colors hover:bg-[#F8F0FF]">
                    <div className="flex flex-row items-center gap-2 p-[6px]">
                        <Image src='/icons/QuizTalk.png' width={16} height={24} alt="bookstack icon" />
                        <p className="text-[13px] font-semibold text-[#4B5563]">Quiz talk</p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-white transition-colors group-hover:bg-[#DE3024]"></div>
                </div>
            </div>
        </div>
    );
}

export default General;