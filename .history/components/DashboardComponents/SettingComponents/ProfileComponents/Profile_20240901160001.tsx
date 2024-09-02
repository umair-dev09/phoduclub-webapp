"use client";

import styles from './Profile.module.css';

function Profile() {
    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <div className={styles.nameSection}>
                    <div className={styles.nameInfo}>
                        <div className={styles.dp}></div>
                        <div className={styles.nameId}>
                            <div className={styles.name}><p>John Smith</p></div>
                            <div className={styles.id}>
                                <div className={styles.actualId}><p>john#9843</p></div>
                                <div className={styles.copyImage}></div>
                                <div className={styles.coppiedImage}></div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.editProfile}></div>
                </div>
                <div className={styles.examSection}>
                    <div className={styles.enrolledExams}>Target exam components</div>
                    <div className={styles.updateIcon}></div>
                </div>
            </div>
            <div className={styles.divider}><hr className={styles.dividerLine} /></div>

            <div className={styles.detailitem}>
                <span className={styles.icons}>person</span>
                <span className={styles.label}>Name</span>
                <span className={styles.value}>Placeholder="John Smith"</span>
            </div>
            <div className={styles.detailitem}>
                <span className={styles.icons}>email</span>
                <span className={styles.label}>Email</span>
                <span className={styles.value}>John Smith</span>
            </div>
            <div className={styles.detailitem}>
                <span className={styles.icons}>number</span>
                <span className={styles.label}>phone</span>
                <span className={styles.value}>John Smith</span>
            </div>
            <div className={styles.detailitem}>
                <span className={styles.icons}>year</span>
                <span className={styles.label}>Target-year</span>
                <span className={styles.value}>John Smith</span>
            </div>


        </div>
    );
}

export default Profile;