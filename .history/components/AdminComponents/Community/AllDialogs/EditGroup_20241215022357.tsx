"use client"
import { useState } from "react"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React from "react";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage, db, auth } from '@/firebase'; // Adjust path if needed
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { collection, doc, updateDoc, setDoc } from 'firebase/firestore';

// Define the props interface
interface creategroupProps {
    open: boolean; // Prop to control dialog visibility
    onClose: () => void; // Define onClose as a function
    onClose1: () => void; // Define onClose as a function
    communityId: string;
    communityName: string;
    setCommunityName: (communityName: string) => void;
    communityDescription: string;
    setCommunityDescription: (communityDescription: string) => void;
    communityImg: string;
    setCommunityImage: (communityImage: string) => void;

}
function EditGroup({ open, onClose, communityName, communityId, communityDescription, communityImg, onClose1, setCommunityName, setCommunityDescription, setCommunityImage }: creategroupProps) {

    const isFormValid = communityName && communityDescription && communityImg;

    const handleInputChange = (e: any) => {
        const inputText = e.target.value;
        if (inputText.length <= 100) {
            setCommunityDescription(inputText);

        }

    };

    const handleCreateGroup = async () => {

        try {
            // Add new user data to Firestore
            await setDoc(doc(db, `communities`, communityId), {
                communityName,
                communityImg,
                communityDescription,
            }, { merge: true });
            toast.success("Group Updated Successfully!");
            onClose();
            onClose1();
        } catch (error) {
            console.error("Error adding channel in Firestore:", error);
            toast.error("Failed to edit group. Please try again.");
        }
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
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
                                setCommunityImage(downloadURL);
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
                <DialogPanel className="bg-white rounded-2xl w-[568px] h-auto flex flex-col ">
                    <div className=' flex flex-col p-6 gap-6 border-solid border-[#EAECF0] border-b rounded-t-2xl'>
                        <div className='flex flex-row justify-between items-center'>
                            <h1 className='text-[#1D2939] font-bold text-lg'>Edit Group</h1>
                            <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                                <button><Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} onClick={onClose} /></button>
                            </button>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Image className=" w-[120px] h-[120px] rounded-full object-cover"
                                src={communityImg || "/icons/upload-icon.svg"}
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
                            <div className='flex px-2 items-center h-[40px] bborder border-gray-300   focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB] shadow-sm rounded-md'>
                                <input
                                    className="font-normal text-[#667085] w-full text-sm placeholder:text-[#A1A1A1] rounded-md px-1 py-1 focus:outline-none focus:ring-0 "
                                    placeholder="Group name"
                                    type="text"
                                    value={communityName}
                                    onChange={(e) => setCommunityName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="font-semibold text-sm text-[#1D2939]">Group description</span>
                            <div className="flex px-2 items-center h-[40px] border border-gray-300  focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB] shadow-sm rounded-md">

                                <input
                                    className="text-[#667085] w-full text-sm placeholder-[#A1A1A1] px-1 py-1 focus:outline-none border-none"
                                    placeholder="Group description"
                                    value={communityDescription}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <span className="text-sm text-[#475467] self-end">{communityDescription.length}/100</span>
                        </div>


                    </div>
                    <div className="flex flex-row justify-end mx-6 my-4 gap-4">
                        <button className="py-[0.625rem] px-6 border-2  border-solid border-[#EAECF0] font-semibold text-sm text-[#1D2939] rounded-md hover:bg-[#F2F4F7]" onClick={onClose} >Cancel</button>
                        <button className={`py-[0.625rem] px-6 text-white text-sm shadow-inner-button font-semibold ${!isFormValid ? "bg-[#CDA0FC] cursor-not-allowed" : "bg-[#9012FF]  border border-solid  border-[#9012FF]"} rounded-md`} onClick={handleCreateGroup}>Save Changes</button>
                    </div>
                </DialogPanel>
            </div >
        </Dialog >
    )
}
export default EditGroup;

