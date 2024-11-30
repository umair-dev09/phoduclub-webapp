"use client";
import { useState } from "react";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { DatePicker } from "@nextui-org/react";
import { now, today, CalendarDate, getLocalTimeZone, parseDateTime } from "@internationalized/date";
import { Checkbox } from "@nextui-org/react";

type PublishProps = {
    startDate: string;
    setStartDate: (startDate: string) => void;
    endDate: string;
    setEndDate: (endDate: string) => void;
    marksPerQ: string;
    setMarksPerQ: (marksPerQ: string) => void;
    nMarksPerQ: string;
    setnMarksPerQ: (nMarksPerQ: string) => void;
    // timeDuration: string;
    timeNumber: string;
    setTimeNumber: (timeNumber: string) => void;
    timeText: string;
    setTimeText: (timeText: string) => void;
    forYear: string;
    setForYear: (forYear: string) => void;
    forExam: string;
    setForExam: (forExam: string) => void;
    forProduct: string;
    setForProduct: (forProduct: string) => void;
    liveQuizNow: boolean;
    setLiveQuizNow: React.Dispatch<React.SetStateAction<boolean>>;  // Explicit type for setter

}
// startDate, endDate, marksPerQ, nMarksPerQ, timeDuration,forExam, forProduct
const Publish = ({ liveQuizNow, setLiveQuizNow, forYear, setForYear, setForExam, forExam, forProduct, setForProduct, marksPerQ, setMarksPerQ, nMarksPerQ, setnMarksPerQ, timeNumber, setTimeNumber, timeText, setTimeText, startDate, setStartDate, endDate, setEndDate }: PublishProps) => {

    let [isOpenY, setIsOpenY] = useState(false);
    let [isOpenE, setIsOpenE] = useState(false);
    let [isOpenP, setIsOpenP] = useState(false);
    let [isOpenT, setIsOpenT] = useState(false);



    // Check if dateString is not empty and in the correct format (YYYY-MM-DD)
    const dateValue = startDate && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/.test(startDate)
        ? parseDateTime(startDate) // Correct format with date and time, use parsed date
        : today(getLocalTimeZone()); // Fallback to today's date if format is incorrect or empty



    const selectedColor = "text-[#182230]";


    return (
        <div className='flex flex-col pt-4 pb-8 gap-4'>
            <div className='flex flex-col w-full h-auto p-6 bg-white border border-lightGrey rounded-xl gap-4'>
                <div className="flex flex-row justify-between w-full items-center">
                    <span className='font-semibold text-lg text-[#1D2939]'>Set Quiz Time</span>
                    <div
                        className="flex flex-row items-center w-[250px] py-[0.625rem] px-4 gap-2 cursor-pointer transition-colors"
                        onClick={() => setLiveQuizNow(liveQuizNow => !liveQuizNow)}
                    >
                        <div
                            className={`flex items-center justify-center w-4 h-4 border border-[#D0D5DE] rounded-sm ${liveQuizNow ? 'bg-purple border-purple' : 'bg-white'}`}
                        >
                            {liveQuizNow && (
                                <Image src="/icons/check.svg" alt="choose" width={12} height={12} />
                            )}
                        </div>
                        <Checkbox
                            size="sm"
                            color="primary"
                        />
                        <p className="text-sm text-[#0C111D] font-normal">Make the quiz live now</p>
                    </div>
                </div>

                <div className='flex flex-row w-full gap-4'>
                    <div className='flex flex-col w-1/2 gap-1'>
                        <span className='font-medium text-[#1D2939] text-sm'>Start Date & Time</span>
                        <DatePicker
                            granularity="minute"
                            isDisabled={liveQuizNow}  // Disable the DatePicker if liveQuizNow is true
                            minValue={today(getLocalTimeZone())}
                            showMonthAndYearPickers
                            onChange={(date) => {
                                // Convert the date object to a string in your desired format
                                const dateString = date ? date.toString() : ""; // Customize format if needed
                                setStartDate(dateString);

                            }}
                        />

                    </div>
                    <div className='flex flex-col w-1/2 gap-1'>
                        <span className='font-medium text-[#1D2939] text-sm'>End Date & Time</span>
                        <DatePicker
                            granularity="minute"
                            minValue={dateValue}
                            showMonthAndYearPickers
                            onChange={(date) => {
                                // Convert the date object to a string in your desired format
                                const dateString = date ? date.toString() : ""; // Customize format if needed
                                setEndDate(dateString);
                            }}
                        />
                    </div>
                </div>

            </div>

            <div className='flex flex-col w-full h-auto p-5 bg-white border border-lightGrey rounded-xl gap-3'>
                <span className='font-semibold text-lg text-[#1D2939]'>About quiz</span>
                <div className='flex flex-row w-full gap-4'>
                    <div className='flex flex-col w-full gap-1'>
                        <p className='text-sm font-medium text-[#1D2939]'>Time Duration</p>
                        <div className='flex flex-row items-center w-full py-2 px-3 border border-lightGrey rounded-md gap-1 focus-within:border-[#D7BBFC] focus-within:ring-4 focus-within:ring-[#E8DEFB] focus-within:outline-none transition-colors'>
                            <input type="text" placeholder="0"
                                maxLength={3} // Limits input to 2 characters
                                pattern="\d*" // Restricts input to numbers only
                                value={timeNumber}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/[^0-9]/g, ""); // Allows only numbers
                                    setTimeNumber(value); // Stores the input value as a string
                                }}
                                className="w-full text-sm text-[#1D2939] font-normal placeholder:text-[#667085] outline-none" />
                            {/* <p className="text-sm text-[#1D2939] font-medium">Min</p> */}
                            <Popover placement='bottom' isOpen={isOpenT} onOpenChange={(open) => setIsOpenT(open)}>
                                <PopoverTrigger>
                                    <button className='flex flex-row w-[150px] gap-1 '>
                                        <div className={`w-full text-sm text-start`}>{timeText}</div>
                                        <Image src='/icons/arrow-down-01-round.svg' alt='open popup' width={20} height={20} />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className='flex flex-col justify-start w-[120px] h-auto py-1 px-0 bg-white '>
                                    {["Minute(s)", "Hour(s)"].map(time => (
                                        <button
                                            key={time}
                                            onClick={() => { setTimeText(time); setIsOpenT(false); }}
                                            className='w-full text-sm text-left text-[#0C111D] px-4 py-[0.625rem] hover:bg-[#F2F4F7]'
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </PopoverContent>
                            </Popover>
                        </div>
                        <p className="mt-1 text-[0.813rem] text-[#475467] font-normal">
                            Students must finish the quiz in time.
                        </p>
                    </div>
                    {/* EXAM */}
                    <div className='flex flex-col w-full gap-1'>
                        <p className='text-sm font-medium text-[#1D2939]'>Marks per question</p>
                        <input type="text" placeholder="0"
                            maxLength={2} // Limits input to 2 characters
                            pattern="\d*" // Restricts input to numbers only
                            value={marksPerQ}
                            onChange={(e) => {
                                const value = e.target.value.replace(/[^0-9]/g, ""); // Allows only numbers
                                setMarksPerQ(value); // Stores the input value as a string
                            }}
                            className="w-full py-2 px-3 text-sm text-[#1D2939] font-normal placeholder:text-[#667085] border border-lightGrey rounded-md focus:border-[#D7BBFC] focus:ring-4 focus:ring-[#E8DEFB] outline-none transition-colors" />
                        <p className="mt-1 text-[0.813rem] text-[#475467] font-normal">
                            Applies only to the correct answers.
                        </p>
                    </div>
                    {/* PRODUCT */}
                    <div className='flex flex-col w-full gap-1'>
                        <p className='text-sm font-medium text-[#1D2939]'>Negative marks per question</p>
                        <input type="text" placeholder="0"
                            maxLength={1} // Limits input to 2 characters
                            pattern="\d*" // Restricts input to numbers only
                            value={nMarksPerQ}
                            onChange={(e) => {
                                const value = e.target.value.replace(/[^0-9]/g, ""); // Allows only numbers
                                setnMarksPerQ(value); // Stores the input value as a string
                            }}
                            className="w-full py-2 px-3 text-sm text-[#1D2939] font-normal placeholder:text-[#667085] border border-lightGrey rounded-md focus:border-[#D7BBFC] focus:ring-4 focus:ring-[#E8DEFB] outline-none transition-colors" />
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
                        <Popover placement='bottom' isOpen={isOpenY} onOpenChange={(open) => setIsOpenY(open)}>
                            <PopoverTrigger>
                                <button className='flex flex-row w-full py-2 px-3 border border-lightGrey rounded-md gap-1 focus-within:border-[#D7BBFC] focus-within:ring-2 focus-within:ring-[#E8DEFB] focus-within:outline-none transition-colors'>
                                    <div className={`w-full text-sm text-start ${forYear !== "Select Year" ? selectedColor : "text-[#667085]"}`}>{forYear}</div>
                                    <Image src='/icons/arrow-down-01-round.svg' alt='open popup' width={20} height={20} />
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className='flex flex-col justify-start w-[15.625rem] h-auto py-1 px-0 bg-white border border-lightGrey rounded-md'>
                                {["2025", "2026", "2027", "2028"].map(year => (
                                    <button
                                        key={year}
                                        onClick={() => { setForYear(year); setIsOpenY(false); }}
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
                        <Popover placement='bottom' isOpen={isOpenE} onOpenChange={(open) => setIsOpenE(open)}>
                            <PopoverTrigger>
                                <button className='flex flex-row w-full py-2 px-3 border border-lightGrey rounded-md gap-1 focus-within:border-[#D7BBFC] focus-within:ring-2 focus-within:ring-[#E8DEFB] focus-within:outline-none transition-colors'>
                                    <div className={`w-full text-sm text-start ${forExam !== "Select Exam" ? selectedColor : "text-[#667085]"}`}>{forExam}</div>
                                    <Image src='/icons/arrow-down-01-round.svg' alt='open popup' width={20} height={20} />
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className='flex flex-col justify-start w-[15.625rem] h-auto py-1 px-0 bg-white border border-lightGrey rounded-md'>
                                {["JEE", "BITSAT", "VITEEE", "WBJEE"].map(exam => (
                                    <button
                                        key={exam}
                                        onClick={() => { setForExam(exam); setIsOpenE(false); }}
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
                        <Popover placement='bottom' isOpen={isOpenP} onOpenChange={(open) => setIsOpenP(open)}>
                            <PopoverTrigger>
                                <button className='flex flex-row w-full py-2 px-3 border border-lightGrey rounded-md gap-1 focus-within:border-[#D7BBFC] focus-within:ring-2 focus-within:ring-[#E8DEFB] focus-within:outline-none transition-colors'
                                >
                                    <div className={`w-full text-sm text-start ${forProduct !== "Select Product" ? selectedColor : "text-[#667085]"}`}>{forProduct}</div>
                                    <Image src='/icons/arrow-down-01-round.svg' alt='open popup' width={20} height={20} />
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className='flex flex-col justify-start w-[17.063rem] h-auto py-1 px-0 bg-white border border-lightGrey rounded-md'>
                                {["BITSAT Mastery Crash Course 2025", "BITSAT Sprint Crash Course 2025", "Phodu BITSAT Crash Course 2025", "BITSAT Pro Crash Course 2025"].map(product => (
                                    <button
                                        key={product}
                                        onClick={() => { setForProduct(product); setIsOpenP(false); }}

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