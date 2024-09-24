"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

function Learned() {
    const [activeTab, setActiveTab] = useState<string>('courses');
    const router = useRouter();
    const pathname = usePathname();
    const [underlinePosition, setUnderlinePosition] = useState<number>(0);
    const [underlineWidth, setUnderlineWidth] = useState<number>(0);
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const handleTabClick = (tabName: string, path: string, index: number) => {
        setActiveTab(tabName);
        router.push(path);
        setUnderlineWidth(buttonRefs.current[index]?.offsetWidth || 0);
        setUnderlinePosition(index);
    };

    useEffect(() => {
        if (pathname) {
            const currentPath = pathname.split('/')[2];
            let index = 0;
            if (currentPath === 'test') {
                setActiveTab('test');
                index = 1; // Position for "Tests"
            } else if (currentPath === 'Quiz') {
                setActiveTab('Quiz');
                index = 2; // Position for "Quizzes"
            } else {
                setActiveTab('courses');
                index = 0; // Position for "Courses"
            }
            setUnderlinePosition(index);
            setUnderlineWidth(buttonRefs.current[index]?.offsetWidth || 0);
        }
    }, [pathname]);

    return (
        <div className="relative">
            <div className="flex space-x-2">
                <div className="pt-[10px]">
                    <button
                        ref={el => buttonRefs.current[0] = el}
                        onClick={() => handleTabClick('courses', '/learn/courses', 0)}
                        className={`relative py-2 px-4 text-base transition duration-200 ${activeTab === 'courses' ? 'text-[#7400E0]' : 'text-[#667085] hover:text-[#7400E0]'} focus:outline-none`}
                        style={{ fontSize: '16px', fontWeight: '500', marginLeft: '32px' }}
                    >
                        Courses
                        {activeTab === 'courses' && (
                            <span
                                className="ml-2 px-2 py-[0px] text-[#9012FF] bg-[#EDE4FF] rounded-full relative"
                                style={{ fontSize: '14px', fontWeight: '500', minWidth: '24px', textAlign: 'center', top: '-1px' }}
                            >
                                10
                            </span>
                        )}
                    </button>
                </div>
                <div className="pt-[10px]">
                    <button
                        ref={el => buttonRefs.current[1] = el}
                        onClick={() => handleTabClick('test', '/learn/test', 1)}
                        className={`relative py-2 px-4 text-base transition duration-200 ${activeTab === 'test' ? 'text-[#7400E0]' : 'text-[#667085] hover:text-[#7400E0]'} focus:outline-none`}
                        style={{ fontSize: '16px', fontWeight: '500' }}
                    >
                        Tests
                        {activeTab === 'test' && (
                            <span
                                className="ml-2 px-2 py-[0px] text-[#9012FF] bg-[#EDE4FF] rounded-full relative"
                                style={{ fontSize: '14px', fontWeight: '500', minWidth: '24px', textAlign: 'center', top: '-1px' }}
                            >
                                10
                            </span>
                        )}
                    </button>
                </div>
                <div className="pt-[10px]">
                    <button
                        ref={el => buttonRefs.current[2] = el}
                        onClick={() => handleTabClick('Quiz', '/learn/Quiz', 2)}
                        className={`relative py-2 px-4 text-base transition duration-200 ${activeTab === 'Quiz' ? 'text-[#7400E0]' : 'text-[#667085] hover:text-[#7400E0]'} focus:outline-none`}
                        style={{ fontSize: '16px', fontWeight: '500' }}
                    >
                        Quizzes
                        {activeTab === 'Quiz' && (
                            <span
                                className="ml-2 px-2 py-[0px] text-[#9012FF] bg-[#EDE4FF] rounded-full relative"
                                style={{ fontSize: '14px', fontWeight: '500', minWidth: '24px', textAlign: 'center', top: '-1px' }}
                            >
                                6
                            </span>
                        )}
                    </button>
                </div>
            </div>
            <span
                className="absolute h-[2px] bg-[#7400E0] transition-all duration-300"
                style={{
                    width: `${underlineWidth}px`,
                    left: `calc(${underlinePosition * 100}px + ${underlinePosition * 32}px)`, // Adjust left based on index
                    bottom: '-13px',
                    position: 'absolute'
                }}
            />
        </div>
    );
}

export default Learned;
