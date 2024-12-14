"use client"
import { useState } from "react"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React from "react";

// Define the props interface
interface EditDetailsProps {
    open: boolean; // Prop to control dialog visibility
    onClose: () => void; // Define onClose as a function
}
function EditDetails({ open, onClose }: EditDetailsProps) {
    const [uniqueID, setUniqueID] = useState('');
    return (
        <Dialog open={open} onClose={onClose} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/30" />
            <div className="fixed inset-0 flex items-center justify-center">
                <DialogPanel className="bg-white rounded-2xl w-[568px] h-auto flex flex-col ">
                    <div className=' flex flex-col p-6 gap-6 border-solid border-[#EAECF0] border-b rounded-t-2xl'>
                        <div className='flex flex-row justify-between items-center'>
                            <h1 className='text-[#1D2939] font-bold text-lg'>Edit Category</h1>
                            <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                                <button><Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} onClick={onClose} /></button>
                            </button>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="font-semibold text-sm text-[#1D2939]">Category name</span>
                            <div className='flex px-2 items-center h-[40px] border border-solid border-[#D0D5DD] shadow-sm rounded-md'>
                                <input
                                    className="font-normal text-[#667085] w-full text-sm placeholder:text-[#A1A1A1] rounded-md px-1 py-1 focus:outline-none focus:ring-0 border-none"
                                    placeholder="Category name"
                                    type="text"
                                    value={uniqueID}
                                    onChange={(e) => setUniqueID(e.target.value)}
                                />
                            </div>
                        </div>

                    </div>
                    <div className="flex flex-row justify-end mx-6 my-4 gap-4">
                        <button className="py-[0.625rem] px-6 border-2  border-solid border-[#EAECF0] font-semibold text-sm text-[#1D2939] rounded-md hover:bg-[#F2F4F7]" onClick={onClose} >Cancel</button>
                        <button className={`py-[0.625rem] px-6 text-white text-sm shadow-inner-button font-semibold ${uniqueID ? "bg-[#8501FF]  border border-solid  border-[#9012FF]" : "bg-[#CDA0FC] cursor-not-allowed"} rounded-md`} onClick={onClose}>Save Changes</button>
                    </div>
                </DialogPanel>
            </div >
        </Dialog >
    )
}
export default EditDetails;

