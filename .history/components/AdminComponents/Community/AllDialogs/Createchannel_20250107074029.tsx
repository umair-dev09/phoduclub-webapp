"use client"
import { useState } from "react"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Checkbox } from "@nextui-org/react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { db, auth } from '@/firebase'; // Adjust path if needed
import { toast, ToastContainer } from "react-toastify";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

// Define the props interface
interface createchannelProps {
    open: boolean;
    onClose: () => void;
    communityId: string;
    channelName: string;
    setChannelName: (channelName: string) => void;
    channelDescription: string;
    setChannelDescription: (channelDescription: string) => void;
    isEditing: boolean;
    channelId: string;
    headingId: string;
    channelEmoji: string;
    setChannelEmoji: (channelEmoji: string) => void;
    setChannelId: (channelId: string) => void;
    openAddMembers: () => void; // Define onClose as a function

}
const membersData = [
    { name: "Jenny Wilson", username: "jenny#8547", },
    { name: "John Doe", username: "john#1234", },
    { name: "Alice Brown", username: "alice#9876", },
    { name: "Jenny Wilson", username: "jenny#8547", },
    { name: "John Doe", username: "john#1234" },
    { name: "Alice Brown", username: "alice#9876" },
];
function CreateChannel({ open, onClose, channelName, headingId, openAddMembers, setChannelId, setChannelName, channelEmoji, setChannelEmoji, channelDescription, setChannelDescription, communityId, channelId, isEditing }: createchannelProps) {
    const [isEmojiPopupOpen, setIsEmojiPopupOpen] = useState(false);

    const isFormValid = channelName && channelDescription && channelEmoji;

    const handleInputChange = (e: any) => {
        const inputText = e.target.value;
        if (inputText.length <= 100) {
            setChannelDescription(inputText);

        }

    };
    // State to track the selected icon
    const [selectedIcon, setSelectedIcon] = useState("/icons/idea-2.svg");

    // Function to handle icon selection
    const handleIconSelect = (iconPath: React.SetStateAction<string>) => {
        setSelectedIcon(iconPath); // Update the selected icon state
    };
    const [open1, setOpen1] = useState(open); // Initiate with the prop 'open'
    const [open2, setOpen2] = useState(false);

    // Open second dialog and close the first
    const handleCreateChannel = async () => {
        try {
            if (isEditing) {
                await setDoc(doc(db, `communities/${communityId}/channelsHeading/${headingId}/channels`, channelId), {
                    channelName,
                    channelEmoji,
                    channelDescription,
                }, { merge: true });
                toast.success("Channel Updated Successfully!");
            }
            else {
                // Add new user data to Firestore
                const docRef = await addDoc(collection(db, `communities/${communityId}/channelsHeading/${headingId}/channels`), {
                    channelName,
                    channelEmoji,
                    channelDescription,
                    members: [{ id: auth.currentUser?.uid, isAdmin: true, }],
                });
                // Update the document with the generated adminId
                await setDoc(docRef, { channelId: docRef.id }, { merge: true });
                toast.success("Channel Created Successfully!");
                setChannelId(docRef.id);
            }
            setChannelName('');
            setChannelDescription('');
            setChannelEmoji('');
            onClose();
            openAddMembers();

        } catch (error) {
            console.error("Error adding channel in Firestore:", error);
            toast.error("Failed to create channel. Please try again.");
        }
    };

    // Close all dialogs
    const handleCloseAll = () => {
        setOpen1(false);
        setOpen2(false);
        onClose(); // Call parent onClose if needed
    };




    const [members, setMembers] = useState(
        membersData.map((member) => ({ ...member, checked: false }))
    );
    const [selectAll, setSelectAll] = useState(false);

    const handleHeaderCheckboxToggle = () => {
        const newCheckedState = !selectAll;
        setSelectAll(newCheckedState);
        setMembers(members.map((member) => ({ ...member, checked: newCheckedState })));
    };

    const handleRowCheckboxToggle = (index: number) => {
        const updatedMembers = [...members];
        updatedMembers[index].checked = !updatedMembers[index].checked;
        setMembers(updatedMembers);
        const allChecked = updatedMembers.every((member) => member.checked);
        setSelectAll(allChecked);
    };

    const handleEmojiClick = (emoji: EmojiClickData) => {
        // Set the state to the selected emoji, replacing any existing value
        setChannelEmoji(emoji.emoji);
        setIsEmojiPopupOpen(false);
    };

    const isAddMembersButtonDisabled = !members.some(member => member.checked);

    return (
        <div>
            {/* <Dialog open={open1} onClose={handleCloseAll} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 flex items-center justify-center">
                    <DialogPanel className="bg-white rounded-2xl w-[568px] h-auto flex flex-col ">
                        <div className=' flex flex-col p-6 gap-6 border-solid border-[#EAECF0] border-b rounded-t-2xl'>
                            <div className='flex flex-row justify-between items-center'>
                                <h1 className='text-[#1D2939] font-bold text-lg'>Create Channel</h1>
                                <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                                    <button><Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} onClick={handleCloseAll} /></button>
                                </button>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="font-semibold text-sm text-[#1D2939]">Channel name</span>
                                <div className="flex flex-row w-full gap-1 border border-gray-300  h-10 focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB] rounded-md">

                                    <Popover className='mb-2' placement="top-end" isOpen={isEmojiPopupOpen} onOpenChange={(open) => setIsEmojiPopupOpen(open)} >
                                        <PopoverTrigger>
                                            <button className="flex flex-row pr-[14px] pl-[10px] py-2 gap-1 items-center border-r border-lightGrey  transition-colors hover:bg-neutral-100 hover:rounded-[100px] focus:outline-none"
                                            >
                                                {channelEmoji === '' ? (
                                                    <Image className='w-[18px] h-[18px]' src='/icons/emojies.svg' alt='emojis icon' width={21} height={21} />
                                                ) : (
                                                    <p className="text-[17px]">{channelEmoji}</p>
                                                )}
                                                <Image
                                                    src='/icons/chevron-down-dark.svg'
                                                    alt="open"
                                                    height={20}
                                                    width={20}
                                                />
                                            </button>

                                        </PopoverTrigger>
                                        <PopoverContent className="p-0">
                                            <div>
                                                <EmojiPicker onEmojiClick={handleEmojiClick} />
                                            </div>
                                        </PopoverContent>
                                    </Popover>


                                    <input
                                        type="text"
                                        placeholder="Channel name"
                                        value={channelName}
                                        onChange={(e) => setChannelName(e.target.value)}
                                        className="w-full ml-2 mr-3 my-2 outline-none text-sm text-[#182230] font-normal leading-6"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="font-semibold text-sm text-[#1D2939]">Channel description</span>
                                <div className="flex px-2 items-center h-[40px] border border-gray-300   focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB] shadow-sm rounded-md">

                                    <input
                                        className="text-[#667085] w-full text-sm placeholder-[#A1A1A1] px-1 py-1 focus:outline-none border-none"
                                        placeholder="Channel description"
                                        value={channelDescription}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <span className="text-sm text-[#475467] self-end">{channelDescription.length}/100</span>
                            </div>


                        </div>
                        <div className="flex flex-row justify-end mx-6 my-4 gap-4">
                            <button className="py-[0.625rem] px-6 border-2  border-solid border-[#EAECF0] font-semibold text-sm text-[#1D2939] rounded-md hover:bg-[#F2F4F7]" onClick={handleCloseAll} >Cancel</button>
                            <button className={`py-[0.625rem] px-6 text-white text-sm shadow-inner-button font-semibold border border-solid  border-white ${!isFormValid ? "bg-[#CDA0FC] cursor-not-allowed" : "bg-[#9012FF]"} rounded-md`} onClick={handleCreateChannel}>Create Channel</button>
                        </div>
                    </DialogPanel>
                </div >
            </Dialog > */}
            <Modal isOpen={open1} onOpenChange={(isOpen) => !isOpen && handleCloseAll()} hideCloseButton
            >

                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-row justify-between items-center gap-1">
                            <h1 className='text-[#1D2939] font-bold text-lg'>Create Channel</h1>
                            <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                                <button><Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} onClick={handleCloseAll} /></button>
                            </button>
                        </ModalHeader>
                        <ModalBody>
                            <div className="flex flex-col gap-1">
                                <span className="font-semibold text-sm text-[#1D2939]">Channel name</span>
                                <div className="flex flex-row w-full gap-1 border border-gray-300  h-10 focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB] rounded-md">

                                    <Popover className='mb-2' placement="top-end" isOpen={isEmojiPopupOpen} onOpenChange={(open) => setIsEmojiPopupOpen(open)} >
                                        <PopoverTrigger>
                                            <button className="flex flex-row pr-[14px] pl-[10px] py-2 gap-1 items-center border-r border-lightGrey  transition-colors hover:bg-neutral-100 hover:rounded-[100px] focus:outline-none"
                                            >
                                                {channelEmoji === '' ? (
                                                    <Image className='w-[18px] h-[18px]' src='/icons/emojies.svg' alt='emojis icon' width={21} height={21} />
                                                ) : (
                                                    <p className="text-[17px]">{channelEmoji}</p>
                                                )}
                                                <Image
                                                    src='/icons/chevron-down-dark.svg'
                                                    alt="open"
                                                    height={20}
                                                    width={20}
                                                />
                                            </button>

                                        </PopoverTrigger>
                                        <PopoverContent className="p-0">
                                            <div>
                                                <EmojiPicker onEmojiClick={handleEmojiClick} />
                                            </div>
                                        </PopoverContent>
                                    </Popover>


                                    <input
                                        type="text"
                                        placeholder="Channel name"
                                        value={channelName}
                                        onChange={(e) => setChannelName(e.target.value)}
                                        className="w-full ml-2 mr-3 my-2 outline-none text-sm text-[#182230] font-normal leading-6"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="font-semibold text-sm text-[#1D2939]">Channel description</span>
                                <div className="flex px-2 items-center h-[40px] border border-gray-300   focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB] shadow-sm rounded-md">

                                    <input
                                        className="text-[#667085] w-full text-sm placeholder-[#A1A1A1] px-1 py-1 focus:outline-none border-none"
                                        placeholder="Channel description"
                                        value={channelDescription}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <span className="text-sm text-[#475467] self-end">{channelDescription.length}/100</span>
                            </div>

                        </ModalBody>
                        <ModalFooter className="border-t border-lightGrey">
                            <Button variant="light" className="py-[0.625rem] px-6 border-2  border-solid border-[#EAECF0] font-semibold text-sm text-[#1D2939] rounded-md hover:bg-[#F2F4F7]" onClick={handleCloseAll} >Cancel</Button>
                            <Button className={`py-[0.625rem] px-6 text-white text-sm shadow-inner-button font-semibold border border-solid  border-white ${!isFormValid ? "bg-[#CDA0FC] cursor-not-allowed" : "bg-[#9012FF]"} rounded-md`} onClick={handleCreateChannel}>Create Channel</Button>
                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal >

        </div>
    )
}
export default CreateChannel;

