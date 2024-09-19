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
            <div>
                <button
                    onClick={() => handleTabClick('course', '/learn/course')}
                    className={`relative py-2 px-4 text-base pb-[30px] ${activeTab === 'course' ? 'text-[#6941C6]' : 'text-[#667085]'} focus:outline-none`}
                    style={{ fontSize: '16px', fontWeight: '500' }}
                >
                    Courses
                    {activeTab === 'course' && (
                        <span
                            className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                            style={{
                                borderBottom: '2px solid #6941C6',
                                width: '70%', // Adjust the width to control the length
                            }}
                        />
                    )}
                </button>
            </div>
            <div>
                <button
                    onClick={() => handleTabClick('test', '/learn/test')}
                    className={`relative py-2 px-4 text-base pb-[30px] ${activeTab === 'test' ? 'text-[#6941C6]' : 'text-[#667085]'} focus:outline-none`}
                    style={{ fontSize: '16px', fontWeight: '500' }}
                >
                    Tests
                    {activeTab === 'test' && (
                        <span
                            className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                            style={{
                                borderBottom: '2px solid #6941C6',
                                width: '60%', // Adjust the width to control the length
                            }}
                        />
                    )}
                </button>
            </div>
            <div>
                <button
                    onClick={() => handleTabClick('Quiz', '/learn/Quiz')}
                    className={`relative py-2 px-4 text-base pb-[30px] ${activeTab === 'Quiz' ? 'text-[#6941C6]' : 'text-[#667085]'} focus:outline-none`}
                    style={{ fontSize: '16px', fontWeight: '500' }}
                >
                    Quizzes
                    {activeTab === 'Quiz' && (
                        <span
                            className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                            style={{
                                borderBottom: '2px solid #6941C6',
                                width: '50%', // Adjust the width to control the length
                            }}
                        />
                    )}
                </button>
            </div>
        </div>


    );
}


export default learned;