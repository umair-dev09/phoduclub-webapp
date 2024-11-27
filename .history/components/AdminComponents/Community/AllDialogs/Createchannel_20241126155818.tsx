"use client"
import { useState } from "react"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
// Define the props interface
interface createchannelProps {
    open: boolean; // Prop to control dialog visibility
    onClose: () => void; // Define onClose as a function
}
function createchannel({ open, onClose }: createchannelProps) {
    const [uniqueIDforname, setUniqueIDforname] = useState('');
    const [uniqueIDfordesc, setUniqueIDfordesc] = useState('');
    const handleInputChange = (e: any) => {
        const inputText = e.target.value;
        if (inputText.length <= 100) {
            setUniqueIDfordesc(inputText);

        }

    };
    // State to track the selected icon
    const [selectedIcon, setSelectedIcon] = useState("/icons/idea-2.svg");

    // Function to handle icon selection
    const handleIconSelect = (iconPath: React.SetStateAction<string>) => {
        setSelectedIcon(iconPath); // Update the selected icon state
    };
    const [open1, setOpen1] = useState(open); // Initiate with the prop 'open'
    const [open2, setOpen2] = useState(false);

    // Open second dialog and close the first
    const handleCreateChannelClick = () => {
        setOpen1(false);
        setOpen2(true);
    };

    // Close all dialogs
    const handleCloseAll = () => {
        setOpen1(false);
        setOpen2(false);
        onClose(); // Call parent onClose if needed
    };
    return (
        <div>


            <Dialog open={open} onClose={onClose} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 flex items-center justify-center">
                    <DialogPanel className="bg-white rounded-2xl w-[568px] h-auto flex flex-col ">
                        <div className=' flex flex-col p-6 gap-6 border-solid border-[#EAECF0] border-b rounded-t-2xl'>
                            <div className='flex flex-row justify-between items-center'>
                                <h1 className='text-[#1D2939] font-bold text-lg'>Create Channel</h1>
                                <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} onClick={onClose} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="font-semibold text-sm text-[#1D2939]">Channel name</span>
                                <div className='flex px-2 items-center h-[40px] border border-solid border-[#D0D5DD] shadow-sm rounded-md'>
                                    <Popover placement="bottom">
                                        <PopoverTrigger>
                                            <button className="flex flex-row w-[44px]  items-center rounded-md transition duration-200 ease-in-out justify-between ">
                                                <Image
                                                    src={selectedIcon}
                                                    width={24}
                                                    height={24}
                                                    alt="Selected Icon"
                                                />
                                                <Image
                                                    src="/icons/chevron-down.svg"
                                                    width={20}
                                                    height={20}
                                                    alt="Dropdown Arrow"
                                                />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="px-0 py-1 w-[56px] border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-md flex flex-col shadow-lg">

                                            {/* Idea Button */}
                                            <button
                                                className="flex flex-row w-full p-1 hover:bg-[#F2F4F7] justify-center items-center focus:outline-none"
                                                onClick={() => handleIconSelect("/icons/idea-2.svg")}
                                            >
                                                <Image
                                                    src="/icons/idea-2.svg"
                                                    width={24}
                                                    height={24}
                                                    alt="Idea Button"
                                                />
                                            </button>
                                            {/* Megaphone Button */}
                                            <button
                                                className="flex flex-row w-full p-1 hover:bg-[#F2F4F7] justify-center items-center"
                                                onClick={() => handleIconSelect("/icons/megaphone.svg")}
                                            >
                                                <Image
                                                    src="/icons/megaphone.svg"
                                                    width={24}
                                                    height={24}
                                                    alt="Megaphone Button"
                                                />
                                            </button>
                                            {/* Read Button */}
                                            <button
                                                className="flex flex-row w-full p-1 hover:bg-[#F2F4F7] justify-center items-center"
                                                onClick={() => handleIconSelect("/icons/read-2.svg")}
                                            >
                                                <Image
                                                    src="/icons/read-2.svg"
                                                    width={24}
                                                    height={24}
                                                    alt="Read Button"
                                                />
                                            </button>

                                        </PopoverContent>
                                    </Popover>
                                    <input
                                        className="font-normal text-[#667085] w-full text-sm placeholder:text-[#A1A1A1] rounded-md px-1 py-1 focus:outline-none focus:ring-0 "
                                        placeholder="Channel name"
                                        type="text"
                                        value={uniqueIDforname}
                                        onChange={(e) => setUniqueIDforname(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="font-semibold text-sm text-[#1D2939]">Channel description</span>
                                <div className="flex px-2 items-center h-[40px] border border-[#D0D5DD] shadow-sm rounded-md">

                                    <input
                                        className="text-[#667085] w-full text-sm placeholder-[#A1A1A1] px-1 py-1 focus:outline-none border-none"
                                        placeholder="Category name"
                                        value={uniqueIDfordesc}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <span className="text-sm text-[#475467] self-end">{uniqueIDfordesc.length}/100</span>
                            </div>


                        </div>
                        <div className="flex flex-row justify-end mx-6 my-4 gap-4">
                            <button className="py-[0.625rem] px-6 border-2  border-solid border-[#EAECF0] font-semibold text-sm text-[#1D2939] rounded-md" onClick={onClose} >Cancel</button>
                            <button className={`py-[0.625rem] px-6 text-white text-sm shadow-inner-button font-semibold ${uniqueIDfordesc ? "bg-[#9012FF]  border border-solid  border-[#9012FF]" : "bg-[#CDA0FC] cursor-not-allowed"} rounded-md`} onClick={open2}>Create Channel</button>
                        </div>
                    </DialogPanel>
                </div >
            </Dialog >
            <Dialog open={open2} onClose={onClose} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 flex items-center justify-center">
                    <DialogPanel className="bg-white rounded-2xl w-[568px] h-auto flex flex-col ">
                        <div className=' flex flex-col p-6 gap-6 border-solid border-[#EAECF0] border-b rounded-t-2xl'>
                            <div className='flex flex-row justify-between items-center'>
                                <h1 className='text-[#1D2939] font-bold text-lg'>Create Channel</h1>
                                <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} onClick={onClose} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="font-semibold text-sm text-[#1D2939]">Channel name</span>
                                <div className='flex px-2 items-center h-[40px] border border-solid border-[#D0D5DD] shadow-sm rounded-md'>
                                    <Popover placement="bottom">
                                        <PopoverTrigger>
                                            <button className="flex flex-row w-[44px]  items-center rounded-md transition duration-200 ease-in-out justify-between ">
                                                <Image
                                                    src={selectedIcon}
                                                    width={24}
                                                    height={24}
                                                    alt="Selected Icon"
                                                />
                                                <Image
                                                    src="/icons/chevron-down.svg"
                                                    width={20}
                                                    height={20}
                                                    alt="Dropdown Arrow"
                                                />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="px-0 py-1 w-[56px] border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-md flex flex-col shadow-lg">

                                            {/* Idea Button */}
                                            <button
                                                className="flex flex-row w-full p-1 hover:bg-[#F2F4F7] justify-center items-center focus:outline-none"
                                                onClick={() => handleIconSelect("/icons/idea-2.svg")}
                                            >
                                                <Image
                                                    src="/icons/idea-2.svg"
                                                    width={24}
                                                    height={24}
                                                    alt="Idea Button"
                                                />
                                            </button>
                                            {/* Megaphone Button */}
                                            <button
                                                className="flex flex-row w-full p-1 hover:bg-[#F2F4F7] justify-center items-center"
                                                onClick={() => handleIconSelect("/icons/megaphone.svg")}
                                            >
                                                <Image
                                                    src="/icons/megaphone.svg"
                                                    width={24}
                                                    height={24}
                                                    alt="Megaphone Button"
                                                />
                                            </button>
                                            {/* Read Button */}
                                            <button
                                                className="flex flex-row w-full p-1 hover:bg-[#F2F4F7] justify-center items-center"
                                                onClick={() => handleIconSelect("/icons/read-2.svg")}
                                            >
                                                <Image
                                                    src="/icons/read-2.svg"
                                                    width={24}
                                                    height={24}
                                                    alt="Read Button"
                                                />
                                            </button>

                                        </PopoverContent>
                                    </Popover>
                                    <input
                                        className="font-normal text-[#667085] w-full text-sm placeholder:text-[#A1A1A1] rounded-md px-1 py-1 focus:outline-none focus:ring-0 "
                                        placeholder="Channel name"
                                        type="text"
                                        value={uniqueIDforname}
                                        onChange={(e) => setUniqueIDforname(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="font-semibold text-sm text-[#1D2939]">Channel description</span>
                                <div className="flex px-2 items-center h-[40px] border border-[#D0D5DD] shadow-sm rounded-md">

                                    <input
                                        className="text-[#667085] w-full text-sm placeholder-[#A1A1A1] px-1 py-1 focus:outline-none border-none"
                                        placeholder="Category name"
                                        value={uniqueIDfordesc}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <span className="text-sm text-[#475467] self-end">{uniqueIDfordesc.length}/100</span>
                            </div>


                        </div>
                        <div className="flex flex-row justify-end mx-6 my-4 gap-4">
                            <button className="py-[0.625rem] px-6 border-2  border-solid border-[#EAECF0] font-semibold text-sm text-[#1D2939] rounded-md" onClick={onClose} >Cancel</button>
                            <button className={`py-[0.625rem] px-6 text-white text-sm shadow-inner-button font-semibold ${uniqueIDfordesc ? "bg-[#9012FF]  border border-solid  border-[#9012FF]" : "bg-[#CDA0FC] cursor-not-allowed"} rounded-md`} onClick={onClose}>Create Channel</button>
                        </div>
                    </DialogPanel>
                </div >
            </Dialog >
        </div>
    )
}
export default createchannel;

