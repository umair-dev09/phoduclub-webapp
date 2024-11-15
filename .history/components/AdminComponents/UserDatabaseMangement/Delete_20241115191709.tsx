import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React from "react";
// Define the props interface
interface DeleteProps {
    open: boolean; // Prop to control dialog visibility
    onClose: () => void; // Define onClose as a function
}

function Delete({ open, onClose }: DeleteProps) { // Use the interface
    return (
        <Dialog open={true} onClose={onClose} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/30 " />
            <div className="fixed inset-0 flex items-center justify-center ">
                <DialogPanel transition className="bg-white rounded-2xl w-[480px] h-auto">
                    <div className="flex flex-col relative">
                        <button className="absolute right-6 top-6" onClick={onClose}>
                            <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                        </button>
                        <div className="mx-6 h-auto  pt-6 flex flex-col">
                            <h3 className="pb-3 font-bold text-[#1D2939]">Delete User?</h3>
                            <span className="text-sm font-normal text-[#667085]">Deleting the user will permanently remove all their data from the platform, including their account, activity, and content.</span>

                        </div>
                        <div className="mx-6 h-auto pt-4 pb-6 gap-2 flex flex-col">
                            <h3 className="font-medium text-sm text-[#1D2939]">To confirm, please enter the name of the user.</h3>
                            <div className="flex flex-row py-2 px-4 w-full gap-2 border border-solid border-[#D0D5DD] rounded-md transition duration-200 ease-in-out ">
                                <input

                                    className="w-full text-sm font-medium text-[#1D2939] placeholder:font-normal placeholder:text-[#A1A1A1] rounded-md outline-none"
                                    type="text"
                                    placeholder="Last Name"

                                />
                            </div>
                        </div>

                        <hr />
                        <div className="flex flex-row justify-end mx-6 my-4 gap-4">
                            <button className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey font-semibold text-sm text-[#1D2939] rounded-md" onClick={onClose}>Cancel</button>
                            <button className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#BB241A] border border-[#DE3024] rounded-md">Delete User</button>
                        </div>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}

export default Delete;
