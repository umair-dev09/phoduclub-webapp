"use client";

import Announcement from '@/components/DashboardComponents/HomeComponents/Announcement/Announcement';
import Subject from '@/components/DashboardComponents/HomeComponents/SubjectComp/subject';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import LoadingData from "@/components/Loading";
import { auth, db } from "@/firebase";
import router from "next/router";
import Image from "next/image";
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import CoursesComp from '@/components/DashboardComponents/HomeComponents/Course/coursesComp';
import TestSeriesComp from '@/components/DashboardComponents/HomeComponents/TestSeries/testSeriesComp';

interface NotificationData {
     name: string;
     cta: string;
     notificationIcon: string;
     notificationId: string;
     description: string;
}

export default function DashboardPage() {

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
          <div className='relative flex flex-col w-full h-auto'>
               <div className=" flex flex-col flex-1 h-auto overflow-y-auto  px-6 py-6">
                    <div className="flex flex-row w-full gap-4">
                         <div className="flex flex-col flex-1 bg-white rounded-lg h-[327px] w-full ">
                              <div className="flex flex-row justify-between pt-6 px-6 w-full text-[#1D2939] text-lg font-bold">
                                   <h3 className='text-[#1D2939] font-bold text-lg'>Subject Progress Tracker</h3>
                              </div>
                              <div className="flex flex-1">
                                   <Subject />
                              </div>
                         </div>
                         <div className="flex flex-col flex-1 bg-white pb-4 rounded-lg h-[327px] w-full">
                              <div className="flex flex-row justify-between pt-6 px-6 w-full text-[#1D2939] text-lg font-bold">
                                   <h3 className='text-[#1D2939] font-bold text-lg'>Announcements</h3>
                              </div>
                              <div className='flex flex-1 overflow-y-auto justify-center'>
                                   <Announcement />
                              </div>
                         </div>
                    </div>
                    <div className="flex flex-row w-full mt-4 gap-4">
                         <div className="flex flex-col flex-1 bg-white rounded-lg h-fit max-h-[730px] w-full pb-4">
                              <div className="flex justify-between items-center pt-6 px-6 w-full text-[#1D2939] text-lg font-bold">
                                   <h3 className="font-bold text-lg">Test Series</h3>
                                   <button
                                        className="text-sm font-semibold text-[#7400E0] hover:bg-[#F5F0FF] hover:rounded-full px-3 py-1 transition duration-200 ease-in-out"
                                        onClick={() => router.replace('learn/test')}
                                   >
                                        View all
                                   </button>
                              </div>
                              <div className="flex flex-col flex-1 overflow-y-auto">
                                   <TestSeriesComp />
                              </div>
                         </div>
                         <div className="flex flex-col flex-1 bg-white rounded-lg h-fit max-h-[730px] w-full pb-4">
                              <div className="flex justify-between items-center pt-6 px-6 w-full text-[#1D2939] text-lg font-bold">
                                   <h3 className="font-bold text-lg">Course</h3>
                                   <button
                                        className="text-sm font-semibold text-[#7400E0] hover:bg-[#F5F0FF] hover:rounded-full px-3 py-1 transition duration-200 ease-in-out"
                                        onClick={() => router.replace('learn/courses')}
                                   >
                                        View all
                                   </button>
                              </div>
                              <div className="flex justify-center flex-1 overflow-y-auto rounded-b-lg">
                                   <CoursesComp />
                              </div>
                         </div>
                    </div>
               </div>

               {/* Contained Modal */}
               {/* <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-xl">
                    <div className="bg-white rounded-2xl w-[37.5rem] p-6">
                         <div className="flex flex-col">
                              <div className="flex justify-center mb-4">
                                   <Image src="/images/physicDailogImg.svg" alt="cool image" width={120} height={120} />
                              </div>
                              <div className="text-center mb-6">
                                   <h2 className="text-xl font-bold">Launching Soon!!!!!!!!</h2>
                              </div>
                              <div className="grid grid-cols-2 gap-6 text-base font-medium text-[#1D2939]">
                                   <div className="flex items-start gap-2">
                                        <Image src="/icons/checkmark-circle-02.svg" alt="tick circle" width={24} height={24} />
                                        <p>Detailed Analytics</p>
                                   </div>
                                   <div className="flex items-start gap-2">
                                        <Image src="/icons/checkmark-circle-02.svg" alt="tick circle" width={24} height={24} />
                                        <p>Private Messages</p>
                                   </div>
                                   <div className="flex items-start gap-2">
                                        <Image src="/icons/checkmark-circle-02.svg" alt="tick circle" width={24} height={24} />
                                        <p>Personalised Dashboard</p>
                                   </div>
                                   <div className="flex items-start gap-2">
                                        <Image src="/icons/checkmark-circle-02.svg" alt="tick circle" width={24} height={24} />
                                        <p>Many More</p>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div> */}
          </div>
     );
}
