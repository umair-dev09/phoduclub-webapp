import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Quizinfo from "@/components/AdminComponents/createQuiz/QuizInfo";
import Questions from "@/components/AdminComponents/createQuiz/Questions";
import Review from "@/components/AdminComponents/createQuiz/Review";
import Publish from "@/components/AdminComponents/createQuiz/Publish";
import { toast, ToastContainer } from 'react-toastify';
import { now, today, CalendarDate, getLocalTimeZone, parseDateTime } from "@internationalized/date";
import { auth, db, storage } from "@/firebase";
import { addDoc, collection, doc, getDoc, getDocs, updateDoc, setDoc, writeBatch } from "firebase/firestore";
import 'react-toastify/dist/ReactToastify.css';
// Define interfaces for question options and structure
interface Options { 
    A: string;
    B: string;
    C: string;
    D: string;
}
export interface Question {
    question: string;
    isChecked: boolean;
    isActive: boolean;
    options: Options;
    correctAnswer: string | null;
    explanation: string;
    questionId: string;
    order: number;
}
// Define an enum for the steps
enum Step {
    QuizInfo = 0,
    Questions = 1,
    Review = 2,
    Publish = 3,
    QuizCreated = 4,
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

function CreateQuiz() {
    const [isPremiumQuiz, setIsPremiumQuiz] = useState(false);
    const [product, setProduct] = useState<{ productId: string; productName: string ; productType: string } | null>(null);
    const [marksPerQ, setMarksPerQ] = useState(0);
    const [nMarksPerQ, setnMarksPerQ] = useState(0);
    const [timeNumber, setTimeNumber] = useState("");
    const [timeText, setTimeText] = useState("Minutes");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [originalName, setOriginalName] = useState('');
    const [originalDescription, setOriginalDescription] = useState('');
    let [liveQuizNow, setLiveQuizNow] = useState<boolean>(false);
    const searchParams = useSearchParams();
    const status = searchParams.get("s");
    const quizId = searchParams.get("qId");
    const router = useRouter();
    const [quizName, setQuizName] = useState<string>('');
    const [quizDescription, setQuizDescription] = useState<string>('');
    const [deletedQuestionIds, setDeletedQuestionIds] = useState<string[]>([]);
    const [questionsList, setQuestionsList] = useState<Question[]>([{ question: "", isChecked: false, isActive: false, options: { A: "", B: "", C: "", D: "" }, correctAnswer: null, explanation: "", questionId: "", order: 1 }]);
    const [originalQuestionsList, setOriginalQuestionsList] = useState<Question[]>([{ question: "", isChecked: false, isActive: false, options: { A: "", B: "", C: "", D: "" }, correctAnswer: null, explanation: "", questionId: "", order: 1 }]);

    useEffect(() => {
        if (quizId) {
            fetchQuizData(quizId);
        }
    }, [status, quizId]);


    const fetchQuizData = async (quizId: string) => {
        try {
            const quizDocRef = doc(db, "quiz", quizId);
            const quizDocSnap = await getDoc(quizDocRef);

            if (quizDocSnap.exists()) {
                const quizData = quizDocSnap.data();
                setQuizName(quizData.quizName || "");
                setOriginalName(quizData.quizName || "");
                setQuizDescription(quizData.quizDescription || "");
                setOriginalDescription(quizData.quizDescription || "");
                setStartDate(quizData.startDate || "");
                setEndDate(quizData.endDate || "");
                setMarksPerQ(quizData.marksPerQuestion || "");
                setnMarksPerQ(quizData.nMarksPerQuestion || "");
                setTimeNumber(convertQuizTimeToText(quizData.quizTime).timeNumber);
                setTimeText(convertQuizTimeToText(quizData.quizTime).timeText);
                setIsPremiumQuiz(quizData.isPremiumQuiz || false);
                setProduct(quizData.product || null);
                // Fetch Questions subcollection
                const questionsCollectionRef = collection(quizDocRef, "Questions");
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
                setOriginalQuestionsList(fetchedQuestions);
            } else {
                toast.error("Quiz not found!");
            }
        } catch (error) {
            console.error("Error fetching quiz data:", error);
            toast.error("Error loading quiz data.");
        }
    };


    // Validation function to check if all fields are filled
    const [currentStep, setCurrentStep] = useState<Step>(Step.QuizInfo);
    // Add questionsList state here


    // Validation function to check if all fields are filled for the Questions step
    const isFormValid = () => {
        if (currentStep === Step.QuizInfo) {
            return quizName.trim() !== '' && quizDescription.trim() !== '';
        }
        else if (currentStep === Step.Publish) {
            return marksPerQ !== 0 && endDate.trim() !== '' && timeNumber.trim() !== '' && timeText.trim() !== '' && (!isPremiumQuiz || (isPremiumQuiz && product !== null));
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
    const userId = auth.currentUser ? auth.currentUser.uid : null;

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 19); // Converts to the format "YYYY-MM-DDTHH:MM:SS"
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const handleNextClick = async () => {
        if(quizId && (quizName !== originalName || quizDescription !== originalDescription || questionsList !== originalQuestionsList)){
            handleSaveChanges();
        }
        if (currentStep === Step.Publish) {
            toast.promise(
                new Promise(async (resolve, reject) => {
                    try {
                        // Simulate delay
                        await new Promise(resolve => setTimeout(resolve, 100));
                        if(quizId){
                          if(status === 'saved' || status === null){
                            // Update existing quiz document
                            const quizRef = doc(db, 'quiz', quizId);
                            await updateDoc(quizRef, {
                                quizName,
                                quizDescription,
                                startDate: liveQuizNow ? formattedDate : startDate,
                                endDate,
                                quizTime: timeNumber && timeText ? convertToSeconds(timeNumber + " " + timeText) : 0,
                                marksPerQuestion: marksPerQ,
                                nMarksPerQuestion: nMarksPerQ || 0,
                                status: liveQuizNow ? "live" : "scheduled", // You can change this as needed
                                quizPublishedDate: new Date().toISOString(),
                                createdBy: userId,
                                isPremiumQuiz,
                                product: isPremiumQuiz ? product : null,
                            });
                            setOriginalName(quizName);
                            setOriginalDescription(quizDescription);
                            resolve('Changes Saved Successfully!');
                            setTimeout(() => {
                                router.back();
                            }, 500);
                          }
                          else{
                            // Update existing quiz document
                            const quizRef = doc(db, 'quiz', quizId);
                            await updateDoc(quizRef, {
                                quizName,
                                quizDescription,
                                // startDate: liveQuizNow ? formattedDate : startDate,
                                // endDate,
                                quizTime: timeNumber && timeText ? convertToSeconds(timeNumber + " " + timeText) : 0,
                                marksPerQuestion: marksPerQ,
                                nMarksPerQuestion: nMarksPerQ || 0,
                                // status: liveQuizNow ? "live" : "scheduled", // You can change this as needed
                                quizPublishedDate: new Date().toISOString(),
                                isPremiumQuiz,
                                product: isPremiumQuiz ? product : null,
                                createdBy: userId,
                            });

                           
                            setOriginalName(quizName);
                            setOriginalDescription(quizDescription);
                            resolve('Changes Saved Successfully!');
                            setTimeout(() => {
                                router.back();
                            }, 500);
                          }
                        }
                        else{
                        const docRef = await addDoc(collection(db, 'quiz'), {
                            quizName,
                            quizDescription,
                            startDate: liveQuizNow ? formattedDate : startDate,
                            endDate,
                            quizTime: timeNumber && timeText ? convertToSeconds(timeNumber + " " + timeText) : 0,
                            marksPerQuestion: marksPerQ,
                            nMarksPerQuestion: nMarksPerQ || 0,
                            status: liveQuizNow ? "live" : "scheduled", // You can change this as needed
                            quizPublishedDate: new Date().toISOString(),
                            isPremiumQuiz,
                            product: isPremiumQuiz ? product : null,
                            createdBy: userId,
                        });

                        await updateDoc(doc(db, 'quiz', docRef.id), {
                            quizId: docRef.id,
                        });

                        const quizRef = doc(db, 'quiz', docRef.id);
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
                        setTimeout(() => {
                            router.back();
                        }, 500);
                    }
                    } catch (error) {
                        reject('Error in publishing/updating quiz');
                    }
                }),
                {
                    pending: 'Publishing/Updating Quiz...',
                    success: 'Quiz Published/Saved Successfully!',
                    error: 'Error publishing/updating quiz'
                }
            );
        } else if (currentStep < Step.Publish) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleSaveChanges = async () => {
        toast.promise(
            new Promise(async (resolve, reject) => {
                try {
                    // Simulate delay
                    await new Promise(resolve => setTimeout(resolve, 100));
                    if (quizId) {
                        // Update existing quiz document
                        const quizRef = doc(db, 'quiz', quizId);
                        await updateDoc(quizRef, {
                            quizName,
                            quizDescription,
                        });

                        // Update questions using batch
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
                        setOriginalName(quizName);
                        setOriginalDescription(quizDescription);
                        setOriginalQuestionsList(questionsList);
                        resolve('Changes Saved Successfully!');
                    }
                } catch (error) {
                    reject('Error in saving/updating quiz');
                    console.error('Error saving quiz:', error);
                }
            }),
            {
                pending: 'Saving Changes...',
                success: 'Changes Saved!',
                error: 'Error saving changes',
            }
        );
    };

    const handleSaveClick = async () => {
        toast.promise(
            new Promise(async (resolve, reject) => {
                try {
                    // Simulate delay
                    await new Promise(resolve => setTimeout(resolve, 100));

                    // If status is 'saved' and quizId exists, update the quiz
                    if (status === "saved" && quizId) {
                        // Update existing quiz document
                        const quizRef = doc(db, 'quiz', quizId);
                        await updateDoc(quizRef, {
                            quizName,
                            quizDescription,
                            startDate: liveQuizNow ? formattedDate : startDate,
                            endDate,
                            quizTime: timeNumber && timeText ? convertToSeconds(timeNumber + " " + timeText) : 0,
                            marksPerQuestion: marksPerQ,
                            nMarksPerQuestion: nMarksPerQ || 0,
                            status: "saved",
                            quizPublishedDate: new Date().toISOString(),
                            isPremiumQuiz: false,
                            createdBy: userId,
                        });

                        // Update questions using batch
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
                        
                        resolve('Quiz Updated Successfully!');
                        setTimeout(() => {
                            router.back();
                        }, 500);

                    } else {
                        const docRef = await addDoc(collection(db, 'quiz'), {
                            quizName,
                            quizDescription,
                            startDate: liveQuizNow ? formattedDate : startDate,
                            endDate,
                            quizTime: timeNumber && timeText ? convertToSeconds(timeNumber + " " + timeText) : 0,
                            marksPerQuestion: marksPerQ,
                            nMarksPerQuestion: nMarksPerQ || 0,
                            status: "saved",
                            quizPublishedDate: new Date().toISOString(),
                            isPremiumQuiz: false,
                            createdBy: userId,
                        });

                        await updateDoc(doc(db, 'quiz', docRef.id), {
                            quizId: docRef.id,
                        });

                        const quizRef = doc(db, 'quiz', docRef.id);
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
                        setTimeout(() => {
                            router.back();
                        }, 500);
                    }

                } catch (error) {
                    reject('Error in saving/updating quiz');
                    console.error('Error saving quiz:', error);
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
                        deletedQuestionIds={deletedQuestionIds}
                        setDeletedQuestionIds={setDeletedQuestionIds}
                    />
                );
            case Step.Review:
                return <Review questionsList={questionsList} />;
            case Step.Publish:
                return <Publish product={product} isPremiumQuiz={isPremiumQuiz} setIsPremiumQuiz={setIsPremiumQuiz} setProduct={setProduct} status={status} marksPerQ={marksPerQ} setMarksPerQ={setMarksPerQ} nMarksPerQ={nMarksPerQ} setnMarksPerQ={setnMarksPerQ} timeNumber={timeNumber} setTimeNumber={setTimeNumber} timeText={timeText} setTimeText={setTimeText} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} liveQuizNow={liveQuizNow} setLiveQuizNow={setLiveQuizNow} />;

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
                            {currentStep === Step.Questions && status === null && (
                                <button className="mr-1" onClick={handleSaveClick}>
                                    <span className="text-[#8501FF] font-semibold text-sm">Save quiz</span>
                                </button>
                            )}
                            {quizId && !isNextButtonDisabled && (quizName !== originalName || quizDescription !== originalDescription || questionsList !== originalQuestionsList) && (
                                <button className="mr-1" onClick={handleSaveChanges}>
                                    <span className="text-[#8501FF] font-semibold text-sm">Save changes</span>
                                </button>
                            )}
                            {currentStep > Step.QuizInfo && (
                                <button
                                    className="h-[44px] w-[135px] bg-[#FFFFFF] hover:bg-[#F2F4F7] rounded-md shadow-inner-button border border-solid border-[#EAECF0] flex items-center justify-center"
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
                                    {(currentStep === Step.Publish && status !== 'saved' && status !== null) ? 'Save' : currentStep === Step.Publish ? "Publish" : "Next"}
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

