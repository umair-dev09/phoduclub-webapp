"use client";
import { useState } from "react";
import ChatArea from "./Report"; // Assuming ChatArea is the Report component
import Media from "./Media"; // Assuming Media is a separate component

function ChartArea() {
    const [isSectionOpen, setIsSectionOpen] = useState({
        report: false,
        media: false,
    });

    const onStartReport = () => {
        setIsSectionOpen({ report: true, media: false }); // Open report and close media
    };

    const onStartMedia = () => {
        setIsSectionOpen({ report: false, media: true }); // Open media and close report
    };

    return (
        <div>
            <div>
                <button
                    className="font-semibold text-lg text-[#182230]"
                    onClick={onStartReport}
                >
                    Report
                </button>
            </div>
            <div>
                <button
                    className="font-semibold text-lg text-[#182230]"
                    onClick={onStartMedia}
                >
                    Media
                </button>
            </div>

            {/* Conditional rendering of sections */}
            {isSectionOpen.report && <ChatArea isOpen={isSectionOpen.report} setIsOpen={setIsSectionOpen} />}
            {isSectionOpen.media && <Media isOpen={isSectionOpen.media} setIsOpen={setIsSectionOpen} />}
        </div>
    );
}

export default ChartArea;
