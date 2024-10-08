"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import GroupIcons from '@/components/DashboardComponents/CommunityComponents/groupIcons'
import General from '@/components/DashboardComponents/CommunityComponents/general'
import MockTest from '@/components/DashboardComponents/CommunityComponents/mockTest'
import Details from '@/components/DashboardComponents/CommunityComponents/details'
import { PopoverContent, PopoverTrigger, Popover } from '@nextui-org/popover'

const page = () => {

    // State to track if the section is collapsed
    const [isCollapsed, setIsCollapsed] = useState(false);


    // Function to toggle collapse
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };
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
                    <div className=' flex items-center justify-center mr-6'>
                        <Popover placement="bottom-end">
                            <PopoverTrigger>
                                <button>
                                    <Image src='/icons/chevron-down.svg' alt='arrow down' width={20} height={20} />
                                </button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div className='bg-white w-auto h-auto py-1 border border-lightGrey rounded-md'>
                                    <button>
                                        <Image src='/icons/bubble-chart-notification.svg' alt='mark as read' width={18} height={18} />
                                    </button>
                                    <button></button>
                                    <button></button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <div className='flex flex-col justify-start items-center mx-4 mt-[15px] gap-6'>
                    <General />
                    <MockTest />
                </div>
            </div>
            <div className='flex flex-1 flex-col border-t border-r border-b border-lightGrey'>
                <div className='flex items-center justify-between h-[72px] bg-white border-b border-lightGrey'>
                    <div className="flex flex-row items-center gap-2 ml-6 rounded-[7px] transition-colors">
                        <Image src='/icons/PhyiscsQuicktest.png' alt="bookstack icon" width={16} height={24} />
                        <p className="font-semibold text-[#182230]">Physics 101</p>
                        <Image src='/icons/chevron-down.svg' alt='arrow down' width={20} height={20} />
                    </div>
                    <button>
                        <div className='flex flex-row mr-6 gap-4' onClick={toggleCollapse}>
                            <Image src='/icons/search.svg' alt='search icon' width={18} height={18} />
                            <Image src='/icons/collapseDetails.svg' alt='collapde details icon' width={24} height={24} />
                        </div>

                    </button>

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
            {!isCollapsed && (
                <div
                    className={`w-[270px] h-auto bg-[#FFFFFF] overflow-y-auto border-t border-r border-b border-lightGrey overflow-hidden transition-all duration-300 ease-in-out ${isCollapsed ? 'max-h-0 opacity-0' : 'max-h-[500px] opacity-100'}`}
                >
                    <div className='flex items-center justify-center h-[72px] border-b border-lightGrey'>
                        <div className='flex flex-row justify-between w-full mx-6'>
                            <div><h3 className='text-base'>Details</h3></div>
                            <div className='flex flex-row items-center gap-[6px]'>
                                <Image src='/icons/membersIcon.svg' alt='members icon' width={18} height={18} />
                                <p className='text-sm text-[#4B5563]'>57</p>
                            </div>
                        </div>
                    </div>


                    <div className='flex items-start justify-center '>
                        <Details />
                    </div>



                </div>
            )}
        </div>
    )
}

export default page