import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React, { useState } from "react";
import AddMembersDialogue from "./AddMembersDialogue";

interface CreateChannelDialogueProps {
    open: boolean;
    onClose: () => void;
}

function CreateChannelDialogue({ open, onClose }: CreateChannelDialogueProps) {
    const [showAddMembers, setShowAddMembers] = useState(false);
    const [channelName, setChannelName] = useState("");

    const handleCreateChannel = () => {
        // You can add validation here if needed
        setShowAddMembers(true);
        onClose(); // Close the create channel dialogue
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                className="relative z-50"
                aria-label="Create Channel Dialog"
            >
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 flex items-center justify-center">
                    <DialogPanel transition className="bg-white rounded-2xl w-[480px] h-auto">
                        <div className="flex flex-col relative">
                            <button className="absolute right-6 top-6" onClick={onClose}>
                                <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                            </button>
                            <div className="mx-6">
                                <h3 className="mt-6 font-bold text-[#1D2939]">Create Channel</h3>
                                <p className="text-sm font-normal mt-6 mb-2">Channel name</p>
                                <div className="flex flex-row w-full mb-6 gap-1 border border-lightGrey rounded-md">
                                    <div className="flex flex-row pr-2 pl-3 py-2 gap-2 border-r border-lightGrey">
                                        <p>🎧</p>
                                        <Image
                                            src='/icons/chevron-down-dark.svg'
                                            alt="open"
                                            height={20}
                                            width={20}
                                        />
                                    </div>
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
                                    className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md"
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#8501FF] border border-[#9012FF] rounded-md"
                                    onClick={handleCreateChannel}
                                >
                                    Create Channel
                                </button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

            {/* Add Members Dialog */}
            {showAddMembers && (
                <AddMembersDialogue
                    open={open}
                    onClose={() => setShowAddMembers(false)}
                />
            )}
        </>
    );
}

export default CreateChannelDialogue;