"use client";

import styles from './TabComps.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function TabComps() {
    const router = useRouter();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeTab, setActiveTab] = useState('dashboard'); // State to track the active tab

    const handleCollapseClick = () => {
        setIsCollapsed(!isCollapsed);
    };

    // Function to handle tab clicks and set the active tab
    const handleTabClick = (tabName, path) => {
        setActiveTab(tabName);  // Update active tab state
        router.push(path);      // Navigate to the desired path
    };

    return (
        <div className={`${styles.tabComps} ${isCollapsed ? styles.collapsed : ''}`}>
            <div className={styles.collapseButton}>
                <button className={styles.collapseIcon} onClick={handleCollapseClick}>{isCollapsed ? '>' : '<'}</button>
            </div>
            {!isCollapsed && (
                <>
                    <div className={styles.logo}>
                        <div className={styles.phoduClubSymbol}>
                            <p className={styles.theSymbol}>P</p>
                        </div>
                        <div className={styles.phoduLogo}>
                            <p className={styles.phodu}>phodu<span className={styles.club}>.club</span></p>
                        </div>
                    </div>
                    <div className={styles.divider}>
                        <hr />
                    </div>
                    <div className={styles.tabs}>
                        <button 
                            onClick={() => handleTabClick('dashboard', '/dashboard')}
                            className={`${styles.DashboardButton} ${activeTab === 'dashboard' ? styles.active : ''}`}
                        >
                            <Image className={styles.dashboardIcon} src="/icons/dashboard-speed-02.png" width={20} height={20} alt="Dashboard Icon" />
                            <p className={styles.text}>Dashboard</p>
                        </button>
                        <button 
                            onClick={() => handleTabClick('learn', '/learn')}
                            className={`${styles.LearnButton} ${activeTab === 'learn' ? styles.active : ''}`}
                        >
                            <Image className={styles.learnIcon} src="/icons/book-open-01.png" width={20} height={20} alt="Learn Icon"/>           
                            <p className={styles.text}>Learn</p>
                        </button>
                        <button 
                            onClick={() => handleTabClick('community', '/community')}
                            className={`${styles.CommunitiesButton} ${activeTab === 'community' ? styles.active : ''}`}
                        >
                            <Image className={styles.communitiesIcon} src="/icons/community-icon.png" width={20} height={20} alt="Communities Icon"/>
                            <p className={styles.text}>Communities</p>
                        </button>
                        <button 
                            onClick={() => handleTabClick('analytics', '/analytics')}
                            className={`${styles.AnalyticsButton} ${activeTab === 'analytics' ? styles.active : ''}`}
                        >
                            <Image className={styles.analyticsIcon} src="/icons/analytics-icon.png" width={20} height={20} alt="Analytics Icon"/>
                            <p className={styles.text}>Analytics</p>
                        </button>
                        <button 
                            onClick={() => handleTabClick('settings', '/settings')}
                            className={`${styles.SettingsButton} ${activeTab === 'settings' ? styles.active : ''}`}
                        >
                            <Image className={styles.settingsIcon} src="/icons/settings-03.png" width={20} height={20} alt="Settings Icon"/>
                            <p className={styles.text}>Settings</p>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default TabComps;
