"use client"
import { useState } from "react"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React from "react";
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase'; // Adjust path if needed
import { toast, ToastContainer } from "react-toastify";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

// Define the props interface
interface createcategoryProps {
    open: boolean; // Prop to control dialog visibility
    onClose: () => void; // Define onClose as a function
    communityId: string;
    isEditing: boolean;
    categoryName: string;
    setCategoryName: (categoryName: string) => void;
    categoryId: string;
}
function createcategory({ open, onClose, communityId, isEditing, categoryName, setCategoryName, categoryId }: createcategoryProps) {

    const handleCreateCategory = async () => {

        try {
            if (isEditing) {
                await setDoc(doc(db, `communities/${communityId}/channelsHeading`, categoryId), {
                    headingName: categoryName,
                }, { merge: true });
                toast.success("Category Updated Successfully!");
            }
            else {
                // Add new user data to Firestore
                const docRef = await addDoc(collection(db, `communities/${communityId}/channelsHeading`), {
                    headingName: categoryName,
                });
                // Update the document with the generated adminId
                await setDoc(docRef, { headingId: docRef.id }, { merge: true });
                toast.success("Category Created Successfully!");
            }
            setCategoryName('');
            onClose();

        } catch (error) {
            console.error("Error adding channel in Firestore:", error);
            toast.error("Failed to create Category. Please try again.");
        }
    };

    return (
        // <Dialog open={open} onClose={onClose} className="relative z-50">
        //     <DialogBackdrop className="fixed inset-0 bg-black/30" />
        //     <div className="fixed inset-0 flex items-center justify-center">
        //         <DialogPanel className="bg-white rounded-2xl w-[568px] h-auto flex flex-col ">
        //             <div className=' flex flex-col p-6 gap-6 border-solid border-[#EAECF0] border-b rounded-t-2xl'>
        //                 <div className='flex flex-row justify-between items-center'>
        //                     <h1 className='text-[#1D2939] font-bold text-lg'>{isEditing ? 'Edit Category' : 'Create Category'}</h1>
        //                     <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
        //                         <button><Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} onClick={onClose} /></button>
        //                     </button>
        //                 </div>
        //                 <div className="flex flex-col gap-1">
        //                     <span className="font-semibold text-sm text-[#1D2939]">Category name</span>
        //                     <div className='flex px-2 items-center h-[40px] border border-gray-300   focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB] shadow-sm rounded-md'>
        //                         <input
        //                             className="font-normal text-[#667085] w-full text-sm placeholder:text-[#A1A1A1] rounded-md px-1 py-1 focus:outline-none focus:ring-0 border-none"
        //                             placeholder="Category name"
        //                             type="text"
        //                             value={categoryName}
        //                             onChange={(e) => setCategoryName(e.target.value)}
        //                         />
        //                     </div>
        //                 </div>

        //             </div>
        //             <div className="flex flex-row justify-end mx-6 my-4 gap-4">
        //                 <button className="py-[0.625rem] px-6 border-2  border-solid border-[#EAECF0] font-semibold text-sm text-[#1D2939] rounded-md hover:bg-[#F2F4F7]" onClick={onClose} >Cancel</button>
        //                 <button className={`py-[0.625rem] px-6 text-white text-sm shadow-inner-button font-semibold border border-solid  border-white ${categoryName ? "bg-[#9012FF] " : "bg-[#CDA0FC] cursor-not-allowed"} rounded-md`} onClick={handleCreateCategory}>{isEditing ? 'Save Changes' : 'Create Category'}</button>
        //             </div>
        //         </DialogPanel>
        //     </div >
        // </Dialog >
        <Modal isOpen={open} onOpenChange={(isOpen) => !isOpen && onClose()} hideCloseButton
        >

            <ModalContent>
                <>
                    <ModalHeader className="flex flex-row justify-between items-center gap-1">
                        <h1 className='text-[#1D2939] font-bold text-lg'>{isEditing ? 'Edit Category' : 'Create Category'}</h1>
                        <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                            <button><Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} onClick={onClose} /></button>
                        </button>
                    </ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-1 pb-2">
                            <span className="font-semibold text-sm text-[#1D2939]">Category name</span>
                            <div className='flex px-2 items-center h-[40px] border border-gray-300   focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB] shadow-sm rounded-md'>
                                <input
                                    className="font-normal text-[#667085] w-full text-sm placeholder:text-[#A1A1A1] rounded-md px-1 py-1 focus:outline-none focus:ring-0 border-none"
                                    placeholder="Category name"
                                    type="text"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter className="border-t border-lightGrey">
                        <Button variant="light" className="py-[0.625rem] px-6 border-2  border-solid border-[#EAECF0] font-semibold text-sm text-[#1D2939] rounded-md hover:bg-[#F2F4F7]" onClick={onClose} >Cancel</Button>
                        <Button className={`py-[0.625rem] px-6 text-white text-sm shadow-inner-button font-semibold border border-solid  border-white ${categoryName ? "bg-[#9012FF] " : "bg-[#CDA0FC] cursor-not-allowed"} rounded-md`} onClick={handleCreateCategory}>{isEditing ? 'Save Changes' : 'Create Category'}</Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal >
    )
}
export default createcategory;

