"use client";

import styles from './Profile.module.css';
import Image from 'next/image';
import { useState } from 'react';
import Target from '@/components/DashboardComponents/SettingComponents/ProfileComponents/Target';

function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [isNameEditing, setIsNameEditing] = useState(false);
    const [isEmailEditing, setIsEmailEditing] = useState(false);
    const [isPhoneEditing, setIsPhoneEditing] = useState(false);
    const [isYearEditing, setIsYearEditing] = useState(false);

    const handleEditProfile = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <div className={styles.nameSection}>
                    <div className={styles.nameInfo}>
                        <div className={styles.dp}>
                            DP
                        </div>
                        <div className={styles.nameId}>
                            {/* Name and ID */}
                            {!isEditing && (
                                <div className={styles.name}>
                                    <p>John Smith</p>
                                </div>
                            )}
                            {!isEditing && (
                                <div className={styles.actualId}>
                                    <div><p>john#9843</p></div>
                                    <div className={styles.copyButtons}>
                                        <div className={styles.copyIcon}><button>CP</button></div>
                                    </div>
                                </div>
                            )}

                            {/* Conditionally show Change and Remove buttons */}
                            {isEditing && (
                                <div className={styles.changeRemove}>
                                    <button className={styles.changeButton}>
                                        <Image
                                            className='edit-icon'
                                            src="/icons/edit-profile.png"
                                            alt="edit-icon"
                                            width={24}
                                            height={24} />
                                        Change
                                    </button>
                                    <button className={styles.removeButton}>Remove</button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={styles.editProfile}>
                        {!isEditing && (
                            <button className={styles.editProfileButton} onClick={handleEditProfile}>
                                <Image
                                    className={styles.editIcon}
                                    src="/icons/edit-profile.png"
                                    alt="edit-icon"
                                    width={24}
                                    height={24} />
                                <p>Edit Profile</p>
                            </button>
                        )}
                    </div>
                </div>
                <div className={styles.examSection}>
                    <div className={styles.enrolledExams}>
                        <Target />
                    </div>
                    {isEditing && (
                        <div className={styles.updateIcon}><button className={styles.updateIconButton}>Update</button></div>
                    )}
                </div>
            </div>

            <div className={styles.divider}><hr /></div>

            <div className={styles.name}>
                <div className={styles.label}>
                    <div className={styles.icon}>
                        <Image
                            className={styles.actualIcon}
                            src="/icons/demo.png"
                            alt="demo-icon"
                            height={24}
                            width={24}
                        />
                    </div>
                    <div className={styles.UserDetail}>
                        <label htmlFor="Name">Name</label>
                        {isNameEditing && (
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
                {isEditing && (
                    <div className={styles.updateName}>
                        <button className={styles.updateNameButton} onClick={() => setIsNameEditing(true)}>Update</button>
                    </div>
                )}
            </div>

            <div className={styles.divider}><hr /></div>

            <div className={styles.name}>
                <div className={styles.label}>
                    <div className={styles.icon}>
                        <Image
                            className={styles.actualIcon}
                            src="/icons/demo.png"
                            alt="demo-icon"
                            height={24}
                            width={24}
                        />
                    </div>
                    <div className={styles.UserDetail}>
                        <label htmlFor="email">Email</label>
                        {isEmailEditing && (
                            <input
                                id="input"
                                type="text"
                                className={styles.input}

                            />
                        )}
                    </div>
                </div>
                {!isEditing && (
                    <span className={styles.username}>jabir@gmail.com</span>
                )}
                {isEditing && (
                    <div className={styles.updateEmail}>
                        <button className={styles.updateEmailButton} onClick={() => setIsEmailEditing(true)}>Update</button>
                    </div>
                )}
            </div>
            <div className={styles.divider}><hr /></div>

            <div className={styles.name}>
                <div className={styles.label}>
                    <div className={styles.icon}>
                        <Image
                            className={styles.actualIcon}
                            src="/icons/demo.png"
                            alt="demo-icon"
                            height={24}
                            width={24}
                        />
                    </div>
                    <div className={styles.UserDetail}>
                        <label htmlFor="Phone">Phone Number</label>
                        {isPhoneEditing && (
                            <input
                                id="input"
                                type="numbers"
                                className={styles.input}
                            />
                        )}
                    </div>
                </div>
                {!isEditing && (
                    <span className={styles.username}>+91 7898525987</span>
                )}
                {isEditing && (
                    <div className={styles.updateMob}>
                        <button className={styles.updateMobButton} onClick={() => setIsPhoneEditing(true)}>Update</button>
                    </div>
                )}
            </div>
            <div className={styles.divider}><hr /></div>

            <div className={styles.name}>
                <div className={styles.label}>
                    <div className={styles.icon}>
                        <Image
                            className={styles.actualIcon}
                            src="/icons/demo.png"
                            alt="demo-icon"
                            height={24}
                            width={24}
                        />
                    </div>
                    <div className={styles.UserDetail}>
                        <label htmlFor="Year">Target Year</label>
                        {isYearEditing && (
                            <input
                                id="input"
                                type="numbers"
                                className={styles.input}
                            />
                        )}
                    </div>
                </div>
                {!isEditing && (
                    <span className={styles.username}>2024</span>
                )}
                {isEditing && (
                    <div className={styles.updateYear}>
                        <button className={styles.updateYearButton} onClick={() => setIsYearEditing(true)}>Update</button>
                    </div>
                )}
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