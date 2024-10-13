import React from "react";
import Image from "next/image";
import { PopoverContent, PopoverTrigger, Popover } from '@nextui-org/popover';
import { useState, useRef, useEffect, forwardRef } from "react";


function OwnChat() {

    const [activeButtonIndex, setActiveButtonIndex] = useState<number | null>(null); // Use a single index to track the active button

    const handleClick = (index: number) => {
        setActiveButtonIndex(index); // Set the clicked button as active
    };

    return (
        <div className="mx-6 h-full my-6 flex flex-col gap-6">
            FIRST MESSAGE
            <div className="flex flex-col items-end w-full text-white">
                <div className="text-xs text-neutral-600 mb-2">3:24 PM</div>
                <div className="flex flex-row items-center justify-end gap-3 w-full group">

                    <Popover
                        placement="bottom-end"
                    >
                        <PopoverTrigger>
                            <button
                                className='w-[48px] h-[26px] rounded-[54px] border border-solid border-[#6770A9]  hover:bg-[#D0D5DD] hidden items-center justify-center focus:outline-none bg-[#F2F4F7] ml-1 transition-all group-hover:flex'
                            >
                                <Image
                                    src="/icons/arrow-down.svg"
                                    width={12}
                                    height={12}
                                    alt="Arrow-down"
                                    className="mr-1"
                                />
                                <Image
                                    src="/icons/smile.svg"
                                    width={16}
                                    height={16}
                                    alt="Smile"
                                />
                            </button>
                        </PopoverTrigger>

                        <PopoverContent>
                            <div
                                className='flex flex-col bg-[#FFFFFF] w-auto h-auto border border-[#EAECF0] rounded-md'
                                style={{
                                    boxShadow: '0px 4px 6px -2px rgba(16, 24, 40, 0.08), 0px 12px 16px -4px rgba(16, 24, 40, 0.14)',
                                }}>
                                {/* Emoji list */}
                                <div className="flex flex-row border-b border-solid border-[#EAECF0] gap-3 items-center w-30 px-4 py-[10px] transition-colors hover:bg-neutral-100 rounded-tr-md rounded-tl-md">
                                    <button>
                                        <Image
                                            src="/icons/emoji-1.png"
                                            width={20}
                                            height={20}
                                            alt="thumbs-emoji"
                                        />
                                    </button>
                                    <button>
                                        <Image
                                            src="/icons/emoji-2.png"
                                            width={20}
                                            height={20}
                                            alt="Heart-emoji"
                                        />
                                    </button>
                                    <button>
                                        <Image
                                            src="/icons/emoji-3.png"
                                            width={20}
                                            height={20}
                                            alt="laugh-emoji"
                                        />
                                    </button>
                                    <button>
                                        <Image
                                            src="/icons/emoji-4.png"
                                            width={20}
                                            height={20}
                                            alt="smile-face with heart-emoji"
                                        />
                                    </button>
                                    <button>
                                        <Image
                                            src="/icons/emoji-5.png"
                                            width={20}
                                            height={20}
                                            alt="ohh-reaction-emoji"
                                        />
                                    </button>
                                    <button>
                                        <Image
                                            src="/icons/plus-icon.svg"
                                            width={20}
                                            height={20}
                                            alt="thumbs-emoji"
                                        />
                                    </button>
                                </div>

                                {/* Other options */}
                                <button className='flex flex-row items-center gap-2 w-30 px-4 py-[10px] transition-colors hover:bg-neutral-100'>
                                    <Image src='/icons/Reply.svg' alt='search icon' width={15} height={15} />
                                    <span className='font-normal text-[#0C111D] text-sm'>Reply</span>
                                </button>
                                <button className='flex flex-row items-center gap-2 w-30 px-4 py-[10px] transition-colors hover:bg-neutral-100'>
                                    <Image src='/icons/copy.svg' alt='search icon' width={20} height={20} />
                                    <span className='font-normal text-[#0C111D] text-sm'>Copy</span>
                                </button>
                                <button className='flex flex-row items-center gap-2 w-30 px-4 py-[10px] transition-colors hover:bg-neutral-100'>
                                    <Image src='/icons/Bookmark.svg' alt='search icon' width={20} height={20} />
                                    <span className='font-normal text-[#0C111D] text-sm'>Bookmark</span>
                                </button>
                                <button className='flex flex-row items-center gap-2 w-30 px-4 py-[10px] transition-colors hover:bg-neutral-100 rounded-br-md rounded-bl-md'>
                                    <Image src='/icons/Report.svg' alt='search icon' width={20} height={20} />
                                    <span className='font-normal text-[#0C111D] text-sm'>Report Message</span>
                                </button>
                            </div>
                        </PopoverContent>
                    </Popover>

                    <div className="flex px-4 py-3 text-sm bg-purple rounded-xl">
                        Hello Guys, Looking forward to learning with all of you
                    </div>
                </div>
                <div className="flex flex-row justify-end mt-1 gap-2 h-auto w-full ml-11">
                    {Array.from({ length: 10 }).map((_, index) => ( // Create 10 buttons
                        <button
                            key={index}
                            onClick={() => handleClick(index)}
                            className={`rounded-[54px] border border-solid border-[#D0D5DD] h-[26px] w-[48px] p-1 flex flex-row justify-center gap-1 transition-colors duration-200 ${activeButtonIndex === index // Check if this button is active
                                ? 'bg-[#F8F0FF] border-[#7400E0] text-[#7400E0]' // Active styles
                                : 'bg-[#F2F4F7] text-[#475467] hover:bg-[#F8F0FF] hover:border-[#7400E0]' // Default and hover styles
                                }`}
                        >
                            <Image
                                src="/icons/emoji-5.png"
                                width={15}
                                height={15}
                                alt="ohh-reaction-emoji"
                            />
                            <span className="font-medium text-xs">12</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* SECOND MESSAGE */}
            <div className="flex flex-col items-end w-full text-white">
                <div className="text-xs text-neutral-600 mb-2">3:24 PM</div>
                <div className="flex flex-row items-center justify-end gap-3 w-full group">

                    <Popover
                        placement="bottom-end"
                    >
                        <PopoverTrigger>
                            <button
                                className='w-[48px] h-[26px] rounded-[54px] border border-solid border-[#6770A9]  hover:bg-[#D0D5DD] hidden items-center justify-center focus:outline-none bg-[#F2F4F7] ml-1 transition-all group-hover:flex'
                            >
                                <Image
                                    src="/icons/arrow-down.svg"
                                    width={12}
                                    height={12}
                                    alt="Arrow-down"
                                    className="mr-1"
                                />
                                <Image
                                    src="/icons/smile.svg"
                                    width={16}
                                    height={16}
                                    alt="Smile"
                                />
                            </button>
                        </PopoverTrigger>

                        <PopoverContent>
                            <div
                                className='flex flex-col bg-[#FFFFFF] w-auto h-auto border border-[#EAECF0] rounded-md'
                                style={{
                                    boxShadow: '0px 4px 6px -2px rgba(16, 24, 40, 0.08), 0px 12px 16px -4px rgba(16, 24, 40, 0.14)',
                                }}>
                                {/* Emoji list */}
                                <div className="flex flex-row border-b border-solid border-[#EAECF0] gap-3 items-center w-30 px-4 py-[10px] transition-colors hover:bg-neutral-100 rounded-tr-md rounded-tl-md">
                                    <button>
                                        <Image
                                            src="/icons/emoji-1.png"
                                            width={20}
                                            height={20}
                                            alt="thumbs-emoji"
                                        />
                                    </button>
                                    <button>
                                        <Image
                                            src="/icons/emoji-2.png"
                                            width={20}
                                            height={20}
                                            alt="Heart-emoji"
                                        />
                                    </button>
                                    <button>
                                        <Image
                                            src="/icons/emoji-3.png"
                                            width={20}
                                            height={20}
                                            alt="laugh-emoji"
                                        />
                                    </button>
                                    <button>
                                        <Image
                                            src="/icons/emoji-4.png"
                                            width={20}
                                            height={20}
                                            alt="smile-face with heart-emoji"
                                        />
                                    </button>
                                    <button>
                                        <Image
                                            src="/icons/emoji-5.png"
                                            width={20}
                                            height={20}
                                            alt="ohh-reaction-emoji"
                                        />
                                    </button>
                                    <button>
                                        <Image
                                            src="/icons/plus-icon.svg"
                                            width={20}
                                            height={20}
                                            alt="thumbs-emoji"
                                        />
                                    </button>
                                </div>

                                {/* Other options */}
                                <button className='flex flex-row items-center gap-2 w-30 px-4 py-[10px] transition-colors hover:bg-neutral-100'>
                                    <Image src='/icons/Reply.svg' alt='search icon' width={15} height={15} />
                                    <span className='font-normal text-[#0C111D] text-sm'>Reply</span>
                                </button>
                                <button className='flex flex-row items-center gap-2 w-30 px-4 py-[10px] transition-colors hover:bg-neutral-100'>
                                    <Image src='/icons/copy.svg' alt='search icon' width={20} height={20} />
                                    <span className='font-normal text-[#0C111D] text-sm'>Copy</span>
                                </button>
                                <button className='flex flex-row items-center gap-2 w-30 px-4 py-[10px] transition-colors hover:bg-neutral-100'>
                                    <Image src='/icons/Bookmark.svg' alt='search icon' width={20} height={20} />
                                    <span className='font-normal text-[#0C111D] text-sm'>Bookmark</span>
                                </button>
                                <button className='flex flex-row items-center gap-2 w-30 px-4 py-[10px] transition-colors hover:bg-neutral-100 rounded-br-md rounded-bl-md'>
                                    <Image src='/icons/Report.svg' alt='search icon' width={20} height={20} />
                                    <span className='font-normal text-[#0C111D] text-sm'>Report Message</span>
                                </button>
                            </div>
                        </PopoverContent>
                    </Popover>

                    <div className="flex flex-col px-4 py-3 bg-purple rounded-xl gap-[10px]">
                        <div className="flex flex-col p-4 bg-[#973AFF] border border-[#AD72FF] rounded-md text-xs gap-1">
                            <div className="flex flex-row gap-2">
                                <h4 className="font-semibold">Marvin McKinney</h4>
                                <div className="">Admin</div>
                                <div>3:24 PM</div>
                            </div>
                            <div>Hello Guys, Looking forward to learning with all of you</div>
                        </div>
                        <div className="text-sm">Loerum ipsum content</div>
                    </div>
                </div>
                <div className="flex flex-row justify-end mt-1 gap-2 h-auto w-full ml-11">
                    {Array.from({ length: 10 }).map((_, index) => ( // Create 10 buttons
                        <button
                            key={index}
                            onClick={() => handleClick(index)}
                            className={`rounded-[54px] border border-solid border-[#D0D5DD] h-[26px] w-[48px] p-1 flex flex-row justify-center gap-1 transition-colors duration-200 ${activeButtonIndex === index // Check if this button is active
                                ? 'bg-[#F8F0FF] border-[#7400E0] text-[#7400E0]' // Active styles
                                : 'bg-[#F2F4F7] text-[#475467] hover:bg-[#F8F0FF] hover:border-[#7400E0]' // Default and hover styles
                                }`}
                        >
                            <Image
                                src="/icons/emoji-5.png"
                                width={15}
                                height={15}
                                alt="ohh-reaction-emoji"
                            />
                            <span className="font-medium text-xs">12</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* THIRD MESSAGE */}
            <div className="flex flex-col items-end w-full text-white">
                <div className="text-xs text-neutral-600 mb-2">3:24 PM</div>
                <div className="flex flex-row items-center justify-end gap-3 w-full group">
                    <div className="flex px-4 py-3 text-sm bg-[#EDE4FF] rounded-xl gap-2">
                        <p className="text-[#475467]">Message deleted.</p>
                        <button className="text-purple italic hover:underline">Undo</button>
                    </div>
                </div>
            </div>

            {/* FOURTH MESSAGE */}
            <div className="flex flex-col items-end w-full text-white">
                <div className="text-xs text-neutral-600 mb-2">3:24 PM</div>
                <div className="flex flex-row items-center justify-end gap-3 w-full group">
                    <div className="flex px-4 py-3 text-sm bg-[#EDE4FF] rounded-xl gap-2">
                        <p className="text-[#475467]">Message deleted.</p>
                        <button className="text-purple italic hover:underline">Undo</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OwnChat;