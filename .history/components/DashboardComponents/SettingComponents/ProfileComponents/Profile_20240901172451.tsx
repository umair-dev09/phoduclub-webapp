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

            <div className="inputdiv">
                <label htmlFor="username">Name</label>
                <div className="input flex">
                    <input type="text" id='username' placeholder='Jabir' />


                </div>

            </div>
            <div className="inputdiv">
                <label htmlFor="Email">Email</label>
                <div className="input flex">
                    <input type="email" id='Email' placeholder='Jabir@gmail.com' />

                </div>

            </div>
            <div className="inputdiv">
                <label htmlFor="Number">Phone Number</label>
                <div className="input flex">
                    <input type="number" id='number' placeholder='+91 0000000000' />

                </div>

            </div>
            <div>
                <label htmlFor="Number">Target year</label>
                <div className="input flex">
                    <input type="number" id='number' placeholder='2024' />
                </div>

            </div>









            {/* --------------------------------------------------------------------------------------------------------------------- */}


        </div>
    );
}

export default Profile;