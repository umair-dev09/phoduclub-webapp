"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Graphicalviewofoverview from "@/components/DashboardComponents/AnalyticsComponents/Test-Series-Components/AllSubjectsComponents/Graphicalviewofoverview";
import TimeAccuracy from "@/components/DashboardComponents/AnalyticsComponents/Test-Series-Components/AllSubjectsComponents/TimeAccuracy";
import Attempts from "@/components/DashboardComponents/AnalyticsComponents/Test-Series-Components/AllSubjectsComponents/AttemptsGraph";
import DifficultyAnalysis from "@/components/DashboardComponents/AnalyticsComponents/Test-Series-Components/AllSubjectsComponents/DifficultyAnalysis";
import Attemptsoverthehours from "@/components/DashboardComponents/AnalyticsComponents/Test-Series-Components/AllSubjectsComponents/Attemptsoverthehours";
import CompleteAnalysis from "@/components/DashboardComponents/AnalyticsComponents/Test-Series-Components/AllSubjectsComponents/CompleteAnalysis";
import Overview from "@/components/DashboardComponents/AnalyticsComponents/Test-Series-Components/AllSubjectsComponents/Overview";
function JeeMains() {
    const router = useRouter();
    return (
        <div className="flex flex-1 flex-col h-auto overflow-y-auto px-8 pb-2">
            <div>
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
                            All Subjects
                        </div>
                    </div>
                </div>
                {/* scroll anchoring */}
                <div className="h-[50px] border-b border-solid border-[#EAECF0] flex flex-row gap-[16px] mt-2">
                    <span className="text-[#667085] font-medium text-base">Overview</span>
                    <span className="text-[#667085] font-medium text-base">Graphical view of overview</span>
                    <span className="text-[#667085] font-medium text-base">Time & Accuracy</span>
                    <span className="text-[#667085] font-medium text-base">Attempts</span>
                    <span className="text-[#667085] font-medium text-base">Difficulty Analysis</span>
                    <span className="text-[#667085] font-medium text-base">Attempts over the 3 hours</span>
                    <span className="text-[#667085] font-medium text-base">Painful Questions</span>
                </div>
                <div className="overflow-y-auto flex-1 flex flex-col h-auto">
                    {/* overview Line */}
                    <div>
                        <Overview />
                    </div>
                    {/* --------------------------------------******************************************************---------------------------------------------- */}
                    {/* Graphical view of overview */}
                    <div className="h-[44px] flex flex-col justify-end mb-4">
                        <span className="text-[#1D2939] text-lg font-semibold">Graphical view of overview</span>
                    </div>
                    <div>
                        <Graphicalviewofoverview />
                    </div>
                    {/* --------------------------------------******************************************************---------------------------------------------- */}
                    {/* Time & Accuracy */}
                    <div className="h-[44px] flex flex-col justify-end mb-4">
                        <span className="text-[#1D2939] text-lg font-semibold">Time & Accuracy</span>
                    </div>
                    <div>
                        <TimeAccuracy />
                    </div>
                    {/* --------------------------------------******************************************************---------------------------------------------- */}
                    {/* Attempts */}
                    <div className="h-[44px] flex flex-col justify-end mb-4">
                        <span className="text-[#1D2939] text-lg font-semibold">Attempts</span>
                    </div>
                    {/* Attempts table */}
                    <div className="h-auto w-full mb-4 rounded-xl border border-lightGrey">
                        <table className="w-full rounded-xl bg-white text-sm font-medium">
                            <thead>
                                <tr className="text-[#667085]">
                                    <th className="w-[20%] py-3">
                                        <div className="flex flex-row text-left pl-6 ">
                                            Subject
                                            <Image
                                                src="/icons/information-circle.svg"
                                                width={16}
                                                height={16}
                                                alt="information-icon"
                                                className="ml-1"
                                            />
                                        </div>
                                    </th>
                                    <th className="w-[20%] py-3">
                                        <div className="flex flex-row justify-center">
                                            Perfect
                                            <Image
                                                src="/icons/information-circle.svg"
                                                width={16}
                                                height={16}
                                                alt="information-icon"
                                                className="ml-1"
                                            />
                                        </div>
                                    </th>
                                    <th className="w-[20%] py-3">
                                        <div className="flex flex-row justify-center">
                                            Wasted
                                            <Image
                                                src="/icons/information-circle.svg"
                                                width={16}
                                                height={16}
                                                alt="information-icon"
                                                className="ml-1"
                                            />
                                        </div>
                                    </th>
                                    <th className="w-[20%] py-3">
                                        <div className="flex flex-row justify-center">
                                            Overtime
                                            <Image
                                                src="/icons/information-circle.svg"
                                                width={16}
                                                height={16}
                                                alt="information-icon"
                                                className="ml-1"
                                            />
                                        </div>
                                    </th>
                                    <th className="w-[20%] py-3">
                                        <div className="flex flex-row justify-center">
                                            Confused
                                            <Image
                                                src="/icons/information-circle.svg"
                                                width={16}
                                                height={16}
                                                alt="information-icon"
                                                className="ml-1"
                                            />
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-t border-[#EAECF0]">
                                    <td className="py-3 text-left pl-6 text-[#1D2939] font-semibold text-sm">Overall</td>
                                    <td className="py-3 text-center text-[#1D2939] font-normal text-sm">2</td>
                                    <td className="py-3 text-center text-[#1D2939] font-normal text-sm">5</td>
                                    <td className="py-3 text-center text-[#1D2939] font-normal text-sm">15</td>
                                    <td className="py-3 text-center text-[#1D2939] font-normal text-sm">25</td>
                                </tr>
                                <tr className="border-t border-[#EAECF0]">
                                    <td className="py-3 text-left pl-6 text-[#1D2939] font-semibold text-sm">Physics</td>
                                    <td className="py-3 text-center text-[#1D2939] font-normal text-sm">2</td>
                                    <td className="py-3 text-center text-[#1D2939] font-normal text-sm">5</td>
                                    <td className="py-3 text-center text-[#1D2939] font-normal text-sm">15</td>
                                    <td className="py-3 text-center text-[#1D2939] font-normal text-sm">25</td>
                                </tr>
                                <tr className="border-t border-[#EAECF0]">
                                    <td className="py-3 text-left pl-6 text-[#1D2939] font-semibold text-sm">Chemistry</td>
                                    <td className="py-3 text-center text-[#1D2939] font-normal text-sm">2</td>
                                    <td className="py-3 text-center text-[#1D2939] font-normal text-sm">5</td>
                                    <td className="py-3 text-center text-[#1D2939] font-normal text-sm">15</td>
                                    <td className="py-3 text-center text-[#1D2939] font-normal text-sm">25</td>
                                </tr>
                                <tr className="border-t border-[#EAECF0]">
                                    <td className="py-3 text-left pl-6 text-[#1D2939] font-semibold text-sm">Mathematics</td>
                                    <td className="py-3 text-center text-[#1D2939] font-normal text-sm">2</td>
                                    <td className="py-3 text-center text-[#1D2939] font-normal text-sm">5</td>
                                    <td className="py-3 text-center text-[#1D2939] font-normal text-sm">15</td>
                                    <td className="py-3 text-center text-[#1D2939] font-normal text-sm">25</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* Attempts Graph */}
                    <div>
                        <Attempts />
                    </div>
                    {/* --------------------------------------******************************************************---------------------------------------------- */}
                    {/* Difficulty Analysis */}
                    <div className="h-[44px] flex flex-row  mb-2 items-center gap-2">
                        <span className="text-[#1D2939] text-lg font-semibold "> Difficulty Analysis</span>
                        <Image
                            src="/icons/information-circle.svg"
                            width={20}
                            height={20}
                            alt="information-icon"
                        />
                    </div>
                    {/* Difficulty Analysis  graph*/}
                    <div>
                        <  DifficultyAnalysis />
                    </div>
                    {/* --------------------------------------******************************************************---------------------------------------------- */}
                    {/* Attempts over the 3 hours */}
                    <div className="h-[44px] flex flex-row items-center gap-2 mb-2">
                        <span className="text-[#1D2939] text-lg font-semibold ">  Attempts over the 3 hours</span>
                        <Image
                            src="/icons/information-circle.svg"
                            width={20}
                            height={20}
                            alt="information-icon"
                        />
                    </div>
                    {/* Line graph and Attemptsoverthehours data table */}
                    <div>
                        <  Attemptsoverthehours />
                    </div>
                    {/* --------------------------------------******************************************************---------------------------------------------- */}
                    {/* Complete Analysis */}
                    <div className="h-[44px] flex flex-col  mb-2">
                        <span className="text-[#1D2939] text-lg font-semibold">Complete Analysis </span>
                    </div>
                    <div>
                        <CompleteAnalysis />
                    </div>
                    {/* --------------------------------------******************************************************---------------------------------------------- */}
                    {/* Summary */}
                    <div className="h-[44px] flex flex-row items-center mt-6 mb-2 gap-2">
                        <span className="text-[#1D2939] text-lg font-semibold ">Summary</span>
                        <Image
                            src="/icons/information-circle.svg"
                            width={20}
                            height={20}
                            alt="information-icon"

                        />
                    </div>

                    <div className="flex flex-col mb-8 gap-4">
                        <div className="h-auto bg-[#FFFFFF] border border-solid border-[#EAECF0] p-3  rounded-md">
                            <div className=" flex flex-col gap-2 ml-2">
                                <span className="font-semibold text-[#1D2939] text-sm">Physics</span>
                                <span className="font-normal text-[#667085] text-sm">Great! You did not miss any concept.</span>
                            </div>
                        </div>
                        <div className="h-auto bg-[#FFFFFF] border border-solid border-[#EAECF0] p-3  rounded-md">
                            <div className=" flex flex-col gap-2 ml-2">
                                <span className="font-semibold text-[#1D2939] text-sm">Chemistry</span>
                                <span className="font-normal text-[#667085] text-sm ml-2">1.Extraction of Aluminum by Purification of Bauxite</span>
                                <span className="font-normal text-[#667085] text-sm ml-2">2.Types of Interhalogens</span>
                            </div>
                        </div>
                        <div className="h-auto bg-[#FFFFFF] border border-solid border-[#EAECF0] p-3  rounded-md">
                            <div className=" flex flex-col gap-2 ml-2">
                                <span className="font-semibold text-[#1D2939] text-sm">Mathematics</span>
                                <span className="font-normal text-[#667085] text-sm ml-2">1.Condition of one common root</span>
                                <span className="font-normal text-[#667085] text-sm ml-2">2.Condition for a line to be secant, tangent or a chord</span>
                                <span className="font-normal text-[#667085] text-sm ml-2">3.Question on tan inverse</span>
                                <span className="font-normal text-[#667085] text-sm ml-2">4.When limit tends to 0 or finite number</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* --------------------------------------******************************************************---------------------------------------------- */}
            </div>
        </div>
    )
}
export default JeeMains;