"use client";

import Image from "next/image";
import TestSeriesComp from "@/components/DashboardComponents/HomeComponents/TestSeries/testSeriesComp/testSeriesComp";

function TestSeries() {
    return (
        <div className="flex flex-1 h-auto overflow-y-auto">
            {/* --------------------------- BEFORE BUYING COURSES --------------------------- */}
            <div className="hidden flex-1 items-center justify-evenly">
                <div className="relative flex flex-col flex-[0.5] items-center justify-center rounded-[12px] overflow-hidden transition-transform duration-300 ease-linear mx-6 my-6">
                    <div>
                        <div className="absolute top-[12px] left-[20px] flex items-center bg-white/80 text-[12px] font-medium border border-white rounded-full px-[10px] py-[4px] z-10 transition-transform duration-300 ease-linear">
                            <Image
                                className="mr-1"
                                src="/icons/suggestion_icon.svg"
                                alt="suggestion icon"
                                width={16}
                                height={16}
                            />
                            <p>Suggested for you</p>
                        </div>
                        <div className="relative">
                            <img
                                className="w-full h-auto object-cover"
                                src="/images/course_img.svg"
                                alt="course image"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-full border border-[#EAECF0] border-t-0 rounded-b-[12px]">
                        <div className="mt-4 px-4">
                            <p className="text-[16px] font-semibold leading-[24px]">BITSET Full Course</p>
                            <div className="flex items-center gap-[4px] text-[12px] font-normal text-[#667085]">
                                <p>3 Lessons</p>
                                <span>&#x2022;</span>
                                <p>3hr 14m</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mt-2 mb-4 px-4">
                            <h4 className="text-[16px] font-semibold leading-[24px]">&#8377; 2400</h4>
                            <button className="text-[12px] font-semibold px-[14px] py-[10px] rounded-[6px] border-[2px] border-[#9012FF] text-[#9012FF]">
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
                {/* Duplicate Course */}
                <div className="relative flex flex-col flex-[0.5] items-center justify-center rounded-[12px] overflow-hidden transition-transform duration-300 ease-linear mx-6 my-6">
                    <div>
                        <div className="absolute top-[12px] left-[20px] flex items-center bg-white/80 text-[12px] font-medium border border-white rounded-full px-[10px] py-[4px] z-10 transition-transform duration-300 ease-linear">
                            <Image
                                className="mr-1"
                                src="/icons/suggestion_icon.svg"
                                alt="suggestion icon"
                                width={16}
                                height={16}
                            />
                            <p>Suggested for you</p>
                        </div>
                        <div className="relative">
                            <Image
                                className="w-full h-auto object-cover"
                                src="/images/course_img.svg"
                                alt="course image"
                                width={239}
                                height={160}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-full border border-[#EAECF0] border-t-0 rounded-b-[12px]">
                        <div className="mt-4 px-4">
                            <p className="text-[16px] font-semibold leading-[24px]">BITSET Full Course</p>
                            <div className="flex items-center gap-[4px] text-[12px] font-normal text-[#667085]">
                                <p>3 Lessons</p>
                                <span>&#x2022;</span>
                                <p>3hr 14m</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mt-2 mb-4 px-4">
                            <h4 className="text-[16px] font-semibold leading-[24px]">&#8377; 2400</h4>
                            <button className="text-[12px] font-semibold px-[14px] py-[10px] rounded-[6px] border-[2px] border-[#9012FF] text-[#9012FF]">
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* --------------------------- AFTER BUYING COURSES --------------------------- */}
            <div className="flex flex-col flex-1">
                <TestSeriesComp />
            </div>
        </div>
    );
}

export default TestSeries;