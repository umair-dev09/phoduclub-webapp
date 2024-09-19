import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import Image from 'next/image';

function Quiz() {
    const [isOpen, setIsOpen] = useState(true);  // For the initial dialog
    const [showBottomSheet, setShowBottomSheet] = useState(false);  // For the bottom sheet

    const openBottomSheet = () => {
        // Close the dialog and open the bottom sheet
        setIsOpen(false);
        setShowBottomSheet(true);
    };

    const closeBottomSheet = () => {
        // Close the bottom sheet
        setShowBottomSheet(false);
    };

    return (
        <>
            {/* Initial Dialog */}
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

                        {/* Buttons */}
                        <div className="border-t border-[#EAECF0] w-full h-[76px] mt-5 flex justify-end gap-2">
                            <div className='mt-5'>
                                <button
                                    className="bg-[#FFFFFF] text-[#1D2939] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px]"
                                    style={{ border: "1.5px solid #EAECF0" }}
                                    onClick={() => setIsOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                            <div className='mt-5'>
                                <button
                                    onClick={openBottomSheet}
                                    className="bg-[#8501FF] text-[#FFFFFF] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px]"
                                    style={{ border: "1px solid #800EE2", boxShadow: "0px -4px 4px 0px #1018281F inset, 0px 3px 2px 0px #FFFFFF3D inset" }}
                                >
                                    Start Now
                                </button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

            {/* Bottom Sheet */}
            {showBottomSheet && (
                <div className={`fixed bottom-0 left-0 w-full h-[98vh] bg-white rounded-t-2xl grid grid-rows-[69px_1fr_76px] transform ${showBottomSheet ? 'animate-slideUp' : 'animate-slideDown'} transition-transform duration-500 ease-in-out z-50`}>

                    {/* Header of Bottom Sheet */}
                    <div className="p-5 flex justify-between items-center">
                        <span className="text-lg font-semibold text-[#1D2939]">Quiz</span>
                        <button onClick={closeBottomSheet}>
                            <div className="w-[156px] h-[44px] bg-[#FFFFFF]"
                                style={{ border: "1.5px solid #EAECF0", padding: "10px 24px", borderRadius: "8px" }}>
                                <span className='font-semibold text-sm text-[#1D2939]'>Save and Exit</span>
                            </div>
                        </button>
                    </div>
                    {/* Content inside the bottom sheet */}
                    <div className="overflow-y-auto p-5">
                        {/* Add any content or quiz-related actions here */}
                    </div>
                    <div className="flex flex-row items-center justify-end border-t border-lightGrey">
                        <button
                            className="border rounded-lg py-2.5 px-6 text-sm border-lightGrey text-blackLike"
                            onClick={closeBottomSheet}
                        >
                            <p>Cancel</p>
                        </button>
                        <button className="mr-6 ml-2.5 border rounded-lg py-2.5 px-6 text-sm bg-purple text-white border-darkPurple">
                            <p>Save</p>
                        </button>
                    </div>

                </div>
            )}
        </>
    );
}

export default Quiz;
