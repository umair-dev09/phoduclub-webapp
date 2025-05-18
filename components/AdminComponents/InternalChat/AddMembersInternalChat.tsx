import { useState, useEffect } from "react"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Checkbox } from "@nextui-org/react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { collection, arrayUnion, doc, setDoc, onSnapshot, getDocs } from 'firebase/firestore';
import { db, auth } from '@/firebase'; // Adjust path if needed
import { toast, ToastContainer } from "react-toastify";
import { Tabs, Tab } from "@nextui-org/react";
import LoadingData from "@/components/Loading";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

interface Member {
    id: string;
    name: string;
    profilePic: string;
    role: string;
    userId: string; // Auth ID (previously adminId)
    uniqueId: string; // Display ID (previously userId)
}

interface AddMembersInternalChatProps {
    open: boolean;
    onClose: () => void;
    channelId: string;
}

function AddMembersInternalChat({ open, onClose, channelId }: AddMembersInternalChatProps) {
    const [loading, setLoading] = useState(true);
    const [teachers, setTeachers] = useState<Member[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTermA, setSearchTermA] = useState('');
    const [selectedAllUsers, setSelectedAllUsers] = useState(false);
    const [selectedAllAdmins, setSelectedAllAdmins] = useState(false);
    const [selectedMembers, setSelectedMembers] = useState<{ id: string; isAdmin: boolean }[]>([]);
    const currentUserId = auth.currentUser?.uid;
    const [scrollBehavior, setScrollBehavior] = useState<"inside" | "outside">("outside");

    useEffect(() => {
        const fetchTeachers = async () => {
            const adminSnapshot = await getDocs(collection(db, "admin"));
            const admins = adminSnapshot.docs.map((doc) => {
                const adminData = doc.data();
                return {
                    id: doc.id,
                    name: adminData.name || '',
                    profilePic: adminData.profilePic || '/defaultAdminDP.jpg',
                    role: adminData.role || '',
                    userId: adminData.userId || '', // Auth ID (previously adminId)
                    uniqueId: adminData.uniqueId || '' // Display ID (previously userId)
                };
            }).filter((admin) => admin.userId !== currentUserId && ['Admin', 'Teacher', 'Chief Moderator'].includes(admin.role)); // Exclude current user and filter roles

            setTeachers(admins);
            setLoading(false);
        };

        fetchTeachers();
    }, [currentUserId]);

    const filteredTeachers = teachers.filter(teacher =>
        teacher.name.toLowerCase().includes(searchTermA.toLowerCase())
    );

    const isAddMembersButtonDisabled = !selectedMembers.some(member => member.id);

    const handleAdminCheckbox = (userId: string, isChecked: boolean) => {
        setSelectedMembers((prev) => {
            if (isChecked) {
                return [...prev, { id: userId, isAdmin: true }];
            } else {
                return prev.filter((member) => member.id !== userId);
            }
        });
    };

    const handleHeaderCheckbox = (isChecked: boolean) => {
        if (isChecked) {
            // Select all admins, preserving their `isAdmin` state
            const allAdmins = teachers.map((teacher) => ({
                id: teacher.userId,
                isAdmin: true,
            }));
            setSelectedMembers((prevMembers) => [
                ...prevMembers.filter((member) => !member.isAdmin), // Keep existing users
                ...allAdmins,
            ]);
            setSelectedAllAdmins(true);
        } else {
            // Deselect all admins
            setSelectedMembers((prevMembers) =>
                prevMembers.filter((member) => !member.isAdmin) // Keep only users
            );
            setSelectedAllAdmins(false);
        }
    };

    const handleAddMembers = async () => {
        try {
            // Update the members array with new members using arrayUnion
            await setDoc(
                doc(db, `internalchat`, channelId),
                {
                    members: arrayUnion(...selectedMembers, { id: currentUserId, isAdmin: true }) // Adds all members from the array and the current user if not already present
                },
                { merge: true }
            );

            toast.success("Members Added Successfully!");
            setSelectedMembers([]); // Clear the members array
            onClose(); // Close the modal or form
        } catch (error) {
            console.error("Error adding members in Firestore:", error);
            toast.error("Failed to add members. Please try again.");
        }
    };

    if (loading) {
        return <LoadingData />
    }

    return (
        <Modal isOpen={open} onOpenChange={(isOpen) => !isOpen && onClose()} hideCloseButton
            scrollBehavior={scrollBehavior}>
            <ModalContent>
                <>
                    <ModalHeader className="flex flex-row justify-between items-center gap-1">
                        <h1 className='text-[#1D2939] font-bold text-lg'>Create Group</h1>
                        <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                            <button><Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} onClick={onClose} /></button>
                        </button>
                    </ModalHeader>
                    <ModalBody>
                        <h3 className="font-semibold text-lg text-[#1D2939] mt-4">Add Members</h3>
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-row px-[0.875rem] py-[0.625rem] gap-2 border border-lightGrey rounded-md">
                                <Image src="/icons/search-lg.svg" alt="search" width={20} height={20} />
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="w-full outline-none text-sm text-[#182230] font-normal leading-6"
                                    value={searchTermA}
                                    onChange={(e) => setSearchTermA(e.target.value)}
                                />
                            </div>
                            <div className="border border-[#EAECF0] rounded-xl overflow-hidden">
                                <div className="max-h-[300px] overflow-y-auto">
                                    {filteredTeachers.length > 0 ? (
                                        <>
                                            <table className="w-full">
                                                <thead className="sticky top-0 z-10 bg-white shadow-sm">
                                                    <tr>
                                                        <td className="w-[10%] pl-8 pb-1">
                                                            <Checkbox
                                                                size="sm"
                                                                color="primary"
                                                                isSelected={selectedAllAdmins}
                                                                onChange={(e) => handleHeaderCheckbox(e.target.checked)}
                                                            />
                                                        </td>
                                                        <td className="w-[100%] pl-2 py-3">
                                                            <p className="text-sm text-[#667085] font-medium leading-6">
                                                                Name
                                                            </p>
                                                        </td>
                                                        <td className="w-[40%]"></td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filteredTeachers.map((teacher, index) => (
                                                        <tr
                                                            key={teacher.userId}
                                                            className="border-t border-lightGrey"
                                                        >
                                                            <td className="pl-8 pb-1">
                                                                <Checkbox
                                                                    size="sm"
                                                                    color="primary"
                                                                    isSelected={selectedMembers.some(
                                                                        (member) => member.id === teacher.userId && member.isAdmin
                                                                    )}
                                                                    onChange={(e) => handleAdminCheckbox(teacher.userId, e.target.checked)}
                                                                />
                                                            </td>
                                                            <td className="pl-2 py-3">
                                                                <div className="flex flex-row gap-2 items-center">
                                                                    <Image className="rounded-full w-10 h-10"
                                                                        src={teacher.profilePic || "/images/DP_Lion.svg"}
                                                                        alt="DP"
                                                                        width={40}
                                                                        height={40}
                                                                    />
                                                                    <div className="flex flex-col">
                                                                        <div className="flex flex-row gap-[6px]">
                                                                            <span className="text-sm font-semibold whitespace-nowrap">
                                                                                {teacher.name}
                                                                            </span>
                                                                            <span className="text-[13px] text-[#000000]">
                                                                                {teacher.role}
                                                                            </span>
                                                                        </div>
                                                                        <span className="text-[13px] text-[#667085]">
                                                                            {teacher.uniqueId}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </>
                                    ) : (
                                        <div className='py-6 w-full flex items-center justify-center text-center'><span className="w-full">No user found</span></div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter className="border-t border-lightGrey">
                        <Button
                            variant="light" className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md hover:bg-[#F2F4F7] font-semibold"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            className={`py-[0.625rem] px-6 text-white shadow-inner-button font-semibold rounded-md transition-all duration-200 
                            ${isAddMembersButtonDisabled ?
                                    " bg-[#CDA0FC] cursor-not-allowed" : "bg-[#9012FF] hover:bg-[#6D0DCC] border border-solid  border-[#9012FF]"
                                }`}
                            disabled={isAddMembersButtonDisabled}
                            onClick={handleAddMembers}
                        >
                            Add Members
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal >
    );
}
export default AddMembersInternalChat;
