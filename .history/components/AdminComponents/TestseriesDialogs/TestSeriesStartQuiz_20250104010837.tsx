import React from 'react';
import Image from "next/image";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

interface TestSeriesStartQuizProps {
    open: boolean; // Prop to control dialog visibility
    onClose: () => void; // Define onClose as a function
}

const TestSeriesStartQuiz: React.FC<TestSeriesStartQuizProps> = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose} className="relative z-50" aria-label="Delete Quiz Dialog">
            <DialogBackdrop className="fixed inset-0 bg-black/30" />
            <div className="fixed inset-0 flex items-center justify-center">
                <DialogPanel transition>
                    <div className="flex flex-col relative bg-white rounded-2xl w-[30rem] h-auto">
                        <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                            <button className="absolute right-6 top-6" onClick={onClose}>
                                <Image src="/icons/cancel.svg" alt="cancel" width={20} height={20} />
                            </button>
                        </button>
                        <div>
                            <h3 className="ml-6 mt-6 font-bold task-[#1D2939]">Start Quiz</h3>
                            <p className="mx-6 mt-4 text-sm font-normal text-[#667085]">Lorem ipsum is a dummy text widely used in digital industry and lore is anptsu</p>
                        </div>
                        <div className='flex flex-row justify-evenly items-center my-10'>
                            <div className='flex flex-col items-center gap-1'>
                                <p className='text-sm text-[#667085] font-normal'>Time Duration</p>
                                <p className='text-lg text-[#1D2939] font-semibold'>05:00 <span className='text-sm text-[#1D2939] font-semibold'>Min</span></p>
                            </div>
                            <div className='w-0 h-[2.188rem] border border-lightGrey'></div>
                            <div className='flex flex-col items-center gap-1'>
                                <p className='text-sm text-[#667085] font-normal'>No. of Questions</p>
                                <p className='text-lg text-[#1D2939] font-semibold'>15</p>
                            </div>
                            <div className='w-0 h-[2.188rem] border border-lightGrey'></div>
                            <div className='flex flex-col items-center gap-1'>
                                <p className='text-sm text-[#667085] font-normal'>Marks Per Question</p>
                                <p className='text-lg text-[#1D2939] font-semibold'>2</p>
                            </div>
                        </div>
                        <hr />
                        <div className="flex flex-row justify-end mx-6 my-4 gap-4">
                            <button className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md hover:bg-[#F2F4F7]" onClick={onClose}>Cancel</button>
                            <button className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#8501FF] border border-[#9012FF] rounded-md">Start Now</button>
                        </div>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
};

export default TestSeriesStartQuiz;
