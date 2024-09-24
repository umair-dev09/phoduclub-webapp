"use client";

import { useRouter, usePathname } from "next/navigation";

import { useState, useEffect } from "react";
import { Tabs, Tab, Chip } from "@nextui-org/react";

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






    return (
        <div className="h-[80px] py-6">
            <div className="flex w-full flex-col">
                <Tabs
                    aria-label="Options"
                    color="primary"
                    variant="underlined"
                    classNames={{
                        tabList: "gap-6 w-full relative rounded-none p-0 border-b border-gray-300", // Adjusted to match the border style from the image
                        tab: "max-w-fit px-0 h-12 focus:outline-none focus:ring-0", // Removed the focus outline and set the tab height
                        tabContent: "group-data-[selected=true]:text-purple-600 group-data-[selected=true]:font-bold", // Purple color and bold text for the active tab
                    }}
                >
                    <Tab
                        key="courses"
                        title={
                            <div className="flex items-center space-x-2">
                                <span className="text-[#9012FF] font-bold">Courses</span> {/* Active tab styled */}
                            </div>
                        }
                    />
                    <Tab
                        key="tests"
                        title={
                            <div className="flex items-center space-x-2">
                                <span className="text-[#9012FF]">Tests</span> {/* Inactive tab styled */}
                                <Chip size="sm" variant="faded" className="bg-[#EDE4FF]"><span className="text-[#9012FF]">10</span></Chip> {/* Chip styled */}
                            </div>
                        }
                    />
                    <Tab
                        key="quizzes"
                        title={
                            <div className="flex items-center space-x-2">
                                <span className="text-[#9012FF]">Quizzes</span> {/* Inactive tab styled */}
                            </div>
                        }
                    />
                </Tabs>

            </div>
        </div>

    );
}
export default learned
