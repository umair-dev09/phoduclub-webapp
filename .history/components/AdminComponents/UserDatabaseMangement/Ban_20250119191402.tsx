import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React from "react";
import { setDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase';
import { toast } from 'react-toastify';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

// Define the props interface
interface BanProps {
    open: boolean; // Prop to control dialog visibility
    onClose: () => void; // Define onClose as a function
    id: string;
    banUser: boolean;
}

function Ban({ open, onClose, id, banUser }: BanProps) { // Use the interface

    const handleBanUser = async () => {
        try {
            if (banUser) {
                await setDoc(doc(db, "users", id), {
                    isBanned: true,
                }, { merge: true });
                toast.success("User Banned Successfully!");
                onClose();
            } else {
                await setDoc(doc(db, "users", id), {
                    isBanned: false,
                }, { merge: true });
                toast.success("User Reovke from ban Successfully!");
                onClose();
            }
        } catch (error) {
            console.error("Error banning user in Firestore:", error);
            toast.error("Failed to ban or unban user. Please try again.");
        }
    };

    return (
        // <Dialog open={true} onClose={onClose} className="relative z-50">
        //     <DialogBackdrop className="fixed inset-0 bg-black/30 " />
        //     <div className="fixed inset-0 flex items-center justify-center ">
        //         <DialogPanel transition className="bg-white rounded-2xl w-[480px] h-auto">
        //             <div className="flex flex-col gap-4 p-6">
        //                 <div className="flex flex-row justify-between items-center">
        //                     <h3 className="font-bold text-[#1D2939]">{banUser ? 'Ban User?' : 'Revoke Ban?'}</h3>
        //                     <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
        //                         <button onClick={onClose}>
        //                             <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
        //                         </button>
        //                     </button>
        //                 </div>
        //                 <div className="h-auto flex flex-col">
        //                     <span className="text-sm font-normal text-[#667085]">{banUser ? 'Are you sure you want to ban this user?' : 'Are you sure you want to revoke ban for this user?'}</span>
        //                     <p className="text-sm font-normal text-[#667085]">{banUser ? 'Banning will immediately restrict their access to the platform and disable their account.' : 'Revoking Ban will immediately give user access to the platform and enable their account.'}</p>
        //                 </div>
        //             </div>
        //             <hr />
        //             <div className="flex flex-row justify-end mx-6 my-4 gap-4">
        //                 <button className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey font-semibold text-sm text-[#1D2939] rounded-md hover:bg-[#F2F4F7]" onClick={onClose}>Cancel</button>
        //                 <button className={`py-[0.625rem] px-6 text-white shadow-inner-button  ${banUser ? 'bg-[#BB241A]' : 'bg-[#0B9055]'} border border-white rounded-md`} onClick={handleBanUser}>{banUser ? 'Ban User' : 'Revoke Ban'}</button>
        //             </div>

        //         </DialogPanel>
        //     </div>
        // </Dialog>
        <Modal isOpen={true} onOpenChange={(isOpen) => !isOpen && onClose()} hideCloseButton
        >

            <ModalContent>
                <>
                    <ModalHeader className="flex flex-row justify-between items-center gap-1">
                        <h3 className="font-bold text-[#1D2939]">{banUser ? 'Ban User?' : 'Revoke Ban?'}</h3>
                        <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                            <button onClick={onClose}>
                                <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                            </button>
                        </button>
                    </ModalHeader>
                    <ModalBody>
                        <span className="font-normal text-sm text-[#667085]">All data inside this channel will be gone.</span>
                        <div className="flex flex-col gap-1 pb-2">
                            <span className="font-semibold text-sm text-[#1D2939]">To confirm, please enter the name of the channel.</span>
                            <div className='flex px-2 items-center h-[40px] border border-gray-300  focus:outline focus:outline-[1.5px] focus :outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB] shadow-sm rounded-md'>
                                <input
                                    className="font-normal text-[#667085] w-full text-sm placeholder:text-[#A1A1A1] rounded-md px-1 py-1 focus:outline-none focus:ring-0 border-none"
                                    type="text"
                                    placeholder={channelName}
                                    value={confirmedName}
                                    onChange={(e) => setConfirmedName(e.target.value)}
                                />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter className="border-t border-lightGrey">
                        <Button variant="light" className="py-[0.625rem] px-6 border-2  border-solid border-[#EAECF0] font-semibold text-sm text-[#1D2939] rounded-md hover:bg-[#F2F4F7]" onClick={onClose} >Cancel</Button>
                        <Button className={`py-[0.625rem] px-6 text-white text-sm shadow-inner-button font-semibold  border border-solid  border-white ${isFormValid ? "bg-[#BB241A] hover:bg-[#B0201A] " : "bg-[#f3b7b3] cursor-not-allowed"} rounded-md`} onClick={handleDeleteChannel}>Delete Channel</Button>

                    </ModalFooter>
                </>
            </ModalContent>
        </Modal >
    );
}

export default Ban;
