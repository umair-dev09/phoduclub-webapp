import React from "react";
import "./layout.css";
import Image from 'next/image';

export default function dashboardGroup() {
    return (
        <div className="body">    {/*THIS MAIN CONTAINER*/}
            <div className="tabs">  {/*THIS IS NAVIGATION BAR*/}
                <div className="logo">
                    <div className="phodu-logo">
                        <Image
                            src="/images/image 1.png" // Path to your image file
                            alt="Description of image"
                            width={100} // Desired width
                            height={7} // Desired height
                        />
                    </div>

                    <div className="icon">
                        <Image
                            src="/icons/sidebar-left.png" // Path to your image file
                            alt="Navigation Bar"
                            width={18} // Desired width
                            height={12} // Desired height
                        />
                    </div>
                </div>
                <div className="divider">
                    <hr />
                </div>
                <div className="dashboard">dashboard</div>
                <div className="learn">learn</div>
                <div className="communities">communities</div>
                <div className="analytics">analytics</div>
                <div className="settings">settings</div>
            </div>
            <div className="contents"> {/* This is right side contents  */}
                <div className="content-box">
                    <div className="headtab">
                        <p>Hey, Siraj Dhanani, Keep up the great work!</p>
                    </div>
                    <div className="variable-contents"></div>
                </div>
            </div>
        </div>
    );
}