"use client";

import { ReactNode } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "./ContentBox1.module.css";

function contentBox1() {
    const router = useRouter();

    return (
        <Button>
            <div>
                <Image
                    className={styles.profile-icon}
                    src="/icons/profile-icon.png"
                    alt="Profile Icon"
                    width={24}
                    height={24}
                />
                <p className="text">My Profile</p>
            </div>
        </Button >
        <Button>
            <div className={`purchase-history  ${pathname === '/settings/purchase' ? 'active' : ''}`}>
                <Image
                    className={styles.purchase-icon}
                    src="/icons/purchase-icon.png"
                    alt="Purchase Icon"
                    width={24}
                    height={24}
                />
                <p className="text">Purchase History</p>
            </div>
        </Button>
    );
}