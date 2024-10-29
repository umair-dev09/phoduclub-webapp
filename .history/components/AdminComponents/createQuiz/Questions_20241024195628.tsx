// "use client";
// import Image from "next/image";
// import { useState } from "react";
// import { PopoverContent, PopoverTrigger, Popover } from '@nextui-org/popover';
// import Collapsible from 'react-collapsible';

// // Define interfaces outside the component
// interface Question {
//     question: string;
//     isChecked: boolean;
//     isActive: boolean;
//     options: Options;
//     correctAnswer: string | null;
//     explanation: string;
// }

// interface Options {
//     A: string;
//     B: string;
//     C: string;
//     D: string;
// }
// // Sending the Data to the CreateQuiz
// interface QuestionsProps {
//     questionsList: Question[];
//     setQuestionsList: React.Dispatch<React.SetStateAction<Question[]>>;
// }

// function Questions({ questionsList, setQuestionsList }: QuestionsProps) {

//     // Handler for input change
//     const handleInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
//         const newQuestionsList = [...questionsList];
//         newQuestionsList[index].question = e.target.value;
//         setQuestionsList(newQuestionsList);
//     };
//     // -----------------------------------------------------------------------------------------------------------
//     // Handler for checkbox change
//     const handleCheckboxChange = (index: number) => {
//         const newQuestionsList = [...questionsList];
//         newQuestionsList[index].isChecked = !newQuestionsList[index].isChecked;
//         setQuestionsList(newQuestionsList);
//     };
//     // -----------------------------------------------------------------------------------------------------------
//     // Handler for adding new question
//     const handleAddQuestion = () => {
//         setQuestionsList([
//             ...questionsList,
//             {
//                 question: '',
//                 isChecked: false,
//                 isActive: false,
//                 options: { A: '', B: '', C: '', D: '' },
//                 correctAnswer: null,
//                 explanation: ''
//             }
//         ]);
//     };

//     // Handler for adding the Questions
//     const handleAddQuestionduplicate = (duplicateQuestion?: Question) => {
//         const newQuestion = duplicateQuestion
//             ? { ...duplicateQuestion } // Duplicate all properties of the question
//             : {
//                 question: '',
//                 isChecked: false,
//                 isActive: false,
//                 options: { A: '', B: '', C: '', D: '' },
//                 correctAnswer: null,
//                 explanation: ''
//             };

//         setQuestionsList([...questionsList, newQuestion]);
//     };

//     // Handler for deleting question
//     const handleDeleteQuestion = (index: number) => {
//         console.log("Deleting question at index:", index); // Debugging
//         setQuestionsList((prevList) => {
//             // Set isActive to false for the question being deleted
//             const updatedList = prevList.map((q, i) => (i === index ? { ...q, isActive: false } : q));
//             return updatedList.filter((_, i) => i !== index); // Delete the question
//         });
//     };

//     // Handler for option change
//     const handleOptionChange = (questionIndex: number, optionKey: keyof Options, value: string) => {
//         const newQuestionsList = [...questionsList];
//         newQuestionsList[questionIndex].options[optionKey] = value;
//         setQuestionsList(newQuestionsList);
//     };

//     // Handler for explanation change
//     const handleExplanationChange = (index: number, value: string) => {
//         const newQuestionsList = [...questionsList];
//         newQuestionsList[index].explanation = value;
//         setQuestionsList(newQuestionsList);
//     };

//     // Handler for setting correct answer
//     const handleCorrectAnswerSelect = (questionIndex: number, optionKey: keyof Options) => {
//         const newQuestionsList = [...questionsList];
//         newQuestionsList[questionIndex].correctAnswer = optionKey;
//         setQuestionsList(newQuestionsList);
//         handlePopoverClose();
//     };
//     const getSelectedAnswerDisplay = (question: Question) => {
//         if (!question.correctAnswer) return "Select correct answer";

//         // Assert that correctAnswer is a valid key in the options object
//         const selectedAnswer = question.options[question.correctAnswer as keyof Options];

//         return selectedAnswer
//             ? `${question.correctAnswer}. ${selectedAnswer}`
//             : `Option ${question.correctAnswer}`;
//     };

//     // function for the change color of border and shadow when the "select the correct answer div is active"
//     const handleclickonselectbutton = () => {
//         setIsPopoverOpen(!isPopoverOpen); // Toggle the popover
//     };
//     const [isPopoverOpen, setIsPopoverOpen] = useState(false);
//     const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

//     const handlePopoverClose = () => {
//         setIsPopoverOpen(false);
//     };
//     const isActive = isPopoverOpen || !!selectedAnswer;

//     return (
//         <div className="pb-4 h-auto">
//             {questionsList.map((question, index) => (
//                 <div key={index} className="rounded-md border border-solid border-[#EAECF0] mt-4 h-auto bg-[#FFFFFF]">
//                     <Collapsible
//                         trigger={
//                             <div className='h-auto bg-[#FFFFFF] flex flex-col p-5 gap-2 rounded-md'>
//                                 <div className="h-auto flex flex-row justify-between">
//                                     <div className="flex gap-2">
//                                         <div className="h-6 w-6 rounded-[4px] bg-[#EAECF0] flex justify-center">
//                                             <span className="text-[#1D2939] font-semibold text-base">{index + 1}</span>
//                                         </div>
//                                         <span className="font-semibold text-base text-[#1D2939]">
//                                             {question.question || "Question"}
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
//                                             <div className="h-[88px] w-[167px] border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-md flex flex-col py-[4px] shadow-lg">
//                                                 <button

//                                                     className="flex flex-row h-[40px] w-full px-3 gap-2 hover:bg-[#F2F4F7] items-center"
//                                                     onClick={() => handleAddQuestionduplicate(question)}
//                                                 >
//                                                     <Image
//                                                         src="/icons/duplicate.svg"
//                                                         width={18}
//                                                         height={18}
//                                                         alt="Duplicate"
//                                                     />
//                                                     <span className="text-[#0C111D] text-sm font-medium">Duplicate</span>
//                                                 </button>
//                                                 <button
//                                                     className="flex flex-row h-[40px] w-full px-3 gap-2 hover:bg-[#F2F4F7] items-center"
//                                                     onClick={() => handleDeleteQuestion(index)}
//                                                 >
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
//                         <div className='h-auto bg-[#FFFFFF] flex flex-col pb-5 px-5 gap-2 rounded-br-md rounded-bl-md'>
//                             <div className="flex flex-col gap-2">
//                                 <span className="font-semibold text-base text-[#1D2939]">Question</span>
//                                 <input
//                                     className="font-medium pl-3 text-[#101828] text-sm placeholder:text-[#A1A1A1] rounded-md placeholder:font-normal
//                                         focus:outline-none focus:ring-0 border border-solid border-[#D0D5DD] h-[40px] focus:border-[#D6BBFB] 
//                                               focus:shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]"
//                                     placeholder="Enter question"
//                                     type="text"
//                                     value={question.question}
//                                     onChange={(e) => handleInputChange(index, e)}
//                                 />
//                             </div>

//                             <div className="flex flex-row gap-2">
//                                 <input
//                                     type="checkbox"
//                                     checked={question.isChecked}
//                                     onChange={() => handleCheckboxChange(index)}
//                                 />
//                                 <span className="font-medium text-sm text-[#182230]">Upload image (optional)</span>
//                             </div>

//                             {question.isChecked && (
//                                 <div className="h-36 rounded-xl bg-[#F9FAFB] border-2 border-dashed border-[#D0D5DD]">
//                                     <div className="flex flex-col items-center justify-center gap-4 h-full w-full">
//                                         <div className="flex flex-col items-center">
//                                             <div className="h-10 w-10 rounded-md border border-solid border-[#EAECF0] bg-[#FFFFFF] p-[10px]">
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

//                             <span className="font-semibold text-base text-[#1D2939]">Options</span>
//                             <div className="flex flex-col gap-3">
//                                 {(Object.keys(question.options) as Array<keyof Options>).map((optionKey) => (
//                                     <div key={optionKey} className="flex flex-row items-center gap-2">
//                                         <div className="h-8 w-8 bg-[#F9FAFB] border border-solid border-[#D0D5DD] rounded-[6px]">
//                                             <span className="text-[#475467] text-sm font-medium flex justify-center items-center h-full w-full">
//                                                 {optionKey}
//                                             </span>
//                                         </div>
//                                         <Image
//                                             src="/icons/three-double-dots.svg"
//                                             width={20}
//                                             height={20}
//                                             alt="Three-dots"
//                                         />
//                                         <input
//                                             className="font-medium pl-3 text-[#101828] text-sm placeholder:text-[#A1A1A1] rounded-md w-full placeholder:font-normal
//                                                 focus:outline-none focus:ring-0 border border-solid border-[#D0D5DD] h-[40px] focus:border-[#D6BBFB] 
//                                               focus:shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]"
//                                             placeholder={`Option ${optionKey}`}
//                                             value={question.options[optionKey]}
//                                             onChange={(e) => handleOptionChange(index, optionKey, e.target.value)}
//                                         />
//                                     </div>
//                                 ))}
//                             </div>

//                             <span className="font-semibold text-base text-[#1D2939]">Correct answer</span>
//                             <Popover placement="bottom" isOpen={isPopoverOpen} onClose={handlePopoverClose}>
//                                 <PopoverTrigger>
//                                     <button
//                                         className={`h-[40px] px-3 items-center w-full justify-between flex flex-row rounded-md border border-solid 
//                                 ${isActive ? 'border-[#D6BBFB] shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]' : ' border-[#D0D5DD]'} 
//                                 bg-[#FFFFFF] focus:outline-none`}
//                                         onClick={handleclickonselectbutton}
//                                     >
//                                         <span className={`font-normal text-sm ${selectedAnswer ? 'text-[#101828]' : 'text-[#667085]'}`}>
//                                             {getSelectedAnswerDisplay(question)}
//                                         </span>
//                                     </button>
//                                 </PopoverTrigger>
//                                 <PopoverContent>
//                                     <div className="w-[60.813rem] rounded-md border border-solid border-[#EAECF0] bg-[#FFFFFF] flex flex-col pt-[8px] shadow-lg">
//                                         {(Object.keys(question.options) as Array<keyof Options>).map((optionKey) => (
//                                             <div
//                                                 key={optionKey}
//                                                 className="flex flex-row justify-between w-full h-[40px] items-center hover:bg-[#F2F4F7] px-2 cursor-pointer"

//                                                 onClick={() => handleCorrectAnswerSelect(index, optionKey)}

//                                             >
//                                                 <span className="font-normal text-[#0C111D] text-sm">
//                                                     {optionKey}. {question.options[optionKey] || `Option ${optionKey}`}
//                                                 </span>
//                                                 {selectedAnswer === optionKey && (
//                                                     <Image
//                                                         src="/icons/tick-02.svg"
//                                                         width={18}
//                                                         height={18}
//                                                         alt="right mark"
//                                                     />
//                                                 )}
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </PopoverContent>
//                             </Popover>
//                             <input
//                                 className="font-medium pl-3 text-[#101828] text-sm placeholder:text-[#A1A1A1] rounded-md w-full placeholder:font-normal
//                                     focus:outline-none focus:ring-0 border border-solid border-[#D0D5DD] h-[40px] focus:border-[#D6BBFB] 
//                                               focus:shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]"
//                                 placeholder="Add explanation for this correct answer"
//                                 type="text"
//                                 value={question.explanation}
//                                 onChange={(e) => handleExplanationChange(index, e.target.value)}
//                             />
//                         </div>
//                     </Collapsible>
//                 </div>
//             ))}

//             <div className="flex justify-center items-center mt-4">
//                 <button
//                     className="h-[36px] w-[127px] rounded-[8px] bg-[#FFFFFF] border border-solid border-[#8501FF] flex justify-center items-center"
//                     onClick={handleAddQuestion}
//                 >
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

// Sending the Data to the CreateQuiz
interface QuestionsProps {
    questionsList: Question[];
    setQuestionsList: React.Dispatch<React.SetStateAction<Question[]>>;
}

function Questions({ questionsList, setQuestionsList }: QuestionsProps) {
    // State to manage popover visibility for each question
    const [popoverOpenStates, setPopoverOpenStates] = useState<boolean[]>(Array(questionsList.length).fill(false));
    const [selectedAnswers, setSelectedAnswers] = useState<(string | null)[]>(Array(questionsList.length).fill(null));

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
        setPopoverOpenStates([...popoverOpenStates, false]); // Add new state for the new question
        setSelectedAnswers([...selectedAnswers, null]); // Initialize selected answer
    };

    // Handler for adding duplicate question
    const handleAddQuestionduplicate = (duplicateQuestion?: Question) => {
        const newQuestion = duplicateQuestion
            ? { ...duplicateQuestion }
            : {
                question: '',
                isChecked: false,
                isActive: false,
                options: { A: '', B: '', C: '', D: '' },
                correctAnswer: null,
                explanation: ''
            };

        setQuestionsList([...questionsList, newQuestion]);
        setPopoverOpenStates([...popoverOpenStates, false]); // Add state for new question
        setSelectedAnswers([...selectedAnswers, null]); // Initialize selected answer
    };

    // Handler for deleting question
    const handleDeleteQuestion = (index: number) => {
        setQuestionsList((prevList) => {
            const updatedList = prevList.filter((_, i) => i !== index); // Delete the question
            return updatedList; // Update state
        });
        setPopoverOpenStates((prevStates) => prevStates.filter((_, i) => i !== index)); // Update popover states
        setSelectedAnswers((prevAnswers) => prevAnswers.filter((_, i) => i !== index)); // Update selected answers
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
        handlePopoverClose(questionIndex);
    };

    const getSelectedAnswerDisplay = (question: Question, index: number) => {
        if (!question.correctAnswer) return "Select correct answer";
        const selectedAnswer = question.options[question.correctAnswer as keyof Options];
        return selectedAnswer ? `${question.correctAnswer}. ${selectedAnswer}` : `Option ${question.correctAnswer}`;
    };

    const handlePopoverClose = (index: number) => {
        setPopoverOpenStates((prev) => {
            const newStates = [...prev];
            newStates[index] = false; // Close the specific popover
            return newStates;
        });
    };

    const handleclickonselectbutton = (index: number) => {
        setPopoverOpenStates((prev) => {
            const newStates = [...prev];
            newStates[index] = !newStates[index]; // Toggle the specific popover
            return newStates;
        });
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
                                            <div className="h-[88px] w-[167px] border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-md flex flex-col py-[4px] shadow-lg">
                                                <button
                                                    className="flex flex-row h-[40px] w-full px-3 gap-2 hover:bg-[#F2F4F7] items-center"
                                                    onClick={() => handleAddQuestionduplicate(question)}
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
                                        focus:outline-none focus:ring-0 border border-solid border-[#D0D5DD] h-[40px] focus:border-[#D6BBFB] 
                                              focus:shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]"
                                    placeholder="Enter question"
                                    type="text"
                                    value={question.question}
                                    onChange={(e) => handleInputChange(index, e)}
                                />
                            </div>

                            <div className="flex flex-row gap-2">
                                <div className="flex flex-col gap-2 w-1/2">
                                    <span className="font-semibold text-base text-[#1D2939]">Options</span>
                                    {['A', 'B', 'C', 'D'].map((option) => (
                                        <input
                                            key={option}
                                            className="font-medium pl-3 text-[#101828] text-sm placeholder:text-[#A1A1A1] rounded-md placeholder:font-normal
                                        focus:outline-none focus:ring-0 border border-solid border-[#D0D5DD] h-[40px] focus:border-[#D6BBFB] 
                                              focus:shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]"
                                            placeholder={`Option ${option}`}
                                            type="text"
                                            value={question.options[option as keyof Options]}
                                            onChange={(e) => handleOptionChange(index, option as keyof Options, e.target.value)}
                                        />
                                    ))}
                                </div>
                                <div className="flex flex-col gap-2 w-1/2">
                                    <span className="font-semibold text-base text-[#1D2939]">Correct Answer</span>
                                    <button
                                        onClick={() => handleclickonselectbutton(index)} // Toggle the popover
                                        className="w-full font-medium pl-3 text-left text-[#101828] text-sm placeholder:text-[#A1A1A1] rounded-md placeholder:font-normal
                                        focus:outline-none focus:ring-0 border border-solid border-[#D0D5DD] h-[40px] focus:border-[#D6BBFB] 
                                              focus:shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]"
                                    >
                                        {getSelectedAnswerDisplay(question, index)}
                                    </button>

                                    {/* Popover showing correct answer options */}
                                    <Popover placement="bottom">
                                        <PopoverTrigger>
                                            <button className="invisible"></button> {/* invisible button to trigger popover */}
                                        </PopoverTrigger>
                                        <PopoverContent className="flex flex-col">
                                            {['A', 'B', 'C', 'D'].map((option) => (
                                                <button
                                                    key={option}
                                                    className="py-2 text-left hover:bg-gray-100"
                                                    onClick={() => handleCorrectAnswerSelect(index, option as keyof Options)}
                                                >
                                                    {option}. {question.options[option as keyof Options]}
                                                </button>
                                            ))}
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <span className="font-semibold text-base text-[#1D2939]">Explanation</span>
                                <textarea
                                    className="h-[95px] border border-solid border-[#D0D5DD] rounded-md p-2"
                                    placeholder="Add explanation"
                                    value={question.explanation}
                                    onChange={(e) => handleExplanationChange(index, e.target.value)}
                                />
                            </div>
                        </div>
                    </Collapsible>
                </div>
            ))}
            <button onClick={handleAddQuestion} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                Add Question
            </button>
        </div>
    );
}

export default Questions;

