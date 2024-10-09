"use client"
import { useState } from "react";
import ChatArea from "./Report";

function ChartArea() {
    let [showQuizDialog, setShowQuizDialog] = useState(false);
    let [isQuizOpen, setIsQuizOpen] = useState(false);
    let [isQuizSubmitted, setIsQuizSubmitted] = useState(false);


    const onStartQuiz = () => {
        setShowQuizDialog(true);
        setIsQuizOpen(true);
    };

    const handleQuizSubmit = () => {
        setIsQuizSubmitted(true);
        setShowQuizDialog(false);
        setIsQuizOpen(false);
    };
    return (
        <div>
            <button className="font-semibold text-lg text-[#182230]"
                onClick={onStartQuiz}>
                Report
            </button>
            {showQuizDialog && <ChatArea isOpen={isQuizOpen} setIsOpen={setIsQuizOpen} />}

        </div>

    )
}
export default ChartArea;