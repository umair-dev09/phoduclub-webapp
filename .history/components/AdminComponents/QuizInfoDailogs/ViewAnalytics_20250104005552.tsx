import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
// Define the props interface
interface ViewAnalyticsProps {
    open: boolean; // Prop to control dialog visibility
    onClose: () => void; // Define onClose as a function
}

function ViewAnalytics({ open, onClose }: ViewAnalyticsProps) { // Use the interface
    return (

        <Modal isOpen={open} onOpenChange={(isOpen) => !isOpen && onClose()} hideCloseButton >

            <ModalContent>
                <>
                    <ModalHeader className="flex flex-row justify-between items-center gap-1">
                        <div className="flex flex-row gap-2">
                            <p className="font-semibold text-1xl text-[#1D2939]">Physics</p>
                            <Image
                                src={`/icons/Finished.svg`}
                                width={74}
                                height={24}
                                alt='finished'
                            />
                        </div>

                        <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7] ">
                            <button className="" onClick={onClose}>
                                <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                            </button>
                        </button>
                    </ModalHeader>
                    <ModalBody >
                        <div className="flex flex-col mb-1 gap-4">
                            <ul className="flex flex-col mx-6 gap-2 text-base font-normal list-disc list-inside">
                                <li className="text-[#1D2939]">This quiz contains - 10 Questions</li>
                                <li className="text-[#1D2939]">Each question will be of 3 Marks</li>
                                <li className="text-[#1D2939]">There’s negative marking (-1) for each wrong</li>
                            </ul>
                        </div>
                        <div className="flex flex-col  gap-4 pb-2">
                            <div className="flex flex-row gap-4">
                                <div className="flex flex-col w-full p-4 rounded-md border border-lightGrey hover:bg-lightGrey">
                                    <p className="text-[#1D2939] text-xl text-start font-medium">10</p>
                                    <p className="text-[#667085] text-base font-normal">Questions</p>
                                </div>
                                <div className="flex flex-col w-full p-4 rounded-md border border-lightGrey hover:bg-lightGrey">
                                    <p className="text-[#1D2939] text-xl text-start font-medium">3</p>
                                    <p className="text-[#667085] text-base font-normal">Marks per question</p>
                                </div>
                            </div>
                            <div className="flex flex-row gap-4">
                                <div className="flex flex-col w-full p-4 rounded-md border border-lightGrey hover:bg-lightGrey">
                                    <p className="text-[#1D2939] text-xl text-start font-medium">10 min</p>
                                    <p className="text-[#667085] text-base font-normal">Over all quiz time</p>
                                </div>
                                <div className="flex flex-col w-full p-4 rounded-md border border-lightGrey hover:bg-lightGrey">
                                    <p className="text-[#1D2939] text-xl text-start font-medium">2547</p>
                                    <p className="text-[#667085] text-base font-normal">Students attempted</p>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter className="border-t border-lightGrey">
                        <Button variant="light" className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey font-semibold hover:bg-[#F2F4F7] rounded-md" onClick={onClose}>Cancel</Button>
                        <Button className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#8501FF] font-semibold border border-[#9012FF] hover:bg-[#6D0DCC] rounded-md">View quiz details</Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal >
    );
}

export default ViewAnalytics;


