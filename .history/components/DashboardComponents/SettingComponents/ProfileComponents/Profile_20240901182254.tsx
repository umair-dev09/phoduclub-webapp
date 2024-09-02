"use client";


import styles from './Profile.module.css';
import Image from 'next/image';

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
                            <div className={styles.changeRemove}>
                                <div className={styles.change}><button className={styles.changeButton}>Change</button></div>
                                <div className={styles.remove}><button className={styles.removeButton}>Remove</button></div>
                            </div>
                            <div className={styles.name}><p>John Smith</p></div>
                            <div className={styles.id}>
                                <div className={styles.actualId}><p>john#9843</p></div>
                                <div className={styles.copyButtons}>
                                    <div className={styles.copyIcon}><button>CP</button></div>
                                    <div className={styles.coppiedIcon}><button>CPD</button></div>
                                </div>
                                <div className={styles.sizeRecom}><p>File size must be less than 5MB</p></div>
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

                            defaultValue="Jabir Ali"
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
                <div className={styles.lable}>
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
                        <label htmlFor="number">Phone Number</label>
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
                    <Image
                        className={styles.icon}
                        src="/icons/demo.png"
                        alt="demo-icon"
                        height={24}
                        width={24}
                    />

                    <label htmlFor="Target">Target Year</label>
                </div>
                <span className={styles.username}>2024</span>
            </div>

            {/* --------------------------------------------------------------------------------------------------------------------- */}



        </div >
    );
}

export default Profile;