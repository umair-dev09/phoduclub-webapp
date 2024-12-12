"use client";

import Announcement from '@/components/DashboardComponents/HomeComponents/Announcement/Announcement';
import Subject from '@/components/DashboardComponents/HomeComponents/SubjectComp/subject';
import TestSeries from '@/components/DashboardComponents/HomeComponents/TestSeries/Testseries';
import Course from '@/components/DashboardComponents/HomeComponents/Course/Course';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import LoadingData from "@/components/Loading";
import { auth } from "@/firebase";
import router from "next/router";
import Image from "next/image"

export default function AnalyticsPage() {

     const router = useRouter();
     const [loading, setLoading] = useState(true);

     onAuthStateChanged(auth, (user) => {
          if (!user) {
               router.push("/login");
          }
          else {
               setLoading(false);
          }
     });

     if (loading) {
          return (
               <LoadingData />
          );
     }

     const [isCourseExpanded, setCourseExpanded] = useState(false);
     const someOtherState = useState(false); // Example
     const handleCourseViewAll = () => {
          setCourseExpanded((prevState) => !prevState);
     };


     return (
          <div className="flex flex-col flex-1 h-auto overflow-y-auto p-6">
               {!isCourseExpanded && (
                    <div className="flex flex-row w-full gap-4">
                         {/* Render Subject Progress Tracker */}
                    </div>
               )}
               <div
                    className={`flex flex-row w-full mt-4 gap-4 transition-all duration-300 ${isCourseExpanded ? "h-full" : "h-[327px]"
                         }`}
               >
                    <div className={`flex flex-col flex-1 bg-white rounded-lg ${isCourseExpanded ? "hidden" : "block"}`}>
                         {/* Render Test Series */}
                    </div>
                    <div
                         className={`flex flex-col flex-1 bg-white rounded-lg transition-all duration-300 ${isCourseExpanded ? "h-full" : "h-[327px]"
                              }`}
                    >
                         <div className="flex flex-row justify-between pt-6 px-6 w-full text-[#1D2939] text-lg font-bold">
                              <h3 className="text-[#1D2939] font-bold text-lg">Courses</h3>
                              <button
                                   className="text-sm font-semibold text-[#7400E0] cursor-pointer"
                                   onClick={handleCourseViewAll}
                              >
                                   {isCourseExpanded ? "Collapse" : "View all"}
                              </button>
                         </div>
                         <div className="flex justify-center flex-1 overflow-y-auto rounded-b-lg">
                              {/* Render Course */}
                         </div>
                    </div>
               </div>
          </div>
     );
}
