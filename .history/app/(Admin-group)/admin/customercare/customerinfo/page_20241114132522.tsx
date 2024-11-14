'use client';
import Image from "next/image";
import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";

function CustomerInfo() {
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
                </div>
            </div>

            <div className="w-[32%] h-full flex flex-col bg-[#FFFFFF] ml-auto overflow-y-auto border-l border-solid border-[#EAECF0]">
                <div className="h-[72px] border-b border-solid border-[#EAECF0] flex flex-row items-center px-6">
                    <p className="text-[#182230] text-base font-semibold">Details</p>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
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
                                    alt="arrow down"
                                />
                            </button>
                        </PopoverTrigger>

                        <PopoverContent className="w-auto py-1 px-0 bg-white border border-lightGrey rounded-md">
                            <button
                                className="flex flex-row items-center justify-start w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7]"
                                onClick={() =>
                                    handleIconSelect({
                                        text: "New",
                                        bgColor: "#EDE4FF",
                                        dotColor: "#7400E0",
                                        textColor: "#7400E0",
                                    })
                                }
                            >
                                <div className="flex flex-row rounded-[6px] items-center h-6 w-auto">
                                    <span className="w-[6px] h-[6px] bg-[#7400E0] rounded-full"></span>
                                    <span className="font-medium text-[#7400E0] text-xs">New</span>
                                </div>
                            </button>

                            <button
                                className="flex flex-row items-center justify-start w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7]"
                                onClick={() =>
                                    handleIconSelect({
                                        text: "Open",
                                        bgColor: "#FFEFC6",
                                        dotColor: "#93360D",
                                        textColor: "#93360D",
                                    })
                                }
                            >
                                <div className="flex flex-row rounded-[6px] items-center h-6 w-auto">
                                    <span className="w-[6px] h-[6px] bg-[#93360D] rounded-full"></span>
                                    <span className="font-medium text-[#93360D] text-xs">Open</span>
                                </div>
                            </button>

                            <button
                                className="flex flex-row items-center justify-start w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7]"
                                onClick={() =>
                                    handleIconSelect({
                                        text: "Blocker",
                                        bgColor: "#FEE4E2",
                                        dotColor: "#9A221A",
                                        textColor: "#9A221A",
                                    })
                                }
                            >
                                <div className="flex flex-row rounded-[6px] items-center h-6 w-auto">
                                    <span className="w-[6px] h-[6px] bg-[#9A221A] rounded-full"></span>
                                    <span className="font-medium text-[#9A221A] text-xs">Blocker</span>
                                </div>
                            </button>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    );
}

export default CustomerInfo;
