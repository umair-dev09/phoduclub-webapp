import React, { useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from "recharts";


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
            <div style={{
                position: 'relative',
                backgroundColor: 'white',
                border: '1px solid #EAECF0',
                borderRadius: '8px',
                width: 'auto',
                height: "auto",

                fontSize: '14px',
                pointerEvents: 'none', // Prevent mouse events from affecting the tooltip
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                padding: '16px'

            }}>
                {/* Tooltip content */}

                <div style={{ display: 'flex', alignItems: 'center', width: "auto", height: "auto", justifyItems: 'center', }}>
                    <div style={{ display: 'flex', alignItems: 'center', }}>
                        <span style={{
                            display: 'inline-block',
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: '#17B26A',
                            padding: '3px',
                            marginRight: '4px',
                        }} />
                        <span className="text-[#667085] font-normal text-sm ml-1">{`Correct `}</span>
                        <span className=" ml-12 font-semibold text-base text-[#1D2939]">{correctValue}</span>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', width: "auto", height: "auto", justifyItems: 'center', }}>
                    <div style={{ display: 'flex', alignItems: 'center', }}>
                        <span style={{
                            display: 'inline-block',
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: '#F04438', // Color for "Incorrect"
                            marginRight: '4px',
                            padding: '3px'
                        }} />
                        <span className="text-[#667085] font-normal text-sm ml-1">{`Incorrect `}</span>
                        <span className="ml-10 font-semibold text-base text-[#1D2939]">{incorrectValue}</span>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', width: "auto", height: "auto", justifyItems: 'center', }}>
                    <div style={{ display: 'flex', alignItems: 'center', }}>
                        <span style={{
                            display: 'inline-block',
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: '#F04438', // Color for "Incorrect"
                            marginRight: '4px',
                            padding: '3px'
                        }} />
                        <span className="text-[#667085] font-normal text-sm ml-1">{`Unaswered `}</span>
                        <span className="ml-6 font-semibold text-base text-[#1D2939]">{UnansweredValue}</span>
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
            "incorrect": 5,
            "Unanswered": 3

        },
        {
            "name": "Physics",
            "correct": 4,
            "incorrect": 1,
            "Unanswered": 8
        },
        {
            "name": "Maths",
            "correct": 9,
            "incorrect": 1,
            "Unanswered": 5
        },
    ];

    return (
        <div>




            <div className="flex flex-row gap-4 h-auto mx-8">
                <div className=" w-full rounded-xl h-auto flex-col bg-[#FFFFFF] border border-solid border-[#EAECF0]">
                    <div className="h-[50px] flex flex-row justify-between mt-3 ">
                        <span className="flex items-center justify-center ml-10 font-semibold text-[#1D2939] text-lg">Difficulty Analysis</span>
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
                                <span className="flex items-center justify-center text-[#667085] font-normal text-sm ">Incorrect</span>
                            </div>
                            <div className="flex flex-row gap-2">
                                <span style={{
                                    display: 'inline-block',
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    backgroundColor: '#17B26A',
                                    marginTop: "19px" // Color for "Correct"
                                }} />
                                <span className="flex items-center justify-center text-[#667085] font-normal text-sm mr-3">Unanswered</span>
                            </div>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height="80%">
                        <BarChart
                            data={data}
                            barGap={100}
                            barCategoryGap="10%"
                            margin={{ right: 20, }} // Set left margin to 0
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
                            <Bar dataKey="Unanswered" fill="#D0D5DD" barSize={55} />
                        </BarChart>
                    </ResponsiveContainer>



                </div>
                <div className=" w-full rounded-xl h-[265px] flex-col bg-[#FFFFFF] border border-solid border-[#EAECF0]">

                </div>
            </div>





        </div>
    );
}

export default Quizzes;