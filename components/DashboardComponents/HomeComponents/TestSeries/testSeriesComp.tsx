"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { inMemoryPersistence, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebase";
import { collection, Firestore, getDoc, getDocs, onSnapshot } from "@firebase/firestore";
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

            <div className="flex justify-between items-center mt-2 gap-8">
              <Progress aria-label="Loading..." className="w-full h-2" value={test.studentProgress || 0} />
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

function firestoreDoc(db: Firestore, arg1: string, courseId: any) {
  throw new Error("Function not implemented.");
}
