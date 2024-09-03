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
        setIsEditing(prev => !prev);
    };

    const handleCancel = () => {
        setIsNameEditing(false);
        setIsEmailEditing(false);
        setIsPhoneEditing(false);
        setIsYearEditing(false);
        setIsEditing(false);
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
                            {!isEditing && (
                                <>
                                    <div className={styles.name}>
                                        <p>John Smith</p>
                                    </div>
                                    <div className={styles.actualId}>
                                        <div><p>john#9843</p></div>
                                        <div className={styles.copyButtons}>
                                            <div className={styles.copyIcon}>
                                                <button>CP</button>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
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
                    {!isEditing && (
                        <div className={styles.editProfile}>
                            <button className={styles.editProfileButton} onClick={handleEditProfile}>
                                <Image
                                    className='edit-icon'
                                    src="/icons/edit-profile.png"
                                    alt="edit-icon"
                                    width={24}
                                    height={24} />
                                Edit Profile
                            </button>
                        </div>
                    )}
                </div>

                <div className={styles.examSection}>
                    <div className={styles.enrolledExams}>
                        <Target />
                    </div>
                    {isEditing && (
                        <div className={styles.updateIcon}>
                            <button className={styles.updateIconButton}>Update</button>
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.divider}><hr /></div>

            {['Name', 'Email', 'Phone Number', 'Target Year'].map((label, index) => {
                const editingStates = [isNameEditing, isEmailEditing, isPhoneEditing, isYearEditing];
                const editingState = editingStates[index];
                const currentValue = ['Jabir Ali', 'jabir@gmail.com', '+91 7898525987', '2024'][index];
                const updateHandlers = [
                    () => setIsNameEditing(true),
                    () => setIsEmailEditing(true),
                    () => setIsPhoneEditing(true),
                    () => setIsYearEditing(true)
                ];

                return (
                    <div key={label} className={styles.name}>
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
                                <label htmlFor={label.toLowerCase().replace(' ', '-')}>{label}</label>
                                {editingState && (
                                    <input
                                        id={label.toLowerCase().replace(' ', '-')}
                                        type={label === 'Phone Number' ? 'tel' : 'text'}
                                        className={styles.input}
                                    />
                                )}
                            </div>
                        </div>
                        {!isEditing && <span className={styles.username}>{currentValue}</span>}
                        {isEditing && (
                            <div className={styles.update}>
                                <button
                                    className={styles.updateButton}
                                    onClick={updateHandlers[index]}
                                >
                                    Update
                                </button>
                            </div>
                        )}
                        <div className={styles.divider}><hr /></div>
                    </div>
                );
            })}

            {isEditing && (
                <div className={styles.base}>
                    <div className={styles.insideBase}>
                        <div className={styles.cancel}>
                            <button className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
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
