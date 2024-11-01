"use client";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import { useState } from 'react';
function section() {
    // State to manage each dialog's for Create Section

    const [iscreatesection, setIscreatesection] = useState(false);

    // Handlers for Create Section dialog
    const opencreatesection = () => setIscreatesection(true);
    const closecreatesection = () => setIscreatesection(false);
    return (
        <>
            <div className=" h-auto rounded-[16px] mt-4 flex flex-col  border border-solid border-[#EAECF0] ">
                <div className="h-[76px]   bg-[#FFFFFF]  rounded-t-[16px] border-b border-solid border-[#EAECF0] ">
                    <div className="flex fex-row justify-between p-4">
                        <div className="flex flex-col ">
                            <span className="font-semibold text-base text-[#1D2939]">Physics</span>
                            <div className="flex flex-row  mt-2 items-center">
                                <Image
                                    src="/icons/select-date.svg"
                                    width={16}
                                    height={16}
                                    alt="THree -dots -icons" />
                                <span className="font-normal text-[#475467] text-xs ml-1">Schedule :</span>
                                <span className="ml-2 text-[#101828] text-xs font-medium">24 Jan, 2024  05:30 PM</span>

                            </div>

                        </div>
                        <button>
                            <Image
                                src="/icons/three-dots.svg"
                                width={20}
                                height={20}
                                alt="THree -dots -icons" />
                        </button>

                    </div>


                </div>
                <div className="bg-[#FFFFFF] h-[184px] p-6 items-center flex flex-col gap-2 rounded-b-[16px] ">


                    <span className="text-[#1D2939] font-semibold text-lg">Create section/questions</span>
                    <span className="font-normal text-xs text-[#667085]">Test Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups. Name</span>
                    <div className="flex flex-row gap-4 mt-2">
                        <button className="flex flex-row gap-1 items-center rounded-md  border-[2px] border-solid border-[#9012FF] h-[44px] w-[162px] justify-center"
                            onClick={opencreatesection}>
                            <Image
                                src="/icons/plus-sign.svg"
                                height={18}
                                width={18}
                                alt="Plus sign" />
                            <span className="text-[#9012FF] font-semibold text-sm">Add Section</span>
                        </button>
                        <button className="flex flex-row gap-1 items-center rounded-md border-[2px]  border-solid border-[#9012FF] h-[44px] w-[162px] justify-center">
                            <Image
                                src="/icons/plus-sign.svg"
                                height={18}
                                width={18}
                                alt="Plus sign" />
                            <span className="text-[#9012FF] font-semibold text-sm">Add Question</span>
                        </button>

                    </div>


                </div>
            </div>
            <Dialog open={iscreatesection} onClose={closecreatesection} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/30 " />
                <div className="fixed inset-0 flex items-center justify-center ">
                    <DialogPanel transition className="bg-white rounded-2xl w-[559px] h-auto">
                        <div className="flex flex-col relative gap-6">
                            <button className="absolute right-4 top-4" onClick={closecreatesection}>
                                <Image src="/icons/cancel.svg" alt="cancel" width={20} height={20} />
                            </button>
                            <h3 className="mx-6 mt-6 text-2xl font-semibold task-[#1D2939]">Create Section</h3>
                            <div className="flex flex-col w-full gap-2 px-6">
                                <p className="text-start text-sm text-[#1D2939] font-medium">Name</p>
                                <div className="flex flex-row w-full h-10 px-3 outline-none border border-[#D0D5DD] rounded-md">

                                    <input type="text" className="w-full px-2 text-sm text-[#182230] font-normal outline-none rounded-md" />
                                </div>
                            </div>
                            <div className="flex flex-row justify-between w-full  px-6 gap-4">
                                <div className="flex flex-col w-full gap-2">
                                    <p className="text-start text-sm text-[#1D2939] font-medium">Date</p>
                                    <div className="flex flex-row w-full h-10 px-3 outline-none border border-[#D0D5DD] rounded-md">
                                        <Image src='/icons/calendar-03.svg' alt="date" width={24} height={24} />
                                        <input type="text" className="w-full px-2 text-sm text-[#182230] font-normal outline-none rounded-md" />
                                    </div>
                                </div>
                                <div className="flex flex-col w-full gap-2">
                                    <p className="text-start text-sm text-[#1D2939] font-medium">TIme</p>
                                    <div className="flex flex-row w-full h-10 px-3 outline-none border border-[#D0D5DD] rounded-md">
                                        <Image src='/icons/calendar-03.svg' alt="date" width={24} height={24} />
                                        <input type="text" className="w-full px-2 text-sm text-[#182230] font-normal outline-none rounded-md" />
                                    </div>
                                </div>
                            </div>

                            <hr />
                            <div className="flex flex-row justify-end mx-6 my-4 gap-4">
                                <button className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md text-[#1D2939] font-semibold text-sm" onClick={closecreatesection}>Cancel</button>
                                <button className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#9012FF] border border-[#8501FF] rounded-md">Create Section</button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}
export default section;