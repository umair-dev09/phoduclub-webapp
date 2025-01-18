'use client';
import "./layout.css";
import { ReactNode, Suspense, useEffect, useState } from 'react';
import TabComps from '@/components/AdminComponents/TabComps';
import Header from '@/components/AdminHeaderComponents/AdminHeader';
import { usePathname, useSearchParams } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import Image from 'next/image';
import 'react-toastify/dist/ReactToastify.css';
import LoadingData from "@/components/Loading";

interface DashboardGroupProps {
    children: ReactNode;
}

export default function DashboardGroup({ children }: DashboardGroupProps) {
    const pathname = usePathname();
    const [currentPage, setCurrentPage] = useState<string>('Dashboard');
    const [isCollapsed, setIsCollapsed] = useState(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('isSidebarCollapsed');
            return saved ? JSON.parse(saved) : false;
        }
        return false;
    });

    useEffect(() => {
        localStorage.setItem('isSidebarCollapsed', JSON.stringify(isCollapsed));
    }, [isCollapsed]);

    const handleCollapseClick = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <Suspense fallback={<LoadingData />}>
            <div className="body overflow-none">
                <div className="flex flex-col h-full">
                    <div className="overflow-y-auto overflow-x-hidden flex-1 min-w-[3.5rem] scrollbar-hide">
                        <TabComps isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
                    </div>
                    <button
                        className={`flex items-center justify-center absolute left-[250px] top-[58px] w-8 h-8 bg-white border-[0.106rem] border-lightGrey rounded-full transition-all duration-[500ms] ease-in-out
                                ${isCollapsed ? 'left-[50px]' : ''}`}
                        onClick={handleCollapseClick}
                    >
                        {isCollapsed ? (
                            <Image
                                className="flex flex-row items-center justify-center mr-[2px]"
                                alt="Collapse Icon Right"
                                src="/icons/collapse-right.svg"
                                width={8}
                                height={8}
                            />
                        ) : (
                            <Image
                                className="flex flex-row items-center justify-center mr-[2px]"
                                alt="Collapse Icon Left"
                                src="/icons/collapse-left.svg"
                                width={8}
                                height={8}
                            />
                        )}
                    </button>
                </div>
                <div className="contents">
                    <div className="content-box">
                        <div className="font-bold text-[#1D2939] text-lg">
                            <Suspense fallback={<div>Loading Header...</div>}>
                                {/* Pass both currentPage and setCurrentPage */}
                                <PageHeader
                                    pathname={pathname}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                />
                            </Suspense>
                        </div>
                        <div className="variable-contents overflow-hidden">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </Suspense>
    );
}

function PageHeader({
    pathname,
    currentPage,
    setCurrentPage,
}: {
    pathname: string;
    currentPage: string;
    setCurrentPage: (page: string) => void;
}) {
    const searchParams = useSearchParams();

    useEffect(() => {
        const qId = searchParams?.get('qId');
        const tId = searchParams?.get('tId');
        const cId = searchParams?.get('cId');
        const rId = searchParams?.get('rId');
        const uId = searchParams?.get('uId');
        const nId = searchParams?.get('nId');
        const communityId = searchParams?.get('communityId');
        let pageName = '';

        if (qId) pageName = 'Back to Quizzes Management';
        else if (tId) pageName = 'Back to Test Series Management';
        else if (cId) pageName = 'Back to Course Management';
        else if (rId) pageName = 'Back to Role Management';
        else if (uId) pageName = 'Back to User Database';
        else if (nId) pageName = 'Back to Messenger';
        else if (communityId) pageName = 'Community';
        else {
            const currentPath = pathname.split('/').pop();
            switch (currentPath) {
                case 'rolemanagement':
                    pageName = 'Role Management';
                    break;
                case 'customerdatamanagement':
                    pageName = 'Customer Data Management';
                    break;
                case 'marketingintegration':
                    pageName = 'Marketing Integration';
                    break;
                case 'quizzesmanagement':
                    pageName = 'Quizzes Management';
                    break;
                case 'testseriesmanagement':
                    pageName = 'Test Series Management';
                    break;
                case 'coursecreation':
                    pageName = 'Course Management';
                    break;
                case 'createquiz':
                    pageName = 'Back to Quizzes Management';
                    break;
                case 'createtestseries':
                    pageName = 'Back to Test Series Management';
                    break;
                case 'createcourse':
                    pageName = 'Back to Course Management';
                    break;
                case 'profile':
                    pageName = 'My Profile';
                    break;
                case 'customerinfo':
                    pageName = 'Back to Customer Care';
                    break;
                case 'userdatabase':
                    pageName = 'User Database';
                    break;
                case 'customercare':
                    pageName = 'Customer Care';
                    break;
                case 'allsubjectchapters':
                    pageName = 'All Subject Chapters';
                    break;
                case 'rolemanagementguide':
                    pageName = 'Role Management Guide';
                    break;
                case 'discussionform':
                    pageName = 'Discussion Form';
                    break;
                case 'internalchat':
                    pageName = 'Internal Chat';
                    break;
                case 'community':
                    pageName = 'Community';
                    break;
                case 'personal-chat':
                    pageName = 'Community';
                    break;
                case 'admin':
                    pageName = 'Admin Panel';
                    break;
                default:
                    pageName = 'Dashboard';
            }
        }

        setCurrentPage(pageName);
    }, [pathname, searchParams, setCurrentPage]);

    return <Header currentPage={currentPage} />;
}
