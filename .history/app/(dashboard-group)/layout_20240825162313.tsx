import React from "react";
import "./layout.css";
import Image from 'next/image';

export default function dashboardGroup() {
    return (
        <div className="body">    {/*THIS MAIN CONTAINER*/}
            <div className="tabs">  {/*THIS IS NAVIGATION BAR*/}
                <div className="logo">
                    <div className="phodu-logo">
                        <span><Image
                            src="/images/image 1.png" // Path to your image file
                            alt="Description of image"
                            width={100} // Desired width
                            height={7} // Desired height
                        /></span>
                    </div>

                    <div className="icon">
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
                <div className="dashboard">dashboard</div>
                <div className="learn">learn</div>
                <div className="communities">communities</div>
                <div className="analytics">analytics</div>
                <div className="settings">settings</div>
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
                                width={35} // Desired width
                                height={35} // Desired height
                            />
                        </div>

                    </div>
                    <div className="variable-contents"></div>
                </div>
            </div>
        </div>
    );
}