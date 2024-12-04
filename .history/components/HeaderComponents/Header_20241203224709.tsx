"use client";
import NotficationDropDown from './NotificationDropdown';
import styles from '../../components/DashboardComponents/TabComps.module.css';
import Image from 'next/image';
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover';
import { auth } from '@/firebase';
import { getFirestore, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { Skeleton } from "@nextui-org/skeleton";
import LoadingData from '../Loading';
import HeaderLoading from './HeaderLoading';
import HelpDropDown from './HelpDropdown';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

type UserData = {
    name: string | null;
    userId: string | null;
    profilePic: string | null;
};

function Header() {
    const router = useRouter();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const db = getFirestore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const userDocRef = doc(db, `users/${currentUser.uid}`);

                try {
                    const docSnapshot = await getDoc(userDocRef);
                    if (docSnapshot.exists()) {
                        setUserData(docSnapshot.data() as UserData);
                        setLoading(false);
                    } else {
                        // console.error("User ID not found in Firestore!");
                        setError(true);
                        router.push("/login");
                    }
                } catch (err) {
                    console.error("Error fetching user data:", err);
                    setError(true);
                }
            } else {
                // console.error('No user is logged in');
                setError(true);
                router.push("/login");
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [db, router]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success("Logged out successfully!");
            router.push("/login");
        } catch (error) {
            toast.error("Error logging out. Please try again.");
            console.error("Error logging out:", error);
        }
    };

    if (loading || error) {
        return <HeaderLoading />;
    }

    return (
        <div>
            <div className={styles.headtab}>
                <div className={styles.greeting}>
                    <h2>
                        <span id="hi">Hey, <span>{userData?.name}</span>,</span> Keep up the great work!
                    </h2>
                </div>

                <div className={styles.profileParentLyt}>
                    <HelpDropDown />
                    <NotficationDropDown />
                    <div className={styles.divider1} />
                    <Popover placement="bottom">
                        <PopoverTrigger>
                            <div className='flex flex-row items-center'>
                                <Image className={styles.profilePic} src={userData?.profilePic || "/defaultDP.svg"} width={38} height={38} quality={100} alt="Profile Picture" />
                                <div className='flex flex-col ml-1 mr-1'>
                                    <p className='font-semibold text-[14px] mb-[-2px]'>{userData?.name}</p>
                                    <p className='text-[13px] text-[#667085]'>{userData?.userId}</p>
                                </div>
                                <button className={styles.arrowButton}>
                                    <Image className={styles.arrowIcon} src="/icons/arrowHeader.svg" width={15} height={15} alt="Arrow Icon" />
                                </button>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className={styles.profilePopup}>

                            <button className={styles.myProfButton}>
                                <Image className={styles.profPopupIcon} src="/icons/user-circle.svg" width={18} height={18} alt="Profile Icon" />
                                <p className={styles.profPopupText1}>My profile</p>
                            </button>
                            <div>
                                <button className={styles.logoutProfButton} onClick={handleLogout}>
                                    <Image className={styles.profPopupIcon} src="/icons/logout.svg" width={18} height={18} alt="Logout Icon" />
                                    <p className={styles.profPopupText2}>Log out</p>
                                </button>
                            </div>

                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    );
}

export default Header;
