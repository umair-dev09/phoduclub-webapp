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
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
interface Quiz {
    title: string;
    questions: number;
    quizId: string;
    students: number;
    status: string;
    quizPublishedDate: string;
    startDate: string;
    endDate: string;
    quizTime: number;
    isPremiumQuiz: boolean;
    product: { productId: string; productName: string; productType: string };
    marksPerQuestion: number;
    nMarksPerQuestion: number;
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
    status: string;
    isChecked: boolean;
    isActive: boolean;
    order: number;
}

const fetchQuizzes = (callback: (quizzes: Quiz[] | ((prevQuizzes: Quiz[]) => Quiz[])) => void) => {
    const quizzesCollection = collection(db, 'quiz');

    // Create a map to store attempt listeners
    const attemptListeners = new Map();

    const unsubscribe = onSnapshot(quizzesCollection, async (quizzesSnapshot) => {
        // Cleanup previous attempt listeners
        attemptListeners.forEach((listener) => listener());
        attemptListeners.clear();

        const quizzesData = await Promise.all(
            quizzesSnapshot.docs.map(async (quizDoc) => {
                const quizData = quizDoc.data();
                const quizId = quizDoc.id;

                if (quizData.status !== 'live' && quizData.status !== 'scheduled') {
                    return null;
                }

                const currentUserId = auth.currentUser?.uid;

                if (quizData.isPremiumQuiz) {
                    const userDoc = await getDocs(collection(db, 'users'));
                    const currentUserDoc = userDoc.docs.find(doc => doc.id === currentUserId);
                    const userData = currentUserDoc?.data();

                    if (!userData?.isPremium) {
                        return null;
                    }
                    else {
                        // Check for course or testseries purchase
                        if (quizData.product) {
                            const { productId, productType } = quizData.product;
                            const collectionName = productType === 'course' ? 'course' : 'testseries';

                            // Check if student has purchased the product
                            const studentPurchaseRef = collection(db, collectionName, productId, 'StudentsPurchased');
                            const studentPurchaseDoc = await getDocs(studentPurchaseRef);
                            const hasPurchased = studentPurchaseDoc.docs.some(doc => doc.id === currentUserId);

                            if (!hasPurchased) {
                                return null;
                            }
                        }
                    }


                }

                // Set up real-time listener for attempts
                const studentsAttemptedCollection = collection(db, 'quiz', quizId, 'attempts');
                const attemptListener = onSnapshot(studentsAttemptedCollection, (attemptsSnapshot) => {
                    const hasAttempted = attemptsSnapshot.docs.some(doc => doc.id === currentUserId);
                    if (hasAttempted) {
                        // Update the quizzes state by removing this quiz
                        callback((prevQuizzes: Quiz[]) => prevQuizzes.filter(q => q.quizId !== quizId));
                    }
                });

                // Store the listener for cleanup
                attemptListeners.set(quizId, attemptListener);

                const hasAttempted = (await getDocs(studentsAttemptedCollection))
                    .docs.some(doc => doc.id === currentUserId);

                if (hasAttempted) {
                    return null;
                }

                const questionsCollection = collection(db, 'quiz', quizId, 'Questions');
                const questionsSnapshot = await getDocs(questionsCollection);
                const fetchedQuestions: Question[] = questionsSnapshot.docs.map((doc) => ({
                    question: doc.data().question,
                    questionId: doc.data().questionId,
                    isChecked: false,
                    isActive: false,
                    options: {
                        A: doc.data().options.A,
                        B: doc.data().options.B,
                        C: doc.data().options.C,
                        D: doc.data().options.D,
                    },
                    correctAnswer: doc.data().correctAnswer?.replace('option', ''),
                    answerExplanation: doc.data().answerExplanation || '',
                    status: '',
                    order: doc.data().order,
                }));

                return {
                    title: quizData.quizName,
                    questions: questionsSnapshot.size,
                    quizId: quizData.quizId,
                    status: quizData.status,
                    startDate: quizData.startDate,
                    endDate: quizData.endDate,
                    quizTime: quizData.quizTime,
                    marksPerQuestion: quizData.marksPerQuestion,
                    nMarksPerQuestion: quizData.nMarksPerQuestion,
                    questionsList: fetchedQuestions,
                    isPremiumQuiz: quizData.isPremiumQuiz,
                    product: quizData.product,
                } as Quiz;
            })
        );

        const filteredQuizzesData = quizzesData.filter(quiz => quiz !== null) as Quiz[];
        filteredQuizzesData.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
        callback(filteredQuizzesData);
    });

    // Return a cleanup function that removes both quiz and attempt listeners
    return () => {
        unsubscribe();
        attemptListeners.forEach((listener) => listener());
    };
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

const convertToTimeFormat = (seconds: number): string => {
    if (!seconds || seconds < 0) return "0 Minutes"; // Return default for invalid input

    const totalMinutes = Math.floor(seconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0) {
        return `${hours} ${hours === 1 ? 'Hour' : 'Hours'}`;
    } else {
        return `${minutes} ${minutes === 1 ? 'Minute' : 'Minutes'}`;
    }
};

function Quiz() {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState(true);
    const [isPremiumQuiz, setIsPremiumQuiz] = useState(true);
    const [product, setProduct] = useState<{ productId: string; productName: string; productType: string } | null>(null);
    const [showBottomSheet, setShowBottomSheet] = useState(false);
    const [marksPerQ, setMarksPerQ] = useState(0);
    const [nMarksPerQ, setnMarksPerQ] = useState(0);
    const [noOfQuestions, setNoOfQuestions] = useState(0);
    const [timeOfQuiz, setTimeOfQuiz] = useState(0);
    const [formattedQTime, setFormattedQTime] = useState('');
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
        <div className="flex flex-col w-full">
            {quizzes.length < 1 ? (
                <div className="flex flex-1 justify-center items-center flex-col">
                    <Image src="/images/noQuizzes.svg" alt="No Quizzes" width={140} height={140} />
                    <h3 className="text-base font-bold">No Quizzes</h3>
                    <p>Your live quizzes will show up here</p>
                </div>
            ) : (
                <div className="flex flex-row flex-wrap gap-6 w-full">
                    {quizzes.map((quiz, index) => {
                        const quizTime = quizTimes.find(qt => qt.id === quiz.quizId);
                        return (
                            <div key={index} className={`relative flex flex-col justify-between h-fit gap-4 w-auto min-w-[300px] rounded-xl py-6 px-6 bg-white border ${quiz.isPremiumQuiz ? 'border-[#e3ae3d]' : 'border-lightGrey'}`}>
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
                                    onClick={() => { onStartQuiz(); setTimeOfQuiz(quiz.quizTime); setProduct(quiz.product); setIsPremiumQuiz(quiz.isPremiumQuiz); setFormattedQTime(convertToTimeFormat(quiz.quizTime)); setMarksPerQ(quiz.marksPerQuestion); setnMarksPerQ(quiz.nMarksPerQuestion); setQuizId(quiz.quizId); setNoOfQuestions(quiz.questions); setPassedQuestionList(quiz.questionsList) }}
                                    disabled={quiz.status === 'scheduled'}
                                    className={`flex items-center justify-center w-full px-[14px] py-[10px] text-xs text-white font-semibold rounded-[6px] shadow-inner-button ${quiz.status === 'live' ? 'bg-[#9012FF] hover:bg-[#6D0DCC]' : 'bg-[#D8ACFF] cursor-not-allowed'}`}>
                                    Start Quiz
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}



            {/* <Dialog open={showQuizDialog} onClose={() => setShowQuizDialog(false)} className="relative z-50">
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
                                    Ready to begin? Click &apos;Start&apos; to attempt this quiz
                                </span>
                            </div>
                            <div className="mt-[33px] mb-8 flex-row flex items-center">
                                <div className="gap-1 flex-col flex items-center w-full border-r border-lightGrey">
                                    <span className="font-normal text-sm text-[#667085]">Time Duration</span>
                                    <span className="text-[#1D2939] text-lg font-semibold">{formattedQTime || '0 Minutes'}
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
            </Dialog> */}
            <Modal isOpen={showQuizDialog} onOpenChange={(isOpen) => !isOpen && setShowQuizDialog(false)} hideCloseButton
                size="lg"
            >
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-row justify-between items-center gap-1">
                            <span className="text-[#1D2939] font-semibold text-lg">Start Test</span>
                            <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                                <button onClick={() => setShowQuizDialog(false)}>
                                    <Image src="/icons/cancel.svg" alt="cancel" width={18} height={18} />
                                </button>
                            </button>
                        </ModalHeader>
                        <ModalBody>
                            <div className=" h-auto ">
                                <span className="text-sm text-[#667085] font-normal">
                                    Ready to begin? Click &apos;Start&apos; to attempt this quiz
                                </span>
                            </div>
                            <div className="mt-[33px] mb-8 flex-row flex items-center">
                                <div className="gap-1 flex-col flex items-center w-full border-r border-lightGrey">
                                    <span className="font-normal text-sm text-[#667085]">Time Duration</span>
                                    <span className="text-[#1D2939] text-lg font-semibold">{formattedQTime || '0 Minutes'}
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
                        </ModalBody>
                        <ModalFooter className="border-t border-lightGrey">
                            <Button variant="light"
                                className="bg-[#FFFFFF] text-[#1D2939] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px] shadow-inner-button hover:bg-[#F2F4F7]"
                                style={{ border: "1.5px solid #EAECF0" }}
                                onClick={() => setShowQuizDialog(false)}>
                                Cancel
                            </Button>
                            <Button
                                className="bg-[#8501FF] text-[#FFFFFF] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px] shadow-inner-button hover:bg-[#6D0DCC]"
                                style={{
                                    border: "1px solid #800EE2",
                                }}
                                onClick={openDrawer}
                            >
                                Start Now
                            </Button>
                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal >

            <QuizAttendBottomSheet isPremiumQuiz={isPremiumQuiz} product={product} showBottomSheet={showBottomSheet} nMarksPerQuestion={nMarksPerQ} marksPerQuestion={marksPerQ} setShowBottomSheet={setShowBottomSheet} questionsList={passsedQuestionList} quizId={quizId} quizTime={timeOfQuiz} />
            <ToastContainer />
        </div>
    );
}

export default Quiz;
