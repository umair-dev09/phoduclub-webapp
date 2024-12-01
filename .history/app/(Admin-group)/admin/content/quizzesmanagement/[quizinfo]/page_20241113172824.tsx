"use client";
import Image from "next/image";
import React, { useState,useEffect } from "react";
import ScheduledDialog from "@/components/AdminComponents/QuizInfoDailogs/scheduledDailog";
import DeleteQuiz from "@/components/AdminComponents/QuizInfoDailogs/DeleteQuiz";
import EndQuiz from "@/components/AdminComponents/QuizInfoDailogs/EndQuiz";
import PausedQuiz from "@/components/AdminComponents/QuizInfoDailogs/PausedQuiz";
import MakeLiveNow from "@/components/AdminComponents/QuizInfoDailogs/MakeLiveNow";
import ResumeQuiz from "@/components/AdminComponents/QuizInfoDailogs/ResumeQuiz";
import Questions from "@/components/AdminComponents/QuizInfo/Questions";
import StudentsAttempts from "@/components/AdminComponents/QuizInfo/StudentsAttempts";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { useRouter, useSearchParams } from 'next/navigation';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import QuizStatus from '@/components/AdminComponents/QuizzesManagement/quizStatus';
import { db } from "@/firebase";
import LoadingData from "@/components/Loading";
import DOMPurify from 'dompurify';

type QuizData = {
    quizName: string;
    quizDescription: string;
    quizStatus: string;
    startDate: string;
    endDate: string;
    marksPerQuestion: string;
    nMarksPerQuestion: string;
    quizTime: string;
    quizId: string;
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

  const cleanQuizDescription = (description: string) => {
    let sanitizedDescription = DOMPurify.sanitize(description);
    sanitizedDescription = sanitizedDescription.replace(
      /<span class="ql-ui" contenteditable="false"><\/span>/g,
      ''
    );
    return sanitizedDescription;
  };
function Quizinfo({ params }: { params: { quizName: string } }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const quizId = searchParams.get('qId');
    const { quizName } = params;
    const [activeTab, setActiveTab] = useState('Questions');
    const [quizData, setQuizData] = useState<QuizData | null>(null);
    const [questions, setQuestions] = useState<QuestionData[]>([]);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        const fetchQuizData = async () => {
          if (!quizId) return;
    
          try {
            const quizDocRef = doc(db, 'quiz', quizId);
            const quizDocSnap = await getDoc(quizDocRef);
    
            if (quizDocSnap.exists()) {
              setQuizData(quizDocSnap.data() as QuizData);
              setLoading(false);
            } else {
              console.error('Quiz data not found');
              setLoading(false);

            }
    
            const questionsCollectionRef = collection(db, `quiz/${quizId}/Questions`);
            const questionsSnapshot = await getDocs(questionsCollectionRef);
    
            const questionsData = questionsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as unknown as QuestionData[];
    
            setQuestions(questionsData);
          } catch (error) {
            console.error('Error fetching quiz data:', error);
            setLoading(false);
          }
        };
    
        fetchQuizData();
      }, [quizId]);
      
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

      const formattedQuizTime = quizData?.quizTime 
      ? quizData.quizTime.replace(/ Minute\(s\)/, ' min').replace(/ Hour\(s\)/, ' hours') 
      : "-"; 

      if (loading) {
        return <LoadingData/>;
      }

      const handlePublishQuiz = (path: string) => {
        router.push(path);
    };

    return (
        <div className="flex w-full h-auto overflow-y-auto flex-col p-8">
            <div className="w-full h-auto flex flex-col pb-2">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-4 py-1 items-center">
                        <span className="text-[#1D2939] text-2xl font-semibold">{quizData?.quizName}</span>

                        {/* <div className="bg-[#F2F4F7] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                            <span className="w-[6px] h-[6px] bg-[#182230] rounded-full "></span>
                            <span className="font-medium text-[#182230] text-xs">{quizData?.quizStatus}</span>
                        </div> */}
                       <QuizStatus status={quizData?.quizStatus ?? ''} />
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
                        {quizData?.quizStatus === 'saved' &&(        
                        <button className="w-auto p-3 gap-2 flex-row flex bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center"
                        onClick={() => handlePublishQuiz(`/admin/content/quizzesmanagement/createquiz/?s=${quizData?.quizStatus}&qId=${quizData?.quizId}`)}>
                            <Image src="/icons/publish-quiz.svg" width={18} height={18} alt="publish-quiz" />
                            <span className="text-sm text-[#0C111D] font-normal">Publish Quiz</span>
                        </button>
                        )}

                        {quizData?.quizStatus === 'live' &&( 
                           <div className="flex flex-row gap-[8px]">
                        <button className="w-auto p-3 gap-2 flex-row flex bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center">
                            <Image src="/icons/duplicate.svg" width={18} height={18} alt="duplicate" />
                            <span className="text-sm text-[#0C111D] font-normal">Duplicate</span>
                        </button>

                         <button className="w-auto p-3 gap-2 flex-row flex bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center"
                            onClick={openPausedQuiz}>
                            <Image src="/icons/pausequiz.svg" width={18} height={18} alt="Paused-quiz" />
                            <span className="text-sm text-[#0C111D] font-normal">Pause Quiz</span>
                        </button>

                        <button className="w-auto p-3 gap-2 flex-row flex bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center"
                            onClick={openEndQuiz}>
                            <Image src="/icons/endquiz.svg" width={18} height={18} alt="End-quiz" />
                            <span className="text-sm text-[#DE3024]  font-normal">End Quiz</span>
                        </button>

                           </div>    
                        )}

                        {quizData?.quizStatus === 'paused' &&( 
                           <div className="flex flex-row gap-[8px]">
                 
                        <button
                            className="w-auto p-3 gap-2 flex-row flex rounded-[8px] h-[40px] items-center"
                            onClick={openResumeQuiz}>
                            <Image src="/icons/resume.svg" width={18} height={18} alt="Resume Quiz" />
                            <span className="text-sm text-[#9012FF]  font-medium">Resume Quiz</span>
                        </button>

                        <button
                            className="w-auto p-3 gap-2 flex-row flex bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center"
                            onClick={openScheduledDialog}>
                            <Image src="/icons/select-date.svg" width={18} height={18} alt="Calendar" />
                            <span className="text-sm text-[#0C111D]  font-medium">Schedule Quiz</span>
                        </button>

                           </div>    
                        )}

                     {quizData?.quizStatus !== 'live' &&( 
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
                            {quizData?.quizStatus !== 'finished' &&(
                                <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full">
                                <Image src="/icons/edit-icon.svg" width={18} height={18} alt="Edit-quiz" />
                                <span className="text-sm text-[#0C111D] font-normal">Edit Quiz</span>
                            </button>
                            )}
                            
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
                     )}   
                       
                    </div>
                </div>
                {quizData?.quizStatus === 'scheduled' &&(
                <div className="flex flex-row gap-2 mt-2 mb-2">
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
                )}
               
                  <div
                className="quiz-description p-1"
                dangerouslySetInnerHTML={{
                    __html: cleanQuizDescription(quizData?.quizDescription || ''),
                }}
                />
                 </div>
            <div className="flex flex-row gap-1">
                <p className="text-[#667085] font-normal text-sm">Created by</p>
                <Image
                    src="/icons/profile-pic2.svg"
                    width={24}
                    height={24}
                    alt="profile-icons"
                />
                <p className="text-[#1D2939] font-medium text-sm">Jenny Wilson</p>
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
                    <span className="font-medium text-[#1D2939] text-base">{formattedQuizTime}</span>
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
                            Questions
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
                    <Questions questionsList={questions}/>
                </div>
            )}
            {activeTab === 'StudentsAttempts' && (
                <div>
                    <StudentsAttempts />
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

export default Quizinfo;