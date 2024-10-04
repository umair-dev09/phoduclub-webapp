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
        <div>




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



            </div>





        </div>
    );
}

export default Quizzes;