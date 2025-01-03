import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";

interface Deleteprops {
    open: boolean;
    onClose: () => void;
}

function DeleteChapter({ open, onClose }: Deleteprops) {
    const [confirmedName, setConfirmedName] = useState('');
    const isFormValid = confirmedName;
    return (
        <Modal
            isOpen={open}
            onOpenChange={(isOpen) => !isOpen && onClose()}
            hideCloseButton
        >
            <ModalContent>
                <>
                    <ModalHeader className="flex flex-row justify-between gap-1">
                        <h1 className="font-bold text-[#1D2939] text-lg">Delete Chapter</h1>
                        <button
                            className="w-[32px] h-[32px] rounded-full flex items-center justify-center hover:bg-[#F2F4F7]"
                            onClick={onClose}
                            aria-label="Close dialog"
                        >
                            <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                        </button>
                    </ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col pb-2 gap-2">
                            <span className="font-normal text-sm text-[#667085]"> Are you sure you want to delete this chapter? This action cannot be undone.</span>
                            <div className="flex flex-col  gap-2">
                                <span className="font-semibold text-sm text-[#1D2939]">To confirm, please enter the name of the Chapter.</span>
                                <div className='flex px-2 items-bcenter h-[40px] border border-gray-300   focus:outline focus:outline-[1.5px] focus:outline-[#f3b7b3] hover:outline hover:outline-[1.5px] hover:outline-[#f3b7b3] shadow-sm rounded-md'>
                                    <input
                                        className="font-normal text-[#667085] w-full text-sm placeholder:text-[#A1A1A1] rounded-md px-1 py-1 focus:outline-none focus:ring-0 border-none"
                                        type="text"
                                        placeholder="Chapter Name"
                                        value={confirmedName}
                                        onChange={(e) => setConfirmedName(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                    </ModalBody>
                    <ModalFooter className="border-t border-lightGrey">
                        <Button variant="light" className=" font-semibold  border border-lightGrey" onPress={onClose}>
                            Cancel
                        </Button>
                        <Button onPress={() => {
                            // Add delete action logic here
                            onClose(); // Close dialog after delete
                        }}
                            className={` font-semibold text-[#FFFFFF]  ${!isFormValid ? "bg-[#f3b7b3] cursor-not-allowed" : "bg-[#BB241A]"} rounded-md`}>
                            Delete
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    );
}

export default DeleteChapter;
