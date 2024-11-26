
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React, { useState } from "react";
import { Checkbox } from "@nextui-org/react";
import UserRolesView from "@/components/AdminComponents/RoleMangement/UserRolesView";

interface CreateChannelDialogueProps {
    open: boolean;
    onClose: () => void;
}

const membersData = [
    { name: "Jenny Wilson", username: "jenny#8547", role: "Admin" },
    { name: "John Doe", username: "john#1234", role: "Teacher" },
    { name: "Alice Brown", username: "alice#9876", role: "Editor" },
    { name: "Jenny Wilson", username: "jenny#8547", role: "Admin" },
    { name: "John Doe", username: "john#1234", role: "Teacher" },
    { name: "Alice Brown", username: "alice#9876", role: "Editor" },
];

function CreateChannelDialogue({ open, onClose }: CreateChannelDialogueProps) {
    const [showCreateChannel, setShowCreateChannel] = useState(true);
    const [showAddMembers, setShowAddMembers] = useState(false);
    const [channelName, setChannelName] = useState("");

    const handleCreateChannel = () => {
        if (channelName.trim()) {
            setShowCreateChannel(false);
            setShowAddMembers(true);
        }
    };

    const handleClose = () => {
        setShowCreateChannel(true);
        setShowAddMembers(false);
        setChannelName("");  // Reset channel name on close
        onClose();
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

    const isCreateButtonDisabled = !channelName.trim();
    const isAddMembersButtonDisabled = !members.some(member => member.checked);

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
                        <div className="flex flex-col relative">
                            <button className="absolute right-6 top-6" onClick={handleClose}>
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
                                    onClick={handleClose}
                                >
                                    Cancel
                                </button>
                                <button
                                    className={`py-[0.625rem] px-6 text-white shadow-inner-button rounded-md transition-all duration-200 bg-[#8501FF] border border-[#9012FF] hover:bg-[#7001CF]
                                        ${isCreateButtonDisabled
                                            ? 'cursor-not-allowed opacity-35'
                                            : 'opacity-100'
                                        }`}
                                    onClick={handleCreateChannel}
                                    disabled={isCreateButtonDisabled}
                                >
                                    Create Channel
                                </button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

            {/* Add Members Dialog */}
            <Dialog
                open={open && showAddMembers}
                onClose={handleClose}
                className="relative z-50"
                aria-label="Add Members Dialog"
            >
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 flex items-center justify-center">
                    <DialogPanel
                        transition
                        className="bg-white rounded-2xl w-[35.5rem] h-auto max-h-[80%] overflow-hidden"
                    >
                        <div className="flex flex-col relative">
                            <button className="absolute right-6 top-6" onClick={handleClose}>
                                <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                            </button>
                            <h3 className="mt-5 ml-6 mb-4 text-[#1D2939]">Add Members</h3>
                            <div className="flex flex-row mx-6 mb-4 px-[0.875rem] py-[0.625rem] gap-2 border border-lightGrey rounded-md">
                                <Image src="/icons/search-lg.svg" alt="search" width={20} height={20} />
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="w-full outline-none text-sm text-[#182230] font-normal leading-6"
                                />
                            </div>
                            <div className="mx-6 mb-6 border border-[#EAECF0] rounded-xl overflow-hidden">
                                <div className="max-h-[300px] overflow-y-auto">
                                    <table className="w-full">
                                        <thead className="sticky top-0 z-10 bg-white shadow-sm">
                                            <tr>
                                                <td className="w-[10%] pl-8 pb-1">
                                                    <Checkbox
                                                        size="sm"
                                                        color="primary"
                                                        isSelected={selectAll}
                                                        onChange={handleHeaderCheckboxToggle}
                                                    />
                                                </td>
                                                <td className="w-[50%] pl-2 py-3">
                                                    <p className="text-sm text-[#667085] font-medium leading-6">
                                                        Name
                                                    </p>
                                                </td>
                                                <td className="w-[40%]"></td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {members.map((member, index) => (
                                                <tr
                                                    key={index}
                                                    className="border-t border-lightGrey"
                                                >
                                                    <td className="pl-8 pb-1">
                                                        <Checkbox
                                                            size="sm"
                                                            color="primary"
                                                            isSelected={member.checked}
                                                            onChange={() => handleRowCheckboxToggle(index)}
                                                        />
                                                    </td>
                                                    <td className="pl-2 py-3">
                                                        <div className="flex flex-row gap-2 items-center">
                                                            <div className="relative">
                                                                <Image
                                                                    src="/images/DP_Lion.svg"
                                                                    alt="DP"
                                                                    width={40}
                                                                    height={40}
                                                                />
                                                                <Image
                                                                    className="absolute right-0 bottom-0"
                                                                    src="/icons/winnerBatch.svg"
                                                                    alt="Batch"
                                                                    width={18}
                                                                    height={18}
                                                                />
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="text-sm font-semibold whitespace-nowrap">
                                                                    {member.name}
                                                                </span>
                                                                <span className="text-[13px] text-[#667085]">
                                                                    {member.username}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-3">
                                                        <UserRolesView role={member.role} />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <hr />
                            <div className="flex flex-row justify-end mx-6 my-4 gap-4">
                                <button
                                    className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md"
                                    onClick={handleClose}
                                >
                                    Cancel
                                </button>
                                <button
                                    className={`py-[0.625rem] px-6 text-white shadow-inner-button rounded-md transition-all duration-200 bg-[#8501FF] border border-[#9012FF] hover:bg-[#7001CF]
                                        ${isAddMembersButtonDisabled
                                            ? 'cursor-not-allowed opacity-35'
                                            : 'opacity-100'
                                        }`}
                                    disabled={isAddMembersButtonDisabled}
                                >
                                    Add Members
                                </button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
}

export default CreateChannelDialogue;