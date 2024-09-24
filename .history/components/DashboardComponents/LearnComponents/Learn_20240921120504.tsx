
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

"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Tabs, Tab, Chip } from "@nextui-org/react";

function Learned() {
    const [activeTab, setActiveTab] = useState<string>("courses");
    const router = useRouter();
    const pathname = usePathname();

    const handleTabClick = (tabName: string, path: string) => {
        setActiveTab(tabName);
        router.push(path);
    };

    useEffect(() => {
        if (pathname) {
            const currentPath = pathname.split("/")[1]; // Adjusted to split on the first slash
            if (currentPath === "test") {
                setActiveTab("test");
            } else if (currentPath === "Quiz") {
                setActiveTab("Quiz");
            } else {
                setActiveTab("courses"); // Default to 'courses'
            }
        }
    }, [pathname]);

    return (
        <div className="h-[80px] py-4">
            <div className="flex w-full flex-col">
                <Tabs
                    aria-label="Options"
                    color="primary"
                    variant="underlined"
                    classNames={{
                        tabList: "gap-6 w-full relative rounded-none p-0 border-b border-gray-300", // Adjusted to match the border style from the image
                        tab: "max-w-fit px-0 h-12 focus:outline-none focus:ring-0", // Removed the focus outline and set the tab height
                        tabContent: "group-data-[selected=true]:font-bold", // Keep bold for active tab
                    }}
                >
                    <Tab
                        key="courses"
                        onClick={() => handleTabClick("courses", "/courses")}
                        title={
                            <div className="flex items-center space-x-2 ml-[32px]">
                                <span
                                    className={`${activeTab === "courses"
                                        ? "text-[#9012FF] font-bold"
                                        : "text-gray-500"
                                        }`}
                                >
                                    Courses
                                </span>
                            </div>
                        }
                    />
                    <Tab
                        key="test"
                        onClick={() => handleTabClick("test", "/test")}
                        title={
                            <div className="flex items-center space-x-2">
                                <span
                                    className={`${activeTab === "test"
                                        ? "text-[#9012FF] font-bold"
                                        : "text-gray-500"
                                        }`}
                                >
                                    test
                                </span>
                                <Chip
                                    size="sm"
                                    variant="faded"
                                    className="bg-[#EDE4FF]"
                                >
                                    <span className="text-[#9012FF]">10</span>
                                </Chip>
                            </div>
                        }
                    />
                    <Tab
                        key="Quiz"
                        onClick={() => handleTabClick("Quiz", "courses/Quiz")}
                        title={
                            <div className="flex items-center space-x-2">
                                <span
                                    className={`${activeTab === "Quiz"
                                        ? "text-[#9012FF] font-bold"
                                        : "text-gray-500"
                                        }`}
                                >
                                    Quiz
                                </span>
                            </div>
                        }
                    />
                </Tabs>
            </div>
        </div>
    );
}

export default Learned;

