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
            <button className="font-semibold text-lg text-[#182230]"
                onClick={onStartQuiz}>
                Report
            </button>
            <button className="font-semibold text-lg text-[#182230]"
                onClick={onStartQuiz}>
                Media
            </button>
            {<ChatArea isOpen={isQuizOpen} setIsOpen={setIsQuizOpen} />}

        </div>

    )
}
export default ChartArea;