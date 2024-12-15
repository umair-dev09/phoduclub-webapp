'use client';

import { useState } from 'react';
import Image from 'next/image';

type Subject = {
    attempted: number;
    totalAttempted: number;
    score: number;
    totalScore: number;
};

function TestSeriesComp() {
    // State for multiple subjects
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
                    <div className="flex flex-col mt-6 mx-6" key={subject}>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <h3 className="font-semibold text-lg">Phodu Super Power JEE</h3>
                                <span className="mx-2 text-gray-400 font-semibold">/</span>
                                <p className="font-normal text-gray-800">{subject.charAt(0).toUpperCase() + subject.slice(1)}</p>
                            </div>
                            <button className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-gray-100">
                                <Image alt="Collapse Icon Right" src="/icons/collapse-right.svg" width={8} height={8} />
                            </button>
                        </div>

                        <div className="flex justify-between items-center mt-2">
                            <div className="relative w-5/6 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-purple-700 transition-all duration-300"
                                    style={{ width: `${overallPercentage}%` }}
                                ></div>
                            </div>
                            <span className="text-sm font-medium">{overallPercentage}%</span>
                        </div>

                        <div className="flex justify-between mt-8 pb-6 border-b border-gray-300">
                            <div className="flex flex-col items-center">
                                <p className="font-medium">Attempted</p>
                                <div className="flex items-center">
                                    <h3 className="font-semibold text-lg">{attempted}</h3>
                                    <h3 className="font-semibold mx-1">/</h3>
                                    <h3 className="font-semibold text-lg">{totalAttempted}</h3>
                                </div>
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="font-medium">Score</p>
                                <div className="flex items-center">
                                    <h3 className="font-semibold text-lg">{score}</h3>
                                    <h3 className="font-semibold mx-1">/</h3>
                                    <h3 className="font-semibold text-lg">{totalScore}</h3>
                                </div>
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="font-medium">Time Left</p>
                                <h3 className="font-semibold text-lg">
                                    <span>13</span>&nbsp;<span>Days</span>
                                </h3>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default TestSeriesComp;