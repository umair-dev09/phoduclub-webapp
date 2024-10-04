"use client";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Collapsible from 'react-collapsible';
import { useState } from "react";
import Accordian from "@/components/DashboardComponents/AnalyticsComponents/Test-Series-Components/AccordionComps/Accordian";

function JeeMains() {
    const router = useRouter();
    // -------------------------------------------------------------------------------------
    const [isOpenArray, setIsOpenArray] = useState([false, false, false]); // Initialize with false for each collapsible

    // Function to toggle a specific collapsible's state
    const toggleCollapsible = (index: number) => {
        const newIsOpenArray = [...isOpenArray];
        newIsOpenArray[index] = !newIsOpenArray[index]; // Toggle the specific index
        setIsOpenArray(newIsOpenArray);
    };

    const handleTabClick = (tabName: string, path: string) => {
        router.push(path);
    }

    return (
        <div className="flex flex-1 flex-col">
            <div className="h-[64px] ml-8 flex items-center">
                <div className="my-5 flex items-center">
                    <button className="flex items-center ml-1" onClick={() => router.back()}>
                        <div className="text-[#1D2939] h-[24px] w-auto" style={{ fontSize: "16px", fontWeight: "600" }}>
                            Test-Series
                        </div>
                        <div className="ml-3 w-[24px]">
                            <Image src="/icons/course-left.svg" width={7} height={12} alt="left-arrow" />
                        </div>
                    </button>
                    <div className="text-[#667085] h-full w-auto -ml-1" style={{ fontSize: "16px", fontWeight: "500" }}>
                        Phodu JEE Mains Test Series 2025
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-[17px] ml-8 mt-5">
                <span className="font-bold text-[#1D2939] text-1g">Phodu JEE Mains Test Series 2025</span>
            </div>
            <div className="gap-2 flex flex-col mr-5 ml-8 mt-5">
                {/* First Accordian */}
                <div className='bg-white border border-lightGrey rounded-xl '>
                    <Collapsible
                        className='flex flex-col active:bg-[#F2F4F7]'
                        trigger={
                                <div
                                    className="flex items-center justify-between h-auto mx-5 py-4"
                                    onClick={() => toggleCollapsible(0)} // Toggle first accordion
                                >
                                    <div className="flex flex-col">
                                        <p className="text-base font-bold text-[#1D2939]">Physics</p>
                                        <p>5 Tests</p>
                                    </div>
                                    <div className="flex flex-row">
                                        <div className="flex fles-row mr-20">
                                            <div className="flex flex-col gap-1.5">
                                                <p className="text-xs font-normal text-[#1D2939]">Attempted</p>
                                                <h3 className="text-[15px] font-semibold">5/5</h3>
                                            </div>
                                        </div>
                                        <div className="flex fles-row mr-20">
                                            <div className="w-[1px] bg-lightGrey mr-4"></div>
                                            <div className="flex flex-col gap-1.5">
                                                <p className="text-xs font-normal text-[#1D2939]">Score</p>
                                                <h3 className="text-[15px] font-semibold">127</h3>
                                            </div>
                                        </div>
                                        <div className="flex fles-row mr-20">
                                            <div className="w-[1px] bg-lightGrey mr-4"></div>
                                            <div className="flex flex-col gap-1.5">
                                                <p className="text-xs font-normal text-[#1D2939]">Time taken</p>
                                                <h3 className="text-[15px] font-semibold">45h 30m</h3>
                                            </div>
                                        </div>
                                        <div className="flex fles-row mr-20">
                                            <div className="w-[1px] bg-lightGrey mr-4"></div>
                                            <div className="flex flex-col gap-1.5">
                                                <p className="text-xs font-normal text-[#1D2939]">Total Time</p>
                                                <h3 className="text-[15px] font-semibold">90h 20m</h3>
                                            </div>
                                        </div>

                                    <Image
                                        src={isOpenArray[0] ? "/icons/arrowdown.svg" : "/icons/arrowup.svg"} // Arrow based on first accordion state
                                        width={24}
                                        height={24}
                                        alt="arrow"
                                    />
                                </div>
                            </div>
                        }
                        transitionTime={350}
                        onOpening={() => toggleCollapsible(0)}  // Set the state to open when expanding
                        onClosing={() => toggleCollapsible(0)} // Set the state to closed when collapsing
                    >
                    <Accordian />                        
                    </Collapsible>
                </div>

                {/* All Subjects Accordian */}
                <div className='bg-white border border-lightGrey rounded-xl '>
                    <Collapsible
                        className='flex flex-col'
                        trigger={
                                <div
                                    className="flex items-center justify-between h-auto mx-5 py-4"
                                    onClick={() => toggleCollapsible(0)} // Toggle first accordion
                                >
                                    <div className="flex flex-col">
                                        <p className="text-base font-bold text-[#1D2939]">All Subjects</p>
                                        <p>5 Tests</p>
                                    </div>
                                    <div className="flex flex-row">
                                        <div className="flex fles-row mr-20">
                                            <div className="flex flex-col gap-1.5">
                                                <p className="text-xs font-normal text-[#1D2939]">Attempted</p>
                                                <h3 className="text-[15px] font-semibold">5/5</h3>
                                            </div>
                                        </div>
                                        <div className="flex fles-row mr-20">
                                            <div className="w-[1px] bg-lightGrey mr-4"></div>
                                            <div className="flex flex-col gap-1.5">
                                                <p className="text-xs font-normal text-[#1D2939]">Score</p>
                                                <h3 className="text-[15px] font-semibold">127</h3>
                                            </div>
                                        </div>
                                        <div className="flex fles-row mr-20">
                                            <div className="w-[1px] bg-lightGrey mr-4"></div>
                                            <div className="flex flex-col gap-1.5">
                                                <p className="text-xs font-normal text-[#1D2939]">Time taken</p>
                                                <h3 className="text-[15px] font-semibold">45h 30m</h3>
                                            </div>
                                        </div>
                                        <div className="flex fles-row mr-20">
                                            <div className="w-[1px] bg-lightGrey mr-4"></div>
                                            <div className="flex flex-col gap-1.5">
                                                <p className="text-xs font-normal text-[#1D2939]">Total Time</p>
                                                <h3 className="text-[15px] font-semibold">90h 20m</h3>
                                            </div>
                                        </div>

                                    <Image
                                        src={isOpenArray[0] ? "/icons/arrowdown.svg" : "/icons/arrowup.svg"} // Arrow based on first accordion state
                                        width={24}
                                        height={24}
                                        alt="arrow"
                                    />
                                </div>
                            </div>
                        }
                        transitionTime={350}
                        onOpening={() => toggleCollapsible(0)}  // Set the state to open when expanding
                        onClosing={() => toggleCollapsible(0)} // Set the state to closed when collapsing
                    >
                    <Accordian />
                    </Collapsible>
                </div>
            </div>
        </div>
    )
}
export default JeeMains;