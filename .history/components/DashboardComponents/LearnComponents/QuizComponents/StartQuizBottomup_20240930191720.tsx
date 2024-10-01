"use client";
import Image from "next/image";
import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

// Define the props interface
interface AppProps {
    isOpen: boolean;           // isOpen should be a boolean
    toggleDrawer: () => void;  // toggleDrawer is a function that returns void
}

const App: React.FC<AppProps> = ({ isOpen, toggleDrawer }) => {
    return (
        <>
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction="bottom"
                className="rounded-tl-md rounded-tr-md"
                style={{ height: "98vh" }}
            >
                {/* Drawer content goes here */}
                <div className="overflow-y-auto flex  h-auto flex-col">
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
                                onClick={toggleDrawer}
                                className="w-full h-full flex items-center justify-center text-sm font-semibold text-[#1D2939] border-none p-[10px_24px] z-50"
                            >
                                Save and Exit
                            </button>
                        </div>


                    </div>

                    {/* Quiz Content */}
                    <div className="overflow-y-auto p-5">
                        {/* Your quiz content goes here */}
                        <div className="gap-[20px] flex flex-col">
                            {/* Repeat this block for each question */}
                            <div className="flex items-center justify-center ">
                                <div className="w-[880px] h-[252px] rounded-[12px] border-2 border-[#EAECF0] flex items-center justify-center">
                                    <div className="bg-[#FFFFFF] w-[832px] h-[204px] gap-[20px]">
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
                    <div className="flex flex-row items-center justify-end border-t border-lightGrey">
                        <button className="mr-6 ml-2.5 border rounded-lg py-2.5 px-6 text-sm bg-purple text-white border-darkPurple">
                            <p>Submit</p>
                        </button>
                    </div>

                </div>
            </Drawer>
        </>
    );
};

export default App;
