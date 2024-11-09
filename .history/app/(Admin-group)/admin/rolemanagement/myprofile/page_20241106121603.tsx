"use client";
import Image from "next/image";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useState } from "react";

function MyProfile() {
    const [isCreateSection, setIsCreateSection] = useState(false);

    const openCreateSection = () => setIsCreateSection(true);
    const closeCreateSection = () => setIsCreateSection(false);

    return (
        <div className="flex justify-center w-full h-full">
            <div className="mt-8 flex h-[298px] w-[588px] bg-[#FFFFFF] gap-6 flex-col border border-solid border-[#EAECF0] rounded-md p-6">
                <div className="flex flex-row justify-between h-[72px] w-auto items-center">
                    <div className="flex flex-row gap-2 h-10 items-center">
                        <Image src='/icons/Profile-pic.png' alt="DP" width={72} height={72} />
                        <div className="flex flex-col gap-1">
                            <span className="text-[#1D2939] font-semibold text-2xl">Jenny Wilson</span>
                            <span className="font-normal text-[#667085] text-base">Admin</span>
                        </div>
                    </div>
                    <div className="flex flex-row gap-3">
                        <button className="py-2 px-4 bg-[#FFFFFF] gap-2 h-[40px] w-auto items-center border border-solid border-[#EAECF0] rounded-[8px] flex flex-row justify-between">
                            <Image src="/icons/logout-03.svg" width={18} height={18} alt="logout" />
                            <span className="text-sm text-[#DE3024] font-normal">Log out</span>
                        </button>
                        <button onClick={openCreateSection} className="py-2 px-4 bg-[#FFFFFF] gap-2 h-[40px] w-auto items-center border border-solid border-[#EAECF0] rounded-[8px] flex flex-row justify-between">
                            <Image src="/icons/edit-02.svg" width={18} height={18} alt="edit" />
                            <span className="text-sm text-[#0C111D] font-normal">Edit</span>
                        </button>
                    </div>
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
            </div>

            {/* Dialog Component */}
            <Dialog open={isCreateSection} onClose={closeCreateSection} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 flex items-center justify-center">
                    <DialogPanel className="bg-white rounded-2xl w-[559px] h-auto">
                        <div className="flex flex-col relative gap-6">
                            <button onClick={closeCreateSection} className="absolute right-4 top-4">
                                <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                            </button>
                            <h3 className="mx-6 mt-6 text-2xl font-semibold text-[#1D2939]">Create Section</h3>
                            <div className="flex flex-col w-full gap-2 px-6">
                                <p className="text-start text-sm text-[#1D2939] font-medium"></p>
                                <div className="flex flex-row w-full h-10 px-3 outline-none border border-[#D0D5DD] rounded-md">
                                    <input
                                        type="text"
                                        className="w-full px-2 text-sm text-[#182230] font-normal outline-none rounded-md"
                                        placeholder="Enter Name"

                                    />
                                </div>
                            </div>
                            <hr />
                            <div className="flex flex-row justify-end mx-6 my-2 items-center gap-4">
                                <button onClick={closeCreateSection} className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md text-[#1D2939] font-semibold text-sm">Cancel</button>
                                <button
                                    onClick={closeCreateSection}
                                    className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#9012FF] border border-[#8501FF] rounded-md font-semibold text-sm">
                                    Create Section
                                </button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    );
}

export default MyProfile;
