'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
// below are dailogs
import Delete from "@/components/AdminComponents/Community/AllDialogs/Delete";
import ChannelRequests from "@/components/AdminComponents/Community/AllDialogs/ChannelRequests"
import Channelinfo from "@/components/AdminComponents/Community/AllDialogs/Channelinfo"
import Groupinfo from "@/components/AdminComponents/Community/AllDialogs/Groupinfo"
import DeleteGroup from "@/components/AdminComponents/Community/AllDialogs/DeleteGroup"
import DeleteCategory from "@/components/AdminComponents/Community/AllDialogs/DeleteCategory"
import EditDetails from "@/components/AdminComponents/Community/AllDialogs/EditDetails"
import CreateCategory from "@/components/AdminComponents/Community/AllDialogs/CreateCategory"
import CreateChannel from "@/components/AdminComponents/Community/AllDialogs/Createchannel";
function Chatinfo() {
    const [text, setText] = useState("");
    const [height, setHeight] = useState("32px");
    const [isDetailsVisible, setIsDetailsVisible] = useState(true);
    // STATES FOR THE DIALOGS
    const [createchannel, setCreatechannel] = useState(false);

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
                <div className="flex flex-row items-center p-6 justify-between group gap-2 border-b border-lightGrey">
                    <div className='flex flex-row gap-2 items-center'>
                        <div className="rounded-full w-[44px] h-[44px] bg-[#C0EAFF] items-center flex justify-center border-2 border-solid border-[#FFFFFF]">
                            <h1 className="text-[#124B68] text-base font-bold">J</h1>
                        </div>
                        <div className='flex flex-col '>
                            <p className='font-semibold text-normal text-sm'>JEE - 2024</p>
                            <div className='gap-1 flex flex-row'>
                                <Image
                                    src="/icons/communityicon.svg"
                                    width={18}
                                    height={18}
                                    alt="communiy-icon" />
                                <span className='text-sm text-[#4B5563] font-normal'>100</span>
                            </div>
                        </div>
                    </div>
                    <Popover placement="bottom-end">
                        <PopoverTrigger>
                            <button className='focus:outline-none'>
                                <Image
                                    src="/icons/selectdate-Arrowdown.svg"
                                    width={20}
                                    height={20}
                                    alt="Arrow-Down Button"
                                />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto py-1 px-0 bg-white border border-lightGrey rounded-md flex flex-col">
                            <button className='flex flex-row gap-2 items-center h-10 w-[206px] px-4 hover:bg-[#EAECF0]'>
                                <Image
                                    src="/icons/mark as read.svg"
                                    width={18}
                                    height={18}
                                    alt="mark as read"
                                />
                                <span className='font-normal text-[#0C111D] text-sm'>Mark as read</span>
                            </button>

                            <button className='flex flex-row gap-2 items-center justify-between h-10 w-[206px] px-4 hover:bg-[#EAECF0]'>
                                <div className='flex flex-row gap-2'>
                                    <Image
                                        src="/icons/mute.svg"
                                        width={18}
                                        height={18}
                                        alt="mute-icon"
                                    />
                                    <span className='font-normal text-[#0C111D] text-sm'>Mute</span>
                                </div>
                                <Image
                                    src="/icons/arrow-right-01-round.svg"
                                    width={18}
                                    height={18}
                                    alt="arrow-right-01-round"
                                />
                            </button>

                            <button className='flex flex-row gap-2 items-center h-10 w-[206px] px-4 hover:bg-[#EAECF0]'>
                                <Image
                                    src="/icons/information-circle.svg"
                                    width={18}
                                    height={18}
                                    alt="information-circle"
                                />
                                <span className='font-normal text-[#0C111D] text-sm'>Group info</span>
                            </button>
                            <button className='flex flex-row gap-2 items-center h-10 w-[206px] px-4 hover:bg-[#EAECF0]'>
                                <Image
                                    src="/icons/delete.svg"
                                    width={18}
                                    height={18}
                                    alt="delete"
                                />
                                <span className='font-normal text-[#DE3024] text-sm'>Delete group</span>
                            </button>
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="flex flex-col p-4 gap-2">
                    <div className='flex flex-row justify-between items-center px-2'>
                        <span className='text-base text-[#182230] font-semibold'>General</span>
                        <Popover placement="bottom-start">
                            <PopoverTrigger>
                                <button className='focus:outline-none'>
                                    <Image src="/icons/plus-dark.svg" alt="plus-dark" width={18} height={18} />
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto py-1 px-0 bg-white border border-lightGrey rounded-md flex flex-col">
                                <button className='flex flex-row gap-2 items-center h-10 w-[173px] px-4 hover:bg-[#EAECF0]'>
                                    <Image
                                        src="/icons/Create-category.svg"
                                        width={18}
                                        height={18}
                                        alt="Create-category"
                                    />
                                    <span className='font-normal text-[#0C111D] text-sm'>Create category</span>
                                </button>
                                <button className='flex flex-row gap-2 items-center h-10 w-[173px] px-4 hover:bg-[#EAECF0]'>
                                    <Image
                                        src="/icons/edit-02.svg"
                                        width={18}
                                        height={18}
                                        alt="pencil-edit"
                                    />
                                    <span className='font-normal text-[#0C111D] text-sm'>Edit details</span>
                                </button>
                                <button className='flex flex-row gap-2 items-center h-10 w-[173px] px-4 hover:bg-[#EAECF0]'>
                                    <Image
                                        src="/icons/delete.svg"
                                        width={18}
                                        height={18}
                                        alt="delete"
                                    />
                                    <span className='font-normal text-[#DE3024] text-sm'>Delete category</span>
                                </button>
                            </PopoverContent>
                        </Popover>
                    </div>
                    {["Admin Only", "Marketing", "Sales", "Customer Support"].map((item, idx) => (
                        <button
                            key={idx}
                            className="flex flex-row w-full px-2 py-[0.375rem] gap-2 rounded-[0.438rem] transition-colors duration-200 hover:bg-[#F8F0FF]"
                        >
                            <div>{["😎", "📢", "📊", "🎧"][idx]}</div>
                            <p className="text-[0.813rem] text-[#4B5563] font-semibold leading-6">{item}</p>
                        </button>
                    ))}
                    <button className='flex flex-row items-center justify-center w-full px-2 py-[0.375rem] gap-2 border border-lightGrey rounded-full'
                        onClick={() => setCreatechannel(true)}>
                        <Image src='/icons/plus-dark.svg' alt='create channel' width={18} height={18} />
                        <p className='text-[0.813rem] text-[#182230] font-semibold leading-6'>Create Channel</p>
                    </button>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="grid grid-rows-[4.5rem_1fr_auto] w-full">
                <div className="flex flex-row items-center justify-between px-6 bg-white border-b border-lightGrey">

                    <Popover placement="bottom">
                        <PopoverTrigger>
                            <button className="flex flex-row gap-2 focus:outline-none">
                                <Image
                                    src="/icons/bell.png"
                                    width={16}
                                    height={24}
                                    alt="bell-icon" />
                                <h4 className="text-base text-[#182230] font-semibold leading-[1.26rem]">Announcement</h4>
                                <Image
                                    src="/icons/selectdate-Arrowdown.svg"
                                    width={20}
                                    height={20}
                                    alt="Arrow-Down Button"
                                />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto py-1 px-0 bg-white border border-lightGrey rounded-md flex flex-col">
                            <button className='flex flex-row gap-2 items-center h-10 w-[206px] px-4 hover:bg-[#EAECF0]'>
                                <Image
                                    src="/icons/mark as read.svg"
                                    width={18}
                                    height={18}
                                    alt="mark as read"
                                />
                                <span className='font-normal text-[#0C111D] text-sm'>Mark as read</span>
                            </button>

                            <button className='flex flex-row gap-2 items-center justify-between h-10 w-[206px] px-4 hover:bg-[#EAECF0]'>
                                <div className='flex flex-row gap-2'>
                                    <Image
                                        src="/icons/mute.svg"
                                        width={18}
                                        height={18}
                                        alt="mute-icon"
                                    />
                                    <span className='font-normal text-[#0C111D] text-sm'>Mute</span>
                                </div>
                                <Image
                                    src="/icons/arrow-right-01-round.svg"
                                    width={18}
                                    height={18}
                                    alt="arrow-right-01-round"
                                />
                            </button>
                            <button className='flex flex-row gap-2 items-center h-10 w-[206px] px-4 hover:bg-[#EAECF0]'>
                                <Image
                                    src="/icons/media.svg"
                                    width={18}
                                    height={18}
                                    alt="media-icon"
                                />
                                <span className='font-normal text-[#0C111D] text-sm'>Media</span>
                            </button>
                            <button className='flex flex-row gap-2 items-center h-10 w-[206px] px-4 hover:bg-[#EAECF0]'>
                                <Image
                                    src="/icons/information-circle.svg"
                                    width={18}
                                    height={18}
                                    alt="information-circle"
                                />
                                <span className='font-normal text-[#0C111D] text-sm'>Channel info</span>
                            </button>
                            <button className='flex flex-row gap-2 items-center h-10 w-[206px] px-4 hover:bg-[#EAECF0]'>
                                <Image
                                    src="/icons/channel-requests.svg"
                                    width={18}
                                    height={18}
                                    alt="channel-requests"
                                />
                                <span className='font-normal text-[#0C111D] text-sm'>Channel Requests</span>
                            </button>
                            <button className='flex flex-row gap-2 items-center h-10 w-[206px] px-4 hover:bg-[#EAECF0]'>
                                <Image
                                    src="/icons/delete.svg"
                                    width={18}
                                    height={18}
                                    alt="delete"
                                />
                                <span className='font-normal text-[#DE3024] text-sm'>Delete</span>
                            </button>

                        </PopoverContent>
                    </Popover>
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
            {createchannel && <CreateChannel open={createchannel} onClose={() => setCreatechannel(false)} />}


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