"use client";

import { useRouter } from 'next/navigation';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import Image from 'next/image';

function DialogPage() {
    const router = useRouter();

    const handleStartNow = () => {
        router.push('/learn/course/bit3/bit4'); // Navigate to the bottom sheet page
    };

    return (
        <Dialog open={true} onClose={() => router.push('/')} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/30 " />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="bg-white rounded-2xl p-5 w-[480px] h-[261px]">
                    {/* Header Section */}
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-lg font-bold text-[#1D2939]">Confirmation</span>
                        <button onClick={() => router.push('/')}>
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
                                onClick={() => router.push('/')}
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
    );
}

export default DialogPage;
