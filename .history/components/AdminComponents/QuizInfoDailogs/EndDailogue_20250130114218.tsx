import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React from "react";
import { toast, ToastContainer } from 'react-toastify';
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
// Define the props interface
interface EndDialogProps {
    onClose: () => void; // Define onClose as a function
    fromContent: string;
    contentId: string;
}

function EndDialog({ fromContent, contentId, onClose }: EndDialogProps) { // Use the interface
    const onEnd = async () => {

        // Determine the Firestore collection based on `fromContent`
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
            // Reference to the Firestore document
            const docRef = doc(db, collectionPath, contentId);

            // Update Firestore document with startDate and endDate
            await updateDoc(docRef, {
                status: 'finished',
            });
            toast.success('Success!');
            console.log("Schedule updated successfully!");
            onClose(); // Close the dialog after a successful update
        } catch (error) {
            console.error("Error updating Firestore document:", error);
        }
    };
    return (
        // <Dialog open={true} onClose={onClose} className="relative z-50">
        //     <DialogBackdrop className="fixed inset-0 bg-black/30 " />
        //     <div className="fixed inset-0 flex items-center justify-center ">
        //         <DialogPanel transition className="bg-white rounded-2xl w-[480px] h-auto">
        //             <div className="flex flex-col gap-2 p-6">
        //                 <div className="flex flex-row justify-between items-center ">
        //                     <h3 className=" font-bold task-[#1D2939]">End {fromContent === "testseries"
        //                         ? "Testseries"
        //                         : fromContent === "quiz"
        //                             ? "Quiz"
        //                             : fromContent === "course"
        //                                 ? "Course"
        //                                 : ""}?</h3>
        //                     <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7] ">
        //                         <button className="" onClick={onClose}>
        //                             <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
        //                         </button>
        //                     </button>
        //                 </div>
        //                 <p className=" text-sm font-normal text-[#667085]">Lorem ipsum is placeholder text commonly used</p>
        //             </div>
        //             <hr />
        //             <div className="flex flex-row justify-end mx-6 my-4 gap-4">
        //                 <button className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md font-semibold text-sm hover:bg-[#F2F4F7] " onClick={onClose}>Cancel</button>
        //                 <button onClick={onEnd} className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#BB241A] font-semibold text-sm border border-[#DE3024] rounded-md">End</button>
        //             </div>
        //         </DialogPanel>
        //     </div>
        // </Dialog>
        <Modal isOpen={true} onOpenChange={(isOpen) => !isOpen && onClose()} hideCloseButton >
            <ModalContent>
                <>
                    <ModalHeader className="flex flex-row justify-between items-center gap-1">
                        <h3 className=" font-bold task-[#1D2939]">End {fromContent === "testseries"
                            ? "Testseries"
                            : fromContent === "quiz"
                                ? "Quiz"
                                : fromContent === "course"
                                    ? "Course"
                                    : ""}?</h3>
                        <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7] ">
                            <button className="" onClick={onClose}>
                                <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                            </button>
                        </button>
                    </ModalHeader>
                    <ModalBody >
                        <p className=" text-sm pb-2 font-normal text-[#667085]">  Are you sure you want to end this {fromContent}? This action cannot be undone.</p>
                    </ModalBody>
                    <ModalFooter className="border-t border-lightGrey">
                        <Button variant="light" className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md font-semibold text-sm hover:bg-[#F2F4F7] " onClick={onClose}>Cancel</Button>
                        <Button onClick={onEnd} className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#BB241A] font-semibold text-sm hover:bg-[#B0201A] border border-[#DE3024] rounded-md">End</Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal >
    );
}

export default EndDialog;

