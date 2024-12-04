"use client";

import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React from "react";

function HelpDropDown() {
    // State to manage dialog visibility
    const [isOpen, setIsOpen] = useState(false);
    const [uniqueID, setUniqueID] = useState('');

    // Handlers for opening and closing the dialog
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <div>
            {/* Trigger Button */}
            <div className="mx-2">
                <button
                    className="w-[32px] h-[32px] bg-[#F7F8FA] border-[1.5px] border-[#EAECF0] rounded-full flex items-center justify-center"
                    onClick={handleOpen}
                >
                    <Image
                        src="/icons/help-circle.svg"
                        width={16}
                        height={16}
                        alt="Help Icon"
                    />
                </button>
            </div>

            {/* Dialog Component */}
            <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 flex items-center justify-center">
                    <DialogPanel className="bg-white rounded-2xl w-[480px] h-auto flex flex-col">
                        <div className="flex flex-col p-6 gap-3 border-solid border-[#EAECF0] border-b rounded-t-2xl">
                            <div className="flex flex-row justify-between items-center">
                                <h1 className="text-[#1D2939] font-bold text-lg">
                                    Delete channel “Announcement”?
                                </h1>
                                <Image
                                    src="/icons/cancel.svg"
                                    alt="Cancel"
                                    width={20}
                                    height={20}
                                    onClick={handleClose}
                                />
                            </div>
                            <span className="font-normal text-sm text-[#667085]">
                                All data inside this channel will be gone.
                            </span>
                            <div className="flex flex-col gap-1">
                                <span className="font-semibold text-sm text-[#1D2939]">
                                    To confirm, please enter the name of the channel.
                                </span>
                                <div className="flex px-2 items-center h-[40px] border border-solid border-[#D0D5DD] shadow-sm rounded-md">
                                    <input
                                        className="font-normal text-[#667085] w-full text-sm placeholder:text-[#A1A1A1] rounded-md px-1 py-1 focus:outline-none focus:ring-0 border-none"
                                        type="text"
                                        value={uniqueID}
                                        onChange={(e) => setUniqueID(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row justify-end mx-6 my-4 gap-4">
                            <button
                                className="py-[0.625rem] px-6 border-2 border-solid border-[#EAECF0] font-semibold text-sm text-[#1D2939] rounded-md"
                                onClick={handleClose}
                            >
                                Cancel
                            </button>
                            <button
                                className={`py-[0.625rem] px-6 text-white text-sm shadow-inner-button font-semibold ${uniqueID
                                        ? "bg-[#BB241A] border border-solid border-[#DE3024]"
                                        : "bg-[#f3b7b3] cursor-not-allowed"
                                    } rounded-md`}
                                onClick={handleClose}
                                disabled={!uniqueID}
                            >
                                Delete Channel
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    );
}

export default HelpDropDown;
