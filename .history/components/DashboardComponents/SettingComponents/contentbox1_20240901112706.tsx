"use client";

import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import styles from "./ContentBox1.module.css";
import { useState } from "react";


function ContentBox1() {
    const [activeTab, setActiveTab] = useState<string>('purchase');
    const router = useRouter();
    const pathname = usePathname();
    const handleTabClick = (tabName: string, path: string) => {
        setActiveTab(tabName);
        router.push(path);
    };


    return (
        <div className={styles.container}>
            <div>
                <button onClick={() => handleTabClick('profile', '/profile')}
                    className={`${styles.profileButton} ${activeTab === 'profile' ? styles.active : ''}`}>
                    <Image
                        className={styles.profileIcon}
                        src="/icons/profile-icon.png"
                        alt="Profile Icon"
                        width={24}
                        height={24}
                    />
                    <p className={styles.text}>My Profile</p>
                </button>
            </div >
            <div>
                <button onClick={() => handleTabClick('purchase', '/purchase')}
                    className={`${styles.purchaseButton} ${activeTab === 'purchase' ? styles.active : ''}`}>
                    <Image
                        className={styles.purchaseIcon}
                        src="/icons/purchase-icon.png"
                        alt="Purchase Icon"
                        width={24}
                        height={24}
                    />
                    <p className={styles.text}>Purchase History</p>
                </button>
            </div>
        </div >
    );
}
export default ContentBox1;
