"use client";
import Select, { SingleValue } from 'react-select';
import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React from "react";

type Option = {
    value: string;
    label: string;
};

function HelpDropDown() {

    const [uniqueID, setUniqueID] = useState('');
    const [reasonText, setReasonText] = useState("");  // State to track textarea value


    const SelectCategory: Option[] = [
        { value: 'Course related', label: 'Course related' },
        { value: 'Test series related', label: 'Test series related' },
        { value: 'Analytics related', label: 'Analytics related' },
        { value: 'Payment related', label: 'Payment related' },
    ];
    const [selectcategory, setselectcategory] = useState<SingleValue<Option>>(null);
    type CustomState = {
        isSelected: boolean;
        isFocused: boolean;
    };
    // --------------------------------------------------------------------------------------------
    const [open1, setOpen1] = useState(false);  // Initial state for the first dialog
    const [open2, setOpen2] = useState(false);  // Initial state for the second dialog
    const handleOpen = () => setOpen1(true);

    const openanotherdialog = () => {
        setOpen1(false);  // Close first dialog
        setOpen2(true);   // Open second dialog
    };

    const handleCloseAll = () => {
        setOpen1(false);
        setOpen2(false);
    };
    return (
        <div>
            {/* Trigger Button */}
            <div className="mx-2">
                <button
                    className="w-[32px] h-[32px] bg-[#F7F8FA] border-[1.5px] border-[#EAECF0] rounded-full flex items-center justify-center transition-all duration-200 hover:bg-[#F2F4F7]"
                    onClick={handleOpen}  // Corrected to open first dialog
                >
                    <Image
                        src="/icons/help-circle.svg"
                        width={16}
                        height={16}
                        alt="Help Icon"
                    />
                </button>
            </div>

            {/* Dialog Component */}
            <Dialog open={open1} onClose={handleCloseAll} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 flex items-center justify-center">
                    <DialogPanel className="bg-white rounded-2xl w-[480px] h-auto flex flex-col">
                        <div className="flex flex-col p-4 px-6 gap-3 border-solid border-[#EAECF0] border-b rounded-t-2xl">
                            <div className="flex flex-row justify-between items-center">
                                <h1 className="text-[#1D2939] font-bold text-lg">
                                    Support
                                </h1>
                                <div className='w-10 h-10 hover:rounded-full hover:bg-[#f0f0f0] flex items-center justify-center'>
                                    <Image
                                        src="/icons/cancel.svg"
                                        alt="Cancel"
                                        width={20}
                                        height={20}
                                        onClick={handleCloseAll}
                                    />
                                </div>

                            </div>
                            <span className="font-normal text-sm text-[#667085]">
                                Lorem ipsum is a dummy text widely used in digital industry will be used here in as a preview
                            </span>
                        </div>
                        <div className='w-full border-solid border-[#EAECF0] border-b flex flex-col p-6 gap-3'>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="Select-Category" className='mb-1 font-medium  text-[#1D2939] text-sm'>Select Category</label>
                                <Select
                                    id="Select-Category"
                                    value={selectcategory}
                                    onChange={(selectedOption) => {
                                        setselectcategory(selectedOption);        // Set the selected category
                                        setUniqueID(selectedOption?.value || ""); // Set uniqueID to the selected value
                                    }}
                                    options={SelectCategory}
                                    placeholder="Select Category"
                                    className='placeholder:text-[#667085] placeholder:text-sm placeholder:font-normal'
                                    styles={{
                                        option: (provided, state: CustomState) => ({
                                            ...provided,
                                            color: 'black',
                                            backgroundColor: state.isFocused ? '#E39FF6' : 'white', // Purple color when focused
                                        }),
                                        singleValue: (provided) => ({
                                            ...provided,
                                            color: '#0C111D',
                                            fontWeight: '500'
                                        }),
                                        control: (provided) => ({
                                            ...provided,
                                            border: '1px solid #e6e6e6',
                                            borderRadius: '8px',
                                            padding: '4px',
                                            boxShadow: 'none',
                                            '&:hover': {
                                                outline: '1px solid #e5a1f5',
                                            },
                                        }),

                                    }}
                                />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="target-year" className='mb-1 font-medium text-sm text-[#1D2939]'>Reason</label>
                                <div
                                    className={`rounded-md border border-solid ${reasonText.trim() !== "" ? "border-[#D6BBFB]" : "border-[#D0D5DD]"
                                        } h-[160px]`}
                                    style={{
                                        boxShadow:
                                            reasonText.trim() !== ""
                                                ? "0px 1px 2px 0px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px rgba(158, 119, 237, 0.12)"
                                                : "none", // No shadow if reasonText is empty
                                    }}
                                >
                                    <textarea
                                        placeholder="Write a message"
                                        className="outline-none placeholder-[#667085] text-sm font-normal w-full h-full p-2 resize-none rounded-md text-[#182230]"
                                        value={reasonText}                     // Bind textarea to state
                                        onChange={(e) => {
                                            setReasonText(e.target.value);
                                            setUniqueID(e.target.value);
                                        }}

                                    />
                                </div>
                            </div>


                        </div>
                        <div className="flex flex-row justify-end mx-6 my-4 gap-4">
                            <button
                                className="py-[0.625rem] px-6 border-2 border-solid border-[#EAECF0] font-semibold text-sm text-[#1D2939] rounded-md hover:bg-[#f0f0f0]"
                                onClick={handleCloseAll}
                            >
                                Cancel
                            </button>
                            <button
                                className={`py-[0.625rem] px-6 text-white text-sm shadow-inner-button font-semibold ${uniqueID
                                    ? "bg-[#9012FF] border border-solid border-[#9012FF]"
                                    : "bg-[#CDA0FC] cursor-not-allowed"
                                    } rounded-md`}
                                onClick={openanotherdialog}
                                disabled={!selectcategory || reasonText.trim() === ""}


                            >
                                Submit report
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
            <Dialog open={open2} onClose={handleCloseAll} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 flex items-center justify-center">
                    <DialogPanel className="bg-white rounded-2xl w-[480px] h-auto flex flex-col ">
                        <div className=' flex flex-col p-6 gap-3 border-solid border-[#EAECF0] border-b rounded-t-2xl'>
                            <div className='flex flex-row justify-between items-center'>
                                <h1 className='text-[#1D2939] font-bold text-lg'>Thank you for reporting</h1>
                                <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} onClick={handleCloseAll} />
                            </div>
                            <span className="font-normal text-sm text-[#667085]">Lorem ipsum is a dummy text widely used in digital industry will be used here in as a preview</span>
                        </div>
                        <div className="flex flex-row justify-end mx-6 my-4 ">
                            <button className={`py-[0.625rem] w-[103px] px-6 text-white text-sm shadow-inner-button font-semibold bg-[#9012FF] rounded-md`} onClick={handleCloseAll}>Ok</button>
                        </div>
                    </DialogPanel>
                </div >
            </Dialog >
        </div>
    );
}

export default HelpDropDown;
