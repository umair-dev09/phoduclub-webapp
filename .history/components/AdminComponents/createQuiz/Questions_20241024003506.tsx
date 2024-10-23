// "use client";
// import Image from "next/image";
// import { useState } from "react";
// import { PopoverContent, PopoverTrigger, Popover } from '@nextui-org/popover';
// import Collapsible from 'react-collapsible';

// function Questions() {
//     // Define the Question type to include isActive
//     interface Question {
//         question: string;
//         isChecked: boolean;
//         isActive: boolean;
//     }
//     // ---------------------------------------------------------------------------------------------------------------------------------
//     const [questionsList, setQuestionsList] = useState([
//         {
//             question: '',
//             isChecked: false,
//             isActive: false,
//         },
//     ]); // This will hold the questions
//     // ---------------------------------------------------------------------------------------------------------------------------------
//     // THIS FUNCTION IS USED IN FIRST INPUT PART OF THE PARTICULAR QUESTIONS
//     const handleInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
//         const newQuestionsList = [...questionsList];
//         newQuestionsList[index].question = e.target.value;
//         setQuestionsList(newQuestionsList);
//     };
//     // ---------------------------------------------------------------------------------------------------------------------------------
//     // THIS WILL MAKE THE QUESTIONS CHECKBOX CHANGE FOR PARTICULAR QUESTIONS
//     const handleCheckboxChange = (index: number) => {
//         const newQuestionsList = [...questionsList];
//         newQuestionsList[index].isChecked = !newQuestionsList[index].isChecked;
//         setQuestionsList(newQuestionsList);
//     };
//     // ---------------------------------------------------------------------------------------------------------------------------------
//     // THIS IS  USED TO ADD DUPLCIATE QUESTIONS
//     const handleAddQuestion = () => {
//         setQuestionsList((prevQuestionsList) => [
//             ...prevQuestionsList,
//             {

//                 question: '',
//                 isChecked: false,
//                 isActive: false,
//             },
//         ]); // Add a new empty question to the list
//     };
//     // ---------------------------------------------------------------------------------------------------------------------------------
//     // THIS IS USED TO DELETE THE PARTICULAR QUESTIONS
//     const handleDeleteQuestion = (index: number) => {
//         const newQuestionsList = [...questionsList];
//         newQuestionsList.splice(index, 1); // Remove the question at the specified index
//         setQuestionsList(newQuestionsList);
//     };
//     // ---------------------------------------------------------------------------------------------------------------------------------
//     // THIS WILL MAKE THE QUESTIONS NUMBER CHANGE
//     const [activeQuestionIndex, setActiveQuestionIndex] = useState<number | null>(null);
//     // ---------------------------------------------------------------------------------------------------------------------------------
//     // THIS USED TO HOVER THE " select correct answer(DIV)" and LIST OF POPOVER CONTENT
//     const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

//     // ---------------------------------------------------------------------------------------------------------------------------------
//     // THIS WILL MAKE THE POPOVER CONTENT CHNAGE ON PARTICULAR QUESTIONS
//     const handlePopoverToggle = (index: number) => {
//         // Toggle the active question index
//         setActiveQuestionIndex(activeQuestionIndex === index ? null : index);
//     };
//     // ---------------------------------------------------------------------------------------------------------------------------------


//     const [options, setOptions] = useState({ A: '', B: '', C: '', D: '' }); // State to hold option inputs


//     // Handler to update options as the user types
//     const handleOptionChange = (optionKey, value) => {
//         setOptions((prevOptions) => ({ ...prevOptions, [optionKey]: value }));
//     };





//     return (
//         <div className="pb-4 h-auto ">
//             {questionsList.map((q, index) => (
//                 <div className="rounded-md border border-solid border-[#EAECF0] mt-4  h-auto  bg-[#FFFFFF]">
//                     <Collapsible
//                         key={index}
//                         trigger={
//                             <div className='h-auto  bg-[#FFFFFF] flex flex-col p-5 gap-2 rounded-md  '>
//                                 <div className="h-auto flex flex-row justify-between">
//                                     <div className="flex gap-2">
//                                         <div className="h-6 w-6 rounded-[4px] bg-[#EAECF0] flex justify-center">
//                                             <span className="text-[#1D2939] font-semibold text-base">{index + 1}</span>
//                                         </div>
//                                         <span className="font-semibold text-base text-[#1D2939]">
//                                             {q.question || "Questions"}
//                                         </span>
//                                     </div>
//                                     <Popover placement="bottom-end">
//                                         <PopoverTrigger>
//                                             <button>
//                                                 <Image
//                                                     src="/icons/three-dots.svg"
//                                                     width={20}
//                                                     height={20}
//                                                     alt="Three-dots"
//                                                 />
//                                             </button>
//                                         </PopoverTrigger>
//                                         <PopoverContent>
//                                             <div
//                                                 className="h-[88px] w-[167px] border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-md flex flex-col py-[4px]"
//                                                 style={{
//                                                     boxShadow: '0px 4px 6px -2px #10182808, 0px 12px 16px -4px #10182814',
//                                                 }}
//                                             >
//                                                 <button
//                                                     className="flex flex-row h-[40px] w-full px-3 gap-2 hover:bg-[#F2F4F7] items-center"
//                                                     onClick={handleAddQuestion} // Duplicate the first question
//                                                 >
//                                                     <Image
//                                                         src="/icons/duplicate.svg"
//                                                         width={18}
//                                                         height={18}
//                                                         alt="Duplicate"
//                                                     />
//                                                     <span className="text-[#0C111D] text-sm font-medium">Duplicate</span>
//                                                 </button>
//                                                 <button className="flex flex-row h-[40px] w-full px-3 gap-2 hover:bg-[#F2F4F7] items-center"
//                                                     onClick={() => handleDeleteQuestion(index)}>
//                                                     <Image
//                                                         src="/icons/delete.svg"
//                                                         width={18}
//                                                         height={18}
//                                                         alt="Delete"
//                                                     />
//                                                     <span className="text-[#DE3024] text-sm font-medium">Delete</span>
//                                                 </button>
//                                             </div>
//                                         </PopoverContent>
//                                     </Popover>
//                                 </div>
//                             </div>
//                         }
//                     >
//                         <div className=' h-auto  bg-[#FFFFFF] flex flex-col pb-5 px-5 gap-2 rounded-br-md rounded-bl-md '>

//                             <div className="flex flex-col gap-2">
//                                 <span className="font-semibold text-base text-[#1D2939]">Questions</span>
//                                 <input
//                                     className="font-medium pl-3 text-[#101828] text-sm placeholder:text-[#A1A1A1] rounded-md placeholder:font-normal
//                                          focus:outline-none focus:ring-0 
//                                        border border-solid border-[#D0D5DD] h-[40px] 
//                                              shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] 
//                                                 transition duration-200 ease-in-out 
//                                               focus:border-[#D6BBFB] 
//                                               focus:shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]
//                                               focus:text-[#1D2939]
//                                             focus:font-medium"
//                                     placeholder="Enter questions"
//                                     type="text"
//                                     value={q.question} // Bind the input value to the specific question's state
//                                     onChange={(e) => handleInputChange(index, e)} // Update state on input change
//                                 />
//                             </div>
//                             <div className="flex flex-row gap-2">
//                                 <input
//                                     type="checkbox"
//                                     checked={q.isChecked}
//                                     onChange={() => handleCheckboxChange(index)}
//                                 />
//                                 <span className="font-medium text-sm text-[#182230]">Upload image (optional)</span>
//                             </div>

//                             {q.isChecked && (
//                                 <div className="h-36 rounded-xl bg-[#F9FAFB] border-2 border-dashed border-[#D0D5DD]">
//                                     <div className="flex flex-col items-center justify-center gap-4 h-full w-full">
//                                         <div className="flex flex-col items-center">
//                                             <div className="h-10 w-10 rounded-md border border-solid border-[#EAECF0] bg-[#FFFFFF] p-[10px] shadow-[0px_1px_2px_0px_#1018280D]">
//                                                 <Image
//                                                     src="/icons/upload-cloud.svg"
//                                                     width={20}
//                                                     height={20}
//                                                     alt="upload icon"
//                                                 />
//                                             </div>
//                                         </div>
//                                         <span className="text-sm font-semibold text-[#9012FF]">
//                                             Click to upload <span className="text-[#182230] text-sm font-medium">or drag and drop</span>
//                                         </span>
//                                     </div>
//                                 </div>
//                             )}
//                             <span className="font-semibold text-base text-[#1D2939]">options</span>

//                             <input
//                                 className="font-medium pl-3 text-[#101828]  text-sm placeholder:text-[#A1A1A1] rounded-md w-full placeholder:font-normal
//                         focus:outline-none focus:ring-0 
//                         border border-solid border-[#D0D5DD] h-[40px] 
//                         shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] 
//                         transition duration-200 ease-in-out 
//                         focus:border-[#D6BBFB] 
//                         focus:shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]
//                         focus:text-[#1D2939]
//                         focus:font-medium"
//                                 placeholder="Add explanation for this correct answer"
//                                 type="text"
//                             />
//                         </div>

//                     </Collapsible>
//                 </div>
//             ))}

//             <div className="flex justify-center items-center mt-4">
//                 <button className="h-[36px] w-[127px] rounded-[8px] bg-[#FFFFFF] border border-solid border-[#8501FF] flex justify-center items-center"
//                     onClick={handleAddQuestion}>
//                     <span className="text-[#8501FF] text-sm font-semibold">Add Question</span>
//                 </button>

//             </div>



//         </div>
//     );
// }

// export default Questions;
"use client";
import Image from "next/image";
import { useState } from "react";
import { PopoverContent, PopoverTrigger, Popover } from '@nextui-org/popover';
import Collapsible from 'react-collapsible';

// Define interfaces outside the component
interface Question {
    question: string;
    isChecked: boolean;
    isActive: boolean;
    options: Options;
    correctAnswer: string | null;
    explanation: string;
}

interface Options {
    A: string;
    B: string;
    C: string;
    D: string;
}

function Questions() {
    // Initialize state with proper typing
    const [questionsList, setQuestionsList] = useState<Question[]>([{
        question: '',
        isChecked: false,
        isActive: false,
        options: { A: '', B: '', C: '', D: '' },
        correctAnswer: null,
        explanation: ''
    }]);

    // Handler for input change
    const handleInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuestionsList = [...questionsList];
        newQuestionsList[index].question = e.target.value;
        setQuestionsList(newQuestionsList);
    };

    // Handler for checkbox change
    const handleCheckboxChange = (index: number) => {
        const newQuestionsList = [...questionsList];
        newQuestionsList[index].isChecked = !newQuestionsList[index].isChecked;
        setQuestionsList(newQuestionsList);
    };

    // Handler for adding new question
    const handleAddQuestion = () => {
        setQuestionsList([
            ...questionsList,
            {
                question: '',
                isChecked: false,
                isActive: false,
                options: { A: '', B: '', C: '', D: '' },
                correctAnswer: null,
                explanation: ''
            }
        ]);
    };

    // Handler for deleting question
    const handleDeleteQuestion = (index: number) => {
        setQuestionsList(questionsList.filter((_, i) => i !== index));
    };

    // Handler for option change
    const handleOptionChange = (questionIndex: number, optionKey: keyof Options, value: string) => {
        const newQuestionsList = [...questionsList];
        newQuestionsList[questionIndex].options[optionKey] = value;
        setQuestionsList(newQuestionsList);
    };

    // Handler for explanation change
    const handleExplanationChange = (index: number, value: string) => {
        const newQuestionsList = [...questionsList];
        newQuestionsList[index].explanation = value;
        setQuestionsList(newQuestionsList);
    };

    // Handler for setting correct answer
    const handleCorrectAnswerSelect = (questionIndex: number, optionKey: keyof Options) => {
        const newQuestionsList = [...questionsList];
        newQuestionsList[questionIndex].correctAnswer = optionKey;
        setQuestionsList(newQuestionsList);
    };
    const getSelectedAnswerDisplay = (question: Question) => {
        if (!question.correctAnswer) return "Select correct answer";

        // Assert that correctAnswer is a valid key in the options object
        const selectedAnswer = question.options[question.correctAnswer as keyof Options];

        return selectedAnswer
            ? `Option ${question.correctAnswer}. ${selectedAnswer}`
            : `Option ${question.correctAnswer}`;
    };


    return (
        <div className="pb-4 h-auto">
            {questionsList.map((question, index) => (
                <div key={index} className="rounded-md border border-solid border-[#EAECF0] mt-4 h-auto bg-[#FFFFFF]">
                    <Collapsible
                        trigger={
                            <div className='h-auto bg-[#FFFFFF] flex flex-col p-5 gap-2 rounded-md'>
                                <div className="h-auto flex flex-row justify-between">
                                    <div className="flex gap-2">
                                        <div className="h-6 w-6 rounded-[4px] bg-[#EAECF0] flex justify-center">
                                            <span className="text-[#1D2939] font-semibold text-base">{index + 1}</span>
                                        </div>
                                        <span className="font-semibold text-base text-[#1D2939]">
                                            {question.question || "Question"}
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
                                            <div className="h-[88px] w-[167px] border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-md flex flex-col py-[4px]">
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
                                                <button
                                                    className="flex flex-row h-[40px] w-full px-3 gap-2 hover:bg-[#F2F4F7] items-center"
                                                    onClick={() => handleDeleteQuestion(index)}
                                                >
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
                        <div className='h-auto bg-[#FFFFFF] flex flex-col pb-5 px-5 gap-2 rounded-br-md rounded-bl-md'>
                            <div className="flex flex-col gap-2">
                                <span className="font-semibold text-base text-[#1D2939]">Question</span>
                                <input
                                    className="font-medium pl-3 text-[#101828] text-sm placeholder:text-[#A1A1A1] rounded-md placeholder:font-normal
                                        focus:outline-none focus:ring-0 border border-solid border-[#D0D5DD] h-[40px]"
                                    placeholder="Enter question"
                                    type="text"
                                    value={question.question}
                                    onChange={(e) => handleInputChange(index, e)}
                                />
                            </div>

                            <div className="flex flex-row gap-2">
                                <input
                                    type="checkbox"
                                    checked={question.isChecked}
                                    onChange={() => handleCheckboxChange(index)}
                                />
                                <span className="font-medium text-sm text-[#182230]">Upload image (optional)</span>
                            </div>

                            {question.isChecked && (
                                <div className="h-36 rounded-xl bg-[#F9FAFB] border-2 border-dashed border-[#D0D5DD]">
                                    <div className="flex flex-col items-center justify-center gap-4 h-full w-full">
                                        <div className="flex flex-col items-center">
                                            <div className="h-10 w-10 rounded-md border border-solid border-[#EAECF0] bg-[#FFFFFF] p-[10px]">
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
                                {(Object.keys(question.options) as Array<keyof Options>).map((optionKey) => (
                                    <div key={optionKey} className="flex flex-row gap-2">
                                        <div className="h-8 w-8 bg-[#F9FAFB] border border-solid border-[#D0D5DD] rounded-[6px]">
                                            <span className="text-[#475467] text-sm font-medium flex justify-center items-center h-full w-full">
                                                {optionKey}
                                            </span>
                                        </div>
                                        <input
                                            className="font-medium pl-3 text-[#101828] text-sm placeholder:text-[#A1A1A1] rounded-md w-full placeholder:font-normal
                                                focus:outline-none focus:ring-0 border border-solid border-[#D0D5DD] h-[40px]"
                                            placeholder={`Option ${optionKey}`}
                                            value={question.options[optionKey]}
                                            onChange={(e) => handleOptionChange(index, optionKey, e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>

                            <span className="font-semibold text-base text-[#1D2939]">Correct answer</span>
                            <Popover placement="bottom">
                                <PopoverTrigger>
                                    <button className="h-[40px] px-3 items-center w-full justify-between flex flex-row rounded-md border border-solid border-[#D0D5DD] bg-[#FFFFFF]">
                                        <span className={`font-normal text-sm ${question.correctAnswer ? 'text-[#101828]' : 'text-[#667085]'}`}>
                                            {getSelectedAnswerDisplay(question)}
                                        </span>
                                        <Image
                                            src="/icons/chevron-down.svg"
                                            width={20}
                                            height={20}
                                            alt="dropdown"
                                        />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <div className="w-full rounded-md border border-solid border-[#EAECF0] bg-[#FFFFFF] flex flex-col pt-[8px]">
                                        {(Object.keys(question.options) as Array<keyof Options>).map((optionKey) => (
                                            <div
                                                key={optionKey}
                                                className="flex flex-row justify-between w-full h-[40px] items-center hover:bg-[#F2F4F7] px-2 cursor-pointer"
                                                onClick={() => handleCorrectAnswerSelect(index, optionKey)}
                                            >
                                                <span className="font-normal text-[#0C111D] text-sm">
                                                    Option {optionKey}. {question.options[optionKey] || `Option ${optionKey}`}
                                                </span>
                                                {question.correctAnswer === optionKey && (
                                                    <Image
                                                        src="/icons/tick-02.svg"
                                                        width={18}
                                                        height={18}
                                                        alt="right mark"
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </PopoverContent>
                            </Popover>
                            <input
                                className="font-medium pl-3 text-[#101828] text-sm placeholder:text-[#A1A1A1] rounded-md w-full placeholder:font-normal
                                    focus:outline-none focus:ring-0 border border-solid border-[#D0D5DD] h-[40px]"
                                placeholder="Add explanation for this correct answer"
                                type="text"
                                value={question.explanation}
                                onChange={(e) => handleExplanationChange(index, e.target.value)}
                            />
                        </div>
                    </Collapsible>
                </div>
            ))}

            <div className="flex justify-center items-center mt-4">
                <button
                    className="h-[36px] w-[127px] rounded-[8px] bg-[#FFFFFF] border border-solid border-[#8501FF] flex justify-center items-center"
                    onClick={handleAddQuestion}
                >
                    <span className="text-[#8501FF] text-sm font-semibold">Add Question</span>
                </button>
            </div>
        </div>
    );
}

export default Questions;
