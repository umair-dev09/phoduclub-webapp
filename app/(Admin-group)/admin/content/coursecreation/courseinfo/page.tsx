"use client";
import Image from "next/image";
import React, { useState } from "react";
import ScheduledDialog from "@/components/AdminComponents/QuizInfoDailogs/scheduledDailog";
import DeleteQuiz from "@/components/AdminComponents/QuizInfoDailogs/DeleteQuiz";
import EndQuiz from "@/components/AdminComponents/QuizInfoDailogs/EndQuiz";
import PausedQuiz from "@/components/AdminComponents/QuizInfoDailogs/PausedQuiz";
import MakeLiveNow from "@/components/AdminComponents/QuizInfoDailogs/MakeLiveNow";
import ResumeQuiz from "@/components/AdminComponents/QuizInfoDailogs/ResumeQuiz";
import Questions from "@/components/AdminComponents/QuizInfo/Questions";
import StudentsAttemptedTestseries from '@/components/AdminComponents/TestseriesInfo/StudentsAttemptedTestseries';
import CourseContent from '@/components/AdminComponents/Courseinfo/CourseContent'
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";

function CourseInfo() {
    const [activeTab, setActiveTab] = useState('Questions');

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

    return (
        <div className="flex w-full h-auto overflow-y-auto flex-col mx-8 py-8">
            <div className="w-full h-auto flex flex-col pb-2">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-3 py-1 items-center">
                        <div className="bg-[#F2F4F7] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                            <span className="w-[6px] h-[6px] bg-[#182230] rounded-full "></span>
                            <span className="font-medium text-[#182230] text-xs">Saved</span>
                        </div>
                        {/* <div className="bg-[#D3F8E0] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                            <span className="w-[6px] h-[6px] bg-[#0A5B39] rounded-full "></span>
                            <span className="font-medium text-[#0A5B39] text-xs">Finished</span>
                        </div> */}
                    </div>
                    <div className="flex flex-row gap-1">
                        {/* BUTTON FOR EDIT AND DELETE QUIZ */}
                        {/* <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full">
                            <Image src="/icons/edit-icon.svg" width={18} height={18} alt="Edit-quiz" />
                            <span className="text-sm text-[#0C111D] font-normal">Edit Quiz</span>
                        </button>
                        <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full">
                            <Image src="/icons/delete.svg" width={18} height={18} alt="delete-quiz" />
                            <span className="text-sm text-[#DE3024] font-normal">Delete Quiz</span>
                        </button> */}
                        {/* Button for Resume Quiz */}
                        <button
                            className="w-auto p-3 gap-2 flex-row flex rounded-[8px] h-[40px] items-center"
                            onClick={openResumeQuiz}
                        >
                            <Image src="/icons/resume.svg" width={18} height={18} alt="Resume Quiz" />
                            <span className="text-sm text-[#9012FF]  font-medium">Resume Quiz</span>
                        </button>
                        {/* Button for Scheduled Quiz */}
                        <button
                            className="w-auto p-3 gap-2 flex-row flex bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center"
                            onClick={openScheduledDialog}>
                            <Image src="/icons/select-date.svg" width={18} height={18} alt="Calendar" />
                            <span className="text-sm text-[#0C111D]  font-medium">Schedule Quiz</span>
                        </button>
                        {/* Button for Publish Quiz */}
                        <button className="w-auto p-3 gap-2 flex-row flex bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center"
                        >
                            <Image src="/icons/publish-quiz.svg" width={18} height={18} alt="publish-quiz" />
                            <span className="text-sm text-[#0C111D] font-normal">Publish Quiz</span>
                        </button>
                        {/* Button for Duplicate Quiz */}
                        <button className="w-auto p-3 gap-2 flex-row flex bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center"
                        >
                            <Image src="/icons/duplicate.svg" width={18} height={18} alt="duplicate" />
                            <span className="text-sm text-[#0C111D] font-normal">Duplicate</span>
                        </button>
                        {/* Button for Pause Quiz */}
                        <button className="w-auto p-3 gap-2 flex-row flex bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center"
                            onClick={openPausedQuiz}>
                            <Image src="/icons/pausequiz.svg" width={18} height={18} alt="Paused-quiz" />
                            <span className="text-sm text-[#0C111D] font-normal">Pause Quiz</span>
                        </button>
                        {/* Button for End Quiz */}
                        <button className="w-auto p-3 gap-2 flex-row flex bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center"
                            onClick={openEndQuiz}>
                            <Image src="/icons/endquiz.svg" width={18} height={18} alt="End-quiz" />
                            <span className="text-sm text-[#DE3024]  font-normal">End Quiz</span>
                        </button>
                        {/* Button of Three dots */}
                        <Popover
                            placement="bottom-end"
                        >
                            <PopoverTrigger>
                                <button
                                    className="w-10 p-[10px] h-[40px] gap-1 flex-row flex  bg-[#FFFFFF] rounded-md 
                                        border border-solid border-[#EAECF0] shadow-none"
                                    style={{ outline: "none" }}
                                >
                                    <Image src="/icons/three-dots.svg" width={18} height={18} alt="three-dots" />
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="flex flex-col px-0 text-sm font-normal bg-white border border-lightGrey rounded-md w-[167px] shadow-md"
                            >
                                <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full">
                                    <Image src="/icons/edit-icon.svg" width={18} height={18} alt="Edit-quiz" />
                                    <span className="text-sm text-[#0C111D] font-normal">Edit Quiz</span>
                                </button>
                                <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full">
                                    <Image src="/icons/duplicate.svg" width={18} height={18} alt="Edit-quiz" />
                                    <span className="text-sm text-[#0C111D] font-normal">Duplicate</span>
                                </button>
                                <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full"
                                    onClick={openDeleteDialog}
                                >
                                    <Image src="/icons/delete.svg" width={18} height={18} alt="delete-quiz" />
                                    <span className="text-sm text-[#DE3024] font-normal">Delete Quiz</span>
                                </button>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </div>
            <div className="flex flex-row gap-4 bg-white border border-lightGrey rounded-2xl">
                <Image className='w-[19.375rem] h-[12.25rem]' src='/images/Frame.png' alt='course img' width={310} height={196} />
                <div className="flex-col">
                    <h4 className="mt-4 text-sm text-[#344054] leading-[22px] font-normal">
                        The Phodu JEE Mains Test Series 2025 is designed to provide students with an in-depth understanding of bit manipulation techniques and the use of bitsets in data structures.The BITSET Full Course is designed to provide students with an in-depth understanding of bit manipulation techniques and the use of bitsets in data structures.
                    </h4>
                    <p className='flex flex-row text-sm mt-6 mb-4 gap-2'><span className='font-semibold'>4.7</span> (500+ Ratings)</p>
                    <div className='flex flex-row items-center gap-2'>
                        <p className='text-xl text-[#1D2939] font-semibold'>&#8377;3,990</p>
                        <p className='text-base text-[#667085] font-normal'><s>&#8377;7,499</s></p>
                        <p className='h-fit px-3 py-0.5 text-white text-xs font-semibold bg-[#DB6704] rounded-full'>86% off</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="relative flex">
                    <div className="pt-[10px]">
                        <button
                            onClick={() => handleTabClick('Questions')}
                            className={`relative py-2 pr-4 text-base transition duration-200 ${activeTab === 'Questions' ? 'text-[#7400E0]' : 'text-[#667085] hover:text-[#7400E0]'
                                } focus:outline-none`}
                            style={{ fontSize: '16px', fontWeight: '500' }}
                        >
                            Course Content
                        </button>
                    </div>
                    <div className="pt-[10px]">
                        <button
                            onClick={() => handleTabClick('StudentsAttempts')}
                            className={`relative py-2 px-4 text-base transition duration-200 ${activeTab === 'StudentsAttempts' ? 'text-[#7400E0]' : 'text-[#667085] hover:text-[#7400E0]'
                                } focus:outline-none`}
                            style={{ fontSize: '16px', fontWeight: '500' }}
                        >
                            StudentsAttempts
                            <span
                                className="ml-2 px-2 py-[0px] text-[#9012FF] bg-[#EDE4FF] rounded-full relative"
                                style={{ fontSize: '14px', fontWeight: '500', minWidth: '24px', textAlign: 'center', top: '-1px' }}
                            >
                                10
                            </span>
                        </button>
                    </div>
                    <div
                        className="absolute bg-[#7400E0] transition-all duration-300"
                        style={{
                            height: '1.8px',
                            width: activeTab === 'Questions' ? '80px' : '180px', // Adjusted width to match the text
                            left: activeTab === 'Questions' ? '0px' : '113px', // Adjust left position to match each button
                            bottom: '-8px',
                        }}
                    />
                </div>
                <hr className="h-px bg-[#EAECF0] mt-2" />
            </div>
            {activeTab === 'Questions' && (
                <div>
                    <CourseContent />
                </div>
            )}
            {activeTab === 'StudentsAttempts' && (
                <div>
                    <StudentsAttemptedTestseries />
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