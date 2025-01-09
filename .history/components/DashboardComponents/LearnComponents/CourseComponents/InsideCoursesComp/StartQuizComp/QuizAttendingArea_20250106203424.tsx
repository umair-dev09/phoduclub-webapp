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
import { collection, doc, setDoc } from "firebase/firestore";
import QuizTimer from "@/components/QuizTImer";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
interface Options {
    A: string;
    B: string;
    C: string;
    D: string;
}

interface Question {
    question: string;
    isChecked: boolean;
    isActive: boolean;
    options: Options;
    correctAnswer: string | null;
    answerExplanation: string;
    questionId: string;
}
interface QuestionState {
    questionId: string;
    selectedOption: string | null;
    answeredCorrect: boolean | null;
}
interface QuizAttempt {
    AnsweredQuestions: QuestionState[];
    userId: string;
    timeTaken: string;
}
type QuizProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    setShowBottomSheet: (show: boolean) => void;
    onSubmit: () => void;
    showBottomSheet: boolean;
    contentId: string;
    questionsList: Question[];
    courseId: string;
    sectionId: string;
    quizTime: string;
};

function QuizAttendingArea({
    isOpen,
    setIsOpen,
    showBottomSheet,
    setShowBottomSheet,
    onSubmit, contentId, questionsList, courseId, sectionId, quizTime
}: QuizProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [questionStates, setQuestionStates] = useState<QuestionState[]>([]);
    const userId = auth.currentUser?.uid;
    const [currentTime, setCurrentTime] = useState<number>(0);

    // Initialize questionStates with actual questionIds
    useEffect(() => {
        const initialStates: QuestionState[] = questionsList.map((question) => ({
            questionId: question.questionId,
            selectedOption: null,
            answeredCorrect: null
        }));
        setQuestionStates(initialStates);
    }, [questionsList]);

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
                        answeredCorrect: question ? selectedOption === question.correctAnswer : false
                    };
                }
                return state;
            });
        });
    };
    // Store quiz attempt in Firestore
    const storeQuizAttempt = async () => {
        if (!userId) {
            console.error("No user found");
            return;
        }

        setIsSubmitting(true);
        try {
            const quizAttempt: QuizAttempt = {
                AnsweredQuestions: questionStates,
                userId: userId,
                timeTaken: quizTime,
            };

            // Fixed Firestore path structure
            const quizPath = `course/${courseId}/sections/${sectionId}/content/${contentId}/StudentsAttempted`;
            const studentAttemptRef = doc(db, quizPath, userId);
            await setDoc(studentAttemptRef, quizAttempt);
            toast.success('Quiz attempt saved successfully');
        } catch (error) {
            console.error('Error storing quiz attempt:', error);
            toast.error('Failed to  store quiz attempt');
            // You might want to show an error message to the user here
        } finally {
            setIsSubmitting(false);
        }
    };
    // Check if all questions have been answered
    const areAllQuestionsAnswered = () => {
        return questionStates.every(state => state.selectedOption !== null);
    };

    const openBottomSheet = () => {
        setIsOpen(false);
        setShowBottomSheet(true);
    };

    const handleSubmit = () => {
        console.log('Final Question States:', questionStates);
        setIsDialogOpen(true);
        setShowBottomSheet(false);
    };

    const handleOnTimeEnd = () => {
        console.log('Time ended');

    };

    const handleSaveExit = () => {
        setIsOpen(false);
        setShowBottomSheet(false);
    };

    const handleDialogSubmit = async () => {
        setIsDialogOpen(false);
        setIsOpen(false);
        setShowBottomSheet(false);
        await storeQuizAttempt();
    };
    const handleTimeUpdate = (timeLeft: number) => {
        setCurrentTime(timeLeft);
    };
    return (
        <>
            {/* Initial Dialog */}
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                {/* Backdrop */}
                <DialogBackdrop className="fixed inset-0 bg-black/30 " />

                {/* Dialog Wrapper */}
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel transition>
                        <div className="bg-white rounded-2xl p-5 w-[480px] h-[261px]">
                            {/* Header Section */}
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-lg font-bold text-[#1D2939]">Confirmation</span>
                                <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                                    <button onClick={() => setIsOpen(false)}>
                                        <Image src="/icons/cancel.svg" alt="cancel" width={18} height={18} />
                                    </button>
                                </button>
                            </div>
                            {/* Content Section */}
                            <div className="flex flex-col gap-4 w-[432px] h-[100px]">
                                <span className="text-sm text-[#667085] font-normal">
                                    Lorem ipsum is a dummy text widely used in the digital industry and will be used here as a preview.
                                </span>
                                <span className="text-sm text-[#667085] font-normal">
                                    Lorem ipsum is a dummy text widely used in the digital industry and will be used here as a preview.
                                </span>
                            </div>
                            {/* Buttons */}
                            <div className="border-t border-[#EAECF0] w-full h-[76px] mt-5 flex justify-end gap-2">
                                <div className="mt-5">
                                    <button
                                        className="bg-[#FFFFFF] text-[#1D2939] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px] hover:bg-[#F2F4F7]"
                                        style={{ border: "1.5px solid #EAECF0" }}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                                <div className="mt-5">
                                    <button
                                        onClick={openBottomSheet}
                                        className="bg-[#8501FF] text-[#FFFFFF] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px] hover:bg-[#6D0DCC]"
                                        style={{
                                            border: "1px solid #800EE2",
                                            boxShadow: "0px -4px 4px 0px #1018281F inset, 0px 3px 2px 0px #FFFFFF3D inset",
                                        }}
                                    >
                                        Start Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </div >
            </Dialog >
            <Modal
                isOpen={true}
                onOpenChange={(isOpen) => !isOpen && setIsOpen(false)}
                hideCloseButton
            >
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-row justify-between items-center gap-1">
                            <h1 className="text-lg font-bold text-[#1D2939]">Confirmation</h1>
                            <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                                <button onClick={() => setIsOpen(false)}>
                                    <Image src="/icons/cancel.svg" alt="cancel" width={18} height={18} />
                                </button>
                            </button>
                        </ModalHeader>

                        <ModalBody>
                            <span className="text-sm text-[#667085] font-normal">
                                Lorem ipsum is a dummy text widely used in the digital industry and will be used here as a preview.
                            </span>
                            <span className="text-sm text-[#667085] font-normal">
                                Lorem ipsum is a dummy text widely used in the digital industry and will be used here as a preview.
                            </span>
                        </ModalBody>

                        <ModalFooter className='border-t border-lightGrey'>

                            <Button
                                className="bg-[#FFFFFF] text-[#1D2939] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px] hover:bg-[#F2F4F7]"
                                style={{ border: "1.5px solid #EAECF0" }}
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </Button>


                            <Button
                                onClick={openBottomSheet}
                                className="bg-[#8501FF] text-[#FFFFFF] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px] hover:bg-[#6D0DCC]"
                                style={{
                                    border: "1px solid #800EE2",
                                    boxShadow: "0px -4px 4px 0px #1018281F inset, 0px 3px 2px 0px #FFFFFF3D inset",
                                }}
                            >
                                Start Now
                            </Button>
                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal>


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
                            <QuizTimer initialTime={quizTime} onTimeEnd={handleOnTimeEnd} onTimeUpdate={handleTimeUpdate} />
                        </span>

                        <div
                            className={`w-[150px] h-[44px] bg-[#FFFFFF] border-[1px] border-[#EAECF0] rounded-[8px] flex items-center justify-center transition-transform duration-500 ease-in-out transform z-50 `}
                        >
                            <button
                                onClick={handleSaveExit}
                                className="w-full h-full flex items-center justify-center text-sm font-semibold text-[#1D2939] border-none p-[10px_24px] z-50  hover:bg-[#F2F4F7]"
                            >
                                Save and Exit
                            </button>
                        </div>


                    </div>

                    {/* Quiz Content */}
                    <div className="overflow-y-auto p-5 h-full">
                        <div className="flex flex-col gap-5 items-center justify-center">
                            {questionsList.map((q, index) => {
                                // Find the corresponding state for this question
                                const questionState = questionStates.find(
                                    state => state.questionId === q.questionId
                                );

                                return (
                                    <div key={q.questionId} className="w-auto h-auto rounded-[12px] px-4 border-2 border-[#EAECF0] flex py-4 flex-col items-center justify-center">
                                        <div className="bg-[#FFFFFF] w-[832px] h-auto flex flex-col gap-[20px]">
                                            <div className="w-[832px] h-[24px]">
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
                    </div>
                    {/* Bottom Button Section */}
                    <div className="flex flex-row items-center justify-end border-t border-lightGrey px-4 py-3">
                        <button
                            className={`border rounded-lg py-2.5 px-6 text-sm text-white ${areAllQuestionsAnswered() ? 'bg-purple ' : 'bg-[#CDA0FC] cursor-not-allowed'}`}

                            onClick={handleSubmit}
                            disabled={!areAllQuestionsAnswered()}
                        >
                            <p>Submit</p>
                        </button>
                    </div>
                </div>
            </Drawer >
            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} className="relative z-50">
                {/* Backdrop */}
                <DialogBackdrop className="fixed inset-0 bg-black/30 " />

                {/* Dialog Wrapper */}
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel transition>
                        <div className="bg-white rounded-2xl p-5 w-[480px] h-[261px]">
                            {/* Header Section */}
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-lg font-bold text-[#1D2939]">Submit Quiz</span>
                                <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                                    <button onClick={() => setIsDialogOpen(false)}>
                                        <Image src="/icons/cancel.svg" alt="cancel" width={18} height={18} />
                                    </button>
                                </button>
                            </div>
                            {/* Content Section */}
                            <div className="flex flex-col gap-4 w-[432px] h-[100px]">
                                <span className="text-sm text-[#667085] font-normal">
                                    Lorem ipsum is a dummy text widely used in the digital industry and will be used here as a preview.
                                </span>
                                <span className="text-sm text-[#667085] font-normal">
                                    Lorem ipsum is a dummy text widely used in the digital industry and will be used here as a preview.
                                </span>
                            </div>
                            {/* Buttons */}
                            <div className="border-t border-[#EAECF0] w-full h-[76px] mt-5 flex justify-end gap-2">
                                <div className="mt-5">
                                    <button
                                        className="bg-[#FFFFFF] text-[#1D2939] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px] hover:bg-[#F2F4F7]"
                                        style={{ border: "1.5px solid #EAECF0" }}
                                        onClick={() => setIsDialogOpen(false)}
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
                                        className="bg-[#8501FF] text-[#FFFFFF] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px]"
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
            </Dialog >
        </>
    );
}

export default QuizAttendingArea;



