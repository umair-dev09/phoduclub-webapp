"use client";

import styles from '../homeComponents.module.css';
import Image from 'next/image';

function SubjectLayout() {
    return (
        <div className={styles.container}>
            {/* Overall */}
            <button className={styles.Buttons}>
                <div>
                    <div className={styles.IconContainer}>
                        <Image
                            src="/icons/overall.svg"
                            alt="overall-icon"
                            width={20}
                            height={20}
                            className={styles.overall}
                        />
                        <div className={styles.work}>Overall</div>
                    </div>
                    <div className={styles.totalMarks}> 0/100</div>
                </div>
                <div className={styles.progressWrapper}>
                    <svg className={styles.progressCircle} viewBox="0 0 36 36">
                        <path
                            className={styles.circleBackground}
                            d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                            className={styles.circleProgress}
                            strokeDasharray="0, 100"
                            d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <circle className={styles.dot} cx="18" cy="2.0845" r="1" />
                        <text x="50%" y="50%" alignmentBaseline="middle" textAnchor="middle" className={styles.circleText}>
                            0%
                        </text>
                    </svg>
                </div>
            </button>

            {/* Repeat for Physics, Chemistry, and Maths */}
        </div>
    );
}

export default SubjectLayout;
