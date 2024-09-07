"use client";

import styles from '../homeComponents.module.css';
import Image from 'next/image';

interface CircularProgressProps {
    percentage: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ percentage }) => {
    const normalizedPercentage = Math.min(Math.max(percentage, 0), 100);
    const progressColor = normalizedPercentage === 100 ? '#98A2B3' : '#7400E0';

    // Determine the visibility of the checkIcon based on the percentage
    const iconVisibility = normalizedPercentage === 100 ? 'visible' : 'hidden';

    return (
        <div className={styles.progressValue}>
            <svg className={styles.circular} viewBox="0 0 36 36">
                <path
                    className={styles.circleBackground}
                    d="M18 2.0845 A 15.9155 15.9155 0 0 1 18 33.9155 A 15.9155 15.9155 0 0 1 18 2.0845"
                />
                <path
                    className={styles.circleProgress}
                    style={{ stroke: progressColor }} // Set color here
                    strokeDasharray={`${normalizedPercentage} ${100 - normalizedPercentage}`}
                    d="M18 2.0845 A 15.9155 15.9155 0 0 1 18 33.9155 A 15.9155 15.9155 0 0 1 18 2.0845"
                />
            </svg>
            <div className={styles.label}>
                {normalizedPercentage}%
            </div>

        </div>
    );
};

const SubjectLayout: React.FC = () => {
    const handlebuttonClick = (buttons: string) => {
        console.log(`${buttons} button clicked`);
        // WE HAVE WRITE LOGIC HERE
    };
    const subjects = [
        { name: "Overall", percentage: 10, icon: "/icons/overall.svg", total: "0/98" },
        { name: "Physics", percentage: 100, icon: "/icons/physics.svg", total: "0/33" },
        { name: "Chemistry", percentage: 100, icon: "/icons/chemistry.svg", total: "0/34" },
        { name: "Maths", percentage: 100, icon: "/icons/maths.svg", total: "0/31" }
    ];


    return (
        <div className={styles.container}>
            {/* Overall */}
            <button className={styles.Buttons} onClick={() => handlebuttonClick('overall')}>
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
                        <div className={styles.checkIcon} style={{ visibility: subjects[0].percentage === 100 ? 'visible' : 'hidden' }}>
                            <Image
                                src="/icons/checkmark.svg"
                                alt="checkmark-icon"
                                width={14}
                                height={14} />
                        </div>
                    </div>
                    <div className={styles.totalMarks}>
                        <span className={styles.numerator}>0</span><span className={styles.denominator}>/98</span>
                    </div>
                </div>
                <div className={styles.progressValue}>
                    <CircularProgress percentage={10} /> {/* Example percentage */}
                </div>
            </button>

            {/* Physics */}
            <button className={styles.Buttons} onClick={() => handlebuttonClick('physics')}>
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
                        <div className={styles.checkIcon} style={{ visibility: subjects[0].percentage === 100 ? 'visible' : 'hidden' }}>
                            <Image
                                src="/icons/checkmark.svg"
                                alt="checkmark-icon"
                                width={14}
                                height={14} />
                        </div>
                    </div>
                    <div className={styles.totalMarks}>
                        <span className={styles.numerator}>0</span><span className={styles.denominator}>/33</span>
                    </div>
                </div>
                <div className={styles.progressValue}>
                    <CircularProgress percentage={100} /> {/* Example percentage */}
                </div>
            </button>

            {/* Chemistry */}
            <button className={styles.Buttons} onClick={() => handlebuttonClick('chemistry')}>
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
                        <div className={styles.checkIcon} style={{ visibility: subjects[0].percentage === 100 ? 'visible' : 'hidden' }}>
                            <Image
                                src="/icons/checkmark.svg"
                                alt="checkmark-icon"
                                width={14}
                                height={14} />
                        </div>
                    </div>
                    <div className={styles.totalMarks}>
                        <span className={styles.numerator}>0</span><span className={styles.denominator}>/34</span>
                    </div>
                </div>
                <div className={styles.progressValue}>
                    <CircularProgress percentage={100} /> {/* Example percentage */}
                </div>
            </button>

            {/* Maths */}
            <button className={styles.Buttons} onClick={() => handlebuttonClick('maths')}>
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
                        <div className={styles.checkIcon} style={{ visibility: subjects[0].percentage === 100 ? 'visible' : 'hidden' }}>
                            <Image
                                src="/icons/checkmark.svg"
                                alt="checkmark-icon"
                                width={14}
                                height={14} />
                        </div>
                    </div>
                    <div className={styles.totalMarks}>
                        <span className={styles.numerator}>0</span><span className={styles.denominator}>/31</span>
                    </div>
                </div>
                <div className={styles.progressValue}>
                    <CircularProgress percentage={100} /> {/* Example percentage */}
                </div>
            </button>
        </div>
    );
};

export default SubjectLayout;
