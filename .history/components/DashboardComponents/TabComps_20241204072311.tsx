// "use client"; // This marks the component as a Client Component

// import styles from '../../components/DashboardComponents/TabComps.module.css';
// import Image from 'next/image';
// import { useRouter, usePathname } from 'next/navigation';
// import { useState, useEffect } from 'react';

// function TabComps() {
//     const router = useRouter();
//     const pathname = usePathname();
//     const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

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
//         if (typeof window !== 'undefined') {
//             localStorage.setItem('isSidebarCollapsed', isCollapsed.toString());
//         }
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
//                 <div className={styles.tooltip}>
//                     <button
//                         onClick={() => handleTabClick('dashboard', '/dashboard')}
//                         className={`${styles.DashboardButton} ${activeTab === 'dashboard' ? styles.active : ''}`}
//                     >
//                         <Image className={styles.dashboardIcon} src={activeTab === 'dashboard' ? "/icons/dashboard.svg" : "/icons/dashboard-2.svg"}
//                             width={22} height={22} alt="Dashboard Icon"
//                         />
//                         {!isCollapsed && <p className={styles.text}>Dashboard</p>}
//                         {isCollapsed && (
//                             <div className={styles.tooltipText}>Dashboard</div>
//                         )}
//                     </button>
//                 </div>

//                                 <div className={styles.tooltip}>
//                 <button
//                     onClick={() => handleTabClick('learn', '/learn/courses')}
//                     className={`${styles.LearnButton} ${activeTab === 'learn' ? styles.active : ''}`}
//                 >
//                     <Image className={styles.learnIcon} src={activeTab === 'learn' ? "/icons/learn.svg" : "/icons/learn-2.svg"}
//                         width={22} height={22} alt="Learn Icon" />
//                     {!isCollapsed && <p className={styles.text}>Learn</p>}
//                 </button>
//                 {isCollapsed && (
//                     <div className={styles.tooltipText}>Learn</div>
//                 )}
//                 </div>

//                 <div className={styles.tooltip}>
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
//                 {isCollapsed && (
//                     <div className={styles.tooltipText}>Communities</div>
//                 )}
//                 </div>

//                 <div className={styles.tooltip}>
//                 <button
//                     onClick={() => handleTabClick('analytics', '/analytics/test-series')}
//                     className={`${styles.AnalyticsButton} ${activeTab === 'analytics' ? styles.active : ''}`}
//                 >
//                     <Image className={styles.analyticsIcon}
//                         src={activeTab === 'analytics' ? "/icons/analytics.svg" : "/icons/analytics-2.svg"}
//                         width={22} height={22} alt="Analytics Icon"
//                     />
//                     {!isCollapsed && <p className={styles.text}>Analytics</p>}
//                 </button>
//                 {isCollapsed && (
//                     <div className={styles.tooltipText}>Analytics</div>
//                 )}
//                 </div>

//                 <div className={styles.tooltip}>
//                 <button
//                     onClick={() => handleTabClick('settings', '/settings/profile')}
//                     className={`${styles.SettingsButton} ${activeTab === 'settings' ? styles.active : ''}`}
//                 >
//                     <Image className={styles.settingsIcon} src={activeTab === 'settings' ? "/icons/settings.svg" : "/icons/settings-2.svg"}
//                         width={22} height={22} alt="Settings Icon"
//                     />
//                     {!isCollapsed && <p className={styles.text}>Settings</p>}
//                 </button>
//                 {isCollapsed && (
//                     <div className={styles.tooltipText}>Settings</div>
//                 )}
//                 </div>

//             </div>
//         </div>
//     );
// }

// export default TabComps;

"use client";
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Tooltip } from "@nextui-org/react";

function TabComps() {

    const router = useRouter();
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeTab, setActiveTab] = useState('');

    useEffect(() => {
        const savedState = localStorage.getItem('isSidebarCollapsed');
        setIsCollapsed(savedState === 'true');
    }, []);

    useEffect(() => {
        localStorage.setItem('isSidebarCollapsed', isCollapsed.toString());
    }, [isCollapsed]);



    const handleTabClick = (tabName: string, path: string) => {
        setActiveTab(tabName);
        router.push(path);
    };

    // useEffect(() => {
    //     if (pathname) {
    //         const pathParts = pathname.split('/');
    //         const currentPath = pathParts[2];
    //         const subPath = pathParts[3];

    //         // Set active tab for both main sections and subsections
    //         if (subPath && currentPath === 'content') {
    //             setActiveTab(subPath);
    //         } else {
    //             setActiveTab(currentPath || 'dashboard');
    //         }
    //     }
    // }, [pathname]);
    useEffect(() => {
        if (pathname) {
            const currentPath = pathname.split('/')[1];
            setActiveTab(currentPath || 'dashboard');
        }
    }, [pathname]);

    const handleCollapseClick = () => {
        setIsCollapsed(!isCollapsed);
    };



    const renderButtonWith = (
        label: string,
        icon: string,
        activeIcon: string,
        isActive: boolean,
        onClick: () => void
    ) => (
        <div className="relative group">
            {isCollapsed ? (
                <Tooltip
                    content={label}
                    placement="right"
                    offset={15}
                    closeDelay={100}
                    classNames={{
                        content: [
                            "bg-[#222222] text-white text-sm py-2 px-4 rounded-md",
                        ],
                    }}
                >
                    <button
                        onClick={onClick}
                        className={`flex w-full py-2 px-3 text-[14px] text-left font-normal rounded-md mb-2 transition-all 
                        ${isActive ? 'bg-[#7400E0] text-white' : 'hover:bg-[#e1ffe11a] text-[#AAAAAA]'}`}
                    >
                        <Image
                            src={isActive ? activeIcon : icon}
                            width={22}
                            height={22}
                            alt={`${label} Icon`}
                        />
                    </button>
                </Tooltip>
            ) : (
                <button
                    onClick={onClick}
                    className={`flex w-full py-2 px-3 text-[14px] text-left font-normal rounded-md mb-2 transition-all h-auto overflow-hidden
                    ${isActive ? 'bg-[#7400E0] text-white' : 'hover:bg-[#e1ffe11a] text-[#AAAAAA]'}`}
                >
                    <Image
                        src={isActive ? activeIcon : icon}
                        width={22}
                        height={22}
                        alt={`${label} Icon`}
                    />
                    {!isCollapsed && <span className="ml-2 whitespace-nowrap">{label}</span>}
                </button>
            )}
        </div>
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
            <div className='overflow-hidden'>
                <p className={`items-center justify-center w-10 h-10 mt-3 mb-[0.73rem] ml-[0.2rem] text-white font-bold bg-[#3c2f40] rounded-[0.375rem] transition-all ${isCollapsed ? 'flex' : 'hidden'}`}>P</p>
                <div className={`flex-col mt-2 mb-[0.475rem] ml-2 transition-all ${!isCollapsed ? 'flex' : 'hidden'}`}>
                    <p className='text-white text-lg font-bold'>phodu<span className='text-[#e29ff5] text-lg font-bold'>.club</span></p>
                    <p className='text-sm text-[#98A2B3] font-normal'>Admin</p>
                </div>
            </div>

            {/* Divider */}
            <hr className="border-t border-gray-700 mb-4" />




            {/* Additional Tabs */}
            {renderButtonWith('Dashboard', '/icons/dashboard.svg', '/icons/dashboard-2.svg', activeTab === 'dashboard', () => handleTabClick('dashboard', '/dashboard'))}
            {renderButtonWith('Marketing Integration', '/icons/Marketing Integration-2.svg', '/icons/Marketing Integration.svg', activeTab === 'marketingintegration', () => handleTabClick('marketingintegration', '/admin/marketingintegration'))}
            {renderButtonWith('User Database', '/icons/community-2.svg', '/icons/community.svg', activeTab === 'userdatabase', () => handleTabClick('userdatabase', '/admin/userdatabase'))}
            {renderButtonWith('Customer Care', '/icons/community-2.svg', '/icons/community.svg', activeTab === 'customercare', () => handleTabClick('customercare', '/admin/customercare'))}

        </div>
    );
}

export default TabComps;

