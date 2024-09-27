"use client";
import { useRouter } from "next/navigation"; // Correct import
import { useState } from "react"; // Import useState correctly
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";

export default function TestSubject() {
    let router = useRouter(); // Only one useRouter hook
    let [showQuizDialog, setShowQuizDialog] = useState(false); // useState hook


    const onStartQuiz = () => {
        setShowQuizDialog(true);

    };


    return (
        <div className="contianer flex flex-1 flex-col">
            <div className=" flex  flex-col">
                <div className="h-[64px]  ml-8 flex items-center ">
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
                <div className="h-[64px]  ml-8 flex items-center ">

                    <div className="text-[#1D2939] h-[24px] w-auto" style={{ fontSize: "18px", fontWeight: "600" }}>
                        Test Series for Physics
                    </div>
                </div>
            </div>
            <div className=" h-[81px]  ml-8 mr-8   rounded-[12px] border border-solid border-[#EAECF0] bg-[#FFFFFF]">
                <div className="h-[49px] w-full m-4 flex flex-row gap-4">
                    <div className="w-[178.69px] h-[49px] flex flex-col border-r border-solid border-[#EAECF0]">
                        <span className="font-normal text-[#667085] text-xs">Attempted Questions</span>
                        <span className="font-semibold text-[#1D2939] text-base mt-2">8/150</span>

                    </div>
                    <div className="w-[178.69px] h-[49px] flex flex-col  border-r border-solid border-[#EAECF0]">
                        <span className="font-normal text-[#667085] text-xs">Score</span>
                        <span className="font-semibold text-[#1D2939] text-base mt-2">32</span>

                    </div>
                    <div className="w-[178.69px] h-[49px] flex flex-col  border-r border-solid border-[#EAECF0]">
                        <span className="font-normal text-[#667085] text-xs">Accuracy</span>
                        <span className="font-semibold text-[#1D2939] text-base mt-2">80%</span>

                    </div>
                    <div className="w-[178.69px] h-[49px] flex flex-col  border-r border-solid border-[#EAECF0]">
                        <span className="font-normal text-[#667085] text-xs">Answered Correct</span>
                        <span className="font-semibold text-[#1D2939] text-base mt-2">8/150</span>

                    </div>
                    <div className="w-[178.69px] h-[49px] flex flex-col  border-r border-solid border-[#EAECF0]">
                        <span className="font-normal text-[#667085] text-xs">Answered inCorrect</span>
                        <span className="font-semibold text-[#1D2939] text- mt-2">0/150</span>

                    </div>
                    <div className="w-[178.69px] h-[49px] flex flex-col">
                        <span className="font-normal text-[#667085] text-xs">Time taken</span>
                        <span className="font-semibold text-[#1D2939] text-base mt-2">1h 30m of 2h</span>

                    </div>


                </div>
            </div>
            <div className="h-[64px]  ml-8 flex items-center ">
                <span className="font-bold text-[18px] text-[#1D2939]">
                    Tests
                </span>

            </div>
            <div className=" h-[78px]  ml-8 mr-8   rounded-[12px] border border-solid border-[#EAECF0] bg-[#FFFFFF]">


                <div className=" h-[46] m-2 flex justify-between ">
                    <div className="flex flex-col gap-1 ml-3 mt-2">
                        <span className="text-[#1D2939] font-semibold text-[16px]">Test 01</span>
                        <span className="text-[#667085] font-normal text-[12px]">50 Questions</span>


                    </div>
                    <button
                        onClick={onStartQuiz}>
                        <div className="mt-3 mr-2 flex items-center justify-center w-[116px] h-[36px] rounded-[6px] bg-[#9012FF] border border-solid border-[#800EE2] shadow-inner-button">
                            <span className="text-[#FFFFFF] font-semibold text-xs">Start test</span>
                        </div>
                    </button>


                </div>
            </div>
            <Dialog open={showQuizDialog} onClose={() => setShowQuizDialog(false)} className="relative z-50">
                {/* Backdrop */}
                <DialogBackdrop className="fixed inset-0 bg-black/30 " />

                {/* Dialog Wrapper */}
                <div className="fixed inset-0 flex items-center justify-center ">
                    <DialogPanel transition className="bg-[#FFFFFF] rounded-2xl  w-[480px] h-[306px] ">
                        {/* Header Section */}
                        {/* <div className="flex items-center justify-between mb-4">
                            <span className="text-lg font-bold text-[#1D2939]">Confirmation</span>
                            <button onClick={() => setShowQuizDialog(false)}>
                                <Image src="/icons/cancel.svg" alt="cancel" width={18} height={18} />
                            </button>
                        </div>

                       
                        <div className="flex flex-col gap-4 w-[432px] h-[230px]">
                            <span className="text-sm text-[#667085] font-normal">
                                Lorem ipsum is a dummy text widely used in the digital industry and will be used here as a preview.
                            </span>

                        </div>

                    
                        <div className="border-t border-[#EAECF0] w-full h-[76px] mt-5 flex justify-end gap-2">
                            <div className="mt-5">
                                <button
                                    className="bg-[#FFFFFF] text-[#1D2939] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px]"
                                    style={{ border: "1.5px solid #EAECF0" }}
                                    onClick={() => setShowQuizDialog(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                            <div className="mt-5">
                                <button

                                    className="bg-[#8501FF] text-[#FFFFFF] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px]"
                                    style={{
                                        border: "1px solid #800EE2",
                                        boxShadow: "0px -4px 4px 0px #1018281F inset, 0px 3px 2px 0px #FFFFFF3D inset",
                                    }}
                                >
                                    Start Now
                                </button>
                            </div>
                        </div> */}
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


                    </DialogPanel>
                </div>
            </Dialog>





        </div>
    )
}