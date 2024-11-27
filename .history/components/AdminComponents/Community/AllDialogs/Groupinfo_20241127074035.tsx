'use client'
import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import CreateGroup from "./CreateGroup";
// Define the props interface
interface groupinfoProps {
    open: boolean; // Prop to control dialog visibility
    onClose: () => void; // Define onClose as a function
}
function groupinfo({ open, onClose }: groupinfoProps) {
    const [creategroup, setCreategroup] = useState(true)
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
                        <div className="flex flex-row items-center py-2 justify-between group gap-2">
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
                            <Popover placement="bottom-end">
                                <PopoverTrigger>
                                    <button className='focus:outline-none flex items-center justify-center border border-solid border-[#EAECF0] rounded-md h-10 w-10'>
                                        <Image
                                            src="/icons/three-dots.svg"
                                            width={20}
                                            height={20}
                                            alt="threedots"
                                        />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className=" py-0 px-0 bg-white rounded-md  shadow-md flex flex-col border border-solid border-[#EAECF0] h-12 w-auto hover:bg-[#EAECF0]">
                                    <button className="px-2  gap-2 flex flex-row justify-center items-center  rounded-md "
                                        onClick={() => { setCreategroup(true) }}>
                                        <Image
                                            src="/icons/edit-02.svg"
                                            width={18}
                                            height={18}
                                            alt="edit-icon" />
                                        <p className="text-sm text-[#0C111D] font-normal">Edit Details</p>
                                    </button>

                                </PopoverContent>
                            </Popover>
                        </div>
                        <span className='text-[#667085] font-normal text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididun</span>
                    </div>
                    <div className="flex flex-row justify-end mx-6 my-4 gap-4">
                        <button className="py-[0.625rem] w-[98px] px-6 text-white shadow-inner-button bg-[#8501FF] border border-[#9012FF] rounded-md" onClick={onClose} >ok</button>
                    </div>
                </DialogPanel>
            </div >
            {creategroup && <CreateGroup open={creategroup} onClose={() => setCreategroup(false)} />}
        </Dialog >
    )
}
export default groupinfo;