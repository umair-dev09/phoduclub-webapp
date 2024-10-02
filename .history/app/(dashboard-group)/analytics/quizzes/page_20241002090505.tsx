"use client";
import React from "react";
import Leaderboard from "@/components/DashboardComponents/AnalyticsComponents/Quizzes-Components/Leaderboard";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, TooltipProps, XAxis, YAxis } from "recharts";

interface CustomTooltipProps extends TooltipProps<number, string> {
    active?: boolean; // Optional boolean for the active state
    payload?: { value: number; name: string }[]; // Adjusted payload structure
    label?: string; // Label for the tooltip
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const correctValue = payload.find(item => item.name === "correct")?.value;
        const incorrectValue = payload.find(item => item.name === "incorrect")?.value;

        return (
            <div style={{
                position: 'relative',
                backgroundColor: 'white',
                border: '1px solid #EAECF0',
                borderRadius: '8px',
                width: '169px',
                height: "89px",
                padding: '10px',
                fontSize: '14px',
                pointerEvents: 'none', // Prevent mouse events from affecting the tooltip
                boxShadow: "2px 5px 11px 0px #0000001A",
                margin: '30px'






            }}>
                {/* Tooltip content */}
                <div style={{ display: 'flex', alignItems: 'center', width: "157px", height: "27px", gap: '6px', justifyItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginRight: '5px', gap: '6px' }}>
                        <span style={{
                            display: 'inline-block',
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: '#17B26A', // Color for "Correct"
                            marginRight: '5px',



                        }} />
                        <span>{`Correct `}</span>
                        <span className="ml-14 font-semibold text-base text-[#1D2939]">{correctValue}</span>

                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', width: "157px", height: "27px", gap: '6px', justifyItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginRight: '5px', }}>
                        <span style={{
                            display: 'inline-block',
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: '#F04438', // Color for "Incorrect"
                            marginRight: '5px',
                            marginLeft: '2px',
                        }} />
                        <span>{`inCorrect `}</span>
                        <span className="ml-14 font-semibold text-base text-[#1D2939]">{correctValue}</span>

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
            "correct": 8,
            "incorrect": 20
        },
        {
            "name": "Physics",
            "correct": 4,
            "incorrect": 16
        },
        {
            "name": "Maths",
            "correct": 2,
            "incorrect": 18
        },

    ];

    return (
        <div className="flex flex-1 flex-col pt-6">
            <div className="text-[#1D2939]"><h3>Overview</h3></div>

            <div className="flex w-full h-auto flex-row gap-4">
                <div className="w-1/2 rounded-xl h-[300px] flex-col">
                    <BarChart width={400} height={350} data={data}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 'dataMax']} /> {/* Set domain for Y-axis */}
                        <Tooltip content={<CustomTooltip />} cursor={false} />
                        <Legend wrapperStyle={{ display: 'none' }} />
                        <Bar dataKey="correct" fill="#17B26A" />
                        <Bar dataKey="incorrect" fill="#F04438" />
                    </BarChart>
                </div>

                <div className="w-1/2 bg-white rounded-xl">Donut Graph</div>
            </div>

            <div className="py-5 text-[#1D2939]"><h3>Leaderboard Analytics</h3></div>
            <div className="flex flex-col w-full h-auto gap-2">
                <table className="flex flex-col w-full h-min border border-lightGrey rounded-xl bg-white text-sm font-medium">
                    <tr className="flex flex-1 py-3 text-neutral-500">
                        <td className="w-[11%] text-center"><p>Rank</p></td>
                        <td className="w-[23%]">Students</td>
                        <td className="w-[11%] text-center"><p>Scores</p></td>
                        <td className="w-[11%] text-center"><p>Attempted Question</p></td>
                        <td className="w-[11%] text-center"><p>Answered Correct</p></td>
                        <td className="w-[11%] text-center"><p>Answered Incorrect</p></td>
                        <td className="w-[11%] text-center"><p>Accuracy</p></td>
                        <td className="w-[11%] text-center"><p>Time Spent</p></td>
                    </tr>
                    <Leaderboard />
                </table>
                <div>
                    <table className="flex flex-col w-full h-min border border-lightGrey rounded-xl bg-[#973AFF] text-white text-sm font-medium">
                        <tr className="flex flex-1 py-3">
                            <td className="flex items-center justify-center w-[11%]"><p>1</p></td>
                            <td className="flex flex-row w-[23%] gap-2">
                                <div className="flex items-center">DP</div>
                                <div className="flex items-start justify-start flex-col">
                                    <div className="font-semibold">You</div>
                                    <div className="flex justify-start items-start text-[13px]">jenny#8547</div>
                                </div>
                            </td>
                            <td className="flex items-center justify-center w-[11%]"><p>9632</p></td>
                            <td className="flex items-center justify-center w-[11%]"><p>10000/10000</p></td>
                            <td className="flex items-center justify-center w-[11%]"><p>9500</p></td>
                            <td className="flex items-center justify-center w-[11%]"><p>500</p></td>
                            <td className="flex items-center justify-center w-[11%]"><p>99%</p></td>
                            <td className="flex items-center justify-center w-[11%]"><p className="w-20 text-end">350h</p></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Quizzes;
