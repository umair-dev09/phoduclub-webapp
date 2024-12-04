"use client";
import "./dashboard.css"; // Adjust the path if needed
import Announcement from '@/components/DashboardComponents/HomeComponents/Announcement/Announcement';
import SubjectComp from '@/components/DashboardComponents/HomeComponents/SubjectComp/subject';
import TestSeries from '@/components/DashboardComponents/HomeComponents/TestSeries/Testseries';
import Course from '@/components/DashboardComponents/HomeComponents/Course/Course';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import LoadingData from "@/components/Loading";
import { auth } from "@/firebase";
import router from "next/router";

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
     return (
          // <div className="flex flex-col flex-1 overflow-y-auto  h-full px-6">


          //      <div className="flex flex-row flex-1 overflow-y-auto">
          //           <div className="flex flex-col flex-1 bg-white m-2 rounded-lg">
          //                <div className="flex flex-row justify-between pt-6 px-6 w-full text-[#1D2939] text-lg font-bold">
          //                     <h3>Test Series</h3>
          //                     <button className="text-sm font-semibold text-[#7400E0] cursor-pointer">View all</button>
          //                </div>
          //                <div className="flex justify-center flex-1 overflow-y-auto rounded-b-lg">
          //                     <TestSeries />
          //                </div>
          //           </div>
          //           <div className="flex flex-col flex-1 bg-white m-2 rounded-lg">
          //                <div className="flex flex-row justify-between pt-6 px-6 w-full text-[#1D2939] text-lg font-bold">
          //                     <h3>Courses</h3>
          //                     <button className="text-sm font-semibold text-[#7400E0] cursor-pointer">View all</button>
          //                </div>
          //                <div className="flex justify-center flex-1 overflow-y-auto rounded-b-lg">
          //                     <Course />
          //                </div>
          //           </div>
          //      </div>
          // </div>
          <div className=" flex flex-col  flex-1 bg-green-400 h-full">
               <div className="flex flex-row flex-1 w-full">
                    <div className="flex flex-col flex-1 bg-white m-2 rounded-lg w-1/2">
                         <div className="flex flex-row justify-between pt-6 px-6 w-full text-[#1D2939] text-lg font-bold">
                              <h3>Subject Progress Tracker</h3>
                         </div>
                         <div className="flex flex-1">
                              <SubjectComp />
                         </div>
                    </div>
                    <div className="flex flex-col flex-1 bg-white m-2 rounded-lg w-1/2">
                         <div className="flex flex-row justify-between pt-6 px-6 w-full text-[#1D2939] text-lg font-bold">
                              <h3>Announcements</h3>
                         </div>
                         <div className="flex items-center justify-center flex-1 overflow-y-auto rounded-b-lg">
                              <Announcement />
                         </div>
                    </div>
               </div>

          </div>

     );
}
