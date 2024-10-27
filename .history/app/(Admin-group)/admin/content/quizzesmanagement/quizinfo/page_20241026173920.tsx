// "use client";
// import Image from "next/image";
// import Collapsible from 'react-collapsible';
// import React, { useState } from 'react';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// function Quizinfo() {

//     return (
//         <div className="flex  w-full h-auto overflow-y-auto flex-col p-8">
//             <div className="w-full  h-auto  flex flex-col border-b border-solid border-[#D0D5DD] pb-2">
//                 <div className="flex flex-row justify-between">
//                     <div className="flex flex-row gap-3 py-1">
//                         <span className="text-[#1D2939] text-2xl font-semibold">Maths</span>
//                         <Image
//                             src="/icons/saved.svg"
//                             width={74}
//                             height={24}
//                             alt="saved "
//                         />
//                     </div>
//                     <div className="flex flex-row gap-1">
//                         {/* Publish Quiz Button */}
//                         <button className=" w-auto p-3 gap-2 flex-row flex ">
//                             <Image
//                                 src="/icons/publish-quiz.svg"
//                                 width={18}
//                                 height={18}
//                                 alt="publish-quiz" />
//                             <span className="text-sm text-[#0C111D] font-normal">Publish Quiz</span>
//                         </button>
//                         {/* Edit Quiz Button */}
//                         <button className=" w-auto p-3 gap-2 flex-row flex ">
//                             <Image
//                                 src="/icons/edit-icon.svg"
//                                 width={18}
//                                 height={18}
//                                 alt="Edit-quiz" />
//                             <span className="text-sm text-[#0C111D] font-normal">Edit Quiz</span>
//                         </button>
//                         {/* Delete Quiz Button */}
//                         <button className=" w-auto p-3 gap-2 flex-row flex ">
//                             <Image
//                                 src="/icons/delete.svg"
//                                 width={18}
//                                 height={18}
//                                 alt="delete-quiz" />
//                             <span className="text-sm text-[#DE3024] font-normal">Delete Quiz</span>
//                         </button>
//                     </div>
//                 </div>
//                 <div className="p-1 flex flex-col">
//                     <div className="flex items-center">
//                         <span className="w-1 h-1 bg-[#1D2939] rounded-full mr-2"></span>
//                         <span className="text-[#1D2939] text-sm font-normal">This quiz contains - 10 Questions</span>
//                     </div>
//                     <div className="flex items-center">
//                         <span className="w-1 h-1 bg-[#1D2939] rounded-full mr-2"></span>
//                         <span className="text-[#1D2939] text-sm font-normal">Each question will be of 3 Marks</span>
//                     </div>
//                     <div className="flex items-center">
//                         <span className="w-1 h-1 bg-[#1D2939] rounded-full mr-2"></span>
//                         <span className="text-[#1D2939] text-sm font-normal">There’s negative marking (-1) for each wrong</span>
//                     </div>
//                 </div>
//             </div>
//             <div className="w-full h-auto mt-6 flex flex-row gap-4 ">
//                 <div className="w-full  flex flex-col p-4 border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-xl">
//                     <span className="font-medium text-[#1D2939] text-xl">10</span>
//                     <span className="text-[#667085] font-normal text-base">Questions</span>
//                 </div>
//                 <div className="w-full  flex flex-col p-4 border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-xl">
//                     <span className="font-medium text-[#1D2939] text-xl">3</span>
//                     <span className="text-[#667085] font-normal text-base">Marks per questions</span>
//                 </div>
//                 <div className="w-full  flex flex-col p-4 border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-xl">
//                     <span className="font-medium text-[#1D2939] text-xl">10 min</span>
//                     <span className="text-[#667085] font-normal text-base">Overall quiz time</span>
//                 </div>
//                 <div className="w-full  flex flex-col p-4 border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-xl">
//                     <span className="font-medium text-[#1D2939] text-xl">-</span>
//                     <span className="text-[#667085] font-normal text-base">Students attempted</span>
//                 </div>
//             </div>
//             <div className="flex flex-row mt-6 w-full h-[40px] justify-between  items-center ">
//                 <span className="font-semibold text-lg text-[#1D2939]">Questions</span>
//                 <button className="flex flex-row gap-1 h-[40px]  items-center px-3">
//                     <Image
//                         src="/icons/expandall.svg"
//                         width={18}
//                         height={18}
//                         alt="Expand all icon" />
//                     <span className="font-normal text-[#475467] text-sm">Expand all</span>
//                     for closing add logic 

//                     <Image
//                         src="/icons/expandall.svg"
//                         width={18}
//                         height={18}
//                         alt="Expand all icon" />
//                     <span className="font-normal text-[#475467] text-sm">Collaspe all</span>
//                 </button>
//             </div>
//             <div className="flex flex-col gap-2 mt-3">
//                 {/* First Accordian */}
//                 <div className="bg-[#FFFFFF] h-auto rounded-xl border border-solid border-[#EAECF0] "
//                 >
//                     <Collapsible

//                         trigger={
//                             <div className="h-auto flex flex-row gap-3 p-6 ">
//                                 <div className="h-6 w-6 rounded-[4px] bg-[#EAECF0] flex justify-center">
//                                     <span className="text-[#1D2939] font-semibold text-base">1</span>
//                                 </div>
//                                 <span className="font-semibold text-base text-[#1D2939]">
//                                     What is the result of the bitwise AND operation between 1010 and 1100?
//                                 </span>
//                             </div>
//                         }
//                     >
//                         <div className=" h-auto gap-[15px] flex flex-col px-6 pb-[8px] hover:border-[#9012FF]">
//                             <RadioGroup>
//                                 <FormControlLabel
//                                     value="option1"
//                                     control={
//                                         <Radio
//                                             sx={{
//                                                 color: '#D0D5DD',
//                                                 '&.Mui-checked': {
//                                                     color: '#9012FF',
//                                                 },
//                                             }}
//                                         />
//                                     }
//                                     label="Option 1"
//                                 />
//                                 <FormControlLabel
//                                     value="option2"
//                                     control={
//                                         <Radio
//                                             sx={{
//                                                 color: '#D0D5DD',
//                                                 '&.Mui-checked': {
//                                                     color: '#9012FF',
//                                                 },
//                                             }}
//                                         />
//                                     }
//                                     label="Option 2"
//                                 />
//                                 <FormControlLabel
//                                     value="option4"
//                                     control={
//                                         <Radio
//                                             sx={{
//                                                 color: '#D0D5DD',
//                                                 '&.Mui-checked': {
//                                                     color: '#9012FF',
//                                                 },
//                                             }}
//                                         />
//                                     }
//                                     label="Option 4"
//                                 />
//                                 <FormControlLabel
//                                     value="option3"
//                                     control={
//                                         <Radio
//                                             sx={{
//                                                 color: '#D0D5DD',
//                                                 '&.Mui-checked': {
//                                                     color: '#9012FF',
//                                                 },
//                                             }}
//                                         />
//                                     }
//                                     label="Option 3"
//                                 />
//                             </RadioGroup>

//                         </div>

//                     </Collapsible>
//                 </div>
//                 {/* Second Accordian */}
//                 <div className="bg-[#FFFFFF] h-auto rounded-xl border border-solid border-[#EAECF0]"
//                 >
//                     <Collapsible

//                         trigger={
//                             <div className="h-auto flex flex-row gap-3 p-6 ">
//                                 <div className="h-6 w-6 rounded-[4px] bg-[#EAECF0] flex justify-center">
//                                     <span className="text-[#1D2939] font-semibold text-base">1</span>
//                                 </div>
//                                 <span className="font-semibold text-base text-[#1D2939]">
//                                     What is the result of the bitwise AND operation between 1010 and 1100?
//                                 </span>
//                             </div>
//                         }
//                     >
//                         <div className=" h-auto gap-[15px] flex flex-col px-6 pb-[8px] hover:border-[#9012FF]">
//                             <RadioGroup>
//                                 <FormControlLabel
//                                     value="option1"
//                                     control={
//                                         <Radio
//                                             sx={{
//                                                 color: '#D0D5DD',
//                                                 '&.Mui-checked': {
//                                                     color: '#9012FF',
//                                                 },
//                                             }}
//                                         />
//                                     }
//                                     label="Option 1"
//                                 />
//                                 <FormControlLabel
//                                     value="option2"
//                                     control={
//                                         <Radio
//                                             sx={{
//                                                 color: '#D0D5DD',
//                                                 '&.Mui-checked': {
//                                                     color: '#9012FF',
//                                                 },
//                                             }}
//                                         />
//                                     }
//                                     label="Option 2"
//                                 />
//                                 <FormControlLabel
//                                     value="option4"
//                                     control={
//                                         <Radio
//                                             sx={{
//                                                 color: '#D0D5DD',
//                                                 '&.Mui-checked': {
//                                                     color: '#9012FF',
//                                                 },
//                                             }}
//                                         />
//                                     }
//                                     label="Option 4"
//                                 />
//                                 <FormControlLabel
//                                     value="option3"
//                                     control={
//                                         <Radio
//                                             sx={{
//                                                 color: '#D0D5DD',
//                                                 '&.Mui-checked': {
//                                                     color: '#9012FF',
//                                                 },
//                                             }}
//                                         />
//                                     }
//                                     label="Option 3"
//                                 />
//                             </RadioGroup>

//                         </div>

//                     </Collapsible>
//                 </div>

//             </div>
//         </div>
//     )

// }
// export default Quizinfo;
"use client";
import Image from "next/image";
import Collapsible from "react-collapsible";
import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

function Quizinfo() {
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
        <div className="flex w-full h-auto overflow-y-auto flex-col p-8">
            <div className="w-full h-auto flex flex-col border-b border-solid border-[#D0D5DD] pb-2">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-3 py-1">
                        <span className="text-[#1D2939] text-2xl font-semibold">Maths</span>
                        {/* <Image
                            src="/icons/saved.svg"
                            width={74}
                            height={24}
                            alt="saved "
                        /> */}
                        <Image
                            src="/icons/secheduled.svg"
                            width={101}
                            height={24}
                            alt="saved "
                        />
                    </div>
                    <div className="flex flex-row gap-1">
                        <button className="w-auto p-3 gap-2 flex-row flex">
                            <Image src="/icons/publish-quiz.svg" width={18} height={18} alt="publish-quiz" />
                            <span className="text-sm text-[#0C111D] font-normal">Publish Quiz</span>
                        </button>
                        <button className="w-auto p-3 gap-2 flex-row flex">
                            <Image src="/icons/edit-icon.svg" width={18} height={18} alt="Edit-quiz" />
                            <span className="text-sm text-[#0C111D] font-normal">Edit Quiz</span>
                        </button>
                        <button className="w-auto p-3 gap-2 flex-row flex">
                            <Image src="/icons/delete.svg" width={18} height={18} alt="delete-quiz" />
                            <span className="text-sm text-[#DE3024] font-normal">Delete Quiz</span>
                        </button>
                    </div>
                </div>
                <div className="p-1 flex flex-col">
                    <div className="flex flex-row gap-1">
                        <div></div>
                        <Image src="/icons/edit-icon.svg" width={18} height={18} alt="Edit-quiz" />

                    </div>
                    <div className="flex items-center">
                        <span className="w-1 h-1 bg-[#1D2939] rounded-full mr-2"></span>
                        <span className="text-[#1D2939] text-sm font-normal">This quiz contains - 10 Questions</span>
                    </div>
                    <div className="flex items-center">
                        <span className="w-1 h-1 bg-[#1D2939] rounded-full mr-2"></span>
                        <span className="text-[#1D2939] text-sm font-normal">Each question will be of 3 Marks</span>
                    </div>
                    <div className="flex items-center">
                        <span className="w-1 h-1 bg-[#1D2939] rounded-full mr-2"></span>
                        <span className="text-[#1D2939] text-sm font-normal">There’s negative marking (-1) for each wrong</span>
                    </div>
                </div>
            </div>
            <div className="w-full h-auto mt-6 flex flex-row gap-4 ">
                <div className="w-full flex flex-col p-4 border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-xl">
                    <span className="font-medium text-[#1D2939] text-xl">10</span>
                    <span className="text-[#667085] font-normal text-base">Questions</span>
                </div>
                <div className="w-full flex flex-col p-4 border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-xl">
                    <span className="font-medium text-[#1D2939] text-xl">3</span>
                    <span className="text-[#667085] font-normal text-base">Marks per questions</span>
                </div>
                <div className="w-full flex flex-col p-4 border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-xl">
                    <span className="font-medium text-[#1D2939] text-xl">10 min</span>
                    <span className="text-[#667085] font-normal text-base">Overall quiz time</span>
                </div>
                <div className="w-full flex flex-col p-4 border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-xl">
                    <span className="font-medium text-[#1D2939] text-xl">-</span>
                    <span className="text-[#667085] font-normal text-base">Students attempted</span>
                </div>
            </div>
            <div className="flex flex-row mt-6 w-full h-[40px] justify-between items-center">
                <span className="font-semibold text-lg text-[#1D2939]">Questions</span>
                <button className="flex flex-row gap-1 h-[40px] items-center px-3" onClick={toggleExpandAll}>
                    <Image src="/icons/expandall.svg" width={18} height={18} alt="Expand all icon" />
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
        </div>
    );
}

export default Quizinfo;
