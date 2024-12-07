"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css"

type QuizProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    setShowBottomSheet: (show: boolean) => void;
    onSubmit: () => void;
    showBottomSheet: boolean;
};

function Quiz({
    isOpen,
    setIsOpen,
    showBottomSheet,
    setShowBottomSheet,
    onSubmit,
}: QuizProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false); // New state for "submit" dialog

    const openBottomSheet = () => {
        setIsOpen(false); // Close the quiz dialog
        setShowBottomSheet(true); // Show the bottom sheet
    };

    const handleSubmit = () => {
        // Close the bottom sheet and open submit Dialog
        setIsDialogOpen(true); // Open submit Dialog
        setShowBottomSheet(false); // Close Bottom Sheet
    };

    const handleSaveExit = () => {
        // Close the quiz dialog and do not open submit Dialog
        setIsOpen(false); // Close the quiz dialog
        setShowBottomSheet(false); // Close Bottom Sheet
    };

    const handleDialogSubmit = () => {
        setIsDialogOpen(false); // Close submit dialog after submitting
        setIsOpen(false); // Close Quiz Dialog
        setShowBottomSheet(false); // Close Bottom Sheet
    };
    return (
        <>
            {/* Initial Dialog */}
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                {/* Backdrop */}
                <DialogBackdrop className="fixed inset-0 bg-black/30 " />

                {/* Dialog Wrapper */}
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel transition>
                        <div className="bg-white rounded-2xl p-5 w-[480px] h-[261px]">
                            {/* Header Section */}
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-lg font-bold text-[#1D2939]">Confirmation</span>
                                <button onClick={() => setIsOpen(false)}>
                                    <Image src="/icons/cancel.svg" alt="cancel" width={18} height={18} />
                                </button>
                            </div>
                            {/* Content Section */}
                            <div className="flex flex-col gap-4 w-[432px] h-[100px]">
                                <span className="text-sm text-[#667085] font-normal">
                                    Lorem ipsum is a dummy text widely used in the digital industry and will be used here as a preview.
                                </span>
                                <span className="text-sm text-[#667085] font-normal">
                                    Lorem ipsum is a dummy text widely used in the digital industry and will be used here as a preview.
                                </span>
                            </div>
                            {/* Buttons */}
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
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>


            <Drawer
                open={showBottomSheet}
                direction="bottom"
                className="rounded-tl-md rounded-tr-md "
                style={{ height: "98vh" }}
            >
                <div className="flex flex-col h-full  overflow-y-auto">
                    <div className="p-5 flex justify-between items-center h-[69px] w-full border-b-[1.5px] border-t-[1.5px] border-[#EAECF0]  rounded-tl-[18px] rounded-tr-[16px]">
                        <span className="text-lg font-semibold text-[#1D2939]">Quiz</span>
                        <span className="text-lg font-semibold text-[#1D2939] flex items-center justify-center gap-2">
                            <Image width={24} height={24} src="/icons/alarm-clock.svg" alt="timer" />
                            00:05
                        </span>

                        <div
                            className={`w-[150px] h-[44px] bg-[#FFFFFF] border-[1px] border-[#EAECF0] rounded-[8px] flex items-center justify-center transition-transform duration-500 ease-in-out transform z-50 `}
                        >
                            <button
                                onClick={handleSaveExit}
                                className="w-full h-full flex items-center justify-center text-sm font-semibold text-[#1D2939] border-none p-[10px_24px] z-50"
                            >
                                Save and Exit
                            </button>
                        </div>


                    </div>

                    {/* Quiz Content */}
                    <div className="overflow-y-auto p-5 h-full">
                        {/* Your quiz content goes here */}
                        <div className="gap-[20px] flex flex-col">
                            {/* Repeat this block for each question */}
                            <div className="flex items-center justify-center ">
                                <div className="w-[880px] h-auto rounded-[12px] border-2 border-[#EAECF0] flex py-4 flex-col items-center justify-center">
                                    <div className="bg-[#FFFFFF] w-[832px] h-auto flex  flex-col gap-[20px]">
                                        <div className="w-[832px] h-[24px] ">
                                            <span className="text-[#1D2939] font-semibold text-base">
                                                Q1. What is the result of the bitwise AND operation between 1010 and 1100?
                                            </span>
                                        </div>
                                        <div className="w-[168.75px] h-[160px] gap-[20px] flex flex-col">
                                            <div className="w-[168.75px] h-[160px] gap-[15px] flex flex-col mt-4">
                                                <RadioGroup>
                                                    <FormControlLabel
                                                        value="option1"
                                                        control={
                                                            <Radio
                                                                sx={{
                                                                    color: '#D0D5DD',
                                                                    '&.Mui-checked': {
                                                                        color: '#9012FF',
                                                                    },
                                                                }}
                                                            />
                                                        }
                                                        label="Option 1"
                                                    />
                                                    <FormControlLabel
                                                        value="option2"
                                                        control={
                                                            <Radio
                                                                sx={{
                                                                    color: '#D0D5DD',
                                                                    '&.Mui-checked': {
                                                                        color: '#9012FF',
                                                                    },
                                                                }}
                                                            />
                                                        }
                                                        label="Option 2"
                                                    />
                                                    <FormControlLabel
                                                        value="option4"
                                                        control={
                                                            <Radio
                                                                sx={{
                                                                    color: '#D0D5DD',
                                                                    '&.Mui-checked': {
                                                                        color: '#9012FF',
                                                                    },
                                                                }}
                                                            />
                                                        }
                                                        label="Option 4"
                                                    />
                                                    <FormControlLabel
                                                        value="option3"
                                                        control={
                                                            <Radio
                                                                sx={{
                                                                    color: '#D0D5DD',
                                                                    '&.Mui-checked': {
                                                                        color: '#9012FF',
                                                                    },
                                                                }}
                                                            />
                                                        }
                                                        label="Option 3"
                                                    />
                                                </RadioGroup>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="w-[121px] h-10  flex flex-row items-center mt-2"
                                        >
                                            jabir
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="flex items-center justify-center ">
                                <div className="w-[880px] h-[252px] rounded-[12px] border-2 border-[#EAECF0] flex items-center justify-center">
                                    <div className="bg-[#FFFFFF] w-[832px] h-[204px] gap-[20px]">
                                        <div className="w-[832px] h-[24px] gap-[6px] ">
                                            <span className="text-[#1D2939] font-semibold text-base">
                                                Q1. What is the result of the bitwise AND operation between 1010 and 1100?
                                            </span>
                                        </div>
                                        <div className="w-[168.75px] h-[160px] gap-[20px] flex flex-col ">
                                            <div className="w-[168.75px] h-[160px] gap-[15px] flex flex-col mt-4">
                                                <RadioGroup>
                                                    <FormControlLabel
                                                        value="10000"
                                                        control={
                                                            <Radio
                                                                sx={{
                                                                    color: '#D0D5DD',
                                                                    '&.Mui-checked': {
                                                                        color: '#9012FF',
                                                                    },
                                                                }}
                                                            />
                                                        }
                                                        label="10000"
                                                    />
                                                    <FormControlLabel
                                                        value="option2"
                                                        control={
                                                            <Radio
                                                                sx={{
                                                                    color: '#D0D5DD',
                                                                    '&.Mui-checked': {
                                                                        color: '#9012FF',
                                                                    },
                                                                }}
                                                            />
                                                        }
                                                        label="Option 2"
                                                    />
                                                    <FormControlLabel
                                                        value="option4"
                                                        control={
                                                            <Radio
                                                                sx={{
                                                                    color: '#D0D5DD',
                                                                    '&.Mui-checked': {
                                                                        color: '#9012FF',
                                                                    },
                                                                }}
                                                            />
                                                        }
                                                        label="Option 4"
                                                    />
                                                    <FormControlLabel
                                                        value="option3"
                                                        control={
                                                            <Radio
                                                                sx={{
                                                                    color: '#D0D5DD',
                                                                    '&.Mui-checked': {
                                                                        color: '#9012FF',
                                                                    },
                                                                }}
                                                            />
                                                        }
                                                        label="Option 3"
                                                    />
                                                </RadioGroup>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-center ">
                                <div className="w-[880px] h-[252px] rounded-[12px] border-2 border-[#EAECF0] flex items-center justify-center">
                                    <div className="bg-[#FFFFFF] w-[832px] h-[204px] gap-[20px]">
                                        <div className="w-[832px] h-[24px] gap-[6px] ">
                                            <span className="text-[#1D2939] font-semibold text-base">
                                                Q1. What is the result of the bitwise AND operation between 1010 and 1100?
                                            </span>
                                        </div>
                                        <div className="w-[168.75px] h-[160px] gap-[20px] flex flex-col ">
                                            <div className="w-[168.75px] h-[160px] gap-[15px] flex flex-col mt-4">
                                                <RadioGroup>
                                                    <FormControlLabel
                                                        value="10000"
                                                        control={
                                                            <Radio
                                                                sx={{
                                                                    color: '#D0D5DD',
                                                                    '&.Mui-checked': {
                                                                        color: '#9012FF',
                                                                    },
                                                                }}
                                                            />
                                                        }
                                                        label="10000"
                                                    />
                                                    <FormControlLabel
                                                        value="option2"
                                                        control={
                                                            <Radio
                                                                sx={{
                                                                    color: '#D0D5DD',
                                                                    '&.Mui-checked': {
                                                                        color: '#9012FF',
                                                                    },
                                                                }}
                                                            />
                                                        }
                                                        label="Option 2"
                                                    />
                                                    <FormControlLabel
                                                        value="option4"
                                                        control={
                                                            <Radio
                                                                sx={{
                                                                    color: '#D0D5DD',
                                                                    '&.Mui-checked': {
                                                                        color: '#9012FF',
                                                                    },
                                                                }}
                                                            />
                                                        }
                                                        label="Option 4"
                                                    />
                                                    <FormControlLabel
                                                        value="option3"
                                                        control={
                                                            <Radio
                                                                sx={{
                                                                    color: '#D0D5DD',
                                                                    '&.Mui-checked': {
                                                                        color: '#9012FF',
                                                                    },
                                                                }}
                                                            />
                                                        }
                                                        label="Option 3"
                                                    />
                                                </RadioGroup>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* End repeat block */}
                        </div>
                    </div>

                    {/* Bottom Button Section */}
                    <div className="flex flex-row items-center justify-end border-t border-lightGrey p-4">
                        <button className=" border  rounded-lg py-2.5 px-6 text-sm bg-purple text-white border-darkPurple"
                            style={{
                                border: "1px solid #800EE2",
                                boxShadow: "0px -4px 4px 0px #1018281F inset, 0px 3px 2px 0px #FFFFFF3D inset"
                            }}
                            onClick={handleSubmit}>
                            <p>Submit</p>
                        </button>
                    </div>
                </div>
            </Drawer >
            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} className="relative z-50">
                {/* Backdrop */}
                <DialogBackdrop className="fixed inset-0 bg-black/30 " />

                {/* Dialog Wrapper */}
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <DialogPanel transition>
                        <div className="bg-white rounded-2xl p-5 w-[480px] h-[261px]">
                            {/* Header Section */}
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-lg font-bold text-[#1D2939]">Submit Quiz</span>
                                <button onClick={() => setIsDialogOpen(false)}>
                                    <Image src="/icons/cancel.svg" alt="cancel" width={18} height={18} />
                                </button>
                            </div>
                            {/* Content Section */}
                            <div className="flex flex-col gap-4 w-[432px] h-[100px]">
                                <span className="text-sm text-[#667085] font-normal">
                                    Lorem ipsum is a dummy text widely used in the digital industry and will be used here as a preview.
                                </span>
                                <span className="text-sm text-[#667085] font-normal">
                                    Lorem ipsum is a dummy text widely used in the digital industry and will be used here as a preview.
                                </span>
                            </div>
                            {/* Buttons */}
                            <div className="border-t border-[#EAECF0] w-full h-[76px] mt-5 flex justify-end gap-2">
                                <div className="mt-5">
                                    <button
                                        className="bg-[#FFFFFF] text-[#1D2939] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px]"
                                        style={{ border: "1.5px solid #EAECF0" }}
                                        onClick={() => setIsDialogOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                                <div className="mt-5">
                                    <button
                                        onClick={() => {
                                            handleDialogSubmit();
                                            onSubmit();
                                        }}
                                        className="bg-[#8501FF] text-[#FFFFFF] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px]"
                                        style={{
                                            border: "1px solid #800EE2",
                                            boxShadow: "0px -4px 4px 0px #1018281F inset, 0px 3px 2px 0px #FFFFFF3D inset",
                                        }}
                                    >
                                        Submit
                                    </button>
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



