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
    const [copied, setCopied] = useState(false);

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
                                    src='/icons/10.svg'
                                    alt="profile-image"
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div className={styles.nameId}>
                                {/* Name and ID */}
                                {!isEditing && (
                                    <div className={styles.name}>
                                        <span className={styles.actualProfileName}>John Smith</span>
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
                                                        height={20}
                                                        width={20}
                                                    />
                                                </button>
                                                {copied && <span className={styles.copyMessage}>Copied!</span>}

                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Conditionally show Change and Remove buttons */}
                                {isEditing && (
                                    <div className={styles.changeRemove}>
                                        <button className={styles.changeButton}>
                                            <Image
                                                className={styles.editIcon}
                                                src="/icons/edit-profile.png"
                                                alt="edit-icon"
                                                width={24}
                                                height={24} />
                                            <p className={styles.changeText}>Change</p>
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
                        {!isEditing && (
                            <div className={styles.icon}>
                                <Image
                                    className={styles.actualIcon}
                                    src="/icons/demo.png"
                                    alt="demo-icon"
                                    height={24}
                                    width={24}
                                />
                            </div>
                        )}
                        <div className={styles.UserDetail}>
                            <p>Name</p>
                            {isEditing && (
                                <input
                                    id="input"
                                    type="text"
                                    value="Jabir Ali"
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
                                    src="/icons/demo.png"
                                    alt="demo-icon"
                                    height={24}
                                    width={24}
                                />
                            </div>
                        )}
                        <div className={styles.UserDetail}>
                            <p>Email</p>
                            {isEditing && (
                                <p className={styles.afterEdit}>jabir@gmail.com</p>
                            )}
                            {isEmailEditing && (
                                <p>E-mail Pou-up</p>
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
                        {!isEditing && (
                            <div className={styles.icon}>
                                <Image
                                    className={styles.actualIcon}
                                    src="/icons/demo.png"
                                    alt="demo-icon"
                                    height={24}
                                    width={24}
                                />
                            </div>
                        )}
                        <div className={styles.UserDetail}>
                            <p>Phone Number</p>
                            {isEditing && (
                                <p className={styles.afterEdit}>+91 7898525987</p>
                            )}
                            {isPhoneEditing && (
                                <p>Phone no Pop-up</p>
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
                        {!isEditing && (
                            <div className={styles.icon}>
                                <Image
                                    className={styles.actualIcon}
                                    src="/icons/demo.png"
                                    alt="demo-icon"
                                    height={24}
                                    width={24}
                                />
                            </div>
                        )}
                        <div className={styles.UserDetail}>
                            <p>Target Year</p>
                            {isEditing && (
                                <p className={styles.afterEdit}>2024</p>
                            )}
                            {isYearEditing && (
                                <p>Target Year Pop-up</p>
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