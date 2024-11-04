import React from 'react';
import Image from 'next/image';

function Content() {
    return (
        <div className='flex flex-col gap-2 mt-4'>
            <button className='flex flex-row items-center justify-between px-6 py-4 bg-white border border-lightGrey rounded-xl'>
                <div className='flex flex-col gap-1'>
                    <p className='text-left text-base text-[#1D2939] font-semibold'>Physics</p>
                    <p className='text-left text-sm text-[#667085] font-normal'>15 Questions</p>
                </div>
                <div>
                    <Image src='/icons/collapse-right-02.svg' alt='open this test series' width={24} height={24} />
                </div>
            </button>
            <button className='flex flex-row items-center justify-between px-6 py-4 bg-white border border-lightGrey rounded-xl'>
                <div className='flex flex-col gap-1'>
                    <p className='text-left text-base text-[#1D2939] font-semibold'>Chemistry</p>
                    <p className='text-left text-sm text-[#667085] font-normal'>15 Questions</p>
                </div>
                <div>
                    <Image src='/icons/collapse-right-02.svg' alt='open this test series' width={24} height={24} />
                </div>
            </button>
            <button className='flex flex-row items-center justify-between px-6 py-4 bg-white border border-lightGrey rounded-xl'>
                <div className='flex flex-col gap-1'>
                    <p className='text-left text-base text-[#1D2939] font-semibold'>Maths</p>
                    <p className='text-left text-sm text-[#667085] font-normal'>15 Questions</p>
                </div>
                <div>
                    <Image src='/icons/collapse-right-02.svg' alt='open this test series' width={24} height={24} />
                </div>
            </button>
            <button className='flex flex-row items-center justify-between px-6 py-4 bg-white border border-lightGrey rounded-xl'>
                <div className='flex flex-col gap-1'>
                    <p className='text-left text-base text-[#1D2939] font-semibold'>All Subject</p>
                    <p className='text-left text-sm text-[#667085] font-normal'>15 Questions</p>
                </div>
                <div>
                    <Image src='/icons/collapse-right-02.svg' alt='open this test series' width={24} height={24} />
                </div>
            </button>
        </div>
    );
}

export default Content;