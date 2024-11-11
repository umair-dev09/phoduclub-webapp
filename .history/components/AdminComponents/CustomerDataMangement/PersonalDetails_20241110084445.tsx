"use client";
import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
function PersonalDetails() {
    const [phone, setPhone] = useState('');
    return (
        <div className="flex flex-col m-8  gap-6">
            <h1 className="text-[#1D2939] font-semibold text-lg">Personal Details</h1>
            <div className="flex flex-row justify-between w-full h-[72px]">
                <div className="flex flex-row gap-3">

                    <div className="relative">
                        <Image src='/images/DP_Lion.svg' alt="DP" width={72} height={72} />
                        <Image className="absolute right-0 bottom-0" src='/icons/winnerBatch.svg' alt="Batch" width={32} height={32} />
                    </div>
                    <div className="flex items-start flex-col justify-center">
                        <div className="font-semibold text-[#1D2939] text-2xl">Jenny Wilson</div>
                        <div className="flex justify-start items-start text-[16px] font-medium text-[#667085]">jenny#8547</div>
                    </div>


                </div>
                <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] w-[84px] items-center ">
                    <Image src="/icons/edit-icon.svg" width={18} height={18} alt="Edit-quiz" />
                    <span className="text-sm text-[#0C111D] font-normal">Edit</span>
                </button>
            </div>
            <hr />
            <div className="flex flex-row w-full">
                <div className="flex flex-col w-1/2">
                    <span className="font-normal text-[#667085] text-[16px]">First Name</span>
                    <span className="font-semibold text-[#1D2939] text-[16px]">Jenny</span>
                </div>
                <div className="flex flex-col w-1/2">
                    <span className="font-normal text-[#667085] text-[16px]">Last Name</span>
                    <span className="font-semibold text-[#1D2939] text-[16px]">Wilson</span>
                </div>
            </div>
            <div className="flex flex-row w-full">
                <div className="flex flex-col w-1/2">
                    <span className="font-normal text-[#667085] text-[16px]">User ID</span>
                    <span className="font-semibold text-[#1D2939] text-[16px]">jenny#8745</span>
                </div>
                <div className="flex flex-col w-1/2">
                    <span className="font-normal text-[#667085] text-[16px]">Mobile No.</span>
                    <span className="font-semibold text-[#1D2939] text-[16px]">+918431823329</span>
                </div>
            </div>

            <div className="flex flex-col w-full">
                <span className="font-normal text-[#667085] text-[16px]">Joining Date</span>
                <span className="font-semibold text-[#1D2939] text-[16px]">Jan 6, 2024</span>
            </div>
            <Dialog open={open} onClose={close} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 flex items-center justify-center">
                    <DialogPanel className="bg-white rounded-2xl w-[500px] h-auto px-6">
                        <div className="flex flex-col relative gap-6">
                            <div className="flex flex-row justify-between mt-6">
                                <h3 className=" text-lg font-bold text-[#1D2939]">Edit Info</h3>
                                <button onClick={close}>
                                    <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                                </button>


                            </div>
                            <div className="flex flex-col gap-3 items-center">
                                <div className="relative">
                                    <Image src='/images/DP_Lion.svg' alt="DP" width={152} height={152} />
                                    <Image className="absolute right-0 bottom-0" src='/icons/winnerBatch.svg' alt="Batch" width={68} height={68} />
                                </div>
                                <span className="font-semibold text-sm text-[#9012FF]">Change</span>
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


                            <div className="flex flex-row justify-end  my-2 items-center gap-4 border-t border-solid border-[#EAECF0] pt-4">
                                <button onClick={close} className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md text-[#1D2939] font-semibold text-sm">Discard</button>
                                <button
                                    onClick={close}
                                    className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#9012FF] border border-[#8501FF] rounded-md font-semibold text-sm">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </div>



    )
}
export default PersonalDetails;