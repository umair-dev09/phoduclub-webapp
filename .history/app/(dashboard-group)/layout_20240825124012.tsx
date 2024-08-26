import React from "react";
import "./layout.css";

export default function dashboardGroup() {
    return (
        <div className="body">    {/*THIS MAIN CONTAINER*/}
            <div className="tabs">  {/*THIS IS NAVIGATION BAR*/}
                <div className="logo">
                    <h3>phodu.club</h3>
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