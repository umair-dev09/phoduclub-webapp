import Image from "next/image";
import React from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@nextui-org/react";

interface InstructionsDialogProps {
    onClose: () => void;
    description: string;
    marksPerQuestion: string;
    negativeMarksPerQuestion: string;
    testDuration: number;
}

function formatTimeForReview(seconds: number): string {
    const totalSeconds = seconds;
    const hours = Math.floor(totalSeconds / 3600); // Calculate hours
    const minutes = Math.floor((totalSeconds % 3600) / 60); // Calculate remaining minutes
    let formattedTime = '';

    if (hours > 0) {
        formattedTime += `${hours} Hours`; // Add hours if present
    }
    if (minutes > 0 || hours === 0) {
        formattedTime += (formattedTime ? ' ' : '') + `${minutes} Minutes`; // Add minutes
    }

    return formattedTime;
}

interface SubSectionTimer {
    timeSpent: number;
    lastStartTime: number;
}


function InstructionsDialog({ onClose, description, marksPerQuestion, negativeMarksPerQuestion, testDuration }: InstructionsDialogProps) {
    return (
        <Modal
            size="xl"
            isOpen={true}
            onOpenChange={(isOpen) => !isOpen && onClose()}
            hideCloseButton
            scrollBehavior="inside"
        >
            <ModalContent>
                <>
                    {/* Header */}
                    <ModalHeader className="flex flex-row justify-between items-center gap-1">
                        <h3 className="font-bold text-[#1D2939]">Instructions</h3>
                        <button
                            className="w-[32px] h-[32px] rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]"
                            onClick={onClose}
                            aria-label="Close"
                        >
                            <Image
                                src="/icons/cancel.svg"
                                alt="Cancel"
                                width={20}
                                height={20}
                            />
                        </button>
                    </ModalHeader>

                    {/* Body */}
                    <ModalBody>
                        <div className="flex flex-col gap-3 mb-6">
                            <div className="flex flex-col gap-1">
                                <p className="text-base font-medium text-[#1D2939]">Description</p>
                                <p className="text-sm font-normal text-[#667085]">
                                   {description}
                                </p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-base font-medium text-[#1D2939]">Test Duration</p>
                                <p className="text-sm font-normal text-[#667085]">
                                    {formatTimeForReview(testDuration)}
                                </p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-base font-medium text-[#1D2939]">Scoring</p>
                                <div className="text-sm font-normal text-[#667085]">
                                    <p><span className="font-semibold text-[#344054]">Marks per Question:</span> {marksPerQuestion}</p>
                                    <p><span className="font-semibold text-[#344054]">Negative Marks per Question:</span> {negativeMarksPerQuestion}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-base font-medium text-[#1D2939]">Time Distribution</p>
                                <div className="text-sm font-normal text-[#667085]">
                                    <p><span className="font-semibold text-[#344054]">Easy Questions:</span> 60 seconds</p>
                                    <p><span className="font-semibold text-[#344054]">Medium Questions:</span> 90 seconds</p>
                                    <p><span className="font-semibold text-[#344054]">Hard Questions:</span> 120 seconds</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-base font-medium text-[#1D2939]">Attempt Categories</p>
                                <div className="text-sm font-normal text-[#667085]">
                                    <p><span className="font-semibold text-[#344054]">Perfect:</span> Correct attempt within the time limit.</p>
                                    <p><span className="font-semibold text-[#344054]">Wasted:</span> Incorrect attempt solved quickly.</p>
                                    <p><span className="font-semibold text-[#344054]">Overtimed:</span> Correct attempt exceeding the time limit.</p>
                                    <p><span className="font-semibold text-[#344054]">Confused:</span> Time spent but no attempt made.</p >
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                </>
            </ModalContent>
        </Modal>
    );
}

export default InstructionsDialog;
