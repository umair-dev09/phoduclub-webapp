
"use client";
import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
interface MediaDialogProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<{ report: boolean; media: boolean }>>;
}

function MediaDialog({ isOpen, setIsOpen }: MediaDialogProps) {
    const [activeSection, setActiveSection] = useState<'Images' | 'Videos' | 'Documents' | 'Links'>('Images'); // Default to 'Images'

    const handleCancel = () => {
        setIsOpen({ report: false, media: false });
    };

    const [scrollBehavior, setScrollBehavior] = useState<"inside" | "outside">("outside");
    return (
        <>
            <Modal
                isOpen={isOpen}
                onOpenChange={(isOpen) => !isOpen && handleCancel()}
                hideCloseButton

                scrollBehavior={scrollBehavior}

            >
                <ModalContent>
                    <>
                        {/* Modal Header */}
                        <ModalHeader className="flex flex-row justify-between gap-1">

                            <span className="text-lg font-bold text-[#1D2939] fontstyle-sora">Media</span>
                            <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]"
                                onClick={handleCancel}>
                                <button>
                                    <Image src="/icons/cancel.svg" alt="cancel" width={18} height={18} />
                                </button>



                            </button>
                        </ModalHeader>

                        {/* Modal Body */}
                        <ModalBody className="flex justify-center items-center ">
                            <div className="mt-4 w-full">
                                <div className="rounded-lg h-[44px] bg-[#F9FAFB] w-full border border-solid border-[#EAECF0] gap-1 flex flex-row">
                                    {/* Section Buttons */}
                                    <button
                                        className={`w-full rounded-md my-[2px] ml-[2px] ${activeSection === 'Images'
                                            ? 'bg-[#FFFFFF] text-[#182230] font-semibold rounded-md shadow-[0px_1px_3px_0px_rgba(16,_24,_40,_0.10),_0px_1px_2px_0px_rgba(16,_24,_40,_0.06)]'
                                            : 'hover:bg-[#EAECF0] text-[#667085] font-semibold'
                                            }`}
                                        onClick={() => setActiveSection('Images')}
                                    >
                                        <span className="text-sm">{activeSection === 'Images' ? 'Images' : 'Images'}</span>
                                    </button>
                                    <button
                                        className={`w-full rounded-md my-[2px] ml-[2px] ${activeSection === 'Videos'
                                            ? 'bg-[#FFFFFF] text-[#182230] font-semibold rounded-md shadow-[0px_1px_3px_0px_rgba(16,_24,_40,_0.10),_0px_1px_2px_0px_rgba(16,_24,_40,_0.06)]'
                                            : 'hover:bg-[#EAECF0] text-[#667085] font-semibold'
                                            }`}
                                        onClick={() => setActiveSection('Videos')}
                                    >
                                        <span className="text-sm">{activeSection === 'Videos' ? 'Videos' : 'Videos'}</span>
                                    </button>
                                    <button
                                        className={`w-full rounded-md my-[2px] ml-[2px] ${activeSection === 'Documents'
                                            ? 'bg-[#FFFFFF] text-[#182230] font-semibold rounded-md shadow-[0px_1px_3px_0px_rgba(16,_24,_40,_0.10),_0px_1px_2px_0px_rgba(16,_24,_40,_0.06)]'
                                            : 'hover:bg-[#EAECF0] text-[#667085] font-semibold'
                                            }`}
                                        onClick={() => setActiveSection('Documents')}
                                    >
                                        <span className="text-sm">{activeSection === 'Documents' ? 'Documents' : 'Documents'}</span>
                                    </button>
                                    <button
                                        className={`w-full rounded-md my-[2px] ml-[2px] ${activeSection === 'Links'
                                            ? 'bg-[#FFFFFF] text-[#182230] font-semibold rounded-md shadow-[0px_1px_3px_0px_rgba(16,_24,_40,_0.10),_0px_1px_2px_0px_rgba(16,_24,_40,_0.06)]'
                                            : 'hover:bg-[#EAECF0] text-[#667085] font-semibold'
                                            }`}
                                        onClick={() => setActiveSection('Links')}
                                    >
                                        <span className="text-sm">{activeSection === 'Links' ? 'Links' : 'Links'}</span>
                                    </button>




                                </div>
                            </div>

                            {/* Conditionally Render Content Based on Active Section */}
                            <div className="pt-4 pb-4">
                                {activeSection === 'Images' && (


                                    <div className=" overflow-y-auto flex flex-col h-[428px] ">

                                        {/* First tab (hidden content) */}
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
                                            {/* Other repeated text */}
                                        </div>

                                        {/* Second tab (centered content) */}
                                        <div className="flex flex-col justify-center items-center flex-grow">
                                            <Image
                                                src="/icons/Media-Images.svg"
                                                alt="Media-Images"
                                                width={122}
                                                height={122} />

                                            <div className="flex gap-[6px] flex-col justify-center items-center mt-4">
                                                <span className="font-semibold text-sm text-[#0C111D]">No images</span>
                                                <span className="font-normal text-xs text-[#667085]">
                                                    You’ll see here all shared images here
                                                </span>
                                            </div>
                                        </div>
                                    </div>


                                )}
                                {activeSection === 'Videos' && (
                                    <div className="mx-[24px] overflow-y-auto flex flex-col h-[428px] ">

                                        {/* First tab (hidden content) */}
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
                                            {/* Other repeated text */}
                                        </div>

                                        {/* Second tab (centered content) */}
                                        <div className="flex flex-col justify-center items-center flex-grow">
                                            <Image
                                                src="/icons/Media-No-Videos.svg"
                                                alt="Media-No-Videos"
                                                width={122}
                                                height={122} />

                                            <div className="flex gap-[6px] flex-col justify-center items-center mt-4">
                                                <span className="font-semibold text-sm text-[#0C111D]">No videos</span>
                                                <span className="font-normal text-xs text-[#667085]">
                                                    You’ll see here all shared videos here
                                                </span>
                                            </div>
                                        </div>
                                    </div>


                                )}
                                {activeSection === 'Documents' && (
                                    <div className="mx-[24px] overflow-y-auto flex flex-col h-[428px] ">

                                        {/* First tab (hidden content) */}
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
                                            {/* Other repeated text */}
                                        </div>

                                        {/* Second tab (centered content) */}
                                        <div className="flex flex-col justify-center items-center flex-grow">
                                            <Image
                                                src="/icons/Media-No-Documents.svg"
                                                alt="Media-No-Videos"
                                                width={122}
                                                height={122} />

                                            <div className="flex gap-[6px] flex-col justify-center items-center mt-4">
                                                <span className="font-semibold text-sm text-[#0C111D]">No documents</span>
                                                <span className="font-normal text-xs text-[#667085]">
                                                    You’ll see here all shared documents here
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {activeSection === 'Links' && (
                                    <div className="mx-[24px] overflow-y-auto flex flex-col h-[428px] ">

                                        {/* First tab (hidden content) */}
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
                                            {/* Other repeated text */}
                                        </div>

                                        {/* Second tab (centered content) */}
                                        <div className="flex flex-col justify-center items-center flex-grow">
                                            <Image
                                                src="/icons/Media-No-Links.svg"
                                                alt="Media-No-Videos"
                                                width={122}
                                                height={122} />

                                            <div className="flex gap-[6px] flex-col justify-center items-center mt-4">
                                                <span className="font-semibold text-sm text-[#0C111D]">No links</span>
                                                <span className="font-normal text-xs text-[#667085]">
                                                    You’ll see here all shared links here
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                )}
                            </div>
                        </ModalBody>


                    </>
                </ModalContent>
            </Modal >
            {/* <Dialog open={isOpen} onClose={handleCancel} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/30" />

                <div className="fixed inset-0 flex items-center justify-center">
                    <DialogPanel className="bg-white rounded-2xl w-[480px] h-auto border border-solid border-[#EAECF0]">
                        <div className="h-[68px] border-b border-solid border-[#EAECF0] px-[24px] pt-[20px]">
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-bold text-[#1D2939] fontstyle-sora">Media</span>

                                <button onClick={handleCancel}>
                                    <Image src="/icons/cancel.svg" alt="cancel" width={18} height={18} />
                                </button>
                            </div>
                        </div>

                        <div className="mx-[24px] mt-4">
                            <div className="rounded-lg h-[44px] bg-[#F9FAFB] border border-solid border-[#EAECF0] gap-1 flex flex-row">
                                {/* Section Buttons 
            <button
                className={`w-full rounded-md my-[2px] ml-[2px] ${activeSection === 'Images'
                    ? 'bg-[#FFFFFF] text-[#182230] font-semibold rounded-md shadow-[0px_1px_3px_0px_rgba(16,_24,_40,_0.10),_0px_1px_2px_0px_rgba(16,_24,_40,_0.06)]'
                    : 'hover:bg-[#EAECF0] text-[#667085] font-semibold'
                    }`}
                onClick={() => setActiveSection('Images')}
            >
                <span className="text-sm">{activeSection === 'Images' ? 'Images' : 'Images'}</span>
            </button>
            <button
                className={`w-full rounded-md my-[2px] ml-[2px] ${activeSection === 'Videos'
                    ? 'bg-[#FFFFFF] text-[#182230] font-semibold rounded-md shadow-[0px_1px_3px_0px_rgba(16,_24,_40,_0.10),_0px_1px_2px_0px_rgba(16,_24,_40,_0.06)]'
                    : 'hover:bg-[#EAECF0] text-[#667085] font-semibold'
                    }`}
                onClick={() => setActiveSection('Videos')}
            >
                <span className="text-sm">{activeSection === 'Videos' ? 'Videos' : 'Videos'}</span>
            </button>
            <button
                className={`w-full rounded-md my-[2px] ml-[2px] ${activeSection === 'Documents'
                    ? 'bg-[#FFFFFF] text-[#182230] font-semibold rounded-md shadow-[0px_1px_3px_0px_rgba(16,_24,_40,_0.10),_0px_1px_2px_0px_rgba(16,_24,_40,_0.06)]'
                    : 'hover:bg-[#EAECF0] text-[#667085] font-semibold'
                    }`}
                onClick={() => setActiveSection('Documents')}
            >
                <span className="text-sm">{activeSection === 'Documents' ? 'Documents' : 'Documents'}</span>
            </button>
            <button
                className={`w-full rounded-md my-[2px] ml-[2px] ${activeSection === 'Links'
                    ? 'bg-[#FFFFFF] text-[#182230] font-semibold rounded-md shadow-[0px_1px_3px_0px_rgba(16,_24,_40,_0.10),_0px_1px_2px_0px_rgba(16,_24,_40,_0.06)]'
                    : 'hover:bg-[#EAECF0] text-[#667085] font-semibold'
                    }`}
                onClick={() => setActiveSection('Links')}
            >
                <span className="text-sm">{activeSection === 'Links' ? 'Links' : 'Links'}</span>
            </button>




        </div >
                        </div >

        {/* Conditionally Render Content Based on Active Section 
        < div className = "pt-4 pb-4" >
            { activeSection === 'Images' && (


                <div className="mx-[24px] overflow-y-auto flex flex-col h-[428px] ">

                    {/* First tab (hidden content) 
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
                        {/* Other repeated text 
                    </div>

                    {/* Second tab (centered content) 
                    <div className="flex flex-col justify-center items-center flex-grow">
                        <Image
                            src="/icons/Media-Images.svg"
                            alt="Media-Images"
                            width={122}
                            height={122} />

                        <div className="flex gap-[6px] flex-col justify-center items-center mt-4">
                            <span className="font-semibold text-sm text-[#0C111D]">No images</span>
                            <span className="font-normal text-xs text-[#667085]">
                                You’ll see here all shared images here
                            </span>
                        </div>
                    </div>
                </div>


            )
}
{
    activeSection === 'Videos' && (
        <div className="mx-[24px] overflow-y-auto flex flex-col h-[428px] ">

            {/* First tab (hidden content) 
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
                {/* Other repeated text 
            </div>

            {/* Second tab (centered content) 
            <div className="flex flex-col justify-center items-center flex-grow">
                <Image
                    src="/icons/Media-No-Videos.svg"
                    alt="Media-No-Videos"
                    width={122}
                    height={122} />

                <div className="flex gap-[6px] flex-col justify-center items-center mt-4">
                    <span className="font-semibold text-sm text-[#0C111D]">No videos</span>
                    <span className="font-normal text-xs text-[#667085]">
                        You’ll see here all shared videos here
                    </span>
                </div>
            </div>
        </div>


    )
}
{
    activeSection === 'Documents' && (
        <div className="mx-[24px] overflow-y-auto flex flex-col h-[428px] ">

            {/* First tab (hidden content) 
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
                {/* Other repeated text 
            </div>

            {/* Second tab (centered content) 
            <div className="flex flex-col justify-center items-center flex-grow">
                <Image
                    src="/icons/Media-No-Documents.svg"
                    alt="Media-No-Videos"
                    width={122}
                    height={122} />

                <div className="flex gap-[6px] flex-col justify-center items-center mt-4">
                    <span className="font-semibold text-sm text-[#0C111D]">No documents</span>
                    <span className="font-normal text-xs text-[#667085]">
                        You’ll see here all shared documents here
                    </span>
                </div>
            </div>
        </div>
    )
}
{
    activeSection === 'Links' && (
        <div className="mx-[24px] overflow-y-auto flex flex-col h-[428px] ">

            {/* First tab (hidden content) 
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
                {/* Other repeated text 
            </div>

            {/* Second tab (centered content) 
            <div className="flex flex-col justify-center items-center flex-grow">
                <Image
                    src="/icons/Media-No-Links.svg"
                    alt="Media-No-Videos"
                    width={122}
                    height={122} />

                <div className="flex gap-[6px] flex-col justify-center items-center mt-4">
                    <span className="font-semibold text-sm text-[#0C111D]">No links</span>
                    <span className="font-normal text-xs text-[#667085]">
                        You’ll see here all shared links here
                    </span>
                </div>
            </div>
        </div>

    )
}
                        </div >
                    </DialogPanel >
                </div >
            </Dialog > */}
        </>
    );
}

export default MediaDialog;
