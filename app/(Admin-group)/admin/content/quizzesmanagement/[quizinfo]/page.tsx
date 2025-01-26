"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import ScheduledDialog from "@/components/AdminComponents/QuizInfoDailogs/scheduledDailog";
import ResumeQuiz from "@/components/AdminComponents/QuizInfoDailogs/ResumeDailogue";
import Questions from "@/components/AdminComponents/QuizInfo/Questions";
import StudentsAttempts from "@/components/AdminComponents/QuizInfo/StudentsAttempts";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { useRouter, useSearchParams } from 'next/navigation';
import { doc, getDoc, collection, getDocs, onSnapshot } from 'firebase/firestore';
import QuizStatus from '@/components/AdminComponents/StatusDisplay';
import { db } from "@/firebase";
import LoadingData from "@/components/Loading";
import DOMPurify from 'dompurify';
import { Tabs, Tab } from "@nextui-org/react";
import EndDialog from "@/components/AdminComponents/QuizInfoDailogs/EndDailogue";
import PausedDDialog from "@/components/AdminComponents/QuizInfoDailogs/PauseDailogue";
import { ToastContainer } from "react-toastify";
import DeleteQuiz from "@/components/AdminComponents/QuizInfoDailogs/DeleteQuiz";
import { format } from 'date-fns';

type QuizData = {
    quizName: string;
    quizDescription: string;
    status: string;
    startDate: string;
    endDate: string;
    marksPerQuestion: string;
    nMarksPerQuestion: string;
    quizTime: string;
    quizId: string;
    createdBy: string;
};

// Define the type for individual questions within the quiz
type Options = {
    A: string;
    B: string;
    C: string;
    D: string;
}
type QuestionData = {
    question: string;
    correctAnswer: string;
    answerExplanation: string;
    options: Options;   
    questionId: string;

};

function formatQuizTime(seconds: number | string): string {
    const minutes = Number(seconds) / 60;
  
    if (minutes < 60) {
      return `${Math.round(minutes)} Minutes`;
    } else {
      const hours = minutes / 60;
      return `${hours % 1 === 0 ? hours : hours.toFixed(1)} Hours`;
    }
  }

const cleanQuizDescription = (description: string) => {
    let sanitizedDescription = DOMPurify.sanitize(description);
    sanitizedDescription = sanitizedDescription.replace(
        /<span class="ql-ui" contenteditable="false"><\/span>/g,
        ''
    );
    return sanitizedDescription;
};
// { params }: { params: { quizName: string } }
// const { quizName } = params;

function Quizinfo() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const quizId = searchParams.get('qId');
    const [activeTab, setActiveTab] = useState('Questions');
    const [quizData, setQuizData] = useState<QuizData | null>(null);
    const [questions, setQuestions] = useState<QuestionData[]>([]);
    const [loading, setLoading] = useState(true);
    const [quizName, setQuizName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [liveCourseNow, setLiveCourseNow] = useState(false);
    const [isResumeOpen, setIsResumeOpen] = useState(false);
    // State to manage each dialog's visibility
    const [popoveropen, setPopoveropen] = useState(false);
    const [isScheduledDialogOpen, setIsScheduledDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isEndDialogOpen, setIsEndDialogOpen] = useState(false);
    const [isPausedDialogOpen, setIsPausedDialogOpen] = useState(false);
    const [isMakeLiveNowDialogOpen, setIsMakeLiveNowDialogOpen] = useState(false);
    const [adminDetails, setAdminDetails] = useState<{ name: string, profilePic: string } | null>(null);
    const formatStartDate = (dateString: string): string => {
        const date = new Date(dateString);
        return format(date, 'dd MMM, yyyy  hh:mm a');
    };
    // Handlers for ScheduledDialog
    const openScheduledDialog = (startDate: string, endDate: string) => {
        setIsScheduledDialogOpen(true);
        setStartDate(startDate);
        setEndDate(endDate);
    }
    const closeScheduledDialog = () => setIsScheduledDialogOpen(false);

    // Handlers for DeleteQuiz dialog
    const openDeleteDialog = (quizName: string) => {
        setQuizName(quizName);
        setIsDeleteDialogOpen(true);
    }
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
    const openResumeQuiz = () => setIsResumeOpen(true);

    useEffect(() => {
        if (!quizId) return;

        const quizDocRef = doc(db, 'quiz', quizId);
        const questionsCollectionRef = collection(db, `quiz/${quizId}/Questions`);

        const unsubscribeQuiz = onSnapshot(quizDocRef, (quizDocSnap) => {
            if (quizDocSnap.exists()) {
                setQuizData(quizDocSnap.data() as QuizData);
                setLoading(false);
            } else {
                console.error('Quiz data not found');
                setLoading(false);
            }
        });

        const unsubscribeQuestions = onSnapshot(questionsCollectionRef, (questionsSnapshot) => {
            const questionsData = questionsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as unknown as QuestionData[];

            setQuestions(questionsData);
        });

        return () => {
            unsubscribeQuiz();
            unsubscribeQuestions();
        };
    }, [quizId]);

    useEffect(() => {
        const fetchAdminDetails = async (adminId: string) => {
            const adminDoc = await getDoc(doc(db, 'admin', adminId));
            if (adminDoc.exists()) {
                setAdminDetails(adminDoc.data() as { name: string, profilePic: string });
            } else {
                console.error('No such admin!');
            }
        };

        if (quizData?.createdBy) {
            fetchAdminDetails(quizData.createdBy);
        }
    }, [quizData]);

    let formattedStartDate: string | undefined; // Declare the variable outside the block
    if (quizData?.startDate) {
        const dateObj = new Date(quizData.startDate);

        // Format the date as per your required format
        formattedStartDate = dateObj.toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        // Adjust the comma placement manually
        formattedStartDate = formattedStartDate.replace(' ', ', '); // Add a comma between the day and the month
        formattedStartDate = formattedStartDate.replace(',', ''); // Remove the unwanted comma between year and time
    }
    else {
        formattedStartDate = "-"; // If startDate is null, set it to "-"
    }

    let formattedEndDate: string | undefined; // Declare the variable outside the block
    if (quizData?.endDate) {
        const dateObj = new Date(quizData.endDate);

        // Format the date as per your required format
        formattedEndDate = dateObj.toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        // Adjust the comma placement manually
        formattedEndDate = formattedEndDate.replace(' ', ', '); // Add a comma between the day and the month
        formattedEndDate = formattedEndDate.replace(',', ''); // Remove the unwanted comma between year and time
    }
    else {
        formattedEndDate = "-"; // If startDate is null, set it to "-"
    }

    if (loading) {
        return <LoadingData />;
    }

    const handlePublishQuiz = (path: string) => {
        router.push(path);
    };
    const questionsCount = 8;
    const studentsattemptsCount = 7;
    return (
        <div className="flex w-full h-auto overflow-y-auto flex-col p-8">
            <div className="w-full h-auto flex flex-col pb-2">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-4 py-1 items-center">
                        <span className="text-[#1D2939] text-2xl font-semibold">{quizData?.quizName}</span>

                        {/* <div className="bg-[#F2F4F7] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                            <span className="w-[6px] h-[6px] bg-[#182230] rounded-full "></span>
                            <span className="font-medium text-[#182230] text-xs">{quizData?.status}</span>
                        </div> */}
                        <QuizStatus status={quizData?.status ?? ''} />
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
                        {quizData?.status === 'saved' && (
                            <button className="w-auto p-3 gap-2 flex-row flex bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center  hover:bg-[#F2F4F7]"
                                onClick={() => handlePublishQuiz(`/admin/content/quizzesmanagement/createquiz/?s=${quizData?.status}&qId=${quizData?.quizId}`)}>
                                <Image src="/icons/publish-quiz.svg" width={18} height={18} alt="publish-quiz" />
                                <span className="text-sm text-[#0C111D] font-normal">Publish Quiz</span>
                            </button>
                        )}

                        {quizData?.status === 'live' && (
                            <div className="flex flex-row gap-[8px]">
                                <button className="w-auto p-3 gap-2 flex-row flex bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center  hover:bg-[#F2F4F7]">
                                    <Image src="/icons/duplicate.svg" width={18} height={18} alt="duplicate" />
                                    <span className="text-sm text-[#0C111D] font-normal">Duplicate</span>
                                </button>

                                <button className="w-auto p-3 gap-2 flex-row flex bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center  hover:bg-[#F2F4F7]"
                                    onClick={openPausedQuiz}>
                                    <Image src="/icons/pausequiz.svg" width={18} height={18} alt="Paused-quiz" />
                                    <span className="text-sm text-[#0C111D] font-normal">Pause Quiz</span>
                                </button>

                                <button className="w-auto p-3 gap-2 flex-row flex bg-[#FFFFFF]  border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center  hover:bg-[#F2F4F7]"
                                    onClick={openEndQuiz}>
                                    <Image src="/icons/endquiz.svg" width={18} height={18} alt="End-quiz" />
                                    <span className="text-sm text-[#DE3024]  font-normal">End Quiz</span>
                                </button>

                            </div>
                        )}

                        {quizData?.status === 'paused' && (
                            <div className="flex flex-row gap-[8px]">

                                <button
                                    className="w-auto p-3 gap-2 flex-row flex rounded-[8px] h-[40px] items-center"
                                    onClick={openResumeQuiz}>
                                    <Image src="/icons/resume.svg" width={18} height={18} alt="Resume Quiz" />
                                    <span className="text-sm text-[#9012FF]  font-medium">Resume Quiz</span>
                                </button>

                                <button
                                    className="w-auto p-3 gap-2 flex-row flex bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center  hover:bg-[#F2F4F7]"
                                    onClick={() => openScheduledDialog(quizData.startDate, quizData.endDate)}>
                                    <Image src="/icons/select-date.svg" width={18} height={18} alt="Calendar" />
                                    <span className="text-sm text-[#0C111D]  font-medium">Schedule Quiz</span>
                                </button>

                            </div>
                        )}

                        {quizData?.status !== 'live' && (
                            <Popover
                                placement="bottom-end"
                                isOpen={popoveropen}
                                onOpenChange={(isOpen) => setPopoveropen(isOpen)}>

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
                                    {quizData?.status !== 'finished' && (
                                        <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full"
                                            onClick={() => { router.push(`/admin/content/quizzesmanagement/createquiz/?s=${quizData?.status}&qId=${quizData?.quizId}`) }}>
                                            <Image src="/icons/edit-icon.svg" width={18} height={18} alt="Edit-quiz" />
                                            <span className="text-sm text-[#0C111D] font-normal">Edit Quiz</span>
                                        </button>
                                    )}

                                    <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full">
                                        <Image src="/icons/duplicate.svg" width={18} height={18} alt="Edit-quiz" />
                                        <span className="text-sm text-[#0C111D] font-normal">Duplicate</span>
                                    </button>
                                    <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full"
                                        onClick={() => { openDeleteDialog(quizData?.quizName || ''); setPopoveropen(false) }}
                                    >
                                        <Image src="/icons/delete.svg" width={18} height={18} alt="delete-quiz" />
                                        <span className="text-sm text-[#DE3024] font-normal">Delete Quiz</span>
                                    </button>
                                </PopoverContent>
                            </Popover>
                        )}

                    </div>
                </div>
                {quizData?.status === 'scheduled' && (
                    <div className="flex flex-row gap-2 mt-2 mb-2">
                        <div className="bg-[#EAECF0] rounded-[8px] p-2 flex flex-row gap-1">
                            <Image
                                src="/icons/information-circle.svg"
                                width={20}
                                height={20}
                                alt="information-icon"
                            />
                            <span className="text-[#475467] font-normal text-[13px]">Quiz will be live on {formatStartDate(quizData.startDate)}</span>
                        </div>
                        <button
                            onClick={() => openScheduledDialog(quizData.startDate, quizData.endDate)}>
                            <Image src="/icons/edit-icon.svg" width={18} height={18} alt="Edit-quiz" />
                        </button>
                    </div>
                )}

                <div
                    className="quiz-description p-1"
                    dangerouslySetInnerHTML={{
                        __html: (quizData?.quizDescription || ''),
                    }}
                />
            </div>
            <div className="flex flex-row gap-1 items-center">
                <p className="text-[#667085] font-normal text-sm">Created by</p>
                <Image className="rounded-full w-6 h-6 ml-[2px]"
                    src={adminDetails?.profilePic || "/icons/profile-pic2.svg"}
                    width={24}
                    height={24}
                    alt="profile-icons"
                />
                <p className="text-[#1D2939] font-medium text-sm">{adminDetails?.name}</p>
            </div>
            <div className="w-full h-auto mt-4 flex flex-row gap-4 ">
                <div className="w-full flex flex-col p-4 border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-xl">
                    <span className="text-[#667085] font-normal text-sm">Quiz starts</span>
                    <span className="font-medium text-[#1D2939] text-base">{formattedStartDate}</span>
                </div>
                <div className="w-full flex flex-col p-4 border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-xl">
                    <span className="text-[#667085] font-normal text-sm">Quiz ends</span>
                    <span className="font-medium text-[#1D2939] text-base">{formattedEndDate}</span>
                </div>
                <div className="w-full flex flex-col p-4 border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-xl">
                    <span className="text-[#667085] font-normal text-sm">Marks per questions</span>
                    <span className="font-medium text-[#1D2939] text-base">{quizData?.marksPerQuestion && quizData.marksPerQuestion !== "" ? quizData.marksPerQuestion : "-"}
                    </span>
                </div>
                <div className="w-full flex flex-col p-4 border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-xl">
                    <span className="text-[#667085] font-normal text-sm">Overall quiz time</span>
                    <span className="font-medium text-[#1D2939] text-base">{formatQuizTime(quizData?.quizTime || '0 Minutes')}</span>
                </div>
            </div>

            {/* Tabs */}
            <div className="pt-3 w-full flex flex-col">
                <Tabs
                    aria-label="Market Integration Tabs"
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
                        key="Questions"
                        title={
                            <div className="flex items-center space-x-2">
                                <span className="font-medium text-base">
                                    Questions
                                </span>
                                {/* {questionsCount > 0 && (
                                    <div className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm bg-[#EDE4FF] border border-[#EDE4FF] font-medium text-[#7400E0]">
                                        {questionsCount}
                                    </div>
                                )} */}
                            </div>
                        }
                    >
                        <Questions questionsList={questions} />
                    </Tab>

                    <Tab
                        key="Students attempted"
                        title={
                            <div className="flex items-center space-x-2">
                                <span className="font-medium text-base">
                                    Students attempted
                                </span>
                                {/* {studentsattemptsCount > 0 && (
                                    <div className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm bg-[#EDE4FF] border border-[#EDE4FF] font-medium text-[#7400E0]">
                                        {studentsattemptsCount}
                                    </div>
                                )} */}
                            </div>
                        }
                    >
                        <StudentsAttempts />
                    </Tab>
                </Tabs>
            </div>

            {/* Dialog components with conditional rendering */}
            {isScheduledDialogOpen && <ScheduledDialog onClose={() => setIsScheduledDialogOpen(false)} fromContent="quiz" contentId={quizId || ''} startDate={startDate} endDate={endDate} setEndDate={setEndDate} setLiveNow={setLiveCourseNow} liveNow={liveCourseNow} setStartDate={setStartDate} />}
            {isEndDialogOpen && <EndDialog onClose={() => setIsEndDialogOpen(false)} fromContent="quiz" contentId={quizId || ''} />}
            {isPausedDialogOpen && <PausedDDialog onClose={() => setIsPausedDialogOpen(false)} fromContent="quiz" contentId={quizId || ''} />}
            {isResumeOpen && < ResumeQuiz open={isResumeOpen} onClose={() => setIsResumeOpen(false)} fromContent="quiz" contentId={quizId || ''} />}
            {isDeleteDialogOpen && <DeleteQuiz onClose={closeDeleteDialog} open={true} quizId={quizId || ''} quizName={quizName} />}
            <ToastContainer />
        </div>
    );
}

export default Quizinfo;