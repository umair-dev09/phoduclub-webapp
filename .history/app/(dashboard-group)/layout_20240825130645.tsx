import React from "react";
import "./layout.css";
import Image from 'next/image';

export default function dashboardGroup() {
    return (
        <div className="body">    {/*THIS MAIN CONTAINER*/}
            <div className="tabs">  {/*THIS IS NAVIGATION BAR*/}
                <div className="logo">
                    <Image
                        src="/images/phodulogo2.png" // Path to your image file
                        alt="Description of image"
                        width={100} // Desired width
                        height={25} // Desired height
                    />
                    <Image
                        src="/icons/sidebar-left.png" // Path to your image file
                        alt="Navigation Bar"
                        width={24} // Desired width
                        height={24} // Desired height
                    />
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