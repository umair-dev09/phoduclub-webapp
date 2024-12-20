import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React, { useState } from "react";
import { Checkbox } from "@nextui-org/react";
import { DatePicker, DateValue } from "@nextui-org/react";
import { now, today, CalendarDate, getLocalTimeZone, parseZonedDateTime, parseAbsoluteToLocal, ZonedDateTime } from "@internationalized/date";
// Define the props interface
interface ScheduledDialogProps {
    onClose: () => void; // Define onClose as a function
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

function ScheduledDialog({ onClose }: ScheduledDialogProps) { // Use the interface
    const [showDatepicker, setShowDatepicker] = useState(false);
    const [sectionScheduleDate, setSectionScheduleDate] = useState("");
    return (
        <Dialog open={true} onClose={onClose} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/30 " />
            <div className="fixed inset-0 flex items-center justify-center ">
                <DialogPanel transition className="bg-white rounded-2xl w-[559px] h-auto">
                    <div className="flex flex-col  p-6 gap-4">
                        <div className="flex flex-row  justify-between ">
                            <h3 className=" text-2xl font-semibold task-[#1D2939]">
                                {/* Pause quiz "Physics"? */}
                            </h3>
                            <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7] ">
                                <button className="" onClick={onClose}>
                                    <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                                </button>
                            </button>
                        </div>
                        <div className="flex flex-row items-center  gap-1">
                            <Checkbox size="md" color="primary" />
                            <p className="text-start text-[#182230] font-medium">Make the quiz live now</p>
                        </div>
                        <div className="flex flex-row justify-between w-full  gap-4">
                            <div className="flex flex-row justify-between items-center">
                                <p className="text-[#1D2939] text-sm font-medium">{formatScheduleDate(sectionScheduleDate) || " "}</p>

                                <button
                                    className="flex flex-row gap-1 rounded-md border-[2px] border-solid border-[#9012FF] hover:bg-[#F5F0FF] bg-[#FFFFFF] p-2"
                                    onClick={() => setShowDatepicker(true)}
                                >
                                    <span className="text-[#9012FF] font-semibold text-sm">
                                        {sectionScheduleDate ? "Change Date" : "Select Date"}
                                    </span>
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
                                        setShowDatepicker(false); // Close datepicker after selecting date
                                    }}
                                />
                            )}

                        </div>
                        <p className=" text-sm text-[#475467] font-normal">Quiz will be live for 2 hours.</p>

                    </div>
                    <hr />
                    <div className="flex flex-row justify-end gap-4 items-center pr-6 h-[76px]">
                        <button className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey text-[#1D2939] hover:bg-[#F2F4F7] font-semibold text-sm rounded-md" onClick={onClose}>Cancel</button>
                        <button className="py-[0.625rem] px-6 text-[#FFFFFF] shadow-inner-button bg-[#9012FF] border border-[#8501FF] font-semibold text-sm rounded-md">Schedule Quiz</button>
                    </div>

                </DialogPanel>
            </div>
        </Dialog>
    );
}

export default ScheduledDialog;
