'use client'

import React from "react";
import TableComps from '@/components/DashboardComponents/AnalyticsComponents/Test-Series-Components/TestSeriesComp';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
interface CustomTooltipProps {
    active?: boolean;
    payload?: any[];
    label?: string;
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

const data = [
    {
        "name": "Page A",
        "uv": 4000,
        "pv": 2400,
        "amt": 2400
    },
    {
        "name": "Page B",
        "uv": 3000,
        "pv": 1398,
        "amt": 2210
    },
    {
        "name": "Page C",
        "uv": 2000,
        "pv": 9800,
        "amt": 2290
    },
    {
        "name": "Page D",
        "uv": 2780,
        "pv": 3908,
        "amt": 2000
    },
    {
        "name": "Page E",
        "uv": 1890,
        "pv": 4800,
        "amt": 2181
    },
    {
        "name": "Page F",
        "uv": 2390,
        "pv": 3800,
        "amt": 2500
    },
    {
        "name": "Page G",
        "uv": 3490,
        "pv": 4300,
        "amt": 2100
    }
]

function TestSeries() {
    return (
        <div className="flex flex-1 flex-col pt-6 mx-8">
            {/* Table Section */}
            <table className="flex flex-col w-full h-min border border-lightGrey rounded-xl bg-white text-sm font-medium">
                <tr className="flex flex-1 py-3 text-neutral-500">
                    <td className="w-[30%] px-8">Test</td>
                    <td className="w-[15%] text-center"><p>Scores</p></td>
                    <td className="w-[15%] text-center"><p>Attempted Question</p></td>
                    <td className="w-[15%] text-center"><p>Accuracy</p></td>
                    <td className="w-[15%] text-center"><p>Time Taken</p></td>
                    <td className="w-[15%] text-center"><p>Total Time</p></td>
                </tr>
                <TableComps />
                <TableComps />
                <TableComps />
                <TableComps />
            </table>

            <div className="mb-8">
                {/* Graph Section */}
                <div className="flex w-full h-auto flex-row gap-4 mt-5">
                    {/* Bar Graph */}
                    <div className="w-full bg-white rounded-xl p-4">
                        <div>
                            <h3>Line Graph</h3>
                        </div>
                        {/* Graph Section */}
                        <div className="flex w-full h-auto flex-row gap-4 mt-5">
                            {/* Bar Graph */}
                            <div className="w-full bg-white rounded-xl p-4">
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Line Graph</h3>
                                </div>
                                <div style={{ height: '300px' }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip content={<CustomTooltip />} cursor={false} />
                                            <Legend
                                                layout="horizontal"
                                                verticalAlign="top"
                                                align="center"
                                                className="mb-2"
                                                wrapperStyle={{ display: 'none' }}
                                            />
                                            <Line type="monotone" dataKey="pv" stroke="#8884d8" dot={false} />
                                            <Line type="monotone" dataKey="uv" stroke="#82ca9d" dot={false} />
                                            <Line type="monotone" dataKey="amt" stroke="#F04438" dot={false} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TestSeries;
