"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useState } from "react";
import AttemptsDifficultyAnalysis from "@/components/DashboardComponents/AnalyticsComponents/Test-Series-Components/PhysicsComponents/AttemptsDifficultyAnalysis"
import Attemptsoverthehours from "@/components/DashboardComponents/AnalyticsComponents/Test-Series-Components/PhysicsComponents/Attemptsoverthehours"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from "recharts";
import { PieChart, Pie, Cell } from 'recharts';
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A donut chart with text"

const chartData = [
    { browser: "Perfect", visitors: 27, fill: "#6080F8" },
    { browser: "Overtime", visitors: 200, fill: "#D270F3" },
    { browser: "Wasted", visitors: 287, fill: "#7ACAFA" },
    { browser: "Confused", visitors: 287, fill: "#D4D9E9" },
];

const chartConfig = {
    Perfect: {
        label: "Perfect",
        color: "#6080F8",
    },
    Overtime: {
        label: "Overtime",
        color: "#D270F3",
    },
    Wasted: {
        label: "Wasted",
        color: "#7ACAFA",
    },
    Confused: {
        label: "Confused",
        color: "#D4D9E9",
    },
} satisfies ChartConfig;

interface PieTooltipProps extends TooltipProps<number, string> {
    active?: boolean;
    payload?: any[];
}
const CustomPieTooltip: React.FC<PieTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const { name, value, payload: { fill } } = payload[0];
        return (
            <div className="flex flex-row items-center justify-between w-40" style={{
                backgroundColor: 'white',
                border: '1px solid #EAECF0',
                borderRadius: '8px',
                padding: '10px',
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
            }}>
                <div className="flex flex-row items-center">
                    {/* Color dot dynamically based on fill */}
                    <span style={{
                        display: 'inline-block',
                        width: '12px', // Set equal width
                        height: '12px', // Set equal height
                        borderRadius: '50%', // This ensures it's a perfect circle
                        backgroundColor: fill, // Set the fill color here
                        marginRight: '8px'
                    }} />
                    {/* Name and value */}
                    <p className="flex items-center text-sm font-semibold text-[#667085]">{name}</p>
                </div>
                <p className="flex items-center text-[0.938rem] font-semibold text-[#1D2939]">{value}</p>
            </div>
        );
    }

    return null;
};

function JeeMains() {

    const router = useRouter();

    let [showQuizDialog, setShowQuizDialog] = useState(false);
    const onStartQuiz = () => {
        setShowQuizDialog(true);
    };

    return (
        <div className="flex flex-1 flex-col h-auto overflow-y-auto px-8">
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
            <div className="h-[50px] border-b border-solid border-[#EAECF0] flex flex-row gap-[16px] mt-2">
                <a href="#overview" className="text-[#667085] font-medium text-base">Overview</a>
                <a href="#attempts" className="text-[#667085] font-medium text-base">Attempts & Difficulty Analysis</a>
                <a href="#hours" className="text-[#667085] font-medium text-base">Attempts over the 3 hours</a>
                <a href="#missed-concept" className="text-[#667085] font-medium text-base">Missed Concept</a>
                <a href="#complete-analysis" className="text-[#667085] font-medium text-base">Complete Analysis</a>
            </div>
            <div className="overflow-y-auto flex-1 flex flex-col h-auto">
                {/* overview Line */}
                <div onClick={onStartQuiz} id="overview" className="h-[44px] flex flex-col justify-end mt-5 cursor-pointer">
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
                    <div className="flex flex-col w-1/2 bg-white rounded-xl p-4">
                        <div><h3>Score by Subjects</h3></div>
                        <div className="flex flex-1 items-center">
                            <ResponsiveContainer className='flex w-[50%]'>
                                <ChartContainer config={chartConfig} className="h-auto w-[70%]">
                                    <PieChart>
                                        <Tooltip content={<CustomPieTooltip />} cursor={false} />
                                        <Pie
                                            data={chartData}
                                            dataKey="visitors" // Corrected key
                                            nameKey="browser"
                                            innerRadius={60}
                                            strokeWidth={3}
                                            stroke="#FFFFFF"
                                        >
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} />
                                            ))}
                                        </Pie>
                                    </PieChart>

                                </ChartContainer>
                            </ResponsiveContainer>
                            <div className="grid grid-cols-2 w-[80%] h-[70%] mr-4 justify-evenly">
                                {chartData.map((subject, index) => (
                                    <div key={index} className="flex flex-1 items-center">
                                        <div><span className={`block rounded-full w-3 h-3 mr-2 mt-[23%]`} style={{ backgroundColor: subject.fill }}></span></div>
                                        <div>
                                            {subject.browser}
                                            <h3>{subject.visitors}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
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
            <div>
                <Dialog open={showQuizDialog} onClose={() => setShowQuizDialog(false)} className="relative z-50">
                    <DialogBackdrop className="fixed inset-0 bg-black/30 " />
                    <div className="fixed inset-0 flex items-center justify-center ">
                        <DialogPanel transition className="bg-[#FFFFFF] rounded-2xl w-[37.5rem]">
                            <div className="flex flex-1 relative w-full border-b-2 border-solid border-[#EAECF0] flex-col rounded-t-xl">
                                <div className="absolute right-6 top-6">
                                    <button onClick={() => setShowQuizDialog(false)}>
                                        <Image src="/icons/cancel.svg" alt="cancel" width={18} height={18} />
                                    </button>
                                </div>
                                <div className="flex flex-col w-full mt-8">
                                    <div className="flex justify-center">
                                        <Image src='/images/physicDailogImg.svg' alt="cool image" width={120} height={120} />
                                    </div>
                                    <div className="flex justify-center text-xl font-bold">
                                        <h2>Upgrade to premium</h2>
                                    </div>
                                </div>
                                <div className="flex flex-col mt-9 mb-6 font-medium text-base text-[#1D2939]">
                                    <div className="flex flex-row w-full pl-8 mb-6">
                                        <div className="flex flex-row w-1/2"><div><Image className="mr-2" src='/icons/checkmark-circle-02.svg' alt="tick circle" width={24} height={24} /></div><p>Unlock the premiun <br /> Analytics</p></div>
                                        <div className="flex flex-row w-1/2 ml-6"><div><Image className="mr-2" src='/icons/checkmark-circle-02.svg' alt="tick circle" width={24} height={24} /></div><p>Special badge for  <br /> premiun users</p></div>
                                    </div>
                                    <div className="flex flex-row w-full pl-8">
                                        <div className="flex flex-row w-1/2"><div><Image className="mr-2" src='/icons/checkmark-circle-02.svg' alt="tick circle" width={24} height={24} /></div><p>Be part of the premium  <br /> groups</p></div>
                                        <div className="flex flex-row w-1/2 ml-6"><div><Image className="mr-2" src='/icons/checkmark-circle-02.svg' alt="tick circle" width={24} height={24} /></div><p>Get dedicated  <br /> mentorship by IIT/NITians</p></div>
                                    </div>
                                </div>
                            </div>
                            <div
                                style={{
                                    borderTopLeftRadius: '0px',
                                    borderTopRightRadius: '0px',
                                    borderBottomLeftRadius: '12px',
                                    borderBottomRightRadius: '12px',
                                }}>
                                <div className="flex w-auto justify-end my-4">
                                    <button
                                        className="bg-[#FFFFFF] text-[#1D2939] text-sm font-semibold py-2 px-5 rounded-md w-auto h-[44px] shadow-inner-button"
                                        style={{ border: "1.5px solid #EAECF0" }}
                                        onClick={() => setShowQuizDialog(false)}>
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-[#8501FF] text-[#FFFFFF] text-sm font-semibold mr-6 ml-4 py-2 px-5 rounded-md w-auto h-[44px] shadow-inner-button"
                                        style={{
                                            border: "1px solid #800EE2",
                                        }}
                                    >Explore Courses
                                    </button>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>
            </div>
        </div>
    )
}
export default JeeMains;