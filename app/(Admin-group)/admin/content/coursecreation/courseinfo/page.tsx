"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ScheduledDialog from "@/components/AdminComponents/QuizInfoDailogs/scheduledDailog";
import DeleteQuiz from "@/components/AdminComponents/QuizInfoDailogs/DeleteQuiz";
import EndQuiz from "@/components/AdminComponents/QuizInfoDailogs/EndQuiz";
import PausedQuiz from "@/components/AdminComponents/QuizInfoDailogs/PausedQuiz";
import MakeLiveNow from "@/components/AdminComponents/QuizInfoDailogs/MakeLiveNow";
import ResumeQuiz from "@/components/AdminComponents/QuizInfoDailogs/ResumeQuiz";
import Questions from "@/components/AdminComponents/QuizInfo/Questions";
import StudentsAttemptedCourseInfo from '@/components/AdminComponents/Courseinfo/StudentsAttemptedCourseInfo';
import CourseContent from '@/components/AdminComponents/Courseinfo/CourseContent'
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";

function CourseInfo() {
    const [activeTab, setActiveTab] = useState('CourseContent');

    const handleTabClick = (tabName: React.SetStateAction<string>) => {
        setActiveTab(tabName);
    };
    // State to manage each dialog's visibility
    const [isScheduledDialogOpen, setIsScheduledDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isEndDialogOpen, setIsEndDialogOpen] = useState(false);
    const [isPausedDialogOpen, setIsPausedDialogOpen] = useState(false);
    const [isMakeLiveNowDialogOpen, setIsMakeLiveNowDialogOpen] = useState(false);
    const [isResumeQuizOpen, setIsResumeQuizOpen] = useState(false);

    // Handlers for ScheduledDialog
    const openScheduledDialog = () => setIsScheduledDialogOpen(true);
    const closeScheduledDialog = () => setIsScheduledDialogOpen(false);

    // Handlers for DeleteQuiz dialog
    const openDeleteDialog = () => setIsDeleteDialogOpen(true);
    const closeDeleteDialog = () => setIsDeleteDialogOpen(false);

    // Handlers for EndQuiz dialog
    const openEndQuiz = () => setIsEndDialogOpen(true);
    const closeEndQuiz = () => setIsEndDialogOpen(false);

    // Handlers for  PausedQuiz dialog
    const openPausedQuiz = () => setIsPausedDialogOpen(true);
    const closePausedQuiz = () => setIsPausedDialogOpen(false);

    // Handlers for  MakeLiveNow dialog
    const openMakeLiveNowQuiz = () => setIsMakeLiveNowDialogOpen(true);
    const closeMakeLiveNowQuiz = () => setIsMakeLiveNowDialogOpen(false);

    // Handlers for ResumeQuiz dialog
    const openResumeQuiz = () => setIsResumeQuizOpen(true);
    const closeResumeQuiz = () => setIsResumeQuizOpen(false);

    const router = useRouter();
    // this logic is for rating 
    interface StarIconProps {
        filled: boolean;
        isHalf: boolean;
    }
    const StarIcon: React.FC<StarIconProps> = ({ filled, isHalf }) => (
        <Image
            src={filled ? (isHalf ? "/icons/half-star.svg" : "/icons/full-star.svg") : "/icons/empty-star.svg"}
            width={20}
            height={20}
            alt={isHalf ? "half star" : filled ? "full star" : "empty star"}
        />
    );
    const rating = 1.5; // The rating value
    const totalStars = 5;

    return (
        <div className="flex w-full h-auto overflow-y-auto flex-col  p-8">
            <div className="flex items-center">
                <button className="flex items-center ml-1" onClick={() => router.back()}>
                    <div className="text-[#1D2939] h-[24px] w-auto text-[16px] font-semibold">
                        Courses
                    </div>
                    <div className="ml-3 w-[24px]">
                        <Image src="/icons/course-left.svg" width={6} height={12} alt="left-arrow" />
                    </div>
                </button>
                <div className="text-[#667085] h-full w-auto -ml-1 text-[16px] font-semibold">
                    BITSET Full Course
                </div>
            </div>
            {/* Course content */}
            <div className="bg-[#FFFFFF] mt-4 p-6 border border-solid border-[#EAECF0] rounded-[16px] flex flex-row  gap-6 h-auto">
                <Image
                    src="/icons/image.png"
                    width={395}
                    height={244}
                    alt="left-arrow" />
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-row justify-between items-center h-[40px]">
                        <div className="bg-[#F2F4F7] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                            <span className="w-[6px] h-[6px] bg-[#182230] rounded-full "></span>
                            <span className="font-medium text-[#182230] text-xs">Saved</span>
                        </div>
                        <div className="flex flex-row gap-2">
                            <button className="w-auto p-3 gap-2 flex-row flex bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center"
                            >
                                <Image src="/icons/publish-quiz.svg" width={18} height={18} alt="publish-quiz" />
                                <span className="text-sm text-[#0C111D] font-normal">Publish</span>
                            </button>
                            <button
                                className="w-10 p-[10px] h-[40px] gap-1 flex-row flex  bg-[#FFFFFF] rounded-md 
                                        border border-solid border-[#EAECF0] shadow-none"
                                style={{ outline: "none" }}
                            >
                                <Image src="/icons/three-dots.svg" width={18} height={18} alt="three-dots" />
                            </button>
                        </div>
                    </div>
                    <span className="text-[#1D2939] font-bold text-lg">BITSET Full Course</span>
                    <div className=' text-[#667085] text-sm font-normal '>
                        <p>The BITSET Full Course is designed to provide students with an in-depth understanding of bit manipulation techniques and the use of bitsets in data structures.</p>
                    </div>
                    {/* this code below is for rating  */}
                    <div className="flex items-center gap-2 flex-row h-[24px] ">
                        <div className="flex items-center">
                            {[...Array(Math.floor(rating))].map((_, index) => (
                                <StarIcon key={`filled-${index}`} filled={true} isHalf={false} />
                            ))}
                            {rating % 1 >= 0.5 && <StarIcon filled={true} isHalf={true} />}
                            {[...Array(totalStars - Math.ceil(rating))].map((_, index) => (
                                <StarIcon key={`empty-${index}`} filled={false} isHalf={false} />
                            ))}
                        </div>
                        <div className="text-[#1D2939] text-sm font-bold flex items-center flex-row">
                            {rating.toFixed(1)}
                            <span className="text-[#1D2939] font-normal text-sm ml-1">
                                <span className="flex items-center">
                                    <span className="inline-block">({`500+`}</span>
                                    <span className="inline-block">Ratings)</span>
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-row gap-3 items-center">
                        <div className="text-[#1D2939] text-2xl font-bold">
                            ₹ 3,990
                        </div>
                        <div className="text-[#667085] text-base font-normal line-through">
                            ₹ 7,499
                        </div>
                        <div className="bg-[#DB6704] w-[76px] h-[25px] flex items-center justify-center rounded-full text-white text-xs font-semibold">
                            86% off
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col mt-4">
                <div className="relative flex">
                    <div className="pt-[10px]">
                        <button
                            onClick={() => handleTabClick('CourseContent')}
                            className={`relative py-2 pr-4 text-base font-medium transition duration-200 ${activeTab === 'CourseContent' ? 'text-[#7400E0]' : 'text-[#667085] hover:text-[#7400E0]'
                                } focus:outline-none`}
                        >
                            Course Content
                        </button>
                    </div>
                    <div className="pt-[10px]">
                        <button
                            onClick={() => handleTabClick('StudentsPurchased')}
                            className={`relative py-2 px-4 text-base transition duration-200 ${activeTab === 'StudentsPurchased' ? 'text-[#7400E0]' : 'text-[#667085] hover:text-[#7400E0]'
                                } focus:outline-none`}
                            style={{ fontSize: '16px', fontWeight: '500' }}
                        >
                            Students purchased
                            <span
                                className="ml-2 min-w-6 px-2 py-[0px] top-[-1px] text-sm text-[#9012FF] text-center font-medium bg-[#EDE4FF] rounded-full relative"
                            >
                                10
                            </span>
                        </button>
                    </div>
                    <div
                        className="absolute bg-[#7400E0] transition-all duration-300"
                        style={{
                            height: '1.8px',
                            width: activeTab === 'CourseContent' ? '128px' : '200px', // Adjusted width to match the text
                            left: activeTab === 'CourseContent' ? '0px' : '155px', // Adjust left position to match each button
                            bottom: '-8px',
                        }}
                    />
                </div>
                <hr className="h-px bg-[#EAECF0] mt-2" />
            </div>
            {activeTab === 'CourseContent' && (
                <div>
                    <CourseContent />
                </div>
            )}
            {activeTab === 'StudentsPurchased' && (
                <div>
                    <StudentsAttemptedCourseInfo />
                </div>
            )}

            {/* Dialog components with conditional rendering */}
            {isScheduledDialogOpen && <ScheduledDialog onClose={closeScheduledDialog} />}
            {isDeleteDialogOpen && <DeleteQuiz onClose={closeDeleteDialog} open={true} />}
            {isEndDialogOpen && <EndQuiz onClose={closeEndQuiz} />}
            {isPausedDialogOpen && <PausedQuiz onClose={closePausedQuiz} />}
            {isMakeLiveNowDialogOpen && < MakeLiveNow onClose={closeMakeLiveNowQuiz} open={true} />}
            {isResumeQuizOpen && < ResumeQuiz onClose={closeResumeQuiz} open={true} />}

        </div>
    );
}

export default CourseInfo;