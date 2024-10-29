"use client";
import Image from "next/image";
import Collapsible from "react-collapsible";
import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import ScheduledDialog from "@/components/AdminComponents/QuizInfoDailogs/scheduledDailog";
import DeleteQuiz from "@/components/AdminComponents/QuizInfoDailogs/DeleteQuiz";
import EndQuiz from "@/components/AdminComponents/QuizInfoDailogs/EndQuiz";
import PausedQuiz from "@/components/AdminComponents/QuizInfoDailogs/PausedQuiz";
import MakeLiveNow from "@/components/AdminComponents/QuizInfoDailogs/MakeLiveNow";
import ResumeQuiz from "@/components/AdminComponents/QuizInfoDailogs/ResumeQuiz";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
function Quizinfo() {
    const questionCount = 2; // Adjust this if you have more questions
    const [expandedStates, setExpandedStates] = useState(
        Array(questionCount).fill(false)
    );

    // Toggle expand/collapse for all accordions
    const toggleExpandAll = () => {
        const areAllExpanded = expandedStates.every((state) => state);
        const newStates = expandedStates.map(() => !areAllExpanded);
        setExpandedStates(newStates);
    };

    // Toggle individual accordion
    const toggleAccordion = (index: number) => {
        const newStates = [...expandedStates];
        newStates[index] = !newStates[index];
        setExpandedStates(newStates);
    };
    // Check if all are expanded
    const areAllExpanded = expandedStates.every((state) => state);

    // function changing the color border and shadow
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const handlePopoverOpen = () => setIsPopoverOpen(true);
    const handlePopoverClose = () => setIsPopoverOpen(false);

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
            <div className="flex flex-row mt-6 w-full h-[40px] justify-between items-center">
                <span className="font-semibold text-lg text-[#1D2939]">Questions</span>
                <button className="flex flex-row gap-1 h-[40px] items-center px-3" onClick={toggleExpandAll}>
                    <Image src="/icons/expandall.svg" width={18} height={18} alt="Expand all icon" />
                    <span className="font-normal text-[#475467] text-sm">
                        {areAllExpanded ? "Collapse all" : "Expand all"}
                    </span>
                </button>
            </div>
            <div className="flex flex-col gap-2 mt-3">
                {[...Array(questionCount)].map((_, index) => (
                    <div
                        key={index}
                        className={`bg-[#FFFFFF] h-auto rounded-xl border border-solid ${expandedStates[index] ? "border-[#EAECF0] hover:border-[#9012FF]" : "border-[#EAECF0] hover:border-[#182230]"
                            }`}
                    >

                        <Collapsible
                            open={expandedStates[index]}
                            trigger={
                                <div
                                    className="h-auto flex flex-row gap-3 p-6"
                                    onClick={() => toggleAccordion(index)}
                                >
                                    <div className="h-6 w-6 rounded-[4px] bg-[#EAECF0] flex justify-center">
                                        <span className="text-[#1D2939] font-semibold text-base">
                                            {index + 1}
                                        </span>
                                    </div>
                                    <span className="font-semibold text-base text-[#1D2939]">
                                        Question {index + 1} content goes here.
                                    </span>
                                </div>
                            }
                        >
                            <div className="h-auto gap-[15px] flex flex-col px-6 pb-[8px] hover:border-[#9012FF]">
                                <RadioGroup>
                                    <FormControlLabel
                                        value="option1"
                                        control={<Radio sx={{ color: '#D0D5DD', '&.Mui-checked': { color: '#9012FF' } }} />}
                                        label="Option 1"
                                    />
                                    <FormControlLabel
                                        value="option2"
                                        control={<Radio sx={{ color: '#D0D5DD', '&.Mui-checked': { color: '#9012FF' } }} />}
                                        label="Option 2"
                                    />
                                    <FormControlLabel
                                        value="option4"
                                        control={<Radio sx={{ color: '#D0D5DD', '&.Mui-checked': { color: '#9012FF' } }} />}
                                        label="Option 4"
                                    />
                                    <FormControlLabel
                                        value="option3"
                                        control={<Radio sx={{ color: '#D0D5DD', '&.Mui-checked': { color: '#9012FF' } }} />}
                                        label="Option 3"
                                    />
                                </RadioGroup>
                            </div>
                        </Collapsible>
                    </div>
                ))}
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