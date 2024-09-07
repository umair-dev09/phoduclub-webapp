"use client";

import styles from '../homeComponents.module.css';
import Image from 'next/image';



interface CircularProgressProps {
    percentage: number;
}
const CircularProgress: React.FC<CircularProgressProps> = ({ percentage }) => {
    const normalizedPercentage = Math.min(Math.max(percentage, 0), 100);
    const progressColor = normalizedPercentage === 100 ? '   #98A2B3' : '#7400E0';

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
            <div className={styles.checkIcon} style={{ visibility: 'hidden' }}>
                <Image
                    src="/icons/checkmark.svg" // Replace with your right icon path
                    alt="checkmark-icon"
                    width={14}
                    height={14}
                />
            </div>
        </div>
    );
}
// PUSH FUCNTION FOR BUTTONS 
const handlebuttonClick = (buttons: string) => {
    console.log(`${buttons} button clicked`);
    //WE HAVE WRITE LOGIC HERE 

}
const SubjectLayout: React.FC = () => {

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
                        <div className={styles.checkIcon} style={{ visibility: 'hidden' }}>
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
                <div className={styles.progressValue} >
                    <CircularProgress percentage={10} /> {/* Example percentage */}



                </div>
            </button>

            {/* Physics */}
            <button className={styles.Buttons} onClick={() => handlebuttonClick('overall')}>
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
                        <div className={styles.checkIcon} style={{ visibility: 'hidden' }}>
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
                    <CircularProgress percentage={0} /> {/* Example percentage */}

                </div>
            </button>

            {/* Chemistry */}
            <button className={styles.Buttons} onClick={() => handlebuttonClick('overall')}>
                <div className={styles.box1}>
                    <div className={styles.IconContainer}>
                        <Image
                            src="/icons/chemistry.svg"
                            alt="chemistry-icon"
                            width={20}
                            height={20}
                            className={styles.chemistry}
                        />
                        <div className={styles.work} style={{ visibility: 'visible' }}>
                            Chemistry

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
            <button className={styles.Buttons} onClick={() => handlebuttonClick('overall')}>
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
                        <div className={styles.checkIcon} style={{ visibility: 'hidden' }}>
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
                    <CircularProgress percentage={0} /> {/* Example percentage */}


                </div>
            </button>
        </div>
    );
}

export default SubjectLayout;
