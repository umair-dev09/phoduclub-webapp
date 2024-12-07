// 'use client';
// import { Tabs, Tab } from "@nextui-org/react";
// import React, { useState, ReactNode } from 'react';
// import { usePathname, useRouter, Key } from 'next/navigation';

// interface LayoutProps {
//     children: ReactNode;
// }

// function Layout({ children }: LayoutProps) {
//     const [activeTab, setActiveTab] = useState<string>("test-series");
//     const router = useRouter();
//     const pathname = usePathname();


//     const handleTabClick = (tabName: React.SetStateAction<string>, path: string) => {
//         setActiveTab(tabName);
//         router.push(path);
//     };
//     const handleSelectionChange = (key: Key) => {
//         const selectedTab = key.toString(); // Convert 'Key' type to 'string'
//         setActiveTab(selectedTab);

//         if (selectedTab === "test-series") {
//             router.push('/analytics/test-series');
//         } else if (selectedTab === "test") {
//             router.push('/analytics/quizzes');
//         }
//     };

//     // Check if the pathname matches specific paths but exclude subfolders (e.g., bit1, bit2, etc.)
//     if (
//         pathname === '/analytics/quizzes' ||
//         pathname === '/analytics/test-series'

//     ) {
//         return (
//             <div className='flex flex-1 flex-col w-full'>
//                 <div className=" flex px-8 w-full pt-4">
//                     <Tabs
//                         aria-label="Course Tabs"
//                         color="primary"
//                         variant="underlined"
//                         selectedKey={activeTab}
//                         onSelectionChange={handleSelectionChange}
//                         classNames={{
//                             tabList: "gap-6 w-full relative rounded-none p-0 border-b border-solid border-[#EAECF0]  ",
//                             cursor: "w-full bg-[#7400E0]",
//                             tab: "max-w-fit px-0 h-12 ",
//                             tabContent: "group-data-[selected=true]:text-[#7400E0] hover:text-[#7400E0] ",
//                         }}
//                     >
//                         <Tab
//                             key="Content"
//                             title={
//                                 <div className="flex items-center space-x-2">
//                                     <span className="font-medium text-base">
//                                         Test-Series
//                                     </span>
//                                 </div>
//                             }
//                         >


//                         </Tab>
//                         <Tab
//                             key="Discussion"
//                             title={
//                                 <div className="flex items-center space-x-2">
//                                     <span className="font-medium text-base">
//                                         Quizzes
//                                     </span>
//                                 </div>
//                             }
//                         >

//                         </Tab>
//                     </Tabs>

//                 </div>
//                 <div className='flex flex-1 overflow-y-auto'>
//                     {children}
//                 </div>
//             </div>
//         );
//     } else {
//         return <>{children}</>;
//     }
// }

// export default Layout;
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
            <div className="flex flex-1 flex-col w-full">
                <div className="flex px-8 w-full pt-4">
                    <Tabs
                        aria-label="Analytics Tabs"
                        color="primary"
                        variant="underlined"
                        selectedKey={activeTab}
                        onSelectionChange={(key) => handleSelectionChange(key as string)}
                        classNames={{
                            tabList: "gap-6 w-full relative rounded-none p-0 border-b border-solid border-[#EAECF0]",
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

