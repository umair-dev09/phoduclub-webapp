import { useState } from 'react';

const Publish = () => {
    return (
        <div className='flex flex-col pt-4 pb-8 gap-4'>
            <div className='flex flex-col w-full h-auto p-6 bg-white border border-lightGrey rounded-xl gap-4'>
                <span className='font-semibold text-lg text-[#1D2939]'>Set Quiz Time</span>
                <div className='flex flex-row w-full gap-4'>
                    <div className='flex flex-col w-1/2 gap-1'>
                        <p>Start Date</p>
                        <div className='w-full py-2 px-3 border border-lightGrey rounded-md'>
                            hi
                        </div>
                    </div>
                    <div className='flex flex-col w-1/2 gap-1'>
                        <p>End Date</p>
                        <div className='w-full py-2 px-3 border border-lightGrey rounded-md'>
                            hi
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col w-full h-auto p-6 bg-white border border-lightGrey rounded-xl gap-4'>
                <span className='font-semibold text-lg text-[#1D2939]'>About quiz</span>
                <div className='flex flex-row w-full gap-4'>
                    {/* Time Duration */}
                    <div className='flex flex-col w-full gap-1'>
                        <p className='text-sm font-medium text-[#1D2939]'>Time Duration</p>
                        <div className='flex flex-row w-full py-2 px-3 border border-lightGrey rounded-md gap-1 focus-within:border-[#D7BBFC] focus-within:ring-2 focus-within:ring-[#E8DEFB] focus-within:outline-none transition-colors'>
                            <input className='w-full outline-none' placeholder='0' />
                            <p className='text-sm font-normal text-[#182230]'>min</p>
                        </div>
                        <p className='text-[0.813rem] font-normal text-[#475467]'>Students must finish the quiz in time.</p>
                    </div>

                    {/* Marks per question */}
                    <div className='flex flex-col w-full gap-1'>
                        <p className='text-sm font-medium text-[#1D2939]'>Marks per question</p>
                        <div className='w-full py-2 px-3 border border-lightGrey rounded-md focus-within:border-[#D7BBFC] focus-within:ring-2 focus-within:ring-[#E8DEFB] focus-within:outline-none transition-colors'>
                            <input className='w-full outline-none' placeholder='0' />
                        </div>
                        <p className='text-[0.813rem] font-normal text-[#475467]'>Applies only to the correct answers.</p>
                    </div>

                    {/* Negative marks per question */}
                    <div className='flex flex-col w-full gap-1'>
                        <p className='text-sm font-medium text-[#1D2939]'>Negative marks per question</p>
                        <div className='w-full py-2 px-3 border border-lightGrey rounded-md focus-within:border-[#D7BBFC] focus-within:ring-2 focus-within:ring-[#E8DEFB] focus-within:outline-none transition-colors'>
                            <input className='w-full outline-none' placeholder='0' />
                        </div>
                        <p className='text-[0.813rem] font-normal text-[#475467]'>Applies only to the incorrect answers.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Publish;
