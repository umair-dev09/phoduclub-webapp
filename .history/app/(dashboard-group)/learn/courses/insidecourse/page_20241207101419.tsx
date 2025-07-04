"use client";
import Image from "next/image";
import { useRouter, } from "next/navigation";
import Discussion from '@/components/DashboardComponents/LearnComponents/CourseComponents/InsideCoursesComp/Discussioncomp/Discussion';
import Video from '@/components/DashboardComponents/LearnComponents/CourseComponents/InsideCoursesComp/VideoComp/Video';
import Read from '@/components/DashboardComponents/LearnComponents/CourseComponents/InsideCoursesComp/ReadComp/Read';
import StartQuiz from '@/components/DashboardComponents/LearnComponents/CourseComponents/InsideCoursesComp/StartQuizComp/StartQuiz';
import { useState, useEffect } from "react";
import { Tabs, Tab } from "@nextui-org/react";

function SideButton() {
    const router = useRouter();
    const [active, setActive] = useState<string>("overview");

    const handleSelectionChange = (key: string) => {
        setActive(key);

        // Handle logic based on the selected tab without routing
        if (key === "overview") {
            // Do something related to 'overview'
            console.log("Overview tab selected");
        } else if (key === "Discussion") {
            // Do something related to 'Discussion'
            console.log("Discussion tab selected");
        }
    };


    // Initialize state using localStorage values if they exist, otherwise default values
    const [activeComponent, setActiveComponent] = useState<string>(() => {
        return localStorage.getItem('activeComponent') || 'Read';
    });



    const [hoverRead, setHoverRead] = useState(false);
    const [hoverVideo, setHoverVideo] = useState(false);
    const [hoverStartQuiz, setHoverStartQuiz] = useState(false);

    const [iconCheckmarkRead, setIconCheckmarkRead] = useState<string | null>(null);
    const [iconCheckmarkVideo, setIconCheckmarkVideo] = useState<string | null>(null);
    const [iconCheckmarkStartQuiz, setIconCheckmarkStartQuiz] = useState<string | null>(null);
    // Function to toggle the icon to a checkmark

    // Save the active component and active tab to localStorage when they change
    useEffect(() => {
        localStorage.setItem('activeComponent', activeComponent);
    }, [activeComponent]);

    ;


    return (
        <div className="flex flex-row w-screen">
            <div className="MainCourseLayout flex flex-col w-[75%] overflow-y-auto pt-3 pb-7">
                {/* Header */}
                <div className="h-[64px] ml-8 flex items-center">
                    <div className="my-5 flex items-center">
                        <button className="flex items-center ml-1" onClick={() => router.back()}>
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

                {activeComponent !== 'StartQuiz' && (
                    <div className="flex flex-col gap-[17px] ml-8">
                        <span className="font-bold text-[#1D2939] text-1g">1. Welcome and Introduction</span>
                    </div>
                )}

                {/* Middle Section */}
                <div className="mr-8 mt-[24px] rounded-md flex flex-col h-auto w-auto ">
                    {activeComponent === 'Read' && <Read />}
                    {activeComponent === 'Video' && <Video />}
                    {activeComponent === 'StartQuiz' && <StartQuiz />}
                </div>

                {/* THIS IS THE FOOTER PART OF MAIN---COURSE-----LAYOUT */}
                {activeComponent !== 'StartQuiz' && (
                    <div>
                        <div className="ml-8 h-[60px] mr-8 mt-[20px] rounded-md flex items-center justify-center">
                            <div className="flex flex-row justify-between w-full h-[44px]">
                                <button className="h-full w-[111px] rounded-[8px] bg-[#FFFFFF] " style={{ border: "1.5px solid #EAECF0" }}>
                                    <span className="font-normal text-sm text-[#1D2939]">Previous</span>
                                </button>
                                <button className="h-full w-[111px] rounded-[8px] bg-[#8501FF] shadow-inner-button" style={{ border: "1px solid #800EE2" }}>
                                    <span className="font-semibold text-sm text-[#FFFFFF]">Next</span>
                                </button>
                            </div>
                        </div>

                        <div className="ml-8 mr-8 h-auto mt-[20px] w-full gap-[16px] flex border-b border-solid border-[#EAECF0]">
                            {/* <button className="font-medium text-base text-[#667085] mb-3" onClick={() => setActiveTab('overview')}>
                                <span className={`hover:text-[#8501FF] ${activetab === 'overview' ? 'text-[#8501FF]' : ''}`}>
                                    Overview
                                </span>
                            </button>
                            <button className="font-medium text-base text-[#667085] mb-3" onClick={() => setActiveTab('Discussion')}>
                                <span className={`hover:text-[#8501FF] ${activetab === 'Discussion' ? 'text-[#8501FF]' : ''}`}>
                                    Discussion
                                </span>
                            </button> */}
                            <Tabs
                                aria-label="course Tabs"
                                color="primary"
                                variant="underlined"
                                selectedKey={active}
                                onSelectionChange={(key) => handleSelectionChange(key as string)}
                                classNames={{
                                    tabList: "gap-6 w-full relative rounded-none p-0 border-b border-solid border-[#EAECF0]",
                                    cursor: "w-full bg-[#7400E0]",
                                    tab: "max-w-fit px-0 h-12",
                                    tabContent: "group-data-[selected=true]:text-[#7400E0] hover:text-[#7400E0]",
                                }}
                            >
                                <Tab
                                    key="overview"
                                    title={
                                        <div className="flex items-center space-x-2">
                                            <span className="font-medium text-base">Overview</span>
                                        </div>
                                    }
                                />
                                <Tab
                                    key="Discussion"
                                    title={
                                        <div className="flex items-center space-x-2">
                                            <span className="font-medium text-base">Discussion</span>
                                        </div>
                                    }
                                />
                            </Tabs>
                        </div>

                        {active === 'overview' && (
                            <div className="mt-4">
                                <div className="font-bold text-lg text-[#1D2939]">
                                    <span className="ml-8">Overview</span>
                                </div>
                                <div className="font-normal text-sm text-[#667085] leading-relaxed mt-4">
                                    <p className="ml-8">Gray Code is a binary numeral system where two successive values differ by only one bit...</p>
                                </div>
                            </div>
                        )}
                        {active === 'Discussion' && (
                            <div className="flex flex-col mt-[30px] ml-8 bg-[#FFFFFF] h-auto w-auto overflow-y-auto mr-8 pb-5 border border-solid border-[#EAECF0] rounded-[12px]">
                                <Discussion />
                            </div>
                        )}
                    </div>
                )}


            </div>

            {/* Side Layout with buttons */}
            <div className="SideLayout w-[25%] flex flex-col bg-[#FFFFFF] overflow-y-auto p-3">


                <div className="gap-[20px] flex flex-col">
                    {/* THIS IS START OF FIRST BUTTON */}
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
                                            // THIS IS CHECKMARK  FOR THE BUTTON

                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="w-[20px] h-[20px] rounded-full cursor-pointer appearance-none border-2 border-gray-300  checked:border-transparent"
                                                    checked={iconCheckmarkRead === 'Read'}
                                                    onChange={() => setIconCheckmarkRead(iconCheckmarkRead === 'Read' ? null : 'Read')} // Toggle checkmark
                                                />
                                                <span className="absolute w-[20px] h-[20px] bg-[url('/icons/Green-tick.svg')] bg-contain bg-center" />
                                            </label>

                                        ) : (
                                            <Image src={hoverRead || activeComponent === 'Read' ? "/icons/sidebuttonred.svg" : "/icons/sidebuttongray.svg"} width={20} height={20} alt="Icon" />
                                        )}
                                    </button>
                                </div>
                                {/* ------------------------------------------------------------------------------------------------------------------------- */}
                                <div className="flex flex-col my-2 ml-5 ">
                                    <span className="text-1g text-left text-[#1D2939] font-bold pr-18">1. Welcome and Introduction</span>
                                    <div className="flex flex-row items-center mt-1">
                                        <span>
                                            <Image
                                                src="/icons/read.svg"
                                                width={16}
                                                height={16}
                                                alt="" />
                                        </span>
                                        <span className=" ml-2  text-sm font-normal text-[#667085]">10:00</span>
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

                        <div className={` gap-[16px] rounded-[8px] hover:bg-[#F8F0FF] ${activeComponent === 'Video' ? 'bg-[#F8F0FF]' : 'bg-[#FFFFFF]'}`}>
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
                                            // THIS IS CHECKMARK  FOR THE BUTTON
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="w-[20px] h-[20px] rounded-full cursor-pointer appearance-none border-2 border-gray-300  checked:border-transparent"
                                                    checked={iconCheckmarkVideo === 'Video'}
                                                    onChange={() => setIconCheckmarkVideo(iconCheckmarkVideo === 'Video' ? null : 'Video')} // Toggle checkmark
                                                />
                                                <span className="absolute w-[20px] h-[20px] bg-[url('/icons/Green-tick.svg')] bg-contain bg-center" />
                                            </label>
                                        ) : (
                                            <Image src={hoverVideo || activeComponent === 'Video' ? "/icons/sidebuttonred.svg" : "/icons/sidebuttongray.svg"} width={20} height={20} alt="Icon" />
                                        )}
                                    </button>
                                </div>
                                {/* --------------------------------------------------------------------------------------------------------------------------- */}
                                <div className="flex flex-col gap-[4px]  ml-5 my-2">
                                    <span className="gap-[4px] text-left text-1g text-[#1D2939] font-bold">2. Chapter 01 Introduction</span>
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
                        <div className={` gap-[16px] rounded-[8px] hover:bg-[#F8F0FF]  ${activeComponent === 'StartQuiz' ? 'bg-[#F8F0FF]' : 'bg-[#FFFFFF]'}`}>
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
                                            // THIS IS CHECKMARK  FOR THE BUTTON
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="w-[20px] h-[20px] rounded-full cursor-pointer appearance-none border-2 border-gray-300  checked:border-transparent"
                                                    checked={iconCheckmarkStartQuiz === 'StartQuiz'}
                                                    onChange={() => setIconCheckmarkStartQuiz(iconCheckmarkStartQuiz === 'StartQuiz' ? null : 'StartQuiz')} // Toggle checkmark
                                                />
                                                <span className="absolute w-[20px] h-[20px] bg-[url('/icons/Green-tick.svg')] bg-contain bg-center" />
                                            </label>
                                        ) : (
                                            <Image src={hoverStartQuiz || activeComponent === 'StartQuiz' ? "/icons/sidebuttonred.svg" : "/icons/sidebuttongray.svg"} width={20} height={20} alt="Icon" />
                                        )}
                                    </button>
                                </div>
                                {/* -------------------------------------------------------------------------------------------------------------------------------- */}
                                <div className="flex flex-col gap-[4px]  ml-5 my-2">
                                    <span className="gap-[4px] text-left text-1g text-[#1D2939] font-bold">3. Test 01</span>
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
            </div>
        </div>
    );
}

export default SideButton;
