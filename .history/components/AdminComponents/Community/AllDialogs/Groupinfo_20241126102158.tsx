import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React from "react";

// Define the props interface
interface groupinfoProps {
    open: boolean; // Prop to control dialog visibility
    onClose: () => void; // Define onClose as a function
}
function groupinfo({ open, onClose }: groupinfoProps) {
    return (
        <Dialog open={open} onClose={onClose} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/30" />
            <div className="fixed inset-0 flex items-center justify-center">
                <DialogPanel className="bg-white rounded-2xl w-[480px] h-auto flex flex-col ">
                    <div className=' flex flex-col p-6 gap-2 border-solid border-[#EAECF0] border-b rounded-t-2xl'>
                        <div className='flex flex-row justify-between items-center'>
                            <h1 className='text-[#1D2939] font-bold text-lg'>Group info</h1>
                            <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} onClick={onClose} />
                        </div>
                        <div className="flex flex-row items-center p-6 justify-between group gap-2 border-b border-lightGrey">
                            <div className='flex flex-row gap-2 items-center'>
                                <div className="rounded-full w-[44px] h-[44px] bg-[#C0EAFF] items-center flex justify-center border-2 border-solid border-[#FFFFFF]">
                                    <h1 className="text-[#124B68] text-base font-bold">J</h1>
                                </div>
                                <div className='flex flex-col '>
                                    <p className='font-semibold text-normal text-sm'>JEE - 2024</p>
                                    <div className='gap-1 flex flex-row'>
                                        <Image
                                            src="/icons/communityicon.svg"
                                            width={18}
                                            height={18}
                                            alt="communiy-icon" />
                                        <span className='text-sm text-[#4B5563] font-normal'>100</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <span className='text-[#667085] font-normal text-sm'>Lorem ipsum is placeholder text commonly used</span>
                    </div>
                    <div className="flex flex-row justify-end mx-6 my-4 ">
                        <button className="py-[0.625rem] px-6 text-white text-sm shadow-inner-button font-semibold bg-[#9012FF]  border border-solid  border-[#9012FF] rounded-md" onClick={onClose}>Ok</button>
                    </div>
                </DialogPanel>
            </div >
        </Dialog >
    )
}
export default groupinfo;

