import { auth, db } from "@/firebase";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
// Define the props interface
interface exitgroupProps {
    open: boolean; // Prop to control dialog visibility
    onClose: () => void; // Define onClose as a function
    communityId: string;
    communityName: string;
}
function DeleteGroupForUser({ open, onClose, communityId, communityName}: exitgroupProps) {
    const currentUserId = auth.currentUser?.uid;
    const router = useRouter();
    const handleDeleteGroup = async () => {
        if (!currentUserId) return;

        const communityRef = doc(db, "communities", communityId);
        try {
            await updateDoc(communityRef, {
                members: arrayRemove({ id: currentUserId, isAdmin: false }),
               groupExitedMembers: arrayRemove(currentUserId),
            });
            onClose(); // Close the dialog after successful exit
            toast.success('Group Deleted Successfully');
            router.replace('/community');
        } catch (error) {
            console.error("Error exiting group: ", error);
        }
    };

    return (
        <Dialog open={true} onClose={onClose} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/30 " />
            <div className="fixed inset-0 flex items-center justify-center ">
                <DialogPanel transition className="bg-white rounded-2xl w-[480px] h-auto">
                    <div className=' flex flex-col p-6 gap-2'>
                        <div className='flex flex-row justify-between items-center'>
                            <h1 className='text-[#1D2939] font-bold text-lg'>Delete “{communityName}” group?</h1>
                            <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                                <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} onClick={onClose} />
                            </button>
                        </div>
                        <span className="text-sm font-normal text-[#667085]">All channels message will be deleted.</span>

                    </div>
                    <hr />
                    <div className="flex flex-row justify-end mx-6 my-4 gap-4">
                        <button className="py-[0.625rem] px-6 border-2  border-solid border-[#EAECF0] font-semibold text-sm text-[#1D2939] hover:bg-[#F2F4F7] rounded-md" onClick={onClose} >Cancel</button>
                        <button className="py-[0.625rem] px-6 text-white shadow-inner-button  font-semibold bg-[#BB241A] border border-[#DE3024] rounded-md" onClick={handleDeleteGroup} >Yes, Delete group</button>
                    </div>

                </DialogPanel>
            </div >
        </Dialog >
    )
}
export default DeleteGroupForUser;