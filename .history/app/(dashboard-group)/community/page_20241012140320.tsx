"use client";

import React, { useState } from 'react';
import Image from 'next/image';
// import GroupIcons from '@/components/DashboardComponents/CommunityComponents/groupIcons';
import General from '@/components/DashboardComponents/CommunityComponents/general';
import MockTest from '@/components/DashboardComponents/CommunityComponents/mockTest';
import DetailsHead from '@/components/DashboardComponents/CommunityComponents/detailsHead';
import DetailsContent from '@/components/DashboardComponents/CommunityComponents/detailsContent';
import Bottomtext from '@/components/DashboardComponents/CommunityComponents/BottomText';
import InsideGrp from '@/components/DashboardComponents/CommunityComponents/insideGrp';
import ChatHead from '@/components/DashboardComponents/CommunityComponents/chatHead';
import Otherchat from '@/components/DashboardComponents/CommunityComponents/otherchat';

const CommunityPage = () => {
    // State to track if the section is collapsed
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Function to toggle collapse
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="flex h-full flex-row">
            {/* Left Sidebar */}
            {/* <div className="flex flex-col w-[90px] bg-white border-t border-r border-b border-lightGrey">
                <div className="flex items-center justify-center h-[72px] border-b border-lightGrey">
                    <div className="group flex items-center justify-center relative w-[46px] h-[46px] rounded-full border-[#C74FE6] border-2 hover:border-darkPurple">
                        <div className="flex items-center justify-center w-[42px] h-[42px] rounded-full bg-[#C74FE6] border-[#C74FE6] border-2 text-[#624C18] font-bold group-hover:border-white">
                            <Image src="/icons/messageIcon.svg" alt="message icon" width={18} height={18} />
                        </div>
                        <div className="absolute top-6 left-6 px-2 py-1 bg-red-600 rounded-full text-white text-xs font-medium hidden group-hover:flex">
                            6
                        </div>
                    </div>
                </div>
                <div>
                    <GroupIcons />
                </div>
            </div> */}

            {/* Middle Section */}
            <div className="flex flex-col w-[270px] bg-white border-t border-r border-b border-lightGrey">
                <InsideGrp />
                <div className="flex flex-col justify-start items-center mx-4 mt-[15px] gap-6">
                    <General />
                    <MockTest />
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex flex-1 flex-col border-t border-r border-b border-lightGrey h-auto">
                <div className="flex items-center justify-between h-[72px] bg-white border-b border-lightGrey">
                    <ChatHead />
                    <div className="flex flex-row mr-6 gap-4">
                        <button>
                            <Image src="/icons/search.svg" alt="search icon" width={18} height={18} />
                        </button>
                        <button className="transition-colors hover:bg-neutral-100" onClick={toggleCollapse}>
                            <Image src="/icons/collapseDetails.svg" alt="collapse details icon" width={24} height={24} />
                        </button>
                    </div>
                </div>
                <div className="flex flex-1 overflow-y-auto sticky top-0 bg-white">
                    <Otherchat />
                </div>

                <div>
                    <Bottomtext />
                </div>
            </div>

            {/* Right Sidebar with smoother collapse transition */}
            <div
                className={`flex flex-col bg-white border-t border-lightGrey overflow-hidden transition-all duration-500 ease-in-out transform ${isCollapsed ? 'max-w-0 opacity-0' : 'w-[270px] max-w-[270px] opacity-100'}`}
            >
                <div className="flex items-center justify-center min-h-[72px] border-b border-lightGrey">
                    <div className="flex flex-row justify-between w-full mx-6">
                        <h3 className="text-base">Details</h3>
                        <div className="flex flex-row items-center gap-[6px]">
                            <Image src="/icons/membersIcon.svg" alt="members icon" width={18} height={18} />
                            <p className="text-sm text-[#4B5563]">57</p>
                        </div>
                    </div>
                </div>
                <div className="overflow-y-auto">
                    <DetailsHead />
                    <DetailsContent />
                    {/* Repeat more Details components if needed */}
                </div>
            </div>
        </div >
    );
};

export default CommunityPage;