"use client";

import styles from '../homeComponents.module.css';
import Image from 'next/image';


interface CircularProgressProps {
    percentage: number;
}
const CircularProgress: React.FC<CircularProgressProps> = ({ percentage }) => {
    const normalizedPercentage = Math.min(Math.max(percentage, 0), 100);

    return (
        <div className={styles.progressValue}>
            <svg className={styles.circular} viewBox="0 0 36 36">
                <path
                    className={styles.circleBackground}
                    d="M18 2.0845 A 15.9155 15.9155 0 0 1 18 33.9155 A 15.9155 15.9155 0 0 1 18 2.0845"
                />
                <path
                    className={styles.circleProgress}
                    strokeDasharray={`${normalizedPercentage} ${100 - normalizedPercentage}`}
                    d="M18 2.0845 A 15.9155 15.9155 0 0 1 18 33.9155 A 15.9155 15.9155 0 0 1 18 2.0845"
                />
            </svg>
            <div className={styles.label}>
                {normalizedPercentage}%
            </div>
        </div>
    );
}
const SubjectLayout: React.FC = () => {

    return (
        <div className={styles.container}>
            {/* Overall */}
            <button className={styles.Buttons}>
                <div className={styles.box1}>
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

                        <span className={styles.numerator}>98</span><span className={styles.denominator}>/100</span>


                    </div>
                </div>
                <div className={styles.progressValue} >
                    <CircularProgress percentage={0} /> {/* Example percentage */}



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
                        <span className={styles.numerator}>33</span><span className={styles.denominator}>/100</span>

                    </div>
                </div>
                <div className={styles.progressValue}>
                    <CircularProgress percentage={0} /> {/* Example percentage */}

                </div>
            </button>

            {/* Chemistry */}
            <button className={styles.Buttons}>
                <div className={styles.box1}>
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
                        <span className={styles.numerator}>34</span><span className={styles.denominator}>/100</span>
                    </div>
                </div>
                <div className={styles.progressValue}>
                    <CircularProgress percentage={0} /> {/* Example percentage */}

                </div>
            </button>

            {/* Maths */}
            <button className={styles.Buttons}>
                <div className={styles.box1}>
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
                        <span className={styles.numerator}>31</span><span className={styles.denominator}>/100</span>
                    </div>
                </div>
                <div className={styles.progressValue}>
                    <CircularProgress percentage={0} /> {/* Example percentage */}


                </div>
            </button>
        </div>
    );
}

export default SubjectLayout;
