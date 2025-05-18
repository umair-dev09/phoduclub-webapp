"use client";
import { useState, useEffect } from "react";
import React from 'react';
import Image from "next/image";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore"; // Firestore imports
import { db } from "@/firebase"; // Update this path according to your firebase configuration
import LoadingData from "@/components/Loading";
import AdminImageCropper from "./AdminImagecropper";
import { toast } from "react-toastify";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

type EditProfileProps = {
    open: boolean;
    close: () => void;
    uniqueId: string | null;  // This is actually the Firebase Auth ID (user.uid)
}

interface UserData {
    name: string;
    userId: string;  // Firebase Auth ID (auth ID)
    uniqueId: string; // User-friendly display ID (like "kushal#123")
    profilePic: string;
    phone: string;
    role: string;
}

function Editprofile({ open, close, uniqueId }: EditProfileProps) {  // uniqueId here is actually the Firebase Auth ID
    const [phone, setPhone] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [displayId, setDisplayId] = useState(''); // User-friendly display ID
    const [selectedRole, setSelectedRole] = useState('');
    const [roleDialogOpen, setRoleDialogOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showCropper, setShowCropper] = useState(false);
    const [showImageCropper, setShowImageCropper] = useState(false);
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    const [scrollBehavior, setScrollBehavior] = useState<"inside" | "outside">("outside");

    const getDigitCount = (phoneNumber: string) => {
        return phoneNumber.replace(/\D/g, '').length;
    };

    const isFormValid = firstName &&
        lastName &&
        displayId &&
        phone &&
        getDigitCount(phone) <= 12 &&
        selectedRole;

    // Function to handle role selection
    const handleRoleSelect = (role: string) => {
        setSelectedRole(role);
    };

    // Fetch admin data from Firestore when uniqueId (Firebase Auth ID) changes
    useEffect(() => {
        if (uniqueId) {  // uniqueId here is the Firebase Auth ID (user.uid)
            const docRef = doc(db, "admin", uniqueId);
            const fetchData = async () => {
                try {
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        // Split the name into first and last name
                        const nameParts = userData.name?.split(' ') || ["", ""];
                        setFirstName(nameParts[0] || "");
                        setLastName(nameParts.slice(1).join(" ") || "");
                        setPhone(userData.phone || "");
                        setProfilePic(userData.profilePic || "/defaultAdminDP.jpg");
                        setSelectedRole(userData.role || "");
                        setDisplayId(userData.uniqueId || ""); // Set the user-friendly display ID
                    } else {
                        console.error('No user data found!');
                    }
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [uniqueId]);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const maxSizeInMB = 5; // Maximum file size in MB
            const maxSizeInBytes = maxSizeInMB * 1024 * 1024; // Convert MB to Bytes

            if (file.size > maxSizeInBytes) {
                alert(`The image size cannot exceed ${maxSizeInMB}MB.`);
                return; // Do not proceed if the image size exceeds the limit
            }

            setUploadedImage(file);
            setShowCropper(true);
            setShowImageCropper(true);
        }
    };

    const handleSaveChanges = async () => {
        if (!isFormValid || loading) return; // Prevent submission if fields are empty or loading

        setLoading(true); // Start loading
        const fullName = `${firstName} ${lastName}`;
        try {
            // Update existing user data in Firestore using uniqueId (Firebase Auth ID)
            await setDoc(doc(db, "admin", uniqueId || ''), {
                name: fullName,
                phone,
                role: selectedRole,
                profilePic,
                // Keep the userId (Firebase Auth ID) and uniqueId (display ID) intact
                userId: uniqueId, // Firebase Auth ID
                uniqueId: displayId // User-friendly display ID
            }, { merge: true });
            toast.success("Changes Saved!");
            close(); // Close dialog after successful submission
        } catch (error) {
            console.error("Error updating or adding user in Firestore:", error);
            toast.error("Failed to make changes. Please try again.");
        } finally {
            setLoading(false); // End loading
        }
    };

    if (loading) {
        <LoadingData />
    }

    return (
        <div>
            <Modal isOpen={open} onOpenChange={(isOpen) => !isOpen && close()} hideCloseButton scrollBehavior={scrollBehavior} >

                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-row justify-between items-center gap-1">
                            <h3 className=" text-lg font-bold text-[#1D2939]">Edit Info</h3>
                            <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                                <button onClick={close}>
                                    <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                                </button>
                            </button>
                        </ModalHeader>
                        <ModalBody>
                            <div className="pb-2 px-1 ">
                                <div className="flex flex-col gap-2 items-center pb-2">
                                    <Image className="rounded-full"
                                        src={profilePic || "/defaultAdminDP.jpg"}
                                        width={120}
                                        height={120}
                                        alt="big-profile-pic" />

                                    <label className="font-semibold text-sm text-[#9012FF] hover:text-black cursor-pointer">
                                        <input
                                            type="file"
                                            id="upload"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                        />
                                        Change
                                    </label>

                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-row w-full gap-4 ">
                                        <div className="flex flex-col gap-1 w-1/2 flex-grow">
                                            <label htmlFor="rating" className="text-[#1D2939] text-sm font-medium">
                                                First Name
                                            </label>
                                            <div className="flex flex-row py-2 px-4 w-full gap-2 border border-gray-300  h-10 focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB] rounded-md transition duration-200 ease-in-out ">
                                                <input
                                                    className="w-full text-sm font-medium text-[#1D2939] placeholder:font-normal placeholder:text-[#A1A1A1] rounded-md outline-none"
                                                    type="text"
                                                    placeholder="First Name"
                                                    value={firstName}
                                                    maxLength={25}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1 w-1/2 flex-grow">
                                            <label htmlFor="num-ratings" className="text-[#1D2939] text-sm font-medium">
                                                Last Name
                                            </label>
                                            <div className="flex flex-row py-2 px-4 w-full gap-2 border border-gray-300  h-10 focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB] rounded-md transition duration-200 ease-in-out ">
                                                <input
                                                    className="w-full text-sm font-medium text-[#1D2939] placeholder:font-normal placeholder:text-[#A1A1A1] rounded-md outline-none"
                                                    type="text"
                                                    placeholder="Last Name"
                                                    value={lastName}
                                                    maxLength={25}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1 w-full ">
                                        <label htmlFor="num-ratings" className="text-[#1D2939] text-sm font-medium">
                                            User ID
                                        </label>
                                        <div className="flex flex-row  w-full gap-2  border border-gray-300  h-10 focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB]  rounded-md transition duration-200 ease-in-out ">
                                            <input
                                                className="w-full text-sm font-medium py-2 px-4 text-[#1D2939] placeholder:font-normal placeholder:text-[#A1A1A1] rounded-md outline-none"
                                                type="text"
                                                placeholder="User Id"
                                                value={displayId} // Display the user-friendly ID here
                                                disabled={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1 w-full">
                                        <label className='text-[14px] text-[#344054] font-medium'>Mobile No.</label>
                                        <div className="w-full">
                                            <PhoneInput
                                                country={'in'}
                                                value={phone}
                                                onChange={(phone) => setPhone(phone)}
                                                inputProps={{
                                                    required: true,
                                                    autoFocus: true,
                                                    placeholder: "+91 00000-00000"
                                                }}
                                                containerClass="phone-input-container"
                                                inputClass="forminput"
                                                containerStyle={{
                                                    width: '100%'
                                                }}
                                                inputStyle={{
                                                    width: '100%',
                                                    height: '42px',
                                                    borderRadius: "4px",
                                                    border: "1px solid #D0D5DD",
                                                    boxShadow: "0px 1px 2px 0px #1018280D"
                                                }}
                                                onFocus={(e) => e.target.style.boxShadow = "0 0 0 2px #D6BBFB"}
                                                onBlur={(e) => e.target.style.boxShadow = "0px 1px 2px 0px rgba(16, 24, 40, 0.05)"}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1 w-full ">
                                        <label htmlFor="num-ratings" className="text-[#1D2939] text-sm font-medium">
                                            Role
                                        </label>
                                        <Popover placement="bottom" isOpen={roleDialogOpen} onOpenChange={(open) => setRoleDialogOpen(open)} >
                                            <PopoverTrigger>
                                                <button className="flex flex-row py-2 px-4 w-full gap-2 border border-solid border-[#D0D5DD] rounded-md transition duration-200 ease-in-out justify-between bg-[#fafafa]"
                                                    onClick={() => setRoleDialogOpen(false)}
                                                >
                                                    <span className="font-normal text-sm text-[#182230]">{selectedRole}</span>
                                                    <Image src="/icons/by-role-arrow-down.svg" width={20} height={20} alt="Select-role Button" />
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent className="p-0">
                                                <div className="w-[450px] bg-white border border-lightGrey rounded-md">
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
                            </div>
                        </ModalBody>
                        <ModalFooter className="border-t border-lightGrey">
                            <Button onClick={close} variant="light" className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md text-[#1D2939] font-semibold text-sm hover:bg-[#F2F4F7]">Discard</Button>
                            <Button
                                onClick={() => { handleSaveChanges(); }}
                                className={`py-[0.625rem] px-6 text-white shadow-inner-button  border border-white rounded-md font-semibold text-sm ${!isFormValid || loading ? 'bg-[#CDA0FC]' : ' hover:bg-[#6D0DCC] bg-[#9012FF]'}`}
                                disabled={!isFormValid || loading}
                            >
                                Save Changes
                            </Button>
                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal >
            {showCropper && uploadedImage && (
                <AdminImageCropper imageFile={uploadedImage} setShowCropper={setShowCropper} isOpen={showImageCropper} setIsOpen={setShowImageCropper} />
            )}
        </div>

    );
}

export default Editprofile;
