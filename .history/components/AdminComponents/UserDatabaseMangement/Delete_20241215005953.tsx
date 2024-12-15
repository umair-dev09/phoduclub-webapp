import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from 'react-toastify';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase';

interface DeleteProps {
    open: boolean; // Prop to control dialog visibility
    onClose: () => void; // Define onClose as a function
    name?: string;
    authId?: string;
}

function Delete({ open, onClose, name, authId }: DeleteProps) {
    const [confirmedName, setConfirmedName] = useState('');
    const isFormValid = name === confirmedName;

    const handleDeleteUser = async () => {
        if (!authId) {
            toast.error('User ID is missing. Cannot delete user.');
            return;
        }

        try {
            await deleteDoc(doc(db, 'users', authId));
            toast.success('User Removed Successfully!');
            onClose();
        } catch (error) {
            console.error('Error removing user from Firestore:', error);
            toast.error('Failed to remove user. Please try again.');
        }
    };

    return (
        <Dialog open={open} onClose={onClose} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/30 " />
            <div className="fixed inset-0 flex items-center justify-center ">
                <DialogPanel transition className="bg-white rounded-2xl w-[480px] h-auto">
                    <div className="flex flex-col gap-4 p-6">
                        <div className="flex flex-row justify-between items-center">
                            <h3 className=" font-bold text-[#1D2939]">Delete User?</h3>
                            <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                                <button onClick={onClose}>
                                    <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                                </button>
                            </button>
                        </div>
                        <div className=" h-auto   flex flex-col">
                            <span className="text-sm font-normal text-[#667085]">Deleting the user will permanently remove all their data from the platform, including their account, activity, and content.</span>
                        </div>
                        <div className=" h-auto  gap-2 flex flex-col">
                            <h3 className="font-medium text-sm text-[#1D2939]">To confirm, please enter the name of the user.</h3>
                            <div className="flex flex-row py-2 px-4 w-full gap-2 border border-solid border-[#D0D5DD] rounded-md transition duration-200 ease-in-out">
                                <input
                                    className="w-full text-base font-normal text-[#1D2939] rounded-md outline-none"
                                    type="text"
                                    placeholder={name}
                                    value={confirmedName}
                                    onChange={(e) => setConfirmedName(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="flex flex-row justify-end mx-6 my-4 gap-4">
                        <button className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey font-semibold text-sm hover:bg-[#F2F4F7] text-[#1D2939] rounded-md" onClick={onClose}>Cancel</button>
                        <button className={`py-[0.625rem] px-6 text-white shadow-inner-button  ${!isFormValid ? 'bg-[#ec6d64f8]' : 'bg-[#BB241A]'} border border-white rounded-md`} onClick={handleDeleteUser} disabled={!isFormValid}>Delete User</button>
                    </div>

                </DialogPanel>
            </div>
        </Dialog>
    );
}

export default Delete;