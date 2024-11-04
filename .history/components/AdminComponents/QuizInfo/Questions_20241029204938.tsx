import Collapsible from "react-collapsible";
import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Image from "next/image";
function Question() {
    const questionCount = 2; // Adjust this if you have more questions
    const [expandedStates, setExpandedStates] = useState(
        Array(questionCount).fill(false)
    );

    // Toggle expand/collapse for all accordions
    const toggleExpandAll = () => {
        const areAllExpanded = expandedStates.every((state) => state);
        const newStates = expandedStates.map(() => !areAllExpanded);
        setExpandedStates(newStates);
    };

    // Toggle individual accordion
    const toggleAccordion = (index: number) => {
        const newStates = [...expandedStates];
        newStates[index] = !newStates[index];
        setExpandedStates(newStates);
    };
    // Check if all are expanded
    const areAllExpanded = expandedStates.every((state) => state);
    return (
        <>
            <div className="flex flex-row mt-3 w-full h-[40px] justify-between items-center">
                <span className="font-semibold text-lg text-[#1D2939]">Questions({questionCount})</span>
                <button className="flex flex-row gap-1 h-[40px] items-center px-3" onClick={toggleExpandAll}>
                    {areAllExpanded ? (<Image src="/icons/collaspe-all.svg" width={18} height={18} alt="collaspe all icon" />) : (<Image src="/icons/expandall.svg" width={18} height={18} alt="Expand all icon" />)}



                    <span className="font-normal text-[#475467] text-sm">
                        {areAllExpanded ? "Collapse all" : "Expand all"}
                    </span>
                </button>
            </div>
            <div className="flex flex-col gap-2 mt-3">
                {[...Array(questionCount)].map((_, index) => (
                    <div
                        key={index}
                        className={`bg-[#FFFFFF] h-auto rounded-xl border border-solid ${expandedStates[index] ? "border-[#EAECF0] hover:border-[#9012FF]" : "border-[#EAECF0] hover:border-[#182230]"
                            }`}
                    >

                        <Collapsible
                            open={expandedStates[index]}
                            trigger={
                                <div
                                    className="h-auto flex flex-row gap-3 p-6"
                                    onClick={() => toggleAccordion(index)}
                                >
                                    <div className="h-6 w-6 rounded-[4px] bg-[#EAECF0] flex justify-center">
                                        <span className="text-[#1D2939] font-semibold text-base">
                                            {index + 1}
                                        </span>
                                    </div>
                                    <span className="font-semibold text-base text-[#1D2939]">
                                        Question {index + 1} content goes here.
                                    </span>
                                </div>
                            }
                        >
                            <div className="h-auto gap-[15px] flex flex-col px-6 pb-[8px] hover:border-[#9012FF]">
                                <RadioGroup>
                                    <FormControlLabel
                                        value="option1"
                                        control={<Radio sx={{ color: '#D0D5DD', '&.Mui-checked': { color: '#9012FF' } }} />}
                                        label="Option 1"
                                    />
                                    <FormControlLabel
                                        value="option2"
                                        control={<Radio sx={{ color: '#D0D5DD', '&.Mui-checked': { color: '#9012FF' } }} />}
                                        label="Option 2"
                                    />
                                    <FormControlLabel
                                        value="option4"
                                        control={<Radio sx={{ color: '#D0D5DD', '&.Mui-checked': { color: '#9012FF' } }} />}
                                        label="Option 4"
                                    />
                                    <FormControlLabel
                                        value="option3"
                                        control={<Radio sx={{ color: '#D0D5DD', '&.Mui-checked': { color: '#9012FF' } }} />}
                                        label="Option 3"
                                    />
                                </RadioGroup>
                            </div>
                        </Collapsible>
                    </div>
                ))}
            </div>
        </>

    )
}
export default Question;