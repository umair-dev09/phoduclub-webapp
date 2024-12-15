import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from 'react-toastify';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useRouter } from 'next/navigation';

// Define the props interface
interface DeleteProps {
    open: boolean; // Prop to control dialog visibility
    onClose: () => void; // Define onClose as a function
    name: string;
    authId: string;
}

function Delete({ open, onClose, name, authId }: DeleteProps) {
    const router = useRouter();
    const [confirmedName, setConfirmedName] = useState('');
    const isFormValid = name === confirmedName;

    const handleDeleteUser = async () => {
        try {
            await deleteDoc(doc(db, 'admin', authId));
            toast.success('User Removed Successfully!');
            onClose();
            router.back();
        } catch (error) {
            console.error('Error removing user from Firestore:', error);
            toast.error('Failed to remove user. Please try again.');
        }
    };

    return (
        <Dialog open={open} onClose={onClose} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/30" />
            <div className="fixed inset-0 flex items-center justify-center">
                <DialogPanel className="bg-white rounded-2xl w-[480px] h-auto flex flex-col ">
                    <div className=' flex flex-col p-6 gap-3 border-solid border-[#EAECF0] border-b rounded-t-2xl'>
                        <div className='flex flex-row justify-between items-center'>
                            <h3 className=" font-bold text-[#1D2939]">Delete User?</h3>
                            <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                                <button><Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} onClick={onClose} /></button>
                            </button>
                        </div>
                        <span className="text-sm font-normal text-[#667085]">Deleting the user will permanently remove all their data from the platform, including their account, activity, and content.</span>
                        <div className="flex flex-col gap-1">
                            <span className="font-semibold text-sm text-[#1D2939]">To confirm, please enter the name of the user.</span>
                            <div className='flex px-2 items-center h-[40px] border border-solid border-[#D0D5DD] shadow-sm rounded-md'>
                                <input
                                    className="font-normal text-[#667085] w-full text-sm placeholder:text-[#A1A1A1] rounded-md px-1 py-1 focus:outline-none focus:ring-0 border-none"
                                    type="text"
                                    placeholder={name}
                                    value={confirmedName}
                                    onChange={(e) => setConfirmedName(e.target.value)}
                                />
                            </div>
                        </div>

                    </div>
                    <div className="flex flex-row justify-end mx-6 my-4 gap-4">
                        <button className="py-[0.625rem] px-6 border-2  border-solid border-[#EAECF0] font-semibold text-sm text-[#1D2939] rounded-md hover:bg-[#F2F4F7]" onClick={onClose} >Cancel</button>
                        <button className={`py-[0.625rem] px-6 text-white shadow-inner-button  ${!isFormValid ? 'bg-[#ec6d64f8]' : 'bg-[#BB241A]'} border border-white rounded-md`} onClick={handleDeleteUser} disabled={!isFormValid}>Delete User</button>
                    </div>
                </DialogPanel>
            </div >
        </Dialog >
    );
}

export default Delete;
