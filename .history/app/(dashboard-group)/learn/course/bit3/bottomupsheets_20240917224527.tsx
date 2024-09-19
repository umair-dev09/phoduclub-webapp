'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

function BottomSheetPage() {
    const [option, setOption] = useState<string>("");
    const router = useRouter();

    const closeBottomSheet = () => {
        router.push('/'); // Navigate back to the home page or previous page
    };

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            const bottomSheet = document.getElementById('bottomSheet');
            if (bottomSheet && !bottomSheet.contains(e.target as Node)) {
                closeBottomSheet();
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <div id="bottomSheet" className="fixed bottom-0 left-0 w-full h-[98vh] bg-white rounded-t-2xl grid grid-rows-[69px_1fr_76px] z-50">
            {/* Header of Bottom Sheet */}
            <div className="p-5 flex justify-between items-center h-[69px] w-full border-b-[1.5px] border-[#EAECF0] rounded-tl-[18px] rounded-tr-[16px]">
                <span className="text-lg font-semibold text-[#1D2939]">Quiz</span>
                <span className="text-lg font-semibold text-[#1D2939] flex items-center justify-center gap-2">
                    <Image width={24} height={24} src="/icons/alarm-clock.svg" alt="timer" />
                    00:05
                </span>
                <div className="w-[150px] h-[44px] bg-[#FFFFFF] border-[1px] border-[#EAECF0] rounded-[8px] flex items-center justify-center">
                    <button onClick={closeBottomSheet} className="w-full h-full flex items-center justify-center text-sm font-semibold text-[#1D2939] border-none p-[10px_24px]">
                        Save and Exit
                    </button>
                </div>
            </div>
            {/* Content inside the bottom sheet */}
            <div className="overflow-y-auto p-5">
                <div className='gap-[20px] flex flex-col'>
                    {/* Repeated Question and Answer Sections */}
                    {Array(4).fill(null).map((_, index) => (
                        <div key={index} className="flex items-center justify-center">
                            <div className='w-[880px] h-[252px] rounded-[12px] border-2 border-[#EAECF0] flex items-center justify-center'>
                                <div className='bg-[#FFFFFF] w-[832px] h-[204px] gap-[20px]'>
                                    <div className='w-[832px] h-[24px] gap-[6px]'>
                                        <span className='text-[#1D2939] font-semibold text-base'>
                                            Q1. What is the result of the bitwise AND operation between 1010 and 1100?
                                        </span>
                                    </div>
                                    <div className='w-[168.75px] h-[160px] gap-[20px] flex flex-col mt-4'>
                                        {['1000', '2000', '3000', '4000'].map(value => (
                                            <span key={value} className='font-normal text-base text-[#667085] flex flex-row'>
                                                <input
                                                    type='radio'
                                                    name='option'
                                                    value={value}
                                                    checked={option === value}
                                                    onChange={e => setOption(e.target.value)}
                                                />
                                                <label className='ml-2'>{value}</label>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-row items-center justify-end border-t border-lightGrey">
                <button className="mr-6 ml-2.5 border rounded-lg py-2.5 px-6 text-sm bg-purple text-white border-darkPurple">
                    <p>Submit</p>
                </button>
            </div>
        </div>
    );
}

export default BottomSheetPage;
