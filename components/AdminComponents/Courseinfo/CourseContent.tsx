import React from 'react';
import Image from 'next/image';

function CourseContent() {
    return (
        <div className='flex flex-col gap-2 mt-4'>
            <div className='flex flex-row gap-1'>
                <button>
                    <Image src='/icons/more-01.svg' alt='move' width={24} height={24} />
                </button>
                <button className='flex flex-row items-center justify-between w-full px-6 py-4 bg-white border border-lightGrey rounded-xl'>
                    <div className='flex flex-col gap-1'>
                        <p className='text-left text-base text-[#1D2939] font-semibold'>Introduction</p>
                        <p className='text-left text-sm text-[#667085] font-normal'>1 Lessons</p>
                    </div>
                    <div className='flex flex-row items-center gap-2'>
                        <button className='flex flex-row items-center gap-2'>
                            <Image src='/icons/plus-sign.svg' alt='add' width={18} height={18} />
                            <p className='text-sm text-[#9012FF] font-semibold'>Add Content</p>
                        </button>
                        <Image src='/icons/more-vertical.svg' alt='more' width={24} height={24} />
                    </div>
                </button>
            </div>
            <div className='flex flex-row gap-1'>
                <button>
                    <Image src='/icons/more-01.svg' alt='move' width={24} height={24} />
                </button>
                <button className='flex flex-row items-center justify-between w-full px-6 py-4 bg-white border border-lightGrey rounded-xl'>
                    <div className='flex flex-col gap-1'>
                        <p className='text-left text-base text-[#1D2939] font-semibold'>Physics</p>
                        <p className='text-left text-sm text-[#667085] font-normal'>5 Lessons</p>
                    </div>
                    <div className='flex flex-row items-center gap-2'>
                        <button className='flex flex-row items-center gap-2'>
                            <Image src='/icons/plus-sign.svg' alt='add' width={18} height={18} />
                            <p className='text-sm text-[#9012FF] font-semibold'>Add Content</p>
                        </button>
                        <Image src='/icons/more-vertical.svg' alt='more' width={24} height={24} />
                    </div>
                </button>
            </div>
            <div className='flex flex-row gap-1'>
                <button>
                    <Image src='/icons/more-01.svg' alt='move' width={24} height={24} />
                </button>
                <button className='flex flex-row items-center justify-between w-full px-6 py-4 bg-white border border-lightGrey rounded-xl'>
                    <div className='flex flex-col gap-1'>
                        <p className='text-left text-base text-[#1D2939] font-semibold'>Chemistry</p>
                        <p className='text-left text-sm text-[#667085] font-normal'>7 Lessons</p>
                    </div>
                    <div className='flex flex-row items-center gap-2'>
                        <button className='flex flex-row items-center gap-2'>
                            <Image src='/icons/plus-sign.svg' alt='add' width={18} height={18} />
                            <p className='text-sm text-[#9012FF] font-semibold'>Add Content</p>
                        </button>
                        <Image src='/icons/more-vertical.svg' alt='more' width={24} height={24} />
                    </div>
                </button>
            </div>
            <div className='flex flex-row gap-1'>
                <button>
                    <Image src='/icons/more-01.svg' alt='move' width={24} height={24} />
                </button>
                <button className='flex flex-row items-center justify-between w-full px-6 py-4 bg-white border border-lightGrey rounded-xl'>
                    <div className='flex flex-col gap-1'>
                        <p className='text-left text-base text-[#1D2939] font-semibold'>Maths</p>
                        <p className='text-left text-sm text-[#667085] font-normal'>3 Lessons</p>
                    </div>
                    <div className='flex flex-row items-center gap-2'>
                        <button className='flex flex-row items-center gap-2'>
                            <Image src='/icons/plus-sign.svg' alt='add' width={18} height={18} />
                            <p className='text-sm text-[#9012FF] font-semibold'>Add Content</p>
                        </button>
                        <Image src='/icons/more-vertical.svg' alt='more' width={24} height={24} />
                    </div>
                </button>
            </div>
        </div>
    );
}

export default CourseContent;