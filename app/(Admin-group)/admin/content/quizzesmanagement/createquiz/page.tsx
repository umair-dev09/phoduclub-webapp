"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Quizinfo from "@/components/AdminComponents/createQuiz/QuizInfo";
import Questions from "@/components/AdminComponents/createQuiz/Questions";
import Review from "@/components/AdminComponents/createQuiz/Review";
import Publish from "@/components/AdminComponents/createQuiz/Publish";
import { toast, ToastContainer } from 'react-toastify';
import {now, today, CalendarDate, getLocalTimeZone,parseDateTime} from "@internationalized/date";
import { auth, db, storage } from "@/firebase";
import { addDoc, collection, doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import 'react-toastify/dist/ReactToastify.css';
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
    const [isPublished, setIsPublished] = useState(false); // New state to track if the quiz is published
    const [forYear, setForYear] = useState("Select Year");
    const [forExam, setForExam] = useState("Select Exam");
    const [forProduct, setForProduct] = useState("Select Product");
    const [marksPerQ, setMarksPerQ] = useState("");
    const [nMarksPerQ, setnMarksPerQ] = useState("");
    const [timeNumber, setTimeNumber] = useState("");
    const [timeText, setTimeText] = useState("Minute(s)");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    let [liveQuizNow, setLiveQuizNow] = useState<boolean>(false);
    const router = useRouter();

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
            return quizName.trim() !== '' && quizDescription.trim() !== ''  ;
        }
        else if(currentStep === Step.Publish){
            return marksPerQ.trim() !== '' && endDate.trim() !== '' && nMarksPerQ.trim() !== '' && forYear.trim() !== 'Select Year' && forExam.trim() !== 'Select Exam' && timeNumber.trim() !== '' && timeText.trim() !== '' ;
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

    const isFormValid1 = () => {
        if (currentStep === Step.QuizInfo) {
            return '';
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
    const isSaveButtonDisabled = !isFormValid1();

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 19); // Converts to the format "YYYY-MM-DDTHH:MM:SS"
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const handleNextClick = async () => {
        if (currentStep === Step.Publish) {

            toast.promise(
                new Promise(async (resolve, reject) => {
                    try {
                        // Simulate delay
                        await new Promise(resolve => setTimeout(resolve, 100));

                        // Generate a random quiz ID
                        const quizRef = doc(collection(db, "quiz"));

                        // Prepare quiz data
                        const quizData = {
                            quizId: quizRef.id,  // Use the generated ID as the quizId
                            quizName: quizName,
                            quizDescription: quizDescription,
                            startDate: liveQuizNow ? formattedDate : startDate, // Condition to set startDate
                            endDate: endDate,
                            quizTime: timeNumber + " " + timeText, // If applicable
                            marksPerQuestion: marksPerQ,
                            nMarksPerQuestion: nMarksPerQ,
                            forYear: forYear,
                            forExam: forExam,
                            quizStatus: "scheduled", // You can change this as needed
                            quizPublishedDate: new Date().toISOString() // Add the current time as published date
                        };

                        // Save quiz data to Firestore
                        await setDoc(quizRef, quizData);

                        // Save questions
                        for (let question of questionsList) {
                            const questionRef = doc(collection(quizRef, "Questions"));
                            const questionId = questionRef.id;
        
                            // Map options to an `options` object
                            const options = {
                                option1: question.options.A,
                                option2: question.options.B,
                                option3: question.options.C,
                                option4: question.options.D,
                            };
        
                            // Determine the correct answer based on the letter provided
                            let correctAnswer;
                            switch (question.correctAnswer) {
                                case "A":
                                    correctAnswer = 'option1';
                                    break;
                                case "B":
                                    correctAnswer = 'option2';
                                    break;
                                case "C":
                                    correctAnswer = 'option3';
                                    break;
                                case "D":
                                    correctAnswer = 'option4';
                                    break;
                                default:
                                    correctAnswer = null;
                            }
        
                            const questionData = {
                                questionId,
                                question: question.question,
                                options,
                                correctAnswer,
                                answerExplanation: question.explanation,
                            };
                            await setDoc(questionRef, questionData);
                        }

                        // Mark the quiz as published
                        resolve('Quiz Published Successfully!');
                         setTimeout(() => {
                            router.back();
                        }, 500);
                    } catch (error) {
                        reject('Error in publishing quiz');
                    }
                }),
                {
                    pending: 'Uploading Quiz...',
                    success: 'Quiz Published!',
                    error: 'Error publishing quiz'
                }
            );
              
        } else if (currentStep < Step.Publish) {
            setCurrentStep(currentStep + 1);
        }
    };
   
    const handleSaveClick = async () => {
        const router = useRouter();
    
        toast.promise(
            new Promise(async (resolve, reject) => {
                try {
                    // Simulate delay
                    await new Promise(resolve => setTimeout(resolve, 100));
    
                    // Generate a random quiz ID
                    const quizRef = doc(collection(db, "quiz"));
    
                    // Prepare quiz data
                    const quizData = {
                        quizId: quizRef.id,
                        quizName,
                        quizDescription,
                        startDate: liveQuizNow ? formattedDate : startDate,
                        endDate,
                        timePerQuestion: timeNumber + timeText,
                        marksPerQuestion: marksPerQ,
                        nMarksPerQuestion: nMarksPerQ,
                        forYear,
                        forExam,
                        quizStatus: "saved",
                        quizPublishedDate: new Date().toISOString(),
                    };
    
                    // Save quiz data to Firestore
                    await setDoc(quizRef, quizData);
    
                    // Save questions
                    for (let question of questionsList) {
                        const questionRef = doc(collection(quizRef, "Questions"));
                        const questionId = questionRef.id;
    
                        // Map options to an `options` object
                        const options = {
                            option1: question.options.A,
                            option2: question.options.B,
                            option3: question.options.C,
                            option4: question.options.D,
                        };
    
                        // Determine the correct answer based on the letter provided
                        let correctAnswer;
                        switch (question.correctAnswer) {
                            case "A":
                                correctAnswer = 'option1';
                                break;
                            case "B":
                                correctAnswer = 'option2';
                                break;
                            case "C":
                                correctAnswer = 'option3';
                                break;
                            case "D":
                                correctAnswer = 'option4';
                                break;
                            default:
                                correctAnswer = null;
                        }
    
                        const questionData = {
                            questionId,
                            question: question.question,
                            options,
                            correctAnswer,
                            answerExplanation: question.explanation,
                        };
    
                        // Save each question data to Firestore
                        await setDoc(questionRef, questionData);
                    }
    
                    // Mark the quiz as saved and go back to the previous page after a short delay
                    resolve('Quiz Saved Successfully!');
                    setTimeout(() => {
                        router.back();
                    }, 500);
                } catch (error) {
                    reject('Error in saving quiz');
                }
            }),
            {
                pending: 'Saving Quiz...',
                success: 'Quiz Saved!',
                error: 'Error saving quiz',
            }
        );
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
                return <Publish forYear={forYear} setForYear={setForYear} forExam={forExam} setForExam={setForExam} forProduct={forProduct} setForProduct={setForProduct} marksPerQ={marksPerQ} setMarksPerQ={setMarksPerQ} nMarksPerQ={nMarksPerQ} setnMarksPerQ={setnMarksPerQ} timeNumber={timeNumber} setTimeNumber={setTimeNumber} timeText={timeText} setTimeText={setTimeText} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} liveQuizNow={liveQuizNow} setLiveQuizNow={setLiveQuizNow}/>;
            
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
                            {isSaveButtonDisabled === false &&(
                                <button className="mr-1" onClick={handleSaveClick}>
                          <span className="text-[#8501FF] font-semibold text-sm">Save quiz</span>
                          </button>
                            )}
                          
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
            <ToastContainer />
        </>
    );
}

export default CreateQuiz;

