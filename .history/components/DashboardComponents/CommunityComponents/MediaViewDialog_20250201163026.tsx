import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import VideoPlayer from "./VideoPlayer";
import Image from "next/image";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, popover } from "@nextui-org/react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { useState } from "react";
interface MediaViewDialogProps {
    open: boolean;
    onClose: () => void;
    src: string;
    mediaType: string;
}

function MediaViewDialog({ open, onClose, src, mediaType }: MediaViewDialogProps) {

    const [popoveropen, setPopoveropen] = useState(false);
    const [scrollBehavior, setScrollBehavior] = useState<"inside" | "outside">("outside");

    return (

        <Modal
            isOpen={open}
            onOpenChange={(isOpen) => !isOpen && onClose()}
            hideCloseButton
            className="min-w-[900px] min-h-[600px] max-w-[900px] max-h-[600px]"
        // scrollBehavior={scrollBehavior}
        >
            <ModalContent>
                <>
                    {/* Modal Header */}
                    <ModalHeader className="flex flex-row justify-between  w-full h-full ">
                        <div className="flex flex-row justify-between gap-3 w-full h-[25px]">
                            <Popover
                                isOpen={popoveropen}
                                onOpenChange={(open) => setPopoveropen(open)}
                                placement="bottom"
                            >
                                <PopoverTrigger>

                                    <button className="w-[32px] h-[32px] rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]"
                                        onClick={onClose}>
                                        <Image src="/icons/more-horizontal.svg" alt="Cancel" width={23} height={23} />
                                    </button>
                                </PopoverTrigger>

                                <PopoverContent className="flex flex-col px-0 text-sm font-normal bg-white border border-lightGrey rounded-md w-[167px] shadow-md">
                                    <button
                                        className="p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full outline-none"
                                        onClick={() => setPopoveropen(false)}
                                    >
                                        <Image src="/icons/download-02.svg" alt="learn-icon" width={20} height={20} />
                                        <span className="text-sm text-[#0C111D] font-normal">Save</span>
                                    </button>
                                    <button
                                        className="p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full outline-none"
                                        onClick={() => setPopoveropen(false)}
                                    >
                                        <Image src="/icons/showinchat.svg" alt="video-icon" width={20} height={20} />
                                        <span className="text-sm text-[#0C111D] font-normal">Show in chat</span>
                                    </button>
                                    <button
                                        className="p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full outline-none"
                                        onClick={() => setPopoveropen(false)}
                                    >
                                        <Image src="/icons/Bookmark.svg" alt="test-icon" width={20} height={20} />
                                        <span className="text-sm text-[#0C111D] font-normal">Bookmark</span>
                                    </button>
                                </PopoverContent>
                            </Popover>
                            <button className="w-[32px] h-[32px] rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]"
                            >
                                <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                            </button>



                        </div>
                    </ModalHeader>

                    {/* Modal Body */}
                    <ModalBody className="flex justify-center items-center">
                        {mediaType === 'image' ? (
                            <Image className="w-[800px] h-[500px] object-cover rounded-md" src={src} width={800} height={800} alt='media' quality={100} />
                        ) : (
                            <VideoPlayer videoSrc={src} />
                        )}
                    </ModalBody>


                </>
            </ModalContent>
        </Modal>
    );
}
export default MediaViewDialog;


