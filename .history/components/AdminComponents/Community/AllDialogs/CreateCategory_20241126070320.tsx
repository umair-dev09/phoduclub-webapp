import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React from "react";

// Define the props interface
interface createcategoryProps {
    open: boolean; // Prop to control dialog visibility
    onClose: () => void; // Define onClose as a function
}
function createcategory({ open, onClose }: createcategoryProps) {
    return (
        <Dialog open={open} onClose={onClose} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/30" />
            <div className="fixed inset-0 flex items-center justify-center">
                <DialogPanel className="bg-white rounded-2xl w-[568px] h-auto flex flex-col ">
                    <div className=' flex flex-col p-6 gap-6 border-solid border-[#EAECF0] border-b rounded-t-2xl'>
                        <div className='flex flex-row justify-between items-center'>
                            <h1 className='text-[#1D2939] font-bold text-lg'>Create Category</h1>
                            <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} onClick={onClose} />
                        </div>
                        <span className="font-semibold text-sm text-[#1D2939]">Category name</span>

                    </div>
                    <div className="flex flex-row justify-end mx-6 my-4 gap-4">
                        <button className="py-[0.625rem] px-6 border-2  border-solid border-[#EAECF0] font-semibold text-sm text-[#1D2939] rounded-md" onClick={onClose} >Cancel</button>
                        <button className="py-[0.625rem] px-6 text-white shadow-inner-button font-semibold bg-[#9012FF] border border-[#9012FF] rounded-md" onClick={onClose} >Create Category</button>
                    </div>
                </DialogPanel>
            </div >
        </Dialog >
    )
}
export default createcategory;

