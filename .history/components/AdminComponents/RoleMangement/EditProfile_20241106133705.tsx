import React from 'react';
import Image from "next/image";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";


interface TestSeriesStartQuizProps {
    open: boolean; // Prop to control dialog visibility
    onClose: () => void; // Define onClose as a function
}

const TestSeriesStartQuiz: React.FC<TestSeriesStartQuizProps> = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} className="relative z-50" aria-label="Delete Quiz Dialog">
            <DialogBackdrop className="fixed inset-0 bg-black/30" />
            <div className="fixed inset-0 flex items-center justify-center">
                <DialogPanel transition className="bg-white rounded-2xl w-[480px] h-auto">
                    <div className="flex flex-col relative">
                        <button className="absolute right-6 top-6" onClick={close}>
                            <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                        </button>
                        <div className="mx-6">
                            <h3 className="mt-6 font-bold task-[#1D2939]">Log Out</h3>
                            <p className="my-4 text-sm font-normal text-[#667085]">Lorem ipsum is placeholder text commonly used in the grap</p>
                        </div>
                        <hr />
                        <div className="flex flex-row justify-end mx-6 my-4 gap-4">
                            <button className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md" onClick={close}>Cancel</button>
                            <button className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#BB241A] border border-[#DE3024] rounded-md">Log out</button>
                        </div>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
};

export default TestSeriesStartQuiz;
