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
        // <Dialog open={true} onClose={onClose} className="relative z-50">
        //     <DialogBackdrop className="fixed inset-0 bg-black/30 " />
        //     <div className="fixed inset-0 flex items-center justify-center ">
        //         <DialogPanel transition className="bg-white rounded-2xl w-[480px] h-auto">
        //             <div className="flex flex-col relative">
        //                 <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7] ">
        //                     <button className="absolute right-6 top-6" onClick={onClose}>
        //                         <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
        //                     </button>
        //                 </button>
        //                 <div className="mx-6">
        //                     <h3 className="mt-6 font-bold task-[#1D2939]">Remove user from test series?</h3>
        //                     <p className="my-4 text-sm font-normal text-[#667085]">Lorem ipsum is placeholder text commonly used</p>
        //                 </div>
        //                 <hr />
        //                 <div className="flex flex-row justify-end mx-6 my-4 gap-4">
        //                     <button className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey  hover:bg-[#F2F4F7] rounded-md" onClick={onClose}>Cancel</button>
        //                     <button className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#BB241A] border border-[#DE3024] rounded-md">Remove</button>
        //                 </div>
        //             </div>
        //         </DialogPanel>
        //     </div>
        // </Dialog>
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
                        <p className="pb-2 text-sm font-normal text-[#667085]">Lorem ipsum is placeholder text commonly used</p>
                    </ModalBody>
                    <ModalFooter className="border-t border-lightGrey">
                        <Button
                            className="py-[0.625rem] px-6 border-2 border-solid border-[#EAECF0] bg-white font-semibold text-sm text-[#1D2939] rounded-md hover:bg-[#F2F4F7]"
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
