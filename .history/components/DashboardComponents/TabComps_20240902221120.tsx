"use client";

import styles from './TabComps.module.css';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Icon } from '@/components/Icon';

function TabComps() {
    const router = useRouter();
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeTab, setActiveTab] = useState<string>('');

    useEffect(() => {
        if (pathname) {
            const currentPath = pathname.split('/')[1]; // Get the first part of the path
            setActiveTab(currentPath || 'dashboard'); // Default to 'dashboard' if path is empty OR CURRENT PATH
        }
    }, [pathname]);

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
                        <Image className={styles.collapseIconRight} alt='collapseIconRight' src="/icons/collapseIconRight.png" width={10} height={10} />
                    ) : (
                        <Image className={styles.collapseIconLeft} alt="collapseIconLeft" src="/icons/collapse-icon.svg" width={12} height={12} />
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
                <button
                    onClick={() => handleTabClick('dashboard', '/dashboard')}
                    className={`${styles.DashboardButton} ${activeTab === 'dashboard' ? styles.active : ''}`}
                >
                    <Image className={styles.dashboardIcon} src="/icons/dashboard.svg" width={22} height={22} alt="dashboard Icon" />
                    {!isCollapsed && <p className={styles.text}>Dashboard</p>}
                </button>
                <button
                    onClick={() => handleTabClick('learn', '/learn')}
                    className={`${styles.LearnButton} ${activeTab === 'learn' ? styles.active : ''}`}
                >
                    <Image className={styles.learnIcon} src="/icons/learn.svg" width={22} height={22} alt="Learn Icon" />

                    {!isCollapsed && <p className={styles.text}>Learn</p>}
                </button>
                <button
                    onClick={() => handleTabClick('community', '/community')}
                    className={`${styles.CommunitiesButton} ${activeTab === 'community' ? styles.active : ''}`}
                >
                    <Image className={styles.communitiesIcon} src="/icons/community.svg" width={22} height={22} alt="Communities Icon" />
                    {!isCollapsed && <p className={styles.text}>Communities</p>}
                </button>
                <button
                    onClick={() => handleTabClick('analytics', '/analytics')}
                    className={`${styles.AnalyticsButton} ${activeTab === 'analytics' ? styles.active : ''}`}
                >
                    <Image className={styles.analyticsIcon} src="/icons/Analytics.svg" width={22} height={22} alt="Analytics Icon" />
                    {!isCollapsed && <p className={styles.text}>Analytics</p>}
                </button>
                <button
                    onClick={() => handleTabClick('settings', '/settings/profile')}
                    className={`${styles.SettingsButton} ${activeTab === 'settings' ? styles.active : ''}`}
                >
                    <Image className={styles.settingsIcon} src="/icons/settings-03.svg" width={22} height={22} alt="Settings Icon" />
                    {!isCollapsed && <p className={styles.text}>Settings</p>}
                </button>
            </div>
        </div>
    );
}

export default TabComps;
