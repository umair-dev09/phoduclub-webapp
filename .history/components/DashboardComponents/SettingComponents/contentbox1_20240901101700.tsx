"use client";

import { ReactNode } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "./ContentBox1.module.css";

function contentBox1() {
    const router = useRouter();
    const handleTabClick = (tabName: string, path: string) => {
        setActiveTab(tabName);
        router.push(path);
    };


    return (
        <div>
            <Button onClick={() => handleTabClick('settings', '/profile')}
        >
            <Image
                className={styles.profile - icon}
                src="/icons/profile-icon.png"
                alt="Profile Icon"
                width={24}
                height={24}
            />
            <p className="text">My Profile</p>
        </Button>
            </div >
            <div className={`purchase-history  ${pathname === '/settings/purchase' ? 'active' : ''}`}>
        <Button onClick={() => handleTabClick('settings', '/purchase')}
        >
                <Image
                    className={styles.purchase - icon}
                    src="/icons/purchase-icon.png"
                    alt="Purchase Icon"
                    width={24}
                    height={24}
                />
                <p className="text">Purchase History</p>
        </Button>
            </div>
    );
                <Image
                    className={styles.purchase-icon}
                    src="/icons/purchase-icon.png"
                    alt="Purchase Icon"
                    width={24}
                    height={24}
                />
                <p className="text">Purchase History</p>
            </div >
        </Button >
        </Button >
    );
                <Image
                    className={styles.purchase-icon}
                    src="/icons/purchase-icon.png"
                    alt="Purchase Icon"
                    width={24}
                    height={24}
                />
                <p className="text">Purchase History</p>
            </div >
        </Button >
    );
}