"use client";
import Image from "next/image";
import { useRouter, useSearchParams, } from "next/navigation";
import Discussion from '@/components/DashboardComponents/LearnComponents/CourseComponents/InsideCoursesComp/Discussioncomp/Discussion';
import Read from '@/components/DashboardComponents/LearnComponents/CourseComponents/InsideCoursesComp/TextComp/TextContent';
import StartQuiz from '@/components/DashboardComponents/LearnComponents/CourseComponents/InsideCoursesComp/StartQuizComp/QuizContent';
import { useState, useEffect } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import Collapsible from 'react-collapsible';
import { Checkbox } from "@nextui-org/react";
import { getDoc, doc, updateDoc, collection, onSnapshot, query, getDocs, arrayUnion, setDoc, arrayRemove } from "firebase/firestore";
import { db, auth } from "@/firebase"; // Adjust the path based on your project setup
import LoadingData from '@/components/Loading';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TextContent from "@/components/DashboardComponents/LearnComponents/CourseComponents/InsideCoursesComp/TextComp/TextContent";
import VideoContent from "@/components/DashboardComponents/LearnComponents/CourseComponents/InsideCoursesComp/VideoComp/Video";
import QuizContent from "@/components/DashboardComponents/LearnComponents/CourseComponents/InsideCoursesComp/StartQuizComp/QuizContent";
import Video from 'next-video';
import CourseVideoPlayer from "@/components/DashboardComponents/LearnComponents/CourseComponents/InsideCoursesComp/VideoComp/Video";
import { Tooltip } from "@nextui-org/react";

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
  answerExplanation: string;
  questionId: string;
}


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
  questionsList: Question[];
  StudentsCompleted: string[];
  quizAttempt?: QuizAttempt | null;
}
interface QuizAttempt {
  AnsweredQuestions: QuestionState[];
  userId: string;
  timeTaken: string;
}

interface QuestionState {
  questionId: string;
  selectedOption: string; // User's answer
  answeredCorrect: boolean; // Whether the answer is correct
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

function Course() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get('cId');
  const [active, setActive] = useState<string>("overview");
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [loading, setLoading] = useState(true); // Track loading state 
  const [sections, setSections] = useState<Sections[]>([]);
  const [sectionId, setSectionId] = useState('');
  const [d, setD] = useState<number>();
  const [courseAlreadyPurchased, setCourseAlreadyPurchased] = useState(false);
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
    questionsList: Question[],
    quizAttempt?: QuizAttempt | null;
  } | null>(null);

  // Fetch course data from Firestore
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

  useEffect(() => {
    const checkCoursePurchased = async () => {
      if (courseId && auth.currentUser?.uid) {
        const currentUserId = auth.currentUser.uid;
        const userDocRef = doc(db, 'course', courseId, 'StudentsPurchased', currentUserId);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          setCourseAlreadyPurchased(true);
        } else {
          setCourseAlreadyPurchased(false);
        }
      }
    };

    checkCoursePurchased();
  }, [courseId, auth.currentUser]);

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
            content: [], // Initialize with empty content
          }));
          setSections(sectionsData);
          setLoading(false);

          // Fetch content for each section
          snapshot.docs.forEach((doc) => {
            const sectionId = doc.id;
            const contentRef = collection(db, 'course', courseId, 'sections', sectionId, 'content');
            const contentQuery = query(contentRef);

            onSnapshot(contentQuery, async (contentSnapshot) => {
              const contentData: Content[] = await Promise.all(
                contentSnapshot.docs.map(async (contentDoc) => {
                  const contentType = contentDoc.data().type;

                  // Fetch questions for the content
                  const questionsCollection = collection(
                    db,
                    'course',
                    courseId,
                    'sections',
                    sectionId,
                    'content',
                    contentDoc.id,
                    'Questions'
                  );
                  const questionsSnapshot = await getDocs(questionsCollection);
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
                        D: data.options.D,
                      },
                      correctAnswer: data.correctAnswer?.replace('option', ''),
                      answerExplanation: data.answerExplanation || '',
                    };
                  });
                  const questionsCount = questionsSnapshot.size;

                  return {
                    lessonHeading: contentDoc.data().lessonHeading,
                    lessonScheduleDate: contentDoc.data().lessonScheduleDate,
                    type: contentType,
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
                    questionsList: fetchedQuestions,
                    StudentsCompleted: contentDoc.data().StudentsCompleted,
                    quizAttempt: null, // Placeholder for quizAttempt
                  };
                })
              );

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
  // Add this useEffect after your existing useEffects
  useEffect(() => {
    // Check if sections data exists and has at least one section
    if (sections && sections.length > 0) {
      const firstSection = sections[0];

      // Set the initial sectionId
      setSectionId(firstSection.sectionId);

      // Check if the first section has content
      if (firstSection.content && firstSection.content.length > 0) {
        // Set the initial selected content to the first content item
        setSelectedContent(firstSection.content[0]);
      }
    }
  }, [sections]); // Depend on sections array

  // ...existing code...
  // Fetch StudentsAttempted separately
  useEffect(() => {
    if (courseId && auth.currentUser) {
      const currentUserId = auth.currentUser.uid;

      sections.forEach((section) => {
        const sectionContent = section.content || []; // Ensure content is an array
        sectionContent.forEach((content) => {
          if (content.type === 'Quiz') {
            const studentsAttemptedRef = doc(
              db,
              'course',
              courseId,
              'sections',
              section.sectionId,
              'content',
              content.contentId,
              'StudentsAttempted',
              currentUserId
            );

            getDoc(studentsAttemptedRef).then((quizAttemptSnapshot) => {
              if (quizAttemptSnapshot.exists()) {
                const quizAttemptData = quizAttemptSnapshot.data();
                const quizAttempt: QuizAttempt = {
                  AnsweredQuestions: (quizAttemptData as QuizAttempt).AnsweredQuestions || [],
                  userId: currentUserId,
                  timeTaken: (quizAttemptData as QuizAttempt).timeTaken || '',
                };

                setSections((prevSections) =>
                  prevSections.map((prevSection) => {
                    if (prevSection.sectionId === section.sectionId) {
                      const prevSectionContent = prevSection.content || []; // Ensure content is an array
                      return {
                        ...prevSection,
                        content: prevSectionContent.map((prevContent) =>
                          prevContent.contentId === content.contentId
                            ? { ...prevContent, quizAttempt }
                            : prevContent
                        ),
                      };
                    }
                    return prevSection;
                  })
                );
              }
            });
          }
        });
      });
    }
  }, [courseId, sections]);


  const handleSelectionChange = (key: string) => {
    setActive(key);

    // Handle logic based on the selected tab without routing
    if (key === "overview") {
      // Do something related to 'overview'
      console.log("Overview tab selected");
    } else if (key === "Discussion") {
      // Do something related to 'Discussion'
      console.log("Discussion tab selected");
    }
  };

  // Initialize state using localStorage values if they exist, otherwise default values
  const [activeComponent, setActiveComponent] = useState<string>(() => {
    return localStorage.getItem('activeComponent') || 'Read';
  });


  //   state custom for the checkmark 
  const [hoverRead, setHoverRead] = useState(false);
  const [hoverVideo, setHoverVideo] = useState(false);
  const [hoverStartQuiz, setHoverStartQuiz] = useState(false);
  const [iconCheckmarkRead, setIconCheckmarkRead] = useState<string | null>(null);
  const [iconCheckmarkVideo, setIconCheckmarkVideo] = useState<string | null>(null);
  const [iconCheckmarkStartQuiz, setIconCheckmarkStartQuiz] = useState<string | null>(null);


  // Save the active component and active tab to localStorage when they change
  useEffect(() => {
    localStorage.setItem('activeComponent', activeComponent);
  }, [activeComponent]);

  ;


  //-----------------------------------------------------------------------------------------------------------------------------------------

  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    welcome: false,
    maths: false,
    chemistry: false,
    physics: false,
  });

  const [isOpenArray, setIsOpenArray] = useState(
    new Array(sectionId.length).fill(false) // Dynamically initialize based on the number of groups
  );
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

  const handleMarkContentCompleted = async (contentId: string, sectionId: string, StudentsCompleted: string[]) => {
    if (courseId && auth.currentUser?.uid) {
      try {
        const currentUserId = auth.currentUser.uid;

        // Check if the user is already in the StudentsCompleted array
        const isUserCompleted = StudentsCompleted?.includes(currentUserId);

        const ref = doc(db, 'course', courseId, 'sections', sectionId, 'content', contentId);

        if (isUserCompleted) {
          // Remove the user if they are already in StudentsCompleted
          await updateDoc(ref, {
            StudentsCompleted: arrayRemove(currentUserId),
          });
          console.log(`User ${currentUserId} removed from StudentsCompleted.`);
        } else {
          // Add the user if they are not in StudentsCompleted
          await updateDoc(ref, {
            StudentsCompleted: arrayUnion(currentUserId),
          });
          console.log(`User ${currentUserId} added to StudentsCompleted.`);
        }
      } catch (error) {
        console.error('Error updating course document:', error);
        toast.error('Failed to mark lesson completed');
      }
    } else {
      console.error('Invalid course or user');
    }
  };

  if (loading) {
    return <LoadingData />
  }

  return (
    <div className="flex flex-row w-screen">
      {courseAlreadyPurchased ? (
        <>
          {selectedContent ? (
            <>
              <div className="MainCourseLayout flex flex-col flex-1 overflow-y-auto pt-3 pb-7 overflow-x-hidden w-full">
                {/* Header */}
                <div className="h-[64px] ml-8 flex items-center">
                  <div className="my-5 flex items-center">
                    <button className="flex items-center " onClick={() => router.back()}>
                      <div className="text-[#1D2939] h-[24px] w-auto" style={{ fontSize: "16px", fontWeight: "600" }}>
                        Courses
                      </div>
                      <div className="ml-3 w-[24px]">
                        <Image src="/icons/course-left.svg" width={7} height={12} alt="left-arrow" />
                      </div>
                    </button>
                    <div className="text-[#667085] h-full w-auto -ml-1" style={{ fontSize: "16px", fontWeight: "500" }}>
                      {courseData?.courseName}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-[17px] ml-8">
                  <span className="font-bold text-[#1D2939] text-1g">{selectedContent?.lessonHeading}</span>
                </div>

                {/* Middle Section */}
                <div className="mr-8 mt-[24px] rounded-md flex flex-col h-auto">
                  {selectedContent?.type === 'Text' && <TextContent lessonContent={selectedContent.lessonContent} />}

                  {selectedContent?.type === 'Video' && <VideoContent videoLink={selectedContent.videoLink || ''} />}
                  {selectedContent?.type === 'Quiz' && <QuizContent isAdmin={false} sectionId={sectionId} courseId={courseId || ''} questionsList={selectedContent.questionsList || []} contentId={selectedContent.contentId} quizTime={selectedContent.quizTime} questionCount={selectedContent.questionsCount} marksPerQ={selectedContent.marksPerQuestion} nMarksPerQ={selectedContent.nMarksPerQuestion} lessonOverview={selectedContent.lessonOverView} lessonHeading={selectedContent.lessonHeading} quizAttempt={selectedContent.quizAttempt} />}
                </div>

                {/* THIS IS THE FOOTER PART OF MAIN---COURSE-----LAYOUT */}
                {selectedContent?.type !== 'Quiz' && (
                  <div>
                    {/* <div className="ml-8 h-[60px] mr-8 mt-[20px] rounded-md flex items-center justify-center">
                            <div className="flex flex-row justify-between w-full h-[44px]">
                                <button className="h-full w-[111px] rounded-[8px] bg-[#FFFFFF] border-[1.5px] border-solid border-[#EAECF0] hover:bg-[#f0f0f0]">
                                    <span className="font-normal text-sm text-[#1D2939]">Previous</span>
                                </button>
                                <button className="h-full w-[111px] rounded-[8px] bg-[#8501FF] shadow-inner-button border-[1px] border- solid border-[#800EE2]">
                                    <span className="font-semibold text-sm text-[#FFFFFF]">Next</span>
                                </button>
                            </div>
                        </div> */}

                    <div className="ml-8 mr-8 h-auto mt-[20px] w-full gap-[16px] flex border-b border-solid border-[#EAECF0]">
                      <Tabs
                        aria-label="course Tabs"
                        color="primary"
                        variant="underlined"
                        selectedKey={active}
                        onSelectionChange={(key) => handleSelectionChange(key as string)}
                        classNames={{
                          tabList: "gap-6 w-full relative rounded-none p-0 border-solid border-[#EAECF0]",
                          cursor: "w-full bg-[#7400E0]",
                          tab: "max-w-fit px-0 h-12",
                          tabContent: "group-data-[selected=true]:text-[#7400E0] hover:text-[#7400E0]",
                        }}
                      >
                        <Tab
                          key="overview"
                          title={
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-base">Overview</span>
                            </div>
                          }
                        />
                        <Tab
                          key="Discussion"
                          title={
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-base">Discussion</span>
                            </div>
                          }
                        />
                      </Tabs>
                    </div>

                    {active === 'overview' && (
                      <div className="mt-4">
                        <div className="font-bold text-lg text-[#1D2939]">
                          <span className="ml-8">Overview</span>
                        </div>
                        <div className='text-[#667085] text-sm font-normal break-all ml-8 mt-2 mr-8' dangerouslySetInnerHTML={{
                          __html: selectedContent?.lessonOverView || '',
                        }} />
                      </div>
                    )}
                    {active === 'Discussion' && (
                      <div className="flex flex-col mt-[30px] ml-8 bg-[#FFFFFF] h-auto w-auto overflow-y-auto mr-8 pb-5 border border-solid border-[#EAECF0] rounded-[12px]">
                        {selectedContent?.isDisscusionOpen ? (
                          <Discussion courseId={courseId || ''} sectionId={sectionId} contentId={selectedContent.contentId} />
                        ) : (
                          <p className="pt-4 pb-[-4px] pl-4 text-sm">Discussion forum is not open for this lesson.</p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center h-full">
              <h3 className="text-lg font-semibold text-gray-600">Select a lesson to explore</h3>
            </div>
          )}
          <div className="SideLayout min-w-[300px] flex flex-col bg-[#FFFFFF] overflow-y-auto border-l border-solid border-[#EAECF0]  pb-3 ">
            {sections.map((section, index) => (
              <div key={index} className=" flex flex-col border-b border-solid border-[#EAECF0] ">
                <Collapsible
                  // open={index === 0} // Set the open state based on the isOpenArray
                  key={index}
                  trigger={
                    <div
                      className="h-[60px] flex flex-row justify-between py-2 px-4 items-center hover:bg-[#EAECF0]"
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
                  // transitionTime={350}
                  open={isOpenArray[index]}
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
                              className={`${selectedContent?.contentId === content.contentId ? 'bg-[#F8F0FF]' : 'bg-[#FFFFFF]'} w-auto mx-2 mb-1 rounded-md flex flex-row items-top justify-center gap-2 h-auto py-3 px-4 hover:bg-[#F8F0FF]`}
                              onClick={() => {
                                setSelectedContent(content);
                                setSectionId(section.sectionId);
                              }}
                            >
                              {!isCompleted ? (
                                <Tooltip
                                  content="Mark as Complete"
                                  placement="left"
                                  offset={15}
                                  closeDelay={100}
                                  classNames={{
                                    content: [
                                      "bg-[#222222] text-white text-sm py-2 px-4 rounded-md",
                                    ],
                                  }}
                                >
                                  <Checkbox
                                    size="md"
                                    color="secondary"
                                    radius="full"
                                    isSelected={isCompleted} // This controls if the checkbox is checked or not
                                    onClick={() => handleMarkContentCompleted(content.contentId, section.sectionId, content.StudentsCompleted)}
                                  />
                                </Tooltip>
                              ) : (
                                <Checkbox
                                  size="md"
                                  color="secondary"
                                  radius="full"
                                  isSelected={isCompleted} // This controls if the checkbox is checked or not
                                  onClick={() => handleMarkContentCompleted(content.contentId, section.sectionId, content.StudentsCompleted)}
                                />
                              )}
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
              </div>
            ))}
          </div>
        </>
      ) : (

        <div className="flex flex-col h-full w-full items-center justify-center">
          <h3>You does not have access to this course</h3>
          <button onClick={() => router.back()}><p className="underline text-purple">Go Back</p></button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default Course;
