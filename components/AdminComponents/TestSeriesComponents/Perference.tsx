import React, { useState } from 'react';
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";

const years: string[] = ["2024", "2025", "2026", "2027", "2028"];
const exams: string[] = ["JEE", "BITSAT", "VITEEE", "WBJEE"];

function Preference() {
    const [selectedYears, setSelectedYears] = useState<string[]>([]);
    const [selectedExams, setSelectedExams] = useState<string[]>([]);

    const toggleYear = (year: string) => {
        setSelectedYears((prev) =>
            prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
        );
    };

    const toggleExam = (exam: string) => {
        setSelectedExams((prev) =>
            prev.includes(exam) ? prev.filter((e) => e !== exam) : [...prev, exam]
        );
    };

    const [checkedState, setCheckedState] = useState(false);

    const toggleCheckBox = () => {
        setCheckedState(!checkedState);
    };

    return (
        <div className='flex flex-col ml-1 pt-4 gap-4'>
            {/* Schedule Test Series Section */}
            <div className='flex flex-col w-full p-6 bg-white border border-lightGrey rounded-xl'>
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
                <div className='flex flex-row w-full mt-4 gap-4'>
                    <div className='w-full'>
                        <p className='text-sm text-[#1D2939] font-medium'>Start Date & time</p>
                        <div className={`flex flex-row items-center px-4 py-2 gap-2 border rounded-md ${checkedState ? 'bg-[#F2F4F7] border-[#F2F4F7] cursor-not-allowed' : 'bg-white border-lightGrey'}`}>
                            <Image src='/icons/calendar-03.svg' alt='date' width={24} height={24} />
                            <p className='text-sm text-[#667085] font-normal'>Select Date & Time</p>
                        </div>
                    </div>
                    <div className='w-full'>
                        <p className='text-sm text-[#1D2939] font-medium'>End Date & time</p>
                        <div className='flex flex-row items-center px-4 py-2 gap-2 bg-white border border-lightGrey rounded-md'>
                            <Image src='/icons/calendar-03.svg' alt='date' width={24} height={24} />
                            <p className='text-sm text-[#667085] font-normal'>Select Date & Time</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Test Series available for Section */}
            <div className='flex flex-col w-full p-6 bg-white border border-lightGrey rounded-xl'>
                <h3>Test Series available for</h3>
                <div className='flex flex-row w-full mt-4 gap-4'>
                    {/* Year Selection */}
                    <div className='flex flex-col w-full gap-1'>
                        <p className='text-sm text-[#1D2939] font-medium'>Year</p>

                        <Popover placement='bottom-start'>
                            <PopoverTrigger>
                                <button className='flex flex-row items-center justify-between w-full px-2 py-2 mt-2 bg-white border border-lightGrey rounded-md'>
                                    {selectedYears.length === 0 ? (
                                        <div className='text-sm text-[#667085] font-normal'>Select Year</div>
                                    ) : (
                                        <div className='flex flex-wrap gap-2'>
                                            {selectedYears.map((year) => (
                                                <div key={year} className='px-3 py-2 bg-[#EDE4FF] text-xs font-medium rounded-full flex items-center gap-1'>
                                                    {year}
                                                    <button onClick={() => toggleYear(year)} className='text-[#6941C6]'>
                                                        <Image src='/icons/cancel.svg' alt='close' width={12} height={12} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <Image src='/icons/arrow-down-01-round.svg' alt='open' width={20} height={20} />
                                </button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div className='flex flex-col w-96 py-1 h-auto bg-white border border-lightGrey rounded-md'>
                                    {years.map((year) => (
                                        <button key={year} onClick={() => toggleYear(year)} className='px-4 py-3 text-sm text-left transition-colors hover:bg-[#F2F4F7]'>
                                            {year}
                                        </button>
                                    ))}
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Exam Selection */}
                    <div className='flex flex-col w-full gap-1'>
                        <p className='text-sm text-[#1D2939] font-medium'>Exam</p>
                        <Popover placement='bottom-start'>
                            <PopoverTrigger>
                                <button className='flex flex-row items-center justify-between w-full px-2 py-2 mt-2 bg-white border border-lightGrey rounded-md'>
                                    {selectedExams.length === 0 ? (
                                        <div className='text-sm text-[#667085] font-normal'>Select Exam</div>
                                    ) : (
                                        <div className='flex flex-wrap gap-2'>
                                            {selectedExams.map((exam) => (
                                                <div key={exam} className='px-2 py-1 bg-[#E9D7FE] text-[#6941C6] rounded-full flex items-center gap-1'>
                                                    {exam}
                                                    <button onClick={() => toggleExam(exam)} className='text-[#6941C6]'>
                                                        <Image src='/icons/cancel.svg' alt='close' width={12} height={12} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <Image src='/icons/arrow-down-01-round.svg' alt='open' width={20} height={20} />
                                </button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div className='flex flex-col w-96 py-1 h-auto bg-white border border-lightGrey rounded-md'>
                                    {exams.map((exam) => (
                                        <button key={exam} onClick={() => toggleExam(exam)} className='px-4 py-3 text-sm text-left transition-colors hover:bg-[#F2F4F7]'>
                                            {exam}
                                        </button>
                                    ))}
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </div>

            {/* Select Product Section */}
            <div className='flex flex-col w-full p-6 bg-white border border-lightGrey rounded-xl'>
                <h3>Select product (Optional)</h3>
                <div className='flex flex-col w-full mt-4 gap-1'>
                    <p className='text-sm text-[#1D2939] font-medium'>Product</p>
                    <button className='flex flex-row items-center justify-between w-[53%] px-2 py-2 bg-white border border-lightGrey rounded-md'>
                        <p className='text-sm text-[#667085] font-normal'>Select Product</p>
                        <Image src='/icons/arrow-down-01-round.svg' alt='open' width={20} height={20} />
                    </button>
                    <p className='text-[0.813rem] text-[#475467] font-normal w-[40%] mt-1'>
                        Test series will be only available who purchase the selected product.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Preference;