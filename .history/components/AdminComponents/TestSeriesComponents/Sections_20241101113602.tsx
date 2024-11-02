
"use client";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import { useState, useRef, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill'; // Ensure correct import
import Quill from 'quill'; // Import Quill to use it for types
import { useRouter } from "next/navigation";
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



    const router = useRouter();
    // Function to handle tab click and navigate to a new route
    const handleTabClick = (path: string) => {
        router.push(path);
    };










    return (
        <>
            {sections.map((section, index) => (
                <div key={index} className={`h-auto rounded-[16px] ${index > 0 ? 'mt-4' : ''} flex flex-col border border-solid border-[#EAECF0] bg-[#FFFFFF] mt-4`}>
                    {section.showContent ? (
                        <>
                            {/* x div */}
                            <div className="h-[76px] bg-[#FFFFFF] rounded-t-[16px] border-b border-solid border-[#EAECF0]">
                                <div className="flex flex-row justify-between p-4">
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
                                    </div>
                                    <div className="flex flex-row  items-center justify-center">
                                        {showContent && (
                                            <button
                                                className="flex flex-row gap-1 items-center h-[44px] w-[152px] justify-center">
                                                <Image src="/icons/plus-sign.svg" height={18} width={18} alt="Plus Sign" />
                                                <span className="text-[#9012FF] font-semibold text-sm">Add Questions</span>
                                            </button>
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
                                <div>
                                    <div className="h-[48px] bg-[#F2F4F7] ">
                                        Questions

                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <span className='text-[#1D2939] text-sm font-medium pt-1'>Enter Questions</span>
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

                                    <span className="font-semibold text-base text-[#1D2939]">Options</span>
                                    <div className="flex flex-col gap-3">

                                        <div className="flex flex-row items-center gap-2">
                                            <div className="h-8 w-8 bg-[#F9FAFB] border border-solid border-[#D0D5DD] rounded-[6px]">
                                                <span className="text-[#475467] text-sm font-medium flex justify-center items-center h-full w-full">

                                                </span>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <input
                                                    className="font-medium pl-3 text-[#101828] text-sm placeholder:text-[#A1A1A1] rounded-md w-full placeholder:font-normal
                                                focus:outline-none focus:ring-0 border border-solid border-[#D0D5DD] h-[40px] focus:border-[#D6BBFB]
                                                     focus:shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]"
                                                    placeholder="Option "

                                                />
                                                <input
                                                    className="font-medium pl-3 text-[#101828] text-sm placeholder:text-[#A1A1A1] rounded-md w-full placeholder:font-normal
                                                focus:outline-none focus:ring-0 border border-solid border-[#D0D5DD] h-[40px] focus:border-[#D6BBFB]
                                                     focus:shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]"
                                                    placeholder="Option "

                                                />
                                                <input
                                                    className="font-medium pl-3 text-[#101828] text-sm placeholder:text-[#A1A1A1] rounded-md w-full placeholder:font-normal
                                                focus:outline-none focus:ring-0 border border-solid border-[#D0D5DD] h-[40px] focus:border-[#D6BBFB]
                                                     focus:shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]"
                                                    placeholder="Option "

                                                />
                                                <input
                                                    className="font-medium pl-3 text-[#101828] text-sm placeholder:text-[#A1A1A1] rounded-md w-full placeholder:font-normal
                                                focus:outline-none focus:ring-0 border border-solid border-[#D0D5DD] h-[40px] focus:border-[#D6BBFB]
                                                     focus:shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]"
                                                    placeholder="Option "

                                                />

                                            </div>
                                        </div>

                                    </div>

                                    <span className="font-semibold text-base text-[#1D2939]">Correct answer</span>
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
                                    <div className="flex flex-row justify-end mx-6 items-center gap-4 h-[76px]">
                                        <button className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md text-[#1D2939] h-[44px] w-[128px]font-semibold text-sm" >Cancel</button>
                                        <button
                                            className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#9012FF] border w-[128px] h-[44px] border-[#8501FF] rounded-md font-semibold text-sm"

                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
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

                                    onClick={() => handleTabClick('/admin/content/testseriesmanagement/createtestseries')}
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
                    )}
                </div>
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
        </>
    );
}

export default Sections;
