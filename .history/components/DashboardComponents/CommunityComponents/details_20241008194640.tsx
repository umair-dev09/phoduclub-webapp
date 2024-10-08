import React from "react";
import Image from "next/image";

function Details() {
    return (
        <div className="mt-6">
            <div className="h-auto">
                <div className="flex flex-row justify-between mb-3">
                    <h3 className="text-[#182230]">Admin</h3>
                    <div className="flex justify-center items-center w-6 h-6 bg-[#F7F8FB] border border-[#D4D9E9] rounded-sm text-xs text-[#4B5563]">1</div>
                </div>
                <div className="flex flex-row items-center my-1 gap-2">
                    <div className="relative w-9 h-9 group">
                        <Image src='/images/DP.png' alt="DP" width={36} height={36} />
                        <div className="absolute right-0 bottom-0 w-3 h-3 bg-neutral-400 rounded-full border-2 border-white group-hover:bg-green-500"></div>
                    </div>
                    <p className="text-[#4B5563] text-[13px] font-medium">Darlene Robertson</p>
                </div>
            </div>
            <div className="h-auto">
                <div className="flex flex-row justify-between mb-3">
                    <h3 className="text-[#182230]">Admin</h3>
                    <div className="flex justify-center items-center w-6 h-6 bg-[#F7F8FB] border border-[#D4D9E9] rounded-sm text-xs text-[#4B5563]">1</div>
                </div>
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

export default Details;