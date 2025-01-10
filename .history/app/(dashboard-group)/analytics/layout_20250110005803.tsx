'use client';

import { Tabs, Tab } from "@nextui-org/react";
import React, { useState, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from "next/image";

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
            <div className="flex flex-1 flex-col relative">
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
                {/* Contained Modal */}
                {/* <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-xl">
                    <div className="bg-white rounded-2xl w-[37.5rem] p-6">
                        <div className="flex flex-col">
                            <div className="flex justify-center mb-4">
                                <Image src="/images/physicDailogImg.svg" alt="cool image" width={120} height={120} />
                            </div>
                            <div className="text-center mb-6">
                                <h2 className="text-xl font-bold">Launching Soon!!!!!!!!</h2>
                            </div>
                            <div className="grid grid-cols-2 gap-6 text-base font-medium text-[#1D2939]">
                                <div className="flex items-start gap-2">
                                    <Image src="/icons/checkmark-circle-02.svg" alt="tick circle" width={24} height={24} />
                                    <p>Unlock the premium Analytics</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Image src="/icons/checkmark-circle-02.svg" alt="tick circle" width={24} height={24} />
                                    <p>Special badge for premium users</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Image src="/icons/checkmark-circle-02.svg" alt="tick circle" width={24} height={24} />
                                    <p>Be part of the premium groups</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Image src="/icons/checkmark-circle-02.svg" alt="tick circle" width={24} height={24} />
                                    <p>Get dedicated mentorship by IIT/NITians</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        );
    } else {
        return (
            { children }
        );
    }
}

export default Layout;

