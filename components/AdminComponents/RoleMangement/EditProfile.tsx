"use client";
import { useState, useEffect } from "react";
import React from 'react';
import Image from "next/image";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { doc, getDoc, onSnapshot,setDoc } from "firebase/firestore"; // Firestore imports
import { db } from "@/firebase"; // Update this path according to your firebase configuration
import LoadingData from "@/components/Loading";
import AdminImageCropper from "./AdminImagecropper";
import { toast } from "react-toastify";

type EditProfileProps = {
    open: boolean;
    close: () => void;
    adminId: string | null;
}

interface UserData {
    name: string;
    userId: string;
    profilePic: string;
    phone: string;
    role: string;
}

function Editprofile({ open, close, adminId }: EditProfileProps) {
    const [phone, setPhone] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [userId, setUserId] = useState('');
    const [selectedRole, setSelectedRole] = useState('');
    const [roleDialogOpen, setRoleDialogOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showCropper, setShowCropper] = useState(false);
    const [showImageCropper, setShowImageCropper] = useState(false);
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);

    const isFormValid = firstName && lastName && userId && phone && selectedRole;


    // Function to handle role selection
    const handleRoleSelect = (role: string) => {
        setSelectedRole(role);
    };

    // Fetch admin data from Firestore when adminId changes
    useEffect(() => {
        if (adminId) {
            // Real-time listener for admin data
            const docRef = doc(db, "admin", adminId);
            const unsubscribe = onSnapshot(docRef, (docSnap) => {
                if (docSnap.exists()) {
                    const data = docSnap.data() as UserData;

                    // Split full name into first and last names
                    const [first, ...last] = (data.name || '').split(' ');
                    setFirstName(first || '');
                    setLastName(last.join(' ') || '');
                    setUserId(data.userId || '');
                    setProfilePic(data.profilePic || '');
                    setPhone(data.phone || '');
                    setSelectedRole(data.role || '');
                    setLoading(false);
                } else {
                    console.log("No such document!");
                    setLoading(false);
                }
            });

            // Cleanup listener on unmount
            return () => unsubscribe();
        }
    }, [adminId]);
    
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
        //   close();
        }
      };

      const handleSaveChanges = async () => {
        if (!isFormValid || loading) return; // Prevent submission if fields are empty or loading
    
        setLoading(true); // Start loading
        const fullName = `${firstName} ${lastName}`;
        try {          
                // Update existing user data in Firestore using adminId
                await setDoc(doc(db, "admin", adminId || ''), {
                    name: fullName,
                    phone,
                    role: selectedRole,
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

   if(loading){
    <LoadingData/>
   }

    return (
        <div>
        <Dialog open={open} onClose={close} className="relative z-50" >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex items-center justify-center">
            <DialogPanel className="bg-white rounded-2xl w-[500px] h-auto px-6">
                <div className="flex flex-col relative gap-6">
                    <div className="flex flex-row justify-between mt-4">
                        <h3 className=" text-lg font-bold text-[#1D2939]">Edit Info</h3>
                        <button onClick={close}>
                            <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                        </button>


                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <Image className="rounded-full"
                            src={profilePic ||"/defaultAdminDP.jpg"}
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
                            <div className="flex flex-row py-2 px-4 w-full gap-2 border border-solid border-[#D0D5DD] rounded-md transition duration-200 ease-in-out ">
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
                            <div className="flex flex-row py-2 px-4 w-full gap-2 border border-solid border-[#D0D5DD] rounded-md transition duration-200 ease-in-out ">
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
                        <div className="flex flex-row  w-full gap-2 border border-solid border-[#D0D5DD] rounded-md transition duration-200 ease-in-out ">
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
                                                onClick={() => {handleRoleSelect(role); setRoleDialogOpen(false); }}
                                                className="flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#F2F4F7]"
                                            >
                                                <span className="text-sm text-[#0C111D] font-normal">{role}</span>
                                            </button>
                                        ))}
                                    </div>
                                </PopoverContent>
                            </Popover>
                    </div>

                    <div className="flex flex-row justify-end  mt-2 mb-3 items-center gap-4 border-t border-solid border-[#EAECF0] pt-4 ">
                        <button onClick={close} className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md text-[#1D2939] font-semibold text-sm">Discard</button>
                        <button
                            onClick={() =>{handleSaveChanges();}}
                            className={`py-[0.625rem] px-6 text-white shadow-inner-button  border border-white rounded-md font-semibold text-sm ${!isFormValid || loading? 'bg-[#CDA0FC]': 'bg-[#9012FF]'}`}
                            disabled={!isFormValid || loading}
                            >
                            Save Changes
                        </button>
                    </div>
                </div>
            </DialogPanel>
        </div>
    </Dialog>
    {showCropper && uploadedImage && (
        <AdminImageCropper imageFile={uploadedImage} setShowCropper={setShowCropper} isOpen={showImageCropper} setIsOpen={setShowImageCropper} />
      )}
    </div>
      
    );
}

export default Editprofile;
