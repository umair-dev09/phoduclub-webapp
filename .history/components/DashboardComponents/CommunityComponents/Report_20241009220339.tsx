// "use client";
// import { useState, useEffect } from "react";
// import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
// import Image from "next/image";
// import React from "react";

// interface ChatAreaProps {
//     isOpen: boolean;
//     setIsOpen: React.Dispatch<React.SetStateAction<{ report: boolean; media: boolean }>>;
// }


// const ChatArea: React.FC<ChatAreaProps> = ({ isOpen, setIsOpen }) => {
//     const [reasonVisible, setReasonVisible] = useState(false);
//     const [selectedReason, setSelectedReason] = useState("");
//     const [reasonText, setReasonText] = useState("");
//     const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Button starts enabled by default
//     const [activeButton, setActiveButton] = useState<string | null>(null);

//     // Reset states when the dialog is opened
//     useEffect(() => {
//         if (isOpen) {
//             setReasonVisible(false);
//             setSelectedReason("");
//             setReasonText("");
//             setIsButtonDisabled(false);
//             setActiveButton(null);
//         }
//     }, [isOpen]); // This effect runs when isOpen changes

//     const handleReasonClick = (reason: string) => {
//         setSelectedReason(reason);
//         setActiveButton(reason);

//         if (reason === "Something else") {
//             setReasonVisible(true); // Show the textarea
//             setIsButtonDisabled(true); // Disable the button until something is typed
//         } else {
//             setReasonVisible(true); // Hide the textarea
//             setIsButtonDisabled(false); // Enable the button for other reasons
//         }
//     };

//     const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//         setReasonText(e.target.value);

//         // Enable the button if there's text in the textarea
//         if (e.target.value.trim() !== "") {
//             setIsButtonDisabled(false);
//         } else {
//             setIsButtonDisabled(true);
//         }
//     };

//     const handleCancel = () => {
//         setIsOpen({ report: false, media: false })
//     };
//     return (
//         <>
//             <Dialog open={isOpen} onClose={() => setIsOpen({ report: false, media: false })} className="relative z-50">
//                 <DialogBackdrop className="fixed inset-0 bg-black/30 " />

//                 <div className="fixed inset-0 flex items-center justify-center ">
//                     <DialogPanel transition className="bg-white rounded-2xl w-[480px] h-auto border border-[#EAECF0]">
//                         <div className="h-[126px] border-b border-solid border-[#EAECF0] px-[24px] pt-[20px]">
//                             <div className="flex items-center justify-between ">
//                                 <span className="text-lg font-bold text-[#1D2939] fontstyle-sora">Report</span>

//                                 <button onClick={() => setIsOpen({ report: false, media: false })}>
//                                     <Image src="/icons/cancel.svg" alt="cancel" width={18} height={18} />
//                                 </button>
//                             </div>
//                             <div className="pt-[6px]">
//                                 <span className="text-sm text-[#667085] font-sm">
//                                     Lorem ipsum is a dummy text widely used in the digital industry and will be used here as a preview.
//                                 </span>
//                             </div>
//                         </div>

//                         <div className="h-auto border-b border-solid border-[#EAECF0] px-[24px] pt-[24px] pb-3">
//                             <span className="text-[#344054] font-medium text-sm">Why are you reporting this message?</span>
//                             <div className="pt-4 flex flex-row gap-2 h-auto ">
//                                 <button className="group" onClick={() => handleReasonClick("span")}>
//                                     <div className={`h-[28px] w-auto rounded-[6px] border-2  hover:bg-[#9012FF] hover:border-[#9012FF] ${activeButton === "span" ? "bg-[#9012FF] border-[#9012FF]" : "border-[#D0D5DD]"} px-2 flex flex-row justify-center items-center`}>
//                                         <span className={`${activeButton === "span" ? "text-[#FFFFFF]" : "text-[#344054]"} font-medium text-sm group-hover:text-[#FFFFFF]`}>span</span>
//                                     </div>

//                                 </button>
//                                 <button className="group" onClick={() => handleReasonClick("Scam")}>
//                                     <div className={`h-[28px] w-auto rounded-[6px] border-2  hover:bg-[#9012FF] hover:border-[#9012FF] ${activeButton === "Scam" ? "bg-[#9012FF] border-[#9012FF]" : "border-[#D0D5DD]"} px-2 flex flex-row justify-center items-center`}>
//                                         <span className={`${activeButton === "Scam" ? "text-[#FFFFFF]" : "text-[#344054]"} font-medium text-sm group-hover:text-[#FFFFFF]`}>Scam</span>
//                                     </div>

//                                 </button>
//                                 <button className="group" onClick={() => handleReasonClick("Nudity")}>
//                                     <div className={`h-[28px] w-auto rounded-[6px] border-2  hover:bg-[#9012FF] hover:border-[#9012FF] ${activeButton === "Nudity" ? "bg-[#9012FF] border-[#9012FF]" : "border-[#D0D5DD]"} px-2 flex flex-row justify-center items-center`}>
//                                         <span className={`${activeButton === "Nudity" ? "text-[#FFFFFF]" : "text-[#344054]"} font-medium text-sm group-hover:text-[#FFFFFF]`}>Nudity</span>
//                                     </div>

//                                 </button>
//                                 <button className="group" onClick={() => handleReasonClick("Illegal")}>
//                                     <div className={`h-[28px] w-auto rounded-[6px] border-2  hover:bg-[#9012FF] hover:border-[#9012FF] ${activeButton === "Illegal" ? "bg-[#9012FF] border-[#9012FF]" : "border-[#D0D5DD]"} px-2 flex flex-row justify-center items-center`}>
//                                         <span className={`${activeButton === "Illegal" ? "text-[#FFFFFF]" : "text-[#344054]"} font-medium text-sm group-hover:text-[#FFFFFF]`}>Illegal</span>
//                                     </div>

//                                 </button>
//                                 <button className="group" onClick={() => handleReasonClick("Violence")}>
//                                     <div className={`h-[28px] w-auto rounded-[6px] border-2  hover:bg-[#9012FF] hover:border-[#9012FF] ${activeButton === "Violence" ? "bg-[#9012FF] border-[#9012FF]" : "border-[#D0D5DD]"} px-2 flex flex-row justify-center items-center`}>
//                                         <span className={`${activeButton === "Violence" ? "text-[#FFFFFF]" : "text-[#344054]"} font-medium text-sm group-hover:text-[#FFFFFF]`}>Violence</span>
//                                     </div>

//                                 </button>

//                             </div>

//                             <div className="pt-2 flex flex-row gap-2 h-auto ">
//                                 <button className="group" onClick={() => handleReasonClick("Hate Speech")}>
//                                     <div className={`h-[28px] w-auto rounded-[6px] border-2  hover:bg-[#9012FF] hover:border-[#9012FF] ${activeButton === "Hate Speech" ? "bg-[#9012FF] border-[#9012FF]" : "border-[#D0D5DD]"} px-2 flex flex-row justify-center items-center`}>
//                                         <span className={`${activeButton === "Hate Speech" ? "text-[#FFFFFF]" : "text-[#344054]"} font-medium text-sm group-hover:text-[#FFFFFF]`}>Hate Speech</span>
//                                     </div>

//                                 </button>
//                                 <button className="group" onClick={() => handleReasonClick("Something else")}>
//                                     <div className={`h-[28px] w-auto rounded-[6px] border-2  hover:bg-[#9012FF] hover:border-[#9012FF] ${activeButton === "Something else" ? "bg-[#9012FF] border-[#9012FF]" : "border-[#D0D5DD]"} px-2 flex flex-row justify-center items-center`}>
//                                         <span className={`${activeButton === "Something else" ? "text-[#FFFFFF]" : "text-[#344054]"} font-medium text-sm group-hover:text-[#FFFFFF]`}>Something else</span>
//                                     </div>

//                                 </button>

//                             </div>

//                             {/* TEXT AREA */}
//                             {reasonVisible && (
//                                 <>
//                                     <div className="pt-[24px] mb-1">
//                                         <span className="text-[#344054] font-medium text-sm">Reason</span>
//                                     </div>
//                                     <div
//                                         className={`rounded-md border-2 border-solid ${reasonText.trim() !== ""
//                                             ? "border-[#D6BBFB]"
//                                             : "border-[#D0D5DD]"
//                                             } h-[160px]`}
//                                         style={{
//                                             boxShadow: reasonText.trim() !== ""
//                                                 ? "0px 1px 2px 0px rgba(16, 24, 40, 0.05), 0px 0px 0px 4px rgba(158, 119, 237, 0.12)"
//                                                 : "none" // no shadow if reasonText is empty
//                                         }}
//                                     >
//                                         <textarea
//                                             placeholder="Write your report here"
//                                             className="outline-none placeholder-[#667085] text-sm font-normal w-full h-full p-2 resize-none rounded-md text-[#182230]"
//                                             onChange={handleTextChange}
//                                             value={reasonText}
//                                         />
//                                     </div>

//                                 </>
//                             )}
//                         </div>

//                         <div className="w-full h-[76px] flex justify-end gap-2 px-6">
//                             <div className="mt-5">
//                                 <button
//                                     className="bg-[#FFFFFF] text-[#1D2939] text-sm font-semibold py-2 px-5 rounded-md w-[118px] h-[44px]"
//                                     style={{ border: "1.5px solid #EAECF0" }}
//                                     onClick={() => setIsOpen({ report: false, media: false })}
//                                 >
//                                     Cancel
//                                 </button>
//                             </div>
//                             <div className="mt-5">
//                                 <button
//                                     className={`bg-[#8501FF] text-[#FFFFFF] text-sm font-semibold py-2 px-5 rounded-md w-auto h-[44px] ${isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
//                                         }`}
//                                     disabled={isButtonDisabled}
//                                     style={{
//                                         border: "1px solid #800EE2",
//                                         boxShadow: "0px -4px 4px 0px #1018281F inset, 0px 3px 2px 0px #FFFFFF3D inset",
//                                     }}
//                                     onClick={() => setIsOpen({ report: false, media: false })}
//                                 >
//                                     Submit report
//                                 </button>
//                             </div>
//                         </div>
//                     </DialogPanel>
//                 </div>
//             </Dialog>
//         </>
//     );
// }

// export default ChatArea;




// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

"use client";
import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React from "react";

interface ChatAreaProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<{ report: boolean; media: boolean }>>;
}

const ChatArea: React.FC<ChatAreaProps> = ({ isOpen, setIsOpen }) => {
    const [activeSection, setActiveSection] = useState<'Images' | 'Videos' | 'Documents' | 'Links'>('Images'); // Default to 'Images'

    const handleCancel = () => {
        setIsOpen({ report: false, media: false });
    };

    return (
        <>
            <Dialog open={isOpen} onClose={handleCancel} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/30" />

                <div className="fixed inset-0 flex items-center justify-center">
                    <DialogPanel className="bg-white rounded-2xl w-[480px] h-auto border border-solid border-[#EAECF0]">
                        <div className="h-[68px] border-b border-solid border-[#EAECF0] px-[24px] pt-[20px]">
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-bold text-[#1D2939] fontstyle-sora">Report</span>

                                <button onClick={handleCancel}>
                                    <Image src="/icons/cancel.svg" alt="cancel" width={18} height={18} />
                                </button>
                            </div>
                        </div>

                        <div className="mx-[24px] mt-4">
                            <div className="rounded-lg h-[44px] bg-[#F9FAFB] border border-solid border-[#EAECF0] gap-1 flex flex-row">
                                {/* Section Buttons */}
                                <button
                                    className={`w-full hover:bg-[#EAECF0] rounded-md my-[2px] ml-[2px] ${activeSection === 'Images' ? 'bg-[#EAECF0]' : ''}`}
                                    onClick={() => setActiveSection('Images')}
                                >
                                    <span className="text-[#667085] font-semibold text-sm">Images</span>
                                </button>
                                <button
                                    className={`w-full hover:bg-[#EAECF0] rounded-md my-[2px] ${activeSection === 'Videos' ? 'bg-[#EAECF0]' : ''}`}
                                    onClick={() => setActiveSection('Videos')}
                                >
                                    <span className="text-[#667085] font-semibold text-sm">Videos</span>
                                </button>
                                <button
                                    className={`w-full hover:bg-[#EAECF0] rounded-md my-[2px] ${activeSection === 'Documents' ? 'bg-[#EAECF0]' : ''}`}
                                    onClick={() => setActiveSection('Documents')}
                                >
                                    <span className="text-[#667085] font-semibold text-sm">Documents</span>
                                </button>
                                <button
                                    className={`w-full hover:bg-[#EAECF0] rounded-md my-[2px] mr-[2px] ${activeSection === 'Links' ? 'bg-[#EAECF0]' : ''}`}
                                    onClick={() => setActiveSection('Links')}
                                >
                                    <span className="text-[#667085] font-semibold text-sm">Links</span>
                                </button>
                            </div>
                        </div>

                        {/* Conditionally Render Content Based on Active Section */}
                        <div className="pt-4 pb-4">
                            {activeSection === 'Images' && (
                                <div className="mx-[24px] overflow-y-auto flex flex-col h-[428px] bg-slate-700">

                                    <div className="hidden">
                                        <h1>jabir is great</h1>
                                        <h1>jabir is great</h1>
                                        <h1>jabir is great</h1>
                                        <h1>jabir is great</h1>
                                        <h1>jabir is great</h1>
                                        <h1>jabir is great</h1>
                                        <h1>jabir is great</h1>
                                        <h1>jabir is great</h1>
                                        <h1>jabir is great</h1>
                                        <h1>jabir is great</h1>
                                        <h1>jabir is great</h1>
                                        <h1>jabir is great</h1>
                                        <h1>jabir is great</h1>
                                        <h1>jabir is great</h1>
                                        <h1>jabir is great</h1>
                                        <h1>jabir is great</h1>
                                        <h1>jabir is great</h1>
                                        <h1>jabir is great</h1>
                                        <h1>jabir is great</h1>
                                        <h1>jabir is great</h1>
                                        <h1>jabir is great</h1>
                                        <h1>jabir is great</h1>
                                        <h1>jabir is great</h1>


                                    </div>
                                    <div className="flex flex-col justify-center items-center">
                                        <Image
                                            src="/icons/Media-Images.svg"
                                            alt="Media-Images"
                                            width={122}
                                            height={122} />
                                        <div className="flex gap-2 flex-col">
                                            <span className="font-semibold text-sm text-[#0C111D]">No images</span>
                                            <span className="font-normal text-xs text-[#667085]">
                                                You’ll see here all shared images here
                                            </span>

                                        </div>
                                    </div>

                                </div>

                            )}
                            {activeSection === 'Videos' && (
                                <div>
                                    {/* Videos section content */}
                                    <p>Display Videos here.</p>
                                </div>
                            )}
                            {activeSection === 'Documents' && (
                                <div>
                                    {/* Documents section content */}
                                    <p>Display Documents here.</p>
                                </div>
                            )}
                            {activeSection === 'Links' && (
                                <div>
                                    {/* Links section content */}
                                    <p>Display Links here.</p>
                                </div>
                            )}
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
}

export default ChatArea;
