import React from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css"

interface Options {
    A: string;
    B: string;
    C: string;
    D: string;
}

interface AnsweredQuestion {
    questionId: string;
    status: string;
    answered: boolean;
    selectedOption: string | null;
    answeredCorrect: boolean | null;
}

interface Question {
    question: string;
    isChecked: boolean;
    isActive: boolean;
    options: Options;
    correctAnswer: string | null;
    answerExplanation: string;
    questionId: string;
}

interface ReviewTestProps {
    showReviewSheet: boolean;
    setShowReviewSheet: React.Dispatch<React.SetStateAction<boolean>>;
    questionsList: Question[];
    answeredQuestions: AnsweredQuestion[];
    timeTaken: number;
}

function convertSecondsToHHMM(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}


function ReviewTest({ showReviewSheet, setShowReviewSheet, questionsList, answeredQuestions, timeTaken }: ReviewTestProps) {
    const getAnsweredQuestionData = (questionId: string) => {
        return answeredQuestions.find(aq => aq.questionId === questionId);
    };

    return (
        <div className='w-full h-auto'>
            <Drawer
                open={showReviewSheet}
                direction="bottom"
                className="rounded-tl-md rounded-tr-md"
                style={{ height: "98vh" }}
            >
                <div className="flex flex-col w-[full] h-full">
                    <div className="p-5 flex justify-between items-center h-[69px] w-full border-b-[1.5px] border-t-[1.5px] border-[#EAECF0] rounded-tl-[18px] rounded-tr-[16px]">
                        <span className="text-lg font-semibold text-[#1D2939]">Review Attempted Questions</span>
                        <span className="text-lg font-semibold text-[#1D2939] flex items-center justify-center gap-2">
                            <Image width={24} height={24} src="/icons/alarm-clock.svg" alt="timer" />
                            <span className="text-lg font-medium">Time Taken -</span> {convertSecondsToHHMM(timeTaken)}
                        </span>
                        <button
                            className="w-auto h-[44px] px-8 bg-[#FFFFFF] border-[1px] border-[#EAECF0] rounded-[8px] flex items-center justify-center hover:bg-[#F2F4F7]"
                            onClick={() => setShowReviewSheet(false)}
                        >
                            <div className="w-auto h-full flex items-center justify-center text-sm font-semibold text-[#1D2939] border-none">
                                Close
                            </div>
                        </button>
                    </div>

                    <div className="overflow-y-auto p-5 flex-1">
                        <div className="gap-[20px] flex flex-col w-full">
                            <div className="flex items-center justify-center">
                                <div className="flex flex-col gap-5 items-center justify-center">
                                    {questionsList.map((q, index) => {
                                        const answeredData = getAnsweredQuestionData(q.questionId);
                                        const isAnswered = answeredData?.answered;
                                        const isCorrect = answeredData?.answeredCorrect;
                                        const selectedOption = answeredData?.selectedOption;

                                        return (
                                            <div key={q.questionId} className="w-auto h-auto rounded-[12px] px-4 border-2 border-[#EAECF0] flex py-4 flex-col items-center justify-center">
                                                <div className="bg-[#FFFFFF] w-[800px] h-auto flex flex-col gap-[20px]">
                                                    <div className="w-auto h-auto flex flex-row gap-1 mb-1">
                                                        <span className="text-[#1D2939] font-semibold text-base">
                                                            {index + 1}.
                                                        </span>
                                                        <div
                                                            className="question-content text-[#1D2939] font-semibold text-base"
                                                            dangerouslySetInnerHTML={{
                                                                __html: q.question || 'Question not available'
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="w-auto h-auto gap-[15px] flex flex-col">
                                                        <div className="flex flex-col gap-1">
                                                            {Object.entries(q.options).map(([key, value]) => {
                                                                const isSelectedOption = isAnswered && selectedOption === key;
                                                                const isCorrectOption = key === q.correctAnswer;

                                                                let radioColor = '#D0D5DD'; // default color
                                                                if (isAnswered && !isCorrect) {
                                                                    // For incorrect answers, show both selected and correct
                                                                    if (isSelectedOption) {
                                                                        radioColor = '#FF4D4F'; // wrong answer in red
                                                                    } else if (isCorrectOption) {
                                                                        radioColor = '#0B9055'; // correct answer in purple
                                                                    }
                                                                } else if (isCorrectOption) {
                                                                    radioColor = '#0B9055'; // correct answer in purple
                                                                }

                                                                let checked = false;
                                                                if (isAnswered && !isCorrect) {
                                                                    // Show both selected and correct options checked
                                                                    checked = isSelectedOption || isCorrectOption;
                                                                } else {
                                                                    // For correct answers or unanswered questions
                                                                    checked = (isAnswered && isSelectedOption) || (!isAnswered && isCorrectOption);
                                                                }

                                                                return (
                                                                    <FormControlLabel
                                                                        key={key}
                                                                        value={key}
                                                                        className="break-all flex flex-row "
                                                                        checked={checked}
                                                                        control={
                                                                            <Radio
                                                                                disabled
                                                                                checked={checked}
                                                                                sx={{
                                                                                    color: radioColor,
                                                                                    '&.Mui-checked': {
                                                                                        color: radioColor,
                                                                                    },
                                                                                }}
                                                                            />
                                                                        }
                                                                        label={<p className='text-[#667085]'>{value}</p>}
                                                                    />
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                    <hr />

                                                    {/* Status indicators */}
                                                    {isAnswered && isCorrect && (
                                                        <div className="w-[121px] h-10 items-center px-2 flex flex-row bg-[#EDFCF3] border border-solid border-[#AAF0C7] rounded-[6px] gap-1">
                                                            <Image src="/icons/green-right-mark.svg" width={24} height={24} alt="right-mark-icon" />
                                                            <span className="text-[#0A5B39] font-medium text-base">Correct</span>
                                                        </div>
                                                    )}

                                                    {isAnswered && !isCorrect && (
                                                        <div className="w-[121px] h-10 px-2 flex flex-row items-center bg-[#FEF3F2] border border-solid border-[#FFCDC9] rounded-[6px] gap-1">
                                                            <Image src="/icons/red-cancel-icon.svg" width={24} height={24} alt="red-cancel-icon" />
                                                            <span className="text-[#9A221A] font-medium text-base">Incorrect</span>
                                                        </div>
                                                    )}

                                                    {!isAnswered && (
                                                        <div className="w-[135px] h-10 px-2 flex flex-row items-center bg-[#f0f0f0] border border-solid border-[#cecece] rounded-[6px] gap-1">
                                                            <span className="text-[#979797] font-medium text-base">Not Answered</span>
                                                        </div>
                                                    )}

                                                    {/* Show explanation for incorrect or unanswered questions */}
                                                    {(!isAnswered || (isAnswered && !isCorrect)) && (
                                                        <div className="w-full h-auto bg-[#F9FAFB] border-2 border-solid border-[#F2F4F7] rounded-[8px] flex p-4">
                                                            <div className="text-[#1D2939] font-normal text-sm italic leading-[25px]"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: q.answerExplanation || 'No explanation available'
                                                                }}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-5 flex justify-between items-center h-[69px] w-full border-b-[1.5px] border-t-[1.5px] border-[#EAECF0] rounded-tl-[18px] rounded-tr-[16px]">
                        <button className='border border-lightGrey rounded-md items-center justify-center h-11 w-[111px] hover:bg-lightGrey'>
                            <span className="text-sm font-normal text-[#1D2939]">Previous</span>
                        </button>

                        <button
                            className="w-auto h-[44px] px-8 bg-[#FFFFFF] border-[1px] border-[#EAECF0] rounded-[8px] flex items-center justify-center hover:bg-[#F2F4F7]"
                            onClick={() => setShowReviewSheet(false)}
                        >
                            <div className="w-auto h-full flex items-center justify-center text-sm font-semibold text-[#1D2939] border-none">
                                Close
                            </div>
                        </button>
                    </div>
                </div>
            </Drawer >
        </div >
    );
}

export default ReviewTest;