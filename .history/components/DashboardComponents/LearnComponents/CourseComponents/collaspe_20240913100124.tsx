"use client";
import '../Learn';
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
        <div className="flex items-center">
            {/* Dropdown toggle button */}
            <button
                onClick={handleCollapseClick}
                className="p-2" // Add any necessary padding or styles here
            >
                <Image
                    src={isCollapsed ? '/icons/dropDownClosed.svg' : '/icons/dropDownOpen.svg'}
                    alt={isCollapsed ? 'drop down closed' : 'drop down open'}
                    width={24}
                    height={24}
                />
            </button>
        </div>
    );
}

export default Course;
