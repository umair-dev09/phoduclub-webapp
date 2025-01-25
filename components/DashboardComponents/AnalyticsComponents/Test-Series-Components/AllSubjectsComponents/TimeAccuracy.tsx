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

// const chartData = [
//     { subjects: "Physics", marks: 27, fill: "#C7A5FF" },
//     { subjects: "Chemistry", marks: 200, fill: "#9012FF" },
//     { subjects: "Mathematics", marks: 287, fill: "#5C02B0" },
// ];

// const chartConfig = {
//     Physics: {
//         label: "Physics",
//         color: "#C7A5FF",
//     },
//     Chemistry: {
//         label: "Chemistry",
//         color: "#9012FF",
//     },
//     Mathematics: {
//         label: "Mathematics",
//         color: "#5C02B0",
//     },
// } satisfies ChartConfig;
const CustomPieTooltipforpie: React.FC<PieTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const { name, value, payload: { fill } } = payload[0];
        return (
            <div className="flex flex-row items-center justify-between w-auto bg-white border border-lightGrey rounded-md p-[10px] shadow-md">
                <div className="flex flex-row items-center">
                    {/* Color dot dynamically based on fill */}
                    <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: fill }} />
                    {/* Name and value */}
                    <p className="flex items-center text-sm font-semibold text-[#667085] mr-4 ">{name}</p>
                </div>
                <p className="flex items-center text-[0.938rem] font-semibold text-[#1D2939]">{formatTimeInSeconds(value)}</p>
            </div>
        );
    }
    return null;
};

// this below code for Horizontal Graph tooltip design code
interface CustomTooltipforAttemptsProps {
    active?: boolean;
    payload?: any[];
    label?: string;
}
const CustomTooltipforAttempts: React.FC<CustomTooltipforAttemptsProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const { name, value, payload: { fill } } = payload[0];

        return (
            <div className="relative bg-white border border-lightGrey rounded-md w-auto h-auto text-sm pointer-events-none" style={{ boxShadow: "2px 5px 11px 0px #0000001A" }}>
                {/* Tooltip content */}
                <div className="p-2">
                    <div className="flex items-center w-auto h-auto justify-center">
                        <div className="flex items-center">
                            <span className="inline-block w-[10px] h-[10px] rounded-full" style={{ backgroundColor: fill }} />
                            <span className="text-[#667085] font-normal text-sm ml-2">{`Accuracy `}</span>
                            <span className="font-semibold text-base text-[#1D2939] ml-5 ">{value}%</span>
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

interface SubAttemptDetails {
    attemptedQuestions: string;
    score: string;
    accuracy: string;
    answeredCorrect: string;
    answeredIncorrect: string;
    timeTaken: number;
    questions: AnsweredQuestion[];
    sectionName: string;
    attemptId: string;
}

interface GraphicalViewOfOverviewProps {
    questions: AnsweredQuestion[];
    subattempts: SubAttemptDetails[];
    overallTimeTaken: number;
    overallAccuracy: string;
}

type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';

interface AnsweredQuestion {
    questionId: string;
    status: string;
    answered: boolean;
    selectedOption: string | null;
    answeredCorrect: boolean | null;
    allotedTime: number;
    spentTime: number;
    difficulty: DifficultyLevel;
    remarks: string;
}

function formatTimeInSeconds(seconds: number | string): string {
    const totalSeconds = Number(seconds);
    const hours = Math.floor(totalSeconds / 3600); // Calculate hours
    const minutes = Math.floor((totalSeconds % 3600) / 60); // Calculate remaining minutes
    let formattedTime = '';
  
    if (hours > 0) {
        formattedTime += `${hours}h`; // Add hours if present
    }
    if (minutes > 0 || hours === 0) {
        formattedTime += (formattedTime ? ' ' : '') + `${minutes}m`; // Add minutes
    }
  
    return formattedTime;
  }

function TimeAccuracy({ questions, subattempts, overallAccuracy, overallTimeTaken }: GraphicalViewOfOverviewProps) {                   
    // const totalVisitors = React.useMemo(() => {
    //     return chartData.reduce((acc, curr) => acc + curr.marks, 0);
    // }, []);
    // Data for Attempts
  
    const subjectColors = [
        '#C7A5FF', // Lavender
        '#9012FF', // Purple
        '#5C02B0', // Indigo
        '#4B0082',  // Indigo
        '#FF6B6B',  // Coral
        '#4CAF50',  // Green
        '#9C27B0',  // Purple
        '#FF9800',  // Orange
        '#2196F3',  // Blue
        '#E91E63',  // Pink
        '#00BCD4',  // Cyan
        '#FFC107',  // Amber
        '#795548'   // Brown
    ];


    return (
        <div className="flex gap-2 flex-col h-auto mb-8">
            <div className="flex flex-row mb-4 gap-4">
                <div className="flex flex-col w-1/2 p-4 bg-white border border-lightGrey rounded-xl">
                    <div><h3>Session wise time spent</h3></div>
                    <div className="flex flex-1 items-center">
                        <ResponsiveContainer className='flex w-[50%]'>
                            <ChartContainer config={{
                                    ...Object.fromEntries(
                                        subattempts.map((subattempt, index) => [
                                            subattempt.sectionName,
                                            {
                                                label: subattempt.sectionName,
                                                color: subjectColors[index % subjectColors.length]
                                            }
                                        ])
                                    )
                                }} className="h-auto w-[70%]">
                                <PieChart>
                                    <Tooltip content={<CustomPieTooltipforpie />} cursor={false} />
                                    <Pie
                                        data={subattempts
                                            .map((subattempt, index) => ({
                                                subjects: subattempt.sectionName,
                                                timespent: subattempt.timeTaken,
                                                fill: subjectColors[index % subjectColors.length]
                                            }))}
                                        dataKey="timespent"
                                        nameKey="subjects"
                                        innerRadius={40}
                                        strokeWidth={3}
                                        stroke="#FFFFFF"
                                    >
                                        {subattempts
                                        .map((entry, index) => (
                                            <Cell key={`cell-${index}`} 
                                            fill={subjectColors[index % subjectColors.length]}
                                            />
                                        ))}
                                    </Pie>
                                </PieChart>

                            </ChartContainer>
                        </ResponsiveContainer>
                        <div className="flex flex-col w-[50%] justify-evenly">
                        {subattempts.map((subattempt, index) => (
                                <div key={index} className="flex flex-1 mb-2">
                                    <div><span className={`block rounded-full w-3 h-3 mr-2 mt-[23%]`} style={{ backgroundColor: subjectColors[index % subjectColors.length] }}></span></div>
                                   
                                    <div>
                                        {subattempt.sectionName}
                                        <h3>{formatTimeInSeconds(subattempt.timeTaken)}</h3>
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
                                <th className="w-[10%] text-center">Time Spent</th>
                                <th className="w-[10%] text-center">Accuracy</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-t border-[#EAECF0]">
                                <td className="px-8 py-3 text-left text-[#1D2939] font-semibold text-sm">Overall</td>
                                <td className=" px-8 py-3 text-center text-[#1D2939] font-normal text-sm">{formatTimeInSeconds(overallTimeTaken)}</td>
                                <td className="px-8 py-3 text-center text-[#1D2939] font-normal text-sm">{overallAccuracy}</td>

                            </tr>
                            {subattempts.map((subattempt, index) => (
                            <tr key={index} className="border-t border-[#EAECF0]">
                                <td className=" px-8 py-3 text-left text-[#1D2939] font-semibold text-sm">{subattempt.sectionName}</td>
                                <td className="px-8 py-3 text-center text-[#1D2939] font-normal text-sm">{formatTimeInSeconds(subattempt.timeTaken)}</td>
                                <td className="px-8 py-3 text-center text-[#1D2939] font-normal text-sm">{subattempt.accuracy}</td>
                            </tr>
                           ))}

                        </tbody>
                    </table>
                </div>
            </div>
            {/*  Below Code Represent the Horizontal Graph */}
            <div className="flex flex-row gap-4 h-[250px]">
                {/* horizontal graph for the Attempts */}
                {/* <div className=" w-full rounded-xl h-auto flex  flex-col bg-[#FFFFFF] border border-solid border-[#EAECF0] pr-5">
                    <div className=" m-5">
                        <span className="font-semibold text-[#1D2939] text-lg">Attempts</span>
                    </div>
                    <ResponsiveContainer width="100%" height="65%" className='mr-[10px]'>
                        <BarChart
                            data={Attempts}
                            layout="vertical"
                            barGap={30}
                        >
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={false} />
                            <XAxis
                                type="number"
                                fontFamily="poppins"
                                fontSize={14}
                                fontWeight={400}
                                fill="#667085"
                                domain={[0, 'dataMax']}
                            />
                            <YAxis
                                type="category"
                                dataKey="subject"
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
                                barSize={30}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div> */}
                {/* horizontal graph for the Accuracy */}
                <div className=" w-full rounded-xl h-auto flex  flex-col bg-[#FFFFFF] border border-solid border-[#EAECF0] pr-5">
                    <div className=" m-5">
                        <span className="font-semibold text-[#1D2939] text-lg">Accuracy</span>
                    </div>
                    <ResponsiveContainer width="100%" height="65%" className='mr-[10px]'>
                        <BarChart
                            data={subattempts.map((subattempt, index) => ({
                                subject: subattempt.sectionName,
                                Accuracy: parseFloat(subattempt.accuracy),
                                fill: subjectColors[index % subjectColors.length]
                            }))}
                            layout="vertical"
                            barGap={30}
                        >
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={false} />
                            <XAxis
                                type="number"
                                fontFamily="poppins"
                                fontSize={14}
                                fontWeight={400}
                                fill="#667085"
                                domain={[0, 'dataMax']}
                            />
                            <YAxis
                                type="category"
                                dataKey="subject"
                                fontFamily="poppins"
                                fontSize={14}
                                fontWeight={400}
                                fill="#667085"
                                width={100}
                            />
                            <Legend wrapperStyle={{ display: 'none' }} />
                            <Tooltip content={<CustomTooltipforAttempts />} cursor={false} />
                            <Bar
                                dataKey="Accuracy"
                                barSize={30}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default TimeAccuracy;