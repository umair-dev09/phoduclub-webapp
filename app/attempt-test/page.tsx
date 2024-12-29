'use client';
import { db } from "@/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Timer from "@/components/TestTimer";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";

interface Section {
    id: string;
    sectionName: string;
    sectionScheduleDate: string;
    parentSectionId?: string | null;
    order?: number;
    hasQuestions: boolean;
    description: string;
    marksPerQ: string;
    nMarksPerQ: string;
    testTime: string;
}
interface Question {
    question: string;
    isChecked: boolean;
    isActive: boolean;
    options: Options;
    correctAnswer: string | null;
    explanation: string;
    questionId: string;
    difficulty: string;
}
interface Options {
    A: string;
    B: string;
    C: string;
    D: string;
}
type UserData = {
    uniqueId: string;
    name: string;
    email: string;
    phone: string;
    profilePic: string;
    userId: string;
}

interface QuestionState {
    questionId: string;
    status: 'not-visited' | 'not-answered' | 'marked' | 'answered' | 'answered-marked';
    answered: boolean;
    selectedOption: string | null;
    answeredCorrect: boolean | null;
}

const getStatusCounts = (questionStates: QuestionState[]) => {
    return {
        answered: questionStates.filter(q => q.status === 'answered').length,
        notAnswered: questionStates.filter(q => q.status === 'not-answered').length,
        notVisited: questionStates.filter(q => q.status === 'not-visited').length,
        marked: questionStates.filter(q => q.status === 'marked').length,
        answeredMarked: questionStates.filter(q => q.status === 'answered-marked').length,
    };
};

const StatusDisplay = ({ counts }: { counts: ReturnType<typeof getStatusCounts> }) => {
    return (
        <div className="flex flex-col h-fit bg-[#f5f5f5] p-4 gap-5">
            <div className="flex flex-row gap-6">
                <div className="flex flex-row gap-[6px] items-center">
                    <div className="relative w-[28px] h-[28px]">
                        <Image src="/icons/answered.svg" alt="Answered Icon" width={28} height={28} />
                        <span className="absolute inset-0 text-xs font-normal text-white flex items-center justify-center">
                            {counts.answered}
                        </span>
                    </div>
                    <p className="font-medium font-['Inter'] text-[14px] text-[#131313]">Answered</p>
                </div>
                <div className="flex flex-row gap-[6px] items-center">
                    <div className="relative w-[28px] h-[28px]">
                        <Image src="/icons/not-answered.svg" alt="Not Answered Icon" width={28} height={28} />
                        <span className="absolute inset-0 text-xs font-normal text-white flex items-center justify-center">
                            {counts.notAnswered}
                        </span>
                    </div>
                    <p className="font-medium font-['Inter'] text-[14px] text-[#131313]">Not Answered</p>
                </div>
            </div>

            <div className="flex flex-row gap-5">
                <div className="flex flex-row gap-[6px] items-center">
                    <div className="relative w-[28px] h-[28px]">
                        <Image src="/icons/not-visited.svg" alt="Not Visited Icon" width={28} height={28} />
                        <span className="absolute inset-0 text-xs font-normal text-[#131313] flex items-center justify-center">
                            {counts.notVisited}
                        </span>
                    </div>
                    <p className="font-medium font-['Inter'] text-[14px] text-[#131313]">Not Visited</p>
                </div>
                <div className="flex flex-row gap-[6px] items-center">
                    <div className="relative w-[28px] h-[28px]">
                        <Image src="/icons/marked.svg" alt="Marked Icon" width={28} height={28} />
                        <span className="absolute inset-0 text-xs font-normal text-white flex items-center justify-center">
                            {counts.marked}
                        </span>
                    </div>
                    <p className="font-medium font-['Inter'] text-[14px] text-[#131313]">Marked for Review</p>
                </div>
            </div>

            <div className="flex flex-row">
                <div className="flex flex-row gap-[6px] items-center">
                    <div className="relative w-[28px] h-[28px]">
                        <Image src="/icons/answered-marked.svg" alt="Answered marked Icon" width={28} height={28} />
                        <span className="absolute inset-0 text-xs font-normal text-white flex items-center justify-center">
                            {counts.answeredMarked}
                        </span>
                    </div>
                    <p className="font-medium font-['Inter'] text-[14px] text-[#131313] w-[250px]">
                        Answered and Marked for Review (Will be considered for evaluation)
                    </p>
                </div>
            </div>
        </div>
    );
};

function ReviewTestView() {
    const searchParams = useSearchParams();
    const tId = searchParams.get("tId");
    const currentUserId = searchParams.get("uid");
    const sectionIds = searchParams.get("sectionIds");
    // const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { isOpen: isOpenFirst, onOpen: onOpenFirst, onClose: onCloseFirst } = useDisclosure();
    const { isOpen: isOpenSecond, onOpen: onOpenSecond, onClose: onCloseSecond } = useDisclosure();

    // Ensure sectionIds is properly parsed
    const sections = sectionIds ? JSON.parse(decodeURIComponent(sectionIds)) : [];

    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentSection, setCurrentSection] = useState<Section | null>(null);
    const [error, setError] = useState<string | null>(null);
    const dataFetched = useRef(false);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [questionStates, setQuestionStates] = useState<QuestionState[]>([]);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (currentUserId) {
                try {
                    const userDocRef = doc(db, "users", currentUserId);
                    const userSnapshot = await getDoc(userDocRef);
                    if (userSnapshot.exists()) {
                        const userData = userSnapshot.data() as UserData;
                        setUserData(userData);
                    } else {
                        console.error("No user found with the given ID.");
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };

        fetchUserData();
    }, []);
    useEffect(() => {
        // Add protection against multiple fetches
        if (dataFetched.current) return;

        let isMounted = true;

        const fetchQuestions = async () => {
            if (!tId || sections.length === 0) {
                setError("Missing test ID or section IDs");
                setIsInitialLoading(false);
                return;
            }

            try {
                // Build the complete path by iterating through all section IDs
                let currentPath = `testseries/${tId}`;
                const allQuestions: Question[] = [];

                // Get the last section ID since that's where the questions are
                const lastSectionId = sections[sections.length - 1];

                // Build the complete path for nested sections
                for (const sectionId of sections) {
                    currentPath += `/sections/${sectionId}`;
                }

                const sectionRef = doc(db, currentPath);
                const sectionSnap = await getDoc(sectionRef);

                if (!sectionSnap.exists()) {
                    throw new Error(`Section not found: ${lastSectionId}`);
                }

                const sectionData = sectionSnap.data() as Section;

                if (isMounted) {
                    setCurrentSection(sectionData);
                }

                if (sectionData.hasQuestions) {
                    const questionsRef = collection(sectionRef, 'Questions');
                    const questionsSnap = await getDocs(questionsRef);

                    questionsSnap.forEach((questionDoc) => {
                        const questionData = questionDoc.data() as Question;
                        allQuestions.push({
                            ...questionData,
                            questionId: questionDoc.id,
                        });
                    });
                }

                if (isMounted) {
                    setQuestions(allQuestions);
                    // Initialize question states
                    setQuestionStates(allQuestions.map(q => ({
                        questionId: q.questionId,
                        status: 'not-visited',
                        answered: false,
                        selectedOption: null,
                        answeredCorrect: null
                    })));
                    setError(null);
                    dataFetched.current = true;
                }
            } catch (error) {
                console.error("Error fetching questions:", error);
                if (isMounted) {
                    setError("Failed to load questions. Please try again.");
                }
            } finally {
                if (isMounted) {
                    setIsInitialLoading(false);
                }
            }
        };

        fetchQuestions();

        return () => {
            isMounted = false;
        };
    }, [tId, sectionIds]);

    const updateQuestionState = (index: number, updates: Partial<QuestionState>) => {
        setQuestionStates(prev => prev.map((state, i) =>
            i === index ? { ...state, ...updates } : state
        ));
    };

    const handleQuestionSelect = (index: number) => {
        if (index >= 0 && index < questions.length) {
            // Update previous question status if it was visited but not answered
            const prevState = questionStates[currentQuestionIndex];
            if (prevState.status === 'not-visited' && !prevState.answered) {
                updateQuestionState(currentQuestionIndex, {
                    status: 'not-answered'
                });
            }

            setCurrentQuestionIndex(index);
            // Set the selectedOption from the question's state
            setSelectedOption(questionStates[index].selectedOption);
        }
    };

    const handleOptionSelect = (option: string) => {
        const currentQuestion = questions[currentQuestionIndex];
        const isCorrect = option === currentQuestion.correctAnswer;

        setSelectedOption(option);
        updateQuestionState(currentQuestionIndex, {
            selectedOption: option,
            answeredCorrect: isCorrect,
            answered: true // Mark as answered when an option is selected
        });
    };

    const handleMarkForReview = () => {
        const currentState = questionStates[currentQuestionIndex];
        const hasSelectedOption = selectedOption !== null;

        // Set appropriate status based on whether an option is selected
        const newStatus = hasSelectedOption ? 'answered-marked' : 'marked';

        updateQuestionState(currentQuestionIndex, {
            status: newStatus,
            // Keep the existing selected option and answered status
            selectedOption: selectedOption,
            answered: hasSelectedOption
        });

        if (currentQuestionIndex < questions.length - 1) {
            // Move to next question
            setCurrentQuestionIndex(prev => prev + 1);
            // Set the selectedOption for the next question from its state
            const nextQuestionState = questionStates[currentQuestionIndex + 1];
            setSelectedOption(nextQuestionState?.selectedOption || null);
        }
    };

    const handleSaveAndNext = () => {
        if (selectedOption) {
            updateQuestionState(currentQuestionIndex, {
                status: 'answered',
                answered: true,
                selectedOption: selectedOption // Ensure the selected option is saved in the state
            });

            if (currentQuestionIndex < questions.length - 1) {
                // Move to next question
                setCurrentQuestionIndex(prev => prev + 1);
                // Set the selectedOption for the next question from its state
                const nextQuestionState = questionStates[currentQuestionIndex + 1];
                setSelectedOption(nextQuestionState?.selectedOption || null);
            }
        }
    };

    const handleSubmit = () => {
        console.log('Test Submission Data:', questionStates);
    };

    const handleClearResponse = () => {
        setSelectedOption(null);
        updateQuestionState(currentQuestionIndex, {
            selectedOption: null,
            answered: false,
            answeredCorrect: null,
            status: 'not-answered'
        });
    };

    const getQuestionButtonStatus = (index: number) => {
        return questionStates[index]?.status || 'not-visited';
    };

    // Current question being displayed
    const currentQuestion = questions[currentQuestionIndex];
    const currentQuestionState = questionStates[currentQuestionIndex];

    return (
        <div className="Main Layout flex flex-col w-full h-screen overflow-y-hidden">
            <div className="flex w-full h-12 bg-[#3b56c0] pl-3 items-center">
                <h3 className="text-white text-[18px] font-bold font-[Inter]">{currentSection?.sectionName || "Test Series"}
                </h3>
            </div>
            <div className="Container flex flex-row h-full">
                <div className="flex flex-col flex-1 pb-[80px]">
                    <div className="flex flex-row  border-b border-[#a1a1a1] h-8 pl-2 pr-5 py-2 justify-between items-center">
                        <p className="font-[Inter] font-medium text-[12px] text-[#868686]">
                            {/* Section */}
                        </p>
                        <div className="flex flex-row gap-3">
                            <button className="flex flex-row gap-1 items-center">
                                <Image src="/icons/instructions.svg" alt="Instructions Icon" width={12} height={12} />
                                <p className="font-[Inter] font-medium text-[12px] ">Instructions</p>
                            </button>
                            {/* {currentSection?.testTime && (
                    <Timer 
                        initialTime={currentSection.testTime} 
                        onTimeEnd={handleSubmit}
                    />
                )}    */}
                        </div>
                    </div>

                    {/* <div className="flex flex-row h-8 border-b border-[#A1A1A199]">
        <button className="flex flex-row gap-1 border-r border-[#A1A1A199] h-8 items-center justify-center px-2 bg-[#4871CB]">
        <span className="font-[Inter] font-semibold text-[11px] text-white ">Phy sec 1</span>
        <Image src="/icons/instructions.svg" alt="Instructions Icon" width={12} height={12}/> 
        </button>
        <button className="flex flex-row gap-1 border-r border-[#A1A1A199] h-8 items-center justify-center px-2">
        <span className="font-[Inter] font-semibold text-[11px] text-[#4298EB] ">Phy sec 2</span>
        <Image src="/icons/instructions.svg" alt="Instructions Icon" width={12} height={12}/> 
        </button>
        <button className="flex flex-row gap-1 border-r border-[#A1A1A199] h-8 items-center justify-center px-2">
        <span className="font-[Inter] font-semibold text-[11px] text-[#4298EB] ">Phy sec 3</span>
        <Image src="/icons/instructions.svg" alt="Instructions Icon" width={12} height={12}/> 
        </button>
        </div> */}

                    <div className="flex h-8 border-b border-[#A1A1A199] items-center px-3">
                        <h3 className="font-[Inter] font-semibold text-[14px] ">Question No {currentQuestionIndex + 1}.</h3>
                    </div>

                    <div className="Question Area flex flex-col flex-1 overflow-y-auto p-3">
                        {isInitialLoading ? (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-gray-600">Loading questions...</p>
                            </div>
                        ) : error ? (
                            <div className="flex items-center justify-center h-full text-red-500">
                                {error}
                            </div>
                        ) : questions.length === 0 ? (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-gray-600">No questions available</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-5 pb-14">
                                <div
                                    className="question-content"
                                    dangerouslySetInnerHTML={{
                                        __html: currentQuestion?.question || 'Question not available'
                                    }}
                                />
                                <hr className="border-black" />
                                <div>
                                    <RadioGroup
                                        value={selectedOption || ''}
                                        onChange={(e) => handleOptionSelect(e.target.value)}
                                    >
                                        {Object.entries(currentQuestion.options).map(([key, value]) => (
                                            <FormControlLabel
                                                key={key}
                                                value={key}
                                                control={
                                                    <Radio
                                                        sx={{
                                                            color: '#D0D5DD',
                                                            '&.Mui-checked': {
                                                                color: '#0B9055',
                                                            },
                                                        }}
                                                    />
                                                }
                                                label={<h3 className='text-base font-normal'>{value}</h3>}
                                            />
                                        ))}
                                    </RadioGroup>
                                </div>
                            </div>

                        )}

                    </div>

                </div>

                <div className="flex flex-col w-[365px]  border-l border-r border-[#A1A1A199] pb-[77px] bg-[#DEF7FE]">

                    <div className="flex flex-row bg-[#DEF7FE] h-[120px] border-t border-b border-[#A1A1A199] items-center pl-6">
                        <Image className="w-20 h-20 rounded-full border border-black  " src={userData?.profilePic || "/defaultDP.svg"} alt="Profile Pic" width={80} height={80} />
                        <div className="flex flex-col ml-3 items-center justify-center h-20">
                            <p onClick={onOpenFirst} className="font-semibold font-['Inter'] text-[16px] text-[#131313] ml-[-2px]">{userData?.name}</p>
                            <p onClick={onOpenSecond} className="font-normal font-['Inter'] text-[14px] text-[#667085]">{userData?.userId}</p>
                        </div>
                    </div>

                    <StatusDisplay counts={getStatusCounts(questionStates)} />
                    <div className="flex h-9 bg-[#4871CB] pl-3 border-t border-b border-[#A1A1A199] items-center">
                        <h3 className="text-white text-[14px] font-bold font-[Inter]">Phy sec 1</h3>
                    </div>

                    <div className="flex flex-col flex-1 bg-[#DEF7FE] overflow-y-auto px-4 py-2">
                        <p className=" text-[14px] font-medium font-[Inter]">Choose a Question</p>
                        <div className="flex flex-row flex-wrap mt-2 gap-3">
                            {/*button for selecting question*/}
                            {questions.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleQuestionSelect(index)}
                                >
                                    <div className="relative w-[28px] h-[28px]">
                                        <Image
                                            src={`/icons/${getQuestionButtonStatus(index)}.svg`}
                                            alt={`Question ${index + 1}`}
                                            width={28}
                                            height={28}
                                        />
                                        <span className={`absolute inset-0 text-xs font-medium ${getQuestionButtonStatus(index) === 'not-visited'
                                            ? 'text-[#242424]'
                                            : 'text-white'
                                            } flex items-center justify-center`}>
                                            {index + 1}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-row sticky bottom-0 h-16 border-t border-b border-[#A1A1A199] ">
                <div className="flex flex-row py-2 flex-1 px-2 justify-between items-center">
                    <div className="flex flex-row gap-2">
                        <button className="flex border border-[#A1A1A199] items-center justify-center h-[28px] px-4" onClick={handleMarkForReview}>
                            <span className="font-bold font-['Inter'] text-[12px] text-[#717171]">Mark for Review and Next</span>
                        </button>
                        <button className="flex border border-[#A1A1A199] items-center justify-center h-[28px] px-4" onClick={handleClearResponse}>
                            <span className="font-bold font-['Inter'] text-[12px] text-[#717171]">Clear Response</span>
                        </button>
                    </div>
                    <button
                        className={`flex items-center justify-center h-[36px] rounded-[3px] ${selectedOption ? 'bg-[#4871CB]' : 'bg-gray-400'
                            } border border-[#A1A1A199] px-3`}
                        onClick={handleSaveAndNext}
                        disabled={!selectedOption}
                    >
                        <span className="font-bold font-['Inter'] text-[12px] text-[#F5F5F5]">
                            Save & Next
                        </span>
                    </button>
                </div>
                <div className="flex flex-col w-[365px] h-full border-l border-r border-[#A1A1A199] bg-[#def7fe] items-center justify-center py-[4px]">
                    <button className=" flex items-center justify-center w-[74px] h-[36px] rounded-[3px] bg-[#4298EB] border border-[#A1A1A199]" onClick={handleSubmit}>
                        <span className="font-bold font-['Inter'] text-[12px] text-[#F5F5F5]">Submit</span>
                    </button>
                </div>
            </div>

            <Modal isOpen={isOpenFirst} onOpenChange={(isOpen) => !isOpen && onCloseFirst()}>
                <ModalContent>
                    {(onClose) => (
                        <ModalBody className="px-0">
                            <div className="flex flex-col gap-2 px-6 py-3">
                                <div className="flex flex-row justify-between items-center mb-1">
                                    <h3 className=" font-bold task-[#1D2939]">Submit Test</h3>
                                    {/* <button onClick={() => { setIsSubmitTestOpen(false) }} className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-color duration-300 ease-in-out hover:bg-[#F2F4F7] ">
                                        <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                                    </button> */}
                                </div>
                                <p className=" text-sm font-normal text-[#667085]">
                                    Lorem ipsum is a dummy text widely used in digital industry will be used here in as a preview
                                    Lorem ipsum is a dummy text widely used in digital industry will be used here in as a preview
                                </p>
                            </div>
                            <hr />
                            <div className="flex flex-row justify-end mx-6 mb-2 gap-4">
                                <button className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md font-semibold text-sm hover:bg-[#F2F4F7] " onClick={onCloseFirst}>Cancel</button>
                                <button className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#8501FF] font-semibold text-sm border border-[#800EE2] rounded-md">Submit</button>
                            </div>
                        </ModalBody>
                    )}
                </ModalContent>
            </Modal>
            <Modal isOpen={isOpenSecond} size="2xl" onOpenChange={(isOpen) => !isOpen && onCloseSecond()}>
                <ModalContent>
                    {(onClose) => (
                        <ModalBody className="px-0">
                            <div className="flex flex-col items-center gap-2 mt-6 px-6 py-3">
                                <div className="flex justify-center items-center w-[86px] h-[86px] rounded-full bg-[#F8E8FF] border border-[#F0D3FB]">
                                    <Image src='icons/tick-01.svg' alt="completed" width={36} height={36} />
                                </div>
                                <h2 className="text-[#000000] text-xl font-bold">Test Completed!</h2>
                            </div>
                            <div className="flex flex-col gap-6 mt-6 mb-6">
                                <div className="flex flex-row">
                                    <div className="w-full text-center border-r border-lightGrey">
                                        <p className="text-sm text-[#667085] font-normal leading-5 mb-2">Attempted Questions</p>
                                        <p className="text-lg text-[1D2939] font-semibold leading-5">6/10</p>
                                    </div>
                                    <div className="w-full text-center border-r border-lightGrey">
                                        <p className="text-sm text-[#667085] font-normal leading-5 mb-2">Answered Correct</p>
                                        <p className="text-lg text-[1D2939] font-semibold leading-5">6/10</p>
                                    </div>
                                    <div className="w-full text-center border-r border-lightGrey">
                                        <p className="text-sm text-[#667085] font-normal leading-5 mb-2">Answered Incorrect</p>
                                        <p className="text-lg text-[1D2939] font-semibold leading-5">6/10</p>
                                    </div>
                                </div>
                                <div className="flex flex-row">
                                    <div className="w-full text-center border-r border-lightGrey">
                                        <p className="text-sm text-[#667085] font-normal leading-5 mb-2">Score</p>
                                        <p className="text-lg text-[1D2939] font-semibold leading-5">6</p>
                                    </div>
                                    <div className="w-full text-center border-r border-lightGrey">
                                        <p className="text-sm text-[#667085] font-normal leading-5 mb-2">Accuracy</p>
                                        <p className="text-lg text-[1D2939] font-semibold leading-5">10%</p>
                                    </div>
                                    <div className="w-full text-center border-r border-lightGrey">
                                        <p className="text-sm text-[#667085] font-normal leading-5 mb-2">Time Taken</p>
                                        <p className="text-lg text-[1D2939] font-semibold leading-5">6h 10m of 8h</p>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="flex flex-row justify-end mx-6 mb-2 mt-1 gap-4">
                                <button className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md font-semibold text-sm hover:bg-[#F2F4F7] " onClick={onCloseSecond}>Cancel</button>
                                <button className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#8501FF] font-semibold text-sm border border-[#800EE2] rounded-md">Review Answers</button>
                            </div>
                        </ModalBody>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
export default ReviewTestView;