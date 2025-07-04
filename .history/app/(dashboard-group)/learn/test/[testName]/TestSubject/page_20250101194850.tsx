"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import StartTest from "@/components/DashboardComponents/LearnComponents/TestsComponents/StartTest";

export default function TestSubject() {
    let router = useRouter();
    return (
        <div className="contianer flex flex-1 flex-col h-auto overflow-y-auto pb-5">
            <div className=" flex  flex-col">
                <div className="h-[64px]  ml-8 flex items-center ">
                    <div className="my-5 flex items-center">
                        <button className="flex items-center ml-1" onClick={() => router.replace("/learn/test")} >
                            <div className="text-[#1D2939] h-[24px] w-auto" style={{ fontSize: "16px", fontWeight: "600" }}>
                                Tests
                            </div>
                            <div className="ml-3 w-[24px]">
                                <Image src="/icons/course-left.svg" width={7} height={12} alt="left-arrow" />
                            </div>
                        </button>
                        <button
                            onClick={() => router.back()}>
                            <div className="text-[#1D2939] h-full w-auto -ml-1" style={{ fontSize: "16px", fontWeight: "600" }}>
                                Phodu JEE Mains Test Series 2025



                            </div>
                        </button>
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
            <div className="h-[145px]">
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

            </div>
            <div>
                <StartTest />
            </div>






        </div>
    )
}
