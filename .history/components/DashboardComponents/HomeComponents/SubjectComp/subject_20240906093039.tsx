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
                    <div className={styles.totalMarks}>

                        <span className={styles.numerator}>0</span><span className={styles.denominator}>/100</span>


                    </div>
                </div>
                <div className={styles.progressValue} >


                </div>
            </button>

            {/* Physics */}
            <button className={styles.Buttons}>
                <div className={styles.box1}>
                    <div className={styles.IconContainer}>
                        <Image
                            src="/icons/physics.svg"
                            alt="physics-icon"
                            width={20}
                            height={20}
                            className={styles.physics}
                        />
                        <div className={styles.work}>Physics</div>
                    </div>
                    <div className={styles.totalMarks}>
                        <span className={styles.numerator}>0</span><span className={styles.denominator}>/100</span>

                    </div>
                </div>
                <div className={styles.progressValue}>

                </div>
            </button>

            {/* Chemistry */}
            <button className={styles.Buttons}>
                <div>
                    <div className={styles.IconContainer}>
                        <Image
                            src="/icons/chemistry.svg"
                            alt="chemistry-icon"
                            width={20}
                            height={20}
                            className={styles.chemistry}
                        />
                        <div className={styles.work}>Chemistry</div>
                    </div>
                    <div className={styles.totalMarks}>
                        <span className={styles.numerator}>0</span><span className={styles.denominator}>/100</span>
                    </div>
                </div>
                <div className={styles.progressValue}>

                </div>
            </button>

            {/* Maths */}
            <button className={styles.Buttons}>
                <div>
                    <div className={styles.IconContainer}>
                        <Image
                            src="/icons/maths.svg"
                            alt="maths-icon"
                            width={20}
                            height={20}
                            className={styles.maths}
                        />
                        <div className={styles.work}>Maths</div>
                    </div>
                    <div className={styles.totalMarks}>
                        <span className={styles.numerator}>0</span><span className={styles.denominator}>/100</span>
                    </div>
                </div>
                <div className={styles.progressValue}>


                </div>
            </button>
        </div>
    );
}

export default SubjectLayout;
