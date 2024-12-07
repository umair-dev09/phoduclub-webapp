'use client';
import { Tabs, Tab } from "@nextui-org/react";
import React, { useState, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface LayoutProps {
    children: ReactNode;
}

function Layout({ children }: LayoutProps) {
    const [activeTab, setActiveTab] = useState('test-series');
    const router = useRouter();
    const pathname = usePathname();


    const handleTabClick = (tabName: React.SetStateAction<string>, path: string) => {
        setActiveTab(tabName);
        router.push(path);
    };

    // Check if the pathname matches specific paths but exclude subfolders (e.g., bit1, bit2, etc.)
    if (
        pathname === '/analytics/quizzes' ||
        pathname === '/analytics/test-series'

    ) {
        return (
            <div className='flex flex-1 flex-col mt-8'>
                {/* <div className='flex w-full flex-row pb-3 border-b gap-3 mx-8'>
                    <button
                        onClick={() => handleTabClick('test-series', '/analytics/test-series')}
                        className={activeTab === 'test-series' ? 'font-bold' : ''}
                    >
                        Test-Series
                    </button>
                    <button
                        onClick={() => handleTabClick('quizzes', '/analytics/quizzes')}
                        className={activeTab === 'quizzes' ? 'font-bold' : ''}
                    >
                        Quizzes
                    </button>
                </div> */}
                <Tabs
                    aria-label="Course Tabs"
                    color="primary"
                    variant="underlined"
                    selectedKey={activeTab}
                    onSelectionChange={(key) => setActiveTab(key as string)}
                    classNames={{
                        tabList: "gap-6 w-full relative rounded-none p-0 border-b border-solid border-[#EAECF0]",
                        cursor: "w-full bg-[#7400E0]",
                        tab: "max-w-fit px-0 h-12",
                        tabContent: "group-data-[selected=true]:text-[#7400E0] hover:text-[#7400E0] ",
                    }}
                >
                    <Tab
                        key="Content"
                        title={
                            <div className="flex items-center space-x-2"
                                onClick={() => handleTabClick('test-series', '/analytics/test-series')}>
                                <span className="font-medium text-base">
                                    Test-Series
                                </span>
                            </div>
                        }
                    >


                    </Tab>
                    <Tab
                        key="Discussion"
                        title={
                            <div className="flex items-center space-x-2"
                                onClick={() => handleTabClick('test-series', '/analytics/test-series')}>
                                <span className="font-medium text-base">
                                    Quizzes
                                </span>
                            </div>
                        }
                    >

                    </Tab>
                </Tabs>
                <div className='flex flex-1 overflow-y-auto'>
                    {children}
                </div>
            </div>
        );
    } else {
        return <>{children}</>;
    }
}

export default Layout;
