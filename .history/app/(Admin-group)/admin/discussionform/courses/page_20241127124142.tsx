"use client";
import Collapsible from 'react-collapsible';
import { Tabs, Tab } from "@nextui-org/react";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill'; // Ensure correct import
import Quill from 'quill'; // Import Quill to use it for types
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover';
import { useCollapse } from 'react-collapsed';
import Content from "@/components/AdminComponents/DiscussionForm/Contents";
import Discussion from "@/components/AdminComponents/DiscussionForm/Discussion";
function Courses() {

    const [value, setValue] = useState('');
    const quillRef = useRef<ReactQuill | null>(null); // Ref to hold ReactQuill instance
    const [quill, setQuill] = useState<Quill | null>(null);
    const [alignment, setAlignment] = useState<string | null>(null); // State to hold Quill instance
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const handleChange = (content: string) => {
        setValue(content);
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
                }
                else if (format.startsWith('align')) {
                    if (format === 'align-left') {
                        quill.format('align', false); // Remove alignment for 'left'
                        setAlignment('left'); // Update alignment state to 'left'
                    } else {
                        quill.format('align', format.split('-')[1]);
                        setAlignment(format.split('-')[1]);
                    }
                }
                else {
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

    // This will clear formatting when the user types
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
    useEffect(() => {
        if (value.trim() === '') {
            setIsButtonDisabled(true); // Disable the button if the input is empty
        } else {
            setIsButtonDisabled(false); // Enable the button if there is content
        }
    }, [value]);




    const [activeTab, setActiveTab] = useState("Content");
    const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
        welcome: false,
        maths: false,
        chemistry: false,
        physics: false,
    });

    // Toggle function for each section
    const handleToggle = (section: string) => {
        setOpenSections(prevState => ({
            ...prevState,
            [section]: !prevState[section], // Toggle the specific section
        }));
    };

    return (
        <div className="flex flex-row w-full h-full">
            <div className="w-[270px] flex flex-col border-r border-solid border-[#EAECF0]">
                <div className="h-[72px] p-6 flex flex-row items-center gap-2 border-b border-solid border-[#EAECF0] bg-[#FFFFFF]">
                    <div className="rounded-full w-[42px] h-[42px] bg-[#FFECC0] items-center flex justify-center border-2 border-solid border-[#FFFFFF]">
                        <h1 className="text-[#624C18] text-base font-bold">B</h1>
                    </div>
                    <h1 className="text-[#182230] font-semibold text-sm">BITSET Full Course</h1>
                </div>
                <div className="flex flex-col overflow-y-auto">
                    <Collapsible
                        open={openSections.welcome} // Control open state based on individual section
                        trigger={
                            <div
                                className="h-[60px] flex flex-row justify-between py-2 px-4 items-center"
                                onClick={() => handleToggle('welcome')} // Pass section name to toggle function
                            >
                                <span className="font-semibold text-base text-[#1D2939] text-left">Welcome and Introduction</span>
                                <Image
                                    src={openSections.welcome ? '/icons/arrow-up-dark.svg' : '/icons/arrow-down-dark.svg'}
                                    width={20}
                                    height={20}
                                    alt="Arrow-toggle"
                                />
                            </div>
                        }
                    >
                        <button className='bg-[#FFFFFF] w-full flex flex-col justify-center gap-2 h-[64px] px-4 hover:bg-[#F8F0FF]'>
                            <span className="font-semibold text-sm text-[#1D2939] text-left">1. Welcome and Introduction</span>
                            <div className='flex flex-row gap-2'>
                                <Image
                                    src="/icons/read.svg"
                                    width={16}
                                    height={16}
                                    alt="read-icon"
                                />
                                <span className="text-[#667085] font-normal text-sm">10:00</span>
                            </div>
                        </button>
                    </Collapsible>

                    <Collapsible
                        open={openSections.maths} // Control open state based on individual section
                        trigger={
                            <div
                                className="border-t border-solid border-[#EAECF0] flex flex-row justify-between py-2 px-4 items-center"
                                onClick={() => handleToggle('maths')} // Pass section name to toggle function
                            >
                                <span className="font-semibold text-base text-[#1D2939] text-left">Maths</span>
                                <Image
                                    src={openSections.maths ? '/icons/arrow-up-dark.svg' : '/icons/arrow-down-dark.svg'}
                                    width={20}
                                    height={20}
                                    alt="Arrow-toggle"
                                />
                            </div>
                        }
                    >
                        <div className="flex flex-col">
                            <button className='bg-[#FFFFFF] w-full flex flex-col justify-center gap-2 h-[64px] px-4 hover:bg-[#F8F0FF]'>
                                <span className="font-normal text-sm text-[#1D2939] text-left">1. Chapter 1</span>
                                <div className='flex flex-row gap-2'>
                                    <Image
                                        src="/icons/read.svg"
                                        width={16}
                                        height={16}
                                        alt="read-icon"
                                    />
                                    <span className="text-[#667085] font-normal text-sm">10:00</span>
                                </div>
                            </button>
                            <button className='bg-[#FFFFFF] w-full flex flex-col justify-center gap-2 h-[64px] px-4 hover:bg-[#F8F0FF]'>
                                <span className="font-normal text-sm text-[#1D2939] text-left">1. Chapter 2</span>
                                <div className='flex flex-row gap-2'>
                                    <Image
                                        src="/icons/read.svg"
                                        width={16}
                                        height={16}
                                        alt="read-icon"
                                    />
                                    <span className="text-[#667085] font-normal text-sm">10:00</span>
                                </div>
                            </button>
                        </div>
                    </Collapsible>

                    <Collapsible
                        open={openSections.chemistry} // Control open state based on individual section
                        trigger={
                            <div
                                className="border-t border-solid border-[#EAECF0] flex flex-row justify-between py-2 px-4 items-center"
                                onClick={() => handleToggle('chemistry')} // Pass section name to toggle function
                            >
                                <span className="font-semibold text-base text-[#1D2939] text-left">Chemistry</span>
                                <Image
                                    src={openSections.chemistry ? '/icons/arrow-up-dark.svg' : '/icons/arrow-down-dark.svg'}
                                    width={20}
                                    height={20}
                                    alt="Arrow-toggle"
                                />
                            </div>
                        }
                    >
                        <div className="flex flex-col">
                            <button className='bg-[#FFFFFF] w-full flex flex-col justify-center gap-2 h-[64px] px-4 hover:bg-[#F8F0FF]'>
                                <span className="font-normal text-sm text-[#1D2939] text-left">1. Chapter 1</span>
                                <div className='flex flex-row gap-2'>
                                    <Image
                                        src="/icons/read.svg"
                                        width={16}
                                        height={16}
                                        alt="read-icon"
                                    />
                                    <span className="text-[#667085] font-normal text-sm">10:00</span>
                                </div>
                            </button>
                            <button className='bg-[#FFFFFF] w-full flex flex-col justify-center gap-2 h-[64px] px-4 hover:bg-[#F8F0FF]'>
                                <span className="font-normal text-sm text-[#1D2939] text-left">1. Chapter 2</span>
                                <div className='flex flex-row gap-2'>
                                    <Image
                                        src="/icons/read.svg"
                                        width={16}
                                        height={16}
                                        alt="read-icon"
                                    />
                                    <span className="text-[#667085] font-normal text-sm">10:00</span>
                                </div>
                            </button>
                        </div>
                    </Collapsible>

                    <Collapsible
                        open={openSections.physics} // Control open state based on individual section
                        trigger={
                            <div
                                className="border-t border-solid border-[#EAECF0] flex flex-row justify-between py-2 px-4 items-center"
                                onClick={() => handleToggle('physics')} // Pass section name to toggle function
                            >
                                <span className="font-semibold text-base text-[#1D2939] text-left">Physics</span>
                                <Image
                                    src={openSections.physics ? '/icons/arrow-up-dark.svg' : '/icons/arrow-down-dark.svg'}
                                    width={20}
                                    height={20}
                                    alt="Arrow-toggle"
                                />
                            </div>
                        }
                    >
                        <div className="flex flex-col">
                            <button className='bg-[#FFFFFF] w-full flex flex-col justify-center gap-2 h-[64px] px-4 hover:bg-[#F8F0FF]'>
                                <span className="font-normal text-sm text-[#1D2939] text-left">1. Chapter 1</span>
                                <div className='flex flex-row gap-2'>
                                    <Image
                                        src="/icons/read.svg"
                                        width={16}
                                        height={16}
                                        alt="read-icon"
                                    />
                                    <span className="text-[#667085] font-normal text-sm">10:00</span>
                                </div>
                            </button>
                            <button className='bg-[#FFFFFF] w-full flex flex-col justify-center gap-2 h-[64px] px-4 hover:bg-[#F8F0FF]'>
                                <span className="font-normal text-sm text-[#1D2939] text-left">1. Chapter 2</span>
                                <div className='flex flex-row gap-2'>
                                    <Image
                                        src="/icons/read.svg"
                                        width={16}
                                        height={16}
                                        alt="read-icon"
                                    />
                                    <span className="text-[#667085] font-normal text-sm">10:00</span>
                                </div>
                            </button>
                        </div>
                    </Collapsible>
                </div>
            </div>
            <div className="flex-1 flex flex-col">
                <div className="h-[72px] p-6 flex items-center border-b border-solid border-[#EAECF0] bg-[#FFFFFF]">
                    <span className="text-[#182230] font-semibold text-base">1. Welcome and Introduction</span>
                </div>
                <div className="p-6 flex flex-col flex-1  w-full overflow-y-auto">
                    <Tabs
                        aria-label="Course Tabs"
                        color="primary"
                        variant="underlined"
                        classNames={{
                            tabList: "gap-6 w-full relative rounded-none p-0 border-b border-solid border-[#EAECF0]",
                            cursor: "w-full bg-[#7400E0]",
                            tab: "max-w-fit px-0 h-12",
                            tabContent: "group-data-[selected=true]:text-[#7400E0]",
                        }}
                    >
                        <Tab
                            key="Content"
                            title={
                                <div className="flex items-center space-x-2" onClick={() => setActiveTab("Content")}>
                                    <span className={`font-medium text-base ${activeTab === "Content" ? 'text-[#7400E0]' : 'text-[#667085]'} hover:text-[#7400E0]`}>
                                        Content
                                    </span>
                                </div>
                            }
                        >

                            <Content />

                        </Tab>
                        <Tab
                            key="Discussion"
                            title={
                                <div className="flex items-center space-x-2" onClick={() => setActiveTab("Discussion")}>
                                    <span className={`font-medium text-base ${activeTab === "Discussion" ? 'text-[#7400E0]' : 'text-[#667085]'} hover:text-[#7400E0]`}>
                                        Discussion
                                    </span>
                                </div>
                            }
                        >

                            <Discussion />


                        </Tab>
                    </Tabs>
                </div>
                {activeTab !== "Content" && (
                    <div className=' justify-end bg-[#FFFFFF] h-[150px] w-full p-6 flex-col flex'>
                        {/* Textarea for writing the comment */}
                        <div className="bg-[#F7F8FB] border-b border-solid border-b-[#EAECF0] rounded-tl-[12px] rounded-tr-[12px]">
                            <ReactQuill
                                ref={quillRef}
                                value={value}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                                modules={{ toolbar: false }}
                                placeholder="Type your response here..."
                                className=" text-[#1D2939] focus:outline-none rounded-b-[12px] custom-quill placeholder:not-italic"
                                style={{
                                    minHeight: "10px", // Initial height
                                    maxHeight: "150px", // Maximum height before scrolling
                                    overflowY: "auto",  // Enable scrolling if content exceeds max height
                                    padding: "1rem",   // Padding to create space inside the editor
                                    border: 'none',
                                    fontStyle: 'normal',
                                }}
                            />



                        </div>
                    </div>
                )}
            </div>


        </div>
    );
}

export default Courses;
