"use client";
import Image from "next/image";
import { PopoverContent, PopoverTrigger, Popover } from '@nextui-org/popover';
import Collapsible from 'react-collapsible';
import React, { useState, useEffect, useRef, SetStateAction, Dispatch } from "react";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill'; // Ensure correct import
import Quill from 'quill'; // Import Quill to use it for types
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

    // Handler for input change
    const handleInputChange = (index: number, value: string | React.ChangeEvent<HTMLInputElement>) => {
        const newQuestionsList = [...questionsList];

        // Check if value is a string (from ReactQuill) or a ChangeEvent (from input)
        if (typeof value === 'string') {
            newQuestionsList[index].question = value;
        } else {
            newQuestionsList[index].question = value.target.value;
        }

        setQuestionsList(newQuestionsList);
    };
    // -----------------------------------------------------------------------------------------------------------
    // Handler for checkbox change
    const handleCheckboxChange = (index: number) => {
        const newQuestionsList = [...questionsList];
        newQuestionsList[index].isChecked = !newQuestionsList[index].isChecked;
        setQuestionsList(newQuestionsList);
    };
    // -----------------------------------------------------------------------------------------------------------
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
    // -----------------------------------------------------------------------------------------------------------
    // Handler for adding the Questions
    const handleAddQuestionduplicate = (duplicateQuestion?: Question) => {
        const newQuestion = duplicateQuestion
            ? { ...duplicateQuestion } // Duplicate all properties of the question
            : {
                question: '',
                isChecked: false,
                isActive: false,
                options: { A: '', B: '', C: '', D: '' },
                correctAnswer: null,
                explanation: ''
            };

        setQuestionsList([...questionsList, newQuestion]);
    };
    // -----------------------------------------------------------------------------------------------------------
    // Handler for deleting question
    const handleDeleteQuestion = (index: number) => {
        console.log("Deleting question at index:", index); // Debugging
        setQuestionsList((prevList) => {
            // Set isActive to false for the question being deleted
            const updatedList = prevList.map((q, i) => (i === index ? { ...q, isActive: false } : q));
            return updatedList.filter((_, i) => i !== index); // Delete the question
        });
    };
    // -----------------------------------------------------------------------------------------------------------
    // Handler for option change
    const handleOptionChange = (questionIndex: number, optionKey: keyof Options, value: string) => {
        const newQuestionsList = [...questionsList];
        newQuestionsList[questionIndex].options[optionKey] = value;
        setQuestionsList(newQuestionsList);
    };
    // -----------------------------------------------------------------------------------------------------------
    // Handler for explanation change
    const handleExplanationChange = (index: number, value: string) => {
        const newQuestionsList = [...questionsList];
        newQuestionsList[index].explanation = value;
        setQuestionsList(newQuestionsList);
    };
    // -----------------------------------------------------------------------------------------------------------
    // STATE MANGEMENT FOR SELECT ANSWER AND POPOVER 
    // Track popover state for each question
    const [popoverOpenStates, setPopoverOpenStates] = useState<boolean[]>([]);

    // Handler for setting correct answer
    const handleCorrectAnswerSelect = (questionIndex: number, optionKey: keyof Options) => {
        const newQuestionsList = [...questionsList];
        newQuestionsList[questionIndex].correctAnswer = optionKey;
        setQuestionsList(newQuestionsList);
        handlePopoverClose(questionIndex);
    };

    const getSelectedAnswerDisplay = (question: Question) => {
        if (!question.correctAnswer) return "Select correct answer";

        // Assert that correctAnswer is a valid key in the options object
        const selectedAnswer = question.options[question.correctAnswer as keyof Options];

        return selectedAnswer
            ? `${question.correctAnswer}. ${selectedAnswer}`
            : `Option ${question.correctAnswer}`;
    };

    // Handle click on select button for a specific question
    const handleclickonselectbutton = (questionIndex: number) => {
        const updatedPopoverStates = [...popoverOpenStates];
        updatedPopoverStates[questionIndex] = !popoverOpenStates[questionIndex];
        setPopoverOpenStates(updatedPopoverStates); // Toggle the popover for the specific question
    };

    const handlePopoverClose = (questionIndex: number) => {
        const updatedPopoverStates = [...popoverOpenStates];
        updatedPopoverStates[questionIndex] = false;
        setPopoverOpenStates(updatedPopoverStates);
    };

    const isActive = (questionIndex: number) =>
        popoverOpenStates[questionIndex];
    // -----------------------------------------------------------------------------------------------------------
    // state for ReactQuill
    const [value, setValue] = useState('');
    const quillRef = useRef<ReactQuill | null>(null); // Ref to hold ReactQuill instance
    const [quill, setQuill] = useState<Quill | null>(null);
    const [alignment, setAlignment] = useState<string | null>(null); // State to hold alignment
    const [isWriting, setIsWriting] = useState(false); // Track if text is being written

    const handleChange = (content: string) => {
        setValue(content);
        checkTextContent(content);

    };

    const checkTextContent = (content: string) => {
        // Trim the content and check if there's actual text (excluding HTML tags like <p></p>)
        const plainText = content.replace(/<[^>]+>/g, '').trim();
        setIsWriting(plainText.length > 0);
    };
    const handleBlur = () => {
        setIsWriting(false); // Reset isWriting when user clicks outside
    };


    const handleIconClick = (format: string) => {
        if (quill) {
            const range = quill.getSelection();
            if (range) {
                const currentFormats = quill.getFormat(range);
                if (format === 'ordered') {
                    // Toggle ordered list
                    quill.format('list', currentFormats.list === 'ordered' ? false : 'ordered');
                } else if (format === 'bullet') {
                    // Toggle bullet list
                    quill.format('list', currentFormats.list === 'bullet' ? false : 'bullet');
                } else if (format.startsWith('align')) {
                    if (format === 'align-left') {
                        quill.format('align', false); // Remove alignment for 'left'
                        setAlignment('left'); // Update alignment state to 'left'
                    } else {
                        quill.format('align', format.split('-')[1]);
                        setAlignment(format.split('-')[1]);
                    }
                } else {
                    const isActive = currentFormats[format];
                    quill.format(format, !isActive); // Toggle other formatting options
                }
            }
        }
    };

    useEffect(() => {
        if (quillRef.current) {
            setQuill(quillRef.current.getEditor());
        }
    }, []);

    const handleKeyDown = () => {
        if (quill) {
            const range = quill.getSelection();
            if (range) {
                const currentFormats = quill.getFormat(range);
                if (currentFormats.bold) {
                    quill.format('bold', false); // Clear bold formatting when typing starts
                }
                if (currentFormats.italic) {
                    quill.format('italic', false); // Clear italic formatting when typing starts
                }
                if (currentFormats.underline) {
                    quill.format('underline', false);
                }
            }
        }
    };
    // ------------------------------------------------------------------------------------------------------------------------------------
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
                                {/* <input
                                    className="font-medium pl-3 text-[#101828] text-sm placeholder:text-[#A1A1A1] rounded-md placeholder:font-normal
                                        focus:outline-none focus:ring-0 border border-solid border-[#D0D5DD] h-[40px] focus:border-[#D6BBFB]
                                              focus:shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]"
                                    placeholder="Enter question"
                                    type="text"
                                    value={question.question}
                                    onChange={(e) => handleInputChange(index, e)}
                                /> */}
                                <div
                                    className={`pt-2 bg-[#FFFFFF] border ${isWriting ? 'border-[#D6BBFB]  shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]' : 'border-[#EAECF0]'
                                        } rounded-[12px] h-auto`}>
                                    <div className="bg-[#FFFFFF] ">
                                        <ReactQuill
                                            ref={quillRef}
                                            onBlur={handleBlur}
                                            value={question.question}
                                            onChange={(value) => handleInputChange(index, value)}
                                            onKeyDown={handleKeyDown}
                                            modules={{ toolbar: false }}
                                            placeholder="Description"
                                            className="text-[#1D2939] focus:outline-none rounded-b-[12px] custom-quill placeholder:not-italic min-h-[10px] max-h-[150px] overflow-y-auto border-none font-normal"
                                        />
                                    </div>
                                    <div className="h-[66px] bg-[#FFFFFF] rounded-bl-[12px] rounded-br-[12px] flex justify-center items-center">
                                        <div className="flex flex-row w-full justify-between items-center mx-5">
                                            <div className="h-[24px] w-[288px] gap-[24px] flex flex-row">
                                                <button onClick={() => handleIconClick('bold')}>
                                                    <Image src="/icons/Bold.svg" width={24} height={24} alt="bold" />
                                                </button>
                                                <button onClick={() => handleIconClick('italic')}>
                                                    <Image src="/icons/italic-icon.svg" width={24} height={24} alt="italic-icon" />
                                                </button>
                                                <button onClick={() => handleIconClick('underline')}>
                                                    <Image src="/icons/underline-icon.svg" width={24} height={24} alt="underline-icon" />
                                                </button>
                                                <Popover backdrop="blur" placement="bottom-start" className="flex flex-row justify-end">
                                                    <PopoverTrigger className="">
                                                        <button className="flex items-center justify-center p-1">
                                                            {alignment === 'center' ? (
                                                                <Image src="/icons/align-middle.svg" width={24} height={26} alt="align-center" />
                                                            ) : alignment === 'right' ? (
                                                                <Image src="/icons/align-right.svg" width={24} height={26} alt="align-right" />
                                                            ) : (
                                                                <Image src="/icons/dropdown-icon-1.svg" width={32} height={32} alt="align-left" />
                                                            )}
                                                        </button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="ml-1 gap-4">
                                                        <div className="flex flex-row bg-white rounded-[8px] border-[1px] border-solid border-[#EAECF0] p-2 w-[120px] shadow-[0_2px_4px_#EAECF0] gap-2 ">
                                                            <button onClick={() => handleIconClick("align-left")} className="flex items-center justify-center">
                                                                <Image src="/icons/align-left.svg" width={30} height={30} alt="align-left" />
                                                            </button>
                                                            <button onClick={() => handleIconClick("align-center")} className="flex items-center justify-center">
                                                                <Image src="/icons/align-middle.svg" width={30} height={30} alt="align-center" />
                                                            </button>
                                                            <button onClick={() => handleIconClick("align-right")} className="flex items-center justify-center">
                                                                <Image src="/icons/align-right.svg" width={30} height={30} alt="align-right" />
                                                            </button>
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
                                                <button onClick={() => handleIconClick('ordered')}>
                                                    <Image src="/icons/dropdown-icon-2.svg" width={27} height={27} alt="ordered-list" />
                                                </button>
                                                <button onClick={() => handleIconClick('bullet')}>
                                                    <Image src="/icons/dropdown-icon-3.svg" width={27} height={27} alt="bullet-list" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                    <div key={optionKey} className="flex flex-row items-center gap-2">
                                        <div className="h-8 w-8 bg-[#F9FAFB] border border-solid border-[#D0D5DD] rounded-[6px]">
                                            <span className="text-[#475467] text-sm font-medium flex justify-center items-center h-full w-full">
                                                {optionKey}
                                            </span>
                                        </div>
                                        <Image
                                            src="/icons/three-double-dots.svg"
                                            width={20}
                                            height={20}
                                            alt="Three-dots"
                                        />
                                        <input
                                            className="font-medium pl-3 text-[#101828] text-sm placeholder:text-[#A1A1A1] rounded-md w-full placeholder:font-normal
                                                focus:outline-none focus:ring-0 border border-solid border-[#D0D5DD] h-[40px] focus:border-[#D6BBFB]
                                              focus:shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]"
                                            placeholder={`Option ${optionKey}`}
                                            value={question.options[optionKey]}
                                            onChange={(e) => handleOptionChange(index, optionKey, e.target.value)}
                                        />
                                    </div>
                                ))}
                            </div>

                            <span className="font-semibold text-base text-[#1D2939]">Correct answer</span>
                            <Popover
                                key={index}
                                placement="bottom"
                                isOpen={popoverOpenStates[index]} // Check the specific state for this question
                                onClose={() => handlePopoverClose(index)}
                            >
                                <PopoverTrigger>
                                    <button
                                        className={`h-[40px] px-3 items-center w-full justify-between flex flex-row rounded-md border border-solid ${isActive(index)
                                            ? 'border-[#D6BBFB] shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]'
                                            : 'border-[#D0D5DD]'
                                            } bg-[#FFFFFF] focus:outline-none`}
                                        onClick={() => handleclickonselectbutton(index)} // Pass the index
                                    >
                                        <span
                                            className={`font-normal text-sm ${questionsList[index].correctAnswer ? 'text-[#101828]' : 'text-[#667085]'
                                                }`}
                                        >
                                            {getSelectedAnswerDisplay(question)}
                                        </span>
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <div className="w-[60.813rem] rounded-md border border-solid border-[#EAECF0] bg-[#FFFFFF] flex flex-col pt-[8px] shadow-lg">
                                        {(Object.keys(question.options) as Array<keyof Options>).map((optionKey) => (
                                            <div
                                                key={optionKey}
                                                className="flex flex-row justify-between w-full h-[40px] items-center hover:bg-[#F2F4F7] px-2 cursor-pointer"
                                                onClick={() => handleCorrectAnswerSelect(index, optionKey)} // Pass the index
                                            >
                                                <span className="font-normal text-[#0C111D] text-sm">
                                                    {optionKey}. {question.options[optionKey] || `Option ${optionKey}`}
                                                </span>
                                                {questionsList[index].correctAnswer === optionKey && (
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
                                    focus:outline-none focus:ring-0 border border-solid border-[#D0D5DD] h-[40px] focus:border-[#D6BBFB]
                                              focus:shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]"
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

