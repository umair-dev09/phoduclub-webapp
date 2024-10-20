'use client';

import React, { useRef, useState } from "react";

const AdminVerify: React.FC = () => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [inputValues, setInputValues] = useState<string[]>(Array(6).fill(""));

    // Function to handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;

        // Clone the input values state and update the current value
        const newInputValues = [...inputValues];
        newInputValues[index] = value;
        setInputValues(newInputValues);

        // Find the first empty input
        const firstEmptyIndex = inputRefs.current.findIndex(input => input?.value === "");

        // Prevent typing in any input that isn't the first empty one
        if (firstEmptyIndex !== index && value.length === 1) {
            inputRefs.current[firstEmptyIndex]?.focus();
            return;
        }

        if (value.length === 1 && index < inputRefs.current.length - 1) {
            // Move to the next input when a character is entered
            inputRefs.current[index + 1]?.focus();
        }

        if (value === "" && index > 0) {
            // Move to the previous input when backspace is pressed
            inputRefs.current[index - 1]?.focus();
        }
    };

    // Check if all inputs are filled
    const isAllFilled = inputValues.every((value) => value !== "");

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row gap-0 text-xl font-extrabold mb-8">
                <p className="text-[#0E2138]">phodu</p>
                <p className="text-[#E39FF6]">.club</p>
            </div>
            <h3 className="text-2xl font-bold mb-5">Verification Code</h3>
            <p className="text-center font-medium text-[#667085] w-[19.563rem] mb-5">
                Please enter the verification code we sent to your mobile 99*****99
                <button className="text-[#9012FF] ml-2">Edit</button>
            </p>
            <div className="flex flex-row gap-3 mb-10">
                {[...Array(6)].map((_, index) => (
                    <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        className="w-16 h-16 border border-gray-300 rounded-lg py-1 px-2 text-center text-4xl font-semibold text-[#0E2138] placeholder-gray-400 focus:border-[#8601FF] focus:outline-none focus:ring-4 focus:ring-[#D3A7FC]"
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        placeholder="-"
                        value={inputValues[index]}
                        onChange={(e) => handleInputChange(e, index)}
                    />
                ))}
            </div>
            <button
                className={`w-[24.688rem] border-b shadow-inner-button rounded-md text-white text-sm font-semibold py-[0.625rem] transition-colors ${isAllFilled ? 'bg-[#8601FF] border-[#8601FF]' : 'bg-[#D3A7FC] border-[#D3A7FC] cursor-not-allowed'}`}
                disabled={!isAllFilled}
            >
                Done
            </button>
        </div>
    );
}

export default AdminVerify;
