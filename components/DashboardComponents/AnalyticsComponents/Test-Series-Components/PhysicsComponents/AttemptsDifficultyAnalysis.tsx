import React from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from "recharts";
import { PieChart, Pie, Cell } from 'recharts';
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

interface PieTooltipProps extends TooltipProps<number, string> {
    active?: boolean;
    payload?: any[];
}

interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
}

interface AttemptsDifficultyAnalysisprops {
    questions: AnsweredQuestion[];
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

const CustomPieTooltip: React.FC<PieTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const { name, value, payload: { fill } } = payload[0];
        return (
            <div className="flex flex-row items-center justify-between w-40" style={{
                backgroundColor: 'white',
                border: '1px solid #EAECF0',
                borderRadius: '8px',
                padding: '10px',
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
            }}>
                <div className="flex flex-row items-center">
                    <span style={{
                        display: 'inline-block',
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: fill,
                        marginRight: '8px'
                    }} />
                    <p className="flex items-center text-sm font-semibold text-[#667085]">{name}</p>
                </div>
                <p className="flex items-center text-[0.938rem] font-semibold text-[#1D2939]">{value}</p>
            </div>
        );
    }
    return null;
};

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const { fill } = payload[0];
        const correctValue = payload.find(item => item.name === "correct")?.value;
        const incorrectValue = payload.find(item => item.name === "incorrect")?.value;
        const unansweredValue = payload.find(item => item.name === "unanswered")?.value;

        return (
            <div className="relative bg-white border border-lightGrey rounded-md w-auto h-auto text-sm pointer-events-none shadow-md p-4">
                <div className="flex items-center w-auto h-auto justify-center pb-1">
                    <div className="flex items-center">
                        <span className="inline-block w-3 h-3 rounded-full p-[3px] mr-1" style={{ backgroundColor: "#17B26A" }} />
                        <span className="text-[#667085] font-normal text-sm ml-1">Correct</span>
                        <span className="ml-12 font-semibold text-base text-[#1D2939]">{correctValue || 0}</span>
                    </div>
                </div>
                <div className="flex items-center w-auto h-auto justify-center pb-1">
                    <div className="flex items-center">
                        <span className="inline-block w-3 h-3 rounded-full p-[3px] mr-1 bg-[#F04438]" />
                        <span className="text-[#667085] font-normal text-sm ml-1">Incorrect</span>
                        <span className="ml-10 font-semibold text-base text-[#1D2939]">{incorrectValue || 0}</span>
                    </div>
                </div>
                <div className="flex items-center w-auto h-auto justify-center">
                    <div className="flex items-center">
                        <span className="inline-block w-3 h-3 rounded-full p-[3px] mr-1 bg-[#D0D5DD]" />
                        <span className="text-[#667085] font-normal text-sm ml-1">Unanswered</span>
                        <span className="ml-6 font-semibold text-base text-[#1D2939]">{unansweredValue || 0}</span>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

function AttemptsDifficultyAnalysis({ questions }: AttemptsDifficultyAnalysisprops) {
    // Process data for pie chart
    const remarksCounts = questions.reduce((acc, question) => {
        if (question.remarks !== '-') {
            acc[question.remarks] = (acc[question.remarks] || 0) + 1;
        }
        return acc;
    }, {} as Record<string, number>);

    const pieChartData = Object.entries(remarksCounts).map(([remarks, count]) => ({
        browser: remarks,
        visitors: count,
        fill: chartConfig[remarks as keyof typeof chartConfig].color
    }));

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

    return (
        <div className="flex flex-row w-[100%] gap-4 h-auto">
            <div className="flex flex-col w-1/2 bg-white rounded-xl p-4 h-[320px]">
                <div><h3>Score by Subjects</h3></div>
                <div className="flex flex-1 items-center">
                    <ResponsiveContainer className='flex w-[50%]'>
                        <ChartContainer config={chartConfig} className="h-auto w-[70%]">
                            <PieChart>
                                <Tooltip content={<CustomPieTooltip />} cursor={false} />
                                <Pie
                                    data={pieChartData}
                                    dataKey="visitors"
                                    nameKey="browser"
                                    innerRadius={60}
                                    strokeWidth={3}
                                    stroke="#FFFFFF"
                                >
                                    {pieChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ChartContainer>
                    </ResponsiveContainer>
                    <div className="grid grid-cols-2 w-[80%] h-[70%] mr-4 justify-evenly">
                        {pieChartData.map((subject, index) => (
                            <div key={index} className="flex flex-1 items-center">
                                <div><span className="block rounded-full w-3 h-3 mr-2 mt-[23%]" style={{ backgroundColor: subject.fill }}></span></div>
                                <div>
                                    {subject.browser}
                                    <h3>{subject.visitors}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex flex-col w-1/2 h-[320px] rounded-xl bg-white border border-[#EAECF0]">
                <div className="h-[50px] flex flex-row justify-between mt-3">
                    <span className="flex items-center justify-center ml-5 font-semibold text-[#1D2939] text-lg">Difficulty Analysis</span>
                    <div className="flex flex-row gap-5">
                        <div className="flex flex-row gap-2">
                            <span className="inline-block w-[10px] h-[10px] rounded-full bg-[#17B26A] mt-[19px]" />
                            <span className="flex items-center justify-center text-[#667085] font-normal text-sm">Correct</span>
                        </div>
                        <div className="flex flex-row gap-2">
                            <span className="inline-block w-[10px] h-[10px] rounded-full bg-[#F04438] mt-[19px]" />
                            <span className="flex items-center justify-center text-[#667085] font-normal text-sm">Incorrect</span>
                        </div>
                        <div className="flex flex-row gap-2">
                            <span className="inline-block w-[10px] h-[10px] rounded-full bg-[#D0D5DD] mt-[19px]" />
                            <span className="flex items-center justify-center text-[#667085] font-normal text-sm mr-3">Unanswered</span>
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
        </div>
    );
}

export default AttemptsDifficultyAnalysis;