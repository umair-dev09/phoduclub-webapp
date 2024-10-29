"use client";
import Image from "next/image";
import { useState, useRef, useEffect, forwardRef } from "react";
import { PopoverContent, PopoverTrigger, Popover } from '@nextui-org/popover';

type OtherChatProps = {
    message: string | null;
    senderId: string | null;
    timestamp: any | null;

}

const OtherChat = ({message, senderId, timestamp}:OtherChatProps) => {
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
    const [activeButtonIndex, setActiveButtonIndex] = useState<number | null>(null); // Use a single index to track the active button

    const handleClick = (index: number) => {
        setActiveButtonIndex(index); // Set the clicked button as active
    };

    return (
            <>
            <div className="w-full h-auto flex flex-col pr-[10%] ml-3 ">
                <div className="gap-2 flex items-center">
                <div className="relative">
                        <Image src='/icons/profile-pic2.svg' alt="DP" width={40} height={40} />
                        <Image className="absolute right-0 bottom-0" src='/icons/winnerBatch.svg' alt="Batch" width={18} height={18} />
                    </div>
                    <span className="text-[#182230] font-semibold text-sm">Brooklyn Simmons</span>
                    <span className="font-normal text-sm text-[#475467]">Admin</span>
                    <span className="font-normal text-sm text-[#475467]">3:24 PM</span>
                </div>

                <div className="ml-11 flex flex-row gap-2 items-center relative group">
                <div className="bg-white rounded-md border border-solid border-[#EAECF0] px-4 py-3 inline-block">
                  {/* */}
                {/* <Image src='/images/impNotes.png' alt="image" width={359} height={293} /> */}
                    {/* */}
                {/* <div className="w-full h-auto rounded-md border border-solid border-[#D0D5DD] flex flex-col bg-[#F2F4F7] p-4">
                            <div className="gap-2 flex items-center">

                                <span className="text-[#182230] font-semibold text-sm">Brooklyn Simmons</span>
                                <span className="font-normal text-sm text-[#475467]">Admin</span>
                                <span className="font-normal text-sm text-[#475467]">3:24 PM</span>
                            </div>
                            <span className="break-words whitespace-pre-wrap font-normal text-[#182230] text-sm">
                             {messageStart1}
                            </span>
                </div> */}
                                   {/* */}
                {/* <div className="w-full h-auto rounded-md border border-solid border-[#D0D5DD] flex flex-row bg-[#F2F4F7] p-4 justify-between">
                    <div className="flex flex-row gap-2 items-start">
                    <Image className="mt-1" src="/icons/file-02.svg" width={16} height={16} alt="File" />
                    <div className="flex flex-col ">
                        <p className="text-sm">History of Skate.pdf</p>
                        <p className="text-[11px]">16.53KB</p>
                    </div>
                    </div>
                    <button>
                    <Image src="/icons/download.svg" width={22} height={22} alt="Download" />
                    </button>
                </div> */}
                   {/* */}
                 <span className="break-all whitespace-pre-wrap font-normal text-[#182230] text-sm ">
                            {messageStart}
                  </span>
                        
                 </div>


                    <Popover
                        placement="bottom-start"
                    >
                        <PopoverTrigger>
                            <button
                                onClick={handlePopoverToggle}
                                className='w-[48px] h-[26px] rounded-[54px] border border-solid border-[#6770A9]  hover:bg-[#D0D5DD] flex invisible min-w-[46px] items-center justify-center focus:outline-none bg-[#F2F4F7] ml-1 group-hover:flex group-hover:visible'
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

                </div>
                {/* <div className="flex flex-row mt-1 gap-2 h-auto w-full ml-11 flex-wrap">
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
                </div> */}
            </div>
        </>
    );
}

export default OtherChat;
