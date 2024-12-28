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
    discountPrice: number;
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

type UserData = {
    uniqueId: string;
    name: string;
    email: string;
    phone: string;

}

function TestPurchasePage() {
         const router = useRouter();
          const searchParams = useSearchParams();
          const testId = searchParams.get('tId'); 
          const [testData, setTestData] = useState<testData | null>(null); 
          const [loading, setLoading] = useState(true); // Track loading state 
    const [sectionLoading, setSectionLoading] = useState(false);
      const [totalNoOfQuestions, setTotalNoOfQuestions] = useState(0);
      const [totalNoOfTests, setTotalNoOfTests] = useState(0);
    const [testAlreadyPurchased, setTestAlreadyPurchased] = useState(false);
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
                return () => {}; // Return a no-op unsubscribe in case of error
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
       useEffect(() => {
          if (testId && auth.currentUser?.uid) {
            const currentUserId = auth.currentUser.uid;
            const purchasedRef = doc(db, "testseries", testId, "StudentsPurchased", currentUserId);
    
            const checkIfPurchased = async () => {
              try {
                const purchasedSnapshot = await getDoc(purchasedRef);
                if (purchasedSnapshot.exists()) {
                    setTestAlreadyPurchased(true);
                } else {
                    setTestAlreadyPurchased(false);
                }
              } catch (error) {
                console.error("Error checking purchase status:", error);
              }
            };
    
            checkIfPurchased();
          }
        }, [testId, auth.currentUser]);
          

        const handleGoToCourse = () => {
            alert('.');
        };
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
    if(loading) {
    return <LoadingData />;
    }     

    return (
        <div className="contianer flex flex-col pb-5 px-8 w-full h-screen overflow-y-auto">
        <div className="my-5 flex items-center">
          <button className="flex items-center ml-1" onClick={() => router.back()}>
            <div className="text-[#1D2939] h-[24px] w-auto" style={{ fontSize: "16px", fontWeight: "600" }}>
              Tests
            </div>
            <div className="ml-3 w-[24px]">
              <Image src="/icons/course-left.svg" width={6} height={12} alt="left-arrow" />
            </div>
          </button>
          <div className="text-[#667085] h-full w-auto -ml-1" style={{ fontSize: "16px", fontWeight: "500" }}>
            {testData?.testName}
          </div>
        </div>

        {/* Course content */}
        <div className="flex flex-row w-full h-auto items-center gap-4">
            
            <Image
                            className="w-[440px] h-[300px] rounded-[16px] object-cover"
                              src={testData?.testImage || "/icons/image.png"}
                              width={437}
                              height={271}
                              alt="course-image" />
     
          <div className="flex flex-col flex-1 min-h-[300px] h-auto bg-[#FFFFFF] border border-lightGrey rounded-xl justify-center">
            <div className="flex  flex-col h-[105px] p-4">
              <div className='text-[#1D2939] mt-2 ml-2'>
                <h3>{testData?.testName}</h3>
              </div>
              <div className=' text-[#667085] text-sm font-normal break-all ml-2 mt-2' dangerouslySetInnerHTML={{
                  __html: testData?.testDescription || '',
              }}/>
            </div>
            {/* this code below is for rating  */}

            <div className="flex items-center justify-between w-[255px] h-[24px] mt-10 ml-5">
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

            </div>
            {/* ------------------------------------------------------------------------------------------------------------------------------------------------- */}


            <div className="flex items-center justify-between h-full">
              <div className="flex items-center ml-7 mb-7 mt-7 space-x-3">
              <div className="text-[#1D2939] text-2xl font-bold">
                      ₹{testData?.discountPrice && new Intl.NumberFormat('en-IN').format(parseFloat(testData.discountPrice.toString()))}
                      </div>
                      <div className="text-[#667085] text-base font-normal line-through">
                      ₹{testData?.price && new Intl.NumberFormat('en-IN').format(parseFloat(testData.price))}
                      </div>
                      {testData?.price && testData?.discountPrice && (
                          <div className="bg-[#DB6704] w-[76px] h-[25px] flex items-center justify-center rounded-full text-white text-xs font-semibold">
                              {`${Math.round(
                                  ((parseFloat(testData.price) - parseFloat(testData.discountPrice.toString())) /
                                      parseFloat(testData.price)) *
                                      100
                              )}% off`}
                          </div>
                      )}
              </div>


              <div className="m-7">
                {testAlreadyPurchased ? (
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
                  {testAlreadyPurchased ? 'Go to Test' : 'Buy Test'}
                </button>
                ) : (
                   <CashfreeCheckout 
                    amount={testData?.discountPrice || 0}
                    customerName={userData?.name || ''}
                    customerEmail={userData?.email || ''}
                    customerId={userData?.uniqueId || ''}
                    customerPhone={userData?.phone || ''}
                    productType='testseries'
                    productId={testId || ''}
                    userId={userData?.uniqueId || ''}
                    />
                )}
            
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-row gap-3 mt-4 ml-1 mb-2'>
         <p >{totalNoOfTests} Tests</p>
         <p>{totalNoOfQuestions} Questions</p>
        </div>
         <div>
                                     <div className="flex flex-row items-center gap-2 mb-4">
                                                                 <button
                                                                 onClick={resetNavigation}
                                                                   className="font-medium text-[#667085] hover:underline ml-1"
                                                                 >
                                                                   Test Details
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
                                                               ):(
                                                                <>
                                                                  {sectionss.length <= 0 ? (
                                                                        <>
                                                                    <div className="w-full h-auto flex flex-col gap-2 border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-md mb-16 items-center justify-center px-6 py-12">
                                                                    <h3 className="text-base">Nothing is here</h3>
                                                                    </div>   
                                                                    </> 
                                                                ) : (
                                                                <div className='flex flex-col gap-4 pb-12'>
                                                                {sectionss.map((section,index) => (
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
                                                                            <></>
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

        <ToastContainer />
      </div >
    );
}
export default TestPurchasePage; 