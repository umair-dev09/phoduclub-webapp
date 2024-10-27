import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React from "react";
// Define the props interface
interface ScheduledDialogProps {
    onClose: () => void; // Define onClose as a function
}

function ScheduledDialog({ onClose }: ScheduledDialogProps) { // Use the interface
    return (
        <Dialog open={true} onClose={onClose} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/30 " />
            <div className="fixed inset-0 flex items-center justify-center ">
                <DialogPanel transition className="bg-white rounded-2xl w-[422px] h-auto">
                    <div className="flex flex-col relative">
                        <button className="absolute right-4 top-4" onClick={onClose}>
                            <Image src="/icons/cancel-01.svg" alt="cancel" width={18} height={18} />
                        </button>
                        <div className="flex flex-col p-4 bg-[#9012FF] rounded-t-2xl gap-4">
                            <div className="flex flex-row items-center gap-3 text-white">
                                <Image src='/images/photo.png' alt="DP" width={96} height={96} />
                                <div className="flex flex-col">
                                    <h2 className="text-xl font-semibold">Leslie Alexander</h2>
                                    <p className="text-sm">leslie#9843</p>
                                    <div className="flex flex-row items-center justify-center mt-2 px-2 py-1 rounded-full bg-white bg-opacity-20">
                                        <Image className="mr-1" src="/icons/book-edit.svg" alt="exam year" width={16} height={16} />
                                        <p className="text-xs font-medium mr-2">Exam Year</p>
                                        <h3 className="text-normal">2025</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row gap-2">
                                <button className="flex flex-row items-center justify-center w-1/2 bg-white rounded-md border border-[#D0D5DD] px-6 py-[10px] gap-2">
                                    <Image src="/icons/multiplication-sign.svg" alt="decline user" width={18} height={18} />
                                    <div className="text-sm font-semibold text-[#182230]">Decline</div>
                                </button>
                                <button className="flex flex-row items-center justify-center w-1/2 bg-white rounded-md border border-green-600 px-6 py-[10px] gap-2">
                                    <Image src="/icons/tick-02.svg" alt="accept user" width={18} height={18} />
                                    <div className="text-sm font-semibold text-green-600">Accept</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}

export default ScheduledDialog;
