// 'use client';

// import "./layout.css";
// import { ReactNode, useEffect, useState } from 'react';
// import TabComps from '@/components/AdminComponents/TabComps';
// import Header from '@/components/AdminHeaderComponents/AdminHeader';
// import { usePathname } from 'next/navigation';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// interface DashboardGroupProps {
//     children: ReactNode;

// }

// export default function DashboardGroup({ children }: DashboardGroupProps) {
//     const pathname = usePathname();
//     const [currentPage, setCurrentPage] = useState<string>('');

//     useEffect(() => {
//         const pathArray = pathname?.split('/');
//         let pageName = pathArray?.[pathArray.length - 1] || '';

//         if (pathname?.includes('quizzesmanagement')) {
//             if (pathArray?.[pathArray.length - 1] === 'quizzesmanagement') {
//                 pageName = 'Quizzes Management';
//             } else if (pathname.includes('quizinfo')) {
//                 pageName = 'Quizzes Management '; // Specific header for quiz info
//             } else {
//                 pageName = 'Quizzes Management'; // Default fallback
//             }
//         } else {
//             switch (pageName) {
//                 case 'rolemanagement':
//                     pageName = 'Role Management';
//                     break;
//                 case 'rolemanagementinfo':
//                     pageName = 'Back to Role Management';
//                     break;
//                 case 'customerdatamanagement':
//                     pageName = 'Customer Data Management';
//                     break;
//                 case 'marketingintegration':
//                     pageName = 'Marketing Integration';
//                     break;
//                 case 'quizzesmanagement':
//                     pageName = 'Quizzes Management';
//                     break;
//                 case 'testseriesmanagement':
//                     pageName = 'Test Series Management';
//                     break;
//                 case 'coursecreation':
//                     pageName = 'Course Creation';
//                     break;
//                 case "quizmanaegment":
//                     pageName = 'Back to Quizzes Management';
//                     break;
//                 case 'quizinfo':
//                     pageName = 'Back to Quizzes Management';
//                     break;
//                 case 'createtestseries':
//                     pageName = 'Back to Test Series Management';
//                     break;
//                 case 'testseriesinfo':
//                     pageName = 'Back to Test Series Management';
//                     break;
//                 case 'createcourse':
//                     pageName = 'Back to Course Management';
//                     break;
//                 case 'courseinfo':
//                     pageName = 'Back to Course Management';
//                     break;
//                 case 'courses':
//                     pageName = 'Back to Quizzes Management';
//                     break;
//                 case 'profile':
//                     pageName = 'My Profile';
//                     break;
//                 case 'customerinfo':
//                     pageName = 'Back to Customer Care';
//                     break;
//                 case 'marketinfo':
//                     pageName = 'Back to Messenger';
//                     break;
//                 case 'userdatabase':
//                     pageName = 'User Database';
//                     break;
//                 case 'userdatabaseinfo':
//                     pageName = 'Back to User Database';
//                     break;
//                 case 'customercare':
//                     pageName = 'Customer Care';
//                     break;
//                 case 'allsubjectchapters':
//                     pageName = 'All Subject Chapters';
//                     break;
//                 case 'rolemanagementguide':
//                     pageName = 'Rolemanagement Guide';
//                     break;
//                 case "discussionform":
//                     pageName = "Discussion form";
//                     break;
//                 case "internalchat":
//                     pageName = "Internal chat";
//                     break;
//                 case "community":
//                     pageName = "Community";
//                     break;
//                 default:
//                     pageName = '';
//             }
//         }
//         setCurrentPage(pageName);
//     }, [pathname]);


//     return (
//         <div className="body overflow-none">
//             <div>
//                 <TabComps />
//             </div>
//             <div className="contents">
//                 <div className="content-box">
//                     <div className="font-bold text-[#1D2939] text-lg">
//                         <Header currentPage={currentPage} />
//                     </div>
//                     <div className="variable-contents overflow-hidden">
//                         {children}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
'use client';

import "./layout.css";
import { ReactNode, useEffect, useState } from 'react';
import TabComps from '@/components/AdminComponents/TabComps';
import Header from '@/components/AdminHeaderComponents/AdminHeader';
import { usePathname, useSearchParams } from 'next/navigation';

interface DashboardGroupProps {
    children: ReactNode;
}

export default function DashboardGroup({ children }: DashboardGroupProps) {
    const pathname = usePathname(); // Get the path, e.g., "/chemistry-ki-quizz"
    const searchParams = useSearchParams(); // Get query params, e.g., "?qId=B8yw93YJcBaGL3x0KRvN"
    const [currentPage, setCurrentPage] = useState<string>('');

    useEffect(() => {
        const pathArray = pathname?.split('/');
        const lastSegment = pathArray?.[pathArray.length - 1] || '';
        const qId = searchParams?.get('qId'); // Extract the query parameter

        let pageName = '';

        // Generic dynamic route handling
        const dynamicRouteKeywords = ['qId']; // Add other keywords if needed
        const isDynamicRoute = dynamicRouteKeywords.some(keyword => pathname?.includes(keyword));

        if (isDynamicRoute) {
            pageName = 'Back to Quizzes Management';
        } else {
            // Fallback or static route mapping
            const routeMapping: Record<string, string> = {
                rolemanagement: 'Role Management',
                customerdatamanagement: 'Customer Data Management',
                marketingintegration: 'Marketing Integration',
                profile: 'My Profile',
                customercare: 'Customer Care',
                userdatabase: 'User Database',
                discussionform: 'Discussion Form',
                internalchat: 'Internal Chat',
                community: 'Community',
            };
            pageName = routeMapping[lastSegment] || 'Dashboard';
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