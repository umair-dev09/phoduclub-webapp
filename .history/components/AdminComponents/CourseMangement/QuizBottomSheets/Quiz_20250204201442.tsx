"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import Quizinfo from "./Quizinfo";
import Questions from "./Questions";
import Review from "./Review";
import Schedule from "./Schedule";
import { auth, db, storage } from "@/firebase";
import { collection, doc, getDoc, getDocs, setDoc, updateDoc, writeBatch } from "firebase/firestore";
import { toast } from 'react-toastify';
import React from "react";
import LoadingData from "@/components/Loading";
// Define interfaces for question options and structure
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
    explanation: string;
    questionId: string;
    order: number
}
// Define an enum for the steps
enum Step {
    QuizInfo = 0,
    Questions = 1,
    Review = 2,
    Schedule = 3,

}

// Define the props interface
interface QuizProps {
    isOpen: boolean;           // isOpen should be a boolean
    toggleDrawer: () => void;  // toggleDrawer is a function that returns void
    courseId: string;
    sectionId: string;
    isEditing: boolean;
    contentId: string;
}

function convertQuizTimeToText(seconds: number): { timeNumber: string; timeText: string } {
    if (seconds < 3600) {
        // Less than an hour, convert to minutes
        const minutes = Math.floor(seconds / 60);
        return {
            timeNumber: minutes.toString(),
            timeText: "Minutes"
        };
    } else {
        // Convert to hours
        const hours = Math.floor(seconds / 3600);
        return {
            timeNumber: hours.toString(),
            timeText: "Hours"
        };
    }
}

function convertToSeconds(timeString: string): number {
    const [value, unit] = timeString.split(' ');
    const numValue = parseInt(value, 10);

    if (isNaN(numValue)) {
        throw new Error("Invalid time value. Must be a number.");
    }

    if (unit === 'Minutes') {
        return numValue * 60; // Convert minutes to seconds
    } else if (unit === 'Hours') {
        return numValue * 3600; // Convert hours to seconds
    } else {
        throw new Error("Invalid time unit. Only 'Minutes' and 'Hours' are allowed.");
    }
}

function Quiz({ isOpen, toggleDrawer, courseId, sectionId, isEditing, contentId }: QuizProps) {

    const [marksPerQ, setMarksPerQ] = useState("");
    const [nMarksPerQ, setnMarksPerQ] = useState("");
    const [timeNumber, setTimeNumber] = useState("");
    const [timeText, setTimeText] = useState("Minutes");
    const [quizScheduleDate, setQuizScheduleDate] = useState("");
    const [quizName, setQuizName] = useState<string>('');
    const [quizDescription, setQuizDescription] = useState<string>('');
    const [anyQuestionAdded, setAnyQuestionAdded] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [deletedQuestionIds, setDeletedQuestionIds] = useState<string[]>([]);

    // Validation function to check if all fields are filled
    const [currentStep, setCurrentStep] = useState<Step>(Step.QuizInfo);
    // Add questionsList state here
    const [questionsList, setQuestionsList] = useState<Question[]>([]);
    useEffect(() => {
        if (isOpen && contentId) {
            fetchContentData(contentId || '');
            setCurrentStep(0);
        }
        else {
            setCurrentStep(0);
            setQuizName('');
            setQuizDescription('');
            setMarksPerQ('');
            setnMarksPerQ('');
            setQuizScheduleDate('');
            setTimeNumber('');
            setTimeText('Minutes');
            setQuestionsList([]);
            setAnyQuestionAdded('');
            setLoading(false);
            setCurrentStep(0);
        }
    }, [isOpen, contentId]);

    const fetchContentData = async (contentId: string) => {
        try {
            const contentDocRef = doc(db, "course", courseId, 'sections', sectionId, 'content', contentId);
            const contentDocSnap = await getDoc(contentDocRef);

            if (contentDocSnap.exists()) {
                const content = contentDocSnap.data();
                setQuizName(content.lessonHeading || '');
                setQuizDescription(content.lessonOverView || '');
                setQuizScheduleDate(content.lessonScheduleDate || '');
                setMarksPerQ(content.marksPerQuestion || '');
                setnMarksPerQ(content.nMarksPerQuestion || '');
                setTimeNumber(convertQuizTimeToText(content.quizTime).timeNumber);
                setTimeText(convertQuizTimeToText(content.quizTime).timeText);

                const questionsCollectionRef = collection(contentDocRef, "Questions");
                const questionsSnapshot = await getDocs(questionsCollectionRef);
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
                            D: data.options.D
                        },
                        correctAnswer: data.correctAnswer?.replace('option', ''),
                        explanation: data.answerExplanation || '',
                        order: data.order || 0,
                    };
                });
                setQuestionsList(fetchedQuestions);
                setLoading(false);
            } else {
                toast.error("Content not found!");
            }
        } catch (error) {
            console.error("Error fetching quiz data:", error);
            toast.error("Error loading content data.");
        }
    };

    // Validation function to check if all fields are filled for the Questions step
    const isFormValid = () => {
        if (currentStep === Step.QuizInfo) {
            return quizName.trim() !== '' && quizDescription.trim() !== '';
        }
        else if (currentStep === Step.Schedule) {
            return marksPerQ.trim() !== '' && quizScheduleDate.trim() !== '' && nMarksPerQ.trim() !== '' && timeNumber.trim() !== '' && timeText.trim() !== '';
        }
        else if (currentStep === Step.Questions && isEditing) {
            return true;
        }
        else if (currentStep === Step.Review && isEditing) {
            return true;
        }
        return anyQuestionAdded !== '' && questionsList.every(question =>
            question.question.trim() !== '' &&
            question.options.A.trim() !== '' &&
            question.options.B.trim() !== '' &&
            question.options.C.trim() !== '' &&
            question.options.D.trim() !== '' &&
            question.correctAnswer !== null &&
            question.explanation.trim() !== ''
        );
    };

    const isNextButtonDisabled = !isFormValid();

    const isSaveValid = marksPerQ && nMarksPerQ && timeNumber && timeText && quizScheduleDate && quizName && quizDescription;

    const handleNextClick = () => {
        if (currentStep < Step.Schedule) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePreviousClick = () => {
        if (currentStep > Step.QuizInfo) {
            setCurrentStep(currentStep - 1);
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case Step.QuizInfo:
                return (
                    <Quizinfo
                        quizName={quizName}
                        setQuizName={setQuizName}
                        quizDescription={quizDescription}
                        setQuizDescription={setQuizDescription}
                    />
                );
            case Step.Questions:
                return (
                    <Questions
                        questionsList={questionsList}
                        setQuestionsList={setQuestionsList}
                        anyQuestionAdded={anyQuestionAdded}
                        setAnyQuestionAdded={setAnyQuestionAdded}
                        setDeletedQuestionIds={setDeletedQuestionIds}
                    />
                );

            case Step.Review:
                return <Review questionsList={questionsList} />;

            case Step.Schedule:
                return <Schedule marksPerQ={marksPerQ} setMarksPerQ={setMarksPerQ} nMarksPerQ={nMarksPerQ} setnMarksPerQ={setnMarksPerQ} timeNumber={timeNumber} setTimeNumber={setTimeNumber} timeText={timeText} setTimeText={setTimeText} quizScheduleDate={quizScheduleDate} setQuizScheduleDate={setQuizScheduleDate} />;

            default:
                return <Quizinfo
                    quizName={quizName}
                    setQuizName={setQuizName}
                    quizDescription={quizDescription}
                    setQuizDescription={setQuizDescription} />;
        }
    };

    const getStepStyles = (step: Step) => {
        if (currentStep > step) {
            return "bg-[#9012FF]";
        } else if (currentStep === step) {
            return "bg-[#9012FF] ring-4 ring-[#E8DFFB]";
        } else {
            return "border-2 border-[#D0D5DE]";
        }
    };

    const handleSaveClick = async () => {
        toast.promise(
            new Promise(async (resolve, reject) => {
                try {
                    if (isEditing) {
                        const contentRef = doc(db, "course", courseId, 'sections', sectionId, 'content', contentId);
                        const courseData = {
                            lessonHeading: quizName,
                            lessonOverView: quizDescription,
                            lessonScheduleDate: quizScheduleDate,
                            quizTime: timeNumber && timeText ? convertToSeconds(timeNumber + " " + timeText) : 0,
                            marksPerQuestion: marksPerQ,
                            nMarksPerQuestion: nMarksPerQ,
                        };
                        await updateDoc(contentRef, courseData);


                        // Update questions using batch
                        const questionsCollectionRef = collection(contentRef, 'Questions');
                        const batch = writeBatch(db);

                        // Delete removed questions
                        for (const deletedId of deletedQuestionIds) {
                            const deleteRef = doc(questionsCollectionRef, deletedId);
                            batch.delete(deleteRef);
                        }
                        // Process each question in the list
                        for (const question of questionsList) {
                            let questionRef;

                            if (!question.questionId || question.questionId.startsWith('temp-')) {
                                questionRef = doc(questionsCollectionRef);
                            } else {
                                questionRef = doc(questionsCollectionRef, question.questionId);
                            }

                            const questionData = {
                                questionId: questionRef.id,
                                question: question.question,
                                options: question.options,
                                correctAnswer: question.correctAnswer,
                                answerExplanation: question.explanation,
                                order: question.order !== undefined ? question.order : 0,
                            };
                            batch.set(questionRef, questionData);
                        }

                        await batch.commit();
                        resolve('Quiz Saved Successfully!');
                        toggleDrawer();

                    }
                    else {
                        // Generate a unique section ID (Firestore will auto-generate if you use addDoc)
                        // const newContentRef = doc(collection(db, 'course', courseId, 'sections', sectionId, 'content')); 
                        const newContentRef = doc(collection(db, 'course', courseId, 'sections', sectionId, 'content'));

                        const quizData = {
                            contentId: newContentRef.id,
                            type: 'Quiz',
                            lessonHeading: quizName,
                            lessonOverView: quizDescription,
                            lessonScheduleDate: quizScheduleDate,
                            quizTime: timeNumber && timeText ? convertToSeconds(timeNumber + " " + timeText) : 0,
                            marksPerQuestion: marksPerQ,
                            nMarksPerQuestion: nMarksPerQ,
                        };

                        await setDoc(newContentRef, quizData);

                        const quizRef = doc(db, 'quiz', newContentRef.id);
                        const questionsCollectionRef = collection(quizRef, 'Questions');
                        const batch = writeBatch(db);

                        // Delete removed questions
                        for (const deletedId of deletedQuestionIds) {
                            const deleteRef = doc(questionsCollectionRef, deletedId);
                            batch.delete(deleteRef);
                        }


                        // Process each question in the list
                        for (const question of questionsList) {
                            let questionRef;

                            if (!question.questionId || question.questionId.startsWith('temp-')) {
                                questionRef = doc(questionsCollectionRef);
                            } else {
                                questionRef = doc(questionsCollectionRef, question.questionId);
                            }

                            const questionData = {
                                questionId: questionRef.id,
                                question: question.question,
                                options: question.options,
                                correctAnswer: question.correctAnswer,
                                answerExplanation: question.explanation,
                                order: question.order !== undefined ? question.order : 0,
                            };
                            batch.set(questionRef, questionData);
                        }

                        await batch.commit();

                        resolve('Quiz Saved Successfully!');
                        toggleDrawer();
                        setCurrentStep(0);
                        setQuizName('');
                        setQuizDescription('');
                        setMarksPerQ('');
                        setnMarksPerQ('');
                        setQuizScheduleDate('');
                        setTimeNumber('');
                        setTimeText('Minutes');
                        setQuestionsList([]);
                        setAnyQuestionAdded('');
                    }
                } catch (error) {
                    reject('Error in saving/updating quiz');
                    console.error('Error adding quiz: ', error);
                }
            }),
            {
                pending: 'Saving Quiz...',
                success: 'Quiz Saved!',
                error: 'Error saving quiz',
            }
        );

    };
    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            const activeElement = document.activeElement;

            // Check if the focused element is inside Quill
            const isQuillFocused = activeElement?.closest(".ql-editor");

            if (event.key === "Enter" && !isNextButtonDisabled && !isQuillFocused) {
                handleNextClick();
            }
        };

        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [
        isNextButtonDisabled,
        currentStep,
        quizName,
        quizDescription,
        questionsList,
        marksPerQ,
        timeNumber,
        timeText,

    ]);

    if (loading) {
        return <LoadingData />
    }

    return (
        <div>
            <Drawer
                open={isOpen}

                direction="bottom"
                className="rounded-tl-md rounded-tr-md "
                style={{ height: "98vh" }}
            >
                {/* Drawer content goes here */}
                <div className="flex flex-col h-full"> {/* Change 1: Wrap everything in a flex column container */}
                    {/* Top Section - Fixed */}
                    <div className="p-5 flex justify-between items-center h-[69px] w-full border-b-[1.5px] border-t-[1.5px] border-[#EAECF0] rounded-tl-[18px] rounded-tr-[16px]">
                        <span className="text-lg font-semibold text-[#1D2939]">Lesson</span>
                        <div className={`w-auto h-[44px]  rounded-[8px] flex items-center justify-center flex-row gap-3  `}>
                            <button
                                onClick={toggleDrawer}
                                className="w-[103px] h-[40px]  hover:bg-[#F2F4F7] flex items-center justify-center text-sm  border border-solid border-[#EAECF0] font-semibold text-[#1D2939] rounded-[8px] p-4 ">
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveClick}
                                disabled={!isSaveValid}
                                className={`w-[90px] h-[40px] flex items-center justify-center text-sm shadow-inner-button ${!isSaveValid ? 'bg-[#CDA0FC]' : 'bg-[#9012FF]'} border border-solid border-white font-semibold text-[#FFFFFF] rounded-md p-4 `}>
                                Save
                            </button>
                        </div>
                    </div>
                    {loading ? (
                        <LoadingData />
                    ) : (
                        <div className="flex justify-center h-auto overflow-y-auto ">
                            <div className="ml-[32px] w-[250px] my-[32px] bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-md">
                                <div className="flex flex-row items-center justify-between m-4">
                                    <span className="text-[#1D2939] text-base font-semibold">Create Quiz</span>
                                    <div className="flex items-center justify-center w-10 h-8 text-sm text-[#475467] font-medium bg-[#F9FAFB] border border-lightGrey rounded-[6px]">
                                        {currentStep + 1}/4
                                    </div>
                                </div>
                                <div className="flex flex-col mx-4">
                                    {["Quiz info", "Questions", "Review", "Schedule"].map((label, index) => (
                                        <div key={index}>
                                            <div className="flex flex-row items-center gap-2">
                                                <div className={`flex items-center justify-center w-8 h-8 transition-all ${getStepStyles(index as Step)} rounded-full`}>
                                                    {currentStep > index ? (
                                                        <Image src='/icons/Tick.svg' alt="done" width={16} height={14.01} />
                                                    ) : (
                                                        <div className={`${currentStep === index ? "bg-white" : "bg-[#D0D5DE]"} w-[0.625rem] h-[0.625rem] rounded-full`}></div>
                                                    )}
                                                </div>
                                                <p className={`text-base font-semibold transition-all ${currentStep === index ? "text-[#9012FF]" : "text-[#344054]"}`}>{label}</p>
                                            </div>
                                            {index < Step.Schedule && (
                                                <div className={`w-0 h-5 my-1 ml-[15px] transition-all ${currentStep > index ? "border-[#9012FF]" : "border-lightGrey"} border rounded-full`}></div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col w-full ml-[20px] mr-8 mt-8">
                                <div className="h-15 ml-1 w-full border-b border-solid border-[#D0D5DD]">
                                    <div className="flex flex-row justify-between ">
                                        <span className="text-lg font-semibold text-[#1D2939] flex items-center">
                                            {["Quiz info", "Questions", "Review", "Schedule"][currentStep]}
                                        </span>
                                        <div className="flex flex-row gap-3 mb-3">
                                            {currentStep > Step.QuizInfo && (
                                                <button
                                                    className="h-[44px] w-[135px] bg-[#FFFFFF] rounded-md hover:bg-[#F2F4F7] shadow-inner-button border border-solid border-[#EAECF0] flex items-center justify-center"
                                                    onClick={handlePreviousClick}
                                                >
                                                    <span className="text-[#1D2939] font-semibold text-sm">Previous</span>
                                                </button>
                                            )}

                                            {currentStep < Step.Schedule && (
                                                <button
                                                    className={`h-[44px] w-[135px] rounded-md shadow-inner-button border border-solid 
                                        ${isNextButtonDisabled
                                                            ? 'text-white bg-[#8501FF] border-[#800EE2] opacity-35 cursor-not-allowed'
                                                            : 'text-white bg-[#8501FF] border-[#800EE2] hover:bg-[#7001D1]'
                                                        }
                                        flex items-center justify-center transition-colors`}
                                                    onClick={handleNextClick}
                                                    disabled={isNextButtonDisabled}
                                                >
                                                    <span className={`font-semibold text-sm ${isNextButtonDisabled ? 'text-[#9CA3AF]' : 'text-[#FFFFFF]'}`}>
                                                        {currentStep === Step.Schedule ? "" : "Next"}
                                                    </span>
                                                </button>
                                            )}


                                        </div>
                                    </div>
                                </div>
                                <div className="overflow-y-auto">
                                    {renderStepContent()}
                                </div>
                            </div>
                        </div>
                    )}




                </div>
            </Drawer>
        </div>
    )
}
export default Quiz;