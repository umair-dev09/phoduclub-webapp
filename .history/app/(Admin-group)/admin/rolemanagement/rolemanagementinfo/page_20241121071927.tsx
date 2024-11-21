"use client"
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function RoleManagementInfo() {
    const router = useRouter(); // Initialize useRouter
    return (
        <div className=' flex flex-col p-8 gap-6 w-full'>
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
                <div className='h-[292px] w-1/2 bg-[#FFFFFF] border border-solid border-[#EAECF0] shadow-md rounded-lg p-6 gap-6 flex flex-col'>
                    <div className='h-[72px] flex flex-row justify-between'>
                        <div className='flex flex-row gap-2'>
                            <Image
                                src="/icons/big-profile-pic.svg"
                                width={72}
                                height={72}
                                alt="profile-pic" />
                            <div className='flex flex-col gap-1'>
                                <span className='font-medium text-[#1D2939] text-xl'>Albert Flores</span>
                                <div className="bg-[#E5F4FF] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6 w-auto">
                                    <span className="w-[6px] h-[6px] bg-[#175CD3] rounded-full "></span>
                                    <span className="font-medium text-[#175CD3] text-xs">Teacher</span>
                                </div>
                            </div>
                        </div>
                        <button className=" h-10 w-10 flex items-center justify-center rounded-[8px] border border-solid border-[#EAECF0]">
                            <Image
                                src="/icons/three-dots.svg"
                                width={18}
                                height={18}
                                alt="three dots" />
                        </button>

                    </div>
                    <hr className='border border-solid border-[#EAECF0]' />
                    <div className="flex flex-row w-full">
                        <div className="flex flex-col w-1/2">
                            <span className="font-normal text-[#667085] text-[16px]">First Name</span>
                            <span className="font-semibold text-[#1D2939] text-[16px]">jabir</span>
                        </div>
                        <div className="flex flex-col w-1/2">
                            <span className="font-normal text-[#667085] text-[16px]">Last Name</span>
                            <span className="font-semibold text-[#1D2939] text-[16px]">Ali</span>
                        </div>
                    </div>
                    <div className="flex flex-row w-full">
                        <div className="flex flex-col w-1/2">
                            <span className="font-normal text-[#667085] text-[16px]">User ID</span>
                            <span className="font-semibold text-[#1D2939] text-[16px]">albert#8745</span>
                        </div>
                        <div className="flex flex-col w-1/2">
                            <span className="font-normal text-[#667085] text-[16px]">Mobile No.</span>
                            <span className="font-semibold text-[#1D2939] text-[16px]">+918574859632</span>
                        </div>
                    </div>

                </div>
                <div className='h-[292px] w-1/2'>

                    jabir
                </div>

            </div>
        </div>
    );
}

export default RoleManagementInfo;