"use client";

import { useRouter, usePathname } from "next/navigation";

import { useState, useEffect } from "react";


function learned() {
    const [activeTab, setActiveTab] = useState<string>('');
    const router = useRouter();
    const pathname = usePathname();
    const handleTabClick = (tabName: string, path: string) => {
        setActiveTab(tabName);
        router.push(path);
    };
    useEffect(() => {
        if (pathname) {
            const currentPath = pathname.split('/')[2]
            if (currentPath === 'profile') {
                setActiveTab('profile')
            } else if (currentPath === 'purchase') {
                setActiveTab('purchase')
            }
            else {
                setActiveTab('profile')
            }

        }
    }, [pathname]);


    return (
        <div>
            <div>
                <button onClick={() => handleTabClick('profile', '/settings/profile')}
                    className={`bg-blue-500 text-white py-2 px-4 rounded ${activeTab === 'purchase' ? 'bg-blue-700' : 'bg-blue-500'}`}>


                    <p>Courses</p>
                </button>
            </div >
            <div>
                <button onClick={() => handleTabClick('purchase', '/settings/purchase')}
                    className={`bg-blue-500 text-white py-2 px-4 rounded ${activeTab === 'purchase' ? 'bg-blue-700' : 'bg-blue-500'}`}>


                    <p >Tests</p>
                </button>
            </div>
            <div>
                <button onClick={() => handleTabClick('purchase', '/settings/purchase')}
                    className={`bg-blue-500 text-white py-2 px-4 rounded ${activeTab === 'purchase' ? 'bg-blue-700' : 'bg-blue-500'}`}>


                    <p >Quizzes</p>
                </button>
            </div>
        </div >
    );
}


export default learned;