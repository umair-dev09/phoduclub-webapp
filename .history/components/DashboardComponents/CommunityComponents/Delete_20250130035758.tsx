import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from 'react-toastify';
import { doc, deleteDoc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
// Define the props interface
interface DeleteProps {
    open: boolean; // Prop to control dialog visibility
    onClose: () => void; // Define onClose as a function
    communityId: string;
    headingId: string;
    channelId: string;
    chatId: string;
    deletedByAdmin: boolean;
    adminThatDeletedId: string;
}

function Delete({ open, onClose, communityId, deletedByAdmin, adminThatDeletedId, headingId, channelId, chatId }: DeleteProps) {


    const handleDeleteMessage = async () => {
        try {

            await setDoc(doc(db, `communities/${communityId}/channelsHeading/${headingId}/channels/${channelId}/chats`, chatId), {
                isDeleted: true,
                message: 'deleted',
                adminThatDeletedId: deletedByAdmin ? adminThatDeletedId : null,
                isDeletedByAdmin: true,
            }, { merge: true });
            toast.success('Message Deleted!');
            onClose();
        } catch (error) {
            console.error('Error deleting message from Firestore:', error);
            toast.error('Failed to delete message. Please try again.');
        }
    };

    return (
        // <Dialog open={true} onClose={onClose} className="relative z-50">
        //     <DialogBackdrop className="fixed inset-0 bg-black/30 " />
        //     <div className="fixed inset-0 flex items-center justify-center ">
        //         <DialogPanel transition className="bg-white rounded-2xl w-[480px] h-auto">
        //             <div className=' flex flex-col p-6 gap-2'>
        //                 <div className='flex flex-row justify-between items-center'>
        //                     <h1 className='text-[#1D2939] font-bold text-lg'>Delete message?</h1>
        //                     <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
        //                         <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} onClick={onClose} />
        //                     </button>
        //                 </div>
        //                 <span className="text-sm font-normal text-[#667085]">Once the message is deleted you cannot restore it again.</span>

        //             </div>
        //             <hr />
        //             <div className="flex flex-row justify-end mx-6 my-4 gap-4">
        //                 <button className="py-[0.625rem] px-6 border-2  border-solid border-[#EAECF0] font-semibold text-sm text-[#1D2939] hover:bg-[#F2F4F7] rounded-md" onClick={onClose} >Cancel</button>
        //                 <button className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#BB241A] border border-[#DE3024] rounded-md" onClick={handleDeleteMessage} >Delete</button>
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
                        <h1 className='text-[#1D2939] font-bold text-lg'>Delete message?</h1>
                        <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                            <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} onClick={onClose} />
                        </button>
                    </ModalHeader>

                    {/* Modal Body */}
                    <ModalBody>

                        <span className="text-sm font-normal text-[#667085]">Once the message is deleted you cannot restore it again.</span>
                    </ModalBody>

                    {/* Modal Footer */}
                    <ModalFooter className="border-t border-lightGrey">
                        <Button variant="light" className="py-[0.625rem] px-6 border-2  border-solid border-[#EAECF0] font-semibold text-sm text-[#1D2939] hover:bg-[#F2F4F7] rounded-md" onClick={onClose} >Cancel</Button>
                        <Button className="py-[0.625rem] px-6 text-white font-semibold shadow-inner-button bg-[#BB241A] border border-[#DE3024] rounded-md" onClick={handleDeleteMessage} >Delete</Button>

                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    );
}

export default Delete;

