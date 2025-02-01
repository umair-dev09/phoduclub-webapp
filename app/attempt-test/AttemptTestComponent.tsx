'use client';
import { db } from "@/firebase";
import { addDoc, collection, doc, FieldValue, getDoc, getDocs, query, serverTimestamp, setDoc, Timestamp, where, writeBatch } from "firebase/firestore";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Timer from "@/components/TestTimer";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Drawer from "react-modern-drawer";
import ReviewTest from "@/components/DashboardComponents/LearnComponents/TestsComponents/ReviewTest";
import { useRouter } from "next/navigation";
import { set, sub } from "date-fns";
import InstructionsDialog from "./AttemptTestDialogues/InstructionsDialogue";

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
    testTime: number;
    isUmbrellaTest: boolean;
    isParentUmbrellaTest: boolean;
}

// Enhanced interfaces
interface Question extends BaseQuestion {
    allotedTime: number;
    spentTime: number;
    remarks: QuestionRemarks;
}

interface BaseQuestion {
    question: string;
    isChecked: boolean;
    isActive: boolean;
    options: Options;
    correctAnswer: string | null;
    answerExplanation: string;
    questionId: string;
    difficulty: 'Easy' | 'Medium' | 'High';
    order: number;
}

type QuestionRemarks = 'Perfect' | 'Overtime' | 'Wasted' | 'Confused' | '-';

interface AttemptInterval {
    interval: number; // time in seconds
    correctAnswered: number;
    incorrectAnswered: number;
}
interface Options {
    A: string;
    B: string;
    C: string;
    D: string;
}

interface SectionResult {
    sectionName: string;
    attemptedQuestions: string;
    answeredCorrect: string;
    answeredIncorrect: string;
    score: string;
    accuracy: string;
    timeTaken: string;
    questions: QuestionState[];
}

interface QuestionState {
    questionId: string;
    status: 'not-visited' | 'not-answered' | 'marked' | 'answered' | 'answered-marked';
    answered: boolean;
    selectedOption: string | null;
    answeredCorrect: boolean | null;
    spentTime: number;
    allotedTime: number;
    remarks?: string;
    question: string;
    difficulty: 'Easy' | 'Medium' | 'High';
}
// Helper functions
const calculateAllotedTime = (difficulty: string): number => {
    switch (difficulty) {
        case 'Easy': return 60;
        case 'Medium': return 90;
        case 'Hard': return 120;
        default: return 90;
    }
};

const determineRemarks = (
    allotedTime: number,
    spentTime: number,
    isCorrect: boolean | null,
    answered: boolean
): QuestionRemarks => {
    if (!answered) {
        return spentTime > allotedTime ? 'Confused' : '-';
    }

    if (isCorrect) {
        return spentTime <= allotedTime ? 'Perfect' : 'Overtime';
    }

    return spentTime < (allotedTime * 0.5) ? 'Wasted' : '-';
};

interface SubSection extends Section {
    questions?: Question[];
    states?: QuestionState[];
}

type UserData = {
    uniqueId: string;
    name: string;
    email: string;
    phone: string;
    profilePic: string;
    userId: string;
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

function formatTimeForReview(seconds: number): string {
    const totalSeconds = seconds;
    const hours = Math.floor(totalSeconds / 3600); // Calculate hours
    const minutes = Math.floor((totalSeconds % 3600) / 60); // Calculate remaining minutes
    const remainingSeconds = totalSeconds % 60; // Calculate remaining seconds
    let formattedTime = '';

    if (hours > 0) {
        formattedTime += `${hours}h`; // Add hours if present
    }
    if (minutes > 0) {
        formattedTime += (formattedTime ? ' ' : '') + `${minutes}m`; // Add minutes
    }
    if (remainingSeconds > 0 || (hours === 0 && minutes === 0)) {
        formattedTime += (formattedTime ? ' ' : '') + `${remainingSeconds}s`; // Add seconds
    }

    return formattedTime;
}

interface SubSectionTimer {
    timeSpent: number;
    lastStartTime: number;
}


function ReviewTestView() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const tId = searchParams.get("tId");
    const currentUserId = searchParams.get("uid");
    const sectionIds = searchParams.get("sectionIds");
    // const [timeLeft, setTimeLeft] = useState<number>(0);
    // const [currentTime, setCurrentTime] = useState<number>(0);
    // const timerRef = useRef<NodeJS.Timeout | null>(null);
    const sections = sectionIds ? JSON.parse(decodeURIComponent(sectionIds)) : [];
    const { isOpen: isOpenFirst, onOpen: onOpenFirst, onClose: onCloseFirst } = useDisclosure();
    const { isOpen: isOpenSecond, onOpen: onOpenSecond, onClose: onCloseSecond } = useDisclosure();
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentSection, setCurrentSection] = useState<Section | null>(null);
    const [error, setError] = useState<string | null>(null);
    const dataFetched = useRef(false);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [questionStates, setQuestionStates] = useState<QuestionState[]>([]);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isTimeOver, setIsTimeOver] = useState(false);
    const [showReviewSheet, setShowReviewSheet] = useState(false);
    const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);
    const [attemptedQuestions, setAttemptedQuestions] = useState('');
    const [answeredCorrect, setAnsweredCorrect] = useState('');
    const [answeredIncorrect, setAnsweredIncorrect] = useState('');
    const [score, setScore] = useState('');
    const [accuracy, setAccuracy] = useState('');
    const [timeTaken, setTimeTaken] = useState(0);
    const [testTime, setTestTime] = useState(0);
    const [subSections, setSubSections] = useState<SubSection[]>([]);
    const [activeSubSectionIndex, setActiveSubSectionIndex] = useState(0);
    const [startQuestionTime, setStartQuestionTime] = useState<number>(Date.now());
    // const [questionTimers, setQuestionTimers] = useState<{ [key: string]: number }>({});
    //   const [lastQuestionStartTime, setLastQuestionStartTime] = useState<number>(Date.now());
    // const [sectionTimers, setSectionTimers] = useState<{ [key: string]: number }>({});
    // const [lastSectionTimestamp, setLastSectionTimestamp] = useState<{ [key: string]: number }>({});
    // const [overallTestStartTime] = useState<number>(Date.now());

    const [remainingTime, setRemainingTime] = useState<number>(0);
    const [formattedTime, setFormattedTime] = useState<string>("00:00:00");
    // const [initialTestTime, setInitialTestTime] = useState<number>(0);
    const [timerStarted, setTimerStarted] = useState(false);
    const [subsectionTimers, setSubsectionTimers] = useState<{ [key: string]: SubSectionTimer }>({});

    // Add helper function to format time
    const formatTime = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        return [hours, minutes, remainingSeconds]
            .map(val => val.toString().padStart(2, '0'))
            .join(':');
    };

    const initializeTimer = (section: Section) => {
        if (!timerStarted) {
            const totalTime = section.testTime || 0;

            setRemainingTime(totalTime);
            setFormattedTime(formatTime(totalTime));
            setTimerStarted(true);
        }
    };

    // Update useEffect for timer
    useEffect(() => {
        if (currentSection && !timerStarted) {
            initializeTimer(currentSection);
        }
    }, [currentSection, subSections]);

    // Separate timer countdown effect 
    useEffect(() => {
        if (!timerStarted || remainingTime <= 0) return;

        const timer = setInterval(() => {
            setRemainingTime(prev => {
                const newTime = Math.max(0, prev - 1);
                setFormattedTime(formatTime(newTime));

                // Trigger handleTimeOver when time reaches 0
                if (newTime === 0) {
                    handleTimeOver();
                }

                return newTime;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timerStarted, remainingTime]);

    const getTotalTimeSpent = (timer: SubSectionTimer): number => {
        if (!timer) return 0;
        const currentTime = Date.now();
        const activeTime = timer.lastStartTime ? Math.floor((currentTime - timer.lastStartTime) / 1000) : 0;
        return timer.timeSpent + activeTime;
    };


    // Timer management functions
    const updateCurrentQuestionTime = () => {
        const currentTime = Date.now();
        const timeSpent = Math.floor((currentTime - startQuestionTime) / 1000);

        if (currentSection?.isUmbrellaTest) {
            // Update time in subsection states
            const updatedSubSections = [...subSections];
            const currentSubSection = updatedSubSections[activeSubSectionIndex];

            if (currentSubSection?.states?.[currentQuestionIndex]) {
                currentSubSection.states[currentQuestionIndex] = {
                    ...currentSubSection.states[currentQuestionIndex],
                    spentTime: (currentSubSection.states[currentQuestionIndex].spentTime || 0) + timeSpent
                };
                setSubSections(updatedSubSections);
            }
        } else {
            // Update time for normal test
            setQuestionStates(prev => {
                const updated = [...prev];
                if (updated[currentQuestionIndex]) {
                    updated[currentQuestionIndex] = {
                        ...updated[currentQuestionIndex],
                        spentTime: (updated[currentQuestionIndex].spentTime || 0) + timeSpent
                    };
                }
                return updated;
            });
        }

        setStartQuestionTime(Date.now());
    };


    // const handleTimeUpdate = (timeLeft: number) => {
    //     setCurrentTime(timeLeft);
    // };

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

    const fetchQuestionsForSection = async (path: string) => {
        const sectionRef = doc(db, path);
        const questionsRef = collection(sectionRef, 'Questions');
        const questionsSnap = await getDocs(questionsRef);

        const fetchedQuestions: Question[] = [];
        questionsSnap.forEach((questionDoc) => {
            const questionData = questionDoc.data() as Question;
            fetchedQuestions.push({
                ...questionData,
                questionId: questionDoc.id,
                isChecked: false,
                isActive: false
            });
        });

        return fetchedQuestions;
    };


    const fetchSubSections = async (path: string) => {
        const sectionRef = doc(db, path);
        const subSectionsRef = collection(sectionRef, 'sections');
        const subSectionsSnap = await getDocs(subSectionsRef);

        const fetchedSubSections: SubSection[] = [];
        for (const subSectionDoc of subSectionsSnap.docs) {
            const subSectionData = subSectionDoc.data() as SubSection;
            const subSectionPath = `${path}/sections/${subSectionDoc.id}`;
            const questions = await fetchQuestionsForSection(subSectionPath);

            fetchedSubSections.push({
                ...subSectionData,
                id: subSectionDoc.id,
                questions
            });
        }

        return fetchedSubSections.sort((a, b) => (a.order || 0) - (b.order || 0));
    };

    useEffect(() => {
        if (dataFetched.current) return;
        let isMounted = true;

        const fetchData = async () => {
            if (!tId || sections.length === 0) {
                setError("Missing test ID or section IDs");
                setIsInitialLoading(false);
                return;
            }

            try {
                let currentPath = `testseries/${tId}`;
                for (const sectionId of sections) {
                    currentPath += `/sections/${sectionId}`;
                }

                const sectionRef = doc(db, currentPath);
                const sectionSnap = await getDoc(sectionRef);

                if (!sectionSnap.exists()) {
                    throw new Error(`Section not found`);
                }

                const sectionData = sectionSnap.data() as Section;

                if (isMounted) {
                    setCurrentSection(sectionData);

                    if (sectionData.isUmbrellaTest) {
                        const fetchedSubSections = await fetchSubSections(currentPath);
                        console.log('Fetched subsections:', fetchedSubSections);

                        // Initialize question states for all subsections
                        const initializedSubSections = fetchedSubSections.map(subSection => ({
                            ...subSection,
                            questions: subSection.questions || [],
                            states: (subSection.questions || []).map(q => ({
                                questionId: q.questionId,
                                status: 'not-visited' as const,
                                answered: false,
                                selectedOption: null,
                                answeredCorrect: null,
                                spentTime: 0,
                                allotedTime: calculateAllotedTime(q.difficulty),
                                remarks: determineRemarks(calculateAllotedTime(q.difficulty), 0, null, false),
                                question: q.question,
                                difficulty: q.difficulty,
                            }))
                        }));

                        setSubSections(initializedSubSections);
                        const sectionTime = sectionData.testTime || 0;
                        setRemainingTime(sectionTime);
                        setFormattedTime(formatTime(sectionTime));
                        if (initializedSubSections.length > 0) {
                            const firstSection = initializedSubSections[0];
                            setQuestions(firstSection.questions || []);
                            setQuestionStates(firstSection.states || []);
                        }
                        setIsInitialLoading(false);

                    } else {
                        const fetchedQuestions = await fetchQuestionsForSection(currentPath);
                        console.log('Setting direct questions:', fetchedQuestions);
                        setQuestions(fetchedQuestions);

                        // Initialize question states for regular test
                        const initialStates = fetchedQuestions.map(q => ({
                            questionId: q.questionId,
                            status: 'not-visited' as const,
                            answered: false,
                            selectedOption: null,
                            answeredCorrect: null,
                            spentTime: 0,
                            allotedTime: calculateAllotedTime(q.difficulty),
                            remarks: determineRemarks(calculateAllotedTime(q.difficulty), 0, null, false),
                            question: q.question,
                            difficulty: q.difficulty,
                        }));
                        setQuestionStates(initialStates);
                        const sectionTime = sectionData.testTime || 0;
                        setRemainingTime(sectionTime);
                        setFormattedTime(formatTime(sectionTime));
                        setIsInitialLoading(false);

                    }

                    setError(null);
                    dataFetched.current = true;
                    setIsInitialLoading(false);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                if (isMounted) {
                    setError("Failed to load questions. Please try again.");
                }
            } finally {
                if (isMounted) {
                    setIsInitialLoading(false);
                }
            }
        };

        fetchData();
        return () => {
            isMounted = false;
        };
    }, [tId, sections]);
    const handleTimeOver = useCallback(() => {

        setIsTimeOver(true);
        setError("Time's up! Please submit your test.");
        console.log("Time's up!");
    }, []);

    // const startTimer = useCallback((initialSeconds: number) => {
    //     if (timerRef.current) {
    //         clearInterval(timerRef.current);
    //     }

    //     // Only set initial time if it hasn't been set yet
    //     setTimeLeft(prev => prev === 0 ? initialSeconds : prev);

    //     timerRef.current = setInterval(() => {
    //         setTimeLeft((prev) => {
    //             if (prev <= 1) {
    //                 if (timerRef.current) {
    //                     clearInterval(timerRef.current);
    //                 }
    //                 handleTimeOver();
    //                 return 0;
    //             }
    //             return prev - 1;
    //         });

    //         setCurrentTime(prev => prev + 1);
    //     }, 1000);
    // }, [handleTimeOver]);

    //   useEffect(() => {
    //     if (!currentSection) return;

    //     let totalTestTime = 0;

    //     try {
    //       if (currentSection.isUmbrellaTest && subSections.length > 0) {
    //         totalTestTime = subSections.reduce((acc, section) => {
    //           return acc + convertTimeToSeconds(section.testTime);
    //         }, 0);
    //       } else {
    //         totalTestTime = convertTimeToSeconds(currentSection.testTime);
    //       }

    //       console.log('Total Test Time:', totalTestTime);

    //       if (totalTestTime > 0) {
    //         setTimeLeft(totalTestTime);
    //         startTimer(totalTestTime);
    //       }
    //     } catch (error) {
    //       console.error('Error setting up timer:', error);
    //     }

    //     return () => {
    //       if (timerRef.current) {
    //         clearInterval(timerRef.current);
    //       }
    //     };
    //   }, [currentSection, subSections, startTimer]);

    // Enhanced section time tracking
    // useEffect(() => {
    //     if (!currentSection?.isUmbrellaTest) return;

    //     const currentSectionId = subSections[activeSubSectionIndex]?.id;
    //     if (!currentSectionId) return;

    //     const timeTracker = setInterval(() => {
    //         setSectionTimers(prev => ({
    //             ...prev,
    //             [currentSectionId]: (prev[currentSectionId] || 0) + 1
    //         }));
    //     }, 1000);

    //     return () => clearInterval(timeTracker);
    // }, [activeSubSectionIndex, currentSection?.isUmbrellaTest, subSections]);


    // Initialize question timers
    // useEffect(() => {
    //     const initialTimers: { [key: string]: number } = {};
    //     questions.forEach(q => {
    //     initialTimers[q.questionId] = 0;
    //     });
    //     setQuestionTimers(initialTimers);
    // }, [questions]);

    // Track time spent on questions
    // useEffect(() => {
    //     let intervalId: NodeJS.Timeout;

    //     if (!isTimeOver) {
    //     intervalId = setInterval(() => {
    //         const now = Date.now();
    //         const timeSpent = Math.floor((now - lastQuestionStartTime) / 1000);

    //         setQuestionTimers(prev => ({
    //         ...prev,
    //         [questions[currentQuestionIndex]?.questionId]: 
    //             (prev[questions[currentQuestionIndex]?.questionId] || 0) + 1
    //         }));
    //     }, 1000);
    //     }

    //     return () => clearInterval(intervalId);
    // }, [currentQuestionIndex, isTimeOver, lastQuestionStartTime]);



    const updateQuestionState = (index: number, updates: Partial<QuestionState>, subSectionIndex?: number) => {

        if (currentSection?.isUmbrellaTest && typeof subSectionIndex === 'number') {

            setSubSections(prev => {

                const updated = [...prev];

                const subsection = updated[subSectionIndex];

                if (!subsection) return prev;



                if (!subsection.states) {

                    subsection.states = [];

                }



                subsection.states = subsection.states.map((state, i) =>

                    i === index ? { ...state, ...updates } : state

                );

                return updated;

            });

        } else {

            setQuestionStates(prev => prev.map((state, i) =>

                i === index ? { ...state, ...updates } : state

            ));

        }

    };

    // Handle question changes
    const handleQuestionChange = (newIndex: number) => {
        updateCurrentQuestionTime(); // Save time for current question
        setCurrentQuestionIndex(newIndex);
        setStartQuestionTime(Date.now()); // Reset timer for new question
    };
    // Timer effect
    //  useEffect(() => {
    //     setStartQuestionTime(Date.now());

    //     return () => {
    //       updateCurrentQuestionTime(); // Save time when unmounting
    //     };
    //   }, [currentQuestionIndex]);

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

    // Enhanced option selection handling
    const handleOptionSelect = (option: string) => {
        const currentQuestion = questions[currentQuestionIndex];
        if (!currentQuestion) return;

        const isCorrect = option === currentQuestion.correctAnswer;
        setSelectedOption(option);

        if (currentSection?.isUmbrellaTest) {
            const currentState = subSections[activeSubSectionIndex].states?.[currentQuestionIndex];
            const newStatus = currentState?.status === 'marked' ? 'answered-marked' : 'answered';

            updateQuestionState(
                currentQuestionIndex,
                {
                    selectedOption: option,
                    answeredCorrect: isCorrect,
                    answered: true,
                    status: newStatus
                },
                activeSubSectionIndex
            );
        } else {
            // Regular test handling remains the same
            setQuestionStates(prev => prev.map((state, index) =>
                index === currentQuestionIndex
                    ? {
                        ...state,
                        selectedOption: option,
                        answeredCorrect: isCorrect,
                        answered: true,
                        status: 'answered'
                    }
                    : state
            ));
        }
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

    // Update handleSaveAndNext function:
    const handleSaveAndNext = () => {
        updateCurrentQuestionTime();

        const updatedStates = [...questionStates];
        updatedStates[currentQuestionIndex] = {
            ...updatedStates[currentQuestionIndex],
            selectedOption: selectedOption,
            answered: true,
            status: 'answered'
        };

        setQuestionStates(updatedStates);

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
            setStartQuestionTime(Date.now());
        }
    };

    // Modified score calculation for umbrella tests
    const calculateUmbrellaTestScore = () => {
        return subSections.reduce((total, section) => {
            const sectionQuestions = section.questions || [];
            const sectionStates = section.states || [];

            const correctAnswers = sectionStates.filter(s => s.answeredCorrect).length;
            const incorrectAnswers = sectionStates.filter(s => s.answered && !s.answeredCorrect).length;

            const marksPerCorrect = parseFloat(section.marksPerQ || "0");
            const marksPerIncorrect = parseFloat(section.nMarksPerQ || "0");

            const sectionScore = (correctAnswers * marksPerCorrect) - (incorrectAnswers * marksPerIncorrect);
            const maxPossibleScore = sectionQuestions.length * marksPerCorrect;

            return {
                score: total.score + sectionScore,
                maxScore: total.maxScore + maxPossibleScore
            };
        }, { score: 0, maxScore: 0 });
    };

    // Function to calculate section results
    const calculateSectionResults = (section: SubSection, questions: Question[], states: QuestionState[]) => {
        const totalQuestions = questions.length;
        const attemptedQuestions = states.filter(q => q.answered).length;
        const answeredQuestions = states.filter(q => q.answered);
        const correctAnswers = answeredQuestions.filter(q => q.answeredCorrect).length;
        const incorrectAnswers = answeredQuestions.filter(q => q.answeredCorrect === false).length;

        let marksPerCorrect, marksPerIncorrect;
        if (currentSection?.isUmbrellaTest) {
            // For umbrella tests, sum up marks from all subsections
            marksPerCorrect = subSections.reduce((total, sub) => total + parseFloat(sub.marksPerQ || "0"), 0);
            marksPerIncorrect = subSections.reduce((total, sub) => total + parseFloat(sub.nMarksPerQ || "0"), 0);
        } else {
            // For regular sections, use the section's own marks
            marksPerCorrect = parseFloat(section.marksPerQ || "0");
            marksPerIncorrect = parseFloat(section.nMarksPerQ || "0");
        }

        const totalScore = (correctAnswers * marksPerCorrect) - (incorrectAnswers * marksPerIncorrect);
        const maxPossibleScore = totalQuestions * marksPerCorrect;
        let accuracy = attemptedQuestions > 0 ? (correctAnswers / attemptedQuestions) * 100 : 0;
        accuracy = accuracy < 0 ? 0 : accuracy;

        return {
            attemptedQuestions: `${attemptedQuestions}/${totalQuestions}`,
            answeredCorrect: `${correctAnswers}/${attemptedQuestions}`,
            answeredIncorrect: `${incorrectAnswers}/${attemptedQuestions}`,
            score: `${totalScore}/${maxPossibleScore}`,
            accuracy: `${accuracy.toFixed(2)}%`,
            //   timeTaken: currentTime.toString(),
        };
    };

    // Function to update display states
    const updateDisplayStates = (results: any) => {
        setAttemptedQuestions(results.attemptedQuestions);
        setAnsweredCorrect(results.answeredCorrect);
        setAnsweredIncorrect(results.answeredIncorrect);
        setScore(results.score);
        setAccuracy(results.accuracy);
        setTimeTaken(results.timeTaken);
        // setTestTime(currentSection?.testTime || "");
    };

    // Update handleSubSectionChange function
    const handleSubSectionChange = (index: number) => {
        updateCurrentQuestionTime(); // Save current question time

        if (currentSection?.isUmbrellaTest) {
            const newSection = subSections[index];
            const questions = newSection.questions || [];
            const states = newSection.states || questions.map(q => ({
                questionId: q.questionId,
                status: 'not-visited' as const,
                answered: false,
                selectedOption: null,
                answeredCorrect: null,
                spentTime: 0,
                allotedTime: calculateAllotedTime(q.difficulty),
                remarks: determineRemarks(calculateAllotedTime(q.difficulty), 0, null, false),
                question: q.question,
                difficulty: q.difficulty,
            }));

            setQuestions(questions);
            setQuestionStates(states);
            setCurrentQuestionIndex(0);
            setSelectedOption(null);
        }

        setActiveSubSectionIndex(index);
        setStartQuestionTime(Date.now());
        // Stop timer for current section
        const currentSectionId = subSections[activeSubSectionIndex].id;
        stopSubsectionTimer(currentSectionId);

        // Start timer for new section
        const newSectionId = subSections[index].id;
        startSubsectionTimer(newSectionId);

        const getFinalSubsectionTimes = () => {
            const finalTimes: { [key: string]: number } = {};

            Object.entries(subsectionTimers).forEach(([sectionId, timer]) => {
                finalTimes[sectionId] = getTotalTimeSpent(timer);
            });

            return finalTimes;
        };
        console.log('Sections Time:', getFinalSubsectionTimes());
    };

    const startSubsectionTimer = (sectionId: string) => {
        setSubsectionTimers(prev => ({
            ...prev,
            [sectionId]: {
                timeSpent: prev[sectionId]?.timeSpent || 0,
                lastStartTime: Date.now()
            }
        }));
    };

    const stopSubsectionTimer = (sectionId: string) => {
        setSubsectionTimers(prev => {
            const timer = prev[sectionId];
            if (!timer) return prev;

            return {
                ...prev,
                [sectionId]: {
                    timeSpent: getTotalTimeSpent(timer),
                    lastStartTime: 0
                }
            };
        });
    };


    // Initialize timer on component mount
    useEffect(() => {
        if (currentSection?.isUmbrellaTest && subSections.length > 0) {
            const initialSectionId = subSections[activeSubSectionIndex].id;
            startSubsectionTimer(initialSectionId);
        }
    }, [currentSection, subSections]);

    // Add cleanup on unmount
    useEffect(() => {
        return () => {
            if (currentSection?.isUmbrellaTest) {
                const currentSectionId = subSections[activeSubSectionIndex]?.id;
                if (currentSectionId) {
                    stopSubsectionTimer(currentSectionId);
                }
            }
        };
    }, []);


    // Add useEffect to handle timer updates
    useEffect(() => {
        setStartQuestionTime(Date.now());
        return () => {
            updateCurrentQuestionTime();
        };
    }, [currentQuestionIndex, activeSubSectionIndex]);


    const handleSubmit = async () => {
        const loadingToastId = toast.loading('Submitting your test responses...');
        setIsSubmitButtonDisabled(true);
        updateCurrentQuestionTime();

        if (!currentUserId) {
            toast.dismiss(loadingToastId);
            toast.error('User authentication required');
            setIsSubmitButtonDisabled(false);
            return;
        }

        // Enhanced function to calculate remarks for each question
        const getFinalQuestionData = (states: QuestionState[]) => states.map(state => ({
            ...state,
            remarks: determineRemarks(
                state.allotedTime,
                state.spentTime,
                state.answeredCorrect,
                state.answered
            )
        }));

        // Process questions for both regular and umbrella tests
        const processQuestions = () => {
            if (currentSection?.isUmbrellaTest) {
                // Process each subsection's questions with remarks
                return subSections.map(section => ({
                    ...section,
                    states: getFinalQuestionData(section.states || [])
                }));
            } else {
                return getFinalQuestionData(questionStates);
            }
        };



        const processedQuestions = processQuestions();
        const combinedQuestionsData = currentSection?.isUmbrellaTest
            ? (processedQuestions as SubSection[]).flatMap(section => section.states || [])
            : processedQuestions;

        try {
            let currentPath = `testseries/${tId}`;
            for (const sectionId of sections) {
                currentPath += `/sections/${sectionId}`;
            }
            currentPath += `/attempts`;

            const batch = writeBatch(db);
            const attemptsRef = collection(db, currentPath);
            const userAttempts = await getDocs(
                query(attemptsRef, where('userId', '==', currentUserId))
            );
            const attemptNumber = userAttempts.size + 1;

            const calculateMetrics = (questions: any[], section?: Section) => {
                const totalQuestions = questions.length;
                const attemptedQuestions = questions.filter(q => q.answered).length;
                const correctAnswers = questions.filter(q => q.answeredCorrect).length;
                const incorrectAnswers = attemptedQuestions - correctAnswers;
                let marksPerCorrect, marksPerIncorrect;

                if (section?.isParentUmbrellaTest) {
                    marksPerCorrect = parseFloat(currentSection?.marksPerQ || "0");
                    marksPerIncorrect = parseFloat(currentSection?.nMarksPerQ || "0");

                }
                else if (currentSection?.isUmbrellaTest) {
                    marksPerCorrect = parseFloat(currentSection?.marksPerQ || "0");
                    marksPerIncorrect = parseFloat(currentSection?.nMarksPerQ || "0");
                }
                else {
                    marksPerCorrect = parseFloat(section?.marksPerQ || "0");
                    marksPerIncorrect = parseFloat(section?.nMarksPerQ || "0");
                }

                const totalScore = (correctAnswers * marksPerCorrect) - (incorrectAnswers * marksPerIncorrect);
                const maxPossibleScore = totalQuestions * marksPerCorrect;
                const accuracy = attemptedQuestions > 0 ? (correctAnswers / attemptedQuestions) * 100 : 0;

                return {
                    attemptedQuestions: `${attemptedQuestions}/${totalQuestions}`,
                    answeredCorrect: `${correctAnswers}/${totalQuestions}`,
                    answeredIncorrect: `${incorrectAnswers}/${totalQuestions}`,
                    score: `${totalScore}/${maxPossibleScore}`,
                    accuracy: `${accuracy.toFixed(2)}%`
                };
            };

            if (currentSection?.isUmbrellaTest) {
                const mainAttemptRef = doc(attemptsRef);
                const combinedMetrics = calculateMetrics(combinedQuestionsData);
                const totalTestTime = subSections.reduce((sum, section) =>
                    sum + section.testTime, 0);
                const timeTaken = (currentSection?.testTime ?? 0) - remainingTime;

                const mainAttemptData = {
                    attemptDateAndTime: serverTimestamp(),
                    isUmbrellaTest: true,
                    testTime: currentSection?.testTime,
                    timeTaken: timeTaken,
                    userId: currentUserId,
                    attemptNumber,
                    ...combinedMetrics,
                    questions: combinedQuestionsData
                };

                batch.set(mainAttemptRef, mainAttemptData);

                const getFinalSubsectionTimes = () => {
                    const finalTimes: { [key: string]: number } = {};

                    Object.entries(subsectionTimers).forEach(([sectionId, timer]) => {
                        finalTimes[sectionId] = getTotalTimeSpent(timer);
                    });

                    return finalTimes;
                };
                const sectionTimes = getFinalSubsectionTimes();
                const subattemptsRef = collection(mainAttemptRef, 'subattempts');

                // Process each subsection with remarks
                processedQuestions.forEach((section: any) => {
                    const sectionMetrics = calculateMetrics(section.states || [], section);
                    const subattemptRef = doc(subattemptsRef);

                    batch.set(subattemptRef, {
                        sectionId: section.id,
                        sectionName: section.sectionName,
                        timeTaken: sectionTimes[section.id] || 0,
                        // testTime: section.testTime,
                        ...sectionMetrics,
                        questions: section.states // These now include remarks
                    });
                });

            } else {
                const metrics = calculateMetrics(processedQuestions, currentSection || undefined);
                const attemptRef = doc(attemptsRef);
                const timeTaken = (currentSection?.testTime ?? 0) - remainingTime;

                batch.set(attemptRef, {
                    attemptDateAndTime: serverTimestamp(),
                    isUmbrellaTest: false,
                    testTime: currentSection?.testTime,
                    timeTaken: timeTaken,
                    userId: currentUserId,
                    attemptNumber,
                    ...metrics,
                    questions: processedQuestions // These now include remarks
                });
            }

            await batch.commit();

            toast.dismiss(loadingToastId);
            toast.success('Test submitted successfully! Redirecting to results...', {
                autoClose: 3000,
                position: 'top-center'
            });

            // Update UI state
            if (currentSection?.isUmbrellaTest) {
                const combinedMetrics = calculateMetrics(combinedQuestionsData);
                const timeTaken = (currentSection?.testTime ?? 0) - remainingTime;
                const allQuestions = subSections.flatMap(section => section.questions || []);
                // const allQuestionStates = subSections.flatMap(section => section.states || []);

                setAttemptedQuestions(combinedMetrics.attemptedQuestions);
                setQuestions(allQuestions);
                setAnsweredCorrect(combinedMetrics.answeredCorrect);
                setAnsweredIncorrect(combinedMetrics.answeredIncorrect);
                setScore(combinedMetrics.score);
                setAccuracy(combinedMetrics.accuracy);
                setTimeTaken(timeTaken);
                setTestTime(currentSection?.testTime ?? 0);
            } else {
                const metrics = calculateMetrics(processedQuestions, currentSection || undefined);
                const timeTaken = (currentSection?.testTime ?? 0) - remainingTime;

                setAttemptedQuestions(metrics.attemptedQuestions);
                setAnsweredCorrect(metrics.answeredCorrect);
                setAnsweredIncorrect(metrics.answeredIncorrect);
                setScore(metrics.score);
                setAccuracy(metrics.accuracy);
                setTimeTaken(timeTaken);
                setTestTime(currentSection?.testTime ?? 0);
            }

            setIsSubmitButtonDisabled(true);

            setTimeout(() => {
                onCloseFirst();
                onOpenSecond();
            }, 1000);

        } catch (error) {
            console.error('Error in handleSubmit:', error);
            toast.dismiss(loadingToastId);
            toast.error('Failed to submit test. Please try again or contact support if the issue persists.', {
                autoClose: 5000,
                position: 'top-center'
            });
            setIsSubmitButtonDisabled(false);
        }
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

    const [instructionsDialogue, setInstructionsDialogue] = useState(false);

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
                            <button className="flex flex-row gap-1 items-center" onClick={() => { setInstructionsDialogue(true) }}>
                                <button >
                                    <Image src="/icons/instructions.svg" alt="Instructions Icon" width={12} height={12} />
                                </button>
                                <p className="font-[Inter] font-medium text-[12px] ">Instructions</p>
                            </button>
                            <span className="font-[Inter] font-normal text-[12px]">Time Left: {formattedTime}</span>
                        </div>
                    </div>
                    {/* Section switching area for umbrella tests - Now with flex-wrap */}
                    {currentSection?.isUmbrellaTest && (
                        <div className="flex border-b border-[#A1A1A199]">
                            <div className="flex flex-wrap">
                                {subSections.map((subSection, index) => (
                                    <button
                                        key={subSection.id}
                                        className={`flex flex-row gap-[6px] border-r  border-[#A1A1A199] h-8 items-center justify-center px-2 ${index === activeSubSectionIndex ? 'bg-[#4871CB]' : 'bg-white'
                                            }`}
                                        onClick={() => handleSubSectionChange(index)}
                                    >
                                        <span className={`font-[Inter] font-semibold text-[11px] ${index === activeSubSectionIndex ? 'text-white' : 'text-[#4871CB]'
                                            }`}>
                                            {subSection.sectionName}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
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
                            <p className="font-semibold font-['Inter'] text-[16px] text-[#131313] ml-[-2px]">{userData?.name}</p>
                            <p className="font-normal font-['Inter'] text-[14px] text-[#667085]">{userData?.userId}</p>
                        </div>
                    </div>

                    <StatusDisplay counts={getStatusCounts(questionStates)} />
                    {/* Section header */}
                    <div className="flex h-9 bg-[#4871CB] pl-3 border-t border-b border-[#A1A1A199] items-center">
                        <h3 className="text-white text-[14px] font-bold font-[Inter]">
                            {currentSection?.isUmbrellaTest
                                ? subSections[activeSubSectionIndex]?.sectionName
                                : currentSection?.sectionName}
                        </h3>
                    </div>

                    <div className="flex flex-col flex-1 bg-[#DEF7FE] overflow-y-auto px-4 py-2">
                        <p className=" text-[14px] font-medium font-[Inter]">Choose a Question</p>
                        <div className="flex flex-row flex-wrap mt-2 gap-3">
                            {/*button for selecting question*/}
                            {!isTimeOver && (
                                <>
                                    {questions
                                        .sort((a, b) => a.order - b.order)
                                        .map((_, index) => (
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
                                </>
                            )}

                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-row sticky bottom-0 h-16 border-t border-b border-[#A1A1A199] ">

                {isTimeOver ? (
                    <div className="flex flex-row py-2 flex-1 px-2 justify-between items-center">
                    </div>
                ) : (
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
                )}

                <div className="flex flex-col w-[365px] h-full border-l border-r border-[#A1A1A199] bg-[#def7fe] items-center justify-center py-[4px]">
                    <button className=" flex items-center justify-center w-[74px] h-[36px] rounded-[3px] bg-[#4298EB] border border-[#A1A1A199]" onClick={onOpenFirst}>
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
                                    Are you sure you want to submit your quiz now?<br />Please double-check your answers before submitting, as you won&apos;t be able to make any changes afterwards.
                                </p>
                            </div>
                            <hr />
                            <div className="flex flex-row justify-end mx-6 mb-2 gap-4">
                                <button className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md font-semibold text-sm hover:bg-[#F2F4F7] " onClick={onCloseFirst}>Cancel</button>
                                <button className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#8501FF] font-semibold text-sm border border-[#800EE2] rounded-md" disabled={isSubmitButtonDisabled} onClick={handleSubmit}>Submit</button>
                            </div>
                        </ModalBody>
                    )}
                </ModalContent>
            </Modal>
            <Modal isOpen={isOpenSecond} size="2xl" onOpenChange={(isOpen) => !isOpen && onCloseSecond()} isDismissable={false}
                isKeyboardDismissDisabled={false} hideCloseButton={true}>
                <ModalContent>
                    {(onClose) => (
                        <ModalBody className="px-0">
                            <div className="flex flex-col items-center gap-2 mt-6 px-6 py-3">
                                <div className="flex justify-center items-center w-[86px] h-[86px] rounded-full bg-[#F8E8FF] border border-[#F0D3FB]">
                                    <Image src='/icons/tick-01.svg' alt="completed" width={36} height={36} />
                                </div>
                                <h2 className="text-[#000000] text-xl font-bold">Test Completed!</h2>
                            </div>
                            <div className="flex flex-col gap-6 mt-6 mb-6">
                                <div className="flex flex-row">
                                    <div className="w-full text-center border-r border-lightGrey">
                                        <p className="text-sm text-[#667085] font-normal leading-5 mb-2">Attempted Questions</p>
                                        <p className="text-lg text-[1D2939] font-semibold leading-5">{attemptedQuestions}</p>
                                    </div>
                                    <div className="w-full text-center border-r border-lightGrey">
                                        <p className="text-sm text-[#667085] font-normal leading-5 mb-2">Answered Correct</p>
                                        <p className="text-lg text-[1D2939] font-semibold leading-5">{answeredCorrect}</p>
                                    </div>
                                    <div className="w-full text-center border-r border-lightGrey">
                                        <p className="text-sm text-[#667085] font-normal leading-5 mb-2">Answered Incorrect</p>
                                        <p className="text-lg text-[1D2939] font-semibold leading-5">{answeredIncorrect}</p>
                                    </div>
                                </div>
                                <div className="flex flex-row">
                                    <div className="w-full text-center border-r border-lightGrey">
                                        <p className="text-sm text-[#667085] font-normal leading-5 mb-2">Score</p>
                                        <p className="text-lg text-[1D2939] font-semibold leading-5">{score}</p>
                                    </div>
                                    <div className="w-full text-center border-r border-lightGrey">
                                        <p className="text-sm text-[#667085] font-normal leading-5 mb-2">Accuracy</p>
                                        <p className="text-lg text-[1D2939] font-semibold leading-5">{accuracy}</p>
                                    </div>
                                    <div className="w-full text-center border-r border-lightGrey">
                                        <p className="text-sm text-[#667085] font-normal leading-5 mb-2">Time Taken</p>
                                        <p className="text-lg text-[1D2939] font-semibold leading-5">{formatTimeForReview(timeTaken)} of {formatTimeForReview(testTime)}</p>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="flex flex-row justify-end mx-6 mb-2 mt-1 gap-4">
                                <button className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md font-semibold text-sm hover:bg-[#F2F4F7] " onClick={() => router.replace(`/learn/test`)}>Close</button>
                                <button className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#8501FF] font-semibold text-sm border border-[#800EE2] rounded-md" onClick={() => setShowReviewSheet(true)}>Review Answers</button>
                            </div>
                        </ModalBody>
                    )}
                </ModalContent>
            </Modal>
            <ReviewTest setShowReviewSheet={setShowReviewSheet} showReviewSheet={showReviewSheet} questionsList={questions} answeredQuestions={questionStates} timeTaken={timeTaken} />
            {instructionsDialogue && <InstructionsDialog onClose={() => { setInstructionsDialogue(false) }} description={currentSection?.description || ''} marksPerQuestion={currentSection?.marksPerQ || ""} negativeMarksPerQuestion={currentSection?.nMarksPerQ || ""} testDuration={currentSection?.testTime || 0}/>}
            <ToastContainer />
        </div>
    );
}
export default ReviewTestView;
