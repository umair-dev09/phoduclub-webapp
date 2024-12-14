import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React from "react";

// Define the props interface
interface MakeLiveNowQuizProps {
    open: boolean; // Prop to control dialog visibility
    onClose: () => void; // Define onClose as a function
}

function MakeLiveNowQuiz({ open, onClose }: MakeLiveNowQuizProps) { // Use the interface
    return (
        <Dialog open={open} onClose={onClose} className="relative z-50" aria-label="Delete Quiz Dialog">
            <DialogBackdrop className="fixed inset-0 bg-black/30" />
            <div className="fixed inset-0 flex items-center justify-center">
                <DialogPanel transition className="bg-white rounded-2xl w-[422px] h-auto">
                    <div className="flex flex-col relative">
                        <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7] ">
                            <button className="absolute right-6 top-6" onClick={onClose}>
                                <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                            </button>
                        </button>
                        <div className="flex flex-col p-4 bg-[#9012FF] rounded-t-2xl gap-4">
                            <div className="flex flex-row items-center gap-3 text-white">
                                <Image src='/images/photo.png' alt="DP" width={96} height={96} />
                                <div className="flex flex-col">
                                    <h2 className="text-xl font-semibold">Leslie Alexander</h2>
                                    <p className="text-sm">leslie#9843</p>
                                    <div className="flex flex-row items-center justify-center mt-2 px-2 py-1 rounded-full bg-white bg-opacity-20">
                                        <Image className="mr-1" src="/icons/book-edit.svg" alt="Exam Year" width={16} height={16} />
                                        <p className="text-xs font-medium mr-2">Exam Year</p>
                                        <h3 className="text-normal">2025</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="text-white mt-4">
                                <p>Are you sure you want to delete this quiz?</p>
                            </div>

                        </div>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}

export default MakeLiveNowQuiz;
