"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React from 'react';

type QuizProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

function Quiz({ isOpen, setIsOpen }: QuizProps) {
    const [selectedReason, setSelectedReason] = useState<string | null>(null);
    const [inputText, setInputText] = useState<string>("");
    const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);

    // Function to handle button click for reasons
    const handleReasonClick = (reason: string) => {
        setSelectedReason(reason);
        if (reason !== "Something else") {
            setIsSubmitDisabled(false); // Enable Submit button if not "Something else"
        }
    };

    // Handle input change for the textarea
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setInputText(value);
        if (value.trim() !== "") {
            setIsSubmitDisabled(false); // Enable the Submit button when there is text
        } else {
            setIsSubmitDisabled(true); // Disable if the textarea is empty
        }
    };

    const handleSubmit = () => {
        if (inputText.trim() !== "") {
            // Perform the report submission logic here
            setIsOpen(false); // Close the dialog
        }
    };

    return (
        <>
            {/* Initial Dialog */}
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                {/* Backdrop */}
                <DialogBackdrop className="fixed inset-0 bg-black/30 " />

                {/* Dialog Wrapper */}
                <div className="fixed inset-0 flex items-center justify-center ">
                    <DialogPanel className="bg-white rounded-2xl w-[480px] h-auto border border-[#EAECF0]">
                        <div className="h-[126px] border-b border-solid border-[#EAECF0] px-[24px] pt-[20px]">
                            <div className="flex items-center justify-between ">
                                <span className="text-lg font-bold text-[#1D2939]">Report</span>
                                <button onClick={() => setIsOpen(false)}>
                                    <Image src="/icons/cancel.svg" alt="cancel" width={18} height={18} />
                                </button>
                            </div>
                            <div className="pt-[6px]">
                                <span className="text-sm text-[#667085] font-sm">
                                    Lorem ipsum is a dummy text widely used in the digital industry and will be used here as a preview.
                                </span>
                            </div>
                        </div>

                        {/* Reason selection buttons */}
                        <div className="h-auto border-b border-solid border-[#EAECF0] px-[24px] pt-[24px] pb-3">
                            <span className="text-[#344054] font-medium text-sm">Why are you reporting this message?</span>
                            <div className="pt-4 flex flex-row gap-2 h-auto ">
                                {["Scam", "Nudity", "Violence", "Illegal", "Hate Speech", "Something else"].map((reason) => (
                                    <button
                                        key={reason}
                                        className={`group ${selectedReason === reason ? 'bg-[#9012FF] text-white' : 'border-[#D0D5DD]'}`}
                                        onClick={() => handleReasonClick(reason)}
                                    >
                                        <div className={`h-[28px] w-auto rounded-[6px] border-2 border-solid px-2 hover:bg-[#9012FF] hover:border-[#9012FF] flex flex-row justify-center items-center`}>
                                            <span className={`text-[#344054] group-hover:text-[#FFFFFF] font-medium text-sm`}>
                                                {reason}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Reason and input area */}
                            {(selectedReason && selectedReason !== null) && (
                                <>
                                    <div className="pt-[24px] mb-1">
                                        <span className="text-[#344054] font-medium text-sm ">Reason</span>
                                    </div>
                                    <div className="rounded-md border-2 border-solid border-[#D0D5DD] h-[160px]">
                                        <textarea
                                            placeholder="Write a message"
                                            className="outline-none placeholder-[#667085] text-sm font-normal w-full h-full p-2 resize-none rounded-md"
                                            value={inputText}
                                            onChange={handleInputChange}
                                            disabled={selectedReason !== "Something else"}
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="w-full h-[76px] flex justify-end gap-2 px-6">
                            <div className="mt-5">
                                <button
                                    className="bg-[#FFFFFF] text-[#1D2939] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px]"
                                    style={{ border: "1.5px solid #EAECF0" }}
                                    onClick={() => setIsOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                            <div className="mt-5">
                                <button
                                    className={`bg-[#8501FF] text-[#FFFFFF] text-sm font-semibold py-2 px-5 rounded-md w-auto h-[44px] ${isSubmitDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    style={{
                                        border: "1px solid #800EE2",
                                        boxShadow: "0px -4px 4px 0px #1018281F inset, 0px 3px 2px 0px #FFFFFF3D inset",
                                    }}
                                    onClick={handleSubmit}
                                    disabled={isSubmitDisabled}
                                >
                                    Submit report
                                </button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
}

export default Quiz;
