"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Graphicalviewofoverview from "@/components/DashboardComponents/AnalyticsComponents/Test-Series-Components/AllSubjectsComponents/Graphicalviewofoverview";
import TimeAccuracy from "@/components/DashboardComponents/AnalyticsComponents/Test-Series-Components/AllSubjectsComponents/TimeAccuracy";
import Attempts from "@/components/DashboardComponents/AnalyticsComponents/Test-Series-Components/AllSubjectsComponents/AttemptsGraph";
function JeeMains() {
    const router = useRouter();
    return (
        <div className="flex flex-1 flex-col h-auto overflow-y-auto pb-2">
            {/* heading */}
            <div className="h-[64px]flex items-center">
                <div className="my-5 flex items-center flex-row ">
                    <button className="flex items-center ml-1" onClick={() => router.back()}>
                        <div className="text-[#1D2939] h-[24px] w-auto ml-8" style={{ fontSize: "16px", fontWeight: "600" }}>
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
                        All Subjects
                    </div>
                </div>
            </div>
            {/* scroll anchoring */}
            <div className="h-[50px]  mx-8 border-b border-solid border-[#EAECF0] flex flex-row gap-[16px] mt-2">
                <span className="text-[#667085] font-medium text-base">Overview</span>
                <span className="text-[#667085] font-medium text-base">Attempts & Difficulty Analysis</span>
                <span className="text-[#667085] font-medium text-base">Attempts over the 3 hours</span>
                <span className="text-[#667085] font-medium text-base">Missed Concept</span>
                <span className="text-[#667085] font-medium text-base">Complete Analysis</span>
            </div>
            {/* overview Line */}
            <div id="overview" className="mx-8 h-[44px] flex flex-col justify-end mt-5 gap-1">
                <span className="text-[#1D2939] text-lg font-semibold">Overview</span>
                <span className="font-normal text-[#475467] text-sm">Summary of marks scored in the test</span>
            </div>
            {/* Overall Data */}
            <div className=" pt-2 pb-3 mx-8">
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
            {/* Overall Data Table */}
            <div className="h-auto mx-8 rounded-xl  bg-[#FFFFFF] border border-solid border-[#EAECF0]">
                <table className="w-full rounded-xl bg-white text-sm font-medium">
                    <thead>
                        <tr className="text-[#667085]">
                            <th className="w-[10%] px-8 py-3 text-left">Subject</th>
                            <th className="w-[10%] text-center">Score</th>
                            <th className="w-[10%] text-center">Correct</th>
                            <th className="w-[10%] text-center">Incorrect</th>
                            <th className="w-[10%] text-center">Unattempted</th>
                            <th className="w-[10%] text-center">Not visted</th>
                        </tr>
                    </thead>
                    <tbody className="border-b border-[#EAECF0]">
                        <tr className="border-t border-[#EAECF0]">
                            <td className="px-8 py-3 text-left text-[#1D2939] font-semibold text-sm">Overall</td>
                            <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">200/300</td>
                            <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">5/75</td>
                            <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">10/25</td>
                            <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">20/25</td>
                            <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">0/75</td>
                        </tr>
                        <tr className="border-t border-[#EAECF0]">
                            <td className="px-8 py-3 text-left text-[#1D2939] font-semibold text-sm">Physics</td>
                            <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">100/300</td>
                            <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">5/75</td>
                            <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">1/25</td>
                            <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">20/25</td>
                            <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">0/75</td>
                        </tr>
                        <tr className="border-t border-[#EAECF0]">
                            <td className="px-8 py-3 text-left text-[#1D2939] font-semibold text-sm">Chemistry</td>
                            <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">250/300</td>
                            <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">50/75</td>
                            <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">10/25</td>
                            <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">40/25</td>
                            <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">0/75</td>
                        </tr>
                        <tr className="border-t border-[#EAECF0]">
                            <td className="px-8 py-3 text-left text-[#1D2939] font-semibold text-sm">Mathmatics</td>
                            <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">20/300</td>
                            <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">5/75</td>
                            <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">1/25</td>
                            <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">16/25</td>
                            <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">0/75</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* Graphical view of overview */}
            <div id="hours" className="mx-8 h-[44px] flex flex-col justify-end mb-2">
                <span className="text-[#1D2939] text-lg font-semibold">Graphical view of overview</span>
            </div>
            <div>
                <Graphicalviewofoverview />

            </div>
            {/* Time & Accuracy */}
            <div id="hours" className="mx-8 h-[44px] flex flex-col justify-end mb-2">
                <span className="text-[#1D2939] text-lg font-semibold">Time & Accuracy</span>
            </div>
            <div>
                <TimeAccuracy />

            </div>
            {/* Attempts */}
            <div id="hours" className="mx-8 h-[44px] flex flex-col justify-end mb-2">
                <span className="text-[#1D2939] text-lg font-semibold">Attempts</span>
            </div>
            {/* Attempts table */}
            <div className="h-auto mx-8 rounded-xl  bg-[#FFFFFF] border border-solid border-[#EAECF0]">
                <table className="w-full rounded-xl bg-white text-sm font-medium">
                    <thead>
                        <tr className="text-[#667085] flex flex-row gap-2">
                            <th className="w-[10%] px-8 py-3 text-left flex flex-row gap-2">
                                Subject
                                <Image
                                    src="/icons/information-circle.svg"
                                    width={16}
                                    height={16}
                                    alt="information-icon"
                                />
                            </th>
                            <th className="w-[10%] px-8 py-3 text-left flex flex-row gap-2">
                                Perfect
                                <Image
                                    src="/icons/information-circle.svg"
                                    width={16}
                                    height={16}
                                    alt="information-icon"
                                />
                            </th>
                            <th className="w-[10%] px-8 py-3 text-left flex flex-row gap-2">
                                Wasted
                                <Image
                                    src="/icons/information-circle.svg"
                                    width={16}
                                    height={16}
                                    alt="information-icon"
                                />
                            </th>
                            <th className="w-[10%] px-8 py-3 text-left flex flex-row gap-2">
                                Overtime
                                <Image
                                    src="/icons/information-circle.svg"
                                    width={16}
                                    height={16}
                                    alt="information-icon"
                                />
                            </th>
                            <th className="w-[10%] px-8 py-3 text-left flex flex-row gap-2">
                                Confused
                                <Image
                                    src="/icons/information-circle.svg"
                                    width={16}
                                    height={16}
                                    alt="information-icon"
                                />
                            </th>
                        </tr>

                    </thead>
                    <tbody className="border-b border-[#EAECF0]">
                        <tr className="border-t border-[#EAECF0]">
                            <td className="px- py-3 text-left text-[#1D2939] font-semibold text-sm">Overall</td>
                            <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">2</td>
                            <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">5</td>
                            <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">15</td>
                            <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">25</td>

                        </tr>
                        <tr className="border-t border-[#EAECF0]">
                            <td className="px-8 py-3 text-left text-[#1D2939] font-semibold text-sm">Physics</td>
                            <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">2</td>
                            <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">5</td>
                            <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">15</td>
                            <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">25</td>

                        </tr>
                        <tr className="border-t border-[#EAECF0]">
                            <td className="px-8 py-3 text-left text-[#1D2939] font-semibold text-sm">Chemistry</td>
                            <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">2</td>
                            <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">5</td>
                            <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">15</td>
                            <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">25</td>

                        </tr>
                        <tr className="border-t border-[#EAECF0]">
                            <td className="px-8 py-3 text-left text-[#1D2939] font-semibold text-sm">Mathmatics</td>
                            <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">2</td>
                            <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">5</td>
                            <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">15</td>
                            <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">25</td>

                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Attempts Graph */}
            <div>
                <Attempts />

            </div>
            {/* Difficulty Analysis */}
            <div id="hours" className="mx-8 h-[44px] flex flex-col justify-end mb-2">
                <span className="text-[#1D2939] text-lg font-semibold"> Difficulty Analysis</span>
                <Image
                    src="/icons/information-circle.svg"
                    width={16}
                    height={16}
                    alt="information-icon"
                />
            </div>
            <div>
                <  DifficultyAnalysis />

            </div>

        </div>
    )
}
export default JeeMains;