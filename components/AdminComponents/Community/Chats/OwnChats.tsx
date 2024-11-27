import React from 'react';
import Image from 'next/image';

function OwnChats() {
    return (
        <div className='flex flex-col justify-start w-full pr-6 gap-4'>
            <div className='flex flex-col items-end w-full group'>
                <div className='flex flex-row mb-2 gap-2'>
                    <p className='text-xs text-[#475467] font-normal leading-[18px]'>Edited</p>
                    <p className='text-xs text-[#475467] font-normal leading-[18px]'>3:24 PM</p>
                </div>
                <div className='flex flex-row items-center justify-end w-full gap-4'>
                    <div className='w-fit'>
                        <button className='flex flex-row items-center px-2 py-1 gap-1 opacity-0 hover:bg-[#D0D5DD] border border-[#6770A9] rounded-full transition-all duration-150 group-hover:opacity-100'>
                            <Image src='/icons/arrow-down.svg' alt='more' width={12} height={12} />
                            <Image src='/icons/smile.svg' alt='more' width={16} height={16} />
                        </button>
                    </div>
                    <div className='max-w-[65%] w-fit px-4 py-3 bg-[#9012FF] text-sm text-white font-normal leading-[1.313rem] whitespace-pre-line custom-line-spacing rounded-xl'>
                        Hey <span className='font-semibold'>@everyone</span>,<br /><br />
                        Welcome to the channel
                    </div>
                </div>
                <div className='flex flex-row max-w-[65%] mt-1 gap-2'>
                    <button className='flex flex-row items-center px-2 py-1 gap-1 bg-[#F2F4F7] border border-[#D0D5DD] rounded-full'>
                        <p className='text-[0.813rem]'>👍</p>
                        <p className='text-xs text-[#475467] font-medium leading-[1.125rem]'>24</p>
                    </button>
                </div>
            </div>
            <div className='flex flex-col items-end w-full group'>
                <div className='flex flex-row mb-2 gap-2'>
                    <p className='text-xs text-[#475467] font-normal leading-[18px]'>Edited</p>
                    <p className='text-xs text-[#475467] font-normal leading-[18px]'>3:24 PM</p>
                </div>
                <div className='flex flex-row items-center justify-end w-full gap-4'>
                    <div className='w-fit'>
                        <button className='flex flex-row items-center px-2 py-1 gap-1 opacity-0 hover:bg-[#D0D5DD] border border-[#6770A9] rounded-full transition-all duration-150 group-hover:opacity-100'>
                            <Image src='/icons/arrow-down.svg' alt='more' width={12} height={12} />
                            <Image src='/icons/smile.svg' alt='more' width={16} height={16} />
                        </button>
                    </div>
                    <div className='max-w-[65%] w-fit px-4 py-3 bg-[#9012FF] text-sm text-white font-normal leading-[1.313rem] whitespace-pre-line custom-line-spacing rounded-xl'>
                        Hello Guys, Looking forward to learning with from all of you
                    </div>
                </div>
                <div className='flex flex-row max-w-[65%] mt-1 gap-2'>
                    <button className='flex flex-row items-center px-2 py-1 gap-1 bg-[#F2F4F7] border border-[#D0D5DD] rounded-full'>
                        <p className='text-[0.813rem]'>👍</p>
                        <p className='text-xs text-[#475467] font-medium leading-[1.125rem]'>24</p>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OwnChats;