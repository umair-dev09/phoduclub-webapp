'use client';
import Image from "next/image";
import React, { useState } from 'react';
function customerinfo() {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxClick = () => {
        setIsChecked(!isChecked);
    };
    return (
        <div className="h-screen w-full flex flex-row">
            <div className="h-full w-[68%] flex flex-col">
                <div className="h-[72px] border-b border-solid border-[#EAECF0] flex flex-row items-center px-6 bg-[#FFFFFF] justify-between">
                    <div className="flex flex-row gap-2 items-center">
                        <div className="relative">
                            <Image src="/images/DP_Lion.svg" alt="DP" width={32} height={32} />
                            <Image
                                className="absolute right-0 bottom-0"
                                src="/icons/winnerBatch.svg"
                                alt="Batch"
                                width={14}
                                height={14}
                            />
                        </div>
                        <span className="text-sm text-[#1D2939] font-semibold">Jenny Wilson</span>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <div
                            onClick={handleCheckboxClick}
                            className={`flex items-center justify-center w-4 h-4 border 
                             rounded-sm cursor-pointer 
                                   ${isChecked ? 'bg-purple border-purple' : 'bg-white border-[#D0D5DE]'}`}
                        >
                            {isChecked && (
                                <Image src="/icons/check.svg" alt="choose" width={12} height={12} />
                            )}
                        </div>

                        <span className="text-sm text-[#0C111D] font-normal">Mark as Resolved</span>
                    </div>
                </div>
                <div className="flex-col items-end ">
                    jabir
                </div>
            </div>
            <div className="w-[32%] h-full flex flex-col bg-[#FFFFFF] ml-auto overflow-y-auto border-l border-solid border-[#EAECF0]">
                <div className="h-[72px] border-b border-solid border-[#EAECF0] flex flex-row items-center px-6">
                    <p className="text-[#182230] text-base font-semibold">Details</p>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <div className="h-[192px] border-b border-solid border-[#EAECF00] p-6 w-full flex flex-col">
                        <div className="flex flex-col w-1/2">
                            jabir ali
                        </div>
                        <div className="flex flex-col w-1/2">
                            jabir ali
                        </div>
                    </div>

                </div>
            </div>
        </div>


    )
}
export default customerinfo;