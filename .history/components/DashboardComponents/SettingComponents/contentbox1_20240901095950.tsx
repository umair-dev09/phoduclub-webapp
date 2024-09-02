"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "./ContentBox1.module.css";

function contentBox1() {
    <Link href="/settings/profile">
        <div className={`my-profile  ${pathname === '/settings/profile' ? 'active' : ''}`}>
            <Image
                className="profile-icon"
                src="/icons/profile-icon.png"
                alt="Profile Icon"
                width={24}
                height={24}
            />
            <p className="text">My Profile</p>
        </div>
    </Link >
    <Link href="/settings/purchase">
        <div className={`purchase-history  ${pathname === '/settings/purchase' ? 'active' : ''}`}>
            <Image
                className="purchase-icon"
                src="/icons/purchase-icon.png"
                alt="Purchase Icon"
                width={24}
                height={24}
            />
            <p className="text">Purchase History</p>
        </div>
    </Link>
}