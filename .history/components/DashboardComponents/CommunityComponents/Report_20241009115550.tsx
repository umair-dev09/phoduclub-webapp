"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React from 'react';





type QuizProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

function Quiz({ isOpen, setIsOpen }: QuizProps) {




    const openBottomSheet = () => {
        setIsOpen(false); // Close the dialog

    };

    return (
        <>
            {/* Initial Dialog */}
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                {/* Backdrop */}
                <DialogBackdrop className="fixed inset-0 bg-black/30 " />

                {/* Dialog Wrapper */}
                <div className="fixed inset-0 flex items-center justify-center ">
                    <DialogPanel transition className="bg-white rounded-2xl w-[480px] h-auto border border-[#EAECF0]">

                        <div className="h-[126px]  border-b border-solid border-[#EAECF0] px-[24px] pt-[20px]">
                            <div className="flex items-center justify-between ">
                                <span className="text-lg font-bold text-[#1D2939] fontstyle-sora">Report</span>

                                <button onClick={() => setIsOpen(false)}>
                                    <Image src="/icons/cancel.svg" alt="cancel" width={18} height={18} />
                                </button>
                            </div>
                            <div className="pt-[6px]">
                                <span className="text-sm text-[#667085] font-normal">
                                    Lorem ipsum is a dummy text widely used in the digital industry and will be used here as a preview.
                                </span>

                            </div>

                        </div>
                        <div className="h-[156px] border-b border-solid border-[#EAECF0] px-[24px] pt-[24px]">
                            <span className="text-[#344054] font-medium text-normal">Why are you reporting this message?</span>
                            <div className="pt-4 flex flex-row">
                                <div className="h-[28px] w-auto rounded-sm border border-solid border-[#EAECF0] ">
                                    <span className="text-[#344054] font-medium text-normal">span</span>
                                </div>
                            </div>


                        </div>


                    </DialogPanel>
                </div>
            </Dialog>






        </>
    );
}

export default Quiz;







{/* <div className="flex items-center justify-between mb-4">
<span className="text-lg font-bold text-[#1D2939]">Confirmation</span>
<button onClick={() => setIsOpen(false)}>
    <Image src="/icons/cancel.svg" alt="cancel" width={18} height={18} />
</button>
</div>


<div className="flex flex-col gap-4 w-[432px] h-[100px]">
<span className="text-sm text-[#667085] font-normal">
    Lorem ipsum is a dummy text widely used in the digital industry and will be used here as a preview.
</span>

</div>

<div className="border-t border-[#EAECF0] w-full h-[76px] mt-5 flex justify-end gap-2">
<div className="mt-5">
    <button
        className="bg-[#FFFFFF] text-[#1D2939] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px]"
        style={{ border: "1.5px solid #EAECF0" }}
        onClick={() => setIsOpen(false)}
    >
        Cancel
    </button>
</div>
<div className="mt-5">
    <button
        onClick={openBottomSheet}
        className="bg-[#8501FF] text-[#FFFFFF] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px]"
        style={{
            border: "1px solid #800EE2",
            boxShadow: "0px -4px 4px 0px #1018281F inset, 0px 3px 2px 0px #FFFFFF3D inset",
        }}
    >
        Start Now
    </button>
</div>
</div> */}