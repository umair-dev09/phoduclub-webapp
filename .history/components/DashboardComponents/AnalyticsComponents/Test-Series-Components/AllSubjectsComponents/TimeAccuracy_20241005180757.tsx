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
// this below code for Horizontal Graph tooltip design code
interface CustomTooltipforAttemptsProps {
    active?: boolean;
    payload?: any[];
    label?: string;
}
const CustomTooltipforAttempts: React.FC<CustomTooltipforAttemptsProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        const attempts = data.Attempts;
        const fillColor = data.fill;
        return (
            <div style={{
                position: 'relative',
                backgroundColor: 'white',
                border: '1px solid #EAECF0',
                borderRadius: '8px',
                width: '150px',
                height: "50px",
                fontSize: '14px',
                pointerEvents: 'none', // Prevent mouse events from affecting the tooltip
                boxShadow: "2px 5px 11px 0px #0000001A",
            }}>
                {/* Tooltip content */}
                <div className="mt-3">

                    <div style={{ display: 'flex', alignItems: 'center', width: "full", height: "30px", justifyItems: 'center', }}>
                        <div style={{ display: 'flex', alignItems: 'center', }}>
                            <span style={{
                                display: 'inline-block',
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                backgroundColor: fillColor,
                                marginLeft: "10px"


                            }} />
                            <span className="text-[#667085] font-normal text-sm ml-2">{`Attempts `}</span>
                            <span className="font-semibold text-base text-[#1D2939] ml-8 ">{attempts}</span>
                        </div>
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
    const totalVisitors = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.marks, 0);
    }, []);
    // Data for Attempts
    const Attempts = [
        {
            "subject": "Maths",
            "Attempts": 2,
            fill: "#C7A5FF",
        },
        {
            "subject": "Physics",
            "Attempts": 18,
            fill: "#5C02B0",
        },
        {
            "subject": "Chemistry",
            "Attempts": 8,
            fill: '#9012FF',
        }
    ];

    return (
        <div className="flex gap-2 flex-col h-auto mb-8">
            <div className="flex flex-row mb-4 gap-4">
                <div className="flex flex-col w-1/2 p-4 bg-white border border-lightGrey rounded-xl">
                    <div><h3>Session wise time spent</h3></div>
                    <div className="flex flex-1 items-center">
                        <ResponsiveContainer className='flex w-[50%]'>
                            <ChartContainer config={chartConfig} className="h-auto w-[70%]">
                                <PieChart>
                                    <Tooltip content={<CustomPieTooltip />} cursor={false} />
                                    <Pie
                                        data={chartData}
                                        dataKey="marks"
                                        nameKey="browser"
                                        innerRadius={40}
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
                <div className=" w-1/2 rounded-xl h-auto flex-col bg-[#FFFFFF] border border-solid border-[#EAECF0]">
                    <table className="w-full rounded-xl bg-white text-sm font-medium">
                        <thead>
                            <tr className="text-[#667085]">
                                <th className="w-[10%] px-8 py-3 text-left">Subject</th>
                                <th className="w-[10%] text-center">Score</th>
                                <th className="w-[10%] text-center">Correct</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t border-[#EAECF0]">
                                <td className="px-8 py-3 text-left text-[#1D2939] font-semibold text-sm">Overall</td>
                                <td className=" px-8 py-3 text-center text-[#1D2939] font-normal text-sm">200/300</td>
                                <td className="px-8 py-3 text-center text-[#1D2939] font-normal text-sm">5/75</td>

                            </tr>
                            <tr className="border-t border-[#EAECF0]">
                                <td className=" px-8 py-3 text-left text-[#1D2939] font-semibold text-sm">Physics</td>
                                <td className="px-8 py-3 text-center text-[#1D2939] font-normal text-sm">100/300</td>
                                <td className="px-8 py-3 text-center text-[#1D2939] font-normal text-sm">5/75</td>

                            </tr>
                            <tr className="border-t border-[#EAECF0]">
                                <td className="px-8 py-3 text-left text-[#1D2939] font-semibold text-sm">Chemistry</td>
                                <td className="px-8 py-3 text-center text-[#1D2939] font-normal text-sm">250/300</td>
                                <td className="px-8 py-3 text-center text-[#1D2939] font-normal text-sm">50/75</td>
                            </tr>
                            <tr className="border-t border-[#EAECF0]">
                                <td className="px-8 py-3 text-left text-[#1D2939] font-semibold text-sm">Maths</td>
                                <td className="px-8 py-3 text-center text-[#1D2939] font-normal text-sm">250/300</td>
                                <td className="px-8 py-3 text-center text-[#1D2939] font-normal text-sm">50/75</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            {/*  Below Code Represent the Horizontal Graph */}
            {/* HORIZONTAL GRAPH FOR THE Attempts */}
            <div className="flex flex-row gap-4 h-[250px]">

                <div className=" w-full rounded-xl h-auto flex  flex-col bg-[#FFFFFF] border border-solid border-[#EAECF0]">
                    <div>
                        <span> wfwfwe f</span>
                    </div>
                    <ResponsiveContainer width="100%" height="65%">
                        <BarChart
                            data={Attempts}
                            layout="vertical"
                            barGap={30}
                        >
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={false} />
                            <XAxis
                                type="number"  // X-axis will represent the numerical values (Attempts)
                                fontFamily="poppins"
                                fontSize={14}
                                fontWeight={400}
                                fill="#667085"
                                domain={[0, 'dataMax']}
                            />
                            <YAxis
                                type="category"  // Y-axis represents the subjects
                                dataKey="subject"  // Use "subject" for the Y-axis labels (Maths, Physics, Chemistry)
                                fontFamily="poppins"
                                fontSize={14}
                                fontWeight={400}
                                fill="#667085"
                                width={100}
                            />
                            <Legend wrapperStyle={{ display: 'none' }} />
                            <Tooltip content={<CustomTooltipforAttempts />} cursor={false} />
                            <Bar
                                dataKey="Attempts"
                                barSize={30} // Adjust this size to create gaps between bars
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className=" w-full rounded-xl h-auto flex bg-[#FFFFFF] border border-solid border-[#EAECF0]">
                    <div className="flex flex-1 items-center flex-col">
                        <ResponsiveContainer width="95%" height="100%">
                            <BarChart
                                data={Attempts}
                                layout="vertical"
                            >
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={false} />
                                <XAxis
                                    type="number"  // X-axis will represent the numerical values (Attempts)
                                    fontFamily="poppins"
                                    fontSize={14}
                                    fontWeight={400}
                                    fill="#667085"
                                    domain={[0, 'dataMax']}
                                />
                                <YAxis
                                    type="category"  // Y-axis represents the subjects
                                    dataKey="subject"  // Use "subject" for the Y-axis labels (Maths, Physics, Chemistry)
                                    fontFamily="poppins"
                                    fontSize={14}
                                    fontWeight={400}
                                    fill="#667085"
                                />
                                <Legend wrapperStyle={{ display: 'none' }} />
                                <Tooltip content={<CustomTooltipforAttempts />} cursor={false} />
                                <Bar
                                    dataKey="Attempts"
                                    barSize={24} // Adjust this size to create gaps between bars
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Quizzes;