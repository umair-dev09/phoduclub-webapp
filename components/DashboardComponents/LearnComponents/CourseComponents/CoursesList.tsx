"use client";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { db, auth } from '@/firebase';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { useState, useEffect } from "react";
import LoadingData from "@/components/Loading";
import { onAuthStateChanged } from "firebase/auth";

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
}

interface SectionData {
  sectionName: string;
  contentCount: number; // Number of documents in the 'content' subcollection
}

function CoursesList() {
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

          // Only add courses where the currentUserId is NOT in StudentsPurchased and status is 'live'
          if (courseData.status === 'live') {
            const studentsPurchasedCollection = collection(doc.ref, 'StudentsPurchased');
            const studentDoc = await getDocs(studentsPurchasedCollection);
            const studentPurchased = studentDoc.docs.some(student => student.id === currentUserId);
            if (!studentPurchased) {
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

  if (loading) {
    return <LoadingData />
  }


  return (
    <div className="flex flex-1 flex-row mx-4 gap-7 flex-wrap pr-2">
      {courses.map((course, index) => (
        <div key={index} className="flex items-center justify-center flex-col rounded-lg relative overflow-hidden transition-transform duration-300 w-[300px] h-auto">
          {/* Container for the suggestion badge and course image */}
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
            {/* Course image */}
            <Image className="w-[300px] h-[200px] object-cover border border-[#EAECF0] rounded-tl-lg rounded-tr-lg" src={course.courseImage || "/images/course_img.svg"} alt="Course image" width={300} height={300} />
          </div>

          {/* Container for course details and buy button */}
          <div className="flex w-full flex-col border border-[#EAECF0] border-t-0 bg-white rounded-br-lg rounded-bl-lg">
            {/* Course name and details */}
            <div className="mt-4">
              {/* Course name */}
              <div className="text-lg font-semibold leading-6 ml-4">
                <p>{course.courseName}</p>
              </div>
              {/* Course details: lessons, duration */}
              <div className="text-xs mx-4 font-normal leading-4 text-[#667085] flex items-center gap-1">
                <p>{course.totalContentCount} Lessons</p>
                {/* <span>&#x2022;</span> 
                <p>3hr 14m</p> */}
              </div>
            </div>

            {/* Pricing and buy button */}
            <div className="flex justify-between mt-2 mb-4 mx-4 text-lg font-semibold">
              {/* Price */}
              <div className="flex items-end">
                <h4>&#8377; {course.discountPrice}</h4>
              </div>
              {/* Buy Now button */}
              <div>
                <button className="text-xs font-semibold py-2.5 px-3.5 shadow-inner-button rounded-md bg-[#9012FF]  text-white hover:bg-[#6D0DCC] "
                  onClick={() => handleTabClick(`/learn/courses/purchase/${course.courseName.toLowerCase().replace(/\s+/g, '-')}/?cId=${course.courseId}`)}
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

export default CoursesList;
