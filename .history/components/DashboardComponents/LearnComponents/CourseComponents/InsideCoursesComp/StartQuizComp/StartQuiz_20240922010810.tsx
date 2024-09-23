"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import StartQuiz from "./StartQuiz";

function Bit21() {
    const [activeTab, setActiveTab] = useState<string>('');
    const [showQuizDialog, setShowQuizDialog] = useState(false);
    const [isQuizOpen, setIsQuizOpen] = useState(false);
    const router = useRouter();

    const onStartQuiz = () => {
        setIsQuizOpen(true);
        setShowQuizDialog(true);
    };

    return (
        <div className="relative flex flex-col flex-1 pb-8">
            {/* Header */}
            <div className="h-[70px] ">
                <div className="my-5 flex items-center ml-7">
                    <button className='flex items-center ml-5'>
                        <div
                            className="text-[#1D2939] h-[24px] w-auto"
                            style={{ fontSize: "16px", fontWeight: "600" }}
                        >
                            Courses
                        </div>
                        <div className="ml-3 w-[24px]">
                            <Image
                                src="/icons/course-left.svg"
                                width={6}
                                height={12}
                                alt="left-arrow"
                            />
                        </div>
                    </button>
                    <div
                        className="text-[#667085] h-full w-auto -ml-1"
                        style={{ fontSize: "16px", fontWeight: "500" }}
                    >
                        BITSET Full Course
                    </div>
                </div>
            </div>

            {/* Course Information */}
            <div className="flex flex-col ml-12 gap-[20px]">
                <span className="w-[126px] h-[24px] text-[#1D2939] text-lg font-bold ">
                    Maths Test 01
                </span>
                <span className="w-[140px] h-[24px] text-[#1D2939] text-base font-bold">
                    Quiz Information
                </span>
            </div>
            <div className="w-[741px] h-[125px] ml-12 font-normal mt-3 text-[#667085] leading-relaxed">
                <span className="text-sm">
                    The BITSET Full Course is designed to provide students with an in-depth understanding of bit manipulation techniques and the use of bitsets in data structures. This course will cover fundamental concepts, practical applications, and advanced techniques used in competitive programming and software development. Students will learn how to efficiently solve problems using bitwise operations and gain hands-on experience through coding exercises and projects.
                </span>
            </div>

            {/* Quiz Details */}
            <div className="flex flex-col ml-12 mt-10 w-[602px] h-auto space-y-5">
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
                        alt="questions"
                        className="mr-2"
                    />
                    10 Questions
                </span>
                <span className="flex items-center font-semibold text-sm text-[#1D2939]">
                    <Image
                        src="/icons/check-list.svg"
                        width={20}
                        height={20}
                        alt="check-list"
                        className="mr-2"
                    />
                    5 Marks per question
                </span>
            </div>

            {/* Start Quiz Button */}
            <div className="h-[65px] ml-11 mr-96" style={{ borderRadius: "5px", position: "relative" }}>
                <div className="flex justify-between items-end h-full">
                    <button
                        onClick={onStartQuiz}
                        className="bg-[#8501FF] text-[#FFFFFF] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px] ml-auto"
                        style={{
                            border: "1px solid #800EE2",
                            boxShadow: "0px -4px 4px 0px #1018281F inset, 0px 3px 2px 0px #FFFFFF3D inset"
                        }}
                    >
                        Start Quiz
                    </button>
                </div>
            </div>

            {/* Quiz Dialog */}
            {showQuizDialog && <StartQuiz isOpen={isQuizOpen} setIsOpen={setIsQuizOpen} />}
        </div>
    );
}

export default Bit21;
