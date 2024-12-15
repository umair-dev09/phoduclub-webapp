'use client';

import { useState } from 'react';
import styles from './courseComp.module.css';
import Image from 'next/image';

type Subject = {
    lessons: number;
    totalLessons: number;
    attempted: number;
    totalAttempted: number;
    score: number;
    totalScore: number;
};

// Map subjects to course names (e.g., JEE, NEET, etc.)
const subjectToExamMap: { [key: string]: string } = {
    physics: 'JEE Crash Course',
    chemistry: 'NEET Preparation',
    math: 'Engineering Entrance',
    biology: 'Medical Entrance Preparation',
    english: 'Language Proficiency Course',
    history: 'World History Crash Course',
    geography: 'Geography Insights',
    computer: 'Computer Basics and Programming',
};


function CoursesComp() {
    // State for multiple subjects
    const [subjects] = useState<{ [key: string]: Subject }>({
        physics: { lessons: 10, totalLessons: 50, attempted: 5, totalAttempted: 10, score: 60, totalScore: 100 },
        chemistry: { lessons: 23, totalLessons: 80, attempted: 10, totalAttempted: 10, score: 100, totalScore: 100 },
        math: { lessons: 17, totalLessons: 60, attempted: 9, totalAttempted: 10, score: 90, totalScore: 100 },
        biology: { lessons: 25, totalLessons: 70, attempted: 15, totalAttempted: 20, score: 85, totalScore: 100 },
        english: { lessons: 20, totalLessons: 50, attempted: 18, totalAttempted: 25, score: 72, totalScore: 100 },
        history: { lessons: 30, totalLessons: 60, attempted: 20, totalAttempted: 30, score: 80, totalScore: 100 },
        geography: { lessons: 18, totalLessons: 40, attempted: 12, totalAttempted: 15, score: 78, totalScore: 100 },
        computer: { lessons: 22, totalLessons: 60, attempted: 15, totalAttempted: 20, score: 95, totalScore: 100 },
    });


    // Function to calculate percentage
    const calculatePercentage = (obtained: number, total: number): number => {
        if (total === 0) return 0; // To prevent division by zero
        return Math.round((obtained / total) * 100);
    };

    // Function to calculate combined percentage for Lessons, Attempted, and Score
    const calculateOverallPercentage = (subject: Subject): number => {
        const lessonsPercentage = calculatePercentage(subject.lessons, subject.totalLessons);
        const attemptedPercentage = calculatePercentage(subject.attempted, subject.totalAttempted);
        const scorePercentage = calculatePercentage(subject.score, subject.totalScore);
        return Math.round((lessonsPercentage + attemptedPercentage + scorePercentage) / 3); // Average of all three percentages
    };

    return (
        <div>
            {Object.keys(subjects).map((subject) => {
                const { lessons, totalLessons, attempted, totalAttempted, score, totalScore } = subjects[subject];
                const overallPercentage = calculateOverallPercentage(subjects[subject]);

                return (
                    <div className={styles.messageComp} key={subject}>
                        <div className={styles.sub}>
                            <div className={styles.theSub}>
                                {/* Use the subject to exam name mapping */}
                                <h3>{subjectToExamMap[subject] || subject.charAt(0).toUpperCase() + subject.slice(1)}</h3>
                            </div>
                            <div className={styles.nextButton}>
                                <Image src='/icons/collapse-right.svg' alt='more icon' width={10} height={10} />
                            </div>
                        </div>

                        <div className={styles.progresses}>
                            {/* Overall Percentage (average of lessons, attempted, and score) */}
                            <div className={styles.progressBar}>
                                <div className={styles.progressFill} style={{ width: `${overallPercentage}%` }}></div>
                            </div>
                            <div className={styles.progressPercent}>
                                <span>{overallPercentage}%</span>
                            </div>
                        </div>

                        <div className={styles.theScores}>
                            <div className={styles.lessons}>
                                <p>Lessons</p>
                                <div className={styles.outoff}>
                                    <h3><span>{lessons}</span></h3>
                                    <h3>/</h3>
                                    <h3><span>{totalLessons}</span></h3>
                                </div>
                            </div>
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

export default CoursesComp;
