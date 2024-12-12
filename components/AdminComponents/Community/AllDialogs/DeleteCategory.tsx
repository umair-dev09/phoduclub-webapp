"use client"
import { useState } from "react"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React from "react";
import { toast } from 'react-toastify';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase';

// Define the props interface
interface DeleteCategoryProps {
    open: boolean; // Prop to control dialog visibility
    onClose: () => void; // Define onClose as a function
    categoryName: string;
    categoryId: string;
    communityId: string; 
}
function DeleteCategory({ open, onClose, categoryName, communityId, categoryId}: DeleteCategoryProps) {
    const[confirmedName, setConfirmedName] = useState('');
    const isFormValid = categoryName === confirmedName;

    const handleDeleteCategory = async () => {
        try {
            await deleteDoc(doc(db, `communities/${communityId}/channelsHeading`, categoryId));
            toast.success('Category Deleted Successfully!');
            onClose();
        } catch (error) {
            console.error('Error removing user from Firestore:', error);
            toast.error('Failed to delete category. Please try again.');
        }
    };

    return (
        <Dialog open={open} onClose={onClose} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/30" />
            <div className="fixed inset-0 flex items-center justify-center">
                <DialogPanel className="bg-white rounded-2xl w-[480px] h-auto flex flex-col ">
                    <div className=' flex flex-col p-6 gap-3 border-solid border-[#EAECF0] border-b rounded-t-2xl'>
                        <div className='flex flex-row justify-between items-center'>
                            <h1 className='text-[#1D2939] font-bold text-lg'>{`Delete category “${categoryName}”?`}</h1>
                           <button><Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} onClick={onClose} /></button>
                        </div>
                        <span className="font-normal text-sm text-[#667085]">All channels inside this category will be gone.</span>
                        <div className="flex flex-col gap-1">
                            <span className="font-semibold text-sm text-[#1D2939]">To confirm, please enter the name of the category.</span>
                            <div className='flex px-2 items-center h-[40px] border border-solid border-[#D0D5DD] shadow-sm rounded-md'>
                                <input
                                    className="font-normal text-[#667085] w-full text-sm placeholder:text-[#A1A1A1] rounded-md px-1 py-1 focus:outline-none focus:ring-0 border-none"
                                    type="text"
                                    placeholder={categoryName}
                                    value={confirmedName}
                                    onChange={(e) => setConfirmedName(e.target.value)}
                                />
                            </div>
                        </div>

                    </div>
                    <div className="flex flex-row justify-end mx-6 my-4 gap-4">
                        <button className="py-[0.625rem] px-6 border-2  border-solid border-[#EAECF0] font-semibold text-sm text-[#1D2939] rounded-md" onClick={onClose} >Cancel</button>
                        <button className={`py-[0.625rem] px-6 text-white text-sm shadow-inner-button font-semibold border border-solid  border-white ${!isFormValid ?"bg-[#f3b7b3] cursor-not-allowed" :  "bg-[#BB241A]" } rounded-md`} onClick={handleDeleteCategory}>Delete Category</button>
                    </div>
                </DialogPanel>
            </div >
        </Dialog >
    )
}
export default DeleteCategory;

