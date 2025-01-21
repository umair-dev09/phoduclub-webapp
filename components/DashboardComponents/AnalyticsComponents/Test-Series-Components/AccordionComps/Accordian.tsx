import { Tooltip } from "@nextui-org/react";
import { useState } from 'react';
import Image from "next/image";
import TestDialog from "../TestDialog";
const dummyData = [
    {
        testName: "Test 01",
        questions: 50,
        attempts: 5,
        attempted: "44/55",
        corrected: "38/45",
        incorrect: "7/45",
        accuracy: "80%",
        score: 32,
    },
    {
        testName: "Test 02",
        questions: 40,
        attempts: 3,
        attempted: "36/40",
        corrected: "30/40",
        incorrect: "6/40",
        accuracy: "75%",
        score: 28,
    },
    {
        testName: "Test 03",
        questions: 60,
        attempts: 8,
        attempted: "50/60",
        corrected: "45/60",
        incorrect: "15/60",
        accuracy: "70%",
        score: 35,
    },
];

function AccordianAllSubjects() {
    const [detailview, setDetailview] = useState(false);
    return (
        <div className="border-t border-lightGrey mx-5 py-2">
            {dummyData.map((test, index) => (
                <div
                    key={index}
                    className={`flex flex-row justify-between py-2 ${index > 0 ? "border-t border-lightGrey" : ""
                        }`}
                >
                    <div className="flex flex-col gap-1.5">
                        <p className="font-semibold text-[#1D2939]">{test.testName}</p>

                        <div className="flex flex-row items-center gap-1">
                            <p className="text-xs text-[#667085]">{test.questions} Questions</p>
                            <div className="w-[1px] h-3 bg-[#667085]"></div>
                            <p className="text-xs text-[#667085]">{test.attempts} times attempted</p>

                            <Tooltip
                                content="This results is from your last attempts, click on Detail view button to see all attempted results."
                                placement="top"
                                offset={15}
                                closeDelay={100}
                                classNames={{
                                    content: [
                                        "bg-black text-white py-4 text-[14px] max-w-[240px]",
                                        "rounded-md text-center font-normal text-sm",
                                        "after:content-[''] after:absolute after:top-full after:left-1/2 after:-ml-2",
                                        "after:border-8 after:border-transparent after:border-t-black",
                                    ],
                                }}
                            >
                                <button>
                                    <Image
                                        src="/icons/questionmark.svg"
                                        width={16}
                                        height={16}
                                        alt="question mark icon"
                                        className="w-4 h-4"
                                    />
                                </button>
                            </Tooltip>
                        </div>
                    </div>

                    <div className="flex items-center justify-center h-auto">
                        <div className="flex flex-row mr-5 gap-1.5 text-[0.813rem]">
                            <p className="font-semibold text-[#1D2939]">{test.attempted}</p>
                            <p className="text-[#667085]">Attempted</p>
                        </div>
                        <div className="w-[1px] bg-lightGrey mr-4 h-10"></div>

                        <div className="flex flex-row mr-5 gap-1.5 text-[0.813rem]">
                            <p className="font-semibold text-[#1D2939]">{test.corrected}</p>
                            <p className="text-[#667085]">Corrected</p>
                        </div>
                        <div className="w-[1px] bg-lightGrey mr-4 h-10"></div>

                        <div className="flex flex-row mr-5 gap-1.5 text-[0.813rem]">
                            <p className="font-semibold text-[#1D2939]">{test.incorrect}</p>
                            <p className="text-[#667085]">Incorrect</p>
                        </div>
                        <div className="w-[1px] bg-lightGrey mr-4 h-10"></div>

                        <div className="flex flex-row mr-5 gap-1.5 text-[0.813rem]">
                            <p className="font-semibold text-[#1D2939]">{test.accuracy}</p>
                            <p className="text-[#667085]">Accuracy</p>
                        </div>
                        <div className="w-[1px] bg-lightGrey mr-4 h-10"></div>

                        <div className="flex flex-row mr-5 gap-1.5 text-[0.813rem]">
                            <p className="font-semibold text-[#1D2939]">{test.score}</p>
                            <p className="text-[#667085]">Score</p>
                        </div>

                        <button
                            onClick={() => {
                                setDetailview(true);

                            }}
                        >
                            <span className="font-semibold text-[#9012FF] text-sm hover:underline">
                                Detail View
                            </span>
                        </button>
                    </div>
                </div>
            ))}
            {/* {detailview && <TestDialog open={detailview} onClose={() => setDetailview(false)} />} */}
        </div>
    );
}

export default AccordianAllSubjects;
