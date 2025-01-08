'use client';

import "./layout.css";
import { ReactNode, useEffect, useState } from 'react';
import TabComps from '@/components/AdminComponents/TabComps';
import Header from '@/components/AdminHeaderComponents/AdminHeader';
import { usePathname, useSearchParams } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface DashboardGroupProps {
    children: ReactNode;

}

export default function DashboardGroup({ children }: DashboardGroupProps) {
    const pathname = usePathname();
    const [currentPage, setCurrentPage] = useState<string>('');
    const searchParams = useSearchParams(); // Get query params, e.g., "?qId=B8yw93YJcBaGL3x0KRvN"

    // useEffect(() => {
    //     const qId = searchParams?.get('qId'); // Extract the query parameter
    //     const tId = searchParams?.get('tId'); // Extract the query parameter
    //     const cId = searchParams?.get('cId');
    //     const rId = searchParams?.get('rId');
    //     const uId = searchParams?.get('uId');
    //     const nId = searchParams?.get('nId');
    //     let pageName = '';

    //     // Directly set pageName based on query parameters
    //     if (qId) {
    //         pageName = 'quizmanagement';
    //     } else if (tId) {
    //         pageName = 'testseriesmanagement';
    //     } else if (cId) {
    //         pageName = 'coursecreation';
    //     } else if (rId) {
    //         pageName = 'rolemanagement';
    //     } else if (uId) {
    //         pageName = 'userdatabase';
    //     } else if (nId) {
    //         pageName = 'marketinfo';
    //     }

    //     // Use switch to handle specific cases
    //     switch (pageName) {
    //         case 'rolemanagement':
    //             pageName = 'Role Management';
    //             break;
    //         case 'rolemanagementinfo':
    //             pageName = 'Back to Role Management';
    //             break;
    //         case 'customerdatamanagement':
    //             pageName = 'Customer Data Management';
    //             break;
    //         case 'marketingintegration':
    //             pageName = 'Marketing Integration';
    //             break;
    //         case 'quizmanagement':
    //             pageName = 'Back to Quizzes Management';
    //             break;
    //         case 'testseriesmanagement':
    //             pageName = 'Back to Test Series Management';
    //             break;
    //         case 'coursecreation':
    //             pageName = 'Back to Course Management';
    //             break;
    //         case 'quizinfo':
    //             pageName = 'Back to Quizzes Management';
    //             break;
    //         case 'createtestseries':
    //             pageName = 'Back to Test Series Management';
    //             break;
    //         case 'testseriesinfo':
    //             pageName = 'Back to Test Series Management';
    //             break;
    //         case 'createcourse':
    //             pageName = 'Back to Course Management';
    //             break;
    //         case 'courseinfo':
    //             pageName = 'Back to Course Management';
    //             break;
    //         case 'courses':
    //             pageName = 'Back to Quizzes Management';
    //             break;
    //         case 'profile':
    //             pageName = 'My Profile';
    //             break;
    //         case 'customerinfo':
    //             pageName = 'Back to Customer Care';
    //             break;
    //         case 'marketinfo':
    //             pageName = 'Back to Messenger';
    //             break;
    //         case 'userdatabase':
    //             pageName = 'User Database';
    //             break;
    //         case 'userdatabaseinfo':
    //             pageName = 'Back to User Database';
    //             break;
    //         case 'customercare':
    //             pageName = 'Customer Care';
    //             break;
    //         case 'allsubjectchapters':
    //             pageName = 'All Subject Chapters';
    //             break;
    //         case 'rolemanagementguide':
    //             pageName = 'Rolemanagement Guide';
    //             break;
    //         case 'discussionform':
    //             pageName = 'Discussion form';
    //             break;
    //         case 'internalchat':
    //             pageName = 'Internal chat';
    //             break;
    //         case 'community':
    //             pageName = 'Community';
    //             break;
    //         default:
    //             pageName = 'Dashboard';
    //     }

    //     // Set the page name
    //     setCurrentPage(pageName);

    // }, [pathname, searchParams]);
    useEffect(() => {
        const qId = searchParams?.get('qId');
        const tId = searchParams?.get('tId');
        const cId = searchParams?.get('cId');
        const rId = searchParams?.get('rId');
        const uId = searchParams?.get('uId');
        const nId = searchParams?.get('nId');
        let pageName = '';

        if (qId) {
            pageName = 'Back to Quizzes Management';
        }
        else if (tId) {
            pageName = 'Back to Test Series Management';
        }
        else if (cId) {
            pageName = 'Back to Course Management';
        }
        else if (rId) {
            pageName = 'Back to Role Management';
        }
        else if (uId) {
            pageName = 'Back to User Database';
        }
        else if (nId) {
            pageName = 'Back to Messenger';
        }
        // Remove the else if (pageName) condition and directly use the switch
        else {
            // Extract the page name from pathname if needed
            // Assuming pathname is something like '/rolemanagement' or '/profile'
            const currentPath = pathname.split('/').pop();

            switch (currentPath) {
                case 'rolemanagement':
                    pageName = 'Role Management';
                    break;
                case 'rolemanagementinfo':
                    pageName = 'Back to Role Management';
                    break;
                // ... rest of your switch cases ...
                default:
                    pageName = 'Dashboard';
            }
        }

        setCurrentPage(pageName);
    }, [pathname, searchParams]);

    return (
        <div className="body overflow-none">
            <div>
                <TabComps />
            </div>
            <div className="contents">
                <div className="content-box">
                    <div className="font-bold text-[#1D2939] text-lg">
                        <Header currentPage={currentPage} />
                    </div>
                    <div className="variable-contents overflow-hidden">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
