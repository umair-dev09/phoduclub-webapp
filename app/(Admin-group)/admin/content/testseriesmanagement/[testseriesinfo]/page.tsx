"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ScheduledDialog from "@/components/AdminComponents/QuizInfoDailogs/scheduledDailog";
import Delete from "@/components/AdminComponents/QuizInfoDailogs/DeleteDailogue";
import End from "@/components/AdminComponents/QuizInfoDailogs/EndDailogue";
import Paused from "@/components/AdminComponents/QuizInfoDailogs/PauseDailogue";
import Resume from "@/components/AdminComponents/QuizInfoDailogs/ResumeDailogue";
import StudentsAttemptedTestseries from '@/components/AdminComponents/TestseriesInfo/StudentsAttemptedTestseries';
import Content from '@/components/AdminComponents/TestseriesInfo/Content';
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Tabs, Tab } from "@nextui-org/react";
import { collection, doc, getDoc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";
import LoadingData from "@/components/Loading";
import StatusDisplay from "@/components/AdminComponents/StatusDisplay";
import EndDialog from "@/components/AdminComponents/QuizInfoDailogs/EndDailogue";
import PausedDDialog from "@/components/AdminComponents/QuizInfoDailogs/PauseDailogue";
import ResumeQuiz from "@/components/AdminComponents/QuizInfoDailogs/ResumeDailogue";
import DeleteDialog from "@/components/AdminComponents/QuizInfoDailogs/DeleteDailogue";
import { ToastContainer } from "react-toastify";
import DeleteTest from "@/components/AdminComponents/TestseriesDialogs/DeleteTest";
import { format } from 'date-fns';

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
    testTime: string;
    Questions?: Question[];

}
interface Question {
    id: string;
}
type testData = {
    testName: string | null;
    testDescription: string | null;
    testImage: string | null;
    price: string | null;
    discountPrice: string | null;
    rating: string | null;
    noOfRating: string | null;
    status: string | null;
    startDate: string | null;
    endDate: string | null;
    createdBy: string | null;
};
const totalStars = 5;
const StarIcon: React.FC<{ filled: boolean; isHalf: boolean }> = ({ filled, isHalf }) => (
    <Image
        src={filled ? (isHalf ? "/icons/half-star.svg" : "/icons/full-star.svg") : "/icons/empty-star.svg"}
        width={20}
        height={20}
        alt={isHalf ? "half star" : filled ? "full star" : "empty star"}
    />
);

const RatingStars: React.FC<{ rating: string | null }> = ({ rating }) => {
    // Parse rating and ensure it's a valid number
    const parsedRating = parseFloat(rating || "0");
    const wholeStars = Math.floor(parsedRating); // Count of full stars
    const hasHalfStar = parsedRating % 1 >= 0.1 && parsedRating % 1 < 0.9; // Half star condition
    const emptyStars = totalStars - wholeStars - (hasHalfStar ? 1 : 0); // Remaining empty stars
    const [activeTab, setActiveTab] = useState('CourseContent');
    return (
        <div className="flex items-center">
            {/* Render full stars */}
            {[...Array(wholeStars)].map((_, index) => (
                <StarIcon key={`filled-${index}`} filled={true} isHalf={false} />
            ))}

            {/* Render half star if applicable */}
            {hasHalfStar && <StarIcon filled={true} isHalf={true} />}

            {/* Render empty stars */}
            {[...Array(emptyStars)].map((_, index) => (
                <StarIcon key={`empty-${index}`} filled={false} isHalf={false} />
            ))}
        </div>
    );
};
function TestSeriesInfo() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [liveCourseNow, setLiveCourseNow] = useState(false);
    const ContentCount = 78;
    const StudentsattemptedCount = 10;
    const [activeTab, setActiveTab] = useState('Content');
    const searchParams = useSearchParams();
    const testId = searchParams.get('tId');
    const [testData, setTestData] = useState<testData | null>(null);
    const [testName, setTestName] = useState('');
    const [loading, setLoading] = useState(true);
    const [sectionLoading, setSectionLoading] = useState(false);
    const [totalNoOfQuestions, setTotalNoOfQuestions] = useState(0);
    const [totalNoOfTests, setTotalNoOfTests] = useState(0);
    // State to manage each dialog's visibility

    const [isScheduledDialogOpen, setIsScheduledDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isEndDialogOpen, setIsEndDialogOpen] = useState(false);
    const [isPausedDialogOpen, setIsPausedDialogOpen] = useState(false);
    const [isResumeOpen, setIsResumeOpen] = useState(false);
    const [adminDetails, setAdminDetails] = useState<{ name: string, profilePic: string } | null>(null);

    useEffect(() => {
        if (testId) {
            const courseDocRef = doc(db, "testseries", testId); // Replace "testseries" with your Firestore collection name
            const unsubscribe = onSnapshot(courseDocRef, (testSnapshot) => {
                if (testSnapshot.exists()) {
                    setTestData(testSnapshot.data() as testData);
                } else {
                    console.error("No testseries found with the given ID.");
                }
                setLoading(false);
            }, (error) => {
                console.error("Error fetching testseries data:", error);
                setLoading(false);
            });

            return () => unsubscribe();
        } else {
            setLoading(false);
        }
    }, [testId]);
    useEffect(() => {
        if (!testId) return;

        const fetchTotalQuestions = async () => {
            try {
                let totalQuestions = 0;

                const fetchQuestionsCount = async (path: string) => {
                    const sectionCollection = collection(db, `${path}/sections`);
                    const sectionSnapshot = await getDocs(sectionCollection);

                    for (const sectionDoc of sectionSnapshot.docs) {
                        const sectionPath = `${path}/sections/${sectionDoc.id}`;
                        const questionsCollection = collection(db, `${sectionPath}/Questions`);
                        const questionsSnapshot = await getDocs(questionsCollection);
                        totalQuestions += questionsSnapshot.size;

                        // Recursively fetch questions count for subsections
                        await fetchQuestionsCount(sectionPath);
                    }
                };

                await fetchQuestionsCount(`testseries/${testId}`);
                console.log(`Total Questions: ${totalQuestions}`);
                setTotalNoOfQuestions(totalQuestions);
            } catch (error) {
                console.error('Error fetching total questions: ', error);
            }
        };

        fetchTotalQuestions();
    }, [testId]);

    useEffect(() => {
        if (!testId) return;

        const fetchTotalSectionsWithQuestions = async () => {
            try {
                let totalSectionsWithQuestions = 0;

                const fetchSectionsCount = async (path: string) => {
                    const sectionCollection = collection(db, `${path}/sections`);
                    const sectionSnapshot = await getDocs(sectionCollection);

                    for (const sectionDoc of sectionSnapshot.docs) {
                        const sectionPath = `${path}/sections/${sectionDoc.id}`;
                        const questionsCollection = collection(db, `${sectionPath}/Questions`);
                        const questionsSnapshot = await getDocs(questionsCollection);

                        if (!questionsSnapshot.empty) {
                            totalSectionsWithQuestions += 1;
                        }

                        // Recursively fetch sections count for subsections
                        await fetchSectionsCount(sectionPath);
                    }
                };

                await fetchSectionsCount(`testseries/${testId}`);
                console.log(`Total Sections with Questions: ${totalSectionsWithQuestions}`);
                setTotalNoOfTests(totalSectionsWithQuestions);
            } catch (error) {
                console.error('Error fetching total sections with questions: ', error);
            }
        };

        fetchTotalSectionsWithQuestions();
    }, [testId]);
    const [sectionss, setSections] = useState<Section[]>([]);
    const [currentPath, setCurrentPath] = useState<string[]>([]);
    const [currentSectionIds, setCurrentSectionIds] = useState<string[]>([]);
    const [breadcrumbs, setBreadcrumbs] = useState<{ id: string; name: string }[]>([]);
    // ----------------------------------------------------------------------------------------
    useEffect(() => {
        if (!testId) return;

        // Fetch sections and subsections in real-time
        const fetchSections = async (): Promise<() => void> => {
            try {
                setSectionLoading(true); // Start loading

                const path = currentPath.reduce(
                    (acc, id) => `${acc}/sections/${id}`,
                    `testseries/${testId}`
                );

                const sectionCollection = collection(db, `${path}/sections`);

                const unsubscribe = onSnapshot(sectionCollection, async (snapshot) => {
                    const fetchedSections = await Promise.all(
                        snapshot.docs.map(async (doc) => {
                            const sectionData = doc.data();

                            // Fetching subsections (nested subcollection)
                            const subsectionsCollection = collection(doc.ref, 'sections');
                            const subsectionsSnapshot = await getDocs(subsectionsCollection);
                            const subsections = await Promise.all(
                                subsectionsSnapshot.docs.map(async (subsectionDoc) => {
                                    const subsectionData = subsectionDoc.data();
                                    return {
                                        id: subsectionDoc.id,
                                        sectionName: subsectionData.sectionName,
                                        sectionScheduleDate: subsectionData.sectionScheduleDate,
                                        parentSectionId: subsectionData.parentSectionId || null,
                                        order: subsectionData.order || 0,
                                        hasQuestions: subsectionData.hasQuestions || false,
                                        sections: [],
                                        description: sectionData.description,
                                        marksPerQ: sectionData.marksPerQ,
                                        nMarksPerQ: sectionData.nMarksPerQ,
                                        testTime: sectionData.testTime,
                                        Questions: [],
                                    };
                                })
                            );

                            // Check if section has questions
                            const questionsCollection = collection(doc.ref, 'Questions');
                            const questionsSnapshot = await getDocs(questionsCollection);
                            const questionsss = await Promise.all(
                                questionsSnapshot.docs.map(async (qDoc) => {
                                    const qData = qDoc.data();
                                    return {
                                        id: qDoc.id,
                                    };
                                })
                            );
                            return {
                                id: doc.id,
                                sectionName: sectionData.sectionName,
                                sectionScheduleDate: sectionData.sectionScheduleDate,
                                parentSectionId: sectionData.parentSectionId || null,
                                order: sectionData.order || 0,
                                hasQuestions: sectionData.hasQuestions,
                                sections: subsections,
                                description: sectionData.description,
                                marksPerQ: sectionData.marksPerQ,
                                nMarksPerQ: sectionData.nMarksPerQ,
                                testTime: sectionData.testTime,
                                Questions: questionsss,
                            };
                        })
                    );

                    // Sort sections and update state
                    setSections(fetchedSections.sort((a, b) => (a.order || 0) - (b.order || 0)));
                    setSectionLoading(false); // End loading when data is fetched
                });

                return unsubscribe; // Return unsubscribe function
            } catch (error) {
                console.error('Error fetching sections: ', error);
                setSectionLoading(false); // Ensure loading stops in case of error
                return () => { }; // Return a no-op unsubscribe in case of error
            }
        };

        // Async wrapper for fetchSections
        const getUnsubscribe = async (): Promise<() => void> => {
            const unsubscribe = await fetchSections();
            return unsubscribe;
        };

        let unsubscribeFn: () => void; // Explicitly typed as a function that returns void

        getUnsubscribe()
            .then((unsubscribe) => {
                unsubscribeFn = unsubscribe; // Store the unsubscribe function
            })
            .catch((err) => {
                console.error('Error initializing sections listener:', err);
            });

        return () => {
            if (unsubscribeFn) unsubscribeFn(); // Cleanup on unmount or dependency change
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

    useEffect(() => {
        const fetchAdminDetails = async (adminId: string) => {
            const adminDoc = await getDoc(doc(db, 'admin', adminId));
            if (adminDoc.exists()) {
                setAdminDetails(adminDoc.data() as { name: string, profilePic: string });
            } else {
                console.error('No such admin!');
            }
        };

        if (testData?.createdBy) {
            fetchAdminDetails(testData.createdBy);
        }
    }, [testData]);
    const router = useRouter();
    // this logic is for rating 
    interface StarIconProps {
        filled: boolean;
        isHalf: boolean;
    }
    const StarIcon: React.FC<StarIconProps> = ({ filled, isHalf }) => (
        <Image
            src={filled ? (isHalf ? "/icons/half-star.svg" : "/icons/full-star.svg") : "/icons/empty-star.svg"}
            width={20}
            height={20}
            alt={isHalf ? "half star" : filled ? "full star" : "empty star"}
        />
    );
    const rating = 1.5; // The rating value
    const totalStars = 5;
    const formatStartDate = (dateString: string): string => {
        if (dateString) {
            const date = new Date(dateString);
            if (!isNaN(date.getTime())) {
                return format(date, 'dd MMM, yyyy  hh:mm a');
            }
        }
        return '-';
    };
    const formatEndDate = (dateString: string): string => {
        if (dateString) {
            const date = new Date(dateString);
            if (!isNaN(date.getTime())) {
                return format(date, 'dd MMM, yyyy  hh:mm a');
            }
        }
        return '-';
    };

    if (loading) {
        return <LoadingData />
    }
    return (
        <div className="flex w-full h-auto overflow-y-auto flex-col  p-8">
            <div className="w-full h-auto flex flex-col pb-2">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-3 py-1 items-center">
                        <span className="text-[#1D2939] text-2xl font-semibold">{testData?.testName}</span>
                        <StatusDisplay status={testData?.status || ''} />

                        {/* <div className="bg-[#D3F8E0] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                            <span className="w-[6px] h-[6px] bg-[#0A5B39] rounded-full "></span>
                            <span className="font-medium text-[#0A5B39] text-xs">Finished</span>
                        </div> */}
                    </div>
                    <div className="flex flex-row gap-2">
                        {/* FOR SAVED--> */}
                        {testData?.status === 'saved' && (
                            <>
                                <button onClick={() => router.push(`/admin/content/testseriesmanagement/createtestseries/?s=${testData.status}&tId=${testId}`)}
                                    className="w-auto p-3 gap-2  hover:bg-[#F2F4F7] flex-row flex bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center">
                                    <Image src="/icons/publish-quiz.svg" width={18} height={18} alt="publish-quiz" />
                                    <span className="text-sm text-[#0C111D] font-normal">Publish</span>
                                </button>
                            </>
                        )}
                        {testData?.status === 'live' && (
                            <>
                                {/* Button for Pause  */}
                                <button className="w-auto p-3 gap-2 flex-row flex  hover:bg-[#F2F4F7] bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center"
                                    onClick={() => setIsPausedDialogOpen(true)}
                                >
                                    <Image src="/icons/pausequiz.svg" width={18} height={18} alt="Paused-icon" />
                                    <span className="text-sm text-[#0C111D] font-normal">Pause</span>
                                </button>
                                {/* Button for End */}
                                <button className="w-auto p-3 gap-2 flex-row flex hover:bg-[#F2F4F7] bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center"
                                    onClick={() => { setIsEndDialogOpen(true) }}
                                >
                                    <Image src="/icons/endquiz.svg" width={18} height={18} alt="End-icon" />
                                    <span className="text-sm text-[#DE3024]  font-normal">End</span>
                                </button>
                            </>
                        )}


                        {testData?.status === 'paused' && (
                            <>
                                {/* Button for Resume  */}
                                <button
                                    className="w-auto p-3 gap-2 flex-row flex  hover:bg-[#F2F4F7] rounded-[8px] h-[40px] items-center"
                                    onClick={() => setIsResumeOpen(true)}
                                >
                                    <Image src="/icons/resume.svg" width={18} height={18} alt="Resume -icon" />
                                    <span className="text-sm text-[#9012FF]  font-medium">Resume</span>
                                </button>
                                {/* Button for Scheduled  */}
                                <button
                                    className="w-auto p-3 gap-2 flex-row flex hover:bg-[#F2F4F7] bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center"
                                    onClick={() => { setStartDate(testData.startDate || ''); setEndDate(testData.endDate || ''); setIsScheduledDialogOpen(true) }}                                    >
                                    <Image src="/icons/select-Date.svg" width={18} height={18} alt="Calendar" />
                                    <span className="text-sm text-[#0C111D]  font-medium">Schedule</span>
                                </button>
                            </>
                        )}

                        {testData?.status === 'finished' && (
                            <>
                                {/* Button for Delete */}
                                <button
                                    className="w-auto p-3 gap-2 flex-row flex bg-[#FFFFFF] hover:bg-[#F2F4F7] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center"
                                    onClick={() => { setTestName(testData?.testName || ''); setIsDeleteDialogOpen(true) }}
                                >
                                    <Image src="/icons/delete.svg" width={18} height={18} alt="Delete" />
                                    <span className="text-sm text-[#DE3024]  font-medium">Delete</span>
                                </button>
                            </>
                        )}

                        {(testData?.status === 'scheduled' || testData?.status === 'saved' || testData?.status === 'paused') && (
                            <>
                                <Popover placement="bottom-end">
                                    <PopoverTrigger>
                                        <button
                                            className="w-10 p-[10px] h-[40px] gap-1 flex-row  hover:bg-[#F2F4F7] flex  bg-[#FFFFFF] rounded-md  focus:outline-none
                                                    border border-solid border-[#EAECF0] shadow-none">
                                            <Image src="/icons/three-dots.svg" width={18} height={18} alt="three-dots" />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[10.438rem] py-1 px-0 bg-white border border-lightGrey rounded-md">
                                        <button className="flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#F2F4F7]"
                                            onClick={() => router.push(`/admin/content/testseriesmanagement/createtestseries/?s=${testData.status}&tId=${testId}`)}>
                                            <Image src="/icons/edit-icon.svg" width={18} height={18} alt="Edit-icon" />
                                            <p className="text-sm text-[#0C111D] font-normal">Edit</p>
                                        </button>
                                        <button className=" flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#F2F4F7]"
                                            onClick={() => { setTestName(testData?.testName || ''); setIsDeleteDialogOpen(true) }}
                                        >
                                            <Image src='/icons/delete.svg' alt="Delete-icon" width={18} height={18} />
                                            <p className="text-sm text-[#DE3024] font-normal">Delete</p>
                                        </button>
                                    </PopoverContent>
                                </Popover>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {testData?.status === 'scheduled' && (
                <div className="flex flex-row gap-2">
                    <div className="bg-[#EAECF0] rounded-[8px] p-2 flex flex-row gap-1">
                        <Image
                            src="/icons/information-circle.svg"
                            width={20}
                            height={20}
                            alt="information-icon"
                        />
                        <span className="text-[#475467] font-normal text-[13px]">Test Series will be live on {formatStartDate(testData.startDate || '')}</span>
                    </div>
                    <button
                        onClick={() => { setIsScheduledDialogOpen(true); setStartDate(testData.startDate || ''); setEndDate(testData.endDate || ''); }}>
                        <Image src="/icons/edit-icon.svg" width={18} height={18} alt="Edit-icon" />
                    </button>
                </div>
            )}

            <div className="flex flex-row mt-4 gap-4 items-center">
                <Image className='w-[19.375rem] h-[12.25rem] rounded-[16px] object-cover' src={testData?.testImage || '/images/Frame.png'} alt='testseries img' width={310} height={196} />
                <div className="flex-col flex justify-center gap-2">
                    <div className="flex flex-row mt-1 gap-1 items-center">
                        <p className="text-[#667085] font-normal text-sm">Created by</p>
                        <Image className="rounded-full w-6 h-6 ml-[2px]"
                            src={adminDetails?.profilePic || "/icons/profile-pic2.svg"}
                            width={24}
                            height={24}
                            alt="profile-icons"
                        />
                        <p className="text-[#1D2939] font-medium text-sm">{adminDetails?.name}</p>
                    </div>
                    <div className=' text-[#667085] text-sm font-normal break-all' dangerouslySetInnerHTML={{
                        __html: testData?.testDescription || '',
                    }} />
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 flex-row h-[24px] ">
                            <RatingStars rating={testData?.rating || ''} />
                            <div className="text-[#1D2939] text-sm font-bold flex items-center flex-row">
                                {testData?.rating || 0}
                                <span className="text-[#1D2939] font-normal text-sm ml-1">
                                    <span className="flex items-center">
                                        <span className="inline-block">({testData?.noOfRating + '+'}</span>
                                        <span className="inline-block">Ratings)</span>
                                    </span>
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-row gap-3 items-center">
                            <div className="text-[#1D2939] text-2xl font-bold">
                                ₹{testData?.discountPrice && new Intl.NumberFormat('en-IN').format(parseFloat(testData.discountPrice))}
                            </div>
                            <div className="text-[#667085] text-base font-normal line-through">
                                ₹{testData?.price && new Intl.NumberFormat('en-IN').format(parseFloat(testData.price))}
                            </div>
                            {testData?.price && testData?.discountPrice && (
                                <div className="bg-[#DB6704] w-[76px] h-[25px] flex items-center justify-center rounded-full text-white text-xs font-semibold">
                                    {`${Math.round(
                                        ((parseFloat(testData.price) - parseFloat(testData.discountPrice)) /
                                            parseFloat(testData.price)) *
                                        100
                                    )}% off`}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-auto mt-4 flex flex-row gap-4 ">
                <div className="w-full flex flex-col p-4 border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-xl">
                    <span className="text-[#667085] font-normal text-sm">Test Series starts</span>
                    <span className="font-medium text-[#1D2939] text-base">{formatStartDate(testData?.startDate || '-')}</span>
                </div>
                <div className="w-full flex flex-col p-4 border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-xl">
                    <span className="text-[#667085] font-normal text-sm">Test Series ends</span>
                    <span className="font-medium text-[#1D2939] text-base">{formatEndDate(testData?.endDate || '-')}</span>
                </div>
                <div className="w-full flex flex-col p-4 border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-xl">
                    <span className="text-[#667085] font-normal text-sm">Total Questions</span>
                    <span className="font-medium text-[#1D2939] text-base">{totalNoOfQuestions}</span>
                </div>
            </div>
            <div className="pt-3 w-full flex flex-col">
                <Tabs
                    aria-label="Test series Info Tabs"
                    color="primary"
                    variant="underlined"
                    selectedKey={activeTab}
                    onSelectionChange={(key) => setActiveTab(key as string)}
                    classNames={{
                        tabList: "gap-6 w-full relative rounded-none p-0 border-b border-solid border-[#EAECF0]",
                        cursor: "w-full bg-[#7400E0]",
                        tab: "max-w-fit px-0 h-12",
                        tabContent: "group-data-[selected=true]:text-[#7400E0] hover:text-[#7400E0] ",
                    }}
                >
                    <Tab
                        key="Content"
                        title={
                            <div className="flex items-center space-x-2">
                                <span className="font-medium text-base">
                                    Content
                                </span>
                                {/* {ContentCount > 0 && (
                                    <div className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm bg-[#EDE4FF] border border-[#EDE4FF] font-medium text-[#7400E0]">
                                        {ContentCount}
                                    </div>
                                )} */}
                            </div>
                        }
                    >
                        {/* <Content /> */}
                        <div>
                            <div className="flex flex-row items-center gap-2 mb-4">
                                <button
                                    onClick={resetNavigation}
                                    className="font-medium text-[#667085] hover:underline ml-1"
                                >
                                    {testData?.testName}
                                </button>
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
                            {sectionLoading ? (
                                <LoadingData />
                            ) : (
                                <>
                                    {sectionss.length <= 0 ? (
                                        <>
                                            <div className="w-full h-auto flex flex-col gap-2 border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-md mb-16 items-center justify-center px-6 py-12">
                                                <h3 className="text-base">Nothing is here</h3>
                                            </div>
                                        </>
                                    ) : (
                                        <div className='flex flex-col gap-4 pb-12'>
                                            {sectionss.map((section, index) => (
                                                <div key={index} className={`${section.hasQuestions ? '' : 'cursor-pointer'} flex flex-row items-center justify-between px-6 py-4 bg-white border border-lightGrey rounded-xl`}
                                                    onClick={() => {
                                                        if (section.hasQuestions) {
                                                            // Do nothing if section.hasQuestion is true
                                                            return;
                                                        }
                                                        // Perform the action if section.hasQuestion is false
                                                        navigateToSection(section.id, section.sectionName);
                                                    }} >
                                                    <div className='flex flex-col gap-1'>
                                                        <p className='text-left text-base text-[#1D2939] font-semibold'>{section.sectionName}</p>
                                                        {section.hasQuestions ? (
                                                            <p className='text-left text-sm text-[#667085] font-normal'>{section.Questions?.length} Questions</p>
                                                        ) : (
                                                            <p className='text-left text-sm text-[#667085] font-normal'>{section.sections?.length} Tests</p>
                                                        )}
                                                    </div>
                                                    <div>
                                                        {section.hasQuestions ? (
                                                            <button className='w-[7.25rem] h-9 px-[0.875rem] py-[0.625rem] text-white text-xs font-semibold bg-[#9012FF] border border-[#800EE2] rounded-[6px] shadow-inner-button transition-colors duration-150 hover:bg-[#6D0DCC]'
                                                                onClick={() => {
                                                                    const sectionIds = getSectionPath(section.id);
                                                                    const url = `/testview?tId=${testId}&sectionIds=${encodeURIComponent(
                                                                        JSON.stringify(sectionIds)
                                                                    )}`;
                                                                    window.open(url, "_blank"); // Opens in a new tab
                                                                }}>Start Test</button>
                                                        ) : (
                                                            <Image src='/icons/collapse-right-02.svg' alt='open this test series' width={24} height={24} />
                                                        )}

                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </Tab>

                    <Tab
                        key="Students attempted"
                        title={
                            <div className="flex items-center space-x-2">
                                <span className="font-medium text-base">
                                    Students attempted
                                </span>
                                {/* {StudentsattemptedCount > 0 && (
                                    <div className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm bg-[#EDE4FF] border border-[#EDE4FF] font-medium text-[#7400E0]">
                                        {StudentsattemptedCount}
                                    </div>
                                )} */}
                            </div>
                        }
                    >
                        <StudentsAttemptedTestseries />
                    </Tab>
                </Tabs>
            </div>
            {/* Dialog components with conditional rendering */}
            {isDeleteDialogOpen && <DeleteTest onClose={() => setIsDeleteDialogOpen(false)} open={true} testId={testId || ''} testName={testName} />}
            {isScheduledDialogOpen && <ScheduledDialog onClose={() => setIsScheduledDialogOpen(false)} fromContent="testseries" contentId={testId || ''} startDate={startDate} endDate={endDate} setEndDate={setEndDate} setLiveNow={setLiveCourseNow} liveNow={liveCourseNow} setStartDate={setStartDate} />}
            {isEndDialogOpen && <EndDialog onClose={() => setIsEndDialogOpen(false)} fromContent="testseries" contentId={testId || ''} />}
            {isPausedDialogOpen && <PausedDDialog onClose={() => setIsPausedDialogOpen(false)} fromContent="testseries" contentId={testId || ''} />}
            {isResumeOpen && < ResumeQuiz open={isResumeOpen} onClose={() => setIsResumeOpen(false)} fromContent="testseries" contentId={testId || ''} />}
            <ToastContainer />
        </div>
    );
}

export default TestSeriesInfo;
