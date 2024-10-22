"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from "next/image";
function Questions() {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null); // Correctly type the ref

    useEffect(() => {
        if (inputRef.current) {
            // Reset the height first to prevent growing indefinitely
            inputRef.current.style.height = '40px';
            inputRef.current.style.height = inputRef.current.scrollHeight + 'px'; // Adjust height based on scroll height
        }
    }, [inputValue]);
    return (
        <div className='mt-2 h-auto rounded-md border border-solid border-[#EAECF0] bg-[#FFFFFF] flex flex-col p-5 gap-2'>
            <div className="h-auto  flex flex-row justify-between ">
                <div className="flex gap-2">
                    <span>1</span>
                    <span>Questions</span>

                </div>
                <Image
                    src="/icons/three-dots.svg"
                    width={20}
                    height={20}
                    alt="Three-dots"
                />

            </div>
            <div className="flex flex-col gap-2">
                <span className="font-semibold text-base text-[#1D2939]">Questions</span>
                <input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="font-normal pl-3 text-[#667085] text-sm placeholder:text-[#A1A1A1] rounded-md 
                focus:outline-none focus:ring-0 
                border border-solid border-[#D0D5DD] h-[40px] 
                shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] 
                transition duration-200 ease-in-out 
                focus:border-[#D6BBFB] 
                focus:shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]
                focus:text-[#1D2939]
                focus:font-medium 
                overflow-hidden resize-none"
                    placeholder="Enter questions"
                    type="text"
                    style={{ height: '40px' }} // Set initial height
                />

            </div>

        </div>

    )
}
export default Questions;