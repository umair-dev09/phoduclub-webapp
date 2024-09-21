"use client";

import { useRouter, usePathname } from "next/navigation";

import { useState, useEffect } from "react";


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
        <div className="bg-red-500 h-[80px] py-6">
            <div className=" bg-rose-50 gap-[16px] ml-7 mr-7 h-[32px] mb-0 flex">


                hello
            </div>



        </div>

    );
}
export default learned
