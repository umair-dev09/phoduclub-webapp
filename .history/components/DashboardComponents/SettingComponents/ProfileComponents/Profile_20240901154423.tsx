"use client";

import styles from './Profile.module.css';

function Profile() {
    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <div className={styles.nameSection}>
                    <div className={styles.nameInfo}></div>
                    <div className={styles.editProfile}></div>
                </div>
                <div className={styles.examSection}>
                    <div cla
                    ></div>
                </div>
            </div>
            <div className="divider"><hr className="dividerLine" /></div>
            <div class="user-details">
                <div class="detail-item">
                    <span class="material-icons">person</span>
                    <span class="label">Name</span>
                    <span class="value">John Smith</span>
                </div>
                <div class="detail-item">
                    <span class="material-icons">email</span>
                    <span class="label">Email</span>
                    <span class="value">john@phodu.com</span>
                </div>
                <div class="detail-item">
                    <span class="material-icons">phone</span>
                    <span class="label">Phone Number</span>
                    <span class="value">+91 95512 09967</span>
                </div>
                <div class="detail-item">
                    <span class="material-icons">event</span>
                    <span class="label">Target Year</span>
                    <span class="value">2024</span>
                </div>
            </div>
        </div>
    );
}

export default Profile;