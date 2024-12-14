
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React, { useState } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { PopoverContent, PopoverTrigger, Popover } from "@nextui-org/popover";
import { db } from '@/firebase';
import { collection, getDocs, query, where, doc, getDoc, onSnapshot, deleteDoc, addDoc, setDoc } from 'firebase/firestore';
interface CreateChannelDialogueProps {
    open: boolean;
    onClose: () => void;
    internalChatId: string;
}
import { toast } from "react-toastify";



function CreateChannelDialogue({ open, onClose, internalChatId }: CreateChannelDialogueProps) {
    const [showCreateChannel, setShowCreateChannel] = useState(true);
    const [channelName, setChannelName] = useState("");
    const [channelEmoji, setChannelEmoji] = useState("");
    const [isEmojiPopupOpen, setIsEmojiPopupOpen] = useState(false);
    const handleCreateChannel = async () => {

        try {
            // Add new user data to Firestore
            const docRef = await addDoc(collection(db, `internalchat/${internalChatId}/channels`), {
                channelName,
                channelEmoji,
            });

            // Update the document with the generated adminId
            await setDoc(docRef, { channelId: docRef.id }, { merge: true });
            toast.success("Channel Added Successfully!");
            setChannelName('');
            setChannelEmoji('');
            onClose();

        } catch (error) {
            console.error("Error adding channel in Firestore:", error);
            toast.error("Failed to add Channel. Please try again.");
        }
    };

    const handleClose = () => {
        setShowCreateChannel(true);
        setChannelName("");
        setChannelEmoji("");
        onClose();
    };



    const isCreateButtonDisabled = channelName && channelEmoji;

    const handleEmojiClick = (emoji: EmojiClickData) => {
        // Set the state to the selected emoji, replacing any existing value
        setChannelEmoji(emoji.emoji);
        setIsEmojiPopupOpen(false);
    };
    return (
        <>
            {/* Create Channel Dialog */}
            <Dialog
                open={open && showCreateChannel}
                onClose={handleClose}
                className="relative z-50"
                aria-label="Create Channel Dialog"
            >
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 flex items-center justify-center">
                    <DialogPanel transition className="bg-white rounded-2xl w-[480px] h-auto">
                        <div className="flex flex-col gap-4 p-6">
                            <div className="flex flex-row  justify-between items-center">
                                <h3 className="font-bold text-[#1D2939]">Create Channel</h3>
                                <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                                    <button onClick={handleClose}>
                                        <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                                    </button>
                                </button>
                            </div>

                            <p className="text-sm font-normal text-[#1D2939]">Channel name</p>
                            <div className="flex flex-row w-full  gap-1 border border-lightGrey rounded-md">

                                <Popover className='mb-2' placement="top-end" isOpen={isEmojiPopupOpen} onOpenChange={(open) => setIsEmojiPopupOpen(open)} onClose={() => setIsEmojiPopupOpen(false)}>
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
                                        <EmojiPicker onEmojiClick={handleEmojiClick} />
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
                        <hr />
                        <div className="flex flex-row justify-end mx-6 my-4 gap-4">
                            <button
                                className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md font-medium hover:bg-[#F2F4F7]"
                                onClick={handleClose}
                            >
                                Cancel
                            </button>
                            <button
                                className={`py-[0.625rem] px-6 text-white font-medium shadow-inner-button rounded-md transition-all duration-200 bg-[#8501FF] border border-[#9012FF] hover:bg-[#7001CF]
                                        ${!isCreateButtonDisabled
                                        ? 'cursor-not-allowed opacity-35'
                                        : 'opacity-100'
                                    }`}
                                onClick={handleCreateChannel}
                                disabled={!isCreateButtonDisabled}
                            >
                                Create Channel
                            </button>
                        </div>

                    </DialogPanel>
                </div>
            </Dialog>

            {/* Add Members Dialog */}

        </>
    );
}

export default CreateChannelDialogue;