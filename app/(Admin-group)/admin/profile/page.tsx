"use client";
import Image from "next/image";
import EditProfile from "@/components/AdminComponents/RoleMangement/EditProfile";
import Logout from "@/components/AdminComponents/RoleMangement/Logout";
import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from 'firebase/auth'; // Import the User type from Firebase
import { auth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { getFirestore, doc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import LoadingData from "@/components/Loading";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type UserData = {
    name: string | null;
    uniqueId: string | null;  // This is the display ID (like "kushal#123") shown to users
    userId: string | null;     // This is the Firebase Authentication ID
    phone: string | null;
    role: string | null;
    profilePic: string | null;
};

function Profile() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true); // Track loading state
    const [user, setUser] = useState<User | null>(null);
    const [isEdit, setIsEdit] = useState(false);
    const openEdit = () => setIsEdit(true);
    const closeEdit = () => setIsEdit(false);
    const [islogout, setIslogout] = useState(false);
    const openlogout = () => setIslogout(true);
    const closelogout = () => setIslogout(false);
    const db = getFirestore();
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                console.error('No user is logged in');
                router.push("/admin-login");
                setLoading(false); // Ensure loading is set to false even when no user is found
            }
        });

        return () => unsubscribe();
    }, [router]);

    useEffect(() => {
        let unsubscribeFromSnapshot: () => void;
        if (user) {
            // Use auth UID as the document ID (userId)
            const userDocRef = doc(db, `admin/${user.uid}`);

            unsubscribeFromSnapshot = onSnapshot(userDocRef, (docSnapshot) => {
                if (docSnapshot.exists()) {
                    const data = docSnapshot.data() as UserData;
                    setUserData(data);
                    setLoading(false);
                } else {
                    console.error('No user data found!');
                    setLoading(false);
                }
            }, (err) => {
                console.error('Error fetching real-time updates:', err);
                setLoading(false);
            });
        }

        return () => {
            if (unsubscribeFromSnapshot) {
                unsubscribeFromSnapshot();
            }
        };
    }, [user, db]);

    // Function to split name into first and last names
    const getFirstAndLastName = (fullName: string | null) => {
        if (!fullName) return { firstName: "", lastName: "" };
        const nameParts = fullName.split(" ");
        return {
            firstName: nameParts[0] || "",
            lastName: nameParts.slice(1).join(" ") || ""
        };
    };

    const { firstName, lastName } = getFirstAndLastName(userData?.name || "");

    if (loading) {
        return <LoadingData />;
    }

    return (
        <div className="flex justify-center w-full h-full">
            <div className="mt-8 flex h-[298px] w-[588px] bg-[#FFFFFF] gap-6 flex-col border border-solid border-[#EAECF0] rounded-md p-6">
                <div className="flex flex-row justify-between h-[72px] w-auto items-center">
                    <div className="flex flex-row gap-2 h-10 items-center">
                        <Image className="rounded-full" src={userData?.profilePic || '/defaultAdminDP.jpg'} alt="DP" width={72} height={72} />
                        <div className="flex flex-col ">
                            <span className="text-[#1D2939] font-semibold text-[22px]">{userData?.name}</span>
                            <span className="font-normal text-[#667085] text-base">{userData?.role}</span>
                        </div>
                    </div>
                    <div className="flex flex-row gap-3">
                        <button className="py-2 px-4 bg-[#FFFFFF] hover:bg-[#F2F4F7] gap-2 h-[40px] w-auto items-center border border-solid border-[#EAECF0] rounded-[8px] flex flex-row justify-between"
                            onClick={openEdit} >
                            <Image src="/icons/edit-02.svg" width={18} height={18} alt="edit" />
                            <span className="text-sm text-[#0C111D] font-normal">Edit</span>
                        </button>
                        <button className="py-2 px-4 bg-[#FFFFFF] hover:bg-[#FEE4E2] gap-2 h-[40px] w-auto items-center border border-solid border-[#EAECF0] rounded-[8px] flex flex-row justify-between"
                            onClick={openlogout}>
                            <Image src="/icons/logout-03.svg" width={18} height={18} alt="logout" />
                            <span className="text-sm text-[#DE3024] font-normal">Log out</span>
                        </button>
                    </div>
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
                        <span className="font-semibold text-[#1D2939] text-[16px]">{userData?.uniqueId}</span>
                    </div>
                    <div className="flex flex-col w-1/2">
                        <span className="font-normal text-[#667085] text-[16px]">Mobile No.</span>
                        <span className="font-semibold text-[#1D2939] text-[16px]">{userData?.phone}</span>
                    </div>
                </div>
            </div>

            {/* Dailog for Log out */}
            {islogout && <Logout onclose={closelogout} open={true} />}
            {/* Dialog Component  for Edit*/}
            {isEdit && <EditProfile close={closeEdit} open={true} uniqueId={user?.uid || ''} />}
            <ToastContainer />

        </div>
    );
}

export default Profile;
