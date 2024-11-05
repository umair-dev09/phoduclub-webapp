"use client"; // This marks the component as a Client Component

import styles from '../../components/DashboardComponents/TabComps.module.css';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Collapsible from 'react-collapsible';

function TabComps() {
    const router = useRouter();
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
    const [isOpenArray, setIsOpenArray] = useState([false, false, false]); // Initialize collapsible states

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedState = localStorage.getItem('isSidebarCollapsed');
            setIsCollapsed(savedState === 'true');
        }
    }, []);

    const [activeTab, setActiveTab] = useState<string>('');

    useEffect(() => {
        if (pathname) {
            const currentPath = pathname.split('/')[1];
            setActiveTab(currentPath || 'dashboard');
        }
    }, [pathname]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('isSidebarCollapsed', isCollapsed.toString());
        }
    }, [isCollapsed]);

    const handleCollapseClick = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleTabClick = (tabName: string, path: string) => {
        setActiveTab(tabName);
        router.push(path);
    };

    const toggleCollapsible = (index: number) => {
        const newIsOpenArray = [...isOpenArray];
        newIsOpenArray[index] = !newIsOpenArray[index];
        setIsOpenArray(newIsOpenArray);
    };

    return (
        <div className={`${styles.tabComps} ${isCollapsed ? styles.collapsed : ''}`}>
            {/* Header Section */}
            <div>
                <button className={styles.collapseButton} onClick={handleCollapseClick}>
                    {isCollapsed ? (
                        <Image className={styles.collapseIconRight} alt='Collapse Icon Right' src="/icons/collapse-right.svg" width={8} height={8} />
                    ) : (
                        <Image className={styles.collapseIconLeft} alt="Collapse Icon Left" src="/icons/collapse-left.svg" width={8} height={8} />
                    )}
                </button>
            </div>

            <div className={styles.logo}>
                <div className={styles.phoduClubSymbol}>
                    <p className={styles.theSymbol}>P</p>
                </div>
                <div className={styles.phoduLogo}>
                    <p className={styles.phodu}>phodu<span className={styles.club}>.club</span></p>
                    <p className='text-sm text-[#98A2B3] font-normal'>Admin</p>
                </div>
            </div>

            <div className={styles.divider}>
                <hr className={styles.actualDivider} />
            </div>

            {/* Tabs Section */}
            <div className={styles.tabs}>
                {/* Dashboard Button */}
                <div className={styles.tooltip}>
                    <button
                        onClick={() => handleTabClick('dashboard', '/admin/dashboard')}
                        className={`flex flex-row w-full rounded-md mb-2 py-2 px-3 ${activeTab === 'dashboard' ? 'bg-[#7400E0]' : 'hover:bg-[#e1ffe11a]'}`}
                    >
                        <Image className='mr-2' src={activeTab === 'dashboard' ? "/icons/admin-dashboard.svg" : "/icons/admin-dashboard-2.svg"}
                            width={22} height={22} alt="Dashboard Icon"
                        />
                        {!isCollapsed && <p className={`${activeTab === 'dashboard' ? 'text-white' : 'text-[#AAAAAA]'}`}>Dashboard</p>}
                        {isCollapsed && <div className={styles.tooltipText}>Dashboard</div>}
                    </button>
                </div>

                {/* Content Collapsible */}
                <div className={styles.tooltip}>
                    <Collapsible
                        trigger={
                            <div className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-[#e1ffe11a]" onClick={() => toggleCollapsible(0)}>
                                <div className='flex flex-row'>
                                    <Image className='mr-2' src={activeTab === 'content' ? "/icons/admin-content.svg" : "/icons/admin-content-2.svg"}
                                        width={22} height={22} alt="Content Icon"
                                    />
                                    {!isCollapsed && <span className={`${activeTab === 'content' ? 'text-white' : 'text-[#AAAAAA]'}`}>Content</span>}
                                </div>
                                {isCollapsed && <div className={styles.tooltipText}>Content</div>}
                                {!isCollapsed && <Image src={isOpenArray[0] ? "/icons/arrowdown.svg" : "/icons/arrowup.svg"} width={24} height={24} alt="arrow" />}
                            </div>
                        }
                        open={isOpenArray[0]}
                        transitionTime={350}
                    >
                        {/* Quizzes Management */}
                        <button
                            onClick={() => handleTabClick('quizzesmanagement', '/admin/content/quizzesmanagement')}
                            className={`mt-2 ${styles.CommunitiesButton} ${activeTab === 'quizzesmanagement' ? styles.active : ''}`}
                        >
                            {!isCollapsed && <p className="w-full pl-9 text-[#AAAAAA] text-[13px] text-left py-2 px-3 hover:bg-[#444444]">Quizzes Management</p>}
                        </button>
                        {/* Test Series Management */}
                        <button
                            onClick={() => handleTabClick('testseriesmanagement', '/admin/content/testseriesmanagement')}
                            className={`${styles.CommunitiesButton} ${activeTab === 'testseriesmanagement' ? styles.active : ''}`}
                        >
                            {!isCollapsed && <p className="w-full pl-9 text-[#AAAAAA] text-[13px] text-left py-2 px-3 hover:bg-[#444444]">Test Series Management</p>}
                        </button>
                        {/* Course Creation */}
                        <button
                            onClick={() => handleTabClick('coursecreation', '/admin/content/coursecreation')}
                            className={`${styles.CommunitiesButton} ${activeTab === 'coursecreation' ? styles.active : ''}`}
                        >
                            {!isCollapsed && <p className="w-full pl-9 text-[#AAAAAA] text-[13px] text-left py-2 px-3 hover:bg-[#444444]">Course Creation</p>}
                        </button>
                    </Collapsible>
                </div>

                {/* Role Management Button */}
                <div className={styles.tooltip}>
                    <button
                        onClick={() => handleTabClick('rolemanagement', '/admin/rolemanagement')}
                        className={`flex flex-row w-full rounded-md mb-2 py-2 px-3 ${activeTab === 'rolemanagement' ? 'bg-[#7400E0]' : 'hover:bg-[#e1ffe11a]'}`}
                    >
                        <Image className='mr-2' src={activeTab === 'rolemanagement' ? "/icons/Role Management.svg" : "/icons/Role Management-2.svg"} width={22} height={22} alt="rolemanagement Icon" />
                        {!isCollapsed && <p className={`${activeTab === 'rolemanagement' ? 'text-white' : 'text-[#AAAAAA]'}`}>Role Management</p>}
                    </button>
                    {isCollapsed && <div className={styles.tooltipText}>Role Management</div>}
                </div>

                {/* Learn CMS Button */}
                <div className={styles.tooltip}>
                    <button
                        onClick={() => handleTabClick('marketingintegration', '/admin/marketingintegration')}
                        className={`flex flex-row w-full rounded-md text-left py-2 px-3 ${activeTab === 'marketingintegration' ? 'bg-[#7400E0]' : 'hover:bg-[#e1ffe11a]'}`}
                    >
                        <Image className='mr-2' src={activeTab === '' ? "/icons/Marketing Integration.svg" : "/icons/Marketing Integration-2.svg"} width={22} height={22} alt="marketingintegration Icon" />
                        {!isCollapsed && <p className={`${activeTab === 'marketingintegration' ? 'text-white' : 'text-[#AAAAAA]'}`}>Marketing Integration</p>}
                    </button>
                    {isCollapsed && <div className={styles.tooltipText}>Marketing Integration</div>}
                </div>
            </div>
        </div>
    );
}

export default TabComps;
