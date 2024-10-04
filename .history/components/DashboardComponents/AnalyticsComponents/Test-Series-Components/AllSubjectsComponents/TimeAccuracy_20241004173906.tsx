import React, { useState } from "react";
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
    { browser: "Physics", visitors: 27, fill: "#C7A5FF" },
    { browser: "Chemistry", visitors: 200, fill: "#9012FF" },
    { browser: "Mathematics", visitors: 287, fill: "#5C02B0" },
];

const chartConfig = {
    visitors: {
        label: "Subjects",
    },
    Physics: {
        label: "Physics",
        color: "#C7A5FF",
    },
    Chemistry: {
        label: "Chemistry",
        color: "#9012FF",
    },
    Mathematics: {
        label: "Mathematics",
        color: "#5C02B0",
    },
} satisfies ChartConfig;







function Quizzes() {





    const totalVisitors = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
    }, []);



    return (
        <div className="flex gap-2 flex-col">




            <div className="flex flex-row gap-4 h-auto mx-8">
                <div className="flex flex-col w-1/2 bg-white rounded-xl p-4 h-auto">
                    <div><h3>Score by Subjects</h3></div>
                    <div className="flex flex-1 items-center">
                        <ResponsiveContainer className='flex w-[50%]'>
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
                        <div className="flex flex-col w-[50%] justify-evenly">
                            {chartData.map((subject, index) => (
                                <div key={index} className="flex flex-1">
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




                <div className=" w-full rounded-xl h-auto flex-col bg-[#FFFFFF] border border-solid border-[#EAECF0]">
                    <table className="w-full rounded-xl bg-white text-sm font-medium">
                        <thead>
                            <tr className="text-[#667085]">
                                <th className="w-[10%] px-8 py-3 text-left">Subject</th>
                                <th className="w-[10%] text-center">Score</th>
                                <th className="w-[10%] text-center">Correct</th>

                            </tr>
                        </thead>
                        <tbody className="border-b border-[#EAECF0]">
                            <tr className="border-t border-[#EAECF0]">
                                <td className="px-8 py-3 text-left text-[#1D2939] font-semibold text-sm">Overall</td>
                                <td className=" px-8 py-3 text-left text-[#1D2939] font-normal text-sm">200/300</td>
                                <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">5/75</td>

                            </tr>
                            <tr className="border-t border-[#EAECF0]">
                                <td className=" px-8 py-3 text-left text-[#1D2939] font-semibold text-sm">Physics</td>
                                <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">100/300</td>
                                <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">5/75</td>

                            </tr>
                            <tr className="border-t border-[#EAECF0]">
                                <td className="px-8 py-3 text-left text-[#1D2939] font-semibold text-sm">Chemistry</td>
                                <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">250/300</td>
                                <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">50/75</td>

                            </tr>

                        </tbody>
                    </table>


                </div>
            </div>
            {/*  Below Code Represent the Horizontal Graph */}
            {/* HORIZONTAL GRAPH FOR THE Attempts */}
            <div className="flex flex-row gap-4 h-auto mx-8">
                <div className="flex flex-col w-1/2 bg-white rounded-xl p-4 h-auto">

                </div>
                {/* HORIZONTAL GRAPH FOR THE Accuracy */}
                <div className=" w-full rounded-xl h-auto flex-col bg-[#FFFFFF] border border-solid border-[#EAECF0]">


                </div>
            </div>





        </div>
    );
}

export default Quizzes;