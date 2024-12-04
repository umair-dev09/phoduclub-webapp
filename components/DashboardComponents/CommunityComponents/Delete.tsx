import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from 'react-toastify';
import { doc, deleteDoc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useRouter } from 'next/navigation';

// Define the props interface
interface DeleteProps {
    open: boolean; // Prop to control dialog visibility
    onClose: () => void; // Define onClose as a function
    communityId: string;
    headingId: string;
    channelId: string;
    chatId: string;

}

function Delete({ open, onClose, communityId, headingId, channelId, chatId}: DeleteProps) { 
     

    const handleDeleteMessage = async () => {
        try {
            
            await setDoc(doc(db, `communities/${communityId}/channelsHeading/${headingId}/channels/${channelId}/chats`, chatId), {
                isDeleted: true,
                message: 'deleted',
            }, { merge: true });
            toast.success('Message Deleted!');
            onClose();
        } catch (error) {
            console.error('Error deleting message from Firestore:', error);
            toast.error('Failed to delete message. Please try again.');
        }
    };

    return (
        <Dialog open={true} onClose={onClose} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/30 " />
            <div className="fixed inset-0 flex items-center justify-center ">
                <DialogPanel transition className="bg-white rounded-2xl w-[480px] h-auto">
                    <div className="flex flex-col relative">
                        <button className="absolute right-6 top-6" onClick={onClose}>
                            <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                        </button>
                        <div className="mx-6 h-auto  pt-6 flex flex-col mb-1">
                            <h3 className="pb-3 font-bold text-[#1D2939]">Delete Message?</h3>
                            <span className="text-sm font-normal text-[#667085]">Once the message is deleted you cannot restore it again.</span>
                        </div>
                        <div className="flex flex-row justify-end mx-6 my-4 gap-4">
                            <button className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey font-semibold text-sm text-[#1D2939] rounded-md" onClick={onClose}>Cancel</button>
                            <button className={`py-[0.625rem] px-6 text-white shadow-inner-button  bg-[#BB241A] border border-white rounded-md`} onClick={handleDeleteMessage}>Delete</button>
                        </div>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}

export default Delete;
