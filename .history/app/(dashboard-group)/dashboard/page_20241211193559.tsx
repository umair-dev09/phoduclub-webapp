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

     return (
          <div className=" flex flex-col  flex-1 h-auto overflow-y-auto  p-6">
               <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-4 p-4 w-full max-w-screen-lg">
                    <div className="bg-blue-500 h-32 md:h-40 lg:h-48 rounded-lg flex items-center justify-center text-white text-lg font-bold">Box 1</div>
                    <div className="bg-green-500 h-32 md:h-40 lg:h-48 rounded-lg flex items-center justify-center text-white text-lg font-bold">Box 2</div>
                    <div className="bg-red-500 h-32 md:h-40 lg:h-48 rounded-lg flex items-center justify-center text-white text-lg font-bold">Box 3</div>
                    <div className="bg-yellow-500 h-32 md:h-40 lg:h-48 rounded-lg flex items-center justify-center text-white text-lg font-bold">Box 4</div>
               </div>
          </div>
     );
}
