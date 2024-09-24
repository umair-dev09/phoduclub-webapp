"use client";

import { useRouter, usePathname } from "next/navigation";

import { useState, useEffect } from "react";


function learned() {
    // const [activeTab, setActiveTab] = useState<string>('');
    // const router = useRouter();
    // const pathname = usePathname();
    // const handleTabClick = (tabName: string, path: string) => {

    //     setActiveTab(tabName);
    //     router.push(path);
    // };

    // useEffect(() => {
    //     if (pathname) {
    //         const currentPath = pathname.split('/')[2];
    //         if (currentPath === 'test') {
    //             setActiveTab('test');
    //         } else if (currentPath === 'Quiz') {
    //             setActiveTab('Quiz');
    //         } else {
    //             setActiveTab('courses'); // Default to 'course'
    //         }
    //     } else {
    //         setActiveTab('courses'); // Default to 'course' if pathname is not available
    //     }
    // }, [pathname]);





    {/* <div className="pt-[10px]">
                <button
                    onClick={() => handleTabClick('courses', '/learn/courses')}
                    className={`relative py-2 px-4 text-base ${activeTab === 'courses' ? 'text-[#7400E0]' : 'text-[#667085]'} focus:outline-none`}
                    style={{ fontSize: '16px', fontWeight: '500', marginLeft: '32px' }}
                >
                    Courses
                    {activeTab === 'courses' && (
                        <span
                            className="absolute left-1/2 transform -translate-x-1/2"
                            style={{
                                borderBottom: '2px solid #7400E0',
                                width: '70%', 
                                bottom: "-13px"
                            }}
                        />
                    )}
                    {activeTab == 'course' && (
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
                    {(activeTab == 'test' || activeTab !== 'test') && (
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
                    onClick={() => handleTabClick('Quiz', '/learn/Quiz')}
                    className={`relative py-2 px-4 text-base ${activeTab === 'Quiz' ? 'text-[#7400E0]' : 'text-[#667085]'} focus:outline-none`}
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
                    {(activeTab == 'Quiz' || activeTab !== 'Quiz') && (
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
    );
}
    */}


    return (
        <div className="bg-red-500 h-[80px]">
            <div className="bg-slate-800 h-[32px] w-full flex gap-[16px] p-2">
                {/* Add content here */}
            </div>
        </div>

    );
}
export default learned
