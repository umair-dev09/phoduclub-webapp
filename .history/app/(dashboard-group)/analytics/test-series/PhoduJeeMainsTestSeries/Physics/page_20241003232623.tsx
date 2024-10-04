"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";
// this  is   the code for custom Tooltip
interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const correctValue = payload.find(item => item.name === "correct")?.value;
        const incorrectValue = payload.find(item => item.name === "incorrect")?.value;
        const overallValue = payload.find(item => item.name === "overall")?.value;


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
                boxShadow: "2px 5px 11px 0px #0000001A",
                padding: '20px'

            }}>
                {/* Tooltip content */}
                <div className="  flex flex-col">
                    <div style={{ display: 'flex', alignItems: 'center', width: "auto", height: "auto", justifyItems: 'center', }}>
                        <div style={{ display: 'flex', alignItems: 'center', }}>
                            <span style={{
                                display: 'inline-block',
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                backgroundColor: "#17B26A",
                                marginRight: '4px',
                                padding: '3px'
                            }} />


                            <span className="text-[#667085] font-normal text-sm ml-1 ">{`Correct `}</span>

                            <span className="ml-[50px] font-semibold text-base text-[#1D2939]" >
                                {correctValue}
                            </span>


                        </div>

                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', width: "auto", height: "auto", justifyItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', }}>

                            <span style={{
                                display: 'inline-block',
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                backgroundColor: "#F04438",
                                marginRight: '4px',
                                padding: '3px'

                            }} />
                            <span className="text-[#667085] font-normal text-sm ml-1">{`Incorrect `}</span>
                            <span className="ml-10 font-semibold text-base text-[#1D2939]" >{incorrectValue}</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', width: "auto", height: "auto", justifyItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', }}>
                            <span style={{
                                display: 'inline-block',
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                backgroundColor: '#973AFF',
                                marginRight: '4px',
                                padding: '3px'
                            }} />
                            <span className="text-[#667085] font-normal text-sm ml-1">{`overall `}</span>
                            <span className="ml-14 font-semibold text-base text-[#1D2939]" >{overallValue}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return null;
}
// THe End----------------------------------------------------------------------------------------------------------------------------------------------------------

const data = [
    {
        "name": "First 30 mins",
        "correct": 4000,
        "incorrect": 2400,
        "overall": 2400
    },
    {
        "name": "Next 30 mins",
        "correct": 3000,
        "incorrect": 1398,
        "overall": 2210
    },
    {
        "name": "Next 30 mins",
        "correct": 2000,
        "incorrect": 9800,
        "overall": 2290
    },
    {
        "name": "Next 30 mins",
        "correct": 2780,
        "incorrect": 3908,
        "overall": 2000
    },
    {
        "name": "Next 30 mins",
        "correct": 1890,
        "incorrect": 4800,
        "overall": 2181
    },
    {
        "name": "Next 30 mins",
        "correct": 2390,
        "incorrect": 3800,
        "overall": 2500
    },

]


function JeeMains() {
    const router = useRouter();



    return (
        <div className="flex flex-1 flex-col h-auto overflow-y-auto pb-2">
            <div className="h-[64px]flex items-center">
                <div className="my-5 flex items-center flex-row ">
                    <button className="flex items-center ml-1" onClick={() => router.back()}>
                        <div className="text-[#1D2939] h-[24px] w-auto ml-8" style={{ fontSize: "16px", fontWeight: "600" }}>
                            Test-Series
                        </div>
                        <div className="ml-3 w-[24px]">
                            <Image src="/icons/course-left.svg" width={7} height={12} alt="left-arrow" />
                        </div>
                    </button>

                    <div className="text-[#667085] h-full w-auto -ml-1" style={{ fontSize: "16px", fontWeight: "500" }}>
                        Phodu JEE Mains Test Series 2025
                    </div>
                    <div className="ml-3 w-[24px]">
                        <Image src="/icons/course-left.svg" width={7} height={12} alt="left-arrow" />
                    </div>
                    <div className="text-[#667085] h-full w-auto -ml-1" style={{ fontSize: "16px", fontWeight: "500" }}>
                        Physics
                    </div>






                </div>
            </div>
            <div className="h-[50px]  mx-8  border-b border-solid border-[#EAECF0] flex flex-row gap-[16px] mt-2">

                <span className="text-[#667085] font-medium text-base">Overview</span>
                <span className="text-[#667085] font-medium text-base">Attempts & Difficulty Analysis</span>
                <span className="text-[#667085] font-medium text-base">Attempts over the 3 hours</span>
                <span className="text-[#667085] font-medium text-base">Missed Concept</span>
                <span className="text-[#667085] font-medium text-base">Complete Analysis</span>







            </div>

            <div className="mx-8 h-[44px] flex flex-col justify-end  ">
                <span className="text-[#1D2939] text-lg font-semibold"> Overview </span>
            </div>

            <div className=" pt-2 pb-3 mx-8">
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
            <div className="mx-8 h-[44px] flex flex-col justify-end mb-2 ">
                <span className="text-[#1D2939] text-lg font-semibold"> Attempts & Difficulty Analysis</span>
            </div>
            <div className="flex flex-row gap-4 h-[265px] mx-8">
                <div className=" w-full rounded-xl h-[265px] flex-col bg-[#FFFFFF] border border-solid border-[#EAECF0]">

                </div>
                <div className=" w-full rounded-xl h-[265px] flex-col bg-[#FFFFFF] border border-solid border-[#EAECF0]">

                </div>
            </div>
            <div className="mx-8 h-[44px] flex flex-col justify-end mb-2 ">
                <span className="text-[#1D2939] text-lg font-semibold">Attempts over the 3 hours</span>
            </div>
            <div className="h-auto mx-8 rounded-xl  bg-[#FFFFFF] border border-solid border-[#EAECF0]">
                <table className="w-full rounded-xl bg-white text-sm font-medium">
                    <thead>
                        <tr className="text-[#667085]">
                            <th className="w-[30%] px-8 py-3 text-left">Interval</th>
                            <th className="w-[23%] text-center">Correct</th>
                            <th className="w-[23%] text-center">Incorrect</th>
                            <th className="w-[23%] text-center">Overall</th>
                        </tr>
                    </thead>
                    <tbody className="border-b border-[#EAECF0]">
                        <tr className="border-t border-[#EAECF0]">
                            <td className="px-8 py-3 text-left text-[#1D2939] font-semibold text-sm">First 30 mins</td>
                            <td className="text-center text-[#1D2939] font-normal text-sm">14</td>
                            <td className="text-center text-[#1D2939] font-normal text-sm">8</td>
                            <td className="text-center text-[#1D2939] font-normal text-sm">5</td>
                        </tr>
                        <tr className="border-t border-[#EAECF0]]">
                            <td className="px-8 py-3 text-left text-[#1D2939] font-semibold text-sm">Next 30 mins</td>
                            <td className="text-center text-[#1D2939] font-normal text-sm">14</td>
                            <td className="text-center text-[#1D2939] font-normal text-sm">8</td>
                            <td className="text-center text-[#1D2939] font-normal text-sm">5</td>
                        </tr>
                        <tr className="border-t border-[#EAECF0]">
                            <td className="px-8 py-3 text-left text-[#1D2939] font-semibold text-sm">Next 30 mins</td>
                            <td className="text-center text-[#1D2939] font-normal text-sm">14</td>
                            <td className="text-center text-[#1D2939] font-normal text-sm">8</td>
                            <td className="text-center text-[#1D2939] font-normal text-sm">5</td>
                        </tr>
                        <tr className="border-t border-[#EAECF0]]">
                            <td className="px-8 py-3 text-left text-[#1D2939] font-semibold text-sm">Next 30 mins</td>
                            <td className="text-center text-[#1D2939] font-normal text-sm">14</td>
                            <td className="text-center text-[#1D2939] font-normal text-sm">8</td>
                            <td className="text-center text-[#1D2939] font-normal text-sm">5</td>
                        </tr>
                        <tr className="border-t border-[#EAECF0]">
                            <td className="px-8 py-3 text-left text-[#1D2939] font-semibold text-sm">Next 30 mins</td>
                            <td className="text-center text-[#1D2939] font-normal text-sm">14</td>
                            <td className="text-center text-[#1D2939] font-normal text-sm">8</td>
                            <td className="text-center text-[#1D2939] font-normal text-sm">5</td>
                        </tr>
                        <tr className="border-t border-[#EAECF0]]">
                            <td className="px-8 py-3 text-left text-[#1D2939] font-semibold text-sm">Next 30 mins</td>
                            <td className="text-center text-[#1D2939] font-normal text-sm">14</td>
                            <td className="text-center text-[#1D2939] font-normal text-sm">8</td>
                            <td className="text-center text-[#1D2939] font-normal text-sm">5</td>
                        </tr>


                    </tbody>
                </table>
                <div className="flex flex-row justify-center h-[70px] items-center gap-4">
                    <div className="flex flex-row gap-1">
                        <Image
                            src="/icons/correct.svg"
                            width={12}
                            height={16}
                            alt="correct-green-circle" />
                        <span className="font-normal text-[#667085] text-sm mt-1">correct</span>
                    </div>
                    <div className="flex flex-row gap-1">
                        <Image
                            src="/icons/incorrect.svg"
                            width={12}
                            height={16}
                            alt="incorrect-red-circle" />

                        <span className="font-normal text-[#667085] text-sm mt-1 ">Incorrect</span>
                    </div>
                    <div className="flex flex-row gap-1">
                        <Image
                            src="/icons/overal.svg"
                            width={12}
                            height={16}
                            alt="overall-voilet-circle" />

                        <span className="font-normal text-[#667085] text-sm mt-1 ">overall</span>
                    </div>

                </div>
                <div style={{ height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid stroke="#EAECF0" />
                            <XAxis dataKey="name"
                                fontFamily="poppins"
                                fontSize={14}
                                fontWeight={400}
                                fill="#667085"

                            />
                            <YAxis
                                fontFamily="poppins"
                                fontSize={14}
                                fontWeight={400}
                                fill="#667085" />
                            <Tooltip content={<CustomTooltip />} cursor={false} />
                            <Legend
                                layout="horizontal"
                                verticalAlign="top"
                                align="center"
                                className="mb-2"
                                wrapperStyle={{ display: 'none' }}
                            />
                            <Line type="monotone" dataKey="overall" stroke="#973AFF" dot={false} strokeWidth={2} />
                            <Line type="monotone" dataKey="correct" stroke="#17B26A" dot={false} strokeWidth={2} />
                            <Line type="monotone" dataKey="incorrect" stroke="#F04438" dot={false} strokeWidth={2} />


                        </LineChart>
                    </ResponsiveContainer>
                </div>



            </div>
            <div className="mx-8 h-[44px] flex flex-col justify-end mb-2 ">
                <span className="text-[#1D2939] text-lg font-semibold">Complete Analysis</span>
            </div>






            <div className="h-auto mx-8 rounded-xl  bg-[#FFFFFF] border border-solid border-[#EAECF0]">
                <table className="w-full rounded-xl bg-white text-sm font-medium">
                    <thead>
                        <tr className="text-[#667085]">
                            <th className="w-[30%] px-8 py-3 text-left">Q. no.</th>
                            <th className="w-[10%] text-center">Chapter</th>
                            <th className="w-[10%] text-center">Difficulty</th>
                            <th className="w-[10%] text-center">Allotted</th>
                            <th className="w-[10%] text-center">Spent</th>
                            <th className="w-[10%] text-center">Attempted</th>
                            <th className="w-[10%] text-center">Answer</th>
                            <th className="w-[10%] text-center">Remarks</th>


                        </tr>
                    </thead>
                    <tbody className="border-b border-[#EAECF0]">
                        <tr className="border-t border-[#EAECF0]">
                            <td className="px-8 py-3 text-left text-[#1D2939] font-semibold text-sm">First 30 mins</td>
                            <td className="text-center text-[#1D2939] font-normal text-sm">14</td>
                            <td className="text-center text-[#1D2939] font-normal text-sm">8</td>
                            <td className="text-center text-[#1D2939] font-normal text-sm">5</td>
                        </tr>
                        <tr className="border-t border-[#EAECF0]]">
                            <td className="px-8 py-3 text-left text-[#1D2939] font-semibold text-sm">Next 30 mins</td>
                            <td className="text-center text-[#1D2939] font-normal text-sm">14</td>
                            <td className="text-center text-[#1D2939] font-normal text-sm">8</td>
                            <td className="text-center text-[#1D2939] font-normal text-sm">5</td>
                        </tr>
                        <tr className="border-t border-[#EAECF0]">
                            <td className="px-8 py-3 text-left text-[#1D2939] font-semibold text-sm">Next 30 mins</td>
                            <td className="text-center text-[#1D2939] font-normal text-sm">14</td>
                            <td className="text-center text-[#1D2939] font-normal text-sm">8</td>
                            <td className="text-center text-[#1D2939] font-normal text-sm">5</td>
                        </tr>
                        <tr className="border-t border-[#EAECF0]]">
                            <td className="px-8 py-3 text-left text-[#1D2939] font-semibold text-sm">Next 30 mins</td>
                            <td className="text-center text-[#1D2939] font-normal text-sm">14</td>
                            <td className="text-center text-[#1D2939] font-normal text-sm">8</td>
                            <td className="text-center text-[#1D2939] font-normal text-sm">5</td>
                        </tr>
                        <tr className="border-t border-[#EAECF0]">
                            <td className="px-8 py-3 text-left text-[#1D2939] font-semibold text-sm">Next 30 mins</td>
                            <td className="text-center text-[#1D2939] font-normal text-sm">14</td>
                            <td className="text-center text-[#1D2939] font-normal text-sm">8</td>
                            <td className="text-center text-[#1D2939] font-normal text-sm">5</td>
                        </tr>
                        <tr className="border-t border-[#EAECF0]]">
                            <td className="px-8 py-3 text-left text-[#1D2939] font-semibold text-sm">Next 30 mins</td>
                            <td className="text-center text-[#1D2939] font-normal text-sm">14</td>
                            <td className="text-center text-[#1D2939] font-normal text-sm">8</td>
                            <td className="text-center text-[#1D2939] font-normal text-sm">5</td>
                        </tr>


                    </tbody>
                </table>
            </div>



        </div>
    )
}
export default JeeMains;