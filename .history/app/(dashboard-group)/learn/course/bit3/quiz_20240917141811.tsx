import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import Image from 'next/image';

function Quiz() {
    const [isOpen, setIsOpen] = useState(true);  // State for dialog visibility
    const [showBottomSheet, setShowBottomSheet] = useState(false);  // State for bottom sheet visibility

    const openBottomSheet = () => {
        setShowBottomSheet(true);
    };

    const closeBottomSheet = () => {
        setShowBottomSheet(false);
    };

    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
            {/* Backdrop */}
            <DialogBackdrop className="fixed inset-0 bg-black/30" />

            {/* Dialog Wrapper */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="bg-white rounded-2xl p-5 w-[480px] h-[261px]">
                    {/* Header Section */}
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-bold text-[#1D2939]">Confirmation</span>
                        <button onClick={() => setIsOpen(false)}>
                            <Image src='/icons/cancel.svg' alt="cancel" width={18} height={18} />
                        </button>
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col gap-4 w-[432px] h-[100px]">
                        <span className="text-sm text-[#667085] font-normal">
                            Lorem ipsum is a dummy text widely used in the digital industry and will be used here as a preview.
                        </span>
                        <span className="text-sm text-[#667085] font-normal">
                            Lorem ipsum is a dummy text widely used in the digital industry and will be used here as a preview.
                        </span>
                    </div>

                    {/* Buttons Section */}
                    <div className="border-t border-[#EAECF0] w-full h-[76px] mt-5 flex flex-row gap-2">
                        <div className='w-[132px] h-[44px] bg-[#FFFFFF] mt-5'>
                            <button
                                className="bg-[#FFFFFF] text-[#1D2939] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px]"
                                style={{
                                    border: "1.5px solid #EAECF0"
                                }}
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </button>
                        </div>

                        <div className='w-[132px] h-[44px] mt-5 mr-5'>
                            <button
                                onClick={openBottomSheet}
                                className="bg-[#8501FF] text-[#FFFFFF] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px]"
                                style={{
                                    border: "1px solid #800EE2",
                                    boxShadow: "0px -4px 4px 0px #1018281F inset, 0px 3px 2px 0px #FFFFFF3D inset"
                                }}
                            >
                                Start Quiz
                            </button>
                        </div>
                    </div>

                    {/* Bottom Sheet */}
                    {showBottomSheet && (
                        <div className="fixed inset-0 bg-black/30 flex items-end justify-center p-4 z-50">
                            <div className="bg-white rounded-t-2xl p-5 w-full max-w-md">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-lg font-semibold text-[#1D2939]">Quiz Bottom Sheet</span>
                                    <button onClick={closeBottomSheet}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M6 18L18 6M6 6L18 18" stroke="#1D2939" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <p className="text-sm text-[#667085]">This is the bottom sheet for starting the quiz.</p>
                                    {/* Add more content or actions here */}
                                </div>
                            </div>
                        </div>
                    )}
                </DialogPanel>
            </div>
        </Dialog>
    );
}

export default Quiz;
