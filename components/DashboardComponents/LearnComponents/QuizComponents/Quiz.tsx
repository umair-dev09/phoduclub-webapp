"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import BottomUpSheet from './StartQuizBottomup';

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

    let [showQuizDialog, setShowQuizDialog] = useState(false);

    const onStartQuiz = () => {
        setShowQuizDialog(true);
    };

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
                        <button onClick={onStartQuiz} className="flex items-center justify-center w-full px-[14px] py-[10px] text-xs text-white font-semibold shadow-inner-button bg-custompurple rounded-[6px] border border-darkPurple ">
                            Start Quiz
                        </button>
                    </div>
                </div>

                {/* Quiz 2 */}
                {/* <div className="flex flex-col justify-between h-[11.25rem] rounded-xl py-6 px-6 bg-white border border-lightGrey">
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
                </div> */}
            </div>

            <Dialog open={showQuizDialog} onClose={() => setShowQuizDialog(false)} className="relative z-50">

                <DialogBackdrop className="fixed inset-0 bg-black/30 " />


                <div className="fixed inset-0 flex items-center justify-center ">
                    <DialogPanel transition className="bg-[#FFFFFF] rounded-2xl  w-[480px] h-[306px] ">




                        <div className="flex flex-1 h-[230px] w-full border-b-2 border-solid border-[#EAECF0] flex-col" style={{
                            borderTopLeftRadius: '12px',
                            borderTopRightRadius: '12px',
                            borderBottomLeftRadius: '0px',
                            borderBottomRightRadius: '0px',
                        }}>
                            <div className="h-[23px]  mt-[23px] mr-[24px] ml-[24px] justify-between flex">
                                <span className="text-[#1D2939] font-semibold text-lg">Start Test</span>
                                <button onClick={() => setShowQuizDialog(false)}>
                                    <Image src="/icons/cancel.svg" alt="cancel" width={18} height={18} />
                                </button>
                            </div>
                            <div className=" h-auto mr-[24px] ml-[24px] mt-[13px] ">
                                <span className="text-sm text-[#667085] font-normal">
                                    Lorem ipsum is a dummy text widely used in digital industry and lore is anptsu


                                </span>

                            </div>
                            <div className="h-[48px] w-[480px]  ml-[31px] mt-[33px] flex-row flex gap-6">
                                <div className="gap-1 flex-col flex  items-center ">
                                    <span className="font-normal text-sm text-[#667085]">Time Duration</span>
                                    <span className="text-[#1D2939] text-lg font-semibold">05:00
                                        <span className="text-[#1D2939] text-sm font-semibold">Min</span>
                                    </span>
                                </div>

                                <div className="w-[0.5px] h-[48px] bg-[#EAECF0]"></div>

                                <div className="gap-1 flex-col flex  items-center">
                                    <span className="font-normal text-sm text-[#667085]">No. of Questions</span>
                                    <span className="text-[#1D2939] text-lg font-semibold">15

                                    </span>
                                </div>

                                <div className="w-[0.5px] h-[48px] bg-[#EAECF0]"></div>

                                <div className="gap-1 flex-col flex  items-center">
                                    <span className="font-normal text-sm text-[#667085]">Marks Per Question</span>
                                    <span className="text-[#1D2939] text-lg font-semibold">2

                                    </span>
                                </div>
                            </div>


                        </div>
                        <div className="w-[480px] h-[76px] "
                            style={{
                                borderTopLeftRadius: '0px',
                                borderTopRightRadius: '0px',
                                borderBottomLeftRadius: '12px',
                                borderBottomRightRadius: '12px',
                            }}>
                            <div className="ml-[213px] gap-[16px] flex-row flex mt-[16px] h-[44px] ">

                                <button
                                    className="bg-[#FFFFFF] text-[#1D2939] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px] shadow-inner-button"
                                    style={{ border: "1.5px solid #EAECF0" }}
                                    onClick={() => setShowQuizDialog(false)}>
                                    Cancel
                                </button>
                                <button
                                    className="bg-[#8501FF] text-[#FFFFFF] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px] shadow-inner-button"
                                    style={{
                                        border: "1px solid #800EE2",

                                    }}

                                >
                                    Start Now
                                </button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

            <div>
                <BottomUpSheet />
            </div>

        </div>
    );
}

export default Quiz;
