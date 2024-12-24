import React, { useState } from 'react';
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Checkbox, DatePicker } from '@nextui-org/react';
import { now, today, CalendarDate, getLocalTimeZone, parseDateTime } from "@internationalized/date";

const years: string[] = ["2024", "2025", "2026", "2027", "2028"];
const exams: string[] = ["JEE", "BITSAT", "VITEEE", "WBJEE"];

type PreferenceProps = {
    startDate: string;
    setStartDate: (startDate: string) => void;
    endDate: string;
    setEndDate: (endDate: string) => void;
    liveQuizNow: boolean;
    setLiveQuizNow: React.Dispatch<React.SetStateAction<boolean>>;  // Explicit type for setter

}
const formatScheduleDate = (dateString: string | null): string => {
    if (!dateString) return "-"; // Return "-" if the date is null or undefined

    try {
        const dateObj = new Date(dateString);

        if (isNaN(dateObj.getTime())) {
            // If date is invalid
            return "-";
        }

        // Format the date manually to match "MM/DD/YYYY,HH:mm"
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const day = String(dateObj.getDate()).padStart(2, "0");
        const hours = String(dateObj.getHours()).padStart(2, "0");
        const minutes = String(dateObj.getMinutes()).padStart(2, "0");

        return `${month}/${day}/${year},${hours}:${minutes}`;
    } catch (error) {
        console.error("Error formatting date:", error);
        return "-";
    }
};
function Preference({ liveQuizNow, setLiveQuizNow, startDate, setStartDate, endDate, setEndDate }: PreferenceProps) {
    const [selectedYears, setSelectedYears] = useState<string[]>([]);
    const [selectedExams, setSelectedExams] = useState<string[]>([]);
    const [datapickerforEnd, setDatapickerforEnd] = useState(false);
    const [datapickerforStart, setDatapickerforStart] = useState(false);

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


    return (
        <div className='flex flex-col ml-1 pt-4 gap-4'>
            {/* Schedule Test Series Section */}
            <div className='flex flex-col w-full h-auto p-6 bg-white border border-lightGrey rounded-xl gap-4'>
                <div className="flex flex-row justify-between w-full items-center">
                    <span className='font-semibold text-lg text-[#1D2939]'>Schedule Test Series</span>
                    <div className="flex flex-row items-center w-[270px] py-[0.625rem] px-4 gap-1 cursor-pointer transition-colors">
                        <Checkbox
                            size="md"
                            color="primary"
                            checked={liveQuizNow}          // Bind the state to the checkbox
                            onChange={() => setLiveQuizNow((prev) => !prev)}  // Toggle state on change
                        />
                        <p className="text-sm text-[#0C111D] font-normal">Make the Test Series live now</p>
                    </div>
                </div>

                <div className='flex flex-row w-full gap-4'>
                    <div className='flex flex-col w-1/2 gap-1'>
                        <span className='font-medium text-[#1D2939] text-sm'>Start Date & Time</span>
                        
                        

                                <div className="flex flex-row justify-between items-center mb-3">
                                    <p className="text-[#1D2939] text-sm font-medium">  {formatScheduleDate(startDate) || ""}</p>
                                    <button
                                        className="flex flex-row gap-1 rounded-md border-[2px] border-solid border-[#9012FF] hover:bg-[#F5F0FF] bg-[#FFFFFF] p-2 "
                                        onClick={() => setDatapickerforStart(true)}>
                                        <span className="text-[#9012FF] font-semibold text-sm">{startDate ? 'Change Date' : 'Select Date'}</span>
                                    </button>
                                </div>
                                {(datapickerforStart &&
                                    <DatePicker
                                        granularity="minute"
                                        minValue={today(getLocalTimeZone())}
                                        hideTimeZone
                                        isDisabled={liveQuizNow}
                                        onChange={(date) => {
                                            const dateString = date ? date.toString() : "";
                                            setStartDate(dateString);
                                            setDatapickerforStart(true); // Return to button view after selecting date
                                        }}

                                    />
                                )}
                        
                    </div>
                    <div className='flex flex-col w-1/2 gap-1'>
                        <span className='font-medium text-[#1D2939] text-sm'>End Date & Time</span>
                        <div className="flex flex-row justify-between items-center mb-3">
                                    <p className="text-[#1D2939] text-sm font-medium">  {formatScheduleDate(endDate) || ""}</p>
                                    <button
                                        className="flex flex-row gap-1 rounded-md border-[2px] border-solid border-[#9012FF] hover:bg-[#F5F0FF] bg-[#FFFFFF] p-2 "
                                        onClick={() => setDatapickerforEnd(true)}>
                                        <span className="text-[#9012FF] font-semibold text-sm">{endDate ? 'Change Date' : 'Select Date'}</span>
                                    </button>
                                </div>
                                {(datapickerforEnd &&
                                    <DatePicker
                                        granularity="minute"
                                        minValue={today(getLocalTimeZone())}
                                        hideTimeZone
                                        onChange={(date) => {
                                            const dateString = date ? date.toString() : "";
                                            setEndDate(dateString);
                                            setDatapickerforEnd(true); // Return to button view after selecting date
                                        }}

                                    />
                                )}
                    </div>
                </div>

            </div>

            {/* Test Series available for Section */}
            <div className='flex flex-col w-full p-6 bg-white border border-lightGrey rounded-xl'>
                <h3>Test Series available for</h3>
                {/* <div className='flex flex-row w-full mt-4 gap-4'>
                    <div className='flex flex-col w-full gap-1'>
                        <p className='text-sm text-[#1D2939] font-medium'>Year</p>
                       
                            <Popover placement='bottom-end'>
                                <PopoverTrigger>
                                <button className='flex flex-row items-center justify-between w-full px-2 py-2 mt-2 bg-white border border-lightGrey rounded-md'>
                                {selectedYears.length === 0 ? (
                                <div className='text-sm text-[#667085] font-normal'>Select Year</div>
                            ) : (
                                <div className='flex flex-wrap gap-2'>
                                    {selectedYears.map((year) => (
                                        <div key={year} className='px-3 py-2 bg-[#EDE4FF] text-xs font-medium rounded-full flex items-center gap-1'>
                                            {year}
                                            <button onClick={() => toggleYear(year)} className='text-[#6941C6] z-10'>
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

                    <div className='flex flex-col w-full gap-1'>
                        <p className='text-sm text-[#1D2939] font-medium'>Exam</p>
                        <Popover placement='bottom-end'>
                                <PopoverTrigger>
                                <button className='flex flex-row items-center justify-between w-full px-2 py-2 mt-2 bg-white border border-lightGrey rounded-md'>
                                {selectedExams.length === 0 ? (
                                <div className='text-sm text-[#667085] font-normal'>Select Exam</div>
                                        ) : (
                                            <div className='flex flex-wrap gap-2'>
                                                {selectedExams.map((exam) => (
                                                    <div key={exam} className='px-3 py-2 bg-[#EDE4FF] text-xs font-medium rounded-full flex items-center gap-1'>
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
                                <PopoverContent className='p-0'>
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
                </div> */}
            </div>
        </div>
    );
}

export default Preference;