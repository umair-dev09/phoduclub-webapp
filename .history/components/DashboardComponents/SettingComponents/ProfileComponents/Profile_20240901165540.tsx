"use client";
import { useState } from 'react';

import styles from './Profile.module.css';

function Profile() {
    const [visibleInput, setVisibleInput] = useState('');

    const toggleInput = (id) => {
        setVisibleInput(visibleInput === id ? '' : id);
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
                            <div className={styles.name}><p>John Smith</p></div>
                            <div className={styles.id}>
                                <div className={styles.actualId}><p>john#9843</p></div>
                                <div className={styles.copyIcon}><button>CP</button></div>
                                <div className={styles.coppiedIcon}><button>CPD</button></div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.editProfile}>
                        <button className={styles.editProfileButton}>Edit Profile</button>
                    </div>
                </div>
                <div className={styles.examSection}>
                    <div className={styles.enrolledExams}>Target exam components</div>
                    <div className={styles.updateIcon}><button className={styles.updateIconButton}>Update</button></div>
                </div>
            </div>

            {/* --------------------------------------------------------------------------------------------------------------------- */}

            <div className={styles.divider}><hr className={styles.dividerLine} /></div>


            <div id="profile">
                <div id="name">
                    <span onClick={() => toggleInput('nameInput')}>Name</span>
                    {visibleInput === 'nameInput' && (
                        <input id="nameInput" type="text" placeholder="Enter your name" />
                    )}
                </div>

                <div className={styles.divider}><hr className={styles.dividerLine} /></div>

                <div id="phone">
                    <span onClick={() => toggleInput('phoneInput')}>Phone Number</span>
                    {visibleInput === 'phoneInput' && (
                        <input id="phoneInput" type="text" placeholder="Enter your phone number" />
                    )}
                </div>

                <div className={styles.divider}><hr className={styles.dividerLine} /></div>

                <div id="email">
                    <span onClick={() => toggleInput('emailInput')}>Email</span>
                    {visibleInput === 'emailInput' && (
                        <input id="emailInput" type="email" placeholder="Enter your email" />
                    )}
                </div>

                <div className={styles.divider}><hr className={styles.dividerLine} /></div>

                <div id="target">
                    <span onClick={() => toggleInput('targetInput')}>Target Year</span>
                    {visibleInput === 'targetInput' && (
                        <input id="targetInput" type="number" placeholder="Enter target year" />
                    )}
                </div>
            </div>



            {/* --------------------------------------------------------------------------------------------------------------------- */}


        </div>
    );
}

export default Profile;