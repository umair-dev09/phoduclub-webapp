"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { TooltipProps } from "recharts";

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
} from "@/components/ui/chart"

const chartData = [
    { browser: "Perfect", visitors: 24, fill: "#6080F8" },
    { browser: "Overtime", visitors: 2, fill: "#D270F3" },
    { browser: "Wasted", visitors: 5, fill: "#7ACAFA" },
    { browser: "Confused", visitors: 7, fill: "#D4D9E9" },
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
    }
} satisfies ChartConfig;

export function ChartTooltipContent({ payload, label }: TooltipProps) {
    if (payload && payload.length) {
        return (
            <div className="bg-white p-2 rounded-md shadow-md text-base text-gray-800">
                <div className="h-10"><span className={`flex items-start rounded-full w-3 h-3 mr-2`} style={{ backgroundColor: subject.fill }}></span></div>
                <p className="font-bold">{label}</p>
                {payload.map((entry, index) => (
                    <p key={`tooltip-item-${index}`}>
                        {entry.name}: {entry.value}
                    </p>
                ))}
            </div>
        );
    }

    return null;
}


function JeeMains() {
    const router = useRouter();

    return (
        <div className="flex flex-1 flex-col h-auto overflow-y-auto px-8">
            <div className="h-[64px] flex items-center">
                <div className="my-5 flex items-center flex-row">
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
                        Test 01
                    </div>
                </div>
            </div>
            <div className="ml-8">
                Overviwe tab
            </div>
            <div className="pt-5 pb-3">
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
            <div className="mt-3 mb-2"><h3>Attempts & Difficulty Analysis</h3></div>
            <div className="flex w-full h-auto flex-row gap-4">
                <div className="flex flex-col w-1/2 p-4 bg-white border border-lightGrey rounded-xl">
                    <div><h3>Score by Subjects</h3></div>
                    <div className="flex flex-1 items-center">
                        <ResponsiveContainer className='w-[30%]'>
                            <ChartContainer
                                config={chartConfig}
                                className="h-auto w-[70%]"
                            >
                                <PieChart>
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent />}
                                    />
                                    <Pie
                                        data={chartData}
                                        dataKey="visitors"
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
                                <ChartLegend content={<ChartLegendContent />} />
                            </ChartContainer>
                        </ResponsiveContainer>
                        <div className="grid grid-cols-2 w-[70%] h-[70%] justify-evenly">
                            {chartData.map((subject, index) => (
                                <div key={index} className="flex flex-row items-center">
                                    <div className="h-10"><span className={`flex items-start rounded-full w-3 h-3 mr-2`} style={{ backgroundColor: subject.fill }}></span></div>
                                    <div>
                                        {subject.browser}
                                        <h3>{subject.visitors}/38</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="w-1/2 rounded-xl h-[320px] flex-col bg-[#FFFFFF] border border-[#EAECF0]">
                    Bar Chart
                </div>
            </div>
        </div>
    )
}
export default JeeMains;