"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import GroupIcons from '@/components/DashboardComponents/CommunityComponents/groupIcons';
import General from '@/components/DashboardComponents/CommunityComponents/general';
import MockTest from '@/components/DashboardComponents/CommunityComponents/mockTest';
import Details from '@/components/DashboardComponents/CommunityComponents/details';
import Bottomtext from '@/components/DashboardComponents/CommunityComponents/BottomText';
import InsideGrp from '@/components/DashboardComponents/CommunityComponents/insideGrp';
import ChatArea from '@/components/DashboardComponents/CommunityComponents/ChatArea'

const CommunityPage = () => {
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
                    <div className="group flex items-center justify-center relative w-[46px] h-[46px] rounded-full border-[#C74FE6] border-2 hover:border-darkPurple">
                        <div className="flex items-center justify-center w-[42px] h-[42px] rounded-full bg-[#C74FE6] border-[#C74FE6] border-2 text-[#624C18] font-bold group-hover:border-white">
                            <Image src='/icons/messageIcon.svg' alt='message icon' width={18} height={18} />
                        </div>
                        <div className="absolute top-6 left-6 px-2 py-1 bg-red-600 rounded-full text-white text-xs font-medium hidden group-hover:flex">
                            6
                        </div>
                    </div>
                </div>
                <div>
                    <GroupIcons />
                </div>
            </div>
            <div className='flex flex-col w-[270px] bg-white border-t border-r border-b border-lightGrey'>
                <InsideGrp />
                <div className='flex flex-col justify-start items-center mx-4 mt-[15px] gap-6'>
                    <General />
                    <MockTest />
                </div>
            </div>
            <div className='flex flex-1 flex-col border-t border-r border-b border-lightGrey h-auto'>
                <div className='flex items-center justify-between h-[72px] bg-white border-b border-lightGrey'>
                    <div className="flex flex-row items-center gap-2 ml-6 rounded-[7px] transition-colors">
                        <Image src='/icons/PhyiscsQuicktest.png' alt="bookstack icon" width={16} height={24} />
                        <p className="font-semibold text-[#182230]">Physics 101</p>
                        <Image src='/icons/chevron-down.svg' alt='arrow down' width={20} height={20} />
                    </div>

                    <div className='flex flex-row mr-6 gap-4'>
                        <button>
                            <Image src='/icons/search.svg' alt='search icon' width={18} height={18} />
                        </button>

                        <button className='transition-colors hover:bg-neutral-100' onClick={toggleCollapse}>
                            <Image src='/icons/collapseDetails.svg' alt='collapse details icon' width={24} height={24} />

                        </button>

                    </div>


                </div>
                {/* chat Area */}
                <div className='flex flex-1 '>
                    <ChatArea />

                </div>
                {/* The End ----------------------------------------------------------------------------->*/}
                {/* this is the bottom text  */}
                <div>
                    <Bottomtext />

                </div>
                {/* The End----------------------------------------------------------------------------> */}
            </div>
            {!isCollapsed && (
                <div className={` h-auto  bg-red-600'transition-all  ${isCollapsed ? 'max-h-0 opacity-0' : 'max-h-[500px] opacity-100'}`}>

                    <div className='flex items-center justify-center h-[72px] border-b border-lightGrey'>
                        <div className='flex flex-row justify-between w-full mx-6'>
                            <div><h3 className='text-base'>Details</h3></div>
                            <div className='flex flex-row items-center gap-[6px]'>
                                <Image src='/icons/membersIcon.svg' alt='members icon' width={18} height={18} />
                                <p className='text-sm text-[#4B5563]'>57</p>
                            </div>
                        </div>
                    </div>

                    <div className='overflow-y-auto h-auto'>
                        <Details />

                    </div>



                </div>
            )}
        </div>
    );
}

export default CommunityPage
