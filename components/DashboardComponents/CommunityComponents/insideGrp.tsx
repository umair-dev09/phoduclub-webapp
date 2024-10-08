"use client";

import React, { useState } from "react";
import { PopoverContent, PopoverTrigger, Popover } from '@nextui-org/popover';
import Image from "next/image";

function InsideGrp() {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isMutePopoverOpen, setIsMutePopoverOpen] = useState(false);

    const closePopover = () => {
        setIsPopoverOpen(false);
    };

    const closeMutePopover = () => {
        setIsMutePopoverOpen(false);
    };

    const closeBothPopovers = () => {
        closeMutePopover();
        closePopover();
    };

    return (
        <div className='flex flex-row items-center justify-between h-[72px] border-b border-lightGrey'>
            <div className='flex flex-row gap-2 ml-6'>
                <div className="flex items-center justify-center w-[46px] h-[46px] rounded-full">
                    <div className="flex items-center justify-center w-[42px] h-[42px] rounded-full bg-[#C0D5FF] border-2 border-[#C0D5FF] text-[#124B68] font-bold">
                        <h3>J</h3>
                    </div>
                </div>
                <div className='flex flex-col justify-evenly text-sm'>
                    <div className='font-semibold'><h4>JEE-2024</h4></div>
                    <div className='flex flex-row gap-2 text-[#4B5563]'>
                        <Image src='/icons/membersIcon.svg' alt='members icon' width={18} height={18} />
                        <div>100</div>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-center mr-6'>
                <Popover
                    placement="bottom-end"
                    isOpen={isPopoverOpen}
                    onOpenChange={setIsPopoverOpen}
                >
                    <PopoverTrigger>
                        <button>
                            <Image src='/icons/chevron-down.svg' alt='arrow down' width={20} height={20} />
                        </button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className='flex flex-col bg-white w-auto h-auto py-1 border border-lightGrey rounded-md shadow-md'>
                            <button
                                className='flex flex-row items-center gap-2 w-48 px-4 py-[10px] transition-colors hover:bg-neutral-100'
                                onClick={closePopover}
                            >
                                <Image src='/icons/bubble-chat-notification.svg' alt='mark as read' width={18} height={18} />
                                <p className='text-sm'>Mark as read</p>
                            </button>
                            <Popover
                                placement='right-start'
                                isOpen={isMutePopoverOpen}
                                onOpenChange={setIsMutePopoverOpen}
                            >
                                <PopoverTrigger>
                                    <button className='flex flex-row items-center justify-between w-48 px-4 py-[10px] transition-colors hover:bg-neutral-100'>
                                        <div className='flex flex-row items-center gap-2'>
                                            <Image src='/icons/bell.svg' alt='Mute' width={18} height={18} />
                                            <Image src='/icons/cancleBell.svg' alt='Unute' width={18} height={18} />
                                            <p className='text-sm'>Mute</p>
                                            <p className='text-sm'>Muted</p>
                                        </div>
                                        <Image src='/icons/collapse-right.svg' alt='mute options' width={8} height={8} />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <div>
                                        <div className='flex flex-col w-32 h-auto bg-white border border-lightGrey rounded-md py-1'>
                                            <button onClick={closeBothPopovers} className='text-sm text-[#0C111D] text-start px-4 py-[10px] hover:bg-[#F2F4F7]'>For 8 hours</button>
                                            <button onClick={closeBothPopovers} className='text-sm text-[#0C111D] text-start px-4 py-[10px] hover:bg-[#F2F4F7]'>For 1 week</button>
                                            <button onClick={closeBothPopovers} className='text-sm text-[#0C111D] text-start px-4 py-[10px] hover:bg-[#F2F4F7]'>Always</button>
                                        </div>
                                        <div className="w-[">

                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                            <button
                                className='flex flex-row items-center gap-2 w-48 px-4 py-[10px] transition-colors hover:bg-neutral-100'
                                onClick={closePopover}
                            >
                                <Image src='/icons/exitGrp.svg' alt='exit group' width={18} height={18} />
                                <p className='text-sm text-red-600'>Exit group</p>
                            </button>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}

export default InsideGrp;
