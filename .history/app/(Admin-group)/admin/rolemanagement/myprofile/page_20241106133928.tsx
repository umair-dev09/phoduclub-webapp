"use client";
import Image from "next/image";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import EditProfile from "@/components/AdminComponents/RoleMangement/EditProfile";
import { useState } from "react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
function MyProfile() {
    const [phone, setPhone] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const openEdit = () => setIsEdit(true);
    const closeEdit = () => setIsEdit(false);
    const [islogout, setIslogout] = useState(false);
    const openlogout = () => setIslogout(true);
    const closelogout = () => setIslogout(false);

    return (
        <div className="flex justify-center w-full h-full">
            <div className="mt-8 flex h-[298px] w-[588px] bg-[#FFFFFF] gap-6 flex-col border border-solid border-[#EAECF0] rounded-md p-6">
                <div className="flex flex-row justify-between h-[72px] w-auto items-center">
                    <div className="flex flex-row gap-2 h-10 items-center">
                        <Image src='/icons/Profile-pic.png' alt="DP" width={72} height={72} />
                        <div className="flex flex-col gap-1">
                            <span className="text-[#1D2939] font-semibold text-2xl">Jenny Wilson</span>
                            <span className="font-normal text-[#667085] text-base">Admin</span>
                        </div>
                    </div>
                    <div className="flex flex-row gap-3">
                        <button onClick={openEdit} className="py-2 px-4 bg-[#FFFFFF] gap-2 h-[40px] w-auto items-center border border-solid border-[#EAECF0] rounded-[8px] flex flex-row justify-between">
                            <Image src="/icons/edit-02.svg" width={18} height={18} alt="edit" />
                            <span className="text-sm text-[#0C111D] font-normal">Edit</span>
                        </button>
                        <button className="py-2 px-4 bg-[#FFFFFF] gap-2 h-[40px] w-auto items-center border border-solid border-[#EAECF0] rounded-[8px] flex flex-row justify-between"
                            onClick={openlogout}>
                            <Image src="/icons/logout-03.svg" width={18} height={18} alt="logout" />
                            <span className="text-sm text-[#DE3024] font-normal">Log out</span>
                        </button>
                    </div>
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
            </div>

            {/* Dialog Component  for Edit*/}
            <Dialog open={isEdit} onClose={closeEdit} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 flex items-center justify-center">
                    <DialogPanel className="bg-white rounded-2xl w-[500px] h-auto px-6">
                        <div className="flex flex-col relative gap-6">
                            <div className="flex flex-row justify-between mt-6">
                                <h3 className=" text-lg font-bold text-[#1D2939]">Edit Info</h3>
                                <button onClick={closeEdit}>
                                    <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                                </button>

                            </div>
                            <div className="flex flex-col gap-3 items-center">
                                <Image
                                    src="/icons/big-profile-pic.svg"
                                    width={152}
                                    height={152}
                                    alt="big-profile-pic" />
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
                            <div className="flex flex-col gap-1 w-full ">
                                <label htmlFor="num-ratings" className="text-[#1D2939] text-sm font-medium">
                                    Role
                                </label>
                                <div className="flex flex-row py-2 px-4 w-full gap-2 border border-solid border-[#D0D5DD] rounded-md transition duration-200 ease-in-out justify-between">
                                    <span className="font-normal text-sm text-[#182230]">Admin</span>
                                    <Image
                                        src="/icons/by-role-arrow-down.svg"
                                        width={20}
                                        height={20}
                                        alt="Select-date Button" />
                                </div>
                            </div>

                            <div className="flex flex-row justify-end  my-2 items-center gap-4 border-t border-solid border-[#EAECF0] pt-4">
                                <button onClick={closeEdit} className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md text-[#1D2939] font-semibold text-sm">Discard</button>
                                <button
                                    onClick={closeEdit}
                                    className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#9012FF] border border-[#8501FF] rounded-md font-semibold text-sm">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
            {/* Dailog for Log out */}
            <Dialog open={islogout} onClose={closelogout} className="relative z-50" aria-label="Delete Quiz Dialog">
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 flex items-center justify-center">
                    <DialogPanel transition className="bg-white rounded-2xl w-[480px] h-auto">
                        <div className="flex flex-col relative">
                            <button className="absolute right-6 top-6" onClick={closelogout}>
                                <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                            </button>
                            <div className="mx-6">
                                <h3 className="mt-6 font-bold task-[#1D2939]">Log Out</h3>
                                <p className="my-4 text-sm font-normal text-[#667085]">Lorem ipsum is placeholder text commonly used in the grap</p>
                            </div>
                            <hr />
                            <div className="flex flex-row justify-end mx-6 my-4 gap-4">
                                <button className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md" onClick={closelogout}>Cancel</button>
                                <button className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#BB241A] border border-[#DE3024] rounded-md">Log out</button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
            {islogout && <EditProfile onClose={closelogout} open={true} />}
        </div>
    );
}

export default MyProfile;
