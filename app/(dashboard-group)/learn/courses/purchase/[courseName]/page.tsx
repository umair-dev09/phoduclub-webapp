"use client";
import Image from 'next/image';
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import Collapsible from 'react-collapsible';
import { getDoc, doc, updateDoc, collection, onSnapshot, query, getDocs, arrayUnion, setDoc } from "firebase/firestore";
import { db, auth } from "@/firebase"; // Adjust the path based on your project setup
import LoadingData from '@/components/Loading';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CashfreeCheckout from '@/components/CashfreeCheckout';

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
  }

type CourseData = {
    courseName: string | null;
    courseDescription: string | null;
    courseImage: string | null;
    price: string | null;
    discountPrice: number;
    rating: string | null;
    noOfRating: string | null;
    status: string | null;
    StudentsPurchased: string[];
}; 
type UserData = {
    uniqueId: string;
    name: string;
    email: string;
    phone: string;

}

const StarIcon: React.FC<{ filled: boolean; isHalf: boolean }> = ({ filled, isHalf }) => (
    <Image
        src={filled ? (isHalf ? "/icons/half-star.svg" : "/icons/full-star.svg") : "/icons/empty-star.svg"}
        width={20}
        height={20}
        alt={isHalf ? "half star" : filled ? "full star" : "empty star"}
    />
);

const totalStars = 5;

const RatingStars: React.FC<{ rating: string | null }> = ({ rating }) => {
    // Parse rating and ensure it's a valid number
    const parsedRating = parseFloat(rating || "0");
    const wholeStars = Math.floor(parsedRating); // Count of full stars
    const hasHalfStar = parsedRating % 1 >= 0.1 && parsedRating % 1 < 0.9; // Half star condition
    const emptyStars = totalStars - wholeStars - (hasHalfStar ? 1 : 0); // Remaining empty stars

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


export default function CoursePurchasePage() {
      const router = useRouter();
      const searchParams = useSearchParams();
      const courseId = searchParams.get('cId'); 
      const [courseData, setCourseData] = useState<CourseData | null>(null); 
      const [loading, setLoading] = useState(true); // Track loading state 
      const [sections, setSections] = useState<Sections[]>([]);
      const [courseAlreadyPurchased, setCourseAlreadyPurchased] = useState(false);
      const [userData, setUserData] = useState<UserData | null>(null);

      useEffect(() => {
        const fetchUserData = async () => {
          if (auth.currentUser?.uid) {
        const userId = auth.currentUser.uid;
        try {
          const userDocRef = doc(db, "users", userId);
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
        if (courseData?.StudentsPurchased && auth.currentUser?.uid) {
          const currentUserId = auth.currentUser.uid;
      
          // Check if currentUserId exists in StudentsPurchased array
          const isPurchased = courseData.StudentsPurchased.includes(currentUserId);
      
          if (isPurchased) {
            setCourseAlreadyPurchased(true);
          } else {
            setCourseAlreadyPurchased(false);
          }
        }
      }, [courseData, auth.currentUser]);

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
      
    
      const [isOpenArray, setIsOpenArray] = useState([false, false, false]); // Initialize with false for each collapsible
    
      // Function to toggle a specific collapsible's state
      const toggleCollapsible = (index: number) => {
        const newIsOpenArray = [...isOpenArray];
        newIsOpenArray[index] = !newIsOpenArray[index]; // Toggle the specific index
        setIsOpenArray(newIsOpenArray);
      };
    
      const formatDuration = (duration: number) => {
        if(duration){
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = Math.floor(duration % 60);
    
        return hours > 0
            ? `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
            : `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
        else{
            return '00:00';
        }
    };
    
    // const handlePurchaseCourse = async () => {
    //     if (courseId && auth.currentUser?.uid) {
    //       try {
    //         const currentUserId = auth.currentUser.uid;
      
    //         // Reference to the main course document
    //         const courseRef = doc(db, 'course', courseId);
      
    //         // Reference to the StudentsPurchased subcollection
    //         const studentsPurchasedRef = doc(
    //           db,
    //           'course',
    //           courseId,
    //           'StudentsPurchased',
    //           currentUserId
    //         );
      
    //         // Add userId to StudentsPurchased array in the course document
    //         await updateDoc(courseRef, {
    //           StudentsPurchased: arrayUnion(currentUserId), // Add currentUserId to the array
    //         });
      
    //         // Add document to the StudentsPurchased subcollection
    //         const enrollmentData = {
    //           userId: currentUserId,
    //           enrollmentType: 'paid',
    //           enrollmentDate: new Date().toISOString(), // Current date and time
    //         };
    //         await setDoc(studentsPurchasedRef, enrollmentData);
      
    //         toast.success('Course purchased successfully!');
    //         router.replace('/learn/courses')
    //       } catch (error) {
    //         console.error('Error updating course document:', error);
    //         toast.error('Failed to purchase course');
    //       }
    //     } else {
    //       toast.error('Invalid course or user');
    //     }
    //   };
    
      const openPaymentGateway= () => {
         router.push(`/payment`);
      };
    
      const handleGoToCourse = () => {
          alert('Yes');
      };
      

      if(loading){
        return <LoadingData />
    } 

    return (
        <div className="contianer flex flex-col pb-5 px-8 w-full h-screen overflow-y-auto">
          <div className="my-5 flex items-center">
            <button className="flex items-center ml-1" onClick={() => router.back()}>
              <div className="text-[#1D2939] h-[24px] w-auto" style={{ fontSize: "16px", fontWeight: "600" }}>
                Courses
              </div>
              <div className="ml-3 w-[24px]">
                <Image src="/icons/course-left.svg" width={6} height={12} alt="left-arrow" />
              </div>
            </button>
            <div className="text-[#667085] h-full w-auto -ml-1" style={{ fontSize: "16px", fontWeight: "500" }}>
              {courseData?.courseName}
            </div>
          </div>
  
          {/* Course content */}
          <div className="flex flex-row w-full h-auto items-center gap-4">
              
              <Image
                              className="w-[440px] h-[300px] rounded-[16px] object-cover"
                                src={courseData?.courseImage || "/icons/image.png"}
                                width={437}
                                height={271}
                                alt="course-image" />
       
            <div className="flex flex-col flex-1 min-h-[300px] h-auto bg-[#FFFFFF] border border-lightGrey rounded-xl justify-center">
              <div className="flex  flex-col h-[105px] p-4">
                <div className='text-[#1D2939] mt-2 ml-2'>
                  <h3>{courseData?.courseName}</h3>
                </div>
                <div className=' text-[#667085] text-sm font-normal break-all ml-2 mt-2' dangerouslySetInnerHTML={{
                    __html: courseData?.courseDescription || '',
                }}/>
              </div>
              {/* this code below is for rating  */}
  
              <div className="flex items-center justify-between w-[255px] h-[24px] mt-10 ml-5">
              <div className="flex items-center gap-2 flex-row h-[24px] ">
                      <RatingStars rating={courseData?.rating || ''} />
                        <div className="text-[#1D2939] text-sm font-bold flex items-center flex-row">
                            {courseData?.rating || 0}
                            <span className="text-[#1D2939] font-normal text-sm ml-1">
                                <span className="flex items-center">
                                    <span className="inline-block">({courseData?.noOfRating + '+'}</span>
                                    <span className="inline-block">Ratings)</span>
                                </span>
                            </span>
                        </div>
                    </div>

              </div>
              {/* ------------------------------------------------------------------------------------------------------------------------------------------------- */}
  
  
              <div className="flex items-center justify-between h-full">
                <div className="flex items-center ml-7 mb-7 mt-7 space-x-3">
                <div className="text-[#1D2939] text-2xl font-bold">
                        ₹{courseData?.discountPrice && new Intl.NumberFormat('en-IN').format(parseFloat(courseData.discountPrice.toString()))}
                        </div>
                        <div className="text-[#667085] text-base font-normal line-through">
                        ₹{courseData?.price && new Intl.NumberFormat('en-IN').format(parseFloat(courseData.price))}
                        </div>
                        {courseData?.price && courseData?.discountPrice && (
                            <div className="bg-[#DB6704] w-[76px] h-[25px] flex items-center justify-center rounded-full text-white text-xs font-semibold">
                                {`${Math.round(
                                    ((parseFloat(courseData.price) - parseFloat(courseData.discountPrice.toString())) /
                                        parseFloat(courseData.price)) *
                                        100
                                )}% off`}
                            </div>
                        )}
                </div>
  
  
                <div className="m-7">
                  {courseAlreadyPurchased ? (
                    <button
                    className="text-white text-sm font-semibold py-3 px-6 rounded-md shadow-inner-button"
                    style={{
                      width: "182px",
                      height: "44px",
                      backgroundColor: "#9012FF",
                      borderWidth: "1px 0 0 0",
                      borderColor: "#9012FF",
                    }}
                    // onClick={ courseAlreadyPurchased ? 
                    //     handleGoToCourse  : handlePurchaseCourse}
                    onClick={handleGoToCourse}
                  >
                    {courseAlreadyPurchased ? 'Go to Course' : 'Buy Course'}
                  </button>
                  ) : (
                     <CashfreeCheckout 
                      amount={courseData?.discountPrice || 0}
                      customerName={userData?.name || ''}
                      customerEmail={userData?.email || ''}
                      customerId={userData?.uniqueId || ''}
                      customerPhone={userData?.phone || ''}
                      productType='course'
                      productId={courseId || ''}
                      />
                  )}
              
                </div>
              </div>
            </div>
          </div>
  
          {/* Course content */}
          <div className='flex flex-col  my-4'>
            <div className='ml-2'>
              <div className='mt-4 text-[#1D2939]'>
                <h3>Course content</h3>
              </div>
              <div className='flex flex-row mt-3 text-xs'>
                <div className='flex flex-row'>
                  <div className='mr-2'>
                    <Image src="/icons/read.svg" alt="learn-icon" width={20} height={20} />
                  </div>
                  <div className='mr-3 font-normal text-sm text-[#1D2939]'>{sections.reduce((total, section) => total + (section.content?.length || 0), 0)} Lessons</div>
                </div>
                <div className='flex flex-row'>
                  <div className='mr-2'>
                    <Image src="/icons/vedio.svg" alt="video-icon" width={20} height={20} />
                  </div>
                  <div className='mr-3 font-normal text-sm text-[#1D2939]'>{sections.reduce(
                                (total, section) =>
                                total + (section.content?.filter((item) => item.type === 'Video').length || 0),
                                0
                            )} Videos</div>
                </div>
                <div className='flex flex-row'>
                  <div className='mr-2'>
                    <Image src="/icons/test.svg" alt="test-icon" width={20} height={20} />
                  </div>
                  <div className='mr-3 font-normal text-sm text-[#1D2939]'>{sections.reduce(
                                (total, section) =>
                                total + (section.content?.filter((item) => item.type === 'Quiz').length || 0),
                                0
                            )} Quizzes</div>
                </div>
              </div>
            </div>
          </div>
          {/* Accordian for Lessons */}
          <div className="gap-2 flex flex-col mb-28">
          {sections.map((section, index)  => (   
                      <div key={index} className='bg-white border border-lightGrey rounded-xl'>
                      <Collapsible 
                        className='flex flex-col'
                        trigger={
                          <div className=''>
                            <div
                              className="flex items-center justify-between h-[56px] mx-5 relative"
                              onClick={() => toggleCollapsible(0)} // Toggle first accordion
                            >
                              <p className="text-base font-bold">Lesson {index + 1}: {section.sectionName}</p>
                              <Image
                                src={isOpenArray[0] ? "/icons/arrowdown.svg" : "/icons/arrowup.svg" } // Arrow based on first accordion state
                                width={24}
                                height={24}
                                alt="arrow"
                              />
                            </div>
                          </div>
                        }
                        transitionTime={350}
                        onOpening={() => toggleCollapsible(0)}  // Set the state to open when expanding
                        onClosing={() => toggleCollapsible(0)} // Set the state to closed when collapsing
                      >
                        <div className='border-t border-lightGrey'>
                        {section.content && section.content.length > 0 ? (
                             <>
                                 {section.content?.map((content, index) =>  (
                        <div key={index} >
                            <div className="mx-5 my-5">
                                <div className="text-base font-medium">{index + 1}. {content.lessonHeading}</div>
                                {content.type === 'Text' &&(
                                <div className="flex flex-row text-sm font-normal it">
                                <Image className='mr-1'
                                    src="/icons/read.svg"
                                    alt="test-icon"
                                    width={16}
                                    height={16} />
                                <div>---</div>
                                </div>
                                 )}
                                {content.type === 'Video' &&(
                                <div className="flex flex-row text-sm font-normal it">
                                <Image className='mr-1'
                                    src="/icons/vedio.svg"
                                    alt="video-icon"
                                    width={16}
                                    height={16} />
                                <div>{formatDuration(content.videoDuration) || '00:00'}</div>
                                </div>
                                 )} 
                                 {content.type === 'Quiz' &&(
                                <div className="flex flex-row text-sm font-normal it">
                                <Image className='mr-1'
                                    src="/icons/test.svg"
                                    alt="video-icon"
                                    width={16}
                                    height={16} />
                                <div>{content.questionsCount} Questions</div>
                                </div>
                                 )}  
                               
                            </div>
                        </div>
                        ))}
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
          <ToastContainer />
        </div >
    );
}