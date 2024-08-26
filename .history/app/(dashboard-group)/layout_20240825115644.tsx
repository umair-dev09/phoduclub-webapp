import React from "react";
import "./layout.css";

export default function dashboardGroup() {
    return (
        <div className="body">    {/*THIS MAIN CONTAINER*/}
            <div className="tabs">  {/*THIS IS NAVIGATION BAR*/}
                <div className="logo">

                </div>
                <div className="divider"></div>
                <div className="dashboard"></div>
                <div className="learn"></div>
                <div className="communities"></div>
                <div className="analytics"></div>
                <div className="settings"></div>
            </div>
            <div className="contents">
                <div className="background">

                </div>
            </div>
        </div>
    );
}