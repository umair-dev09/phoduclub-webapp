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
    const [isOpenArray, setIsOpenArray] = useState([false, false, false]); // Initialize with false for each collapsible

    // Function to toggle a specific collapsible's state
    const toggleCollapsible = (index: number) => {
        const newIsOpenArray = [...isOpenArray];
        newIsOpenArray[index] = !newIsOpenArray[index]; // Toggle the specific index
        setIsOpenArray(newIsOpenArray);
    };

    return (
        <div className={`${styles.tabComps} ${isCollapsed ? styles.collapsed : ''}`}>
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
                </div>
            </div>
            <div className={styles.divider}>
                <hr className={styles.actualDivider} />
            </div>
            <div className={styles.tabs}>
                <div className={styles.tooltip}>
                    <button
                        onClick={() => handleTabClick('dashboard', '/admin/dashboard')}
                        className={`${styles.DashboardButton} ${activeTab === 'dashboard' ? styles.active : ''}`}
                    >
                        <Image className={styles.dashboardIcon} src={activeTab === 'dashboard' ? "/icons/dashboard.svg" : "/icons/dashboard-2.svg"}
                            width={22} height={22} alt="Dashboard Icon"
                        />
                        {!isCollapsed && <p className={styles.text}>Dashboard</p>}
                        {isCollapsed && (
                            <div className={styles.tooltipText}>Dashboard</div>
                        )}
                    </button>
                </div>


                <div className={styles.tooltip}>
                    <Collapsible
                        trigger={
                            <div className=''>
                                <div
                                    className="flex items-center justify-between relative"
                                    onClick={() => toggleCollapsible(0)} // Toggle first accordion
                                >

                                    <button>
                                        <span className=' text-[#a8afb7]'>Content</span>

                                    </button>
                                    {isCollapsed && (
                                        <div className={styles.tooltipText}>content</div>
                                    )}

                                    <Image
                                        src={isOpenArray[0] ? "/icons/arrowdown.svg" : "/icons/arrowup.svg"} // Arrow based on first accordion state
                                        width={24}
                                        height={24}
                                        alt="arrow"
                                    />
                                </div>
                            </div>
                        }
                        transitionTime={350}
                        onOpening={() => toggleCollapsible(0)}  // Set the state to open when expanding
                        onClosing={() => toggleCollapsible(0)} // Set the state to closed when collapsing
                    >
                        {/* First Button  QUIZZES MANAGEMENT*/}
                        <button
                            onClick={() => handleTabClick('quizzesmanagement', '/admin/content/quizzesmanagement')}
                            className={`${styles.CommunitiesButton} ${activeTab === 'quizzesmanagement' ? styles.active : ''}`}
                        >

                            {!isCollapsed && <p className="ml-9 text-[#F7F8FB]">Quizzes Management</p>}
                        </button>
                        {/* Second Button */}
                        <button
                            onClick={() => handleTabClick('testseriesmanagement', '/admin/content/testseriesmanagement')}
                            className={`${styles.CommunitiesButton} ${activeTab === 'testseriesmanagement' ? styles.active : ''}`}
                        >

                            {!isCollapsed && <p className="ml-9 text-[#F7F8FB]">Test Series Management</p>}
                        </button>
                        {/* third Button  */}
                        <button
                            onClick={() => handleTabClick('coursecreation', '/admin/content/coursecreation')}
                            className={`${styles.CommunitiesButton} ${activeTab === 'coursecreation' ? styles.active : ''}`}
                        >

                            {!isCollapsed && <p className="ml-9 text-[#F7F8FB]">Course Creation</p>}
                        </button>


                    </Collapsible>
                </div>

                <div className={styles.tooltip}>
                    <button
                        onClick={() => handleTabClick('usermangement', '/admin/usermangement')}
                        className={`${styles.CommunitiesButton} ${activeTab === 'usermangement' ? styles.active : ''}`}
                    >
                        <Image className={styles.communitiesIcon}
                            src={activeTab === 'usermangement' ? "/icons/community.svg" : "/icons/community-2.svg"}
                            width={22} height={22} alt="Communities Icon"
                        />
                        {!isCollapsed && <p className={styles.text}>User Management</p>}
                    </button>
                    {isCollapsed && (
                        <div className={styles.tooltipText}>User Management</div>
                    )}
                </div>

                <div className={styles.tooltip}>
                    <button
                        onClick={() => handleTabClick('learncms', '/admin/learncms')}
                        className={`${styles.AnalyticsButton} ${activeTab === 'learncms' ? styles.active : ''}`}
                    >
                        <Image className={styles.analyticsIcon}
                            src={activeTab === 'learncms' ? "/icons/analytics.svg" : "/icons/analytics-2.svg"}
                            width={22} height={22} alt="Analytics Icon"
                        />
                        {!isCollapsed && <p className={styles.text}>Learn CMS</p>}
                    </button>
                    {isCollapsed && (
                        <div className={styles.tooltipText}>Learn CMS</div>
                    )}
                </div>


            </div>
        </div>
    );
}

export default TabComps;


