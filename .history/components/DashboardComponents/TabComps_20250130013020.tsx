"use client";
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Tooltip } from "@nextui-org/react";

function TabComps() {
    const router = useRouter();
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [activeTab, setActiveTab] = useState('');
    const [showQuizDialog, setShowQuizDialog] = useState(false);

    useEffect(() => {
        const savedState = localStorage.getItem('isSidebarCollapsed');
        setIsCollapsed(savedState === 'true');
    }, []);

    useEffect(() => {
        localStorage.setItem('isSidebarCollapsed', isCollapsed.toString());
    }, [isCollapsed]);

    const handleTabClick = (tabName: string, path: string) => {
        setActiveTab(tabName);
        router.push(path);
        if (tabName === 'dashboard') {
            setShowQuizDialog(true); // Open dialog when 'dashboard' tab is clicked
        }
        else if (tabName === "analytics") {
            setShowQuizDialog(true);
        }
    };

    useEffect(() => {
        if (pathname) {
            const currentPath = pathname.split('/')[1];
            setActiveTab(currentPath || 'dashboard');
        }
    }, [pathname]);

    useEffect(() => {
        if (pathname === '/learn') {
            router.push('/learn/courses');
        }
        if (pathname === '/settings') {
            router.push('/settings/profile');
        }
    }, [pathname, router]);

    const handleCollapseClick = () => {
        setIsCollapsed(!isCollapsed);
    };

    const renderButtonWith = (
        label: string,
        icon: string,
        activeIcon: string,
        isActive: boolean,
        onClick: () => void
    ) => (
        <div className="relative group">
            {isCollapsed ? (
                <Tooltip
                    content={label}
                    placement="right"
                    offset={15}
                    closeDelay={100}
                    classNames={{
                        content: [
                            "bg-[#222222] text-white text-sm py-2 px-4 rounded-md",
                        ],
                    }}
                >
                    <button
                        onClick={onClick}
                        className={`flex w-full py-2 px-3 text-[14px] text-left font-normal rounded-md mb-2 transition-all 
                        ${isActive ? 'bg-[#7400E0] text-white' : 'hover:bg-[#e1ffe11a] text-[#AAAAAA]'}`}
                    >
                        <Image
                            src={isActive ? activeIcon : icon}
                            width={22}
                            height={22}
                            alt={`${label} Icon`}
                        />
                    </button>
                </Tooltip>
            ) : (
                <button
                    onClick={onClick}
                    className={`flex w-full py-2 px-3 text-[14px] text-left font-normal rounded-md mb-2 transition-all h-auto overflow-hidden
                    ${isActive ? 'bg-[#7400E0] text-white' : 'hover:bg-[#e1ffe11a] text-[#AAAAAA]'}`}
                >
                    <Image
                        src={isActive ? activeIcon : icon}
                        width={22}
                        height={22}
                        alt={`${label} Icon`}
                    />
                    {!isCollapsed && <span className="ml-2 whitespace-nowrap">{label}</span>}
                </button>
            )}
        </div>
    );
    return (
        <div className={`flex flex-col relative transition-all duration-[500ms] ease-in-out ${isCollapsed ? 'w-[3.5rem]' : 'w-[16rem]'} pl-2 py-[0.625rem] bg-[#131313]`}>
            {/* Sidebar Toggle Button */}
            <button className={`flex items-center justify-center absolute top-[3.6rem] left-[97.5%] w-8 h-8 z-10 bg-white border-[0.106rem] border-lightGrey hover:bg-[#F2F4F7] rounded-full transition-all ${isCollapsed ? ' -translate-x-1' : ''}`} onClick={handleCollapseClick}>
                {isCollapsed ? (
                    <Image className='flex flex-row items-center justify-center mr-[2px]' alt='Collapse Icon Right' src="/icons/collapse-right.svg" width={8} height={8} />
                ) : (
                    <Image className='flex flex-row items-center justify-center mr-[2px]' alt="Collapse Icon Left" src="/icons/collapse-left.svg" width={8} height={8} />
                )}
            </button>

            {/* Logo Section */}
            <div className='overflow-hidden'>
                {/* <p className={`items-center justify-center w-10 h-10 mt-3 mb-[0.73rem] ml-[0.2rem] text-white font-bold bg-[#3c2f40] rounded-[0.375rem] transition-all ${isCollapsed ? 'flex' : 'hidden'}`}> */}
                <button onClick={() => { router.push('/dashboard') }} className={`items-center justify-start mt-3 mb-[0.73rem] ml-[0.2rem] transition-all ${isCollapsed ? 'flex' : 'hidden'}`}>
                    {/* P */}
                    <Image src='/icon.jpg' alt='phodu logo' width={40} height={40} />
                </button>
                <div className={`flex-col mt-2 mb-[0.475rem] ml-2 transition-all ${!isCollapsed ? 'flex' : 'hidden'}`}>
                    <button onClick={() => { router.push('/dashboard') }} className='text-left text-white text-lg font-bold mt-3 mb-2'>phodu<span className='text-[#e29ff5] text-lg font-bold'>.club</span></button>
                    {/* <p className='text-sm text-[#131313] font-normal'>xxxxx</p> */}
                </div>
            </div>

            {/* Divider */}
            <hr className="border-t border-gray-700 mb-4" />
            {/* Additional Tabs */}
            {renderButtonWith('Dashboard', '/icons/dashboard-2.svg', '/icons/dashboard.svg', activeTab === 'dashboard', () => {
                handleTabClick('dashboard', '/dashboard');
            })}
            {renderButtonWith('Learn', '/icons/learn-2.svg', '/icons/learn.svg', activeTab === 'learn', () => handleTabClick('learn', '/learn/courses'))}
            {renderButtonWith('Community', '/icons/community-2.svg', '/icons/community.svg', activeTab === 'community', () => handleTabClick('community', '/community'))}
            {renderButtonWith('Analytics', '/icons/Analytics-2.svg', '/icons/Analytics.svg', activeTab === 'analytics', () => handleTabClick('analytics', '/analytics/test-series'))}
            {renderButtonWith('Settings', '/icons/settings-2.svg', '/icons/settings.svg', activeTab === 'settings', () => handleTabClick('settings', '/settings/profile'))}
        </div >
    );
}

export default TabComps;

