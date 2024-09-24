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
            } else if (currentPath === 'Quiz') {
                setActiveTab('Quiz');
            } else {
                setActiveTab('courses'); // Default to 'courses'
            }
        } else {
            setActiveTab('courses'); // Default to 'courses' if pathname is not available
        }
    }, [pathname]);

    return (
        <div className="relative flex space-x-2">
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
                    onClick={() => handleTabClick('Quiz', '/learn/Quiz')}
                    className={`relative py-2 px-4 text-base transition duration-200 ${activeTab === 'Quiz' ? 'text-[#7400E0]' : 'text-[#667085] hover:text-[#7400E0]'} focus:outline-none`}
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
                className="absolute h-1 bg-[#7400E0] transition-all duration-300"
                style={{
                    left: `${activeTab === 'courses' ? '32px' : activeTab === 'test' ? 'calc(32px + 160px)' : 'calc(32px + 320px)'}`,
                    width: '5%',
                    bottom: '-5px' // Adjust this value to position it closer to the button
                }}
            />
        </div>
    );
}

export default Learned;
