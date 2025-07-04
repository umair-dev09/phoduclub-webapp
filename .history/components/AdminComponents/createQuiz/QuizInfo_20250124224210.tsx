import Image from "next/image";
import React, { useState, useEffect, useRef, SetStateAction, Dispatch } from "react";
import 'quill/dist/quill.snow.css';
import ReactQuill from 'react-quill-new'; // Ensure correct import
import Quill from 'quill'; // Import Quill to use it for types
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover';
import QuillResizeImage from 'quill-resize-image';
Quill.register("modules/resize", QuillResizeImage);
// Sending Data the to Createquiz 
interface QuizInfoProps {
    quizName: string;
    setQuizName: Dispatch<SetStateAction<string>>;
    quizDescription: string;
    setQuizDescription: Dispatch<SetStateAction<string>>;
}

function Quizinfo({ quizName, setQuizName, quizDescription, setQuizDescription }: QuizInfoProps) {
    const [value, setValue] = useState(quizDescription); // Initialize with quizDescription
    const quillRef = useRef<ReactQuill | null>(null); // Ref to hold ReactQuill instance
    const [quill, setQuill] = useState<Quill | null>(null);
    const [alignment, setAlignment] = useState<string | null>(null); // State to hold alignment
    const [isWriting, setIsWriting] = useState(false); // Track if text is being written
    const modules = {
        toolbar: false, // We're using custom toolbar
        resize: {
            locale: {},
        },

    };

    const handleChange = (content: string) => {
        // Set the content in local state
        setValue(content);

        // Check if the content is empty or non-empty
        checkTextContent(content);

        // Update the parent component's state with the new content
        setQuizDescription(content);

        // Check if the content is empty after trimming and reset the state if needed
        if (quill) {
            const textContent = quill.getText().trim();  // Get plain text from the editor
            // We consider the content as "empty" if it contains only whitespace or line breaks.
            if (textContent === '' || textContent === '\n') {
                setValue(''); // Clear the content if it's empty
            } else {
                setValue(content); // Otherwise, set the content normally
            }
        }
    };

    const checkTextContent = (content: string) => {
        // Trim the content and check if there's actual text (excluding HTML tags like <p></p>)
        const plainText = content.replace(/<[^>]+>/g, '').trim();
        setIsWriting(plainText.length > 0);
    };

    const handleIconClick = (format: string) => {
        if (quill) {
            const range = quill.getSelection();  // Get the current selection
            if (range) {
                const currentFormats = quill.getFormat(range);  // Get current formatting at selection

                if (format === 'link') {
                    const url = prompt("Enter the link URL:");
                    if (url) {
                        quill.format('link', url);  // Apply link formatting with the provided URL
                    }
                } else if (format === 'image') {
                    const fileInput = document.createElement('input');
                    fileInput.type = 'file';
                    fileInput.accept = 'image/*';
                    fileInput.onchange = () => {
                        const file = fileInput.files?.[0];  // Safely access file
                        if (file) {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                if (e.target && e.target.result) {  // Validate e.target
                                    const imageUrl = e.target.result as string;  // Type assertion
                                    quill.insertEmbed(range.index, 'image', imageUrl);
                                }
                            };
                            reader.readAsDataURL(file);
                        }
                    };
                    fileInput.click();
                } else if (format === 'ordered') {
                    quill.format('list', currentFormats.list === 'ordered' ? false : 'ordered');
                } else if (format.startsWith('align')) {
                    if (format === 'align-left') {
                        quill.format('align', false);
                        setAlignment('left');
                    } else {
                        quill.format('align', format.split('-')[1]);
                        setAlignment(format.split('-')[1]);
                    }
                } else {
                    const isActive = currentFormats[format];
                    quill.format(format, !isActive);
                }
            }
        }
    };



    useEffect(() => {
        if (quillRef.current) {
            setQuill(quillRef.current.getEditor());
        }
    }, []);

    useEffect(() => {
        // Whenever quizDescription changes, update the value of the Quill editor
        setValue(quizDescription);
    }, [quizDescription]);

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
                            modules={modules}
                            placeholder="Description"
                            className="text-[#1D2939] focus:outline-none rounded-b-[12px] custom-quill placeholder:not-italic min-h-[10px] max-h-[350px] overflow-y-auto border-none font-normal"
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
                                <Popover placement="bottom-start" className="flex flex-row justify-end">
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
                                    <PopoverContent className="flex flex-row bg-white rounded-[8px] border-[1px] border-solid border-[#EAECF0] p-2 w-[120px] shadow-[0_2px_4px_#EAECF0] gap-2 ">
                                        {/* Alignment options inside the popover */}
                                        <button onClick={() => handleIconClick("align-left")} className="flex items-center justify-center hover:bg-[#EAECF0]">
                                            <Image src="/icons/align-left.svg" width={30} height={30} alt="align-left" />
                                        </button>
                                        <button onClick={() => handleIconClick("align-center")} className="flex items-center justify-center hover:bg-[#EAECF0]">
                                            <Image src="/icons/align-middle.svg" width={30} height={30} alt="align-center" />
                                        </button>
                                        <button onClick={() => handleIconClick("align-right")} className="flex items-center justify-center hover:bg-[#EAECF0]">
                                            <Image src="/icons/align-right.svg" width={30} height={30} alt="align-right" />
                                        </button>

                                    </PopoverContent>
                                </Popover>
                                <button
                                    onClick={() => handleIconClick('ordered')}>
                                    <Image src="/icons/dropdown-icon-2.svg" width={27} height={27} alt="dropdown-icon" />
                                </button>
                                <button onClick={() => handleIconClick('image')}>
                                    <Image src="/icons/upload-image-icon.svg" width={24} height={24} alt="upload-image-icon" />
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
