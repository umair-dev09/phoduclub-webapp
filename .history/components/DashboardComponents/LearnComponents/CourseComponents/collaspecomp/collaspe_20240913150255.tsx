"use client";
import '../../Learn';
import Image from 'next/image';
import { useState } from 'react';
import TopicsComp from '../TopicsComp';

function Course() {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="relative flex flex-col items-center">
            {/* Dropdown toggle button */}
            <button onClick={() => setIsOpen((prev) => !prev)} className="p-2">
                <Image
                    src={isOpen ? '/icons/dropDownClose.svg' : '/icons/dropDownOpen.svg'}  // Toggle icons based on state
                    alt={isOpen ? 'Up icon' : 'Dropdown open icon'}  // Descriptive alt text
                    width={24}
                    height={24}
                />
            </button>
            {isOpen && (
                <div>
                    <TopicsComp />
                </div>
            )}
        </div>
    );
}

export default Course;
