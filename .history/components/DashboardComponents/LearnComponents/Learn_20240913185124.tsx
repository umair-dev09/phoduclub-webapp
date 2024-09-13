"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

function Learned() {
    const [activeTab, setActiveTab] = useState<string>('course'); // Default to 'course'
    const router = useRouter();
    const pathname = usePathname();

    const handleTabClick = (tabName: string, path: string) => {
        console.log('Tab clicked:', tabName);
        console.log('Navigating to:', path);
        setActiveTab(tabName);
        router.push(path);
    };

    useEffect(() => {
        if (pathname) {
            console.log('Current pathname:', pathname);
            const currentPath = pathname.split('/')[3]?.toLowerCase(); // Ensure lower case
            console.log('Current path segment:', currentPath);
            if (currentPath === 'course') {
                setActiveTab('course');
            } else if (currentPath === 'test') {
                setActiveTab('test');
            } else if (currentPath === 'quiz') {
                setActiveTab('quiz');
            } else {
                setActiveTab('course');
            }
        }
    }, [pathname]);

    return (
        <div className="flex space-x-4">
            <div className="pt-[10px]">
                <button
                    onClick={() => handleTabClick('course', '/learn/course')}
                    className={`relative py-2 px-4 text-base ${activeTab === 'course' ? 'text-[#7400E0]' : 'text-[#667085]'} focus:outline-none`}
                    style={{ fontSize: '16px', fontWeight: '500', marginLeft: '32px' }}
                >
                    Courses
                    {activeTab === 'course' && (
                        <span
                            className="absolute left-1/2 transform -translate-x-1/2"
                            style={{
                                borderBottom: '2px solid #7400E0',
                                width: '70%',
                                bottom: "-13px"
                            }}
                        />
                    )}
                </button>
            </div>
            <div className="pt-[10px]">
                <button
                    onClick={() => handleTabClick('test', '/learn/test')}
                    className={`relative py-2 px-4 text-base ${activeTab === 'test' ? 'text-[#7400E0]' : 'text-[#667085]'} focus:outline-none`}
                    style={{ fontSize: '16px', fontWeight: '500' }}
                >
                    Tests
                    {activeTab === 'test' && (
                        <span
                            className="absolute left-1/2 transform -translate-x-1/2"
                            style={{
                                borderBottom: '2px solid #7400E0',
                                width: '70%',
                                bottom: "-13px"
                            }}
                        />
                    )}
                </button>
            </div>
            <div className="pt-[10px]">
                <button
                    onClick={() => handleTabClick('Quiz', '/learn/Quiz')}
                    className={`relative py-2 px-4 text-base ${activeTab === 'quiz' ? 'text-[#7400E0]' : 'text-[#667085]'} focus:outline-none`}
                    style={{ fontSize: '16px', fontWeight: '500' }}
                >
                    Quizzes
                    {activeTab === 'Quiz' && (
                        <span
                            className="absolute left-1/2 transform -translate-x-1/2"
                            style={{
                                borderBottom: '2px solid #7400E0',
                                width: '70%',
                                bottom: "-13px"
                            }}
                        />
                    )}
                </button>
            </div>
        </div>
    );
}

export default Learned;
