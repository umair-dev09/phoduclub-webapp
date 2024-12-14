import React from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip, TooltipProps } from 'recharts';
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A donut chart with text"

const chartData = [
    { browser: "Perfect", visitors: 27, fill: "#6080F8" },
    { browser: "Overtime", visitors: 200, fill: "#D270F3" },
    { browser: "Wasted", visitors: 287, fill: "#7ACAFA" },
    { browser: "Confused", visitors: 287, fill: "#D4D9E9" },
];

const chartConfig = {
    Perfect: {
        label: "Perfect",
        color: "#6080F8",
    },
    Overtime: {
        label: "Overtime",
        color: "#D270F3",
    },
    Wasted: {
        label: "Wasted",
        color: "#7ACAFA",
    },
    Confused: {
        label: "Confused",
        color: "#D4D9E9",
    },
} satisfies ChartConfig;



interface PieTooltipProps extends TooltipProps<number, string> {
    active?: boolean;
    payload?: any[];
}

const CustomPieTooltip: React.FC<PieTooltipProps> = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const { name, value, payload: { fill } } = payload[0];

        return (
            <div className="flex flex-row items-center justify-between w-40 bg-white border border-lightGrey rounded-md p-[10px]" style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
                <div className="flex flex-row items-center">
                    {/* Color dot */}
                    <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: fill }} />
                    {/* Name and value */}
                    <p className="flex items-center text-sm font-semibold text-[#667085]">{name}</p>
                </div>
                <p className="flex items-center text-[0.938rem] font-semibold text-[#1D2939]">{value}</p>
            </div>
        );
    }
    return null;
};

function Attemptsgraph() {
    return (
        <div className="">
            <div className="flex flex-row gap-4 mb-4 h-auto">
                <div className="flex w-full h-auto flex-row gap-4">
                    <div className="flex flex-col w-1/2 h-[320px] p-4 bg-white border border-lightGrey rounded-xl">
                        <div className="text-[#1D2939]"><h3>Overall Attempts</h3></div>
                        <div className="flex flex-1 items-center">
                            <ResponsiveContainer width="100%" height={250}>
                                <ChartContainer config={chartConfig} className="h-auto w-full">
                                    <PieChart>
                                        <Tooltip content={<CustomPieTooltip />} cursor={false} />
                                        <Pie data={chartData} dataKey="visitors" nameKey="browser" innerRadius={60} strokeWidth={3} stroke="#FFFFFF">
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} />
                                            ))}
                                        </Pie>
                                    </PieChart>

                                </ChartContainer>
                            </ResponsiveContainer>
                            <div className="grid grid-cols-2 w-[80%] h-[70%] mr-4 justify-evenly">
                                {chartData.map((subject, index) => (
                                    <div key={index} className="flex flex-1 items-center">
                                        <div><span className={`block rounded-full w-3 h-3 mr-2 mt-[23%]`} style={{ backgroundColor: subject.fill }}></span></div>
                                        <div>
                                            {subject.browser}
                                            <h3>{subject.visitors}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-1/2 p-4 bg-white border border-lightGrey rounded-xl h-[320px]">
                        <div className="text-[#1D2939]"><h3>Physics</h3></div>
                        <div className="flex flex-1 items-center">
                            <ResponsiveContainer className='flex w-[20%]'>
                                <ChartContainer
                                    config={chartConfig}
                                    className="h-auto w-[70%]"
                                >
                                    <PieChart>
                                        <Tooltip content={<CustomPieTooltip />} cursor={false} />
                                        <Pie
                                            data={chartData}
                                            dataKey="visitors"
                                            nameKey="browser"
                                            innerRadius={60}
                                            strokeWidth={3}
                                            stroke="#FFFFFF"
                                        >
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} />
                                            ))}
                                        </Pie>
                                    </PieChart>

                                </ChartContainer>
                            </ResponsiveContainer>
                            <div className="grid grid-cols-2 w-[80%] h-[70%] mr-4 justify-evenly">
                                {chartData.map((subject, index) => (
                                    <div key={index} className="flex flex-1 items-center">
                                        <div><span className={`block rounded-full w-3 h-3 mr-2 mt-[23%]`} style={{ backgroundColor: subject.fill }}></span></div>
                                        <div>
                                            {subject.browser}
                                            <h3>{subject.visitors}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row gap-4 h-auto">
                <div className="flex w-full h-auto flex-row gap-4">
                    <div className="flex flex-col w-1/2 p-4 bg-white border border-lightGrey rounded-xl h-[320px]">
                        <div className="text-[#1D2939]"><h3>Chemistry</h3></div>
                        <div className="flex flex-1 items-center">
                            <ResponsiveContainer width="100%" height={250}>
                                <ChartContainer config={chartConfig} className="h-auto w-full">
                                    <PieChart>
                                        <Tooltip content={<CustomPieTooltip />} cursor={false} />

                                        <Pie data={chartData} dataKey="visitors" nameKey="browser" innerRadius={60} strokeWidth={3} stroke="#FFFFFF">
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} />
                                            ))}
                                        </Pie>
                                    </PieChart>

                                </ChartContainer>
                            </ResponsiveContainer>
                            <div className="grid grid-cols-2 w-[80%] h-[70%] mr-4 justify-evenly">
                                {chartData.map((subject, index) => (
                                    <div key={index} className="flex flex-1 items-center">
                                        <div><span className={`block rounded-full w-3 h-3 mr-2 mt-[23%]`} style={{ backgroundColor: subject.fill }}></span></div>
                                        <div>
                                            {subject.browser}
                                            <h3>{subject.visitors}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-1/2 p-4 bg-white border border-lightGrey rounded-xl h-[320px]">
                        <div className="text-[#1D2939]"><h3>Mathematics</h3></div>
                        <div className="flex flex-1 items-center">
                            <ResponsiveContainer className='flex w-[20%]'>
                                <ChartContainer
                                    config={chartConfig}
                                    className="h-auto w-[70%]"
                                >
                                    <PieChart>
                                        <Tooltip content={<CustomPieTooltip />} cursor={false} />


                                        <Pie
                                            data={chartData}
                                            dataKey="visitors"
                                            nameKey="browser"
                                            innerRadius={60}
                                            strokeWidth={3}
                                            stroke="#FFFFFF"
                                        >
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} />
                                            ))}
                                        </Pie>
                                    </PieChart>

                                </ChartContainer>
                            </ResponsiveContainer>
                            <div className="grid grid-cols-2 w-[80%] h-[70%] mr-4 justify-evenly">
                                {chartData.map((subject, index) => (
                                    <div key={index} className="flex flex-1 items-center">
                                        <div><span className={`block rounded-full w-3 h-3 mr-2 mt-[23%]`} style={{ backgroundColor: subject.fill }}></span></div>
                                        <div>
                                            {subject.browser}
                                            <h3>{subject.visitors}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Attemptsgraph;