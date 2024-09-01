// "use client";

// import styles from './TabComps.module.css';
// import Image from 'next/image';
// import { useRouter } from 'next/router';

// function TabComps() {
//     const Button = () => {
//         const router = useRouter();

//         const handleClick = () => {
//             router.push('/dashboard');
//         };

//         return(
//             <div className={styles.tabComps}>
//                 <div className = {styles.logo}>
//                     <div className={styles.phoduClubSymbol}>
//                         <Image
//                             className={styles.phoduIcon}
//                             src="/icons/phodu_logo.png"
//                             width={350}
//                             height={350}
//                             alt="phodu-club symbol"
//                         />
//                     </div>
//                     <div className={styles.phoduLogo}>
//                         <p className={styles.phodu}>phodu<span id="club">.club</span></p>
//                     </div>
//                 </div>
//                 <div className = {styles.divider}>
//                     <hr/>
//                 </div>
//                 <div className = {styles.tabs}>
//                     <button onClick={handleClick} className={styles.DashboardButton}><p className={styles.text}>Dashboard</p></button>
//                     <button className={styles.LearnButton}><p className={styles.text}>Learn</p></button>
//                     <button className={styles.CommunitiesButton}><p className={styles.text}>Communities</p></button>
//                     <button className={styles.AnalyticsButton}><p className={styles.text}>Analytics</p></button>
//                     <button className={styles.SettingsButton}><p className={styles.text}>Settings</p></button>
//                 </div>
//             </div>
    
    
    
//     //         <div className="side_bar" /*data-collapse={isCollapsedSidebar}*/>
//     //             {/* <button
//     //         //        onClick={toggleSidebarCollapseHandler}
//     //         //        className={`sidebar-toggle-button ${isCollapsedSidebar ? 'rotate' : ''}`}
//     //         //    >
//     //                 <div className="sidebar-icon" >
//     //                     <Image
//     //                         src="/icons/Vector (4).png"
//     //                         className="actual-icon"
//     //                         alt="vector-icon"
//     //                         width={9}
//     //                         height={9}
//     //                     />
//     //                 </div>
//     //        </button> */}
    
//     //        <div className={styles.tabs} /*data-collapse={isCollapsedSidebar}*/>
//     //            <div className="logo">
//     //                <div className="phodu-club symbol">
//     //                    <Image
//     //                        className={styles.phodu-icon}
//     //                        src="/icons/phodu_logo.png"
//     //                        width={350}
//     //                        height={350}
//     //                        alt="phodu-club symbol"
//     //                    />
//     //                </div>
//     //                <div className={styles.phodu-logo}>
//     //                    <p className="phodu">phodu<span id="club">.club</span></p>
//     //                </div>
//     //            </div>
//     //            <div className="divider"><hr className="divider-line" /></div>
    
    
//     //                <div className={`dashboard ${pathname === '/dashboard' ? 'active' : ''}`}>
//     //                    <Image
//     //                        className="dashboard-icon"
//     //                        src="/icons/dashboard-speed-02.png"
//     //                        width={20}
//     //                        alt="Dashboard Icon"
//     //                        height={20}
//     //                    />
//     //                    <span className="text-label">Dashboard</span>
//     //                </div>
    
    
    
//     //                <div className={`learn ${pathname === '/learn' ? 'active' : ''}`}>
    
//     //                        className="learn-icon"
//     //                        src="/icons/book-open-01.png"
//     //                        width={20}
//     //                        height={20}
//     //                        alt="learn-icon"
//     //                    />
//     //                    <span className="text-label">Learn</span>
//     //                </div>
    
    
    
//     //                <div className={`communities ${pathname === '/community' ? 'active' : ''}`}>
//     //                    <Image
//     //                        className="community-icon"
//     //                        src="/icons/user-group.png"
//     //                        width={20}
//     //                        height={20}
//     //                        alt="community-icon"
//     //                    />
//     //                    <span className="text-label">Community</span>
//     //                </div>
    
    
    
//     //                <div className={`analytics ${pathname === '/analytics' ? 'active' : ''}`}>
//     //                    <Image
//     //                        className="analytics-icon"
//     //                        src="/icons/pie-chart.png"
//     //                        width={20}
//     //                        height={20}
//     //                        alt="analytics-icon"
//     //                    />
//     //                    <span className="text-label">Analytics</span>
//     //                </div>
     
    
               
//     //                <div className={`settings ${pathname === '/settings' ? 'active' : ''}`}>
//     //                    <Image
//     //                        className="setting-icon"
//     //                        src="/icons/settings-03.png"
//     //                        width={20}
//     //                        height={20}
//     //                        alt="setting-icon"
//     //                    />
//     //                    <span className="text-label">Settings</span>
//     //                </div>
              
//     //        </div>
//     //    </div>
//         );
//     };

// }

// export default TabComps;









 {/* <div className="side_bar" data-collapse={isCollapsedSidebar}> */}
                   {/* <button  */}
        {/* //             onClick={toggleSidebarCollapseHandler}
        //             className={`sidebar-toggle-button ${isCollapsedSidebar ? 'rotate' : ''}`}
        //         >
        //             <div className="sidebar-icon" > */}
        {/* //                 <Image */}
        {/* //                     src="/icons/Vector (4).png"
        //                     className="actual-icon"
        //                     alt="vector-icon"
        //                     width={9}
        //                     height={9}
        //                 /> */}

                     {/* </div> */}
        {/* //         </button> */}
                  {/*
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
                </div> */}
                            // </div>