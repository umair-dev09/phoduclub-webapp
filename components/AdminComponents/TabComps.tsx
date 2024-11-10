"use client";

import styles from '../../components/DashboardComponents/TabComps.module.css';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Collapsible from 'react-collapsible';

function TabComps() {
    const router = useRouter();
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isOpenArray, setIsOpenArray] = useState([false, false, false]);

    // Load collapsed state from localStorage
    useEffect(() => {
        const savedState = localStorage.getItem('isSidebarCollapsed');
        setIsCollapsed(savedState === 'true');
    }, []);

    // Save collapsed state to localStorage
    useEffect(() => {
        localStorage.setItem('isSidebarCollapsed', isCollapsed.toString());
    }, [isCollapsed]);

    const [activeTab, setActiveTab] = useState('');

    // Set active tab based on current path
    useEffect(() => {
        if (pathname) {
            const currentPath = pathname.split('/')[2];
            setActiveTab(currentPath || 'dashboard');
        }
    }, [pathname]);

    const handleCollapseClick = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleTabClick = (tabName: string, path: string) => {
        setActiveTab(tabName);
        router.push(path);
    };

    const toggleCollapsible = (index: number) => {
        setIsOpenArray(prev => prev.map((open, i) => (i === index ? !open : open)));
    };

    const renderButton = (label: string, icon: string, activeIcon: string, isActive: boolean, onClick: () => void) => (
        <button onClick={onClick} className={`flex items-center w-full py-2 px-3 text-left rounded-md mb-2 transition-colors ${isActive ? 'bg-[#7400E0] text-white' : 'hover:bg-[#e1ffe11a] text-[#AAAAAA]'}`}>
            <Image src={isActive ? activeIcon : icon} width={22} height={22} alt={`${label} Icon`} />
            {!isCollapsed && <span className='ml-2'>{label}</span>}
        </button>
    );

    return (
        <div className={`flex flex-col relative transition-all duration-300 ease-in-out ${isCollapsed ? 'w-[3.5rem]' : 'w-[14rem]'} pl-2 py-[0.625rem] bg-[#1a1a1a]`}>
            {/* Sidebar Toggle Button */}
            {/* <button onClick={handleCollapseClick} className="absolute top-4 right-[-16px] w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-200">
                <Image src={isCollapsed ? "/icons/collapse-right.svg" : "/icons/collapse-left.svg"} width={16} height={16} alt="Toggle Sidebar" />
            </button> */}

            {/* Logo Section */}
            {/* <div className="flex items-center mb-6">
                <p className={`bg-[#3c2f40] text-white font-bold w-10 h-10 flex items-center justify-center rounded-lg ${isCollapsed ? 'hidden' : ''}`}>P</p>
                {!isCollapsed && (
                    <div className="ml-2">
                        <p className='text-white font-bold text-lg'>phodu<span className='text-[#e29ff5]'>.club</span></p>
                        <p className='text-sm text-[#98A2B3]'>Admin</p>
                    </div>
                )}
            </div> */}

            <button className={`flex items-center justify-center absolute top-[3.6rem] left-[97.5%] w-8 h-8 bg-white border-[0.106rem] border-lightGrey rounded-full transition-all ${isCollapsed ? ' -translate-x-1' : ''}`} onClick={handleCollapseClick}>
                {isCollapsed ? (
                    <Image className={styles.collapseIconRight} alt='Collapse Icon Right' src="/icons/collapse-right.svg" width={8} height={8} />
                ) : (
                    <Image className={styles.collapseIconLeft} alt="Collapse Icon Left" src="/icons/collapse-left.svg" width={8} height={8} />
                )}
            </button>

            <div>
                <p className={`items-center justify-center w-10 h-10 mt-3 mb-[0.73rem] ml-[0.2rem] text-white font-bold bg-[#3c2f40] rounded-[0.375rem] transition-all ${isCollapsed ? 'flex' : 'hidden'}`}>P</p>
                <div className={`flex-col mt-2 mb-[0.475rem] transition-all ${!isCollapsed ? 'flex' : 'hidden'}`}>
                    <p className='text-white text-lg font-bold'>phodu<span className='text-[#e29ff5] text-lg font-bold'>.club</span></p>
                    <p className='text-sm text-[#98A2B3] font-normal'>Admin</p>
                </div>
            </div>

            {/* Divider */}
            <hr className="border-t border-gray-700 mb-4" />

            {/* Tabs */}
            {renderButton('Dashboard', '/icons/admin-dashboard-2.svg', '/icons/admin-dashboard.svg', activeTab === 'dashboard', () => handleTabClick('dashboard', '/admin/dashboard'))}

            {/* Content Section with Collapsible Menu */}
            <Collapsible
                trigger={
                    <div
                        className={`flex items-center justify-between mb-2 py-2 px-3 rounded-md ${activeTab.startsWith('quizzesmanagement') ||
                            activeTab.startsWith('testseriesmanagement') ||
                            activeTab.startsWith('coursecreation')
                            ? 'bg-[#7400E0] text-white'
                            : 'hover:bg-[#e1ffe11a] text-[#AAAAAA]'
                            }`}
                        onClick={() => toggleCollapsible(0)}
                    >
                        <div className="flex items-center">
                            <Image
                                src={
                                    activeTab.startsWith('content') ||
                                        activeTab.startsWith('quizzesmanagement') ||
                                        activeTab.startsWith('testseriesmanagement') ||
                                        activeTab.startsWith('coursecreation')
                                        ? '/icons/admin-content.svg'
                                        : '/icons/admin-content-2.svg'
                                }
                                width={22}
                                height={22}
                                alt="Content"
                            />
                            {!isCollapsed && <span className="ml-2">Content</span>}
                        </div>
                        {!isCollapsed && (
                            <Image
                                src={isOpenArray[0] ? '/icons/arrowdown.svg' : '/icons/arrowup.svg'}
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
                {/* Updated Tabs */}
                <button
                    onClick={() => handleTabClick('quizzesmanagement', '/admin/content/quizzesmanagement')}
                    className={`flex items-center w-full py-2 px-3 text-left rounded-md mb-2 transition-colors ${activeTab === 'quizzesmanagement' ? 'bg-[#444444] text-white' : 'hover:bg-[#e1ffe11a] text-[#AAAAAA]'
                        }`}
                >
                    {!isCollapsed && <span className="ml-7 text-[0.813rem]">Quizzes Management</span>}
                </button>

                <button
                    onClick={() => handleTabClick('testseriesmanagement', '/admin/content/testseriesmanagement')}
                    className={`flex items-center w-full py-2 px-3 text-left rounded-md mb-2 transition-colors ${activeTab === 'testseriesmanagement' ? 'bg-[#444444] text-white' : 'hover:bg-[#e1ffe11a] text-[#AAAAAA]'
                        }`}
                >
                    {!isCollapsed && <span className="ml-7 text-[0.813rem]">Test Series Management</span>}
                </button>

                <button
                    onClick={() => handleTabClick('coursecreation', '/admin/content/coursecreation')}
                    className={`flex items-center w-full py-2 px-3 text-left rounded-md mb-2 transition-colors ${activeTab === 'coursecreation' ? 'bg-[#444444] text-white' : 'hover:bg-[#e1ffe11a] text-[#AAAAAA]'
                        }`}
                >
                    {!isCollapsed && <span className="ml-7 text-[0.813rem]">Course Creation</span>}
                </button>
            </Collapsible>

            {/* Additional Tabs */}
            {renderButton('Role Management', '/icons/Role Management-2.svg', '/icons/Role Management.svg', activeTab === 'rolemanagement', () => handleTabClick('rolemanagement', '/admin/rolemanagement'))}
            {renderButton('Marketing Integration', '/icons/Marketing Integration-2.svg', '/icons/Marketing Integration.svg', activeTab === 'marketingintegration', () => handleTabClick('marketingintegration', '/admin/marketingintegration'))}
        </div>
    );
}

export default TabComps;