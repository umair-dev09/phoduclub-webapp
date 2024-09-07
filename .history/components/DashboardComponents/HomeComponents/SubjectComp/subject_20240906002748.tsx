"use client";

import styles from '../homeComponents.module.css';
import Image from 'next/image';

function SubjectLayout() {
    return (
        <div className={styles.subjectContainer}>
            <button className={styles.subjectCard}>
                <Image
                    src="/icons/overall.svg"
                    alt="physics-icon"
                    width={20}
                    height={20}
                    className='physics' />

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
