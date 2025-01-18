import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React, { useState } from "react";
import { Checkbox } from "@nextui-org/react";
import { DatePicker, DateValue } from "@nextui-org/react";
import { now, today, CalendarDate, getLocalTimeZone, parseDateTime } from "@internationalized/date";
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

    const getContentType = () => {
        switch (fromContent) {
            case "testseries": return "Testseries";
            case "quiz": return "Quiz";
            case "course": return "Course";
            default: return "";
        }
    };

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

        <Modal
            isOpen={true}
            onClose={onClose}
            size="2xl"
            hideCloseButton
            classNames={{
                base: "max-w-2xl mx-auto",
                header: "border-b border-[#E5E7EB] pb-4",
                body: "py-6",
                footer: "border-t border-[#E5E7EB] pt-4"
            }}
        >
            <ModalContent>
                <>
                    <ModalHeader className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold text-[#1D2939]">
                            Schedule {getContentType()}
                        </h3>
                        <button
                            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#F2F4F7] transition-all duration-300"
                            onClick={onClose}
                        >
                            <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                        </button>
                    </ModalHeader>

                    <ModalBody>
                        <div className="space-y-6">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    size="md"
                                    color="primary"
                                    checked={liveNow}
                                    onChange={() => setLiveNow((prev) => !prev)}
                                />
                                <p className="text-[#182230] font-medium">
                                    Make the {getContentType()} live now
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <span className="font-medium text-[#1D2939] text-sm">Start Date & Time</span>
                                    {/* <div className="flex justify-between items-center">
                                        <p className="text-[#1D2939] text-sm font-medium">
                                            {formatScheduleDate(startDate)}
                                        </p>
                                        <button
                                            className="px-3 py-2 rounded-md border-2 border-[#9012FF] hover:bg-[#F5F0FF] transition-colors"
                                            onClick={() => setDatapickerforStart(!datapickerforStart)}
                                        >
                                            <span className="text-[#9012FF] font-semibold text-sm">
                                                {startDate ? 'Change Date' : 'Select Date'}
                                            </span>
                                        </button>
                                    </div> */}
                                    <DatePicker
                                        granularity="minute"
                                        minValue={today(getLocalTimeZone())}
                                        isDisabled={liveNow}
                                        value={startDate ? parseDateTime(startDate) : undefined}

                                        onChange={(date) => {
                                            const dateString = date ? date.toString() : "";
                                            setStartDate(dateString);
                                        }}
                                    />

                                </div>

                                <div className="space-y-2">
                                    <span className="font-medium text-[#1D2939] text-sm">End Date & Time</span>
                                    <DatePicker
                                        granularity="minute"
                                        minValue={today(getLocalTimeZone())}
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
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            variant="light"
                            className="px-6 py-2.5 border border-[#E5E7EB] text-[#1D2939] hover:bg-[#F2F4F7] font-semibold text-sm rounded-md"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            className={`px-6 py-2.5 rounded-md text-white font-medium ${!isFormValid ? 'bg-[#CDA0FC]' : 'bg-[#9012FF] hover:bg-[#6D0DCC]'
                                } transition-colors`}
                            onClick={onSchedule}
                            disabled={!isFormValid}
                        >
                            Schedule {getContentType()}
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    );
}

export default ScheduledDialog;
