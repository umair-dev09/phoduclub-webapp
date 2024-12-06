"use client";
import { Tabs, Tab } from "@nextui-org/react";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

function Learned() {
    // Example counts for users and banned users
    const userCount = 78;
    const bannedCount = 0;
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
        <div className="flex flex-col h-full ">
            {/* <div className="relative flex">
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
                        className={`relative py-2 px-4 text-base transition duration-200 ${activeTab === 'quiz' ? 'text-[#7400E0]' : 'text-[#667085] hover:text-[#7400E0]'} focus:outline-none`}
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
                    className="absolute bg-[#7400E0] transition-all duration-300"
                    style={{
                        height: '1.8px', // Change this value to make the underline thinner or thicker
                        left: `${activeTab === 'courses' ? '40px' : activeTab === 'test' ? '142px' : '260px'}`,
                        width: '85px', // You can still adjust the width here as needed
                        bottom: '-8px',

                    }}
                />

            </div> */}
            <Tabs
                aria-label="Market Integration Tabs"
                color="primary"
                variant="underlined"
                selectedKey={activeTab}
                onSelectionChange={(key) => setActiveTab(key as string)}
                classNames={{
                    tabList: "gap-6 w-full relative rounded-none p-0 border-b border-solid border-[#EAECF0] h-full px-8",
                    cursor: "w-full bg-[#7400E0]",
                    tab: "max-w-fit px-0 h-20",
                    tabContent: "group-data-[selected=true]:text-[#7400E0] hover:text-[#7400E0] ",
                }}
            >
                <Tab
                    key="    Courses"
                    onClick={() => handleTabClick('courses', '/learn/courses')}
                    title={
                        <div className="flex items-center space-x-2">
                            <span className="font-medium text-base">
                                Courses
                            </span>
                            {userCount > 0 && (
                                <div className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm bg-[#EDE4FF] border border-[#EDE4FF] font-medium text-[#7400E0]">
                                    {userCount}
                                </div>
                            )}
                        </div>
                    }
                >

                </Tab>

                <Tab
                    key="    Tests"
                    onClick={() => handleTabClick('test', '/learn/test')}
                    title={
                        <div className="flex items-center space-x-2">
                            <span className="font-medium text-base">
                                Tests
                            </span>
                            {bannedCount > 0 && (
                                <div className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm bg-[#EDE4FF] border border-[#EDE4FF] font-medium text-[#7400E0]">
                                    {bannedCount}
                                </div>
                            )}
                        </div>
                    }
                >

                </Tab>
                <Tab
                    key="    Quizzes"
                    onClick={() => handleTabClick('Quiz', '/learn/Quiz')}
                    title={
                        <div className="flex items-center space-x-2">
                            <span className="font-medium text-base">
                                Quizzes
                            </span>
                            {bannedCount > 0 && (
                                <div className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm bg-[#EDE4FF] border border-[#EDE4FF] font-medium text-[#7400E0]">
                                    {bannedCount}
                                </div>
                            )}
                        </div>
                    }
                >

                </Tab>
            </Tabs>


        </div>

    );
}

export default Learned;
