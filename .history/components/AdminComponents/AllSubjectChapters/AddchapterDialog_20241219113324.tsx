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
    const [roleDialogOpen, setRoleDialogOpen] = useState(false); // Loading state
    const [selectedCourses, setSelectedCourses] = useState<string[]>([]); // Track selected courses

    // Toggle course selection
    const toggleCourse = (course: string) => {
        setSelectedCourses((prev) =>
            prev.includes(course) ? prev.filter((item) => item !== course) : [...prev, course]
        );
    }

    const ROLE_OPTIONS = ["Admin", "Teacher", "Customer Care", "Editor", "Chief Moderator"];

    const handleRoleSelect = (role: string) => {
        setSelectedRole(role);
        setRoleDialogOpen(false);
    };
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
                            <div className="flex px-2 items-center h-[40px] border border-gray-300 focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB] focus-within:border-[#D7BBFC] focus-within:ring-4 focus-within:ring-[#E8DEFB] focus-within:outline-none transition-colors shadow-sm rounded-md">
                                <input
                                    className="font-normal text-[#667085] w-full text-sm placeholder:text-[#A1A1A1] rounded-md px-1 py-1 focus:outline-none focus:ring-0 border-none"
                                    type="text"
                                    placeholder="Chapter Name"
                                    onChange={(e) => setUniqueId(!!e.target.value.trim())} // Update state based on input value
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <label className="text-[#1D2939] text-sm font-medium">Role</label>
                            <div className="flex flex-row py-2 px-4 w-full gap-2 border border-gray-300  h-10 focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB] rounded-md transition duration-200 ease-in-out justify-between" onClick={() => setRoleDialogOpen(true)}>
                                <span className="font-normal text-sm text-[#182230]">{selectedRole || "Select Role"}</span>
                                <Popover placement="bottom-end" isOpen={roleDialogOpen} onOpenChange={(open) => setRoleDialogOpen(open)}>
                                    <PopoverTrigger>
                                        <button>
                                            <Image src="/icons/by-role-arrow-down.svg" width={20} height={20} alt="Select-role Button" />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[450px] ml-5 px-0 py-1 bg-white border border-lightGrey rounded-md">
                                        <div className="w-full">
                                            {["Admin", "Teacher", "Customer Care", "Editor", "Chief Moderator"].map((role) => (
                                                <button
                                                    key={role}
                                                    onClick={() => { handleRoleSelect(role); }}
                                                    className="flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#F2F4F7]"
                                                >
                                                    <span className="text-sm text-[#0C111D] font-normal">{role}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
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
