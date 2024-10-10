"use client";
import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React from "react";

type QuizProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

function Quiz({ isOpen, setIsOpen }: QuizProps) {
    const [reasonVisible, setReasonVisible] = useState(false);
    const [selectedReason, setSelectedReason] = useState("");
    const [reasonText, setReasonText] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [activeButton, setActiveButton] = useState(""); // State to track the active button

    const handleReasonClick = (reason: string) => {
        setSelectedReason(reason);
        setActiveButton(reason); // Set the clicked button as active

        if (reason === "Something else") {
            setReasonVisible(true);
            setIsButtonDisabled(true);
        } else {
            setReasonVisible(false);
            setIsButtonDisabled(false);
        }
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setReasonText(e.target.value);
        if (e.target.value.trim() !== "") {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    };

    const cancelReport = () => {
        setIsOpen(false);
        setActiveButton(""); // Reset the active button on cancel
        setSelectedReason("");
        setReasonVisible(false);
        setReasonText("");
        setIsButtonDisabled(false);
    };

    return (
        <>
            <Dialog open={isOpen} onClose={cancelReport} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/30 " />

                <div className="fixed inset-0 flex items-center justify-center ">
                    <DialogPanel transition className="bg-white rounded-2xl w-[480px] h-auto border border-[#EAECF0]">
                        <div className="h-[126px] border-b border-solid border-[#EAECF0] px-[24px] pt-[20px]">
                            <div className="flex items-center justify-between ">
                                <span className="text-lg font-bold text-[#1D2939] fontstyle-sora">Report</span>
                                <button onClick={cancelReport}>
                                    <Image src="/icons/cancel.svg" alt="cancel" width={18} height={18} />
                                </button>
                            </div>
                            <div className="pt-[6px]">
                                <span className="text-sm text-[#667085] font-sm">
                                    Lorem ipsum is a dummy text widely used in the digital industry and will be used here as a preview.
                                </span>
                            </div>
                        </div>

                        <div className="h-auto border-b border-solid border-[#EAECF0] px-[24px] pt-[24px] pb-3">
                            <span className="text-[#344054] font-medium text-sm">Why are you reporting this message?</span>
                            <div className="pt-4 flex flex-row gap-2 h-auto ">
                                {["Scam", "Nudity", "Illegal", "Violence", "Hate Speech", "Something else"].map((reason) => (
                                    <button
                                        key={reason}
                                        className={`group ${activeButton === reason ? "bg-[#9012FF] text-[#FFFFFF]" : ""}`} // Add active style
                                        onClick={() => handleReasonClick(reason)}
                                    >
                                        <div
                                            className={`h-[28px] w-auto rounded-[6px] border-2 border-solid border-[#D0D5DD] px-2 flex flex-row justify-center items-center ${activeButton === reason ? "border-[#9012FF]" : "hover:bg-[#9012FF] hover:border-[#9012FF]"
                                                }`}
                                        >
                                            <span className={`text-[#344054] group-hover:text-[#FFFFFF] font-medium text-sm`}>
                                                {reason}
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* TEXT AREA */}
                            {reasonVisible && (
                                <>
                                    <div className="pt-[24px] mb-1">
                                        <span className="text-[#344054] font-medium text-sm">Reason</span>
                                    </div>
                                    <div className="rounded-md border-2 border-solid border-[#D0D5DD] h-[160px]">
                                        <textarea
                                            placeholder="Write your report here"
                                            className="outline-none placeholder-[#667085] text-sm font-normal w-full h-full p-2 resize-none rounded-md"
                                            onChange={handleTextChange}
                                            value={reasonText}
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="w-full h-[76px] flex justify-end gap-2 px-6">
                            <div className="mt-5">
                                <button
                                    className="bg-[#FFFFFF] text-[#1D2939] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px]"
                                    style={{ border: "1.5px solid #EAECF0" }}
                                    onClick={cancelReport}
                                >
                                    Cancel
                                </button>
                            </div>
                            <div className="mt-5">
                                <button
                                    className={`bg-[#8501FF] text-[#FFFFFF] text-sm font-semibold py-2 px-5 rounded-md w-auto h-[44px] ${isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                    disabled={isButtonDisabled}
                                    style={{
                                        border: "1px solid #800EE2",
                                        boxShadow: "0px -4px 4px 0px #1018281F inset, 0px 3px 2px 0px #FFFFFF3D inset",
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
