"use client";
import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";

interface DialogProps {
    open: boolean;
    onClose: () => void;
}

function Allsubject({ onClose, open }: DialogProps) {
    const [uniqueId, setUniqueId] = useState(false);
    const [priority, setPriority] = useState<string | null>(null);

    const priorities = [
        { label: "Low", color: "#0B9055" },
        { label: "Medium", color: "#DB6704" },
        { label: "High", color: "#DE3024" },
    ];

    return (
        <Dialog open={open} onClose={onClose} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/30" />
            <div className="fixed inset-0 flex items-center justify-center">
                <DialogPanel className="bg-white rounded-2xl w-[480px] h-auto flex flex-col">
                    {/* Header */}
                    <div className="flex flex-col p-6 gap-3 border-solid border-[#EAECF0] border-b rounded-t-2xl">
                        <div className="flex flex-row justify-between items-center">
                            <h1 className="text-[#1D2939] font-bold text-lg">Create Chapter</h1>
                            <button
                                className="w-[32px] h-[32px] rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]"
                                onClick={onClose}
                            >
                                <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                            </button>
                        </div>
                        {/* Input Section */}
                        <div className="flex flex-col gap-1">
                            <span className="font-semibold text-sm text-[#1D2939]">Chapter Name</span>
                            <div className="flex px-2 items-center h-[40px] border border-gray-300 focus-within:ring-4 focus-within:ring-[#E8DEFB] rounded-md">
                                <input
                                    className="font-normal text-[#667085] w-full text-sm placeholder:text-[#A1A1A1] rounded-md px-1 py-1 focus:outline-none border-none"
                                    type="text"
                                    placeholder="Chapter Name"
                                    onChange={(e) => setUniqueId(!!e.target.value.trim())}
                                />
                            </div>
                        </div>
                        {/* Priority Section */}
                        <div className="flex flex-col gap-1 w-full">
                            <label className="text-[#1D2939] text-sm font-medium">Priority</label>
                            <Popover>
                                <PopoverTrigger>
                                    <div className="flex flex-row py-2 px-4 w-full gap-2 border border-gray-300 h-10 rounded-md items-center justify-between cursor-pointer">
                                        <div className="flex flex-row gap-2">
                                            <div
                                                className={`w-2 h-2 rounded-full ${priority ? priorityColor : "bg-transparent"}`} // Dynamically apply color class
                                            ></div>
                                            <span className="font-normal text-sm text-[#182230]">
                                                {priority ? priority : "Select Priority"}
                                            </span>
                                        </div>
                                        <Image
                                            src="/icons/by-role-arrow-down.svg"
                                            width={20}
                                            height={20}
                                            alt="Select-role Button"
                                        />
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className="w-full bg-white border border-lightGrey rounded-md shadow-md">
                                    <div className="flex flex-col w-full">
                                        {priorities.map((item) => (
                                            <button
                                                key={item.label}
                                                className="flex justify-between items-center px-4 py-2 hover:bg-[#F2F4F7] transition-colors"
                                                onClick={() => setPriority(item.label)}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className="w-2 h-2 rounded-full"
                                                        style={{ backgroundColor: item.color }}
                                                    ></div>
                                                    <span className="text-[#0C111D] font-normal text-sm">
                                                        {item.label}
                                                    </span>
                                                </div>
                                                {priority === item.label && (
                                                    <Image
                                                        src="/icons/tick-02.svg"
                                                        width={18}
                                                        height={18}
                                                        alt="Selected"
                                                    />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    {/* Footer Buttons */}
                    <div className="flex flex-row justify-end mx-6 my-4 gap-4">
                        <button
                            className="py-[0.625rem] px-6 border-2 border-solid border-[#EAECF0] font-semibold text-sm text-[#1D2939] rounded-md hover:bg-[#F2F4F7]"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            className={`py-[0.625rem] px-6 rounded-md text-white text-sm shadow-inner-button font-semibold ${uniqueId
                                ? "border border-solid border-[#9012FF] bg-[#9012FF]"
                                : "bg-[#CDA0FC]"
                                }`}
                        >
                            Create Chapter
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}

export default Allsubject;
