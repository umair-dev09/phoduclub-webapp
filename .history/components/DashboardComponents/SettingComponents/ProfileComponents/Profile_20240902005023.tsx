"use client";

import styles from './Profile.module.css';
import Image from 'next/image';
import { useState } from 'react';
import Target from '@/components/DashboardComponents/SettingComponents/ProfileComponents/Target';

function Profile() {
    // State to manage edit mode for each input field
    const [isNameEditing, setIsNameEditing] = useState(false);
    const [isEmailEditing, setIsEmailEditing] = useState(false);
    const [isPhoneEditing, setIsPhoneEditing] = useState(false);
    const [isYearEditing, setIsYearEditing] = useState(false);

    return (
        <div className={styles.container}>
            {/* --------------------------------------------------------------------------------------------------------------------- */}
            <div className={styles.info}>
                <div className={styles.nameSection}>
                    <div className={styles.nameInfo}>
                        <div className={styles.dp}>
                            DP
                        </div>
                        <div className={styles.nameId}>
                            {/* Name and ID */}
                            <div className={styles.name}>
                                <p>John Smith</p>
                            </div>
                            <div className={styles.actualId}>
                                <div><p>john#9843</p></div>
                                <div className={styles.copyButtons}>
                                    <div className={styles.copyIcon}><button>CP</button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.examSection}>
                    <div className={styles.enrolledExams}>
                        <Target />
                    </div>
                </div>
            </div>
            {/* --------------------------------------------------------------------------------------------------------------------- */}
            <div className={styles.divider}><hr /></div>

            {/* Name Section */}
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
                    </div>
                </div>
                {!isNameEditing ? (
                    <>
                        <span className={styles.username}>Jabir Ali</span>
                        <div className={styles.updateName}>
                            <button
                                className={styles.updateNameButton}
                                onClick={() => setIsNameEditing(true)}
                            >
                                Update
                            </button>
                        </div>
                    </>
                ) : (
                    <input
                        id="input"
                        type="text"
                        className={styles.input}
                    />
                )}
            </div>
            <div className={styles.divider}><hr /></div>

            {/* Email Section */}
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
                    </div>
                </div>
                {!isEmailEditing ? (
                    <>
                        <span className={styles.username}>jabir@gmail.com</span>
                        <div className={styles.updateEmail}>
                            <button
                                className={styles.updateEmailButton}
                                onClick={() => setIsEmailEditing(true)}
                            >
                                Update
                            </button>
                        </div>
                    </>
                ) : (
                    <input
                        id="input"
                        type="text"
                        className={styles.input}
                    />
                )}
            </div>
            <div className={styles.divider}><hr /></div>

            {/* Phone Number Section */}
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
                    </div>
                </div>
                {!isPhoneEditing ? (
                    <>
                        <span className={styles.username}>+91 7898525987</span>
                        <div className={styles.updateMob}>
                            <button
                                className={styles.updateMobButton}
                                onClick={() => setIsPhoneEditing(true)}
                            >
                                Update
                            </button>
                        </div>
                    </>
                ) : (
                    <input
                        id="input"
                        type="numbers"
                        className={styles.input}
                    />
                )}
            </div>
            <div className={styles.divider}><hr /></div>

            {/* Target Year Section */}
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
                    </div>
                </div>
                {!isYearEditing ? (
                    <>
                        <span className={styles.username}>2024</span>
                        <div className={styles.updateYear}>
                            <button
                                className={styles.updateYearButton}
                                onClick={() => setIsYearEditing(true)}
                            >
                                Update
                            </button>
                        </div>
                    </>
                ) : (
                    <input
                        id="input"
                        type="numbers"
                        className={styles.input}
                    />
                )}
            </div>

            {/* --------------------------------------------------------------------------------------------------------------------- */}
            {/* Conditionally render the base section based on any isEditing state */}
            {(isNameEditing || isEmailEditing || isPhoneEditing || isYearEditing) && (
                <div className={styles.base}>
                    <div className={styles.insideBase}>
                        <div className={styles.cancel}>
                            <button
                                className={styles.cancleButton}
                                onClick={() => {
                                    setIsNameEditing(false);
                                    setIsEmailEditing(false);
                                    setIsPhoneEditing(false);
                                    setIsYearEditing(false);
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                        <div className={styles.saveChanges}>
                            <button
                                className={styles.saveChangesButton}
                                onClick={() => {
                                    setIsNameEditing(false);
                                    setIsEmailEditing(false);
                                    setIsPhoneEditing(false);
                                    setIsYearEditing(false);
                                    // Add your save logic here
                                }}
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;
