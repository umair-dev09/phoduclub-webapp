"use client"
import { useState } from "react"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React from "react";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage, db, auth } from '@/firebase'; // Adjust path if needed
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { collection, addDoc, updateDoc, setDoc } from 'firebase/firestore';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
// Define the props interface
interface creategroupProps {
    open: boolean; // Prop to control dialog visibility
    onClose: () => void; // Define onClose as a function
    openAddMembers: () => void; // Define onClose as a function
    setCommunityId: (communityId: string) => void;

}
function CreateGroup({ open, onClose, openAddMembers, setCommunityId }: creategroupProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const isFormValid = name && description && imageUrl;

    const handleInputChange = (e: any) => {
        const inputText = e.target.value;
        if (inputText.length <= 100) {
            setDescription(inputText);

        }

    };

    const handleCreateGroup = async () => {

        try {
            // Add new user data to Firestore
            const docRef = await addDoc(collection(db, `communities`), {
                communityName: name,
                communityImg: imageUrl,
                communityDescription: description,
                members: [{ id: auth.currentUser?.uid, isAdmin: true, }],
            });

            // Update the document with the generated adminId
            await setDoc(docRef, { communityId: docRef.id }, { merge: true });
            setCommunityId(docRef.id);
            toast.success("Group Created Successfully!");
            setName('');
            setImageUrl('');
            setDescription('');
            onClose();
            openAddMembers();
        } catch (error) {
            console.error("Error adding channel in Firestore:", error);
            toast.error("Failed to create Group. Please try again.");
        }
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(file);
            toast.promise(
                new Promise(async (resolve, reject) => {
                    try {
                        const storageRef = ref(storage, `CommunityIcons/${file.name}`);
                        const uploadTask = uploadBytesResumable(storageRef, file);

                        // Monitor upload progress and completion
                        uploadTask.on(
                            'state_changed',
                            (snapshot) => {
                                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                console.log(`Upload is ${progress}% done`);
                            },
                            (error) => {
                                console.error("Upload failed:", error);
                            },
                            async () => {
                                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                                setImageUrl(downloadURL);
                                resolve("Image Updated!");
                            }
                        );
                    } catch (error) {
                        reject("Failed to Update Image!")
                        // Handle errors in both image upload and Firestore update
                        // toast.error("Failed to upload image or update profile.");
                        console.error("Error:", error);
                    }

                }),
                {
                    pending: 'Uploading Group Image...',
                    success: 'Image Uploaded.',
                    error: 'Failed to Upload Image.',
                }
            );
        }
    };

    return (
        <Dialog open={open} onClose={onClose} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/30" />
            <div className="fixed inset-0 flex items-center justify-center">
                <DialogPanel className="bg-white rounded-2xl w-[568px] h-auto flex flex-col max-h-[92%] overflow-y-auto">
                    <div className=' flex flex-col p-6 gap-6 border-solid border-[#EAECF0] border-b rounded-t-2xl'>
                        <div className='flex flex-row justify-between items-center'>
                            <h1 className='text-[#1D2939] font-bold text-lg'>Create Group</h1>
                            <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                                <button><Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} onClick={onClose} /></button>
                            </button>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Image className=" w-[120px] h-[120px] rounded-full object-cover"
                                src={imageUrl || "/icons/upload-icon.svg"}
                                width={120}
                                height={120}
                                quality={100}
                                alt="upload-image" />

                            <label className="border-2 border-solid border-[#EAECF0] gap-2 flex flex-row justify-center items-center w-[111px] h-[36px] rounded-md hover:bg-[#EAECF0] text-sm text-[#1D2939] font-semibold cursor-pointer">
                                <Image
                                    src="/icons/edit-02.svg"
                                    width={18}
                                    height={18}
                                    alt="edit-icon" />
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
                        <div className="flex flex-col gap-1">
                            <span className="font-semibold text-sm text-[#1D2939]">Group name</span>
                            <div className='flex px-2 items-center h-[40px] border border-gray-300   focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB] shadow-sm rounded-md'>
                                <input
                                    className="font-normal text-[#667085] w-full text-sm placeholder:text-[#A1A1A1] rounded-md px-1 py-1 focus:outline-none focus:ring-0 "
                                    placeholder="Group name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="font-semibold text-sm text-[#1D2939]">Group description</span>
                            <div className="flex px-2 items-center h-[40px] border border-gray-300   focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB] shadow-sm rounded-md">

                                <input
                                    className="text-[#667085] w-full text-sm placeholder-[#A1A1A1] px-1 py-1 focus:outline-none border-none"
                                    placeholder="Group description"
                                    value={description}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <span className="text-sm text-[#475467] self-end">{description.length}/100</span>
                        </div>


                    </div>
                    <div className="flex flex-row justify-end mx-6 my-4 gap-4">
                        <button className="py-[0.625rem] px-6 border-2  border-solid border-[#EAECF0] font-semibold text-sm text-[#1D2939] rounded-md hover:bg-[#F2F4F7]" onClick={onClose} >Cancel</button>
                        <button className={`py-[0.625rem] px-6 text-white text-sm shadow-inner-button font-semibold ${!isFormValid ? "bg-[#CDA0FC] cursor-not-allowed" : "bg-[#9012FF]  border border-solid  border-[#9012FF]"} rounded-md`} onClick={handleCreateGroup}>Create Group</button>
                    </div>
                </DialogPanel>
            </div >
        </Dialog >
    )
}
export default CreateGroup;

<Modal isOpen={open} onOpenChange={(isOpen) => !isOpen && onClose()} hideCloseButton >

    <ModalContent>
        <>
            <ModalHeader className="flex flex-row justify-between items-center gap-1">
                <h1 className='text-[#1D2939] font-bold text-lg'>Create Group</h1>
                <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                    <button><Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} onClick={onClose} /></button>
                </button>
            </ModalHeader>
            <ModalBody>
                <div className="px-6">
                    <div className="flex flex-col gap-2 items-center">
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
                                value={userId}
                                disabled={true}
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
                                    borderRadius: "4px",
                                    border: "1px solid #D0D5DD",
                                    boxShadow: "0px 1px 2px 0px #1018280D ",

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