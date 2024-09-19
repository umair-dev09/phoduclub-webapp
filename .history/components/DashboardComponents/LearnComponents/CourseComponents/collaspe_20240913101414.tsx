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
        <div className=" relative flex flex-col  items-center">
            {/* Dropdown toggle button */}
            <button onClick={handleCollapseClick} className="p-2">
                <Image
                    src={isCollapsed ? '/icons/up.svg' : '/icons/dropDownOpen.svg'}  // Ensure file extensions
                    alt={isCollapsed ? 'Up icon' : 'Dropdown open icon'}  // Descriptive alt text
                    width={24}
                    height={24}
                />
            </button>

        </div>
    );
}

export default Course;
