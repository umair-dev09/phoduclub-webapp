import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React from "react";
// Define the props interface
interface PausedDialogProps {
    onClose: () => void; // Define onClose as a function
}

function PausedDDialog({ onClose }: PausedDialogProps) { // Use the interface
    return (
        <Dialog open={true} onClose={onClose} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/30 " />
            <div className="fixed inset-0 flex items-center justify-center ">
                <DialogPanel transition className="bg-white rounded-2xl w-[30rem] h-auto">
                    <div className="flex flex-col relative">
                        <button className="absolute right-6 top-6" onClick={onClose}>
                            <Image src="/icons/cancel.svg" alt="cancel" width={20} height={20} />
                        </button>
                        <div>
                            <h3 className="ml-6 mt-6 font-bold task-[#1D2939]">Pause quiz "Physics"?</h3>
                            <p className="mx-6 my-4 text-sm font-normal text-[#667085]">Lorem ipsum is placeholder text commonly used in the grap</p>
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

export default PausedDDialog;
