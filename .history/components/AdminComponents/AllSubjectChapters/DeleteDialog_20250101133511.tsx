import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

interface Deleteprops {
    open: boolean;
    onClose: () => void;
}

function DeleteChapter({ open, onClose }: Deleteprops) {
    return (
        <Modal isOpen={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
            <ModalContent>
                <>
                    <ModalHeader className="flex flex-col gap-1">Delete Chapter</ModalHeader>
                    <ModalBody>
                        <p>
                            Are you sure you want to delete this chapter? This action cannot be undone.
                        </p>
                    </ModalBody>
                    <ModalFooter className="border border-lightGrey ">
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
