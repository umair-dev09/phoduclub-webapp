"use client";

import React from 'react';
import Image from 'next/image';
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, setDoc, query, where, doc, getDoc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import LoadingData from "@/components/Loading";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '@/firebase';

interface UserData {
    userId: string;
    name: string;
    uniqueId: string;
    phone: string;
    createdAt: string;
    profilePic: string;
    email: string;
    isPremium: boolean;
    isGuide: boolean;
}

function RoleManagementGuide() {
    const [uniqueID, setUniqueID] = useState('');
    const [removeId, setRemoveId] = useState('');
    const [isOpen, setIsOpen] = useState(false); // Control popover visibility
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [data, setData] = useState<UserData[]>([]);
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const usersCollection = collection(db, 'users');

        const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
            const updatedUsers: UserData[] = snapshot.docs
                .map((doc) => {
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
                        isGuide: userData.isGuide, // Ensure this field exists
                    } as UserData;
                })
                .filter((user) => user.isGuide); // Filter users with isGuide true

            setUsers(updatedUsers);
            setData(updatedUsers); // Update data for pagination and search
            setLoading(false);
        });

        // Cleanup listener on component unmount
        return () => unsubscribe();
    }, []);

    const handleAddGuide = async () => {
        if (!uniqueID) return;

        try {
            const usersCollection = collection(db, 'users');
            const q = query(usersCollection, where('userId', '==', uniqueID));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                alert('No user found with the provided ID');
                return;
            }

            // Assuming `uniqueId` is the document ID
            const userDoc = querySnapshot.docs[0];
            const uniqueId = userDoc.id; // Firestore document ID

            // Update the user document
            const userRef = doc(db, 'users', uniqueId);
            await updateDoc(userRef, { isGuide: true });

            toast.success('User successfully updated as a guide');
            setIsOpen(false);
            setUniqueID('');
            setIsOpen(false);
        } catch (error) {
            console.error('Error updating user document:', error);
            toast.error('Failed to update user');
        }
    };

    const handleDeleteGuide = async () => {
        try {
            if (!removeId) {
                alert('Invalid user ID');
                return;
            }

            // Get a reference to the user document using the uniqueId (document ID)
            const userRef = doc(db, 'users', removeId);

            // Update the `isGuide` field to false
            await updateDoc(userRef, { isGuide: false });
            toast.success('Guide role successfully removed!');
            setIsDialogOpen(false);
            setRemoveId('');
        } catch (error) {
            console.error('Error removing guide role:', error);
            toast.error('Failed to remove guide role. Please try again later.');
        }
    };

    if (loading) {
        return <LoadingData />
    }

    // useEffect(() => {
    //     // if (users.length === 0) return;

    //     let filteredQuizzes = users;

    //     // Filter by search term
    //     if (searchTerm) {
    //         filteredQuizzes = filteredQuizzes.filter((user) =>
    //             user.name.toLowerCase().includes(searchTerm.toLowerCase())
    //         );
    //     }
    // }, [searchTerm, users]);

    return (
        <div className="flex flex-col w-full  gap-4 p-8">
            <div className="flex flex-row justify-between items-center">
                <span className="text-lg font-semibold text-[#1D2939]">Users</span>
                <div className="flex flex-row gap-3">
                    {/* Search Button */}
                    <button className="h-[44px] w-[250px] rounded-md bg-[#FFFFFF] border border-solid border-[#D0D5DD] flex items-center">
                        <div className="flex flex-row items-center w-full gap-2 pl-2">
                            <Image
                                src="/icons/search-button.svg"
                                width={20}
                                height={20}
                                alt="Search Button"
                            />
                            <input
                                className="font-normal text-[#667085] text-sm placeholder:text-[#A1A1A1] rounded-md w-full px-1 py-1 focus:outline-none focus:ring-0 border-none"
                                placeholder="Search"
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </button>
                    <Popover placement="bottom-end"
                        isOpen={isOpen}
                        onOpenChange={() => setIsOpen(!isOpen)} >
                        <PopoverTrigger>
                            <button
                                className="h-[44px] w-auto px-6 py-2 bg-[#8501FF] focus:outline-none rounded-md shadow-inner-button border border-solid border-[#800EE2] flex items-center justify-center">
                                <span className="text-[#FFFFFF] font-semibold text-sm">Add New User</span>
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[304px] p-6 bg-[#FFFFFF] border-solid border-[#EAECF0] rounded-md gap-4">
                            <div className='flex flex-col gap-2'>
                                <span className='font-medium text-[#1D2939] text-sm'>Unique ID</span>
                                <div className='flex px-2 items-center h-[40px] border border-gray-300 focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB] focus-within:border-[#D7BBFC] focus-within:ring-4 focus-within:ring-[#E8DEFB] focus-within:outline-none transition-colors rounded-md'>
                                    <input
                                        className="font-normal text-[#667085] w-full text-sm placeholder:text-[#A1A1A1] rounded-md px-1 py-1 focus:outline-none focus:ring-0 border-none"
                                        placeholder="Enter Unique ID"
                                        type="text"
                                        value={uniqueID}
                                        onChange={(e) => setUniqueID(e.target.value)}
                                    />
                                </div>
                                <span className='text-[#667085] font-normal  text-sm'>You are allowed to add only Mentor/Guide role</span>
                            </div>
                            <div className='w-auto h-auto gap-4 flex flex-row'>
                                <button className='h-11 w-[120px] border border-solid border-[#EAECF0] rounded-md bg-[#FFFFFF] flex items-center justify-center hover:bg-[#F2F4F7]'
                                    onClick={() => setIsOpen(false)}>
                                    <span className='font-semibold text-[#1D2939] text-sm'>Cancel</span>
                                </button>
                                <button
                                    className={`h-11 w-[120px]  rounded-md flex items-center justify-center shadow-inner-button ${uniqueID ? 'bg-[#9012FF] border border-solid border-[#800EE2]' : 'bg-[#CDA0FC] cursor-not-allowed'}`}
                                    disabled={!uniqueID}
                                    onClick={handleAddGuide}>
                                    <span className='font-semibold text-[#FFFFFF] text-sm'>Add</span>
                                </button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            <div className="border border-[#EAECF0] rounded-xl overflow-x-auto">
                <table className="w-full bg-white rounded-xl ">
                    <thead>
                        <tr className="gap-[200px]">
                            <th className="w-[25%] text-left px-8 py-4 pl-8 rounded-tl-xl flex flex-row ">
                                <span className="text-[#667085] font-medium text-sm">Name</span>
                            </th>
                            <th className="w-[22%] text-start px-8 py-4 text-[#667085] font-medium text-sm">
                                <div className="flex flex-row justify-start gap-1">
                                    <p>User Id</p>
                                </div>
                            </th>
                            <th className="w-[22%] text-strart px-8 py-4 text-[#667085] font-medium text-sm">
                                <div className="flex flex-row justify-start gap-1">
                                    <p>Mobile No.</p>
                                </div>
                            </th>
                            <th className="w-[22%] px-8 py-4 text-[#667085] font-medium text-sm">
                                <div className="flex flex-row justify-start gap-1">
                                    <p>Role</p>
                                </div>
                            </th>
                            <th className="w-[9%] text-start px-8 py-4 rounded-tr-xl text-[#667085] font-medium text-sm">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((users, index) => (
                            <tr key={index} className="border-t border-solid border-[#EAECF0]">
                                <td className="py-[12px]">
                                    <div className="flex flex-row ml-8 gap-[10px] min-w-[260px]">
                                        <Image className="rounded-full object-cover" src={users.profilePic || '/defaultAdminDP.jpg'} alt="DP" width={38} height={38} />
                                        <div className="flex items-start justify-center flex-col mb-[2px]">
                                            <span className="font-semibold text-sm text-[#182230] whitespace-nowrap">{users.name}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-4 text-start text-[#101828] text-sm ">
                                    <span className="flex min-w-fit">{users.userId}</span>
                                </td>
                                <td className="px-8 py-4 text-start text-[#101828] text-sm ">
                                    <span className="flex min-w-fit">{users.phone}</span>
                                </td>
                                <td className="px-8 py-4 ">
                                    <div className="bg-[#F2F4F7] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6 w-[72px]">
                                        <span className="w-[6px] h-[6px] bg-[#182230] rounded-full"></span>
                                        <span className="font-medium text-[#182230] text-xs">Guide</span>
                                    </div>
                                </td>
                                <td className="flex items-center justify-center px-8 py-4">
                                    <button
                                        className="text-[#DE3024] font-medium text-sm cursor-pointer pt-[2px]"
                                        onClick={() => { setIsDialogOpen(true); setRemoveId(users.uniqueId) }} // Open the dialog on click
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Dialog open={isDialogOpen} onClose={close} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 flex items-center justify-center">
                    <DialogPanel className="bg-white rounded-2xl w-[480px] h-auto flex flex-col ">
                        <div className=' flex flex-col p-6 gap-2 border-solid border-[#EAECF0] border-b rounded-t-2xl'>
                            <div className='flex flex-row justify-between items-center'>
                                <h1 className='text-[#1D2939] font-bold text-lg'>Remove user from Guide Role?</h1>
                                <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                                    <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} onClick={() => setIsDialogOpen(false)} />
                                </button>
                            </div>
                            <span className='text-[#667085] font-normal text-sm'>Lorem ipsum is placeholder text commonly used</span>
                        </div>
                        <div className="flex flex-row justify-end mx-6 my-4 gap-4">
                            <button className="py-[0.625rem] px-6 border-2  border-solid border-[#EAECF0] font-semibold text-sm text-[#1D2939] rounded-md hover:bg-[#F2F4F7]" onClick={() => setIsDialogOpen(false)} >Cancel</button>
                            <button className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#BB241A] border border-[#DE3024] rounded-md" onClick={handleDeleteGuide} >Remove</button>
                        </div>
                    </DialogPanel>
                </div >
            </Dialog >
            <ToastContainer />
        </div>
    )
}
export default RoleManagementGuide;
