"use client";

import React, { ReactNode } from "react";
import Image from "next/image";
import ChatMembers from "@/components/DashboardComponents/CommunityComponents/chatMembers";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { useState } from "react";

interface GeneralChatLayoutProps {
    children: ReactNode;
}

function GeneralChatLayout({ children }: GeneralChatLayoutProps) {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isMutePopoverOpen, setIsMutePopoverOpen] = useState(false);
    const [isMuted, setIsMuted] = useState(false); // Tracks mute state

    // Function to close both popovers
    const closePopover = () => setIsPopoverOpen(false);
    const closeMutePopover = () => setIsMutePopoverOpen(false);
    const closeBothPopovers = () => {
        closeMutePopover();
        closePopover();
    };

    // Toggles mute state
    const toggleMute = () => setIsMuted(prev => !prev);

    return (
        <div className="flex flex-row h-full">
            <div className=" flex flex-row items-center justify-center h-full w-full">

                <div className="bg-white rounded-2xl w-[37.5rem] p-6 border border-solid border-lightgrey">
                    <div className="flex flex-col">
                        <div className="flex justify-center mb-4">
                            <Image src="/images/physicDailogImg.svg" alt="cool image" width={120} height={120} />
                        </div>
                        <div className="text-center mb-6">
                            <h2 className="text-xl font-bold">Launching Soon!!!!!!!!</h2>
                        </div>

                    </div>

                </div>

            </div>
            {/* <div className="flex flex-col w-[270px] bg-white border-t border-r border-lightGrey">
                <div className='flex flex-row items-center justify-between h-[72px] border-b border-lightGrey'>
                    <h2 className="ml-6 font-semibold text-[#182230]">General</h2>
                    <div className="flex flex-row items-center mr-6 gap-2">
                        <Image src='/icons/membersIcon.svg' alt="number of members" width={18} height={18} />
                        <p className="text-sm text-[#4B5563]">100</p>
                    </div>
                </div>
                <div className="flex flex-col justify-start items-center mx-4 mt-4 gap-2">
                    <div className="flex flex-row items-center justify-between w-full h-auto my-1 px-2 py-[6px] bg-white rounded-[7px] group hover:bg-[#F8F0FF]">
                        <div className="flex flex-row items-center gap-2">
                            <div className="relative w-9 h-9">
                                <Image src='/images/DP.png' alt="DP" width={36} height={36} />
                                <div className="absolute right-0 bottom-0 w-3 h-3 bg-neutral-400 rounded-full border-2 border-white group-hover:bg-green-500"></div>
                            </div>
                            <p className="text-[#4B5563] text-[13px] font-medium">Dummy User</p>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-white transition-colors group-hover:bg-[#DE3024]"></div>
                    </div>
                    <div className="flex flex-row items-center justify-between w-full h-auto my-1 px-2 py-[6px] bg-white rounded-[7px] group hover:bg-[#F8F0FF]">
                        <div className="flex flex-row items-center gap-2">
                            <div className="relative w-9 h-9">
                                <Image src='/images/DP.png' alt="DP" width={36} height={36} />
                                <div className="absolute right-0 bottom-0 w-3 h-3 bg-neutral-400 rounded-full border-2 border-white group-hover:bg-green-500"></div>
                            </div>
                            <p className="text-[#4B5563] text-[13px] font-medium">User 1</p>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-white transition-colors group-hover:bg-[#DE3024]"></div>
                    </div>
                </div>
            </div>
            <div className="flex flex-1 flex-col border-t border-lightGrey">
                <div className="flex flex-row items-center justify-between px-6 h-[72px] bg-white border-b border-lightGrey">
                    <div className="flex flex-row items-center gap-2">
                        <div className="relative w-9 h-9">
                            <Image src='/images/DP.png' alt="DP" width={36} height={36} />
                            <div className="absolute right-0 bottom-0 w-3 h-3 bg-neutral-400 rounded-full border-2 border-white group-hover:bg-green-500"></div>
                        </div>
                        <p className="text-[#4B5563] text-[13px] font-medium">Dummy User</p>
                    </div>
                    <Popover placement="bottom-end">
                        <PopoverTrigger>
                            <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                                <button className="border-none outline-none p-0 bg-transparent ">
                                    <Image src='/icons/more-vertical.svg' alt="more options" width={24} height={24} />
                                </button>
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className='flex flex-col bg-white w-auto h-auto py-1 px-0 border border-lightGrey rounded-md shadow-md'>
                            <button
                                className='flex flex-row items-center gap-2 w-[183px] px-4 py-[10px] transition-colors  hover:bg-neutral-100'
                                onClick={closePopover}
                            >
                                <Image src='/icons/user-sharing.svg' alt='mark as read' width={18} height={18} />
                                <p className='text-sm'>View profile</p>
                            </button>
                            <Popover
                                placement='right-start'
                                isOpen={isMutePopoverOpen}
                                onOpenChange={setIsMutePopoverOpen}
                            >
                                <PopoverTrigger>
                                    <button className='flex flex-row items-center justify-between w-[183px] px-4 py-[10px] transition-colors  hover:bg-neutral-100'>
                                        <div className='flex flex-row items-center gap-2'>
                                            <Image src={isMuted ? '/icons/cancleBell.svg' : '/icons/bell.svg'} alt={isMuted ? 'Unmute' : 'Mute'} width={18} height={18} />
                                            <p className='text-sm'>{isMuted ? 'Muted' : 'Mute'}</p>
                                        </div>
                                        <Image src='/icons/collapse-right.svg' alt='mute options' width={8} height={8} />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className="flex flex-col w-32 h-auto bg-white border border-lightGrey rounded-md py-1 px-0">
                                    {!isMuted && (
                                        <div className=''>
                                            <button onClick={() => { toggleMute(); closeBothPopovers(); }} className='text-sm text-[#0C111D] text-start  w-full px-4 py-[10px] hover:bg-[#F2F4F7]'>For 8 hours</button>
                                            <button onClick={() => { toggleMute(); closeBothPopovers(); }} className='text-sm text-[#0C111D] text-start w-full px-4 py-[10px] hover:bg-[#F2F4F7]'>For 1 week</button>
                                            <button onClick={() => { toggleMute(); closeBothPopovers(); }} className='text-sm text-[#0C111D] text-start w-full px-4 py-[10px] hover:bg-[#F2F4F7]'>Always</button>
                                        </div>
                                    )}
                                    {isMuted && (
                                        <div className="flex flex-col w-[182px] h-auto bg-white border border-lightGrey rounded-md py-1">
                                            <p className="text-sm font-normal text-[#667085] px-4 py-[10px]">Muted until 05:57 pm</p>
                                            <button onClick={() => { toggleMute(); closeBothPopovers(); }} className='text-sm text-[#0C111D] text-start px-4 py-[10px] hover:bg-[#F2F4F7]'>Unmute</button>
                                        </div>
                                    )}
                                </PopoverContent>
                            </Popover>
                            <button
                                className='flex flex-row items-center gap-2 w-[183px] px-4 py-[10px] transition-colors  hover:bg-neutral-100'
                                onClick={closePopover}
                            >
                                <Image src='/icons/folder-02.svg' alt='media' width={18} height={18} />
                                <p className='text-sm'>Media</p>
                            </button>
                            <button
                                className='flex flex-row items-center gap-2 w-[183px] px-4 py-[10px] transition-colors  hover:bg-neutral-100'
                                onClick={closePopover}
                            >
                                <Image src='/icons/user-block-red-01.svg' alt='exit group' width={18} height={18} />
                                <p className='text-sm text-red-600'>Block user</p>
                            </button>
                        </PopoverContent>
                    </Popover>
                </div>
                {children}
            </div> */}
        </div>
    );
}

export default GeneralChatLayout