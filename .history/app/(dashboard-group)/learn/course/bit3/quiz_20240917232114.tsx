"use client";

import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import Image from 'next/image';

function DialogPage() {
    const [isDialogOpen, setIsDialogOpen] = useState(true);  // To handle the visibility of the dialog
    const [showBottomSheet, setShowBottomSheet] = useState(false);  // To handle the visibility of the bottom sheet

    // Function to close the dialog and show the bottom sheet
    const handleStartNow = () => {
        setIsDialogOpen(false);  // Close the dialog
        setShowBottomSheet(true);  // Open the bottom sheet
    };

    // Function to close the bottom sheet
    const closeBottomSheet = () => {
        setShowBottomSheet(false);
    };

    return (
        <div>
            {/* Dialog Component */}
            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/30 " />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel className="bg-white rounded-2xl p-5 w-[480px] h-[261px]">
                        {/* Header Section */}
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-lg font-bold text-[#1D2939]">Confirmation</span>
                            <button onClick={() => setIsDialogOpen(false)}>
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
                        <div className="border-t border-[#EAECF0] w-full h-[76px] mt-5 flex justify-end gap-2">
                            <div className='mt-5'>
                                <button
                                    className="bg-[#FFFFFF] text-[#1D2939] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px]"
                                    style={{ border: "1.5px solid #EAECF0" }}
                                    onClick={() => setIsDialogOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                            <div className='mt-5'>
                                <button
                                    onClick={handleStartNow}
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
                <div id="bottomSheet" className="fixed bottom-0 left-0 w-full h-[98vh] bg-white rounded-t-2xl z-50">
                    {/* Header of Bottom Sheet */}
                    <div className="p-5 flex justify-between items-center h-[69px] w-full border-b-[1.5px] border-t-[1.5px] border-[#EAECF0] rounded-tl-[18px] rounded-tr-[16px]" onClick={(e) => e.stopPropagation()}>
                        <span className="text-lg font-semibold text-[#1D2939]">Quiz</span>
                        <button onClick={closeBottomSheet} className="text-lg font-semibold text-[#1D2939]">
                            Close
                        </button>
                    </div>

                    {/* Content inside the bottom sheet */}
                    <div className="overflow-y-auto p-5">
                        <p>Quiz content goes here.</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default DialogPage;