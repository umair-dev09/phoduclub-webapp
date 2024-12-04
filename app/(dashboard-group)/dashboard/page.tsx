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
          <div className="homeContainer">
               <div className="topColumn">
                    <div className="progressTracker">
                         <div className="title">
                              <h3>Subject Progress Tracker</h3>
                         </div>
                         <div className="progress">
                              <SubjectComp />
                         </div>
                    </div>
                    <div className="announcementBlock">
                         <div className="title">
                              <h3>Announcements</h3>
                         </div>
                         <div className="announcements">
                              <Announcement />
                         </div>
                    </div>
               </div>
               <div className="bottomColumn">
                    <div className="testSeriesBlock">
                         <div className="title">
                              <h3>Test Series</h3>
                              <button className="viewAll">View all</button>
                         </div>
                         <div className="testSeries">
                              <TestSeries />
                         </div>
                    </div>
                    <div className="course">
                         <div className="title">
                              <h3>Courses</h3>
                              <button className="viewAll">View all</button>
                         </div>
                         <div className="courses">
                              <Course />
                         </div>
                    </div>
               </div>
          </div>
     );
}
