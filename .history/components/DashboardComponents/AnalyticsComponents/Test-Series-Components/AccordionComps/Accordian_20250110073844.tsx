import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { Tooltip, } from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import TestDialog from "../TestDialog";
function Accordian() {
    const [detailview, setDetailview] = useState(false);
    const router = useRouter();

    const handleTabClick = (tabName: string, path: string) => {
        router.push(path);
    }

    return (
        <div className=' border-t border-lightGrey mx-5 py-2'>
            <div className="flex flex-row justify-between pt-2 pb-2">
                <div className='flex flex-col gap-1.5'>
                    <p className="font-semibold text-[#1D2939]">Test 01</p>

                    <div className='flex flex-row items-center gap-1'>
                        <p className="text-xs text-[#667085]">50 Questions</p>
                        {/* horizontal line */}
                        <div className="w-[1px] h-3 bg-[#667085]"></div>
                        <p className="text-xs text-[#667085]">5 times attempted</p>

                        <Tooltip
                            content="This results is from your last attempts, click on Detail view button to see all attempted results."
                            placement="top"
                            offset={15}
                            closeDelay={100}
                            classNames={{
                                content: [
                                    "bg-black text-white py-4 text-[14px] max-w-[240px]",
                                    "rounded-md",
                                    "text-center", // center the text
                                    "after:content-['']",
                                    "after:absolute",
                                    "font-normal",
                                    "text-sm",
                                    // The Below Arrow Mark
                                    "after:top-full",
                                    "after:left-1/2",
                                    "after:-ml-2",
                                    "after:border-8",
                                    "after:border-transparent",
                                    "after:border-t-black",
                                ],
                            }}
                        >
                            <button>
                                <img
                                    src="/icons/questionmark.svg"
                                    width={16}
                                    height={16}
                                    alt="question mark icon"
                                    className="w-4 h-4"
                                />
                            </button>
                        </Tooltip>


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
                        onClick={() => setDetailview(true)}
                    >
                        <span className="font-semibold text-[#9012FF] text-sm hover:underline">Detail View</span>
                    </button>
                </div>
            </div>
            <div className="flex flex-row justify-between pt-2 pb-2 border-t border-lightGrey">
                <div className='flex flex-col gap-1.5'>
                    <p className="font-semibold text-[#1D2939]">Test 01</p>

                    <div className='flex flex-row items-center gap-1'>
                        <p className="text-xs text-[#667085]">50 Questions</p>
                        {/* horizontal line */}
                        <div className="w-[1px] h-3 bg-[#667085]"></div>
                        <p className="text-xs text-[#667085]">5 times attempted</p>

                        <Tooltip
                            content="This results is from your last attempts, click on Detail view button to see all attempted results."
                            placement="top"
                            offset={15}
                            closeDelay={100}
                            classNames={{
                                content: [
                                    "bg-black text-white py-4 text-[14px] max-w-[240px]",
                                    "rounded-md",
                                    "text-center", // center the text
                                    "after:content-['']",
                                    "after:absolute",
                                    "font-normal",
                                    "text-sm",
                                    // The Below Arrow Mark
                                    "after:top-full",
                                    "after:left-1/2",
                                    "after:-ml-2",
                                    "after:border-8",
                                    "after:border-transparent",
                                    "after:border-t-black",
                                ],
                            }}
                        >
                            <button>
                                <img
                                    src="/icons/questionmark.svg"
                                    width={16}
                                    height={16}
                                    alt="question mark icon"
                                    className="w-4 h-4"
                                />
                            </button>
                        </Tooltip>


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
                        onClick={() => setDetailview(true)}
                    >
                        <span className="font-semibold text-[#9012FF] text-sm hover:underline">Detail View</span>
                    </button>
                </div>
            </div>
            <div className="flex flex-row justify-between pt-2 pb-2 border-t border-lightGrey">
                <div className='flex flex-col gap-1.5'>
                    <p className="font-semibold text-[#1D2939]">Test 01</p>

                    <div className='flex flex-row items-center gap-1'>
                        <p className="text-xs text-[#667085]">50 Questions</p>
                        {/* horizontal line */}
                        <div className="w-[1px] h-3 bg-[#667085]"></div>
                        <p className="text-xs text-[#667085]">5 times attempted</p>

                        <Tooltip
                            content="This results is from your last attempts, click on Detail view button to see all attempted results."
                            placement="top"
                            offset={15}
                            closeDelay={100}
                            classNames={{
                                content: [
                                    "bg-black text-white py-4 text-[14px] max-w-[240px]",
                                    "rounded-md",
                                    "text-center", // center the text
                                    "after:content-['']",
                                    "after:absolute",
                                    "font-normal",
                                    "text-sm",
                                    // The Below Arrow Mark
                                    "after:top-full",
                                    "after:left-1/2",
                                    "after:-ml-2",
                                    "after:border-8",
                                    "after:border-transparent",
                                    "after:border-t-black",
                                ],
                            }}
                        >
                            <button>
                                <img
                                    src="/icons/questionmark.svg"
                                    width={16}
                                    height={16}
                                    alt="question mark icon"
                                    className="w-4 h-4"
                                />
                            </button>
                        </Tooltip>


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

                        onClick={() => setDetailview(true)}
                    >
                        <span className="font-semibold text-[#9012FF] text-sm hover:underline">Detail View</span>
                    </button>
                </div>
            </div>
            <div className="flex flex-row justify-between pt-2 pb-2 border-t border-lightGrey">
                <div className='flex flex-col gap-1.5'>
                    <p className="font-semibold text-[#1D2939]">Test 01</p>

                    <div className='flex flex-row items-center gap-1'>
                        <p className="text-xs text-[#667085]">50 Questions</p>
                        {/* horizontal line */}
                        <div className="w-[1px] h-3 bg-[#667085]"></div>
                        <p className="text-xs text-[#667085]">5 times attempted</p>

                        <Tooltip
                            content="This results is from your last attempts, click on Detail view button to see all attempted results."
                            placement="top"
                            offset={15}
                            closeDelay={100}
                            classNames={{
                                content: [
                                    "bg-black text-white py-4 text-[14px] max-w-[240px]",
                                    "rounded-md",
                                    "text-center", // center the text
                                    "after:content-['']",
                                    "after:absolute",
                                    "font-normal",
                                    "text-sm",
                                    // The Below Arrow Mark
                                    "after:top-full",
                                    "after:left-1/2",
                                    "after:-ml-2",
                                    "after:border-8",
                                    "after:border-transparent",
                                    "after:border-t-black",
                                ],
                            }}
                        >
                            <button>
                                <img
                                    src="/icons/questionmark.svg"
                                    width={16}
                                    height={16}
                                    alt="question mark icon"
                                    className="w-4 h-4"
                                />
                            </button>
                        </Tooltip>


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

                        onClick={() => setDetailview(true)}
                    >
                        <span className="font-semibold text-[#9012FF] text-sm hover:underline">Detail View</span>
                    </button>
                </div>
            </div>
            {detailview && <TestDialog open={detailview} onClose={() => setDetailview(false)} />}

        </div>
    );
}

export default Accordian;