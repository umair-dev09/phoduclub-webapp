import React, { useState, useEffect } from 'react';

interface SectionData {
    sectionName: string;
    sectionDate: string;
    sectionTime: string;
}

interface SectionProps {
    toggleAddSection: () => void;
    AddSection?: () => void;
}

function Section({ toggleAddSection, AddSection }: SectionProps) {
    // State to manage multiple sections
    const [sections, setSections] = useState<SectionData[]>([]);

    // State to manage the dialog for Create Section
    const [isCreateSection, setIsCreateSection] = useState(false);
    // Form data state
    const [sectionName, setSectionName] = useState("");
    const [sectionDate, setSectionDate] = useState("");
    const [sectionTime, setSectionTime] = useState("");

    // Handlers for Create Section dialog
    const openCreateSection = () => setIsCreateSection(true);
    const closeCreateSection = () => setIsCreateSection(false);

    // Handle Create Section button inside dialog
    const handleCreateSection = () => {
        if (sectionName && sectionDate && sectionTime) {
            const newSection = {
                sectionName,
                sectionDate,
                sectionTime
            };
            setSections([...sections, newSection]);
            setIsCreateSection(false);
            toggleAddSection();

            // Reset form fields
            setSectionName("");
            setSectionDate("");
            setSectionTime("");
        }
    };

    // Effect to handle external AddSection calls
    useEffect(() => {
        if (AddSection) {
            const cleanup = AddSection;
            return () => cleanup();
        }
    }, [AddSection]);

    return (
        <>

            {/* Render all sections */}
            {sections.map((section, index) => (
                <div key={index} className="h-auto rounded-[16px] mt-4 flex flex-col border border-solid border-[#EAECF0] bg-[#FFFFFF]">
                    <div className="h-[76px] bg-[#FFFFFF] rounded-t-[16px] border-b border-solid border-[#EAECF0]">
                        <div className="flex flex-row justify-between p-4">
                            <div className="flex flex-col">
                                <span className="font-semibold text-base text-[#1D2939]">{section.sectionName}</span>
                                <div className="flex flex-row mt-2 items-center">
                                    <span className="text-[#475467]">📅</span>
                                    <span className="font-normal text-[#475467] text-xs ml-1">Schedule :</span>
                                    <span className="ml-2 text-[#101828] text-xs font-medium">
                                        {section.sectionDate} {section.sectionTime}
                                    </span>
                                </div>
                            </div>
                            <button className="text-2xl">⋮</button>
                        </div>
                    </div>

                    <div className="bg-[#FFFFFF] h-[184px] p-6 items-center flex flex-col gap-2 rounded-[16px]">
                        <span className="text-[#1D2939] font-semibold text-lg">Create section/questions</span>
                        <span className="font-normal text-xs text-[#667085]">
                            Test Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
                        </span>
                        <div className="flex flex-row gap-4 mt-2">
                            <button
                                className="flex flex-row gap-1 items-center rounded-md border-[2px] border-solid border-[#9012FF] h-[44px] w-[162px] justify-center"
                                onClick={openCreateSection}
                            >
                                <span className="text-[#9012FF]">+</span>
                                <span className="text-[#9012FF] font-semibold text-sm">Add Section</span>
                            </button>
                            <button className="flex flex-row gap-1 items-center rounded-md border-[2px] border-solid border-[#9012FF] h-[44px] w-[162px] justify-center">
                                <span className="text-[#9012FF]">+</span>
                                <span className="text-[#9012FF] font-semibold text-sm">Add Question</span>
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {/* Initial section creation UI when no sections exist */}
            {sections.length === 0 && (
                <div className="h-auto rounded-[16px] mt-4 flex flex-col border border-solid border-[#EAECF0] bg-[#FFFFFF]">
                    <div className="bg-[#FFFFFF] h-[184px] p-6 items-center flex flex-col gap-2 rounded-[16px]">
                        <span className="text-[#1D2939] font-semibold text-lg">Create section/questions</span>
                        <span className="font-normal text-xs text-[#667085]">
                            Test Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
                        </span>
                        <div className="flex flex-row gap-4 mt-2">
                            <button
                                className="flex flex-row gap-1 items-center rounded-md border-[2px] border-solid border-[#9012FF] h-[44px] w-[162px] justify-center"
                                onClick={openCreateSection}
                            >
                                <span className="text-[#9012FF]">+</span>
                                <span className="text-[#9012FF] font-semibold text-sm">Add Section</span>
                            </button>
                            <button className="flex flex-row gap-1 items-center rounded-md border-[2px] border-solid border-[#9012FF] h-[44px] w-[162px] justify-center">
                                <span className="text-[#9012FF]">+</span>
                                <span className="text-[#9012FF] font-semibold text-sm">Add Question</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for creating section */}
            {isCreateSection && (
                <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-30 flex items-center justify-center">
                    <div className="bg-white rounded-2xl w-[559px] h-auto relative">
                        <div className="flex flex-col gap-6">
                            <button
                                className="absolute right-4 top-4 text-xl font-bold"
                                onClick={closeCreateSection}
                            >
                                ×
                            </button>
                            <h3 className="mx-6 mt-6 text-2xl font-semibold text-[#1D2939]">Create Section</h3>
                            <div className="flex flex-col w-full gap-2 px-6">
                                <p className="text-start text-sm text-[#1D2939] font-medium">Name</p>
                                <div className="flex flex-row w-full h-10 px-3 outline-none border border-[#D0D5DD] rounded-md">
                                    <input
                                        type="text"
                                        className="w-full px-2 text-sm text-[#182230] font-normal outline-none rounded-md"
                                        placeholder="Enter Name"
                                        value={sectionName}
                                        onChange={(e) => setSectionName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row justify-between w-full px-6 gap-4">
                                <div className="flex flex-col w-full gap-2">
                                    <p className="text-start text-sm text-[#1D2939] font-medium">Date</p>
                                    <div className="flex flex-row w-full h-10 px-3 outline-none border border-[#D0D5DD] rounded-md">
                                        <span>📅</span>
                                        <input
                                            type="text"
                                            className="w-full px-2 text-sm text-[#182230] font-normal outline-none rounded-md"
                                            placeholder="Select Date"
                                            value={sectionDate}
                                            onChange={(e) => setSectionDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col w-full gap-2">
                                    <p className="text-start text-sm text-[#1D2939] font-medium">Time</p>
                                    <div className="flex flex-row w-full h-10 px-3 outline-none border border-[#D0D5DD] rounded-md">
                                        <span>🕒</span>
                                        <input
                                            type="text"
                                            className="w-full px-2 text-sm text-[#182230] font-normal outline-none rounded-md"
                                            placeholder="Select Time"
                                            value={sectionTime}
                                            onChange={(e) => setSectionTime(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="flex flex-row justify-end mx-6 my-4 gap-4">
                                <button
                                    className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md text-[#1D2939] font-semibold text-sm"
                                    onClick={closeCreateSection}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#9012FF] border border-[#8501FF] rounded-md font-semibold text-sm"
                                    onClick={handleCreateSection}
                                >
                                    Create Section
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Section;