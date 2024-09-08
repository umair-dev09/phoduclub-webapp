
// "use client";

// import styles from './TabComps.module.css';
// import Image from 'next/image';
// import { useRouter, usePathname } from 'next/navigation';
// import { useState, useEffect } from 'react';

// function TabComps() {
//     const router = useRouter();
//     const pathname = usePathname();
//     const [isCollapsed, setIsCollapsed] = useState(() => {
//         const savedState = localStorage.getItem('isSidebarCollapsed');
//         return savedState === 'true';
//     });

//     useEffect(() => {
//         if (typeof window !== 'undefined') {
//             const savedState = localStorage.getItem('isSidebarCollapsed');
//             setIsCollapsed(savedState === 'true');
//         }
//     }, []);
//     const [activeTab, setActiveTab] = useState<string>('');

//     useEffect(() => {
//         if (pathname) {
//             const currentPath = pathname.split('/')[1];
//             setActiveTab(currentPath || 'dashboard');
//         }
//     }, [pathname]);

//     useEffect(() => {
//         localStorage.setItem('isSidebarCollapsed', isCollapsed.toString());
//     }, [isCollapsed]);

//     const handleCollapseClick = () => {
//         setIsCollapsed(!isCollapsed);
//     };

//     const handleTabClick = (tabName: string, path: string) => {
//         setActiveTab(tabName);
//         router.push(path);
//     };

//     return (
//         <div className={`${styles.tabComps} ${isCollapsed ? styles.collapsed : ''}`}>
//             <div>
//                 <button className={styles.collapseButton} onClick={handleCollapseClick}>
//                     {isCollapsed ? (
//                         <Image className={styles.collapseIconRight} alt='Collapse Icon Right' src="/icons/collapse-right.svg" width={8} height={8} />
//                     ) : (
//                         <Image className={styles.collapseIconLeft} alt="Collapse Icon Left" src="/icons/collapse-left.svg" width={8} height={8} />
//                     )}
//                 </button>
//             </div>
//             <div className={styles.logo}>
//                 <div className={styles.phoduClubSymbol}>
//                     <p className={styles.theSymbol}>P</p>
//                 </div>
//                 <div className={styles.phoduLogo}>
//                     <p className={styles.phodu}>phodu<span className={styles.club}>.club</span></p>
//                 </div>
//             </div>
//             <div className={styles.divider}>
//                 <hr className={styles.actualDivider} />
//             </div>
//             <div className={styles.tabs}>
//                 <button
//                     onClick={() => handleTabClick('dashboard', '/dashboard')}
//                     className={`${styles.DashboardButton} ${activeTab === 'dashboard' ? styles.active : ''}`}
//                 >
//                     <Image className={styles.dashboardIcon} src={activeTab === 'dashboard' ? "/icons/dashboard.svg" : "/icons/dashboard-2.svg"}
//                         width={22} height={22} alt="Dashboard Icon"
//                     />
//                     {!isCollapsed && <p className={styles.text}>Dashboard</p>}
//                 </button>
//                 <button
//                     onClick={() => handleTabClick('learn', '/learn')}
//                     className={`${styles.LearnButton} ${activeTab === 'learn' ? styles.active : ''}`}
//                 >
//                     <Image className={styles.learnIcon} src={activeTab === 'learn' ? "/icons/learn.svg" : "/icons/learn-2.svg"}
//                         width={22} height={22} alt="Learn Icon" />
//                     {!isCollapsed && <p className={styles.text}>Learn</p>}
//                 </button>
//                 <button
//                     onClick={() => handleTabClick('community', '/community')}
//                     className={`${styles.CommunitiesButton} ${activeTab === 'community' ? styles.active : ''}`}
//                 >
//                     <Image className={styles.communitiesIcon}
//                         src={activeTab === 'community' ? "/icons/community.svg" : "/icons/community-2.svg"}
//                         width={22} height={22} alt="Communities Icon"
//                     />
//                     {!isCollapsed && <p className={styles.text}>Communities</p>}
//                 </button>
//                 <button
//                     onClick={() => handleTabClick('analytics', '/analytics')}
//                     className={`${styles.AnalyticsButton} ${activeTab === 'analytics' ? styles.active : ''}`}
//                 >
//                     <Image className={styles.analyticsIcon}
//                         src={activeTab === 'analytics' ? "/icons/analytics.svg" : "/icons/analytics-2.svg"}
//                         width={22} height={22} alt="Analytics Icon"
//                     />
//                     {!isCollapsed && <p className={styles.text}>Analytics</p>}
//                 </button>
//                 <button
//                     onClick={() => handleTabClick('settings', '/settings/profile')}
//                     className={`${styles.SettingsButton} ${activeTab === 'settings' ? styles.active : ''}`}
//                 >
//                     <Image className={styles.settingsIcon} src={activeTab === 'settings' ? "/icons/settings.svg" : "/icons/settings-2.svg"}
//                         width={22} height={22} alt="Settings Icon"
//                     />
//                     {!isCollapsed && <p className={styles.text}>Settings</p>}
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default TabComps;
"use client";

import styles from './TabComps.module.css';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

function TabComps() {
    const router = useRouter();
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(() => {
        const savedState = localStorage.getItem('isSidebarCollapsed');
        return savedState === 'true';
    });

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
        localStorage.setItem('isSidebarCollapsed', isCollapsed.toString());
    }, [isCollapsed]);

    const handleCollapseClick = () => {
        setIsCollapsed(!isCollapsed);
    };

    const handleTabClick = (tabName: string, path: string) => {
        setActiveTab(tabName);
        router.push(path);
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
                        onClick={() => handleTabClick('dashboard', '/dashboard')}
                        className={`${styles.DashboardButton} ${activeTab === 'dashboard' ? styles.active : ''}`}
                    >
                        <Image className={styles.dashboardIcon} src={activeTab === 'dashboard' ? "/icons/dashboard.svg" : "/icons/dashboard-2.svg"}
                            width={22} height={22} alt="Dashboard Icon"
                        />
                        {!isCollapsed && <p className={styles.text}>Dashboard</p>}
                    </button>
                    <div className={styles.tooltipText}>Dashboard</div>
                </div>
                <div className={styles.tooltip}>
                    <button
                        onClick={() => handleTabClick('learn', '/learn')}
                        className={`${styles.LearnButton} ${activeTab === 'learn' ? styles.active : ''}`}
                    >
                        <Image className={styles.learnIcon} src={activeTab === 'learn' ? "/icons/learn.svg" : "/icons/learn-2.svg"}
                            width={22} height={22} alt="Learn Icon" />
                        {!isCollapsed && <p className={styles.text}>Learn</p>}
                    </button>
                    <div className={styles.tooltipText}>Learn</div>
                </div>
                <div className={styles.tooltip}>
                    <button
                        onClick={() => handleTabClick('community', '/community')}
                        className={`${styles.CommunitiesButton} ${activeTab === 'community' ? styles.active : ''}`}
                    >
                        <Image className={styles.communitiesIcon}
                            src={activeTab === 'community' ? "/icons/community.svg" : "/icons/community-2.svg"}
                            width={22} height={22} alt="Communities Icon"
                        />
                        {!isCollapsed && <p className={styles.text}>Communities</p>}
                    </button>
                    <div className={styles.tooltipText}>Communities</div>
                </div>
                <div className={styles.tooltip}>
                    <button
                        onClick={() => handleTabClick('analytics', '/analytics')}
                        className={`${styles.AnalyticsButton} ${activeTab === 'analytics' ? styles.active : ''}`}
                    >
                        <Image className={styles.analyticsIcon}
                            src={activeTab === 'analytics' ? "/icons/analytics.svg" : "/icons/analytics-2.svg"}
                            width={22} height={22} alt="Analytics Icon"
                        />
                        {!isCollapsed && <p className={styles.text}>Analytics</p>}
                    </button>
                    <div className={styles.tooltipText}>Analytics</div>
                </div>
                <div className={styles.tooltip}>
                    <button
                        onClick={() => handleTabClick('settings', '/settings/profile')}
                        className={`${styles.SettingsButton} ${activeTab === 'settings' ? styles.active : ''}`}
                    >
                        <Image className={styles.settingsIcon} src={activeTab === 'settings' ? "/icons/settings.svg" : "/icons/settings-2.svg"}
                            width={22} height={22} alt="Settings Icon"
                        />
                        {!isCollapsed && <p className={styles.text}>Settings</p>}
                    </button>
                    <div className={styles.tooltipText}>Settings</div>
                </div>
            </div>
        </div>
    );
}

export default TabComps;
