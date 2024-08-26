'use client';
import Link from "next/link";
import "./layout.css";
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ReactNode, useState } from 'react';

interface DashboardGroupProps {
    children: ReactNode;
}

export default function DashboardGroup({ children }: DashboardGroupProps) {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className="body">
            <div className={`tabs ${isCollapsed ? 'collapsed' : ''}`}>
                <div className="logo">
                    <div className="phodu-logo">
                        <p className="phodu">phodu<span id="club">.club</span></p>
                    </div>

                    <div className="icon" onClick={toggleCollapse}>
                        <Image
                            className="collapse-icon"
                            src={isCollapsed ? "/icons/sidebar-right.png" : "/icons/sidebar-left.png"}
                            width={18}
                            alt="Collapse Icon"
                            height={12}
                        />
                    </div>
                </div>
                <div className="divider"><hr className="divider-line" /></div>

                <div className={`dashboard ${pathname === '/dashboard' ? 'active' : ''}`}>
                    <Image
                        className="dashboard-icon"
                        src="/icons/dashboard-speed-02.png"
                        width={20}
                        alt="Dashboard Icon"
                        height={20}
                    />
                    {!isCollapsed && <Link href="/dashboard">Dashboard</Link>}
                </div>

                <div className={`learn ${pathname === '/learn' ? 'active' : ''}`}>
                    <Image
                        className="learn-icon"
                        src="/icons/book-open-01.png"
                        width={20}
                        height={20}
                        alt="learn-icon"
                    />
                    {!isCollapsed && <Link href="/learn">Learn</Link>}
                </div>

                <div className={`communities ${pathname === '/community' ? 'active' : ''}`}>
                    <Image
                        className="community-icon"
                        src="/icons/user-group.png"
                        width={20}
                        height={20}
                        alt="learn-icon"
                    />
                    {!isCollapsed && <Link href="/community">Community</Link>}
                </div>

                <div className={`analytics ${pathname === '/analytics' ? 'active' : ''}`}>
                    <Image
                        className="analytics-icon"
                        src="/icons/pie-chart.png"
                        width={20}
                        height={20}
                        alt="learn-icon"
                    />
                    {!isCollapsed && <Link href="/analytics">Analytics</Link>}
                </div>

                <div className={`settings ${pathname === '/settings' ? 'active' : ''}`}>
                    <Image
                        className="setting-icon"
                        src="/icons/settings-03.png"
                        width={20}
                        height={20}
                        alt="setting-icon"
                    />
                    {!isCollapsed && <Link href="/settings">Settings</Link>}
                </div>
            </div>

            <div className="contents">
                <div className="content-box">
                    <div className="headtab">
                        <div className="greeting">
                            <p><span id="hi">Hey, <span>Siraj Dhanani</span>,</span> keep up the great work</p>
                        </div>
                        <div className="notify">
                            <Image
                                src="/icons/notify.png"
                                alt="Notify Icon"
                                width={35}
                                height={35}
                            />
                        </div>
                        <div className="Question Mark">
                            <Image
                                className="Question Mark"
                                src="/icons/questionMark.png"
                                alt="Question Mark Icon"
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
                    <div className="variable-contents">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
