import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React from "react";
import { setDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase';
import { toast } from 'react-toastify';
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
        <Dialog open={true} onClose={onClose} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/30 " />
            <div className="fixed inset-0 flex items-center justify-center ">
                <DialogPanel transition className="bg-white rounded-2xl w-[480px] h-auto">
                    <div className="flex flex-col relative">
                        <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                            <button className="absolute right-6 top-6" onClick={onClose}>
                                <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                            </button>
                        </button>
                        <div className="mx-6 h-auto  py-6 flex flex-col">
                            <h3 className="pb-3 font-bold text-[#1D2939]">{banUser ? 'Ban User?' : 'Revoke Ban?'}</h3>
                            <span className="pb-6 text-sm font-normal text-[#667085]">{banUser ? 'Are you sure you want to ban this user?' : 'Are you sure you want to revoke ban for this user?'}</span>
                            <p className="text-sm font-normal text-[#667085]">{banUser ? 'Banning will immediately restrict their access to the platform and disable their account.' : 'Revoking Ban will immediately give user access to the platform and enable their account.'}</p>
                        </div>

                        <hr />
                    </div>
                    <div className="flex flex-row justify-end mx-6 my-4 gap-4">
                        <button className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey font-semibold text-sm text-[#1D2939] rounded-md hover:bg-[#F2F4F7]" onClick={onClose}>Cancel</button>
                        <button className={`py-[0.625rem] px-6 text-white shadow-inner-button  ${banUser ? 'bg-[#BB241A]' : 'bg-[#0B9055]'} border border-white rounded-md`} onClick={handleBanUser}>{banUser ? 'Ban User' : 'Revoke Ban'}</button>
                    </div>

                </DialogPanel>
            </div>
        </Dialog>
    );
}

export default Ban;
