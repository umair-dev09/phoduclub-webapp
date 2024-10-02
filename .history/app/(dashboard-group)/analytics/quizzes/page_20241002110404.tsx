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
                            <span className="ml-12 mr-2 font-semibold text-base text-[#1D2939]">{correctValue}</span>

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
            "correct": 0,
            "incorrect": 2
        },




    ];

    return (
        <div className="flex flex-1 flex-col pt-6">
            <div className="text-[#1D2939]"><h3>Overview</h3></div>

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
                    <BarChart width={550} height={250} data={data} barGap={5} barCategoryGap="5%" margin={{ top: 10, }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={false} />
                        <XAxis
                            dataKey="name"
                            fontFamily="poppins"
                            fontSize={12}
                            fontWeight={400}
                            fill="#667085"
                        />
                        <YAxis
                            domain={[0, 'dataMax']}
                            fontFamily="poppins"
                            fontSize={12}
                            fontWeight={400}
                            fill="#667085"
                        />
                        <Tooltip content={<CustomTooltip />} cursor={false} />
                        <Legend wrapperStyle={{ display: 'none' }} />
                        {/* Set the width of the bars to 57px */}
                        <Bar dataKey="correct" fill="#17B26A" barSize={55} />
                        <Bar dataKey="incorrect" fill="#F04438" barSize={55} />
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
