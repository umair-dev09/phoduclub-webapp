"use client";

import { useState } from "react";
import Image from "next/image";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
// import Quizinfo from "./Quizinfo";
import Questions from "./Questions";
import Review from "./Review";
import Schedule from "./Schedule";
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
}
function Quiz({ isOpen, toggleDrawer }: QuizProps) {
    const [isPublished, setIsPublished] = useState(false); // New state to track if the quiz is published

    // Validation function to check if all fields are filled
    const [currentStep, setCurrentStep] = useState<Step>(Step.QuizInfo);
    // Add questionsList state here
    const [questionsList, setQuestionsList] = useState<Question[]>([{
        question: '',
        isChecked: false,
        isActive: false,
        options: { A: '', B: '', C: '', D: '' },
        correctAnswer: null,
        explanation: ''
    }]);

    const [quizName, setQuizName] = useState<string>('');
    const [quizDescription, setQuizDescription] = useState<string>('');
    // Validation function to check if all fields are filled for the Questions step
    const isFormValid = () => {
        if (currentStep === Step.QuizInfo) {
            return quizName.trim() !== '' && quizDescription.trim() !== '';
        }
        return questionsList.every(question =>
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

    const handleNextClick = () => {
        if (currentStep === Step.Schedule) {
            setIsPublished(true); // Set quiz as published
        } else if (currentStep < Step.Schedule) {
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
                // return (
                //     <Quizinfo
                //         quizName={quizName}
                //         setQuizName={setQuizName}
                //         quizDescription={quizDescription}
                //         setQuizDescription={setQuizDescription}
                //     />
                // );
            case Step.Questions:
                return (
                    <Questions
                        questionsList={questionsList}
                        setQuestionsList={setQuestionsList}
                    />
                );
            case Step.Review:
                return <Review questionsList={questionsList} />;
            case Step.Schedule:
                return <Schedule />;

            default:
                // return <Quizinfo
                //     quizName={quizName}
                //     setQuizName={setQuizName}
                //     quizDescription={quizDescription}
                //     setQuizDescription={setQuizDescription} />;
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
                        <div className={`w-[150px] h-[44px]  rounded-[8px] flex items-center justify-center flex-row gap-2  `}>
                            <button
                                onClick={toggleDrawer}
                                className="w-[103px] h-[40px] flex items-center justify-center text-sm  border border-solid border-[#EAECF0] font-semibold text-[#1D2939] rounded-[8px] p-4 ">
                                Cancel
                            </button>
                            <button
                                onClick={toggleDrawer}
                                className="w-[88px] h-[40px] flex items-center justify-center text-sm shadow-inner-button bg-[#8501FF] border border-solid border-[#9012FF] font-semibold text-[#FFFFFF] rounded-md p-4 ">
                                Save
                            </button>
                        </div>
                    </div>
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
                                                className="h-[44px] w-[135px] bg-[#FFFFFF] rounded-md shadow-inner-button border border-solid border-[#EAECF0] flex items-center justify-center"
                                                onClick={handlePreviousClick}
                                            >
                                                <span className="text-[#1D2939] font-semibold text-sm">Previous</span>
                                            </button>
                                        )}
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
                                    </div>
                                </div>
                            </div>
                            <div className="overflow-y-auto">
                                {renderStepContent()}
                            </div>
                        </div>
                    </div>





                </div>
            </Drawer>
        </div>
    )
}
export default Quiz;