'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";


function Chatinfo() {
    const [text, setText] = useState("");
    const [height, setHeight] = useState("32px");
    const [isDetailsVisible, setIsDetailsVisible] = useState(true);

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        setText(e.target.value);

        e.target.style.height = "32px";
        const newHeight = e.target.scrollHeight <= 120 ? e.target.scrollHeight : 120;
        e.target.style.height = `${newHeight}px`;

        setHeight(newHeight < 120 ? "32px" : "120px");
    };



    return (
        <div className="grid grid-cols-[16.875rem_1fr_auto] w-full h-full">
            {/* Sidebar */}
            <div className="grid grid-rows-[4.5rem_1fr] w-full bg-white border-r border-lightGrey">
                <div className="flex flex-row items-center justify-between group gap-2 border-b border-lightGrey">
                    <div className='flex flex-row gap-2'>
                        <div className="rounded-full w-[44px] h-[44px] bg-[#C0EAFF] items-center flex justify-center border-2 border-solid border-[#FFFFFF]">
                            <h1 className="text-[#124B68] text-base font-bold">J</h1>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='font-semibold text-normal text-sm'>JEE - 2024</p>

                        </div>
                    </div>

                </div>
                <div className="flex flex-col p-4 gap-2">
                    {["Admin Only", "Marketing", "Sales", "Customer Support"].map((item, idx) => (
                        <button
                            key={idx}
                            className="flex flex-row w-full px-2 py-[0.375rem] gap-2 rounded-[0.438rem] transition-colors duration-200 hover:bg-[#F8F0FF]"
                        >
                            <div>{["😎", "📢", "📊", "🎧"][idx]}</div>
                            <p className="text-[0.813rem] text-[#4B5563] font-semibold leading-6">{item}</p>
                        </button>
                    ))}
                    <button className='flex flex-row items-center justify-center w-full px-2 py-[0.375rem] gap-2 border border-lightGrey rounded-full'>
                        <Image src='/icons/plus-dark.svg' alt='create channel' width={18} height={18} />
                        <p className='text-[0.813rem] text-[#182230] font-semibold leading-6'>Create Channel</p>
                    </button>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="grid grid-rows-[4.5rem_1fr_auto] w-full">
                <div className="flex flex-row items-center justify-between px-6 bg-white border-b border-lightGrey">
                    <div className="flex flex-row gap-2">
                        <div>📢</div>
                        <h4 className="text-base text-[#182230] font-semibold leading-[1.26rem]">Marketing</h4>
                    </div>
                    <div className="flex flex-row gap-4">
                        <button>
                            <Image src="/icons/search.svg" alt="search" width={18} height={18} />
                        </button>
                        <button onClick={() => setIsDetailsVisible(!isDetailsVisible)}>
                            <Image src="/icons/collapseDetails.svg" alt="collapse" width={24} height={24} />
                        </button>
                    </div>
                </div>
                <div className="shadow-[0_8px_32px_0_rgba(0,0,0,0.02)]"></div>
                <div className="flex flex-row items-center min-h-[6.25rem] px-6 py-6 gap-2 bg-white">
                    <div className="border border-solid bg-[#FCFCFD] border-[#D0D5DD] h-auto w-full rounded-md flex flex-row items-center p-2 justify-between">
                        <textarea
                            placeholder="Type your message here..."
                            className="w-full max-h-[120px] bg-[#FCFCFD] overflow-y-auto resize-none px-3 rounded-md outline-none font-normal text-sm leading-tight pt-[5px]"
                            style={{ height: height }}
                            value={text}
                            onChange={handleInput}
                        />
                        <Popover placement="bottom">
                            <PopoverTrigger>
                                <button className="transition-colors hover:bg-neutral-100 hover:rounded-[100px] focus:outline-none">
                                    <Image src="/icons/files.svg" alt="attachment icon" width={21} height={21} />
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto py-1 px-0 bg-white border border-lightGrey rounded-md">
                                {["Image", "Video", "Documents"].map((item, idx) => (
                                    <button
                                        key={idx}
                                        className="flex flex-row items-center justify-start w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7]"
                                    >
                                        <Image
                                            src={`/icons/${item.toLowerCase()}-icon.svg`}
                                            alt={`${item} icon`}
                                            width={20}
                                            height={20}
                                        />
                                        <span className="font-normal text-[#0C111D] text-sm">{item}</span>
                                    </button>
                                ))}
                            </PopoverContent>
                        </Popover>
                    </div>
                    <button disabled={!text.trim()}>
                        <Image
                            src={text.trim() ? "/icons/sendCommunity.svg" : "/icons/send.svg"}
                            alt="send icon"
                            width={24}
                            height={24}
                        />
                    </button>
                </div>
            </div>

            {/* Collapsible Details Section */}
            <div
                className={`h-full transition-all duration-500 ease-in-out overflow-hidden ${isDetailsVisible ? "max-w-[16.875rem]" : "max-w-0"
                    }`}
                style={{
                    width: isDetailsVisible ? "16.875rem" : "0",
                }}
            >
                <div className="grid grid-rows-[4.5rem_1fr] w-full h-full bg-white border-l border-lightGrey">
                    <div className="flex flex-row items-center justify-between px-4 border-b border-lightGrey">
                        <h4 className="text-base text-[#182230] font-semibold leading-[1.26rem]">Details</h4>
                        <div className="flex flex-row items-center gap-1">
                            <Image src="/icons/membersIcon.svg" alt="members" width={18} height={18} />
                            <p className="flex items-center text-sm text-[#4B5563] font-normal leading-6">6</p>
                        </div>
                    </div>
                    <div className="flex flex-col p-4 gap-4">
                        <div className="flex flex-col px-2 gap-2 overflow-auto">
                            <div className="flex flex-row justify-between whitespace-nowrap">
                                <h4 className="text-base text-[#182230] font-semibold leading-6">Admin</h4>
                                <p className="flex items-center justify-center w-6 h-6 text-xs text-[#4B5563] font-normal bg-[#F7F8FB] border border-lightGrey rounded-sm">
                                    1
                                </p>
                            </div>
                            <div className="flex flex-col gap-4">
                                {["Darlene Robertson"].map((name, idx) => (
                                    <div
                                        key={idx}
                                        className="flex flex-row items-center group py-1 gap-2 whitespace-nowrap"
                                    >
                                        {/* Profile Picture Container */}
                                        <div className="relative flex-shrink-0 w-9 h-9">
                                            <Image
                                                className="rounded-full"
                                                src="/images/DP.png"
                                                alt="dp"
                                                width={36}
                                                height={36}
                                            />
                                            {/* Status Indicator */}
                                            <div className="absolute right-0 bottom-0 w-3 h-3 bg-[#98A2B3] border-2 border-white rounded-full transition-colors duration-150 group-hover:bg-[#17B26A]"></div>
                                        </div>
                                        <p className="text-[0.813rem] text-[#4B5563] font-medium leading-6 whitespace-nowrap">{name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col px-2 gap-2 overflow-auto">
                            <div className="flex flex-row justify-between whitespace-nowrap">
                                <h4 className="text-base text-[#182230] font-semibold leading-6">Chief Moderator</h4>
                                <p className="flex items-center justify-center w-6 h-6 text-xs text-[#4B5563] font-normal bg-[#F7F8FB] border border-lightGrey rounded-sm">
                                    1
                                </p>
                            </div>
                            <div className="flex flex-col gap-4">
                                {["Darlene Robertson"].map((name, idx) => (
                                    <div
                                        key={idx}
                                        className="flex flex-row items-center group py-1 gap-2 whitespace-nowrap"
                                    >
                                        {/* Profile Picture Container */}
                                        <div className="relative flex-shrink-0 w-9 h-9">
                                            <Image
                                                className="rounded-full"
                                                src="/images/DP.png"
                                                alt="dp"
                                                width={36}
                                                height={36}
                                            />
                                            {/* Status Indicator */}
                                            <div className="absolute right-0 bottom-0 w-3 h-3 bg-[#98A2B3] border-2 border-white rounded-full transition-colors duration-150 group-hover:bg-[#17B26A]"></div>
                                        </div>
                                        <p className="text-[0.813rem] text-[#4B5563] font-medium leading-6 whitespace-nowrap">{name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col px-2 gap-2 overflow-auto">
                            <div className="flex flex-row justify-between whitespace-nowrap">
                                <h4 className="text-base text-[#182230] font-semibold leading-6">Teachers</h4>
                                <p className="flex items-center justify-center w-6 h-6 text-xs text-[#4B5563] font-normal bg-[#F7F8FB] border border-lightGrey rounded-sm">
                                    4
                                </p>
                            </div>
                            <div className="flex flex-col gap-4">
                                {["Darlene Robertson", "John Doe", "Jane Cooper", "Devon Lane"].map((name, idx) => (
                                    <div
                                        key={idx}
                                        className="flex flex-row items-center group py-1 gap-2 whitespace-nowrap"
                                    >
                                        {/* Profile Picture Container */}
                                        <div className="relative flex-shrink-0 w-9 h-9">
                                            <Image
                                                className="rounded-full"
                                                src="/images/DP.png"
                                                alt="dp"
                                                width={36}
                                                height={36}
                                            />
                                            {/* Status Indicator */}
                                            <div className="absolute right-0 bottom-0 w-3 h-3 bg-[#98A2B3] border-2 border-white rounded-full transition-colors duration-150 group-hover:bg-[#17B26A]"></div>
                                        </div>
                                        <p className="text-[0.813rem] text-[#4B5563] font-medium leading-6 whitespace-nowrap">{name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Chatinfo;