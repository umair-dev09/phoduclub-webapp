'use client';
import React, { useState } from "react";
import "./layout.css";
import Image from 'next/image';

export default function DashboardGroup() {
    const [currentContent, setCurrentContent] = useState('dashboard');
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };
    const renderContent = () => {
        switch (currentContent) {
            case 'dashboard':
                return <div>Dashboard Content</div>;
            case 'learn':
                return <div>Learn Content</div>;
            case 'communities':
                return <div>Communities Content</div>;
            case 'analytics':
                return <div>Analytics Content</div>;
            case 'settings':
                return <div>Settings Content</div>;
            default:
                return <div>Dashboard Content</div>;
        }
    };

    return (
        <div className={`body ${isSidebarCollapsed ? 'collapsed' : ''}`}>    {/*THIS MAIN CONTAINER*/}
            <div className="tabs">  {/*THIS IS NAVIGATION BAR*/}
                <div className="logo">
                    <div className="phodu-logo">
                        <p className="phodu">phodu<span id="club">.club</span></p>
                    </div>

                    <div className="icon" onClick={toggleSidebar}>
                        <Image
                            className="collapse-icon"
                            src="/icons/sidebar-left.png" // Path to your image file
                            width={18} // Desired width
                            alt="Navigation Bar"
                            height={12} // Desired height
                        />
                    </div>
                </div>
                <div className="divider"><hr className="divider-line" /></div>

                <div
                    className={`dashboard ${currentContent === 'dashboard' ? 'active' : ''}`}
                    onClick={() => setCurrentContent('dashboard')}


                >

                    <Image
                        className="dashboard-icon"
                        src="/icons/dashboard-speed-02.png" // Path to your image file
                        width={20} // Desired width
                        alt="Dashboard Icon"
                        height={20} // Desired height
                    />
                    Dashboard

                </div>
                <div
                    className={`learn ${currentContent === 'learn' ? 'active' : ''}`}
                    onClick={() => setCurrentContent('learn')}
                >

                    <Image
                        className="learn-icon"
                        src="/icons/book-open-01.png"
                        width={20}
                        height={20}
                        alt="learn-icon"
                    />
                    Learn
                </div>
                <div
                    className={`communities ${currentContent === 'communities' ? 'active' : ''}`}
                    onClick={() => setCurrentContent('communities')}
                >
                    <Image
                        className="community-icon"
                        src="/icons/user-group.png"
                        width={20}
                        height={20}
                        alt="learn-icon"
                    />
                    Communities
                </div>
                <div
                    className={`analytics ${currentContent === 'analytics' ? 'active' : ''}`}
                    onClick={() => setCurrentContent('analytics')}
                >
                    <Image
                        className="analytics-icon"
                        src="/icons/pie-chart.png"
                        width={20}
                        height={20}
                        alt="learn-icon"
                    />
                    Analytics
                </div>
                <div
                    className={`settings ${currentContent === 'settings' ? 'active' : ''}`}
                    onClick={() => setCurrentContent('settings')}
                >
                    <Image
                        className="setting-icon"
                        src="/icons/settings-03.png"
                        width={20}
                        height={20}
                        alt="setting-icon"
                    />
                    Settings
                </div>
            </div>
            <div className="contents"> {/* This is right side contents  */}
                <div className="content-box">
                    <div className="headtab">
                        <div className="greeting">
                            <p><span id="hi">Hey, <span>Siraj Dhanani</span>,</span> keep up the great work</p>
                        </div>
                        <div className="notify">
                            <Image
                                src="/icons/notify.png" // Path to your image file
                                alt="Notifly Bar"
                                width={35} // Desired width
                                height={35} // Desired height
                            />
                        </div>
                        <div className="Question Mark">
                            <Image
                                className="Question Mark"
                                src="/icons/questionMark.png" // Path to your image file
                                alt="questionMark Bar"
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
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div >
    );
}
