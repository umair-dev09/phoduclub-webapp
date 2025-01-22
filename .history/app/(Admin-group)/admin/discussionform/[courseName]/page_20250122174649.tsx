"use client";
import Collapsible from 'react-collapsible';
import { Tabs, Tab } from "@nextui-org/react";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import Content from "@/components/AdminComponents/DiscussionForum/Contents";
import Discussion from "@/components/AdminComponents/DiscussionForum/Discussion";
import { useRouter, useSearchParams } from 'next/navigation';
import { collection, doc, getDoc, getDocs, onSnapshot, query } from 'firebase/firestore';
import { auth, db } from '@/firebase';
import LoadingData from '@/components/Loading';
import TextContent from '@/components/DashboardComponents/LearnComponents/CourseComponents/InsideCoursesComp/TextComp/TextContent';
import VideoContent from '@/components/DashboardComponents/LearnComponents/CourseComponents/InsideCoursesComp/VideoComp/Video';
import QuizContent from '@/components/DashboardComponents/LearnComponents/CourseComponents/InsideCoursesComp/StartQuizComp/QuizContent';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
type Sections = {
    sectionName: string;
    sectionId: string;
    sectionScheduleDate: string;
    noOfLessons: string;
    content?: Content[];
}

type Content = {
    type: string;
    contentId: string;
    isDisscusionOpen: boolean;
    lessonContent: string;
    lessonHeading: string;
    lessonOverView: string;
    lessonScheduleDate: string;
    pdfLink: string;
    videoLink: string;
    marksPerQuestion: string;
    nMarksPerQuestion: string;
    quizTime: string;
    videoDuration: number;
    questionsCount: number;
    videoId: string;
    StudentsCompleted: string[];
}

type CourseData = {
    courseName: string | null;
    courseDescription: string | null;
    courseImage: string | null;
    price: string | null;
    discountPrice: string | null;
    rating: string | null;
    noOfRating: string | null;
    status: string | null;
    StudentsPurchased: string[];
};


function Courses() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const courseId = searchParams.get('cId');
    const [courseData, setCourseData] = useState<CourseData | null>(null);
    const [loading, setLoading] = useState(true); // Track loading state 
    const [sections, setSections] = useState<Sections[]>([]);
    const [sectionId, setSectionId] = useState('');

    const [selectedContent, setSelectedContent] = useState<{
        type: string;
        contentId: string;
        isDisscusionOpen: boolean;
        lessonContent: string;
        lessonHeading: string;
        lessonOverView: string;
        lessonScheduleDate: string;
        pdfLink: string;
        videoLink: string;
        marksPerQuestion: string;
        nMarksPerQuestion: string;
        quizTime: string;
        videoDuration: number;
        videoId: string;
        questionsCount: number;
    } | null>(null);
    useEffect(() => {
        if (courseId) {
            const fetchCourseData = async () => {
                try {
                    const courseDocRef = doc(db, "course", courseId); // Replace "courses" with your Firestore collection name
                    const courseSnapshot = await getDoc(courseDocRef);
                    if (courseSnapshot.exists()) {
                        setCourseData(courseSnapshot.data() as CourseData);
                    } else {
                        console.error("No course found with the given ID.");
                    }
                } catch (error) {
                    console.error("Error fetching course data:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchCourseData();
        } else {
            setLoading(false);
        }
    }, [courseId]);


    // Fetch content data from Firestore
    useEffect(() => {
        if (courseId) {
            const sectionsRef = collection(db, 'course', courseId, 'sections');
            const q = query(sectionsRef);

            const unsubscribe = onSnapshot(
                q,
                (snapshot) => {
                    const sectionsData: Sections[] = snapshot.docs.map((doc) => ({
                        sectionName: doc.data().sectionName,
                        sectionScheduleDate: doc.data().sectionScheduleDate,
                        noOfLessons: doc.data().noOfLessons,
                        sectionId: doc.data().sectionId,
                        content: [], // Initialize an empty content array
                    }));
                    setSections(sectionsData);
                    setLoading(false);

                    // Fetch content for each section
                    snapshot.docs.forEach((doc) => {
                        const sectionId = doc.id;
                        const contentRef = collection(db, 'course', courseId, 'sections', sectionId, 'content');
                        const contentQuery = query(contentRef);

                        onSnapshot(contentQuery, async (contentSnapshot) => {
                            const contentData: Content[] = await Promise.all(contentSnapshot.docs.map(async (contentDoc) => {
                                const questionsCollection = collection(db, 'course', courseId, 'sections', sectionId, 'content', contentDoc.id, 'Questions');
                                const questionsSnapshot = await getDocs(questionsCollection);
                                const questionsCount = questionsSnapshot.size;

                                return {
                                    lessonHeading: contentDoc.data().lessonHeading,
                                    lessonScheduleDate: contentDoc.data().lessonScheduleDate,
                                    type: contentDoc.data().type,
                                    contentId: contentDoc.id,
                                    isDisscusionOpen: contentDoc.data().isDisscusionOpen,
                                    lessonContent: contentDoc.data().lessonContent,
                                    lessonOverView: contentDoc.data().lessonOverView,
                                    pdfLink: contentDoc.data().pdfLink,
                                    videoLink: contentDoc.data().videoLink,
                                    marksPerQuestion: contentDoc.data().marksPerQuestion,
                                    nMarksPerQuestion: contentDoc.data().nMarksPerQuestion,
                                    quizTime: contentDoc.data().quizTime,
                                    videoDuration: contentDoc.data().videoDuration,
                                    questionsCount: questionsCount,
                                    videoId: contentDoc.data().videoId,
                                    StudentsCompleted: contentDoc.data().StudentsCompleted,
                                };
                            }));

                            setSections((prevSections) =>
                                prevSections.map((section) =>
                                    section.sectionId === sectionId ? { ...section, content: contentData } : section
                                )
                            );
                        });
                    });
                },
                (error) => {
                    console.error('Error fetching sections:', error);
                    setLoading(false);
                }
            );

            return () => unsubscribe();
        }
    }, [courseId]);

    const [activeTab, setActiveTab] = useState("Content");
    const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
        welcome: false,
        maths: false,
        chemistry: false,
        physics: false,
    });

    // Toggle function for each section
    const handleToggle = (section: string) => {
        setOpenSections(prevState => ({
            ...prevState,
            [section]: !prevState[section], // Toggle the specific section
        }));
    };
    const [isOpenArray, setIsOpenArray] = useState([false, false, false]); // Initialize with false for each collapsible
    // Function to toggle a specific collapsible's state
    const toggleCollapsible = (index: number) => {
        const newIsOpenArray = [...isOpenArray];
        newIsOpenArray[index] = !newIsOpenArray[index]; // Toggle the specific index
        setIsOpenArray(newIsOpenArray);
    };

    const formatDuration = (duration: number) => {
        if (duration) {
            const hours = Math.floor(duration / 3600);
            const minutes = Math.floor((duration % 3600) / 60);
            const seconds = Math.floor(duration % 60);

            return hours > 0
                ? `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
                : `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        else {
            return '00:00';
        }
    };


    if (loading) {
        return <LoadingData />
    }

    return (
        <div className="flex flex-row w-full h-full">
            <div className="w-[270px] flex flex-col border-r border-solid border-[#EAECF0]">
                <div className="h-[72px] p-6 flex flex-row items-center gap-2 border-b border-solid border-[#EAECF0] bg-[#FFFFFF]">
                    <Image className="w-10 h-10 rounded-full" src={courseData?.courseImage || "/icons/messageIcon.svg"} alt="group icon" width={42} height={42} quality={100} />
                    <h1 className="text-[#182230] font-semibold text-sm">{courseData?.courseName}</h1>
                </div>
                <div className="flex flex-col overflow-y-auto border-b border-solid border-[#EAECF0] ">
                    {sections.map((section, index) => (
                        <Collapsible key={index}
                            open={openSections.welcome} // Control open state based on individual section
                            trigger={
                                <div
                                    className="h-[60px] flex flex-row justify-between py-2 px-4 items-center hover:bg-[#F7F8FB]"
                                    onClick={() => toggleCollapsible(index)} // Pass section name to toggle function
                                >
                                    <span className="font-semibold text-base text-[#1D2939] text-left">{index + 1}. {section.sectionName}</span>
                                    <Image
                                        src={isOpenArray[index] ? '/icons/arrow-up-dark.svg' : '/icons/arrow-down-dark.svg'}
                                        width={20}
                                        height={20}
                                        alt="Arrow-toggle"
                                    />
                                </div>
                            }
                            transitionTime={350}

                        >
                            <div className="flex flex-col border-t py-2">
                                {section.content && section.content.length > 0 ? (
                                    <>
                                        {section.content?.map((content, index) => {
                                            const userId = auth.currentUser?.uid; // Get the current user's ID

                                            // Check if the StudentsCompleted array contains the current user's ID
                                            const isCompleted = content.StudentsCompleted?.includes(userId || '');

                                            return (
                                                <button
                                                    key={index}
                                                    className={`${selectedContent?.contentId === content.contentId ? 'bg-[#F8F0FF]' : 'bg-[#FFFFFF]'} w-auto  flex flex-row items-top justify-center gap-2 h-auto py-3 px-3 hover:bg-[#F8F0FF]`}
                                                    onClick={() => {
                                                        setSelectedContent(content);
                                                        setSectionId(section.sectionId);
                                                    }}
                                                >
                                                    <div className="flex flex-col gap-1 pt-[-2px] w-full">
                                                        <span className="font-semibold text-sm text-[#1D2939] text-left">
                                                            {index + 1}. {content.lessonHeading}
                                                        </span>
                                                        {content.type === "Text" && (
                                                            <div className="flex flex-row text-sm font-normal it">
                                                                <Image
                                                                    className="mr-1"
                                                                    src="/icons/read.svg"
                                                                    alt="test-icon"
                                                                    width={16}
                                                                    height={16}
                                                                />
                                                                <div>---</div>
                                                            </div>
                                                        )}
                                                        {content.type === "Video" && (
                                                            <div className="flex flex-row text-sm font-normal it">
                                                                <Image
                                                                    className="mr-1"
                                                                    src="/icons/vedio.svg"
                                                                    alt="video-icon"
                                                                    width={16}
                                                                    height={16}
                                                                />
                                                                <div>
                                                                    {formatDuration(content.videoDuration) || "00:00"}
                                                                </div>

                                                            </div>
                                                        )}
                                                        {content.type === "Quiz" && (
                                                            <div className="flex flex-row text-sm font-normal it">
                                                                <Image
                                                                    className="mr-1"
                                                                    src="/icons/test.svg"
                                                                    alt="video-icon"
                                                                    width={16}
                                                                    height={16}
                                                                />
                                                                <div>{content.questionsCount} Questions</div>
                                                            </div>
                                                        )}
                                                        {/* Render other content types (Text, Video, Quiz) as before */}
                                                    </div>
                                                </button>
                                            );
                                        })}

                                    </>
                                ) : (
                                    <>
                                        <p className='py-4 ml-4 text-sm'>No Content Available</p>
                                    </>
                                )
                                }
                            </div>
                        </Collapsible>
                    ))}
                </div>
            </div>
            <div className="flex-1 flex flex-col">
                <div className="h-[72px] p-6 flex items-center border-b border-solid border-[#EAECF0] bg-[#FFFFFF]">
                    <span className="text-[#182230] font-semibold text-base">1. Welcome and Introduction</span>
                </div>
                <div className=" flex flex-col flex-1 h-full w-full overflow-y-auto">
                    <Tabs
                        aria-label="Course Tabs"
                        color="primary"
                        variant="underlined"
                        selectedKey={activeTab}
                        onSelectionChange={(key) => setActiveTab(key as string)}
                        classNames={{
                            tabList: "gap-6 w-full relative rounded-none p-0 border-b border-solid border-[#EAECF0] mx-6 mt-6",
                            cursor: "w-full bg-[#7400E0]",
                            tab: "max-w-fit px-0 h-12",
                            tabContent: "group-data-[selected=true]:text-[#7400E0] hover:text-[#7400E0] w-full",
                        }}
                    >
                        <Tab
                            key="Content"
                            title={
                                <div className="flex items-center space-x-2">
                                    <span className="font-medium text-base">
                                        Content
                                    </span>
                                </div>
                            }
                        >
                            <div className="mr-4 mt-[24px] rounded-md flex flex-col h-auto overflow-y-auto">
                                {selectedContent?.type === 'Text' && <TextContent lessonContent={selectedContent.lessonContent} />}
                                {selectedContent?.type === 'Video' && <VideoContent videoLink={selectedContent.videoLink || ''} />}
                                {selectedContent?.type === 'Quiz' && <QuizContent sectionId={sectionId} courseId={courseId || ''} isAdmin={true} questionsList={[]} contentId={selectedContent.contentId} quizTime={selectedContent.quizTime} questionCount={selectedContent.questionsCount} marksPerQ={selectedContent.marksPerQuestion} nMarksPerQ={selectedContent.nMarksPerQuestion} lessonOverview={selectedContent.lessonOverView} lessonHeading={selectedContent.lessonHeading} />}
                            </div>
                        </Tab>
                        <Tab
                            key="Discussion"
                            title={
                                <div className="flex items-center space-x-2 h-full w-full">
                                    <span className="font-medium text-base">
                                        Discussion
                                    </span>
                                </div>
                            }
                        >
                            {selectedContent?.isDisscusionOpen ? (
                                <Discussion courseId={courseId || ''} sectionId={sectionId} contentId={selectedContent.contentId} />
                            ) : (
                                <p className="pt-4 pb-[-4px] pl-4 text-sm">Discussion forum is not open for this lesson.</p>
                            )}
                        </Tab>
                    </Tabs>
                </div>

            </div>

            <ToastContainer />
        </div >
    );
}

export default Courses;
