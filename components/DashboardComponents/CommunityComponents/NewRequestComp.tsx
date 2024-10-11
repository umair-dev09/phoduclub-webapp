import React from "react";
import Image from "next/image";

function NewRequestComp() {
    return (

        <div className="flex flex-row justify-between w-full h-auto group">
            <div className="flex flex-row items-center gap-2">
                <div className="relative w-9 h-9">
                    <Image src='/images/new-request-img.png' alt="DP" width={43} height={43} />
                    <div className="absolute right-0 bottom-0 w-3 h-3 bg-neutral-400 rounded-full border-2 border-white group-hover:bg-green-500"></div>
                </div>
                <div className="flex flex-col justify-start">
                    <button>
                        <h2 className="text-[#182230] text-normal font-semibold hover:underline">Darlene Robertson</h2>
                    </button>
                    <p className="text-sm text-[#475467]">darlene#5412</p>
                </div>
            </div>
            <div className="flex flex-row gap-2">
                <button className="flex flex-row items-center justify-center w-1/2 bg-white rounded-md border border-[#D0D5DD] px-6 py-[10px] gap-1">
                    <Image src="/icons/multiplication-sign.svg" alt="decline user" width={18} height={18} />
                    <div className="text-sm font-semibold text-[#182230]">Decline</div>
                </button>
                <button className="flex flex-row items-center justify-center w-1/2 bg-white rounded-md border border-green-600 px-6 py-[10px] gap-1">
                    <Image src="/icons/tick-02.svg" alt="accept user" width={18} height={18} />
                    <div className="text-sm font-semibold text-green-600">Accept</div>
                </button>
            </div>
        </div>
    );
}

export default NewRequestComp;