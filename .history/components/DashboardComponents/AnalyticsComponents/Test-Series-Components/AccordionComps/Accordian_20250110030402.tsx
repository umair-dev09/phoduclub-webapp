import React from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
function Accordian() {

    const router = useRouter();

    const handleTabClick = (tabName: string, path: string) => {
        router.push(path);
    }

    return (
        <div className=' border-t border-lightGrey mx-5 py-2'>
            <div className="flex flex-row justify-between pt-2 pb-2">
                <div className='flex flex-col gap-1.5'>
                    <p className="font-semibold text-[#1D2939]">Test 01</p>
                    <div className='flex flex-row gap-1'>
                        <p className="text-xs text-[#667085]">50 Questions</p>
                        <hr className="text-xs text-[#667085] h-2" />
                        <p className="text-xs text-[#667085]">5 times attempted</p>
                        <button>
                            <Image src="/icons/questionmark.svg" width={16} height={16} alt="left-arrow" />
                        </button>

                    </div>


                </div>
                <div className="flex items-center justify-center h-auto">
                    <div className="flex fles-row mr-5">
                        <div className="flex flex-row gap-1.5 text-[0.813rem]">
                            <p className="font-semibold text-[#1D2939]">44/55</p>
                            <p className='text-[#667085]'>Attempted</p>
                        </div>
                    </div>
                    <div className="flex fles-row justify-center items-center mr-5">
                        <div className="w-[1px] bg-lightGrey mr-4 h-10"></div>
                        <div className="flex flex-row gap-1.5 text-[0.813rem]">
                            <p className="font-semibold text-[#1D2939]">38/45</p>
                            <p className='text-[#667085]'>Corrected</p>
                        </div>
                    </div>
                    <div className="flex fles-row justify-center items-center mr-5">
                        <div className="w-[1px] bg-lightGrey mr-4 h-10"></div>
                        <div className="flex flex-row gap-1.5 text-[0.813rem]">
                            <p className="font-semibold text-[#1D2939]">7/45</p>
                            <p className='text-[#667085]'>Incorrect</p>
                        </div>
                    </div>
                    <div className="flex fles-row justify-center items-center mr-5">
                        <div className="w-[1px] bg-lightGrey mr-4 h-10"></div>
                        <div className="flex flex-row gap-1.5 text-[0.813rem]">
                            <p className="font-semibold text-[#1D2939]">80%</p>
                            <p className='text-[#667085]'>Accuracy</p>
                        </div>
                    </div>
                    <div className="flex fles-row justify-center items-center mr-5">
                        <div className="w-[1px] bg-lightGrey mr-4 h-10"></div>
                        <div className="flex flex-row gap-1.5 text-[0.813rem]">
                            <p className="font-semibold text-[#1D2939]">32</p>
                            <p className='text-[#667085]'>Score</p>
                        </div>
                    </div>
                    <button
                        onClick={() => handleTabClick("Physics", "/analytics/test-series/PhoduJeeMainsTestSeries/Physics")}>
                        <span className="font-semibold text-[#9012FF] text-sm hover:underline">Detail View</span>
                    </button>
                </div>
            </div>
            <div className="flex flex-row justify-between pt-2 pb-2 border-t border-lightGrey">
                <div className='flex flex-col gap-1.5'>
                    <p className="font-semibold text-[#1D2939]">Test 01</p>
                    <p className="text-xs text-[#667085]">50 Questions</p>
                </div>
                <div className="flex items-center justify-center h-auto">
                    <div className="flex fles-row mr-5">
                        <div className="flex flex-row gap-1.5 text-[0.813rem]">
                            <p className="font-semibold text-[#1D2939]">44/55</p>
                            <p className='text-[#667085]'>Attempted</p>
                        </div>
                    </div>
                    <div className="flex fles-row justify-center items-center mr-5">
                        <div className="w-[1px] bg-lightGrey mr-4 h-10"></div>
                        <div className="flex flex-row gap-1.5 text-[0.813rem]">
                            <p className="font-semibold text-[#1D2939]">38/45</p>
                            <p className='text-[#667085]'>Corrected</p>
                        </div>
                    </div>
                    <div className="flex fles-row justify-center items-center mr-5">
                        <div className="w-[1px] bg-lightGrey mr-4 h-10"></div>
                        <div className="flex flex-row gap-1.5 text-[0.813rem]">
                            <p className="font-semibold text-[#1D2939]">7/45</p>
                            <p className='text-[#667085]'>Incorrect</p>
                        </div>
                    </div>
                    <div className="flex fles-row justify-center items-center mr-5">
                        <div className="w-[1px] bg-lightGrey mr-4 h-10"></div>
                        <div className="flex flex-row gap-1.5 text-[0.813rem]">
                            <p className="font-semibold text-[#1D2939]">80%</p>
                            <p className='text-[#667085]'>Accuracy</p>
                        </div>
                    </div>
                    <div className="flex fles-row justify-center items-center mr-5">
                        <div className="w-[1px] bg-lightGrey mr-4 h-10"></div>
                        <div className="flex flex-row gap-1.5 text-[0.813rem]">
                            <p className="font-semibold text-[#1D2939]">32</p>
                            <p className='text-[#667085]'>Score</p>
                        </div>
                    </div>
                    <button
                        onClick={() => handleTabClick("Physics", "/analytics/test-series/PhoduJeeMainsTestSeries/AllSubjects")}>
                        <span className="font-semibold text-[#9012FF] text-sm hover:underline">Detail View</span>
                    </button>
                </div>
            </div>
            <div className="flex flex-row justify-between pt-2 pb-2 border-t border-lightGrey">
                <div className='flex flex-col gap-1.5'>
                    <p className="font-semibold text-[#1D2939]">Test 01</p>
                    <p className="text-xs text-[#667085]">50 Questions</p>
                </div>
                <div className="flex items-center justify-center h-auto">
                    <div className="flex fles-row mr-5">
                        <div className="flex flex-row gap-1.5 text-[0.813rem]">
                            <p className="font-semibold text-[#1D2939]">44/55</p>
                            <p className='text-[#667085]'>Attempted</p>
                        </div>
                    </div>
                    <div className="flex fles-row justify-center items-center mr-5">
                        <div className="w-[1px] bg-lightGrey mr-4 h-10"></div>
                        <div className="flex flex-row gap-1.5 text-[0.813rem]">
                            <p className="font-semibold text-[#1D2939]">38/45</p>
                            <p className='text-[#667085]'>Corrected</p>
                        </div>
                    </div>
                    <div className="flex fles-row justify-center items-center mr-5">
                        <div className="w-[1px] bg-lightGrey mr-4 h-10"></div>
                        <div className="flex flex-row gap-1.5 text-[0.813rem]">
                            <p className="font-semibold text-[#1D2939]">7/45</p>
                            <p className='text-[#667085]'>Incorrect</p>
                        </div>
                    </div>
                    <div className="flex fles-row justify-center items-center mr-5">
                        <div className="w-[1px] bg-lightGrey mr-4 h-10"></div>
                        <div className="flex flex-row gap-1.5 text-[0.813rem]">
                            <p className="font-semibold text-[#1D2939]">80%</p>
                            <p className='text-[#667085]'>Accuracy</p>
                        </div>
                    </div>
                    <div className="flex fles-row justify-center items-center mr-5">
                        <div className="w-[1px] bg-lightGrey mr-4 h-10"></div>
                        <div className="flex flex-row gap-1.5 text-[0.813rem]">
                            <p className="font-semibold text-[#1D2939]">32</p>
                            <p className='text-[#667085]'>Score</p>
                        </div>
                    </div>
                    <button
                        onClick={() => handleTabClick("Physics", "/analytics/test-series/PhoduJeeMainsTestSeries/Physics")}>
                        <span className="font-semibold text-[#9012FF] text-sm hover:underline">Detail View</span>
                    </button>
                </div>
            </div>
            <div className="flex flex-row justify-between pt-2 pb-2 border-t border-lightGrey">
                <div className='flex flex-col gap-1.5'>
                    <p className="font-semibold text-[#1D2939]">Test 01</p>
                    <p className="text-xs text-[#667085]">50 Questions</p>
                </div>
                <div className="flex items-center justify-center h-auto">
                    <div className="flex fles-row mr-5">
                        <div className="flex flex-row gap-1.5 text-[0.813rem]">
                            <p className="font-semibold text-[#1D2939]">44/55</p>
                            <p className='text-[#667085]'>Attempted</p>
                        </div>
                    </div>
                    <div className="flex fles-row justify-center items-center mr-5">
                        <div className="w-[1px] bg-lightGrey mr-4 h-10"></div>
                        <div className="flex flex-row gap-1.5 text-[0.813rem]">
                            <p className="font-semibold text-[#1D2939]">38/45</p>
                            <p className='text-[#667085]'>Corrected</p>
                        </div>
                    </div>
                    <div className="flex fles-row justify-center items-center mr-5">
                        <div className="w-[1px] bg-lightGrey mr-4 h-10"></div>
                        <div className="flex flex-row gap-1.5 text-[0.813rem]">
                            <p className="font-semibold text-[#1D2939]">7/45</p>
                            <p className='text-[#667085]'>Incorrect</p>
                        </div>
                    </div>
                    <div className="flex fles-row justify-center items-center mr-5">
                        <div className="w-[1px] bg-lightGrey mr-4 h-10"></div>
                        <div className="flex flex-row gap-1.5 text-[0.813rem]">
                            <p className="font-semibold text-[#1D2939]">80%</p>
                            <p className='text-[#667085]'>Accuracy</p>
                        </div>
                    </div>
                    <div className="flex fles-row justify-center items-center mr-5">
                        <div className="w-[1px] bg-lightGrey mr-4 h-10"></div>
                        <div className="flex flex-row gap-1.5 text-[0.813rem]">
                            <p className="font-semibold text-[#1D2939]">32</p>
                            <p className='text-[#667085]'>Score</p>
                        </div>
                    </div>
                    <button
                        onClick={() => handleTabClick("Physics", "/analytics/test-series/PhoduJeeMainsTestSeries/Physics")}>
                        <span className="font-semibold text-[#9012FF] text-sm hover:underline">Detail View</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Accordian;