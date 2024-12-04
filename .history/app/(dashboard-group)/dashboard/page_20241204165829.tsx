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
     return (
          <div className=" flex flex-col  flex-1 h-auto overflow-y-auto ">
               <div className="bg-[#FEDAAA] h-[58px] w-full flex flex-row">
                    <div className="flex flex-row items-center justify-center gap-2">
                         <Image
                              src="icons/quiz-02.svg"
                              width={24}
                              height={24}
                              alt="Quiz-Questions-mark-icon" />
                         <h1 className="font-bold text-[#1D2939] text-sm">Quiz competition:</h1>
                         <h1 className="font-normal text-[#1D2939] text-sm">Ready to test your knowledge? Join our quiz competition and compete for exciting prizes!</h1>
                         <div className="w-[87px] h-[32px] flex items-center justify-center bg-[#FFFFFF] rounded-[6px] border border-solid border-[#00000033]">
                              <span className="text-[13px] text-[#1D2939] font-semibold">Join Now</span>
                         </div>
                    </div>
               </div>
               {/* <div className="flex flex-row w-full gap-4 pt-6 px-6">
                    <div className="flex flex-col flex-1 bg-white  rounded-lg h-[327px] w-1/2 ">
                         <div className="flex flex-row justify-between pt-6 px-6 w-full text-[#1D2939] text-lg font-bold">
                              <h3>Subject Progress Tracker</h3>
                         </div>
                         <div className="flex flex-1">
                              <SubjectComp />
                         </div>
                    </div>
                    <div className="flex flex-col flex-1 bg-white  rounded-lg  h-[327px] w-1/2 ">
                         <div className="flex flex-row justify-between pt-6 px-6 w-full text-[#1D2939] text-lg font-bold">
                              <h3>Announcements</h3>
                         </div>
                         <div className="flex items-center justify-center flex-1 overflow-y-auto rounded-b-lg">
                              <Announcement />
                         </div>
                    </div>
               </div>
               <div className="flex flex-row   w-full mt-4 gap-4 px-6 pb-6">
                    <div className="flex flex-col flex-1 bg-white  rounded-lg  h-[327px] w-1/2 ">
                         <div className="flex flex-row justify-between pt-6 px-6 w-full text-[#1D2939] text-lg font-bold">
                              <h3>Test Series</h3>
                              <button className="text-sm font-semibold text-[#7400E0] cursor-pointer">View all</button>
                         </div>
                         <div className="flex justify-center flex-1 overflow-y-auto rounded-b-lg">
                              <TestSeries />
                         </div>
                    </div>
                    <div className="flex flex-col flex-1 bg-white rounded-lg  h-[327px] w-1/2">
                         <div className="flex flex-row justify-between pt-6 px-6 w-full text-[#1D2939] text-lg font-bold">
                              <h3>Courses</h3>
                              <button className="text-sm font-semibold text-[#7400E0] cursor-pointer">View all</button>
                         </div>
                         <div className="flex justify-center flex-1 overflow-y-auto rounded-b-lg">
                              <Course />
                         </div>
                    </div>
               </div> */}

          </div>

     );
}
