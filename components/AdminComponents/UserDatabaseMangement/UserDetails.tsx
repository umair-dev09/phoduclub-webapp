"use client";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState, useEffect } from "react";
import { doc, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from "@/firebase";
import LoadingData from "@/components/Loading";
import EditUserDialog from "./EditUserDialog";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type UserDetailsProps = {
    userId: string;
}

interface UserData {
    name: string;
    email: string;
    userId: string;
    phone: string;
    profilePic: string;
    isPremium: boolean;
    createdAt: string;
    targetYear: string;
    targetExams: string[];
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

function UserDetails({ userId }: UserDetailsProps) {   
    const [phone, setPhone] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const closeEdit = () => setOpenDialog(false);

    useEffect(() => {
        if (!userId) return;

        const userDocRef = doc(db, 'users', userId);

        // Listen for real-time changes in the admin document
        const unsubscribe = onSnapshot(userDocRef, (userDocSnap) => {
            if (userDocSnap.exists()) {
                setUser(userDocSnap.data() as UserData);
            } else {
                console.error('User data not found');
            }
            setLoading(false); // Set loading to false after fetching data
        }, (error) => {
            console.error('Error fetching real-time data:', error);
            setLoading(false);
        });

        // Cleanup function to unsubscribe from the real-time listener
        return () => unsubscribe();
    }, [userId]); // Re-run this effect when userId changes

    useEffect(() => {
        if (user) {
            const nameParts = user?.name.split(' ');
            setFirstName(nameParts[0] || '');
            setLastName(nameParts[1] || '');

        }
    });

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const closeDialog = () => {
        setOpenDialog(false);
    };

    if (loading) {
        return <LoadingData />
    }

    const colors = ['bg-red-500', 'bg-orange-500', 'bg-green-500', 'bg-blue-500']

    return (
        <div className="flex flex-col m-8 gap-6">
            <h1 className="text-[#1D2939] font-semibold text-lg">User Details</h1>
            <div className="flex flex-row justify-between w-full h-[72px]">
                <div className="flex flex-row gap-3">
                    <div className="relative">

                        <Image className="rounded-full w-[72px] h-[72px]" src={user?.profilePic || "/images/DP_Lion.svg"} alt="DP" width={72} height={72} />
                        {user?.isPremium && (
                            <Image
                                className="absolute right-0 bottom-0"
                                src="/icons/winnerBatch.svg"
                                alt="Batch"
                                width={32}
                                height={32}
                            />
                        )}
                    </div>
                    <div className="flex items-start flex-col justify-center">
                        <div className="font-semibold text-[#1D2939] text-2xl">{user?.name}</div>
                        <div className="flex justify-start items-start text-[16px] font-medium text-[#667085]">{user?.userId}</div>
                    </div>
                </div>
                <button
                    onClick={handleOpenDialog}
                    className="p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] w-[84px] items-center"
                >
                    <Image src="/icons/edit-icon.svg" width={18} height={18} alt="Edit-quiz" />
                    <span className="text-sm text-[#0C111D] font-normal">Edit</span>
                </button>
            </div>
            <hr />
            <div className="flex flex-row w-full">
                <div className="flex flex-col w-1/2">
                    <span className="font-normal text-[#667085] text-[16px]">First Name</span>
                    <span className="font-semibold text-[#1D2939] text-[16px]">{firstName}</span>
                </div>
                <div className="flex flex-col w-1/2">
                    <span className="font-normal text-[#667085] text-[16px]">Last Name</span>
                    <span className="font-semibold text-[#1D2939] text-[16px]">{lastName}</span>
                </div>
            </div>
            <div className="flex flex-row w-full">
                <div className="flex flex-col w-1/2">
                    <span className="font-normal text-[#667085] text-[16px]">User ID</span>
                    <span className="font-semibold text-[#1D2939] text-[16px]">{user?.userId}</span>
                </div>
                <div className="flex flex-col w-1/2">
                    <span className="font-normal text-[#667085] text-[16px]">Mobile No.</span>
                    <span className="font-semibold text-[#1D2939] text-[16px]">{user?.phone}</span>
                </div>
            </div>
            <div className="flex flex-col w-full">
                <span className="font-normal text-[#667085] text-[16px]">Joining Date</span>
                <span className="font-semibold text-[#1D2939] text-[16px]">{formatFirestoreTimestamp(user?.createdAt || '')}</span>
            </div>
            <hr />
            <p className="font-semibold text-[#1D2939] text-lg">Exam Details</p>
            <div className="flex flex-col gap-2 ">
                <span className="text-[#667085] font-normal text-base">Preparing Exams</span>
                <div className='flex flex-wrap gap-2'>
                    {user?.targetExams?.map((exam, index) => {
                        let examColor = '';
                        switch (exam) {

                            case 'JEE':
                                examColor = '#F04438'; // Red
                                break;
                            case 'BITSAT':
                                examColor = '#F79009'; // Orange
                                break;
                            case 'VITEEE':
                                examColor = '#17B26A'; // Green
                                break;
                            case 'SRMJEEE':
                                examColor = '#2E90FA'; // Purple
                                break;
                            case 'KCET':
                                examColor = '#1177BB'; // Blue
                                break;
                            case 'COMEDK':
                                examColor = '#F04438'; // Red
                                break;
                            case 'MET':
                                examColor = '#F79009'; // Orange
                                break;
                            default:
                                examColor = '#CCCCCC'; // Default gray color
                                break;

                        }
                        return (
                            <div key={index} className='flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 font-medium border border-solid border-[#D0D5DD] rounded-full cursor-pointer hover:bg-gray-100'>
                                <span className="w-2 h-2 rounded-[50%] mr-1"
                                    style={{ background: examColor }}></span>
                                {exam}
                            </div>
                        );
                    })}
                </div>

            </div>
            <div className="flex flex-col gap-2 ">
                <span className="text-[#667085] font-normal text-base">Target Year</span>
                <div className="flex flex-wrap gap-2">
                    {user?.targetYear}
                </div>
            </div>
            {openDialog && <EditUserDialog name={user?.name || ''} email={user?.email || ''} phonee={user?.phone || ''} targetExams={user?.targetExams || []} targetYear={user?.targetYear || ''} profilePic={user?.profilePic || ''} userIdd={user?.userId || ''} authId={userId} isPremium={user?.isPremium || false} open={true} onClose={closeEdit} />}

        </div>
    );
}

export default UserDetails;
