"use client";
import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import Collapsible from "react-collapsible";
import { useRouter } from "next/navigation";

export default function TestSubject() {
    let [showQuizDialog, setShowQuizDialog] = useState(false);
    const [accordionOpen, setAccordionOpen] = useState(false);
    const [testCompleted, setTestCompleted] = useState(false); // New state for test completion
    const router = useRouter();

    const onStartQuiz = () => {
        setShowQuizDialog(true);
    };

    const onStartNow = () => {
        setShowQuizDialog(false);
        setAccordionOpen(true);

        setTestCompleted(true); // Mark the test as completed
    };

    const testt = () => {
        alert('fff')
    }
    const [isOpenArray, setIsOpenArray] = useState([false, false, false]); // Initialize with false for each collapsible

    // Function to toggle a specific collapsible's state
    const toggleCollapsible = (index: number) => {
        const newIsOpenArray = [...isOpenArray];
        newIsOpenArray[index] = !newIsOpenArray[index]; // Toggle the specific index
        setIsOpenArray(newIsOpenArray);
    };


    return (
        <div className="container flex flex-1 flex-col h-auto overflow-y-auto pb-3">
            {/* Test Accordion 1 */}
            <div className="gap-4 flex flex-col">
                <div className="TEST CONTAINER ml-8 mr-8 rounded-[12px] border border-solid border-[#EAECF0] bg-[#FFFFFF]">
                    <Collapsible

                        trigger={
                            <div className="h-[46px] m-2 flex justify-between items-center"
                                onClick={() => toggleCollapsible(0)}>
                                <div className="flex flex-col gap-1 ml-3 ">
                                    <span className="text-[#1D2939] font-semibold text-[16px]">
                                        Test 01
                                    </span>
                                    <span className="text-[#667085] font-normal text-[12px]">
                                        50 Questions
                                    </span>
                                </div>

                                <div className="flex items-center mr-3 mb-3 gap-4">


                                    {/* Conditional rendering for Test Completed and Re-attempt */}
                                    {testCompleted ? (
                                        <div className="gap-6 flex flex-row items-center justify-center mt-3">
                                            <div className="flex flex-row items-center justify-center">
                                                <Image
                                                    src="/icons/Green-tick.svg"
                                                    width={14}
                                                    height={14}
                                                    alt="small green-tick" />
                                                <span className="font-semibold text-xs text-[#0B9055] ml-2">Test Completed</span>
                                            </div>
                                            <div>
                                                <button className="h-[36px] flex flex-row items-center justify-center rounded-md w-[127px] gap-2"
                                                    style={{ border: "1.5px solid #EAECF0" }}
                                                >
                                                    <Image
                                                        src="/icons/Re-attempt.svg"
                                                        width={18}
                                                        height={18}
                                                        alt="Re-attempt" />
                                                    <span className="text-[#1D2939] font-semibold text-xs">Re-attempt</span>
                                                </button>
                                            </div>
                                            <Image
                                                src={isOpenArray[0] ? "/icons/arrowdown.svg" : "/icons/arrowup.svg"}
                                                alt="arrow"
                                                width={24}
                                                height={24}
                                                className="cursor-pointer"
                                            />
                                        </div>

                                    ) : (
                                        <button onClick={onStartQuiz}>
                                            <div className="mt-3 flex items-center justify-center w-[116px] h-[36px] rounded-[6px] bg-[#9012FF] border border-solid border-[#800EE2] shadow-inner-button">
                                                <span className="font-medium text-[14px] text-[#FCFCFD]">
                                                    Start test
                                                </span>
                                            </div>
                                        </button>

                                    )
                                    }
                                </div>
                            </div>
                        }
                        transitionTime={350}
                        onOpening={() => toggleCollapsible(0)}  // Set the state to open when expanding
                        onClosing={() => toggleCollapsible(0)} // Set the state to closed when collapsing

                    >
                        <div
                            className={`overflow-hidden ${accordionOpen ? "max-h-[500px]" : "max-h-0"
                                }`}
                        >
                            <div className="h-[200px] ">
                                <div className="h-[149px] bg-[#FFFFFF] ml-5 mr-5 border-t border-b border-solid border-[#EAECF0] mt-[10px]">
                                    <div className="bg-[#FFFFFF] h-[50px] flex justify-between items-center mt-[10px]">
                                        <div className="flex flex-col w-[280px]">
                                            <span className="font-normal text-[#667085] text-xs">
                                                Attempted Questions
                                            </span>
                                            <span className="font-semibold text-[15px] text-[#1D2939]">
                                                8/50
                                            </span>
                                        </div>

                                        <div className="jabir flex items-center w-[280px] mx-[116px]">
                                            <div className="h-[30px] w-[1px] bg-[#EAECF0] mr-3"></div>

                                            <div className="flex flex-col">
                                                <span className="font-normal text-[#667085] text-xs">
                                                    Score
                                                </span>
                                                <span className="font-semibold text-[15px] text-[#1D2939]">
                                                    32
                                                </span>
                                            </div>
                                        </div>
                                        <div className="jabir flex items-center w-[280px] ">
                                            <div className="h-[30px] w-[1px] bg-[#EAECF0] mr-3"></div>

                                            <div className="flex flex-col">
                                                <span className="font-normal text-[#667085] text-xs">
                                                    Accuracy
                                                </span>
                                                <span className="font-semibold text-[15px] text-[#1D2939]">
                                                    80%
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-[#FFFFFF] h-[50px] flex justify-between items-center mt-[20px]">
                                        <div className="flex flex-col w-[280px]">
                                            <span className="font-normal text-[#667085] text-xs">
                                                Answered Correct
                                            </span>
                                            <span className="font-semibold text-[15px] text-[#1D2939]">
                                                8/80
                                            </span>
                                        </div>

                                        <div className="jabir flex items-center w-[280px] mx-[116px]">
                                            <div className="h-[30px] w-[1px] bg-[#EAECF0] mr-3"></div>

                                            <div className="flex flex-col">
                                                <span className="font-normal text-[#667085] text-xs">
                                                    Answered Incorrect
                                                </span>
                                                <span className="font-semibold text-[15px] text-[#1D2939]">
                                                    0/8
                                                </span>
                                            </div>
                                        </div>
                                        <div className="jabir flex items-center w-[280px] ">
                                            <div className="h-[30px] w-[1px] bg-[#EAECF0] mr-3"></div>

                                            <div className="flex flex-col">
                                                <span className="font-normal text-[#667085] text-xs">
                                                    Time taken
                                                </span>
                                                <span className="font-semibold text-[15px] text-[#1D2939]">
                                                    1h 30m out of 2h
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-[51px] ml-5 mr-5 justify-between flex items-center">
                                    <div className="flex flex-row items-center justify-center">
                                        <span className="font-normal text-[#667085] text-xs">
                                            5 times attempted
                                        </span>
                                        <div className="tooltip relative inline-block">
                                            <button>
                                                <Image
                                                    src="/icons/questionmark.svg"
                                                    width={16}
                                                    height={16}
                                                    alt="Question-mark"
                                                    className="ml-1 mt-1"
                                                />
                                            </button>
                                            <div className="tooltipText">
                                                <span className="font-normal text-xs text-[#FFFFFF]">
                                                    Your metrics related to the previous attempts are in
                                                    the detailed analytics section.
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="flex flex-row justify-center items-center"
                                        onClick={() => router.replace('/analytics/test-series')}>
                                        <span className="relative font-semibold text-[#9012FF] text-sm mr-1 inline-block">
                                            View Detailed Analytics
                                            <span className="absolute left-0 bottom-[2px] w-full h-[1px] bg-[#9012FF]"></span>
                                        </span>
                                        <Image
                                            src="/icons/right-arrow.svg"
                                            width={24}
                                            height={24}
                                            alt=" Right-arrow"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Collapsible>
                </div>



            </div>




            {/* 
            ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}


         




        </div>
    )
}

