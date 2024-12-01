import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React from "react";
import { Checkbox } from "@nextui-org/react";
// Define the props interface
interface ScheduledDialogProps {
    onClose: () => void; // Define onClose as a function
}

function ScheduledDialog({ onClose }: ScheduledDialogProps) { // Use the interface
    return (
        <Dialog open={true} onClose={onClose} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/30 " />
            <div className="fixed inset-0 flex items-center justify-center ">
                <DialogPanel transition className="bg-white rounded-2xl w-[559px] h-auto">
                    <div className="flex flex-col  p-6 gap-4">
                        <div className="flex flex-row  justify-between ">
                            <h3 className=" text-2xl font-semibold task-[#1D2939]">Pause quiz "Physics"?</h3>
                            <button onClick={onClose}>
                                <Image src="/icons/cancel.svg" alt="cancel" width={20} height={20} />
                            </button>
                        </div>
                        <div className="flex flex-row items-center  gap-1">
                            <Checkbox size="md" color="primary" />
                            <p className="text-start text-[#182230] font-medium">Make the quiz live now</p>
                        </div>
                        <div className="flex flex-row justify-between w-full  gap-4">
                            <div className="flex flex-col w-full gap-2">
                                <p className="text-start text-sm text-[#1D2939] font-medium">Start Date</p>
                                <div className="flex flex-row w-full h-10 px-3 outline-none border border-[#D0D5DD] rounded-md">
                                    <Image src='/icons/calendar-03.svg' alt="date" width={24} height={24} />
                                    <input type="text" className="w-full px-2 text-sm text-[#182230] font-normal outline-none rounded-md" />
                                </div>
                            </div>
                            <div className="flex flex-col w-full gap-2">
                                <p className="text-start text-sm text-[#1D2939] font-medium">Start Date</p>
                                <div className="flex flex-row w-full h-10 px-3 outline-none border border-[#D0D5DD] rounded-md">
                                    <Image src='/icons/calendar-03.svg' alt="date" width={24} height={24} />
                                    <input type="text" className="w-full px-2 text-sm text-[#182230] font-normal outline-none rounded-md" />
                                </div>
                            </div>
                        </div>
                        <p className=" text-sm text-[#475467] font-normal">Quiz will be live for 2 hours.</p>
                        <hr />
                        <div className="flex flex-row justify-end gap-4">
                            <button className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey text-[#1D2939] font-semibold text-sm rounded-md" onClick={onClose}>Cancel</button>
                            <button className="py-[0.625rem] px-6 text-[#FFFFFF] shadow-inner-button bg-[#9012FF] border border-[#8501FF] font-semibold text-sm rounded-md">Schedule Quiz</button>
                        </div>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}

export default ScheduledDialog;
