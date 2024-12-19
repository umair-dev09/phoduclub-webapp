"use client";
import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";

interface DialogProps {
    open: boolean;
    onClose: () => void;
}

const priorities = [
    { label: "Low", color: "#0B9055" },
    { label: "Medium", color: "#DB6704" },
    { label: "High", color: "#DE3024" },
];

function Allsubject({ onClose, open }: DialogProps) {
    const [uniqueId, setUniqueId] = useState(false);
    const [priority, setPriority] = useState<string | null>(null);
    const [priorityColor, setPriorityColor] = useState<string>("transparent");
    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const handlePrioritySelection = (selectedPriority: string) => {
        setPriority(selectedPriority);
        const selectedColor = priorities.find((item) => item.label === selectedPriority)?.color || "transparent";
        setPriorityColor(selectedColor);
    };

    const isFormValid = uniqueId && priority;

    return (
        <Dialog open={open} onClose={onClose} className="relative z-50" role="dialog" aria-modal="true">
            <DialogBackdrop className="fixed inset-0 bg-black/30" />
            <div className="fixed inset-0 flex items-center justify-center">
                <DialogPanel className="bg-white rounded-2xl w-[480px] h-auto flex flex-col">
                    <div className="flex flex-col p-6 gap-3 border-solid border-[#EAECF0] border-b rounded-t-2xl">
                        <div className="flex flex-row justify-between items-center">
                            <h1 className="text-[#1D2939] font-bold text-lg">Create Chapter</h1>
                            <button
                                className="w-[32px] h-[32px] rounded-full flex items-center justify-center hover:bg-[#F2F4F7]"
                                onClick={onClose}
                                aria-label="Close dialog"
                            >
                                <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                            </button>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="font-semibold text-sm text-[#1D2939]">Chapter Name</span>
                            <div className="flex px-2 items-center h-[40px] border border-gray-300 focus-within:ring-4 focus-within:ring-[#E8DEFB] rounded-md">
                                <input
                                    className="font-normal text-[#667085] w-full text-sm placeholder:text-[#A1A1A1] rounded-md px-1 py-1 focus:outline-none"
                                    type="text"
                                    placeholder="Chapter Name"
                                    onChange={(e) => setUniqueId(!!e.target.value.trim())}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <label className="text-[#1D2939] text-sm font-medium">Priority</label>
                            <Popover placement="bottom">
                                <PopoverTrigger>
                                    <div
                                        className={`flex flex-row py-2 px-4 w-full gap-2 border h-10 rounded-md items-center justify-between cursor-pointer
                                           ${isFocused
                                                ? "outline-none ring-0 border-[#D6BBFB] shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]"
                                                : "border-gray-300"
                                            }`}
                                        tabIndex={0} // Makes the div focusable
                                        onFocus={handleFocus}
                                        onBlur={handleBlur}
                                        onClick={handleFocus} // Ensures focus is triggered on click
                                    >
                                        <div className="flex flex-row gap-2 items-center justify-center">
                                            <div
                                                className="w-2 h-2 rounded-full"
                                                style={{ backgroundColor: priorityColor }}
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
                                <PopoverContent className=" bg-white border border-lightGrey rounded-md shadow-md px-0 w-[432px]">
                                    {priorities.map((item) => (
                                        <button
                                            key={item.label}
                                            className="flex justify-between items-center  w-full  px-4 py-2 hover:bg-[#F2F4F7] transition-colors"
                                            onClick={() => handlePrioritySelection(item.label)}
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
                                                <Image src="/icons/tick-02.svg" width={18} height={18} alt="Selected" />
                                            )}
                                        </button>
                                    ))}

                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <div className="flex flex-row justify-end mx-6 my-4 gap-4">
                        <button
                            className="py-[0.625rem] px-6 border-2 border-solid border-[#EAECF0] font-semibold text-sm text-[#1D2939] rounded-md hover:bg-[#F2F4F7]"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            className={`py-[0.625rem] px-6 rounded-md text-white text-sm shadow-inner-button font-semibold ${isFormValid
                                ? "border border-solid border-[#9012FF] bg-[#9012FF]"
                                : "bg-[#CDA0FC]"
                                }`}
                            disabled={!isFormValid}
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
