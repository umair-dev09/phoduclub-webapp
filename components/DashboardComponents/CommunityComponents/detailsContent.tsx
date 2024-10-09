import React from "react";
import Image from "next/image";

function DetailsContent() {
    return (
        <div className="px-6">
            <div className="h-auto">
                <div className="flex flex-row items-center my-1 gap-2">
                    <div className="relative w-9 h-9 group">
                        <Image src='/images/DP.png' alt="DP" width={36} height={36} />
                        <div className="absolute right-0 bottom-0 w-3 h-3 bg-neutral-400 rounded-full border-2 border-white group-hover:bg-green-500"></div>
                    </div>
                    <p className="text-[#4B5563] text-[13px] font-medium">Darlene Robertson</p>
                </div>
            </div>
        </div>
    );
}

export default DetailsContent;