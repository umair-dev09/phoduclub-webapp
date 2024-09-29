"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

function Quiz() {
    // Set initial countdowns in seconds (e.g., 2 hours 29 minutes 55 seconds = 2 * 3600 + 29 * 60 + 55)
    const [quizEndTime, setQuizEndTime] = useState(2 * 3600 + 29 * 60 + 55);
    const [quizStartTime, setQuizStartTime] = useState(2 * 3600 + 29 * 60 + 55);

    // Utility function to format time in hh:mm:ss
    const formatTime = (timeInSeconds: number) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    // Use useEffect to create a countdown
    useEffect(() => {
        // Create an interval to update quizEndTime and quizStartTime every second
        const intervalId = setInterval(() => {
            setQuizEndTime((prev) => (prev > 0 ? prev - 1 : 0));
            setQuizStartTime((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        // Cleanup interval when component unmounts
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="flex flex-1">
            <div className="flex flex-1 justify-center items-center flex-col hidden">
                <Image src="/images/noQuizzes.svg" alt="No Quizzes" width={140} height={140} />
                <h3 className="text-base font-bold">No Quizzes</h3>
                <p>Your live quizzes will show up here</p>
            </div>

            <div className="grid grid-cols-3 gap-5 w-full">
                {/* Quiz 1 */}
                <div className="flex flex-col justify-between h-[11.25rem] rounded-xl py-6 px-6 bg-white border border-lightGrey">
                    <div className="flex flex-col gap-1 text-xs">
                        <div className="text-base font-semibold">Physics</div>
                        <div>10 Questions</div>
                    </div>
                    <div className="flex flex-row text-[#DE3024]">
                        <div className="mr-1">
                            <Image src="/icons/stop-watch.svg" alt="stop watch" width={18} height={18} />
                        </div>
                        <div className="flex items-center text-xs gap-1">
                            Quiz ends in <span className="font-semibold">{formatTime(quizEndTime)}</span>
                        </div>
                    </div>
                    <div>
                        <button className="flex items-center justify-center w-full px-[14px] py-[10px] text-xs text-white font-semibold shadow-inner-button bg-custompurple rounded-[6px] border border-darkPurple ">
                            Start Quiz
                        </button>
                    </div>
                </div>

                {/* Quiz 2 */}
                <div className="flex flex-col justify-between h-[11.25rem] rounded-xl py-6 px-6 bg-white border border-lightGrey">
                    <div className="flex flex-col gap-1 text-xs">
                        <div className="text-base font-semibold">Physics</div>
                        <div>10 Questions</div>
                    </div>
                    <div className="flex flex-row text-[#0B9055]">
                        <div className="mr-1">
                            <Image src="/icons/hourglass.svg" alt="stop watch" width={18} height={18} />
                        </div>
                        <div className="flex items-center text-xs gap-1">
                            Quiz starts in <span className="font-semibold">{formatTime(quizStartTime)}</span>
                        </div>
                    </div>
                    <div>
                        <button className="flex items-center justify-center w-full px-[14px] py-[10px] text-xs text-white font-semibold shadow-inner-button bg-custompurple rounded-[6px] border border-darkPurple ">
                            Start Quiz
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Quiz;
