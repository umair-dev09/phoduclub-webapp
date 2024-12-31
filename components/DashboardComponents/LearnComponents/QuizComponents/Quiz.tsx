"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import BottomUpSheet from './QuizAttendBottomSheet';
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/firebase";
import LoadingData from "@/components/Loading";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import QuizAttendBottomSheet from "./QuizAttendBottomSheet";
interface Quiz {
    title: string;
    questions: number;
    quizId: string;
    students: number;
    status: string;
    quizPublishedDate: string;
    startDate: string;
    endDate: string;
    quizTime: string;
    marksPerQuestion: string;
    nMarksPerQuestion: string;
    questionsList: Question[];
}
interface Options {
    A: string;
    B: string;
    C: string;
    D: string;
}
interface Question {
    question: string;
    options: Options;
    correctAnswer: string | null;
    answerExplanation: string;
    questionId: string;
}

const fetchQuizzes = (callback: (quizzes: Quiz[]) => void) => {
    const quizzesCollection = collection(db, 'quiz');

    const unsubscribe = onSnapshot(quizzesCollection, async (quizzesSnapshot) => {
        const quizzesData = await Promise.all(
            quizzesSnapshot.docs.map(async (quizDoc) => {
                const quizData = quizDoc.data();
                const quizId = quizDoc.id;

                // Filter quizzes by status
                if (quizData.status !== 'live' && quizData.status !== 'scheduled') {
                    return null;
                }

                // Check if the current user has attempted the quiz
                const studentsAttemptedCollection = collection(db, 'quiz', quizId, 'StudentsAttempted');
                const studentsAttemptedSnapshot = await getDocs(studentsAttemptedCollection);
                const currentUserId = auth.currentUser?.uid; // Replace with the actual current user ID
                const hasAttempted = studentsAttemptedSnapshot.docs.some(doc => doc.id === currentUserId);

                if (hasAttempted) {
                    return null;
                }

                const questionsCollection = collection(db, 'quiz', quizId, 'Questions');
                const questionsSnapshot = await getDocs(questionsCollection);
                const fetchedQuestions: Question[] = questionsSnapshot.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        question: data.question,
                        questionId: data.questionId,
                        isChecked: false,
                        isActive: false,
                        options: {
                            A: data.options.A,
                            B: data.options.B,
                            C: data.options.C,
                            D: data.options.D,
                        },
                        correctAnswer: data.correctAnswer?.replace('option', ''),
                        answerExplanation: data.answerExplanation || '',
                    };
                });
                const questionsCount = questionsSnapshot.size;

                return {
                    title: quizData.quizName,
                    questions: questionsCount,
                    quizId: quizData.quizId,
                    status: quizData.status,
                    startDate: quizData.startDate,
                    endDate: quizData.endDate,
                    quizTime: quizData.quizTime,
                    marksPerQuestion: quizData.marksPerQuestion,
                    nMarksPerQuestion: quizData.nMarksPerQuestion,
                    questionsList: fetchedQuestions,
                } as Quiz;
            })
        );

        // Filter out null values
        const filteredQuizzesData = quizzesData.filter(quiz => quiz !== null) as Quiz[];

        // Sort by date (or any stable key) before passing data
        filteredQuizzesData.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
        callback(filteredQuizzesData);
    });

    return unsubscribe;
};

// Function to calculate the remaining time in seconds
const calculateRemainingTime = (endDate: string): number => {
    const now = new Date();
    const end = new Date(endDate);
    const difference = end.getTime() - now.getTime();
    return Math.max(Math.floor(difference / 1000), 0);
};

// Function to format seconds to "HH:MM:SS"
const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const convertToTimeFormat = (timeStr: string): string => {
    const regex = /(\d+)\s*(Minute|Hour)\(s\)/i;
    const match = timeStr.match(regex);

    if (!match) return "00:00"; // Return default value if the format doesn't match

    const value = parseInt(match[1], 10); // Get the numeric value
    const unit = match[2].toLowerCase(); // Get the unit (either minute or hour)

    let totalMinutes = 0;

    if (unit === "minute") {
        totalMinutes = value;
    } else if (unit === "hour") {
        totalMinutes = value * 60; // Convert hours to minutes
    }

    const hours = Math.floor(totalMinutes / 60).toString().padStart(2, "0"); // Calculate hours and format
    const minutes = (totalMinutes % 60).toString().padStart(2, "0"); // Calculate minutes and format

    return `${hours}:${minutes}`;
};

function Quiz() {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState(true);
    const [showBottomSheet, setShowBottomSheet] = useState(false);
    const [marksPerQ, setMarksPerQ] = useState('');
    const [noOfQuestions, setNoOfQuestions] = useState(0);
    const [timeOfQuiz, setTimeOfQuiz] = useState('');
    const [quizTimes, setQuizTimes] = useState<{ id: string; startTime: number; endTime: number }[]>([]);
    const [passsedQuestionList, setPassedQuestionList] = useState<Question[]>([]);
    const [quizId, setQuizId] = useState('');

    useEffect(() => {
        const loadQuizzes = () => {
            setLoading(true);

            // Fetch quizzes and update state
            const unsubscribe = fetchQuizzes((quizzes) => {
                setQuizzes(quizzes);
                setLoading(false); // Set loading to false only after fetching is complete
            });

            return () => unsubscribe(); // Clean up the listener on unmount
        };

        loadQuizzes();
    }, []);

    useEffect(() => {
        // Update quizTimes whenever quizzes change
        setQuizTimes(
            quizzes.map(quiz => ({
                id: quiz.quizId,
                startTime: calculateRemainingTime(quiz.startDate),
                endTime: calculateRemainingTime(quiz.endDate),
            }))
        );
    }, [quizzes]);

    useEffect(() => {
        // Create an interval to update quiz times every second
        const intervalId = setInterval(() => {
            setQuizTimes(prevTimes =>
                prevTimes.map(quizTime => ({
                    ...quizTime,
                    startTime: quizTime.startTime > 0 ? quizTime.startTime - 1 : 0,
                    endTime: quizTime.endTime > 0 ? quizTime.endTime - 1 : 0,
                }))
            );
        }, 1000);

        // Cleanup interval when component unmounts
        return () => clearInterval(intervalId);
    }, []);

    let [showQuizDialog, setShowQuizDialog] = useState(false);

    const onStartQuiz = () => {
        setShowQuizDialog(true);
    };

    const openDrawer = () => {
        setShowQuizDialog(false); // Close the dialog when the drawer opens
        setShowBottomSheet(true);
    };

    if (loading) {
        return <LoadingData />;
    }

    return (
        <div className="flex flex-1">
            {quizzes.length <= 1 ? (
                <div className="flex flex-1 justify-center items-center flex-col">
                <Image src="/images/noQuizzes.svg" alt="No Quizzes" width={140} height={140} />
                <h3 className="text-base font-bold">No Quizzes</h3>
                <p>Your live quizzes will show up here</p>
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-5 w-full">
                {quizzes.map((quiz, index) => {
                    const quizTime = quizTimes.find(qt => qt.id === quiz.quizId);
                    return (
                        <div key={index} className="relative flex flex-col justify-between h-[11.25rem] rounded-xl py-6 px-6 bg-white border border-lightGrey">
                            {/* Live Banner */}
                            {quiz.status === 'live' && (
                                <div className="absolute top-0 right-0 mt-3 mr-[-4.5px]">
                                    <Image className="relative" src="/icons/Live-Banner.svg" alt="live banner" width={48} height={30} />
                                    <span className="absolute top-[6px] right-1 text-[11px] font-semibold text-white rounded-md px-2 py-1">LIVE</span>
                                </div>
                            )}
                            {/* Quiz Information */}
                            <div className="flex flex-col gap-1 text-xs">
                                <div className="text-base font-semibold">{quiz.title}</div>
                                <div>{quiz.questions} Questions</div>
                            </div>
                            {quiz.status === 'live' && quizTime && (
                                <div className="flex flex-row text-[#DE3024]">
                                    <div className="mr-1">
                                        <Image src="/icons/stop-watch.svg" alt="stop watch" width={18} height={18} />
                                    </div>
                                    <div className="flex items-center text-xs gap-1">
                                        Quiz ends in
                                        <span className="font-semibold">{formatTime(quizTime.endTime)}</span>
                                    </div>
                                </div>
                            )}
                            {quiz.status === 'scheduled' && quizTime && (
                                <div className="flex flex-row text-[#0B9055]">
                                    <div className="mr-1">
                                        <Image src="/icons/hourglass.svg" alt="stop watch" width={18} height={18} />
                                    </div>
                                    <div className="flex items-center text-xs gap-1">
                                        Quiz starts in
                                        <span className="font-semibold">{formatTime(quizTime.startTime)}</span>
                                    </div>
                                </div>
                            )}
                            {/* Start Quiz Button */}
                            <button
                                onClick={() => { onStartQuiz(); setTimeOfQuiz(convertToTimeFormat(quiz.quizTime)); setMarksPerQ(quiz.marksPerQuestion); setQuizId(quiz.quizId); setNoOfQuestions(quiz.questions); setPassedQuestionList(quiz.questionsList) }}
                                disabled={quiz.status === 'scheduled'}
                                className={`flex items-center justify-center w-full px-[14px] py-[10px] text-xs text-white font-semibold rounded-[6px] shadow-inner-button ${quiz.status === 'live' ? 'bg-[#9012FF] hover:bg-[#6D0DCC]' : 'bg-[#D8ACFF] cursor-not-allowed'}`}>
                                Start Quiz
                            </button>
                        </div>
                    );
                })}
            </div>
            )}
           


            <Dialog open={showQuizDialog} onClose={() => setShowQuizDialog(false)} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/30 " />
                <div className="fixed inset-0 flex items-center justify-center ">
                    <DialogPanel transition className="bg-[#FFFFFF] rounded-2xl w-[480px]">
                        <div className="flex flex-1 w-full border-b-2 border-solid border-[#EAECF0] flex-col rounded-t-xl">
                            <div className="mt-[23px] mr-[24px] ml-[24px] justify-between items-center flex">
                                <span className="text-[#1D2939] font-semibold text-lg">Start Test</span>
                                <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                                    <button onClick={() => setShowQuizDialog(false)}>
                                        <Image src="/icons/cancel.svg" alt="cancel" width={18} height={18} />
                                    </button>
                                </button>
                            </div>
                            <div className=" h-auto mr-[24px] ml-[24px] mt-[13px] ">
                                <span className="text-sm text-[#667085] font-normal">
                                    Ready to begin? Click 'Start' to attempt this quiz
                                </span>
                            </div>
                            <div className="mt-[33px] mb-8 flex-row flex items-center">
                                <div className="gap-1 flex-col flex items-center w-full border-r border-lightGrey">
                                    <span className="font-normal text-sm text-[#667085]">Time Duration</span>
                                    <span className="text-[#1D2939] text-lg font-semibold">{timeOfQuiz || '00:00'}
                                    </span>
                                </div>
                                <div className="gap-1 flex-col flex items-center w-full border-r border-lightGrey">
                                    <span className="font-normal text-sm text-[#667085]">No. of Questions</span>
                                    <span className="text-[#1D2939] text-lg font-semibold">{noOfQuestions || 0}
                                    </span>
                                </div>
                                <div className="gap-1 flex-col flex items-center w-full">
                                    <span className="font-normal text-sm text-[#667085]">Marks Per Question</span>
                                    <span className="text-[#1D2939] text-lg font-semibold">{marksPerQ || 0}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end rounded-b-xl">
                            <div className="gap-[16px] mr-6 my-4 flex-row flex ">
                                <button
                                    className="bg-[#FFFFFF] text-[#1D2939] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px] shadow-inner-button hover:bg-[#F2F4F7]"
                                    style={{ border: "1.5px solid #EAECF0" }}
                                    onClick={() => setShowQuizDialog(false)}>
                                    Cancel
                                </button>
                                <button
                                    className="bg-[#8501FF] text-[#FFFFFF] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px] shadow-inner-button hover:bg-[#6D0DCC]"
                                    style={{
                                        border: "1px solid #800EE2",
                                    }}
                                    onClick={openDrawer}
                                >
                                    Start Now
                                </button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

            <QuizAttendBottomSheet showBottomSheet={showBottomSheet} setShowBottomSheet={setShowBottomSheet} questionsList={passsedQuestionList} quizId={quizId} quizTime={timeOfQuiz} />
            <ToastContainer />
        </div>
    );
}

export default Quiz;
