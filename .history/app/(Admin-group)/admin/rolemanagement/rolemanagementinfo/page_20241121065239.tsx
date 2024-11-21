import React from 'react';
import Image from 'next/image';
function RoleMangementInfo() {
    return (
        <div className=' flex flex-col p-8'>
            <div className='flex flex-row gap-2'>
                <span className='text-base font-semibold text-[#1D2939]'>Role Management</span>
                <Image
                    src="/icons/right-arrow.svg"
                    width={24}
                    height={24}
                    alt="right-arrow" />
                <span className='text-base font-medium text-[#667085]'>Ralph Edwards</span>
            </div>

        </div>
    );
}

export default RoleMangementInfo;