"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import TestSeriesInfo from "@/components/AdminComponents/TestSeriesComponents/TestSeriesInfo";
import Sections from "@/components/AdminComponents/TestSeriesComponents/Sections";
import Review from "@/components/AdminComponents/TestSeriesComponents/Review";
import Perference from "@/components/AdminComponents/TestSeriesComponents/Perference";

// Define an enum for the steps with updated names
enum Step {
    TestSeriesInfo = 0,
    Sections = 1,
    Review = 2,
    Perference = 3,
}


function CreateQuiz() {




    const [isPublished, setIsPublished] = useState(false);
    const [currentStep, setCurrentStep] = useState<Step>(Step.TestSeriesInfo);
    const router = useRouter();

    const handleNextClick = () => {
        if (currentStep === Step.Perference) {
            setIsPublished(true); // Set quiz as published
        } else if (currentStep < Step.Perference) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePreviousClick = () => {
        if (currentStep > Step.TestSeriesInfo) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleBackClick = () => {
        router.back(); // Navigate to the previous page in the browser history
    };



    const renderStepContent = () => {
        switch (currentStep) {
            case Step.TestSeriesInfo:
                return <TestSeriesInfo />;
            case Step.Sections:
                return (
                    <Sections



                    />
                );

            case Step.Review:
                return <Review />;
            case Step.Perference:
                return <Perference />;
            default:
                return <TestSeriesInfo />;
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
        <>
            <div className="ml-8 w-[17.125rem] my-8 bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-md overflow-y-auto">
                <div className="flex flex-row items-center justify-between m-4">
                    <span className="text-[#1D2939] text-base font-semibold">Create Test Series</span>
                    <div className="flex items-center justify-center w-10 h-8 text-sm text-[#475467] font-medium bg-[#F9FAFB] border border-lightGrey rounded-[6px]">
                        {currentStep + 1}/4
                    </div>
                </div>
                <div className="flex flex-col mx-4">
                    {["Test Series Info", "Sections", "Review", "Perference"].map((label, index) => (
                        <div key={index}>
                            <div className="flex flex-row items-center mr-2 gap-2">
                                <div className={`flex items-center justify-center w-8 h-8 transition-all ${getStepStyles(index as Step)} rounded-full`}>
                                    {currentStep > index ? (
                                        <Image src='/icons/Tick.svg' alt="done" width={16} height={14.01} />
                                    ) : (
                                        <div className={`${currentStep === index ? "bg-white" : "bg-[#D0D5DE]"} w-[0.625rem] h-[0.625rem] rounded-full`}></div>
                                    )}
                                </div>
                                <p className={`text-sm font-semibold transition-all ${currentStep === index ? "text-[#9012FF]" : "text-[#344054]"}`}>{label}</p>
                            </div>
                            {index < Step.Perference && (
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
                            {["Test Series Info", "Sections", "Review", "Perference"][currentStep]}
                        </span>
                        <div className="flex flex-row gap-3 mb-3">
                            {currentStep === Step.Sections && (
                                <button


                                    className="flex flex-row gap-1 items-center h-[44px] w-[162px] justify-center"

                                >
                                    <Image src="/icons/plus-sign.svg" height={18} width={18} alt="Plus Sign" />
                                    <span className="text-[#9012FF] font-semibold text-sm">Add Section</span>
                                </button>
                            )}

                            {currentStep > Step.TestSeriesInfo && (
                                <button
                                    className="h-[44px] w-[135px] bg-[#FFFFFF] rounded-md shadow-inner-button border border-solid border-[#EAECF0] flex items-center justify-center"
                                    onClick={handlePreviousClick}
                                >
                                    <span className="text-[#1D2939] font-semibold text-sm">Previous</span>
                                </button>
                            )}
                            <button
                                className={`h-[44px] w-[135px] rounded-md shadow-inner-button border border-solid text-white bg-[#8501FF] border-[#800EE2] hover:bg-[#7001D1]`}
                                onClick={currentStep === Step.Perference ? handleBackClick : handleNextClick}
                            >
                                <span className="font-semibold text-sm text-[#FFFFFF]">
                                    {currentStep === Step.Perference ? "Publish" : "Next"}
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