'use client';
import Image from "next/image";
import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
function customerinfo() {
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxClick = () => {
        setIsChecked(!isChecked);
    };
    // State to track the selected icon
    const [selectedIcon, setSelectedIcon] = useState("open");

    // Function to handle icon selection
    const handleIconSelect = (iconPath: React.SetStateAction<string>) => {
        setSelectedIcon(iconPath); // Update the selected icon state
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
                                    <div className="flex flex-row gap-1">
                                        <div className="bg-[#FFEFC6] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6 w-auto">
                                            <span className="w-[6px] h-[6px] bg-[#93360D] rounded-full "></span>
                                            <span className="font-medium text-[#93360D] text-xs">Open</span>
                                        </div>
                                        <Image
                                            src="/icons/Arrow-down-1.svg"
                                            width={20}
                                            height={20}
                                            alt="sdsds" />
                                    </div>

                                </PopoverTrigger>
                                <PopoverContent className="w-[10.438rem] py-1 px-0 bg-white border border-lightGrey rounded-md">
                                    <div className="w-full">
                                        <button className="flex flex-row items-center justify-start w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7]">
                                            <Image src="/icons/edit-02.svg" width={18} height={18} alt="edit" />
                                            <span className="text-sm text-[#0C111D] font-normal">Edit details</span>
                                        </button>
                                        <button className=" flex flex-row items-center justify-start w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7]"
                                        >
                                            <Image src='/icons/delete.svg' alt="user profile" width={18} height={18} />
                                            <p className="text-sm text-[#DE3024] font-normal">Remove</p>
                                        </button>
                                    </div>
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