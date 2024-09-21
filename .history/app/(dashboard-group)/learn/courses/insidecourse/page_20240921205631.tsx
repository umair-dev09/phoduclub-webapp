"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Discussion from '@/components/DashboardComponents/LearnComponents/CourseComponents/InsideCoursesComp/Discussioncomp/Discussion';
import Video from '@/components/DashboardComponents/LearnComponents/CourseComponents/InsideCoursesComp/VideoComp/Video';
import Read from '@/components/DashboardComponents/LearnComponents/CourseComponents/InsideCoursesComp/ReadComp/Read';
import StartQuiz from '@/components/DashboardComponents/LearnComponents/CourseComponents/InsideCoursesComp/StartQuizComp/StartQuiz';

function sidebutton() {
    const router = useRouter();
    return (
        <div className="flex flex-row w-screen" >
            <div className="MainCourseLayout flex flex-col w-[75%] h-[100vh]  overflow-y-auto py-3">
                {/* THIS IS THE HEADER PART OF MAIN---COURSE-----LAYOUT */}

                <div className="h-[64px]  ml-8 flex items-center ">
                    <div className="my-5 flex items-center">
                        <button className="flex items-center ml-1" onClick={() => router.back()} >
                            <div className="text-[#1D2939] h-[24px] w-auto" style={{ fontSize: "16px", fontWeight: "600" }}>
                                Courses
                            </div>
                            <div className="ml-3 w-[24px]">
                                <Image src="/icons/course-left.svg" width={7} height={12} alt="left-arrow" />
                            </div>
                        </button>
                        <div className="text-[#667085] h-full w-auto -ml-1" style={{ fontSize: "16px", fontWeight: "500" }}>
                            BITSET Full Course
                        </div>
                    </div>

                </div>
                <div className="h-[64px]  ml-8 flex ">
                    <div className="flex flex-col gap-[17px] ">
                        <span className="font-bold text-[#1D2939] text-1g">1. Welcome and Introduction</span>
                        <div className="flex flex-row items-center gap-[12px] ">
                            <span className="font-normal text-sm text-[#1D2939] flex items-center">
                                <Image
                                    src="/icons/read.svg"
                                    width={20}
                                    height={20}
                                    alt="" />
                                <span className="font-semibold text-sm text-[#1D2939] ml-2">3h 20m</span>
                                <span className="ml-1">readings left</span>
                            </span>
                            <span className="font-normal text-sm text-[#1D2939] flex items-center">
                                <Image
                                    src="/icons/vedio.svg"
                                    width={20}
                                    height={20}
                                    alt="" />
                                <span className="font-semibold text-sm text-[#1D2939] ml-2">3h 20m</span>
                                <span className="ml-1">readings left</span>
                            </span>
                            <span className="font-normal text-sm text-[#1D2939] flex items-center">
                                <Image
                                    src="/icons/test.svg"
                                    width={20}
                                    height={20}
                                    alt="" />
                                <span className="font-semibold text-sm text-[#1D2939] ml-2">3h 20m</span>
                                <span className="ml-1">readings left</span>
                            </span>



                        </div>

                    </div>



                </div>



                {/* THIS IS END  */}
                {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
                {/* THIS IS THE MAIN {MIDDLE} PART OF MAIN---COURSE-----LAYOUT */}
                <div className="ml-8 bg-red-500 mr-8 h-[300px] mt-[24px] rounded-md">

                    {/* <div className="flex flex-1">
                        <Read />
                    </div>
                    <div className="flex flex-1">
                        <Video />
                    </div>
                    <div className="flex flex-1">
                        <StartQuiz />
                    </div>
                    <div className="flex flex-1">
                        <Discussion />
                    </div> */}
                </div>
                {/* THIS IS END  */}
                {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

                {/* THIS IS THE FOOTER PART OF MAIN---COURSE-----LAYOUT */}
                <div className="ml-8 h-[60px] mr-8 mt-[20px] rounded-md flex items-center justify-center">
                    <div className="flex flex-row justify-between w-full h-[44px]">
                        <button className="h-full w-[111px] rounded-[8px] bg-[#FFFFFF] opacity-[50%]"
                            style={{ border: "1.5px solid #EAECF0" }}>
                            <span className="font-normal text-sm text-[#1D2939]">Previous</span>
                        </button>
                        <button
                            className="h-full w-[111px] rounded-[8px] bg-[#8501FF] shadow-inner-button  opacity-[50%]"
                            style={{
                                border: "1px solid #800EE2",
                                boxShadow: "0px -4px 4px 0px #1018281F inset, 0px 3px 2px 0px #FFFFFF3D inset",
                            }}
                        >
                            <span className="font-semibold text-sm text-[#FFFFFF]">Next</span>
                        </button>
                    </div>

                </div>
                <div className="ml-8 mr-8 h-[45px]  mt-[20px]  gap-[16px] flex  "
                    style={{ borderBottom: "2px solid #EAECF0" }}
                >
                    <button className="font-medium text-1g text-[#667085] mb-3">
                        Overview
                    </button>
                    <button className="font-medium text-1g text-[#667085] mb-3">
                        Discussion
                    </button>

                </div>



                {/* THIS IS END  */}
                {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

            </div>
            {/* THIS IS SIDE LAYOUT WHERE ALL THE SIDE BUTTONS ARE PLACED */}
            <div className="SideLayout w-[25%] flex flex-col bg-[#FFFFFF] overflow-y-auto p-3">
                {/* THIS IS START OF FIRST BUTTON */}
                <div className="bg-[#F8F0FF] h-[64px] gap-[16px] rounded-[8px]">
                    <button className="flex justify-between">
                        <div className=" flex flex-row mt-3 ml-4">
                            <Image
                                src="/icons/read.svg"
                                width={20}
                                height={20}
                                alt="" />

                        </div>
                        <div className="flex flex-col h-[52px] gap-[4px]  ml-5 mt-2">
                            <span className="gap-[4px] text-1g text-[#1D2939] font-bold">1. Welcome and Introduction</span>
                            <div className="flex flex-row items-center ">
                                <span >
                                    <Image
                                        src="/icons/read.svg"
                                        width={16}
                                        height={16}
                                        alt="" />
                                </span>
                                <span className=" ml-2 text-sm font-normal text-[#667085]">10:00</span>
                            </div>

                        </div>



                    </button>

                </div>
                {/* THIS IS END OF FIRST BUTTON */}



            </div>


        </div>
    )
}
export default sidebutton;