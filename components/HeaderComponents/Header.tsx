"use client";
import NotficationDropDown from './NotificationDropdown';
import styles from '/components/DashboardComponents/TabComps.module.css';
import Image from 'next/image';
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover';
import { auth } from '@/firebase';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth'; // Import the User type from Firebase

type UserData = {
    name: string | null;
    userId: string | null;
    profilePic: string | null;
};

function Header() {
    const [userData, setUserData] = useState<UserData>({
        name: 'Loading...',       // Default dummy values
        userId: 'Loading...',
        profilePic: '/defaultDP.svg'
    }); // Set default values
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null); // Set the user type to User | null
    const db = getFirestore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser); // Set the user with the correct User type
            } else {
                console.error('No user is logged in');
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) {
                const uniqueId = user.uid;
                const userDoc = doc(db, `users/${uniqueId}`);
                const userSnapshot = await getDoc(userDoc);

                if (userSnapshot.exists()) {
                    const data = userSnapshot.data() as UserData; // Cast Firestore data to UserData type
                    setUserData(data);
                } else {
                    console.error('No user data found!');
                }
                setLoading(false);
            }
        };

        if (user) {
            fetchUserData();
        }
    }, [user]);

    return (
        <div>
            <div className={styles.headtab}>
                <div className={styles.greeting}>
                    <h2>
                        <span id="hi">Hey, <span>{loading ? 'Loading...' : userData.name}</span>,</span> Keep up the great work!
                    </h2>
                </div>
                
                <div className={styles.profileParentLyt}>
                    <div className={styles.help}>
                        <button className={styles.headerButton}>
                            <Image src="/icons/help-circle.svg" width={16} height={16} alt="Help Icon" />
                        </button>
                    </div>
                    <NotficationDropDown />
                    <div className={styles.divider1} />
                    <Popover placement="bottom">
                        <PopoverTrigger>
                            <div className={styles.profileChildLyt}>
                                <Image className={styles.profilePic} src={loading ? "/defaultDP.svg" : userData.profilePic || "/defaultDP.svg"} width={34} height={34} quality={100} alt="Profile Picture" />
                                <div className={styles.headerInfo}>
                                    <p className={styles.headerName}>{loading ? 'Loading...' : userData.name}</p>
                                    <p className={styles.headerEmail}>{loading ? 'Loading...' : userData.userId}</p>
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
