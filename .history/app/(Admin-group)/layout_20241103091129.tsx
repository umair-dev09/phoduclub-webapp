'use client';

import "./layout.css";
import { ReactNode, useEffect, useState } from 'react';
import TabComps from '@/components/AdminComponents/TabComps';
import Header from '@/components/AdminHeaderComponents/AdminHeader';
import { usePathname } from 'next/navigation';

interface DashboardGroupProps {
    children: ReactNode;
}

export default function DashboardGroup({ children }: DashboardGroupProps) {
    const pathname = usePathname();
    const [currentPage, setCurrentPage] = useState<string>('Dashboard');

    useEffect(() => {
        const pathArray = pathname?.split('/');
        let pageName = pathArray?.[pathArray.length - 1] || 'Dashboard';

        switch (pageName) {
            case 'dashboard':
                pageName = 'Dashboard';
                break;
            case 'learncms':
                pageName = 'Learn CMS';
                break;
            case 'usermanagement':
                pageName = 'User Management';
                break;
            case 'quizzesmanagement':
                pageName = 'Quizzes Management';
                break;
            case 'testseriesmanagement':
                pageName = 'Test Series Management';
                break;
            case 'coursecreation':
                pageName = 'Course Creation';
                break;
            case 'createquiz':
                pageName = 'Back to Quizzes Management';
                break;
            case 'quizinfo':
                pageName = 'Back to Quizzes Management';
                break;
            case 'createtestseries':
                pageName = 'Back to Quizzes Management';
                break;
            case 'testseriesinfo':
                pageName = 'Back to Quizzes Management';
                break;
            case 'createcourse':
                pageName = 'Back to Quizzes Management';
                break;
            case 'courseinfo':
                pageName = 'Back to Quizzes Management';
                break;
            default:
                pageName = 'Dashboard';
        }

        setCurrentPage(pageName);
    }, [pathname]);

    return (
        <div className="body">
            <div>
                <TabComps />
            </div>
            <div className="contents">
                <div className="content-box">
                    <div className="font-bold text-[#1D2939] text-lg">
                        <Header currentPage={currentPage} />
                    </div>
                    <div className="variable-contents">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
