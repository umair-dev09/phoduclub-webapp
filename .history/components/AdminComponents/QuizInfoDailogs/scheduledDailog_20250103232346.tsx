import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React, { useState } from "react";
import { Checkbox } from "@nextui-org/react";
import { DatePicker, DateValue } from "@nextui-org/react";
import { now, today, CalendarDate, getLocalTimeZone, parseZonedDateTime, parseAbsoluteToLocal, ZonedDateTime } from "@internationalized/date";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { toast, ToastContainer } from 'react-toastify';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

// Define the props interface
interface ScheduledDialogProps {
    onClose: () => void; // Define onClose as a function
    fromContent: string;
    contentId: string;
    startDate: string;
    setStartDate: (startDate: string) => void;
    endDate: string;
    setEndDate: (endDate: string) => void;
    liveNow: boolean;
    setLiveNow: React.Dispatch<React.SetStateAction<boolean>>;
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


function ScheduledDialog({ startDate, endDate, setEndDate, setStartDate, fromContent, contentId, onClose, liveNow, setLiveNow }: ScheduledDialogProps) { // Use the interface

    const [datapickerforEnd, setDatapickerforEnd] = useState(false);
    const [datapickerforStart, setDatapickerforStart] = useState(false);

    const isFormValid = !!endDate;
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 19); // Converts to the format "YYYY-MM-DDTHH:MM:SS"
    const onSchedule = async () => {

        // Determine the Firestore collection based on `fromContent`
        const collectionPath =
            fromContent === "testseries"
                ? "testseries"
                : fromContent === "quiz"
                    ? "quiz"
                    : fromContent === "course"
                        ? "course"
                        : null;

        if (!collectionPath) {
            console.error("Invalid `fromContent` value.");
            return;
        }

        try {
            // Reference to the Firestore document
            const docRef = doc(db, collectionPath, contentId);
            const updatedStartDate = liveNow ? formattedDate : !startDate ? formattedDate : startDate;
            const status = liveNow ? "live" : !startDate ? "live" : "scheduled";
            // Update Firestore document with startDate and endDate
            await updateDoc(docRef, {
                startDate: updatedStartDate,
                endDate,
                status: status,
            });
            toast.success('Success!');
            console.log("Schedule updated successfully!");
            onClose(); // Close the dialog after a successful update
        } catch (error) {
            toast.error('Failed to update!');
            console.error("Error updating Firestore document:", error);
        }
    };

    return (
        // <Dialog open={true} onClose={onClose} className="relative z-50">
        //     <DialogBackdrop className="fixed inset-0 bg-black/30 " />
        //     <div className="fixed inset-0 flex items-center justify-center ">
        //         <DialogPanel transition className="bg-white rounded-2xl w-[620px] h-auto">
        //             <div className="flex flex-col  p-6 gap-4">
        //                 <div className="flex flex-row  justify-between ">
        //                     <h3 className="text-2xl font-semibold text-[#1D2939]">
        //                         Schedule {fromContent === "testseries"
        //                             ? "Testseries"
        //                             : fromContent === "quiz"
        //                                 ? "Quiz"
        //                                 : fromContent === "course"
        //                                     ? "Course"
        //                                     : ""}
        //                     </h3>
        //                     <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7] ">
        //                         <button className="" onClick={onClose}>
        //                             <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
        //                         </button>
        //                     </button>
        //                 </div>
        //                 <div className="flex flex-row items-center  gap-1">
        //                     <Checkbox
        //                         size="md"
        //                         color="primary"
        //                         checked={liveNow}          // Bind the state to the checkbox
        //                         onChange={() => setLiveNow((prev) => !prev)}  // Toggle state on change
        //                     />                            <p className="text-start text-[#182230] font-medium">
        //                         Make the {fromContent === "testseries"
        //                             ? "Testseries"
        //                             : fromContent === "quiz"
        //                                 ? "Quiz"
        //                                 : fromContent === "course"
        //                                     ? "Course"
        //                                     : ""} live now
        //                     </p>
        //                 </div>
        //                 <div className='flex flex-row w-full gap-4'>
        //                     <div className='flex flex-col w-1/2 gap-1'>
        //                         <span className='font-medium text-[#1D2939] text-sm'>Start Date & Time</span>

        //                         <div className="flex flex-row justify-between items-center mb-3">
        //                             <p className="text-[#1D2939] text-sm font-medium">  {formatScheduleDate(startDate) || ""}</p>
        //                             <button
        //                                 className="flex flex-row gap-1 rounded-md border-[2px] border-solid border-[#9012FF] hover:bg-[#F5F0FF] bg-[#FFFFFF] p-2 "
        //                                 onClick={() => setDatapickerforStart(!datapickerforStart)}>
        //                                 <span className="text-[#9012FF] font-semibold text-sm">{startDate ? 'Change Date' : 'Select Date'}</span>
        //                             </button>
        //                         </div>
        //                         {(datapickerforStart &&
        //                             <DatePicker
        //                                 granularity="minute"
        //                                 minValue={today(getLocalTimeZone())}
        //                                 isDisabled={liveNow}
        //                                 hideTimeZone
        //                                 onChange={(date) => {
        //                                     const dateString = date ? date.toString() : "";
        //                                     setStartDate(dateString);
        //                                 }}

        //                             />
        //                         )}

        //                     </div>
        //                     <div className='flex flex-col w-1/2 gap-1'>
        //                         <span className='font-medium text-[#1D2939] text-sm'>End Date & Time</span>
        //                         <div className="flex flex-row justify-between items-center mb-3">
        //                             <p className="text-[#1D2939] text-sm font-medium">  {formatScheduleDate(endDate) || ""}</p>
        //                             <button
        //                                 className="flex flex-row gap-1 rounded-md border-[2px] border-solid border-[#9012FF] hover:bg-[#F5F0FF] bg-[#FFFFFF] p-2 "
        //                                 onClick={() => setDatapickerforEnd(!datapickerforEnd)}>
        //                                 <span className="text-[#9012FF] font-semibold text-sm">{endDate ? 'Change Date' : 'Select Date'}</span>
        //                             </button>
        //                         </div>
        //                         {(datapickerforEnd &&
        //                             <DatePicker
        //                                 granularity="minute"
        //                                 minValue={today(getLocalTimeZone())}
        //                                 hideTimeZone
        //                                 onChange={(date) => {
        //                                     const dateString = date ? date.toString() : "";
        //                                     setEndDate(dateString);
        //                                 }}

        //                             />
        //                         )}
        //                     </div>
        //                 </div>
        //             </div>
        //             <hr />
        //             <div className="flex flex-row justify-end gap-2 items-center pr-6 h-[76px]">
        //                 <button className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey text-[#1D2939] hover:bg-[#F2F4F7] font-semibold text-sm rounded-md" onClick={onClose}>Cancel</button>
        //                 <button onClick={onSchedule}
        //                     className={`h-[44px] w-auto px-3 ml-4 rounded-md text-white font-medium items-center flex border border-solid border-white  ${!isFormValid ? 'bg-[#CDA0FC]' : 'bg-[#9012FF]'} justify-center shadow-inner-button`}
        //                     disabled={!isFormValid}>Schedule {fromContent === "testseries"
        //                         ? "Testseries"
        //                         : fromContent === "quiz"
        //                             ? "Quiz"
        //                             : fromContent === "course"
        //                                 ? "Course"
        //                                 : ""}</button>
        //             </div>

        //         </DialogPanel>
        //     </div>
        // </Dialog>

        // <Modal isOpen={true} onOpenChange={(isOpen) => !isOpen && onClose()} hideCloseButton >

        //     <ModalContent>
        //         <>
        //             <ModalHeader className="flex flex-row justify-between items-center gap-1">
        //                 <h3 className="text-2xl font-semibold text-[#1D2939]">
        //                     Schedule {fromContent === "testseries"
        //                         ? "Testseries"
        //                         : fromContent === "quiz"
        //                             ? "Quiz"
        //                             : fromContent === "course"
        //                                 ? "Course"
        //                                 : ""}
        //                 </h3>
        //                 <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7] ">
        //                     <button className="" onClick={onClose}>
        //                         <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
        //                     </button>
        //                 </button>
        //             </ModalHeader>
        //             <ModalBody>
        //                 <div className="flex flex-row items-center  gap-1">
        //                     <Checkbox
        //                         size="md"
        //                         color="primary"
        //                         checked={liveNow}          // Bind the state to the checkbox
        //                         onChange={() => setLiveNow((prev) => !prev)}  // Toggle state on change
        //                     />                            <p className="text-start text-[#182230] font-medium">
        //                         Make the {fromContent === "testseries"
        //                             ? "Testseries"
        //                             : fromContent === "quiz"
        //                                 ? "Quiz"
        //                                 : fromContent === "course"
        //                                     ? "Course"
        //                                     : ""} live now
        //                     </p>
        //                 </div>
        //                 <div className='flex flex-row w-full gap-4 justify-between'>
        //                     <div className='flex flex-col w-1/2 gap-1'>
        //                         <span className='font-medium text-[#1D2939] text-sm'>Start Date & Time</span>

        //                         <div className="flex flex-row justify-between items-center mb-3">
        //                             <p className="text-[#1D2939] text-sm font-medium">  {formatScheduleDate(startDate) || ""}</p>
        //                             <button
        //                                 className="flex flex-row gap-1 rounded-md border-[2px] border-solid border-[#9012FF] hover:bg-[#F5F0FF] bg-[#FFFFFF] p-2 "
        //                                 onClick={() => setDatapickerforStart(!datapickerforStart)}>
        //                                 <span className="text-[#9012FF] font-semibold text-sm">{startDate ? 'Change Date' : 'Select Date'}</span>
        //                             </button>
        //                         </div>
        //                         {(datapickerforStart &&
        //                             <DatePicker
        //                                 granularity="minute"
        //                                 minValue={today(getLocalTimeZone())}
        //                                 isDisabled={liveNow}
        //                                 hideTimeZone
        //                                 onChange={(date) => {
        //                                     const dateString = date ? date.toString() : "";
        //                                     setStartDate(dateString);
        //                                 }}

        //                             />
        //                         )}

        //                     </div>
        //                     <div className='flex flex-col w-1/2 gap-1'>
        //                         <span className='font-medium text-[#1D2939] text-sm'>End Date & Time</span>
        //                         <div className="flex flex-row justify-between items-center mb-3">
        //                             <p className="text-[#1D2939] text-sm font-medium">  {formatScheduleDate(endDate) || ""}</p>
        //                             <button
        //                                 className="flex flex-row gap-1 rounded-md border-[2px] border-solid border-[#9012FF] hover:bg-[#F5F0FF] bg-[#FFFFFF] p-2 "
        //                                 onClick={() => setDatapickerforEnd(!datapickerforEnd)}>
        //                                 <span className="text-[#9012FF] font-semibold text-sm">{endDate ? 'Change Date' : 'Select Date'}</span>
        //                             </button>
        //                         </div>
        //                         {(datapickerforEnd &&
        //                             <DatePicker
        //                                 granularity="minute"
        //                                 minValue={today(getLocalTimeZone())}
        //                                 hideTimeZone
        //                                 onChange={(date) => {
        //                                     const dateString = date ? date.toString() : "";
        //                                     setEndDate(dateString);
        //                                 }}

        //                             />
        //                         )}
        //                     </div>
        //                 </div>
        //             </ModalBody>
        //             <ModalFooter className="border-t border-lightGrey">
        //                 <button className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey text-[#1D2939] hover:bg-[#F2F4F7] font-semibold text-sm rounded-md" onClick={onClose}>Cancel</button>
        //                 <button onClick={onSchedule}
        //                     className={`h-[44px] w-auto px-3 ml-4 rounded-md text-white font-medium items-center flex border border-solid border-white  ${!isFormValid ? 'bg-[#CDA0FC]' : 'bg-[#9012FF]'} justify-center shadow-inner-button`}
        //                     disabled={!isFormValid}>Schedule {fromContent === "testseries"
        //                         ? "Testseries"
        //                         : fromContent === "quiz"
        //                             ? "Quiz"
        //                             : fromContent === "course"
        //                                 ? "Course"
        //                                 : ""}</button>
        //             </ModalFooter>
        //         </>
        //     </ModalContent>
        // </Modal >

        <Modal isOpen={true} onOpenChange={(isOpen) => !isOpen && onClose()} hideCloseButton>
            <ModalContent>
                <>
                    <ModalHeader className="flex flex-row justify-between gap-1">
                        <h1 className="font-bold text-[#1D2939] text-lg">
                            Schedule{" "}
                            {fromContent === "testseries"
                                ? "Testseries"
                                : fromContent === "quiz"
                                    ? "Quiz"
                                    : fromContent === "course"
                                        ? "Course"
                                        : ""}
                        </h1>
                        <button
                            className="w-[32px] h-[32px] rounded-full flex items-center justify-center hover:bg-[#F2F4F7]"
                            onClick={onClose}
                            aria-label="Close dialog"
                        >
                            <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                        </button>
                    </ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col p-6 gap-4">
                            <div className="flex flex-row items-center gap-1">
                                <Checkbox
                                    size="md"
                                    color="primary"
                                    checked={liveNow}
                                    onChange={() => setLiveNow((prev) => !prev)}
                                />
                                <p className="text-start text-[#182230] font-medium">
                                    Make the{" "}
                                    {fromContent === "testseries"
                                        ? "Testseries"
                                        : fromContent === "quiz"
                                            ? "Quiz"
                                            : fromContent === "course"
                                                ? "Course"
                                                : ""}{" "}
                                    live now
                                </p>
                            </div>
                            <div className="flex flex-row w-20 gap-4">
                                <div className="flex flex-col w-1/2 gap-1">
                                    <span className="font-medium text-[#1D2939] text-sm">
                                        Start Date & Time
                                    </span>
                                    <div className="flex flex-row justify-between items-center mb-3">
                                        <p className="text-[#1D2939] text-sm font-medium">
                                            {formatScheduleDate(startDate) || ""}
                                        </p>
                                        <button
                                            className="flex flex-row gap-1 rounded-md border-[2px] border-solid border-[#9012FF] hover:bg-[#F5F0FF] bg-[#FFFFFF] p-2"
                                            onClick={() => setDatapickerforStart(!datapickerforStart)}
                                        >
                                            <span className="text-[#9012FF] font-semibold text-sm">
                                                {startDate ? "Change Date" : "Select Date"}
                                            </span>
                                        </button>
                                    </div>
                                    {datapickerforStart && (
                                        <DatePicker
                                            granularity="minute"
                                            minValue={today(getLocalTimeZone())}
                                            isDisabled={liveNow}
                                            hideTimeZone
                                            onChange={(date) => {
                                                const dateString = date ? date.toString() : "";
                                                setStartDate(dateString);
                                            }}
                                        />
                                    )}
                                </div>
                                <div className="flex flex-col w-1/2 gap-1">
                                    <span className="font-medium text-[#1D2939] text-sm">
                                        End Date & Time
                                    </span>
                                    <div className="flex flex-row justify-between items-center mb-3">
                                        <p className="text-[#1D2939] text-sm font-medium">
                                            {formatScheduleDate(endDate) || ""}
                                        </p>
                                        <button
                                            className="flex flex-row gap-1 rounded-md border-[2px] border-solid border-[#9012FF] hover:bg-[#F5F0FF] bg-[#FFFFFF] p-2"
                                            onClick={() => setDatapickerforEnd(!datapickerforEnd)}
                                        >
                                            <span className="text-[#9012FF] font-semibold text-sm">
                                                {endDate ? "Change Date" : "Select Date"}
                                            </span>
                                        </button>
                                    </div>
                                    {datapickerforEnd && (
                                        <DatePicker
                                            granularity="minute"
                                            minValue={today(getLocalTimeZone())}
                                            hideTimeZone
                                            onChange={(date) => {
                                                const dateString = date ? date.toString() : "";
                                                setEndDate(dateString);
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter className="border-t border-lightGrey">
                        <button
                            className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey text-[#1D2939] hover:bg-[#F2F4F7] font-semibold text-sm rounded-md"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onSchedule}
                            className={`h-[44px] w-auto px-3 ml-4 rounded-md text-white font-medium items-center flex border border-solid border-white ${!isFormValid ? "bg-[#CDA0FC]" : "bg-[#9012FF]"
                                } justify-center shadow-inner-button`}
                            disabled={!isFormValid}
                        >
                            Schedule{" "}
                            {fromContent === "testseries"
                                ? "Testseries"
                                : fromContent === "quiz"
                                    ? "Quiz"
                                    : fromContent === "course"
                                        ? "Course"
                                        : ""}
                        </button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>

    );
}

export default ScheduledDialog;
