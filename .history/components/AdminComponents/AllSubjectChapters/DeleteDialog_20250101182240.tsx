import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import Image from "next/image";

interface Deleteprops {
    open: boolean;
    onClose: () => void;
}

function DeleteChapter({ open, onClose }: Deleteprops) {
    return (
        <Modal
            isOpen={open}
            onOpenChange={(isOpen) => !isOpen && onClose()}
            hideCloseButton
        >
            <ModalContent>
                <>
                    <ModalHeader className="flex flex-row justify-between gap-1">
                        <h1 className="font-bold text-[#1D2939] text-lg">  Delete Chapter</h1>
                        <button
                            className="w-[32px] h-[32px] rounded-full flex items-center justify-center hover:bg-[#F2F4F7]"
                            onClick={onClose}
                            aria-label="Close dialog"
                        >
                            <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                        </button>
                    </ModalHeader>
                    <ModalBody>
                        <p className="text-[#667085] text-sm font-normal">
                            Are you sure you want to delete this chapter? This action cannot be undone.
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="light" className=" font-semibold " onPress={onClose}>
                            Cancel
                        </Button>
                        <Button color="danger" onPress={() => {
                            // Add delete action logic here
                            onClose(); // Close dialog after delete
                        }}
                            className="hover:bg-[#6D0DCC] font-semibold ">
                            Delete
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    );
}

export default DeleteChapter;
