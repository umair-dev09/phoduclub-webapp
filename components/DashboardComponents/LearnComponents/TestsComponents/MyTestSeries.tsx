"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
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

        for (const doc of snapshot.docs) {
          const testData = doc.data();

          // Only add tests where the currentUserId is NOT in StudentsPurchased and status is 'live'
          if (testData.status === 'live') {
            const studentsPurchasedCollection = collection(doc.ref, 'StudentsPurchased');
            const studentDoc = await getDocs(studentsPurchasedCollection);
            const studentPurchased = studentDoc.docs.some(student => student.id === currentUserId);
            if (studentPurchased) {
            //   let totalSectionsWithQuestions = 0;

            //   const fetchSectionsCount = async (path: string) => {
            //     const sectionCollection = collection(db, `${path}/sections`);
            //     const sectionSnapshot = await getDocs(sectionCollection);
  
            //     for (const sectionDoc of sectionSnapshot.docs) {
            //       const sectionPath = `${path}/sections/${sectionDoc.id}`;
            //       const questionsCollection = collection(db, `${sectionPath}/Questions`);
            //       const questionsSnapshot = await getDocs(questionsCollection);
  
            //       if (!questionsSnapshot.empty) {
            //         totalSectionsWithQuestions += 1;
            //       }
  
            //       // Recursively fetch sections count for subsections
            //       await fetchSectionsCount(sectionPath);
            //     }
            //   };
  
            //   await fetchSectionsCount(`testseries/${testData.testId}`);
            //   console.log(`Total Sections with Questions: ${totalSectionsWithQuestions}`);
            //   setTotalNoOfTests(totalSectionsWithQuestions);

              allTests.push({
                testName: testData.testName,
                price: testData.price,
                discountPrice: testData.discountPrice,
                testId: testData.testId,
                testImage: testData.testImage,
                status: testData.status,
                testDescription: testData.testDescription,
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
  
    if(loading) {
    return <LoadingData />; 
    }
  
    return (
      <>
      {tests.length >= 1 &&(
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
                    <div className="flex flex-1 h-[50%] items-center flex-col">
                        {/* <div className="flex items-center absolute top-3 left-5 mr-5 bg-[#c74fe6] bg-opacity-80 text-xs font-medium border border-[#c74fe6] text-white rounded-full px-3 py-2 z-10 transition-transform duration-300 ease-in-out">
                            <p>JEE Mains Test</p>
                        </div> */}
                        <Image className="flex w-full h-[300px]" src={ test.testImage || "/images/course_img.svg"} alt="Test" width={300} height={300} />
                    </div>

                    {/* Test details container */}

                    <div className="flex w-full h-full flex-col bg-white border border-[#EAECF0] border-t-0 rounded-br-lg rounded-bl-lg px-6">

                        {/* Test title and details (lessons, duration) */}
                        <div className="flex h-[60%] items-center flex-col">

                            {/* Test name with a collapse icon */}
                            <div className="flex flex-1 text-base font-semibold leading-6 w-full items-center justify-between mt-3">
                                    <p>{test.testName}</p>
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
                                    <div className="flex items-center justify-start font-semibold pl-[2px]">5/10</div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-center text-[#667085]">Expire on</div>
                                    <div className="flex items-center justify-center font-semibold">22 Aug, 2024</div>
                                </div>
                            </div>
                        </div>

                        {/* Progress bar and additional test info (completion, time left) */}
                        <div className="flex flex-1 flex-col justify-evenly">
                            {/* Progress bar */}
                            <div className="flex relative w-full h-2 rounded-full bg-gray-200">
                                <div
                                    className="absolute top-0 left-0 h-2 rounded-full bg-progressPurple"
                                    style={{ width: "43%" }}  // 43% progress is shown
                                ></div>
                            </div>
                            {/* Test status - completed percentage and time left */}
                            <div className="flex flex-row justify-between text-xs w-full">
                                <div className="flex flex-row gap-1">Completed: <span className="font-semibold">43%</span></div>
                            </div>
                        </div>
                    </div>

                </div> {/* End of test component */}
            </div>
          ))}
    
        </div>
        </div>
        )}
        </>
    );
}

export default MyTestSeries;
