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

interface InformationDialogProps {
    onClose: () => void;
}

function InformationDialog({ onClose }: InformationDialogProps) {
    return (
        <Modal
            isOpen={true}
            onOpenChange={(isOpen) => !isOpen && onClose()}
            hideCloseButton
            scrollBehavior="inside"
        >
            <ModalContent>
                <>
                    {/* Header */}
                    <ModalHeader className="flex flex-row justify-between items-center gap-1">
                        <h3 className="font-bold text-[#1D2939]">[Subject]</h3>
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
                                    This test evaluates your understanding of core [Subject] concepts, problem-solving skills, and accuracy. Work efficiently within the given time to maximize your performance.
                                </p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-base font-medium text-[#1D2939]">Scoring</p>
                                <div className="text-sm font-normal text-[#667085]">
                                    <p><span className="font-semibold text-[#344054]">Marks per Question:</span> 4</p>
                                    <p><span className="font-semibold text-[#344054]">Negative Marks per Question:</span> 1</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-base font-medium text-[#1D2939]">Test Duration</p>
                                <p className="text-sm font-normal text-[#667085]">
                                    15 minutes
                                </p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-base font-medium text-[#1D2939]">Key Reminders</p>
                                <div className="text-sm font-normal text-[#667085]">
                                    Stay focused and ensure you attempt all questions within the allocated time.
                                    Manage your time wisely to avoid exceeding time limits for each question.
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                </>
            </ModalContent>
        </Modal>
    );
}

export default InformationDialog;
