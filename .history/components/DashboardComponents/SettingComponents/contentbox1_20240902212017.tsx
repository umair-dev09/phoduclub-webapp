"use client";

import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import styles from "./ContentBox1.module.css";
import { useState, useEffect } from "react";


function ContentBox1() {
    const [activeTab, setActiveTab] = useState<string>('profile');
    const router = useRouter();
    const pathname = usePathname();
    const handleTabClick = (tabName: string, path: string) => {
        setActiveTab(tabName);
        router.push(path);
    };
    useEffect(() => {
        if (pathname) {
            const currentPath = pathname.split('/')[1]; // Get the first part of the path
            setActiveTab(currentPath || 'profile'); // Default to 'dashboard' if path is empty OR CURRENT PATH
        }
    }, [pathname]);


    return (
        <div className={styles.container}>
            <div>
                <button onClick={() => handleTabClick('profile', '/settings/profile')}
                    className={`${styles.profileButton} ${activeTab === 'profile' ? styles.active : ''}`}>
                    <Image
                        className={`${styles.profileIcon} ${pathname === '/profile' ? styles.activeIcon : ''}`}
                        src="/icons/profile-icon.png"
                        alt="Profile Icon"
                        width={25}
                        height={25}
                    />
                    <p className={styles.text}>My Profile</p>
                </button>
            </div >
            <div>
                <button onClick={() => handleTabClick('purchase', '/settings/purchase')}
                    className={`${styles.purchaseButton} ${activeTab === 'purchase' ? styles.active : ''}`}>
                    <Image
                        className={`${styles.purchaseIcon} ${pathname === '/purchase' ? styles.activeIcon : ''}`}
                        src="/icons/purchase-icon.png"
                        alt="Purchase Icon"
                        width={25}
                        height={25}
                    />
                    <p className={styles.text}>Purchase History</p>
                </button>
            </div>
        </div >
    );
}
export default ContentBox1;