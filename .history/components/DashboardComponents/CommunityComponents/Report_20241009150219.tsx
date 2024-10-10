"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React from 'react';

type QuizProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

function Quiz({ isOpen, setIsOpen }: QuizProps) {
    const [selectedReason, setSelectedReason] = useState<string | null>(null);
    const [customReason, setCustomReason] = useState("");
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

    // Enable submit button only if custom reason has text in it
    useEffect(() => {
        if (selectedReason === "Something else" && customReason.trim() === "") {
            setIsSubmitDisabled(true);
        } else {
            setIsSubmitDisabled(false);
        }
    }, [selectedReason, customReason]);

    const handleReasonClick = (reason: string) => {
        setSelectedReason(reason);
        setCustomReason(""); // Reset custom reason when choosing a predefined reason
    };

    const handleCustomReasonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCustomReason(e.target.value);
    };

    const handleSubmit = () => {
        // Logic for submitting the report
        console.log(`Reason: ${selectedReason}, Custom Input: ${customReason}`);
        setIsOpen(false); // Close the dialog on submit
    };

    const closeDialog = () => {
        setSelectedReason(null);
        setCustomReason("");
        setIsOpen(false);
    };

    return (
        <>
            <Dialog open={isOpen} onClose={closeDialog} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/30 " />
                <div className="fixed inset-0 flex items-center justify-center ">
                    <DialogPanel transition className="bg-white rounded-2xl w-[480px] h-auto border border-[#EAECF0]">
                        <div className="h-[126px] border-b border-solid border-[#EAECF0] px-[24px] pt-[20px]">
                            <div className="flex items-center justify-between ">
                                <span className="text-lg font-bold text-[#1D2939] fontstyle-sora">Report</span>
                                <button onClick={closeDialog}>
                                    <Image src="/icons/cancel.svg" alt="cancel" width={18} height={18} />
                                </button>
                            </div>
                            <div className="pt-[6px]">
                                <span className="text-sm text-[#667085] font-sm">
                                    Select the reason why you are reporting this message.
                                </span>
                            </div>
                        </div>

                        <div className="h-auto border-b border-solid border-[#EAECF0] px-[24px] pt-[24px] pb-3">
                            <span className="text-[#344054] font-medium text-sm">Why are you reporting this message?</span>

                            {/* Reason buttons */}
                            <div className="pt-4 flex flex-row gap-2 flex-wrap h-auto ">
                                {["Spam", "Nudity", "Scam", "Illegal", "Violence", "Hate Speech"].map((reason) => (
                                    <button
                                        key={reason}
                                        className={`group ${selectedReason === reason ? 'bg-[#9012FF] border-[#9012FF] text-white' : 'border-[#D0D5DD]'}`}
                                        onClick={() => handleReasonClick(reason)}
                                    >
                                        <div className="h-[28px] w-auto rounded-[6px] border-2 px-2 hover:bg-[#9012FF] hover:border-[#9012FF] flex items-center">
                                            <span className={`text-sm ${selectedReason === reason ? 'text-white' : 'text-[#344054]'}`}>
                                                {reason}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Something else button */}
                            <div className="pt-2 flex flex-row gap-2 h-auto ">
                                <button
                                    className={`group ${selectedReason === "Something else" ? 'bg-[#9012FF] border-[#9012FF] text-white' : 'border-[#D0D5DD]'}`}
                                    onClick={() => handleReasonClick("Something else")}
                                >
                                    <div className="h-[28px] w-auto rounded-[6px] border-2 px-2 hover:bg-[#9012FF] hover:border-[#9012FF] flex items-center">
                                        <span className={`text-sm ${selectedReason === "Something else" ? 'text-white' : 'text-[#344054]'}`}>
                                            Something else
                                        </span>
                                    </div>
                                </button>
                            </div>

                            {/* Reason textarea, shown when Something else is selected */}
                            {selectedReason && (
                                <div className="pt-[24px] mb-1">
                                    <span className="text-[#344054] font-medium text-sm">Reason</span>
                                    <div className="rounded-md border-2 border-solid border-[#D0D5DD] h-[160px]">
                                        <textarea
                                            value={selectedReason === "Something else" ? customReason : selectedReason}
                                            onChange={selectedReason === "Something else" ? handleCustomReasonChange : undefined}
                                            placeholder="Write a message"
                                            disabled={selectedReason !== "Something else"}
                                            className="outline-none placeholder-[#667085] text-sm font-normal w-full h-full p-2 resize-none rounded-md"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Action buttons */}
                        <div className="w-full h-[76px] flex justify-end gap-2 px-6">
                            <div className="mt-5">
                                <button
                                    className="bg-[#FFFFFF] text-[#1D2939] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px]"
                                    style={{ border: "1.5px solid #EAECF0" }}
                                    onClick={closeDialog}
                                >
                                    Cancel
                                </button>
                            </div>
                            <div className="mt-5">
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitDisabled}
                                    className={`text-sm font-semibold py-2 px-5 rounded-md w-auto h-[44px] ${isSubmitDisabled ? 'bg-gray-400' : 'bg-[#8501FF] text-white'}`}
                                    style={{
                                        border: isSubmitDisabled ? '1px solid #D0D5DD' : '1px solid #800EE2',
                                        boxShadow: isSubmitDisabled ? 'none' : '0px -4px 4px 0px #1018281F inset, 0px 3px 2px 0px #FFFFFF3D inset',
                                    }}
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
