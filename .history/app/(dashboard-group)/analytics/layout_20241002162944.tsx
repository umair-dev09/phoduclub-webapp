'use client';

import React, { useState, useEffect, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface LayoutProps {
    children: ReactNode;
}

function Layout({ children }: LayoutProps) {
    const [activeTab, setActiveTab] = useState('test-series');
    const router = useRouter();
    const pathname = usePathname();

    // Use effect to check localStorage for the saved tab
    useEffect(() => {
        const savedTab = localStorage.getItem('activeTab');
        if (savedTab) {
            setActiveTab(savedTab);
            router.push(`/analytics/${savedTab}`);
        }
    }, [router]);

    const handleTabClick = (tabName: React.SetStateAction<string>, path: string) => {
        setActiveTab(tabName);
        router.push(path);
    };

    // Check if the pathname matches specific paths but exclude subfolders (e.g., bit1, bit2, etc.)
    if (
        pathname === '/analytics/test-series' ||
        pathname === '/analytics/quizzes'
    ) {
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
    } else {
        return <>{children}</>;
    }
}

export default Layout;
