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




//     const handleCancel = () => {
//         setIsOpen({ report: false, media: false })
//     };
//     return (
//         <>
//             <Dialog open={isOpen} onClose={() => setIsOpen({ report: false, media: false })} className="relative z-50">
//                 <DialogBackdrop className="fixed inset-0 bg-black/30 " />

//                 <div className="fixed inset-0 flex items-center justify-center ">
//                     <DialogPanel transition className="bg-white rounded-2xl w-[480px] h-auto border border-[#EAECF0]">

//                     </DialogPanel>
//                 </div>
//             </Dialog>
//         </>
//     );
// }

// export default ChatArea;


// ----------------------------------------------------------------------------------------------------------------------------------------------------------

// // FILE TOO LARGE COOMP

"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React from "react";

interface ChatAreaProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<{ report: boolean; media: boolean }>>;
}

const ChatArea: React.FC<ChatAreaProps> = ({ isOpen, setIsOpen }) => {


    return (
        <>
            <Dialog open={isOpen} onClose={() => setIsOpen({ report: false, media: false })} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/30 " />

                <div className="fixed inset-0 flex items-center justify-center ">
                    <DialogPanel transition className="bg-white rounded-2xl w-[480px] h-auto p-6 border border-[#EAECF0]">
                        <div className="flex flex-1 flex-col h-auto gap-4 relative">
                            <Image className="absolute right-0 top-0" onClick={() => setIsOpen({ report: false, media: false })} src="/icons/cancel.svg" alt="cancel" width={18} height={18} />
                            <div className="w-full h-auto">
                                <h3 className="font-bold text-[#1D2939]">File too large</h3>
                            </div>
                            <div>
                                <p className="text-sm text-[#667085]">
                                    Lorem ipsum is a dummy text widely used in digital industry will be used here in as a preview
                                </p>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
}

export default ChatArea;

// ----------------------------------------------------------------------------------------------------------------------------------------------------------

// EXIT CHANNEL COOMP

// "use client";
// import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
// import Image from "next/image";
// import React from "react";

// interface ChatAreaProps {
//     isOpen: boolean;
//     setIsOpen: React.Dispatch<React.SetStateAction<{ report: boolean; media: boolean }>>;
// }

// const ChatArea: React.FC<ChatAreaProps> = ({ isOpen, setIsOpen }) => {

//     return (
//         <>
//             <Dialog open={isOpen} onClose={() => setIsOpen({ report: false, media: false })} className="relative z-50">
//                 <DialogBackdrop className="fixed inset-0 bg-black/30 " />

//                 <div className="fixed inset-0 flex items-center justify-center ">
//                     <DialogPanel transition className="bg-white rounded-2xl w-[480px] h-auto pt-6 pb-4 border border-[#EAECF0]">
//                         <div className="flex flex-1 flex-col h-auto gap-4 relative">
//                             <button className="absolute right-6 top-0" onClick={() => setIsOpen({ report: false, media: false })}>
//                                 <Image src="/icons/cancel.svg" alt="cancel" width={18} height={18} />
//                             </button>
//                             <div className="w-full h-auto px-6">
//                                 <h3 className="font-bold text-[#1D2939]">Exit “Physics 101” channel?</h3>
//                             </div>
//                             <div className="px-6">
//                                 <p className="text-sm text-[#667085]">
//                                     Only Group admins will be notified that you left the channel.
//                                 </p>
//                             </div>
//                             <div className="flex flex-row justify-end pt-4 gap-4 border-t border-lightGrey px-6">
//                                 <button
//                                     className="px-6 py-[0.625rem] border border-lightGrey rounded-md"
//                                     onClick={() => setIsOpen({ report: false, media: false })}
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button className="px-6 py-[0.625rem] text-white bg-red-700 border border-red-600 shadow-inner-button rounded-md">Yes, Exit channel</button>
//                             </div>
//                         </div>
//                     </DialogPanel>
//                 </div>
//             </Dialog>
//         </>
//     );
// }

// export default ChatArea;

// ----------------------------------------------------------------------------------------------------------------------------------------------------------

// UNBLOCK USER COMP

// "use client";
// import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
// import Image from "next/image";
// import React from "react";
// import ExamType from "../SettingComponents/ProfileComponents/Target";

// interface ChatAreaProps {
//     isOpen: boolean;
//     setIsOpen: React.Dispatch<React.SetStateAction<{ report: boolean; media: boolean }>>;
// }


// const ChatArea: React.FC<ChatAreaProps> = ({ isOpen, setIsOpen }) => {

//     const handleCancel = () => {
//         setIsOpen({ report: false, media: false })
//     };
//     return (
//         <>
//             <Dialog open={isOpen} onClose={() => setIsOpen({ report: false, media: false })} className="relative z-50">
//                 <DialogBackdrop className="fixed inset-0 bg-black/30 " />

//                 <div className="fixed inset-0 flex items-center justify-center ">
//                     <DialogPanel transition className="bg-white rounded-2xl w-[422px] h-auto">
//                         <div className="flex flex-col relative">
//                             <button className="absolute right-4 top-4" onClick={() => setIsOpen({ report: false, media: false })}>
//                                 <Image src="/icons/cancel-01.svg" alt="cancel" width={18} height={18} />
//                             </button>
//                             <div className="flex flex-col p-4 bg-[#9012FF] rounded-t-2xl gap-4">
//                                 <div className="flex flex-row items-center gap-3 text-white">
//                                     <Image src='/images/photo.png' alt="DP" width={96} height={96} />
//                                     <div className="flex flex-col">
//                                         <h2 className="text-xl font-semibold">Leslie Alexander</h2>
//                                         <p className="text-sm">leslie#9843</p>
//                                         <div className="flex flex-row items-center justify-center mt-2 px-2 py-1 rounded-full bg-white bg-opacity-20">
//                                             <Image className="mr-1" src="/icons/book-edit.svg" alt="exam year" width={16} height={16} />
//                                             <p className="text-xs font-medium mr-2">Exam Year</p>
//                                             <h3 className="text-normal">2025</h3>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <button onClick={() => setIsOpen({ report: false, media: false })} className="flex flex-row items-center justify-center w-full bg-white rounded-md px-6 py-[10px] gap-2">
//                                         <Image src="/icons/user-block-01.svg" alt="block user" width={18} height={18} />
//                                         <div className="text-sm font-semibold">Unblock User</div>
//                                     </button>
//                                 </div>
//                             </div>
//                             <div className="mx-4 mt-4 mb-6">
//                                 <div><p className="text-sm text-[#1D2939] font-medium">Preparing Exams</p></div>
//                                 <div className="-mx-[10px]">
//                                     <ExamType />
//                                 </div >
//                             </div>
//                         </div>
//                     </DialogPanel>
//                 </div>
//             </Dialog>
//         </>
//     );
// }

// export default ChatArea;


// ----------------------------------------------------------------------------------------------------------------------------------------------------------

// NEW REQUEST COMP

// "use client";
// import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
// import Image from "next/image";
// import React from "react";
// import ExamType from "../SettingComponents/ProfileComponents/Target";

// interface ChatAreaProps {
//     isOpen: boolean;
//     setIsOpen: React.Dispatch<React.SetStateAction<{ report: boolean; media: boolean }>>;
// }


// const ChatArea: React.FC<ChatAreaProps> = ({ isOpen, setIsOpen }) => {

//     const handleCancel = () => {
//         setIsOpen({ report: false, media: false })
//     };
//     return (
//         <>
//             <Dialog open={isOpen} onClose={() => setIsOpen({ report: false, media: false })} className="relative z-50">
//                 <DialogBackdrop className="fixed inset-0 bg-black/30 " />

//                 <div className="fixed inset-0 flex items-center justify-center ">
//                     <DialogPanel transition className="bg-white rounded-2xl w-[422px] h-auto">
//                         <div className="flex flex-col relative">
//                             <button className="absolute right-4 top-4" onClick={() => setIsOpen({ report: false, media: false })}>
//                                 <Image src="/icons/cancel-01.svg" alt="cancel" width={18} height={18} />
//                             </button>
//                             <div className="flex flex-col p-4 bg-[#9012FF] rounded-t-2xl gap-4">
//                                 <div className="flex flex-row items-center gap-3 text-white">
//                                     <Image src='/images/photo.png' alt="DP" width={96} height={96} />
//                                     <div className="flex flex-col">
//                                         <h2 className="text-xl font-semibold">Leslie Alexander</h2>
//                                         <p className="text-sm">leslie#9843</p>
//                                         <div className="flex flex-row items-center justify-center mt-2 px-2 py-1 rounded-full bg-white bg-opacity-20">
//                                             <Image className="mr-1" src="/icons/book-edit.svg" alt="exam year" width={16} height={16} />
//                                             <p className="text-xs font-medium mr-2">Exam Year</p>
//                                             <h3 className="text-normal">2025</h3>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="flex flex-row gap-2">
//                                     <button onClick={() => setIsOpen({ report: false, media: false })} className="flex flex-row items-center justify-center w-1/2 bg-white rounded-md border-b border-[#D0D5DD] px-6 py-[10px] gap-2">
//                                         <Image src="/icons/user-block-01.svg" alt="block user" width={18} height={18} />
//                                         <div className="text-sm font-semibold text-[#182230]">Decline</div>
//                                     </button>
//                                     <button onClick={() => setIsOpen({ report: false, media: false })} className="flex flex-row items-center justify-center w-1/2 bg-white rounded-md border-b border-green-600 px-6 py-[10px] gap-2">
//                                         <Image src="/icons/user-block-01.svg" alt="block user" width={18} height={18} />
//                                         <div className="text-sm font-semibold text-green-600">Accept</div>
//                                     </button>
//                                 </div>
//                             </div>
//                             <div className="mx-4 mt-4 mb-6">
//                                 <div><p className="text-sm text-[#1D2939] font-medium">Preparing Exams</p></div>
//                                 <div className="-mx-[10px]">
//                                     <ExamType />
//                                 </div>
//                             </div>
//                         </div>
//                     </DialogPanel>
//                 </div>
//             </Dialog>
//         </>
//     );
// }

// export default ChatArea;