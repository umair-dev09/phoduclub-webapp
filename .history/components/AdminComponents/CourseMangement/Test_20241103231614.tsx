"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef, SetStateAction, Dispatch } from "react";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill'; // Ensure correct import
import Quill from 'quill'; // Import Quill to use it for types
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover';
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
// Define the props interface
interface TestProps {
    isOpen: boolean;           // isOpen should be a boolean
    toggleDrawer: () => void;  // toggleDrawer is a function that returns void
}
function Test({ isOpen, toggleDrawer }: TestProps) {
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
    // -----------------------------------------------------------------------------------------------------------------------------------------------------

    return (
        <div>
            <Drawer
                open={isOpen}

                direction="bottom"
                className="rounded-tl-md rounded-tr-md "
                style={{ height: "98vh" }}
            >
                {/* Drawer content goes here */}
                <div className="flex flex-col h-full"> {/* Change 1: Wrap everything in a flex column container */}
                    {/* Top Section - Fixed */}
                    <div className="p-5 flex justify-between items-center h-[69px] w-full border-b-[1.5px] border-t-[1.5px] border-[#EAECF0] rounded-tl-[18px] rounded-tr-[16px]">
                        <span className="text-lg font-semibold text-[#1D2939]">Lesson</span>
                        <div className={`w-[150px] h-[44px]  rounded-[8px] flex items-center justify-center flex-row gap-2  `}>
                            <button
                                onClick={toggleDrawer}
                                className="w-[103px] h-[40px] flex items-center justify-center text-sm  border border-solid border-[#EAECF0] font-semibold text-[#1D2939] rounded-[8px] p-4 ">
                                Cancel
                            </button>
                            <button
                                onClick={toggleDrawer}
                                className="w-[88px] h-[40px] flex items-center justify-center text-sm shadow-inner-button bg-[#8501FF] border border-solid border-[#9012FF] font-semibold text-[#FFFFFF] rounded-md p-4 ">
                                Save
                            </button>
                        </div>
                    </div>
                    <div className="mt-4 h-auto p-6 gap-4  rounded-md bg-[#FFFFFF] border border-solid border-[#EAECF0] w-[684px] flex flex-col">
                        <div className='flex flex-col gap-2'>
                            <span className='text-[#1D2939] text-sm font-semibold'>Name</span>
                            <input
                                className="font-normal pl-3 text-[#1D2939] text-sm placeholder:text-[#A1A1A1] rounded-md placeholder:font-normal
                        focus:outline-none focus:ring-0 
                        border border-solid border-[#D0D5DD] h-[40px] 
                        shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] 
                        transition duration-200 ease-in-out "
                                placeholder="Name"
                                type="text"
                            />
                        </div>
                        {/* Description of Courses */}
                        <div className="flex flex-col gap-2">
                            <span className='text-[#1D2939] text-sm font-semibold '>Description</span>
                            <div
                                className={`pt-2 bg-[#FFFFFF] border ${isWriting ? 'border-[#D6BBFB]  shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]' : 'border-[#EAECF0]'
                                    } rounded-[12px] h-auto`}>
                                <div className="bg-[#FFFFFF] ">
                                    <ReactQuill
                                        ref={quillRef}
                                        onBlur={handleBlur}
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
                        {/* Upload the Image */}
                        <div className=" flex flex-col gap-2">
                            <span className="text-[#1D2939] font-semibold text-sm">Image</span>
                            <div className="h-[148px] rounded-xl bg-[#F9FAFB] border-2 border-dashed border-[#D0D5DD]">
                                <button className="flex flex-col items-center justify-center gap-4 h-full w-full">
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
                                </button>
                            </div>
                        </div>
                    </div>
            </Drawer>
        </div>
    )
}
export default Test;