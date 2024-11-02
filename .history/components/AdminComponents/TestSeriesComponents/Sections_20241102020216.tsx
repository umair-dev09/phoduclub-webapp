
"use client";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill'; // Ensure correct import
import Quill from 'quill'; // Import Quill to use it for types
import Collapsible from 'react-collapsible';
interface SectionProps {
    sectionsCount: number;
}

function Sections({ sectionsCount }: SectionProps) {
    const [sections, setSections] = useState<Array<{
        name: string;
        date: string;
        time: string;
        showContent: boolean;
    }>>([{ name: "", date: "", time: "", showContent: false }]);

    const [isCreateSection, setIsCreateSection] = useState(false);
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const [tempSection, setTempSection] = useState({
        name: "",
        date: "",
        time: ""
    });

    // Using useEffect instead of useState for tracking sectionsCount changes
    useEffect(() => {
        if (sectionsCount > sections.length) {
            setSections(prev => [...prev, { name: "", date: "", time: "", showContent: false }]);
        }
    }, [sectionsCount, sections.length]);

    const openCreateSection = (index: number) => {
        setCurrentSectionIndex(index);
        setTempSection({ name: "", date: "", time: "" });
        setIsCreateSection(true);
    };

    const closeCreateSection = () => setIsCreateSection(false);

    const handleCreateSection = () => {
        if (tempSection.name && tempSection.date && tempSection.time) {
            const newSections = [...sections];
            newSections[currentSectionIndex] = {
                ...tempSection,
                showContent: true
            };
            setSections(newSections);
            setIsCreateSection(false);
        }
    };
    // State to control the visibility of content div
    const [showContent, setShowContent] = useState(false);

    const handleAddManually = () => {
        setShowContent(true); // Show the "Content" div
    };

    const [isSaveDialog, setIsSaveDialog] = useState(false);

    const handleSave = () => {
        setIsSaveDialog(true); // Opens the dialog
    };

    const closeDialog = () => {
        setIsSaveDialog(false); // Closes the dialog
    };




    // ----------------------------------------------------------------------------------------------------------------------------------------


    const [value, setValue] = useState('');
    const quillRef = useRef<ReactQuill | null>(null);
    const [quillInstance, setQuillInstance] = useState<Quill | null>(null);
    const [alignment, setAlignment] = useState<string | null>(null);
    const [isWriting, setIsWriting] = useState(false);

    // Initialize Quill instance
    useEffect(() => {
        if (quillRef.current) {
            const editor = quillRef.current.getEditor();
            setQuillInstance(editor);
        }
    }, []);

    // Comprehensive content change handler
    const handleChange = (content: string) => {
        setValue(content);
        checkTextContent(content);
    };

    // Check if there's actual text content
    const checkTextContent = (content: string) => {
        const plainText = content.replace(/<[^>]+>/g, '').trim();
        setIsWriting(plainText.length > 0);
    };

    // Improved icon click handler with more robust formatting logic
    const handleIconClick = useCallback((format: string) => {
        if (!quillInstance) return;

        const selection = quillInstance.getSelection();
        if (!selection) return;

        const currentFormats = quillInstance.getFormat(selection);

        switch (format) {
            case 'ordered':
                quillInstance.format('list', currentFormats.list === 'ordered' ? false : 'ordered');
                break;
            case 'bullet':
                quillInstance.format('list', currentFormats.list === 'bullet' ? false : 'bullet');
                break;
            case 'align-left':
                quillInstance.format('align', false);
                setAlignment('left');
                break;
            case 'align-center':
            case 'align-right':
                quillInstance.format('align', format.split('-')[1]);
                setAlignment(format.split('-')[1]);
                break;
            default:
                // For bold, italic, underline, etc.
                const isActive = currentFormats[format];
                quillInstance.format(format, !isActive);
                break;
        }
    }, [quillInstance]);

    // Handle blur to reset writing state
    const handleBlur = () => {
        setIsWriting(false);
    };

    // Handle key down to manage formatting
    const handleKeyDown = () => {
        if (!quillInstance) return;

        const selection = quillInstance.getSelection();
        if (!selection) return;

        const currentFormats = quillInstance.getFormat(selection);

        // Clear formatting when typing starts
        const formatsToReset = ['bold', 'italic', 'underline'];
        formatsToReset.forEach(format => {
            if (currentFormats[format]) {
                quillInstance.format(format, false);
            }
        });
    };





    // -------------------------------------------------------------------------------------------------------
    const [options, setOptions] = useState([
        { id: 'A', label: 'Option 1', text: '' },
        { id: 'B', label: 'Option 2', text: '' },
        { id: 'C', label: 'Option 3', text: '' },
        { id: 'D', label: 'Option 4', text: '' },
    ]);

    // State for the selected option
    const [selectedOption, setSelectedOption] = useState(null);

    // Handle input change for each option
    const handleInputChange = (id: string, text: any) => {
        setOptions((prevOptions) =>
            prevOptions.map((option) =>
                option.id === id ? { ...option, text } : option
            )
        );
    };

    // Function to handle option selection in popover
    const handleOptionClick = (option: { id?: string; label: any; text: any; }) => {
        setSelectedOption(option.text || option.label);
    };

    // State to track the selected difficulty level
    const [selectedDifficulty, setSelectedDifficulty] = useState("Easy");

    // Function to handle difficulty selection
    const handleDifficultySelect = (difficulty: any) => {
        setSelectedDifficulty(difficulty);
    };
    // Function to get the background color based on difficulty
    const getBackgroundColor = (difficulty: any) => {
        switch (difficulty) {
            case 'Easy':
                return '#D3F8E0'; // Greenish for Easy
            case 'Medium':
                return '#FFFAEB'; // Yellowish for Medium
            case 'Hard':
                return '#FEE4E2'; // Reddish for Hard
            default:
                return '#D3F8E0';
        }
    };

    // Step 1: Define the type for your questions
    type Question = { id: number; value: string };


    // Step 2: Use the defined type in useState
    const [questions, setQuestions] = useState<Question[]>([]);

    const handleAddQuestion = () => {
        // Add a new question with an incrementing id and an empty value
        setQuestions([...questions, { id: questions.length + 1, value: '' }]);
    };

    const handleDelete = (id: number) => {
        // Filter out the deleted question
        setQuestions(prevQuestions => prevQuestions.filter(question => question.id !== id));
    };

    const handleDuplicate = (question: any) => {
        // Create a duplicate question object (you may need to adjust properties)
        const duplicateQuestion = { ...question, id: Date.now() }; // Using timestamp as a new ID
        setQuestions(prevQuestions => [...prevQuestions, duplicateQuestion]);
    };

    return (
        <div className=" mb-4">
            {sections.map((section, index) => (
                <div key={index} className={`h-auto rounded-[16px] ${index > 0 ? 'mt-4' : ''} flex flex-col border border-solid border-[#EAECF0] bg-[#FFFFFF] mt-4`}>
                    {section.showContent ? (
                        <>
                            {/* x div */}
                            <div className="h-auto bg-[#FFFFFF] rounded-t-[16px] border-b border-solid border-[#EAECF0]">
                                <div className="flex flex-row justify-between p-2">
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-base text-[#1D2939]">{section.name}</span>
                                        <div className="flex flex-row mt-2 items-center">
                                            <Image
                                                src="/icons/select-date.svg"
                                                width={16}
                                                height={16}
                                                alt="Calendar Icon"
                                            />
                                            <span className="font-normal text-[#475467] text-xs ml-1">Schedule :</span>
                                            <span className="ml-2 text-[#101828] text-xs font-medium">
                                                {section.date} {section.time}
                                            </span>
                                        </div>
                                        <div>

                                        </div>
                                    </div>
                                    <div className="flex flex-row  items-center justify-center">
                                        {showContent && (
                                            <Popover placement="bottom-end">
                                                <PopoverTrigger>
                                                    <button

                                                        className="flex flex-row gap-1 items-center h-[44px] w-[152px] justify-center">
                                                        <Image src="/icons/plus-sign.svg" height={18} width={18} alt="Plus Sign" />
                                                        <span className="text-[#9012FF] font-semibold text-sm">Add Questions</span>
                                                    </button>
                                                </PopoverTrigger>
                                                <PopoverContent className="flex flex-col px-0 text-sm font-normal bg-white border border-lightGrey rounded-md w-[167px] shadow-md">
                                                    <button
                                                        className="p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full"
                                                        onClick={handleAddQuestion}
                                                    >
                                                        <span className="text-sm text-[#0C111D] font-normal">Add manually</span>
                                                    </button>
                                                    <button className="p-3 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full">
                                                        <span className="text-sm text-[#0C111D] font-normal">Upload CSV File</span>
                                                    </button>
                                                </PopoverContent>
                                            </Popover>
                                        )}
                                        <button>
                                            <Image
                                                src="/icons/three-dots.svg"
                                                width={20}
                                                height={20}
                                                alt="Three Dots Icon"
                                            />
                                        </button>

                                    </div>
                                </div>
                                <span className="font-normal text-sm text-[#475467] mb-1 px-2">Lorem ipsum dolor sit amet consectetur adipisicing </span>
                                <div className="flex flex-row gap-2 px-2">
                                    <div className="flex flex-row gap-1">
                                        <Image
                                            src="/icons/clock-01.svg"
                                            width={16}
                                            height={16}
                                            alt="overall time" />
                                        <span className=" text-[#475467] font-nromal text-sm">Overall Time :</span>
                                        <span className="font-normal text-[#101828] text-xs">10 min</span>

                                    </div>
                                    <div className="flex flex-row gap-1">
                                        <Image
                                            src="/icons/clock-01.svg"
                                            width={16}
                                            height={16}
                                            alt="overall time" />
                                        <span className=" text-[#475467] font-nromal text-sm">Overall Time :</span>
                                        <span className="font-normal text-[#101828] text-xs">10 min</span>

                                    </div>
                                    <div className="flex flex-row gap-1">
                                        <Image
                                            src="/icons/clock-01.svg"
                                            width={16}
                                            height={16}
                                            alt="overall time" />
                                        <span className=" text-[#475467] font-nromal text-sm">Overall Time :</span>
                                        <span className="font-normal text-[#101828] text-xs">10 min</span>

                                    </div>
                                </div>
                            </div>
                            {/* when  Content div is hidden show this div*/}
                            {!showContent && (
                                <div className="bg-[#FFFFFF] h-[184px] p-6 items-center flex flex-col gap-2 rounded-[16px]">
                                    <span className="text-[#1D2939] font-semibold text-lg">Create section/questions</span>
                                    <span className="font-normal text-xs text-[#667085]">
                                        Test Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
                                    </span>
                                    <div className="flex flex-row gap-4 mt-2">
                                        <button
                                            className="flex flex-row gap-1 items-center rounded-md border-[2px] border-solid border-[#9012FF] h-[44px] w-[162px] justify-center"
                                            onClick={() => openCreateSection(index)}
                                        >
                                            <Image src="/icons/plus-sign.svg" height={18} width={18} alt="Plus Sign" />
                                            <span className="text-[#9012FF] font-semibold text-sm">Add Section</span>
                                        </button>

                                        <Popover placement="bottom-end">
                                            <PopoverTrigger>
                                                <button className="flex flex-row gap-1 items-center rounded-md border-[2px] border-solid border-[#9012FF] h-[44px] w-[162px] justify-center">
                                                    <Image src="/icons/plus-sign.svg" height={18} width={18} alt="Plus Sign" />
                                                    <span className="text-[#9012FF] font-semibold text-sm">Add Question</span>
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent className="flex flex-col px-0 text-sm font-normal bg-white border border-lightGrey rounded-md w-[167px] shadow-md">
                                                <button
                                                    className="p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full"
                                                    onClick={handleAddManually}
                                                >
                                                    <span className="text-sm text-[#0C111D] font-normal">Add manually</span>
                                                </button>
                                                <button className="p-3 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full">
                                                    <span className="text-sm text-[#0C111D] font-normal">Upload CSV File</span>
                                                </button>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                            )}

                            {/* Content Div */}
                            {showContent && (
                                <div className="">
                                    <div className="h-[48px] bg-[#F2F4F7]  flex flex-row justify-between px-4  items-center">
                                        <div className=" flex flex-row gap-5">
                                            <input
                                                type="checkbox" />
                                            <span className="text-[#667085] font-medium text-base">Questions</span>
                                        </div>
                                        <div className=" flex flex-row gap-14">
                                            <span className="text-[#667085] font-medium text-base">Difficulty</span>
                                            <span className="text-[#667085] font-medium text-base">Action</span>
                                        </div>
                                    </div>
                                    {questions.map((question, _index) => (
                                        <Collapsible
                                            key={question.id}

                                            trigger={
                                                <div className="h-[48px] bg-[#FFFFFF]  flex flex-row justify-between px-4  items-center ">

                                                    <div className=" flex flex-row ">
                                                        <input
                                                            type="checkbox" />
                                                        <div className="h-6 w-5 rounded-[4px] bg-[#EAECF0] flex justify-center items-center ml-5 mr-2 ">
                                                            <span className="text-[#1D2939] font-semibold text-sm">1</span>
                                                        </div>
                                                        <span className="text-[#667085] font-medium text-base">
                                                            Question
                                                        </span>
                                                    </div>
                                                    <div className=" flex flex-row gap-14 items-center justify-center">
                                                        <Popover placement="bottom">
                                                            <PopoverTrigger>
                                                                <div
                                                                    className="flex flex-row items-center justify-between rounded-[6px] h-[26px] p-2 w-[92px] cursor-pointer"
                                                                    style={{ backgroundColor: getBackgroundColor(selectedDifficulty) }}
                                                                >
                                                                    <span className="font-medium text-[#182230] text-xs">{selectedDifficulty}</span>
                                                                    <Image
                                                                        src="/icons/selectdate-Arrowdown.svg"
                                                                        width={18}
                                                                        height={18}
                                                                        alt="arrow"
                                                                    />
                                                                </div>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="flex flex-col px-0 text-sm font-normal bg-white border border-lightGrey rounded-md w-[167px] shadow-md">
                                                                {['Easy', 'Medium', 'Hard'].map((level) => (
                                                                    <button
                                                                        key={level}
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            handleDifficultySelect(level);
                                                                        }

                                                                        }
                                                                        className="p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full justify-between items-center"
                                                                    >
                                                                        <div
                                                                            className={`flex flex-row items-center justify-between rounded-[6px] h-[26px] p-2 w-[92px] ${level === 'Easy' ? 'bg-[#D3F8E0]' : level === 'Medium' ? 'bg-[#FFFAEB]' : 'bg-[#FEE4E2]'
                                                                                }`}
                                                                        >
                                                                            <span className="font-medium text-[#182230] text-xs">{level}</span>
                                                                        </div>
                                                                        {selectedDifficulty === level && (
                                                                            <Image
                                                                                src="/icons/tick-02.svg"
                                                                                width={18}
                                                                                height={18}
                                                                                alt="right mark"
                                                                            />
                                                                        )}
                                                                    </button>
                                                                ))}
                                                            </PopoverContent>
                                                        </Popover>
                                                        <Popover
                                                            placement="bottom-end"
                                                        >
                                                            <PopoverTrigger>
                                                                <button
                                                                    className="w-10 p-[10px] h-[40px] gap-1 flex-row flex  bg-[#FFFFFF] rounded-md 
                                                                        shadow-none"
                                                                    style={{ outline: "none" }}
                                                                >
                                                                    <Image src="/icons/three-dots.svg" width={18} height={18} alt="three-dots" />
                                                                </button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="flex flex-col px-0 text-sm font-normal bg-white border border-lightGrey rounded-md w-[167px] shadow-md"
                                                            >
                                                                <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full">
                                                                    <Image src="/icons/edit-icon.svg" width={18} height={18} alt="Edit-quiz" />
                                                                    <span className="text-sm text-[#0C111D] font-normal">Edit Quiz</span>
                                                                </button>
                                                                <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation(); // Prevents the click from opening the Collapsible
                                                                        handleDuplicate(question); // Call your duplication logic
                                                                    }}>
                                                                    <Image src="/icons/duplicate.svg" width={18} height={18} alt="Edit-quiz" />
                                                                    <span className="text-sm text-[#0C111D] font-normal">Duplicate</span>
                                                                </button>
                                                                <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full"

                                                                    onClick={() => handleDelete(question.id)}>
                                                                    <Image src="/icons/delete.svg" width={18} height={18} alt="delete-quiz" />
                                                                    <span className="text-sm text-[#DE3024] font-normal">Delete Quiz</span>
                                                                </button>
                                                            </PopoverContent>
                                                        </Popover>
                                                    </div>
                                                </div>
                                            }>
                                            <div className="flex flex-col gap-2">
                                                <div className="flex flex-col gap-2">
                                                    <span className='text-[#1D2939] text-base font-semibold pt-1 px-4'>Questions</span>
                                                    <div
                                                        className={`pt-2 mx-4 bg-[#FFFFFF] border ${isWriting ? 'border-[#D6BBFB]  shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]' : 'border-[#EAECF0]'
                                                            } rounded-[12px] h-auto`}>
                                                        {/* Textarea for writing the description */}
                                                        <div className="bg-[#FFFFFF] ">
                                                            <ReactQuill
                                                                ref={quillRef}
                                                                onBlur={handleBlur} // Add onBlur handler
                                                                value={value}
                                                                onChange={handleChange}
                                                                onKeyDown={handleKeyDown}
                                                                modules={{ toolbar: false }}
                                                                placeholder="Description"
                                                                className="text-[#1D2939] focus:outline-none rounded-b-[12px] custom-quill placeholder:not-italic min-h-[10px] max-h-[150px] overflow-y-auto border-none font-normal"
                                                            />
                                                        </div>

                                                        <div className="h-[66px] bg-[#FFFFFF] rounded-bl-[12px] rounded-br-[12px] flex justify-center items-center">
                                                            <div className="flex flex-row w-full justify-between items-center mx-5">
                                                                {/* Formatting options */}
                                                                <div className="h-[24px] w-[288px] gap-[24px] flex flex-row">
                                                                    {/* Icons for formatting */}
                                                                    <button onClick={() => handleIconClick('bold')}>
                                                                        <Image src="/icons/Bold.svg" width={24} height={24} alt="bold" />
                                                                    </button>
                                                                    <button onClick={() => handleIconClick('italic')}>
                                                                        <Image src="/icons/italic-icon.svg" width={24} height={24} alt="italic-icon" />
                                                                    </button>
                                                                    <button onClick={() => handleIconClick('underline')}>
                                                                        <Image src="/icons/underline-icon.svg" width={24} height={24} alt="underline-icon" />
                                                                    </button>

                                                                    {/* Alignment options in a popover */}
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
                                                                            {/* Alignment options inside the popover */}
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

                                                                    {/* List options */}
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
                                                <span className="font-semibold text-base text-[#1D2939] px-4">Options</span>
                                                <div className="flex flex-col gap-3 mx-4">
                                                    {options.map((option) => (
                                                        <div key={option.id} className="flex flex-row items-center gap-2">
                                                            <div className="h-8 w-8 bg-[#F9FAFB] border border-solid border-[#D0D5DD] rounded-[6px]">
                                                                <span className="text-[#475467] text-sm font-medium flex justify-center items-center h-full w-full">
                                                                    {option.id}
                                                                </span>
                                                            </div>
                                                            <input
                                                                className="font-medium pl-3 text-[#101828] text-sm placeholder:text-[#A1A1A1] rounded-md w-full placeholder:font-normal
                            focus:outline-none focus:ring-0 border border-solid border-[#D0D5DD] h-[40px] focus:border-[#D6BBFB]
                            focus:shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]"
                                                                placeholder={option.label}
                                                                value={option.text}
                                                                onChange={(e) => handleInputChange(option.id, e.target.value)}
                                                            />
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Correct Answer Popover */}
                                                <span className="font-semibold text-base text-[#1D2939] mx-4">Correct answer</span>
                                                <Popover placement="bottom">
                                                    <PopoverTrigger>
                                                        <button className="h-[40px] mx-4 mb-3 items-center justify-between flex flex-row rounded-md border border-solid">
                                                            <span className="font-normal text-sm text-[#667085] ml-2">
                                                                {selectedOption || 'Select the option'}
                                                            </span>
                                                        </button>
                                                    </PopoverTrigger>
                                                    <PopoverContent>
                                                        <div className="w-[60.813rem] rounded-md border border-solid border-[#EAECF0] bg-[#FFFFFF] flex flex-col pt-[8px] shadow-lg">
                                                            {options.map((option) => (
                                                                <div
                                                                    key={option.id}
                                                                    className="flex flex-row justify-between w-full h-[40px] items-center hover:bg-[#F2F4F7] px-2 cursor-pointer"
                                                                    onClick={() => handleOptionClick(option)}
                                                                >
                                                                    <span className="font-normal text-[#0C111D] text-sm">
                                                                        {option.text || option.label} {/* Display typed text or placeholder label */}
                                                                    </span>
                                                                    {selectedOption === option.text && (
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

                                            </div>

                                        </Collapsible>
                                    ))}
                                    <div className="flex flex-row justify-end px-6 items-center gap-4 h-[76px] border-t border-solid border-lightGrey">
                                        <button className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md text-[#1D2939] h-[44px] w-[128px]font-semibold text-sm" >Cancel</button>
                                        <button
                                            className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#9012FF] border w-[128px] h-[44px] border-[#8501FF] rounded-md font-semibold text-sm"
                                            onClick={handleSave}
                                        >
                                            Save
                                        </button>
                                    </div>









                                </div>




                                // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                            )}
                        </>
                    ) : (
                        // y div
                        <div className="bg-[#FFFFFF] h-[184px] p-6 items-center flex flex-col gap-2 rounded-[16px]">
                            <span className="text-[#1D2939] font-semibold text-lg">Create section/questions</span>
                            <span className="font-normal text-xs text-[#667085]">
                                Test Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
                            </span>
                            <div className="flex flex-row gap-4 mt-2">
                                <button
                                    className="flex flex-row gap-1 items-center rounded-md border-[2px] border-solid border-[#9012FF] h-[44px] w-[162px] justify-center"
                                    onClick={() => openCreateSection(index)}
                                // onClick={() => handleTabClick('/admin/content/testseriesmanagement/createtestseries')}
                                >
                                    <Image src="/icons/plus-sign.svg" height={18} width={18} alt="Plus Sign" />
                                    <span className="text-[#9012FF] font-semibold text-sm">Add Section</span>
                                </button>
                                <button className="flex flex-row gap-1 items-center rounded-md border-[2px] border-solid border-[#9012FF] h-[44px] w-[162px] justify-center">
                                    <Image src="/icons/plus-sign.svg" height={18} width={18} alt="Plus Sign" />
                                    <span className="text-[#9012FF] font-semibold text-sm">Add Question</span>
                                </button>
                            </div>
                        </div>
                    )
                    }
                </div >
            ))}

            <Dialog open={isCreateSection} onClose={closeCreateSection} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 flex items-center justify-center">
                    <DialogPanel className="bg-white rounded-2xl w-[559px] h-auto">
                        <div className="flex flex-col relative gap-6">
                            <button className="absolute right-4 top-4" onClick={closeCreateSection}>
                                <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                            </button>
                            <h3 className="mx-6 mt-6 text-2xl font-semibold text-[#1D2939]">Create Section</h3>
                            <div className="flex flex-col w-full gap-2 px-6">
                                <p className="text-start text-sm text-[#1D2939] font-medium">Name</p>
                                <div className="flex flex-row w-full h-10 px-3 outline-none border border-[#D0D5DD] rounded-md">
                                    <input
                                        type="text"
                                        className="w-full px-2 text-sm text-[#182230] font-normal outline-none rounded-md"
                                        placeholder="Enter Name"
                                        value={tempSection.name}
                                        onChange={(e) => setTempSection({ ...tempSection, name: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row justify-between w-full px-6 gap-4">
                                <div className="flex flex-col w-full gap-2">
                                    <p className="text-start text-sm text-[#1D2939] font-medium">Date</p>
                                    <div className="flex flex-row w-full h-10 px-3 outline-none border border-[#D0D5DD] rounded-md">
                                        <Image src='/icons/calendar-03.svg' alt="Date" width={24} height={24} />
                                        <input
                                            type="text"
                                            className="w-full px-2 text-sm text-[#182230] font-normal outline-none rounded-md"
                                            placeholder="Select Date"
                                            value={tempSection.date}
                                            onChange={(e) => setTempSection({ ...tempSection, date: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col w-full gap-2">
                                    <p className="text-start text-sm text-[#1D2939] font-medium">Time</p>
                                    <div className="flex flex-row w-full h-10 px-3 outline-none border border-[#D0D5DD] rounded-md">
                                        <Image src='/icons/calendar-03.svg' alt="Time" width={24} height={24} />
                                        <input
                                            type="text"
                                            className="w-full px-2 text-sm text-[#182230] font-normal outline-none rounded-md"
                                            placeholder="Select Time"
                                            value={tempSection.time}
                                            onChange={(e) => setTempSection({ ...tempSection, time: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="flex flex-row justify-end mx-6 my-4 gap-4">
                                <button className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md text-[#1D2939] font-semibold text-sm" onClick={closeCreateSection}>Cancel</button>
                                <button
                                    className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#9012FF] border border-[#8501FF] rounded-md font-semibold text-sm"
                                    onClick={handleCreateSection}
                                >
                                    Create Section
                                </button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>





            <Dialog open={isSaveDialog} onClose={closeDialog} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 flex items-center justify-center">
                    <DialogPanel className="bg-white rounded-2xl w-auto h-auto">
                        <div className="flex flex-col relative gap-6">
                            <button className="absolute right-4 top-4" onClick={closeDialog}>
                                <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                            </button>
                            <h3 className="mx-6 mt-6 text-2xl font-semibold text-[#1D2939]">Set Time and Marks</h3>
                            <div className="flex flex-col w-full gap-2 px-6">
                                <p className="text-start text-sm text-[#1D2939] font-medium">Description</p>
                                <div className="flex flex-row w-full h-10 px-3 outline-none border border-[#D0D5DD] rounded-md">
                                    <input
                                        type="text"
                                        className="w-full px-1 text-sm text-[#182230] font-normal outline-none rounded-md"
                                        placeholder="Enter Description"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col px-6">
                                <p className="text-start text-sm text-[#1D2939] font-medium">Time Duration</p>
                                <div className="flex flex-row gap-4">
                                    <div className="flex flex-row w-[74px] h-10 px-3 outline-none border border-[#D0D5DD] rounded-md">
                                        <input
                                            type="text"
                                            className="w-full px-1 text-sm text-[#182230] font-normal outline-none rounded-md"
                                            placeholder="10"
                                        />
                                    </div>
                                    <div className="flex flex-row w-[500px] h-10 px-3 outline-none border border-[#D0D5DD] rounded-md">
                                        <input
                                            type="text"
                                            className="w-full px-1 text-sm text-[#182230] font-normal outline-none rounded-md"
                                            placeholder="Minutes"
                                        />
                                    </div>
                                </div>
                                <span className="text-sm text-[#475467] font-normal">Students must finish the quiz in time.</span>

                            </div>


                            <div className="flex flex-row justify-between w-full px-6 gap-4">
                                <div className="flex flex-col w-full gap-2">
                                    <p className="text-start text-sm text-[#1D2939] font-medium">Marks per question</p>
                                    <div className="flex flex-row w-full h-10 px-3 outline-none border border-[#D0D5DD] rounded-md">

                                        <input
                                            type="text"
                                            className="w-full px-1 text-sm text-[#182230] font-normal outline-none rounded-md"
                                            placeholder="Enter Marks"
                                        />
                                    </div>
                                    <span className="text-sm text-[#475467] font-normal">Applies only to the correct answers.</span>
                                </div>
                                <div className="flex flex-col w-full gap-2">
                                    <p className="text-start text-sm text-[#1D2939] font-medium">Negative marks per question</p>
                                    <div className="flex flex-row w-full h-10 px-3 outline-none border border-[#D0D5DD] rounded-md">

                                        <input
                                            type="text"
                                            className="w-full px-1 text-sm text-[#182230] font-normal outline-none rounded-md"
                                            placeholder="Enter Marks"
                                        />
                                    </div>
                                    <span className="text-sm text-[#475467] font-normal">Applies only to the incorrect answers.</span>
                                </div>
                            </div>
                            <hr />
                            <div className="flex flex-row justify-end mx-6 my-2 items-center gap-4">
                                <button
                                    className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md text-[#1D2939] font-semibold text-sm"
                                    onClick={closeDialog} // Close the dialog on cancel
                                >
                                    Cancel
                                </button>
                                <button
                                    className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#9012FF] border border-[#8501FF] rounded-md font-semibold text-sm"
                                    onClick={() => {
                                        // Add logic for creating the section here
                                        closeDialog(); // Optionally close the dialog after creating the section
                                    }}
                                >
                                    Done
                                </button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

























        </div >
    );
}

export default Sections;




