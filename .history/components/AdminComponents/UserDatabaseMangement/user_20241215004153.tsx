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
import { Checkbox } from "@nextui-org/react";
import Ban from "@/components/AdminComponents/UserDatabaseMangement/Ban";
import Delete from "@/components/AdminComponents/UserDatabaseMangement/Delete";
import { collection, getDocs, addDoc, setDoc, query, where, doc, getDoc, onSnapshot, deleteDoc, Timestamp } from 'firebase/firestore';
import LoadingData from "@/components/Loading";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '@/firebase';
import Select, { SingleValue } from 'react-select';

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

type Option = {
    value: string;
    label: string;
};


function User() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [userTypeFilter, setUserTypeFilter] = useState('All');
    const [firstName, setFirstName] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userId, setUserId] = useState('');
    const [authId, setAuthId] = useState('');
    const [emailId, setEmailId] = useState('');
    const [pic, setPic] = useState('');
    const [phone, setPhone] = useState('');
    const [data, setData] = useState<UserData[]>([]);
    const [users, setUsers] = useState<UserData[]>([]);
    const isFormValid = firstName && lastName && userId && phone.length >= 12 && emailId;
    const [selectedExams, setSelectedExams] = useState<Option[]>([]);
    const exams: Option[] = [
        { value: 'BITSAT', label: 'BITSAT' },
        { value: 'JEE', label: 'JEE' },
        { value: 'SRMJEEE', label: 'SRMJEEE' },
        { value: 'COMEDK', label: 'COMEDK' },
        { value: 'KCET', label: 'KCET' },
        { value: 'VITEEE', label: 'VITEEE' },
        { value: 'MET', label: 'MET' },
    ];
    const [userTypePopup, setUserTypePopup] = useState(false);
    const router = useRouter();

    type CustomState = {
        isSelected: boolean;
        isFocused: boolean;
    };

    const years: Option[] = [
        { value: '2024', label: '2024' },
        { value: '2025', label: '2025' },
        { value: '2026', label: '2026' },
    ];
    const [selectedYear, setSelectedYear] = useState<SingleValue<Option>>(null);
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
        // Update state with filtered and sorted users
        setData(filteredUsers);
        setCurrentPage(1); // Reset to first page when filters change
    }, [searchTerm, users, userTypeFilter]);


    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = data.slice(firstItemIndex, lastItemIndex);

    // Function to handle tab click and navigate to a new route
    const handleTabClick = (path: string) => {
        router.push(path);
    };
    // THIS STATE IS USED FOR THE DAILOG OF BAN
    const [isBanOpen, setIsBanOpen] = useState(false);
    // const openBan = () => {
    //     setIsBanOpen(true);
    // }
    const closeBan = () => setIsBanOpen(false);

    // THIS STATE IS USED FOR THE DAILOG OF DELETE
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const closeDelete = () => setIsDeleteOpen(false);

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
            }).filter((user) => !user.isBanned); // Filter users with isGuide true

            setUsers(updatedUsers);
            setData(updatedUsers); // Update data for pagination and search
            setLoading(false);
        });
        // Cleanup listener on component unmount
        return () => unsubscribe();
    }, []);
    const [openDialog, setOpenDialog] = useState(false);

    const handleEditDetails = (name: string, email: string, phone: string, authId: string, userId: string, pic: string, targetYear: string, targetExams: string[]) => {
        const nameParts = name.trim().split(" "); // Split by spaces
        const firstName = nameParts[0] || ""; // First part is the first name
        const lastName = nameParts.slice(1).join(" ") || ""; // Join remaining parts for the last name
        setIsEditing(true);
        setFirstName(firstName);
        setLastName(lastName);
        setPhone(phone);
        setEmailId(email);
        setAuthId(authId);
        setUserId(userId);
        setPic(pic);
        setOpenDialog(true);
        if (targetExams) {
            const defaultExams = targetExams.map((exam) => ({
                value: exam,
                label: exam,
            }));
            setSelectedExams(defaultExams);
        }
        const defaultYear = years.find(year => year.value === targetYear);
        setSelectedYear(defaultYear || null);
    };

    const handleAddDialog = () => {
        setOpenDialog(true);
        setFirstName('');
        setLastName('');
        setPhone('');
        setEmailId('');
        setAuthId('');
        setUserId('');
        setPic('');
        setSelectedExams([]);
        setSelectedYear(null);
        setIsEditing(false);
    };

    const closeDialog = () => {
        setOpenDialog(false);
    };

    const handleAddUser = async () => {
        const fullName = `${firstName} ${lastName}`;

        try {
            if (authId) {
                //  Update existing user data in Firestore using adminId
                await setDoc(doc(db, "users", authId), {
                    name: fullName,
                    phone,
                    email: emailId,
                    targetYear: selectedYear?.value,
                    targetExams: selectedExams.map(exam => exam.value),
                }, { merge: true });
                toast.success("User Updated Successfully!");
                setIsEditing(false);
            } else {
                // Add new user data to Firestore
                const docRef = await addDoc(collection(db, "users"), {
                    name: fullName,
                    userId,
                    phone,
                    email: emailId,
                    isAvatar: true,
                    profilePic: 'https://firebasestorage.googleapis.com/v0/b/phodu-club.appspot.com/o/Default%20Avatar%2Favatar1.png?alt=media&token=f794198a-0d5b-4542-a7bd-8c8586e4ef85',
                    createdAt: Timestamp.now(),
                    isPremium: false,
                    isGuide: false,
                    targetYear: selectedYear?.value,
                    targetExams: selectedExams.map(exam => exam.value),
                });

                // Update the document with the generated adminId
                await setDoc(docRef, { uniqueId: docRef.id }, { merge: true });
                toast.success("User Added Successfully!");
                setFirstName('');
                setLastName('');
                setUserId('');
                setPhone('');
                setEmailId('');
                setPic('');
                setSelectedExams([]);
                setSelectedYear(null);
            }

            setOpenDialog(false);
        } catch (error) {
            console.error("Error updating or adding user in Firestore:", error);
            toast.error("Failed to save user. Please try again.");
        } finally {
            // setLoading(false); // End loading
        }
    };

    useEffect(() => {
        if (!isEditing) {
            const firstNamePart = firstName.slice(0, 4).toLowerCase();
            const lastNamePart = lastName.slice(0, 4).toLowerCase();
            const phoneNumberPart = phone.slice(-4);
            const userId = `${firstNamePart}${lastNamePart}${phoneNumberPart}`;
            setUserId(userId);
        }
    });
    if (loading) {
        return <LoadingData />
    }

    return (
        <div className="flex flex-col w-full h-full gap-4 ">
            <div className="flex flex-row justify-between items-center">
                <h2 className="text-lg font-semibold text-[#1D2939]">
                    Users
                </h2>
                <div className="flex flex-row gap-3">
                    {/* Search Button */}
                    <button className="h-[44px] w-[250px] rounded-md bg-[#FFFFFF] border border-solid border-[#D0D5DD] flex items-center">
                        <div className="flex flex-row items-center gap-2 pl-2">
                            <Image
                                src="/icons/search-button.svg"
                                width={20}
                                height={20}
                                alt="Search Button"
                            />
                            <input
                                className="font-normal text-[#667085] text-sm placeholder:text-[#A1A1A1] rounded-md px-1 py-1 focus:outline-none focus:ring-0 border-none"
                                placeholder="Search"
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </button>

                    {/* Select Students Button */}
                    <Popover
                        placement="bottom"
                        isOpen={userTypePopup}
                        onOpenChange={(open) => setUserTypePopup(open)}
                    >
                        <PopoverTrigger>
                            <button className={`h-[44px] w-[143px] rounded-md bg-[#FFFFFF] hover:bg-[#F2F4F7] border border-solid border-[#D0D5DD] outline-none justify-between flex items-center p-3 transition-colors ${userTypePopup
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
                    <button
                        onClick={handleAddDialog}
                        className={`h-[44px] w-auto px-6 py-2  rounded-md shadow-inner-button border border-solid border-white flex items-center bg-[#9012FF] justify-center`}>
                        <span className="text-[#FFFFFF] font-semibold text-sm">Add New User</span>
                    </button>
                </div>
            </div>

            <div className="flex flex-col justify-between h-full">
                <div className="flex border border-[#EAECF0] rounded-xl overflow-y-auto">
                    <table className="w-full h-auto bg-white rounded-xl">
                        <thead>
                            <tr>
                                <th className="w-[35%] text-left px-8 py-4 pl-8 rounded-tl-xl flex flex-row">
                                    <span className="text-[#667085] font-medium text-sm">Name</span>
                                </th>
                                <th className=" w-[25%] text-center px-8 py-4 text-[#667085] font-medium text-sm">
                                    <div className="flex flex-row justify-center gap-1">
                                        <p>Email</p>
                                    </div>
                                </th>
                                <th className=" w-[20%] text-center px-8 py-4 text-[#667085] font-medium text-sm">
                                    <div className="flex flex-row justify-center gap-1">
                                        <p>Mobile No.</p>
                                    </div>
                                </th>
                                <th className=" w-[20%] min-w-[200px] text-center px-8 py-4 text-[#667085] font-medium text-sm">
                                    <div className="flex flex-row justify-center gap-1 ">
                                        <p >Account Created</p>
                                    </div>
                                </th>
                                <th className="w-[12%] text-center px-8 py-4 rounded-tr-xl text-[#667085] font-medium text-sm">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((users, index) => (
                                <tr key={index} className="h-auto border-t border-solid border-[#EAECF0]">
                                    <td className="py-2">
                                        <div className="flex flex-row ml-8 gap-2 py-[2px]">
                                            <div className="flex items-center">
                                                <div className="relative">
                                                    <Image className="rounded-full min-w-[36px] min-h-[36px]" src={users.profilePic} alt="DP" width={36} height={36} />
                                                    {users.isPremium && (
                                                        <Image className="absolute right-0 bottom-0" src='/icons/winnerBatch.svg' alt="Batch" width={18} height={18} />
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex items-start justify-start flex-col">
                                                <div
                                                    className="font-semibold text-sm cursor-pointer"
                                                    onClick={() => handleTabClick(`/admin/userdatabase/${users.name.toLowerCase().replace(/\s+/g, '-')}?uId=${users.uniqueId}`)}
                                                >
                                                    {users.name}
                                                </div>
                                                <div className="flex justify-start items-start text-[13px] text-[#667085]">{users.userId}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-4 text-center text-[#101828] text-sm">{users.email}</td>
                                    <td className="px-8 py-4 text-center text-[#101828] text-sm">{users.phone}</td>
                                    <td className="px-8 py-4 text-center text-[#101828] text-sm w-fit" >{formatFirestoreTimestamp(users.createdAt)}</td>
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
                                                <button className="flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#F2F4F7]"
                                                    onClick={() => handleEditDetails(users.name, users.email, users.phone, users.uniqueId, users.userId, users.profilePic, users.targetYear, users.targetExams)}>
                                                    <Image src='/icons/edit-icon.svg' alt="user profile" width={18} height={18} />
                                                    <p className="text-sm text-[#0C111D] font-normal">Edit details</p>
                                                </button>
                                                <button className=" flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#F2F4F7]"
                                                    onClick={() => { setIsBanOpen(true); setAuthId(users.uniqueId) }}>
                                                    <Image src='/icons/user-block-red-01.svg' alt="user profile" width={18} height={18} />
                                                    <p className="text-sm text-[#DE3024] font-normal">Ban</p>
                                                </button>
                                                <button className=" flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#F2F4F7]"
                                                    onClick={() => { setIsDeleteOpen(true); setName(users.name); setAuthId(users.uniqueId); }}>
                                                    <Image src='/icons/delete.svg' alt="user profile" width={18} height={18} />
                                                    <p className="text-sm text-[#DE3024] font-normal">Delete</p>
                                                </button>
                                            </PopoverContent>
                                        </Popover>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Section */}
                <div className="flex items-end justify-end h-auto">
                    <div className="flex justify-right h-auto">
                        <PaginationSection
                            totalItems={data.length}
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                </div>
            </div>

            {isBanOpen && <Ban onClose={closeBan} open={true} id={authId} banUser={true} />}
            {isDeleteOpen && <Delete onClose={closeDelete} open={true} authId={authId} name={name} />}
            {/* Dialog Component */}
            <Dialog open={openDialog} onClose={closeDialog} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 flex items-center justify-center">
                    <DialogPanel className="bg-white rounded-2xl w-[500px] max-h-[92%] overflow-y-auto">
                        <div className="flex flex-col relative gap-6">
                            <div className="flex flex-col px-6 gap-6">
                                <div className="flex flex-row justify-between mt-6">
                                    <h3 className="text-lg font-bold text-[#1D2939]">{!authId ? 'Add New User' : 'Edit User Details'}</h3>
                                    <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7] ">
                                        <button className="" onClick={closeDialog}>
                                            <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                                        </button>
                                    </button>
                                </div>
                                <div className="flex flex-col gap-3 items-center">
                                    <div className="relative">
                                        <Image className="rounded-full" src={pic || "/images/DP_Lion.svg"} alt="DP" width={130} height={130} />
                                    </div>
                                    {/* <span className="font-semibold text-sm text-[#9012FF]">Change</span> */}
                                </div>
                                {/* Input Fields */}
                                <div className="flex flex-row w-full gap-4">
                                    <div className="flex flex-col gap-1 w-1/2 flex-grow">
                                        <label className="text-[#1D2939] text-sm font-medium">First Name</label>
                                        <input
                                            className="w-full text-sm font-medium text-[#1D2939] placeholder:font-normal placeholder:text-[#A1A1A1] rounded-md  px-4 py-2 border border-gray-300  h-10 focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB]"
                                            type="text"
                                            placeholder="First Name"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1 w-1/2 flex-grow">
                                        <label className="text-[#1D2939] text-sm font-medium">Last Name</label>
                                        <input
                                            className="w-full text-sm font-medium text-[#1D2939] placeholder:text-[#A1A1A1] rounded-md  px-4 py-2 border border-gray-300  h-10 focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB]"
                                            type="text"
                                            placeholder="Last Name"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                </div>


                                <div className="flex flex-col gap-1 w-full ">
                                    <label htmlFor="num-ratings" className="text-[#1D2939] text-sm font-medium">
                                        Email Id
                                    </label>
                                    <div className="flex flex-row py-2 px-4 w-full items-center justify-center gap-2 border border-gray-300  h-10 focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB] rounded-md transition duration-200 ease-in-out ">
                                        <input
                                            className="w-full text-sm h-full font-medium text-[#1D2939] placeholder:font-normal placeholder:text-[#A1A1A1] rounded-md  outline-none"
                                            type="text"
                                            placeholder="Email Id"
                                            value={emailId}
                                            onChange={(e) => setEmailId(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 w-full ">
                                    <label htmlFor="num-ratings" className="text-[#1D2939] text-sm font-medium">
                                        User Id
                                    </label>
                                    <div className="flex flex-row py-2 px-4 w-full items-center justify-center gap-2 border border-gray-300  h-10 focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB] rounded-md transition duration-200 ease-in-out ">
                                        <input
                                            className="w-full text-sm h-full font-medium text-[#1D2939] placeholder:font-normal placeholder:text-[#A1A1A1] rounded-md  outline-none"
                                            type="text"
                                            placeholder="User Id"
                                            value={userId}
                                            // onChange={(e) => setUserId(e.target.value)}
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[#344054] text-sm font-medium">Mobile No.</label>
                                    <PhoneInput
                                        country="in"
                                        value={phone}
                                        onChange={(phone) => setPhone("+" + phone)}
                                        inputProps={{ required: true }}
                                        inputStyle={{
                                            width: "100%",
                                            borderRadius: "4px",
                                            border: "1px solid #D0D5DD",
                                            height: "42px",
                                            boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                                            outline: "none"
                                        }}
                                        onFocus={(e) => e.target.style.boxShadow = "0 0 0 2px #D6BBFB"}
                                        onBlur={(e) => e.target.style.boxShadow = "0px 1px 2px 0px rgba(16, 24, 40, 0.05)"}
                                    />
                                </div>

                                <div className='w-full'>
                                    <p className='mb-1 font-medium text-sm'>Target Exam</p>
                                    <Select
                                        id="target-exam"
                                        value={selectedExams}
                                        onChange={(newValue) => setSelectedExams(newValue as Option[])}  // Explicit type casting
                                        options={exams}
                                        isMulti
                                        placeholder="Select exams..."
                                        styles={{
                                            option: (provided, state) => ({
                                                ...provided,
                                                color: 'black',
                                                backgroundColor: state.isFocused ? '#E39FF6' : 'white',
                                            }),
                                            multiValue: (provided) => ({
                                                ...provided,
                                                backgroundColor: 'white',
                                                border: '1.2px solid #D0D5DD',
                                                borderRadius: '8px',
                                                fontWeight: '500',
                                                marginRight: '7px',
                                            }),
                                            multiValueLabel: (provided) => ({
                                                ...provided,
                                                color: 'black',
                                            }),
                                            multiValueRemove: (provided) => ({
                                                ...provided,
                                                color: 'gray',
                                                cursor: 'pointer',
                                                ':hover': {
                                                    backgroundColor: '#ffffff',
                                                    borderRadius: '8px',
                                                },
                                            }),
                                            menu: (provided) => ({
                                                ...provided,
                                                backgroundColor: 'white',
                                            }),
                                            menuList: (provided) => ({
                                                ...provided,
                                                padding: '0',
                                            }),
                                            control: (provided) => ({
                                                ...provided,
                                                border: '1px solid #e6e6e6',
                                                borderRadius: '8px',
                                                padding: '4px',
                                                boxShadow: 'none',
                                                '&:hover': {
                                                    outline: '1px solid #e5a1f5',
                                                },
                                            }),
                                        }}
                                    />
                                </div>

                                <div className='w-full'>
                                    <label htmlFor="target-year" className='mb-1 font-medium text-sm'>Target Year</label>
                                    <Select
                                        id="target-year"
                                        value={selectedYear}
                                        onChange={setSelectedYear}
                                        options={years}
                                        placeholder="Select year..."
                                        styles={{
                                            option: (provided, state: CustomState) => ({
                                                ...provided,
                                                color: 'black',
                                                backgroundColor: state.isFocused ? '#E39FF6' : 'white', // Purple color when focused
                                            }),
                                            singleValue: (provided) => ({
                                                ...provided,
                                                color: 'black',
                                                fontWeight: '500'
                                            }),
                                            control: (provided) => ({
                                                ...provided,
                                                border: '1px solid #e6e6e6',
                                                borderRadius: '8px',
                                                padding: '4px',
                                                boxShadow: 'none',
                                                '&:hover': {
                                                    outline: '1px solid #e5a1f5',
                                                },
                                            }),

                                        }}
                                    />
                                </div>

                            </div>
                            <div className="flex justify-end gap-4 border-t p-4">
                                <button onClick={closeDialog} className="px-6 py-2 border rounded-md text-sm font-semibold hover:bg-[#F2F4F7] ">
                                    Discard
                                </button>
                                <button onClick={handleAddUser} disabled={!isFormValid} className={`px-6 py-2  text-white rounded-md text-sm ${!isFormValid ? 'bg-[#CDA0FC]' : 'bg-[#9012FF]'}`}>
                                    {!authId ? 'Add New User' : 'Save Changes'}
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

// Pagination Component
function PaginationSection({
    totalItems,
    itemsPerPage,
    currentPage,
    setCurrentPage,
}: {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const renderPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 4; // Maximum visible pages in pagination
        const visiblePagesAroundCurrent = Math.floor(maxVisiblePages / 2);

        let startPage = Math.max(1, currentPage - visiblePagesAroundCurrent);
        let endPage = Math.min(totalPages, currentPage + visiblePagesAroundCurrent);

        if (currentPage <= visiblePagesAroundCurrent) {
            endPage = Math.min(totalPages, maxVisiblePages);
        } else if (currentPage + visiblePagesAroundCurrent >= totalPages) {
            startPage = Math.max(1, totalPages - maxVisiblePages + 1);
        }

        // First page with ellipsis if needed
        if (startPage > 1) {
            pages.push(
                <PaginationItem key={1}>
                    <PaginationLink onClick={() => setCurrentPage(1)}>1</PaginationLink>
                </PaginationItem>
            );
            if (startPage > 2) {
                pages.push(
                    <PaginationItem key="start-ellipsis">
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }
        }

        // Visible pages
        for (let page = startPage; page <= endPage; page++) {
            pages.push(
                <PaginationItem key={page}>
                    <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        className={`${currentPage === page ? "bg-purple text-white hover:bg-purple hover:text-white" : "hover:bg-neutral-200"}`}
                    >
                        {page}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        // Last page with ellipsis if needed
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(
                    <PaginationItem key="end-ellipsis">
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }
            pages.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink onClick={() => setCurrentPage(totalPages)}>{totalPages}</PaginationLink>
                </PaginationItem>
            );
        }

        return pages;
    };

    return (
        <Pagination className="mt-4 justify-end">
            <PaginationContent className="bg-white border border-lightGrey rounded-md flex flex-row items-center">
                <PaginationItem>
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="disabled:opacity-50"
                    >
                        <PaginationPrevious />
                    </button>
                </PaginationItem>
                <div className="flex flex-row items-center gap-1">
                    {renderPageNumbers()}
                </div>
                <PaginationItem>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="disabled:opacity-50"
                    >
                        <PaginationNext />
                    </button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

export default User;