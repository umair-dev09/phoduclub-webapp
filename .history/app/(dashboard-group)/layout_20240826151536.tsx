import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = () => {
    const [isCollapsedSidebar, setIsCollapsedSidebar] = useState(false);
    const router = useRouter();
    const { pathname } = router;

    const toggleSidebarCollapseHandler = () => {
        setIsCollapsedSidebar(!isCollapsedSidebar);
    };

    return (
        <div className="tabs" data-collapse={isCollapsedSidebar}>
            <div className="logo">
                <div className="phodu-logo">
                    <p className="phodu">phodu<span id="club">.club</span></p>
                </div>

                <div className="icon">
                    <Image
                        className="collapse-icon"
                        src="/icons/sidebar-left.png"
                        width={18}
                        alt="Navigation Bar"
                        height={12}
                        onClick={toggleSidebarCollapseHandler}
                    />
                </div>
            </div>
            <div className="divider"><hr className="divider-line" /></div>

            <button className={`dashboard ${pathname === '/dashboard' ? 'active' : ''}`}>
                <Image
                    className="dashboard-icon"
                    src="/icons/dashboard-speed-02.png"
                    width={20}
                    alt="Dashboard Icon"
                    height={20}
                />
                <Link href="/dashboard">Dashboard</Link>
            </button>

            <button className={`learn ${pathname === '/learn' ? 'active' : ''}`}>
                <Image
                    className="learn-icon"
                    src="/icons/book-open-01.png"
                    width={20}
                    height={20}
                    alt="learn-icon"
                />
                <Link href="/learn">Learn</Link>
            </button>

            <button className={`communities ${pathname === '/community' ? 'active' : ''}`}>
                <Image
                    className="community-icon"
                    src="/icons/user-group.png"
                    width={20}
                    height={20}
                    alt="learn-icon"
                />
                <Link href="/community">Community</Link>
            </button>

            <button className={`analytics ${pathname === '/analytics' ? 'active' : ''}`}>
                <Image
                    className="analytics-icon"
                    src="/icons/pie-chart.png"
                    width={20}
                    height={20}
                    alt="learn-icon"
                />
                <Link href="/analytics">Analytics</Link>
            </button>

            <button className={`settings ${pathname === '/settings' ? 'active' : ''}`}>
                <Image
                    className="setting-icon"
                    src="/icons/settings-03.png"
                    width={20}
                    height={20}
                    alt="setting-icon"
                />
                <Link href="/settings">Settings</Link>
            </button>
        </div>
    );
};

export default Sidebar;
