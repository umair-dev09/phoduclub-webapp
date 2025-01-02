import { auth, db } from "@/firebase";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";
// Define the props interface
interface exitchannelProps {
    open: boolean; // Prop to control dialog visibility
    onClose: () => void; // Define onClose as a function
    communityId: string;
    channelHeadingId: string;
    channelId: string;
    channelName: string;

}
function exitchannel({ open, onClose, communityId, channelHeadingId, channelId, channelName }: exitchannelProps) {

    const currentUserId = auth.currentUser?.uid;

    const exitChannel = async () => {
        if (!currentUserId) return;

        const channelRef = doc(db, "communities", communityId, "channelsHeading", channelHeadingId, "channels", channelId);
        try {
            await updateDoc(channelRef, {
                members: arrayRemove({ id: currentUserId, isAdmin: false })
            });
            console.log("User removed from channel successfully");
            toast.success('Exited from the channel successfully');
            onClose();
        } catch (error) {
            console.error("Error removing user from channel: ", error);
            toast.error('Failed to exit channel. Please try again');
        }
    };
    return (
        // <Dialog open={true} onClose={onClose} className="relative z-50">
        //     <DialogBackdrop className="fixed inset-0 bg-black/30 " />
        //     <div className="fixed inset-0 flex items-center justify-center ">
        //         <DialogPanel transition className="bg-white rounded-2xl w-[480px] h-auto">
        //             <div className=' flex flex-col p-6 gap-2'>
        //                 <div className='flex flex-row justify-between items-center'>
        //                     <h1 className='text-[#1D2939] font-bold text-lg'>Exit “{channelName}” channel?</h1>
        //                     <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
        //                         <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} onClick={onClose} />
        //                     </button>
        //                 </div>
        //                 <span className="text-sm font-normal text-[#667085]">Only Group admins will be notified that you left the channel. Once leaved you have to request the admin to join the channel again.</span>

        //             </div>
        //             <hr />
        //             <div className="flex flex-row justify-end mx-6 my-4 gap-4">
        //                 <button className="py-[0.625rem] px-6 border-2  border-solid border-[#EAECF0] font-semibold text-sm text-[#1D2939] hover:bg-[#F2F4F7] rounded-md" onClick={onClose} >Cancel</button>
        //                 <button className="py-[0.625rem] px-6 text-white shadow-inner-button  font-semibold bg-[#BB241A] border border-[#DE3024] rounded-md" onClick={exitChannel} >Yes, Exit channel</button>
        //             </div>

        //         </DialogPanel>
        //     </div >
        // </Dialog >
        <Modal
            isOpen={true}
            onOpenChange={(isOpen) => !isOpen && onClose()}
            hideCloseButton
        >
            <ModalContent>
                <>
                    <ModalHeader className="flex flex-row justify-between gap-1">
                        <h1 className="font-bold text-[#1D2939] text-lg">
                            Exit “{channelName}” channel?
                        </h1>
                        <button
                            className="w-[32px] h-[32px] rounded-full flex items-center justify-center hover:bg-[#F2F4F7]"
                            onClick={onClose}
                            aria-label="Close dialog"
                        >
                            <Image
                                src="/icons/cancel.svg"
                                alt="Cancel"
                                width={20}
                                height={20}
                            />
                        </button>
                    </ModalHeader>

                    <ModalBody>
                        <div className="flex flex-col pb-2 gap-2">
                            <span className="text-sm font-normal text-[#667085]">
                                Only Group admins will be notified that you left the channel. Once
                                leaved, you have to request the admin to join the channel again.
                            </span>
                        </div>
                    </ModalBody>

                    <ModalFooter className="border-t border-lightGrey">
                        <button
                            className="py-[0.625rem] px-6 border-2 border-solid border-[#EAECF0] font-semibold text-sm text-[#1D2939] hover:bg-[#F2F4F7] rounded-md"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            className="py-[0.625rem] px-6 text-white shadow-inner-button font-semibold bg-[#BB241A] border border-[#DE3024] rounded-md"
                            onClick={exitChannel}
                        >
                            Yes, Exit channel
                        </button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>

    )
}
export default exitchannel;;