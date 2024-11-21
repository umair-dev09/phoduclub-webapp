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