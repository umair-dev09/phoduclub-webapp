"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from "@nextui-org/react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { useEffect, useState } from 'react';
import { auth } from '@/firebase';
import { onAuthStateChanged, User, signOut } from 'firebase/auth'; // Import the User type from Firebase
import { getFirestore, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { toast } from 'react-toastify';
import AdminHeaderLoading from './AdminHeaderLoading';
import Logout from '../AdminComponents/RoleMangement/Logout';

interface HeaderProps {
    currentPage: string;
}
type UserData = {
    name: string | null;
    adminId: string | null;
    profilePic: string | null;
    role: string | null;
};
function Header({ currentPage }: HeaderProps) {
    const router = useRouter();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(false); // Track error state
    const [user, setUser] = useState<User | null>(null);
    const [islogout, setIslogout] = useState(false);
    const openlogout = () => setIslogout(true);
    const closelogout = () => setIslogout(false);
    const db = getFirestore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const userDocRef = doc(db, `admin/${currentUser.uid}`);

                try {
                    const docSnapshot = await getDoc(userDocRef);
                    if (docSnapshot.exists()) {
                        const data = docSnapshot.data() as UserData;
                        setUserData(data);
                        setLoading(false);
                    } else {
                        console.error("User ID not found in Firestore!");
                        setError(true);
                        router.push("/admin-login");
                    }
                } catch (err) {
                    console.error("Error fetching user data:", err);
                    setError(true);
                }
            } else {
                console.error('No user is logged in');
                setError(true);
                router.push("/admin-login");
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [db, router]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                console.error('No user is logged in');
                setError(true); // Set error if no user is logged in
                setLoading(false); // Ensure loading is set to false even when no user is found
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        let unsubscribeFromSnapshot: () => void;
        if (user) {
            const uniqueId = user.uid;
            const userDocRef = doc(db, `admin/${uniqueId}`);

            unsubscribeFromSnapshot = onSnapshot(userDocRef, (docSnapshot) => {
                if (docSnapshot.exists()) {
                    const data = docSnapshot.data() as UserData;
                    setUserData(data);

                    setLoading(false);
                } else {
                    console.error('No user data found!');
                    setError(true);
                    setLoading(false);
                }
            }, (error) => {
                console.error('Error fetching real-time updates:', error);
                setError(true);
                setLoading(false);
            });
        }

        return () => {
            if (unsubscribeFromSnapshot) {
                unsubscribeFromSnapshot();
            }
        };
    }, [user, db]);

    // Display loading or error component while data is being fetched or if there's an error
    if (loading || error) {
        return <AdminHeaderLoading />;
    }

    const isBackPage = currentPage === 'Back to Quizzes Management' || currentPage === 'Back to Test Series Management' || currentPage === 'Back to Customer Care' || currentPage === 'Back to Messenger' || currentPage === 'Back to Course Management' || currentPage === 'Back to User Database' || currentPage === 'Back to Role Management';

    return (
        <div className="flex w-full flex-row items-center justify-between px-6 bg-white h-[65px] rounded-t border border-b-[#e9ebf0]">
            <div className="flex flex-row items-center gap-2 text-lg">
                {isBackPage && (
                    <button onClick={() => router.back()}>
                        <Image src='/icons/arrow-left-02-round.svg' alt='back' width={24} height={24} />
                    </button>
                )}
                {currentPage !== 'My Profile' && (
                    <h2 className={!isBackPage ? "" : "text-[#667085] text-base font-medium"}>
                        {currentPage || ''}
                    </h2>
                )}
                {currentPage === 'My Profile' && (
                    <h2 className='text-lg text-[#1D2939] font-bold'>My Profile</h2>
                )}
            </div>

            <div className="flex flex-row items-center gap-4">
                <Popover placement="bottom-end">
                    <PopoverTrigger>
                        <button className='flex flex-row gap-3 items-center justify-center'>
                            <Image className='rounded-full' src={userData?.profilePic || "/defaultDP.svg"} alt="DP" width={40} height={40} />
                            <div className='flex flex-col items-center justify-center'>
                                <span className='text-[#1D2939] font-semibold text-sm mt-[4px] mb-[-5px]'>{userData?.name}</span>
                                <span className='text-[#667085] text-[13px] font-medium self-start'>{userData?.role}</span>
                            </div>
                            <Image src="/icons/by-role-arrow-down.svg" width={20} height={20} alt="Select-date Button" />
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="flex flex-col bg-white border border-lightGrey rounded-md w-[167px] px-0 shadow-md">
                        <button
                            className="flex items-center p-3 hover:bg-[#F2F4F7] w-full"
                            onClick={() => router.push('/admin/profile')}
                        >
                            <Image src="/icons/profile.svg" width={18} height={18} alt="Edit-profile" />
                            <p className="text-sm text-[#0C111D] ml-2">My profile</p>
                        </button>
                        <button className="flex items-center p-3 hover:bg-[#F2F4F7] w-full" onClick={openlogout}>
                            <Image src="/icons/logout-03.svg" width={18} height={18} alt="Log out" />
                            <p className="text-sm text-[#DE3024] ml-2">Log out</p>
                        </button>
                    </PopoverContent>
                </Popover>
            </div>
            {islogout && <Logout onclose={closelogout} open={true} />}
        </div>
    );
}

export default Header;