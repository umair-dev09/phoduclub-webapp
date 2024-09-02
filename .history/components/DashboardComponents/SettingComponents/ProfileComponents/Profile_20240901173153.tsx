"use client";


import styles from './Profile.module.css';

function Profile() {


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
                                <div className={styles.copyButtons}>
                                    <div className={styles.copyIcon}><button>CP</button></div>
                                    <div className={styles.coppiedIcon}><button>CPD</button></div>
                                </div>
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

            <div className={styles.divider}><hr /></div>

            <div className={styles.name}>
                <div className={styles.label}>
                    <label htmlFor="Name">Name</label>
                </div>
                <div className="username">Jabir Ali</div>
            </div>









            {/* --------------------------------------------------------------------------------------------------------------------- */}


        </div>
    );
}

export default Profile;