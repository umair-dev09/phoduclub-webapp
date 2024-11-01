// "use client";
// import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
// import Image from "next/image";
// import { useState } from 'react';



// function Section() {
//     // State to manage the dialog for Create Section
//     const [isCreateSection, setIsCreateSection] = useState(false);
//     // State to manage visibility of content div and form data
//     const [showContent, setShowContent] = useState(false);
//     const [sectionName, setSectionName] = useState("");
//     const [sectionDate, setSectionDate] = useState("");
//     const [sectionTime, setSectionTime] = useState("");

//     // Handlers for Create Section dialog
//     const openCreateSection = () => setIsCreateSection(true);
//     const closeCreateSection = () => setIsCreateSection(false);

//     // Handle Create Section button inside dialog
//     const handleCreateSection = () => {
//         if (sectionName && sectionDate && sectionTime) {
//             setShowContent(true); // Show content div only if all fields have values
//             setIsCreateSection(false); // Close the dialog

//         }
//     };


//     return (
//         <>
//             {/* jabir-div  */}
//             <div className="h-auto rounded-[16px] mt-4 flex flex-col border border-solid border-[#EAECF0] bg-[#FFFFFF]">

//                 {showContent && (
//                     <div className="h-[76px] bg-[#FFFFFF] rounded-t-[16px] border-b border-solid border-[#EAECF0]">
//                         <div className="flex flex-row justify-between p-4">
//                             <div className="flex flex-col">
//                                 <span className="font-semibold text-base text-[#1D2939]">{sectionName}</span>
//                                 <div className="flex flex-row mt-2 items-center">
//                                     <Image
//                                         src="/icons/select-date.svg"
//                                         width={16}
//                                         height={16}
//                                         alt="Calendar Icon"
//                                     />
//                                     <span className="font-normal text-[#475467] text-xs ml-1">Schedule :</span>
//                                     <span className="ml-2 text-[#101828] text-xs font-medium">
//                                         {sectionDate} {sectionTime}
//                                     </span>
//                                 </div>
//                             </div>
//                             <button>
//                                 <Image
//                                     src="/icons/three-dots.svg"
//                                     width={20}
//                                     height={20}
//                                     alt="Three Dots Icon"
//                                 />
//                             </button>
//                         </div>
//                     </div>
//                 )}

//                 <div className="bg-[#FFFFFF] h-[184px] p-6 items-center flex flex-col gap-2 rounded-[16px]">
//                     <span className="text-[#1D2939] font-semibold text-lg">Create section/questions</span>
//                     <span className="font-normal text-xs text-[#667085]">
//                         Test Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
//                     </span>
//                     <div className="flex flex-row gap-4 mt-2">
//                         <button
//                             className="flex flex-row gap-1 items-center rounded-md border-[2px] border-solid border-[#9012FF] h-[44px] w-[162px] justify-center"
//                             onClick={openCreateSection}
//                         >
//                             <Image src="/icons/plus-sign.svg" height={18} width={18} alt="Plus Sign" />
//                             <span className="text-[#9012FF] font-semibold text-sm">Add Section</span>
//                         </button>
//                         <button className="flex flex-row gap-1 items-center rounded-md border-[2px] border-solid border-[#9012FF] h-[44px] w-[162px] justify-center">
//                             <Image src="/icons/plus-sign.svg" height={18} width={18} alt="Plus Sign" />
//                             <span className="text-[#9012FF] font-semibold text-sm">Add Question</span>
//                         </button>
//                     </div>
//                 </div>

//             </div>
//             {/* jabir-div ---- */}

//             {/* Dialog for creating section */}
//             <Dialog open={isCreateSection} onClose={closeCreateSection} className="relative z-50">
//                 <DialogBackdrop className="fixed inset-0 bg-black/30" />
//                 <div className="fixed inset-0 flex items-center justify-center">
//                     <DialogPanel className="bg-white rounded-2xl w-[559px] h-auto">
//                         <div className="flex flex-col relative gap-6">
//                             <button className="absolute right-4 top-4" onClick={closeCreateSection}>
//                                 <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
//                             </button>
//                             <h3 className="mx-6 mt-6 text-2xl font-semibold text-[#1D2939]">Create Section</h3>
//                             <div className="flex flex-col w-full gap-2 px-6">
//                                 <p className="text-start text-sm text-[#1D2939] font-medium">Name</p>
//                                 <div className="flex flex-row w-full h-10 px-3 outline-none border border-[#D0D5DD] rounded-md">
//                                     <input
//                                         type="text"
//                                         className="w-full px-2 text-sm text-[#182230] font-normal outline-none rounded-md"
//                                         placeholder="Enter Name"
//                                         value={sectionName}
//                                         onChange={(e) => setSectionName(e.target.value)}
//                                     />
//                                 </div>
//                             </div>
//                             <div className="flex flex-row justify-between w-full px-6 gap-4">
//                                 <div className="flex flex-col w-full gap-2">
//                                     <p className="text-start text-sm text-[#1D2939] font-medium">Date</p>
//                                     <div className="flex flex-row w-full h-10 px-3 outline-none border border-[#D0D5DD] rounded-md">
//                                         <Image src='/icons/calendar-03.svg' alt="Date" width={24} height={24} />
//                                         <input
//                                             type="text"
//                                             className="w-full px-2 text-sm text-[#182230] font-normal outline-none rounded-md"
//                                             placeholder="Select Date"
//                                             value={sectionDate}
//                                             onChange={(e) => setSectionDate(e.target.value)}
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="flex flex-col w-full gap-2">
//                                     <p className="text-start text-sm text-[#1D2939] font-medium">Time</p>
//                                     <div className="flex flex-row w-full h-10 px-3 outline-none border border-[#D0D5DD] rounded-md">
//                                         <Image src='/icons/calendar-03.svg' alt="Time" width={24} height={24} />
//                                         <input
//                                             type="text"
//                                             className="w-full px-2 text-sm text-[#182230] font-normal outline-none rounded-md"
//                                             placeholder="Select Time"
//                                             value={sectionTime}
//                                             onChange={(e) => setSectionTime(e.target.value)}
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                             <hr />
//                             <div className="flex flex-row justify-end mx-6 my-4 gap-4">
//                                 <button className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md text-[#1D2939] font-semibold text-sm" onClick={closeCreateSection}>Cancel</button>
//                                 <button className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#9012FF] border border-[#8501FF] rounded-md font-semibold text-sm"
//                                     onClick={
//                                         handleCreateSection

//                                     }
//                                 >Create Section</button>
//                             </div>
//                         </div>
//                     </DialogPanel>
//                 </div>
//             </Dialog>
//         </>
//     );
// }

// export default Section;



// section.tsx
"use client";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import { useState, useEffect } from 'react';

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

    return (
        <>
            {sections.map((section, index) => (
                <div key={index} className="h-auto rounded-[16px] mt-4 flex flex-col border border-solid border-[#EAECF0] bg-[#FFFFFF]">
                    {section.showContent ? (
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
                    ) : (
                        <div className="bg-[#FFFFFF] h-[184px] px-6 pb-6 items-center flex flex-col gap-2 rounded-[16px]">
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
