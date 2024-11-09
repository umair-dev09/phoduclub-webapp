import Image from "next/image";
import React, { useState, useEffect, useRef, SetStateAction, Dispatch } from "react";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill-new'; // Ensure correct import
import Quill from 'quill'; // Import Quill to use it for types
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover';

// Sending Data the to Createquiz
interface QuizInfoProps {
    quizName: string;
    setQuizName: Dispatch<SetStateAction<string>>;
    quizDescription: string;
    setQuizDescription: Dispatch<SetStateAction<string>>;
}

function Quizinfo({ quizName, setQuizName, quizDescription, setQuizDescription }: QuizInfoProps) {
    const [value, setValue] = useState('');
    const quillRef = useRef<ReactQuill | null>(null); // Ref to hold ReactQuill instance
    const [quill, setQuill] = useState<Quill | null>(null);
    const [alignment, setAlignment] = useState<string | null>(null); // State to hold alignment
    const [isWriting, setIsWriting] = useState(false); // Track if text is being written

    const handleChange = (content: string) => {
        setValue(content);
        checkTextContent(content);
        setQuizDescription(content); // Update quiz description with editor content
    };

    const checkTextContent = (content: string) => {
        // Trim the content and check if there's actual text (excluding HTML tags like <p></p>)
        const plainText = content.replace(/<[^>]+>/g, '').trim();
        setIsWriting(plainText.length > 0);
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

    return (
        <div className='mt-2 h-auto rounded-md border border-solid border-[#EAECF0] bg-[#FFFFFF] flex flex-col p-5 gap-2'>
            <div className='flex flex-col gap-2'>
                <span className='text-[#1D2939] text-sm font-medium'>Quiz Name</span>
                <input
                    className="font-medium pl-3 text-[#1D2939] text-sm placeholder:text-[#A1A1A1] rounded-md placeholder:font-normal
                        focus:outline-none focus:ring-0 
                        border border-solid border-[#D0D5DD] h-[40px] 
                        shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] 
                        transition duration-200 ease-in-out 
                        focus:border-[#D6BBFB] 
                        focus:shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]
                        focus:text-[#1D2939]
                        focus:font-medium"
                    placeholder="Quiz Name"
                    type="text"
                    value={quizName}
                    onChange={(e) => setQuizName(e.target.value)} // Controlled input for quiz name
                />
            </div>

            <div className="flex flex-col gap-2">
                <span className='text-[#1D2939] text-sm font-medium pt-1'>Description</span>
                <div
                    className={`pt-2 bg-[#FFFFFF] border ${isWriting ? 'border-[#D6BBFB]  shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]' : 'border-[#EAECF0]'
                        } rounded-[12px] h-auto`}>
                    {/* Textarea for writing the description */}
                    <div className="bg-[#FFFFFF] ">
                        <ReactQuill
                            ref={quillRef}
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
        </div>
    );
}

export default Quizinfo;