import { auth, db } from "@/firebase";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

// Define the props interface
interface BlockUserProps {
    open: boolean; // Prop to control dialog visibility
    onClose: () => void; // Define onClose as a function
    userId: string;
    userName: string;
    pChatId: string;
}

function BlockUser({ open, onClose, userId, userName, pChatId }: BlockUserProps) {
    const [isLoading, setIsLoading] = useState(false);
    const currentUserId = auth.currentUser?.uid;

    const handleBlockUser = async () => {
        if (!currentUserId) return;
        setIsLoading(true);

        try {
            toast.dismiss();
            // Add user to blocked users collection
            const userDoc = doc(db, "users", currentUserId);
            await updateDoc(userDoc, {
               blockedUsers: arrayUnion(userId),
            });

            const chatDoc = doc(db, "privatechats", pChatId);
            await updateDoc(chatDoc, {
                chatStatus: 'blocked',
                blockedBy: currentUserId,
            });

            toast.success(`${userName} has been blocked.`);
            onClose();
        } catch (error) {
            console.error("Error blocking user: ", error);
            toast.error("Failed to block user. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        // <Modal
        //     isOpen={true}
        //     onOpenChange={(isOpen) => !isOpen && onClose()}
        //     hideCloseButton
        // >
        //     <ModalContent>
        //         <>
        //             {/* Modal Header */}
        //             <ModalHeader className="flex flex-row justify-between gap-1">
        //                 <h1 className="text-[#1D2939] font-bold text-lg">
        //                     Block “USER”?
        //                 </h1>
        //                 <button
        //                     className="w-[32px] h-[32px] rounded-full flex items-center justify-center hover:bg-[#F2F4F7]"
        //                     onClick={onClose}
        //                     aria-label="Close dialog"
        //                 >
        //                     <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
        //                 </button>
        //             </ModalHeader>

        //             {/* Modal Body */}
        //             <ModalBody>
        //                 <div className="flex flex-col pb-2 gap-2">
        //                     <span className="text-sm font-normal text-[#667085]">
        //                         Are you sure you want to block this user? They will no longer be able to send you messages, and you won't see any of their messages. You can unblock them at any time.
        //                     </span>
        //                 </div>
        //             </ModalBody>

        //             {/* Modal Footer */}
        //             <ModalFooter className="border-t border-lightGrey">
        //                 <button
        //                     className="py-[0.625rem] px-6 border-2 border-solid border-[#EAECF0] font-semibold text-sm text-[#1D2939] hover:bg-[#F2F4F7] rounded-md"
        //                     onClick={onClose}
        //                 >
        //                     Cancel
        //                 </button>
        //                 <button
        //                     className="py-[0.625rem] px-6 text-white shadow-inner-button font-semibold bg-[#BB241A] hover:bg-[#B0201A]  border border-[#DE3024] rounded-md"
        //                 // onClick={handleExitGroup}
        //                 >
        //                     Yes, Block
        //                 </button>
        //             </ModalFooter>
        //         </>
        //     </ModalContent>
        // </Modal>

        <Modal
            isOpen={open}
            onOpenChange={(isOpen) => !isOpen && onClose()}
            hideCloseButton
        >
            <ModalContent>
                <>
                    {/* Modal Header */}
                    <ModalHeader className="flex flex-row justify-between gap-1">
                        <h1 className="text-[#1D2939] font-bold text-lg">
                            Block "{userName}"?
                        </h1>
                        <button
                            className="w-[32px] h-[32px] rounded-full flex items-center justify-center hover:bg-[#F2F4F7]"
                            onClick={onClose}
                            aria-label="Close dialog"
                        >
                            <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                        </button>
                    </ModalHeader>

                    {/* Modal Body */}
                    <ModalBody>
                        <div className="flex flex-col pb-2 gap-2">
                            <span className="text-sm font-normal text-[#667085]">
                                Are you sure you want to block this user? They will no longer be able to send you messages. You can unblock them at any time.
                            </span>
                        </div>
                    </ModalBody>

                    {/* Modal Footer */}
                    <ModalFooter className="border-t border-lightGrey">
                        <button
                            className="py-[0.625rem] px-6 border-2 border-solid border-[#EAECF0] font-semibold text-sm text-[#1D2939] hover:bg-[#F2F4F7] rounded-md"
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button
                            className="py-[0.625rem] px-6 text-white shadow-inner-button font-semibold bg-[#BB241A] hover:bg-[#B0201A] border border-[#DE3024] rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleBlockUser}
                            disabled={isLoading}
                        >
                            {isLoading ? "Blocking..." : "Yes, Block"}
                        </button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>

    )
}
export default BlockUser;