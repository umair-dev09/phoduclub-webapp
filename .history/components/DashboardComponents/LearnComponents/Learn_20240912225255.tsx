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
                    className={`flex flex-row items-end py-2 px-4 text-base pb-[30px] ${activeTab === 'course' ? 'border-b-[2px] border-[#7400E0] text-[#7400E0]' : 'text-[#667085]'} focus:outline-none`}
                    style={{ fontSize: '16px', fontWeight: '500', marginLeft: '32px' }}
                >
                    Courses
                </button>
            </div>
            <div>
                <button
                    onClick={() => handleTabClick('test', '/learn/test')}
                    className={`py-2 px-4 text-base pb-[30px] ${activeTab === 'test' ? 'border-b-[2px] border-[#7400E0] text-[#7400E0]' : 'text-[#667085]'} focus:outline-none`}
                    style={{ fontSize: '16px', fontWeight: '500' }}
                >
                    Tests
                </button>
            </div>
            <div>
                <button
                    onClick={() => handleTabClick('Quiz', '/learn/Quiz')}
                    className={`py-2 px-4 text-base pb-[30px] ${activeTab === 'Quiz' ? 'border-b-[2px] border-[#7400E0] text-[#7400E0]' : 'text-[#667085]'} focus:outline-none`}
                    style={{ fontSize: '16px', fontWeight: '500' }}
                >
                    Quizzes
                </button>
            </div>
        </div>


    );
}


export default learned;