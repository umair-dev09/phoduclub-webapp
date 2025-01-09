"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import Ban from "@/components/AdminComponents/UserDatabaseMangement/Ban";
import Delete from "@/components/AdminComponents/UserDatabaseMangement/Delete";
import { collection, getDocs, addDoc, setDoc, query, where, doc, getDoc, onSnapshot, deleteDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingData from "@/components/Loading";
import { Checkbox } from "@nextui-org/react";


interface UserData {
    userId: string;
    name: string;
    uniqueId: string;
    phone: string;
    createdAt: string;
    profilePic: string;
    email: string;
    isPremium: boolean;
    isBanned: boolean;
    targetExams: string[];
    targetYear: string;
}

const formatFirestoreTimestamp = (timestamp: Timestamp | string): string => {
    let date: Date;

    // Check if the input is a Firebase Timestamp
    if (timestamp instanceof Timestamp) {
        date = timestamp.toDate(); // Convert Timestamp to JavaScript Date
    } else if (typeof timestamp === "string") {
        // Handle if the input is a string in the given format
        const [datePart, timePart] = timestamp.split(" at ");
        date = new Date(`${datePart} ${timePart}`);
    } else {
        return "Invalid Timestamp"; // Handle unexpected inputs
    }

    // Format the date to "Dec 1, 2023"
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short", // Abbreviated month like Jan, Feb
        day: "numeric",
    });
};

function Banned() {
    const [data, setData] = useState<UserData[]>([]);
    const [users, setUsers] = useState<UserData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [userTypeFilter, setUserTypeFilter] = useState('All');
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [userTypePopup, setUserTypePopup] = useState(false);

    const router = useRouter();
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

    useEffect(() => {
        let filteredUsers = users;

        // Filter by search term
        if (searchTerm) {
            filteredUsers = filteredUsers.filter(user =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.phone.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (userTypeFilter == 'Premium') {
            filteredUsers = filteredUsers.filter(user => user.isPremium);
        }

        if (userTypeFilter == 'Free') {
            filteredUsers = filteredUsers.filter(user => !user.isPremium);
        }
        // Update state with filtered and sorted quizzes
        setData(filteredUsers);
        setCurrentPage(1); // Reset to first page when filters change
    }, [searchTerm, users, userTypeFilter]);

    useEffect(() => {
        const usersCollection = collection(db, 'users');
        const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
            const updatedUsers: UserData[] = snapshot.docs.map((doc) => {
                const userData = doc.data();
                return {
                    uniqueId: userData.uniqueId,
                    name: userData.name,
                    userId: userData.userId,
                    phone: userData.phone,
                    email: userData.email,
                    profilePic: userData.profilePic,
                    createdAt: userData.createdAt,
                    isPremium: userData.isPremium,
                    targetExams: userData.targetExams,
                    targetYear: userData.targetYear,
                    isBanned: userData.isBanned,
                } as UserData;
            }).filter((user) => user.isBanned); // Filter users with isGuide true

            setUsers(updatedUsers);
            setData(updatedUsers); // Update data for pagination and search
            setLoading(false);
        });
        // Cleanup listener on component unmount
        return () => unsubscribe();
    }, []);
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = data.slice(firstItemIndex, lastItemIndex);

    // Function to handle tab click and navigate to a new route
    const handleTabClick = (path: string) => {
        router.push(path);
    };
    // THIS STATE IS USED FOR THE DAILOG OF BAN
    const [isBanOpen, setIsBanOpen] = useState(false);
    const openBan = () => setIsBanOpen(true);
    const closeBan = () => setIsBanOpen(false);

    // THIS STATE IS USED FOR THE DAILOG OF DELETE
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const openDelete = () => setIsDeleteOpen(true);
    const closeDelete = () => setIsDeleteOpen(false);

    const [uniqueId, setUniqueId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Check if all fields are filled
    const isAddButtonDisabled = !uniqueId || !startDate || !endDate;

    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const closeDialog = () => {
        setOpenDialog(false);
    };
    const [phone, setPhone] = useState("");

    // Function to handle header checkbox selection
    const handleHeaderCheckboxSelect = () => {
        if (selectedRows.size === currentItems.length) {
            // If all rows are already selected, unselect all
            setSelectedRows(new Set());
        } else {
            // Select all current page rows
            const allCurrentPageIds = currentItems.map(item => item.name);
            setSelectedRows(new Set(allCurrentPageIds));
        }
    };

    // Function to handle row selection
    const handleRowSelect = (quizId: string) => {
        const newSelectedRows = new Set(selectedRows);
        if (newSelectedRows.has(quizId)) {
            newSelectedRows.delete(quizId);
        } else {
            newSelectedRows.add(quizId);
        }
        setSelectedRows(newSelectedRows);
    };

    const [dateFilter, setDateFilter] = useState(null);
    const [statusFilter, setStatusFilter] = useState(null);
    const isTextSearch = searchTerm.trim().length > 0 && !dateFilter && !statusFilter;

    if (loading) {
        return <LoadingData />
    }
    return (
        <div className="flex flex-col w-full gap-4 ">
            <div className="flex flex-row justify-between items-center">
                <h2 className="text-lg font-semibold text-[#1D2939]">
                    Users
                </h2>
                <div className="flex flex-row gap-3">
                    {/* Search Button */}
                    <button className="h-[44px] w-[250px] rounded-md bg-[#FFFFFF] border border-solid border-[#D0D5DD] flex flex-row pl-2 gap-2 items-center">
                        <Image
                            src="/icons/search-button.svg"
                            width={20}
                            height={20}
                            alt="Search Button"
                        />
                        <input
                            className="w-full font-normal text-[#667085] text-sm placeholder:text-[#A1A1A1] rounded-md px-1 py-1 focus:outline-none focus:ring-0 border-none"
                            placeholder="Search"
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </button>

                    {/* Select Students Button */}
                    <Popover
                        placement="bottom"
                        isOpen={userTypePopup}
                        onOpenChange={(open) => setUserTypePopup(open)}
                    >
                        <PopoverTrigger>
                            <button className={`h-[44px] w-[143px] rounded-md hover:bg-[#F2F4F7] bg-[#FFFFFF] border border-solid border-[#D0D5DD] outline-none justify-between flex items-center p-3 transition-colors ${userTypePopup
                                ? "border-[#C7A5FF] ring-4 ring-[#E2D9F8]"
                                : "border-[#D0D5DD]"
                                }`}>
                                <span className="font-medium text-sm text-[#182230] ml-2">{userTypeFilter}</span>
                                <Image
                                    src="/icons/by-role-arrow-down.svg"
                                    width={20}
                                    height={20}
                                    alt="down arrow"
                                />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[8.875rem] px-0 py-1 border border-lightGrey rounded-md shadow-[0_12px_16px_-4px_rgba(16,24,40,0.08)]">
                            <div className="w-full bg-white">
                                <button className="w-full py-[0.625rem] px-4 text-base text-left text-primary-900 font-normal transition-colors hover:bg-[#F9FAFB]" onClick={() => { setUserTypeFilter('All'), setUserTypePopup(false); }}>All</button>
                                <button className="w-full py-[0.625rem] px-4 text-base text-left text-primary-900 font-normal transition-colors hover:bg-[#F9FAFB]" onClick={() => { setUserTypeFilter('Premium'), setUserTypePopup(false); }}>Premium</button>
                                <button className="w-full py-[0.625rem] px-4 text-base text-left text-primary-900 font-normal transition-colors hover:bg-[#F9FAFB]" onClick={() => { setUserTypeFilter('Free'), setUserTypePopup(false); }}>Free</button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            {selectedRows.size > 0 && (
                <div
                    className="flex flex-row items-center justify-between
                                min-h-9
                                transition-all duration-300 ease-in-out 
                                transform opacity-100 translate-y-0 
                                overflow-hidden"
                >
                    <div className="flex flex-row gap-3 text-sm font-semibold leading-5">
                        <p className="text-[#1D2939]">({selectedRows.size}) Selected</p>
                        {selectedRows.size < data.length && (
                            <button
                                onClick={() => {
                                    const allCurrentPageIds = currentItems.map(item => item.name);
                                    setSelectedRows(new Set(allCurrentPageIds));
                                }}
                                className="text-[#9012FF] underline"
                            >
                                Select all {data.length}
                            </button>
                        )}
                    </div>
                    <div className="flex flex-row gap-2">
                        <button className="flex flex-row items-center px-[0.875rem] py-[0.625rem] gap-1 bg-white border border-lightGrey rounded-md">
                            <Image src='/icons/user-block-green-01.svg' alt="revoke ban" width={20} height={20} />
                            <p className="text-sm text-[#0B9055] font-medium leading-[1.125rem]">Revoke Ban</p>
                        </button>
                        <button className="flex flex-row items-center px-[0.875rem] py-[0.625rem] gap-1 bg-white border border-lightGrey rounded-md">
                            <Image src='/icons/delete.svg' alt="revoke ban" width={20} height={20} />
                            <p className="text-sm text-[#DE3024] font-medium leading-[1.125rem]">Delete</p>
                        </button>
                    </div>
                </div>
            )}

            <div className="flex border border-[#EAECF0] rounded-xl overflow-x-auto">
                <table className="w-full h-auto bg-white rounded-xl">
                    <thead>
                        <tr>
                            <th className="w-[5%] pl-8 py-4 rounded-tl-xl">
                                <Checkbox
                                    size="md"
                                    color="primary"
                                    isSelected={selectedRows.size === currentItems.length && currentItems.length > 0}
                                    isIndeterminate={selectedRows.size > 0 && selectedRows.size < currentItems.length}
                                    onChange={handleHeaderCheckboxSelect}
                                />
                            </th>
                            <th className="text-left px-8 py-4 flex flex-row">
                                <span className="text-[#667085] font-medium text-sm">Name</span>
                            </th>
                            <th className="text-center px-8 py-4 text-[#667085] font-medium text-sm">
                                <div className="flex flex-row justify-center gap-1">
                                    <p>Email</p>
                                </div>
                            </th>
                            <th className="text-center px-8 py-4 text-[#667085] font-medium text-sm">
                                <div className="flex flex-row justify-center gap-1">
                                    <p>Mobile No.</p>
                                </div>
                            </th>
                            <th className="text-center px-8 py-4 text-[#667085] font-medium text-sm">
                                <div className="flex flex-row justify-center gap-1">
                                    <p>Joining Date</p>
                                </div>
                            </th>
                            <th className="w-[12%] text-center px-8 py-4 rounded-tr-xl text-[#667085] font-medium text-sm">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            currentItems.map((banned, index) => (
                                <tr key={index} className="h-auto border-t border-solid border-[#EAECF0]">
                                    <td className="text-center pl-8">
                                        <Checkbox
                                            size="md"
                                            color="primary"
                                            isSelected={selectedRows.has(banned.name)}
                                            onChange={() => handleRowSelect(banned.name)}
                                            onClick={(e) => e.stopPropagation()} // Prevent row click when checking checkbox
                                        />
                                    </td>
                                    <td className="py-2">
                                        <div className="flex flex-row ml-8 gap-2">
                                            <div className="flex items-center">
                                                <div className="relative">
                                                    <Image className="rounded-full min-w-[36px] min-h-[36px]" src={banned.profilePic || '/defaultAdminDP.jpg'} alt="DP" width={36} height={36} />
                                                    {banned.isPremium && (
                                                        <Image className="absolute right-0 bottom-0" src='/icons/winnerBatch.svg' alt="Batch" width={18} height={18} />
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-start justify-start flex-col">
                                                <div
                                                    className="font-semibold cursor-pointer whitespace-nowrap"
                                                    onClick={() => handleTabClick('/admin/userdatabase/userdatabaseinfo')}
                                                >
                                                    {banned.name}
                                                </div>
                                                <div className="flex justify-start items-start text-[13px] text-[#667085]">{banned.userId}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-4 text-center text-[#101828] text-sm">{banned.email}</td>
                                    <td className="px-8 py-4 text-center text-[#101828] text-sm">{banned.phone}</td>
                                    <td className="px-8 py-4 text-center text-[#101828] text-sm whitespace-nowrap">{formatFirestoreTimestamp(banned.createdAt)}</td>
                                    <td className="flex items-center justify-center px-8 py-4 text-[#101828] text-sm">
                                        <Popover placement="bottom-end">
                                            <PopoverTrigger>
                                                <button className="ml-[25%] outline-none">
                                                    <Image
                                                        src="/icons/three-dots.svg"
                                                        width={20}
                                                        height={20}
                                                        alt="More Actions"
                                                    />
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent className=" w-[167px] px-0 border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-md  shadow-lg">
                                                <button className=" flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#F2F4F7]"
                                                    onClick={() => { setIsBanOpen(true); setUserId(banned.uniqueId) }}>
                                                    <Image src='/icons/user-block-green-01.svg' alt="Revoke Ban" width={18} height={18} />
                                                    <p className="text-sm text-[#0B9055] font-normal">Revoke Ban</p>
                                                </button>
                                                <button className=" flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#F2F4F7]"
                                                    onClick={() => { setIsDeleteOpen(true); setName(banned.name); setUserId(banned.uniqueId); }}>
                                                    <Image src='/icons/delete.svg' alt="Delete" width={18} height={18} />
                                                    <p className="text-sm text-[#DE3024] font-normal">Delete</p>
                                                </button>
                                            </PopoverContent>
                                        </Popover>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className='border-t border-lightGrey'>
                                <td colSpan={6} className="text-center py-8">
                                    {isTextSearch && (
                                        <p className="text-[#667085] text-sm">
                                            No users found for &quot;{searchTerm}&quot;
                                        </p>
                                    )}
                                    {!isTextSearch && (
                                        <p className="text-[#667085] text-sm">
                                            No users found
                                        </p>
                                    )}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {isBanOpen && <Ban onClose={closeBan} open={true} id={userId} banUser={false} />}
            {isDeleteOpen && <Delete onClose={closeDelete} open={true} authId={userId} name={name} />}
            {/* Dialog Component */}
            <Dialog open={openDialog} onClose={closeDialog} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 flex items-center justify-center">
                    <DialogPanel className="bg-white rounded-2xl w-[500px] h-auto ">
                        <div className="flex flex-col relative gap-6">
                            <div className="flex flex-col px-6 gap-6">
                                <div className="flex flex-row justify-between mt-6">
                                    <h3 className="text-lg font-bold text-[#1D2939]">Add New User</h3>
                                    <button onClick={closeDialog}>
                                        <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                                    </button>
                                </div>
                                <div className="flex flex-col gap-3 items-center">
                                    <div className="relative">
                                        <Image src="/images/DP_Lion.svg" alt="DP" width={152} height={152} />
                                        <Image
                                            className="absolute right-0 bottom-0"
                                            src="/icons/winnerBatch.svg"
                                            alt="Batch"
                                            width={68}
                                            height={68}
                                        />
                                    </div>
                                    <span className="font-semibold text-sm text-[#9012FF]">Change</span>
                                </div>
                                {/* Input Fields */}
                                <div className="flex flex-row w-full gap-4">
                                    <div className="flex flex-col gap-1 w-1/2 flex-grow">
                                        <label className="text-[#1D2939] text-sm font-medium">First Name</label>
                                        <input
                                            className="w-full text-sm font-medium text-[#1D2939] placeholder:text-[#A1A1A1] rounded-md border border-[#D0D5DD] px-4 py-2"
                                            type="text"
                                            placeholder="First Name"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1 w-1/2 flex-grow">
                                        <label className="text-[#1D2939] text-sm font-medium">Last Name</label>
                                        <input
                                            className="w-full text-sm font-medium text-[#1D2939] placeholder:text-[#A1A1A1] rounded-md border border-[#D0D5DD] px-4 py-2"
                                            type="text"
                                            placeholder="Last Name"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 w-full ">
                                    <label htmlFor="num-ratings" className="text-[#1D2939] text-sm font-medium">
                                        User Id
                                    </label>
                                    <div className="flex flex-row py-2 px-4 w-full gap-2 border border-solid border-[#D0D5DD] rounded-md transition duration-200 ease-in-out ">
                                        <input

                                            className="w-full text-sm font-medium text-[#1D2939] placeholder:font-normal placeholder:text-[#A1A1A1] rounded-md outline-none"
                                            type="text"
                                            placeholder="User Id"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[#344054] text-sm font-medium">Mobile No.</label>
                                    <PhoneInput
                                        country="in"
                                        value={phone}
                                        onChange={(value) => setPhone(value)}
                                        inputProps={{ required: true }}
                                        inputStyle={{
                                            width: "100%",
                                            borderRadius: "8px",
                                            border: "1px solid #D0D5DD",
                                            height: "42px",
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-4 border-t p-4">
                                <button onClick={closeDialog} className="px-6 py-2 border rounded-md text-sm font-semibold">
                                    Discard
                                </button>
                                <button onClick={closeDialog} className="px-6 py-2 bg-[#9012FF] text-white rounded-md text-sm">
                                    Add New User
                                </button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
            <ToastContainer />
        </div>
    );
}

export default Banned;