import React from "react";
import Image from "next/image";

function General() {
    return (
        <div className="w-full h-auto">
            <div className="mb-3 px-[6px]"><h3 className="text-base text-[#182230]">General</h3></div>
            <div className="flex flex-col gap-3">
                <div className="flex flex-row items-center gap-2 p-[6px] rounded-[7px] transition-colors hover:bg-[#F8F0FF]">
                    <Image src='/icons/studymaterial.png' alt="bookstack icon" width={16} height={24} />
                    <p className="text-[13px] font-semibold text-[#4B5563]">Study materials</p>
                </div>
                <div className="flex flex-row items-center gap-2 p-[6px] rounded-[7px] transition-colors hover:bg-[#F8F0FF]">
                    <Image src='/icons/QuizTalk.png' width={16} height={24} alt="bookstack icon" />
                    <p className="text-[13px] font-semibold text-[#4B5563]">Quiz talk</p>
                </div>
            </div>
        </div>
    );
}

export default General;