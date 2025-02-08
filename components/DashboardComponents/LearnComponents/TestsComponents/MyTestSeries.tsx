"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import LoadingData from "@/components/Loading";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebase";
import { collection, getDocs, onSnapshot, doc as firestoreDoc, getDoc } from "@firebase/firestore";
import { Progress } from "@nextui-org/progress";

interface TestData {
  testName: string;
  testDescription: string;
  testImage: string;
  price: string;
  discountPrice: string;
  status: string;
  testId: string;
  endDate: string;
  totalSectionsWithQuestions: number;
  totalSectionsWithStudentsAttempted: number;
  studentProgress: number;
  courseName: string;
  isInCourse?: boolean;
}

function formatExpiryDate(inputDate: string) {
  const date = new Date(inputDate); // Create Date object from input string

  // Get the day, month, and year
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' }); // Get abbreviated month (e.g., "Aug")
  const year = date.getFullYear();

  // Format the date as "DD MMM, YYYY"
  return `${day} ${month}, ${year}`;
}

function MyTestSeries() {
  const [tests, setTests] = useState<TestData[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const fetchTests = async (currentUserId: string) => {
      const testsCollection = collection(db, 'testseries');

      const unsubscribe = onSnapshot(testsCollection, async (snapshot) => {
        const allTests: TestData[] = [];

        // Loop through each test in the snapshot
        for (const doc of snapshot.docs) {
          const testData = doc.data();

          // Only process tests that are 'live'
          if (testData.status === 'live') {
            let shouldIncludeTest = false;
            let courseName = '';

            // Check if test is part of a course
            if (testData.isInCourse) {
              // Check if user exists in studentsFromCourse map
              const studentsFromCourse = testData.studentsFromCourse || [];
              const studentData = studentsFromCourse.find(
                (student: { id: string; courseId: string }) =>
                  student.id === currentUserId
              );

              if (studentData) {
                shouldIncludeTest = true;
                // Fetch course name using courseId
                const courseDocRef = firestoreDoc(db, 'course', studentData.courseId);
                const courseDoc = await getDoc(courseDocRef);
                if (courseDoc.exists()) {
                  courseName = courseDoc.data().courseName || '';
                }
              }
            } else {
              // Check individual purchase using StudentsPurchased collection
              const studentsPurchasedCollection = collection(doc.ref, 'StudentsPurchased');
              const studentDoc = await getDocs(studentsPurchasedCollection);
              shouldIncludeTest = studentDoc.docs.some(student => student.id === currentUserId);
            }

            if (shouldIncludeTest) {
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

              allTests.push({
                testName: testData.testName,
                price: testData.price,
                discountPrice: testData.discountPrice,
                testId: testData.testId,
                testImage: testData.testImage,
                status: testData.status,
                testDescription: testData.testDescription,
                endDate: testData.endDate,
                totalSectionsWithQuestions: sectionsWithQuestionsCount,
                totalSectionsWithStudentsAttempted: sectionsWithAttemptsCount,
                studentProgress: roundedProgress,
                isInCourse: testData.isInCourse,
                courseName: courseName,
              });
            }
          }
        }

        setTests(allTests);
        setLoading(false);
      });

      return () => unsubscribe();
    };

    const initialize = () => {
      setLoading(true);
      const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
        if (user?.uid) {
          fetchTests(user.uid);
        } else {
          setTests([]);
          setLoading(false);
        }
      });

      return () => unsubscribeAuth();
    };

    initialize();
  }, []);

  const handleTabClick = (path: string) => {
    router.push(path);
  };

  if (loading) {
    return <LoadingData />;
  }

  return (
    <>
      {tests.length >= 1 && (
        <div className="flex flex-col">
          <div className='ml-6 mb-4 mt-2'>
            <h3>My Tests</h3>
          </div>
          <div className="flex flex-1 flex-row flex-wrap mx-4 gap-4">
            {/* ----------- Test Component ----------- */}
            {/* Main test container with flex layout and specified dimensions */}
            {tests.map((test, index) => (
              <div key={index} className="cursor-pointer group"
                onClick={() => handleTabClick(`/learn/test/${test.testName.toLowerCase().replace(/\s+/g, '-')}/?tId=${test.testId}`)}>
                <div className="flex items-center justify-center flex-col rounded-lg relative overflow-hidden transition-transform duration-300 ease-in-out w-[22.333rem] h-[378px]">

                  {/* Test image and suggestion label container */}
                  <div className="flex w-full h-[50%] items-center flex-col">
                    {test.isInCourse && (
                      <div className="flex items-center absolute top-3 left-5 mr-5 bg-[#c74fe6] bg-opacity-80 text-xs font-medium border border-[#c74fe6] text-white rounded-full px-3 py-2 z-10 transition-transform duration-300 ease-in-out">
                        <p>{test.courseName}</p>
                      </div>
                    )}
                    <Image className="w-full h-[300px] border border-lightGrey rounded-t-md overflow-hidden group-hover:opacity-85 transition-opacity duration-150 object-cover" src={test.testImage || "/images/course_img.svg"} alt="Test" width={300} height={300} />
                  </div>
                  {/* Test details container */}
                  <div className="flex w-full h-full flex-col bg-white border-x border-b border-[#EAECF0] rounded-br-lg rounded-bl-lg px-6 group-hover:bg-[#F9FAFB] transition-opacity duration-150">

                    {/* Test title and details (lessons, duration) */}
                    <div className="flex h-[60%] items-center flex-col">

                      {/* Test name with a collapse icon */}
                      <div className="flex flex-1 text-base font-semibold leading-6 w-full items-center justify-between mt-3">
                        <p>{test.testName || ''}</p>
                        <button className="w-[32px] h-[32px] rounded-full flex items-center justify-center">
                          <Image alt="Collapse Icon Right" src="/icons/collapse-right.svg" width={8} height={8} />
                        </button>
                      </div>

                      {/* Test details - number of lessons and total duration */}
                      <div className="flex flex-1 text-xs font-normal leading-4 gap-1 items-center w-full justify-between">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-center text-[#667085]">Attempted</div>
                          <div className="flex items-center justify-start font-semibold pl-[2px]">{test.totalSectionsWithStudentsAttempted || 0}/{test.totalSectionsWithQuestions || 0}</div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center justify-center text-[#667085]">Expire on</div>
                          <div className="flex items-center justify-center font-semibold">{formatExpiryDate(test.endDate)}</div>
                        </div>
                      </div>
                    </div>

                    {/* Progress bar and additional test info (completion, time left) */}
                    <div className="flex flex-1 flex-col justify-evenly">
                      {/* Progress bar */}
                      <Progress aria-label="Loading..." className="max-w-md h-2 mt-3" value={test.studentProgress || 0} />

                      {/* Test status - completed percentage and time left */}
                      <div className="flex flex-row justify-between text-xs w-full">
                        <div className="flex flex-row gap-1">Completed: <span className="font-semibold">{test.studentProgress || 0}%</span></div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End of test component */}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default MyTestSeries;
