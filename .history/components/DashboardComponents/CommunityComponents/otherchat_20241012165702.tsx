"use client";
import Image from "next/image";
import { useState } from "react";
import { PopoverContent, PopoverTrigger, Popover } from '@nextui-org/popover';

function ChartArea() {
    const messageStart = `Hey 
In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available`;
    const messageStart1 = `Hey everyone,
Welcome to the channel`

    // New state to manage the expansion of the message
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="mx-6 h-full w-full mt-6 flex flex-col gap-6">
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
                        {/* Regular message */}
                        <span className="break-words whitespace-pre-wrap font-normal text-[#182230] text-sm ">
                            {isExpanded ? messageStart : messageStart.slice(0, 150) + '...'}
                        </span>
                        <button
                            onClick={handleToggle}
                            className="text-[#9012FF] font-semibold text-sm  ml-[2px]"
                        >
                            {isExpanded ? 'Show Less' : 'Show More'}
                        </button>
                    </div>
                </div>
            </div>
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
                <div className="ml-11 flex flex-row gap-2 items-center">

                    <button className="bg-white rounded-md border border-solid border-[#EAECF0] max-w-[400px] px-4 py-3 inline-block text-left ">

                        <span className="break-words whitespace-pre-wrap font-normal text-[#182230] text-sm ">
                            {messageStart1}
                        </span>


                    </button>
                    <div className="w-[48px] h-[26px] rounded-[54px] border border-solid border-[#6770A9] flex items-center justify-center">


                        <Popover placement="bottom-end">
                            <PopoverTrigger>
                                <button className='w-[48px] h-[26px] rounded-[54px] border border-solid border-[#6770A9] flex items-center justify-center focus:outline-none'>
                                    <Image
                                        src="/icons/arrow-down.svg"
                                        width={12}
                                        height={12}
                                        alt="Arrow-down"
                                        className="mr-1" // Add margin to separate icons
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
                                    className='flex flex-col bg-[#FFFFFF] w-auto h-auto border border-[#EAECF0] rounded-md '
                                    style={{
                                        boxShadow: '0px 4px 6px -2px rgba(16, 24, 40, 0.08), 0px 12px 16px -4px rgba(16, 24, 40, 0.14)'
                                    }}>

                                    <button className='flex flex-row items-center gap-2 w-30 px-4 py-[10px] transition-colors hover:bg-neutral-100 rounded-tr-md rounded-tl-md  '>

                                        <Image src='/icons/image.svg' alt='search icon' width={20} height={20} />
                                        <span className='font-normal text-[#0C111D] text-sm'>Image</span>

                                    </button>
                                    <button className='flex flex-row items-center gap-2 w-30 px-4 py-[10px] transition-colors hover:bg-neutral-100 '>

                                        <Image src='/icons/video-icon.svg' alt='search icon' width={20} height={20} />
                                        <span className='font-normal text-[#0C111D] text-sm'>Video</span>

                                    </button>
                                    <button className='flex flex-row items-center gap-2 w-30 px-4 py-[10px] transition-colors hover:bg-neutral-100 rounded-br-md rounded-bl-md'>

                                        <Image src='/icons/documents.svg' alt='search icon' width={20} height={20} />
                                        <span className='font-normal text-[#0C111D] text-sm'>Documents</span>

                                    </button>
                                </div>
                            </PopoverContent>
                        </Popover>





                    </div>
                </div>



            </div>
        </div>
    );
}

export default ChartArea;
