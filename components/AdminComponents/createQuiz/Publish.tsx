import { useState, ChangeEvent } from "react";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";

const Publish = () => {
    const [selectedYear, setSelectedYear] = useState("Select Year");
    const [selectedExam, setSelectedExam] = useState("Select Exam");
    const [selectedProduct, setSelectedProduct] = useState("Select Product");

    const selectedColor = "text-[#182230]";
    const [checkedState, setCheckedState] = useState(false);
    const [inputValue, setInputValue] = useState(0);

    const toggleCheckBox = () => {
        setCheckedState(!checkedState);
    };

    let onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(event.target.value);
        setInputValue(newValue);
    }

    return (
        <div className='flex flex-col pt-4 pb-8 gap-4'>
            <div className='flex flex-col w-full h-auto p-6 bg-white border border-lightGrey rounded-xl gap-4'>
                <div className='flex flex-row justify-between'>
                    <h3>Schedule Test Series</h3>
                    <div className='flex flex-row items-center gap-2'>
                        <button
                            className={`flex items-center justify-center w-4 h-4 border border-[#D0D5DE] rounded-sm ${checkedState ? 'bg-purple border-purple' : 'bg-white'}`}
                            onClick={toggleCheckBox}
                        >
                            {checkedState && (
                                <Image src="/icons/check.svg" alt="choose" width={12} height={12} />
                            )}
                        </button>
                        <p className='text-sm text-[#182230] font-medium'>Make the Test Series live now</p>
                    </div>
                </div>
                {!checkedState && (
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
                    </div>)}
                {checkedState &&
                    (
                        <div className="flex flex-row items-center">
                            <p className="flex flex-row items-center text-base text-[#1D2939] font-medium gap-2">
                                The quiz will go live immediately and remain active for
                                <span className="flex items-center justify-center w-10 h-10 py-2 text-center text-sm text-[#667085] font-normal border border-lightGrey rounded-md">
                                    {inputValue}
                                </span>
                                minutes.
                            </p>
                        </div>
                    )}
            </div>

            <div className='flex flex-col w-full h-auto p-5 bg-white border border-lightGrey rounded-xl gap-3'>
                <span className='font-semibold text-lg text-[#1D2939]'>About quiz</span>
                <div className='flex flex-row w-full gap-4'>
                    <div className='flex flex-col w-full gap-1'>
                        <p className='text-sm font-medium text-[#1D2939]'>Time Duration</p>
                        <div className='flex flex-row items-center w-full py-2 px-3 border border-lightGrey rounded-md gap-1 focus-within:border-[#D7BBFC] focus-within:ring-4 focus-within:ring-[#E8DEFB] focus-within:outline-none transition-colors'>
                            <input
                                type="numbers"
                                placeholder="0"
                                onChange={onChange}
                                className="w-full text-sm text-[#1D2939] font-normal placeholder:text-[#667085] outline-none"
                            />
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
                            <PopoverContent>
                                <div className='flex flex-col justify-start w-[15.625rem] h-auto py-1 px-0 bg-white border border-lightGrey rounded-md shadow-[0_4px_6px_-2px_rgba(16,24,40,0.08)]'>
                                    {["2025", "2026", "2027", "2028"].map(year => (
                                        <button
                                            key={year}
                                            onClick={() => setSelectedYear(year)}
                                            className='w-full text-sm text-left text-[#0C111D] px-4 py-[0.625rem] hover:bg-[#F2F4F7]'
                                        >
                                            {year}
                                        </button>
                                    ))}
                                </div>
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
                            <PopoverContent>
                                <div className='flex flex-col justify-start w-[15.625rem] h-auto py-1 px-0 bg-white border border-lightGrey rounded-md shadow-[0_4px_6px_-2px_rgba(16,24,40,0.08)]'>
                                    {["JEE", "BITSAT", "VITEEE", "WBJEE"].map(exam => (
                                        <button
                                            key={exam}
                                            onClick={() => setSelectedExam(exam)}
                                            className='w-full text-sm text-left text-[#0C111D] px-4 py-[0.625rem] hover:bg-[#F2F4F7]'
                                        >
                                            {exam}
                                        </button>
                                    ))}
                                </div>
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
                            <PopoverContent>
                                <div className='flex flex-col justify-start w-[17.063rem] h-auto py-1 px-0 bg-white border border-lightGrey rounded-md shadow-[0_4px_6px_-2px_rgba(16,24,40,0.08)]'>
                                    {["BITSAT Mastery Crash Course 2025", "BITSAT Sprint Crash Course 2025", "Phodu BITSAT Crash Course 2025", "BITSAT Pro Crash Course 2025"].map(product => (
                                        <button
                                            key={product}
                                            onClick={() => setSelectedProduct(product)}
                                            className='w-full text-sm text-left text-[#0C111D] px-4 py-[0.625rem] hover:bg-[#F2F4F7]'
                                        >
                                            {product}
                                        </button>
                                    ))}
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Publish;