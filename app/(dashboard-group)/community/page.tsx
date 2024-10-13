"use client";

import React, { useState } from 'react';
import Image from 'next/image';

const CommunityPage = () => {
    // State to track if the section is collapsed
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Function to toggle collapse
    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="flex h-full flex-row bg-white justify-center items-center">
            
            <h3>Select a group to explore </h3>

            {/* Middle Section */}
            {/* <div className="flex flex-col w-[270px] bg-white border-t border-r border-b border-lightGrey">
                <InsideGrp />
                <div className="flex flex-col justify-start items-center mx-4 mt-[15px] gap-6">
                    <General />
                    <MockTest />
                </div>
            </div> */}

            {/* Chat Area */}
            {/* <div className="flex flex-1 flex-col border-t border-r border-b border-lightGrey h-auto">
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
                <div className="flex flex-1">
                    <ChartArea />
                </div>
                <div>
                    <Bottomtext />
                </div>
            </div> */}

            {/* Right Sidebar with smoother collapse transition */}
            {/* <div
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
                    Repeat more Details components if needed
                </div>
            </div> */}
        </div >
    );
};

export default CommunityPage;