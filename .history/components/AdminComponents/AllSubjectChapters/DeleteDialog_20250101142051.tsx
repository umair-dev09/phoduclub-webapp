import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import Image from "next/image";
interface Deleteprops {
    open: boolean;
    onClose: () => void;
}

function DeleteChapter({ open, onClose }: Deleteprops) {
    return (
        <Modal isOpen={open} onOpenChange={(isOpen) => !isOpen && onClose()}
            closeButton={false} >
            <ModalContent>
                <>
                    <ModalHeader className="flex flex-row justify-between gap-1">Delete Chapter
                        <button
                            className="w-[32px] h-[32px] rounded-full flex items-center justify-center hover:bg-[#F2F4F7]"
                            onClick={onClose}
                            aria-label="Close dialog"
                        >
                            <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                        </button>
                    </ModalHeader>
                    <ModalBody>
                        <p>
                            Are you sure you want to delete this chapter? This action cannot be undone.
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                            Cancel
                        </Button>
                        <Button color="primary" onPress={() => {
                            // Add delete action logic here
                            onClose(); // Close dialog after delete
                        }}>
                            Confirm
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    );
}

export default DeleteChapter;
