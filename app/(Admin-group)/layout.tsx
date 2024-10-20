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
        // Extract the current page name from the pathname
        const pathArray = pathname?.split('/');
        let pageName = pathArray?.[pathArray.length - 1] || 'Dashboard'; // Default to 'Dashboard'

        // Mapping to a more readable page name if necessary
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
            default:
                pageName = 'Dashboard'; // Default page name
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
                    <div>
                        <Header currentPage={currentPage} /> {/* Pass current page name */}
                    </div>
                    <div className="variable-contents">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
