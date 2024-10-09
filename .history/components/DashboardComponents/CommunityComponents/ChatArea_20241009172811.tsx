"use client"
import { useState } from "react";
import ChatArea from "./Report";

function ChartArea() {

    let [isQuizOpen, setIsQuizOpen] = useState(false);



    const onStartQuiz = () => {

        setIsQuizOpen(true);
    };


    return (
        <div>
            <div>
                <button className="font-semibold text-lg text-[#182230]"
                    onClick={onStartQuiz}>
                    Report
                </button>
            </div>
            <div>
                <button className="font-semibold text-lg text-[#182230]"
                    onClick={onStartQuiz}>
                    Media
                </button>
            </div>
            {<ChatArea isOpen={isQuizOpen} setIsOpen={setIsQuizOpen} />}

        </div>

    )
}
export default ChartArea;