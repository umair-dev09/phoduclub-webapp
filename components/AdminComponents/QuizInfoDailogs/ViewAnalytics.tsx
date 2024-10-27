import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React from "react";

// Define the props interface
interface ViewAnalyticsProps {
    open: boolean; // Prop to control dialog visibility
    onClose: () => void; // Define onClose as a function
}

function ViewAnalytics({ open, onClose }: ViewAnalyticsProps) { // Use the interface
    return (
        <Dialog open={open} onClose={onClose} className="relative z-50" aria-label="Delete Quiz Dialog">
            <DialogBackdrop className="fixed inset-0 bg-black/30" />
            <div className="fixed inset-0 flex items-center justify-center">
                <DialogPanel transition className="bg-white rounded-2xl w-[34.938rem] h-auto">
                    <div className="flex flex-col relative">
                        <button className="absolute right-6 top-6" onClick={onClose}>
                            <Image src="/icons/cancel.svg" alt="cancel" width={20} height={20} />
                        </button>
                        <div className="flex flex-col mb-1 gap-4">
                            <div className="flex flex-row mx-6 mt-6 gap-2">
                                <p className="font-semibold text-2xl text-[#1D2939]">Physics</p>
                                <Image
                                    src={`/icons/Finished.svg`}
                                    width={74}
                                    height={24}
                                    alt='finished'
                                />
                            </div>
                            <ul className="flex flex-col mx-6 gap-2 text-base font-normal list-disc list-inside">
                                <li className="text-[#1D2939]">This quiz contains - 10 Questions</li>
                                <li className="text-[#1D2939]">Each question will be of 3 Marks</li>
                                <li className="text-[#1D2939]">There’s negative marking (-1) for each wrong</li>
                            </ul>
                        </div>
                        <div className="flex flex-col mx-6 my-6 gap-4">
                            <div className="flex flex-row gap-4">
                                <div className="flex flex-col w-full p-4 rounded-md border border-lightGrey">
                                    <p className="text-[#1D2939] text-xl text-start font-medium">10</p>
                                    <p className="text-[#667085] text-base font-normal">Questions</p>
                                </div>
                                <div className="flex flex-col w-full p-4 rounded-md border border-lightGrey">
                                    <p className="text-[#1D2939] text-xl text-start font-medium">3</p>
                                    <p className="text-[#667085] text-base font-normal">Marks per question</p>
                                </div>
                            </div>
                            <div className="flex flex-row gap-4">
                                <div className="flex flex-col w-full p-4 rounded-md border border-lightGrey">
                                    <p className="text-[#1D2939] text-xl text-start font-medium">10 min</p>
                                    <p className="text-[#667085] text-base font-normal">Over all quiz time</p>
                                </div>
                                <div className="flex flex-col w-full p-4 rounded-md border border-lightGrey">
                                    <p className="text-[#1D2939] text-xl text-start font-medium">2547</p>
                                    <p className="text-[#667085] text-base font-normal">Students attempted</p>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="flex flex-row justify-end mx-6 my-4 gap-4">
                            <button className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md" onClick={onClose}>Cancel</button>
                            <button className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#8501FF] border border-[#9012FF] rounded-md">View quiz details</button>
                        </div>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}

export default ViewAnalytics;
