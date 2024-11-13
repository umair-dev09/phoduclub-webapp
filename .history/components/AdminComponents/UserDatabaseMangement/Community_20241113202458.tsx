import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import Image from "next/image";
import Collapsible from 'react-collapsible';
import { useState } from "react";

function Community() {
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);

    const handleCollapsibleClick1 = () => setIsOpen1(!isOpen1);
    const handleCollapsibleClick2 = () => setIsOpen2(!isOpen2);

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

            {/* First Collapsible Section */}
            <div className="border border-solid border-[#F7F8FB] rounded-xl">
                <div className="h-6 px-6 flex pt-3 items-center">
                    <span className="text-[#667085] font-medium text-sm">Groups</span>
                </div>
                <Collapsible
                    open={isOpen1}
                    onTriggerOpening={handleCollapsibleClick1}
                    onTriggerClosing={handleCollapsibleClick1}
                    trigger={
                        <div className="h-[76px] w-full px-6 flex flex-row justify-between items-center hover:bg-[#F9FAFB]">
                            <div className="flex flex-row gap-2">
                                <Image
                                    src={isOpen1 ? '/icons/Arrow-up.svg' : '/icons/Arrow-down-1.svg'}
                                    width={20}
                                    height={20}
                                    alt="Arrow-toggle"
                                />
                                <Image src="/icons/elements (3).svg" width={40} height={40} alt="elements" />
                                <div className="flex flex-col gap-1">
                                    <span className="font-semibold text-sm text-[#182230]">JEE - 2024</span>
                                    <span className="font-normal text-sm text-[#667085]">5 Channels</span>
                                </div>
                            </div>
                        </div>
                    }
                >
                    <div className="p-6 border-t border-solid border-[#EAECF0]">
                        <p className="text-sm text-[#475467]">Content of first collapsible</p>
                    </div>
                </Collapsible>
            </div>

            {/* Divider Line */}
            <div className="my-4 border-t border-solid border-[#EAECF0]"></div>

            {/* Second Collapsible Section */}
            <div className="border border-solid border-[#F7F8FB] rounded-xl">
                <div className="h-6 px-6 flex pt-3 items-center">
                    <span className="text-[#667085] font-medium text-sm">Resources</span>
                </div>
                <Collapsible
                    open={isOpen2}
                    onTriggerOpening={handleCollapsibleClick2}
                    onTriggerClosing={handleCollapsibleClick2}
                    trigger={
                        <div className="h-[76px] w-full px-6 flex flex-row justify-between items-center hover:bg-[#F9FAFB]">
                            <div className="flex flex-row gap-2">
                                <Image
                                    src={isOpen2 ? '/icons/Arrow-up.svg' : '/icons/Arrow-down-1.svg'}
                                    width={20}
                                    height={20}
                                    alt="Arrow-toggle"
                                />
                                <Image src="/icons/elements (3).svg" width={40} height={40} alt="elements" />
                                <div className="flex flex-col gap-1">
                                    <span className="font-semibold text-sm text-[#182230]">Resources</span>
                                    <span className="font-normal text-sm text-[#667085]">3 Channels</span>
                                </div>
                            </div>
                        </div>
                    }
                >
                    <div className="p-6 border-t border-solid border-[#EAECF0]">
                        <p className="text-sm text-[#475467]">Content of second collapsible</p>
                    </div>
                </Collapsible>
            </div>
        </div>
    );
}

export default Community;
