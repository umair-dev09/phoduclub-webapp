"use client";
import { useState } from "react";
import React from 'react';
import Image from "next/image";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { db } from '@/firebase';
import { collection, addDoc, setDoc, doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { Checkbox } from "@nextui-org/react";
import Select, { SingleValue } from 'react-select';


type AddNewUserProps = {
    open: boolean;
    close: () => void;
    isEditing?: boolean;
    firstName: string;
    setFirstName: (firstName: string) => void;
    lastName: string;
    setLastName: (lastName: string) => void;
    userId: string;
    setUserId: (userId: string) => void;
    profilePic: string;
    setProfilePic: (userId: string) => void;
    phone: string;
    setPhone: (phone: string) => void;
    selectedRole: string;
    setSelectedRole: (selectedRole: string) => void;
    adminIdd: string;
    setAdminId: (adminIdd: string) => void;
}

const courses: string[] = ["Physics - 101", "BITSET Full Course", "JEE - 2024", "Physics - 201"]

type Option = {
    value: string;
    label: string;
};

function AddNewUser({
    open,
    close,
    isEditing = false,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    adminIdd,
    setAdminId,
    userId,
    setUserId,
    profilePic,
    setProfilePic,
    phone,
    setPhone,
    // selectedRole,
    // setSelectedRole,
}: AddNewUserProps) {
    const [loading, setLoading] = useState(false); // Loading state
    const [roleDialogOpen, setRoleDialogOpen] = useState(false); // Loading state
    const [selectedCourses, setSelectedCourses] = useState<string[]>([]); // Track selected courses

    // Toggle course selection
    const toggleCourse = (course: string) => {
        setSelectedCourses((prev) =>
            prev.includes(course) ? prev.filter((item) => item !== course) : [...prev, course]
        );
    }

    const ROLE_OPTIONS = ["Admin", "Teacher", "Customer Care", "Editor", "Chief Moderator"];

    // const handleRoleSelect = (role: string) => {
    //     setSelectedRole(role);
    //     setRoleDialogOpen(false);
    // };

    // Check if all required fields are filled
    // const isFormValid = firstName && lastName && userId && phone && selectedRole;
    const isFormValid = firstName && lastName && userId && phone;
    // const isFormValid = firstName && lastName && userId && phone;

    const handleAddUser = async () => {
        if (!isFormValid || loading) return; // Prevent submission if fields are empty or loading

        setLoading(true); // Start loading
        const fullName = `${firstName} ${lastName}`;

        try {
            if (adminIdd) {
                // Update existing user data in Firestore using adminId
                await setDoc(doc(db, "admin", adminIdd), {
                    name: fullName,
                    userId,
                    phone,
                    role: selectedRole,
                    profilePic: profilePic,
                }, { merge: true });
                toast.success("User Updated Successfully!");
            } else {
                // Add new user data to Firestore
                const docRef = await addDoc(collection(db, "admin"), {
                    name: fullName,
                    userId,
                    phone,
                    role: selectedRole,
                    profilePic: 'https://firebasestorage.googleapis.com/v0/b/phodu-club.appspot.com/o/Default%20Avatar%2Fdefault-avatar-icon-of-social-media-user-vector%20(1).jpg?alt=media&token=211d97f7-c1f5-45a7-bce2-911e9bc195f8',
                });

                // Update the document with the generated adminId
                await setDoc(docRef, { adminId: docRef.id }, { merge: true });
                toast.success("User Added Successfully!");
            }

            close(); // Close dialog after successful submission
        } catch (error) {
            console.error("Error updating or adding user in Firestore:", error);
            toast.error("Failed to save user. Please try again.");
        } finally {
            setLoading(false); // End loading
        }
    };

    type CustomState = {
        isSelected: boolean;
        isFocused: boolean;
    };

    const roles: Option[] = [
        { value: 'Admin', label: 'Admin' },
        { value: 'Teacher', label: 'Teacher' },
        { value: 'Customer Care', label: 'Customer Care' },
        { value: 'Editor', label: 'Editor' },
        { value: 'Chief Moderator', label: 'Chief Moderator' },
    ];

    const [selectedRole, setSelectedRole] = useState<SingleValue<Option>>(null);

    return (
        <Dialog open={open} onClose={close} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/30" />
            <div className="fixed inset-0 flex items-center justify-center">
                <DialogPanel className="bg-white rounded-2xl w-[500px] h-auto px-6 pb-2 max-h-[92%] overflow-y-auto">
                    <div className="flex flex-col relative gap-6">
                        <div className="flex flex-row justify-between mt-6">
                            <h3 className="text-lg font-bold text-[#1D2939]">
                                {isEditing ? "Edit Profile" : "Add New User"}
                            </h3>
                            <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                                <button onClick={close}>
                                    <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                                </button>
                            </button>
                        </div>

                        <div className="flex flex-row w-full gap-4">
                            <div className="flex flex-col gap-1 w-1/2 flex-grow">
                                <label className="text-[#1D2939] text-sm font-medium">First Name</label>
                                <input
                                    className='p-[7px] text-base rounded-[5px] border border-gray-300  h-10 focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB]'
                                    type="text"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-1/2 flex-grow">
                                <label className="text-[#1D2939] text-sm font-medium">Last Name</label>
                                <input
                                    className='p-[7px] text-base rounded-[5px] border border-gray-300  h-10 focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB]'
                                    type="text"
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1 w-full">
                            <label className="text-[#1D2939] text-sm font-medium">{isEditing ? "User Id" : "Create User Id"}</label>
                            <input
                                className="w-full text-sm font-medium text-[#1D2939] placeholder:font-normal placeholder:text-[#A1A1A1] rounded-md  border border-gray-300  h-10 focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB] py-2 px-4"
                                type="text"
                                placeholder="User Id"
                                value={userId}
                                disabled={isEditing}
                                onChange={(e) => setUserId(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className='text-[14px] text-[#344054] font-medium'>Mobile No.</label>
                            <PhoneInput
                                country={'in'}
                                value={phone}
                                onChange={(phone) => setPhone("+" + phone)}
                                inputProps={{
                                    required: true,
                                    autoFocus: true,
                                    placeholder: "+91 00000-00000"
                                }}
                                inputStyle={{
                                    width: "100%",
                                    borderRadius: "4px",
                                    border: "1px solid #D0D5DD",
                                    height: "42px",
                                    boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                                    outline: "none"
                                }}
                                onFocus={(e) => e.target.style.boxShadow = "0 0 0 2px #D6BBFB"}
                                onBlur={(e) => e.target.style.boxShadow = "0px 1px 2px 0px rgba(16, 24, 40, 0.05)"}
                            />
                        </div>

                        {/* <div className="flex flex-col gap-1 w-full">
                            <label className="text-[#1D2939] text-sm font-medium">Role</label>
                            <div className="flex flex-row py-2 px-4 w-full gap-2 border border-gray-300  h-10 focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB] rounded-md transition duration-200 ease-in-out justify-between" onClick={() => setRoleDialogOpen(true)}>
                                <span className="font-normal text-sm text-[#182230]">{selectedRole || "Select Role"}</span>
                                <Popover placement="bottom-end" isOpen={roleDialogOpen} onOpenChange={(open) => setRoleDialogOpen(open)}>
                                    <PopoverTrigger>
                                        <button>
                                            <Image src="/icons/by-role-arrow-down.svg" width={20} height={20} alt="Select-role Button" />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[450px] ml-5 px-0 py-1 bg-white border border-lightGrey rounded-md">
                                        <div className="w-full">
                                            {["Admin", "Teacher", "Customer Care", "Editor", "Chief Moderator"].map((role) => (
                                                <button
                                                    key={role}
                                                    onClick={() => { handleRoleSelect(role); }}
                                                    className="flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#F2F4F7]"
                                                >
                                                    <span className="text-sm text-[#0C111D] font-normal">{role}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div> */}

                        <div className='w-full'>
                            <label htmlFor="target-year" className='mb-1 font-medium text-sm'>Target Year</label>
                            <Select
                                id="target-year"
                                value={selectedRole}
                                onChange={setSelectedRole}
                                options={roles}
                                placeholder="Select year..."
                                styles={{
                                    option: (provided, state: CustomState) => ({
                                        ...provided,
                                        color: 'black',
                                        backgroundColor: state.isFocused ? '#E39FF6' : 'white', // Purple color when focused
                                    }),
                                    singleValue: (provided) => ({
                                        ...provided,
                                        color: 'black',
                                        fontWeight: '500'
                                    }),
                                    control: (provided) => ({
                                        ...provided,
                                        border: '1px solid #e6e6e6',
                                        borderRadius: '8px',
                                        padding: '4px',
                                        boxShadow: 'none',
                                        '&:hover': {
                                            outline: '1px solid #e5a1f5',
                                        },
                                    }),
                                }}
                            />
                        </div>

                        <div className="flex flex-row justify-end my-2 items-center gap-4 border-t border-solid border-[#EAECF0] pt-4">
                            <button onClick={close} className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md text-[#1D2939] font-semibold hover:bg-[#F2F4F7] text-sm">Cancel</button>
                            <button
                                onClick={handleAddUser}
                                disabled={!isFormValid || loading} // Disable if form is invalid or loading
                                className={`py-[0.625rem] px-6 text-white shadow-inner-button  border border-white rounded-md font-semibold text-sm ${!isFormValid || loading ? 'bg-[#CDA0FC]' : 'bg-[#9012FF]'}`}>
                                {isEditing ? "Save Changes" : "Add New User"}
                            </button>
                        </div>
                    </div>
                </DialogPanel>
            </div >
        </Dialog >
    );
};

export default AddNewUser;

