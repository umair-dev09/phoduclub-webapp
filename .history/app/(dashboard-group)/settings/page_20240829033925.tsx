'use client';
import "./setting.css";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface SettingsLayoutProps {
    children: ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
    const pathname = usePathname();

    return (
        <div className="content">
            <div className="content1-box">
                <Link href="/settings/profile">
                    <div className={`settings-sidebar-item ${pathname === '/settings/my-profile' ? 'active' : ''}`}>
                        <Image
                            className="profile-icon"
                            src="/icons/profile-icon.png"
                            alt="Profile Icon"
                            width={24}
                            height={24}
                        />
                        My Profile
                    </div>
                </Link>
                <Link href="/settings/purchase">
                    <div className={`settings-sidebar-item ${pathname === '/settings/purchase' ? 'active' : ''}`}>
                        <Image
                            className="purchase-icon"
                            src="/icons/purchase-icon.png"
                            alt="Purchase Icon"
                            width={22}
                            height={22}
                        />
                        Purchase History
                    </div>
                </Link>
            </div>
            <main className="settings-content">
                {children}
            </main>
        </div>
    );
}
