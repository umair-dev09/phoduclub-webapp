'use client';

import { useState } from 'react';
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

    const calculatePercentage = (obtained: number, total: number): number => {
        return total === 0 ? 0 : Math.round((obtained / total) * 100);
    };

    const calculateOverallPercentage = (subject: Subject): number => {
        const lessonsPercentage = calculatePercentage(subject.lessons, subject.totalLessons);
        const attemptedPercentage = calculatePercentage(subject.attempted, subject.totalAttempted);
        const scorePercentage = calculatePercentage(subject.score, subject.totalScore);
        return Math.round((lessonsPercentage + attemptedPercentage + scorePercentage) / 3);
    };

    return (
        <div className="space-y-6 px-6 w-full">
            {Object.keys(subjects).map((subject) => {
                const { lessons, totalLessons, attempted, totalAttempted, score, totalScore } = subjects[subject];
                const overallPercentage = calculateOverallPercentage(subjects[subject]);

                return (
                    <div key={subject} className="flex flex-col border-b border-gray-200 pb-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-gray-800">
                                {subjectToExamMap[subject] || subject.charAt(0).toUpperCase() + subject.slice(1)}
                            </h3>
                            <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100">
                                <Image alt="Collapse Icon Right" src="/icons/collapse-right.svg" width={8} height={8} />
                            </button>
                        </div>

                        <div className="flex items-center mt-4">
                            <div className="relative w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="absolute top-0 left-0 h-full bg-purple-600 rounded-full transition-all"
                                    style={{ width: `${overallPercentage}%` }}
                                ></div>
                            </div>
                            <span className="ml-4 text-sm font-medium text-gray-600">{overallPercentage}%</span>
                        </div>

                        <div className="flex justify-between mt-8">
                            <div className="text-center">
                                <p className="text-sm text-gray-500">Lessons</p>
                                <div className="flex items-center space-x-1">
                                    <span className="text-lg font-bold">{lessons}</span>
                                    <span className="text-gray-500">/</span>
                                    <span className="text-lg font-bold">{totalLessons}</span>
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="text-sm text-gray-500">Attempted</p>
                                <div className="flex items-center space-x-1">
                                    <span className="text-lg font-bold">{attempted}</span>
                                    <span className="text-gray-500">/</span>
                                    <span className="text-lg font-bold">{totalAttempted}</span>
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="text-sm text-gray-500">Score</p>
                                <div className="flex items-center space-x-1">
                                    <span className="text-lg font-bold">{score}</span>
                                    <span className="text-gray-500">/</span>
                                    <span className="text-lg font-bold">{totalScore}</span>
                                </div>
                            </div>
                            <div className="text-center">
                                <p className="text-sm text-gray-500">Time Left</p>
                                <h3 className="text-lg font-bold">
                                    <span>13</span>&nbsp;<span className="text-sm">Days</span>
                                </h3>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default CoursesComp;