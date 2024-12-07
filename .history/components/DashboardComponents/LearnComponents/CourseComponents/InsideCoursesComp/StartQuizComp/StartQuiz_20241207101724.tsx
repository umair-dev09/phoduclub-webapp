"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Quiz from "./DailogAndBottom"

function startquiz() {

    const [showQuizDialog, setShowQuizDialog] = useState(false);
    const [isQuizOpen, setIsQuizOpen] = useState(false);
    const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
    const [showBottomSheet, setShowBottomSheet] = useState(false);

    const onStartQuiz = () => {
        setShowQuizDialog(true);
        setIsQuizOpen(true);
    };

    const handleQuizSubmit = () => {
        setIsQuizSubmitted(true);
        setShowBottomSheet(false); // Close bottom sheet
    };

    return (
        <div className="relative flex flex-col flex-1 pb-8">

            {/* ------------------------------------------------------------------------------------------------------------------------------------------------> */}

            <div className="flex flex-col ml-8 gap-[20px] ">
                <span className="w-[126px] h-[24px] text-[#1D2939] text-lg font-bold ">
                    Maths Test 01
                </span>
                <span className="w-[140px] h-[24px] text-[#1D2939] text-base font-bold">
                    Quiz Information

                </span>
            </div>
            <div className="w-[741px] h-[125px] ml-8 font-normal  mt-3 text-[#667085] leading-relaxed">
                <span className="text-sm">The BITSET Full Course is designed to provide students with an in-depth understanding of bit manipulation techniques and the use of bitsets in data structures. This course will cover fundamental concepts, practical applications, and advanced techniques used in competitive programming and software development. Students will learn how to efficiently solve problems using bitwise operations and gain hands-on experience through coding exercises and projects. </span>


            </div>
            <div className="flex flex-col ml-8 mt-10 w-[602px] h-auto space-y-5">
                {/* Each pair of icon and text */}
                <span className="flex items-center font-semibold text-sm text-[#1D2939]">
                    <Image
                        src="/icons/clock.svg"
                        width={20}
                        height={20}
                        alt="clock"
                        className="mr-2"
                    />
                    5:00 Minutes
                </span>

                <span className="flex items-center font-semibold text-sm text-[#1D2939]">
                    <Image
                        src="/icons/questionmark.svg"
                        width={20}
                        height={20}
                        alt="clock"
                        className="mr-2"
                    />
                    10 Questions
                </span>

                <span className="flex items-center font-semibold text-sm text-[#1D2939]">
                    <Image
                        src="/icons/check-list.svg"
                        width={20}
                        height={20}
                        alt="clock"
                        className="mr-2"
                    />
                    5 Marks per question
                </span>
            </div>
            <div className="h-[65px]  " style={{ borderRadius: "5px", position: "relative" }}>
                <div className="relative flex justify-between items-end h-full ml-8">
                    {!isQuizSubmitted && (
                        <button
                            onClick={onStartQuiz}
                            className="bg-[#8501FF] text-[#FFFFFF] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px] ml-auto shadow-inner-button"

                        >
                            Start Quiz
                        </button>
                    )}
                    {isQuizSubmitted && (
                        <div className="absolute flex flex-row justify-between w-full">
                            <button className="border border-[#9012FF] bg-white text-[#1D2939] text-sm font-semibold px-6 py-[0.625rem] rounded-md">Review your attempt</button>
                            <button className="border border-[#800EE2] bg-[#800EE2] text-white text-sm font-semibold px-6 py-[0.625rem] rounded-md">Re-Attempt</button>
                        </div>
                    )}
                </div>
            </div>


            {showQuizDialog && (
                <Quiz
                    isOpen={isQuizOpen}
                    setIsOpen={setIsQuizOpen}
                    setShowBottomSheet={setShowBottomSheet}
                    onSubmit={handleQuizSubmit}
                    showBottomSheet={showBottomSheet}
                />
            )}

        </div>


    )
}

export default startquiz;
