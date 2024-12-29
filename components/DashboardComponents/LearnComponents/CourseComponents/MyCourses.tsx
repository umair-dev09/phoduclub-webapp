"use client";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { db, auth } from '@/firebase';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { useState, useEffect } from "react";
import LoadingData from "@/components/Loading";
import { onAuthStateChanged } from "firebase/auth";
import { Progress } from "@nextui-org/progress";

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
}

interface SectionData {
  sectionName: string;
  contentCount: number; // Number of documents in the 'content' subcollection
}

function MyCourses() {
  const [activeTab, setActiveTab] = useState<string>('');
  const router = useRouter();
  const pathname = usePathname();

  const [courses, setCourses] = useState<CourseData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async (currentUserId: string) => {
      const coursesCollection = collection(db, 'course');

      const unsubscribe = onSnapshot(coursesCollection, async (snapshot) => {
        const allCourses: CourseData[] = [];

        for (const doc of snapshot.docs) {
          const courseData = doc.data();

          // Only add courses where the currentUserId is in StudentsPurchased and status is 'live'
          if (courseData.status === 'live') {
            const studentsPurchasedCollection = collection(doc.ref, 'StudentsPurchased');
            const studentDoc = await getDocs(studentsPurchasedCollection);
            const studentPurchased = studentDoc.docs.some(student => student.id === currentUserId);
            if (studentPurchased) {
              const sectionsCollection = collection(doc.ref, 'sections');
              const sectionsSnapshot = await getDocs(sectionsCollection);

              let totalContentCount = 0;

              const sectionsData: SectionData[] = await Promise.all(
                sectionsSnapshot.docs.map(async (sectionDoc) => {
                  const sectionData = sectionDoc.data();
                  const contentCollection = collection(sectionDoc.ref, 'content');
                  const contentSnapshot = await getDocs(contentCollection);

                  const contentCount = contentSnapshot.size;
                  totalContentCount += contentCount;
                  return {
                    sectionName: sectionData.sectionName || 'Untitled Section',
                    contentCount,

                  };
                })
              );

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
              });
            }
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
  }, []);

  const handleTabClick = (path: string) => {
    router.push(path);
  };
  useEffect(() => {
    if (pathname) {
      const currentPath = pathname.split('/')[3];
      if (currentPath === 'insidecourse') {
        setActiveTab('insidecourse');
      }
    }
  }, [pathname]);

  if (loading) {
    return <LoadingData />
  }


  return (
    <>
      {courses.length >= 1 && (
        <div className="flex flex-col">
          <div className='ml-6 mb-4 mt-2'>
            <h3>My Courses</h3>
          </div>
          <div className="flex flex-1 flex-row flex-wrap mx-4 gap-4">
            {/* ----------- Course Component ----------- */}
            {/* Main course container with flex layout and specified dimensions */}
            {courses.map((course, index) => (
              <button key={index} onClick={() => handleTabClick(`/learn/courses/${course.courseName.toLowerCase().replace(/\s+/g, '-')}/?cId=${course.courseId}`)}
                className="flex items-center justify-center flex-col rounded-lg relative overflow-hidden transition-transform duration-300 ease-in-out w-[350px] h-[330px]">
                {/* Course image and suggestion label container */}
                <div className="flex flex-1 h-[60%] items-center flex-col">
                  <Image className=" w-[352px] h-[300px] object-cover border border-[#EAECF0] rounded-tl-lg rounded-tr-lg" src={course.courseImage || "/images/course_img.svg"} alt="Course" width={350} height={300} />
                </div>

                {/* Course details container */}
                <div className="flex w-full h-full max-h-[9.625rem] flex-col bg-white border border-[#EAECF0] border-t-0 rounded-br-lg rounded-bl-lg px-6">

                  {/* Course title and details (lessons, duration) */}
                  <div className="flex h-[60%] items-center flex-col">

                    {/* Course name with a collapse icon */}
                    <div className="flex flex-1 text-lg font-semibold leading-6 w-full items-end justify-between mt-5">
                      <div>
                        <p>{course.courseName}</p>
                      </div>
                      <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                        <button>
                          <Image alt="Collapse Icon Right" src="/icons/collapse-right.svg" width={8} height={8} />
                        </button>
                      </button>
                    </div>

                    {/* Course details - number of lessons and total duration */}
                    <div className="flex flex-1 text-xs font-normal leading-4 text-[#667085] gap-1 items-start w-full justify-start mt-1.5">
                      <p>{course.totalContentCount} Lessons</p>
                      {/* <span>&#x2022;</span>
                            <p>3hr 14m</p> */}
                    </div>
                  </div>

                  {/* Progress bar and additional course info (completion, time left) */}
                  <div className="flex h-[40%] flex-col">
                    {/* Progress bar */}
                    <Progress aria-label="Loading..." className="max-w-md h-2 mt-3" value={43} />

                    {/* Course status - completed percentage and time left */}
                    <div className="flex flex-1 flex-row justify-between mt-2 text-xs pb-3">
                      <div className="flex flex-row gap-1">Completed: <span className="font-semibold">43%</span></div>
                      <div className="flex flex-row gap-1">Time Left: <span className="font-semibold">28 days left</span></div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default MyCourses;
