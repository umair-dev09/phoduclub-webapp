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

    });

    const toggleCollapse = (index: number) => {
        setCollapsed(prev => ({
            ...prev,
            [index]: !prev[index],
        }));
    };



    return (
        <div className="contianer flex flex-1 flex-col h-auto overflow-y-auto pb-5">




            {/* --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
            {/* Test Accordion  1*/}
            <div className="gap-4 flex flex-col ">
                <div className="TEST CONTAINER ml-8 mr-8 rounded-[12px] border border-solid border-[#EAECF0] bg-[#FFFFFF] ">
                    <div className="h-[46px] m-2 flex justify-between items-center">
                        <div className="flex flex-col gap-1 ml-3 mt-2">
                            <span className="text-[#1D2939] font-semibold text-[16px]">Test 01</span>
                            <span className="text-[#667085] font-normal text-[12px]">50 Questions</span>
                        </div>

                        {/* Toggle Button for Accordion */}
                        {!accordionOpen ? (
                            // Start Quiz Button - initially displayed on the right side
                            <button onClick={onStartQuiz} className="mr-3 mb-3">
                                <div className="mt-3 flex items-center justify-center w-[116px] h-[36px] rounded-[6px] bg-[#9012FF] border border-solid border-[#800EE2] shadow-inner-button">
                                    <span className="font-medium text-[14px] text-[#FCFCFD]">Start Quiz</span>
                                </div>
                            </button>
                        ) : (
                            // Arrow Button - displayed after pressing Start Now
                            <button className="flex justify-center items-center mr-3" onClick={() => toggleCollapse(1)}>
                                <Image
                                    src={collapsed[1] ? "/icons/arrowdown.svg" : "/icons/arrowup.svg"}
                                    alt="arrow"
                                    width={24}
                                    height={24}
                                />
                            </button>
                        )}

                    </div>

                    {/* Accordion Content */}
                    <div
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${collapsed[1] ? "max-h-0" : "max-h-[500px]"} `}
                    >
                        {/* Only render the content if not collapsed */}
                        {!collapsed[1] && (
                            <div className="h-[200px] ">
                                <div className=" h-[149px]  bg-[#FFFFFF] ml-5 mr-5 border-t border-b border-solid border-[#EAECF0] mt-[10px]">
                                    <div className="bg-[#FFFFFF] h-[50px]  flex justify-between items-center mt-[10px]"> {/* Added justify-between for spacing */}
                                        <div className="flex flex-col w-[280px]">
                                            <span className="font-normal text-[#667085] text-xs">Attempted Questions</span>
                                            <span className="font-semibold text-[15px] text-[#1D2939]">8/50</span>
                                        </div>

                                        <div className="jabir flex items-center w-[280px] mx-[116px]">
                                            {/* Vertical line on the left */}
                                            <div className="h-[30px] w-[1px] bg-[#EAECF0] mr-3"></div> {/* Vertical line with margin */}

                                            <div className="flex flex-col">
                                                <span className="font-normal text-[#667085] text-xs">Score</span>
                                                <span className="font-semibold text-[15px] text-[#1D2939]">32</span>
                                            </div>
                                        </div>
                                        <div className="jabir flex items-center w-[280px] ">

                                            <div className="h-[30px] w-[1px] bg-[#EAECF0] mr-3"></div>

                                            <div className="flex flex-col">
                                                <span className="font-normal text-[#667085] text-xs">Accuracy</span>
                                                <span className="font-semibold text-[15px] text-[#1D2939]">80%</span>
                                            </div>
                                        </div>


                                    </div>

                                    {/* ------------------------------------------- */}
                                    <div className="bg-[#FFFFFF] h-[50px]  flex justify-between items-center mt-[20px]"> {/* Added justify-between for spacing */}
                                        <div className="flex flex-col w-[280px]">
                                            <span className="font-normal text-[#667085] text-xs">Answered Correct</span>
                                            <span className="font-semibold text-[15px] text-[#1D2939]">8/80</span>
                                        </div>

                                        <div className="jabir flex items-center w-[280px] mx-[116px]">
                                            {/* Vertical line on the left */}
                                            <div className="h-[30px] w-[1px] bg-[#EAECF0] mr-3"></div> {/* Vertical line with margin */}

                                            <div className="flex flex-col">
                                                <span className="font-normal text-[#667085] text-xs">Answered Incorrect</span>
                                                <span className="font-semibold text-[15px] text-[#1D2939]">0/8</span>
                                            </div>
                                        </div>
                                        <div className="jabir flex items-center w-[280px] ">

                                            <div className="h-[30px] w-[1px] bg-[#EAECF0] mr-3"></div>

                                            <div className="flex flex-col">
                                                <span className="font-normal text-[#667085] text-xs">Time taken</span>
                                                <span className="font-semibold text-[15px] text-[#1D2939]">1h 30m out of 2h</span>
                                            </div>
                                        </div>


                                    </div>

                                </div>
                                <div className="h-[51px] ml-5 mr-5 justify-between flex items-center" >
                                    <div className="flex flex-row items-center justify-center">
                                        <span className="font-normal text-[#667085] text-xs">5 times attempted</span>
                                        <div className="tooltip relative inline-block"> {/* Add tooltip class and relative position */}
                                            <button>
                                                <Image
                                                    src="/icons/QuestionMark.svg"
                                                    width={16}
                                                    height={16}
                                                    alt="Question-mark"
                                                    className="ml-1"
                                                />
                                            </button>
                                            {/* Tooltip Text */}
                                            <div className="tooltipText"> {/* Tooltip text will be displayed here */}
                                                <span className="font-normal text-xs text-[#FFFFFF]">Your metrics related to the previous attempts are in the detailed analytics section.</span>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="flex flex-row justify-center items-center">

                                        <span className="relative font-semibold text-[#9012FF] text-sm mr-1 inline-block">
                                            View Detailed Analytics
                                            <span className="absolute left-0 bottom-[2px] w-full h-[1px] bg-[#9012FF]"></span>
                                        </span>
                                        <Image
                                            src="/icons/right-arrow.svg"
                                            width={24}
                                            height={24}
                                            alt=" Right-arrow" />

                                    </div>



                                </div>



                            </div>
                        )}
                    </div>



                </div>
                <div className="TEST CONTAINER ml-8 mr-8 rounded-[12px] border border-solid border-[#EAECF0] bg-[#FFFFFF] ">
                    <div className="h-[46px] m-2 flex justify-between items-center">
                        <div className="flex flex-col gap-1 ml-3 mt-2">
                            <span className="text-[#1D2939] font-semibold text-[16px]">Test 01</span>
                            <span className="text-[#667085] font-normal text-[12px]">50 Questions</span>
                        </div>

                        {/* Toggle Button for Accordion */}
                        {!accordionOpen ? (
                            // Start Quiz Button - initially displayed on the right side
                            <button onClick={onStartQuiz} className="mr-3 mb-3">
                                <div className="mt-3 flex items-center justify-center w-[116px] h-[36px] rounded-[6px] bg-[#9012FF] border border-solid border-[#800EE2] shadow-inner-button">
                                    <span className="font-medium text-[14px] text-[#FCFCFD]">Start Quiz</span>
                                </div>
                            </button>
                        ) : (
                            // Arrow Button - displayed after pressing Start Now
                            <button className="flex justify-center items-center mr-3" onClick={() => toggleCollapse(1)}>
                                <Image
                                    src={collapsed[1] ? "/icons/arrowdown.svg" : "/icons/arrowup.svg"}
                                    alt="arrow"
                                    width={24}
                                    height={24}
                                />
                            </button>
                        )}

                    </div>

                    {/* Accordion Content */}
                    <div
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${collapsed[1] ? "max-h-0" : "max-h-[500px]"} `}
                    >
                        {/* Only render the content if not collapsed */}
                        {!collapsed[1] && (
                            <div className="h-[200px] ">
                                <div className=" h-[149px]  bg-[#FFFFFF] ml-5 mr-5 border-t border-b border-solid border-[#EAECF0] mt-[10px]">
                                    <div className="bg-[#FFFFFF] h-[50px]  flex justify-between items-center mt-[10px]"> {/* Added justify-between for spacing */}
                                        <div className="flex flex-col w-[280px]">
                                            <span className="font-normal text-[#667085] text-xs">Attempted Questions</span>
                                            <span className="font-semibold text-[15px] text-[#1D2939]">8/50</span>
                                        </div>

                                        <div className="jabir flex items-center w-[280px] mx-[116px]">
                                            {/* Vertical line on the left */}
                                            <div className="h-[30px] w-[1px] bg-[#EAECF0] mr-3"></div> {/* Vertical line with margin */}

                                            <div className="flex flex-col">
                                                <span className="font-normal text-[#667085] text-xs">Score</span>
                                                <span className="font-semibold text-[15px] text-[#1D2939]">32</span>
                                            </div>
                                        </div>
                                        <div className="jabir flex items-center w-[280px] ">

                                            <div className="h-[30px] w-[1px] bg-[#EAECF0] mr-3"></div>

                                            <div className="flex flex-col">
                                                <span className="font-normal text-[#667085] text-xs">Accuracy</span>
                                                <span className="font-semibold text-[15px] text-[#1D2939]">80%</span>
                                            </div>
                                        </div>


                                    </div>

                                    {/* ------------------------------------------- */}
                                    <div className="bg-[#FFFFFF] h-[50px]  flex justify-between items-center mt-[20px]"> {/* Added justify-between for spacing */}
                                        <div className="flex flex-col w-[280px]">
                                            <span className="font-normal text-[#667085] text-xs">Answered Correct</span>
                                            <span className="font-semibold text-[15px] text-[#1D2939]">8/80</span>
                                        </div>

                                        <div className="jabir flex items-center w-[280px] mx-[116px]">
                                            {/* Vertical line on the left */}
                                            <div className="h-[30px] w-[1px] bg-[#EAECF0] mr-3"></div> {/* Vertical line with margin */}

                                            <div className="flex flex-col">
                                                <span className="font-normal text-[#667085] text-xs">Answered Incorrect</span>
                                                <span className="font-semibold text-[15px] text-[#1D2939]">0/8</span>
                                            </div>
                                        </div>
                                        <div className="jabir flex items-center w-[280px] ">

                                            <div className="h-[30px] w-[1px] bg-[#EAECF0] mr-3"></div>

                                            <div className="flex flex-col">
                                                <span className="font-normal text-[#667085] text-xs">Time taken</span>
                                                <span className="font-semibold text-[15px] text-[#1D2939]">1h 30m out of 2h</span>
                                            </div>
                                        </div>


                                    </div>

                                </div>
                                <div className="h-[51px] ml-5 mr-5 justify-between flex items-center" >
                                    <div className="flex flex-row items-center justify-center">
                                        <span className="font-normal text-[#667085] text-xs">5 times attempted</span>
                                        <div className="tooltip relative inline-block"> {/* Add tooltip class and relative position */}
                                            <button>
                                                <Image
                                                    src="/icons/QuestionMark.svg"
                                                    width={16}
                                                    height={16}
                                                    alt="Question-mark"
                                                    className="ml-1"
                                                />
                                            </button>
                                            {/* Tooltip Text */}
                                            <div className="tooltipText"> {/* Tooltip text will be displayed here */}
                                                <span className="font-normal text-xs text-[#FFFFFF]">Your metrics related to the previous attempts are in the detailed analytics section.</span>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="flex flex-row justify-center items-center">

                                        <span className="relative font-semibold text-[#9012FF] text-sm mr-1 inline-block">
                                            View Detailed Analytics
                                            <span className="absolute left-0 bottom-[2px] w-full h-[1px] bg-[#9012FF]"></span>
                                        </span>
                                        <Image
                                            src="/icons/right-arrow.svg"
                                            width={24}
                                            height={24}
                                            alt=" Right-arrow" />

                                    </div>



                                </div>



                            </div>
                        )}
                    </div>



                </div>

            </div>


            {/* 
            ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}


            <Dialog open={showQuizDialog} onClose={() => setShowQuizDialog(false)} className="relative z-50">
                {/* Backdrop */}
                <DialogBackdrop className="fixed inset-0 bg-black/30 " />

                {/* Dialog Wrapper */}
                <div className="fixed inset-0 flex items-center justify-center ">
                    <DialogPanel transition className="bg-[#FFFFFF] rounded-2xl  w-[480px] h-[306px] ">
                        {/* Header Section */}



                        <div className="flex flex-1 h-[230px] w-full border-b-2 border-solid border-[#EAECF0] flex-col" style={{
                            borderTopLeftRadius: '12px',
                            borderTopRightRadius: '12px',
                            borderBottomLeftRadius: '0px',
                            borderBottomRightRadius: '0px',
                        }}>
                            <div className="h-[23px]  mt-[23px] mr-[24px] ml-[24px] justify-between flex">
                                <span className="text-[#1D2939] font-semibold text-lg">Start Test</span>
                                <button onClick={() => setShowQuizDialog(false)}>
                                    <Image src="/icons/cancel.svg" alt="cancel" width={18} height={18} />
                                </button>
                            </div>
                            <div className=" h-auto mr-[24px] ml-[24px] mt-[13px] ">
                                <span className="text-sm text-[#667085] font-normal">
                                    Lorem ipsum is a dummy text widely used in digital industry and lore is anptsu


                                </span>

                            </div>
                            <div className="h-[48px] w-[480px]  ml-[31px] mt-[33px] flex-row flex gap-6">
                                <div className="gap-1 flex-col flex  items-center ">
                                    <span className="font-normal text-sm text-[#667085]">Time Duration</span>
                                    <span className="text-[#1D2939] text-lg font-semibold">05:00
                                        <span className="text-[#1D2939] text-sm font-semibold">Min</span>
                                    </span>
                                </div>

                                <div className="w-[0.5px] h-[48px] bg-[#EAECF0]"></div>

                                <div className="gap-1 flex-col flex  items-center">
                                    <span className="font-normal text-sm text-[#667085]">No. of Questions</span>
                                    <span className="text-[#1D2939] text-lg font-semibold">15

                                    </span>
                                </div>

                                <div className="w-[0.5px] h-[48px] bg-[#EAECF0]"></div>

                                <div className="gap-1 flex-col flex  items-center">
                                    <span className="font-normal text-sm text-[#667085]">Marks Per Question</span>
                                    <span className="text-[#1D2939] text-lg font-semibold">2

                                    </span>
                                </div>
                            </div>


                        </div>
                        <div className="w-[480px] h-[76px] "
                            style={{
                                borderTopLeftRadius: '0px',
                                borderTopRightRadius: '0px',
                                borderBottomLeftRadius: '12px',
                                borderBottomRightRadius: '12px',
                            }}>
                            <div className="ml-[213px] gap-[16px] flex-row flex mt-[16px] h-[44px] ">

                                <button
                                    className="bg-[#FFFFFF] text-[#1D2939] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px] shadow-inner-button"
                                    style={{ border: "1.5px solid #EAECF0" }}
                                    onClick={() => setShowQuizDialog(false)}>
                                    Cancel
                                </button>
                                <button
                                    className="bg-[#8501FF] text-[#FFFFFF] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px] shadow-inner-button"
                                    style={{
                                        border: "1px solid #800EE2",

                                    }}
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
    )
}
