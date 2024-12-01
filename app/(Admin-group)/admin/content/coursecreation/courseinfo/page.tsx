"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ScheduledDialog from "@/components/AdminComponents/QuizInfoDailogs/scheduledDailog";
import DeleteQuiz from "@/components/AdminComponents/QuizInfoDailogs/DeleteDailogue";
import EndQuiz from "@/components/AdminComponents/QuizInfoDailogs/EndDailogue";
import PausedQuiz from "@/components/AdminComponents/QuizInfoDailogs/PauseDailogue";
import MakeLiveNow from "@/components/AdminComponents/QuizInfoDailogs/MakeLiveNow";
import ResumeQuiz from "@/components/AdminComponents/QuizInfoDailogs/ResumeDailogue";
import Questions from "@/components/AdminComponents/QuizInfo/Questions";
import StudentsAttemptedCourseInfo from '@/components/AdminComponents/Courseinfo/StudentsAttemptedCourseInfo';
import CourseContent from '@/components/AdminComponents/Courseinfo/CourseContent'
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Tabs, Tab } from "@nextui-org/react";

function CourseInfo() {
    const CourseContentCount = 78;
    const StudentspurchasedCount = 10;
    const [activeTab, setActiveTab] = useState('CourseContent');


    // State to manage each dialog's visibility
    const [isScheduledDialogOpen, setIsScheduledDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isEndDialogOpen, setIsEndDialogOpen] = useState(false);
    const [isPausedDialogOpen, setIsPausedDialogOpen] = useState(false);
    const [isResumeOpen, setIsResumeOpen] = useState(false);

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
                        {/* SAVED */}
                        <div className="bg-[#F2F4F7] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                            <span className="w-[6px] h-[6px] bg-[#182230] rounded-full "></span>
                            <span className="font-medium text-[#182230] text-xs">Saved</span>
                        </div>
                        {/* FINISHED */}
                        {/* <div className="bg-[#D3F8E0] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                            <span className="w-[6px] h-[6px] bg-[#0A5B39] rounded-full "></span>
                            <span className="font-medium text-[#0A5B39] text-xs">Finished</span>
                        </div> */}
                        {/* PAUSED */}
                        {/* <div className="bg-[#FFEFC6] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                            <span className="w-[6px] h-[6px] bg-[#93360D] rounded-full "></span>
                            <span className="font-medium text-[#93360D] text-xs">Pause</span>
                        </div> */}
                        {/* SCHEDULED */}
                        {/* <div className="bg-[#E5F4FF] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                            <span className="w-[6px] h-[6px] bg-[#175CD3] rounded-full "></span>
                            <span className="font-medium text-[#175CD3] text-xs">Scheduled</span>
                        </div> */}
                        {/* LIVE*/}
                        {/* <div className="bg-[#EDE4FF] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                            <span className="w-[6px] h-[6px] bg-[#7400E0] rounded-full "></span>
                            <span className="font-medium text-[#7400E0] text-xs">Live</span>
                        </div> */}

                        <div className="flex flex-row gap-2">
                            {/* FOR SAVED--> */}
                            <button className="w-auto p-3 gap-2 flex-row flex bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center">
                                <Image src="/icons/edit-icon.svg" width={18} height={18} alt="Edit-icon" />
                                <span className="text-sm text-[#0C111D] font-normal">Edit</span>
                            </button>
                            <Popover placement="bottom-end">
                                <PopoverTrigger>
                                    <button
                                        className="w-10 p-[10px] h-[40px] gap-1 flex-row flex  bg-[#FFFFFF] rounded-md  focus:outline-none
                                        border border-solid border-[#EAECF0] shadow-none">
                                        <Image src="/icons/three-dots.svg" width={18} height={18} alt="three-dots" />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[10.438rem] py-1 px-0 bg-white border border-lightGrey rounded-md">
                                    <button className="flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#F2F4F7]">
                                        <Image src='/icons/publish-quiz.svg' alt="Publish-icon" width={18} height={18} />
                                        <p className="text-sm text-[#0C111D] font-normal">Publish</p>
                                    </button>
                                    <button className=" flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#F2F4F7]"
                                        onClick={() => setIsDeleteDialogOpen(true)}>
                                        <Image src='/icons/delete.svg' alt="Delete-icon" width={18} height={18} />
                                        <p className="text-sm text-[#DE3024] font-normal">Delete</p>
                                    </button>
                                </PopoverContent>
                            </Popover>
                            {/* Button for Pause  */}
                            {/* <button className="w-auto p-3 gap-2 flex-row flex bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center"
                                onClick={() => setIsPausedDialogOpen(true)}>
                                <Image src="/icons/pausequiz.svg" width={18} height={18} alt="Paused-icon" />
                                <span className="text-sm text-[#0C111D] font-normal">Pause</span>
                            </button>
                            {/* Button for End  
                            <button className="w-auto p-3 gap-2 flex-row flex bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center"
                                onClick={() => setIsEndDialogOpen(true)}>
                                <Image src="/icons/endquiz.svg" width={18} height={18} alt="End-icon" />
                                <span className="text-sm text-[#DE3024]  font-normal">End</span>
                            </button> */}
                            {/* Button for Resume  */}
                            {/* <button
                                className="w-auto p-3 gap-2 flex-row flex rounded-[8px] h-[40px] items-center"
                                onClick={() => setIsResumeOpen(true)}
                            >
                                <Image src="/icons/resume.svg" width={18} height={18} alt="Resume -icon" />
                                <span className="text-sm text-[#9012FF]  font-medium">Resume</span>
                            </button> */}
                            {/* Button for Scheduled  */}
                            {/* <button
                                className="w-auto p-3 gap-2 flex-row flex bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center"
                                onClick={() => setIsScheduledDialogOpen(true)}>
                                <Image src="/icons/select-date.svg" width={18} height={18} alt="Calendar" />
                                <span className="text-sm text-[#0C111D]  font-medium">Schedule</span>
                            </button> */}
                            {/* Button for Delete */}
                            {/* <button
                                className="w-auto p-3 gap-2 flex-row flex bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center"
                                onClick={() => setIsDeleteDialogOpen(true)}>
                                <Image src="/icons/delete.svg" width={18} height={18} alt="Delete" />
                                <span className="text-sm text-[#DE3024]  font-medium">Delete</span>
                            </button> */}
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
                            <span className="text-[#475467] font-normal text-[13px]">Course will be live on 12 Jan, 2024   05:30 PM</span>
                        </div>
                        <button
                            onClick={() => setIsScheduledDialogOpen(true)}>
                            <Image src="/icons/edit-icon.svg" width={18} height={18} alt="Edit-icon" />
                        </button>
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

            <div className="pt-3 w-full flex flex-col">
                <Tabs
                    aria-label="Test series Info Tabs"
                    color="primary"
                    variant="underlined"
                    selectedKey={activeTab}
                    onSelectionChange={(key) => setActiveTab(key as string)}
                    classNames={{
                        tabList: "gap-6 w-full relative rounded-none p-0 border-b border-solid border-[#EAECF0]",
                        cursor: "w-full bg-[#7400E0]",
                        tab: "max-w-fit px-0 h-12",
                        tabContent: "group-data-[selected=true]:text-[#7400E0] hover:text-[#7400E0] ",
                    }}
                >
                    <Tab
                        key="Course Content"
                        title={
                            <div className="flex items-center space-x-2">
                                <span className="font-medium text-base">
                                    Course Content
                                </span>
                                {CourseContentCount > 0 && (
                                    <div className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm bg-[#EDE4FF] border border-[#EDE4FF] font-medium text-[#7400E0]">
                                        {CourseContentCount}
                                    </div>
                                )}
                            </div>
                        }
                    >
                        <CourseContent />
                    </Tab>

                    <Tab
                        key="Students purchased"
                        title={
                            <div className="flex items-center space-x-2">
                                <span className="font-medium text-base">
                                    Students purchased
                                </span>
                                {StudentspurchasedCount > 0 && (
                                    <div className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm bg-[#EDE4FF] border border-[#EDE4FF] font-medium text-[#7400E0]">
                                        {StudentspurchasedCount}
                                    </div>
                                )}
                            </div>
                        }
                    >
                        <StudentsAttemptedCourseInfo />
                    </Tab>
                </Tabs>
            </div>

            {/* Dialog components with conditional rendering */}
            {isScheduledDialogOpen && <ScheduledDialog onClose={() => setIsScheduledDialogOpen(false)} />}
            {isDeleteDialogOpen && <DeleteQuiz onClose={() => setIsDeleteDialogOpen(false)} open={isDeleteDialogOpen} />}
            {isEndDialogOpen && <EndQuiz onClose={() => setIsEndDialogOpen(false)} />}
            {isPausedDialogOpen && <PausedQuiz onClose={() => setIsPausedDialogOpen(false)} />}
            {isResumeOpen && < ResumeQuiz open={isResumeOpen} onClose={() => setIsResumeOpen(false)} />}

        </div>
    );
}

export default CourseInfo;