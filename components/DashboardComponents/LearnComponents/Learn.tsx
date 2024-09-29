"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

function Learned() {
    const [activeTab, setActiveTab] = useState<string>('courses');
    const router = useRouter();
    const pathname = usePathname();

    const handleTabClick = (tabName: string, path: string) => {
        setActiveTab(tabName);
        router.push(path);
    };

    useEffect(() => {
        if (pathname) {
            const currentPath = pathname.split('/')[2];
            if (currentPath === 'test') {
                setActiveTab('test');
            } else if (currentPath === 'quiz') {
                setActiveTab('quiz');
            } else {
                setActiveTab('courses'); // Default to 'courses'
            }
        } else {
            setActiveTab('courses'); // Default to 'courses' if pathname is not available
        }
    }, [pathname]);

    return (
        <div className="flex flex-col">
        <div className="relative flex">
            <div className="pt-[10px]">
                <button
                    onClick={() => handleTabClick('courses', '/learn/courses')}
                    className={`relative py-2 px-4 text-base transition duration-200 ${activeTab === 'courses' ? 'text-[#7400E0]' : 'text-[#667085] hover:text-[#7400E0]'} focus:outline-none`}
                    style={{ fontSize: '16px', fontWeight: '500', marginLeft: '32px' }}
                >
                    Courses
                </button>
            </div>
            <div className="pt-[10px]">
                <button
                    onClick={() => handleTabClick('test', '/learn/test')}
                    className={`relative py-2 px-4 text-base transition duration-200 ${activeTab === 'test' ? 'text-[#7400E0]' : 'text-[#667085] hover:text-[#7400E0]'} focus:outline-none`}
                    style={{ fontSize: '16px', fontWeight: '500' }}
                >
                    Tests
                    <span
                        className="ml-2 px-2 py-[0px] text-[#9012FF] bg-[#EDE4FF] rounded-full relative"
                        style={{ fontSize: '14px', fontWeight: '500', minWidth: '24px', textAlign: 'center', top: '-1px' }}
                    >
                        10
                    </span>
                </button>
            </div>
            <div className="pt-[10px]">
                <button
                    onClick={() => handleTabClick('quiz', '/learn/quiz')}
                    className={`relative py-2 px-4 text-base transition duration-200 ${activeTab === 'quiz' ? 'text-[#7400E0]' : 'text-[#667085] hover:text-[#7400E0]'} focus:outline-none`}
                    style={{ fontSize: '16px', fontWeight: '500' }}
                >
                    Quizzes
                    <span
                        className="ml-2 px-2 py-[0px] text-[#9012FF] bg-[#EDE4FF] rounded-full relative"
                        style={{ fontSize: '14px', fontWeight: '500', minWidth: '24px', textAlign: 'center', top: '-1px' }}
                    >
                        6
                    </span>
                </button>
            </div>
            <div
                className="absolute bg-[#7400E0] transition-all duration-300"
                style={{
                    height: '1.8px', // Change this value to make the underline thinner or thicker
                    left: `${activeTab === 'courses' ? '40px' : activeTab === 'test' ? '142px' : '260px'}`,
                    width: '85px', // You can still adjust the width here as needed
                    bottom: '-8px',

                }}
            />

        </div>
        
        <hr className="h-px bg-[#EAECF0] mt-2"/>
        </div>

    );
}

export default Learned;
