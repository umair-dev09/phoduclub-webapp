'use client';
import { useState } from "react";
import Link from "next/link";
import "./layout.css";
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react'; // Import ReactNode

interface DashboardGroupProps {
    children: ReactNode; // Type the children prop
}

export default function DashboardGroup({ children }: DashboardGroupProps) {
    const pathname = usePathname(); // Get the current pathname
    const [isCollapsedSidebar, setIsCollapsedSidebar] = useState<Boolean>(false);

    const toggleSidebarCollapseHandler = () => {
        setIsCollapsedSidebar((prev) => !prev);
    }

    return (
        <div className="body"> {/* THIS MAIN CONTAINER */}
            <div className="tabs" data-collapse={isCollapsedSidebar}> {/* THIS IS NAVIGATION BAR */}
                <div className="logo">
                    <div className="phodu-logo">
                        <p className="phodu">phodu<span id="club">.club</span></p>
                    </div>

                    <div className="icon collapse-icon-only">
                        <Image
                            className="collapse-icon"
                            src="/icons/sidebar-left.png" // Path to your image file
                            width={18} // Desired width
                            alt="Navigation Bar"
                            height={12} // Desired height
                            onClick={toggleSidebarCollapseHandler}
                        />
                    </div>
                </div>
                <div className="divider"><hr className="divider-line" /></div>

                {/* Navigation Buttons with Active State */}
                <div className={`dashboard ${pathname === '/dashboard' ? 'active' : ''}`}>
                    <Image
                        className="dashboard-icon"
                        src="/icons/dashboard-speed-02.png" // Path to your image file
                        width={20} // Desired width
                        alt="Dashboard Icon"
                        height={20} // Desired height
                    />
                    <Link href="/dashboard">Dashboard</Link>
                </div>

                <div className={`learn ${pathname === '/learn' ? 'active' : ''}`}>
                    <Image
                        className="learn-icon"
                        src="/icons/book-open-01.png"
                        width={20}
                        height={20}
                        alt="learn-icon"
                    />
                    <Link href="/learn">Learn</Link>
                </div>

                <div className={`communities ${pathname === '/community' ? 'active' : ''}`}>
                    <Image
                        className="community-icon"
                        src="/icons/user-group.png"
                        width={20}
                        height={20}
                        alt="community-icon"
                    />
                    <Link href="/community">Community</Link>
                </div>

                <div className={`analytics ${pathname === '/analytics' ? 'active' : ''}`}>
                    <Image
                        className="analytics-icon"
                        src="/icons/pie-chart.png"
                        width={20}
                        height={20}
                        alt="analytics-icon"
                    />
                    <Link href="/analytics">Analytics</Link>
                </div>

                <div className={`settings ${pathname === '/settings' ? 'active' : ''}`}>
                    <Image
                        className="setting-icon"
                        src="/icons/settings-03.png"
                        width={20}
                        height={20}
                        alt="setting-icon"
                    />
                    <Link href="/settings">Settings</Link>
                </div>
            </div>

            <div className="contents"> {/* This is right side contents */}
                <div className="content-box">
                    <div className="headtab">
                        <div className="greeting">
                            <p><span id="hi">Hey, <span>Siraj Dhanani</span>,</span> keep up the great work</p>
                        </div>
                        <div className="notify">
                            <Image
                                src="/icons/notify.png" // Path to your image file
                                alt="Notification Bar"
                                width={35} // Desired width
                                height={35} // Desired height
                            />
                        </div>
                        <div className="Question Mark">
                            <Image
                                className="question-mark"
                                src="/icons/questionMark.png" // Path to your image file
                                alt="Question Mark"
                                width={41} // Desired width
                                height={41} // Desired height
                            />
                        </div>
                        <div className="dp"><p className="actual-dp">JS</p></div>
                        <div className="info">
                            <div className="name">John Smith</div>
                            <div className="email">john@acme.com</div>
                        </div>
                    </div>
                    <div className="variable-contents">
                        {children} {/* Render child components here */}
                    </div>
                </div>
            </div>
        </div>
    );
}
