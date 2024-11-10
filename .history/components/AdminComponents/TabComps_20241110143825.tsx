"use client";
import Tooltip from '@mui/material/Tooltip';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Collapsible from 'react-collapsible';

function TabComps() {
    const router = useRouter();
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isOpenArray, setIsOpenArray] = useState([false, false, false]);

    useEffect(() => {
        const savedState = localStorage.getItem('isSidebarCollapsed');
        setIsCollapsed(savedState === 'true');
    }, []);

    useEffect(() => {
        localStorage.setItem('isSidebarCollapsed', isCollapsed.toString());
    }, [isCollapsed]);

    const [activeTab, setActiveTab] = useState('');

    const handleTabClick = (tabName: string, path: string) => {
        setActiveTab(tabName);
        router.push(path);
    };

    useEffect(() => {
        if (pathname) {
            const pathParts = pathname.split('/');
            const currentPath = pathParts[2];
            const subPath = pathParts[3];

            // Set active tab for both main sections and subsections
            if (subPath && currentPath === 'content') {
                setActiveTab(subPath);
            } else {
                setActiveTab(currentPath || 'dashboard');
            }
        }
    }, [pathname]);

    const handleCollapseClick = () => {
        setIsCollapsed(!isCollapsed);
    };

    const toggleCollapsible = (index: number) => {
        setIsOpenArray(prev => prev.map((open, i) => (i === index ? !open : open)));
    };

    // Helper function to check if current path is within content section
    const isContentSection = () => {
        return activeTab === 'quizzesmanagement' ||
            activeTab === 'testseriesmanagement' ||
            activeTab === 'coursecreation';
    };

    const renderButton = (label: string, icon: string, activeIcon: string, isActive: boolean, onClick: () => void) => (
        <button onClick={onClick} className={`flex w-full py-2 px-3 text-base text-left font-normal rounded-md mb-2 transition-all ${isActive ? 'bg-[#7400E0] text-white' : 'hover:bg-[#e1ffe11a] text-[#AAAAAA]'}`}>
            <Image src={isActive ? activeIcon : icon} width={22} height={22} alt={`${label} Icon`} />
            {!isCollapsed && <span className='ml-2'>{label}</span>}
        </button>
    );

    return (
        <div className={`flex flex-col relative transition-all duration-[500ms] ease-in-out ${isCollapsed ? 'w-[3.5rem]' : 'w-[16rem]'} pl-2 py-[0.625rem] bg-[#131313]`}>
            {/* Sidebar Toggle Button */}
            <button className={`flex items-center justify-center absolute top-[3.6rem] left-[97.5%] w-8 h-8 bg-white border-[0.106rem] border-lightGrey rounded-full transition-all ${isCollapsed ? ' -translate-x-1' : ''}`} onClick={handleCollapseClick}>
                {isCollapsed ? (
                    <Image className='flex flex-row items-center justify-center mr-[2px]' alt='Collapse Icon Right' src="/icons/collapse-right.svg" width={8} height={8} />
                ) : (
                    <Image className='flex flex-row items-center justify-center mr-[2px]' alt="Collapse Icon Left" src="/icons/collapse-left.svg" width={8} height={8} />
                )}
            </button>

            {/* Logo Section */}
            <div>
                <p className={`items-center justify-center w-10 h-10 mt-3 mb-[0.73rem] ml-[0.2rem] text-white font-bold bg-[#3c2f40] rounded-[0.375rem] transition-all ${isCollapsed ? 'flex' : 'hidden'}`}>P</p>
                <div className={`flex-col mt-2 mb-[0.475rem] transition-all ${!isCollapsed ? 'flex' : 'hidden'}`}>
                    <p className='text-white text-lg font-bold'>phodu<span className='text-[#e29ff5] text-lg font-bold'>.club</span></p>
                    <p className='text-sm text-[#98A2B3] font-normal'>Admin</p>
                </div>
            </div>

            {/* Divider */}
            <hr className="border-t border-gray-700 mb-4" />

            {/* Dashboard Tab */}
            {renderButton('Dashboard', '/icons/admin-dashboard-2.svg', '/icons/admin-dashboard.svg', activeTab === 'dashboard', () => handleTabClick('dashboard', '/admin/dashboard'))}

            {/* Content Section with Collapsible Menu */}
            <Collapsible
                trigger={
                    <div
                        className={`flex items-center justify-between mb-2 py-2 px-3 rounded-md ${isContentSection() ? 'bg-[#7400E0] text-white' : 'hover:bg-[#e1ffe11a] text-[#AAAAAA]'}`}
                        onClick={() => toggleCollapsible(0)}
                    >
                        <div className="flex items-center">
                            <Image
                                src={isContentSection() ? '/icons/admin-content.svg' : '/icons/admin-content-2.svg'}
                                width={22}
                                height={22}
                                alt="Content"
                            />
                            {!isCollapsed && <span className="ml-2">Content</span>}
                        </div>
                        {!isCollapsed && (
                            <Image
                                src={isOpenArray[0] ? '/icons/arrow-up-01-round.svg' : '/icons/arrow-down-02-round.svg'}
                                width={20}
                                height={20}
                                alt="Toggle"
                            />
                        )}
                    </div>
                }
                open={isOpenArray[0]}
                transitionTime={300}
            >
                <Tooltip title="Add" arrow>
                    <button
                        onClick={() => handleTabClick('quizzesmanagement', '/admin/content/quizzesmanagement')}
                        className={`flex items-center w-full h-10 py-2 px-3 text-left rounded-md mb-2 transition-colors ${activeTab === 'quizzesmanagement' ? 'bg-[#444444] text-white' : 'hover:bg-[#e1ffe11a] text-[#AAAAAA]'}`}
                    >
                        {!isCollapsed && <span className="ml-7 text-[0.813rem]">Quizzes Management</span>}
                    </button>

                </Tooltip>

                <button
                    onClick={() => handleTabClick('testseriesmanagement', '/admin/content/testseriesmanagement')}
                    className={`flex items-center w-full h-10 py-2 px-3 text-left rounded-md mb-2 transition-colors ${activeTab === 'testseriesmanagement' ? 'bg-[#444444] text-white' : 'hover:bg-[#e1ffe11a] text-[#AAAAAA]'}`}
                >
                    {!isCollapsed && <span className="ml-7 text-[0.813rem]">Test Series Management</span>}
                </button>

                <button
                    onClick={() => handleTabClick('coursecreation', '/admin/content/coursecreation')}
                    className={`flex items-center w-full h-10 py-2 px-3 text-left rounded-md mb-2 transition-colors ${activeTab === 'coursecreation' ? 'bg-[#444444] text-white' : 'hover:bg-[#e1ffe11a] text-[#AAAAAA]'}`}
                >
                    {!isCollapsed && <span className="ml-7 text-[0.813rem]">Course Creation</span>}
                </button>
            </Collapsible>

            {/* Additional Tabs */}
            {renderButton('Role Management', '/icons/Role Management-2.svg', '/icons/Role Management.svg', activeTab === 'rolemanagement', () => handleTabClick('rolemanagement', '/admin/rolemanagement'))}
            {renderButton('Marketing Integration', '/icons/Marketing Integration-2.svg', '/icons/Marketing Integration.svg', activeTab === 'marketingintegration', () => handleTabClick('marketingintegration', '/admin/marketingintegration'))}
            {renderButton('Customer Data Management', '/icons/community-2.svg', '/icons/community.svg', activeTab === 'customerdatamanagement', () => handleTabClick('customerdatamanagement', '/admin/customerdatamanagement'))}
        </div>
    );
}

export default TabComps;
