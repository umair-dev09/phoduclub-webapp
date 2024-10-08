import React from 'react'
import Image from 'next/image'
import GroupIcons from '@/components/DashboardComponents/CommunityComponents/groupIcons'
import General from '@/components/DashboardComponents/CommunityComponents/general'
import MockTest from '@/components/DashboardComponents/CommunityComponents/mockTest'

const page = () => {
    return (
        <div className='flex flex-1 flex-row'>
            <div className='flex flex-col w-[90px] bg-white border-t border-r border-b border-lightGrey'>
                <div className='flex items-center justify-center h-[72px] border-b border-lightGrey'>
                    <div className='flex items-center justify-center w-[42px] h-[42px] bg-[#C74FE6] rounded-full'>
                        <Image src='/icons/messageIcon.svg' alt='message icon' width={18} height={18} />
                    </div>
                </div>
                <div>
                    <GroupIcons />
                </div>
            </div>
            <div className='flex flex-col w-[270px] bg-white border-t border-r border-b border-lightGrey'>
                <div className='flex flex-row items-center justify-between h-[72px] border-b border-lightGrey'>
                    <div className='flex flex-row gap-2 ml-6'>
                        <div className="flex items-center justify-center w-[46x] h-[46px] rounded-full">
                            <div className="flex items-center justify-center w-[42px] h-[42px] rounded-full bg-[#C0D5FF] border-2 border-[#C0D5FF] text-[#124B68] font-bold"><h3>J</h3></div>
                        </div>
                        <div className='flex flex-col justify-evenly text-sm'>
                            <div className='font-semibold '><h4>JEE-2024</h4></div>
                            <div className='flex flex-row gap-2 text-[#4B5563]'>
                                <Image src='/icons/membersIcon.svg' alt='members icon' width={18} height={18} />
                                <div>100</div>
                            </div>
                        </div>
                    </div>
                    <div className='mr-6'>
                        <Image src='/icons/arrowup.svg' alt='arrow down' width={20} height={20} />
                    </div>
                </div>
                <div className='flex flex-col justify-start items-center mx-4 mt-[15px] gap-6'>
                    <General />
                    <MockTest />
                </div>
            </div>
            <div className='flex flex-1 flex-col border-t border-r border-b border-lightGrey'>
                <div className='flex items-center justify-between h-[72px] bg-white border-b border-lightGrey'>
                    <div className="flex flex-row items-center gap-2 ml-6 rounded-[7px] transition-colors hover:bg-[#F8F0FF]">
                        <Image src='/icons/PhyiscsQuicktest.png' alt="bookstack icon" width={16} height={24} />
                        <p className="text-[13px] font-semibold text-[#4B5563]">Physics 101</p>
                        <Image src='/icons/arrowup.svg' alt='arrow down' width={20} height={20} />
                    </div>
                    <div className=' flex flex-row mr-6 gap-4'>
                        <Image src='/icons/search.svg' alt='search icon' width={18} height={18} />
                        <Image src='/icons/collapseDetails.svg' alt='collapde details icon' width={24} height={24} />
                    </div>
                </div>
                <div className='flex flex-1'></div>
                <div className='flex flex-row items-center justify-center h-[100px] bg-white gap-3'>
                    <div className='flex flex-row justify-between w-full h-auto ml-6 px-4 py-[0.625rem] gap-2 bg-[#FCFCFD] border border-[#D0D5DD] rounded-[9px]'>
                        <div >
                            <input placeholder='Type your message here...' className='outline-none placeholder-[#667085] font-normal w-full bg-[#FCFCFD]' />
                        </div>
                        <div className='flex flex-row gap-3'>
                            <Image src='/icons/emojies.svg' alt='emojies icon' width={20} height={20} />
                            <Image src='/icons/files.svg' alt='emojies icon' width={20} height={20} />
                        </div>
                    </div>
                    <div className='mr-6'>
                        <Image src='/icons/send.svg' alt='files icon' width={24} height={24} />
                    </div>
                </div>
            </div>
            <div className='flex flex-col w-[270px] bg-red-700 border-t border-r border-b border-lightGrey'>
                <div className='h-[72px] border-b border-lightGrey'></div>
                <div></div>
            </div>
        </div>
    )
}

export default page
