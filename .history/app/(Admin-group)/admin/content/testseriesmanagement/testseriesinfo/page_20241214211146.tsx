"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ScheduledDialog from "@/components/AdminComponents/QuizInfoDailogs/scheduledDailog";
import Delete from "@/components/AdminComponents/QuizInfoDailogs/DeleteDailogue";
import End from "@/components/AdminComponents/QuizInfoDailogs/EndDailogue";
import Paused from "@/components/AdminComponents/QuizInfoDailogs/PauseDailogue";
import Resume from "@/components/AdminComponents/QuizInfoDailogs/ResumeDailogue";
import StudentsAttemptedTestseries from '@/components/AdminComponents/TestseriesInfo/StudentsAttemptedTestseries';
import Content from '@/components/AdminComponents/TestseriesInfo/Content';
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Tabs, Tab } from "@nextui-org/react";

function TestSeriesInfo() {

    const ContentCount = 78;
    const StudentsattemptedCount = 10;
    const [activeTab, setActiveTab] = useState('Content');

    // State to manage each dialog's visibility
    const [isScheduledDialogOpen, setIsScheduledDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isEndDialogOpen, setIsEndDialogOpen] = useState(false);
    const [isPausedDialogOpen, setIsPausedDialogOpen] = useState(false);
    const [isMakeLiveNowDialogOpen, setIsMakeLiveNowDialogOpen] = useState(false);
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
            <div className="w-full h-auto flex flex-col pb-2">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-3 py-1 items-center">
                        <span className="text-[#1D2939] text-2xl font-semibold">Phodu JEE Mains Test Series 2025</span>
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
                        {/* BUTTON FOR EDIT AND DELETE */}
                        {/* <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full">
                            <Image src="/icons/edit-icon.svg" width={18} height={18} alt="Edit-icon" />
                            <span className="text-sm text-[#0C111D] font-normal">Edit </span>
                        </button>
                        <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full">
                            <Image src="/icons/delete.svg" width={18} height={18} alt="delete-icon" />
                            <span className="text-sm text-[#DE3024] font-normal">Delete </span>
                        </button> */}
                        {/* Button for Resume  */}
                        <button
                            className="w-auto p-3 gap-2 flex-row flex rounded-[8px] h-[40px] items-center"
                            onClick={() => setIsResumeOpen(true)}
                        >
                            <Image src="/icons/resume.svg" width={18} height={18} alt="Resume -icon" />
                            <span className="text-sm text-[#9012FF]  font-medium">Resume</span>
                        </button>
                        {/* Button for Scheduled  */}
                        <button
                            className="w-auto p-3 gap-2 flex-row flex bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center  hover:bg-[#F2F4F7]"
                            onClick={() => setIsScheduledDialogOpen(true)}>
                            <Image src="/icons/select-date.svg" width={18} height={18} alt="Calendar" />
                            <span className="text-sm text-[#0C111D]  font-medium">Schedule</span>
                        </button>
                        {/* Button for Publish  */}
                        <button className="w-auto p-3 gap-2 flex-row flex bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center  hover:bg-[#F2F4F7]"
                        >
                            <Image src="/icons/publish-quiz.svg" width={18} height={18} alt="publish-icon" />
                            <span className="text-sm text-[#0C111D] font-normal">Publish</span>
                        </button>
                        {/* Button for Duplicate  */}
                        <button className="w-auto p-3 gap-2 flex-row flex bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center  hover:bg-[#F2F4F7]"
                        >
                            <Image src="/icons/duplicate.svg" width={18} height={18} alt="duplicate" />
                            <span className="text-sm text-[#0C111D] font-normal">Duplicate</span>
                        </button>
                        {/* Button for Pause  */}
                        <button className="w-auto p-3 gap-2 flex-row flex bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center  hover:bg-[#F2F4F7]"
                            onClick={() => setIsPausedDialogOpen(true)}>
                            <Image src="/icons/pausequiz.svg" width={18} height={18} alt="Paused-icon" />
                            <span className="text-sm text-[#0C111D] font-normal">Pause</span>
                        </button>
                        {/* Button for End  */}
                        <button className="w-auto p-3 gap-2 flex-row flex bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center  hover:bg-[#F2F4F7]"
                            onClick={() => setIsEndDialogOpen(true)}>
                            <Image src="/icons/endquiz.svg" width={18} height={18} alt="End-icon" />
                            <span className="text-sm text-[#DE3024]  font-normal">End</span>
                        </button>
                        {/* Button of Three dots */}
                        <Popover
                            placement="bottom-end"
                        >
                            <PopoverTrigger>
                                <button
                                    className="w-10 p-[10px] h-[40px] gap-1 flex-row flex  bg-[#FFFFFF] rounded-md  hover:bg-[#F2F4F7]
                                        border border-solid border-[#EAECF0] shadow-none"
                                    style={{ outline: "none" }}
                                >
                                    <Image src="/icons/three-dots.svg" width={18} height={18} alt="three-dots" />
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="flex flex-col px-0 text-sm font-normal bg-white border border-lightGrey rounded-md w-[167px] shadow-md"
                            >
                                <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full">
                                    <Image src="/icons/edit-icon.svg" width={18} height={18} alt="Edit-icon" />
                                    <span className="text-sm text-[#0C111D] font-normal">Edit</span>
                                </button>
                                <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full"
                                    onClick={() => setIsDeleteDialogOpen(true)}>
                                    <Image src="/icons/delete.svg" width={18} height={18} alt="delete-icon" />
                                    <span className="text-sm text-[#DE3024] font-normal">Delete</span>
                                </button>
                            </PopoverContent>
                        </Popover>
                    </div>
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
                    <span className="text-[#475467] font-normal text-[13px]">Test Series will be live on 12 Jan, 2024   05:30 PM</span>
                </div>
                <button
                    onClick={() => setIsScheduledDialogOpen(true)}>
                    <Image src="/icons/edit-icon.svg" width={18} height={18} alt="Edit-icon" />
                </button>
            </div>
            <div className="flex flex-row mt-4 gap-4">
                <Image className='w-[19.375rem] h-[12.25rem]' src='/images/Frame.png' alt='course img' width={310} height={196} />
                <div className="flex-col">
                    <div className="flex flex-row items-center mt-1 gap-1">
                        <p className="text-[#667085] font-normal text-sm">Created by</p>
                        <Image
                            src="/icons/profile-pic2.svg"
                            width={24}
                            height={24}
                            alt="profile-icons"
                        />
                        <p className="text-[#1D2939] font-medium text-sm">Jenny Wilson</p>
                    </div>
                    <h4 className="mt-4 text-sm text-[#344054] leading-[22px] font-normal">
                        The Phodu JEE Mains Test Series 2025 is designed to provide students with an in-depth understanding of bit manipulation techniques and the use of bitsets in data structures.The BITSET Full Course is designed to provide students with an in-depth understanding of bit manipulation techniques and the use of bitsets in data structures.
                    </h4>
                    <div className="flex flex-row items-center h-[24px] my-4 gap-2">
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
                    <div className='flex flex-row items-center gap-2'>
                        <p className='text-xl text-[#1D2939] font-semibold'>&#8377;3,990</p>
                        <p className='text-base text-[#667085] font-normal'><s>&#8377;7,499</s></p>
                        <p className='h-fit px-3 py-0.5 text-white text-xs font-semibold bg-[#DB6704] rounded-full'>86% off</p>
                    </div>
                </div>
            </div>
            <div className="w-full h-auto mt-4 flex flex-row gap-4 ">
                <div className="w-full flex flex-col p-4 border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-xl">
                    <span className="text-[#667085] font-normal text-sm">Test Series starts</span>
                    <span className="font-medium text-[#1D2939] text-base">-</span>
                </div>
                <div className="w-full flex flex-col p-4 border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-xl">
                    <span className="text-[#667085] font-normal text-sm">Test Series ends</span>
                    <span className="font-medium text-[#1D2939] text-base">-</span>
                </div>
                <div className="w-full flex flex-col p-4 border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-xl">
                    <span className="text-[#667085] font-normal text-sm">Total Questions</span>
                    <span className="font-medium text-[#1D2939] text-base">95</span>
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
                        key="Content"
                        title={
                            <div className="flex items-center space-x-2">
                                <span className="font-medium text-base">
                                    Content
                                </span>
                                {ContentCount > 0 && (
                                    <div className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm bg-[#EDE4FF] border border-[#EDE4FF] font-medium text-[#7400E0]">
                                        {ContentCount}
                                    </div>
                                )}
                            </div>
                        }
                    >
                        <Content />
                    </Tab>

                    <Tab
                        key="Students attempted"
                        title={
                            <div className="flex items-center space-x-2">
                                <span className="font-medium text-base">
                                    Students attempted
                                </span>
                                {StudentsattemptedCount > 0 && (
                                    <div className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm bg-[#EDE4FF] border border-[#EDE4FF] font-medium text-[#7400E0]">
                                        {StudentsattemptedCount}
                                    </div>
                                )}
                            </div>
                        }
                    >
                        <StudentsAttemptedTestseries />
                    </Tab>
                </Tabs>
            </div>
            {/* Dialog components with conditional rendering */}
            {isScheduledDialogOpen && <ScheduledDialog onClose={() => setIsScheduledDialogOpen(false)} />}
            {isDeleteDialogOpen && <Delete onClose={() => setIsDeleteDialogOpen(false)} open={isDeleteDialogOpen} />}
            {isEndDialogOpen && <End onClose={() => setIsEndDialogOpen(false)} />}
            {isPausedDialogOpen && <Paused onClose={() => setIsPausedDialogOpen(false)} />}
            {isResumeOpen && < Resume open={isResumeOpen} onClose={() => setIsResumeOpen(false)} />}
        </div>
    );
}

export default TestSeriesInfo;
