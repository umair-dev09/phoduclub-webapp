'use client';
import Image from "next/image";
import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
function customerinfo() {
    const [isChecked, setIsChecked] = useState(false);

    const [selectedStatus, setSelectedStatus] = useState({
        text: "Open",
        bgColor: "#FFEFC6",
        dotColor: "#93360D",
        textColor: "#93360D"
    });

    const handleCheckboxClick = () => {
        setIsChecked(!isChecked);
    };

    // Function to handle status selection
    const handleIconSelect = (status: {
        text: string;
        bgColor: string;
        dotColor: string;
        textColor: string;
    }) => {
        setSelectedStatus(status);
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
                    <div className="h-[192px] border-b border-solid border-[#EAECF00] p-6 w-full flex flex-row items-center">
                        <div className="flex flex-col w-1/2 gap-4">
                            <span className="text-sm text-[#667085] font-normal">Status</span>
                            <span className="text-sm text-[#667085] font-normal">Assignee</span>
                            <span className="text-sm text-[#667085] font-normal">Importance</span>
                            <span className="text-sm text-[#667085] font-normal">Category</span>

                        </div>
                        <div className="flex flex-col w-1/2 gap-4">





                            <Popover placement="bottom">
                                <PopoverTrigger>
                                    <button className="flex flex-row gap-1">
                                        <div
                                            className={`py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6 w-auto`}
                                            style={{ backgroundColor: selectedStatus.bgColor }}
                                        >
                                            <span
                                                className="w-[6px] h-[6px] rounded-full"
                                                style={{ backgroundColor: selectedStatus.dotColor }}
                                            ></span>
                                            <span
                                                className="font-medium text-xs"
                                                style={{ color: selectedStatus.textColor }}
                                            >
                                                {selectedStatus.text}
                                            </span>
                                        </div>
                                        <Image
                                            src="/icons/Arrow-down-1.svg"
                                            width={20}
                                            height={20}
                                            alt="sdsds" />
                                    </button>

                                </PopoverTrigger>
                                <PopoverContent className="w-auto py-1 px-0 bg-white border border-lightGrey rounded-md">


                                    <button className="flex flex-row items-center justify-start w-full px-4 py-[0.625rem]  gap-2 hover:bg-[#F2F4F7]">
                                        <div className="bg-[#EDE4FF] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6 w-auto">
                                            <span className="w-[6px] h-[6px] bg-[#7400E0] rounded-full "></span>
                                            <span className="font-medium text-[#7400E0] text-xs">New</span>
                                        </div>
                                    </button>
                                    <button className="flex flex-row items-center justify-start w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7]">
                                        <div className="bg-[#FFEFC6] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6 w-auto">
                                            <span className="w-[6px] h-[6px] bg-[#93360D] rounded-full "></span>
                                            <span className="font-medium text-[#93360D] text-xs">Open</span>
                                        </div>
                                    </button>
                                    <button className="flex flex-row items-center justify-start w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7]">
                                        <div className="bg-[#FEE4E2] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6 w-auto">
                                            <span className="w-[6px] h-[6px] bg-[#9A221A] rounded-full "></span>
                                            <span className="font-medium text-[#9A221A] text-xs">Blocker</span>
                                        </div>
                                    </button>
                                    <button className="flex flex-row items-center justify-start w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7]">
                                        <div className="bg-[#F8E9FE] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6 w-auto">
                                            <span className="w-[6px] h-[6px] bg-[#791F89] rounded-full "></span>
                                            <span className="font-medium text-[#791F89] text-xs">Answered</span>
                                        </div>
                                    </button>
                                    <button className="flex flex-row items-center justify-start w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7]">
                                        <div className="bg-[#D3F8E0] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6 w-auto">
                                            <span className="w-[6px] h-[6px] bg-[#0A5B39] rounded-full "></span>
                                            <span className="font-medium text-[#0A5B39] text-xs">Resolved</span>
                                        </div>
                                    </button>

                                </PopoverContent>
                            </Popover>


                            <div className="flex flex-row gap-1">
                                <Image
                                    src="/icons/big-profile-pic.svg"
                                    width={20}
                                    height={20}
                                    alt="sdsds" />
                                <span className="text-sm font-medium text-[#1D2939]">Jenny Wilson</span>
                            </div>
                            <div className="flex flex-row gap-1">
                                <div className="bg-[#FEE4E2] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6 w-auto">
                                    <span className="w-[6px] h-[6px] bg-[#9A221A] rounded-full "></span>
                                    <span className="font-medium text-[#9A221A] text-xs">High</span>
                                </div>
                                <Image
                                    src="/icons/Arrow-down-1.svg"
                                    width={20}
                                    height={20}
                                    alt="sdsds" />
                            </div>
                            <div className="flex flex-row gap-1">
                                <div className="bg-[#344054] py-2 px-3  flex flex-row rounded-[6px] items-center h-6 w-auto">
                                    <span className="font-medium text-[#FFFFFF] text-xs">Scam</span>
                                </div>

                            </div>




                        </div>
                    </div>

                </div>
            </div>
        </div>


    )
}
export default customerinfo;