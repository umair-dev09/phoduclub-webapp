"use client";
import React from "react";
import Leaderboard from "@/components/DashboardComponents/AnalyticsComponents/Quizzes-Components/Leaderboard";



import { Bar, BarChart, CartesianGrid, Label, Legend, Tooltip, XAxis, YAxis } from "recharts"
import { display } from "@mui/system";




function Quizzes() {
    const data = [
        {
            "name": "Chemistry",
            "correct": 8,
            "incorrect": 2
        },
        {
            "name": "Physics",
            "correct": 4,
            "incorrect": 6
        },
        {
            "name": "Maths",
            "correct": 2,
            "incorrect": 8
        },

    ]


    return (
        <div className="flex flex-1 flex-col pt-6">
            <div className="text-[#1D2939]"><h3>Overview</h3></div>
            {/* <div className="pt-5 pb-3">
                <div className="bg-white p-4 flex flex-col rounded-2xl border border-lightGrey">
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

                  
                        <div className="flex flex-1 flex-row justify-between pr-4">
                            <div className="flex flex-col gap-2">
                                <div className="font-normal text-xs text-[#667085]">Attempted Questions</div>
                                <h3 className="text-[15px]">2000</h3>
                            </div>
                            <div className="flex justify-center items-center">
                                <div className="w-px bg-lightGrey h-4/5"></div>
                            </div>
                        </div>

                
                        <div className="flex flex-1 flex-col gap-2">
                            <div className="font-normal text-xs text-[#667085]">Time Taken</div>
                            <h3 className="text-[15px]">80 of 100 hrs</h3>
                        </div>
                    </div>

        
                    <div className="flex flex-row justify-between mt-9">
                        <div className="flex flex-1 flex-row justify-between pr-4">
                            <div className="flex flex-col gap-2">
                                <div className="font-normal text-xs text-[#667085]">Answered Correct</div>
                                <h3 className="text-[15px]">800</h3>
                            </div>
                            <div className="flex justify-center items-center">
                                <div className="w-px bg-lightGrey h-4/5"></div>
                            </div>
                        </div>

                        <div className="flex flex-1 flex-row justify-between pr-4">
                            <div className="flex flex-col gap-2">
                                <div className="font-normal text-xs text-[#667085]">Answered Incorrect</div>
                                <h3 className="text-[15px]">200</h3>
                            </div>
                            <div className="flex justify-center items-center">
                                <div className="w-px bg-lightGrey h-4/5"></div>
                            </div>
                        </div>

                        <div className="flex flex-1 flex-col gap-2">
                            <div className="font-normal text-xs text-[#667085]">Total Score</div>
                            <h3 className="text-[15px]">568</h3>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="flex w-full h-auto flex-row gap-4">
                <div className="w-1/2 rounded-xl h-[300px] flex-col">

                    <BarChart width={400} height={350} data={data}>
                        <CartesianGrid strokeDasharray="3 3"
                            horizontal={false}  // Hides horizontal grid lines
                            vertical={false} />
                        <XAxis dataKey="name" />




                        <YAxis />
                        <Tooltip cursor={false} />
                        <Legend wrapperStyle={{ display: 'none' }} />
                        <Bar dataKey="pv" fill="#17B26A" />
                        <Bar dataKey="uv" fill="#F04438" />
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