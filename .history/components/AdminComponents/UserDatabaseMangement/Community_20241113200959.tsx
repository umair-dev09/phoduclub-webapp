import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import Image from "next/image";
import Collapsible from 'react-collapsible';
import { useState } from "react";

function Community() {
    const [isOpen, setIsOpen] = useState(false);

    const handleCollapsibleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex flex-col gap-6 p-8">
            <div className="flex flex-row gap-3 border-b border-solid border-[#EAECF0]">
                <div className="relative">
                    <Image src="/images/DP_Lion.svg" alt="DP" width={72} height={72} />
                    <Image
                        className="absolute right-0 bottom-0"
                        src="/icons/winnerBatch.svg"
                        alt="Batch"
                        width={32}
                        height={32}
                    />
                </div>
                <div className="flex items-start flex-col justify-center">
                    <div className="font-semibold text-[#1D2939] text-2xl">Jenny Wilson</div>
                    <div className="flex justify-start items-start text-[16px] font-medium text-[#667085]">jenny#8547</div>
                </div>
            </div>
            <p className="font-semibold text-[#1D2939] text-lg">Community</p>
            <div className="border border-solid border-[#F7F8FB] rounded-xl h-auto">
                <div className="h-6 px-6 flex pt-3 items-center">
                    <span className="text-[#667085] font-medium text-sm h-6">Groups</span>
                </div>

                <Collapsible
                    open={isOpen}
                    onTriggerOpening={handleCollapsibleClick}
                    onTriggerClosing={handleCollapsibleClick}
                    trigger={
                        <div className="h-[76px] w-full px-6 flex flex-row justify-between items-center hover:bg-[#F9FAFB]">
                            <div className="flex flex-row gap-2">
                                {/* Arrow icon toggle */}
                                <Image
                                    src={isOpen ? '/icons/Arrow-up-1.svg' : '/icons/Arrow-down-1.svg'}
                                    width={20}
                                    height={20}
                                    alt="Arrow-toggle"
                                />
                                <Image
                                    src="/icons/elements (3).svg"
                                    width={40}
                                    height={40}
                                    alt="elements"
                                />
                                <div className="flex flex-col gap-1">
                                    <span className="font-semibold text-sm text-[#182230]">JEE - 2024</span>
                                    <span className="font-normal text-sm text-[#667085]">5 Channels</span>
                                </div>
                            </div>
                            <Popover placement="bottom-end">
                                <PopoverTrigger>
                                    <Image src='/icons/more-vertical.svg' alt="more" width={24} height={24} />
                                </PopoverTrigger>
                                <PopoverContent className="w-auto px-0 py-1 rounded-md">
                                    <button
                                        className="flex flex-row items-center w-full px-4 py-[0.625rem] gap-2 transition-colors hover:bg-[#F2F4F7]"
                                        onClick={(e) => e.stopPropagation()}>
                                        <Image src='/icons/delete.svg' alt="delete" width={18} height={18} />
                                        <p className="text-sm text-[#DE3024] font-normal">Remove from group</p>
                                    </button>
                                </PopoverContent>
                            </Popover>
                        </div>
                    }>
                    {/* Channels */}
                    {["Study materials", "Quiz talk", "Physics 101", "Chemistry", "Maths"].map((channel, index) => (
                        <div key={index} className="flex flex-row h-[50px] justify-between items-center p-6 border-t border-solid border-[#EAECF0]">
                            <div className="flex flex-row gap-2">
                                <Image
                                    src={`/icons/${channel.replace(" ", "")}.png`}
                                    width={14}
                                    height={20}
                                    alt={`${channel}-icon`}
                                />
                                <span className="font-normal text-sm text-[#475467]">{channel}</span>
                            </div>
                            <Popover placement="bottom-end">
                                <PopoverTrigger>
                                    <Image src='/icons/more-vertical.svg' alt="more" width={24} height={24} />
                                </PopoverTrigger>
                                <PopoverContent className="w-auto px-0 py-1 rounded-md">
                                    <button
                                        className="flex flex-row items-center w-full px-4 py-[0.625rem] gap-2 transition-colors hover:bg-[#F2F4F7]"
                                        onClick={(e) => e.stopPropagation()}>
                                        <Image src='/icons/delete.svg' alt="delete" width={18} height={18} />
                                        <p className="text-sm text-[#DE3024] font-normal">Remove from channel</p>
                                    </button>
                                </PopoverContent>
                            </Popover>
                        </div>
                    ))}
                </Collapsible>
            </div>
        </div>
    );
}

export default Community;
