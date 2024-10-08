"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import GroupIcons from '@/components/DashboardComponents/CommunityComponents/groupIcons';
import General from '@/components/DashboardComponents/CommunityComponents/general';
import MockTest from '@/components/DashboardComponents/CommunityComponents/mockTest';

const Page = () => {
    // Manage the state of the sidebar collapse
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

    // Load collapsed state from localStorage (if needed)
    useEffect(() => {
        const savedState = localStorage.getItem('isSidebarCollapsed');
        if (savedState) {
            setIsCollapsed(savedState === 'true');
        }
    }, []);

    // Save the collapsed state in localStorage when toggled
    useEffect(() => {
        localStorage.setItem('isSidebarCollapsed', isCollapsed.toString());
    }, [isCollapsed]);

    // Handle the collapse button click
    const handleCollapseClick = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className='flex flex-1 flex-row'>
            {/* Sidebar Section */}
            <div className={`flex flex-col bg-white border-t border-r border-b border-lightGrey transition-all duration-300 ${isCollapsed ? 'w-[60px]' : 'w-[270px]'}`}>
                {/* Collapse Button */}
                <div className='flex items-center justify-between h-[72px] border-b border-lightGrey'>
                    <div className='flex items-center justify-center w-[42px] h-[42px] bg-[#C74FE6] rounded-full'>
                        <Image src='/icons/messageIcon.svg' alt='message icon' width={18} height={18} />
                    </div>
                    {/* Collapse Button */}
                    <button className="mr-4" onClick={handleCollapseClick}>
                        <Image
                            src={isCollapsed ? '/icons/collapse-right.svg' : '/icons/collapse-left.svg'}
                            alt='collapse button'
                            width={20}
                            height={20}
                        />
                    </button>
                </div>

                <div className="flex flex-col items-center mt-6">
                    <GroupIcons />
                </div>
            </div>

            {/* Content Section */}
            <div className='flex flex-col flex-1 border-t border-r border-b border-lightGrey'>
                {/* Top Section */}
                <div className='flex items-center justify-between h-[72px] bg-white border-b border-lightGrey'>
                    <div className="flex flex-row items-center gap-2 ml-6 rounded-[7px] transition-colors hover:bg-[#F8F0FF]">
                        <Image src='/icons/PhyiscsQuicktest.png' alt="bookstack icon" width={16} height={24} />
                        <p className="text-[13px] font-semibold text-[#4B5563]">Physics 101</p>
                        <Image src='/icons/arrowup.svg' alt='arrow down' width={20} height={20} />
                    </div>
                    <div className='flex flex-row mr-6 gap-4'>
                        <Image src='/icons/search.svg' alt='search icon' width={18} height={18} />
                    </div>
                </div>

                {/* Main Content */}
                <div className='flex flex-1'></div>

                {/* Bottom Section */}
                <div className='flex flex-row items-center justify-center h-[100px] bg-white gap-3'>
                    <div className='flex flex-row justify-between w-full h-auto ml-6 px-4 py-[0.625rem] gap-2 bg-[#FCFCFD] border border-[#D0D5DD] rounded-[9px]'>
                        <input placeholder='Type your message here...' className='outline-none placeholder-[#667085] font-normal w-full bg-[#FCFCFD]' />
                        <div className='flex flex-row gap-3'>
                            <Image src='/icons/emojies.svg' alt='emojies icon' width={20} height={20} />
                            <Image src='/icons/files.svg' alt='files icon' width={20} height={20} />
                        </div>
                    </div>
                    <div className='mr-6'>
                        <Image src='/icons/send.svg' alt='send icon' width={24} height={24} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
