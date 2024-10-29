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
import StudentsAttempts from "@/components/AdminComponents/QuizInfo/StudentsAttempts";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
function Quizinfo() {
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
        <div className="flex w-full h-auto overflow-y-auto flex-col p-8">
            <div className="w-full h-auto flex flex-col  pb-2">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-3 py-1 items-center">
                        <span className="text-[#1D2939] text-2xl font-semibold">Maths</span>
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
                <div className="flex flex-row gap-2">
                    <div className="bg-[#EAECF0] rounded-[8px] p-2 flex flex-row gap-1">
                        <Image
                            src="/icons/information-circle.svg"
                            width={20}
                            height={20}
                            alt="information-icon"
                        />
                        <span className="text-[#475467] font-normal text-[13px]">Quiz will be live on 12 Jan, 2024  05:30 PM</span>
                    </div>
                    <button
                        onClick={openScheduledDialog}               >
                        <Image src="/icons/edit-icon.svg" width={18} height={18} alt="Edit-quiz" />
                    </button>
                </div>
                <div className="p-1 flex flex-col">
                    <div className="flex items-center">
                        <span className="w-1 h-1 bg-[#1D2939] rounded-full mr-2"></span>
                        <span className="text-[#1D2939] text-sm font-normal">This quiz contains - 10 Questions</span>
                    </div>
                    <div className="flex items-center">
                        <span className="w-1 h-1 bg-[#1D2939] rounded-full mr-2"></span>
                        <span className="text-[#1D2939] text-sm font-normal">Each question will be of 3 Marks</span>
                    </div>
                    <div className="flex items-center">
                        <span className="w-1 h-1 bg-[#1D2939] rounded-full mr-2"></span>
                        <span className="text-[#1D2939] text-sm font-normal">There’s negative marking (-1) for each wrong</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-row gap-1">
                <span className="text-[#667085] font-normal text-sm">Created by</span>
                <Image
                    src="/icons/profile-pic2.svg"
                    width={24}
                    height={24}
                    alt="profile-icons"
                />
                <span className="text-[#1D2939] font-medium text-sm">Jenny Wilson</span>
            </div>
            <div className="w-full h-auto mt-4 flex flex-row gap-4 ">
                <div className="w-full flex flex-col p-4 border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-xl">
                    <span className="text-[#667085] font-normal text-sm">Quiz starts</span>
                    <span className="font-medium text-[#1D2939] text-base">06 Jan, 2024  05:30 PM</span>

                </div>
                <div className="w-full flex flex-col p-4 border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-xl">

                    <span className="text-[#667085] font-normal text-sm">Quiz ends</span>
                    <span className="font-medium text-[#1D2939] text-base">06 Jan, 2024  07:30 PM</span>
                </div>
                <div className="w-full flex flex-col p-4 border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-xl">

                    <span className="text-[#667085] font-normal text-sm">Marks per questions</span>
                    <span className="font-medium text-[#1D2939] text-base">3</span>
                </div>
                <div className="w-full flex flex-col p-4 border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-xl">

                    <span className="text-[#667085] font-normal text-sm">Overall quiz time</span>
                    <span className="font-medium text-[#1D2939] text-base">10 min</span>
                </div>
            </div>
            <div className="relative flex">
                <div className="pt-[10px]">
                    <button
                        onClick={Questions}
                        className={`relative py-2 px-4 text-base transition duration-200 ${activeTab === 'Questions' ? 'text-[#7400E0]' : 'text-[#667085] hover:text-[#7400E0]'} focus:outline-none`}
                        style={{ fontSize: '16px', fontWeight: '500', marginLeft: '32px' }}
                    >
                        Questions
                    </button>
                </div>
                <div className="pt-[10px]">
                    <button
                        onClick={StudentsAttempts}
                        className={`relative py-2 px-4 text-base transition duration-200 ${activeTab === 'students Attempts' ? 'text-[#7400E0]' : 'text-[#667085] hover:text-[#7400E0]'} focus:outline-none`}
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




            </div>

            <div className="active">
                <Questions />
            </div>
            <div>
                <StudentsAttempts />
            </div>

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

export default Quizinfo;