import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React from "react";

// Define the props interface
interface creategroupProps {
    open: boolean; // Prop to control dialog visibility
    onClose: () => void; // Define onClose as a function
}
function creategroup({ open, onClose }: creategroupProps) {
    return (
        <Dialog open={open} onClose={onClose} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/30" />
            <div className="fixed inset-0 flex items-center justify-center">
                <DialogPanel className="bg-white rounded-2xl w-[480px] h-auto flex flex-col ">
                    <div className=' flex flex-col p-6 gap-2 border-solid border-[#EAECF0] border-b rounded-t-2xl'>
                        <div className='flex flex-row justify-between items-center'>
                            <h1 className='text-[#1D2939] font-bold text-lg'>Remove user from Guide Role?</h1>
                            <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} onClick={onClose} />
                        </div>
                        <span className='text-[#667085] font-normal text-sm'>Lorem ipsum is placeholder text commonly used</span>
                    </div>
                    <div className="flex flex-row justify-end mx-6 my-4 gap-4">
                        <button className="py-[0.625rem] px-6 border-2  border-solid border-[#EAECF0] font-semibold text-sm text-[#1D2939] rounded-md" onClick={onClose} >Cancel</button>
                        <button className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#BB241A] border border-[#DE3024] rounded-md" onClick={onClose} >Remove</button>
                    </div>
                </DialogPanel>
            </div >
        </Dialog >
    )
}
export default creategroup;

