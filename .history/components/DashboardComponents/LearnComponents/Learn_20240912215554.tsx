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
            <button
                onClick={() => handleTabClick('course', '/learn/course')}
                className={`py-2 px-4 text-base pb-[31px] ${activeTab === 'course' ? 'border-b-2 text-purple-700' : 'text-gray-500'} focus:outline-none`}
                style={{ borderBottomColor: activeTab === 'course' ? '#6941C6' : 'transparent' }}
            >
                Courses
            </button>

            <button
                onClick={() => handleTabClick('test', '/learn/test')}
                className={`py-2 px-4 text-base pb-[31px ] ${activeTab === 'test' ? 'border-b-2 text-purple-700' : 'text-gray-500'} focus:outline-none`}
                style={{ borderBottomColor: activeTab === 'test' ? '#6941C6' : 'transparent' }}
            >
                Tests
            </button>

            <button
                onClick={() => handleTabClick('Quiz', '/learn/Quiz')}
                className={`py-2 px-4 text-base pb-[31px] ${activeTab === 'Quiz' ? 'border-b-2 text-purple-700' : 'text-gray-500'} focus:outline-none`}
                style={{ borderBottomColor: activeTab === 'Quiz' ? '#6941C6' : 'transparent' }}
            >
                Quizzes
            </button>

        </div>

    );
}


export default learned;