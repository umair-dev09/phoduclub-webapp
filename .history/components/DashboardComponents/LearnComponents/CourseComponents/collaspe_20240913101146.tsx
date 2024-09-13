"use client";
import '../Learn'; // Ensure this file exists and is correctly imported
import Image from 'next/image';
import { useState, useEffect } from 'react';

function Course() {
    const [isCollapsed, setIsCollapsed] = useState(() => {
        const savedState = localStorage.getItem('isSidebarCollapsed');
        return savedState === 'true';
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedState = localStorage.getItem('isSidebarCollapsed');
            setIsCollapsed(savedState === 'true');
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('isSidebarCollapsed', isCollapsed.toString());
    }, [isCollapsed]);

    const handleCollapseClick = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="flex items-center justify-center h-screen">
            {/* Dropdown toggle button */}
            <button
                onClick={handleCollapseClick}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
            >
                <Image
                    src={isCollapsed ? '/icons/dropDownClosed.svg' : '/icons/dropDownOpen.svg'}
                    alt={isCollapsed ? 'Drop down closed' : 'Drop down open'}
                    width={24}
                    height={24}
                />
            </button>
        </div>
    );
}

export default Course;
