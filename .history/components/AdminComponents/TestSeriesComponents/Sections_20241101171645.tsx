
"use client";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import { useState, useRef, useEffect } from 'react';
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

                                    <Collapsible
                                        trigger={
                                            <div className="h-[48px] bg-[#FFFFFF]  flex flex-row justify-between px-4  items-center">

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
                                                    <Popover
                                                        placement="bottom"
                                                    >
                                                        <PopoverTrigger>
                                                            <div className="flex flex-row bg-[#D3F8E0] items-center justify-between rounded-[6px] h-[26px] p-2 w-[92px]">
                                                                <span className="font-medium text-[#182230] text-xs">Easy</span>
                                                                <Image
                                                                    src="/icons/selectdate-Arrowdown.svg"
                                                                    width={18}
                                                                    height={18}
                                                                    alt="arrow " />

                                                            </div>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="flex flex-col px-0 text-sm font-normal bg-white border border-lightGrey rounded-md w-[167px] shadow-md"
                                                        >
                                                            <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full">
                                                                <Image src="/icons/edit-icon.svg" width={18} height={18} alt="Edit-quiz" />
                                                                <span className="text-sm text-[#0C111D] font-normal">Edit Quiz</span>
                                                            </button>
                                                            <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full">
                                                                <Image src="/icons/duplicate.svg" width={18} height={18} alt="Edit-quiz" />
                                                                <span className="text-sm text-[#0C111D] font-normal">Duplicate</span>
                                                            </button>
                                                            <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full"

                                                            >
                                                                <Image src="/icons/delete.svg" width={18} height={18} alt="delete-quiz" />
                                                                <span className="text-sm text-[#DE3024] font-normal">Delete Quiz</span>
                                                            </button>
                                                        </PopoverContent>
                                                    </Popover>
                                                    <Image
                                                        src="/icons/three-dots.svg"
                                                        width={18}
                                                        height={18}
                                                        alt="three-dots"
                                                    />
                                                </div>
                                            </div>
                                        }>
                                        <div className="flex flex-col gap-2 rounded-sm">
                                            <span className='text-[#1D2939] text-base font-semibold pt-1 px-4'>Questions</span>

                                        </div>
                                    </Collapsible>







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
