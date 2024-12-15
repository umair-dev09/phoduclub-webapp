"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Quiz from "./DailogAndBottom"
interface QuizContentProps {
    lessonOverview: string;
    lessonHeading: string;
    marksPerQ: string;
    nMarksPerQ: string;
    questionCount: number;
    quizTime: string;
}

function QuizContent({lessonHeading, lessonOverview, questionCount, marksPerQ, nMarksPerQ, quizTime}:QuizContentProps) {

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
                    {lessonHeading}
                </span>
                <span className="w-[140px] h-[24px] text-[#1D2939] text-base font-bold">
                    Quiz Information

                </span>
            </div>
            <div className='text-[#667085] text-base font-normal break-all ml-8 mr-4 mt-2 text-start'  dangerouslySetInnerHTML={{
                                    __html: lessonOverview || '',
             }}/>

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
                    {quizTime}
                </span>

                <span className="flex items-center font-semibold text-sm text-[#1D2939]">
                    <Image
                        src="/icons/questionmark.svg"
                        width={20}
                        height={20}
                        alt="clock"
                        className="mr-2"
                    />
                    {questionCount} Questions
                </span>

                <span className="flex items-center font-semibold text-sm text-[#1D2939]">
                    <Image
                        src="/icons/check-list.svg"
                        width={20}
                        height={20}
                        alt="clock"
                        className="mr-2"
                    />
                    {marksPerQ} Marks per question
                </span>
            </div>
            <div className="h-[65px]  " style={{ borderRadius: "5px", position: "relative" }}>
                <div className="relative flex justify-between items-end h-full ml-8">
                    {!isQuizSubmitted && (
                        <button
                            onClick={onStartQuiz}
                            className="bg-[#8501FF] text-[#FFFFFF] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px] ml-auto border-[1px] border-[#800EE2] shadow-[inset_0px_-4px_4px_0px_#1018281F,inset_0px_3px_2px_0px_#FFFFFF3D]"

                        >
                            Start Quiz
                        </button>
                    )}
                    {isQuizSubmitted && (
                        <div className="absolute flex flex-row justify-between w-full">
                            <button className="border border-[#9012FF] bg-white text-[#1D2939] text-sm font-semibold px-6 py-[0.625rem] hover:bg-[#F5F0FF]   rounded-md">Review your attempt</button>
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

export default QuizContent;
