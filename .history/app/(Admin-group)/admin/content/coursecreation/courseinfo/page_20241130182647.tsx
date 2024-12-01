"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ScheduledDialog from "@/components/AdminComponents/QuizInfoDailogs/scheduledDailog";
import Delete from "@/components/AdminComponents/QuizInfoDailogs/DeleteQuiz";
import End from "@/components/AdminComponents/QuizInfoDailogs/EndQuiz";
import Paused from "@/components/AdminComponents/QuizInfoDailogs/PausedQuiz";
import Resume from "@/components/AdminComponents/QuizInfoDailogs/ResumeQuiz";
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
                        {/* <div className="bg-[#F2F4F7] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                            <span className="w-[6px] h-[6px] bg-[#182230] rounded-full "></span>
                            <span className="font-medium text-[#182230] text-xs">Saved</span>
                        </div> */}
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
                        <div className="bg-[#EDE4FF] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                            <span className="w-[6px] h-[6px] bg-[#7400E0] rounded-full "></span>
                            <span className="font-medium text-[#7400E0] text-xs">Live</span>
                        </div>

                        <div className="flex flex-row gap-2">
                            {/* FOR SAVED--> */}
                            {/* <button className="w-auto p-3 gap-2 flex-row flex bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center">
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
                                    <button className=" flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#F2F4F7]">
                                        <Image src='/icons/delete.svg' alt="Delete-icon" width={18} height={18} />
                                        <p className="text-sm text-[#DE3024] font-normal">Delete</p>
                                    </button>
                                </PopoverContent>
                            </Popover> */}
                            {/* Button for Pause  */}
                            <button className="w-auto p-3 gap-2 flex-row flex bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center"
                                onClick={() => setIsPausedDialogOpen(true)}>
                                <Image src="/icons/pausequiz.svg" width={18} height={18} alt="Paused-icon" />
                                <span className="text-sm text-[#0C111D] font-normal">Pause</span>
                            </button>
                            {/* Button for End  */}
                            <button className="w-auto p-3 gap-2 flex-row flex bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center"
                                onClick={() => setIsEndDialogOpen(true)}>
                                <Image src="/icons/endquiz.svg" width={18} height={18} alt="End-icon" />
                                <span className="text-sm text-[#DE3024]  font-normal">End</span>
                            </button>
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
                        <button>
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
            {isScheduledDialogOpen && <ScheduledDialog onClose={() => setIsScheduledDialogOpen(false)} />}
            {isDeleteDialogOpen && <Delete onClose={() => setIsDeleteDialogOpen(false)} open={isDeleteDialogOpen} />}
            {isEndDialogOpen && <End onClose={() => setIsEndDialogOpen(false)} />}
            {isPausedDialogOpen && <Paused onClose={() => setIsPausedDialogOpen(false)} />}
            {isResumeOpen && < Resume open={isResumeOpen} onClose={() => setIsResumeOpen(false)} />}

        </div>
    );
}

export default CourseInfo;