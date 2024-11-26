"use client"
import { useState } from "react"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React from "react";

// Define the props interface
interface creategroupProps {
    open: boolean; // Prop to control dialog visibility
    onClose: () => void; // Define onClose as a function
}
function creategroup({ open, onClose }: creategroupProps) {
    const [uniqueIDforname, setUniqueIDforname] = useState('');
    const [uniqueIDfordesc, setUniqueIDfordesc] = useState('');
    const handleInputChange = (e: any) => {
        const inputText = e.target.value;
        if (inputText.length <= 100) {
            setUniqueIDfordesc(inputText);

        }

    };

    return (
        <Dialog open={open} onClose={onClose} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/30" />
            <div className="fixed inset-0 flex items-center justify-center">
                <DialogPanel className="bg-white rounded-2xl w-[568px] h-auto flex flex-col ">
                    <div className=' flex flex-col p-6 gap-6 border-solid border-[#EAECF0] border-b rounded-t-2xl'>
                        <div className='flex flex-row justify-between items-center'>
                            <h1 className='text-[#1D2939] font-bold text-lg'>Create Channel</h1>
                            <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} onClick={onClose} />
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Image
                                src="/icons/upload-icon.svg"
                                width={120}
                                height={120}
                                alt="upload-image" />
                            <div className="border-2 border-solid border-[#EAECF0]  flex flex-row items-center w-[111px] h-[36px] rounded-md hover:bg-[#EAECF0]">
                                <Image
                                    src="/icons/edit-02.svg"
                                    width={18}
                                    height={18}
                                    alt="edit-icon" />
                                <span className="text-sm text-[#1D2939] font-semibold">Change</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="font-semibold text-sm text-[#1D2939]">Channel name</span>
                            <div className='flex px-2 items-center h-[40px] border border-solid border-[#D0D5DD] shadow-sm rounded-md'>
                                <input
                                    className="font-normal text-[#667085] w-full text-sm placeholder:text-[#A1A1A1] rounded-md px-1 py-1 focus:outline-none focus:ring-0 "
                                    placeholder="Channel name"
                                    type="text"
                                    value={uniqueIDforname}
                                    onChange={(e) => setUniqueIDforname(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="font-semibold text-sm text-[#1D2939]">Channel description</span>
                            <div className="flex px-2 items-center h-[40px] border border-[#D0D5DD] shadow-sm rounded-md">

                                <input
                                    className="text-[#667085] w-full text-sm placeholder-[#A1A1A1] px-1 py-1 focus:outline-none border-none"
                                    placeholder="Category name"
                                    value={uniqueIDfordesc}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <span className="text-sm text-[#475467] self-end">{uniqueIDfordesc.length}/100</span>
                        </div>


                    </div>
                    <div className="flex flex-row justify-end mx-6 my-4 gap-4">
                        <button className="py-[0.625rem] px-6 border-2  border-solid border-[#EAECF0] font-semibold text-sm text-[#1D2939] rounded-md" onClick={onClose} >Cancel</button>
                        <button className={`py-[0.625rem] px-6 text-white text-sm shadow-inner-button font-semibold ${uniqueIDfordesc ? "bg-[#9012FF]  border border-solid  border-[#9012FF]" : "bg-[#CDA0FC] cursor-not-allowed"} rounded-md`} onClick={onClose}>Create Channel</button>
                    </div>
                </DialogPanel>
            </div >
        </Dialog >
    )
}
export default creategroup;

