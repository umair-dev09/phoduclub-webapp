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
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { kMaxLength } from "buffer";

interface AddNewUserProps {
    open: boolean;
    close: () => void;
    firstName: string;
    setFirstName: (firstName: string) => void;
    lastName: string;
    setLastName: (lastName: string) => void;
    userId: string;  // This is now the Firebase Auth ID / document ID
    setUserId: (userId: string) => void;
    phone: string;
    setPhone: (phone: string) => void;
    selectedRole: string;
    setSelectedRole: (selectedRole: string) => void;
    isEditing: boolean;
    profilePic: string;
    setProfilePic: (profilePic: string) => void;
    uniqueId: string;  // This is the user-friendly display ID
    setUniqueId: (uniqueId: string) => void;
}

const courses: string[] = ["Physics - 101", "BITSET Full Course", "JEE - 2024", "Physics - 201"]

function Addnewuser({
    open,
    close,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    userId,
    setUserId,
    phone,
    setPhone,
    selectedRole,
    setSelectedRole,
    isEditing,
    profilePic,
    setProfilePic,
    uniqueId,
    setUniqueId,
}: AddNewUserProps) {
    const [loading, setLoading] = useState(false); // Loading state
    const [scrollBehavior, setScrollBehavior] = useState<"inside" | "outside">("outside");
    const isFormValid = firstName && lastName && uniqueId && phone && selectedRole !== 'Select Role';
    const [isRoleOpen, setIsRoleOpen] = useState(false);

    // Generate a user-friendly display ID format
    const generateUniqueDisplayId = (name: string) => {
        const baseName = name.toLowerCase().split(" ")[0] || "user";
        const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit number
        return `${baseName}#${randomNum}`;
    };

    const handleAddUser = async () => {
        if (!isFormValid || loading) return; // Prevent submission if fields are empty or loading

        setLoading(true); // Start loading
        const fullName = `${firstName} ${lastName}`;

        try {
            if (isEditing && userId) {
                // Update existing user data in Firestore using userId as document ID
                await setDoc(doc(db, "admin", userId), {
                    uniqueId: uniqueId, // User-friendly display ID
                    name: fullName,
                    phone: phone,
                    role: selectedRole,
                    profilePic: profilePic,
                }, { merge: true });

                toast.success('User Updated Successfully');
            } else {
                // Add new user data to Firestore
                // For new users, we're creating a document with a generated ID (which becomes userId)
                const displayId = uniqueId || generateUniqueDisplayId(fullName);
                
                const docRef = await addDoc(collection(db, "admin"), {
                    uniqueId: displayId, // User-friendly display ID for display in UI
                    name: fullName,
                    phone: phone,
                    role: selectedRole,
                    profilePic: 'https://firebasestorage.googleapis.com/v0/b/phodu-club.appspot.com/o/Default%20Avatar%2Fdefault-avatar-icon-of-social-media-user-vector%20(1).jpg?alt=media&token=211d97f7-c1f5-45a7-bce2-911e9bc195f8',
                });

                // Now docRef.id becomes the userId (Firebase Auth ID / document ID)
                // Update the userId field in the document
                await setDoc(docRef, { userId: docRef.id }, { merge: true });
                toast.success('User Added Successfully');
            }

            close(); // Close dialog after successful submission
        } catch (error) {
            console.error("Error adding/updating user in Firestore:", error);
            toast.error('Failed to save user. Please try again.');
        } finally {
            setLoading(false); // End loading regardless of outcome
        }
    };

    return (

        <Modal isOpen={open} onOpenChange={(isOpen) => !isOpen && close()} hideCloseButton
            scrollBehavior={scrollBehavior}>

            <ModalContent>
                <>
                    <ModalHeader className="flex flex-row justify-between items-center gap-1">
                        <h3 className="text-lg font-bold text-[#1D2939]">
                            {isEditing ? "Edit Profile" : "Add New User"}
                        </h3>
                        <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                            <button onClick={close}>
                                <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                            </button>
                        </button>
                    </ModalHeader>
                    <ModalBody className="flex flex-col gap-4">
                        <div className="flex flex-row w-full gap-4">
                            <div className="flex flex-col gap-1 w-1/2 flex-grow">
                                <label className="text-[#1D2939] text-sm font-medium">First Name</label>
                                <input
                                    className="w-full text-sm font-medium text-[#1D2939] placeholder:text-[#A1A1A1] rounded-md border border-[#D0D5DD] px-4 py-2 focus:outline-none"
                                    type="text"
                                    placeholder="First Name"
                                    value={firstName}
                                    maxLength={15}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-1/2 flex-grow">
                                <label className="text-[#1D2939] text-sm font-medium">Last Name</label>
                                <input
                                    className="w-full text-sm font-medium text-[#1D2939] placeholder:text-[#A1A1A1] rounded-md border border-[#D0D5DD] px-4 py-2 focus:outline-none"
                                    type="text"
                                    placeholder="Last Name"
                                    value={lastName}
                                    maxLength={15}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <label className="text-[#1D2939] text-sm font-medium">{isEditing ? "Display ID" : "Create Display ID"}</label>
                            <input
                                className="w-full text-sm font-medium text-[#1D2939] placeholder:font-normal placeholder:text-[#A1A1A1] rounded-md  border border-gray-300  h-10 focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB] py-2 px-4"
                                type="text"
                                placeholder="Display ID (e.g. username#1234)"
                                value={uniqueId}
                                maxLength={25}
                                disabled={isEditing}
                                onChange={(e) => setUniqueId(e.target.value)}
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
                                    placeholder: "+91 00000-00000",
                                    kMaxLength: 15
                                }}
                                inputStyle={{
                                    width: "100%",
                                    borderRadius: "4px",
                                    border: "1px solid #D0D5DD",
                                    height: "42px",
                                    boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                                    outline: "none"
                                }}
                                onFocus={(e) => e.target.style.boxShadow = "0 0 0 2px #D6BBFB"
                                }
                                onBlur={(e) => e.target.style.boxShadow = "0px 1px 2px 0px rgba(16, 24, 40, 0.05)"
                                }
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className='text-[14px] text-[#344054] font-medium'>Role</label>
                            <Popover placement='bottom' isOpen={isRoleOpen} onOpenChange={(open) => setIsRoleOpen(open)}>
                                <PopoverTrigger>
                                    <button className='flex flex-row w-full gap-1 text-sm text-[#1D2939] font-medium rounded-md border border-[#D0D5DD] px-4 py-2 focus:outline-none mb-2'>
                                        <div className={`w-full text-sm text-start`}>{selectedRole}</div>
                                        <Image src='/icons/arrow-down-01-round.svg' alt='open popup' width={20} height={20} />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className='flex flex-col justify-start w-[300px] h-auto py-1 px-0 bg-white '>
                                    {["Admin", "Teacher", "Customer Care", "Editor", "Chief Moderator"].map(role => (
                                        <button
                                            key={role}
                                            onClick={() => { setSelectedRole(role); setIsRoleOpen(false); }}
                                            className='w-full text-sm text-left text-[#0C111D] px-4 py-[0.625rem] hover:bg-[#F2F4F7]'
                                        >
                                            {role}
                                        </button>
                                    ))}
                                </PopoverContent>
                            </Popover>
                        </div>
                    </ModalBody>
                    <ModalFooter className="border-t border-lightGrey">
                        <Button variant="light" onClick={close} className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md text-[#1D2939] font-semibold hover:bg-[#F2F4F7] text-sm">Cancel</Button>
                        <Button
                            onClick={handleAddUser}
                            disabled={!isFormValid || loading} // Disable if form is invalid or loading
                            className={`py-[0.625rem] px-6 text-white shadow-inner-button  border border-white rounded-md font-semibold text-sm ${!isFormValid || loading ? 'bg-[#CDA0FC]' : 'hover:bg-[#6D0DCC] bg-[#9012FF]'}`}>
                            {isEditing ? "Save Changes" : "Add New User"}
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal >
    );
};

export default Addnewuser;

