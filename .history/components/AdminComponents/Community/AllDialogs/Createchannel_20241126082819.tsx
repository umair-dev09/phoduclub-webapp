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
const MAX_HEIGHT = 120; // Max height in pixels
const MIN_HEIGHT = 15;  // Minimum height in pixels
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
    const [text, setText] = useState('');

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        if (newText.length > 100) return; // Limit input length to 100 characters

        setText(newText);

        // Adjust textarea height dynamically
        e.target.style.height = 'auto';  // Reset to auto to recalculate scroll height
        const newHeight = Math.min(e.target.scrollHeight, MAX_HEIGHT);
        e.target.style.height = `${newHeight}px`;
    };


    return (
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
                                    placeholder="Category name"
                                    type="text"
                                    value={uniqueIDforname}
                                    onChange={(e) => setUniqueIDforname(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="font-semibold text-sm text-[#1D2939]">Channel description</span>
                            <div className="border border-solid bg-[#FCFCFD] border-[#D0D5DD] h-auto w-full rounded-md flex flex-row items-center p-2 justify-between">
                                <textarea
                                    placeholder="Description"
                                    className="w-full bg-[#FCFCFD] resize-none px-3 rounded-md outline-none font-normal text-sm leading-tight pt-1"
                                    style={{ minHeight: `${MIN_HEIGHT}px`, maxHeight: `${MAX_HEIGHT}px` }}
                                    value={text}
                                    onChange={handleInput}
                                />
                            </div>
                            <span className="text-sm text-[#475467] self-end">{text.length}/100</span>
                        </div>


                    </div>
                    <div className="flex flex-row justify-end mx-6 my-4 gap-4">
                        <button className="py-[0.625rem] px-6 border-2  border-solid border-[#EAECF0] font-semibold text-sm text-[#1D2939] rounded-md" onClick={onClose} >Cancel</button>
                        <button className={`py-[0.625rem] px-6 text-white text-sm shadow-inner-button font-semibold ${uniqueIDfordesc ? "bg-[#9012FF]  border border-solid  border-[#9012FF]" : "bg-[#CDA0FC] cursor-not-allowed"} rounded-md`} onClick={onClose}>Create Channel</button>
                    </div>
                </DialogPanel>
            </div >
        </Dialog >
    )
}
export default createchannel;




