"use client";

import styles from '../homeComponents.module.css';
import Image from 'next/image';

function SubjectLayout() {
    return (
        <div className={styles.subjectContainer}>
            <button className={styles.subjectCard}>
                <div>
                    <div>
                        <div>
                            <Image
                                src="/icons/overall.svg"
                                alt="physics-icon"
                                width={20}
                                height={20}
                                className={styles.physics} />

                        </div>
                        <div> overall</div>
                    </div>

                    <div>
                        marjs 0f 100
                    </div>

                </div>
                <div className={styles.progressValue}>
                    <span>0%</span>

                </div>



            </button>
            <button className={styles.subjectCard}>
                <div>
                    <div>
                        <div>
                            <Image
                                src="/icons/overall.svg"
                                alt="physics-icon"
                                width={20}
                                height={20}
                                className={styles.physics} />

                        </div>
                        <div> overall</div>
                    </div>

                    <div>
                        marjs 0f 100
                    </div>

                </div>
                <div className={styles.progressValue}>
                    <span>0%</span>

                </div>
            </button>
            <button className={styles.subjectCard}>
                <div>
                    <div>
                        <div>
                            <Image
                                src="/icons/overall.svg"
                                alt="physics-icon"
                                width={20}
                                height={20}
                                className={styles.physics} />

                        </div>
                        <div> overall</div>
                    </div>

                    <div>
                        marjs 0f 100
                    </div>

                </div>
                <div className={styles.progressValue}>
                    <span>0%</span>

                </div>
            </button>
            <button className={styles.subjectCard}>
                <div>
                    <div>
                        <div>
                            <Image
                                src="/icons/overall.svg"
                                alt="physics-icon"
                                width={20}
                                height={20}
                                className={styles.physics} />

                        </div>
                        <div> overall</div>
                    </div>

                    <div>
                        marjs 0f 100
                    </div>

                </div>
                <div className={styles.progressValue}>
                    <span>0%</span>

                </div>
            </button>
        </div>
    );
}

export default SubjectLayout;
