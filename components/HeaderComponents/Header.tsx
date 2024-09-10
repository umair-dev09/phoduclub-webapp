"use client";
import NotficationDropDown from './NotificationDropdown';
import styles from '/components/DashboardComponents/TabComps.module.css';
import Image from 'next/image';
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover';
import { auth } from '@/firebase';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth'; // Import the User type from Firebase
import {Skeleton} from "@nextui-org/skeleton";
import LoadingData from '../Loading';
import HeaderLoading from './HeaderLoading';
import HelpDropDown from './HelpDropdown';

type UserData = {
    name: string | null;
    userId: string | null;
    profilePic: string | null;
};

function Header() {
    const [userData, setUserData] = useState<UserData | null>(null); 
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(false); // Track error state
    const [user, setUser] = useState<User | null>(null); 
    const db = getFirestore();
  
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
        const fetchUserData = async () => {
            try {
                if (user) {
                    const uniqueId = user.uid;
                    const userDoc = doc(db, `users/${uniqueId}`);
                    const userSnapshot = await getDoc(userDoc);
    
                    if (userSnapshot.exists()) {
                        const data = userSnapshot.data() as UserData; 
                        setUserData(data);
                    } else {
                        console.error('No user data found!');
                        setError(true); // Set error if no user data is found
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError(true); // Set error if fetching data fails
            } finally {
                setLoading(false); // Ensure loading is set to false after fetching data
            }
        };
    
        if (user) {
            fetchUserData();
        }
    }, [user, db]);
  
    // Display loading or error component while data is being fetched or if there's an error
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
                    <HelpDropDown/>
                    <NotficationDropDown />
                    <div className={styles.divider1} />
                    <Popover placement="bottom">
                        <PopoverTrigger>
                            <div className={styles.profileChildLyt}>
                                <Image className={styles.profilePic} src={userData?.profilePic || "/defaultDP.svg"} width={38} height={38} quality={100} alt="Profile Picture" />
                                <div className={styles.headerInfo}>
                                    <p className={styles.headerName}>{userData?.name}</p>
                                    <p className={styles.headerEmail}>{userData?.userId}</p>
                                </div>
                                <button className={styles.arrowButton}>
                                    <Image className={styles.arrowIcon} src="/icons/arrowHeader.svg" width={15} height={15} alt="Arrow Icon" />
                                </button>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className={styles.profilePopup}>
                                <button className={styles.myProfButton}>
                                    <Image className={styles.profPopupIcon} src="/icons/user-circle.svg" width={18} height={18} alt="Profile Icon" />
                                    <p className={styles.profPopupText1}>My profile</p>
                                </button>
                                <button className={styles.logoutProfButton}>
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
