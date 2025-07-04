"use client";
import { useRouter, usePathname } from "next/navigation"
import Image from "next/image";
import { useState, useEffect } from "react";
export default function PhoduTestSeries() {


    const [activeTab, setActiveTab] = useState<string>('');
    const router = useRouter();
    const pathname = usePathname();
    const handleTabClick = (tabName: string, path: string) => {

        setActiveTab(tabName);
        router.push(path);
    };
    useEffect(() => {
        if (pathname) {
            const currentPath = pathname.split('/')[4];
            if (currentPath === 'TestSubject') {
                setActiveTab('TestSubject');
            }
        }
    }, [pathname]);
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
                <button
                    onClick={() => handleTabClick('TestSubject', '/learn/test/PhoduTestSeries/TestSubject')}>
                    <div className="w-[264px] h-[204px] rounded-[12px] border border-solid border-[#EAECF0] bg-[#FFFFFF]">
                        <div className="h-[156px] m-5 flex flex-col space-y-6">
                            <div className="h-[46px] flex flex-col">
                                <div className="flex justify-between h-[24px] ">
                                    <span className="font-semibold text-1g text-[#1D2939]">Physics</span>
                                    <Image src="/icons/course-left.svg" width={7} height={13} alt="left-arrow" />
                                </div>
                                <span className="font-normal text-[12px] text-[#667085] mt-1  flex flex-row
                                justify-start">5 Tests</span>
                            </div>

                            <div className="h-[44px] flex flex-col ">
                                <div className="flex justify-between h-[24px] mb-2">
                                    <span className="font-medium text-xs text-[#667085]">Attempted</span>
                                    <span className="font-medium text-xs text-[#667085]">Total Score</span>
                                </div>
                                <div className="flex justify-between h-[24px] ">
                                    <span className="ml-4 font-semibold text-[#1D2939] text-xs">1/5</span>
                                    <span className="ml-4 font-semibold text-[#1D2939] text-xs">130</span>
                                </div>
                            </div>

                            {/* No gap applied here */}
                            <div className="flex items-center justify-between flex-row gap-[10px]">
                                <div className="flex-grow relative h-2 rounded-full bg-gray-200 "> {/* Added `flex-grow` to allow space for text and `mr-4` for margin */}
                                    <div
                                        className="absolute top-0 left-0 h-2 rounded-full bg-progressPurple"
                                        style={{ width: "43%" }}  // 43% progress is shown
                                    ></div>
                                </div>
                                <span className="font-normal text-[#667085] text-xs">43%</span>
                            </div>

                        </div>



                    </div>
                </button>

                <button onClick={() => handleTabClick('TestSubject', '/learn/test/PhoduTestSeries/TestSubject')}>
                    <div className="w-[264px] h-[204px] rounded-[12px] border border-solid border-[#EAECF0] bg-[#FFFFFF]">
                        <div className="h-[156px] m-5 flex flex-col space-y-6">
                            <div className="h-[46px] flex flex-col">
                                <div className="flex justify-between h-[24px] ">
                                    <span className="font-semibold text-1g text-[#1D2939]">Chemistry</span>
                                    <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                                        <button>
                                            <Image alt="Collapse Icon Right" src="/icons/collapse-right.svg" width={8} height={8} />
                                        </button>
                                    </button>
                                </div>
                                <span className="font-normal text-[12px] text-[#667085] mt-1 flex flex-row justify-start">10 Tests</span>
                            </div>

                            <div className="h-[44px] flex flex-col ">
                                <div className="flex justify-between h-[24px] mb-2">
                                    <span className="font-medium text-xs text-[#667085]">Attempted</span>
                                    <span className="font-medium text-xs text-[#667085]">Total Score</span>
                                </div>
                                <div className="flex justify-between h-[24px] ">
                                    <span className="ml-4 font-semibold text-[#1D2939] text-xs">5/5</span>
                                    <span className="ml-4 font-semibold text-[#1D2939] text-xs">130</span>
                                </div>
                            </div>

                            {/* No gap applied here */}
                            <div className="flex items-center justify-between flex-row gap-[10px]">
                                <div className="flex-grow relative h-2 rounded-full bg-gray-200 "> {/* Added `flex-grow` to allow space for text and `mr-4` for margin */}
                                    <div
                                        className="absolute top-0 left-0 h-2 rounded-full bg-progressPurple"
                                        style={{ width: "100%" }}  // 43% progress is shown
                                    ></div>
                                </div>
                                <span className="font-normal text-[#667085] text-xs">100%</span>
                            </div>

                        </div>



                    </div>
                </button>
                <button onClick={() => handleTabClick('TestSubject', '/learn/test/PhoduTestSeries/TestSubject')}>
                    <div className="w-[264px] h-[204px] rounded-[12px] border border-solid border-[#EAECF0] bg-[#FFFFFF]">
                        <div className="h-[156px] m-5 flex flex-col space-y-6">
                            <div className="h-[46px] flex flex-col">
                                <div className="flex justify-between h-[24px] ">
                                    <span className="font-semibold text-1g text-[#1D2939]">Maths</span>
                                    <Image src="/icons/course-left.svg" width={7} height={13} alt="left-arrow" />
                                </div>
                                <span className="font-normal text-[12px] text-[#667085] mt-1 flex flex-row justify-start">5 Tests</span>
                            </div>

                            <div className="h-[44px] flex flex-col ">
                                <div className="flex justify-between h-[24px] mb-2">
                                    <span className="font-medium text-xs text-[#667085]">Attempted</span>
                                    <span className="font-medium text-xs text-[#667085]">Total Score</span>
                                </div>
                                <div className="flex justify-between h-[24px] ">
                                    <span className="ml-4 font-semibold text-[#1D2939] text-xs">0/5</span>
                                    <span className="ml-4 font-semibold text-[#1D2939] text-xs">0</span>
                                </div>
                            </div>

                            {/* No gap applied here */}
                            <div className="flex items-center justify-between flex-row gap-[10px]">
                                <div className="flex-grow relative h-2 rounded-full bg-gray-200 "> {/* Added `flex-grow` to allow space for text and `mr-4` for margin */}
                                    <div
                                        className="absolute top-0 left-0 h-2 rounded-full bg-progressPurple"
                                        style={{ width: "0%" }}  // 43% progress is shown
                                    ></div>
                                </div>
                                <span className="font-normal text-[#667085] text-xs">0%</span>
                            </div>

                        </div>



                    </div>

                </button>
                <button onClick={() => handleTabClick('TestSubject', '/learn/test/PhoduTestSeries/TestSubject')}>
                    <div className="w-[264px] h-[204px] rounded-[12px] border border-solid border-[#EAECF0] bg-[#FFFFFF]">
                        <div className="h-[156px] m-5 flex flex-col space-y-6">
                            <div className="h-[46px] flex flex-col">
                                <div className="flex justify-between h-[24px] ">
                                    <span className="font-semibold text-1g text-[#1D2939]">All Subjects</span>
                                    <Image src="/icons/course-left.svg" width={7} height={13} alt="left-arrow" />
                                </div>
                                <span className="font-normal text-[12px] text-[#667085] mt-1 flex flex-row justify-start">5 Tests</span>
                            </div>

                            <div className="h-[44px] flex flex-col ">
                                <div className="flex justify-between h-[24px] mb-2">
                                    <span className="font-medium text-xs text-[#667085]">Attempted</span>
                                    <span className="font-medium text-xs text-[#667085]">Total Score</span>
                                </div>
                                <div className="flex justify-between h-[24px] ">
                                    <span className="ml-4 font-semibold text-[#1D2939] text-xs">0/5</span>
                                    <span className="ml-4 font-semibold text-[#1D2939] text-xs">0</span>
                                </div>
                            </div>

                            {/* No gap applied here */}
                            <div className="flex items-center justify-between flex-row gap-[10px]">
                                <div className="flex-grow relative h-2 rounded-full bg-gray-200 "> {/* Added `flex-grow` to allow space for text and `mr-4` for margin */}
                                    <div
                                        className="absolute top-0 left-0 h-2 rounded-full bg-progressPurple"
                                        style={{ width: "0%" }}  // 43% progress is shown
                                    ></div>
                                </div>
                                <span className="font-normal text-[#667085] text-xs">0%</span>
                            </div>

                        </div>



                    </div>
                </button>





            </div>


        </div>
    )
}


