"use client";

import styles from './Profile.module.css';
import Image from 'next/image';
import { useState } from 'react';  // Import useState hook
import Target from '@/components/DashboardComponents/SettingComponents/ProfileComponents/TargetExamComponents/target';

function Profile() {
    const [isEditing, setIsEditing] = useState(false); // State to manage edit mode

    const handleEditProfile = () => {
        setIsEditing(!isEditing); // Toggle edit mode
    };

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
                            {/* Conditionally render 'John Smith' and '.id' based on 'isEditing' state */}


                            <div className={styles.name}>
                                <p>John Smith</p>
                            </div>
                            <div className={styles.id}>
                                <div className={styles.actualId}><p>john#9843</p></div>
                                <div className={styles.copyButtons}>
                                    <div className={styles.copyIcon}><button>CP</button></div>
                                </div>
                            </div>



                            <div className={styles.changeRemove}>
                                <div className={styles.change}>
                                    <button className={styles.changeButton}>Change</button>
                                </div>
                                <div className={styles.remove}>
                                    <button className={styles.removeButton}>Remove</button>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className={styles.editProfile}>
                        {!isEditing && (  // Conditionally render the button only if not editing
                            <button className={styles.editProfileButton} onClick={handleEditProfile}>
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>
                <div className={styles.examSection}>
                    <div className={styles.enrolledExams}><Target /></div>
                    <div className={styles.updateIcon}><button className={styles.updateIconButton}>Update</button></div>
                </div>
            </div>

            {/* --------------------------------------------------------------------------------------------------------------------- */}

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
                        <input
                            id="name"
                            type="text"
                            className={styles.input}

                        />
                    </div>

                </div>
                <span className={styles.username}>Jabir Ali</span>

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
                        <input
                            id="name"
                            type="text"
                            className={styles.input}

                        />
                    </div>
                </div>
                <span className={styles.username}>jabir@gmail.com</span>
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
                        <input
                            id="name"
                            type="text"
                            className={styles.input}

                        />
                    </div>
                </div>

                <span className={styles.username}>+91 7898525987</span>
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
                        <input
                            id="name"
                            type="text"
                            className={styles.input}

                        />
                    </div>
                </div>
                <span className={styles.username}>2024</span>
            </div>

            {/* --------------------------------------------------------------------------------------------------------------------- */}

            {/* Conditionally render the base section based on isEditing state */}
            {isEditing && (
                <div className={styles.base}>
                    <div className={styles.insideBase}>
                        <div className={styles.cancel}><button className={styles.cancleButton}>Cancel</button></div>
                        <div className={styles.saveChanges}><button className={styles.saveChangesButton}>Save Changes</button></div>
                    </div>
                </div>
            )}

        </div >
    );
}

export default Profile;
