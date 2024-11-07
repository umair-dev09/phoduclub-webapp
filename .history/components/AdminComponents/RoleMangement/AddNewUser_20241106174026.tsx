"use client";
import { useState } from "react";
import React from 'react';
import Image from "next/image";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
interface Editprofile {
    open: boolean; // Prop to control dialog visibility
    close: () => void; // Define onClose as a function
}

const Editprofile: React.FC<Editprofile> = ({ open, close }) => {
    const [phone, setPhone] = useState('');
    return (

        <Dialog open={open} onClose={close} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/30" />
            <div className="fixed inset-0 flex items-center justify-center">
                <DialogPanel className="bg-white rounded-2xl w-[500px] h-auto px-6">
                    <div className="flex flex-col relative gap-6">
                        <div className="flex flex-row justify-between mt-6">
                            <h3 className=" text-lg font-bold text-[#1D2939]">Add New User</h3>
                            <button onClick={close}>
                                <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                            </button>

                        </div>

                        <div className="flex flex-row w-full gap-4 ">
                            <div className="flex flex-col gap-1 w-1/2 flex-grow">
                                <label htmlFor="rating" className="text-[#1D2939] text-sm font-medium">
                                    First Name
                                </label>
                                <div className="flex flex-row py-2 px-4 w-full gap-2 border border-solid border-[#D0D5DD] rounded-md transition duration-200 ease-in-out ">
                                    <input

                                        className="w-full text-sm font-medium text-[#1D2939] placeholder:font-normal placeholder:text-[#A1A1A1] rounded-md outline-none"
                                        type="text"
                                        placeholder="First Name"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 w-1/2 flex-grow">
                                <label htmlFor="num-ratings" className="text-[#1D2939] text-sm font-medium">
                                    Last Name
                                </label>
                                <div className="flex flex-row py-2 px-4 w-full gap-2 border border-solid border-[#D0D5DD] rounded-md transition duration-200 ease-in-out ">
                                    <input

                                        className="w-full text-sm font-medium text-[#1D2939] placeholder:font-normal placeholder:text-[#A1A1A1] rounded-md outline-none"
                                        type="text"
                                        placeholder="Last Name"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 w-full ">
                            <label htmlFor="num-ratings" className="text-[#1D2939] text-sm font-medium">
                                User Id
                            </label>
                            <div className="flex flex-row py-2 px-4 w-full gap-2 border border-solid border-[#D0D5DD] rounded-md transition duration-200 ease-in-out ">
                                <input

                                    className="w-full text-sm font-medium text-[#1D2939] placeholder:font-normal placeholder:text-[#A1A1A1] rounded-md outline-none"
                                    type="text"
                                    placeholder="User Id"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 ">
                            <label className='text-[14px] text-[#344054] font-medium'>Moblie No.</label>
                            <div className="mt-1 pr-6">
                                <PhoneInput
                                    country={'in'}
                                    value={phone}
                                    onChange={(phone) => setPhone(phone)}
                                    inputProps={{
                                        required: true,
                                        autoFocus: true,
                                        placeholder: "+91 00000-00000"
                                    }}
                                    containerClass="phone-input-container "
                                    inputClass="forminput "
                                    inputStyle={{
                                        width: '450px',
                                        height: '42px',
                                        borderRadius: "8px",
                                        border: "1px solid #D0D5DD",
                                        boxShadow: "0px 1px 2px 0px #1018280D ",

                                    }}

                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 w-full ">
                            <label htmlFor="num-ratings" className="text-[#1D2939] text-sm font-medium">
                                Role
                            </label>

                            <Popover placement="bottom">
                                <PopoverTrigger>
                                    <div className="flex flex-row py-2 px-4 w-full gap-2 border border-solid border-[#D0D5DD] rounded-md transition duration-200 ease-in-out justify-between">
                                        <span className="font-normal text-sm text-[#182230]">Admin</span>
                                        <Image
                                            src="/icons/by-role-arrow-down.svg"
                                            width={20}
                                            height={20}
                                            alt="Select-date Button" />
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <div className="w-[10.438rem] py-1 bg-white border border-lightGrey rounded-md">
                                        <button className="flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#F2F4F7]">
                                            <Image src="/icons/edit-02.svg" width={18} height={18} alt="edit" />
                                            <span className="text-sm text-[#0C111D] font-normal">Edit details</span>
                                        </button>
                                        <button className=" flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#F2F4F7]"
                                        >
                                            <Image src='/icons/delete.svg' alt="user profile" width={18} height={18} />
                                            <p className="text-sm text-[#DE3024] font-normal">Remove</p>
                                        </button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="flex flex-row justify-end  my-2 items-center gap-4 border-t border-solid border-[#EAECF0] pt-4">
                            <button onClick={close} className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md text-[#1D2939] font-semibold text-sm">Cancel</button>
                            <button
                                onClick={close}
                                className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#9012FF] border border-[#8501FF] rounded-md font-semibold text-sm">
                                Add New User
                            </button>
                        </div>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
};

export default Editprofile;
