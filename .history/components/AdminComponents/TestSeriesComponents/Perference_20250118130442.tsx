import React, { Dispatch, SetStateAction, useState } from 'react';
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Checkbox, DatePicker } from '@nextui-org/react';
import { now, today, CalendarDate, getLocalTimeZone, parseDateTime } from "@internationalized/date";
import Select, { SingleValue } from 'react-select';

// const years: string[] = ["2024", "2025", "2026", "2027", "2028"];
const exams: string[] = ["JEE", "BITSAT", "VITEEE", "WBJEE"];

type PreferenceProps = {
    startDate: string;
    setStartDate: (startDate: string) => void;
    endDate: string;
    setEndDate: (endDate: string) => void;
    liveQuizNow: boolean;
    setLiveQuizNow: React.Dispatch<React.SetStateAction<boolean>>;  // Explicit type for setter
    selectedYears: Option[];
    setSelectedYears: Dispatch<SetStateAction<Option[]>>;
    selectedExams: Option[];
    setSelectedExams: Dispatch<SetStateAction<Option[]>>;
}

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


type Option = {
    value: string;
    label: string;
};

function Preference({ liveQuizNow, setLiveQuizNow, startDate, setStartDate, endDate, setEndDate, selectedExams, setSelectedExams, selectedYears, setSelectedYears }: PreferenceProps) {

    const years: Option[] = [
        { value: "2024", label: "2024" },
        { value: "2025", label: "2025" },
        { value: "2026", label: "2026" },
    ];

    const exams: Option[] = [
        { value: "BITSAT", label: "BITSAT" },
        { value: "JEE", label: "JEE" },
        { value: "VITEEE", label: "VITEEE" },
        { value: "WBJEE", label: "WBJEE" },
    ];


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
                        <DatePicker
                            granularity="minute"
                            minValue={today(getLocalTimeZone())}
                            value={startDate ? parseDateTime(startDate) : undefined}
                            hideTimeZone
                            isDisabled={liveQuizNow}
                            onChange={(date) => {
                                const dateString = date ? date.toString() : "";
                                setStartDate(dateString);

                            }}
                        />
                    </div>
                    <div className='flex flex-col w-1/2 gap-1'>
                        <span className='font-medium text-[#1D2939] text-sm'>End Date & Time</span>
                        <DatePicker
                            granularity="minute"
                            minValue={startDate ? parseDateTime(startDate) : today(getLocalTimeZone())}
                            value={endDate ? parseDateTime(endDate) : undefined}
                            hideTimeZone
                            onChange={(date) => {
                                const dateString = date ? date.toString() : "";
                                setEndDate(dateString);

                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Test Series available for Section */}
            <div className="flex flex-col w-full p-6 bg-white border border-lightGrey rounded-xl">
                <h3>Test Series available for</h3>
                <div className="flex flex-row w-full mt-4 gap-4">
                    {/* Select Years */}
                    <div className="w-full">
                        <p className="mb-1 font-medium text-sm">Year</p>
                        <Select
                            id="target-exam"
                            value={selectedYears}
                            onChange={(newValue) => setSelectedYears(newValue as Option[])}
                            options={years}
                            isMulti
                            placeholder="Select exams..."
                            className='overflow-visible'
                            styles={{
                                option: (provided, state) => ({
                                    ...provided,
                                    color: "black",
                                    backgroundColor: state.isFocused ? "#E39FF6" : "white",
                                }),
                                multiValue: (provided) => ({
                                    ...provided,
                                    backgroundColor: "#EDE4FF",
                                    borderRadius: "100px",
                                    fontWeight: "500",
                                    marginRight: "7px",
                                    paddingRight: "8px",
                                    paddingLeft: "8px",
                                    paddingTop: "4px",
                                    paddingBottom: "4px",
                                }),
                                multiValueLabel: (provided) => ({
                                    ...provided,
                                    color: "black",
                                }),
                                multiValueRemove: (provided) => ({
                                    ...provided,
                                    color: "gray",
                                    cursor: "pointer",
                                    ":hover": {
                                        backgroundColor: "#ffffff",
                                        borderRadius: "8px",
                                    },
                                }),
                                menu: (provided) => ({
                                    ...provided,
                                    backgroundColor: "white",
                                }),
                                menuList: (provided) => ({
                                    ...provided,
                                    padding: "0",
                                }),
                                control: (provided) => ({
                                    ...provided,
                                    border: "1px solid #e6e6e6",
                                    borderRadius: "8px",
                                    padding: "4px",
                                    boxShadow: "none",
                                    "&:hover": {
                                        outline: "1px solid #e5a1f5",
                                    },
                                }),
                            }}
                        />
                    </div>

                    {/* Select Exams */}
                    <div className="w-full">
                        <p className="mb-1 font-medium text-sm">Exam</p>
                        <Select
                            id="target-exam"
                            value={selectedExams}
                            onChange={(newValue) => setSelectedExams(newValue as Option[])}
                            options={exams}
                            isMulti
                            placeholder="Select exams..."
                            className='overflow-visible'
                            styles={{
                                option: (provided, state) => ({
                                    ...provided,
                                    color: "black",
                                    backgroundColor: state.isFocused ? "#E39FF6" : "white",
                                }),
                                multiValue: (provided) => ({
                                    ...provided,
                                    backgroundColor: "#EDE4FF",
                                    borderRadius: "100px",
                                    fontWeight: "500",
                                    marginRight: "7px",
                                    paddingRight: "8px",
                                    paddingLeft: "8px",
                                    paddingTop: "4px",
                                    paddingBottom: "4px",
                                }),
                                multiValueLabel: (provided) => ({
                                    ...provided,
                                    color: "black",
                                }),
                                multiValueRemove: (provided) => ({
                                    ...provided,
                                    color: "gray",
                                    cursor: "pointer",
                                    ":hover": {
                                        backgroundColor: "#ffffff",
                                        borderRadius: "8px",
                                    },
                                }),
                                menu: (provided) => ({
                                    ...provided,
                                    backgroundColor: "white",
                                }),
                                menuList: (provided) => ({
                                    ...provided,
                                    padding: "0",
                                }),
                                control: (provided) => ({
                                    ...provided,
                                    border: "1px solid #e6e6e6",
                                    borderRadius: "8px",
                                    padding: "4px",
                                    boxShadow: "none",
                                    "&:hover": {
                                        outline: "1px solid #e5a1f5",
                                    },
                                }),
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Preference;