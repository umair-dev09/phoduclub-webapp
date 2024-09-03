"use client";

import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import styles from "./ContentBox1.module.css";
import { useState, useEffect } from "react";


function ContentBox1() {
    const [activeTab, setActiveTab] = useState<string>('');
    const router = useRouter();
    const pathname = usePathname();
    const handleTabClick = (tabName: string, path: string) => {
        setActiveTab(tabName);
        router.push(path);
    };
    useEffect(() => {
        if (pathname) {
            const currentPath = pathname.split('/')[2]
            if (currentPath === 'profile') {
                setActiveTab('profile')
            } else if (currentPath === 'purchase') {
                setActiveTab('purchase')
            }
            else {
                setActiveTab('profile')
            }

        }
    }, [pathname]);



    return (
        <div className={styles.container}>
            <div>
                <button onClick={() => handleTabClick('profile', '/settings/profile')}
                    className={`${styles.profileButton} ${activeTab === 'profile' ? styles.active : ''}`}>
                    <Image
                        className={`${styles.profileIcon} ${pathname === '/profile' ? styles.activeIcon : ''}`}
                        src="/icons/profile.svg"
                        alt="Profile Icon"
                        width={24}
                        height={25}
                    />
                    <p className={styles.text1}>My Profile</p>
                </button>
            </div >
            <div>
                <button onClick={() => handleTabClick('purchase', '/settings/purchase')}
                    className={`${styles.purchaseButton} ${activeTab === 'purchase' ? styles.active : ''}`}>
                    <Image
                        className={`${styles.purchaseIcon} ${pathname === '/purchase' ? styles.activeIcon : ''}`}
                        src="/icons/purchase.svg"
                        alt="Purchase Icon"
                        width={25}
                        height={25}
                    />
                    <p className={styles.text2}>Purchase History</p>
                </button>
            </div>
        </div >
    );
}
export default ContentBox1;