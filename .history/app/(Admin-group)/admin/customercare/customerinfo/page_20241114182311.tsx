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
            <div className="w-[32%] h-full flex flex-col bg-[#FFFFFF] overflow-y-auto border-l border-solid border-[#EAECF0]">
                <div className="h-[72px] border-b border-solid border-[#EAECF0] flex flex-row items-center px-6">
                    <p className="text-[#182230] text-base font-semibold">Details</p>
                </div>
                <div className="flex-1 overflow-y-auto h-auto ">
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
                                    <button className="flex flex-row gap-1  focus:outline-none">
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


                                    <button className="flex flex-row items-center justify-start w-full px-4 py-[0.625rem]  gap-2 hover:bg-[#F2F4F7]"
                                        onClick={() =>
                                            handleIconSelect({
                                                text: "New",
                                                bgColor: "#EDE4FF",
                                                dotColor: "#7400E0",
                                                textColor: "#7400E0",
                                            })
                                        }
                                    >
                                        <div className="bg-[#EDE4FF] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6 w-auto">
                                            <span className="w-[6px] h-[6px] bg-[#7400E0] rounded-full "></span>
                                            <span className="font-medium text-[#7400E0] text-xs">New</span>
                                        </div>
                                    </button>
                                    <button className="flex flex-row items-center justify-start w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7]"
                                        onClick={() =>
                                            handleIconSelect({
                                                text: "Open",
                                                bgColor: "#FFEFC6",
                                                dotColor: "#93360D",
                                                textColor: "#93360D",
                                            })
                                        }
                                    >
                                        <div className="bg-[#FFEFC6] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6 w-auto">
                                            <span className="w-[6px] h-[6px] bg-[#93360D] rounded-full "></span>
                                            <span className="font-medium text-[#93360D] text-xs">Open</span>
                                        </div>
                                    </button>
                                    <button className="flex flex-row items-center justify-start w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7]"
                                        onClick={() =>
                                            handleIconSelect({
                                                text: "Blocker",
                                                bgColor: "#FEE4E2",
                                                dotColor: "#9A221A",
                                                textColor: "#9A221A",
                                            })
                                        }
                                    >
                                        <div className="bg-[#FEE4E2] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6 w-auto">
                                            <span className="w-[6px] h-[6px] bg-[#9A221A] rounded-full "></span>
                                            <span className="font-medium text-[#9A221A] text-xs">Blocker</span>
                                        </div>
                                    </button>
                                    <button className="flex flex-row items-center justify-start w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7]"
                                        onClick={() =>
                                            handleIconSelect({
                                                text: "Answered",
                                                bgColor: "#F8E9FE",
                                                dotColor: "#791F89",
                                                textColor: "#791F89",
                                            })
                                        }
                                    >
                                        <div className="bg-[#F8E9FE] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6 w-auto">
                                            <span className="w-[6px] h-[6px] bg-[#791F89] rounded-full "></span>
                                            <span className="font-medium text-[#791F89] text-xs">Answered</span>
                                        </div>
                                    </button>
                                    <button className="flex flex-row items-center justify-start w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7]"
                                        onClick={() =>
                                            handleIconSelect({
                                                text: "Resolved",
                                                bgColor: "#D3F8E0",
                                                dotColor: "#0A5B39",
                                                textColor: "#0A5B39",
                                            })
                                        }
                                    >
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
                            <Popover placement="bottom">
                                <PopoverTrigger>
                                    <button className="flex flex-row gap-1  focus:outline-none">
                                        <div className="bg-[#FEE4E2] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6 w-auto">
                                            <span className="w-[6px] h-[6px] bg-[#9A221A] rounded-full "></span>
                                            <span className="font-medium text-[#9A221A] text-xs">High</span>
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
                                        <div className="bg-[#F2F4F7] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6 w-auto">
                                            <span className="w-[6px] h-[6px] bg-[#182230] rounded-full "></span>
                                            <span className="font-medium text-[#182230] text-xs">Low</span>
                                        </div>
                                    </button>
                                    <button className="flex flex-row items-center justify-start w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7]">
                                        <div className="bg-[#FFEFC6] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6 w-auto">
                                            <span className="w-[6px] h-[6px] bg-[#93360D] rounded-full "></span>
                                            <span className="font-medium text-[#93360D] text-xs">Medium</span>
                                        </div>
                                    </button>
                                    <button className="flex flex-row items-center justify-start w-full px-4 py-[0.625rem]  gap-2 hover:bg-[#F2F4F7]">
                                        <div className="bg-[#FEE4E2] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6 w-auto">
                                            <span className="w-[6px] h-[6px] bg-[#9A221A] rounded-full "></span>
                                            <span className="font-medium text-[#9A221A] text-xs">High</span>
                                        </div>
                                    </button>
                                </PopoverContent>
                            </Popover>

                            <div className="flex flex-row gap-1">
                                <div className="bg-[#344054] py-2 px-3  flex flex-row rounded-[6px] items-center h-6 w-auto">
                                    <span className="font-medium text-[#FFFFFF] text-xs">Scam</span>
                                </div>

                            </div>




                        </div>
                    </div>
                    <div className="h-auto border-b border-solid border-[#EAECF0] p-6">
                        <h1 className="text-[#182230] text-lg font-semibold">User Details</h1>
                        <div className="h-auto  w-full grid grid-cols-2 gap-x-4 gap-y-4 items-start pt-6">
                            {/* Labels and Values */}
                            <span className="text-sm text-[#667085] font-normal">Name</span>
                            <span className="text-sm font-medium text-[#1D2939]">Jenny Wilson</span>

                            <span className="text-sm text-[#667085] font-normal">User ID</span>
                            <span className="text-sm font-medium text-[#1D2939]">#jenny5215</span>

                            <span className="text-sm text-[#667085] font-normal">Preparing Exams</span>
                            <div className="flex flex-wrap flex-row gap-2">
                                <div className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 font-medium border border-solid border-[#D0D5DD] rounded-full hover:bg-gray-100">
                                    <span className="w-2 h-2 rounded-full bg-red-500"></span> JEE
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-[#344054] font-medium border border-solid border-[#D0D5DD] rounded-full hover:bg-gray-100">
                                    <span className="w-2 h-2 rounded-full bg-orange-500"></span> BITSAT
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 font-medium border border-solid border-[#D0D5DD] rounded-full hover:bg-gray-100">
                                    <span className="w-2 h-2 rounded-full bg-green-500"></span> VITEEE
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 font-medium border border-solid border-[#D0D5DD] rounded-full hover:bg-gray-100">
                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span> SRMJEEE
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 font-medium border border-solid border-[#D0D5DD] rounded-full hover:bg-gray-100">
                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span> KCET
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 font-medium border border-solid border-[#D0D5DD] rounded-full hover:bg-gray-100">
                                    <span className="w-2 h-2 rounded-full bg-red-500"></span> COMEDK
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 font-medium border border-solid border-[#D0D5DD] rounded-full hover:bg-gray-100">
                                    <span className="w-2 h-2 rounded-full bg-orange-500"></span> MET
                                </div>
                            </div>

                            {/* Target Year Section */}
                            <span className="text-sm text-[#667085] font-normal">Target Year</span>
                            <div className="flex flex-wrap gap-2">
                                <div className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 font-medium border border-solid border-[#D0D5DD] rounded-full cursor-pointer hover:bg-gray-100">
                                    <span className="w-2 h-2 rounded-full bg-red-500"></span> 2024
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-[#344054] font-medium  border border-solid border-[#D0D5DD] rounded-full cursor-pointer hover:bg-gray-100">
                                    <span className="w-2 h-2 rounded-full bg-orange-500"></span> 2025
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 font-medium border border-solid border-[#D0D5DD] rounded-full cursor-pointer hover:bg-gray-100">
                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span> 2026
                                </div>

                            </div>
                        </div>
                    </div>


                    <div className="p-6 h-auto">
                        <h1 className="text-[#182230] text-lg font-semibold">Recent Conversation</h1>
                        <div className="flex flex-col gap-4 pt-6">
                            <div className="flex flex-row items-center gap-1 justify-between">
                                <div className="flex flex-row gap-3">
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
                                    <div className="flex flex-col gap-1">
                                        <span className="font-medium text-sm text-[#344054]">I am scammed in the group</span>
                                        <span className="text-xs text-[#667085] font-medium">Today</span>
                                    </div>
                                </div>
                                <div className="bg-[#FFEFC6] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6 w-auto">
                                    <span className="w-[6px] h-[6px] bg-[#93360D] rounded-full "></span>
                                    <span className="font-medium text-[#93360D] text-xs">Open</span>
                                </div>

                            </div>

                            <div className="flex flex-row items-center gap-1 justify-between">
                                <div className="flex flex-row gap-3">
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
                                    <div className="flex flex-col gap-1">
                                        <span className="font-medium text-sm text-[#344054]">Thanks for your help!</span>
                                        <span className="text-xs text-[#667085] font-medium">5 months ago</span>
                                    </div>
                                </div>
                                <div className="bg-[#D3F8E0] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6 w-auto">
                                    <span className="w-[6px] h-[6px] bg-[#0A5B39] rounded-full "></span>
                                    <span className="font-medium text-[#0A5B39] text-xs">Resolved</span>
                                </div>

                            </div>
                            <div className="flex flex-row items-center gap-1 justify-between">
                                <div className="flex flex-row gap-3">
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
                                    <div className="flex flex-col gap-1">
                                        <span className="font-medium text-sm text-[#344054]">This works. Thanks!</span>
                                        <span className="text-xs text-[#667085] font-medium">1 year ago</span>
                                    </div>
                                </div>
                                <div className="bg-[#D3F8E0] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6 w-auto">
                                    <span className="w-[6px] h-[6px] bg-[#0A5B39] rounded-full "></span>
                                    <span className="font-medium text-[#0A5B39] text-xs">Resolved</span>
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