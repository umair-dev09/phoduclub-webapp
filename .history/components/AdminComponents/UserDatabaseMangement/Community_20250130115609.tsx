import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import Image from "next/image";
import Collapsible from 'react-collapsible';
import { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
const data = [
    {
        title: "JEE - 2024",
        channels: [
            { name: "Study materials", icon: "/icons/studymaterial.png" },
            { name: "Quiz talk", icon: "/icons/QuiqTalk.png" },
            { name: "Physics 101", icon: "/icons/PhyiscsQuicktest.png" },
            { name: "Chemistry", icon: "/icons/ChemistryQuicktest.png" },
            { name: "Maths", icon: "/icons/MathsQuicktest.png" },
        ],
    },
    {
        title: "NEET - 2024",
        channels: [
            { name: "Study materials", icon: "/icons/studymaterial.png" },
            { name: "Biology", icon: "/icons/ChemistryQuicktest.png" },
            { name: "Physics", icon: "/icons/PhyiscsQuicktest.png" },
            { name: "Chemistry", icon: "/icons/ChemistryQuicktest.png" },
        ],
    },
    {
        title: "JEE - 2024",
        channels: [
            { name: "Study materials", icon: "/icons/studymaterial.png" },
            { name: "Quiz talk", icon: "/icons/QuiqTalk.png" },
            { name: "Physics 101", icon: "/icons/PhyiscsQuicktest.png" },
            { name: "Chemistry", icon: "/icons/ChemistryQuicktest.png" },
            { name: "Maths", icon: "/icons/MathsQuicktest.png" },
        ],
    },
    {
        title: "NEET - 2024",
        channels: [
            { name: "Study materials", icon: "/icons/studymaterial.png" },
            { name: "Biology", icon: "/icons/ChemistryQuicktest.png" },
            { name: "Physics", icon: "/icons/PhyiscsQuicktest.png" },
            { name: "Chemistry", icon: "/icons/ChemistryQuicktest.png" },
        ],
    },

];

function Community() {
    const [removegroup, setRemovegroup] = useState(false);
    const [removechannel, setRemovechannel] = useState(false);
    const [popoveropen1, setPopoveropen1] = useState<number | null>(null);
    const [popoveropen2, setPopoveropen2] = useState<number | null>(null);
    const handlePopoverOpen1 = (index: number) => {
        setPopoveropen1(index);
    };
    const handlePopoverOpen2 = (index: number) => {
        setPopoveropen2(index);
    };
    const [isOpenArray, setIsOpenArray] = useState(
        new Array(data.length).fill(false) // Dynamically initialize based on the number of groups
    );


    // Function to toggle a specific collapsible's state
    const toggleCollapsible = (index: number) => {
        const newIsOpenArray = [...isOpenArray];
        newIsOpenArray[index] = !newIsOpenArray[index]; // Toggle the specific index
        setIsOpenArray(newIsOpenArray);
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

            <div className=" border border-solid border-[#F7F8FB rounded-xl h-auto">
                <div className="px-6 py-3 flex items-center text-[#667085] font-medium text-sm">Groups</div>
                {data.map((group, index) => (
                    <Collapsible
                        key={index}


                        trigger={
                            <div
                                className={`h-[76px] w-full px-6 flex flex-row justify-between items-center border-t border-lightGrey transition-colors hover:bg-[#F9FAFB] ${isOpenArray[index] ? "" : "rounded-b-xl"
                                    }`}
                                onClick={() => toggleCollapsible(index)}
                            >
                                <div className="flex flex-row gap-2"
                                >
                                    <Image
                                        src={
                                            isOpenArray[index]
                                                ? "/icons/Arrow-up.svg"
                                                : "/icons/Arrow-down-1.svg"
                                        }
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
                                        <span className="font-semibold text-sm text-[#182230]">
                                            {group.title}
                                        </span>
                                        <span className="font-normal text-sm text-[#667085]">
                                            {group.channels.length} Channels
                                        </span>
                                    </div>
                                </div>
                                <Popover placement="bottom-end"
                                    isOpen={popoveropen1 === index}
                                    onOpenChange={(open) => open ? handlePopoverOpen1(index) : setPopoveropen1(null)}>
                                    <PopoverTrigger>
                                        <button>
                                            <Image
                                                src="/icons/more-vertical.svg"
                                                alt="more"
                                                width={24}
                                                height={24}
                                            />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto px-0 py-1 rounded-md">
                                        <button
                                            className="flex flex-row items-center w-full px-4 py-[0.625rem] gap-2 transition-colors hover:bg-[#F2F4F7]"
                                            onClick={(e) => { e.stopPropagation(); setPopoveropen1(null) }}
                                        >
                                            <Image
                                                src="/icons/delete.svg"
                                                alt="delete"
                                                width={18}
                                                height={18}
                                            />
                                            <p className="text-sm text-[#DE3024] font-normal">
                                                Remove from group
                                            </p>
                                        </button>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        }
                        transitionTime={350}
                        open={isOpenArray[index]}
                    >
                        <div className="rounded-lg h-auto border border-solid border-[#EAECF0] mx-6 mb-4">
                            {group.channels.map((channel, channelIndex) => (
                                <div
                                    key={channelIndex}
                                    className={`flex flex-row h-[50px] justify-between items-center p-6 ${channelIndex !== 0 ? "border-t border-solid border-[#EAECF0]" : ""
                                        }`}
                                >
                                    <div className="flex flex-row gap-2">
                                        <Image
                                            src={channel.icon}
                                            width={14}
                                            height={20}
                                            alt={channel.name}
                                        />
                                        <span className="font-normal text-sm text-[#475467]">
                                            {channel.name}
                                        </span>
                                    </div>
                                    <Popover placement="bottom-end"
                                        isOpen={popoveropen1 === channelIndex}
                                        onOpenChange={(open) => open ? handlePopoverOpen1(channelIndex) : setPopoveropen1(null)}>
                                        <PopoverTrigger>
                                            <button>
                                                <Image
                                                    src="/icons/more-vertical.svg"
                                                    alt="more"
                                                    width={24}
                                                    height={24}
                                                />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto px-0 py-1 rounded-md">
                                            <button
                                                className="flex flex-row items-center w-full px-4 py-[0.625rem] gap-2 transition-colors hover:bg-[#F2F4F7]"
                                                {() => { setPopoveropen2(null); }}
                                            >
                                                <Image
                                                    src="/icons/delete.svg"
                                                    alt="delete"
                                                    width={18}
                                                    height={18}
                                                />
                                                <p className="text-sm text-[#DE3024] font-normal">
                                                    Remove from channel
                                                </p>
                                            </button>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            ))}
                        </div>
                    </Collapsible>
                ))}
            </div>
            <Modal
                isOpen={remove}
                onOpenChange={(isOpen) => !isOpen && setRemove(false)}
                hideCloseButton
            >
                <ModalContent>
                    <>
                        {/* Modal Header */}
                        <ModalHeader className="flex flex-row justify-between items-center gap-1">
                            <h3 className=" font-bold task-[#1D2939]">Remove Acess</h3>
                            <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7] ">
                                <button className="" onClick={() => setRemove(false)}>
                                    <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                                </button>
                            </button>
                        </ModalHeader>

                        {/* Modal Body */}
                        <ModalBody className="">
                            <p className=" text-sm  pb-2 font-normal text-[#667085]">Are you sure you want to remove the access?</p>
                        </ModalBody>

                        {/* Modal Footer */}
                        <ModalFooter className="border-t border-lightGrey">
                            <Button variant="light" className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md font-semibold text-sm hover:bg-[#F2F4F7] " onClick={() => setRemove(false)}>Cancel</Button>
                            <Button onClick={() => setRemove(false)} className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#BB241A] hover:bg-[#B0201A] font-semibold text-sm  rounded-md">Remove</Button>
                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal>
        </div>
    )
}
export default Community;