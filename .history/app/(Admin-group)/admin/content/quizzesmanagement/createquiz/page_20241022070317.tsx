"use client";
import { useState } from "react";
import Quizinfo from "@/components/AdminComponents/createQuiz/QuizInfo";
import Questions from "@/components/AdminComponents/createQuiz/Questions";
import Review from "@/components/AdminComponents/createQuiz/Review";
import Publish from "@/components/AdminComponents/createQuiz/Publish";
import QuizCreated from "@/components/AdminComponents/createQuiz/QuizCreated";

function CreateQuiz() {
    // Step states: 0 = Quizinfo, 1 = Questions, 2 = Review, 3 = Publish, 4 = QuizCreated
    const [currentStep, setCurrentStep] = useState(0);

    const handleNextClick = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePreviousClick = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return <Quizinfo />;
            case 1:
                return <Questions />;
            case 2:
                return <Review />;
            case 3:
                return <Publish />;
            case 4:
                return <QuizCreated />;
            default:
                return <Quizinfo />;
        }
    };

    // Hide everything if the current step is QuizCreated (step 4)
    if (currentStep === 4) {
        return <QuizCreated />;
    }

    return (
        <>
            <div className="ml-[32px] w-[250px] my-[32px] bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-md">
                <div className="flex flex-row justify-between m-4">
                    <span className="text-[#1D2939] text-base font-semibold">Create Quiz</span>
                    <div>4/4</div>
                </div>
                <div className="flex flex-col gap-7 mx-4">
                    <span className="text-[#182230] text-sm font-semibold">Quiz</span>
                    <span className="text-[#182230] text-sm font-semibold">Questions</span>
                    <span className="text-[#182230] text-sm font-semibold">Review</span>
                    <span className="text-[#182230] text-sm font-semibold">Publish</span>
                </div>
            </div>

            <div className="flex flex-col w-full ml-[20px] mr-8 mt-8">
                <div className="h-15 ml-1 w-full border-b border-solid border-[#D0D5DD] ">
                    <div className="flex flex-row justify-between ">
                        <span className="text-lg font-semibold text-[#1D2939] flex items-center">
                            {currentStep === 0 ? "Quiz Info" :
                                currentStep === 1 ? "Questions" :
                                    currentStep === 2 ? "Review" : "Publish"}
                        </span>

                        <div className="flex flex-row gap-3 mb-3">
                            {currentStep > 0 && (
                                <button
                                    className="h-[44px] w-[135px] bg-[#FFFFFF] rounded-md shadow-inner-button border border-solid border-[#EAECF0] flex items-center justify-center"
                                    onClick={handlePreviousClick}
                                >
                                    <span className="text-[#667085] font-semibold text-sm">Previous</span>
                                </button>
                            )}

                            <button
                                className={`h-[44px] w-[135px] ${currentStep === 3 ? "bg-[#8501FF]" : "bg-[#8501FF]"
                                    } rounded-md shadow-inner-button border border-solid border-[#800EE2] flex items-center justify-center`}
                                onClick={handleNextClick}
                            >
                                <span className="text-[#FFFFFF] font-semibold text-sm">
                                    {currentStep === 3 ? "Publish" : "Next"}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="overflow-y-auto">
                    {renderStepContent()}
                </div>
            </div>
        </>
    );
}

export default CreateQuiz;
