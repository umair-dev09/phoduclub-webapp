"use client";
import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function PersonalDetails() {
    const [phone, setPhone] = useState("");
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const closeDialog = () => {
        setOpenDialog(false);
    };

    return (
        <div className="flex flex-col m-8 gap-6">
            <h1 className="text-[#1D2939] font-semibold text-lg">Personal Details</h1>
            <div className="flex flex-row justify-between w-full h-[72px]">
                <div className="flex flex-row gap-3">
                    <div className="relative">
                        <Image src="/images/DP_Lion.svg" alt="DP" width={72} height={72} />
                        <Image
                            className="absolute right-0 bottom-0"
                            src="/icons/winnerBatch.svg"
                            alt="Batch"
                            width={32}
                            height={32}
                        />
                    </div>
                    <div className="flex items-start flex-col justify-center">
                        <div className="font-semibold text-[#1D2939] text-2xl">Jenny Wilson</div>
                        <div className="flex justify-start items-start text-[16px] font-medium text-[#667085]">jenny#8547</div>
                    </div>
                </div>
                <button
                    onClick={handleOpenDialog}
                    className="p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] w-[84px] items-center"
                >
                    <Image src="/icons/edit-icon.svg" width={18} height={18} alt="Edit-quiz" />
                    <span className="text-sm text-[#0C111D] font-normal">Edit</span>
                </button>
            </div>
            <hr />
            <div className="flex flex-row w-full">
                <div className="flex flex-col w-1/2">
                    <span className="font-normal text-[#667085] text-[16px]">First Name</span>
                    <span className="font-semibold text-[#1D2939] text-[16px]">Jenny</span>
                </div>
                <div className="flex flex-col w-1/2">
                    <span className="font-normal text-[#667085] text-[16px]">Last Name</span>
                    <span className="font-semibold text-[#1D2939] text-[16px]">Wilson</span>
                </div>
            </div>
            <div className="flex flex-row w-full">
                <div className="flex flex-col w-1/2">
                    <span className="font-normal text-[#667085] text-[16px]">User ID</span>
                    <span className="font-semibold text-[#1D2939] text-[16px]">jenny#8745</span>
                </div>
                <div className="flex flex-col w-1/2">
                    <span className="font-normal text-[#667085] text-[16px]">Mobile No.</span>
                    <span className="font-semibold text-[#1D2939] text-[16px]">+918431823329</span>
                </div>
            </div>
            <div className="flex flex-col w-full">
                <span className="font-normal text-[#667085] text-[16px]">Joining Date</span>
                <span className="font-semibold text-[#1D2939] text-[16px]">Jan 6, 2024</span>
            </div>

            {/* Dialog Component */}
            <Dialog open={openDialog} onClose={closeDialog} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 flex items-center justify-center">
                    <DialogPanel className="bg-white rounded-2xl w-[500px] h-auto ">
                        <div className="flex flex-col relative gap-6">
                            <div className="flex flex-col px-6 gap-6">
                                <div className="flex flex-row justify-between mt-6">
                                    <h3 className="text-lg font-bold text-[#1D2939]">Edit Info</h3>
                                    <button onClick={closeDialog}>
                                        <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                                    </button>
                                </div>
                                <div className="flex flex-col gap-3 items-center">
                                    <div className="relative">
                                        <Image src="/images/DP_Lion.svg" alt="DP" width={152} height={152} />
                                        <Image
                                            className="absolute right-0 bottom-0"
                                            src="/icons/winnerBatch.svg"
                                            alt="Batch"
                                            width={68}
                                            height={68}
                                        />
                                    </div>
                                    <span className="font-semibold text-sm text-[#9012FF]">Change</span>
                                </div>
                                {/* Input Fields */}
                                <div className="flex flex-row w-full gap-4">
                                    <div className="flex flex-col gap-1 w-1/2 flex-grow">
                                        <label className="text-[#1D2939] text-sm font-medium">First Name</label>
                                        <input
                                            className="w-full text-sm font-medium text-[#1D2939] placeholder:text-[#A1A1A1] rounded-md border border-[#D0D5DD] px-4 py-2"
                                            type="text"
                                            placeholder="First Name"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1 w-1/2 flex-grow">
                                        <label className="text-[#1D2939] text-sm font-medium">Last Name</label>
                                        <input
                                            className="w-full text-sm font-medium text-[#1D2939] placeholder:text-[#A1A1A1] rounded-md border border-[#D0D5DD] px-4 py-2"
                                            type="text"
                                            placeholder="Last Name"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[#344054] text-sm font-medium">Mobile No.</label>
                                    <PhoneInput
                                        country="in"
                                        value={phone}
                                        onChange={(value) => setPhone(value)}
                                        inputProps={{ required: true }}
                                        inputStyle={{
                                            width: "100%",
                                            borderRadius: "8px",
                                            border: "1px solid #D0D5DD",
                                            height: "42px",
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-4 border-t p-4">
                                <button onClick={closeDialog} className="px-6 py-2 border rounded-md text-sm font-semibold">
                                    Discard
                                </button>
                                <button onClick={closeDialog} className="px-6 py-2 bg-[#9012FF] text-white rounded-md text-sm">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    );
}

export default PersonalDetails;
