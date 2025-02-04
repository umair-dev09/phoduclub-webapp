import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

// Define the props interface
interface DeleteDialogProps {
    open: boolean; // Prop to control dialog visibility
    onClose: () => void; // Function to close the dialog
    fromContent: string;
    contentId: string;
    contentName: string;
}

function DeleteDialog({ open, onClose, fromContent, contentId, contentName }: DeleteDialogProps) {
    const [confirmedName, setConfirmedName] = useState('');
    const isFormValid = contentName === confirmedName;

    const handleDeleteQuiz = async () => {
        const collectionPath =
            fromContent === "testseries"
                ? "testseries"
                : fromContent === "quiz"
                    ? "quiz"
                    : fromContent === "course"
                        ? "course"
                        : null;

        if (!collectionPath) {
            console.error("Invalid `fromContent` value.");
            return;
        }

        try {
            await deleteDoc(doc(db, collectionPath, contentId));
            toast.success(`${fromContent === "testseries"
                ? "Testseries"
                : fromContent === "quiz"
                    ? "Quiz"
                    : fromContent === "course"
                        ? "Course"
                        : ""} Deleted Successfully!`);
            onClose();
        } catch (error) {
            console.error('Error removing user from Firestore:', error);
            toast.error('Failed to delete category. Please try again.');
        }
    };
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === "Enter" && isFormValid) {
                handleDeleteQuiz();
            }
        };

        if (open) {
            document.addEventListener("keydown", handleKeyPress);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [open, isFormValid]);


    return (
        <Modal isOpen={true} onOpenChange={(isOpen) => !isOpen && onClose()} hideCloseButton >

            <ModalContent>
                <>
                    <ModalHeader className="flex flex-row justify-between items-center gap-1">
                        <h1 className="text-[#1D2939] font-bold text-lg">
                            Delete {fromContent === "testseries"
                                ? "Testseries"
                                : fromContent === "quiz"
                                    ? "Quiz"
                                    : fromContent === "course"
                                        ? "Course"
                                        : ""} &quot;{contentName}&quot;?
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
                    </ModalHeader>
                    <ModalBody >
                        <span className="font-normal text-sm text-[#667085]">
                            All data of this {fromContent} will be gone.
                        </span>

                        <div className="flex flex-col gap-1 pb-2">
                            <span className="font-semibold text-sm text-[#1D2939]">
                                To confirm, please enter the name of the {fromContent === "testseries"
                                    ? "Testseries"
                                    : fromContent === "quiz"
                                        ? "Quiz"
                                        : fromContent === "course"
                                            ? "Course"
                                            : ""}.
                            </span>
                            <div className="flex px-2 items-center h-[40px] border border-solid border-[#D0D5DD] shadow-sm rounded-md">
                                <input
                                    className="font-normal w-full text-sm placeholder:text-[#A1A1A1] rounded-md px-1 py-1 focus:outline-none focus:ring-0 border-none"
                                    type="text"
                                    placeholder={contentName}
                                    value={confirmedName}
                                    onChange={(e) => setConfirmedName(e.target.value)} // Handle input change
                                />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter className="border-t border-lightGrey">
                        <Button
                            className="py-[0.625rem] px-6 border border-solid border-[#EAECF0] bg-white font-semibold text-sm text-[#1D2939] rounded-md hover:bg-[#F2F4F7]"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleDeleteQuiz}
                            className={`py-[0.625rem] px-6 text-white text-sm shadow-inner-button font-semibold border border-solid border-white rounded-md ${!isFormValid
                                ? "bg-[#f3b7b3] cursor-not-allowed"
                                : "bg-[#BB241A] hover:bg-[#B0201A]"
                                }`}
                            disabled={!isFormValid} // Disable button when input is empty
                        >
                            Delete {fromContent === "testseries"
                                ? "Testseries"
                                : fromContent === "quiz"
                                    ? "Quiz"
                                    : fromContent === "course"
                                        ? "Course"
                                        : ""}
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal >

    );
}

export default DeleteDialog;
