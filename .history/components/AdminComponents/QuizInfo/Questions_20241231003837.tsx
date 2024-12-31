import Collapsible from "react-collapsible";
import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Image from "next/image";

type Options = {
    A: string;
    B: string;
    C: string;
    D: string;
}

type Question = {
    question: string;
    correctAnswer: string;
    answerExplanation: string;
    options: Options;
    questionId: string;
}

type QuestionProps = {
    questionsList: Question[];
}

function Question({ questionsList }: QuestionProps) {
    const [expandedStates, setExpandedStates] = useState(
        Array(questionsList.length).fill(false)
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

    // Sort options to ensure order is A, B, C, D
    const sortedOptions = (options: Options) => {
        return ['A', 'B', 'C', 'D'].map((key) => ({
            key: key as keyof Options, // Cast key to 'keyof Options'
            value: options[key as keyof Options], // Ensure key is valid for Options
        }));
    };
    // Initialize all accordions to expanded state when the component mounts
    // useEffect(() => {
    //     setExpandedStates(Array(questionsList.length).fill(false)); // All expanded initially
    // }, [questionsList]);

    return (
        <>
            <div className="flex flex-row mt-3 w-full h-[40px] justify-between items-center">
                <span className="font-semibold text-lg text-[#1D2939]">Questions({questionsList?.length})</span>
                <button className="flex flex-row gap-1 h-[40px] items-center px-3" onClick={toggleExpandAll}>
                    {areAllExpanded ? (
                        <Image src="/icons/collaspe-all.svg" width={18} height={18} alt="collapse all icon" />
                    ) : (
                        <Image src="/icons/expandall.svg" width={18} height={18} alt="expand all icon" />
                    )}
                    <span className="font-normal text-[#475467] text-sm">
                        {areAllExpanded ? "Collapse all" : "Expand all"}
                    </span>
                </button>
            </div>
            <div className="flex flex-col gap-2 mt-3">
                {questionsList.map((question, index) => (
                    <div
                        key={index}
                        className={`bg-[#FFFFFF] h-auto rounded-xl border border-solid ${expandedStates[index] ? "border-[#EAECF0] hover:border-[#9012FF]" : "border-[#EAECF0] hover:border-[#bbbbbb]"}`}
                    >
                        <Collapsible
                            open={expandedStates[index]}
                            trigger={
                                <div className="h-auto flex flex-row gap-3 p-6" onClick={() => toggleAccordion(index)}>
                                    <div className="h-6 w-6 rounded-[4px] bg-[#EAECF0] flex justify-center">
                                        <span className="text-[#1D2939] font-semibold text-base">
                                            {index + 1}
                                        </span>
                                    </div>
                                    <span className="font-semibold text-base text-[#1D2939]"
                                        dangerouslySetInnerHTML={{
                                            __html: (question?.question || ''),
                                        }}>
                                    </span>
                                </div>
                            }
                        >
                            <RadioGroup className="ml-6 mb-2" value={question.correctAnswer}>
                                {sortedOptions(question.options).map(({ key, value }) => (
                                    <FormControlLabel
                                        key={key}
                                        value={key}
                                        control={
                                            <Radio
                                                checked={question.correctAnswer === key}
                                                sx={{
                                                    color: '#D0D5DD',
                                                    '&.Mui-checked': {
                                                        color: '#0B9055',
                                                    },
                                                }}
                                            />
                                        }
                                        label={<h3 className="text-base font-normal">{value}</h3>}
                                    />
                                ))}
                            </RadioGroup>
                        </Collapsible>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Question;
