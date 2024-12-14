'use client';

import { Tabs, Tab } from "@nextui-org/react";
import React, { useState, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface LayoutProps {
    children: ReactNode;
}

function Layout({ children }: LayoutProps) {
    const [activeTab, setActiveTab] = useState<string>("test-series");
    const router = useRouter();
    const pathname = usePathname();

    const handleSelectionChange = (key: string) => {
        setActiveTab(key);

        if (key === "test-series") {
            router.push('/analytics/test-series');
        } else if (key === "quizzes") {
            router.push('/analytics/quizzes');
        }
    };

    // Check if the pathname matches specific paths
    if (
        pathname === '/analytics/quizzes' ||
        pathname === '/analytics/test-series'
    ) {
        return (
            <div className="flex flex-1 flex-col pb-4">
                <div className=" mx-8 w-full pt-4 border-b border-solid border-[#EAECF0]">
                    <Tabs
                        aria-label="Analytics Tabs"
                        color="primary"
                        variant="underlined"
                        selectedKey={activeTab}
                        onSelectionChange={(key) => handleSelectionChange(key as string)}
                        classNames={{
                            tabList: "gap-6 w-full relative rounded-none p-0 ",
                            cursor: "w-full bg-[#7400E0]",
                            tab: "max-w-fit px-0 h-12",
                            tabContent: "group-data-[selected=true]:text-[#7400E0] hover:text-[#7400E0]",
                        }}
                    >
                        <Tab
                            key="test-series"
                            title={
                                <div className="flex items-center space-x-2">
                                    <span className="font-medium text-base">Test-Series</span>
                                </div>
                            }
                        />
                        <Tab
                            key="quizzes"
                            title={
                                <div className="flex items-center space-x-2">
                                    <span className="font-medium text-base">Quizzes</span>
                                </div>
                            }
                        />
                    </Tabs>
                </div>
                <div className="flex flex-1 overflow-y-auto">
                    {children}
                </div>
            </div>
        );
    } else {
        return <>{children}</>;
    }
}

export default Layout;

