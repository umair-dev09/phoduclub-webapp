"use client";
import { useState } from "react";
import { Dialog, DialogOverlay, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import Collapsible from "react-collapsible";

export default function TestSubject() {
    let [showQuizDialog, setShowQuizDialog] = useState(false);
    const [accordionOpen, setAccordionOpen] = useState(false);

    const onStartQuiz = () => {
        setShowQuizDialog(true);
    };

    const onStartNow = () => {
        setShowQuizDialog(false);
        setAccordionOpen(true);
    };

    return (
        <div className="container flex flex-1 flex-col h-auto overflow-y-auto pb-5">
            {/* Test Accordion  1*/}
            <div className="gap-4 flex flex-col">
                <div className="TEST CONTAINER ml-8 mr-8 rounded-[12px] border border-solid border-[#EAECF0] bg-[#FFFFFF]">
                    <Collapsible open={accordionOpen}>
                        <div className="h-[46px] m-2 flex justify-between items-center">
                            <div className="flex flex-col gap-1 ml-3 mt-2">
                                <span className="text-[#1D2939] font-semibold text-[16px]">
                                    Test 01
                                </span>
                                <span className="text-[#667085] font-normal text-[12px]">
                                    50 Questions
                                </span>
                            </div>

                            {/* Toggle Button for Accordion */}
                            {!accordionOpen ? (
                                // Start Quiz Button - initially displayed on the right side
                                <button onClick={onStartQuiz} className="mr-3 mb-3">
                                    <div className="mt-3 flex items-center justify-center w-[116px] h-[36px] rounded-[6px] bg-[#9012FF] border border-solid border-[#800EE2] shadow-inner-button">
                                        <span className="font-medium text-[14px] text-[#FCFCFD]">
                                            Start Quiz
                                        </span>
                                    </div>
                                </button>
                            ) : (
                                // Arrow Button - displayed after pressing Start Now
                                <button className="flex justify-center items-center mr-3">
                                    <Image
                                        src={accordionOpen ? "/icons/arrowup.svg" : "/icons/arrowdown.svg"}
                                        alt="arrow"
                                        width={24}
                                        height={24}
                                    />
                                </button>
                            )}
                        </div>

                        {/* Accordion Content */}
                        <div
                            className={`transition-all duration-300 ease-in-out overflow-hidden ${accordionOpen ? "max-h-[500px]" : "max-h-0"
                                }`}
                        >
                            {/* Only render the content if not collapsed */}
                            <div className="h-[200px]">
                                <div className="h-[149px] bg-[#FFFFFF] ml-5 mr-5 border-t border-b border-solid border-[#EAECF0] mt-[10px]">
                                    {/* Content inside the accordion */}
                                    {/* Insert your content */}
                                </div>
                            </div>
                        </div>
                    </Collapsible>
                </div>
            </div>

            {/* Quiz Dialog */}
            <Dialog
                open={showQuizDialog}
                onClose={() => setShowQuizDialog(false)}
                className="relative z-50"
            >
                {/* Backdrop */}
                <DialogOverlay className="fixed inset-0 bg-black/30" />

                {/* Dialog Wrapper */}
                <div className="fixed inset-0 flex items-center justify-center">
                    <DialogPanel className="bg-[#FFFFFF] rounded-2xl w-[480px] h-[306px]">
                        {/* Header Section */}
                        <div
                            className="flex flex-1 h-[230px] w-full border-b-2 border-solid border-[#EAECF0] flex-col"
                            style={{
                                borderTopLeftRadius: "12px",
                                borderTopRightRadius: "12px",
                                borderBottomLeftRadius: "0px",
                                borderBottomRightRadius: "0px",
                            }}
                        >
                            <div className="h-[23px] mt-[23px] mr-[24px] ml-[24px] justify-between flex">
                                <span className="text-[#1D2939] font-semibold text-lg">
                                    Start Test
                                </span>
                                <button onClick={() => setShowQuizDialog(false)}>
                                    <Image
                                        src="/icons/cancel.svg"
                                        alt="cancel"
                                        width={18}
                                        height={18}
                                    />
                                </button>
                            </div>
                            <div className="h-auto mr-[24px] ml-[24px] mt-[13px]">
                                <span className="text-sm text-[#667085] font-normal">
                                    Lorem ipsum is a dummy text widely used in digital industry.
                                </span>
                            </div>
                            <div className="h-[48px] w-[480px] ml-[31px] mt-[33px] flex-row flex gap-6">
                                <div className="gap-1 flex-col flex items-center">
                                    <span className="font-normal text-sm text-[#667085]">
                                        Time Duration
                                    </span>
                                    <span className="text-[#1D2939] text-lg font-semibold">
                                        05:00
                                        <span className="text-[#1D2939] text-sm font-semibold">
                                            Min
                                        </span>
                                    </span>
                                </div>

                                <div className="w-[0.5px] h-[48px] bg-[#EAECF0]"></div>

                                <div className="gap-1 flex-col flex items-center">
                                    <span className="font-normal text-sm text-[#667085]">
                                        No. of Questions
                                    </span>
                                    <span className="text-[#1D2939] text-lg font-semibold">
                                        15
                                    </span>
                                </div>

                                <div className="w-[0.5px] h-[48px] bg-[#EAECF0]"></div>

                                <div className="gap-1 flex-col flex items-center">
                                    <span className="font-normal text-sm text-[#667085]">
                                        Marks Per Question
                                    </span>
                                    <span className="text-[#1D2939] text-lg font-semibold">2</span>
                                </div>
                            </div>
                        </div>
                        <div
                            className="w-[480px] h-[76px]"
                            style={{
                                borderTopLeftRadius: "0px",
                                borderTopRightRadius: "0px",
                                borderBottomLeftRadius: "12px",
                                borderBottomRightRadius: "12px",
                            }}
                        >
                            <div className="ml-[213px] gap-[16px] flex-row flex mt-[16px] h-[44px]">
                                <button
                                    className="bg-[#FFFFFF] text-[#1D2939] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px] shadow-inner-button"
                                    style={{ border: "1.5px solid #EAECF0" }}
                                    onClick={() => setShowQuizDialog(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-[#8501FF] text-[#FFFFFF] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px] shadow-inner-button"
                                    style={{ border: "1px solid #800EE2" }}
                                    onClick={onStartNow}
                                >
                                    Start Now
                                </button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    );
}
