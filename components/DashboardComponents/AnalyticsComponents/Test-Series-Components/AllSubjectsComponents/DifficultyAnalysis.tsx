import React from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from "recharts";
import Image from "next/image";

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
            <div className="relative bg-white border border-lightGrey rounded-md w-auto h-auto text-sm pointer-events-none p-4" style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
                <div className="flex items-center w-auto h-auto justify-center">
                    <div className="flex items-center">
                        <span className="inline-block w-3 h-3 rounded-full bg-[#17B26A] p-[3px] mr-1" />
                        <span className="text-[#667085] font-normal text-sm ml-1">{`Correct `}</span>
                        <span className=" ml-12 font-semibold text-base text-[#1D2939]">{correctValue}</span>
                    </div>
                </div>
                <div className="flex items-center w-auto h-auto justify-center">
                    <div className="flex items-center">
                        <span className="inline-block w-3 h-3 rounded-full bg-[#F04438] p-[3px] mr-1" />
                        <span className="text-[#667085] font-normal text-sm ml-1">{`Incorrect `}</span>
                        <span className="ml-10 font-semibold text-base text-[#1D2939]">{incorrectValue}</span>
                    </div>
                </div>
                <div className="flex items-center w-auto h-auto justify-center">
                    <div className="flex items-center">
                        <span className="inline-block w-3 h-3 rounded-full bg-[#D0D5DD] p-[3px] mr-1" />
                        <span className="text-[#667085] font-normal text-sm ml-1">{`Unanswered `}</span>
                        <span className="ml-6 font-semibold text-base text-[#1D2939]">{UnansweredValue}</span>
                    </div>
                </div>
            </div>
        );
    }
    return null;
}

interface SubAttemptDetails {
    attemptedQuestions: string;
    score: string;
    accuracy: string;
    answeredCorrect: string;
    answeredIncorrect: string;
    timeTaken: string;
    testTime: string;
    questions: AnsweredQuestion[];
    sectionName: string;
    attemptId: string;
}

interface DifficultyAnalysisProps {
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

const calculateDifficultyData = (questions: AnsweredQuestion[]) => {
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

    return [
        {
            name: 'Easy',
            correct: difficultyData.Easy.correct,
            incorrect: difficultyData.Easy.incorrect,
            Unanswered: difficultyData.Easy.unanswered
        },
        {
            name: 'Medium',
            correct: difficultyData.Medium.correct,
            incorrect: difficultyData.Medium.incorrect,
            Unanswered: difficultyData.Medium.unanswered
        },
        {
            name: 'Hard',
            correct: difficultyData.Hard.correct,
            incorrect: difficultyData.Hard.incorrect,
            Unanswered: difficultyData.Hard.unanswered
        }
    ];
};

const DifficultyChart = ({ title, data }: { title: string, data: any[] }) => (
    <div className="w-full rounded-xl h-[320px] flex bg-[#FFFFFF] border border-solid border-[#EAECF0] pr-3">
        <div className="flex flex-1 flex-col p-2">
            <span className="font-semibold text-[#1D2939] text-lg ml-5 pt-4">{title}</span>
            <div className="h-[40px] flex flex-row items-center justify-center py-1">
                <div className="flex flex-row gap-4">
                    <div className="flex flex-row gap-2">
                        <Image
                            src="/icons/correct.svg"
                            width={12}
                            height={12}
                            alt="correct-icon"
                            className="mb-1"
                        />
                        <span className="flex items-center justify-center text-[#667085] font-normal text-sm">Correct</span>
                    </div>
                    <div className="flex flex-row gap-2">
                        <Image
                            src="/icons/incorrect.svg"
                            width={12}
                            height={12}
                            alt="correct-icon"
                            className="mb-1"
                        />
                        <span className="flex items-center justify-center text-[#667085] font-normal text-sm">Incorrect</span>
                    </div>
                    <div className="flex flex-row gap-2">
                        <Image
                            src="/icons/unanswered.svg"
                            width={12}
                            height={12}
                            alt="correct-icon"
                            className="mb-1"
                        />
                        <span className="flex items-center justify-center text-[#667085] font-normal text-sm">Unanswered</span>
                    </div>
                </div>
            </div>
            <ResponsiveContainer width="100%" height="70%">
                <BarChart
                    data={data}
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
                    <Bar dataKey="correct" fill="#17B26A" barSize={49} />
                    <Bar dataKey="incorrect" fill="#F04438" barSize={49} />
                    <Bar dataKey="Unanswered" fill="#D0D5DD" barSize={49} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    </div>
);

function DifficultyAnalysis({ questions, subattempts }: DifficultyAnalysisProps) {
    const overallData = calculateDifficultyData(questions);

    const renderChartRows = () => {
        const rows = [];
        
        // First row with overall chart and first subattempt
        rows.push(
            <div key="first-row" className="flex flex-row gap-4 h-auto">
                <DifficultyChart title="Overall Difficulty Analysis" data={overallData} />
                {subattempts.length > 0 && (
                    <DifficultyChart 
                        title={`${subattempts[0].sectionName} Difficulty Analysis`}
                        data={calculateDifficultyData(subattempts[0].questions)}
                    />
                )}
            </div>
        );

        // Remaining subattempts in pairs
        for (let i = 1; i < subattempts.length; i += 2) {
            rows.push(
                <div key={`row-${i}`} className="flex flex-row gap-4 h-auto">
                    <DifficultyChart 
                        title={`${subattempts[i].sectionName} Difficulty Analysis`}
                        data={calculateDifficultyData(subattempts[i].questions)}
                    />
                    {i + 1 < subattempts.length && (
                        <DifficultyChart 
                            title={`${subattempts[i + 1].sectionName} Difficulty Analysis`}
                            data={calculateDifficultyData(subattempts[i + 1].questions)}
                        />
                    )}
                </div>
            );
        }

        return rows;
    };

    return (
        <div className="gap-4 flex-col flex">
            {renderChartRows()}
        </div>
    );
}

export default DifficultyAnalysis;