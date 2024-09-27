"use client";
import { useRouter } from "next/navigation"
import Image from "next/image";
export default function PhoduTestSeries() {
    let router = useRouter();
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
                        <div className="text-[#667085] h-full w-auto -ml-1" style={{ fontSize: "16px", fontWeight: "500" }}>
                            Phodu JEE Mains Test Series 2025



                        </div>
                    </div>

                </div>
                <div className="h-[64px]  ml-8 flex items-center ">

                    <div className="text-[#1D2939] h-[24px] w-auto" style={{ fontSize: "18px", fontWeight: "600" }}>
                        Phodu JEE Mains Test Series 2025
                    </div>
                </div>
            </div>

            <div className=" h-[204px] ml-8 mr-8 gap-4 flex flex-row">
                <div className="w-[264px] h-[204px] rounded-[12px] border border-solid border-[#EAECF0] bg-[#FFFFFF]">
                    <div className="h-[156px]  m-6 ">
                        <div className="h-[46px] bg-red-500 flex flex-col">
                            <div className=" flex justify-between h-[24px] bg-slate-100">
                                <span> jabir</span>
                                <Image src="/icons/course-left.svg" width={7} height={12} alt="left-arrow" />

                            </div>
                            <span>enweivn</span>

                        </div>
                        <div className="h-[44px] flex flex-col">
                            <div className=" flex justify-between h-[24px] bg-slate-100">
                                <span> jabir</span>
                                <span>svcwe</span>

                            </div>
                            <div className=" flex justify-between h-[24px] bg-slate-100">
                                <span> 1/3</span>
                                <span>2/4</span>

                            </div>



                        </div>
                        <div className="flex w-full h-2 rounded-full bg-gray-200 justify-between">
                            <div
                                className="absolute top-0 left-0 h-2 rounded-full bg-progressPurple"
                                style={{ width: "43%" }}  // 43% progress is shown
                            ></div>
                            <span>43%</span>
                        </div>
                    </div>

                </div>





            </div>


        </div>
    )
}
