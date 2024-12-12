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
        </div >
    );
};

export default CommunityPage;