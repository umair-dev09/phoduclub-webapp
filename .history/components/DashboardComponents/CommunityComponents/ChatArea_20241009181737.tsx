"use client";
import { useState } from "react";
import ChatArea from "./Report"; // Assuming ChatArea is the Report component
import Media from "./Media"; // Assuming Media is a separate component
import Feedback from "./Cancel"; // Assuming Feedback is a new component
import Settings from "./Blockprofile"; // Assuming Settings is a new component

function ChartArea() {
    const [isSectionOpen, setIsSectionOpen] = useState({
        report: false,
        media: false,
        feedback: false,
        settings: false,
    });

    const onStartReport = () => {
        setIsSectionOpen({ report: true, media: false, feedback: false, settings: false });
    };

    const onStartMedia = () => {
        setIsSectionOpen({ report: false, media: true, feedback: false, settings: false });
    };

    const onStartFeedback = () => {
        setIsSectionOpen({ report: false, media: false, feedback: true, settings: false });
    };

    const onStartSettings = () => {
        setIsSectionOpen({ report: false, media: false, feedback: false, settings: true });
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
            <div>
                <button
                    className="font-semibold text-lg text-[#182230]"
                    onClick={onStartFeedback}
                >
                    Feedback
                </button>
            </div>
            <div>
                <button
                    className="font-semibold text-lg text-[#182230]"
                    onClick={onStartSettings}
                >
                    Settings
                </button>
            </div>

            {/* Conditional rendering of sections */}
            {isSectionOpen.report && <ChatArea isOpen={isSectionOpen.report} setIsOpen={setIsSectionOpen} />}
            {isSectionOpen.media && <Media isOpen={isSectionOpen.media} setIsOpen={setIsSectionOpen} />}
            {isSectionOpen.feedback && <Feedback isOpen={isSectionOpen.feedback} setIsOpen={setIsSectionOpen} />}
            {isSectionOpen.settings && <Settings isOpen={isSectionOpen.settings} setIsOpen={setIsSectionOpen} />}
        </div>
    );
}

export default ChartArea;
