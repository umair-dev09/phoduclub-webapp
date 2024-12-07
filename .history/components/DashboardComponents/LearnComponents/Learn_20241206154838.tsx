// "use client";
// import { Tabs, Tab } from "@nextui-org/react";
// import { useRouter, usePathname } from "next/navigation";
// import { useState, useEffect } from "react";

// function Learned() {
//     // Example counts for users and banned users
//     const coursesCount = 78;
//     const testCount = 0;
//     const quizcount = 7
//     const [activeTab, setActiveTab] = useState<string>('courses');
//     const router = useRouter();
//     const pathname = usePathname();

//     const handleTabClick = (tabName: string, path: string) => {
//         setActiveTab(tabName);
//         router.push(path);
//     };

//     useEffect(() => {
//         if (pathname) {
//             const currentPath = pathname.split('/')[2];
//             if (currentPath === 'test') {
//                 setActiveTab('test');
//             } else if (currentPath === 'Quiz') {
//                 setActiveTab('Quiz');
//             } else {
//                 setActiveTab('courses'); // Default to 'courses'
//             }
//         } else {
//             setActiveTab('courses'); // Default to 'courses' if pathname is not available
//         }
//     }, [pathname]);

//     return (
//         <div className="flex flex-col h-full px-8 ">

//             <Tabs
//                 aria-label="Learn Tabs"
//                 color="primary"
//                 variant="underlined"
//                 selectedKey={activeTab}
//                 onSelectionChange={(key) => setActiveTab(key as string)}
//                 classNames={{
//                     tabList: "gap-6 w-full relative rounded-none p-0 border-b border-solid border-[#EAECF0] h-full ",
//                     cursor: "w-full bg-[#7400E0]",
//                     tab: "max-w-fit px-0 h-[60px]",
//                     tabContent: "group-data-[selected=true]:text-[#7400E0] hover:text-[#7400E0] ",
//                 }}
//             >
//                 <Tab
//                     key=" Courses"

//                     title={
//                         <div className="flex items-center space-x-2"
//                             onClick={() => handleTabClick('courses', '/learn/courses')}  >
//                             <span className="font-medium text-base">
//                                 Courses
//                             </span>
//                             {coursesCount > 0 && (
//                                 <div className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm bg-[#EDE4FF] border border-[#EDE4FF] font-medium text-[#7400E0]">
//                                     {coursesCount}
//                                 </div>
//                             )}
//                         </div>
//                     }
//                 >

//                 </Tab>

//                 <Tab
//                     key="    Tests"

//                     title={
//                         <button className="flex items-center space-x-2"
//                             onClick={() => handleTabClick('test', '/learn/test')}>
//                             <span className="font-medium text-base">
//                                 Tests
//                             </span>
//                             {testCount > 0 && (
//                                 <div className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm bg-[#EDE4FF] border border-[#EDE4FF] font-medium text-[#7400E0]">
//                                     {testCount}
//                                 </div>
//                             )}
//                         </button>
//                     }
//                 >

//                 </Tab>
//                 <Tab
//                     key="    Quizzes"

//                     title={
//                         <button className="flex items-center space-x-2"
//                             onClick={() => handleTabClick('Quiz', '/learn/Quiz')}>
//                             <span className="font-medium text-base">
//                                 Quizzes
//                             </span>
//                             {quizcount > 0 && (
//                                 <div className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm bg-[#EDE4FF] border border-[#EDE4FF] font-medium text-[#7400E0]">
//                                     {quizcount}
//                                 </div>
//                             )}
//                         </button>
//                     }
//                 >

//                 </Tab>
//             </Tabs>


//         </div>

//     );
// }

// export default Learned;
"use client";
import { Tabs, Tab } from "@nextui-org/react";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

function Learned() {
    const coursesCount = 78;
    const testCount = 0;
    const quizCount = 7;

    const [activeTab, setActiveTab] = useState<string>("courses");
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (pathname) {
            const currentPath = pathname.split("/")[2];
            if (currentPath === "test") {
                setActiveTab("test");
            } else if (currentPath === "Quiz") {
                setActiveTab("Quiz");
            } else {
                setActiveTab("courses"); // Default to 'courses'
            }
        }
    }, [pathname]);

    const handleSelectionChange = (key: Key) => {
        const selectedTab = key.toString(); // Convert 'Key' type to 'string'
        setActiveTab(selectedTab);

        if (selectedTab === "courses") {
            router.push("/learn/courses");
        } else if (selectedTab === "test") {
            router.push("/learn/test");
        } else if (selectedTab === "Quiz") {
            router.push("/learn/Quiz");
        }
    };

    return (
        <div className="flex flex-col h-full px-8">
            <Tabs
                aria-label="Learn Tabs"
                color="primary"
                variant="underlined"
                selectedKey={activeTab}
                onSelectionChange={handleSelectionChange}
                classNames={{
                    tabList: "gap-6 w-full relative rounded-none p-0 border-b border-solid border-[#EAECF0] h-full",
                    cursor: "w-full bg-[#7400E0]",
                    tab: "max-w-fit px-0 h-[60px]",
                    tabContent:
                        "group-data-[selected=true]:text-[#7400E0] hover:text-[#7400E0]",
                }}
            >
                <Tab
                    key="courses"
                    title={
                        <div className="flex items-center space-x-2">
                            <span className="font-medium text-base">
                                Courses
                            </span>
                            {coursesCount > 0 && (
                                <div className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm bg-[#EDE4FF] border border-[#EDE4FF] font-medium text-[#7400E0]">
                                    {coursesCount}
                                </div>
                            )}
                        </div>
                    }
                ></Tab>

                <Tab
                    key="test"
                    title={
                        <div className="flex items-center space-x-2">
                            <span className="font-medium text-base">Tests</span>
                            {testCount > 0 && (
                                <div className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm bg-[#EDE4FF] border border-[#EDE4FF] font-medium text-[#7400E0]">
                                    {testCount}
                                </div>
                            )}
                        </div>
                    }
                ></Tab>

                <Tab
                    key="Quiz"
                    title={
                        <div className="flex items-center space-x-2">
                            <span className="font-medium text-base">Quizzes</span>
                            {quizCount > 0 && (
                                <div className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm bg-[#EDE4FF] border border-[#EDE4FF] font-medium text-[#7400E0]">
                                    {quizCount}
                                </div>
                            )}
                        </div>
                    }
                ></Tab>
            </Tabs>
        </div>
    );
}

export default Learned;
