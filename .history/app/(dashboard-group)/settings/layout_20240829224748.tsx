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
                    <div className={`my-profile  ${pathname === '/settings/profile' ? 'active' : ''}`}>
                        <Image
                            className="profile-icon"
                            src="/icons/user-circle (1).svg"
                            alt="Profile Icon"
                            width={24}
                            height={24}
                        />
                        <p className="text">My Profile</p>
                    </div>
                </Link>

                <Link href="/settings/purchase">
                    <div className={`purchase-history  ${pathname === '/settings/purchase' ? 'active' : ''}`}>
                        <Image
                            className="purchase-icon"
                            src="/icons/Vector (1).svg"
                            alt="Purchase Icon"
                            width={17}
                            height={17}
                        />
                        <p className="text">Purchase History</p>
                    </div>
                </Link>
            </div>
            <div className="content2-box">
                {children}
            </div>


        </div>
    );
}
