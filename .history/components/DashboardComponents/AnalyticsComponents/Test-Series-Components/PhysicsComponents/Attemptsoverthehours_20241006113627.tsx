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
// this logic for the custom x-axis label for the Line chart
interface CustomTickProps {
    x: number;
    y: number;
    payload: { value: string }; // Payload contains value as a string in this case
    index: number;
    dataLength: number;
}

const CustomTick: React.FC<CustomTickProps> = ({ x, y, payload, index, dataLength }) => {
    let positionX = x;
    let textAnchor: "start" | "middle" | "end" = "middle";
    const firstLabelAdjustment = 42; // Adjustment for the first label
    const lastLabelAdjustment = 50; // Adjustment for the last label

    if (index === 0) {
        // First label: move right
        positionX = x + firstLabelAdjustment;
        textAnchor = "start";
    } else if (index === dataLength - 1) {
        // Last label: move left
        positionX = x - lastLabelAdjustment;
        textAnchor = "end";
    }


    return (
        <g transform={`translate(${positionX},${y + 10})`}>
            <text
                x={0}
                y={0}
                dy={10}
                textAnchor="middle"
                fill="#666"
                fontSize={14}
                fontFamily="Poppins"
            >
                {payload.value}
            </text>
        </g>
    );
};


function JeeMains() {
    const router = useRouter();




    return (
        <div className="h-auto rounded-xl mb-6 bg-[#FFFFFF] border border-solid border-[#EAECF0]">
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
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 50, left: 10, bottom: 20 }}>
                        <CartesianGrid stroke="#EAECF0" />
                        <XAxis
                            dataKey="name"
                            fontFamily="Poppins"
                            fontSize={14}
                            fontWeight={400}
                            fill="#667085"
                            tick={<CustomTick x={0} y={0} payload={{
                                value: ""
                            }} index={0} dataLength={0} />}


                        />

                        <YAxis
                            fontFamily="poppins"
                            fontSize={14}
                            fontWeight={400}
                            fill="#667085"
                        />
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














    )
}
export default JeeMains;
