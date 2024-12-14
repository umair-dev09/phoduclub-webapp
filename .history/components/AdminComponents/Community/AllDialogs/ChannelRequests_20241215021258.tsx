import React, { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import { Checkbox } from "@nextui-org/react";

// Type Definitions
interface Member {
    name: string;
    username: string;
    date: string;
    checked: boolean;
}

interface ChannelRequestsProps {
    open: boolean;
    onClose: () => void;
}

interface SelectionBarProps {
    members: Member[];
    setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
    setSelectAll: React.Dispatch<React.SetStateAction<boolean>>;
    onClose: () => void;
}

// SelectionBar Component
const SelectionBar: React.FC<SelectionBarProps> = ({
    members,
    setMembers,
    setSelectAll,
    onClose
}) => {
    const selectedMembers = members.filter(member => member.checked);

    const handleSelectAll = (selectAll: boolean) => {
        setMembers(members.map(member => ({ ...member, checked: selectAll })));
        setSelectAll(selectAll);
    };

    const handleDecline = () => {
        const updatedMembers = members.map(member =>
            member.checked ? { ...member, checked: false } : member
        );
        setMembers(updatedMembers);
        setSelectAll(false);
        onClose();
    };

    const handleAccept = () => {
        const updatedMembers = members.map(member =>
            member.checked ? { ...member, checked: false } : member
        );
        setMembers(updatedMembers);
        setSelectAll(false);
        onClose();
    };

    if (selectedMembers.length === 0) return null;

    return (
        <div className="flex justify-center absolute w-full bottom-8 right-0">
            <div className="z-auto flex flex-row items-center p-4 gap-4 bg-white border border-[#D0D5DD] rounded-xl shadow-[4px_8px_13px_0_rgba(0,0,0,0.05), 4px_4px_12px_0_rgba(0,0,0,0.05), 4px_8px_14px_0_rgba(0,0,0,0.04)]">
                <p className="text-balance text-[#1D2939] font-semibold">
                    {selectedMembers.length} Selected
                </p>
                <div className="flex flex-row gap-2">
                    <button
                        onClick={() => handleSelectAll(true)}
                        className="px-4 py-[0.625rem] text-sm text-[#1D2939] font-medium border border-lightGrey rounded-md"
                    >
                        Select all
                    </button>
                    <button
                        onClick={() => handleSelectAll(false)}
                        className="px-4 py-[0.625rem] text-sm text-[#1D2939] font-medium border border-lightGrey rounded-md"
                    >
                        Unselect all
                    </button>
                </div>
                <div className="w-0 h-9 border-[0.5px] border-lightGrey rounded-full"></div>
                <button
                    onClick={handleDecline}
                    className="flex flex-row px-4 py-[0.625rem] gap-2 border border-r-lightGrey rounded-md"
                >
                    <Image src='/icons/multiplication-sign.svg' alt="deny" width={18} height={18} />
                    <p className="text-sm text-[#1D2939] font-medium leading-[18px]">Decline</p>
                </button>
                <button
                    onClick={handleAccept}
                    className="flex flex-row px-4 py-[0.625rem] gap-2 border border-r-lightGrey rounded-md"
                >
                    <Image src='/icons/tick-green-02.svg' alt="Accept" width={18} height={18} />
                    <p className="text-sm text-[#1D2939] font-medium leading-[18px]">Accept</p>
                </button>
            </div>
        </div>
    );
};

// GroupInfo Component
const ChannelRequests: React.FC<ChannelRequestsProps> = ({ open, onClose }) => {
    // Initial members data
    const initialMembersData: Member[] = [
        { name: "Jenny Wilson", username: "jenny#8547", date: "Jan 6, 2024", checked: false },
        { name: "John Doe", username: "john#1234", date: "Jan 6, 2024", checked: false },
        { name: "Alice Brown", username: "alice#9876", date: "Jan 6, 2024", checked: false },
        { name: "Jenny Wilson", username: "jenny#8547", date: "Jan 6, 2024", checked: false },
        { name: "John Doe", username: "john#1234", date: "Jan 6, 2024", checked: false },
        { name: "Alice Brown", username: "alice#9876", date: "Jan 6, 2024", checked: false },
        { name: "Jenny Wilson", username: "jenny#8547", date: "Jan 6, 2024", checked: false },
        { name: "John Doe", username: "john#1234", date: "Jan 6, 2024", checked: false },
        { name: "Alice Brown", username: "alice#9876", date: "Jan 6, 2024", checked: false },
        { name: "Jenny Wilson", username: "jenny#8547", date: "Jan 6, 2024", checked: false },
        { name: "John Doe", username: "john#1234", date: "Jan 6, 2024", checked: false },
        { name: "Alice Brown", username: "alice#9876", date: "Jan 6, 2024", checked: false },
        { name: "Jenny Wilson", username: "jenny#8547", date: "Jan 6, 2024", checked: false },
        { name: "John Doe", username: "john#1234", date: "Jan 6, 2024", checked: false },
        { name: "Alice Brown", username: "alice#9876", date: "Jan 6, 2024", checked: false },
        { name: "Jenny Wilson", username: "jenny#8547", date: "Jan 6, 2024", checked: false },
        { name: "John Doe", username: "john#1234", date: "Jan 6, 2024", checked: false },
        { name: "Alice Brown", username: "alice#9876", date: "Jan 6, 2024", checked: false },
        { name: "Jenny Wilson", username: "jenny#8547", date: "Jan 6, 2024", checked: false },
        { name: "John Doe", username: "john#1234", date: "Jan 6, 2024", checked: false },
        { name: "Alice Brown", username: "alice#9876", date: "Jan 6, 2024", checked: false },
        { name: "Jenny Wilson", username: "jenny#8547", date: "Jan 6, 2024", checked: false },
        { name: "John Doe", username: "john#1234", date: "Jan 6, 2024", checked: false },
        { name: "Alice Brown", username: "alice#9876", date: "Jan 6, 2024", checked: false },
    ];

    const [members, setMembers] = useState<Member[]>(initialMembersData);
    const [selectAll, setSelectAll] = useState(false);

    const handleHeaderCheckboxToggle = () => {
        const newCheckedState = !selectAll;
        setSelectAll(newCheckedState);
        setMembers(members.map(member => ({ ...member, checked: newCheckedState })));
    };

    const handleRowCheckboxToggle = (index: number) => {
        const updatedMembers = [...members];
        updatedMembers[index].checked = !updatedMembers[index].checked;
        setMembers(updatedMembers);

        // Check if all members are checked
        const allChecked = updatedMembers.every(member => member.checked);
        setSelectAll(allChecked);
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 flex items-center justify-center">
                    <DialogPanel
                        transition
                    >
                        <div className="flex flex-col  bg-white rounded-2xl w-[38.375rem] h-auto overflow-hidden" >
                            <div className="flex flex-row justify-between items-center">
                                <h3 className="mt-5 ml-6 mb-4 text-[#1D2939]">Add Members</h3>
                                <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                                    <button onClick={onClose}>
                                        <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                                    </button>
                                </button>
                            </div>


                            <div className="mx-6 mb-6 border border-[#EAECF0] rounded-xl overflow-hidden">
                                <div className="max-h-[30rem] overflow-y-auto">
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
                                                <td className="w-[40%] pl-2 py-3">
                                                    <p className="text-sm text-[#667085] font-medium leading-6">
                                                        Name
                                                    </p>
                                                </td>
                                                <td className="w-[30%] text-center py-3">
                                                    <div className="flex flex-row items-center justify-center gap-1 text-sm text-[#667085] font-medium leading-6">
                                                        Request Sent
                                                        <Image src='/icons/unfold-more-round.svg' alt="more" width={16} height={16} />
                                                    </div>
                                                </td>
                                                <td className="w-[20%] py-3">
                                                    <p className="text-sm text-[#667085] font-medium leading-6">
                                                        Action
                                                    </p>
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {members.map((member, index) => (
                                                <tr
                                                    key={`${member.username}-${index}`}
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
                                                    <td className="text-center py-3">
                                                        <p className="text-sm text-[#1D2939] font-normal leading-6">
                                                            {member.date}
                                                        </p>
                                                    </td>
                                                    <td>
                                                        <div className="flex flex-row gap-2">
                                                            <button className="flex items-center justify-center w-[2.375rem] h-[2.375rem] border border-lightGrey rounded-full">
                                                                <Image src={'/icons/multiplication-sign.svg'} alt="deny" width={18} height={18} />
                                                            </button>
                                                            <button className="flex items-center justify-center w-[2.375rem] h-[2.375rem] border border-[#0B9055] rounded-full">
                                                                <Image src={'/icons/tick-green-02.svg'} alt="accept" width={18} height={18} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <SelectionBar
                            members={members}
                            setMembers={setMembers}
                            setSelectAll={setSelectAll}
                            onClose={onClose}
                        />
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    );
};

export default ChannelRequests;

