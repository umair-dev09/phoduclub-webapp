"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, db } from "@/firebase";
import { arrayUnion, collection, doc, getDoc, increment, setDoc } from "firebase/firestore";
import QuizTimer from "@/components/QuizTImer";
import { set } from "date-fns";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import ReviewTest from "../TestsComponents/ReviewTest";
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
    isChecked: boolean;
    isActive: boolean;
    order: number;
}

interface QuestionState {
    questionId: string;
    selectedOption: string | null;
    answeredCorrect: boolean | null;
    answered: boolean;
}

type QuizProps = {
    setShowBottomSheet: (show: boolean) => void;
    showBottomSheet: boolean;
    questionsList: Question[];
    quizTime: number;
    quizId: string;
    marksPerQuestion: number;
    nMarksPerQuestion: number;
    isPremiumQuiz: boolean;
    product: { productId: string; productName: string; productType: string } | null;
};
function QuizAttendBottomSheet({
    showBottomSheet,
    setShowBottomSheet,
    questionsList, quizId, quizTime, marksPerQuestion, nMarksPerQuestion, isPremiumQuiz, product
}: QuizProps) {
    const contentRef = React.useRef<HTMLDivElement>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showReviewSheet, setShowReviewSheet] = useState(false);
    const [questionStates, setQuestionStates] = useState<QuestionState[]>([]);
    const userId = auth.currentUser?.uid;
    const [displayUserId, setDisplayUserId] = useState('');
    const { isOpen: isOpenReviewD, onOpen: onOpenReviewD, onClose: onCloseReviewD } = useDisclosure();
    const [remainingTime, setRemainingTime] = useState<number>(0);
    const [formattedTime, setFormattedTime] = useState<string>("00:00:00");
    const [timerStarted, setTimerStarted] = useState(false);
    const [isTimeEnded, setIsTimeEnded] = useState(false);
    // Add helper function to format time
    const formatTime = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        return [hours, minutes, remainingSeconds]
            .map(val => val.toString().padStart(2, '0'))
            .join(':');
    };

    const initializeTimer = () => {
        setRemainingTime(quizTime);
        setFormattedTime(formatTime(quizTime));
        setTimerStarted(true);
    };

    function formatTimeForReview(seconds: number): string {
        const totalSeconds = seconds;
        const hours = Math.floor(totalSeconds / 3600); // Calculate hours
        const minutes = Math.floor((totalSeconds % 3600) / 60); // Calculate remaining minutes
        const remainingSeconds = totalSeconds % 60; // Calculate remaining seconds
        let formattedTime = '';

        if (hours > 0) {
            formattedTime += `${hours}h`; // Add hours if present
        }
        if (minutes > 0) {
            formattedTime += (formattedTime ? ' ' : '') + `${minutes}m`; // Add minutes
        }
        if (remainingSeconds > 0 || (hours === 0 && minutes === 0)) {
            formattedTime += (formattedTime ? ' ' : '') + `${remainingSeconds}s`; // Add seconds
        }

        return formattedTime;
    }

    useEffect(() => {
        const fetchUserId = async () => {
            if (auth.currentUser) {
                const userDocRef = doc(db, 'users', auth.currentUser.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setDisplayUserId(userData.userId);
                } else {
                    console.error("No such document!");
                }
            }
        };

        fetchUserId();
    }, []);

    // Initialize timer when bottom sheet opens
    useEffect(() => {
        if (showBottomSheet) {
            initializeTimer();
        } else {
            // Reset timer when bottom sheet closes
            setTimerStarted(false);
        }
    }, [showBottomSheet, quizTime]);

    // Separate timer countdown effect 
    useEffect(() => {
        if (!timerStarted || remainingTime <= 0) return;

        const timer = setInterval(() => {
            setRemainingTime(prev => {
                const newTime = Math.max(0, prev - 1);
                setFormattedTime(formatTime(newTime));

                // Trigger handleTimeOver when time reaches 0
                if (newTime === 0) {
                    handleTimeOver();
                }
                return newTime;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timerStarted, remainingTime]);

    const handleTimeOver = () => {
        setIsTimeEnded(true);
        console.log("Time's up!");
    };

    // Initialize with actual questionIds
    useEffect(() => {
        if (showBottomSheet) {
            const initialStates: QuestionState[] = questionsList.map((question) => ({
                questionId: question.questionId,
                selectedOption: null,
                answeredCorrect: null,
                answered: false,
                status: '',
            }));
            setQuestionStates(initialStates);
        }
    }, [showBottomSheet, questionsList]);
    useEffect(() => {
        if (showBottomSheet && contentRef.current) {
            // Scroll to top when bottom sheet opens
            contentRef.current.scrollTo({ top: 0, behavior: 'auto' });
        }
    }, [showBottomSheet]);

    // Handle option selection for a question
    const handleOptionSelect = (questionId: string, selectedOption: string) => {
        setQuestionStates(prevStates => {
            return prevStates.map(state => {
                if (state.questionId === questionId) {
                    // Find the corresponding question to check correct answer
                    const question = questionsList.find(q => q.questionId === questionId);
                    return {
                        ...state,
                        selectedOption: selectedOption,
                        answeredCorrect: question ? selectedOption === question.correctAnswer : false,
                        answered: true,
                    };
                }
                return state;
            });
        });
    };

    const calculateQuizStats = () => {
        const totalQuestions = questionsList.length;
        const attemptedQuestions = questionStates.filter(q => q.answered).length;
        const answeredCorrect = questionStates.filter(q => q.answeredCorrect === true).length;
        const answeredIncorrect = questionStates.filter(q => q.answeredCorrect === false).length;
        const totalScore = (answeredCorrect * marksPerQuestion) - (answeredIncorrect * nMarksPerQuestion);
        const maxPossibleScore = totalQuestions * marksPerQuestion;

        return {
            totalScore,
            answeredIncorrect,
            answeredCorrect,
            attemptedQuestions,
            totalQuestions,
            maxPossibleScore
        };
    };

    // Store quiz attempt in Firestore
    const storeQuizAttempt = async () => {
        if (!userId) {
            console.error("No user found");
            return;
        }
        setIsSubmitting(true);
        try {
            const quizAttempt = {
                AnsweredQuestions: questionStates,
                userId: userId,
                timeTaken: quizTime - remainingTime,
                totalTime: quizTime,
                score: calculateQuizStats().totalScore,
                attemptedQuestions: calculateQuizStats().attemptedQuestions,
                answeredCorrect: calculateQuizStats().answeredCorrect,
                answeredIncorrect: calculateQuizStats().answeredIncorrect,
                totalQuestions: calculateQuizStats().totalQuestions,
                attemptDate: new Date(),
            };
            // Fixed Firestore path structure
            const quizPath = `quiz/${quizId}/attempts`;
            const studentAttemptRef = doc(db, quizPath, userId);
            await setDoc(studentAttemptRef, quizAttempt);
            if (!isPremiumQuiz && userId) {
                const userStatsRef = doc(db, 'globalQuizAttemptsData', userId);
                try {
                    const stats = calculateQuizStats();
                    await setDoc(userStatsRef, {
                        score: increment(stats.totalScore),
                        attemptedQuestions: increment(stats.attemptedQuestions),
                        answeredCorrect: increment(stats.answeredCorrect),
                        answeredIncorrect: increment(stats.answeredIncorrect),
                        totalQuestions: increment(stats.totalQuestions),
                        timeTaken: increment(quizTime - remainingTime),
                        totalTime: increment(quizTime),
                        lastUpdatedTime: new Date(),
                        userId: userId,
                        displayUserId: displayUserId,
                    }, { merge: true });

                } catch (error) {
                    console.error('Error updating global stats:', error);
                    toast.error('Failed to update global statistics');
                }
            }
            else {
                if (!product?.productId) return;
                // Store product info at product level
                const productRef = doc(db, 'premiumQuizAttemptsData', product.productId);
                await setDoc(productRef, {
                    productType: product.productType,
                    productId: product.productId,
                    quizIds: arrayUnion(quizId),
                }, { merge: true });

                // Store user attempts under the product
                const userStatsRef = doc(db, 'premiumQuizAttemptsData', product.productId, 'userAttempts', userId);
                try {
                    const stats = calculateQuizStats();
                    await setDoc(userStatsRef, {
                        score: increment(stats.totalScore),
                        attemptedQuestions: increment(stats.attemptedQuestions),
                        answeredCorrect: increment(stats.answeredCorrect),
                        answeredIncorrect: increment(stats.answeredIncorrect),
                        totalQuestions: increment(stats.totalQuestions),
                        timeTaken: increment(quizTime - remainingTime),
                        totalTime: increment(quizTime),
                        lastUpdatedTime: new Date(),
                        userId: userId,
                        displayUserId: displayUserId,
                    }, { merge: true });

                } catch (error) {
                    console.error('Error updating global stats:', error);
                    toast.error('Failed to update premium statistics');
                }
            }
            onOpenReviewD();
            toast.success('Quiz attempt saved successfully!');

        } catch (error) {
            console.error('Error storing quiz attempt:', error);
            toast.error('Failed to  store quiz attempt');
            // You might want to show an error message to the user here
        } finally {
            setIsSubmitting(false);
        }
    };

    // Calculate quiz statistics

    // // Check if all questions have been answered
    // const areAllQuestionsAnswered = () => {
    //     return questionStates.every(state => state.selectedOption !== null);
    // };

    const handleSubmit = () => {
        console.log('Final Question States:', questionStates);
        setIsDialogOpen(true);
        setShowBottomSheet(false);
    };



    const handleSaveExit = () => {
        // setIsOpen(false);
        setShowBottomSheet(false);
        setIsTimeEnded(false);
        setQuestionStates([]);
    };

    const handleDialogSubmit = async () => {
        setIsDialogOpen(false);
        // setIsOpen(false);
        setShowBottomSheet(false);
        await storeQuizAttempt();
    };

    return (
        <>
            <Drawer
                open={showBottomSheet}
                direction="bottom"
                className="rounded-tl-md rounded-tr-md "
                style={{ height: "98vh" }}
            >

                <div className="flex flex-col h-full  overflow-y-auto">
                    <div className="p-5 flex justify-between items-center h-[69px] w-full border-b-[1.5px] border-t-[1.5px] border-[#EAECF0]  rounded-tl-[18px] rounded-tr-[16px]">
                        <span className="text-lg font-semibold text-[#1D2939]">Quiz</span>
                        <span className="text-lg font-semibold text-[#1D2939] flex items-center justify-center gap-2">
                            <Image width={24} height={24} src="/icons/alarm-clock.svg" alt="timer" />
                            <span>{formattedTime}</span>
                        </span>

                        <div
                            className={`w-[150px] h-[44px] bg-[#FFFFFF] border-[1px] border-[#EAECF0] rounded-[8px] flex items-center justify-center transition-transform duration-500 ease-in-out transform z-50 `}
                        >
                            <button
                                onClick={handleSaveExit}
                                className="w-full h-full flex items-center justify-center text-sm font-semibold text-[#1D2939] border-none p-[10px_24px] z-50  hover:bg-[#F2F4F7]"
                            >
                                Close & Exit
                            </button>
                        </div>


                    </div>

                    {/* Quiz Content */}
                    <div ref={contentRef} className="overflow-y-auto p-5 h-full">
                        {isTimeEnded ? (
                            <div className="flex items-center justify-center h-full text-red-500">
                                Time&apos;s up! Please submit your attempt.
                            </div>
                        ) : (
                            <div className="flex flex-col gap-5 items-center justify-center">
                                {questionsList
                                    .sort((a, b) => a.order - b.order)
                                    .map((q, index) => {
                                        // Find the corresponding state for this question
                                        const questionState = questionStates.find(
                                            state => state.questionId === q.questionId
                                        );

                                        return (
                                            <div key={q.questionId} className="w-auto h-auto rounded-[12px] px-4 border-2 border-[#EAECF0] flex py-4 flex-col items-center justify-center">
                                                <div className="bg-[#FFFFFF] w-[832px] h-auto flex flex-col gap-[20px]">
                                                    <div className="w-[832px] h-auto">
                                                        <span className="flex flex-row gap-1 text-[#1D2939] font-semibold text-base">
                                                            {index + 1}. <div dangerouslySetInnerHTML={{ __html: q.question || '' }} />
                                                        </span>
                                                    </div>
                                                    <div className="w-auto h-auto gap-[15px] flex flex-col">
                                                        <RadioGroup
                                                            value={questionState?.selectedOption || ''}
                                                            onChange={(e) => handleOptionSelect(q.questionId, e.target.value)}
                                                        >
                                                            {Object.entries(q.options).map(([key, value]) => (
                                                                <FormControlLabel
                                                                    key={key}
                                                                    value={key}
                                                                    className="break-all flex flex-row"
                                                                    control={
                                                                        <Radio
                                                                            sx={{
                                                                                color: '#D0D5DD',
                                                                                '&.Mui-checked': {
                                                                                    color: '#9012FF',
                                                                                },
                                                                            }}
                                                                        />
                                                                    }
                                                                    label={value}
                                                                />
                                                            ))}
                                                        </RadioGroup>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}

                            </div>
                        )}
                    </div>
                    {/* Bottom Button Section */}
                    <div className="flex flex-row items-center justify-end font-semibold border-t border-lightGrey px-4 py-3">
                        <button
                            className={`border rounded-lg py-2.5 px-6 text-sm text-white hover:bg-[#6D0DCC] bg-purple font-semibold`}

                            onClick={handleSubmit}
                        >
                            <p>Submit</p>
                        </button>
                    </div>
                </div>

            </Drawer >
            {/* <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} className="relative z-50">
                {/* Backdrop 
                <DialogBackdrop className="fixed inset-0 bg-black/30 " />

                {/* Dialog Wrapper 
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel transition>
                        <div className="bg-white rounded-2xl p-5 w-[480px]">
                            {/* Header Section 
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-lg font-bold text-[#1D2939]">Submit Quiz</span>
                                <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                                    <button onClick={() => setIsDialogOpen(false)}>
                                        <Image src="/icons/cancel.svg" alt="cancel" width={18} height={18} />
                                    </button>
                                </button>
                            </div>
                            {/* Content Section 
                            <div className="flex flex-col gap-4 w-[432px]">
                                <p className="text-sm text-[#667085] font-normal">
                                    Are you sure you want to submit your quiz now? Please double-check your answers before submitting, as you won&apos;t be able to make any changes afterwards.
                                </p>
                            </div>
                            {/* Buttons 
                            <div className="border-t border-[#EAECF0] w-full h-[76px] mt-5 flex justify-end gap-2">
                                <div className="mt-5">
                                    <button
                                        className="bg-[#FFFFFF] text-[#1D2939] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px] hover:bg-[#F2F4F7]"
                                        style={{ border: "1.5px solid #EAECF0" }}
                                        onClick={() => { setIsDialogOpen(false); setShowBottomSheet(true); }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                                <div className="mt-5">
                                    <button
                                        onClick={() => {
                                            handleDialogSubmit();
                                        }}
                                        disabled={isSubmitting}
                                        className="bg-[#8501FF] text-[#FFFFFF] hover:bg-[#6D0DCC] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px]"
                                        style={{
                                            border: "1px solid #800EE2",
                                            boxShadow: "0px -4px 4px 0px #1018281F inset, 0px 3px 2px 0px #FFFFFF3D inset",
                                        }}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </div >
            </Dialog > */}
            <Modal isOpen={isDialogOpen} onOpenChange={(isOpen) => !isOpen && setIsDialogOpen(false)} hideCloseButton

            >
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-row justify-between items-center gap-1">
                            <span className="text-lg font-bold text-[#1D2939]">Submit Quiz</span>
                            <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                                <button onClick={() => setIsDialogOpen(false)}>
                                    <Image src="/icons/cancel.svg" alt="cancel" width={18} height={18} />
                                </button>
                            </button>
                        </ModalHeader>
                        <ModalBody>
                            <p className="text-sm text-[#667085] font-normal">
                                Are you sure you want to submit your quiz now? Please double-check your answers before submitting, as you won&apos;t be able to make any changes afterwards.
                            </p>
                        </ModalBody>
                        <ModalFooter className="border-t border-lightGrey">

                            <Button variant="light"
                                className="bg-[#FFFFFF] text-[#1D2939] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px] hover:bg-[#F2F4F7]"
                                style={{ border: "1.5px solid #EAECF0" }}
                                onClick={() => { setIsDialogOpen(false); setShowBottomSheet(true); }}
                            >
                                Cancel
                            </Button>

                            <Button
                                onClick={() => {
                                    handleDialogSubmit();
                                }}
                                disabled={isSubmitting}
                                className="bg-[#8501FF] text-[#FFFFFF] hover:bg-[#6D0DCC] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px]"
                                style={{
                                    border: "1px solid #800EE2",
                                    boxShadow: "0px -4px 4px 0px #1018281F inset, 0px 3px 2px 0px #FFFFFF3D inset",
                                }}
                            >
                                Submit
                            </Button>


                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal >

            <Modal isOpen={isOpenReviewD} size="2xl" onOpenChange={(isOpen) => !isOpen && onCloseReviewD()} isDismissable={false}
                isKeyboardDismissDisabled={false} hideCloseButton={true}>
                <ModalContent>
                    {(onClose) => (
                        <ModalBody className="px-0">
                            <div className="flex flex-col items-center gap-2 mt-6 px-6 py-3">
                                <div className="flex justify-center items-center w-[86px] h-[86px] rounded-full bg-[#F8E8FF] border border-[#F0D3FB]">
                                    <Image src='/icons/tick-03.svg' alt="completed" width={36} height={36} />
                                </div>
                                <h2 className="text-[#000000] text-xl font-bold">Quiz Completed!</h2>
                            </div>
                            <div className="flex flex-col gap-6 mt-6 mb-6">
                                <div className="flex flex-row">
                                    <div className="w-full text-center border-r border-lightGrey">
                                        <p className="text-sm text-[#667085] font-normal leading-5 mb-2">Attempted Questions</p>
                                        <p className="text-lg text-[1D2939] font-semibold leading-5">{calculateQuizStats().attemptedQuestions + '/' + calculateQuizStats().totalQuestions}</p>
                                    </div>
                                    <div className="w-full text-center border-r border-lightGrey">
                                        <p className="text-sm text-[#667085] font-normal leading-5 mb-2">Time Taken</p>
                                        <p className="text-lg text-[1D2939] font-semibold leading-5">{formatTimeForReview(quizTime - remainingTime)} of {formatTimeForReview(quizTime)}</p>
                                    </div>
                                    <div className="w-full text-center border-r border-lightGrey">
                                        <p className="text-sm text-[#667085] font-normal leading-5 mb-2">Score</p>
                                        <p className="text-lg text-[1D2939] font-semibold leading-5">{calculateQuizStats().totalScore + '/' + calculateQuizStats().maxPossibleScore}</p>
                                    </div>

                                </div>
                            </div>
                            <hr />
                            <div className="flex flex-row justify-end mx-6 mb-2 mt-1 gap-4">
                                <button className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md font-semibold text-sm hover:bg-[#F2F4F7] " onClick={() => { onCloseReviewD(); }}>Close</button>
                                <button className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#8501FF] hover:bg-[#6D0DCC]  font-semibold text-sm border border-[#800EE2] rounded-md" onClick={() => { setShowReviewSheet(true); onCloseReviewD(); }}>Review Answers</button>
                            </div>
                        </ModalBody>
                    )}
                </ModalContent>
            </Modal>
            <ReviewTest setShowReviewSheet={setShowReviewSheet} showReviewSheet={showReviewSheet} questionsList={questionsList} answeredQuestions={questionStates} timeTaken={quizTime - remainingTime} />


        </>
    );
}

export default QuizAttendBottomSheet;

