import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React, { useState } from "react";

// Define the props interface
interface DeleteQuizProps {
    open: boolean; // Prop to control dialog visibility
    onClose: () => void; // Function to close the dialog
}

function DeleteQuiz({ open, onClose }: DeleteQuizProps) {
    const [uniqueID, setUniqueID] = useState(""); // Changed to an empty string for input handling

    return (
        <Dialog open={open} onClose={onClose} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/30" />
            <div className="fixed inset-0 flex items-center justify-center">
                <DialogPanel className="bg-white rounded-2xl w-[480px] h-auto flex flex-col">
                    {/* Header Section */}
                    <div className="flex flex-col p-6 gap-3 border-solid border-[#EAECF0] border-b rounded-t-2xl">
                        <div className="flex flex-row justify-between items-center">
                            <h1 className="text-[#1D2939] font-bold text-lg">
                                {/* Delete quiz "Physics"? */}
                            </h1>
                            <button
                                className="w-[32px] h-[32px] rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]"
                                onClick={onClose}
                            >
                                <Image
                                    src="/icons/cancel.svg"
                                    alt="Cancel"
                                    width={20}
                                    height={20}
                                />
                            </button>
                        </div>
                        <span className="font-normal text-sm text-[#667085]">
                            All category, channels & chats inside this group will be gone.
                        </span>
                        {/* Input Section */}
                        <div className="flex flex-col gap-1">
                            <span className="font-semibold text-sm text-[#1D2939]">
                                To confirm, please enter the name of the category.
                            </span>
                            <div className="flex px-2 items-center h-[40px] border border-solid border-[#D0D5DD] shadow-sm rounded-md">
                                <input
                                    className="font-normal text-[#667085] w-full text-sm placeholder:text-[#A1A1A1] rounded-md px-1 py-1 focus:outline-none focus:ring-0 border-none"
                                    type="text"
                                    placeholder="Enter category name"
                                    value={uniqueID}
                                    onChange={(e) => setUniqueID(e.target.value)} // Handle input change
                                />
                            </div>
                        </div>
                    </div>
                    {/* Footer Section */}
                    <div className="flex flex-row justify-end mx-6 my-4 gap-4">
                        <button
                            className="py-[0.625rem] px-6 border-2 border-solid border-[#EAECF0] font-semibold text-sm text-[#1D2939] rounded-md hover:bg-[#F2F4F7]"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            className={`py-[0.625rem] px-6 text-white text-sm shadow-inner-button font-semibold border border-solid border-white rounded-md ${uniqueID.trim() === ""
                                    ? "bg-[#f3b7b3] cursor-not-allowed"
                                    : "bg-[#BB241A]"
                                }`}
                            disabled={uniqueID.trim() === ""} // Disable button when input is empty
                        >
                            Delete quiz
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}

export default DeleteQuiz;
