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
    { subjects: "Physics", marks: 27, fill: "#C7A5FF" },
    { subjects: "Chemistry", marks: 200, fill: "#9012FF" },
    { subjects: "Mathematics", marks: 287, fill: "#5C02B0" },
];

const chartConfig = {
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

interface PieTooltipProps extends TooltipProps<number, string> {
    active?: boolean;
    payload?: any[];
}

const CustomPieTooltip: React.FC<PieTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const { name, value, fill } = payload[0];

        return (
            <div className="flex flex-row items-center justify-between w-40" style={{
                backgroundColor: 'white',
                border: '1px solid #EAECF0',
                borderRadius: '8px',
                padding: '10px',
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
            }}>
                <div className="flex flex-row items-center">
                    {/* Color dot */}
                    <span style={{
                        display: 'inline-block',
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: '#EAECF0',
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
        return chartData.reduce((acc, curr) => acc + curr.marks, 0);
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
        <div className="mb-8">
            <div className="flex w-full h-auto flex-row gap-4">
                <div className="w-1/2 rounded-xl h-[320px] flex-col bg-[#FFFFFF] border border-[#EAECF0]">
                    <div className="h-[50px] flex flex-row justify-between mt-3 ">
                        <span className="flex items-center justify-center ml-10 font-semibold text-[#1D2939] text-lg">Attempted Questions</span>
                        <div className=" flex flex-row gap-5">
                            <div className="flex flex-row gap-2">
                                <span style={{
                                    display: 'inline-block',
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    backgroundColor: '#17B26A',
                                    marginTop: "19px" // Color for "Correct"
                                }} />
                                <span className="flex items-center justify-center text-[#667085] font-normal text-sm">Correct</span>
                            </div>
                            <div className="flex flex-row gap-2">
                                <span style={{
                                    display: 'inline-block',
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    backgroundColor: '#F04438', // Color for "Incorrect"
                                    marginTop: "19px"
                                }} />
                                <span className="flex items-center justify-center text-[#667085] font-normal text-sm mr-5">Incorrect</span>
                            </div>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height="80%">
                        <BarChart
                            data={data}
                            barGap={5}
                            barCategoryGap="5%"
                            margin={{ right: 20, }} // Set left margin to 0
                        >
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={false} />
                            <XAxis
                                dataKey="name"
                                fontFamily="poppins"
                                fontSize={14}
                                fontWeight={400}
                                fill="#667085"
                                padding={{ left: 10, right: 20 }}
                            />
                            <YAxis
                                domain={[0, 'dataMax']}
                                fontFamily="poppins"
                                fontSize={14}
                                fontWeight={400}
                                fill="#667085"

                            />
                            <Tooltip content={<CustomTooltip />} cursor={false} isAnimationActive={true} />
                            <Legend wrapperStyle={{ display: 'none' }} />
                            <Bar dataKey="correct" fill="#17B26A" barSize={55} />
                            <Bar dataKey="incorrect" fill="#F04438" barSize={55} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex flex-col w-1/2 p-4 bg-white border border-lightGrey rounded-xl">
                    <div><h3>Score by Subjects</h3></div>
                    <div className="flex flex-1 items-center">
                        <ResponsiveContainer className='flex w-[50%]'>
                            <ChartContainer config={chartConfig} className="h-auto w-[70%]">
                                <PieChart>
                                    <Tooltip content={<CustomPieTooltip />} cursor={false} />
                                    <Pie
                                        data={chartData}
                                        dataKey="marks"
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
                        <div className="flex flex-col w-[50%] justify-evenly">
                            {chartData.map((subject, index) => (
                                <div key={index} className="flex flex-1 mb-2">
                                    <div><span className={`block rounded-full w-3 h-3 mr-2 mt-[23%]`} style={{ backgroundColor: subject.fill }}></span></div>
                                    <div>
                                        {subject.subjects}
                                        <h3>{subject.marks}</h3>
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