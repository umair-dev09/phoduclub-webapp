"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";
import AttemptsDifficultyAnalysis from "@/components/DashboardComponents/AnalyticsComponents/Test-Series-Components/PhysicsComponents/AttemptsDifficultyAnalysis"
import Attemptsoverthehours from "@/components/DashboardComponents/AnalyticsComponents/Test-Series-Components/PhysicsComponents/Attemptsoverthehours"

function JeeMains() {
    const router = useRouter();
    return (
        <div className="flex flex-1 flex-col h-auto overflow-y-auto  px-8">
            {/* heading */}
            <div className="h-[64px] flex items-center">
                <div className="my-5 flex items-center flex-row ">
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
                    <div className="ml-3 w-[24px]">
                        <Image src="/icons/course-left.svg" width={7} height={12} alt="left-arrow" />
                    </div>
                    <div className="text-[#667085] h-full w-auto -ml-1" style={{ fontSize: "16px", fontWeight: "500" }}>
                        Physics
                    </div>
                </div>
            </div>
            {/* scroll anchoring */}
            <div className="h-[50px]border-b border-solid border-[#EAECF0] flex flex-row gap-[16px] mt-2 bg-red-900">
                <a href="#overview" className="text-[#667085] font-medium text-base">Overview</a>
                <a href="#attempts" className="text-[#667085] font-medium text-base">Attempts & Difficulty Analysis</a>
                <a href="#hours" className="text-[#667085] font-medium text-base">Attempts over the 3 hours</a>
                <a href="#missed-concept" className="text-[#667085] font-medium text-base">Missed Concept</a>
                <a href="#complete-analysis" className="text-[#667085] font-medium text-base">Complete Analysis</a>
            </div>
            <div className="overflow-y-auto flex-1 flex flex-col h-auto">
                {/* overview Line */}
                <div id="overview" className="h-[44px] flex flex-col justify-end mt-5">
                    <span className="text-[#1D2939] text-lg font-semibold">Overview</span>
                </div>
                {/* Overall Data */}
                <div className=" mt-2 mb-6">
                    <div className="bg-white p-4 flex flex-col rounded-2xl border border-lightGrey">
                        <div className="flex flex-row justify-between">
                            {/* Total Questions */}
                            <div className="flex flex-1 flex-row justify-between pr-4">
                                <div className="flex flex-col gap-2">
                                    <div className="font-normal text-xs text-[#667085]">Total Questions</div>
                                    <h3 className="text-[15px]">3000</h3>
                                </div>
                                <div className="flex justify-center items-center">
                                    <div className="w-px bg-lightGrey h-4/5"></div>
                                </div>
                            </div>

                            {/* Attempted Questions */}
                            <div className="flex flex-1 flex-row justify-between pr-4">
                                <div className="flex flex-col gap-2">
                                    <div className="font-normal text-xs text-[#667085]">Attempted Questions</div>
                                    <h3 className="text-[15px]">2000</h3>
                                </div>
                                <div className="flex justify-center items-center">
                                    <div className="w-px bg-lightGrey h-4/5"></div>
                                </div>
                            </div>

                            {/* Time Taken */}
                            <div className="flex flex-1 flex-col gap-2">
                                <div className="font-normal text-xs text-[#667085]">Time Taken</div>
                                <h3 className="text-[15px]">80 of 100 hrs</h3>
                            </div>
                        </div>

                        {/* Additional Stats */}
                        <div className="flex flex-row justify-between mt-9">
                            <div className="flex flex-1 flex-row justify-between pr-4">
                                <div className="flex flex-col gap-2">
                                    <div className="font-normal text-xs text-[#667085]">Answered Correct</div>
                                    <h3 className="text-[15px]">800</h3>
                                </div>
                                <div className="flex justify-center items-center">
                                    <div className="w-px bg-lightGrey h-4/5"></div>
                                </div>
                            </div>

                            <div className="flex flex-1 flex-row justify-between pr-4">
                                <div className="flex flex-col gap-2">
                                    <div className="font-normal text-xs text-[#667085]">Answered Incorrect</div>
                                    <h3 className="text-[15px]">200</h3>
                                </div>
                                <div className="flex justify-center items-center">
                                    <div className="w-px bg-lightGrey h-4/5"></div>
                                </div>
                            </div>

                            <div className="flex flex-1 flex-col gap-2">
                                <div className="font-normal text-xs text-[#667085]">Total Score</div>
                                <h3 className="text-[15px]">568</h3>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Attempts & Difficulty Analysis */}
                <div id="attempts" className="h-[44px] flex flex-col justify-end mb-2">
                    <span className="text-[#1D2939] text-lg font-semibold">Attempts & Difficulty Analysis</span>
                </div>
                <div>
                    < AttemptsDifficultyAnalysis />
                </div>
                {/* Attempts over the 3 hours */}
                <div id="hours" className="h-[44px] flex flex-col justify-end mb-2">
                    <span className="text-[#1D2939] text-lg font-semibold">Attempts over the 3 hours</span>
                </div>
                <div>
                    <Attemptsoverthehours />
                </div>
                {/* Complete Analysis */}
                <div id="complete-analysis" className="h-[44px] flex flex-col justify-end mb-2 ">
                    <span className="text-[#1D2939] text-lg font-semibold">Complete Analysis</span>
                </div>
                <div className="h-auto rounded-xl mb-6 bg-[#FFFFFF] border border-solid border-[#EAECF0]">
                    <table className="w-full rounded-xl bg-white text-sm font-medium">
                        <thead>
                            <tr className="text-[#667085]">
                                <th className="w-[7%] px-8 py-3 text-center">Q. no.</th>
                                <th className="w-[10%] text-left">Chapter</th>
                                <th className="w-[10%] text-center">Difficulty</th>
                                <th className="w-[10%] text-center">Allotted</th>
                                <th className="w-[10%] text-center">Spent</th>
                                <th className="w-[10%] text-center">Attempted</th>
                                <th className="w-[10%] text-center">Answer</th>
                                <th className="w-[10%] text-center">Remarks</th>
                            </tr>
                        </thead>
                        <tbody className="border-b border-[#EAECF0]">
                            <tr className="border-t border-[#EAECF0]">
                                <td className="py-3 text-center text-[#1D2939] font-normal text-sm">1</td>
                                <td className="py-3 text-left text-[#1D2939] font-semibold text-sm">Current Electricity</td>
                                <td className="py-3 text-center text-[#1D2939] font-normal text-sm">Easy</td>
                                <td className="py-3 text-center text-[#1D2939] font-normal text-sm">217s</td>
                                <td className="py-3 text-center text-[#1D2939] font-normal text-sm">50s</td>
                                <td className="py-3 text-center text-[#1D2939] font-normal text-sm">Yes</td>
                                <td className="py-3 text-center text-[#0B9055] font-medium text-sm">Correct</td>
                                <td className="py-3 text-center text-[#0B9055] font-medium text-sm">Perfect</td>
                            </tr>
                            <tr className="border-t border-[#EAECF0]">
                                <td className="py-3 text-center text-[#1D2939] font-normal text-sm">1</td>
                                <td className="py-3 text-left text-[#1D2939] font-semibold text-sm">Current Electricity</td>
                                <td className="py-3 text-center text-[#1D2939] font-normal text-sm">Easy</td>
                                <td className="py-3 text-center text-[#1D2939] font-normal text-sm">217s</td>
                                <td className="py-3 text-center text-[#1D2939] font-normal text-sm">50s</td>
                                <td className="py-3 text-center text-[#1D2939] font-normal text-sm">Yes</td>
                                <td className="py-3 text-center text-[#0B9055] font-medium text-sm">Correct</td>
                                <td className="py-3 text-center text-[#0B9055] font-medium text-sm">Perfect</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* Summary */}
                <div id="missed-concept" className="h-[44px] flex flex-col justify-end mb-2 ">
                    <span className="text-[#1D2939] text-lg font-semibold">Summary</span>
                </div>
                <div className="h-auto mb-8 p-4 rounded-xl bg-[#FFFFFF] border border-[#EAECF0] text-[#667085] font-normal text-sm flex">
                    Great! You did not miss any concept.
                </div>
            </div>
        </div>
    )
}
export default JeeMains;