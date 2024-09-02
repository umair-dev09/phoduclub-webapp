"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./ContentBox1.module.css";

function ContentBox1() {
    const router = useRouter();
    const handleTabClick = (path: string, p0: string) => {

        router.push(path);
    };

    return (
        <div className={styles.container}>
            <div>
                <button className={styles.ProfileButton} onClick={() => handleTabClick('profile', '/profile')}>
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
                <button className={styles.PurchaseButton} onClick={() => handleTabClick('purchase', '/purchase')}>
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
    );
}

export default ContentBox1;;
