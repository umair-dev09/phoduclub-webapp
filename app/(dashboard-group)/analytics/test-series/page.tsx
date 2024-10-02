'use client'

import React from "react";
import TableComps from '@/components/DashboardComponents/AnalyticsComponents/Test-Series-Components/TestSeriesComp';
import { PieChart, Pie, Cell } from 'recharts';
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A donut chart with text"

const chartData = [
    { browser: "Physics", visitors: 275, fill: "#C7A5FF" },
    { browser: "Chemistry", visitors: 200, fill: "#9012FF" },
    { browser: "Mathematics", visitors: 287, fill: "#5C02B0" },
];

const chartConfig = {
    visitors: {
        label: "Visitors",
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

function TestSeries() {
    const totalVisitors = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
    }, []);

    return (
        <div className="flex flex-1 flex-col pt-6">
            {/* Table Section */}
            <table className="flex flex-col w-full h-min border border-lightGrey rounded-xl bg-white text-sm font-medium">
                <thead>
                    <tr className="flex flex-1 py-3 text-neutral-500">
                        <th className="w-[30%] px-8">Test</th>
                        <th className="w-[15%] text-center"><p>Scores</p></th>
                        <th className="w-[15%] text-center"><p>Attempted Questions</p></th>
                        <th className="w-[15%] text-center"><p>Accuracy</p></th>
                        <th className="w-[15%] text-center"><p>Time Taken</p></th>
                        <th className="w-[15%] text-center"><p>Total Time</p></th>
                    </tr>
                </thead>
                <tbody>
                    <TableComps />
                    <TableComps />
                    <TableComps />
                    <TableComps />
                </tbody>
            </table>

            <div className="mb-8">
                {/* Graph Section */}
                <div className="flex w-full h-auto flex-row gap-4 mt-5">
                    {/* Bar Graph */}
                    <div className="w-1/2 bg-white rounded-xl p-4">
                        Bar Graph
                    </div>
                    {/* Score by Subjects Section */}
                    <div className="w-1/2 bg-white rounded-xl p-4">
                        <div><h3>Score by Subjects</h3></div>
                        <div className="flex items-center">
                            <ChartContainer
                                config={chartConfig}
                                className="max-h-[250px] w-[70%]"
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
                                        innerRadius={50}
                                        strokeWidth={5}
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Pie>
                                </PieChart>
                                <ChartLegend content={<ChartLegendContent />} />
                            </ChartContainer>
                            <div className="flex flex-col justify-evenly">
                                {chartData.map((subject, index) => (
                                    <div key={index} className="flex items-center">
                                        <span className={`block items-start rounded-full w-3 h-3 mr-2`} style={{ backgroundColor: subject.fill }}></span>
                                        <div>
                                            {subject.browser}
                                            <p>{subject.visitors}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TestSeries;
