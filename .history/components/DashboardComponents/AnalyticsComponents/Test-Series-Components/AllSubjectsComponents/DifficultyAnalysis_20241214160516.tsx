import React from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis } from "recharts";
import Image from "next/image";


interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
}
// this is the custom tooltip code  ----->

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const correctValue = payload.find(item => item.name === "correct")?.value;
        const incorrectValue = payload.find(item => item.name === "incorrect")?.value;
        const UnansweredValue = payload.find(item => item.name === "Unanswered")?.value;

        return (
            <div className="relative bg-white border border-lightGrey rounded-md w-auto h-auto text-sm pointer-events-none p-4" style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
                {/* Tooltip content */}

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
                        <span className="text-[#667085] font-normal text-sm ml-1">{`Unaswered `}</span>
                        <span className="ml-6 font-semibold text-base text-[#1D2939]">{UnansweredValue}</span>
                    </div>
                </div>

            </div>
        );
    }
    return null;
}
// The End --------------------------------------------------------------------------------------------------->
function Attemptsgraph() {
    // Data for Overall Difficulty Analysis
    const OverallDifficultyAnalysis = [
        {
            "name": "Easy",
            "correct": 12,
            "incorrect": 5,
            "Unanswered": 3

        },
        {
            "name": "Moderate",
            "correct": 4,
            "incorrect": 1,
            "Unanswered": 8
        },
        {
            "name": "Tough",
            "correct": 9,
            "incorrect": 1,
            "Unanswered": 5
        },
    ];
    //  Data for Physics Difficulty Analysis
    const PhysicsDifficultyAnalysis = [
        {
            "name": "Easy",
            "correct": 12,
            "incorrect": 5,
            "Unanswered": 3

        },
        {
            "name": "Moderate",
            "correct": 4,
            "incorrect": 1,
            "Unanswered": 8
        },
        {
            "name": "Tough",
            "correct": 3,
            "incorrect": 3,
            "Unanswered": 3
        },
    ];
    // Data for Chemistry Difficulty Analysis 
    const ChemistryDifficultyAnalysis = [
        {
            "name": "Easy",
            "correct": 1,
            "incorrect": 2,
            "Unanswered": 3

        },
        {
            "name": "Moderate",
            "correct": 4,
            "incorrect": 1,
            "Unanswered": 4
        },
        {
            "name": "Tough",
            "correct": 10,
            "incorrect": 10,
            "Unanswered": 10
        },
    ];
    //    Data for  Mathematics Difficulty Analysis
    const MathematicsDifficultyAnalysis = [
        {
            "name": "Easy",
            "correct": 1,
            "incorrect": 2,
            "Unanswered": 3

        },
        {
            "name": "Moderate",
            "correct": 4,
            "incorrect": 5,
            "Unanswered": 6
        },
        {
            "name": "Tough",
            "correct": 7,
            "incorrect": 8,
            "Unanswered": 9
        },
    ];
    return (
        <div className=" gap-4 flex-col flex">


            <div className="flex flex-row gap-4 h-auto">
                {/* content of Overall Difficulty Analysis */}
                <div className=" w-full rounded-xl h-[320px] flex  bg-[#FFFFFF] border border-solid border-[#EAECF0] pr-3 ">
                    <div className="flex flex-1 flex-col  p-2">
                        <span className="font-semibold text-[#1D2939] text-lg ml-5 pt-4">Difficulty Analysis</span>

                        <div className="h-[40px] flex flex-row items-center justify-center py-1">

                            <div className=" flex flex-row  gap-4">
                                <div className="flex flex-row  gap-2">
                                    <Image
                                        src="/icons/correct.svg"
                                        width={12}
                                        height={12}
                                        alt="correct-icon"
                                        className="mb-1"
                                    />
                                    <span className="flex items-center justify-center text-[#667085] font-normal text-sm">Correct</span>
                                </div>
                                <div className="flex flex-row  gap-2">
                                    <Image
                                        src="/icons/incorrect.svg"
                                        width={12}
                                        height={12}
                                        alt="correct-icon"
                                        className="mb-1"
                                    />
                                    <span className="flex items-center justify-center text-[#667085] font-normal text-sm ">Incorrect</span>
                                </div>
                                <div className="flex flex-row  gap-2">
                                    <Image
                                        src="/icons/unanswered.svg"
                                        width={12}
                                        height={12}
                                        alt="correct-icon"
                                        className="mb-1"
                                    />
                                    <span className="flex items-center justify-center text-[#667085] font-normal text-sm ">Unanswered</span>
                                </div>
                            </div>
                        </div>
                        <ResponsiveContainer width="100%" height="70%">
                            <BarChart
                                data={OverallDifficultyAnalysis}
                                barGap={5}
                                barCategoryGap="30%"
                                margin={{ right: 20, left: -20 }} // Set left margin to 0
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
                {/* content for  Physics Difficulty Analysis */}
                <div className=" w-full rounded-xl h-[320px] flex  bg-[#FFFFFF] border border-solid border-[#EAECF0] pr-3 ">
                    <div className="flex flex-1 flex-col  p-2">
                        <span className="font-semibold text-[#1D2939] text-lg ml-5 pt-4">Physics Difficulty Analysis</span>

                        <div className="h-[40px] flex flex-row items-center justify-center py-1">

                            <div className=" flex flex-row  gap-4">
                                <div className="flex flex-row  gap-2">
                                    <Image
                                        src="/icons/correct.svg"
                                        width={12}
                                        height={12}
                                        alt="correct-icon"
                                        className="mb-1"
                                    />
                                    <span className="flex items-center justify-center text-[#667085] font-normal text-sm">Correct</span>
                                </div>
                                <div className="flex flex-row  gap-2">
                                    <Image
                                        src="/icons/incorrect.svg"
                                        width={12}
                                        height={12}
                                        alt="correct-icon"
                                        className="mb-1"
                                    />
                                    <span className="flex items-center justify-center text-[#667085] font-normal text-sm ">Incorrect</span>
                                </div>
                                <div className="flex flex-row  gap-2">
                                    <Image
                                        src="/icons/unanswered.svg"
                                        width={12}
                                        height={12}
                                        alt="correct-icon"
                                        className="mb-1"
                                    />
                                    <span className="flex items-center justify-center text-[#667085] font-normal text-sm ">Unanswered</span>
                                </div>
                            </div>
                        </div>
                        <ResponsiveContainer width="100%" height="70%">
                            <BarChart
                                data={PhysicsDifficultyAnalysis}
                                barGap={5}
                                barCategoryGap="30%"
                                margin={{ right: 20, left: -20 }} // Set left margin to 0
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
            </div>


            <div className="flex flex-row gap-4 h-auto">
                {/*  content for Chemistry Difficulty Analysis */}
                <div className=" w-full rounded-xl h-[320px] flex  bg-[#FFFFFF] border border-solid border-[#EAECF0] pr-3 ">
                    <div className="flex flex-1 flex-col  p-2">
                        <span className="font-semibold text-[#1D2939] text-lg ml-5 pt-4">Chemistry Difficulty Analysis</span>

                        <div className="h-[40px] flex flex-row items-center justify-center py-1">

                            <div className=" flex flex-row  gap-4">
                                <div className="flex flex-row  gap-2">
                                    <Image
                                        src="/icons/correct.svg"
                                        width={12}
                                        height={12}
                                        alt="correct-icon"
                                        className="mb-1"
                                    />
                                    <span className="flex items-center justify-center text-[#667085] font-normal text-sm">Correct</span>
                                </div>
                                <div className="flex flex-row  gap-2">
                                    <Image
                                        src="/icons/incorrect.svg"
                                        width={12}
                                        height={12}
                                        alt="correct-icon"
                                        className="mb-1"
                                    />
                                    <span className="flex items-center justify-center text-[#667085] font-normal text-sm ">Incorrect</span>
                                </div>
                                <div className="flex flex-row  gap-2">
                                    <Image
                                        src="/icons/unanswered.svg"
                                        width={12}
                                        height={12}
                                        alt="correct-icon"
                                        className="mb-1"
                                    />
                                    <span className="flex items-center justify-center text-[#667085] font-normal text-sm ">Unanswered</span>
                                </div>
                            </div>
                        </div>
                        <ResponsiveContainer width="100%" height="70%">
                            <BarChart
                                data={ChemistryDifficultyAnalysis}
                                barGap={5}
                                barCategoryGap="30%"
                                margin={{ right: 20, left: -20 }} // Set left margin to 0
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
                {/* Mathematics Difficulty Analysis */}
                <div className=" w-full rounded-xl h-[320px] flex  bg-[#FFFFFF] border border-solid border-[#EAECF0] pr-3 ">
                    <div className="flex flex-1 flex-col  p-2">
                        <span className="font-semibold text-[#1D2939] text-lg ml-5 pt-4"> Mathematics Difficulty Analysis</span>

                        <div className="h-[40px] flex flex-row items-center justify-center py-1">

                            <div className=" flex flex-row  gap-4">
                                <div className="flex flex-row  gap-2">
                                    <Image
                                        src="/icons/correct.svg"
                                        width={12}
                                        height={12}
                                        alt="correct-icon"
                                        className="mb-1"
                                    />
                                    <span className="flex items-center justify-center text-[#667085] font-normal text-sm">Correct</span>
                                </div>
                                <div className="flex flex-row  gap-2">
                                    <Image
                                        src="/icons/incorrect.svg"
                                        width={12}
                                        height={12}
                                        alt="correct-icon"
                                        className="mb-1"
                                    />
                                    <span className="flex items-center justify-center text-[#667085] font-normal text-sm ">Incorrect</span>
                                </div>
                                <div className="flex flex-row  gap-2">
                                    <Image
                                        src="/icons/unanswered.svg"
                                        width={12}
                                        height={12}
                                        alt="correct-icon"
                                        className="mb-1"
                                    />
                                    <span className="flex items-center justify-center text-[#667085] font-normal text-sm ">Unanswered</span>
                                </div>
                            </div>
                        </div>
                        <ResponsiveContainer width="100%" height="70%">
                            <BarChart
                                data={MathematicsDifficultyAnalysis}
                                barGap={5}
                                barCategoryGap="30%"
                                margin={{ right: 20, left: -20 }} // Set left margin to 0
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
            </div>
        </div>

    )
}
export default Attemptsgraph;



















































