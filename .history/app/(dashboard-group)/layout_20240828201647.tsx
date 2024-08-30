'use client';
import { useState } from "react";
import Link from "next/link";
import "./layout.css";
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface DashboardGroupProps {
    children: ReactNode;
}

export default function DashboardGroup({ children }: DashboardGroupProps) {
    const pathname = usePathname();
    const [isCollapsedSidebar, setIsCollapsedSidebar] = useState<boolean>(false);

    const toggleSidebarCollapseHandler = () => {
        setIsCollapsedSidebar((prev) => !prev);
    }



    return (
        <div className="body">
            <div className="side_bar" data-collapse={isCollapsedSidebar}>
                <button
                    onClick={toggleSidebarCollapseHandler}
                    className={`sidebar-toggle-button ${isCollapsedSidebar ? 'rotate' : ''}`}
                >
                    <div className="sidebar-icon">&#60;</div>
                </button>

                <div className="tabs" data-collapse={isCollapsedSidebar}>
                    <div className="logo">
                        <div className="phodu-club symbol">
                            <Image
                                className="phodu-icon"
                                src="/icons/phodu_logo.png"
                                width={350}
                                height={350}
                                alt="phodu-club symbol"
                            />
                        </div>
                        <div className="phodu-logo">
                            <p className="phodu">phodu<span id="club">.club</span></p>
                        </div>
                    </div>
                    <div className="divider"><hr className="divider-line" /></div>

                    <Link href="/dashboard">
                        <div className={`dashboard ${pathname === '/dashboard' ? 'active' : ''}`}>
                            <Image
                                className="dashboard-icon"
                                src="/icons/dashboard-speed-02.png"
                                width={20}
                                alt="Dashboard Icon"
                                height={20}
                            />
                            <span className="text-label">Dashboard</span>
                        </div>
                    </Link>

                    <Link href="/learn">
                        <div className={`learn ${pathname === '/learn' ? 'active' : ''}`}>
                            <Image
                                className="learn-icon"
                                src="/icons/book-open-01.png"
                                width={20}
                                height={20}
                                alt="learn-icon"
                            />
                            <span className="text-label">Learn</span>
                        </div>
                    </Link>

                    <Link href="/community">
                        <div className={`communities ${pathname === '/community' ? 'active' : ''}`}>
                            <Image
                                className="community-icon"
                                src="/icons/user-group.png"
                                width={20}
                                height={20}
                                alt="community-icon"
                            />
                            <span className="text-label">Community</span>
                        </div>
                    </Link>

                    <Link href="/analytics">
                        <div className={`analytics ${pathname === '/analytics' ? 'active' : ''}`}>
                            <Image
                                className="analytics-icon"
                                src="/icons/pie-chart.png"
                                width={20}
                                height={20}
                                alt="analytics-icon"
                            />
                            <span className="text-label">Analytics</span>
                        </div>
                    </Link>

                    <Link href="/settings">
                        <div className={`settings ${pathname === '/settings' ? 'active' : ''}`}>
                            <Image
                                className="setting-icon"
                                src="/icons/settings-03.png"
                                width={20}
                                height={20}
                                alt="setting-icon"
                            />
                            <span className="text-label">Settings</span>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="contents">
                <div className="content-box">
                    <div className="headtab">
                        <div className="greeting">
                            <p><span id="hi">Hey, <span>Siraj Dhanani</span>,</span> Keep up the great work!</p>
                        </div>
                        <div className="notify">
                            <Image
                                src="/icons/notify.png"
                                alt="Notifly Bar"
                                width={35}
                                height={35}
                            />
                        </div>
                        <div className="Question Mark">
                            <Image
                                className="Question Mark"
                                src="/icons/questionMark.png"
                                alt="questionMark Bar"
                                width={41}
                                height={41}
                            />
                        </div>
                        <div className="dp"><p className="actual-dp">JS</p></div>
                        <div className="info">
                            <div className="name">John Smith</div>
                            <div className="email">john@acme.com</div>
                        </div>
                    </div>
                    <div className="contents">
                        hi
                    </div>
                    <div className="variable-contents">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
