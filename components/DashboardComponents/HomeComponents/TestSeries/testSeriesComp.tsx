"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import LoadingData from "@/components/Loading";
import { inMemoryPersistence, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebase";
import { collection, getDocs, onSnapshot } from "@firebase/firestore";
import { Progress } from "@nextui-org/progress";
import DefaultTestseriesView from '@/components/DashboardComponents/HomeComponents/course&testseries/DefaultTestseriesView';
import MessageLoading from "@/components/MessageLoading";
import DashboardLoading from "@/components/DashboardLoading";

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


function TestSeriesComp() {
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
    return (
         <div className="py-24">
         <DashboardLoading />
         </div>
    );
  }

  return (
    <div>
      {tests.length > 0 ? (
        tests.map((test, index) => (
          <div key={index} className="flex flex-col mt-3 mx-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <h3 className="font-semibold text-lg">{test.testName}</h3>
                {/* <span className="mx-2 text-gray-400 font-semibold">/</span>
                                <p className="font-normal text-gray-800"></p> */}
              </div>
              <button className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-gray-100"
                onClick={() => handleTabClick(`/learn/test/${test.testName.toLowerCase().replace(/\s+/g, '-')}/?tId=${test.testId}`)}>
                <Image alt="Collapse Icon Right" src="/icons/collapse-right.svg" width={8} height={8} />
              </button>
            </div>

            <div className="flex justify-between items-center mt-2">
              <Progress aria-label="Loading..." className="max-w-md h-2" value={test.studentProgress || 0} />
              <span className="text-sm font-medium">{test.studentProgress}%</span>
            </div>

            <div className="flex justify-between mt-6 pb-6 border-b border-gray-200">
              <div className="flex flex-col items-center">
                <p className="text-gray-500 font-sm">Attempted</p>
                <div className="flex items-center">
                  <h3 className="font-semibold text-base">{test.totalSectionsWithStudentsAttempted || 0} / {test.totalSectionsWithQuestions || 0}</h3>
                </div>
              </div>
              {/* <div className="flex flex-col items-center">
                                <p className="text-gray-500 font-sm">Score</p>
                                <div className="flex items-center">
                                    <h3 className="font-semibold">{}</h3>
                                    <h3 className="font-semibold mx-1">/</h3>
                                    <h3 className="font-semibold ">{}</h3>
                                </div>
                            </div> */}
              <div className="flex flex-col items-end">
                <p className="text-gray-500 font-sm ">Time Left</p>
                <h3 className="font-semibold text-base">
                  {formatExpiryDate(test.endDate)}
                </h3>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-wrap justify-between mt-7 mb-1 gap-6 mx-6">
          < DefaultTestseriesView />
        </div>
      )}
    </div>
  );
}

export default TestSeriesComp;