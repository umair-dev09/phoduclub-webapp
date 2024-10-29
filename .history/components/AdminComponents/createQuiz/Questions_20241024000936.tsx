"use client";
import Image from "next/image";
import { useState } from "react";
import { PopoverContent, PopoverTrigger, Popover } from '@nextui-org/popover';
import Collapsible from 'react-collapsible';

function Questions() {
    // Define the Question type to include isActive
    interface Question {
        question: string;
        isChecked: boolean;
        isActive: boolean;
    }

    const [questionsList, setQuestionsList] = useState<Question[]>([ // Specify the type of questionsList
        {
            question: '',
            isChecked: false,
            isActive: false,
        },
    ]);

    const [activeQuestionIndex, setActiveQuestionIndex] = useState<number | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [options, setOptions] = useState<{ [key: string]: string }>({ A: '', B: '', C: '', D: '' });

    const handleInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuestionsList = [...questionsList];
        newQuestionsList[index].question = e.target.value;
        setQuestionsList(newQuestionsList);
    };

    const handleCheckboxChange = (index: number) => {
        const newQuestionsList = [...questionsList];
        newQuestionsList[index].isChecked = !newQuestionsList[index].isChecked;
        setQuestionsList(newQuestionsList);
    };

    const handleAddQuestion = () => {
        setQuestionsList((prevQuestionsList) => [
            ...prevQuestionsList,
            {
                question: '',
                isChecked: false,
                isActive: false,
            },
        ]);
    };

    const handleDeleteQuestion = (index: number) => {
        const newQuestionsList = [...questionsList];
        newQuestionsList.splice(index, 1);
        setQuestionsList(newQuestionsList);
    };

    const handlePopoverToggle = (index: number) => {
        setActiveQuestionIndex(activeQuestionIndex === index ? null : index);
    };

    const handleOptionChange = (optionKey: string, value: string) => {
        setOptions((prevOptions) => ({ ...prevOptions, [optionKey]: value }));
    };

    return (
        <div className="pb-4 h-auto">
            {questionsList.map((q, index) => (
                <div className="rounded-md border border-solid border-[#EAECF0] mt-4 h-auto bg-[#FFFFFF]">
                    <Collapsible
                        key={index}
                        trigger={
                            <div className='h-auto bg-[#FFFFFF] flex flex-col p-5 gap-2 rounded-md'>
                                <div className="h-auto flex flex-row justify-between">
                                    <div className="flex gap-2">
                                        <div className="h-6 w-6 rounded-[4px] bg-[#EAECF0] flex justify-center">
                                            <span className="text-[#1D2939] font-semibold text-base">{index + 1}</span>
                                        </div>
                                        <span className="font-semibold text-base text-[#1D2939]">
                                            {q.question || "Questions"}
                                        </span>
                                    </div>
                                    <Popover placement="bottom-end">
                                        <PopoverTrigger>
                                            <button>
                                                <Image
                                                    src="/icons/three-dots.svg"
                                                    width={20}
                                                    height={20}
                                                    alt="Three-dots"
                                                />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <div
                                                className="h-[88px] w-[167px] border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-md flex flex-col py-[4px]"
                                                style={{
                                                    boxShadow: '0px 4px 6px -2px #10182808, 0px 12px 16px -4px #10182814',
                                                }}
                                            >
                                                <button
                                                    className="flex flex-row h-[40px] w-full px-3 gap-2 hover:bg-[#F2F4F7] items-center"
                                                    onClick={handleAddQuestion}
                                                >
                                                    <Image
                                                        src="/icons/duplicate.svg"
                                                        width={18}
                                                        height={18}
                                                        alt="Duplicate"
                                                    />
                                                    <span className="text-[#0C111D] text-sm font-medium">Duplicate</span>
                                                </button>
                                                <button className="flex flex-row h-[40px] w-full px-3 gap-2 hover:bg-[#F2F4F7] items-center"
                                                    onClick={() => handleDeleteQuestion(index)}>
                                                    <Image
                                                        src="/icons/delete.svg"
                                                        width={18}
                                                        height={18}
                                                        alt="Delete"
                                                    />
                                                    <span className="text-[#DE3024] text-sm font-medium">Delete</span>
                                                </button>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                        }
                    >
                        <div className='h-auto bg-[#FFFFFF] flex flex-col pb-5 px-5 gap-2 rounded-br-md rounded-bl-md '>
                            <div className="flex flex-col gap-2">
                                <span className="font-semibold text-base text-[#1D2939]">Questions</span>
                                <input
                                    className="font-medium pl-3 text-[#101828] text-sm placeholder:text-[#A1A1A1] rounded-md placeholder:font-normal
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
                                    value={q.question}
                                    onChange={(e) => handleInputChange(index, e)}
                                />
                            </div>
                            <div className="flex flex-row gap-2">
                                <input
                                    type="checkbox"
                                    checked={q.isChecked}
                                    onChange={() => handleCheckboxChange(index)}
                                />
                                <span className="font-medium text-sm text-[#182230]">Upload image (optional)</span>
                            </div>

                            {q.isChecked && (
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
                            <span className="font-semibold text-base text-[#1D2939]">Options</span>
                            <div className="flex flex-col gap-3">
                                {['A', 'B', 'C', 'D'].map((optionKey, index) => (
                                    <div key={index} className="flex flex-row gap-2">
                                        <div className="h-8 w-8 bg-[#F9FAFB] border border-solid border-[#D0D5DD] rounded-[6px]">
                                            <span className="text-[#475467] text-sm font-medium flex justify-center items-center h-full w-full">
                                                {optionKey}
                                            </span>
                                        </div>
                                        <input
                                            className="font-medium pl-3 text-[#101828] text-sm placeholder:text-[#A1A1A1] rounded-md w-full placeholder:font-normal
                                                focus:outline-none focus:ring-0 border border-solid border-[#D0D5DD] h-[40px] 
                                                shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition duration-200 ease-in-out 
                                                focus:border-[#D6BBFB] focus:shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)] focus:text-[#1D2939] focus:font-medium"
                                            placeholder={`Option ${index + 1}`} // Corrected the placeholder to use template literal
                                            value={options[optionKey]}
                                            onChange={(e) => handleOptionChange(optionKey, e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Collapsible>
                </div>
            ))}
        </div>
    );
}

export default Questions;
