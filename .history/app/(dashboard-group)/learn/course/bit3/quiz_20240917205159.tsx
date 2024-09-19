import { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import Image from 'next/image';

function Quiz() {
    let [isOpen, setIsOpen] = useState(true);  // For the initial dialog
    let [showBottomSheet, setShowBottomSheet] = useState(false);  // For the bottom sheet
    let [option, setOption] = useState<String>();


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
                <div className="fixed bottom-0 left-0 w-full h-[98vh] bg-white rounded-t-2xl grid grid-rows-[69px_1fr_76px] z-50 ">

                    {/* Header of Bottom Sheet */}
                    <div className="p-5 flex justify-between items-center h-[69px] w-full border-b-[1.5px] border-t-[1.5px] border-[#EAECF0]  rounded-tl-[18px] rounded-tr-[16px]">
                        <span className="text-lg font-semibold text-[#1D2939]">Quiz</span>
                        <span className="text-lg font-semibold text-[#1D2939] flex items-center justify-center gap-2">
                            <Image
                                width={24}
                                height={24}
                                src="/icons/alarm-clock.svg"
                                alt="timer"
                            />
                            00:05
                        </span>


                        <div className="w-[150px] h-[44px] bg-[#FFFFFF] border-[1px] border-[#EAECF0] rounded-[8px] flex items-center justify-center">
                            <button onClick={closeBottomSheet}
                                className="w-full h-full flex items-center justify-center text-sm font-semibold text-[#1D2939] border-none p-[10px_24px]">
                                Save and Exit
                            </button>
                        </div>




                    </div>
                    {/* Content inside the bottom sheet */}
                    <div className="overflow-y-auto p-5 ">
                        <div className='gap-[20px] flex flex-col'>
                            <div className="flex items-center justify-center ">
                                <div className='w-[880px] h-[252px] rounded-[12px]  border-2 border-[#EAECF0] flex items-center justify-center'>
                                    <div className='bg-[#FFFFFF] w-[832px] h-[204px] gap-[20px]'>
                                        <div className='w-[832px] h-[24px] gap-[6px] '>
                                            <span className='text-[#1D2939] font-semibold text-base'>
                                                Q1. What is the result of the bitwise AND operation between 1010 and 1100?

                                            </span>

                                        </div>
                                        <div className='w-[168.75px] h-[160px] gap-[20px]  flex flex-col mt-4'>
                                            <span className='font-normal text-base text-[#667085] flex flex-row'>
                                                <input type='radio' name='option' value='1000' onChange={e => setOption(e.target.value)} />1000

                                            </span>
                                            <span className='font-normal text-base text-[#667085] flex flex-row'>
                                                <Image
                                                    src="/icons/course-circle.svg"
                                                    width={20}
                                                    height={20}
                                                    alt=" course-circle"
                                                    className='mr-2' />
                                                1000

                                            </span>
                                            <span className='font-normal text-base text-[#667085] flex flex-row'>
                                                <Image
                                                    src="/icons/course-circle.svg"
                                                    width={20}
                                                    height={20}
                                                    alt=" course-circle"
                                                    className='mr-2' />
                                                1000

                                            </span>
                                            <span className='font-normal text-base text-[#667085] flex flex-row'>
                                                <Image
                                                    src="/icons/course-circle.svg"
                                                    width={20}
                                                    height={20}
                                                    alt=" course-circle"
                                                    className='mr-2' />
                                                1000

                                            </span>


                                        </div>

                                    </div>

                                </div>
                            </div>
                            <div className="flex items-center justify-center ">
                                <div className='w-[880px] h-[252px] rounded-[12px]  border-2 border-[#EAECF0] flex items-center justify-center'>
                                    <div className='bg-[#FFFFFF] w-[832px] h-[204px] gap-[20px]'>
                                        <div className='w-[832px] h-[24px] gap-[6px] '>
                                            <span className='text-[#1D2939] font-semibold text-base'>
                                                Q1. What is the result of the bitwise AND operation between 1010 and 1100?

                                            </span>

                                        </div>
                                        <div className='w-[168.75px] h-[160px] gap-[20px]  flex flex-col mt-4'>
                                            <span className='font-normal text-base text-[#667085] flex flex-row'>
                                                <Image
                                                    src="/icons/course-circle.svg"
                                                    width={20}
                                                    height={20}
                                                    alt=" course-circle"
                                                    className='mr-2' />
                                                1000

                                            </span>
                                            <span className='font-normal text-base text-[#667085] flex flex-row'>
                                                <Image
                                                    src="/icons/course-circle.svg"
                                                    width={20}
                                                    height={20}
                                                    alt=" course-circle"
                                                    className='mr-2' />
                                                1000

                                            </span>
                                            <span className='font-normal text-base text-[#667085] flex flex-row'>
                                                <Image
                                                    src="/icons/course-circle.svg"
                                                    width={20}
                                                    height={20}
                                                    alt=" course-circle"
                                                    className='mr-2' />
                                                1000

                                            </span>
                                            <span className='font-normal text-base text-[#667085] flex flex-row'>
                                                <Image
                                                    src="/icons/course-circle.svg"
                                                    width={20}
                                                    height={20}
                                                    alt=" course-circle"
                                                    className='mr-2' />
                                                1000

                                            </span>


                                        </div>

                                    </div>

                                </div>
                            </div>
                            <div className="flex items-center justify-center ">
                                <div className='w-[880px] h-[252px] rounded-[12px]  border-2 border-[#EAECF0] flex items-center justify-center'>
                                    <div className='bg-[#FFFFFF] w-[832px] h-[204px] gap-[20px]'>
                                        <div className='w-[832px] h-[24px] gap-[6px] '>
                                            <span className='text-[#1D2939] font-semibold text-base'>
                                                Q1. What is the result of the bitwise AND operation between 1010 and 1100?

                                            </span>

                                        </div>
                                        <div className='w-[168.75px] h-[160px] gap-[20px]  flex flex-col mt-4'>
                                            <span className='font-normal text-base text-[#667085] flex flex-row'>
                                                <Image
                                                    src="/icons/course-circle.svg"
                                                    width={20}
                                                    height={20}
                                                    alt=" course-circle"
                                                    className='mr-2' />
                                                1000

                                            </span>
                                            <span className='font-normal text-base text-[#667085] flex flex-row'>
                                                <Image
                                                    src="/icons/course-circle.svg"
                                                    width={20}
                                                    height={20}
                                                    alt=" course-circle"
                                                    className='mr-2' />
                                                1000

                                            </span>
                                            <span className='font-normal text-base text-[#667085] flex flex-row'>
                                                <Image
                                                    src="/icons/course-circle.svg"
                                                    width={20}
                                                    height={20}
                                                    alt=" course-circle"
                                                    className='mr-2' />
                                                1000

                                            </span>
                                            <span className='font-normal text-base text-[#667085] flex flex-row'>
                                                <Image
                                                    src="/icons/course-circle.svg"
                                                    width={20}
                                                    height={20}
                                                    alt=" course-circle"
                                                    className='mr-2' />
                                                1000

                                            </span>


                                        </div>

                                    </div>

                                </div>
                            </div>
                            <div className="flex items-center justify-center ">
                                <div className='w-[880px] h-[252px] rounded-[12px]  border-2 border-[#EAECF0] flex items-center justify-center'>
                                    <div className='bg-[#FFFFFF] w-[832px] h-[204px] gap-[20px]'>
                                        <div className='w-[832px] h-[24px] gap-[6px] '>
                                            <span className='text-[#1D2939] font-semibold text-base'>
                                                Q1. What is the result of the bitwise AND operation between 1010 and 1100?

                                            </span>

                                        </div>
                                        <div className='w-[168.75px] h-[160px] gap-[20px]  flex flex-col mt-4'>
                                            <span className='font-normal text-base text-[#667085] flex flex-row'>
                                                <Image
                                                    src="/icons/course-circle.svg"
                                                    width={20}
                                                    height={20}
                                                    alt=" course-circle"
                                                    className='mr-2' />
                                                1000

                                            </span>
                                            <span className='font-normal text-base text-[#667085] flex flex-row'>
                                                <Image
                                                    src="/icons/course-circle.svg"
                                                    width={20}
                                                    height={20}
                                                    alt=" course-circle"
                                                    className='mr-2' />
                                                1000

                                            </span>
                                            <span className='font-normal text-base text-[#667085] flex flex-row'>
                                                <Image
                                                    src="/icons/course-circle.svg"
                                                    width={20}
                                                    height={20}
                                                    alt=" course-circle"
                                                    className='mr-2' />
                                                1000

                                            </span>
                                            <span className='font-normal text-base text-[#667085] flex flex-row'>
                                                <Image
                                                    src="/icons/course-circle.svg"
                                                    width={20}
                                                    height={20}
                                                    alt=" course-circle"
                                                    className='mr-2' />
                                                1000

                                            </span>


                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="flex flex-row items-center justify-end border-t border-lightGrey">

                        <button className="mr-6 ml-2.5 border rounded-lg py-2.5 px-6 text-sm bg-purple text-white border-darkPurple">
                            <p>Submit</p>
                        </button>
                    </div>

                </div>
            )}
        </>
    );
}

export default Quiz;
