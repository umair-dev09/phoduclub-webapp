import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import Image from 'next/image';

function Quiz() {
    const [isOpen, setIsOpen] = useState(true);

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
                    <div className="border-t border-[#EAECF0]  w-full h-[76px] mt-5  flex flex-row justify-between ml-auto">
                        <div className='w-[100px] h-[44px] bg-[#FFFFFF]'>
                            <button

                                className="bg-[#FFFFFF] text-[#1D2939] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px] ml-5"
                                style={{
                                    border: "1px solid #800EE2",
                                    boxShadow: "0px -4px 4px 0px #1018281F inset, 0px 3px 2px 0px #FFFFFF3D inset"
                                }}
                            >
                                Cancel
                            </button>
                        </div>

                        <div className='w-[100px] h-[44px] bg-[#9012FF]'>
                            <button

                                className="bg-[#8501FF] text-[#FFFFFF] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px] ml-5"
                                style={{
                                    border: "1px solid #800EE2",
                                    boxShadow: "0px -4px 4px 0px #1018281F inset, 0px 3px 2px 0px #FFFFFF3D inset"
                                }}
                            >
                                Start Quiz
                            </button>
                        </div>




                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}

export default Quiz;
