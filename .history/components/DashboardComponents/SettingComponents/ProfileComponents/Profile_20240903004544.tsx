"use client";

import styles from './Profile.module.css';
import Image from 'next/image';
import { useState } from 'react';
import Target from '@/components/DashboardComponents/SettingComponents/ProfileComponents/Target';

function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("Jabir Ali");
    const [email, setEmail] = useState("jabir@gmail.com");
    const [phone, setPhone] = useState("+91 7898525987");
    const [year, setYear] = useState("2024");
    const [isEmailEditing, setIsEmailEditing] = useState(false);
    const [isPhoneEditing, setIsPhoneEditing] = useState(false);
    const [isYearEditing, setIsYearEditing] = useState(false);

    const handleEditProfile = () => {
        setIsEditing(!isEditing);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setIsEmailEditing(false);
        setIsPhoneEditing(false);
        setIsYearEditing(false);
    };

    const handleSaveChanges = () => {
        // Add your save logic here (e.g., API calls to save updated profile details)
        setIsEditing(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.mainProfileContent}>
                <ProfileInfo
                    isEditing={isEditing}
                    handleEditProfile={handleEditProfile}
                    name={name}
                    setName={setName}
                    email={email}
                    phone={phone}
                    year={year}
                />

                <ProfileField
                    label="Name"
                    value={name}
                    isEditing={isEditing}
                    onChange={(e) => setName(e.target.value)}
                    fieldType="input"
                />

                <ProfileField
                    label="Email"
                    value={email}
                    isEditing={isEditing}
                    onChange={() => setIsEmailEditing(true)}
                    fieldType="button"
                    buttonText="Update"
                    isButtonField={true}
                    isFieldEditing={isEmailEditing}
                    fieldPlaceholder={email}
                />

                <ProfileField
                    label="Phone Number"
                    value={phone}
                    isEditing={isEditing}
                    onChange={() => setIsPhoneEditing(true)}
                    fieldType="button"
                    buttonText="Update"
                    isButtonField={true}
                    isFieldEditing={isPhoneEditing}
                    fieldPlaceholder={phone}
                />

                <ProfileField
                    label="Target Year"
                    value={year}
                    isEditing={isEditing}
                    onChange={() => setIsYearEditing(true)}
                    fieldType="button"
                    buttonText="Update"
                    isButtonField={true}
                    isFieldEditing={isYearEditing}
                    fieldPlaceholder={year}
                />

                {isEditing && (
                    <div className={styles.actionButtons}>
                        <button className={styles.cancelButton} onClick={handleCancel}>
                            Cancel
                        </button>
                        <button className={styles.saveChangesButton} onClick={handleSaveChanges}>
                            Save Changes
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

function ProfileInfo({ isEditing, handleEditProfile, name, email, phone, year }) {
    return (
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
                        {!isEditing ? (
                            <>
                                <div className={styles.name}>
                                    <span className={styles.actualProfileName}>{name}</span>
                                </div>
                                <div className={styles.actualId}>
                                    <span className={styles.id}>{email.split('@')[0]}#9843</span>
                                    <div className={styles.copyButtons}>
                                        <button className={styles.copyIcon}>CP</button>
                                    </div>
                                </div>
                            </>
                        ) : (
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
                {!isEditing && (
                    <div className={styles.editProfile}>
                        <button className={styles.editProfileButton} onClick={handleEditProfile}>
                            <Image
                                className={styles.editIcon}
                                src="/icons/edit-profile.png"
                                alt="edit-icon"
                                width={24}
                                height={24} />
                            <p>Edit Profile</p>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

function ProfileField({
    label,
    value,
    isEditing,
    onChange,
    fieldType = "text",
    buttonText = "",
    isButtonField = false,
    isFieldEditing = false,
    fieldPlaceholder = ""
}) {
    return (
        <>
            <div className={styles.divider}><hr /></div>
            <div className={styles.name}>
                <div className={styles.label}>
                    <div className={styles.icon}>
                        <Image
                            className={styles.actualIcon}
                            src="/icons/demo.png"
                            alt={`${label}-icon`}
                            height={24}
                            width={24}
                        />
                    </div>
                    <div className={styles.UserDetail}>
                        <p>{label}</p>
                        {isEditing && isButtonField && (
                            <>
                                {!isFieldEditing ? (
                                    <button className={styles.updateButton} onClick={onChange}>{buttonText}</button>
                                ) : (
                                    <input
                                        type={fieldType}
                                        value={fieldPlaceholder}
                                        onChange={onChange}
                                        className={styles.input}
                                    />
                                )}
                            </>
                        )}
                    </div>
                </div>
                {!isEditing && <span className={styles.username}>{value}</span>}
            </div>
        </>
    );
}

export default Profile;
