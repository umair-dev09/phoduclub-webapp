import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

// Define the props interface
interface RemoveProps {
    open: boolean; // Prop to control dialog visibility
    onClose: () => void; // Define onClose as a function
}

function Remove({ open, onClose }: RemoveProps) { // Use the interface
    return (
        <Modal isOpen={open} onOpenChange={(isOpen) => !isOpen && onClose()} hideCloseButton >

            <ModalContent>
                <>
                    <ModalHeader className="flex flex-row justify-between items-center gap-1">
                        <h3 className=" font-bold task-[#1D2939]">Remove user from test series?</h3>
                        <button
                            className="w-[32px] h-[32px] rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]"
                            onClick={onClose}
                        >
                            <Image
                                src="/icons/cancel.svg"
                                alt="Cancel"
                                width={20}
                                height={20}
                            />
                        </button>
                    </ModalHeader>
                    <ModalBody >
                        <p className="pb-2 text-sm font-normal text-[#667085]">
                            Are you sure you want to remove this user? This action cannot be undone.
                        </p>
                    </ModalBody>
                    <ModalFooter className="border-t border-lightGrey">
                        <Button
                            className="py-[0.625rem] px-6 border border-solid border-[#EAECF0] bg-white font-semibold text-sm text-[#1D2939] rounded-md hover:bg-[#F2F4F7]"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#BB241A] border border-[#DE3024] hover:bg-[#B0201A] font-semibold rounded-md">Remove</Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal >
    );
}

export default Remove;
