"use client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./ContentBox1.module.css";

function ContentBox1() {
    const pathname = usePathname();
    const router = useRouter();
    // Get the current pathname


    const handleTabClick = (path: string) => {
        router.push(path);
    };

    return (
        <div className={styles.container}>
            <div>
                <button
                    className={`${styles.profileButton} ${pathname === '/profile' ? styles.active : ''}`}
                    onClick={() => handleTabClick('/profile')}
                >
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
                <button
                    className={`${styles.purchaseButton} ${pathname === '/purchase' ? styles.active : ''}`}
                    onClick={() => handleTabClick('/purchase')}
                >
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
