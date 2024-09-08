"use client";

import styles from './Profile.module.css';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Target from '@/components/DashboardComponents/SettingComponents/ProfileComponents/Target';
import EmailUpdate from './EditProfileComponents/EmailUpdate';
import ProfilePicUpdate from './EditProfileComponents/ProfilePicUpdate';
import TargetExamUpdate from './EditProfileComponents/TargetExamUpdate';
import TargetYearUpdate from './EditProfileComponents/TargetYearUpdate';
import PhoneUpdate from './EditProfileComponents/PhoneUpdate';
import { auth } from '@/firebase';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth'; // Import the User type from Firebase
import { userAgent } from 'next/server';
import LoadingData from '@/components/Loading';

type UserData = {
    name: string | null;
    // userId: string | null;
    // profilePic: string | null;
};


function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [isNameEditing, setIsNameEditing] = useState(false);
    const [isEmailEditing, setIsEmailEditing] = useState(false);
    const [isPhoneEditing, setIsPhoneEditing] = useState(false);
    const [isYearEditing, setIsYearEditing] = useState(false);
    const [copied, setCopied] = useState(false);

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
        return <LoadingData />;
    }


    const handleEditProfile = () => {
        setIsEditing(!isEditing);
    };
    const handleCopy = () => {
        navigator.clipboard.writeText("john#9843")
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000); // Hide the message after 2 seconds
            })
            .catch(err => console.error('Failed to copy text: ', err));
    };

    return (
        <div className={styles.container}>
            <div className={styles.mainProfileContent}>
                <div className={styles.info}>
                    <div className={styles.nameSection}>
                        <div className={styles.nameInfo}>
                            <div className={styles.dp}>
                                <Image
                                    src='/defaultDP.svg'
                                    alt="profile-image"
                                    width={72}
                                    height={72}
                                />
                            </div>
                            <div className={styles.nameId}>
                                {/* Name and ID */}
                                {!isEditing && (
                                    <div className={styles.johnName}>
                                        <span className={styles.actualProfileName} >{userData?.name}</span>
                                    </div>
                                )}
                                {!isEditing && (
                                    <div className={styles.actualId}>
                                        <div><span className={styles.id}>john#9843</span></div>
                                        <div className={styles.copyButtons}>
                                            <div className={styles.copyIcon}>
                                                <button className={styles.copyButton} onClick={handleCopy}>
                                                    <Image
                                                        src="/icons/CopyButton.svg"
                                                        alt="copy buttons"
                                                        height={22}
                                                        width={22}
                                                    />
                                                </button>
                                                {copied && <span className={styles.copyMessage}>Copied!</span>}

                                            </div>
                                        </div>
                                        {isEditing && (
                                            <div className={styles.sizeRecommendation}>File size must be less than 5MB</div>
                                        )}
                                    </div>
                                )}

                                {/* Conditionally show Change and Remove buttons */}
                                {isEditing && (
                                    <div className={styles.changeRemove}>
                                        <div className={styles.buttonGroup}>
                                           <ProfilePicUpdate/>
                                            <button className={styles.removeButton}>
                                                <p className={styles.removeText}>Remove</p>
                                            </button>
                                        </div>
                                        <span className={styles.files}>File size must be less than 5MB</span>
                                    </div>
                                )}


                            </div>
                        </div>
                        <div className={styles.editProfile}>
                            {!isEditing && (
                                <button className={styles.editProfileButton} onClick={handleEditProfile}>
                                    <Image
                                        className={styles.editIcon}
                                        src="/icons/pencil-edit.svg"
                                        alt="edit-icon"
                                        width={24}
                                        height={24} />
                                    <p className={styles.editText}>Edit Profile</p>
                                </button>
                            )}
                        </div>
                    </div>
                    <div className={styles.examSection}>
                        <div className={styles.enrolledExams}>
                            <Target />
                        </div>
                        {isEditing && (
                          <TargetExamUpdate/>
                        )}
                    </div>
                </div>

                <div className={styles.divider}><hr /></div>


                <div className={styles.name}>
                    <div className={styles.label}>
                        {!isEditing && (
                            <div className={styles.icon}>
                                <Image
                                    className={styles.actualIcon}
                                    src="/icons/Name.svg"
                                    alt="demo-icon"
                                    height={24}
                                    width={24}
                                />
                            </div>
                        )}
                        <div className={styles.UserDetail}>
                            <p className={styles.label}>Full Name</p>
                            {isEditing && (
                                <input
                                    id="input"
                                    type="text"

                                    className={styles.input}
                                />
                            )}
                        </div>
                    </div>
                    {!isEditing && (
                        <span className={styles.username}>Jabir Ali</span>
                    )}
                </div>

                <div className={styles.divider}><hr /></div>

                <div className={styles.name}>
                    <div className={styles.label}>
                        {!isEditing && (
                            <div className={styles.icon}>
                                <Image
                                    className={styles.actualIcon}
                                    src="/icons/Email.svg"
                                    alt="demo-icon"
                                    height={24}
                                    width={24}
                                />
                            </div>
                        )}
                        <div className={styles.UserDetail}>
                            <p className={styles.label}>Email</p>
                            {isEditing && (
                                <p className={styles.afterEdit}>jabir@gmail.com</p>
                            )}
                            
                        </div>
                    </div>
                    {!isEditing && (
                        <span className={styles.username}>jabir@gmail.com</span>
                    )}
                    {isEditing && (
                        <EmailUpdate/>
                    )}
                </div>

                <div className={styles.divider}><hr /></div>

                <div className={styles.name}>
                    <div className={styles.label}>
                        {!isEditing && (
                            <div className={styles.icon}>
                                <Image
                                    className={styles.actualIcon}
                                    src="/icons/phoneNumber.svg"
                                    alt="demo-icon"
                                    height={24}
                                    width={24}
                                />
                            </div>
                        )}
                        <div className={styles.UserDetail}>
                            <p className={styles.label}>Phone Number</p>
                            {isEditing && (
                                <p className={styles.afterEdit}>+91 7898525987</p>
                            )}
                            
                        </div>
                    </div>
                    {!isEditing && (
                        <span className={styles.username}>+91 7898525987</span>
                    )}
                    {isEditing && (
                        <PhoneUpdate/>
                    )}
                </div>

                <div className={styles.divider}><hr /></div>

                <div className={styles.name}>
                    <div className={styles.label}>
                        {!isEditing && (
                            <div className={styles.icon}>
                                <Image
                                    className={styles.actualIcon}
                                    src="/icons/TargetYear.svg"
                                    alt="demo-icon"
                                    height={24}
                                    width={24}
                                />
                            </div>
                        )}
                        <div className={styles.UserDetail}>
                            <p className={styles.label}>Target Year</p>
                            {isEditing && (
                                <p className={styles.afterEdit}>2024</p>
                            )}
                            
                        </div>
                    </div>
                    {!isEditing && (
                        <span className={styles.username}>2024</span>
                    )}
                    {isEditing && (
                      <TargetYearUpdate/>
                    )}
                </div>
            </div>

            {isEditing && (
                <div className={styles.base}>
                    <div className={styles.insideBase}>
                        <div className={styles.cancel}>
                            <button className={styles.cancleButton} onClick={() => {
                                setIsNameEditing(false);
                                setIsEmailEditing(false);
                                setIsPhoneEditing(false);
                                setIsYearEditing(false);
                                setIsEditing(false);
                            }}>Cancel</button>
                        </div>
                        <div className={styles.saveChanges}>
                            <button className={styles.saveChangesButton}>Save Changes</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Profile;