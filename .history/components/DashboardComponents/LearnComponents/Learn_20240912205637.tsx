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
            const currentPath = pathname.split('/')[3]
            if (currentPath === 'course') {
                setActiveTab('course')
            } else if (currentPath === 'test') {
                setActiveTab('test')
            }
            else if (currentPath === 'Quiz') {
                setActiveTab('Quiz')
            }
            else {
                setActiveTab('course')
            }

        }
    }, [pathname]);


    return (
        <div>
            <div>
                <button onClick={() => handleTabClick('course', '/learn/course')}
                    className={`bg-blue-500 text-white py-2 px-4 rounded ${activeTab === 'purchase' ? 'bg-blue-700' : 'bg-blue-500'}`}>


                    <p>Courses</p>
                </button>
            </div >
            <div>
                <button onClick={() => handleTabClick('test', '/learn/test')}
                    className={`bg-blue-500 text-white py-2 px-4 rounded ${activeTab === 'purchase' ? 'bg-blue-700' : 'bg-blue-500'}`}>


                    <p >Tests</p>
                </button>
            </div>
            <div>
                <button onClick={() => handleTabClick('Quiz', '/learn/Quiz')}
                    className={`bg-blue-500 text-white py-2 px-4 rounded ${activeTab === 'purchase' ? 'bg-blue-700' : 'bg-blue-500'}`}>


                    <p >Quizzes</p>
                </button>
            </div>
        </div >
    );
}


export default learned;