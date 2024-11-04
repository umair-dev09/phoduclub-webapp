import { useState } from "react";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";

const Publish = () => {
    const [selectedYear, setSelectedYear] = useState("Select Year");
    const [selectedExam, setSelectedExam] = useState("Select Exam");
    const [selectedProduct, setSelectedProduct] = useState("Select Product");

    const selectedColor = "text-[#182230]";

    return (
        <div className='flex flex-col pt-4 pb-8 gap-4'>
            <div className='flex flex-col w-full h-auto p-6 bg-white border border-lightGrey rounded-xl gap-4'>
                <span className='font-semibold text-lg text-[#1D2939]'>Set Quiz Time</span>
                <div className='flex flex-row w-full gap-4'>
                    <div className='flex flex-col w-1/2 gap-1'>
                        <span className='font-medium text-[#1D2939] text-sm'>Start Date</span>
                        <div className='w-full py-2 px-3 border border-lightGrey rounded-md'>
                            <span className='font-normal text-[#667085] text-sm'>Select Date & Time</span>
                        </div>
                    </div>
                    <div className='flex flex-col w-1/2 gap-1'>
                        <span className='font-medium text-[#1D2939] text-sm'>End Date</span>
                        <div className='w-full py-2 px-3 border border-lightGrey rounded-md'>
                            <span className='font-normal text-[#667085] text-sm'>Select Date & Time</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col w-full h-auto p-5 bg-white border border-lightGrey rounded-xl gap-3'>
                <span className='font-semibold text-lg text-[#1D2939]'>About quiz</span>
                <div className='flex flex-row w-full gap-4'>
                    <div className='flex flex-col w-full gap-1'>
                        <p className='text-sm font-medium text-[#1D2939]'>Time Duration</p>
                        <div className='flex flex-row items-center w-full py-2 px-3 border border-lightGrey rounded-md gap-1 focus-within:border-[#D7BBFC] focus-within:ring-4 focus-within:ring-[#E8DEFB] focus-within:outline-none transition-colors'>
                            <input type="text" placeholder="0" className="w-full text-sm text-[#1D2939] font-normal placeholder:text-[#667085] outline-none" />
                            <p className="text-sm text-[#1D2939] font-medium">Min</p>
                        </div>
                        <p className="mt-1 text-[0.813rem] text-[#475467] font-normal">
                            Students must finish the quiz in time.
                        </p>
                    </div>
                    {/* EXAM */}
                    <div className='flex flex-col w-full gap-1'>
                        <p className='text-sm font-medium text-[#1D2939]'>Marks per question</p>
                        <input type="text" placeholder="0" className="w-full py-2 px-3 text-sm text-[#1D2939] font-normal placeholder:text-[#667085] border border-lightGrey rounded-md focus:border-[#D7BBFC] focus:ring-4 focus:ring-[#E8DEFB] outline-none transition-colors" />
                        <p className="mt-1 text-[0.813rem] text-[#475467] font-normal">
                            Applies only to the correct answers.
                        </p>
                    </div>
                    {/* PRODUCT */}
                    <div className='flex flex-col w-full gap-1'>
                        <p className='text-sm font-medium text-[#1D2939]'>Negative marks per question</p>
                        <input type="text" placeholder="0" className="w-full py-2 px-3 text-sm text-[#1D2939] font-normal placeholder:text-[#667085] border border-lightGrey rounded-md focus:border-[#D7BBFC] focus:ring-4 focus:ring-[#E8DEFB] outline-none transition-colors" />
                        <p className="mt-1 text-[0.813rem] text-[#475467] font-normal">
                            Applies only to the incorrect answers.
                        </p>
                    </div>
                </div>
            </div>

            <div className='flex flex-col w-full h-auto p-5 bg-white border border-lightGrey rounded-xl gap-3'>
                <span className='font-semibold text-lg text-[#1D2939]'>Quiz available for</span>
                <div className='flex flex-row w-full gap-4'>
                    {/* YEAR */}
                    <div className='flex flex-col w-full gap-1'>
                        <p className='text-sm font-medium text-[#1D2939]'>Year</p>
                        <Popover placement='bottom'>
                            <PopoverTrigger>
                                <div className='flex flex-row w-full py-2 px-3 border border-lightGrey rounded-md gap-1 focus-within:border-[#D7BBFC] focus-within:ring-2 focus-within:ring-[#E8DEFB] focus-within:outline-none transition-colors'>
                                    <div className={`w-full text-sm ${selectedYear !== "Select Year" ? selectedColor : "text-[#667085]"}`}>{selectedYear}</div>
                                    <Image src='/icons/arrow-down-01-round.svg' alt='open popup' width={20} height={20} />
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className='flex flex-col justify-start w-[15.625rem] h-auto py-1 px-0 bg-white border border-lightGrey rounded-md'>
                                {["2025", "2026", "2027", "2028"].map(year => (
                                    <button
                                        key={year}
                                        onClick={() => setSelectedYear(year)}
                                        className='w-full text-sm text-left text-[#0C111D] px-4 py-[0.625rem] hover:bg-[#F2F4F7]'
                                    >
                                        {year}
                                    </button>
                                ))}
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* EXAM */}
                    <div className='flex flex-col w-full gap-1'>
                        <p className='text-sm font-medium text-[#1D2939]'>Exam</p>
                        <Popover placement='bottom'>
                            <PopoverTrigger>
                                <div className='flex flex-row w-full py-2 px-3 border border-lightGrey rounded-md gap-1 focus-within:border-[#D7BBFC] focus-within:ring-2 focus-within:ring-[#E8DEFB] focus-within:outline-none transition-colors'>
                                    <div className={`w-full text-sm ${selectedExam !== "Select Exam" ? selectedColor : "text-[#667085]"}`}>{selectedExam}</div>
                                    <Image src='/icons/arrow-down-01-round.svg' alt='open popup' width={20} height={20} />
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className='flex flex-col justify-start w-[15.625rem] h-auto py-1 px-0 bg-white border border-lightGrey rounded-md'>
                                {["JEE", "BITSAT", "VITEEE", "WBJEE"].map(exam => (
                                    <button
                                        key={exam}
                                        onClick={() => setSelectedExam(exam)}
                                        className='w-full text-sm text-left text-[#0C111D] px-4 py-[0.625rem] hover:bg-[#F2F4F7]'
                                    >
                                        {exam}
                                    </button>
                                ))}
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* PRODUCT */}
                    <div className='flex flex-col w-full gap-1'>
                        <p className='text-sm font-medium text-[#1D2939]'>Product</p>
                        <Popover placement='bottom'>
                            <PopoverTrigger>
                                <div className='flex flex-row w-full py-2 px-3 border border-lightGrey rounded-md gap-1 focus-within:border-[#D7BBFC] focus-within:ring-2 focus-within:ring-[#E8DEFB] focus-within:outline-none transition-colors'>
                                    <div className={`w-full text-sm ${selectedProduct !== "Select Product" ? selectedColor : "text-[#667085]"}`}>{selectedProduct}</div>
                                    <Image src='/icons/arrow-down-01-round.svg' alt='open popup' width={20} height={20} />
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className='flex flex-col justify-start w-[17.063rem] h-auto py-1 px-0 bg-white border border-lightGrey rounded-md'>
                                {["BITSAT Mastery Crash Course 2025", "BITSAT Sprint Crash Course 2025", "Phodu BITSAT Crash Course 2025", "BITSAT Pro Crash Course 2025"].map(product => (
                                    <button
                                        key={product}
                                        onClick={() => setSelectedProduct(product)}
                                        className='w-full text-sm text-left text-[#0C111D] px-4 py-[0.625rem] hover:bg-[#F2F4F7]'
                                    >
                                        {product}
                                    </button>
                                ))}
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Publish;