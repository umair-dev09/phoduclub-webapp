import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import VideoPlayer from "./VideoPlayer";
import Image from "next/image";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { useState } from "react";
interface MediaViewDialogProps {
    open: boolean;
    onClose: () => void;
    src: string;
    mediaType: string;
}

function MediaViewDialog({ open, onClose, src, mediaType }: MediaViewDialogProps) {


    const [scrollBehavior, setScrollBehavior] = useState<"inside" | "outside">("outside");

    return (
        // <Dialog
        //     open={open}
        //     onClose={onClose}
        //     className="relative z-50"
        //     aria-label="Create Channel Dialog"
        // >
        //     <DialogBackdrop className="fixed inset-0 bg-black/30" />
        //     <div className="fixed inset-0 flex items-center justify-center">
        //         <DialogPanel transition className="flex flex-col bg-white rounded-md w-[90%] h-[90%]">
        //             <div className="flex flex-col items-center w-full h-full gap-4">
        //                 <div className="flex flex-row justify-between gap-3 w-full h-[25px] px-4 mt-3">
        //                     <Image src="/icons/more-horizontal.svg" alt="Cancel" width={23} height={23} />
        //                     <button onClick={onClose}>
        //                         <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
        //                     </button>
        //                 </div>
        //                 {mediaType === 'image' ? (
        //                     <Image className="w-[80%] h-[85%] object-contain" src={src} width={800} height={800} alt='media' quality={100} />
        //                 ) : (
        //                     <VideoPlayer videoSrc={src} />
        //                 )}
        //             </div>
        //         </DialogPanel>
        //     </div>
        // </Dialog>
        <Modal
            isOpen={open}
            onOpenChange={(isOpen) => !isOpen && onClose()}
            hideCloseButton

            scrollBehavior={scrollBehavior}
            size="4xl"
        >
            <ModalContent>
                <>
                    {/* Modal Header */}
                    <ModalHeader className="flex flex-row justify-between gap-1">
                        <div className="flex flex-row justify-between gap-3 w-full h-[25px] px-4 mt-3">
                            <Image src="/icons/more-horizontal.svg" alt="Cancel" width={23} height={23} />

                            <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]"
                                onClick={onClose}>
                                <button>
                                    <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                                </button>
                            </button>
                        </div>
                    </ModalHeader>

                    {/* Modal Body */}
                    <ModalBody>
                        {mediaType === 'image' ? (
                            <Image className="w-[80%] h-[85%] object-contain" src={src} width={800} height={800} alt='media' quality={100} />
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
