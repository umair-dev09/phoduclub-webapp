import React, { useEffect, useState } from 'react';
import Image from "next/image";
import TestSeriesStartQuiz from '../TestseriesDialogs/TestSeriesStartQuiz';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';
import LoadingData from '@/components/Loading';

type ReviewProps = {
  name: string;
  description: string;
  testImage: string;
  price: string;
  discountPrice: string;
  rating: string;
  noOfRating: string;
  testId: string;
}
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
  isUmbrellaTest: boolean;

}
interface Question {
  id: string;
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

function Review({ name, testId, description, testImage, price, rating, discountPrice, noOfRating }: ReviewProps) {
  const [isResumeQuizOpen, setIsResumeQuizOpen] = useState(false);
  const openResumeQuiz = () => setIsResumeQuizOpen(true);
  const closeResumeQuiz = () => setIsResumeQuizOpen(false);
  const [sectionss, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalNoOfQuestions, setTotalNoOfQuestions] = useState(0);
  const [totalNoOfTests, setTotalNoOfTests] = useState(0);
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [currentSectionIds, setCurrentSectionIds] = useState<string[]>([]);
  const [breadcrumbs, setBreadcrumbs] = useState<{ id: string; name: string }[]>([]);
  // ----------------------------------------------------------------------------------------
  useEffect(() => {
    if (!testId) return;

    // Fetch sections and subsections in real-time
    const fetchSections = async (): Promise<() => void> => {
      try {
        setLoading(true); // Start loading

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
                    description: subsectionData.description,
                    marksPerQ: subsectionData.marksPerQ,
                    nMarksPerQ: subsectionData.nMarksPerQ,
                    testTime: subsectionData.testTime,
                    Questions: [],
                    isUmbrellaTest: subsectionData.isUmbrellaTest || false,
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
                isUmbrellaTest: sectionData.isUmbrellaTest || false,
              };
            })
          );

          // Sort sections and update state
          setSections(fetchedSections.sort((a, b) => (a.order || 0) - (b.order || 0)));
          setLoading(false); // End loading when data is fetched
        });

        return unsubscribe; // Return unsubscribe function
      } catch (error) {
        console.error('Error fetching sections: ', error);
        setLoading(false); // Ensure loading stops in case of error
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


  return (

    <div className='flex flex-1 flex-col overflow-y-auto w-full '>
      <div className='flex flex-row gap-3 mt-6 mb-4'>
        <h2 className='text-base font-bold text-[#1D2939]'>About Test Series</h2>

      </div>
      {/* Test content */}
      <div className=" flex flex-row gap-5 h-auto ">
        <Image
          className="min-w-[350px] h-[280px] rounded-[16px] object-cover"
          src={testImage || "/icons/image.png"}
          width={437}
          height={271}
          alt="course-image" />
        <div className="flex flex-col gap-4  w-full justify-between bg-[#FFFFFF] p-6 border border-solid border-[#EAECF0] rounded-[16px] ">
          <div className='flex flex-col gap-2'>
            <span className="text-[#1D2939] font-bold text-lg">{name}</span>
            <div className=' text-[#667085] text-sm font-normal break-all' dangerouslySetInnerHTML={{
              __html: description || '',
            }} />
          </div>

          <div className='flex flex-col gap-4'>
            {/* this code below is for rating  */}
            <div className="flex items-center gap-2 flex-row h-[24px] ">
              <RatingStars rating={rating || ''} />
              <div className="text-[#1D2939] text-sm font-bold flex items-center flex-row">
                {rating || 0}
                <span className="text-[#1D2939] font-normal text-sm ml-1">
                  <span className="flex items-center">
                    <span className="inline-block">({noOfRating + '+'}</span>
                    <span className="inline-block">Ratings)</span>
                  </span>
                </span>
              </div>
            </div>
            <div className="flex flex-row  items-center justify-between ">
              <div className='flex flex-row items-center gap-2'>
                <div className="text-[#1D2939] text-2xl font-bold">
                  ₹{discountPrice && new Intl.NumberFormat('en-IN').format(parseFloat(discountPrice))}
                </div>
                <div className="text-[#667085] text-base font-normal line-through">
                  ₹{price && new Intl.NumberFormat('en-IN').format(parseFloat(price))}
                </div>
                {price && discountPrice && (
                  <div className="bg-[#DB6704] w-[76px] h-[25px] flex items-center justify-center rounded-full text-white text-xs font-semibold">
                    {`${Math.round(
                      ((parseFloat(price) - parseFloat(discountPrice)) /
                        parseFloat(price)) *
                      100
                    )}% off`}
                  </div>
                )}

              </div>
              <button className='w-[11.375rem] h-[2.75rem] text-white text-sm font-medium bg-[#9012FF] border border-[#800EE2] rounded-md shadow-inner-button transition-colors duration-150 hover:bg-[#6D0DCC]'>
                Buy Course
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-row w-full my-6 gap-2'>
        <div className='flex flex-col items-start w-full p-4 gap-1 bg-white border border-lightGrey rounded-xl'>
          <p className='text-sm text-[#667085] font-normal'>Test Series starts</p>
          <p className='text-base text-[#1D2939] font-medium'>-</p>
        </div>
        <div className='flex flex-col items-start w-full p-4 gap-1 bg-white border border-lightGrey rounded-xl'>
          <p className='text-sm text-[#667085] font-normal'>Test Series ends</p>
          <p className='text-base text-[#1D2939] font-medium'>-</p>
        </div>
        <div className='flex flex-col items-start w-full p-4 gap-1 bg-white border border-lightGrey rounded-xl'>
          <p className='text-sm text-[#667085] font-normal'>Total Questions</p>
          <p className='text-base text-[#1D2939] font-medium'>{totalNoOfQuestions}</p>
        </div>
      </div>
      <div className='flex flex-col mb-4 gap-2'>
        <div className='flex flex-row gap-2'>
          <h2 className='text-base text-[#1D2939] font-bold'>Test series content</h2>

        </div>
        <div className='flex flex-row gap-2'>
          <Image src='/icons/idea-01.svg' alt='tests' width={20} height={20} />
          <p className='text-base text-[#1D2939] font-normal'>{totalNoOfTests} Tests</p>
        </div>
      </div>
      {/* Sections or Tests Display */}
      <div className="flex flex-row items-center gap-2 mb-4">
        <button
          onClick={resetNavigation}
          className="font-medium text-[#667085] hover:underline ml-1"
        >
          {name}
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
      {loading ? (
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
                <div key={index} className={`${section.hasQuestions || section.isUmbrellaTest? '' : 'cursor-pointer'} flex flex-row items-center justify-between px-6 py-4 bg-white border border-lightGrey rounded-xl`}
                  onClick={() => {
                    if (section.hasQuestions || section.isUmbrellaTest) {
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
                    {(section.hasQuestions || section.isUmbrellaTest) ? (
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
  );
}

export default Review;
