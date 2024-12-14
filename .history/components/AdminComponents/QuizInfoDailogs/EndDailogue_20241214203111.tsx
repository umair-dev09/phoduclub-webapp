import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React from "react";
// Define the props interface
interface EndDialogProps {
    onClose: () => void; // Define onClose as a function
}

function EndDialog({ onClose }: EndDialogProps) { // Use the interface
    return (
        <Dialog open={true} onClose={onClose} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/30 " />
            <div className="fixed inset-0 flex items-center justify-center ">
                <DialogPanel transition className="bg-white rounded-2xl w-[422px] h-auto">
                    <div className="flex flex-col gap-2 px-6 pt-6">
                        <div className="flex flex-row justify-between items-center ">
                            <h3 className=" font-bold task-[#1D2939]">End Test Series?</h3>
                            <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7] ">
                                <button className="" onClick={onClose}>
                                    <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                                </button>
                            </button>
                        </div>
                        <p className="my-4 text-sm font-normal text-[#667085]">Lorem ipsum is placeholder text commonly used</p>
                    </div>
                    <hr />
                    <div className="flex flex-row justify-end mx-6 my-4 gap-4">
                        <button className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md font-semibold text-sm hover:bg-[#F2F4F7] " onClick={onClose}>Cancel</button>
                        <button className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#BB241A] font-semibold text-sm border border-[#DE3024] rounded-md">End</button>
                    </div>

                </DialogPanel>
            </div>
        </Dialog>
    );
}

export default EndDialog;
