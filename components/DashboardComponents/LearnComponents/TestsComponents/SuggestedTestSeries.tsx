"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter hook
import LoadingData from "@/components/Loading";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebase";
import { collection, getDocs, onSnapshot } from "@firebase/firestore";

interface TestData {
  testName: string;
  testDescription: string;
  testImage: string;
  price: string;
  discountPrice: string;
  status: string;
  testId: string;
  totalNoOfTests: number;
}


function SuggestedTestSeries() {
  const [tests, setTests] = useState<TestData[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  // const [totalNoOfTests, setTotalNoOfTests] = useState(0);

  useEffect(() => {
    const fetchTests = async (currentUserId: string) => {
      const testsCollection = collection(db, 'testseries');

      const unsubscribe = onSnapshot(testsCollection, async (snapshot) => {
        const allTests: TestData[] = [];

        for (const doc of snapshot.docs) {
          const testData = doc.data();

          // Only add tests where:
          // 1. currentUserId is NOT in StudentsPurchased
          // 2. status is 'live'
          // 3. isInCourse is NOT true
          if (testData.status === 'live' && !testData.isInCourse) {
            const studentsPurchasedCollection = collection(doc.ref, 'StudentsPurchased');
            const studentDoc = await getDocs(studentsPurchasedCollection);
            const studentPurchased = studentDoc.docs.some(student => student.id === currentUserId);
            if (!studentPurchased) {
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

              await fetchSectionsCount(`testseries/${testData.testId}`);
              console.log(`Total Sections with Questions: ${totalSectionsWithQuestions}`);

              allTests.push({
                testName: testData.testName,
                price: testData.price,
                discountPrice: testData.discountPrice,
                testId: testData.testId,
                testImage: testData.testImage,
                status: testData.status,
                testDescription: testData.testDescription,
                totalNoOfTests: totalSectionsWithQuestions,
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
  }, []);


  const handleTabClick = (path: string) => {
    router.push(path);
  };

  if (loading) {
    return <LoadingData />;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className='ml-6 mb-4 mt-5'>
        <h3>Suggested</h3>
      </div>
      <div className="flex flex-1 flex-row mx-4 gap-7 flex-wrap pr-2">
        {tests.length > 0 ? (
          tests.map((test, index) => (
            <div key={index} className="flex items-center justify-center flex-col rounded-lg relative overflow-hidden transition-transform duration-300 w-[300px] h-auto">
              {/* Container for the suggestion badge and test image */}
              <div>
                {/* Suggestion badge with icon and text */}
                <div className="flex items-center absolute top-3 left-3 mr-5 bg-[#FFEC45] text-xs font-medium border border-[#FFEC45] rounded-full py-1 px-3 z-10 transition-transform transition-font-size duration-300 ease-in-out">
                  <Image
                    className="mr-[5px]"
                    src="/icons/suggestion_icon.svg"
                    alt="suggestion icon"
                    width={16}
                    height={16}
                  />
                  <p>Suggested for you</p>
                </div>
                {/* Test image */}
                <Image className="w-[300px] h-[200px] object-cover border border-[#EAECF0] rounded-tl-lg rounded-tr-lg" src={test.testImage || "/images/test_img.svg"} alt="Test image" width={300} height={300} />
              </div>
              {/* Container for test details and buy button */}
              <div className="flex w-full flex-col border border-[#EAECF0] border-t-0 bg-white rounded-br-lg rounded-bl-lg">
                {/* Test name and details */}
                <div className="mt-4">
                  {/* Test name */}
                  <div className="text-lg font-semibold leading-6 ml-4">
                    <p>{test.testName}</p>
                  </div>
                  {/* Test details: lessons, duration */}
                  <div className="text-xs mx-4 font-normal leading-4 text-[#667085] flex items-center gap-1">
                    <p>{test.totalNoOfTests} Tests</p>
                    {/* <span>&#x2022;</span>
                      <p>3hr 14m</p> */}
                  </div>
                </div>
                {/* Pricing and buy button */}
                <div className="flex justify-between mt-2 mb-4 mx-4 text-lg font-semibold">
                  {/* Price */}
                  <div className="flex items-end">
                    <h4>&#8377; {test.discountPrice}</h4>
                  </div>
                  {/* Buy Now button */}
                  <div>
                    <button className="text-xs font-semibold py-2.5 px-3.5 shadow-inner-button rounded-md bg-[#9012FF] border-2 border-[#9012FF] text-white"
                      onClick={() => handleTabClick(`/learn/test/purchase/${test.testName.toLowerCase().replace(/\s+/g, '-')}/?tId=${test.testId}`)}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center m-6 py-12 gap-4">
            <Image src={'/images/A-B-Testing-2--Streamline-Brooklyn.svg'} alt="Image" width={140} height={140} />
            <h4 className="text-base text-[#101828] font-bold leading-6">No Suggestions</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default SuggestedTestSeries;
