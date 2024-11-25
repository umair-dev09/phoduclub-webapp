import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

function RoleManagementInfo() {
    const router = useRouter(); // Initialize useRouter
    return (
        <div className=' flex flex-col p-8'>
            <button className='flex flex-row gap-1'
                onClick={() => router.back()}>
                <span className='text-base font-semibold text-[#1D2939]'>Role Management</span>
                <Image
                    src="/icons/arrow-right-01-round.svg"
                    width={24}
                    height={24}
                    alt="right-arrow" />
                <span className='text-base font-medium text-[#667085]'>Ralph Edwards</span>
            </button>

        </div>
    );
}

export default RoleMangementInfo;