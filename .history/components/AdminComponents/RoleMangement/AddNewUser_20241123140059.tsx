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
    phone: string;
    setPhone: (phone: string) => void;
    selectedRole: string;
    setSelectedRole: (selectedRole: string) => void;
    adminIdd: string;
    setAdminId: (adminIdd: string) => void;
}

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
    phone,
    setPhone,
    selectedRole,
    setSelectedRole
}: AddNewUserProps) {
    const [loading, setLoading] = useState(false); // Loading state
    const [roleDialogOpen, setRoleDialogOpen] = useState(false); // Loading state

    const ROLE_OPTIONS = ["Admin", "Teacher", "Customer Care", "Guide", "Editor", "Chief Moderator"];

    const handleRoleSelect = (role: string) => {
        setSelectedRole(role);
    };

    // Check if all required fields are filled
    const isFormValid = firstName && lastName && userId && phone && selectedRole;

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
    const [checked, setChecked] = useState({
        physics101: false,
        bitsetFullCourse: false,
        jee2024: false,
        physics201: false
    });

    const handleClick = (course: string | number) => {
        setChecked((prevChecked) => ({
            ...prevChecked,
            [course]: !prevChecked[course]
        }));
    };


    return (
        <Dialog open={open} onClose={close} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/30" />
            <div className="fixed inset-0 flex items-center justify-center">
                <DialogPanel className="bg-white rounded-2xl w-[500px] h-auto px-6 pb-2">
                    <div className="flex flex-col relative gap-6">
                        <div className="flex flex-row justify-between mt-6">
                            <h3 className="text-lg font-bold text-[#1D2939]">
                                {isEditing ? "Edit Profile" : "Add New User"}
                            </h3>
                            <button onClick={close}>
                                <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                            </button>
                        </div>

                        <div className="flex flex-row w-full gap-4">
                            <div className="flex flex-col gap-1 w-1/2 flex-grow">
                                <label className="text-[#1D2939] text-sm font-medium">First Name</label>
                                <input
                                    className="w-full text-sm font-medium text-[#1D2939] placeholder:font-normal placeholder:text-[#A1A1A1] rounded-md outline-none border border-solid border-[#D0D5DD] py-2 px-4"
                                    type="text"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-1/2 flex-grow">
                                <label className="text-[#1D2939] text-sm font-medium">Last Name</label>
                                <input
                                    className="w-full text-sm font-medium text-[#1D2939] placeholder:font-normal placeholder:text-[#A1A1A1] rounded-md outline-none border border-solid border-[#D0D5DD] py-2 px-4"
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
                                className="w-full text-sm font-medium text-[#1D2939] placeholder:font-normal placeholder:text-[#A1A1A1] rounded-md outline-none border border-solid border-[#D0D5DD] py-2 px-4"
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
                                    width: '450px',
                                    height: '42px',
                                    borderRadius: "8px",
                                    border: "1px solid #D0D5DD",
                                    boxShadow: "0px 1px 2px 0px #1018280D",
                                }}
                            />
                        </div>

                        <div className="flex flex-col gap-1 w-full">
                            <label className="text-[#1D2939] text-sm font-medium">Role</label>
                            <div className="flex flex-row py-2 px-4 w-full gap-2 border border-solid border-[#D0D5DD] rounded-md transition duration-200 ease-in-out justify-between" onClick={() => setRoleDialogOpen(true)}>
                                <span className="font-normal text-sm text-[#182230]">{selectedRole || "Select Role"}</span>
                                <Popover placement="bottom-end" isOpen={roleDialogOpen} onOpenChange={(open) => setRoleDialogOpen(open)}>
                                    <PopoverTrigger>
                                        <button>
                                            <Image src="/icons/by-role-arrow-down.svg" width={20} height={20} alt="Select-role Button" />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[450px] ml-5 px-0 py-1 bg-white border border-lightGrey rounded-md">
                                        <div className="w-full">
                                            {["Admin", "Teacher", "Customer Care", "Guide", "Editor", "Chief Moderator"].map((role) => (
                                                <button
                                                    key={role}
                                                    onClick={() => { handleRoleSelect(role); setRoleDialogOpen(false); }}
                                                    className="flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#F2F4F7]"
                                                >
                                                    <span className="text-sm text-[#0C111D] font-normal">{role}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <label className="text-[#1D2939] text-sm font-medium">Select Course</label>
                            <Popover placement="bottom-end">
                                <PopoverTrigger>
                                    <button className="flex flex-row py-2 px-4 w-full gap-2 border border-solid border-[#D0D5DD] rounded-md transition duration-200 ease-in-out justify-between">
                                        <span className="font-normal text-sm text-[#182230]">Select Course</span>
                                        <Image src="/icons/by-role-arrow-down.svg" width={20} height={20} alt="Select-role Button" />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[450px] ml-5 px-0 py-1 bg-white border border-lightGrey rounded-md">
                                    <button
                                        className='flex flex-row w-full h-10 justify-start items-center hover:bg-[#EAECF0] px-2'
                                        onClick={() => handleClick('physics101')}
                                    >
                                        <Checkbox
                                            color="primary"
                                            checked={checked.physics101}
                                            onChange={() => handleClick('physics101')}
                                        />
                                        <span className='text-[#0C111D] font-normal text-sm'>Physics - 101</span>
                                    </button>

                                    <button
                                        className='flex flex-row w-full h-10 justify-start items-center hover:bg-[#EAECF0] px-2'
                                        onClick={() => handleClick('bitsetFullCourse')}
                                    >
                                        <Checkbox
                                            color="primary"
                                            checked={checked.bitsetFullCourse}
                                            onChange={() => handleClick('bitsetFullCourse')}
                                        />
                                        <span className='text-[#0C111D] font-normal text-sm'>BITSET Full Course</span>
                                    </button>

                                    <button
                                        className='flex flex-row w-full h-10 justify-start items-center hover:bg-[#EAECF0] px-2'
                                        onClick={() => handleClick('jee2024')}
                                    >
                                        <Checkbox
                                            color="primary"
                                            checked={checked.jee2024}
                                            onChange={() => handleClick('jee2024')}
                                        />
                                        <span className='text-[#0C111D] font-normal text-sm'>JEE - 2024</span>
                                    </button>

                                    <button
                                        className='flex flex-row w-full h-10 justify-start items-center hover:bg-[#EAECF0] px-2'
                                        onClick={() => handleClick('physics201')}
                                    >
                                        <Checkbox
                                            color="primary"
                                            checked={checked.physics201}
                                            onChange={() => handleClick('physics201')}
                                        />
                                        <span className='text-[#0C111D] font-normal text-sm'>Physics - 201</span>
                                    </button>
                                </PopoverContent>
                            </Popover>
                        </div>


                        <div className="flex flex-row justify-end my-2 items-center gap-4 border-t border-solid border-[#EAECF0] pt-4">
                            <button onClick={close} className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md text-[#1D2939] font-semibold text-sm">Cancel</button>
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

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// "use client";
// import { useState } from "react";
// import React from 'react';
// import Image from "next/image";
// import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';
// import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
// import { db } from '@/firebase';
// import { collection, addDoc, setDoc, doc, deleteDoc } from "firebase/firestore";
// import { toast } from "react-toastify";

// type AddNewUserProps = {
//     open: boolean;
//     close: () => void;
//     isEditing?: boolean;
//     firstName: string;
//     setFirstName: (firstName: string) => void;
//     lastName: string;
//     setLastName: (lastName: string) => void;
//     userId: string;
//     setUserId: (userId: string) => void;
//     phone: string;
//     setPhone: (phone: string) => void;
//     selectedRole: string[];
//     setSelectedRole: (roles: string[]) => void;
//     adminIdd: string;
//     setAdminId: (adminIdd: string) => void;
// }

// function AddNewUser({
//     open,
//     close,
//     isEditing = false,
//     firstName,
//     setFirstName,
//     lastName,
//     setLastName,
//     adminIdd,
//     setAdminId,
//     userId,
//     setUserId,
//     phone,
//     setPhone,
//     selectedRole,
//     setSelectedRole
// }: AddNewUserProps) {
//     const [loading, setLoading] = useState(false);
//     const [roleDialogOpen, setRoleDialogOpen] = useState(false);

//     const ROLE_OPTIONS = ["Admin", "Teacher", "Customer Care", "Guide", "Editor", "Chief Moderator"];

//     const handleRoleToggle = (role: string) => {
//         setSelectedRole(
//             selectedRole.includes(role)
//                 ? selectedRole.filter(r => r !== role)
//                 : [...selectedRole, role]
//         );
//     };

//     // Check if all required fields are filled
//     const isFormValid = firstName && lastName && userId && phone && selectedRole.length > 0;

//     const handleAddUser = async () => {
//         if (!isFormValid || loading) return;

//         setLoading(true);
//         const fullName = `${firstName} ${lastName}`;

//         try {
//             if (adminIdd) {
//                 // Update existing user data in Firestore using adminId
//                 await setDoc(doc(db, "admin", adminIdd), {
//                     name: fullName,
//                     userId,
//                     phone,
//                     roles: selectedRole,
//                 }, { merge: true });
//                 toast.success("User Updated Successfully!");
//             } else {
//                 // Add new user data to Firestore
//                 const docRef = await addDoc(collection(db, "admin"), {
//                     name: fullName,
//                     userId,
//                     phone,
//                     roles: selectedRole,
//                     profilePic: 'https://firebasestorage.googleapis.com/v0/b/phodu-club.appspot.com/o/Default%20Avatar%2Fdefault-avatar-icon-of-social-media-user-vector%20(1).jpg?alt=media&token=211d97f7-c1f5-45a7-bce2-911e9bc195f8',
//                 });

//                 // Update the document with the generated adminId
//                 await setDoc(docRef, { adminId: docRef.id }, { merge: true });
//                 toast.success("User Added Successfully!");
//             }

//             close(); // Close dialog after successful submission
//         } catch (error) {
//             console.error("Error updating or adding user in Firestore:", error);
//             toast.error("Failed to save user. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <Dialog open={open} onClose={close} className="relative z-50">
//             <DialogBackdrop className="fixed inset-0 bg-black/30" />
//             <div className="fixed inset-0 flex items-center justify-center">
//                 <DialogPanel className="bg-white rounded-2xl w-[500px] h-auto px-6 pb-2">
//                     <div className="flex flex-col relative gap-6">
//                         <div className="flex flex-row justify-between mt-6">
//                             <h3 className="text-lg font-bold text-[#1D2939]">
//                                 {isEditing ? "Edit Profile" : "Add New User"}
//                             </h3>
//                             <button onClick={close}>
//                                 <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
//                             </button>
//                         </div>

//                         {/* Previous input fields remain the same */}

//                         <div className="flex flex-col gap-1 w-full">
//                             <label className="text-[#1D2939] text-sm font-medium">Roles</label>
//                             <div
//                                 className="flex flex-row py-2 px-4 w-full gap-2 border border-solid border-[#D0D5DD] rounded-md transition duration-200 ease-in-out justify-between"
//                                 onClick={() => setRoleDialogOpen(true)}
//                             >
//                                 <span className="font-normal text-sm text-[#182230]">
//                                     {selectedRole.length > 0
//                                         ? selectedRole.join(", ")
//                                         : "Select Roles"}
//                                 </span>
//                                 <Popover
//                                     placement="bottom-end"
//                                     isOpen={roleDialogOpen}
//                                     onOpenChange={(open) => setRoleDialogOpen(open)}
//                                 >
//                                     <PopoverTrigger>
//                                         <button>
//                                             <Image src="/icons/by-role-arrow-down.svg" width={20} height={20} alt="Select-role Button" />
//                                         </button>
//                                     </PopoverTrigger>
//                                     <PopoverContent className="w-[450px] ml-5 px-0 py-1 bg-white border border-lightGrey rounded-md">
//                                         <div className="w-full">
//                                             {ROLE_OPTIONS.map((role) => (
//                                                 <button
//                                                     key={role}
//                                                     onClick={(e) => {
//                                                         e.stopPropagation();
//                                                         handleRoleToggle(role);
//                                                     }}
//                                                     className={`flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2
//                                                         ${selectedRole.includes(role)
//                                                             ? 'bg-[#F2F4F7]'
//                                                             : 'hover:bg-[#F2F4F7]'}`}
//                                                 >
//                                                     <div
//                                                         className={`w-4 h-4 border rounded
//                                                             ${selectedRole.includes(role)
//                                                                 ? 'bg-[#9012FF] border-[#9012FF]'
//                                                                 : 'border-gray-300'}`}
//                                                     >
//                                                         {selectedRole.includes(role) && (
//                                                             <svg
//                                                                 xmlns="http://www.w3.org/2000/svg"
//                                                                 viewBox="0 0 24 24"
//                                                                 fill="none"
//                                                                 stroke="white"
//                                                                 strokeWidth="2"
//                                                                 className="w-4 h-4"
//                                                             >
//                                                                 <polyline points="20 6 9 17 4 12"></polyline>
//                                                             </svg>
//                                                         )}
//                                                     </div>
//                                                     <span className="text-sm text-[#0C111D] font-normal ml-2">{role}</span>
//                                                 </button>
//                                             ))}
//                                         </div>
//                                     </PopoverContent>
//                                 </Popover>
//                             </div>
//                         </div>

//                         <div className="flex flex-row justify-end my-2 items-center gap-4 border-t border-solid border-[#EAECF0] pt-4">
//                             <button onClick={close} className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md text-[#1D2939] font-semibold text-sm">Cancel</button>
//                             <button
//                                 onClick={handleAddUser}
//                                 disabled={!isFormValid || loading}
//                                 className={`py-[0.625rem] px-6 text-white shadow-inner-button border border-white rounded-md font-semibold text-sm ${!isFormValid || loading ? 'bg-[#CDA0FC]' : 'bg-[#9012FF]'}`}>
//                                 {isEditing ? "Save Changes" : "Add New User"}
//                             </button>
//                         </div>
//                     </div>
//                 </DialogPanel>
//             </div>
//         </Dialog>
//     );
// };

// export default AddNewUser;
