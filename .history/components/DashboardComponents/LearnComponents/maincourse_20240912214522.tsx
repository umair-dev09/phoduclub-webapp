'use client';

import { useState } from 'react';
import styles from './maincourse.module.css';
import Image from 'next/image';

type Subject = {
    attempted: number;
    totalAttempted: number;
    score: number;
    totalScore: number;
};

function main() {
    // State for multiple subjects, but only reading subjects, so no need for setSubjects
    const [subjects] = useState<{ [key: string]: Subject }>({
        physics: { attempted: 5, totalAttempted: 10, score: 60, totalScore: 100 },
        chemistry: { attempted: 10, totalAttempted: 10, score: 100, totalScore: 100 },
        math: { attempted: 9, totalAttempted: 10, score: 90, totalScore: 100 },
    });

    // Function to calculate percentage
    const calculatePercentage = (obtained: number, total: number): number => {
        if (total === 0) return 0; // To prevent division by zero
        return Math.round((obtained / total) * 100);
    };

    // Function to calculate combined percentage for both Attempted and Score
    const calculateOverallPercentage = (subject: Subject): number => {
        const attemptedPercentage = calculatePercentage(subject.attempted, subject.totalAttempted);
        const scorePercentage = calculatePercentage(subject.score, subject.totalScore);
        return Math.round((attemptedPercentage + scorePercentage) / 2); // Average of both percentages
    };

    return (
        <div>
            {Object.keys(subjects).map((subject) => {
                const { attempted, totalAttempted, score, totalScore } = subjects[subject];
                const overallPercentage = calculateOverallPercentage(subjects[subject]);

                return (
                    <div className={styles.messageComp} key={subject}>
                        <div className={styles.sub}>
                            <div className={styles.theSub}>
                                <h3>Phodu Super Power JEE</h3>
                                &nbsp;
                                <span className={styles.slash}>/</span>
                                &nbsp;
                                <p className={styles.subject}>{subject.charAt(0).toUpperCase() + subject.slice(1)}</p>
                            </div>
                            <div className={styles.nextButton}>
                                <Image src='/icons/collapse-right.svg' alt='more icon' width={10} height={10} />
                            </div>
                        </div>

                        <div className={styles.progresses}>
                            {/* Overall Percentage (average of both attempted and score) */}
                            <div className={styles.progressBar}>
                                <div className={styles.progressFill} style={{ width: `${overallPercentage}%` }}></div>
                            </div>
                            <div className={styles.progressPercent}>
                                <span>{overallPercentage}%</span>
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
                            <div className={styles.timeLeft}>
                                <p>Time Left</p>
                                <h3><span>13</span>&nbsp;<span>Days</span></h3>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default main;

