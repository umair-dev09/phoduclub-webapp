"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Discussion from '@/components/DashboardComponents/LearnComponents/CourseComponents/InsideCoursesComp/Discussioncomp/Discussion';
import Video from '@/components/DashboardComponents/LearnComponents/CourseComponents/InsideCoursesComp/VideoComp/Video';
import Read from '@/components/DashboardComponents/LearnComponents/CourseComponents/InsideCoursesComp/ReadComp/Read';
import StartQuiz from '@/components/DashboardComponents/LearnComponents/CourseComponents/InsideCoursesComp/StartQuizComp/StartQuiz';
import { useState } from "react";
import { Checkbox } from "@nextui-org/react";

function sidebutton() {
    const router = useRouter();
    const [activeComponent, setActiveComponent] = useState<string>('Read');
    const [activetab, setActiveTab] = useState<string>('overview')
    const [hoverRead, setHoverRead] = useState(false);
    const [hoverVideo, setHoverVideo] = useState(false);
    const [hoverStartQuiz, setHoverStartQuiz] = useState(false);

    const [iconCheckmarkRead, setIconCheckmarkRead] = useState<string | null>(null);
    const [iconCheckmarkVideo, setIconCheckmarkVideo] = useState({});
    const [iconCheckmarkStartQuiz, setIconCheckmarkStartQuiz] = useState({});
    // Function to toggle the icon to a checkmark



    return (
        <div className="flex flex-row w-screen" >
            <div className="MainCourseLayout flex flex-col w-[75%]  overflow-y-auto pt-3 pb-7">
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

                {activeComponent != 'StartQuiz' && (

                    <div className="flex flex-col gap-[17px] ml-8">
                        <span className="font-bold text-[#1D2939] text-1g">1. Welcome and Introduction</span>

                    </div>


                )}







                {/* THIS IS END  */}
                {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
                {/* THIS IS THE MAIN {MIDDLE} PART OF MAIN---COURSE-----LAYOUT */}
                <div className="mr-8 mt-[24px] rounded-md flex flex-col h-auto w-auto ">
                    {activeComponent === 'Read' && <Read />}
                    {activeComponent === 'Video' && <Video />}
                    {activeComponent === 'StartQuiz' && <StartQuiz />}
                </div>
                {/* THIS IS END  */}
                {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

                {/* THIS IS THE FOOTER PART OF MAIN---COURSE-----LAYOUT */}
                {activeComponent != 'StartQuiz' && (
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
                )}

                {activeComponent != 'StartQuiz' && (
                    <div>
                        <div className="ml-8 mr-8 h-[45px]  mt-[20px]  gap-[16px] flex  "
                            style={{ borderBottom: "2px solid #EAECF0" }}
                        >
                            <button
                                className="font-medium text-1g text-[#667085] mb-3"
                                onClick={() => setActiveTab('overview')}
                            >
                                <span className={`hover:text-[#8501FF] ${activetab === 'overview' ? 'text-[#8501FF]' : ''}`}>
                                    Overview
                                </span>
                            </button>
                            <button className="font-medium text-1g text-[#667085] mb-3 "
                                onClick={() => setActiveTab('Discussion')}>
                                <span className={`hover:text-[#8501FF] ${activetab === 'Discussion' ? 'text-[#8501FF]' : ''}`}>
                                    Discussion
                                </span>
                            </button>

                        </div>





                        {activetab == 'overview' && (
                            <div className="mt-4">
                                <div className=" font-bold text-1g text-[#1D2939] ">
                                    <span className="ml-8"> Overview</span>
                                </div>
                                <div className="font-normal text-sm text-[#667085] leading-relaxed mt-4">
                                    <p className="ml-8">Gray Code is a binary numeral system where two successive values differ by only one bit, which is useful in error correction and minimizing transitions in digital circuits. We'll cover how to convert binary numbers to Gray Code and vice versa, and discuss practical applications such as reducing error rates in digital communications and simplifying logic circuits. Next, we'll delve into efficient computation with bitsets, highlighting their memory efficiency and rapid bitwise operations. We'll see how bitsets can represent large sets and facilitate fast membership testing, and demonstrate their implementation in C++, including operations like set, reset, flip, and advanced set operations like intersection and union.</p>
                                </div>
                            </div>
                        )}
                        {activetab == 'Discussion' && (
                            <div className="flex flex-col mt-[30px] ml-8 bg-[#FFFFFF] h-auto w-auto overflow-y-auto mr-8 pb-5 border border-solid border-[#EAECF0] rounded-[12px]">
                                <Discussion />
                            </div>
                        )}
                    </div>
                )}





                {/* THIS IS END  */}
                {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

            </div>
            {/* THIS IS SIDE LAYOUT WHERE ALL THE SIDE BUTTONS ARE PLACED */}
            <div className="SideLayout w-[25%] flex flex-col bg-[#FFFFFF] overflow-y-auto p-3">
                {/* THIS IS START OF FIRST BUTTON */}

                <div className="gap-[20px] flex flex-col">
                    <button
                        onClick={() => setActiveComponent('Read')}
                        onMouseEnter={() => setHoverRead(true)}
                        onMouseLeave={() => setHoverRead(false)}>
                        <div className={`gap-[16px] rounded-[8px]  hover:bg-[#F8F0FF] ${activeComponent === 'Read' ? 'bg-[#F8F0FF]' : 'bg-[#FFFFFF]'}`}>
                            <button className="flex justify-between 
                        ">
                                <div className=" flex flex-row mt-3 ml-4">

                                    <button
                                        className="icon-button" // Added a button specifically for the icon
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent event from bubbling to the outer button
                                            setIconCheckmarkRead('Read'); // Trigger icon change to checkmark
                                        }} // Trigger icon change to checkmark on click
                                    >
                                        {iconCheckmarkRead === 'Read' ? (

                                            <input
                                                type="checkbox"
                                                className="w-5 h-5 rounded-full cursor-pointer flex items-center justify-center checked:bg-[#0B9055] "
                                                checked={iconCheckmarkRead === 'Read'}
                                                onChange={() => setIconCheckmarkRead(null)} // To remove checkmark when clicked again
                                            />
                                        ) : (
                                            <Image
                                                src={hoverRead || activeComponent === 'Read' ? "/icons/sidebuttonred.svg" : "/icons/sidebuttongray.svg"} // Show red icon when active or hovered
                                                width={20}
                                                height={20}
                                                alt="Icon"
                                            />
                                        )}
                                    </button>




                                </div>
                                {/* ------------------------------------------------------------------------------------------------------------------------- */}
                                <div className="flex flex-col my-2 ml-5 ">
                                    <span className="text-1g text-left text-[#1D2939] font-bold pr-18">1. Welcome and Introduction</span>
                                    <div className="flex flex-row  ">
                                        <span className="mt-1">
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
                    </button>
                    {/* THIS IS START OF SECOND BUTTON */}

                    <button
                        onClick={() => setActiveComponent('Video')}
                        onMouseEnter={() => setHoverVideo(true)}
                        onMouseLeave={() => setHoverVideo(false)}>

                        <div className={`h-[64px] gap-[16px] rounded-[8px] hover:bg-[#F8F0FF] ${activeComponent === 'Video' ? 'bg-[#F8F0FF]' : 'bg-[#FFFFFF]'}`}>
                            <button className="flex justify-between
                        ">
                                {/* ------------------------------------------------------------------------------------------------------------------- */}
                                <div className=" flex flex-row mt-3 ml-4">

                                    <button
                                        className="icon-button" // Added a button specifically for the icon
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent event from bubbling to the outer button
                                            setIconCheckmarkVideo('Video'); // Trigger icon change to checkmark
                                        }}
                                    >
                                        {iconCheckmarkVideo === 'Video' ? (
                                            <Image src="/icons/Green-tick.svg" width={20} height={20} alt="Checkmark" />
                                        ) : (
                                            <Image
                                                src={hoverVideo || activeComponent === 'Video' ? "/icons/sidebuttonred.svg" : "/icons/sidebuttongray.svg"} // Show red icon when active or hovered
                                                width={20}
                                                height={20}
                                                alt="Icon"
                                            />
                                        )}
                                    </button>

                                </div>
                                {/* --------------------------------------------------------------------------------------------------------------------------- */}
                                <div className="flex flex-col h-[52px] gap-[4px]  ml-5 mt-2">
                                    <span className="gap-[4px] text-1g text-[#1D2939] font-bold">2. Chapter 01 Introduction</span>
                                    <div className="flex flex-row items-center ">
                                        <span >
                                            <Image
                                                src="/icons/vedio.svg"
                                                width={16}
                                                height={16}
                                                alt="" />
                                        </span>
                                        <span className=" ml-2 text-sm font-normal text-[#667085]">10:00</span>
                                    </div>

                                </div>



                            </button>

                        </div>
                    </button>
                    {/* THIS IS START OF THIRD BUTTON */}



                    <button className="
                        "        onClick={() => setActiveComponent('StartQuiz')}
                        onMouseEnter={() => setHoverStartQuiz(true)}
                        onMouseLeave={() => setHoverStartQuiz(false)}
                    >
                        <div className={`h-[64px] gap-[16px] rounded-[8px] hover:bg-[#F8F0FF]  ${activeComponent === 'StartQuiz' ? 'bg-[#F8F0FF]' : 'bg-[#FFFFFF]'}`}>
                            <button className="flex justify-between"

                            >
                                {/* ---------------------------------------------------------------------------------------------------------------------------------- */}
                                <div className=" flex flex-row mt-3 ml-4">

                                    <button

                                        className="icon-button" // Added a button specifically for the icon
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent event from bubbling to the outer button
                                            setIconCheckmarkStartQuiz('StartQuiz'); // Trigger icon change to checkmark
                                        }}
                                    >
                                        {iconCheckmarkStartQuiz === 'StartQuiz' ? (
                                            <Image src="/icons/Green-tick.svg" width={20} height={20} alt="Checkmark" />
                                        ) : (
                                            <Image
                                                src={hoverStartQuiz || activeComponent === 'StartQuiz' ? "/icons/sidebuttonred.svg" : "/icons/sidebuttongray.svg"} // Show red icon when active or hovered
                                                width={20}
                                                height={20}
                                                alt="Icon"
                                            />
                                        )}
                                    </button>

                                </div>
                                {/* -------------------------------------------------------------------------------------------------------------------------------- */}
                                <div className="flex flex-col h-[52px] gap-[4px]  ml-5 mt-2">
                                    <span className="gap-[4px] text-1g text-[#1D2939] font-bold">3. Test 01</span>
                                    <div className="flex flex-row items-center ">
                                        <span >
                                            <Image
                                                src="/icons/test.svg"
                                                width={16}
                                                height={16}
                                                alt="" />
                                        </span>
                                        <span className=" ml-2 text-sm font-normal text-[#667085]">10:00</span>
                                    </div>

                                </div>



                            </button>

                        </div>

                    </button>



                </div>
                {/* THIS IS  THE END OF OVERALL BUTTON */}

            </div>
            {/* THIS IS THE END OF SIDE--LAYOUT */}


        </div>

    )
}
export default sidebutton;



