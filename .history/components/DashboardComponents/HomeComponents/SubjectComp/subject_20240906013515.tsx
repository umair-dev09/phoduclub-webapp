"use client";

import { Icons } from 'react-toastify';
import styles from '../homeComponents.module.css';
import Image from 'next/image';

function SubjectLayout() {
    return (
        <div className={styles.container}>
            <button className={styles.Buttons}>
                <div>
                    <div className={styles.IconContainer}>
                        <div>
                            <Image
                                src="/icons/overall.svg"
                                alt="overall-icon"
                                width={20}
                                height={20}
                                className={styles.overall} />

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
            <button className={styles.Buttons}>
                <div>
                    <div className={styles.IconContainer}>
                        <div>

                            <Image
                                src="/icons/physics.svg"
                                alt="physics-icon"
                                width={20}
                                height={20}
                                className={styles.physics} />
                        </div>
                        <div> physics</div>
                    </div>

                    <div>
                        marjs 0f 100
                    </div>

                </div>
                <div className={styles.progressValue}>
                    <span>0%</span>

                </div>
            </button>
            <button className={styles.Buttons}>
                <div>
                    <div className={styles.IconContainer}>
                        <div>


                            <Image
                                src="/icons/chemistry.svg"
                                alt="chemistry-icon"
                                width={20}
                                height={20}
                                className={styles.chemistry} />

                        </div>
                        <div> chemistry</div>
                    </div>

                    <div>
                        marjs 0f 100
                    </div>

                </div>
                <div className={styles.progressValue}>
                    <span>0%</span>

                </div>
            </button>
            <button className={styles.Buttons}>
                <div>
                    <div className={styles.IconContainer}>
                        <div>
                            <Image
                                src="/icons/maths.svg"
                                alt="maths-icon"
                                width={20}
                                height={20}
                                className={styles.maths} />

                        </div>
                        <div> maths </div>
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
