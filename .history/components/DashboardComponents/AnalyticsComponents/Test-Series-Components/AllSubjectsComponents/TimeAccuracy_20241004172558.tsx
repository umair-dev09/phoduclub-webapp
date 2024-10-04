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


interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const correctValue = payload.find(item => item.name === "correct")?.value;
        const incorrectValue = payload.find(item => item.name === "incorrect")?.value;
        const UnansweredValue = payload.find(item => item.name === "Unanswered")?.value;

        return (
            <div style={{
                position: 'relative',
                backgroundColor: 'white',
                border: '1px solid #EAECF0',
                borderRadius: '8px',
                width: 'auto',
                height: "auto",

                fontSize: '14px',
                pointerEvents: 'none', // Prevent mouse events from affecting the tooltip
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                padding: '16px'

            }}>
                {/* Tooltip content */}

                <div style={{ display: 'flex', alignItems: 'center', width: "auto", height: "auto", justifyItems: 'center', }}>
                    <div style={{ display: 'flex', alignItems: 'center', }}>
                        <span style={{
                            display: 'inline-block',
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: '#17B26A',
                            padding: '3px',
                            marginRight: '4px',
                        }} />
                        <span className="text-[#667085] font-normal text-sm ml-1">{`Correct `}</span>
                        <span className=" ml-12 font-semibold text-base text-[#1D2939]">{correctValue}</span>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', width: "auto", height: "auto", justifyItems: 'center', }}>
                    <div style={{ display: 'flex', alignItems: 'center', }}>
                        <span style={{
                            display: 'inline-block',
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: '#F04438', // Color for "Incorrect"
                            marginRight: '4px',
                            padding: '3px'
                        }} />
                        <span className="text-[#667085] font-normal text-sm ml-1">{`Incorrect `}</span>
                        <span className="ml-10 font-semibold text-base text-[#1D2939]">{incorrectValue}</span>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', width: "auto", height: "auto", justifyItems: 'center', }}>
                    <div style={{ display: 'flex', alignItems: 'center', }}>
                        <span style={{
                            display: 'inline-block',
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: '#F04438', // Color for "Incorrect"
                            marginRight: '4px',
                            padding: '3px'
                        }} />
                        <span className="text-[#667085] font-normal text-sm ml-1">{`Unaswered `}</span>
                        <span className="ml-6 font-semibold text-base text-[#1D2939]">{UnansweredValue}</span>
                    </div>
                </div>

            </div>
        );
    }
    return null;
}




function Quizzes() {




    const data = [
        {
            "name": "Chemistry",
            "correct": 12,
            "incorrect": 5,
            "Unanswered": 3

        },
        {
            "name": "Physics",
            "correct": 4,
            "incorrect": 1,
            "Unanswered": 8
        },
        {
            "name": "Maths",
            "correct": 9,
            "incorrect": 1,
            "Unanswered": 5
        },
    ];
    const totalVisitors = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
    }, []);


    const data1 = [
        {
            "name": "Easy",
            "correct": 12,
            "incorrect": 5
        },
        {
            "name": "Moderate",
            "correct": 4,
            "incorrect": 1
        },
        {
            "name": "Tough",
            "correct": 9,
            "incorrect": 1
        },
    ];
    return (
        <div>




            <div className="flex flex-row gap-4 h-auto mx-8">
                <div className="flex flex-col w-1/2 bg-white rounded-xl p-4">
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