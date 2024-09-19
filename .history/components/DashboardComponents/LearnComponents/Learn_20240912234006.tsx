"use client";

import { useRouter, usePathname } from "next/navigation";

import { useState, useEffect } from "react";


function learned() {
    const [activeTab, setActiveTab] = useState<string>('');
    const router = useRouter();
    const pathname = usePathname();
    const handleTabClick = (tabName: string, path: string) => {
        setActiveTab(tabName);
        router.push(path);
    };
    useEffect(() => {
        if (pathname) {
            const currentPath = pathname.split('/')[3]
            if (currentPath === 'course') {
                setActiveTab('course')
            } else if (currentPath === 'test') {
                setActiveTab('test')
            }
            else if (currentPath === 'Quiz') {
                setActiveTab('Quiz')
            }
            else {
                setActiveTab('course')
            }

        }
    }, [pathname]);


    return (

        <div className="flex space-x-4">
            <div className="pt-[10px] "
            >
                <button
                    onClick={() => handleTabClick('course', '/learn/course')}
                    className={`relative py-2 px-4 text-base  ${activeTab === 'course' ? 'text-[#7400E0]' : 'text-[#667085]'} focus:outline-none`}
                    style={{ fontSize: '16px', fontWeight: '500', marginLeft: '20px' }}
                >
                    Courses
                    <span
                        className="ml-2 px-3 py-[1px] text-[#9012FF] bg-[#EDE4FF] rounded-full"
                        style={{ fontSize: '14px', fontWeight: '500', minWidth: '24px', textAlign: 'center', top: '-4px' }}
                    >
                        10
                    </span>
                    {activeTab === 'course' && (

                        <span
                            className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                            style={{
                                borderBottom: '2px solid #7400E0',
                                width: '70%', // Adjust the width to control the length
                            }}
                        />
                    )}
                </button>
            </div>
            <div className="pt-[10px]">
                <button
                    onClick={() => handleTabClick('test', '/learn/test')}
                    className={`relative py-2 px-4 text-base  ${activeTab === 'test' ? 'text-[#7400E0]' : 'text-[#667085]'} focus:outline-none`}
                    style={{ fontSize: '16px', fontWeight: '500' }}
                >
                    Tests
                    {activeTab === 'test' && (
                        <span
                            className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                            style={{
                                borderBottom: '2px solid #7400E0',
                                width: '70%', // Adjust the width to control the length
                            }}


                        />
                    )}
                </button>
            </div>
            <div className="pt-[10px]">
                <button
                    onClick={() => handleTabClick('Quiz', '/learn/Quiz')}
                    className={`relative py-2 px-4 text-base  ${activeTab === 'Quiz' ? 'text-[#7400E0]' : 'text-[#667085]'} focus:outline-none`}
                    style={{ fontSize: '16px', fontWeight: '500' }}
                >
                    Quizzes
                    {activeTab === 'Quiz' && (
                        <span
                            className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                            style={{
                                borderBottom: '2px solid #7400E0',
                                width: '70%', // Adjust the width to control the length
                            }}
                        />
                    )}
                </button>
            </div>
        </div>


    );
}


export default learned;