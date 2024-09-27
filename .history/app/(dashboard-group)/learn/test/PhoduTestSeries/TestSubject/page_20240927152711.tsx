"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";

export default function TestSubject() {
    let router = useRouter();
    let [showQuizDialog, setShowQuizDialog] = useState(false);
    const [accordionOpen, setAccordionOpen] = useState(false);

    const onStartQuiz = () => {
        setShowQuizDialog(true);
    };

    const onStartNow = () => {
        setShowQuizDialog(false);
        setAccordionOpen(true);
    };

    interface CollapseState {
        [key: number]: boolean;
    }

    const [collapsed, setCollapsed] = useState<CollapseState>({
        1: true,
        2: true,
        3: true,
    });

    const toggleCollapse = (index: number) => {
        setCollapsed(prev => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    return (
        <div className="container flex flex-1 flex-col">
            <div className="flex flex-col">
                <div className="h-[64px] ml-8 flex items-center ">
                    <div className="my-5 flex items-center">
                        <button className="flex items-center ml-1" onClick={() => router.back()} >
                            <div className="text-[#1D2939] h-[24px] w-auto" style={{ fontSize: "16px", fontWeight: "600" }}>
                                Tests
                            </div>
                            <div className="ml-3 w-[24px]">
                                <Image src="/icons/course-left.svg" width={7} height={12} alt="left-arrow" />
                            </div>
                        </button>
                        <div className="text-[#1D2939] h-full w-auto -ml-1" style={{ fontSize: "16px", fontWeight: "600" }}>
                            Phodu JEE Mains Test Series 2025
                        </div>
                        <div className="ml-3 w-[24px]">
                            <Image src="/icons/course-left.svg" width={7} height={12} alt="left-arrow" />
                        </div>
                        <div className="text-[#667085] h-full w-auto -ml-1" style={{ fontSize: "16px", fontWeight: "500" }}>
                            Test Series for Physics
                        </div>
                    </div>
                </div>
                <div className="h-[64px] ml-8 flex items-center ">
                    <div className="text-[#1D2939] h-[24px] w-auto" style={{ fontSize: "18px", fontWeight: "600" }}>
                        Test Series for Physics
                    </div>
                </div>
            </div>
            <div className="h-[81px] ml-8 mr-8 rounded-[12px] border border-solid border-[#EAECF0] bg-[#FFFFFF]">
                <div className="h-[49px] w-full m-4 flex flex-row gap-4">
                    <div className="w-[178.69px] h-[49px] flex flex-col border-r border-solid border-[#EAECF0]">
                        <span className="font-normal text-[#667085] text-xs">Attempted Questions</span>
                        <span className="font-semibold text-[#1D2939] text-base mt-2">8/150</span>
                    </div>
                    <div className="w-[178.69px] h-[49px] flex flex-col border-r border-solid border-[#EAECF0]">
                        <span className="font-normal text-[#667085] text-xs">Score</span>
                        <span className="font-semibold text-[#1D2939] text-base mt-2">32</span>
                    </div>
                    <div className="w-[178.69px] h-[49px] flex flex-col border-r border-solid border-[#EAECF0]">
                        <span className="font-normal text-[#667085] text-xs">Accuracy</span>
                        <span className="font-semibold text-[#1D2939] text-base mt-2">80%</span>
                    </div>
                    <div className="w-[178.69px] h-[49px] flex flex-col border-r border-solid border-[#EAECF0]">
                        <span className="font-normal text-[#667085] text-xs">Answered Correct</span>
                        <span className="font-semibold text-[#1D2939] text-base mt-2">8/150</span>
                    </div>
                    <div className="w-[178.69px] h-[49px] flex flex-col border-r border-solid border-[#EAECF0]">
                        <span className="font-normal text-[#667085] text-xs">Answered Incorrect</span>
                        <span className="font-semibold text-[#1D2939] text-base mt-2">0/150</span>
                    </div>
                    <div className="w-[178.69px] h-[49px] flex flex-col">
                        <span className="font-normal text-[#667085] text-xs">Time taken</span>
                        <span className="font-semibold text-[#1D2939] text-base mt-2">1h 30m of 2h</span>
                    </div>
                </div>
            </div>
            <div className="h-[64px] ml-8 flex items-center ">
                <span className="font-bold text-[18px] text-[#1D2939]">
                    Tests
                </span>
            </div>
            {/* Test Accordion */}
            <div className="h-[78px] ml-8 mr-8 rounded-[12px] border border-solid border-[#EAECF0] bg-[#FFFFFF]">
                <div className="h-[46] m-2 flex justify-between">
                    <div className="flex flex-col gap-1 ml-3 mt-2">
                        <span className="text-[#1D2939] font-semibold text-[16px]">Test 01</span>
                        <span className="text-[#667085] font-normal text-[12px]">50 Questions</span>
                    </div>
                    {accordionOpen ? (
                        <button onClick={() => toggleCollapse(1)}>
                            <Image
                                src={collapsed[1] ? "/icons/arrowdown.svg" : "/icons/arrowup.svg"}
                                alt="arrow-toggle"
                                width={24}
                                height={24}
                            />
                        </button>
                    ) : (
                        <button onClick={onStartQuiz}>
                            <div className="mt-3 mr-2 flex items-center justify-center w-[116px] h-[36px] rounded-[6px] bg-[#9012FF] border border-solid border-[#800EE2] shadow-inner-button">
                                <span className="text-[#FFFFFF] font-semibold text-xs">Start test</span>
                            </div>
                        </button>
                    )}
                </div>

                {/* Accordion Content */}
                <div
                    className={`transition-all duration-300 ease-in-out ${collapsed[1] ? "max-h-0 overflow-hidden" : "max-h-[500px]"}`}
                >
                    {/* Dynamic Content for Accordion */}
                    <div className="flex flex-col mx-1">
                        <div className="mx-5 my-5">
                            <div className="text-base font-medium">1. Welcome and Introduction</div>
                            <div className="flex flex-row text-sm font-normal">
                                <div className="mr-1">
                                    <Image src="/icons/read.svg" alt="Read icon" width={16} height={16} />
                                </div>
                                <div>10:00</div>
                            </div>
                        </div>
                        <div className="mx-5 my-5">
                            <div className="text-base font-medium">2. Test Overview</div>
                            <div className="flex flex-row text-sm font-normal">
                                <div className="mr-1">
                                    <Image src="/icons/test.svg" alt="Test icon" width={16} height={16} />
                                </div>
                                <div>15:00</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Other Tests */}
            <div className="h-[78px] ml-8 mr-8 rounded-[12px] border border-solid border-[#EAECF0] bg-[#FFFFFF]">
                <div className="h-[46] m-2 flex justify-between">
                    <div className="flex flex-col gap-1 ml-3 mt-2">
                        <span className="text-[#1D2939] font-semibold text-[16px]">Test 02</span>
                        <span className="text-[#667085] font-normal text-[12px]">50 Questions</span>
                    </div>
                    <button onClick={onStartQuiz}>
                        <div className="mt-3 mr-2 flex items-center justify-center w-[116px] h-[36px] rounded-[6px] bg-[#9012FF] border border-solid border-[#800EE2] shadow-inner-button">
                            <span className="text-[#FFFFFF] font-semibold text-xs">Start test</span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Add more tests as needed */}
            <Dialog open={showQuizDialog} onClose={() => setShowQuizDialog(false)}>
                <DialogBackdrop />
                <DialogPanel>
                    <div className="p-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Welcome!</h3>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                Are you ready to start the test?
                            </p>
                        </div>
                        <div className="mt-4">
                            <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-[#9012FF] px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-[#800EE2]"
                                onClick={onStartNow}
                            >
                                Start Now
                            </button>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </div>
    );
}
