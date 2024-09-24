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
                        tabList: "gap-6 w-full relative rounded-none p-0 ",
                        cursor: "w-full bg-[#22d3ee]",
                        tab: "max-w-fit px-0 h-12",
                        tabContent: "group-data-[selected=true]:text-[#06b6d4]"
                    }}
                >
                    <Tab
                        key="photos"
                        title={
                            <div className="flex items-center space-x-2">

                                <span>Photos</span>
                                <Chip size="sm" variant="faded">9</Chip>
                            </div>
                        }
                    />
                    <Tab
                        key="music"
                        title={
                            <div className="flex items-center space-x-2">

                                <span>Music</span>
                                <Chip size="sm" variant="faded">3</Chip>
                            </div>
                        }
                    />
                    <Tab
                        key="videos"
                        title={
                            <div className="flex items-center space-x-2">

                                <span>Videos</span>
                                <Chip size="sm" variant="faded">1</Chip>
                            </div>
                        }
                    />
                </Tabs>
            </div>



        </div>

    );
}
export default learned
