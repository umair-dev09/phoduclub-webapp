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

// export const description = "A donut chart with text"

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
            <div className="relative bg-white border border-lightGrey rounded-md w-auto h-auto text-sm pointer-events-none shadow-md p-4">
                {/* Tooltip content */}
                <div className="flex items-center w-auto h-auto justify-center mb-1">
                    <div className="flex items-center">
                        <span className="inline-block w-3 h-3 rounded-full bg-[#17B26A] p-[3px] mr-1" />
                        <span className="text-[#667085] font-normal text-sm ml-1">{`Correct `}</span>
                        <span className=" ml-12 font-semibold text-base text-[#1D2939]">{correctValue || 0}</span>
                    </div>
                </div>
                <div className="flex items-center w-auto h-auto justify-center mb-1 ">
                    <div className="flex items-center">
                        <span className="inline-block w-3 h-3 rounded-full bg-[#F04438] p-[3px] mr-1" />
                        <span className="text-[#667085] font-normal text-sm ml-1">{`Incorrect `}</span>
                        <span className="ml-10 font-semibold text-base text-[#1D2939]">{incorrectValue || 0}</span>
                    </div>
                </div>
                <div className="flex items-center w-auto h-auto justify-center">
                    <div className="flex items-center">
                        <span className="inline-block w-3 h-3 rounded-full bg-[#D0D5DD] p-[3px]" />
                        <span className="text-[#667085] font-normal text-sm ml-1">{`Unaswered `}</span>
                        <span className="ml-6 font-semibold text-base text-[#1D2939]">{UnansweredValue || 0}</span>
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
        const { name, value, payload: { fill } } = payload[0];

        return (
            <div className="flex flex-row items-center justify-between w-auto  bg-white border border-lightGrey rounded-md p-[10px] shadow-md">
                <div className="flex flex-row items-center">
                    {/* Color dot */}
                    <span className="inline-block w-3 h-3 rounded-full p-[3px] mr-2 "
                        style={{ backgroundColor: fill }} // Applying dynamic background color
                    />
                    {/* Name and value */}
                    <p className="flex items-center text-sm font-semibold text-[#667085] mr-4">{name}</p>
                </div>
                <p className="flex items-center text-[0.938rem] font-semibold text-[#1D2939]">{value}</p>
            </div>
        );
    }

    return null;
};

interface SubAttemptDetails {
    attemptedQuestions: string;
    score: string;
    accuracy: string;
    answeredCorrect: string;
    answeredIncorrect: string;
    timeTaken: number;
    testTime: number;
    questions: AnsweredQuestion[];
    sectionName: string;
    attemptId: string;
}

interface GraphicalViewOfOverviewProps {
    questions: AnsweredQuestion[];
    subattempts: SubAttemptDetails[];
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


function GraphicalViewOfOverview({ questions, subattempts }: GraphicalViewOfOverviewProps) {

     // Process data for bar chart
     const difficultyData = {
        Easy: { correct: 0, incorrect: 0, unanswered: 0 },
        Medium: { correct: 0, incorrect: 0, unanswered: 0 },
        Hard: { correct: 0, incorrect: 0, unanswered: 0 }
    };

    questions.forEach(question => {
        if (!question.answered) {
            difficultyData[question.difficulty].unanswered++;
        } else if (question.answeredCorrect) {
            difficultyData[question.difficulty].correct++;
        } else {
            difficultyData[question.difficulty].incorrect++;
        }
    });

    const barChartData = [
        {
            name: 'Easy',
            correct: difficultyData['Easy'].correct,
            incorrect: difficultyData['Easy'].incorrect,
            unanswered: difficultyData['Easy'].unanswered
        },
        {
            name: 'Medium',
            correct: difficultyData['Medium'].correct,
            incorrect: difficultyData['Medium'].incorrect,
            unanswered: difficultyData['Medium'].unanswered
        },
        {
            name: 'Hard',
            correct: difficultyData['Hard'].correct,
            incorrect: difficultyData['Hard'].incorrect,
            unanswered: difficultyData['Hard'].unanswered
        }
    ];

    const chartData = [    
        { subjects: "Physics", marks: 27, fill: "#C7A5FF" },
        { subjects: "Chemistry", marks: 200, fill: "#9012FF" },
        { subjects: "Mathematics", marks: 287, fill: "#5C02B0" },
    ];

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
        <div className="mb-8">
            <div className="flex w-full h-auto flex-row gap-4">
                <div className="w-1/2 rounded-xl h-[320px] flex-col bg-[#FFFFFF] border border-[#EAECF0]">
                    <div className="h-[50px] flex flex-row justify-start mt-3 ml-5 ">
                        <div className=" flex flex-row gap-5">
                            <div className="flex flex-row gap-2">
                                <span className="inline-block w-[10px] h-[10px] rounded-full bg-[#17B26A] mt-[19px]" />
                                <span className="flex items-center justify-center text-[#667085] font-normal text-sm">Correct</span>
                            </div>
                            <div className="flex flex-row gap-2">
                                <span className="inline-block w-[10px] h-[10px] rounded-full bg-[#F04438] mt-[19px]" />
                                <span className="flex items-center justify-center text-[#667085] font-normal text-sm mr-5">Incorrect</span>
                            </div>
                            <div className="flex flex-row gap-2">
                                <span className="inline-block w-[10px] h-[10px] rounded-full bg-[#D0D5DD] mt-[19px]" />
                                <span className="flex items-center justify-center text-[#667085] font-normal text-sm">Unanswered</span>
                            </div>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height="80%" className="pb-3">
                         <BarChart
                         data={barChartData}
                         barGap={5}
                         barCategoryGap="30%"
                         margin={{ right: 20, left: -20 }}
                         >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={false} />
                         <XAxis
                             dataKey="name"
                             fontFamily="poppins"
                             fontSize={14}
                             fontWeight={400}
                             fill="#667085"
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
                         <Bar dataKey="unanswered" fill="#D0D5DD" barSize={55} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex flex-col w-1/2 p-4 bg-white border border-lightGrey rounded-xl">
                    <div><h3>Score by Subjects</h3></div>
                    <div className="flex flex-1 items-center">
                        <ResponsiveContainer className='flex w-[50%]'>
                            <ChartContainer 
                                config={{
                                    ...Object.fromEntries(
                                        subattempts.map((subattempt, index) => [
                                            subattempt.sectionName,
                                            {
                                                label: subattempt.sectionName,
                                                color: subjectColors[index % subjectColors.length]
                                            }
                                        ])
                                    )
                                }}
                                className="h-auto w-[70%]"
                            >
                                <PieChart>
                                    <Tooltip content={<CustomPieTooltip />} cursor={false} />
                                    <Pie
                                        data={subattempts
                                            .filter(subattempt => parseInt(subattempt.score) >= 0)
                                            .map((subattempt, index) => ({
                                                subjects: subattempt.sectionName,
                                                marks: parseInt(subattempt.score),
                                                fill: subjectColors[index % subjectColors.length]
                                            }))}
                                        dataKey="marks"
                                        nameKey="subjects"
                                        innerRadius={60}
                                        strokeWidth={3}
                                        stroke="#FFFFFF"
                                    >
                                        {subattempts
                                            .filter(subattempt => parseInt(subattempt.score) >= 0)
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
                                        <h3>{subattempt.score}</h3>
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

export default GraphicalViewOfOverview;