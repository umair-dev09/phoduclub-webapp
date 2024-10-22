"use client";
import Image from "next/image";
import { SetStateAction, useState } from "react";
import { PopoverContent, PopoverTrigger, Popover } from '@nextui-org/popover';

function Questions() {
    const [isChecked, setIsChecked] = useState(false);
    const [question, setQuestion] = useState('');

    const handleInputChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setQuestion(e.target.value); // Update the state with the input value
    };

    const handleCheckboxChange = () => {
        setIsChecked(prev => !prev); // Toggle the checkbox state
    };
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const options = ['A. 1000', 'B. 2000', 'C. 3000', 'D. 4000'];

    return (
        <div className='mt-2 h-auto rounded-md border border-solid border-[#EAECF0] bg-[#FFFFFF] flex flex-col p-5 gap-2 mb-3'>
            <div className="h-auto  flex flex-row justify-between ">
                <div className="flex gap-2">
                    <span>1</span>
                    <span className="font-semibold text-base text-[#1D2939]">{question || "Questions"}</span> {/* Display the question or default text */}

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
                    className="font-normal pl-3 text-[#667085] text-sm placeholder:text-[#A1A1A1] rounded-md 
                        focus:outline-none focus:ring-0 
                        border border-solid border-[#D0D5DD] h-[40px] 
                        shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] 
                        transition duration-200 ease-in-out 
                        focus:border-[#D6BBFB] 
                        focus:shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]
                        focus:text-[#1D2939]
                        focus:font-medium"
                    placeholder="Enter questions"
                    type="text"
                    value={question} // Bind the input value to the state
                    onChange={handleInputChange} // Update state on input change
                />

            </div>
            <div className="flex flex-row gap-2">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <span className="font-medium text-sm text-[#182230]">Upload image (optional)</span>
            </div>

            {isChecked && ( // Conditionally render the upload div based on isChecked
                <div className="h-36 rounded-xl bg-[#F9FAFB] border-2 border-dashed border-[#D0D5DD]">
                    <div className="flex flex-col items-center justify-center gap-4 h-full w-full">
                        <div className="flex flex-col items-center">
                            <div className="h-10 w-10 rounded-md border border-solid border-[#EAECF0] bg-[#FFFFFF] p-[10px] shadow-[0px_1px_2px_0px_#1018280D]">
                                <Image
                                    src="/icons/upload-cloud.svg"
                                    width={20}
                                    height={20}
                                    alt="upload icon"
                                />
                            </div>
                        </div>
                        <span className="text-sm font-semibold text-[#9012FF]">
                            Click to upload <span className="text-[#182230] text-sm font-medium">or drag and drop</span>
                        </span>
                    </div>
                </div>
            )}
            <span className="font-semibold text-base text-[#1D2939]">options</span>
            <div className="flex flex-col gap-3">
                <div className="flex flex-row gap-2">
                    <div className="h-8 w-8 bg-[#F9FAFB] border border-solid border-[#D0D5DD] rounded-[6px]">
                        <span className="text-[#475467] text-sm font-medium flex justify-center items-center h-full w-full">A</span>
                    </div>
                    <Image
                        src="/icons/three-double-dots.svg"
                        width={20}
                        height={20}
                        alt="Three-dots"
                    />

                    <input
                        className="font-normal pl-3 text-[#1D2939] text-sm placeholder:text-[#A1A1A1] rounded-md w-full
                        focus:outline-none focus:ring-0 
                        border border-solid border-[#D0D5DD] h-[40px] 
                        shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] 
                        transition duration-200 ease-in-out 
                        focus:border-[#D6BBFB] 
                        focus:shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]
                        focus:text-[#1D2939]
                        focus:font-medium"
                        placeholder="Option 1"
                        type="text"
                    />
                </div>
                <div className="flex flex-row gap-2">
                    <div className="h-8 w-8 bg-[#F9FAFB] border border-solid border-[#D0D5DD] rounded-[6px]">
                        <span className="text-[#475467] text-sm font-medium flex justify-center items-center h-full w-full">B</span>
                    </div>
                    <Image
                        src="/icons/three-double-dots.svg"
                        width={20}
                        height={20}
                        alt="Three-dots"
                    />

                    <input
                        className="font-normal pl-3 text-[#1D2939] text-sm placeholder:text-[#A1A1A1] rounded-md w-full
                        focus:outline-none focus:ring-0 
                        border border-solid border-[#D0D5DD] h-[40px] 
                        shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] 
                        transition duration-200 ease-in-out 
                        focus:border-[#D6BBFB] 
                        focus:shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]
                        focus:text-[#1D2939]
                        focus:font-medium"
                        placeholder="Option 1"
                        type="text"
                    />
                </div>
                <div className="flex flex-row gap-2">
                    <div className="h-8 w-8 bg-[#F9FAFB] border border-solid border-[#D0D5DD] rounded-[6px]">
                        <span className="text-[#475467] text-sm font-medium flex justify-center items-center h-full w-full">C</span>
                    </div>
                    <Image
                        src="/icons/three-double-dots.svg"
                        width={20}
                        height={20}
                        alt="Three-dots"
                    />

                    <input
                        className="font-normal pl-3 text-[#1D2939] text-sm placeholder:text-[#A1A1A1] rounded-md w-full
                        focus:outline-none focus:ring-0 
                        border border-solid border-[#D0D5DD] h-[40px] 
                        shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] 
                        transition duration-200 ease-in-out 
                        focus:border-[#D6BBFB] 
                        focus:shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]
                        focus:text-[#1D2939]
                        focus:font-medium"
                        placeholder="Option 1"
                        type="text"
                    />
                </div>
                <div className="flex flex-row gap-2">
                    <div className="h-8 w-8 bg-[#F9FAFB] border border-solid border-[#D0D5DD] rounded-[6px]">
                        <span className="text-[#475467] text-sm font-medium flex justify-center items-center h-full w-full">D</span>
                    </div>
                    <Image
                        src="/icons/three-double-dots.svg"
                        width={20}
                        height={20}
                        alt="Three-dots"
                    />

                    <input
                        className="font-normal pl-3 text-[#1D2939] text-sm placeholder:text-[#A1A1A1] rounded-md w-full
                        focus:outline-none focus:ring-0 
                        border border-solid border-[#D0D5DD] h-[40px] 
                        shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] 
                        transition duration-200 ease-in-out 
                        focus:border-[#D6BBFB] 
                        focus:shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]
                        focus:text-[#1D2939]
                        focus:font-medium"
                        placeholder="Option 1"
                        type="text"
                    />
                </div>


            </div>
            <span className="font-semibold text-base text-[#1D2939]">Correct answer</span>

            <Popover placement="top">
                <PopoverTrigger>
                    <button className="h-[40px] px-3 items-center w-full justify-between flex flex-row border border-solid border-[#D0D5DD] bg-[#FFFFFF] rounded-md">
                        <span className="font-normal text-sm text-[#667085] flex items-center">Select correct answer</span>
                        <Image
                            src="/icons/arrowup.svg"
                            width={24}
                            height={24}
                            alt="Arrow-down"
                        />
                    </button>
                </PopoverTrigger>
                <PopoverContent>
                    <div
                        className="flex-grow h-[168px] rounded-md border border-solid border-[#EAECF0] bg-[#FFFFFF] flex flex-col pt-[8px]"
                        style={{
                            boxShadow: '0px 4px 6px -2px rgba(16, 24, 40, 0.05), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)',
                        }}
                    >
                        {options.map((item, index) => (
                            <div
                                key={index}
                                className={`flex flex-row justify-between w-full h-[40px] items-center hover:bg-[#F2F4F7] px-2 ${index === options.length - 1 ? 'rounded-bl-md rounded-br-md' : ''}`}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                <span className="font-normal text-[#0C111D] text-sm">{item}</span>
                                <div className="relative">
                                    <Image
                                        src="/icons/tick-02.svg"
                                        width={18}
                                        height={18}
                                        alt="right mark"
                                        className={`transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>




        </div>

    )
}
export default Questions;