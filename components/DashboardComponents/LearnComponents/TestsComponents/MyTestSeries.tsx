"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import LoadingData from "@/components/Loading";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebase";
import { collection, getDocs, onSnapshot } from "@firebase/firestore";
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

          // Only process tests that are 'live' and the user has purchased it
          if (testData.status === 'live') {
            const studentsPurchasedCollection = collection(doc.ref, 'StudentsPurchased');
            const studentDoc = await getDocs(studentsPurchasedCollection);
            const studentPurchased = studentDoc.docs.some(student => student.id === currentUserId);

            if (studentPurchased) {
              // Initialize the counters for sections with questions and sections with StudentsAttempted
              let sectionsWithQuestionsCount = 0;
              let sectionsWithStudentsAttemptedCount = 0;

              // Recursive function to count sections with hasQuestions = true and StudentsAttempted subcollection
              const countSectionsWithQuestionsAndAttempts = async (path: string) => {
                const sectionCollection = collection(db, path);
                const sectionSnapshot = await getDocs(sectionCollection);

                // Loop through each section document
                for (const sectionDoc of sectionSnapshot.docs) {
                  const sectionData = sectionDoc.data();

                  // If the section has 'hasQuestions' set to true, increment the questions count
                  if (sectionData.hasQuestions === true) {
                    sectionsWithQuestionsCount += 1;
                  }

                  // Check if the StudentsAttempted subcollection contains the current userId
                  const studentsAttemptedCollection = collection(sectionDoc.ref, 'StudentsAttempted');
                  const studentsAttemptedSnapshot = await getDocs(studentsAttemptedCollection);

                  if (studentsAttemptedSnapshot.docs.some(student => student.id === currentUserId)) {
                    sectionsWithStudentsAttemptedCount += 1;
                  }

                  // Recursively check if the section has sub-sections
                  const subSectionPath = `${path}/${sectionDoc.id}/sections`;
                  await countSectionsWithQuestionsAndAttempts(subSectionPath); // Recurse for sub-collections
                }
              };

              // Start the recursive counting from the root level of sections for this test
              await countSectionsWithQuestionsAndAttempts(`${doc.ref.path}/sections`);

              // Calculate student progress as a percentage
              const studentProgress = sectionsWithQuestionsCount > 0
                ? (sectionsWithStudentsAttemptedCount / sectionsWithQuestionsCount) * 100
                : 0;
              const roundedProgress = Math.round(studentProgress);

              // Push the test data along with the counts and student progress
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
                totalSectionsWithStudentsAttempted: sectionsWithStudentsAttemptedCount,
                studentProgress: roundedProgress, // Add student progress to the test data
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
          setTests([]); // No user logged in
          setLoading(false);
        }
      });

      return () => unsubscribeAuth();
    };

    initialize();
  }, []); // Only trigger once on component mount

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
              <div key={index} className="cursor-pointer"
                onClick={() => handleTabClick(`/learn/test/${test.testName.toLowerCase().replace(/\s+/g, '-')}/?tId=${test.testId}`)}>
                <div className="flex items-center justify-center flex-col rounded-lg relative overflow-hidden transition-transform duration-300 ease-in-out w-[22.333rem] h-[378px] mr-4">

                  {/* Test image and suggestion label container */}
                  <div className="flex w-full h-[50%] items-center flex-col">
                    {/* <div className="flex items-center absolute top-3 left-5 mr-5 bg-[#c74fe6] bg-opacity-80 text-xs font-medium border border-[#c74fe6] text-white rounded-full px-3 py-2 z-10 transition-transform duration-300 ease-in-out">
                            <p>JEE Mains Test</p>
                        </div> */}
                    <Image className="w-[357px] h-[186px]" src={test.testImage || "/images/course_img.svg"} alt="Test" width={357} height={186} />
                  </div>

                  {/* Test details container */}
                  <div className="flex w-full h-full flex-col bg-white border border-[#EAECF0] border-t-0 rounded-br-lg rounded-bl-lg px-6">

                    {/* Test title and details (lessons, duration) */}
                    <div className="flex h-[60%] items-center flex-col">

                      {/* Test name with a collapse icon */}
                      <div className="flex flex-1 text-base font-semibold leading-6 w-full items-center justify-between mt-3">
                        <p>{test.testName || ''}</p>
                        <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                          <button>
                            <Image alt="Collapse Icon Right" src="/icons/collapse-right.svg" width={8} height={8} />
                          </button>
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
