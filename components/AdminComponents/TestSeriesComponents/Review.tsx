import React, { useState } from 'react'
import Image from "next/image";

const TestSeriesInfo = () => {

    return (
        <div className='flex flex-1 flex-col ml-2 overflow-y-auto'>
            <div className='flex flex-row gap-3 mt-6 mb-4'>
                <h2 className='text-base font-bold text-[#1D2939]'>About Test Series</h2>
                <button>
                    <Image src='/icons/edit-icon.svg' alt='edit' width={14} height={14} />
                </button>
            </div>
            <div className='flex flex-row gap-4'>
                <Image className='w-[19.375rem] h-[12.25rem]' src='/images/Frame.png' alt='course img' width={310} height={196} />
                <div className='flex flex-col w-full h-auto p-6 rounded-2xl bg-white border border-lightGrey'>
                    <h2 className='text-base font-bold text-[#1D2939]'>Phodu JEE Mains Test Series 2025</h2>
                    <p className='text-sm text-[#667085] mt-2 font-normal'>
                        The BITSET Full Course is designed to provide students with an in-depth understanding of bit manipulation techniques and the use of bitsets in data structures.
                    </p>
                    <p className='flex felx-row text-sm my-4 gap-2'><span className='font-semibold'>4.7</span> (500+Ratings)</p>
                    <div className='flex flex-row items-center justify-between'>
                        <div className='flex flex-row items-center gap-2'>
                            <p className='text-xl text-[#1D2939] font-semibold'>&#8377;3,990</p>
                            <p className='text-base text-[#667085] font-normal'><s>&#8377;7,499</s></p>
                            <p className='h-fit px-3 py-0.5 text-white text-xs font-semibold bg-[#DB6704] rounded-full'>86% off</p>
                        </div>
                        <button className='w-[11.375rem] h-[2.75rem] text-white text-sm font-normal bg-[#9012FF] border-[#800EE2] rounded-md shadow-inner-button'>
                            Buy Course
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex flex-row w-full my-6 gap-2'>
                <div className='flex flex-col items-start w-full p-4 gap-1 bg-white border border-lightGrey rounded-xl'>
                    <p className='text-sm text-[#667085] font-normal'>Test Series starts</p>
                    <p className='text-base text-[#1D2939] font-medium'>-</p>
                </div>
                <div className='flex flex-col items-start w-full p-4 gap-1 bg-white border border-lightGrey rounded-xl'>
                    <p className='text-sm text-[#667085] font-normal'>Test Series ends</p>
                    <p className='text-base text-[#1D2939] font-medium'>-</p>
                </div>
                <div className='flex flex-col items-start w-full p-4 gap-1 bg-white border border-lightGrey rounded-xl'>
                    <p className='text-sm text-[#667085] font-normal'>Test Series starts</p>
                    <p className='text-base text-[#1D2939] font-medium'>95</p>
                </div>
            </div>
            <div className='flex flex-col mb-4 gap-2'>
                <div className='flex flex-row gap-2'>
                    <h2 className='text-base text-[#1D2939] font-bold'>Total Questions</h2>
                    <button>
                        <Image src='/icons/edit-icon.svg' alt='edit' width={14} height={14} />
                    </button>
                </div>
                <div className='flex flex-row gap-2'>
                    <Image src='/icons/idea-01.svg' alt='tests' width={20} height={20} />
                    <p className='text-base text-[#1D2939] font-normal'>18 Tests</p>
                </div>
            </div>
            <div className='flex flex-col gap-2 mb-8'>
                <button className='flex flex-row items-center justify-between px-6 py-4 bg-white border border-lightGrey rounded-xl'>
                    <div className='flex flex-col gap-1'>
                        <p className='text-left text-base text-[#1D2939] font-semibold'>Physics</p>
                        <p className='text-left text-sm text-[#667085] font-normal'>5 Tests</p>
                    </div>
                    <div>
                        <Image src='/icons/collapse-right-02.svg' alt='open thhis testseries' width={24} height={24} />
                    </div>
                </button>
                <button className='flex flex-row items-center justify-between px-6 py-4 bg-white border border-lightGrey rounded-xl'>
                    <div className='flex flex-col gap-1'>
                        <p className='text-left text-base text-[#1D2939] font-semibold'>Physics</p>
                        <p className='text-left text-sm text-[#667085] font-normal'>5 Tests</p>
                    </div>
                    <button>
                        <Image src='/icons/collapse-right-02.svg' alt='open thhis testseries' width={24} height={24} />
                    </button>
                </button>
                <button className='flex flex-row items-center justify-between px-6 py-4 bg-white border border-lightGrey rounded-xl'>
                    <div className='flex flex-col gap-1'>
                        <p className='text-left text-base text-[#1D2939] font-semibold'>Physics</p>
                        <p className='text-left text-sm text-[#667085] font-normal'>5 Tests</p>
                    </div>
                    <div>
                        <Image src='/icons/collapse-right-02.svg' alt='open thhis testseries' width={24} height={24} />
                    </div>
                </button>
                <button className='flex flex-row items-center justify-between px-6 py-4 bg-white border border-lightGrey rounded-xl'>
                    <div className='flex flex-col gap-1'>
                        <p className='text-left text-base text-[#1D2939] font-semibold'>Physics</p>
                        <p className='text-left text-sm text-[#667085] font-normal'>5 Tests</p>
                    </div>
                    <div>
                        <Image src='/icons/collapse-right-02.svg' alt='open thhis testseries' width={24} height={24} />
                    </div>
                </button>
            </div>
        </div>
    )
}

export default TestSeriesInfo
