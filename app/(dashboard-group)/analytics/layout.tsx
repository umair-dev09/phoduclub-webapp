'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

function Layout({ children }) {
    const [activeTab, setActiveTab] = useState('test-series');
    const router = useRouter();

    // Use effect to check localStorage for the saved tab
    useEffect(() => {
        const savedTab = localStorage.getItem('activeTab');
        if (savedTab) {
            setActiveTab(savedTab);
            router.push(`/analytics/${savedTab}`);
        }
    }, [router]);

    const handleTabClick = (tabName, path) => {
        setActiveTab(tabName);
        localStorage.setItem('activeTab', tabName); // Save to localStorage
        router.push(path);
    };

    return (
        <div className='flex flex-1 flex-col px-8 mt-8'>
            <div className='flex w-full flex-row pb-3 border-b gap-3'>
                <button
                    onClick={() => handleTabClick('test-series', '/analytics/test-series')}
                    className={activeTab === 'test-series' ? 'font-bold' : ''}
                >
                    Test-Series
                </button>
                <button
                    onClick={() => handleTabClick('quizzes', '/analytics/quizzes')}
                    className={activeTab === 'quizzes' ? 'font-bold' : ''}
                >
                    Quizzes
                </button>
            </div>
            <div className='flex flex-1'>
                {children}
            </div>
        </div>
    );
}

export default Layout;
