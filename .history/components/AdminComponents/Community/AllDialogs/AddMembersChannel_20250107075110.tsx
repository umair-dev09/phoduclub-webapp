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
import { collection, arrayUnion, doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db, auth } from '@/firebase'; // Adjust path if needed
import { toast, ToastContainer } from "react-toastify";
import { Tabs, Tab } from "@nextui-org/react";
import LoadingData from "@/components/Loading";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

interface AddMembersGroupProps {
    open: boolean;
    onClose: () => void;
    communityId: string;
    headingId: string;
    channelId: string;
    groupMembers: { id: string, isAdmin: boolean }[] | null;
}

interface UserData {
    userId: string;
    name: string;
    uniqueId: string;
    profilePic: string;
    email: string;
    isPremium: boolean;
}

interface AdminData {
    userId: string;
    name: string;
    adminId: string;
    profilePic: string;
    role: string;
}


function AddMembersChannel({ open, onClose, communityId, headingId, channelId, groupMembers }: AddMembersGroupProps) {
    const [activeTab, setActiveTab] = useState("Users");
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<UserData[]>([]);
    const [admins, setAdmins] = useState<AdminData[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchTermA, setSearchTermA] = useState('');
    const [selectedAllUsers, setSelectedAllUsers] = useState(false);
    const [selectedAllAdmins, setSelectedAllAdmins] = useState(false);
    const [members, setMembers] = useState<{ id: string; isAdmin: boolean }[]>([]);
    const currentUserId = auth.currentUser?.uid;

    useEffect(() => {
        const usersCollection = collection(db, 'users');
        const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
            const updatedUsers: UserData[] = snapshot.docs.map((doc) => {
                const userData = doc.data();
                return {
                    uniqueId: userData.uniqueId,
                    name: userData.name,
                    userId: userData.userId,
                    profilePic: userData.profilePic,
                    isPremium: userData.isPremium,
                } as UserData;
            });

            const filteredGroupUsers = updatedUsers.filter(user => {
                if (!groupMembers) return false;
                return groupMembers
                    .filter(member => !member.isAdmin)
                    .some(member => member.id === user.uniqueId);
            });

            setUsers(filteredGroupUsers);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [groupMembers]);

    useEffect(() => {
        const usersCollection = collection(db, 'admin');
        const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
            const updatedAdmins: AdminData[] = snapshot.docs.map((doc) => {
                const adminData = doc.data();
                return {
                    adminId: adminData.adminId,
                    name: adminData.name,
                    userId: adminData.userId,
                    profilePic: adminData.profilePic,
                    role: adminData.role,
                } as AdminData;
            }).filter((admin) => admin.adminId !== currentUserId);

            const filteredGroupAdmins = updatedAdmins.filter(admin => {
                if (!groupMembers) return false;
                return groupMembers
                    .filter(member => member.isAdmin)
                    .some(member => member.id === admin.adminId);
            });

            setAdmins(filteredGroupAdmins);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [currentUserId, groupMembers]);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredAdmins = admins.filter(admin =>
        admin.name.toLowerCase().includes(searchTermA.toLowerCase())
    );



    const isAddMembersButtonDisabled = !members.some(member => member.id);

    const handleUserCheckbox = (uniqueId: string, isChecked: boolean) => {
        setMembers((prev) => {
            if (isChecked) {
                return [...prev, { id: uniqueId, isAdmin: false }];
            } else {
                return prev.filter((member) => member.id !== uniqueId);
            }
        });
    };

    const handleAdminCheckbox = (adminId: string, isChecked: boolean) => {
        setMembers((prev) => {
            if (isChecked) {
                return [...prev, { id: adminId, isAdmin: true }];
            } else {
                return prev.filter((member) => member.id !== adminId);
            }
        });
    };

    const handleHeaderCheckbox = (type: "user" | "admin", isChecked: boolean) => {
        if (type === "user") {
            if (isChecked) {
                // Select all users, preserving their `isAdmin` state
                const allUsers = users.map((user) => ({
                    id: user.uniqueId,
                    isAdmin: false,
                }));
                setMembers((prevMembers) => [
                    ...prevMembers.filter((member) => member.isAdmin), // Keep existing admins
                    ...allUsers,
                ]);
                setSelectedAllUsers(true);
            } else {
                // Deselect all users
                setMembers((prevMembers) =>
                    prevMembers.filter((member) => member.isAdmin) // Keep only admins
                );
                setSelectedAllUsers(false);
            }
        } else if (type === "admin") {
            if (isChecked) {
                // Select all admins, preserving their `isAdmin` state
                const allAdmins = admins.map((admin) => ({
                    id: admin.adminId,
                    isAdmin: true,
                }));
                setMembers((prevMembers) => [
                    ...prevMembers.filter((member) => !member.isAdmin), // Keep existing users
                    ...allAdmins,
                ]);
                setSelectedAllAdmins(true);
            } else {
                // Deselect all admins
                setMembers((prevMembers) =>
                    prevMembers.filter((member) => !member.isAdmin) // Keep only users
                );
                setSelectedAllAdmins(false);
            }
        }
    };

    const handleAddMembers = async () => {
        try {
            // Update the members array with new members using arrayUnion
            await setDoc(
                doc(db, `communities/${communityId}/channelsHeading/${headingId}/channels`, channelId),
                {
                    members: arrayUnion(...members) // Adds all members from the array if not already present
                },
                { merge: true }
            );

            toast.success("Members Added Successfully!");
            setMembers([]); // Clear the members array
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

        // <Dialog open={open} onClose={onClose} className="relative z-50">
        //     <DialogBackdrop className="fixed inset-0 bg-black/30" />
        //     <div className="fixed inset-0 flex items-center justify-center">
        //         <DialogPanel className="bg-white rounded-2xl w-[568px] h-auto flex flex-col ">
        //             <div className=' flex flex-col p-6 gap-1 border-solid border-[#EAECF0] border-b rounded-t-2xl'>
        //                 <div className='flex flex-row justify-between items-center'>
        //                     <h1 className='text-[#1D2939] font-bold text-lg'>Create Channel</h1>
        //                     <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
        //                         <button><Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} onClick={onClose} /></button>
        //                     </button>
        //                 </div>
        //                 <h3 className="font-semibold text-lg text-[#1D2939] mt-4">Add Members</h3>
        //                 <Tabs
        //                     aria-label="Market Integration Tabs"
        //                     color="primary"
        //                     variant="underlined"
        //                     selectedKey={activeTab}
        //                     onSelectionChange={(key) => setActiveTab(key as string)}
        //                     classNames={{
        //                         tabList: "gap-6 w-full relative rounded-none p-0 border-b border-solid border-[#EAECF0]",
        //                         cursor: "w-full bg-[#7400E0]",
        //                         tab: "max-w-fit px-0 h-12",
        //                         tabContent: "group-data-[selected=true]:text-[#7400E0] hover:text-[#7400E0] ",
        //                     }}
        //                 >
        //                     <Tab
        //                         key="Users"
        //                         title={
        //                             <div className="flex items-center space-x-2">
        //                                 <span className="font-medium text-base">
        //                                     Users
        //                                 </span>
        //                             </div>
        //                         }
        //                     >
        //                         <div className="flex flex-col gap-3">
        //                             <div className="flex flex-row px-[0.875rem] py-[0.625rem] gap-2 border border-lightGrey rounded-md">
        //                                 <Image src="/icons/search-lg.svg" alt="search" width={20} height={20} />
        //                                 <input
        //                                     type="text"
        //                                     placeholder="Search"
        //                                     className="w-full outline-none text-sm text-[#182230] font-normal leading-6"
        //                                     value={searchTerm}
        //                                     onChange={(e) => setSearchTerm(e.target.value)}
        //                                 />
        //                             </div>
        //                             <div className="  border border-[#EAECF0] rounded-xl overflow-hidden">
        //                                 <div className="max-h-[300px] overflow-y-auto">

        //                                     {filteredUsers.length > 0 ? (
        //                                         <>
        //                                             <table className="w-full">
        //                                                 <thead className="sticky top-0 z-10 bg-white shadow-sm">
        //                                                     <tr>
        //                                                         <td className="w-[10%] pl-8 pb-1">
        //                                                             <Checkbox
        //                                                                 size="sm"
        //                                                                 color="primary"
        //                                                                 isSelected={selectedAllUsers}
        //                                                                 onChange={(e) => handleHeaderCheckbox("user", e.target.checked)}
        //                                                             />
        //                                                         </td>
        //                                                         <td className="w-[50%] pl-2 py-3">
        //                                                             <p className="text-sm text-[#667085] font-medium leading-6">
        //                                                                 Name
        //                                                             </p>
        //                                                         </td>
        //                                                         <td className="w-[40%]"></td>
        //                                                     </tr>
        //                                                 </thead>
        //                                                 <tbody>
        //                                                     {filteredUsers.map((user, index) => (
        //                                                         <tr
        //                                                             key={user.uniqueId}
        //                                                             className="border-t border-lightGrey"
        //                                                         >
        //                                                             <td className="pl-8 pb-1">
        //                                                                 <Checkbox
        //                                                                     size="sm"
        //                                                                     color="primary"
        //                                                                     isSelected={members.some(
        //                                                                         (member) => member.id === user.uniqueId && !member.isAdmin
        //                                                                     )}
        //                                                                     onChange={(e) => handleUserCheckbox(user.uniqueId, e.target.checked)}
        //                                                                 />
        //                                                             </td>
        //                                                             <td className="pl-2 py-3">
        //                                                                 <div className="flex flex-row gap-2 items-center">
        //                                                                     <div className="relative">
        //                                                                         <Image className="rounded-full w-10 h-10"
        //                                                                             src={user.profilePic || "/images/DP_Lion.svg"}
        //                                                                             alt="DP"
        //                                                                             width={40}
        //                                                                             height={40}
        //                                                                         />
        //                                                                         {user.isPremium && (
        //                                                                             <Image
        //                                                                                 className="absolute right-0 bottom-0"
        //                                                                                 src="/icons/winnerBatch.svg"
        //                                                                                 alt="Batch"
        //                                                                                 width={18}
        //                                                                                 height={18}
        //                                                                             />
        //                                                                         )}

        //                                                                     </div>
        //                                                                     <div className="flex flex-col">
        //                                                                         <span className="text-sm font-semibold whitespace-nowrap">
        //                                                                             {user.name}
        //                                                                         </span>
        //                                                                         <span className="text-[13px] text-[#667085]">
        //                                                                             {user.userId}
        //                                                                         </span>
        //                                                                     </div>
        //                                                                 </div>
        //                                                             </td>

        //                                                         </tr>
        //                                                     ))}
        //                                                 </tbody>
        //                                             </table>
        //                                         </>
        //                                     ) : (
        //                                         <div className='py-6 w-full flex items-center justify-center text-center'><span className="w-full">No user found</span></div>
        //                                     )}

        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </Tab>

        //                     <Tab
        //                         key="Others"
        //                         title={
        //                             <div className="flex items-center space-x-2">
        //                                 <span className="font-medium text-base">
        //                                     Others
        //                                 </span>
        //                             </div>
        //                         }
        //                     >
        //                         <div className="flex flex-col gap-3">
        //                             <div className="flex flex-row px-[0.875rem] py-[0.625rem] gap-2 border border-lightGrey rounded-md">
        //                                 <Image src="/icons/search-lg.svg" alt="search" width={20} height={20} />
        //                                 <input
        //                                     type="text"
        //                                     placeholder="Search"
        //                                     className="w-full outline-none text-sm text-[#182230] font-normal leading-6"
        //                                     value={searchTermA}
        //                                     onChange={(e) => setSearchTermA(e.target.value)}
        //                                 />
        //                             </div>
        //                             <div className="  border border-[#EAECF0] rounded-xl overflow-hidden">
        //                                 <div className="max-h-[300px] overflow-y-auto">

        //                                     {filteredAdmins.length > 0 ? (
        //                                         <>
        //                                             <table className="w-full">
        //                                                 <thead className="sticky top-0 z-10 bg-white shadow-sm">
        //                                                     <tr>
        //                                                         <td className="w-[10%] pl-8 pb-1">
        //                                                             <Checkbox
        //                                                                 size="sm"
        //                                                                 color="primary"
        //                                                                 isSelected={selectedAllAdmins}
        //                                                                 onChange={(e) => handleHeaderCheckbox("admin", e.target.checked)}
        //                                                             />
        //                                                         </td>
        //                                                         <td className="w-[50%] pl-2 py-3">
        //                                                             <p className="text-sm text-[#667085] font-medium leading-6">
        //                                                                 Name
        //                                                             </p>
        //                                                         </td>
        //                                                         <td className="w-[40%]"></td>
        //                                                     </tr>
        //                                                 </thead>
        //                                                 <tbody>
        //                                                     {filteredAdmins.map((admin, index) => (
        //                                                         <tr
        //                                                             key={admin.adminId}
        //                                                             className="border-t border-lightGrey"
        //                                                         >
        //                                                             <td className="pl-8 pb-1">
        //                                                                 <Checkbox
        //                                                                     size="sm"
        //                                                                     color="primary"
        //                                                                     isSelected={members.some(
        //                                                                         (member) => member.id === admin.adminId && member.isAdmin
        //                                                                     )}
        //                                                                     onChange={(e) => handleAdminCheckbox(admin.adminId, e.target.checked)}
        //                                                                 />
        //                                                             </td>
        //                                                             <td className="pl-2 py-3">
        //                                                                 <div className="flex flex-row gap-2 items-center">
        //                                                                     <div className="relative">
        //                                                                         <Image className="rounded-full w-10 h-10"
        //                                                                             src={admin.profilePic || "/images/DP_Lion.svg"}
        //                                                                             alt="DP"
        //                                                                             width={40}
        //                                                                             height={40}
        //                                                                         />

        //                                                                     </div>
        //                                                                     <div className="flex flex-col">
        //                                                                         <div className="flex flex-row gap-[6px]">
        //                                                                             <span className="text-sm font-semibold whitespace-nowrap">
        //                                                                                 {admin.name}
        //                                                                             </span>
        //                                                                             <span className="text-[13px] text-[#000000]">
        //                                                                                 {admin.role}
        //                                                                             </span>
        //                                                                         </div>
        //                                                                         <span className="text-[13px] text-[#667085]">
        //                                                                             {admin.userId}
        //                                                                         </span>
        //                                                                     </div>
        //                                                                 </div>
        //                                                             </td>

        //                                                         </tr>
        //                                                     ))}
        //                                                 </tbody>
        //                                             </table>
        //                                         </>
        //                                     ) : (
        //                                         <div className='py-6 w-full flex items-center justify-center text-center'><span className="w-full">No user found</span></div>
        //                                     )}

        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </Tab>
        //                 </Tabs>


        //             </div>
        //             <div className="flex flex-row justify-end mx-6 my-4 gap-4">
        //                 <button
        //                     className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md hover:bg-[#F2F4F7]"
        //                     onClick={onClose}
        //                 >
        //                     Cancel
        //                 </button>
        //                 <button
        //                     className={`py-[0.625rem] px-6 text-white shadow-inner-button rounded-md transition-all duration-200 bg-[#8501FF] border border-[#9012FF] hover:bg-[#7001CF]
        //                     ${isAddMembersButtonDisabled
        //                             ? 'cursor-not-allowed opacity-35'
        //                             : 'opacity-100'
        //                         }`}

        //                     disabled={isAddMembersButtonDisabled}
        //                     onClick={handleAddMembers}
        //                 >
        //                     Add Members
        //                 </button>
        //             </div>

        //         </DialogPanel>
        //     </div >
        // </Dialog >

        <Modal isOpen={open} onOpenChange={(isOpen) => !isOpen && onClose()} hideCloseButton
        >

            <ModalContent>
                <>
                    <ModalHeader className="flex flex-row justify-between items-center gap-1">
                        <h1 className='text-[#1D2939] font-bold text-lg'>Create Channel</h1>
                        <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7] outline-none">
                            <button><Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} onClick={onClose} /></button>
                        </button>
                    </ModalHeader>
                    <ModalBody>
                        <h3 className="font-semibold text-lg text-[#1D2939] mt-4">Add Members</h3>
                        <Tabs
                            aria-label="Market Integration Tabs"
                            color="primary"
                            variant="underlined"
                            selectedKey={activeTab}
                            onSelectionChange={(key) => setActiveTab(key as string)}
                            classNames={{
                                tabList: "gap-6 w-full relative rounded-none p-0 border-b border-solid border-[#EAECF0]",
                                cursor: "w-full bg-[#7400E0]",
                                tab: "max-w-fit px-0 h-12",
                                tabContent: "group-data-[selected=true]:text-[#7400E0] hover:text-[#7400E0] ",
                            }}
                        >
                            <Tab
                                key="Users"
                                title={
                                    <div className="flex items-center space-x-2">
                                        <span className="font-medium text-base">
                                            Users
                                        </span>
                                    </div>
                                }
                            >
                                <div className="flex flex-col gap-3">
                                    <div className="flex flex-row px-[0.875rem] py-[0.625rem] gap-2 border border-lightGrey rounded-md">
                                        <Image src="/icons/search-lg.svg" alt="search" width={20} height={20} />
                                        <input
                                            type="text"
                                            placeholder="Search"
                                            className="w-full outline-none text-sm text-[#182230] font-normal leading-6"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                    <div className="  border border-[#EAECF0] rounded-xl overflow-hidden">
                                        <div className="max-h-[300px] overflow-y-auto">

                                            {filteredUsers.length > 0 ? (
                                                <>
                                                    <table className="w-full">
                                                        <thead className="sticky top-0 z-10 bg-white shadow-sm">
                                                            <tr>
                                                                <td className="w-[10%] pl-8 pb-1">
                                                                    <Checkbox
                                                                        size="sm"
                                                                        color="primary"
                                                                        isSelected={selectedAllUsers}
                                                                        onChange={(e) => handleHeaderCheckbox("user", e.target.checked)}
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
                                                            {filteredUsers.map((user, index) => (
                                                                <tr
                                                                    key={user.uniqueId}
                                                                    className="border-t border-lightGrey"
                                                                >
                                                                    <td className="pl-8 pb-1">
                                                                        <Checkbox
                                                                            size="sm"
                                                                            color="primary"
                                                                            isSelected={members.some(
                                                                                (member) => member.id === user.uniqueId && !member.isAdmin
                                                                            )}
                                                                            onChange={(e) => handleUserCheckbox(user.uniqueId, e.target.checked)}
                                                                        />
                                                                    </td>
                                                                    <td className="pl-2 py-3">
                                                                        <div className="flex flex-row gap-2 items-center">
                                                                            <div className="relative">
                                                                                <Image className="rounded-full w-10 h-10"
                                                                                    src={user.profilePic || "/images/DP_Lion.svg"}
                                                                                    alt="DP"
                                                                                    width={40}
                                                                                    height={40}
                                                                                />
                                                                                {user.isPremium && (
                                                                                    <Image
                                                                                        className="absolute right-0 bottom-0"
                                                                                        src="/icons/winnerBatch.svg"
                                                                                        alt="Batch"
                                                                                        width={18}
                                                                                        height={18}
                                                                                    />
                                                                                )}

                                                                            </div>
                                                                            <div className="flex flex-col">
                                                                                <span className="text-sm font-semibold whitespace-nowrap">
                                                                                    {user.name}
                                                                                </span>
                                                                                <span className="text-[13px] text-[#667085]">
                                                                                    {user.userId}
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
                            </Tab>

                            <Tab
                                key="Others"
                                title={
                                    <div className="flex items-center space-x-2">
                                        <span className="font-medium text-base">
                                            Others
                                        </span>
                                    </div>
                                }
                            >
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
                                    <div className="  border border-[#EAECF0] rounded-xl overflow-hidden">
                                        <div className="max-h-[300px] overflow-y-auto">

                                            {filteredAdmins.length > 0 ? (
                                                <>
                                                    <table className="w-full">
                                                        <thead className="sticky top-0 z-10 bg-white shadow-sm">
                                                            <tr>
                                                                <td className="w-[10%] pl-8 pb-1">
                                                                    <Checkbox
                                                                        size="sm"
                                                                        color="primary"
                                                                        isSelected={selectedAllAdmins}
                                                                        onChange={(e) => handleHeaderCheckbox("admin", e.target.checked)}
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
                                                            {filteredAdmins.map((admin, index) => (
                                                                <tr
                                                                    key={admin.adminId}
                                                                    className="border-t border-lightGrey"
                                                                >
                                                                    <td className="pl-8 pb-1">
                                                                        <Checkbox
                                                                            size="sm"
                                                                            color="primary"
                                                                            isSelected={members.some(
                                                                                (member) => member.id === admin.adminId && member.isAdmin
                                                                            )}
                                                                            onChange={(e) => handleAdminCheckbox(admin.adminId, e.target.checked)}
                                                                        />
                                                                    </td>
                                                                    <td className="pl-2 py-3">
                                                                        <div className="flex flex-row gap-2 items-center">
                                                                            <div className="relative">
                                                                                <Image className="rounded-full w-10 h-10"
                                                                                    src={admin.profilePic || "/images/DP_Lion.svg"}
                                                                                    alt="DP"
                                                                                    width={40}
                                                                                    height={40}
                                                                                />

                                                                            </div>
                                                                            <div className="flex flex-col">
                                                                                <div className="flex flex-row gap-[6px]">
                                                                                    <span className="text-sm font-semibold whitespace-nowrap">
                                                                                        {admin.name}
                                                                                    </span>
                                                                                    <span className="text-[13px] text-[#000000]">
                                                                                        {admin.role}
                                                                                    </span>
                                                                                </div>
                                                                                <span className="text-[13px] text-[#667085]">
                                                                                    {admin.userId}
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
                            </Tab>
                        </Tabs>

                    </ModalBody>
                    <ModalFooter className="border-t border-lightGrey">
                        <Button
                            variant="light" className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md hover:bg-[#F2F4F7] font-semibold"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            className={`py-[0.625rem] px-6 text-white shadow-inner-button rounded-md transition-all duration-200 font-semibold
                            ${isAddMembersButtonDisabled ?
                                    "bg-[#CDA0FC] cursor-not-allowed" : " hover:bg-[#6D0DCC] bg-[#9012FF]"
                                }`}

                            disabled={isAddMembersButtonDisabled}
                            onClick={() => {
                                handleAddMembers();
                                onClose();
                            }
                            }
                        >
                            Add Members
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal >
    );
}
export default AddMembersChannel;


