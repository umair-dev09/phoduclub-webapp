"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Accordian from "@/components/DashboardComponents/AnalyticsComponents/Test-Series-Components/AccordionComps/Accordian";
import AccordianAllSubjects from "@/components/DashboardComponents/AnalyticsComponents/Test-Series-Components/AccordionComps/AccordianAllSubjects";
import { Tooltip } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { auth, db } from "@/firebase";
import { collection, doc, getCountFromServer, getDoc, getDocs, onSnapshot, query } from "firebase/firestore";
import LoadingData from "@/components/Loading";
import Collapsible from "react-collapsible";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Progress } from "@nextui-org/progress";
import TestDialog from "@/components/DashboardComponents/AnalyticsComponents/Test-Series-Components/TestDialog";
import NormalTestAnalytics from "@/components/DashboardComponents/AnalyticsComponents/Test-Series-Components/NormalTestAnalytics";
import UmbrellaTestAnalytics from "@/components/DashboardComponents/AnalyticsComponents/Test-Series-Components/UmbrellaTestAnalytics";

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
    // Questions?: Question[];
    QuestionsCount: number;
    SubsectionsCount?: number;
    isUmbrellaTest: boolean;
    totalSectionsWithQuestions: number;
    totalSectionsWithStudentsAttempted: number;
    subSectionsCountUmbrella: number;
    timeTaken: number;
    testTime: number;
    score: number;
}
interface Question {
    id: string;
}
type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

interface AnsweredQuestion {
    questionId: string;
    status: string;
    answered: boolean;
    selectedOption: string | null;
    answeredCorrect: boolean | null;
    allotedTime: number;
    spentTime: number;
    difficulty: DifficultyLevel;
    remarks: string;

}

interface SubAttemptDetails {
    attemptedQuestions: string;
    score: string;
    accuracy: string;
    answeredCorrect: string;
    answeredIncorrect: string;
    timeTaken: number;
    testTime: number;
    questions: AnsweredQuestion[];
    sectionName: string;
    attemptId: string;
}

interface AttemptedDetails {
    userId: string | undefined;
    attemptCount: any;
    attemptedQuestions: string;
    score: string;
    accuracy: string;
    answeredCorrect: string;
    answeredIncorrect: string;
    timeTaken: number;
    testTime: number;
    isUmbrellaTest: boolean;
    questions: AnsweredQuestion[];
    subattempts: SubAttemptDetails[];
    sectionName: string;
    attemptId: string;
    attemptDateAndTime: {
        seconds: number;
        nanoseconds: number;
    };
}

function formatTimeInSeconds(seconds: number | string): string {
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

function TestAnalytics() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const testId = searchParams.get('tId');
    const [testAlreadyPurchased, setTestAlreadyPurchased] = useState(false);
    const [activeTab, setActiveTab] = useState<string>('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [attemptedDetails, setAttemptedDetails] = useState<AttemptedDetails | null>(null);
    const [answeredQuestions, setAnsweredQuestions] = useState<AnsweredQuestion[]>([]);
    const [time, setTime] = useState('');
    const [marksPerQ, setMarksPerQ] = useState('');
    const [passedSectionId, setPassedSectionId] = useState('');
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
    const [detailview, setDetailview] = useState(false);
    const [sectionName, setSectionName] = useState('');
    const [detailedAnalyticsOpen, setDetailedAnalyticsOpen] = useState(false);
    const [isUmbrellaAnalytics, setIsUmbrellaAnalytics] = useState(false);
    const [attemptId, setAttemptId] = useState('');

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
    const [sectionAttempts, setSectionAttempts] = useState<{ [key: string]: { attemptedDetails: AttemptedDetails[] } }>({});
    const [detailAttempts, setDetailAttempts] = useState<AttemptedDetails[]>([]);
    const [sectionAttemptsL, setSectionAttemptsL] = useState<{ [key: string]: { attemptedDetails: AttemptedDetails | null } }>({});
    const fetchSectionAttemptDataL = async (sectionId: string, fullPath: string) => {
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
    const [attemptsCount, setAttemptsCount] = useState<{ [key: string]: number }>({});

    const fetchSectionAttemptData = async (sectionId: string, fullPath: string, isUmbrellaTest: boolean) => {
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

            // Map all attempts to their data, including subattempts for umbrella tests
            const allAttempts = await Promise.all(userAttempts.map(async attempt => {
                const attemptData = attempt.data() as AttemptedDetails;

                // If it's an umbrella test, fetch subattempts
                if (isUmbrellaTest) {
                    const subattemptsRef = collection(attempt.ref, 'subattempts');
                    const subattemptsSnapshot = await getDocs(subattemptsRef);
                    const subattempts = subattemptsSnapshot.docs.map(subDoc => ({
                        ...(subDoc.data() as SubAttemptDetails),
                    }));
                    return {
                        ...attemptData,
                        attemptId: attempt.id,
                        subattempts: subattempts
                    };
                }

                return {
                    ...attemptData,
                    attemptId: attempt.id,
                    subattempts: []
                };
            }));

            return { attemptedDetails: allAttempts };
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
                        let attemptData: { attemptedDetails: AttemptedDetails[] } = { attemptedDetails: [] };
                        let attemptDataL: { attemptedDetails: AttemptedDetails | null } = { attemptedDetails: null };

                        if (sectionData.hasQuestions || sectionData.isUmbrellaTest) {
                            const fetchedData = await fetchSectionAttemptDataL(sectionId, path) as { attemptedDetails: AttemptedDetails };
                            if (fetchedData) {
                                attemptDataL = fetchedData;
                            }

                            setSectionAttemptsL((prev) => ({
                                ...prev,
                                [sectionId]: attemptDataL,
                            }));
                        }

                        if (sectionData.hasQuestions || sectionData.isUmbrellaTest) {
                            const fetchedData = await fetchSectionAttemptData(sectionId, path, sectionData.isUmbrellaTest) as { attemptedDetails: AttemptedDetails[] };
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
                        let totalScore = 0;
                        let totalTimeTakenMinutes = 0;
                        let maxTotalTimeMinutes = 0;

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

                                    const userAttempts = attemptsSnapshot.docs
                                        .filter(attempt => attempt.data().userId === currentUserId)
                                        .sort((a, b) => b.data().attemptNumber - a.data().attemptNumber);

                                    if (userAttempts.length > 0) {
                                        const latestAttempt = userAttempts[0].data();
                                        // sectionsWithAttemptsCount += 1;
                                        // totalScore += latestAttempt.score || 0;

                                        // For accuracy, only take number before '/'
                                        const scoreValue = parseInt(latestAttempt.score?.split('/')[0] || '-');
                                        totalScore += scoreValue;
                                        totalTimeTakenMinutes += latestAttempt.timeTaken || '-';
                                        maxTotalTimeMinutes += latestAttempt.testTime || '0';
                                    }

                                    // Count only one attempt per section if user has attempted
                                    if (attemptsSnapshot.docs.some(attempt => attempt.data().userId === auth.currentUser?.uid)) {
                                        sectionsWithAttemptsCount += 1;
                                    }
                                }

                                // Recursively check subsections
                                const subSectionPath = `${path}/${sectionDoc.id}/sections`;
                                await countSectionsWithQuestionsAndAttempts(subSectionPath);
                            }
                        };

                        await countSectionsWithQuestionsAndAttempts(`${doc.ref.path}/sections`);

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
                            QuestionsCount: questionsCount,
                            SubsectionsCount: subsectionCount, // Number of subsections
                            subSectionsCountUmbrella: subsectionCountUmbrella,
                            isUmbrellaTest: sectionData.isUmbrellaTest || false,
                            totalSectionsWithQuestions: sectionsWithQuestionsCount,
                            totalSectionsWithStudentsAttempted: sectionsWithAttemptsCount,
                            score: totalScore,
                            timeTaken: typeof totalTimeTakenMinutes === 'string' ? 0 : totalTimeTakenMinutes || 0,
                            testTime: maxTotalTimeMinutes || 0,
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
        setDetailedAnalyticsOpen(false);
    };
    const getSectionPath = (currentSectionId: string): string[] => {
        return [...currentSectionIds, currentSectionId];
    };

    const handleTabClick = (path: string) => {
        router.push(path);
    };

    if (loading) {
        return <LoadingData />;
    }

    return (
        <div className="flex flex-row w-full">
            {testAlreadyPurchased ? (
                <>
                    {detailedAnalyticsOpen || isUmbrellaAnalytics ? (
                        <div className="flex flex-1 flex-col  overflow-y-auto w-full">
                            <div className="flex flex-row items-center gap-2 ml-8 mt-4">
                                <div className="flex flex-row">
                                <button
                                onClick={() => breadcrumbs.length < 1 ? router.back() : resetNavigation()}
                                className="font-medium text-[#667085] hover:underline "
                            >Tests
                            </button>
                                </div>
                                {breadcrumbs.map((breadcrumb, index) => (
                                    <div key={breadcrumb.id} className="flex flex-row items-center gap-2">
                                        <Image src="/icons/course-left.svg" width={6} height={6} alt="arrow" className="w-[10px] h-[10px]" />
                                        <button
                                            onClick={() => { handleNavigationClick(index); setDetailedAnalyticsOpen(false); }}
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
                            </div>
                            {/* <div className="flex flex-col gap-[17px] ml-8 mt-5">
                    <span className="font-bold text-[#1D2939] text-1g">{breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1].name : "All Tests"}</span>
                </div> */}
                            {isUmbrellaAnalytics ? (
                                <UmbrellaTestAnalytics onClose={() => setIsUmbrellaAnalytics(false)} attemptedDetails={detailAttempts} sectionName={sectionName} testAttemptId={attemptId} setTestAttemptId={setAttemptId} />
                            ) : (
                                <NormalTestAnalytics onClose={() => setDetailedAnalyticsOpen(false)} attemptedDetails={detailAttempts} sectionName={sectionName} testAttemptId={attemptId} setTestAttemptId={setAttemptId} />
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-1 flex-col pb-3 overflow-y-auto w-full">
                            <div className="flex flex-row items-center gap-2 ml-8 mt-4">
                                <div className="flex flex-row">
                                    <button
                                        onClick={resetNavigation}
                                        // onClick={() => { router.back() }}
                                        className="font-medium text-[#667085] hover:underline "
                                    >Test-Series
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
                            </div>
                            <div className="flex flex-col gap-[17px] ml-8 mt-5">
                                <span className="font-bold text-[#1D2939] text-1g">{breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1].name : "All Tests"}</span>
                            </div>
                            {sectionLoading ? (
                                <LoadingData />
                            ) : (
                                <>
                                    {sectionss.length <= 0 ? (
                                        <div className="w-auto h-auto flex flex-col gap-2 mx-8 border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-md mb-16 items-center justify-center px-6 py-12">
                                            <h3 className="text-base">No Test Found</h3>
                                        </div>
                                    ) : (
                                        <div className="gap-3 flex flex-col mt-5 mx-8">
                                            {/* Section  Area*/}
                                            {sectionss
                                                .filter(section => !section.hasQuestions && !section.isUmbrellaTest)
                                                .map((section, index) => (
                                                    <div key={index}
                                                        onClick={() => navigateToSection(section.id, section.sectionName)}
                                                        className='bg-white border border-lightGrey rounded-xl flex items-center justify-between px-5 h-auto py-4 w-auto cursor-pointer hover:bg-[#fcfcfc]'
                                                    >
                                                        <div className="flex flex-col gap-1">
                                                            <p className="text-base font-bold text-[#1D2939]">{section.sectionName}</p>
                                                            <p className="text-[#667085] font-normal text-sm">{section.totalSectionsWithQuestions} Tests & {section.SubsectionsCount} Sections</p>
                                                        </div>
                                                        <div className="flex flex-row">
                                                            <div className="flex fles-row mr-20">
                                                                <div className="flex flex-col gap-1.5">
                                                                    <p className="text-xs font-normal text-[#1D2939]">Attempted</p>
                                                                    <h3 className="text-[15px] font-semibold">{section.totalSectionsWithStudentsAttempted || 0}/{section.totalSectionsWithQuestions || 0}</h3>
                                                                </div>
                                                            </div>
                                                            <div className="flex fles-row mr-20">
                                                                <div className="w-[1px] bg-lightGrey mr-4"></div>
                                                                <div className="flex flex-col gap-1.5">
                                                                    <p className="text-xs font-normal text-[#1D2939]">Score</p>
                                                                    <h3 className="text-[15px] font-semibold">{section.score}</h3>
                                                                </div>
                                                            </div>
                                                            <div className="flex fles-row mr-20">
                                                                <div className="w-[1px] bg-lightGrey mr-4"></div>
                                                                <div className="flex flex-col gap-1.5">
                                                                    <p className="text-xs font-normal text-[#1D2939]">Time taken</p>
                                                                    <h3 className="text-[15px] font-semibold">{formatTimeInSeconds(section.timeTaken)}</h3>
                                                                </div>
                                                            </div>
                                                            <div className="flex fles-row mr-20">
                                                                <div className="w-[1px] bg-lightGrey mr-4"></div>
                                                                <div className="flex flex-col gap-1.5">
                                                                    <p className="text-xs font-normal text-[#1D2939]">Total Time</p>
                                                                    <h3 className="text-[15px] font-semibold">{formatTimeInSeconds(section.testTime)}</h3>
                                                                </div>
                                                            </div>

                                                            <Image className=""
                                                                src={"/icons/collapse-right.svg"} // Arrow based on first accordion state
                                                                width={8}
                                                                height={8}
                                                                alt="arrow"
                                                            />
                                                        </div>
                                                    </div>
                                                ))}

                                            {/* Test Detail View Area*/}
                                            {sectionss
                                                .filter(section => section.hasQuestions || section.isUmbrellaTest)
                                                .sort((a, b) => (a.order || 0) - (b.order || 0))
                                                .map((section, index) => (
                                                    <div key={index} className='bg-white border border-lightGrey rounded-xl flex items-center justify-between px-5 h-auto py-4 w-auto '>
                                                        <div className="flex flex-col gap-1">
                                                            <p className="text-base font-bold text-[#1D2939]">{section.sectionName}</p>
                                                            <div className="flex flex-row items-center gap-1">
                                                                <p className="text-xs text-[#667085]">{section.isUmbrellaTest ? section.subSectionsCountUmbrella || 0 : section.QuestionsCount || 0} {section.isUmbrellaTest ? 'Tests' : 'Questions'}</p>
                                                                <div className="w-[1px] h-3 bg-[#667085]"></div>
                                                                <p className="text-xs text-[#667085]"> {attemptsCount[section.id] || 0} times attempted</p>
                                                                <Tooltip
                                                                    content="This results is from your last attempts, click on Detail view button to see all attempted results."
                                                                    placement="top"
                                                                    offset={15}
                                                                    closeDelay={100}
                                                                    classNames={{
                                                                        content: [
                                                                            "bg-black text-white py-3 max-w-[240px]",
                                                                            "rounded-md text-center font-normal text-[12px]",
                                                                            "after:content-[''] after:absolute after:top-full after:left-1/2 after:-ml-2",
                                                                            "after:border-8 after:border-transparent after:border-t-black",
                                                                        ],
                                                                    }}
                                                                >
                                                                    <button>
                                                                        <Image
                                                                            src="/icons/questionmark.svg"
                                                                            width={16}
                                                                            height={16}
                                                                            alt="question mark icon"
                                                                            className="w-4 h-4"
                                                                        />
                                                                    </button>
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center justify-center h-auto">
                                                            <div className="flex flex-row mr-5 gap-1.5 text-[0.813rem]">
                                                                <p className="font-semibold text-[#1D2939]">
                                                                {sectionAttemptsL[section.id]?.attemptedDetails?.attemptedQuestions || "0/0"}

                                                                </p>
                                                                <p className="text-[#667085]">Attempted</p>
                                                            </div>
                                                            <div className="w-[1px] bg-lightGrey mr-4 h-10"></div>
                                                            <div className="flex flex-row mr-5 gap-1.5 text-[0.813rem]">
                                                                <p className="font-semibold text-[#1D2939]">
                                                                {sectionAttemptsL[section.id]?.attemptedDetails?.answeredCorrect || "0/0"}
                                                                </p>
                                                                <p className="text-[#667085]">Correct</p>
                                                            </div>
                                                            <div className="w-[1px] bg-lightGrey mr-4 h-10"></div>
                                                            <div className="flex flex-row mr-5 gap-1.5 text-[0.813rem]">
                                                                <p className="font-semibold text-[#1D2939]">
                                                                {sectionAttemptsL[section.id]?.attemptedDetails?.answeredIncorrect || "0/0"}
                                                                </p>
                                                                <p className="text-[#667085]">Incorrect</p>
                                                            </div>
                                                            <div className="w-[1px] bg-lightGrey mr-4 h-10"></div>
                                                            <div className="flex flex-row mr-5 gap-1.5 text-[0.813rem]">
                                                                <p className="font-semibold text-[#1D2939]">{sectionAttemptsL[section.id]?.attemptedDetails?.accuracy || "0%"}</p>
                                                                <p className="text-[#667085]">Accuracy</p>
                                                            </div>
                                                            <div className="w-[1px] bg-lightGrey mr-4 h-10"></div>
                                                            <div className="flex flex-row mr-5 gap-1.5 text-[0.813rem]">
                                                                <p className="font-semibold text-[#1D2939]">{sectionAttemptsL[section.id]?.attemptedDetails?.score || "0"}</p>
                                                                <p className="text-[#667085]">Score</p>
                                                            </div>
                                                            {sectionAttempts[section.id]?.attemptedDetails && sectionAttempts[section.id]?.attemptedDetails.some(attempt => attempt.userId === currentUserId) ? (
                                                                <button
                                                                    onClick={() => {
                                                                        setDetailview(true);
                                                                        setDetailAttempts(sectionAttempts[section.id]?.attemptedDetails || []);
                                                                        setSectionName(section.sectionName);
                                                                    }}
                                                                >
                                                                    <span className="font-semibold text-[#9012FF] text-sm hover:underline">
                                                                        Detail View
                                                                    </span>
                                                                </button>
                                                            ) : (
                                                                <span className="font-semibold text-[#F04438] text-sm ">
                                                                    Not Attempted
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </>
            ) : (
                <div className="flex flex-col h-full w-full items-center justify-center">
                    <h3>You does not have access to this testseries</h3>
                    <button onClick={() => router.back()}><p className="underline text-purple">Go Back</p></button>
                </div>
            )}

            {detailview && <TestDialog open={detailview} onClose={() => setDetailview(false)} setIsUmbrellaAnalytics={setIsUmbrellaAnalytics} attemptedDetails={detailAttempts} sectionName={sectionName} setAttemptId={setAttemptId} setDetailedAnalyticsOpen={setDetailedAnalyticsOpen} />}

        </div>

    );
}
export default TestAnalytics;