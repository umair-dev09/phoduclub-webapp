"use client";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { db, auth } from '@/firebase';
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { useState, useEffect } from "react";
import LoadingData from "@/components/Loading";
import { onAuthStateChanged } from "firebase/auth";
import { Progress } from "@nextui-org/progress";
import DefaultView from '@/components/DashboardComponents/HomeComponents/course&testseries/DefaultCourseView';

// Import useRouter hook
interface CourseData {
  courseName: string;
  price: number;
  discountPrice: string;
  courseId: string;
  date: string; // Can be Date type if desired
  courseImage: string;
  status: string;
  publishDate: string;
  sections: SectionData[];
  totalContentCount: number; // Total number of content across all sections
  StudentsPurchased: string[];
  endDate: string;
  totalCompletedContentCount: number; // Total number of completed content across all sections
  studentProgress: number; // Percentage of course completed by student
}

interface SectionData {
  sectionName: string;
  contentCount: number; // Number of documents in the 'content' subcollection
}

function timeLeft(dateString: string) {
  const currentDate = new Date(); // Get current date
  const targetDate = new Date(dateString); // Convert input string to Date object

  // Calculate the difference in time (in milliseconds)
  const differenceInTime = targetDate.getTime() - currentDate.getTime();

  // Convert the time difference from milliseconds to days
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

  // Return the result
  return differenceInDays > 0 ? `${differenceInDays} days left` : 'Ended';
}

function CoursesComp() {
  const router = useRouter();
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async (currentUserId: string) => {
      const coursesCollection = collection(db, 'courses');

      // Filter courses where status is 'live' using Firestore query
      const coursesQuery = query(coursesCollection, where('status', '==', 'live'));
      const unsubscribe = onSnapshot(coursesQuery, async (snapshot) => {
        const allCourses: CourseData[] = [];

        // Fetch courses where the currentUserId is in the StudentsPurchased collection
        for (const doc of snapshot.docs) {
          const courseData = doc.data();

          // Query for the StudentsPurchased collection to check if the current user is enrolled
          const studentsPurchasedQuery = query(collection(doc.ref, 'StudentsPurchased'), where('userId', '==', currentUserId));
          const studentPurchasedSnapshot = await getDocs(studentsPurchasedQuery);

          if (!studentPurchasedSnapshot.empty) {
            // User is enrolled in this course, proceed to fetch sections
            const sectionsCollection = collection(doc.ref, 'sections');
            const sectionsSnapshot = await getDocs(sectionsCollection);

            let totalContentCount = 0;
            let totalCompletedContentCount = 0;

            // Process sections and content within them
            const sectionsData: SectionData[] = await Promise.all(
              sectionsSnapshot.docs.map(async (sectionDoc) => {
                const sectionData = sectionDoc.data();
                const contentCollection = collection(sectionDoc.ref, 'content');
                const contentSnapshot = await getDocs(contentCollection);

                const sectionContentData: { sectionName: string, contentCount: number, completedContentCount: number } = {
                  sectionName: sectionData.sectionName || 'Untitled Section',
                  contentCount: contentSnapshot.size,
                  completedContentCount: 0,
                };

                // Check each content for the currentUserId in StudentsCompleted
                for (const contentDoc of contentSnapshot.docs) {
                  const contentData = contentDoc.data();
                  const studentsCompleted = contentData.StudentsCompleted || [];

                  if (studentsCompleted.includes(currentUserId)) {
                    sectionContentData.completedContentCount += 1;
                    totalCompletedContentCount += 1;
                  }
                }

                totalContentCount += sectionContentData.contentCount;

                return sectionContentData;
              })
            );
            const studentProgress = totalContentCount > 0
              ? (totalCompletedContentCount / totalContentCount) * 100
              : 0;
            const roundedProgress = Math.round(studentProgress);
            allCourses.push({
              courseName: courseData.courseName,
              price: courseData.price,
              discountPrice: courseData.discountPrice,
              courseId: courseData.courseId,
              courseImage: courseData.courseImage,
              StudentsPurchased: courseData.StudentsPurchased,
              status: courseData.status,
              date: courseData.date || '',
              publishDate: courseData.publishDate || '',
              sections: sectionsData,
              totalContentCount,
              totalCompletedContentCount,
              endDate: courseData.endDate || '',
              studentProgress: roundedProgress,
            });
          }
        }

        setCourses(allCourses);
        setLoading(false);
      });

      return () => unsubscribe();
    };

    const initialize = () => {
      setLoading(true);
      const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
        if (user?.uid) {
          fetchCourses(user.uid);
        } else {
          setCourses([]); // No user logged in
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
    return <LoadingData />
  }

  return (
    <div className="space-y-6 px-4 w-full mt-3">
      {courses.length > 0 ? (
        courses.map((course, index) => (
          <div key={index} className="flex flex-col border-b border-gray-200 pb-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg  text-gray-800">
                {course.courseName}
              </h3>
              <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100" onClick={() => handleTabClick(`/learn/courses/${course.courseName.toLowerCase().replace(/\s+/g, '-')}/?cId=${course.courseId}`)}>
                <Image alt="Collapse Icon Right" src="/icons/collapse-right.svg" width={8} height={8} />
              </button>
            </div>

            <div className="flex items-center mt-4">
              <Progress aria-label="Loading..." className="max-w-md h-2" value={course.studentProgress} />
              <span className="ml-4 text-sm font-medium text-gray-600">{course.studentProgress}%</span>
            </div>

            <div className="flex justify-between mt-6">
              <div className="text-center">
                <p className="text-sm text-gray-500">Lessons</p>
                <div className="flex items-center space-x-1">
                  <h3 className="font-semibold text-base">{course.totalCompletedContentCount}</h3>
                  <h3 className="text-base text-gray-500">/</h3>
                  <h3 className="text-base font-semibold">{course.totalContentCount}</h3>
                </div>
              </div>

              <div className="text-end">
                <p className="text-sm text-gray-500">Time Left</p>
                <h3 className="text-base font-semibold">
                  {timeLeft(course.endDate)}
                </h3>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex flex-wrap justify-between mt-4 mb-1 gap-6 mx-2">
          {/* {Array(2)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="flex flex-col flex-1 rounded-lg relative overflow-hidden transition-transform duration-300 h-auto max-w-[calc(50%-12px)]"
              >
                <div>
                  <div className="flex items-center absolute top-3 left-3 bg-[linear-gradient(92deg,rgba(255,255,255,0.5)0%,rgba(255,255,255,0.4)100%)] text-xs font-medium border border-white rounded-full py-1 px-3 z-10">
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
                    src={"/images/course_img.svg"}
                    alt="Course image"
                    width={300}
                    height={300}
                  />
                </div>
                <div className="flex w-full flex-col border border-[#EAECF0] border-t-0 bg-white rounded-br-lg rounded-bl-lg">
                  <div className="mt-4">
                    <div className="text-base font-semibold leading-6 ml-4">
                      <p>Name</p>
                    </div>
                    <div className="text-xs mx-4 font-normal leading-[18px] text-[#667085] flex items-center gap-1">
                      <p>Lessons</p>
                      <span>&#x2022;</span>
                      <p>3hr 14m</p>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 mb-4 mx-4 text-base font-semibold">
                    <div className="flex items-end">
                      <h4>&#8377; 2400</h4>
                    </div>
                    <div>
                      <button
                        className="text-xs font-semibold leading-5 py-[10px] px-[14px] shadow-inner-button rounded-md bg-white border-2 border-[#9012FF] text-[#7400E0] hover:bg-[#F2F4F7] transition-colors"
                      // onClick={() => handleTabClick(`/learn/courses/purchase/${course.courseName.toLowerCase().replace(/\s+/g, '-')}/?cId=${course.courseId}`)}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))} */}
          <DefaultView />
        </div>
      )}
    </div>
  );
}

export default CoursesComp;