"use client";
import Image from "next/image";
import { useState, useRef, useEffect, forwardRef } from "react";
import { PopoverContent, PopoverTrigger, Popover } from '@nextui-org/popover';

const ChartArea = () => {
    const messageStart = `Hey 
In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.`;
    const messageStart1 = `Hey everyone,
Welcome to the channel`;

    const [isExpanded, setIsExpanded] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null); // Properly typed ref

    const handleToggle = () => setIsExpanded(!isExpanded);
    const handlePopoverToggle = () => setIsPopoverOpen(!isPopoverOpen);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setIsPopoverOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="mx-6 h-full w-full mt-6 flex flex-col gap-6">
            {/* First message */}
            <div className="w-full h-auto flex flex-col">
                <div className="gap-2 flex items-center">
                    <div className="relative">
                        <Image src='/icons/profile-pic2.svg' alt="DP" width={40} height={40} />
                        <Image className="absolute right-0 bottom-0" src='/icons/winnerBatch.svg' alt="Batch" width={18} height={18} />
                    </div>
                    <span className="text-[#182230] font-semibold text-sm">Brooklyn Simmons</span>
                    <span className="font-normal text-sm text-[#475467]">3:24 PM</span>
                </div>
                <div className="ml-11 flex">
                    <div className="bg-white rounded-md border border-solid border-[#EAECF0] max-w-[400px] px-4 py-3 inline-block">
                        <span className="break-words whitespace-pre-wrap font-normal text-[#182230] text-sm">
                            {isExpanded ? messageStart : messageStart.slice(0, 150) + '...'}
                        </span>
                        <button
                            onClick={handleToggle}
                            className="text-[#9012FF] font-semibold text-sm ml-[2px]"
                        >
                            {isExpanded ? 'Show Less' : 'Show More'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Second message with hover functionality and persistent popover */}
            <div className="w-full h-auto flex flex-col">
                <div className="gap-2 flex items-center">
                    <Image
                        src="/icons/JennyWillsion.png"
                        width={36}
                        height={36}
                        alt="Others-chat-profile"
                    />
                    <span className="text-[#182230] font-semibold text-sm">Brooklyn Simmons</span>
                    <span className="font-normal text-sm text-[#475467]">Admin</span>
                    <span className="font-normal text-sm text-[#475467]">3:24 PM</span>
                </div>

                <div className="ml-11 flex flex-row gap-2 items-center relative"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}>
                    <div className="bg-white rounded-md border border-solid border-[#EAECF0] max-w-[400px] px-4 py-3 inline-block text-left">
                        <span className="break-words whitespace-pre-wrap font-normal text-[#182230] text-sm">
                            {messageStart1}
                        </span>
                    </div>

                    {(isHovering || isPopoverOpen) && (
                        <Popover
                            isOpen={isPopoverOpen}
                            onClose={() => setIsPopoverOpen(false)}
                            placement="bottom-start"
                        >
                            <PopoverTrigger>
                                <button
                                    onClick={handlePopoverToggle}
                                    className='w-[48px] h-[26px] rounded-[54px] border border-solid border-[#6770A9]  hover:bg-[#D0D5DD] flex items-center justify-center focus:outline-none bg-[#F2F4F7] ml-1'
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
                    )}
                </div>
                <div className="flex flex-col gap-4 mt-1">
                    <button className=" rounded-[54px] border border-solid border-[#D0D5DD] bg-[#F2F4F7] h-[26px] w-auto py-1 px-2">
                        <Image
                            src="/icons/emoji-5.png"
                            width={13}
                            height={13}
                            alt="ohh-reaction-emoji"
                        />

                        <span className="text-[#475467] font-medium text-xs">12</span>

                    </button>

                </div>
            </div>
        </div>
    );
}

export default ChartArea;
