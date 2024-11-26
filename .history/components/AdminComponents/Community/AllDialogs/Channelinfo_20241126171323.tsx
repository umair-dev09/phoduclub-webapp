import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React from "react";

// Define the props interface
interface channelinfoProps {
    open: boolean; // Prop to control dialog visibility
    onClose: () => void; // Define onClose as a function
}
function channelinfo({ open, onClose }: channelinfoProps) {
    return (
        <Dialog open={open} onClose={onClose} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/30" />
            <div className="fixed inset-0 flex items-center justify-center">
                <DialogPanel className="bg-white rounded-2xl w-[480px] h-auto flex flex-col ">
                    <div className=' flex flex-col p-6 gap-2 border-solid border-[#EAECF0] border-b rounded-t-2xl'>
                        <div className='flex flex-row justify-between items-center'>
                            <h1 className='text-[#1D2939] font-bold text-lg'>Channel info</h1>
                            <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} onClick={onClose} />
                        </div>
                        <span className='text-[#667085] font-normal text-sm'>Lorem ipsum is placeholder text commonly used</span>
                    </div>

                </DialogPanel>
            </div >
        </Dialog >
    )
}
export default channelinfo;

