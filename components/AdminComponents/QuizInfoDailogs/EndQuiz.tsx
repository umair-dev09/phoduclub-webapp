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
                    <div className="flex flex-col relative">
                        <button className="absolute right-6 top-6" onClick={onClose}>
                            <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                        </button>
                        <div className="mx-6">
                            <h3 className="mt-6 font-bold task-[#1D2939]">Pause quiz "Physics"?</h3>
                            <p className="my-4 text-sm font-normal text-[#667085]">All data inside this quiz will be gone.</p>
                            <p className="text-sm font-normal mb-2">To confirm, please enter the name of the quiz.</p>
                            <input className="w-full h-10 mb-6 px-4 text-sm font-normal outline-none border border-[#D0D5DD] rounded-md" />
                        </div>
                        <hr />
                        <div className="flex flex-row justify-end mx-6 my-4 gap-4">
                            <button className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md" onClick={onClose}>Cancel</button>
                            <button className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#BB241A] border border-[#DE3024] rounded-md">Pause Quiz</button>
                        </div>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}

export default EndDialog;
