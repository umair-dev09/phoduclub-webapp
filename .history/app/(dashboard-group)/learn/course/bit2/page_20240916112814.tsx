"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Bit2() {
    const [activeTab, setActiveTab] = useState<string>('');
    const router = useRouter();

    const handleTabClick = (tabName: string, path: string) => {
        setActiveTab(tabName);
        router.push(path);
    };
    return (
        <div className="relative flex flex-col flex-1 pb-8">
            <div className="absolute top-0 right-0 w-[363px] h-[581px] bg-[#FFFFFF] border border-b border-r">
                <div className="h-[480px] bg-[#FFFFFF]" style={{ borderRight: '1px solid #EAECF0' }}>
                    <div className="w-[331px] h-[70px] rounded-tl-lg m-3" style={{ paddingLeft: "10px", borderRadius: '8px 0 0 0' }}>
                        {/* Use a flex container with `flex-col` to stack items vertically */}











                        <div className="flex flex-col h-full justify-start ">
                            <button
                                onClick={() => handleTabClick('bit2.1', '/bit2/bit2.1')}
                                className={`w-full h-[70px] bg-[#F8F0FF] text-[#1D2939] text-base font-medium rounded-lg flex items-start   ${activeTab === 'dashboard' ? 'text-base font-bold  bg-[#F8F0FF]' : ''
                                    }`}


                            >
                                <div className="flex-1 flex  itmes-center flex-col">
                                    <div className="flex items-center
                                        flex-1">
                                        <Image
                                            src={activeTab === 'bit2.1' ? '/icons/course-circle.svg' : '/icons/course-circle2.svg'}
                                            width={20}
                                            height={20}
                                            alt="circle-course"
                                            className="" style={{ marginTop: "9px", marginLeft: '15px' }}
                                        />
                                        <span
                                            className={`flex ${activeTab === 'bit2.1' ? {/*'text-base font-bold text-[#000000]'*/ } : 'text-base font-bold text-[#000000]'
                                                }`}
                                            style={{ marginTop: "9px", marginLeft: '15px' }}
                                        >1. Welcome and Introduction</span>
                                    </div>
                                    <div className="flex items-center 
                                           flex-1"
                                        style={{ marginTop: "6px" }}>
                                        <Image

                                            src="/icons/course-learn.svg"
                                            width={16}
                                            height={16}
                                            alt="circle-course"
                                            className="" style={{ marginLeft: '45px' }}
                                        />
                                        <span className=" flex font-normal text-[#667085]"
                                            style={{ marginLeft: '10px' }}
                                        >10:10</span>
                                    </div>
                                </div>

                            </button>
                        </div>
                        <div>
                            <button className="w-full h-[70px] bg-[#FFFFFF] text-[#1D2939] text-base font-medium rounded-lg flex items-start"

                            >
                                <div className="flex-1 flex  itmes-center flex-col">
                                    <div className="flex items-center
                                                      flex-1">
                                        <Image
                                            src="/icons/course-circle.svg"
                                            width={20}
                                            height={20}
                                            alt="circle-course"
                                            className="" style={{ marginTop: "9px", marginLeft: '15px' }}
                                        />
                                        <span className=" flex "
                                            style={{ marginTop: "9px", marginLeft: '15px' }}
                                        >2. Chapter 01 Introduction</span>
                                    </div>
                                    <div className="flex items-center 
                                                   flex-1"
                                        style={{ marginTop: "6px" }}>
                                        <Image
                                            src="/icons/vedio.svg"
                                            width={16}
                                            height={16}
                                            alt="circle-course"
                                            className="" style={{ marginLeft: '45px' }}
                                        />
                                        <span className=" flex font-normal text-[#667085]"
                                            style={{ marginLeft: '10px' }}
                                        >9:20</span>
                                    </div>
                                </div>

                            </button>
                        </div>
                        <div>
                            <button className="w-full h-[70px] bg-[#FFFFFF] text-[#1D2939] text-base font-medium rounded-lg flex items-start"

                            >
                                <div className="flex-1 flex  itmes-center flex-col">
                                    <div className="flex items-center
                                                      flex-1">
                                        <Image
                                            src="/icons/course-circle.svg"
                                            width={20}
                                            height={20}
                                            alt="circle-course"
                                            className="" style={{ marginTop: "9px", marginLeft: '15px' }}
                                        />
                                        <span className=" flex "
                                            style={{ marginTop: "9px", marginLeft: '15px' }}
                                        >3. Chapter 01 heading</span>
                                    </div>
                                    <div className="flex items-center 
                                                   flex-1"
                                        style={{ marginTop: "6px" }}>
                                        <Image
                                            src="/icons/vedio.svg"
                                            width={16}
                                            height={16}
                                            alt="circle-course"
                                            className="" style={{ marginLeft: '45px' }}
                                        />
                                        <span className=" flex  font-normal text-[#667085]"
                                            style={{ marginLeft: '10px' }}
                                        >11:45</span>
                                    </div>
                                </div>

                            </button>
                        </div>
                    </div>
                </div>
            </div>





            <div className="h-[70px] ">
                <div className="my-5 flex items-center ml-7">


                    <button className='flex items-center ml-5'>
                        <div
                            className="text-[#1D2939] h-[24px] w-auto"
                            style={{ fontSize: "16px", fontWeight: "600" }}
                        >
                            Courses
                        </div>
                        <div className="ml-3 w-[24px]">
                            <Image
                                src="/icons/course-left.svg"
                                width={6}
                                height={12}
                                alt="left-arrow"
                            />
                        </div>
                    </button>

                    <div
                        className="text-[#667085] h-full w-auto -ml-1"
                        style={{ fontSize: "16px", fontWeight: "500" }}
                    >
                        BITSET Full Course
                    </div>
                </div>
            </div>
            <div className="h-[70px] ">
                <div className="flex items-start ml-7 flex-col">
                    <div className='flex items-start  '>   <span className="text-Ig text-[#1D2939] font-bold ml-5 ">1. Welcome and Introduction</span></div>
                    <div className="flex ml-5 mt-3  flex-row items-center">

                        <Image
                            src="/icons/course-learn.svg"
                            alt="course-learn"
                            width={20}
                            height={20}
                        />
                        <span className="text-sm font-semibold text-[#1D2939] ml-3">3h 20m</span>
                        <span className="text-sm font-normal text-[#1D2939] ml-1">of readings left</span>



                        <Image
                            src="/icons/vedio.svg"
                            alt="course-learn"
                            width={20}
                            height={20}
                            className="ml-5"
                        />
                        <span className="text-sm font-semibold text-[#1D2939] ml-3">3h 20m</span>
                        <span className="text-sm font-normal text-[#1D2939] ml-1">of readings left</span>



                        <Image
                            src="/icons/course-learn.svg"
                            alt="course-learn"
                            width={20}
                            height={20}
                            className="ml-5"
                        />
                        <span className="text-sm font-semibold text-[#1D2939] ml-3">3h 20m</span>
                        <span className="text-sm font-normal text-[#1D2939] ml-1">of readings left</span>

                    </div>



                </div>
            </div>
            <div className="h-[450px]  bg-slate-600 ml-8 mr-12">
                {/* <div className="flex items-start ml-7 flex-col">
                </div> */}
            </div>
        </div>

    );
}
