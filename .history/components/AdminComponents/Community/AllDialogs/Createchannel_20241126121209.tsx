"use client"
import { useState } from "react"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Checkbox } from "@nextui-org/react";
import UserRolesView from "@/components/AdminComponents/RoleMangement/UserRolesView";

// Define the props interface
interface CreateChannelProps {
    open: boolean; // Prop to control dialog visibility
    onClose: () => void; // Define onClose as a function
}

const membersData = [
    { name: "Jenny Wilson", username: "jenny#8547", role: "Admin" },
    { name: "John Doe", username: "john#1234", role: "Teacher" },
    { name: "Alice Brown", username: "alice#9876", role: "Editor" },
    { name: "Jenny Wilson", username: "jenny#8547", role: "Admin" },
    { name: "John Doe", username: "john#1234", role: "Teacher" },
    { name: "Alice Brown", username: "alice#9876", role: "Editor" },
];

function CreateChannel({ open, onClose }: CreateChannelProps) {
    // State to manage the current dialog stage
    const [currentDialog, setCurrentDialog] = useState<"create" | "addMembers">("create");

    // Channel name and description states
    const [channelName, setChannelName] = useState("");
    const [channelDescription, setChannelDescription] = useState("");
    const [selectedIcon, setSelectedIcon] = useState("/icons/idea-2.svg");

    // Members selection states
    const [members, setMembers] = useState(
        membersData.map((member) => ({ ...member, checked: false }))
    );
    const [selectAll, setSelectAll] = useState(false);

    // Handle closing the entire dialog process
    const handleDialogClose = () => {
        // Reset all states
        setCurrentDialog("create");
        setChannelName("");
        setChannelDescription("");
        setSelectedIcon("/icons/idea-2.svg");
        setMembers(membersData.map((member) => ({ ...member, checked: false })));
        setSelectAll(false);

        // Call the parent's onClose method
        onClose();
    };

    // Handle icon selection
    const handleIconSelect = (iconPath: string) => {
        setSelectedIcon(iconPath);
    };

    // Handle creating channel (moving to add members step)
    const handleCreateChannel = () => {
        if (channelName.trim() && channelDescription.trim()) {
            setCurrentDialog("addMembers");
        }
    };

    // Checkbox toggle handlers
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

    // Disable buttons based on conditions
    const isCreateButtonDisabled = !channelName.trim() || !channelDescription.trim();
    const isAddMembersButtonDisabled = !members.some(member => member.checked);

    return (
        <>
            {currentDialog === "create" && open && (
                <Dialog open={open} onClose={handleDialogClose} className="relative z-50">
                    <DialogBackdrop className="fixed inset-0 bg-black/30" />
                    <div className="fixed inset-0 flex items-center justify-center">
                        <DialogPanel className="bg-white rounded-2xl w-[568px] h-auto flex flex-col">
                            <div className='flex flex-col p-6 gap-6 border-solid border-[#EAECF0] border-b rounded-t-2xl'>
                                <div className='flex flex-row justify-between items-center'>
                                    <h1 className='text-[#1D2939] font-bold text-lg'>Create Channel</h1>
                                    <Image
                                        src="/icons/cancel.svg"
                                        alt="Cancel"
                                        width={20}
                                        height={20}
                                        onClick={handleDialogClose}
                                        className="cursor-pointer"
                                    />
                                </div>

                                {/* Channel Name Input */}
                                <div className="flex flex-col gap-1">
                                    <span className="font-semibold text-sm text-[#1D2939]">Channel name</span>
                                    <div className='flex px-2 items-center h-[40px] border border-solid border-[#D0D5DD] shadow-sm rounded-md'>
                                        <Popover placement="bottom">
                                            <PopoverTrigger>
                                                <button className="flex flex-row w-[44px] items-center rounded-md transition duration-200 ease-in-out justify-between">
                                                    <Image
                                                        src={selectedIcon}
                                                        width={24}
                                                        height={24}
                                                        alt="Selected Icon"
                                                    />
                                                    <Image
                                                        src="/icons/chevron-down.svg"
                                                        width={20}
                                                        height={20}
                                                        alt="Dropdown Arrow"
                                                    />
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent className="px-0 py-1 w-[56px] border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-md flex flex-col shadow-lg">
                                                {["/icons/idea-2.svg", "/icons/megaphone.svg", "/icons/read-2.svg"].map((icon) => (
                                                    <button
                                                        key={icon}
                                                        className="flex flex-row w-full p-1 hover:bg-[#F2F4F7] justify-center items-center focus:outline-none"
                                                        onClick={() => handleIconSelect(icon)}
                                                    >
                                                        <Image
                                                            src={icon}
                                                            width={24}
                                                            height={24}
                                                            alt={`${icon} Button`}
                                                        />
                                                    </button>
                                                ))}
                                            </PopoverContent>
                                        </Popover>
                                        <input
                                            className="font-normal text-[#667085] w-full text-sm placeholder:text-[#A1A1A1] rounded-md px-1 py-1 focus:outline-none focus:ring-0"
                                            placeholder="Channel name"
                                            type="text"
                                            value={channelName}
                                            onChange={(e) => setChannelName(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Channel Description Input */}
                                <div className="flex flex-col gap-1">
                                    <span className="font-semibold text-sm text-[#1D2939]">Channel description</span>
                                    <div className="flex px-2 items-center h-[40px] border border-[#D0D5DD] shadow-sm rounded-md">
                                        <input
                                            className="text-[#667085] w-full text-sm placeholder-[#A1A1A1] px-1 py-1 focus:outline-none border-none"
                                            placeholder="Channel description"
                                            value={channelDescription}
                                            onChange={(e) => {
                                                const inputText = e.target.value;
                                                if (inputText.length <= 100) {
                                                    setChannelDescription(inputText);
                                                }
                                            }}
                                        />
                                    </div>
                                    <span className="text-sm text-[#475467] self-end">{channelDescription.length}/100</span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-row justify-end mx-6 my-4 gap-4">
                                <button
                                    className="py-[0.625rem] px-6 border-2 border-solid border-[#EAECF0] font-semibold text-sm text-[#1D2939] rounded-md"
                                    onClick={handleDialogClose}
                                >
                                    Cancel
                                </button>
                                <button
                                    className={`py-[0.625rem] px-6 text-white text-sm shadow-inner-button font-semibold ${isCreateButtonDisabled ? "bg-[#CDA0FC] cursor-not-allowed" : "bg-[#9012FF] border border-solid border-[#9012FF]"} rounded-md`}
                                    onClick={handleCreateChannel}
                                    disabled={isCreateButtonDisabled}
                                >
                                    Create Channel
                                </button>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>
            )}

            {currentDialog === "addMembers" && open && (
                <Dialog open={open} onClose={handleDialogClose} className="relative z-50">
                    <DialogBackdrop className="fixed inset-0 bg-black/30" />
                    <div className="fixed inset-0 flex items-center justify-center">
                        <DialogPanel className="bg-white rounded-2xl w-[35.5rem] h-auto max-h-[80%] overflow-hidden">
                            <div className="flex flex-col relative">
                                <button className="absolute right-6 top-6" onClick={handleDialogClose}>
                                    <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                                </button>
                                <h3 className="mt-5 ml-6 mb-4 text-[#1D2939]">Add Members</h3>

                                {/* Search Input */}
                                <div className="flex flex-row mx-6 mb-4 px-[0.875rem] py-[0.625rem] gap-2 border border-lightGrey rounded-md">
                                    <Image src="/icons/search-lg.svg" alt="search" width={20} height={20} />
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        className="w-full outline-none text-sm text-[#182230] font-normal leading-6"
                                    />
                                </div>

                                {/* Members Table */}
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

                                {/* Action Buttons */}
                                <hr />
                                <div className="flex flex-row justify-end mx-6 my-4 gap-4">
                                    <button
                                        className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md"
                                        onClick={handleDialogClose}
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
                    )}
                </>

            )
            }
            export default createchannel;

