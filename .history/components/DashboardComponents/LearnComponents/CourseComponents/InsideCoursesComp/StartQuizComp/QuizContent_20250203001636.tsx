"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Quiz from "./QuizAttendingArea";
import QuizAttendingArea from "./QuizAttendingArea";
import ReviewQuiz from "./ReviewQuiz";
import ReviewTest from "../../../TestsComponents/ReviewTest";
import { useDisclosure } from "@nextui-org/modal";

interface Options {
    A: string;
    B: string;
    C: string;
    D: string;
}

interface Question {
    question: string;
    isChecked: boolean;
    isActive: boolean;
    options: Options;
    correctAnswer: string | null;
    answerExplanation: string;
    questionId: string;
    order: number;
}

interface QuestionState {
    questionId: string;
    selectedOption: string | null;
    answeredCorrect: boolean | null;
    answered: boolean;
}

interface QuizAttempt {
    AnsweredQuestions: QuestionState[];
    userId: string;
    timeTaken: number;
    totalTime: number;
}
interface QuizContentProps {
    lessonOverview: string;
    lessonHeading: string;
    marksPerQ: string;
    nMarksPerQ: string;
    questionCount: number;
    quizTime: number;
    contentId: string;
    questionsList: Question[];
    courseId: string;
    sectionId: string;
    isAdmin: boolean;
    quizAttempt?: QuizAttempt | null;

}


const convertToTimeFormat = (seconds: number): string => {
    if (!seconds || seconds < 0) return "0 Minutes"; // Return default for invalid input

    const totalMinutes = Math.floor(seconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0) {
        return `${hours} ${hours === 1 ? 'Hour' : 'Hours'}`;
    } else {
        return `${minutes} ${minutes === 1 ? 'Minute' : 'Minutes'}`;
    }
};

function QuizContent({ lessonHeading, isAdmin, courseId, sectionId, lessonOverview, questionCount, marksPerQ, nMarksPerQ, quizTime, contentId, questionsList, quizAttempt }: QuizContentProps) {
    const [showReviewSheet, setShowReviewSheet] = useState(false);

    const [showQuizDialog, setShowQuizDialog] = useState(false);
    // const [isQuizOpen, setIsQuizOpen] = useState(false);
    const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
    const [showBottomSheet, setShowBottomSheet] = useState(false);
    const { isOpen: isOpen, onOpen: onOpen, onClose: onClose } = useDisclosure();

    const onStartQuiz = () => {
        setShowQuizDialog(true);
        onOpen();
    };

    const handleQuizSubmit = () => {
        setIsQuizSubmitted(true);
        setShowBottomSheet(false); // Close bottom sheet
    };

    return (
        <div className="relative flex flex-col flex-1 pb-8">

            {/* ------------------------------------------------------------------------------------------------------------------------------------------------> */}

            <div className="flex flex-col ml-8 gap-[20px] ">

                <span className="w-[140px] h-[24px] text-[#1D2939] text-base font-bold">
                    Quiz Information
                </span>

            </div>
            <div className='text-[#667085] text-base font-normal break-all ml-8 mr-4 mt-2 text-start' dangerouslySetInnerHTML={{
                __html: lessonOverview || '',
            }} />

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
                    {convertToTimeFormat(quizTime)}
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
            {!isAdmin && (
                <div className="h-[65px]  " style={{ borderRadius: "5px", position: "relative" }}>
                    <div className="relative flex justify-between items-end h-full ml-8">
                        {!quizAttempt ? (
                            <button
                                onClick={onStartQuiz}
                                className="bg-[#8501FF] text-[#FFFFFF] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px] ml-auto border-[1px] border-[#800EE2] shadow-inner-button hover:bg-[#6D0DCC]"
                            >
                                Start Quiz
                            </button>
                        ) : (
                            <div className="absolute flex flex-row justify-between w-full">
                                <button className="border border-[#9012FF] bg-white text-[#1D2939] text-sm font-semibold px-6 py-[0.625rem] hover:bg-[#F5F0FF] rounded-md"
                                    onClick={() => setShowReviewSheet(true)}
                                >Review your attempt</button>
                                <button className="border border-[#800EE2] bg-[#800EE2] hover:bg-[#6D0DCC] text-white text-sm font-semibold px-6 py-[0.625rem] rounded-md shadow-inner-button" onClick={onStartQuiz}>Re-Attempt</button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {showQuizDialog && (
                <QuizAttendingArea
                    isOpen={isOpen}
                    // setIsOpen={setIsQuizOpen}
                    onClose={onClose}
                    setShowBottomSheet={setShowBottomSheet}
                    onSubmit={handleQuizSubmit}
                    showBottomSheet={showBottomSheet}
                    contentId={contentId}
                    quizTime={quizTime}
                    sectionId={sectionId}
                    courseId={courseId}
                    questionsList={questionsList || []}
                />
            )}
            <ReviewTest setShowReviewSheet={setShowReviewSheet} showReviewSheet={showReviewSheet} questionsList={questionsList} answeredQuestions={quizAttempt?.AnsweredQuestions || []} timeTaken={quizAttempt?.timeTaken || 0} />

        </div>


    )
}

export default QuizContent;
