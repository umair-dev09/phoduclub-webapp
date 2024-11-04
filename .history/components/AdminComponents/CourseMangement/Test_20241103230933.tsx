import Image from "next/image";
import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
// Define the props interface
interface TestProps {
    isOpen: boolean;           // isOpen should be a boolean
    toggleDrawer: () => void;  // toggleDrawer is a function that returns void
}
function Test({ isOpen, toggleDrawer }: TestProps) {

    return (
        <div>
            <Drawer
                open={isOpen}

                direction="bottom"
                className="rounded-tl-md rounded-tr-md "
                style={{ height: "98vh" }}
            >
                {/* Drawer content goes here */}
                <div className="flex flex-col h-full"> {/* Change 1: Wrap everything in a flex column container */}
                    {/* Top Section - Fixed */}
                    <div className="p-5 flex justify-between items-center h-[69px] w-full border-b-[1.5px] border-t-[1.5px] border-[#EAECF0] rounded-tl-[18px] rounded-tr-[16px]">
                        <span className="text-lg font-semibold text-[#1D2939]">Lesson</span>
                        <div className={`w-[150px] h-[44px]  rounded-[8px] flex items-center justify-center flex-row gap-2  `}>
                            <button
                                onClick={toggleDrawer}
                                className="w-[103px] h-[40px] flex items-center justify-center text-sm  border border-solid border-[#EAECF0] font-semibold text-[#1D2939] rounded-[8px] p-4 ">
                                Cancel
                            </button>
                            <button
                                onClick={toggleDrawer}
                                className="w-[88px] h-[40px] flex items-center justify-center text-sm shadow-inner-button bg-[#8501FF] border border-solid border-[#9012FF] font-semibold text-[#FFFFFF] rounded-md p-4 ">
                                Save
                            </button>
                        </div>
                    </div>

                    {/* Quiz Content */}


                </div>
            </Drawer>
        </div>
    )
}
export default Test;