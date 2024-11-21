"use client"
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function RoleManagementInfo() {
    const router = useRouter(); // Initialize useRouter
    return (
        <div className=' flex flex-col p-8 gap-6'>
            <button className='flex flex-row gap-1'>
                <span className='text-base font-semibold text-[#1D2939]'
                    onClick={() => router.back()}>Role Management</span>
                <Image
                    src="/icons/arrow-right-01-round.svg"
                    width={24}
                    height={24}
                    alt="right-arrow" />
                <span className='text-base font-medium text-[#667085]'>Ralph Edwards</span>
            </button>

            <div className='w-full gap-6 flex flex-row'>
                <div className='h-[292px] w-1/2'>


                </div>

            </div>
        </div>
    );
}

export default RoleManagementInfo;