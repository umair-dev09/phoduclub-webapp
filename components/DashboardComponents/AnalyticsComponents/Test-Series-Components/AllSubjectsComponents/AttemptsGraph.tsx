import React from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts';
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A donut chart with text"

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
            <div className="flex flex-row items-center justify-between w-40 bg-white border border-lightGrey rounded-md p-[10px]" style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
                <div className="flex flex-row items-center">
                    <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: fill }} />
                    <p className="flex items-center text-sm font-semibold text-[#667085]">{name}</p>
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
    questions: AnsweredQuestion[];
    sectionName: string;
    attemptId: string;
}

interface AttemptsgraphProps {
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

const calculateRemarksData = (questions: AnsweredQuestion[]) => {
    const remarksCounts = questions.reduce((acc, question) => {
        if (question.remarks !== '-') {
            acc[question.remarks] = (acc[question.remarks] || 0) + 1;
        }
        return acc;
    }, {} as Record<string, number>);

    return Object.entries(remarksCounts).map(([remarks, count]) => ({
        browser: remarks,
        visitors: count,
        fill: chartConfig[remarks as keyof typeof chartConfig].color
    }));
};

function Attemptsgraph({ questions, subattempts }: AttemptsgraphProps) {
    // Process data for overall pie chart
    const overallPieChartData = calculateRemarksData(questions);

    const renderPieChart = (title: string, data: any[]) => (
        <div className="flex flex-col w-1/2 h-[320px] p-4 bg-white border border-lightGrey rounded-xl">
            <div className="text-[#1D2939]"><h3>{title}</h3></div>
            <div className="flex flex-1 items-center">
                <ResponsiveContainer width="100%" height={250}>
                    <ChartContainer config={chartConfig} className="h-auto w-full">
                        <PieChart>
                            <Tooltip content={<CustomPieTooltip />} cursor={false} />
                            <Pie 
                                data={data} 
                                dataKey="visitors" 
                                nameKey="browser" 
                                innerRadius={60} 
                                strokeWidth={3} 
                                stroke="#FFFFFF"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 w-[80%] h-[70%] mr-4 justify-evenly">
                    {data.map((subject, index) => (
                        <div key={index} className="flex flex-1 items-center">
                            <div>
                                <span 
                                    className="block rounded-full w-3 h-3 mr-2 mt-[23%]" 
                                    style={{ backgroundColor: subject.fill }}
                                />
                            </div>
                            <div>
                                {subject.browser}
                                <h3>{subject.visitors}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    // Group charts into pairs for layout
    const renderChartRows = () => {
        const rows = [];
        
        // First row with overall chart and first subattempt
        rows.push(
            <div key="first-row" className="flex flex-row gap-4 mb-4 h-auto">
                <div className="flex w-full h-auto flex-row gap-4">
                    {renderPieChart("Overall Attempts", overallPieChartData)}
                    {subattempts.length > 0 && renderPieChart(
                        subattempts[0].sectionName,
                        calculateRemarksData(subattempts[0].questions)
                    )}
                </div>
            </div>
        );

        // Remaining subattempts in pairs
        for (let i = 1; i < subattempts.length; i += 2) {
            rows.push(
                <div key={`row-${i}`} className="flex flex-row gap-4 mb-4 h-auto">
                    <div className="flex w-full h-auto flex-row gap-4">
                        {renderPieChart(
                            subattempts[i].sectionName,
                            calculateRemarksData(subattempts[i].questions)
                        )}
                        {i + 1 < subattempts.length && renderPieChart(
                            subattempts[i + 1].sectionName,
                            calculateRemarksData(subattempts[i + 1].questions)
                        )}
                    </div>
                </div>
            );
        }

        return rows;
    };

    return (
        <div className="">
            {renderChartRows()}
        </div>
    );
}

export default Attemptsgraph;