"use client";

import styles from '../homeComponents.module.css';
import Image from 'next/image';

function SubjectLayout() {
    return (
        <div className={styles.subjectContainer}>
            <button className={styles.subjectCard}>
                <div>
                    <Image
                        src="/icons/overall.svg"
                        alt="physics-icon"
                        width={20}
                        height={20}
                        className={styles.physics} />

                </div>
                <div className={styles.progressValue}>
                    <span>0%</span>

                </div>



            </button>
            <button className={styles.subjectCard}>
                Physics
            </button>
            <button className={styles.subjectCard}>
                Chemistry
            </button>
            <button className={styles.subjectCard}>
                Maths
            </button>
        </div>
    );
}

export default SubjectLayout;
