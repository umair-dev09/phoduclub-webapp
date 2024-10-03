import React from "react";
import Leaderboard from "@/components/DashboardComponents/AnalyticsComponents/Quizzes-Components/Leaderboard";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip } from 'recharts';

function Quizzes() {
    const data = [
        {
            "name": "Page A",
            "uv": 4000,
            "pv": 2400
        },
        {
            "name": "Page B",
            "uv": 3000,
            "pv": 1398
        },
        {
            "name": "Page C",
            "uv": 2000,
            "pv": 9800
        },
        {
            "name": "Page D",
            "uv": 2780,
            "pv": 3908
        },
        {
            "name": "Page E",
            "uv": 1890,
            "pv": 4800
        },
        {
            "name": "Page F",
            "uv": 2390,
            "pv": 3800
        },
        {
            "name": "Page G",
            "uv": 3490,
            "pv": 4300
        }
    ];

    return (
        <div className="flex flex-1 flex-col">
            <div className="overflow-y-auto h-full flex flex-1 flex-col">
                <div className="text-[#1D2939]"><h3>Overview</h3></div>
                <div className="pt-5 pb-3">
                    <div className="bg-white p-4 flex flex-col rounded-2xl border border-lightGrey">
                        {/* Stats Overview */}
                        <div className="flex flex-row justify-between">
                            <div className="flex flex-1 flex-row justify-between pr-4">
                                <div className="flex flex-col gap-2">
                                    <div className="font-normal text-xs text-[#667085]">Total Questions</div>
                                    <h3 className="text-[15px]">3000</h3>
                                </div>
                                <div className="flex justify-center items-center">
                                    <div className="w-px bg-lightGrey h-4/5"></div>
                                </div>
                            </div>
                            {/* Other Stats */}
                            {/* ... */}
                        </div>
                    </div>
                </div>

                {/* Bar Chart */}
                <div className="flex w-full h-auto flex-row gap-4">
                    <div className="w-1/2 rounded-xl h-[300px] bg-red-500 flex flex-col">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />

                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="w-1/2 bg-white rounded-xl">Donut Graph</div>
                </div>

                {/* Leaderboard Analytics */}
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
                    {/* Highlighted Row */}
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
        </div>
    );
}

export default Quizzes;
