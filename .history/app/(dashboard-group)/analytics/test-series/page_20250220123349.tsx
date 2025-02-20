"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import LoadingData from "@/components/Loading";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebase";
import { collection, getDocs, onSnapshot, doc as firestoreDoc, getDoc } from "@firebase/firestore";
import { Progress } from "@nextui-org/progress";
import React from "react";

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
  score: number;
  attempted: string;
  accuracy: string;
  timeTaken: string;
  testTime: string;
}

function formatTimeInSeconds(seconds: string) {
  if (!seconds) return '-';
  const totalSeconds = Number(seconds);
  const hours = Math.floor(totalSeconds / 3600); // Calculate hours
  const minutes = Math.floor((totalSeconds % 3600) / 60); // Calculate remaining minutes
  let formattedTime = '';

  if (hours > 0) {
    formattedTime += `${hours}h`; // Add hours if present
  }
  if (minutes > 0 || hours === 0) {
    formattedTime += (formattedTime ? ' ' : '') + `${minutes}m`; // Add minutes
  }

  return formattedTime;
}


function TestSeries() {
  const [tests, setTests] = useState<TestData[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchTests = async (currentUserId: string) => {
      const testsCollection = collection(db, 'testseries');

      const unsubscribe = onSnapshot(testsCollection, async (snapshot) => {
        const allTests: TestData[] = [];

        for (const doc of snapshot.docs) {
          const testData = doc.data();

          if (testData.status === 'live') {
            let shouldIncludeTest = false;
            let courseName = '';

            if (testData.isInCourse) {
              const studentsFromCourse = testData.studentsFromCourse || [];
              const studentData = studentsFromCourse.find(
                (student: { id: string; courseId: string }) =>
                  student.id === currentUserId
              );

              if (studentData) {
                shouldIncludeTest = true;
                const courseDocRef = firestoreDoc(db, 'course', studentData.courseId);
                const courseDoc = await getDoc(courseDocRef);
                if (courseDoc.exists()) {
                  courseName = courseDoc.data().courseName || '';
                }
              }
            } else {
              const studentsPurchasedCollection = collection(doc.ref, 'StudentsPurchased');
              const studentDoc = await getDocs(studentsPurchasedCollection);
              shouldIncludeTest = studentDoc.docs.some(student => student.id === currentUserId);
            }

            if (shouldIncludeTest) {
              let sectionsWithQuestionsCount = 0;
              let sectionsWithAttemptsCount = 0;
              let totalScore = 0;
              let totalAttempted = '';
              let totalAccuracySum = 0;
              let totalTimeTakenMinutes = 0;
              let maxTotalTimeMinutes = 0;

              const countSectionsWithQuestionsAndAttempts = async (path: string) => {
                const sectionCollection = collection(db, path);
                const sectionSnapshot = await getDocs(sectionCollection);

                for (const sectionDoc of sectionSnapshot.docs) {
                  const sectionData = sectionDoc.data();

                  if ((sectionData.hasQuestions === true && !sectionData.isParentUmbrellaTest) ||
                    (sectionData.isUmbrellaTest === true && !sectionData.isParentUmbrellaTest)) {
                    sectionsWithQuestionsCount += 1;

                    const attemptsCollection = collection(sectionDoc.ref, 'attempts');
                    const attemptsSnapshot = await getDocs(attemptsCollection);

                    const userAttempts = attemptsSnapshot.docs
                      .filter(attempt => attempt.data().userId === currentUserId)
                      .sort((a, b) => b.data().attemptNumber - a.data().attemptNumber);

                    if (userAttempts.length > 0) {
                      const latestAttempt = userAttempts[0].data();
                      sectionsWithAttemptsCount += 1;
                      // totalScore += latestAttempt.score || 0;

                      // Split attempted questions and add separately
                      const [attempted, total] = (latestAttempt.attemptedQuestions || '0/0').split('/');
                      const currentAttempted = parseInt(attempted || '0');
                      const currentTotal = parseInt(total || '0');
                      totalAttempted = `${parseInt(totalAttempted.split('/')[0] || '0') + currentAttempted}/${parseInt(totalAttempted.split('/')[1] || '0') + currentTotal || '-'}`;

                      // For accuracy, only take number before '/'
                      const scoreValue = parseInt(latestAttempt.score?.split('/')[0] || '-');
                      totalScore += scoreValue;
                      totalAccuracySum += parseInt(latestAttempt.accuracy?.split('%')[0] || '-');
                      totalTimeTakenMinutes += parseInt(latestAttempt.timeTaken || '-');
                      maxTotalTimeMinutes += parseInt(latestAttempt.testTime || '0');
                    }
                  }

                  await countSectionsWithQuestionsAndAttempts(`${path}/${sectionDoc.id}/sections`);
                }
              };

              await countSectionsWithQuestionsAndAttempts(`${doc.ref.path}/sections`);

              const studentProgress = sectionsWithQuestionsCount > 0
                ? (sectionsWithAttemptsCount / sectionsWithQuestionsCount) * 100
                : 0;
              const roundedProgress = Math.round(studentProgress);

              const avgAccuracy = sectionsWithAttemptsCount > 0
                ? Math.round(totalAccuracySum / sectionsWithAttemptsCount)
                : 0;

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
                score: totalScore,
                attempted: totalAttempted || '-',
                accuracy: `${avgAccuracy}%` || '-',
                timeTaken: `${totalTimeTakenMinutes}` || '-',
                testTime: `${maxTotalTimeMinutes}` || '-',
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
    <div className="flex flex-1 flex-col pt-6 mx-8">
      {/* Table Section */}
      <table className="flex flex-col w-full h-min border border-lightGrey rounded-xl bg-white text-sm font-medium">
        <tr className="flex flex-1 py-3 text-neutral-500">
          <td className="w-[30%] px-8">Test</td>
          <td className="w-[15%] text-center"><p>Score</p></td>
          <td className="w-[15%] text-center"><p>Attempted Question</p></td>
          <td className="w-[15%] text-center"><p>Accuracy</p></td>
          <td className="w-[15%] text-center"><p>Time Taken</p></td>
          <td className="w-[15%] text-center"><p>Total Time</p></td>
        </tr>
        {tests.map((test, index) => (
          <button key={index} className="hover:bg-[#F9FAFB] "
            onClick={() => handleTabClick(`/analytics/test-series/${test.testName.toLowerCase().replace(/\s+/g, '-')}/?tId=${test.testId}`)}>

            <tr className="flex flex-1 py-3 border-t border-lightGrey text-[#1D2939]">
              <td className="flex flex-col px-8 w-[30%] text-left">
                <div className="text-sm text-[#9012FF] font-semibold underline">{test.testName}</div>
                <div className="text-[13px] text-[#667085] font-medium">{test.totalSectionsWithQuestions || 0} Tests</div>
              </td>
              <td className="flex justify-center items-center w-[15%]">{test.score}</td>
              <td className="flex justify-center items-center w-[15%]">{test.attempted}</td>
              <td className="flex justify-center items-center w-[15%]">{test.accuracy}</td>
              <td className="flex justify-center items-center w-[15%]">{formatTimeInSeconds(test.timeTaken) || '-'}</td>
              <td className="flex justify-center items-center w-[15%]"><p className="text-end w-16">{formatTimeInSeconds(test.testTime) || '-'}</p></td>
            </tr>

          </button>
        ))}
      </table>

    </div>
  );
}

export default TestSeries;

