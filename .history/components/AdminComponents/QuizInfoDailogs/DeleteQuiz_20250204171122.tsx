"use client"
import { useEffect, useState } from "react"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React from "react";
import { toast } from 'react-toastify';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useRouter } from "next/navigation";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
// Define the props interface
interface DeleteTestProps {
    open: boolean; // Prop to control dialog visibility
    onClose: () => void; // Define onClose as a function
    quizName: string;
    quizId: string;
}
function DeleteQuiz({ open, onClose, quizId, quizName }: DeleteTestProps) {
    const [confirmedName, setConfirmedName] = useState('');
    const isFormValid = quizName === confirmedName;
    const router = useRouter();
    const handleDeleteQuiz = async () => {
        try {
            await deleteDoc(doc(db, `quiz`, quizId));
            toast.success('Quiz Deleted Successfully!');
            onClose();
            router.replace('/admin/content/quizzesmanagement');
        } catch (error) {
            console.error('Error removing user from Firestore:', error);
            toast.error('Failed to delete quiz. Please try again.');
        }
    };
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === "Enter" && isFormValid) {
                handleDeleteQuiz(); // ✅ Trigger delete if input is valid
            }
        };

        if (open) {
            document.addEventListener("keydown", handleKeyPress);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [open, isFormValid]); // ✅ Runs when dialog opens/closes or input validity changes

    return (
        <Modal isOpen={open} onOpenChange={(isOpen) => !isOpen && onClose()} hideCloseButton >
            <ModalContent>
                <>
                    <ModalHeader className="flex flex-row justify-between items-center gap-1">
                        <h1 className='text-[#1D2939] font-bold text-lg'>{`Delete quiz “${quizName}”?`}</h1>
                        <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                            <button><Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} onClick={onClose} /></button>
                        </button>
                    </ModalHeader>
                    <ModalBody >
                        <span className="font-normal text-sm text-[#667085]">All data inside the quiz will be gone.</span>
                        <div className="flex flex-col gap-1">
                            <span className="font-semibold text-sm text-[#1D2939]">To confirm, please enter the name of the quiz.</span>
                            <div className='flex px-2 items-center h-[40px] border border-solid border-[#D0D5DD] shadow-sm rounded-md'>
                                <input
                                    className="font-normal text-[#667085] w-full text-sm placeholder:text-[#A1A1A1] rounded-md px-1 py-1 focus:outline-none focus:ring-0 border-none"
                                    type="text"
                                    placeholder={quizName}
                                    value={confirmedName}
                                    onChange={(e) => setConfirmedName(e.target.value)}
                                />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter className="border-t border-lightGrey">
                        <Button variant="light" className="py-[0.625rem] px-6 border border-solid border-[#EAECF0] font-semibold text-sm text-[#1D2939] rounded-md hover:bg-[#F2F4F7]" onClick={onClose} >Cancel</Button>
                        <Button className={`py-[0.625rem] px-6 text-white text-sm shadow-inner-button font-semibold border border-solid  border-white ${!isFormValid ? "bg-[#f3b7b3] cursor-not-allowed" : " hover:bg-[#B0201A] bg-[#BB241A]"} rounded-md`} onClick={handleDeleteQuiz}>Delete Quiz</Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal >
    )
}
export default DeleteQuiz;

