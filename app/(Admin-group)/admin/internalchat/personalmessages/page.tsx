'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { useRouter } from 'next/navigation';

function PersonalMessages() {
    const [text, setText] = useState("");
    const [height, setHeight] = useState("32px");
    const [isDetailsVisible, setIsDetailsVisible] = useState(true);
    const router = useRouter();

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        setText(e.target.value);

        e.target.style.height = "32px";
        const newHeight = e.target.scrollHeight <= 120 ? e.target.scrollHeight : 120;
        e.target.style.height = `${newHeight}px`;

        setHeight(newHeight < 120 ? "32px" : "120px");
    };

    return (
        <div className="grid grid-cols-[16.875rem_1fr] w-full">
            {/* Sidebar */}
            <div className="grid grid-rows-[4.5rem_1fr] w-full bg-white border-r border-lightGrey">
                <div className="flex flex-row items-center justify-center group gap-2 border-b border-lightGrey">
                    <div className="flex items-center justify-center w-[2.75rem] h-[2.75rem] bg-[#C74FE6] rounded-full">
                        <Image src="/icons/messageIcon.svg" alt="messages" width={18} height={18} />
                    </div>
                    <h4 className="text-sm text-[#182230] font-semibold leading-[1.103rem]">
                        Personal Messages
                    </h4>
                    <p className="flex items-center justify-center min-w-6 h-6 p-[0.375rem] opacity-0 text-xs text-white font-medium bg-[#DE3024] rounded-full transition-opacity duration-150 group-hover:opacity-100">
                        6
                    </p>
                </div>
                <div className="flex flex-col p-4 gap-2">
                    <button className='flex flex-row items-center gap-2'
                        onClick={() => router.back()}
                    >
                        <Image src='/icons/collapse-left-02.svg' alt='back' width={20} height={20} />
                        <h4 className='text-base text-[#182230] font-semibold leading-6'>General Chat</h4>
                    </button>
                    {["Leslie Alexander", "Brooklyn Simmons", "Marvin McKinney", "Kathryn Murphy"].map((name, idx) => (
                        <button
                            key={idx}
                            className="group w-full py-[0.375rem] gap-2 rounded-[0.438rem] transition-colors duration-200 hover:bg-[#F8F0FF]"
                        >
                            <div className='flex flex-row items-center justify-between px-2'>
                                <div
                                    key={idx}
                                    className="flex flex-row items-center group gap-1 whitespace-nowrap"
                                >
                                    {/* Profile Picture Container */}
                                    <div className="relative flex-shrink-0 w-8 h-8">
                                        <Image
                                            className="rounded-full"
                                            src="/images/DP.png"
                                            alt="dp"
                                            width={32}
                                            height={32}
                                        />
                                        {/* Status Indicator */}
                                        <div className="absolute right-0 bottom-0 w-3 h-3 bg-[#98A2B3] border-2 border-white rounded-full transition-colors duration-150 group-hover:bg-[#17B26A]"></div>
                                    </div>
                                    <p className="text-[0.813rem] text-[#4B5563] font-medium leading-6 whitespace-nowrap">{name}</p>
                                </div>
                                <div className='w-2 h-2 bg-[#DE3024] rounded-full transition-opacity duration-150 opacity-0 group-hover:opacity-100'></div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="grid grid-rows-[4.5rem_1fr_auto] w-full">
                <div className="flex flex-row items-center px-6 gap-2 bg-white border-b border-lightGrey">
                    <div>📢</div>
                    <h4 className="text-base text-[#182230] font-semibold leading-[1.26rem]">Marketing</h4>
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
        </div>
    );
}

export default PersonalMessages;