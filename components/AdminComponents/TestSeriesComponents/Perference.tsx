import React from 'react'
import Image from "next/image";


const TestSeriesInfo = () => {
    return (
        <div className='flex flex-col ml-1 pt-4 gap-4'>
            <div className='flex flex-col w-full p-6 bg-white border border-lightGrey rounded-xl'>
                <div className='flex flex-row justify-between'>
                    <h3>Schedule Test Series</h3>
                    <div className='flex flex-row items-center gap-2'>
                        <input type="checkbox" />
                        <p className='text-sm text-[#182230] font-medium'>Make the Test Series live now</p>
                    </div>
                </div>
                <div className='flex flex-row w-full mt-4 gap-4'>
                    <div className='w-full'>
                        <p className='text-sm text-[#1D2939] font-medium'>Start Date & time</p>
                        <div className='flex flex-row items-center px-4 py-2 gap-2 bg-white border border-lightGrey rounded-md'>
                            <Image src='/icons/calendar-03.svg' alt='date' width={24} height={24} />
                            <p className='text-sm text-[#667085] font-normal'>Select Date & Time</p>
                        </div>
                    </div>
                    <div className='w-full'>
                        <p className='text-sm text-[#1D2939] font-medium'>Start Date & time</p>
                        <div className='flex flex-row items-center px-4 py-2 gap-2 bg-white border border-lightGrey rounded-md'>
                            <Image src='/icons/calendar-03.svg' alt='date' width={24} height={24} />
                            <p className='text-sm text-[#667085] font-normal'>Select Date & Time</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col w-full p-6 bg-white border border-lightGrey rounded-xl'>
                <h3>Test Series available for</h3>
                <div className='flex flex-row w-full mt-4 gap-4'>
                    <div className='flex flex-col w-full gap-1'>
                        <p className='text-sm text-[#1D2939] font-medium'>Year</p>
                        <button className='flex flex-row items-center justify-between w-full px-2 py-2 bg-white border border-lightGrey rounded-md'>
                            <p className='text-sm text-[#667085] font-normal'>Select Year</p>
                            <Image src='/icons/arrow-down-01-round.svg' alt='open' width={20} height={20} />
                        </button>
                    </div>
                    <div className='flex flex-col w-full gap-1'>
                        <p className='text-sm text-[#1D2939] font-medium'>Exam</p>
                        <button className='flex flex-row items-center justify-between w-full px-2 py-2 bg-white border border-lightGrey rounded-md'>
                            <p className='text-sm text-[#667085] font-normal'>Select Exam</p>
                            <Image src='/icons/arrow-down-01-round.svg' alt='open' width={20} height={20} />
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex flex-col w-full p-6 bg-white border border-lightGrey rounded-xl'>
                <h3>Select product (Optional)</h3>
                <div className='flex flex-col w-full mt-4 gap-1'>
                    <p className='text-sm text-[#1D2939] font-medium'>Product</p>
                    <button className='flex flex-row items-center justify-between w-[53%] px-2 py-2 bg-white border border-lightGrey rounded-md'>
                        <p className='text-sm text-[#667085] font-normal'>Select Product</p>
                        <Image src='/icons/arrow-down-01-round.svg' alt='open' width={20} height={20} />
                    </button>
                    <p className='text-[0.813rem] text-[#475467] font-normal w-[40%] mt-1'>
                        Test series will be only available who purchase the selected product.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default TestSeriesInfo
