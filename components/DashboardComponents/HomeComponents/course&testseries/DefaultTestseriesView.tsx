"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import DashboardLoading from "@/components/DashboardLoading";
import { inMemoryPersistence, onAuthStateChanged } from "firebase/auth";
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
            <div className="flex flex-1 items-center justify-center my-24">
                <DashboardLoading />
            </div>
        );
    }

    return (
        <div className="flex flex-1 flex-row mx-0 gap-6 flex-wrap pr-2">
            {tests.slice(0, 2).map((test, index) => (
                <div
                    key={index}
                    className="w-[239px] rounded-lg relative overflow-hidden transition-transform duration-300"
                >
                    <div className="w-full">
                        <div className="flex items-center absolute top-3 left-3 mr-5 bg-[#FFEC45] border border-[#FFEC45] text-xs font-medium rounded-full py-1 px-3 z-10 transition-transform transition-font-size duration-300 ease-in-out">
                            <Image
                                className="mr-[5px]"
                                src="/icons/suggestion_icon.svg"
                                alt="suggestion icon"
                                width={16}
                                height={16}
                            />
                            <p>Suggested for you</p>
                        </div>
                        <Image
                            className="w-full h-[160px] object-cover border border-[#EAECF0] rounded-tl-lg rounded-tr-lg"
                            src={test.testImage || "/images/course_img.svg"}
                            alt="Course image"
                            width={239}
                            height={160}
                        />
                    </div>

                    <div className="w-full border border-[#EAECF0] border-t-0 bg-white rounded-br-lg rounded-bl-lg">
                        <div className="mt-4">
                            <div className="text-base font-semibold leading-6 ml-4">
                                <p>{test.testName}</p>
                            </div>
                            <div className="text-xs mx-4 font-normal leading-[18px] text-[#667085] flex items-center gap-1">
                                <p>{test.totalSectionsWithQuestions} Tests</p>
                            </div>
                        </div>
                        <div className="flex justify-between mt-2 mb-4 mx-4 text-base font-semibold">
                            <div className="flex items-end">
                                <h4>&#8377; {test.discountPrice}</h4>
                            </div>
                            <div>
                                <button
                                    className="text-xs font-semibold leading-5 py-[10px] px-[14px] shadow-inner-button rounded-md bg-[#9012FF] text-white hover:bg-[#6D0DCC] transition-colors"
                                    onClick={() => handleTabClick(`/learn/courses/purchase/${test.testName.toLowerCase().replace(/\s+/g, '-')}/?cId=${test.testId}`)}
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TestSeriesComp;