import { useState } from "react";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { DatePicker, TimeInput } from "@nextui-org/react";
import { now, today, CalendarDate, getLocalTimeZone, parseDateTime } from "@internationalized/date";

type ScheduleProps = {
    quizScheduleDate: string;
    setQuizScheduleDate: (quizScheduleDate: string) => void;
    marksPerQ: string;
    setMarksPerQ: (marksPerQ: string) => void;
    nMarksPerQ: string;
    setnMarksPerQ: (nMarksPerQ: string) => void;
    // timeDuration: string;
    timeNumber: string;
    setTimeNumber: (timeNumber: string) => void;
    timeText: string;
    setTimeText: (timeText: string) => void;

}

// const convertToTimeFormat = (timeStr: string): string => {
//     const regex = /(\d+)\s*(Minute|Hour)\(s\)/i;
//     const match = timeStr.match(regex);

//     if (!match) return "00:00"; // Return default value if the format doesn't match

//     const value = parseInt(match[1], 10); // Get the numeric value
//     const unit = match[2].toLowerCase(); // Get the unit (either minute or hour)

//     let totalMinutes = 0;

//     if (unit === "minute") {
//         totalMinutes = value;
//     } else if (unit === "hour") {
//         totalMinutes = value * 60; // Convert hours to minutes
//     }

//     const hours = Math.floor(totalMinutes / 60).toString().padStart(2, "0"); // Calculate hours and format
//     const minutes = (totalMinutes % 60).toString().padStart(2, "0"); // Calculate minutes and format

//     return `${hours}:${minutes}`;
// };


const formatScheduleDate = (dateString: string | null): string => {
    if (!dateString) return "-"; // Return "-" if the date is null or undefined

    try {
        const dateObj = new Date(dateString);

        if (isNaN(dateObj.getTime())) {
            // If date is invalid
            return "-";
        }

        // Extract date components
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const day = String(dateObj.getDate()).padStart(2, "0");

        // Extract time components
        let hours = dateObj.getHours();
        const minutes = String(dateObj.getMinutes()).padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";

        // Convert hours to 12-hour format
        hours = hours % 12 || 12; // Convert 0 to 12 for midnight
        const formattedHours = String(hours).padStart(2, "0");

        // Combine formatted components
        return `${month}/${day}/${year},${formattedHours}:${minutes} ${ampm}`;
    } catch (error) {
        console.error("Error formatting date:", error);
        return "-";
    }
};


function Schedule({ marksPerQ, setMarksPerQ, nMarksPerQ, setnMarksPerQ, timeNumber, setTimeNumber, timeText, setTimeText, quizScheduleDate, setQuizScheduleDate }: ScheduleProps) {

    const [showDatepicker, setShowDatepicker] = useState(false);
    let [isOpenT, setIsOpenT] = useState(false);
    return (
        <div className='flex flex-col pt-4 pb-8 gap-4'>
            <div className='flex flex-col w-full h-auto p-6 bg-white border border-lightGrey rounded-xl gap-3'>
                <div className="flex flex-row justify-between w-full items-center">
                    <span className='font-semibold text-lg text-[#1D2939] pl-1'>Schedule Quiz</span>
                </div>
                <div className="flex flex-col gap-2 mb-3 mt-1">
                    <span className="text-[#1D2939] font-semibold text-sm">Schedule Lesson</span>

                    <DatePicker
                        granularity="minute"
                        minValue={today(getLocalTimeZone())}
                        value={quizScheduleDate || undefined ? parseDateTime(quizScheduleDate) || undefined : undefined}
                        hideTimeZone
                        onChange={(date) => {
                            const dateString = date ? date.toString() : "";
                            setQuizScheduleDate(dateString);

                        }}

                    />



                </div>
                {/* {quizScheduleDate ? (
                        <>

                            <div className="flex flex-row justify-between items-center mb-3">
                                <p className="text-[#1D2939] text-sm font-medium">  {formatScheduleDate(sectionScheduleDate) || " "}</p>
                                 <p className="text-[#1D2939] text-sm font-medium">  {formatScheduleDate(startDate) || ""}</p>
                            <button
                                className="flex flex-row gap-1 rounded-md border-[2px] border-solid border-[#9012FF] hover:bg-[#F5F0FF] bg-[#FFFFFF] p-2 "
                                onClick={() => setDatapickerforStart(!datapickerforStart)}>
                                <span className="text-[#9012FF] font-semibold text-sm">{startDate ? 'Change Date' : 'Select Date'}</span>
                            </button>
                            </div>
                            {(showDatepicker &&
                                <DatePicker
                                    granularity="minute"
                                    minValue={today(getLocalTimeZone())}
                                    hideTimeZone
                                    onChange={(date) => {
                                        const dateString = date ? date.toString() : "";
                                        setSectionScheduleDate(dateString);
                                        setShowDatepicker(true); // Return to button view after selecting date
                                    }}

                                />
                            )}
                        </>
                    ) : (
                        <>
                            <div className="flex flex-row justify-end mb-3">
                                <button
                                    className="flex flex-row gap-1 rounded-md border-[2px] border-solid border-[#9012FF]  bg-[#FFFFFF] p-2 hover:bg-[#F5F0FF] "
                                    onClick={() => setShowDatepicker(true)}>
                                    <span className="text-[#9012FF] font-semibold text-sm">Select Date</span>
                                </button>
                            </div>

                            {showDatepicker && (
                                <DatePicker
                                    granularity="minute"
                                    minValue={today(getLocalTimeZone())}
                                    hideTimeZone
                                    onChange={(date) => {
                                        const dateString = date ? date.toString() : "";
                                        setSectionScheduleDate(dateString);

                                    }}
                                />
                            )}
                        </>
                    )} */}



            </div>

            <div className='flex flex-col w-full h-auto p-5 bg-white border border-lightGrey rounded-xl gap-3'>
                <span className='font-semibold text-lg text-[#1D2939]'>About quiz</span>
                <div className='flex flex-row w-full gap-4'>
                    <div className='flex flex-col w-full gap-1'>
                        <p className='text-sm font-medium text-[#1D2939]'>Time Duration</p>
                        {/* <input
                        id="appointment-time"
                        type="time"
                        name="appointment-time"
                        /> */}
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

        </div>
    );
};

export default Schedule;