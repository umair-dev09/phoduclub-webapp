"use client";
import { useState } from "react";
import React from 'react';
import Image from "next/image";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

function Messenger() {
    const [isOpen, setIsOpen] = useState(false);

    // Handler to open the dialog
    const handleCreate = () => setIsOpen(true);

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between h-[44px] items-center mt-4">
                <h1 className="font-semibold text-lg text-[#1D2939]">Messenger</h1>
                <button
                    onClick={handleCreate}
                    className="h-[44px] w-auto px-6 py-2 bg-[#8501FF] rounded-md shadow-inner-button border border-solid border-[#800EE2] flex items-center justify-center"
                >
                    <span className="text-[#FFFFFF] font-semibold text-sm">Create Push Notification</span>
                </button>
            </div>

            <div className="w-full h-auto flex flex-row gap-1">
                <div className="w-full flex flex-col p-4 border border-solid border-[#EAECF0] bg-[#FFFFFF] justify-center rounded-xl h-[82px]">
                    <span className="text-[#667085] font-normal text-sm">All Clicks</span>
                    <span className="font-medium text-[#1D2939] text-base">2599</span>
                </div>
                <div className="w-full flex flex-col p-4 border border-solid border-[#EAECF0] bg-[#FFFFFF] justify-center rounded-xl h-[82px]">
                    <span className="text-[#667085] font-normal text-sm">Premium User Clicks</span>
                    <span className="font-medium text-[#1D2939] text-base">5599</span>
                </div>
                <div className="w-full flex flex-col p-4 border border-solid border-[#EAECF0] bg-[#FFFFFF] justify-center rounded-xl h-[82px]">
                    <span className="text-[#667085] font-normal text-sm">Free User Clicks</span>
                    <span className="font-medium text-[#1D2939] text-base">329494</span>
                </div>
            </div>

            {/* Dialog Component */}
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 flex items-center justify-center">
                    <DialogPanel className="bg-white rounded-2xl w-[500px] h-auto px-6 ">
                        <div className="flex flex-col relative">
                            <div className="flex flex-row justify-between my-6">
                                <h3 className="text-lg font-bold text-[#1D2939]">Create Push Notification</h3>
                                <button onClick={() => setIsOpen(false)}>
                                    <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                                </button>
                            </div>

                            <div className="flex flex-col w-full gap-1 ">

                                <label className="text-[#1D2939] text-sm font-medium">Name</label>
                                <input
                                    className="w-full py-2 px-4 text-sm font-medium text-[#1D2939] border border-[#D0D5DD] rounded-md"
                                    type="text"
                                    placeholder="Notification Heading"
                                />
                                <span className="text-[#475467] font-normal text-right text-sm">0/50</span>


                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <label className="text-[#1D2939] text-sm font-medium">Description</label>
                                <input
                                    className="w-full py-2 px-4 text-sm font-medium text-[#1D2939] border border-[#D0D5DD] rounded-md"
                                    type="text"
                                    placeholder="Button Name"
                                />
                                <span className="text-[#475467] font-normal text-right text-sm">0/100</span>
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <label className="text-[#1D2939] text-sm font-medium">CTA</label>
                                <input
                                    className="w-full py-2 px-4 text-sm font-medium text-[#1D2939] border border-[#D0D5DD] rounded-md"
                                    type="text"
                                    placeholder="Notification Content"
                                />
                                <span className="text-[#475467] font-normal text-right text-sm">0/30</span>
                            </div>
                            <div className="flex flex-col gap-1 w-full ">
                                <label className="text-[#1D2939] text-sm font-medium">Hyperlink</label>
                                <input
                                    className="w-full py-2 px-4 text-sm font-medium text-[#1D2939] border border-[#D0D5DD] rounded-md"
                                    type="text"
                                    placeholder="Add hyperlink"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full mt-4">
                                <label className="text-[#1D2939] text-sm font-medium">Countdown Timer</label>
                                <input
                                    className="w-full py-2 px-4 text-sm font-medium text-[#1D2939] border border-[#D0D5DD] rounded-md"
                                    type="text"
                                    placeholder="HH : MM : SS"
                                />
                            </div>
                            <hr className="my-5" />
                            <h1 className="text-[#1D2939] font-semibold text-lg ">Schedule notification</h1>
                            <div className="flex flex-row w-full gap-4  mt-1">
                                <div className="flex flex-col gap-1 w-1/2 flex-grow">
                                    <label htmlFor="rating" className="text-[#1D2939] text-sm font-medium">
                                        Date
                                    </label>
                                    <div className="flex flex-row p-2 w-full gap-2 border border-solid border-[#D0D5DD] rounded-md  ">
                                        <Image
                                            src="/icons/calendar-03.svg"
                                            width={24}
                                            height={24}
                                            alt="calender" />
                                        <input

                                            className="w-full text-sm font-medium text-[#1D2939] placeholder:font-normal placeholder:text-[#A1A1A1] rounded-md outline-none"
                                            type="text"
                                            placeholder="Select Date"
                                        />

                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 w-1/2 flex-grow">
                                    <label htmlFor="num-ratings" className="text-[#1D2939] text-sm font-medium">
                                        Time
                                    </label>
                                    <div className="flex flex-row p-2 w-full gap-2 border border-solid border-[#D0D5DD] rounded-md ">
                                        <input
                                            className="w-full text-sm font-medium text-[#1D2939] placeholder:font-normal placeholder:text-[#A1A1A1] rounded-md outline-none"
                                            type="text"
                                            placeholder="Select Time"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row justify-end my-2 gap-4 border-t border-[#EAECF0] pt-4">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="py-2 px-6 border rounded-md text-[#1D2939] font-semibold text-sm">
                                    Cancel
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="py-2 px-6 bg-[#9012FF] text-white rounded-md font-semibold text-sm">
                                    Send Notification
                                </button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    );
}

export default Messenger;
