"use client";
import { useState } from "react";
import Image from "next/image";
import Quizinfo from "@/components/AdminComponents/createQuiz/QuizInfo";
import Questions from "@/components/AdminComponents/createQuiz/Questions";
import Review from "@/components/AdminComponents/createQuiz/Review";
import Publish from "@/components/AdminComponents/createQuiz/Publish";
import QuizCreated from "@/components/AdminComponents/createQuiz/QuizCreated";

// Define an enum for the steps
enum Step {
    QuizInfo = 0,
    Questions = 1,
    Review = 2,
    Publish = 3,
}

function CreateQuiz() {
    // Step states: 0 = Quizinfo, 1 = Questions, 2 = Review, 3 = Publish, 4 = QuizCreated
    const [currentStep, setCurrentStep] = useState(0);

    const handleNextClick = () => {
        if (currentStep < 4) {
            // Step states using the enum
            const [currentStep, setCurrentStep] = useState<Step>(Step.QuizInfo);

            const handleNextClick = () => {
                if (currentStep < Step.Publish) {
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
                        return <Quizinfo />;
                    case Step.Questions:
                        return <Questions />;
                    case Step.Review:
                        return <Review />;
                    case Step.Publish:
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
            const getStepStyles = (step: Step) => {
                if (currentStep > step) {
                    return "bg-[#9012FF]"; // Completed step
                } else if (currentStep === step) {
                    return "bg-[#9012FF] ring-4 ring-[#E8DFFB]"; // Active step
                } else {
                    return "border-2 border-[#D0D5DE]"; // Upcoming step
                }
            };

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
                            <div>
                                {currentStep + 1}/4
                            </div>
                        </div>
                        <div className="flex flex-col mx-4">
                            {["Quiz info", "Questions", "Review", "Publish"].map((label, index) => (
                                <div key={index}>
                                    <div className="flex flex-row items-center gap-2">
                                        <div className={`flex items-center justify-center w-8 h-8 ${getStepStyles(index as Step)} rounded-full`}>
                                            {currentStep > index ? (
                                                <Image src='/icons/Tick.svg' alt="done" width={16} height={14.01} />
                                            ) : (
                                                <div className={`${currentStep === index ? "bg-white" : "bg-[#D0D5DE]"} w-[0.625rem] h-[0.625rem] rounded-full`}></div>
                                            )}
                                        </div>
                                        <p className={`text-base font-semibold ${currentStep === index ? "text-[#9012FF]" : "text-[#344054]"}`}>{label}</p>
                                    </div>
                                    {index < Step.Publish && (
                                        <div className={`w-0 h-5 my-1 ml-[15px] ${currentStep > index ? "border-[#9012FF]" : "border-lightGrey"} border rounded-full`}></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col w-full ml-[20px] mr-8 mt-8">
                        <div className="h-15 ml-1 w-full border-b border-solid border-[#D0D5DD] ">
                            <div className="flex flex-row justify-between ">
                                <span className="text-lg font-semibold text-[#1D2939] flex items-center">
                                    {["Quiz info", "Questions", "Review", "Publish"][currentStep]}
                                </span>

                                <div className="flex flex-row gap-3 mb-3">
                                    {currentStep > Step.QuizInfo && (
                                        <button
                                            className="h-[44px] w-[135px] bg-[#FFFFFF] rounded-md shadow-inner-button border border-solid border-[#EAECF0] flex items-center justify-center"
                                            onClick={handlePreviousClick}
                                        >
                                            <span className="text-[#667085] font-semibold text-sm">Previous</span>
                                        </button>
                                    )}

                                    <button
                                        className={`h-[44px] w-[135px] ${currentStep === Step.Publish ? "bg-[#8501FF]" : "bg-[#8501FF]"
                                            } rounded-md shadow-inner-button border border-solid border-[#800EE2] flex items-center justify-center`}
                                        onClick={handleNextClick}
                                    >
                                        <span className="text-[#FFFFFF] font-semibold text-sm">
                                            {currentStep === Step.Publish ? "Publish" : "Next"}
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