"use client";

import styles from '../homeComponents.module.css';

function SubjectLayout() {
    return (
        <div className={styles.subjectContainer}>
            <button className={styles.subjectCard}>
                Overall
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
