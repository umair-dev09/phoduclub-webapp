import { useState } from "react";
import Quizinfo from "@/components/AdminComponents/createQuiz/QuizInfo";
import Questions from "@/components/AdminComponents/createQuiz/Questions";
import Review from "@/components/AdminComponents/createQuiz/Review";
import Publish from "@/components/AdminComponents/createQuiz/Publish";

function CreateQuiz() {
    // Step states: 0 = Quizinfo, 1 = Questions, 2 = Review, 3 = Publish
    const [currentStep, setCurrentStep] = useState(0);

    const handleNextClick = () => {
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
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
            default:
                return <Quizinfo />;
        }
    };

    return (
        <>
            <div className="ml-[32px] w-[250px] my-[32px] bg-slate-400">
                Quiz Creation Process
            </div>

            <div className="flex flex-col w-full mx-[32px]">
                <div className="h-[44px] ml-1 mr-[32px] bg-[#FFFFFF] mt-[32px] w-full">
                    <div className="flex flex-row justify-between">
                        <span className="text-lg font-semibold text-[#1D2939]">Quizzes</span>

                        <button
                            className="h-[44px] w-[135px] bg-[#8501FF] rounded-md shadow-inner-button border border-solid border-[#800EE2] flex items-center justify-center"
                            onClick={handleNextClick}
                        >
                            <span className="text-[#FFFFFF] font-semibold text-sm">
                                {currentStep === 3 ? "Publish" : "Next"}
                            </span>
                        </button>
                    </div>
                </div>

                <div className="mx-[10px] bg-[#FFFFFF] my-[32px] h-full">
                    {renderStepContent()}
                </div>
            </div>
        </>
    );
}

export default CreateQuiz;
