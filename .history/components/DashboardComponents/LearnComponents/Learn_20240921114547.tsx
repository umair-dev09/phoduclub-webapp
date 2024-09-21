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
                                    Tests
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
                        onClick={() => handleTabClick("Quiz", "/Quiz")}
                        title={
                            <div className="flex items-center space-x-2">
                                <span
                                    className={`${activeTab === "Quiz"
                                        ? "text-[#9012FF] font-bold"
                                        : "text-gray-500"
                                        }`}
                                >
                                    Quizzes
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
