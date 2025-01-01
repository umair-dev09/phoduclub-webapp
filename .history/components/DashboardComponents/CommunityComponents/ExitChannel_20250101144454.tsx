import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React, { useState } from "react";
// Define the props interface
interface exitchannelProps {
    open: boolean; // Prop to control dialog visibility
    onClose: () => void; // Define onClose as a function

}
function exitchannel({ open, onClose }: exitchannelProps) {

    return (
        <Dialog open={true} onClose={onClose} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/30 " />
            <div className="fixed inset-0 flex items-center justify-center ">
                <DialogPanel transition className="bg-white rounded-2xl w-[480px] h-auto">
                    <div className=' flex flex-col p-6 gap-2'>
                        <div className='flex flex-row justify-between items-center'>
                            <h1 className='text-[#1D2939] font-bold text-lg'>Exit “Physics 101” channel?</h1>
                            <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                                <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} onClick={onClose} />
                            </button>
                        </div>
                        <span className="text-sm font-normal text-[#667085]">Only Group admins will be notified that you left the channel.</span>

                    </div>
                    <hr />
                    <div className="flex flex-row justify-end mx-6 my-4 gap-4">
                        <button className="py-[0.625rem] px-6 border-2  border-solid border-[#EAECF0] font-semibold text-sm text-[#1D2939] hover:bg-[#F2F4F7] rounded-md" onClick={onClose} >Cancel</button>
                        <button className="py-[0.625rem] px-6 text-white shadow-inner-button  hover:bg-[#BB241A] bg-[#BB241A] border border-[#DE3024] rounded-md" onClick={onClose} >Yes, Exit channel</button>
                    </div>

                </DialogPanel>
            </div >
        </Dialog >
    )
}
export default exitchannel;;