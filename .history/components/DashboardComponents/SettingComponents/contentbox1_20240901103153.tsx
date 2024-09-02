"use client";

import { ReactNode } from "react";
import { useRouter } from "next/router";


import Image from "next/image";
import styles from "./ContentBox1.module.css";

function contentBox1() {
    const router = useRouter();
    const handleTabClick = (tabName: string, path: string) => {
        setActiveTab(tabName);
        router.push(path);
    };


    return (
        <div className={styles.container}>
            <div>
                <button className={styles.profilebutton} onClick={() => handleTabClick('settings', '/profile')}>
                    <Image
                        className={styles.profileIcon}
                        src="/icons/profile-icon.png"
                        alt="Profile Icon"
                        width={24}
                        height={24}
                    />
                    <p className="text">My Profile</p>
                </button>
            </div >
            <div>
                <button className={styles.purchasebutton} onClick={() => handleTabClick('settings', '/purchase')}>
                    <Image
                        className={styles.purchaseIn}
                        src="/icons/purchase-icon.png"
                        alt="Purchase Icon"
                        width={24}
                        height={24}
                    />
                    <p className="text">Purchase History</p>
                </button>
            </div>
        </div >
    )

    export default contentBox1;;
}