"use client";
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


import { useState, useEffect } from 'react';
import { useRouter, usePathname } from "next/navigation";
import { Tabs, Tab, Chip } from "@nextui-org/react";

function AccessibleTabs() {
    const [activeTab, setActiveTab] = useState<string>('courses');
    const router = useRouter();
    const pathname = usePathname();

    const handleTabClick = (tabName: string, path: string) => {
        setActiveTab(tabName);
        router.push(path);
    };

    useEffect(() => {
        if (pathname) {
            const currentPath = pathname.split("/")[2];
            setActiveTab(currentPath === "test" || currentPath === "Quiz" ? currentPath : "courses");
        }
    }, [pathname]);

    return (
        <div className="flex flex-col w-full">
            <Tabs
                aria-label="Learning Sections"
                selectedValue={activeTab}
                onSelectionChange={(value) => handleTabClick(value as string, `/learn/${value}`)}
                classNames={{
                    tabList: "flex gap-4",
                }}
            >
                <Tab value="courses">
                    <div className="flex items-center">
                        <span className={`${activeTab === 'courses' ? 'text-[#7400E0] font-bold' : 'text-[#667085]'}`}>
                            Courses
                        </span>
                    </div>
                </Tab>
                <Tab value="test">
                    <div className="flex items-center">
                        <span className={`${activeTab === 'test' ? 'text-[#7400E0] font-bold' : 'text-[#667085]'}`}>
                            Tests
                        </span>
                        <Chip size="sm" variant="faded" className="bg-[#EDE4FF]">
                            <span className="text-[#9012FF]">10</span>
                        </Chip>
                    </div>
                </Tab>
                <Tab value="Quiz">
                    <div className="flex items-center">
                        <span className={`${activeTab === 'Quiz' ? 'text-[#7400E0] font-bold' : 'text-[#667085]'}`}>
                            Quizzes
                        </span>
                    </div>
                </Tab>
            </Tabs>

            {/* Tab Panels */}
            <div role="tabpanel" hidden={activeTab !== 'courses'} id="courses-panel" aria-labelledby="courses-tab">
                <p>Content for Courses</p>
            </div>
            <div role="tabpanel" hidden={activeTab !== 'test'} id="test-panel" aria-labelledby="test-tab">
                <p>Content for Tests</p>
            </div>
            <div role="tabpanel" hidden={activeTab !== 'Quiz'} id="quiz-panel" aria-labelledby="quiz-tab">
                <p>Content for Quizzes</p>
            </div>
        </div>
    );
}

export default AccessibleTabs;
