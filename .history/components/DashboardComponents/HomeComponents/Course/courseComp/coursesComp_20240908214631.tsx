// 
import { useState } from 'react';
import styles from './courseComp.module.css';
import Image from 'next/image';

function CoursesComp() {
    // State for multiple subjects
    const [subjects, setSubjects] = useState({
        physics: { attempted: 4, totalAttempted: 10, score: 60, totalScore: 100 },
        chemistry: { attempted: 7, totalAttempted: 10, score: 80, totalScore: 100 },
        math: { attempted: 9, totalAttempted: 10, score: 90, totalScore: 100 }
    });

    // Function to calculate percentage
    const calculatePercentage = (score, totalScore) => {
        return Math.round((score / totalScore) * 100);
    };

    return (
        <div>
            {Object.keys(subjects).map(subject => {
                const { attempted, totalAttempted, score, totalScore } = subjects[subject];
                const percentage = calculatePercentage(score, totalScore);

                return (
                    <div className={styles.messageComp} key={subject}>
                        <div className={styles.sub}>
                            <div className={styles.theSub}>
                                <h3>{subject.charAt(0).toUpperCase() + subject.slice(1)}</h3>
                                &nbsp;
                                <span>/</span>
                                &nbsp;
                                <p>{subject === 'physics' ? 'JEE' : ''}</p>
                            </div>
                            <div className={styles.nextButton}>
                                <Image src='/icons/collapse-right.svg' alt='more icon' width={10} height={10} />
                            </div>
                        </div>
                        <div className={styles.progresses}>
                            <div className={styles.progressBar}>
                                <div
                                    className={styles.progressFill}
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                            <div className={styles.progressPercent}>
                                <span>{percentage}%</span>
                            </div>
                        </div>
                        <div className={styles.theScores}>
                            <div className={styles.attempted}>
                                <p>Attempted</p>
                                <div className={styles.outoff}>
                                    <h3><span>{attempted}</span></h3>
                                    <h3>/</h3>
                                    <h3><span>{totalAttempted}</span></h3>
                                </div>
                            </div>
                            <div className={styles.score}>
                                <p className={styles.scoreText}>Score</p>
                                <div className={styles.outoff}>
                                    <h3><span>{score}</span></h3>
                                    <h3>/</h3>
                                    <h3><span>{totalScore}</span></h3>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default CoursesComp;
