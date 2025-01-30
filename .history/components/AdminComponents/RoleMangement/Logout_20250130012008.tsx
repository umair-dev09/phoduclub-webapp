"use client";
import React from 'react';
import Image from "next/image";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { auth } from '@/firebase';
import { signOut } from 'firebase/auth'; // Import the User type from Firebase
import { useRouter } from 'next/navigation';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

type LogoutProps = {
    open: boolean; // Prop to control dialog visibility
    onclose: () => void; // Define onClose as a function
}
function Logout({ open, onclose }: LogoutProps) {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            onclose();
            router.push("/admin-login");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (

        // <Dialog open={open} onClose={onclose} className="relative z-50" aria-label="Delete Quiz Dialog">
        //     <DialogBackdrop className="fixed inset-0 bg-black/30" />
        //     <div className="fixed inset-0 flex items-center justify-center">
        //         <DialogPanel transition className="bg-white rounded-2xl w-[480px] h-auto">
        //             <div className="flex flex-col p-6 gap-4">
        //                 <div className='flex flex-row items-center justify-between'>
        //                     <h3 className="font-bold text-[#1D2939]">Log Out</h3>
        //                     <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
        //                         <button onClick={onclose}>
        //                             <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
        //                         </button>
        //                     </button>
        //                 </div>
        //                 <p className="text-sm font-normal text-[#667085]">Lorem ipsum is placeholder text commonly used in the grap</p>
        //             </div>
        //             <hr />
        //             <div className="flex flex-row justify-end mx-6 my-4 gap-4">
        //                 <button className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md hover:bg-[#F2F4F7]" onClick={onclose}>Cancel</button>
        //                 <button className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#BB241A] border border-[#DE3024] rounded-md" onClick={handleLogout}>Log out</button>
        //             </div>

        //         </DialogPanel>
        //     </div>
        // </Dialog>
        <Modal isOpen={open} onOpenChange={(isOpen) => !isOpen && onclose()} hideCloseButton >

            <ModalContent>
                <>
                    <ModalHeader className="flex flex-row justify-between items-center gap-1">
                        <h3 className="font-bold text-[#1D2939]">Logout</h3>
                        <button
                            className="w-[32px] h-[32px] rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]"
                            onClick={onclose}
                        >
                            <Image
                                src="/icons/cancel.svg"
                                alt="Cancel"
                                width={20}
                                height={20}
                            />
                        </button>
                    </ModalHeader>
                    <ModalBody >
                        <p className="text-sm pb-2 font-normal text-[#667085]">
                            Are you sure you want to log out? You will need to log in again to access your account.</p>
                    </ModalBody>
                    <ModalFooter className="border-t border-lightGrey">
                        <Button variant="light" className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md hover:bg-[#F2F4F7]" onClick={onclose}>Cancel</Button>
                        <Button className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#BB241A] border border-[#DE3024] hover:bg-[#B0201A] rounded-md" onClick={handleLogout}>Logout</Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal >
    );
};

export default Logout;
