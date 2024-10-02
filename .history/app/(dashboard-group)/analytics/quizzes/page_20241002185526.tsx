"use client";
import React, { useState } from "react";
import Leaderboard from "@/components/DashboardComponents/AnalyticsComponents/Quizzes-Components/Leaderboard";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from "recharts";

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

                fontSize: '14px',
                pointerEvents: 'none', // Prevent mouse events from affecting the tooltip
                boxShadow: "2px 5px 11px 0px #0000001A",
                padding: '10px'






            }}>
                {/* Tooltip content */}
                <div className="m-2">
                    <div style={{ display: 'flex', alignItems: 'center', width: "139px", height: "27px", justifyItems: 'center', }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                            <span style={{
                                display: 'inline-block',
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                backgroundColor: '#17B26A', // Color for "Correct"




                            }} />
                            <span className="text-[#667085] font-normal text-sm ml-1">{`Correct `}</span>
                            <span className="ml-14 font-semibold text-base text-[#1D2939]">{correctValue}</span>

                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', width: "139px", height: "27px", justifyItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', }}>
                            <span style={{
                                display: 'inline-block',
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                backgroundColor: '#F04438', // Color for "Incorrect"
                                marginRight: '4px'

                            }} />
                            <span className="text-[#667085] font-normal text-sm ml-1">{`Incorrect `}</span>
                            <span className="ml-12 mr-2 font-semibold text-base text-[#1D2939]">{incorrectValue}</span>

                        </div>
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
            "correct": 12,
            "incorrect": 5
        },
        {
            "name": "Physics",
            "correct": 4,
            "incorrect": 1
        },
        {
            "name": "Maths",
            "correct": 9,
            "incorrect": 1
        },




    ];
    const Attempts = [
        {
            "subject": "Chemistry",
            "Attempts": 12,

        },
        {
            "subject": "Physics",
            "Attempts": 20,

        },
        {
            "subject": "Maths",
            "Attempts": 2,

        },




    ];

    return (
        <div className="flex flex-1 flex-col pt-6">
            <div className="text-[#1D2939]"><h3>Overview</h3></div>
            <div className="pt-5 pb-3">
                <div className="bg-white p-4 flex flex-col rounded-2xl border border-lightGrey">
                    <div className="flex flex-row justify-between">
                        {/* Total Questions */}
                        <div className="flex flex-1 flex-row justify-between pr-4">
                            <div className="flex flex-col gap-2">
                                <div className="font-normal text-xs text-[#667085]">Total Questions</div>
                                <h3 className="text-[15px]">3000</h3>
                            </div>
                            <div className="flex justify-center items-center">
                                <div className="w-px bg-lightGrey h-4/5"></div>
                            </div>
                        </div>

                        {/* Attempted Questions */}
                        <div className="flex flex-1 flex-row justify-between pr-4">
                            <div className="flex flex-col gap-2">
                                <div className="font-normal text-xs text-[#667085]">Attempted Questions</div>
                                <h3 className="text-[15px]">2000</h3>
                            </div>
                            <div className="flex justify-center items-center">
                                <div className="w-px bg-lightGrey h-4/5"></div>
                            </div>
                        </div>

                        {/* Time Taken */}
                        <div className="flex flex-1 flex-col gap-2">
                            <div className="font-normal text-xs text-[#667085]">Time Taken</div>
                            <h3 className="text-[15px]">80 of 100 hrs</h3>
                        </div>
                    </div>

                    {/* Additional Stats */}
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
            </div>


            <div className="flex w-full h-auto flex-row gap-4">
                <div className="w-1/2 rounded-xl h-[320px] flex-col bg-[#FFFFFF] border border-solid border-[#EAECF0]">
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
                            <Tooltip content={<CustomTooltip />} cursor={false} />
                            <Legend wrapperStyle={{ display: 'none' }} />
                            <Bar dataKey="correct" fill="#17B26A" barSize={55} />
                            <Bar dataKey="incorrect" fill="#F04438" barSize={55} />
                        </BarChart>
                    </ResponsiveContainer>




                </div>

                <div className="w-1/2 rounded-xl h-[320px] flex-col bg-[#FFFFFF] border border-solid border-[#EAECF0]">
                    <ResponsiveContainer width="100%" height="80%">
                        <BarChart

                            data={data}
                            barGap={5}
                            barCategoryGap="5%"
                            margin={{ right: 20, }} // Set left margin to 0

                        >
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={false} />
                            <XAxis
                                domain={[0, 'dataMax']}
                                fontFamily="poppins"
                                fontSize={14}
                                fontWeight={400}
                                fill="#667085"
                                padding={{ left: 10, right: 20 }}
                            />
                            <YAxis

                                dataKey="subject"
                                fontFamily="poppins"
                                fontSize={14}
                                fontWeight={400}
                                fill="#667085"

                            />

                            <Legend wrapperStyle={{ display: 'none' }} />
                            <Bar dataKey="correct" fill="#17B26A" barSize={55} />
                            <Bar dataKey="incorrect" fill="#F04438" barSize={55} />
                        </BarChart>
                    </ResponsiveContainer>


                </div>
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


