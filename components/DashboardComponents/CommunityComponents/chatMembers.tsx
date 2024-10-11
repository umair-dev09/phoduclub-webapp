import React from "react";
import Image from "next/image";

function ChatMembers() {
    return (
        <div className="flex flex-row items-center justify-between w-full h-auto my-1 px-2 py-[6px] bg-white rounded-[7px] group hover:bg-[#F8F0FF]">
            <div className="flex flex-row items-center gap-2">
                <div className="relative w-9 h-9">
                    <Image src='/images/DP.png' alt="DP" width={36} height={36} />
                    <div className="absolute right-0 bottom-0 w-3 h-3 bg-neutral-400 rounded-full border-2 border-white group-hover:bg-green-500"></div>
                </div>
                <p className="text-[#4B5563] text-[13px] font-medium">Darlene Robertson</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-white transition-colors group-hover:bg-[#DE3024]"></div>
        </div>
    );
}

export default ChatMembers;