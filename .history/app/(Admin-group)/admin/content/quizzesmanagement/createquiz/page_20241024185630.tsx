// "use client";
// import { useState } from "react";
// import Image from "next/image";
// import Quizinfo from "@/components/AdminComponents/createQuiz/QuizInfo";
// import Questions from "@/components/AdminComponents/createQuiz/Questions";
// import Review from "@/components/AdminComponents/createQuiz/Review";
// import Publish from "@/components/AdminComponents/createQuiz/Publish";
// import QuizCreated from "@/components/AdminComponents/createQuiz/QuizCreated";

// // Define interfaces here in the same file
// interface Options {
//     A: string;
//     B: string;
//     C: string;
//     D: string;
// }

// interface Question {
//     question: string;
//     isChecked: boolean;
//     isActive: boolean;
//     options: Options;
//     correctAnswer: string | null;
//     explanation: string;
// }

// enum Step {
//     QuizInfo = 0,
//     Questions = 1,
//     Review = 2,
//     Publish = 3,
//     QuizCreated = 4,
// }

// function CreateQuiz() {
//     // Validation function to check if all fields are filled
//     const isFormValid = () => {
//         if (currentStep === Step.QuizInfo) {
//             return true; // Always allow "Next" in QuizInfo step
//         }
//         return questionsList.every(question =>
//             question.question.trim() !== '' &&  // Question should not be empty
//             question.options.A.trim() !== '' && // Option A should not be empty
//             question.options.B.trim() !== '' && // Option B should not be empty
//             question.options.C.trim() !== '' && // Option C should not be empty
//             question.options.D.trim() !== '' && // Option D should not be empty
//             question.correctAnswer !== null &&   // Correct answer should be selected
//             question.explanation.trim() !== ''
//         );
//     };
//     const [currentStep, setCurrentStep] = useState<Step>(Step.QuizInfo);
//     // Add questionsList state here
//     const [questionsList, setQuestionsList] = useState<Question[]>([{
//         question: '',
//         isChecked: false,
//         isActive: false,
//         options: { A: '', B: '', C: '', D: '' },
//         correctAnswer: null,
//         explanation: ''
//     }]);

//     const handleNextClick = () => {
//         if (currentStep === Step.Publish) {
//             setCurrentStep(Step.QuizCreated);
//         } else if (currentStep < Step.Publish) {
//             setCurrentStep(currentStep + 1);
//         }
//     };

//     const handlePreviousClick = () => {
//         if (currentStep > Step.QuizInfo) {
//             setCurrentStep(currentStep - 1);
//         }
//     };

//     const renderStepContent = () => {
//         switch (currentStep) {
//             case Step.QuizInfo:
//                 return <Quizinfo />;
//             case Step.Questions:
//                 return <Questions
//                     questionsList={questionsList}
//                     setQuestionsList={setQuestionsList}
//                 />;
//             case Step.Review:
//                 return <Review questionsList={questionsList} />;
//             case Step.Publish:
//                 return <Publish />;
//             case Step.QuizCreated:
//                 return <QuizCreated />;
//             default:
//                 return <Quizinfo />;
//         }
//     };

//     const getStepStyles = (step: Step) => {
//         if (currentStep > step) {
//             return "bg-[#9012FF]"; // Completed step
//         } else if (currentStep === step) {
//             return "bg-[#9012FF] ring-4 ring-[#E8DFFB]"; // Active step
//         } else {
//             return "border-2 border-[#D0D5DE]"; // Upcoming step
//         }
//     };

//     // Render nothing but the Quiz Created component if it's the current step
//     if (currentStep === Step.QuizCreated) {
//         return <QuizCreated />;
//     }

//     return (
//         <>
//             <div className="ml-[32px] w-[250px] my-[32px] bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-md">
//                 <div className="flex flex-row items-center justify-between m-4">
//                     <span className="text-[#1D2939] text-base font-semibold">Create Quiz</span>
//                     <div className="flex items-center justify-center w-10 h-8 text-sm text-[#475467] font-medium bg-[#F9FAFB] border border-lightGrey rounded-[6px]">
//                         {currentStep + 1}/4
//                     </div>
//                 </div>
//                 <div className="flex flex-col mx-4">
//                     {["Quiz info", "Questions", "Review", "Publish"].map((label, index) => (
//                         <div key={index}>
//                             <div className="flex flex-row items-center gap-2">
//                                 <div className={`flex items-center justify-center w-8 h-8 transition-all ${getStepStyles(index as Step)} rounded-full`}>
//                                     {currentStep > index ? (
//                                         <Image src='/icons/Tick.svg' alt="done" width={16} height={14.01} />
//                                     ) : (
//                                         <div className={`${currentStep === index ? "bg-white" : "bg-[#D0D5DE]"} w-[0.625rem] h-[0.625rem] rounded-full`}></div>
//                                     )}
//                                 </div>
//                                 <p className={`text-base font-semibold transition-all ${currentStep === index ? "text-[#9012FF]" : "text-[#344054]"}`}>{label}</p>
//                             </div>
//                             {index < Step.Publish && (
//                                 <div className={`w-0 h-5 my-1 ml-[15px] transition-all ${currentStep > index ? "border-[#9012FF]" : "border-lightGrey"} border rounded-full`}></div>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <div className="flex flex-col w-full ml-[20px] mr-8 mt-8">
//                 <div className="h-15 ml-1 w-full border-b border-solid border-[#D0D5DD] ">
//                     <div className="flex flex-row justify-between ">
//                         <span className="text-lg font-semibold text-[#1D2939] flex items-center">
//                             {["Quiz info", "Questions", "Review", "Publish"][currentStep]}
//                         </span>

//                         <div className="flex flex-row gap-3 mb-3">
//                             {currentStep > Step.QuizInfo && (
//                                 <button
//                                     className="h-[44px] w-[135px] bg-[#FFFFFF] rounded-md shadow-inner-button border border-solid border-[#EAECF0] flex items-center justify-center"
//                                     onClick={handlePreviousClick}
//                                 >
//                                     <span className="text-[#1D2939] font-semibold text-sm">Previous</span>
//                                 </button>
//                             )}

//                             <button
//                                 className={`h-[44px] w-[135px] ${currentStep === Step.Publish ? "bg-[#8501FF]" : "bg-[#8501FF]"} rounded-md shadow-inner-button border border-solid border-[#800EE2] flex items-center justify-center`}
//                                 onClick={handleNextClick}
//                                 disabled={!isFormValid()}
//                             >
//                                 <span className="text-[#FFFFFF] font-semibold text-sm">
//                                     {currentStep === Step.Publish ? "Publish" : "Next"}
//                                 </span>
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="overflow-y-auto">
//                     {renderStepContent()}
//                 </div>
//             </div>
//         </>
//     );
// }

// export default CreateQuiz;
"use client";

import { useState } from "react";
import Image from "next/image";
import Quizinfo from "@/components/AdminComponents/createQuiz/QuizInfo";
import Questions from "@/components/AdminComponents/createQuiz/Questions";
import Review from "@/components/AdminComponents/createQuiz/Review";
import Publish from "@/components/AdminComponents/createQuiz/Publish";
import QuizCreated from "@/components/AdminComponents/createQuiz/QuizCreated";

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
    Publish = 3,
    QuizCreated = 4,
}

function CreateQuiz() {
    const [currentStep, setCurrentStep] = useState<Step>(Step.QuizInfo);
    const [quizName, setQuizName] = useState<string>('');
    const [quizDescription, setQuizDescription] = useState<string>('');
    const [questionsList, setQuestionsList] = useState<Question[]>([{
        question: '',
        isChecked: false,
        isActive: false,
        options: { A: '', B: '', C: '', D: '' },
        correctAnswer: null,
        explanation: ''
    }]);

    const handleNextClick = () => {
        if (currentStep === Step.Publish) {
            setCurrentStep(Step.QuizCreated);
        } else if (currentStep < Step.Publish) {
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
                    />
                );
            case Step.Review:
                return <Review questionsList={questionsList} />;
            case Step.Publish:
                return <Publish />;
            case Step.QuizCreated:
                return <QuizCreated />;
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
            return "bg-[#9012FF]"; // Completed step
        } else if (currentStep === step) {
            return "bg-[#9012FF] ring-4 ring-[#E8DFFB]"; // Active step
        } else {
            return "border-2 border-[#D0D5DE]"; // Upcoming step
        }
    };

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

    return (
        <>
            <div className="ml-[32px] w-[250px] my-[32px] bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-md">
                <div className="flex flex-row items-center justify-between m-4">
                    <span className="text-[#1D2939] text-base font-semibold">Create Quiz</span>
                    <div className="flex items-center justify-center w-10 h-8 text-sm text-[#475467] font-medium bg-[#F9FAFB] border border-lightGrey rounded-[6px]">
                        {currentStep + 1}/4
                    </div>
                </div>
                <div className="flex flex-col mx-4">
                    {["Quiz info", "Questions", "Review", "Publish"].map((label, index) => (
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
                            {index < Step.Publish && (
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
                            {["Quiz info", "Questions", "Review", "Publish"][currentStep]}
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

