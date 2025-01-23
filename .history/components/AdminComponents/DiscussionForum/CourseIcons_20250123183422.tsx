"use client";
import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
import Image from "next/image";

type CourseData = {
  courseName: string | null;
  courseId: string | null;
  courseImage: string | null;
};

function CourseIcons() {
  const [courses, setCourses] = useState<CourseData[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const db = getFirestore();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        console.error("No user is logged in");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserCommunities = async () => {
      const communityRef = collection(db, "course");
      const communitySnapshot = await getDocs(communityRef);

      const userCourses: CourseData[] = [];

      communitySnapshot.forEach((doc) => {
        const course = doc.data();
        userCourses.push({
          courseName: course.courseName,
          courseId: course.courseId,
          courseImage: course.courseImage,
        });
      });

      setCourses(userCourses);
    };

    fetchUserCommunities();
  }, [user, db]);

  const onItemClick = (courseName: string | null, courseId: string | null) => {
    if (courseName && courseId) {
      setSelectedCourseId(courseId);
      router.push(`/admin/discussionform/${courseName.toLowerCase().replace(/\s+/g, "-")}/?cId=${courseId}`);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col justify-start items-center overflow-y-auto  p-4">
        {courses.map((course, index) => (
          <button
            key={index}
            className={`group flex items-center justify-center relative w-[46px] h-[46px] mb-[10px] rounded-full border-2 ${selectedCourseId === course.courseId ? "border-darkPurple" : "border-none hover:border-darkPurple"
              }`}
            onClick={() => onItemClick(course.courseName, course.courseId)}
          >
            <Image
              className="w-10 h-10 rounded-full"
              src={course.courseImage || "/icons/messageIcon.svg"}
              alt="group icon"
              width={42}
              height={42}
              quality={100}
            />
            <div className="absolute top-6 left-6 px-2 py-1 bg-red-600 rounded-full text-white text-xs font-medium hidden group-hover:flex">
              {index + 1}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default CourseIcons;