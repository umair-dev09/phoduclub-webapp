"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import Image from "next/image";
import { useState, useEffect } from "react";
import { auth, db } from "@/firebase";
import { collection, doc, getCountFromServer, getDoc, getDocs, onSnapshot, query } from "firebase/firestore";
import LoadingData from "@/components/Loading";
import Collapsible from "react-collapsible";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Progress } from "@nextui-org/progress";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
interface Section {
    id: string;
    sectionName: string;
    sectionScheduleDate: string;
    parentSectionId?: string | null;
    order?: number;
    hasQuestions: boolean;
    sections?: Section[];
    description: string;
    marksPerQ: string;
    nMarksPerQ: string;
    testTime: number;
    // Questions?: Question[];
    QuestionsCount: number;
    SubsectionsCount?: number;
    isUmbrellaTest: boolean;
    totalSectionsWithQuestions: number;
    totalSectionsWithStudentsAttempted: number;
    studentProgress: number;
    subsectionCountUmbrella: number;
}
interface Question {
    id: string;
}

interface AnsweredQuestion {
    questionId: string;
    status: string;
    answered: boolean;
    selectedOption: string | null;
    answeredCorrect: boolean | null;
}

interface AttemptedDetails {
    attemptedQuestions: string;
    score: string;
    accuracy: string;
    answeredCorrect: string;
    answeredIncorrect: string;
    timeTaken: number;
    testTime: number;
    answeredQuestions: AnsweredQuestion[];
}
interface SectionAttemptState {
    [sectionId: string]: {
        attemptedDetails: AttemptedDetails | null;
        // answeredQuestions: AnsweredQuestion[];
    };
}

function formatTimeTaken(seconds: number) {
    const totalSeconds = Number(seconds);
    const hours = Math.floor(totalSeconds / 3600); // Calculate hours
    const minutes = Math.floor((totalSeconds % 3600) / 60); // Calculate remaining minutes
    let formattedTime = '';

    if (hours > 0) {
        formattedTime += `${hours}h`; // Add hours if present
    }
    if (minutes > 0 || hours === 0) {
        formattedTime += (formattedTime ? ' ' : '') + `${minutes}m`; // Add minutes
    }

    return formattedTime;
}

// function formatTimeLeft(input: string | undefined) {
//     if (!input) return '0m';

//     let totalMinutes = 0;

//     // Extract hours and minutes from the input string
//     const hourMatch = input.match(/(\d+)\s*Hour\(s\)/i);
//     const minuteMatch = input.match(/(\d+)\s*Minute\(s\)/i);

//     if (hourMatch) {
//         totalMinutes += parseInt(hourMatch[1], 10) * 60; // Convert hours to minutes
//     }
//     if (minuteMatch) {
//         totalMinutes += parseInt(minuteMatch[1], 10); // Add remaining minutes
//     }

//     const hours = Math.floor(totalMinutes / 60); // Calculate hours
//     const minutes = totalMinutes % 60; // Calculate remaining minutes
//     let formattedTime = '';

//     if (hours > 0) {
//         formattedTime += `${hours}h`; // Add hours if present
//     }
//     if (minutes > 0 || hours === 0) {
//         formattedTime += (formattedTime ? ' ' : '') + `${minutes}m`; // Add minutes
//     }

//     return formattedTime;
// }

function formatTimeLeft(seconds: number): string {
    const minutes = seconds / 60;

    if (minutes < 60) {
        return `${Math.round(minutes)} Minutes`;
    } else {
        const hours = minutes / 60;
        return `${hours % 1 === 0 ? hours : hours.toFixed(1)} Hours`;
    }
}

function Test() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const testId = searchParams.get('tId');
    const [testAlreadyPurchased, setTestAlreadyPurchased] = useState(false);
    const [activeTab, setActiveTab] = useState<string>('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [attemptedDetails, setAttemptedDetails] = useState<AttemptedDetails | null>(null);
    const [answeredQuestions, setAnsweredQuestions] = useState<AnsweredQuestion[]>([]);
    const [time, setTime] = useState(0);
    const [marksPerQ, setMarksPerQ] = useState('');
    const [isUmbrellaTest, setIsUmbrellaTest] = useState(false);
    const [passedSectionId, setPassedSectionId] = useState('');
    const [noOfTests, setNoOfTests] = useState(0);
    const [noOfQuestions, setNoOfQuestions] = useState(0);
    const [loading, setLoading] = useState(true); // Track loading state 
    const pathname = usePathname();
    const [accordionOpen, setAccordionOpen] = useState(false);
    const currentUserId = auth.currentUser?.uid;
    const [testCompleted, setTestCompleted] = useState(false); // New state for test completion
    let [showTestDialog, setShowTestDialog] = useState(false);
    const [sectionLoading, setSectionLoading] = useState(false);
    const [sectionss, setSections] = useState<Section[]>([]);
    const [currentPath, setCurrentPath] = useState<string[]>([]);
    const [currentSectionIds, setCurrentSectionIds] = useState<string[]>([]);
    const [breadcrumbs, setBreadcrumbs] = useState<{ id: string; name: string }[]>([]);
    useEffect(() => {
        const checkTestPurchased = async () => {
            if (testId && auth.currentUser?.uid) {
                const currentUserId = auth.currentUser.uid;

                // First check if user has directly purchased the test
                const userDocRef = doc(db, 'testseries', testId, 'StudentsPurchased', currentUserId);
                const userDocSnapshot = await getDoc(userDocRef);

                // Also check if test is part of a course
                const testSeriesRef = doc(db, 'testseries', testId);
                const testSeriesSnapshot = await getDoc(testSeriesRef);

                if (userDocSnapshot.exists() || testSeriesSnapshot.data()?.isInCourse === true) {
                    setTestAlreadyPurchased(true);
                    setLoading(false);
                } else {
                    setTestAlreadyPurchased(false);
                    setLoading(false);
                }
            }
        };
        checkTestPurchased();
    }, [testId, auth.currentUser]);

    // ----------------------------------------------------------------------------------------
    const [sectionAttempts, setSectionAttempts] = useState<{ [key: string]: { attemptedDetails: AttemptedDetails | null } }>({});
    const [attemptsCount, setAttemptsCount] = useState<{ [key: string]: number }>({});

    const fetchSectionAttemptData = async (sectionId: string, fullPath: string) => {
        try {
            const userId = auth.currentUser?.uid;
            if (!userId) return null;

            // Query all attempts for this user
            const attemptsRef = collection(db, `${fullPath}/sections/${sectionId}/attempts`);
            const userAttemptsQuery = query(attemptsRef);
            const attemptsSnapshot = await getDocs(userAttemptsQuery);

            // Filter attempts for current user and count them
            const userAttempts = attemptsSnapshot.docs.filter(doc => {
                const data = doc.data();
                return data && data.userId === userId;
            });
            const attemptCount = userAttempts.length;

            // Update attempts count
            setAttemptsCount(prev => ({
                ...prev,
                [sectionId]: attemptCount
            }));

            if (attemptCount === 0) return null;

            // Find the attempt with highest attemptNumber
            const latestAttempt = userAttempts.reduce((latest, current) => {
                const currentData = current.data();
                const latestData = latest?.data();
                const currentAttemptNum = currentData?.attemptNumber || 0;
                const latestAttemptNum = latestData?.attemptNumber || 0;
                return currentAttemptNum > latestAttemptNum ? current : latest;
            }, userAttempts[0]);

            if (!latestAttempt) return null;

            const attemptData = latestAttempt.data();
            if (!attemptData) return null;

            return { attemptedDetails: attemptData };
        } catch (error) {
            console.error('Error fetching attempt data:', error);
            return null;
        }
    };

    useEffect(() => {
        if (!testId) return;

        const fetchSections = async () => {
            setSectionLoading(true);

            try {
                const path = currentPath.reduce((acc, id) => `${acc}/sections/${id}`, `testseries/${testId}`);
                const sectionCollection = collection(db, `${path}/sections`);

                // Fetch all sections in one query
                const sectionSnapshot = await getDocs(sectionCollection);

                const sections = await Promise.all(
                    sectionSnapshot.docs.map(async (doc) => {
                        const sectionData = doc.data();
                        const sectionId = doc.id;

                        // Fetch attempt data only if necessary
                        let attemptData: { attemptedDetails: AttemptedDetails | null } = { attemptedDetails: null };

                        if (sectionData.hasQuestions || sectionData.isUmbrellaTest) {
                            const fetchedData = await fetchSectionAttemptData(sectionId, path) as { attemptedDetails: AttemptedDetails };
                            if (fetchedData) {
                                attemptData = fetchedData;
                            }

                            setSectionAttempts((prev) => ({
                                ...prev,
                                [sectionId]: attemptData,
                            }));
                        }

                        // Fetch the number of questions in the "Questions" subcollection
                        let questionsCount = 0;
                        if (sectionData.hasQuestions) {
                            const questionsCollection = collection(doc.ref, "Questions");
                            const questionsSnapshot = await getCountFromServer(questionsCollection);
                            questionsCount = questionsSnapshot.data().count;
                        }

                        // Fetch and count only subsections that have hasQuestions = false
                        let subsectionCount = 0;
                        const subsectionsCollection = collection(doc.ref, "sections");
                        const subsectionsSnapshot = await getDocs(subsectionsCollection);
                        subsectionCount = subsectionsSnapshot.docs.filter(doc =>
                            doc.data().hasQuestions === false && !doc.data().isUmbrellaTest
                        ).length;

                        let subsectionCountUmbrella = 0;

                        subsectionCountUmbrella = subsectionsSnapshot.docs.filter(doc =>
                            doc.data().isParentUmbrellaTest === true
                        ).length;

                        // Initialize the counters for sections with questions and sections with attempts
                        let sectionsWithQuestionsCount = 0;
                        let sectionsWithAttemptsCount = 0;

                        // Recursive function to count sections with hasQuestions = true or isUmbrellaTest = true
                        const countSectionsWithQuestionsAndAttempts = async (path: string) => {
                            const sectionCollection = collection(db, path);
                            const sectionSnapshot = await getDocs(sectionCollection);

                            for (const sectionDoc of sectionSnapshot.docs) {
                                const sectionData = sectionDoc.data();

                                // Count section if it has questions or is an umbrella test, but not if it's a parent umbrella test
                                if ((sectionData.hasQuestions === true && !sectionData.isParentUmbrellaTest) ||
                                    (sectionData.isUmbrellaTest === true && !sectionData.isParentUmbrellaTest)) {
                                    sectionsWithQuestionsCount += 1;

                                    // Check attempts collection
                                    const attemptsCollection = collection(sectionDoc.ref, 'attempts');
                                    const attemptsSnapshot = await getDocs(attemptsCollection);

                                    // Count only one attempt per section if user has attempted
                                    if (attemptsSnapshot.docs.some(attempt => attempt.data().userId === currentUserId)) {
                                        sectionsWithAttemptsCount += 1;
                                    }
                                }

                                // Recursively check subsections
                                const subSectionPath = `${path}/${sectionDoc.id}/sections`;
                                await countSectionsWithQuestionsAndAttempts(subSectionPath);
                            }
                        };

                        await countSectionsWithQuestionsAndAttempts(`${doc.ref.path}/sections`);

                        const studentProgress = sectionsWithQuestionsCount > 0
                            ? (sectionsWithAttemptsCount / sectionsWithQuestionsCount) * 100
                            : 0;
                        const roundedProgress = Math.round(studentProgress);

                        return {
                            id: sectionId,
                            sectionName: sectionData.sectionName,
                            sectionScheduleDate: sectionData.sectionScheduleDate,
                            parentSectionId: sectionData.parentSectionId || null,
                            order: sectionData.order || 0,
                            hasQuestions: sectionData.hasQuestions,
                            sections: [], // Load subsections lazily
                            description: sectionData.description,
                            marksPerQ: sectionData.marksPerQ,
                            nMarksPerQ: sectionData.nMarksPerQ,
                            testTime: sectionData.testTime,
                            QuestionsCount: questionsCount,
                            SubsectionsCount: subsectionCount, // Number of subsections
                            subsectionCountUmbrella: subsectionCountUmbrella,
                            isUmbrellaTest: sectionData.isUmbrellaTest || false,
                            totalSectionsWithQuestions: sectionsWithQuestionsCount,
                            totalSectionsWithStudentsAttempted: sectionsWithAttemptsCount,
                            studentProgress: roundedProgress,
                        };
                    })
                );

                setSections(sections.sort((a, b) => (a.order || 0) - (b.order || 0)));
            } catch (error) {
                console.error('Error fetching sections:', error);
            } finally {
                setSectionLoading(false);
            }
        };

        fetchSections();

        // Clean up
        return () => {
            setSections([]);
            setAttemptsCount({});
        };
    }, [currentPath, testId]);



    const handleNavigationClick = (index: number) => {
        setCurrentPath(prev => prev.slice(0, index + 1));
        setBreadcrumbs(prev => prev.slice(0, index + 1));
        // Update section IDs when navigating
        setCurrentSectionIds(prev => prev.slice(0, index + 1));
    };

    const navigateToSection = (sectionId: string, sectionName: string) => {
        setCurrentPath((prev) => [...prev, sectionId]);
        setBreadcrumbs((prev) => [...prev, { id: sectionId, name: sectionName }]);
        // Add the new section ID to the list
        setCurrentSectionIds((prev) => [...prev, sectionId]);
    };

    const resetNavigation = () => {
        setCurrentPath([]);
        setBreadcrumbs([]);
        // Reset section IDs
        setCurrentSectionIds([]);
    };
    const getSectionPath = (currentSectionId: string): string[] => {
        return [...currentSectionIds, currentSectionId];
    };

    const handleTabClick = (path: string) => {
        router.push(path);
    };

    // useEffect(() => {
    //     if (pathname) {
    //         const currentPath = pathname.split('/')[4];
    //         if (currentPath === 'TestSubject') {
    //             setActiveTab('TestSubject');
    //         }
    //     }
    // }, [pathname]);

    const handleStartTest = (description: string, time: number, marksPerQ: string, noOfQuestions: number, sectionId: string, isUmbrellaTest: boolean, noOfTests: number) => {
        setShowTestDialog(true);
        setDescription(description);
        setTime(time);
        setMarksPerQ(marksPerQ);
        setNoOfQuestions(noOfQuestions);
        setPassedSectionId(sectionId);
        setIsUmbrellaTest(isUmbrellaTest);
        setNoOfTests(noOfTests);
    };


    const [isOpenArray, setIsOpenArray] = useState([false, false, false]); // Initialize with false for each collapsible

    // Function to toggle a specific collapsible's state
    const toggleCollapsible = (index: number) => {
        const newIsOpenArray = [...isOpenArray];
        newIsOpenArray[index] = !newIsOpenArray[index]; // Toggle the specific index
        setIsOpenArray(newIsOpenArray);
    };
    if (loading) {
        return <LoadingData />;
    }

    return (
        <div className="flex flex-row w-full">
            {testAlreadyPurchased ? (
                <div className="contianer flex flex-col w-full overflow-y-auto pb-12">
                    {/* <div className=" flex  flex-col">
     <div className="h-[64px]  ml-8 flex items-center ">
         <div className="my-5 flex items-center">
             <button className="flex items-center " onClick={() => router.back()} >
                 <div className="text-[#1D2939] h-[24px] w-auto" style={{ fontSize: "16px", fontWeight: "600" }}>
                     Tests
                 </div>
                 <div className="ml-3 w-[24px]">
                     <Image src="/icons/course-left.svg" width={7} height={12} alt="left-arrow" />
                 </div>
             </button>
             <div className="text-[#667085] h-full w-auto -ml-1" style={{ fontSize: "16px", fontWeight: "500" }}>
                 Phodu JEE Mains Test Series 2025
             </div>
         </div>

     </div>
     <div className="h-[64px]  ml-8 flex items-center ">

         <div className="text-[#1D2939] h-[24px] w-auto" style={{ fontSize: "16px", fontWeight: "600" }}>
             Phodu JEE Mains Test Series 2025
         </div>
     </div>
 </div> */}
                    <div className="flex flex-row items-center gap-2 ml-8 mt-8">
                        <div className="flex flex-row">
                            <button
                                onClick={resetNavigation}
                                // onClick={() => { router.back() }}
                                className="font-medium text-[#667085] hover:underline "
                            >Tests
                            </button>
                        </div>
                        {breadcrumbs.map((breadcrumb, index) => (
                            <div key={breadcrumb.id} className="flex flex-row items-center gap-2">
                                <Image src="/icons/course-left.svg" width={6} height={6} alt="arrow" className="w-[10px] h-[10px]" />
                                <button
                                    onClick={() => handleNavigationClick(index)}
                                    className={
                                        index === breadcrumbs.length - 1
                                            ? "text-black font-medium"
                                            : "font-medium text-[#667085] hover:underline"
                                    }
                                >
                                    {breadcrumb.name}
                                </button>
                            </div>
                        ))}
                        {/* {questionsBreadcrumb && (
        <div className="flex flex-row items-center gap-2">
          <Image src="/icons/course-left.svg" width={6} height={6} alt="arrow" className="w-[10px] h-[10px]" />
          <span className="text-black font-medium">
            {questionsBreadcrumb.name}
          </span>
        </div>
      )} */}
                    </div>
                    <p className="font-semibold ml-9 mt-11 mb-4">{breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1].name : "All Tests"}</p>
                    {/* <div className=" w-auto h-auto  ml-8 mr-8 rounded-[12px] border border-solid border-[#EAECF0] bg-[#FFFFFF] mb-6">
                    <div className="h-[49px] w-full m-4 flex flex-row gap-4">
                        <div className="w-[178.69px] h-[49px] flex flex-col border-r border-solid border-[#EAECF0]">
                            <span className="font-normal text-[#667085] text-xs">Attempted Questions</span>
                            <span className="font-semibold text-[#1D2939] text-base mt-2">8/150</span>
                        </div>
                        <div className="w-[178.69px] h-[49px] flex flex-col  border-r border-solid border-[#EAECF0]">
                            <span className="font-normal text-[#667085] text-xs">Score</span>
                            <span className="font-semibold text-[#1D2939] text-base mt-2">32</span>
                        </div>
                        <div className="w-[178.69px] h-[49px] flex flex-col  border-r border-solid border-[#EAECF0]">
                            <span className="font-normal text-[#667085] text-xs">Accuracy</span>
                            <span className="font-semibold text-[#1D2939] text-base mt-2">80%</span>
                        </div>
                        <div className="w-[178.69px] h-[49px] flex flex-col  border-r border-solid border-[#EAECF0]">
                            <span className="font-normal text-[#667085] text-xs">Answered Correct</span>
                            <span className="font-semibold text-[#1D2939] text-base mt-2">8/150</span>
                        </div>
                        <div className="w-[178.69px] h-[49px] flex flex-col  border-r border-solid border-[#EAECF0]">
                            <span className="font-normal text-[#667085] text-xs">Answered inCorrect</span>
                            <span className="font-semibold text-[#1D2939] text- mt-2">0/150</span>
                        </div>
                        <div className="w-[178.69px] h-[49px] flex flex-col">
                            <span className="font-normal text-[#667085] text-xs">Time taken</span>
                            <span className="font-semibold text-[#1D2939] text-base mt-2">1h 30m of 2h</span>
                        </div>
                    </div>
                </div> */}
                    {sectionLoading ? (
                        <LoadingData />
                    ) : (
                        // <>
                        //     {sectionss.length <= 0 ? (
                        //         <>
                        //             <div className="w-auto h-auto flex flex-col gap-2 mx-8 border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-md mb-16 items-center justify-center px-6 py-12">
                        //                 <h3 className="text-base">No Test Found</h3>
                        //             </div>
                        //         </>
                        //     ) : (
                        //         <div className="ml-8 mr-8 ">
                        //             {sectionss
                        //                 .sort((a, b) => {
                        //                     // Sort by hasQuestions (false comes first)
                        //                     if (!a.hasQuestions && b.hasQuestions) return -1;
                        //                     if (a.hasQuestions && !b.hasQuestions) return 1;
                        //                     // If hasQuestions is the same, sort by order
                        //                     return (a.order || 0) - (b.order || 0);
                        //                 })
                        //                 .map((section, index) => (
                        //                     <div key={index}>
                        //                         {section.hasQuestions ? (
                        //                             <div className="flex flex-col w-full h-auto rounded-[12px] border border-solid border-[#EAECF0] bg-[#FFFFFF] mt-1">
                        //                                 <Collapsible
                        //                                     trigger={
                        //                                         <div className="w-full h-auto m-2 flex justify-between items-center"
                        //                                             onClick={() => toggleCollapsible(0)}>
                        //                                             <div className="flex flex-col gap-1 ml-3 ">
                        //                                                 <span className="text-[#1D2939] font-semibold text-[16px]">
                        //                                                     {section.sectionName}
                        //                                                 </span>
                        //                                                 <span className="text-[#667085] font-normal text-[12px]">
                        //                                                     {section.QuestionsCount} Questions
                        //                                                 </span>
                        //                                             </div>
                        //                                             <div className="flex items-center mr-3 mb-3 gap-4">
                        //                                                 {/* Conditional rendering for Test Completed and Re-attempt */}
                        //                                                 {sectionAttempts[section.id]?.attemptedDetails ? (
                        //                                                     <div className="gap-6 flex flex-row items-center justify-center mt-3">
                        //                                                         <div className="flex flex-row items-center justify-center">
                        //                                                             <Image
                        //                                                                 src="/icons/Green-tick.svg"
                        //                                                                 width={14}
                        //                                                                 height={14}
                        //                                                                 alt="small green-tick" />
                        //                                                             <span className="font-semibold text-xs text-[#0B9055] ml-2">Test Completed</span>
                        //                                                         </div>
                        //                                                         <div>
                        //                                                             <button className="h-[36px] flex flex-row items-center justify-center rounded-md  gap-2 px-3"
                        //                                                                 style={{ border: "1.5px solid #EAECF0" }}
                        //                                                                 onClick={(e) => { e.stopPropagation(); handleStartTest(section.description, section.testTime, section.marksPerQ, section.QuestionsCount || 0, section.id); }}
                        //                                                             >
                        //                                                                 <Image
                        //                                                                     src="/icons/Re-attempt.svg"
                        //                                                                     width={18}
                        //                                                                     height={18}
                        //                                                                     alt="Re-attempt" />
                        //                                                                 <span className="text-[#1D2939] font-semibold text-xs">Re-attempt</span>
                        //                                                             </button>
                        //                                                         </div>
                        //                                                         <Image
                        //                                                             src={isOpenArray[0] ? "/icons/arrowdown.svg" : "/icons/arrowup.svg"}
                        //                                                             alt="arrow"
                        //                                                             width={24}
                        //                                                             height={24}
                        //                                                             className="cursor-pointer"
                        //                                                         />
                        //                                                     </div>
                        //                                                 ) : (
                        //                                                     <button onClick={(e) => { e.stopPropagation(); handleStartTest(section.description, section.testTime, section.marksPerQ, section.QuestionsCount || 0, section.id); }}>
                        //                                                         <div className="mt-3 flex items-center justify-center w-[116px] h-[36px] rounded-[6px] bg-[#9012FF] border border-solid border-[#800EE2] shadow-inner-button hover:bg-[#6D0DCC]">
                        //                                                             <span className="font-medium text-[14px] text-[#FCFCFD]">
                        //                                                                 Start test
                        //                                                             </span>
                        //                                                         </div>
                        //                                                     </button>
                        //                                                 )
                        //                                                 }
                        //                                             </div>
                        //                                         </div>
                        //                                     }
                        //                                     transitionTime={350}
                        //                                     onOpening={() => toggleCollapsible(0)}  // Set the state to open when expanding
                        //                                     onClosing={() => toggleCollapsible(0)} // Set the state to closed when collapsing
                        //                                 >
                        //                                     {sectionAttempts[section.id]?.attemptedDetails && (
                        //                                         <div className={`overflow-hidden`} >
                        //                                             <div className="h-[200px] ">
                        //                                                 <div className="h-[149px] bg-[#FFFFFF] ml-5 mr-5 border-t border-b border-solid border-[#EAECF0] mt-[10px]">
                        //                                                     <div className="bg-[#FFFFFF] h-[50px] flex justify-between items-center mt-[10px]">
                        //                                                         <div className="flex flex-col w-[280px]">
                        //                                                             <span className="font-normal text-[#667085] text-xs">
                        //                                                                 Attempted Questions
                        //                                                             </span>
                        //                                                             <span className="font-semibold text-[15px] text-[#1D2939]">
                        //                                                                 {sectionAttempts[section.id]?.attemptedDetails?.attemptedQuestions || "0/0"}
                        //                                                             </span>
                        //                                                         </div>
                        //                                                         <div className="jabir flex items-center w-[280px] mx-[116px]">
                        //                                                             <div className="h-[30px] w-[1px] bg-[#EAECF0] mr-3"></div>
                        //                                                             <div className="flex flex-col">
                        //                                                                 <span className="font-normal text-[#667085] text-xs">
                        //                                                                     Score
                        //                                                                 </span>
                        //                                                                 <span className="font-semibold text-[15px] text-[#1D2939]">
                        //                                                                     {sectionAttempts[section.id]?.attemptedDetails?.score || "0"}
                        //                                                                 </span>
                        //                                                             </div>
                        //                                                         </div>
                        //                                                         <div className="jabir flex items-center w-[280px] ">
                        //                                                             <div className="h-[30px] w-[1px] bg-[#EAECF0] mr-3"></div>
                        //                                                             <div className="flex flex-col">
                        //                                                                 <span className="font-normal text-[#667085] text-xs">
                        //                                                                     Accuracy
                        //                                                                 </span>
                        //                                                                 <span className="font-semibold text-[15px] text-[#1D2939]">
                        //                                                                     {sectionAttempts[section.id]?.attemptedDetails?.accuracy || "0%"}
                        //                                                                 </span>
                        //                                                             </div>
                        //                                                         </div>
                        //                                                     </div>

                        //                                                     <div className="bg-[#FFFFFF] h-[50px] flex justify-between items-center mt-[20px]">
                        //                                                         <div className="flex flex-col w-[280px]">
                        //                                                             <span className="font-normal text-[#667085] text-xs">
                        //                                                                 Answered Correct
                        //                                                             </span>
                        //                                                             <span className="font-semibold text-[15px] text-[#1D2939]">
                        //                                                                 {sectionAttempts[section.id]?.attemptedDetails?.answeredCorrect || "0/0"}
                        //                                                             </span>
                        //                                                         </div>

                        //                                                         <div className="jabir flex items-center w-[280px] mx-[116px]">
                        //                                                             <div className="h-[30px] w-[1px] bg-[#EAECF0] mr-3"></div>
                        //                                                             <div className="flex flex-col">
                        //                                                                 <span className="font-normal text-[#667085] text-xs">
                        //                                                                     Answered Incorrect
                        //                                                                 </span>
                        //                                                                 <span className="font-semibold text-[15px] text-[#1D2939]">
                        //                                                                     {sectionAttempts[section.id]?.attemptedDetails?.answeredIncorrect || "0/0"}
                        //                                                                 </span>
                        //                                                             </div>
                        //                                                         </div>
                        //                                                         <div className="jabir flex items-center w-[280px] ">
                        //                                                             <div className="h-[30px] w-[1px] bg-[#EAECF0] mr-3"></div>
                        //                                                             <div className="flex flex-col">
                        //                                                                 <span className="font-normal text-[#667085] text-xs">
                        //                                                                     Time taken
                        //                                                                 </span>
                        //                                                                 <span className="font-semibold text-[15px] text-[#1D2939]">
                        //                                                                     {formatTimeTaken(sectionAttempts[section.id]?.attemptedDetails?.timeTaken || "0")} out of {formatTimeLeft(section.testTime)}
                        //                                                                 </span>
                        //                                                             </div>
                        //                                                         </div>
                        //                                                     </div>
                        //                                                 </div>
                        //                                                 <div className="h-[51px] ml-5 mr-5 justify-between flex items-center">
                        //                                                     <div className="flex flex-row items-center justify-center">
                        //                                                         <span className="font-normal text-[#667085] text-xs">
                        //                                                             5 times attempted
                        //                                                         </span>
                        //                                                         <div className="tooltip relative inline-block">
                        //                                                             <button>
                        //                                                                 <Image
                        //                                                                     src="/icons/questionmark.svg"
                        //                                                                     width={16}
                        //                                                                     height={16}
                        //                                                                     alt="Question-mark"
                        //                                                                     className="ml-1 mt-1"
                        //                                                                 />
                        //                                                             </button>
                        //                                                             <div className="tooltipText">
                        //                                                                 <span className="font-normal text-xs text-[#FFFFFF]">
                        //                                                                     Your metrics related to the previous attempts are in
                        //                                                                     the detailed analytics section.
                        //                                                                 </span>
                        //                                                             </div>
                        //                                                         </div>
                        //                                                     </div>
                        //                                                     <button className="flex flex-row justify-center items-center"
                        //                                                         onClick={() => router.replace('/analytics/test-series')}>
                        //                                                         <span className="relative font-semibold text-[#9012FF] text-sm mr-1 inline-block">
                        //                                                             View Detailed Analytics
                        //                                                             <span className="absolute left-0 bottom-[2px] w-full h-[1px] bg-[#9012FF]"></span>
                        //                                                         </span>
                        //                                                         <Image
                        //                                                             src="/icons/right-arrow.svg"
                        //                                                             width={24}
                        //                                                             height={24}
                        //                                                             alt=" Right-arrow"
                        //                                                         />
                        //                                                     </button>
                        //                                                 </div>
                        //                                             </div>
                        //                                         </div>
                        //                                     )}
                        //                                 </Collapsible>
                        //                             </div>
                        //                         ) : (
                        //                             <div
                        //                                 className="flex flex-row gap-4  bg-black">

                        //                                 <button

                        //                                     onClick={() => navigateToSection(section.id, section.sectionName)}>
                        //                                     <div className="w-[264px] h-[204px] rounded-[12px] border border-solid border-[#EAECF0] bg-[#FFFFFF] ">
                        //                                         <div className="h-[156px] m-5 flex flex-col space-y-6">
                        //                                             <div className="h-[46px] flex flex-col">
                        //                                                 <div className="flex justify-between h-[24px] ">
                        //                                                     <span className="font-semibold text-1g text-[#1D2939]">{section.sectionName}</span>
                        //                                                     <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                        //                                                         <button>
                        //                                                             <Image alt="Collapse Icon Right" src="/icons/collapse-right.svg" width={8} height={8} />
                        //                                                         </button>
                        //                                                     </button>
                        //                                                 </div>
                        //                                                 <span className="font-normal text-[12px] text-[#667085] mt-1  flex flex-rowjustify-start">
                        //                                                     {section.SubsectionsCount} Tests
                        //                                                 </span>
                        //                                             </div>

                        //                                             <div className="h-[44px] flex flex-col ">
                        //                                                 <div className="flex justify-between h-[24px] mb-2">
                        //                                                     <span className="font-medium text-xs text-[#667085]">Attempted</span>
                        //                                                     <span className="font-medium text-xs text-[#667085]">Total Score</span>
                        //                                                 </div>
                        //                                                 <div className="flex justify-between h-[24px] ">
                        //                                                     <span className="ml-4 font-semibold text-[#1D2939] text-xs">1/5</span>
                        //                                                     <span className="ml-4 font-semibold text-[#1D2939] text-xs">130</span>
                        //                                                 </div>
                        //                                             </div>

                        //                                             {/* No gap applied here */}
                        //                                             <div className="flex items-center justify-between flex-row gap-[10px]">
                        //                                                 <Progress aria-label="Loading..." className="max-w-md h-2" value={43} />
                        //                                                 <span className="font-normal text-[#667085] text-xs">43%</span>
                        //                                             </div>
                        //                                         </div>
                        //                                     </div>
                        //                                 </button>
                        //                             </div>
                        //                         )}
                        //                     </div>
                        //                 ))}
                        //         </div>
                        //     )}
                        // </>
                        <>
                            {sectionss.length <= 0 ? (
                                <div className="w-auto h-auto flex flex-col gap-2 mx-8 border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-md mb-16 items-center justify-center px-6 py-12">
                                    <h3 className="text-base">No Test Found</h3>
                                </div>
                            ) : (
                                <div className="ml-8 mr-8">
                                    {/* Container for all sections */}
                                    <div className="flex flex-col gap-4">
                                        {/* Row container for non-test sections (math, chemistry) */}
                                        <div className="flex flex-row flex-wrap gap-4 h-auto w-auto ">
                                            {sectionss
                                                .filter(section => !section.hasQuestions && !section.isUmbrellaTest)
                                                .map((section, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => navigateToSection(section.id, section.sectionName)}
                                                        className="flex-shrink-0"
                                                    >
                                                        <div className="w-[264px] h-[204px] rounded-[12px] border border-solid border-[#EAECF0] bg-[#FFFFFF] hover:bg-[#F9FAFB]">
                                                            <div className="h-[156px] m-5 flex flex-col space-y-6">
                                                                <div className="h-[46px] flex flex-col">
                                                                    <div className="flex justify-between h-[24px]">
                                                                        <span className="font-semibold text-1g text-[#1D2939]">{section.sectionName}</span>
                                                                        <button className="w-[32px] h-[32px] rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                                                                            <Image alt="Collapse Icon Right" src="/icons/collapse-right.svg" width={8} height={8} />
                                                                        </button>
                                                                    </div>
                                                                    <span className="font-normal text-[12px] text-[#667085] mt-1 text-left">
                                                                        {section.totalSectionsWithQuestions} Tests & {section.SubsectionsCount} Sections
                                                                    </span>
                                                                </div>

                                                                <div className="h-[44px] flex flex-col">
                                                                    <div className="flex justify-between h-[24px] mb-2">
                                                                        <span className="font-medium text-xs text-[#667085]">Attempted</span>
                                                                        {/* <span className="font-medium text-xs text-[#667085]">Total Score</span> */}
                                                                    </div>
                                                                    <div className="flex justify-between h-[24px]">
                                                                        <span className="ml-4 font-semibold text-[#1D2939] text-xs">{section.totalSectionsWithStudentsAttempted || 0}/{section.totalSectionsWithQuestions || 0}</span>
                                                                        {/* <span className="ml-4 font-semibold text-[#1D2939] text-xs">130</span> */}
                                                                    </div>
                                                                </div>

                                                                <div className="flex items-center justify-between flex-row gap-[10px]">
                                                                    <Progress aria-label="Loading..." className="max-w-md h-2" value={section.studentProgress || 0} />
                                                                    <span className="font-normal text-[#667085] text-xs">{section.studentProgress || 0}%</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </button>
                                                ))}
                                        </div>

                                        {/* Column container for test sections */}
                                        <div className="flex flex-col gap-4">
                                            {sectionss
                                                .filter(section => section.hasQuestions || section.isUmbrellaTest)
                                                .sort((a, b) => (a.order || 0) - (b.order || 0))
                                                .map((section, index) => (
                                                    <div key={index} className="flex flex-col w-full h-auto rounded-[12px] border border-solid border-[#EAECF0] bg-[#FFFFFF]">
                                                        <Collapsible
                                                            trigger={
                                                                <div className="w-full h-auto p-2 flex justify-between items-center"
                                                                    onClick={() => toggleCollapsible(index)}>
                                                                    <div className="flex flex-col gap-1 ml-3 ">
                                                                        <span className="text-[#1D2939] font-semibold text-[16px]">
                                                                            {section.sectionName}
                                                                        </span>
                                                                        <span className="text-[#667085] font-normal text-[12px]">
                                                                            {section.isUmbrellaTest ? section.subsectionCountUmbrella : section.QuestionsCount} {section.isUmbrellaTest ? 'Tests' : 'Questions'}
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex items-center p-3 gap-4">
                                                                        {/* Conditional rendering for Test Completed and Re-attempt */}
                                                                        {sectionAttempts[section.id]?.attemptedDetails ? (
                                                                            <div className="gap-6 flex flex-row items-center justify-center ">
                                                                                <div className="flex flex-row items-center justify-center">
                                                                                    <Image
                                                                                        src="/icons/Green-tick.svg"
                                                                                        width={14}
                                                                                        height={14}
                                                                                        alt="small green-tick" />
                                                                                    <span className="font-semibold text-xs text-[#0B9055] ml-2">Test Completed</span>
                                                                                </div>
                                                                                <div>
                                                                                    <button className="h-[36px] flex flex-row items-center justify-center rounded-md  gap-2 px-3 hover:bg-[#F9FAFB]"
                                                                                        style={{ border: "1.5px solid #EAECF0" }}
                                                                                        onClick={(e) => { e.stopPropagation(); handleStartTest(section.description, section.testTime, section.marksPerQ, section.QuestionsCount || 0, section.id, section.isUmbrellaTest, section.subsectionCountUmbrella || 0); }}
                                                                                    >
                                                                                        <Image
                                                                                            src="/icons/Re-attempt.svg"
                                                                                            width={18}
                                                                                            height={18}
                                                                                            alt="Re-attempt" />
                                                                                        <span className="text-[#1D2939] font-semibold text-xs">Re-attempt</span>
                                                                                    </button>
                                                                                </div>
                                                                                <Image
                                                                                    src={isOpenArray[index] ? "/icons/arrowdown.svg" : "/icons/arrowup.svg"}
                                                                                    alt="arrow"
                                                                                    width={24}
                                                                                    height={24}
                                                                                    className="cursor-pointer"
                                                                                />
                                                                            </div>
                                                                        ) : (
                                                                            <button onClick={(e) => { e.stopPropagation(); handleStartTest(section.description, section.testTime, section.marksPerQ, section.QuestionsCount || 0, section.id, section.isUmbrellaTest, section.subsectionCountUmbrella || 0); }}>
                                                                                <div className="flex items-center justify-center w-[116px] h-[36px] rounded-[6px] bg-[#9012FF] border border-solid border-[#800EE2] shadow-inner-button hover:bg-[#6D0DCC]">
                                                                                    <span className="font-medium text-[14px] text-[#FCFCFD]">
                                                                                        Start test
                                                                                    </span>
                                                                                </div>
                                                                            </button>
                                                                        )
                                                                        }
                                                                    </div>
                                                                </div>
                                                            }
                                                            open={isOpenArray[index]}
                                                        >
                                                            {sectionAttempts[section.id]?.attemptedDetails && (
                                                                <div className={`overflow-hidden`} >
                                                                    <div className="h-[200px] ">
                                                                        <div className="h-[149px] bg-[#FFFFFF] ml-5 mr-5 border-t border-b border-solid border-[#EAECF0] mt-[10px]">
                                                                            <div className="bg-[#FFFFFF] h-[50px] flex justify-between items-center mt-[10px]">
                                                                                <div className="flex flex-col w-[280px]">
                                                                                    <span className="font-normal text-[#667085] text-xs">
                                                                                        Attempted Questions
                                                                                    </span>
                                                                                    <span className="font-semibold text-[15px] text-[#1D2939]">
                                                                                        {sectionAttempts[section.id]?.attemptedDetails?.attemptedQuestions || "0/0"}
                                                                                    </span>
                                                                                </div>
                                                                                <div className="jabir flex items-center w-[280px] mx-[116px]">
                                                                                    <div className="h-[30px] w-[1px] bg-[#EAECF0] mr-3"></div>
                                                                                    <div className="flex flex-col">
                                                                                        <span className="font-normal text-[#667085] text-xs">
                                                                                            Score
                                                                                        </span>
                                                                                        <span className="font-semibold text-[15px] text-[#1D2939]">
                                                                                            {sectionAttempts[section.id]?.attemptedDetails?.score || "0"}
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="jabir flex items-center w-[280px] ">
                                                                                    <div className="h-[30px] w-[1px] bg-[#EAECF0] mr-3"></div>
                                                                                    <div className="flex flex-col">
                                                                                        <span className="font-normal text-[#667085] text-xs">
                                                                                            Accuracy
                                                                                        </span>
                                                                                        <span className="font-semibold text-[15px] text-[#1D2939]">
                                                                                            {sectionAttempts[section.id]?.attemptedDetails?.accuracy || "0%"}
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="bg-[#FFFFFF] h-[50px] flex justify-between items-center mt-[20px]">
                                                                                <div className="flex flex-col w-[280px]">
                                                                                    <span className="font-normal text-[#667085] text-xs">
                                                                                        Answered Correct
                                                                                    </span>
                                                                                    <span className="font-semibold text-[15px] text-[#1D2939]">
                                                                                        {sectionAttempts[section.id]?.attemptedDetails?.answeredCorrect || "0/0"}
                                                                                    </span>
                                                                                </div>

                                                                                <div className="jabir flex items-center w-[280px] mx-[116px]">
                                                                                    <div className="h-[30px] w-[1px] bg-[#EAECF0] mr-3"></div>
                                                                                    <div className="flex flex-col">
                                                                                        <span className="font-normal text-[#667085] text-xs">
                                                                                            Answered Incorrect
                                                                                        </span>
                                                                                        <span className="font-semibold text-[15px] text-[#1D2939]">
                                                                                            {sectionAttempts[section.id]?.attemptedDetails?.answeredIncorrect || "0/0"}
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="jabir flex items-center w-[280px] ">
                                                                                    <div className="h-[30px] w-[1px] bg-[#EAECF0] mr-3"></div>
                                                                                    <div className="flex flex-col">
                                                                                        <span className="font-normal text-[#667085] text-xs">
                                                                                            Time taken
                                                                                        </span>
                                                                                        <span className="font-semibold text-[15px] text-[#1D2939]">
                                                                                            {formatTimeTaken(sectionAttempts[section.id]?.attemptedDetails?.timeTaken || 0)} out of {formatTimeTaken(sectionAttempts[section.id]?.attemptedDetails?.testTime || 0)}
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="h-[51px] ml-5 mr-5 justify-between flex items-center">
                                                                            <div className="flex flex-row items-center justify-center">
                                                                                <span className="font-normal text-[#667085] text-xs">
                                                                                    {attemptsCount[section.id] || 0} times attempted
                                                                                </span>
                                                                                <div className="tooltip relative inline-block">
                                                                                    <button>
                                                                                        <Image
                                                                                            src="/icons/questionmark.svg"
                                                                                            width={16}
                                                                                            height={16}
                                                                                            alt="Question-mark"
                                                                                            className="ml-1 mt-1"
                                                                                        />
                                                                                    </button>
                                                                                    <div className="tooltipText">
                                                                                        <span className="font-normal text-xs text-[#FFFFFF]">
                                                                                            Your metrics related to the previous attempts are in
                                                                                            the detailed analytics section.
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <button className="flex flex-row justify-center items-center"
                                                                                onClick={() => router.replace('/analytics/test-series')}>
                                                                                <span className="relative font-semibold text-[#9012FF] text-sm mr-1 inline-block">
                                                                                    View Detailed Analytics
                                                                                    <span className="absolute left-0 bottom-[2px] w-full h-[1px] bg-[#9012FF]"></span>
                                                                                </span>
                                                                                <Image
                                                                                    src="/icons/right-arrow.svg"
                                                                                    width={24}
                                                                                    height={24}
                                                                                    alt=" Right-arrow"
                                                                                />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </Collapsible>

                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            ) : (
                <div className="flex flex-col h-full w-full items-center justify-center">
                    <h3>You does not have access to this testseries</h3>
                    <button onClick={() => router.back()}><p className="underline text-purple">Go Back</p></button>
                </div>
            )}
            {/* Start Test Dialog */}
            <Dialog open={showTestDialog} onClose={() => setShowTestDialog(false)} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/30 " />
                <div className="fixed inset-0 flex items-center justify-center ">
                    <DialogPanel transition className="bg-[#FFFFFF] rounded-2xl  w-[520px] h-auto">
                        <div className="flex flex-1 w-full flex-col pb-6">
                            <div className="h-[23px]  mt-[23px] mr-[24px] ml-[24px] justify-between flex">
                                <span className="text-[#1D2939] font-semibold text-lg">Start Test</span>
                                <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                                    <button onClick={() => setShowTestDialog(false)} >
                                        <Image src="/icons/cancel.svg" alt="cancel" width={18} height={18} />
                                    </button>
                                </button>
                            </div>
                            <div className=" h-auto mr-[24px] ml-[24px] mt-[13px] ">
                                <span className="text-sm text-[#667085] font-normal">{description}</span>
                            </div>

                            <div className="mt-[33px] flex-row flex">
                                <div className="gap-1 flex-col flex items-center w-full border-r border-lightGrey">
                                    <span className="font-normal text-sm text-[#667085]">Time Duration</span>
                                    <span className="text-[#1D2939] text-lg font-semibold">{formatTimeLeft(time)}</span>
                                </div>
                                {isUmbrellaTest ? (
                                    <div className="gap-1 flex-col flex items-center w-full border-r border-lightGrey">
                                        <span className="font-normal text-sm text-[#667085]">No. of Tests</span>
                                        <span className="text-[#1D2939] text-lg font-semibold">{noOfTests}</span>
                                    </div>
                                ) : (
                                    <div className="gap-1 flex-col flex items-center w-full border-r border-lightGrey">
                                        <span className="font-normal text-sm text-[#667085]">No. of Questions</span>
                                        <span className="text-[#1D2939] text-lg font-semibold">{noOfQuestions}</span>
                                    </div>
                                )}

                                <div className="gap-1 flex-col flex items-center w-full">
                                    <span className="font-normal text-sm text-[#667085]">Marks Per Question</span>
                                    <span className="text-[#1D2939] text-lg font-semibold">{marksPerQ}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row justify-end py-3 pr-6 gap-4  border-t border-lightGrey border-solid">
                            <button
                                className="bg-[#FFFFFF] text-[#1D2939] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px] shadow-inner-button hover:bg-[#F2F4F7]"
                                style={{ border: "1.5px solid #EAECF0" }}
                                onClick={() => setShowTestDialog(false)}>
                                Cancel
                            </button>
                            <button
                                className="bg-[#8501FF] text-[#FFFFFF] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px] shadow-inner-button border border-[#800EE2] hover:bg-[#6D0DCC]"
                                onClick={() => {
                                    const sectionIds = getSectionPath(passedSectionId);
                                    const url = `/attempt-test?tId=${testId}&sectionIds=${encodeURIComponent(
                                        JSON.stringify(sectionIds)
                                    )}&uid=${auth.currentUser?.uid}`;
                                    window.open(url, "_blank"); // Opens in a new tab
                                    setShowTestDialog(false);
                                }}
                            >
                                Start Now
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    );
}
export default Test;


<Modal isOpen={showTestDialog} onOpenChange={(isOpen) => !isOpen && setShowTestDialog(false)} hideCloseButton
>

    <ModalContent>
        <>
            <ModalHeader className="flex flex-row justify-between items-center gap-1">
                <span className="text-[#1D2939] font-semibold text-lg">Start Test</span>
                <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                    <button onClick={() => setShowTestDialog(false)} >
                        <Image src="/icons/cancel.svg" alt="cancel" width={18} height={18} />
                    </button>
                </button>
            </ModalHeader>
            <ModalBody>
                <div className=" h-auto mr-[24px] ml-[24px] mt-[13px] ">
                    <span className="text-sm text-[#667085] font-normal">{description}</span>
                </div>

                <div className="mt-[33px] flex-row flex">
                    <div className="gap-1 flex-col flex items-center w-full border-r border-lightGrey">
                        <span className="font-normal text-sm text-[#667085]">Time Duration</span>
                        <span className="text-[#1D2939] text-lg font-semibold">{formatTimeLeft(time)}</span>
                    </div>
                    {isUmbrellaTest ? (
                        <div className="gap-1 flex-col flex items-center w-full border-r border-lightGrey">
                            <span className="font-normal text-sm text-[#667085]">No. of Tests</span>
                            <span className="text-[#1D2939] text-lg font-semibold">{noOfTests}</span>
                        </div>
                    ) : (
                        <div className="gap-1 flex-col flex items-center w-full border-r border-lightGrey">
                            <span className="font-normal text-sm text-[#667085]">No. of Questions</span>
                            <span className="text-[#1D2939] text-lg font-semibold">{noOfQuestions}</span>
                        </div>
                    )}

                    <div className="gap-1 flex-col flex items-center w-full">
                        <span className="font-normal text-sm text-[#667085]">Marks Per Question</span>
                        <span className="text-[#1D2939] text-lg font-semibold">{marksPerQ}</span>
                    </div>
                </div>

            </ModalBody>
            <ModalFooter className="border-t border-lightGrey">
                <Button variant="light"
                    className="bg-[#FFFFFF] text-[#1D2939] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px] shadow-inner-button hover:bg-[#F2F4F7]"
                    style={{ border: "1.5px solid #EAECF0" }}
                    onClick={() => setShowTestDialog(false)}>
                    Cancel
                </Button>
                <Button
                    className="bg-[#8501FF] text-[#FFFFFF] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px] shadow-inner-button border border-[#800EE2] hover:bg-[#6D0DCC]"
                    onClick={() => {
                        const sectionIds = getSectionPath(passedSectionId);
                        const url = `/attempt-test?tId=${testId}&sectionIds=${encodeURIComponent(
                            JSON.stringify(sectionIds)
                        )}&uid=${auth.currentUser?.uid}`;
                        window.open(url, "_blank"); // Opens in a new tab
                        setShowTestDialog(false);
                    }}
                >
                    Start Now
                </Button>

            </ModalFooter>
        </>
    </ModalContent>
</Modal >
