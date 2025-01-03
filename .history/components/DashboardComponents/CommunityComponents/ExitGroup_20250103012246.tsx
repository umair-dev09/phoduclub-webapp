import { auth, db } from "@/firebase";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
// Define the props interface
interface exitgroupProps {
    open: boolean; // Prop to control dialog visibility
    onClose: () => void; // Define onClose as a function
    communityId: string;
    communityName: string;
}
function exitgroup({ open, onClose, communityId, communityName }: exitgroupProps) {
    const currentUserId = auth.currentUser?.uid;

    const handleExitGroup = async () => {
        if (!currentUserId) return;

        const communityRef = doc(db, "communities", communityId);
        try {
            await updateDoc(communityRef, {
                groupExitedMembers: arrayUnion(currentUserId),
            });
            onClose(); // Close the dialog after successful exit
            toast.success('Group Exited Successfully');
        } catch (error) {
            console.error("Error exiting group: ", error);
        }
    };

    return (
        // <Dialog open={true} onClose={onClose} className="relative z-50">
        //     <DialogBackdrop className="fixed inset-0 bg-black/30 " />
        //     <div className="fixed inset-0 flex items-center justify-center ">
        //         <DialogPanel transition className="bg-white rounded-2xl w-[480px] h-auto">
        //             <div className=' flex flex-col p-6 gap-2'>
        //                 <div className='flex flex-row justify-between items-center'>
        //                     <h1 className='text-[#1D2939] font-bold text-lg'>Exit “{communityName}” group?</h1>
        //                     <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
        //                         <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} onClick={onClose} />
        //                     </button>
        //                 </div>
        //                 <span className="text-sm font-normal text-[#667085]">Only Group admins will be notified that you left the group. Once left you cannot join this group again.</span>

        //             </div>
        //             <hr />
        //             <div className="flex flex-row justify-end mx-6 my-4 gap-4">
        //                 <button className="py-[0.625rem] px-6 border-2  border-solid border-[#EAECF0] font-semibold text-sm text-[#1D2939] hover:bg-[#F2F4F7] rounded-md" onClick={onClose} >Cancel</button>
        //                 <button className="py-[0.625rem] px-6 text-white shadow-inner-button  font-semibold bg-[#BB241A] border border-[#DE3024] rounded-md" onClick={handleExitGroup} >Yes, Exit group</button>
        //             </div>

        //         </DialogPanel>
        //     </div >
        // </Dialog >
        <Modal
            isOpen={true}
            onOpenChange={(isOpen) => !isOpen && onClose()}
            hideCloseButton
        >
            <ModalContent>
                <>
                    {/* Modal Header */}
                    <ModalHeader className="flex flex-row justify-between gap-1">
                        <h1 className="text-[#1D2939] font-bold text-lg">
                            Exit “{communityName}” group?
                        </h1>
                        <button
                            className="w-[32px] h-[32px] rounded-full flex items-center justify-center hover:bg-[#F2F4F7]"
                            onClick={onClose}
                            aria-label="Close dialog"
                        >
                            <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                        </button>
                    </ModalHeader>

                    {/* Modal Body */}
                    <ModalBody>
                        <div className="flex flex-col pb-2 gap-2">
                            <span className="text-sm font-normal text-[#667085]">
                                Only Group admins will be notified that you left the group. Once
                                left you cannot join this group again.
                            </span>
                        </div>
                    </ModalBody>

                    {/* Modal Footer */}
                    <ModalFooter className="border-t border-lightGrey">
                        <button
                            className="py-[0.625rem] px-6 border-2 border-solid border-[#EAECF0] font-semibold text-sm text-[#1D2939] hover:bg-[#F2F4F7] rounded-md"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            className="py-[0.625rem] px-6 text-white shadow-inner-button font-semibold bg-[#BB241A] border border-[#DE3024] rounded-md"
                            onClick={handleExitGroup}
                        >
                            Yes, Exit group
                        </button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>

    )
}
export default exitgroup;