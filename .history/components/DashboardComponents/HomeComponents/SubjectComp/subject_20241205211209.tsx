"use client";
import Image from 'next/image';
import { useState } from 'react';
import BottomSheet from './bottomUpSheet';

interface CircularProgressProps {
    percentage: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ percentage }) => {
    const normalizedPercentage = Math.min(Math.max(percentage, 0), 100);
    const progressColor = normalizedPercentage === 100 ? '#98A2B3' : '#7400E0';

    return (
        <div className="relative flex items-center justify-center w-16 h-16">
            <svg className="rotate-360 w-16 h-16" viewBox="0 0 36 36">
                <path
                    className="fill-none stroke-[#EDEFF6] stroke-[3.5] stroke-linecap-round"
                    d="M18 2.0845 A 15.9155 15.9155 0 0 1 18 33.9155 A 15.9155 15.9155 0 0 1 18 2.0845"
                />
                <path
                    className="fill-none stroke-[3.5] stroke-linecap-round transition-all duration-300"
                    style={{ stroke: progressColor, strokeDasharray: `${normalizedPercentage} ${100 - normalizedPercentage}` }}
                    d="M18 2.0845 A 15.9155 15.9155 0 0 1 18 33.9155 A 15.9155 15.9155 0 0 1 18 2.0845"
                />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-semibold text-center">
                {normalizedPercentage}%
            </div>
        </div>

    );
};

const SubjectLayout: React.FC = () => {
    const subjectsData = [
        { name: 'Overall', numerator: 98, denominator: 98, icon: '/icons/overall.svg' },
        { name: 'Physics', numerator: 0, denominator: 33, icon: '/icons/physics.svg' },
        { name: 'Chemistry', numerator: 8, denominator: 34, icon: '/icons/chemistry.svg' },
        { name: 'Maths', numerator: 31, denominator: 31, icon: '/icons/maths.svg' },
    ];

    const calculatePercentage = (numerator: number, denominator: number) => {
        return denominator === 0 ? 0 : Math.round((numerator / denominator) * 100);
    };

    const [showBottomSheet, setShowBottomSheet] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

    const openBottomSheet = (subjectName: string) => {
        setSelectedSubject(subjectName);
        setShowBottomSheet(true);
    };

    const closeBottomSheet = () => {
        setShowBottomSheet(false);
        setSelectedSubject(null);
    };

    return (
        <div className="grid grid-cols-2 gap-5 p-6 w-full">
            {subjectsData.map((subject) => {
                const percentage = calculatePercentage(subject.numerator, subject.denominator);
                return (
                    <button
                        onClick={() => openBottomSheet(subject.name)}
                        key={subject.name}
                        className="bg-white border border-gray-200 rounded-lg px-6 py-2 flex items-center justify-between  transition-transform duration-300 ease-in-out hover:border-[#7400E03D] hover:shadow-lg hover:scale-105"
                    >
                        <div className="pt-2">
                            <div className="flex items-center">
                                <Image
                                    src={subject.icon}
                                    alt={`${subject.name}-icon`}
                                    width={20}
                                    height={20}
                                    className="mr-2"
                                />
                                <div className="text-[#667085] text-xs font-semibold ml-1">{subject.name}</div>
                            </div>
                            <div className=" flex items-center leading-none mt-2">
                                <span className="text-3xl font-semibold text-[#1D2939]">{subject.numerator}</span>
                                <span className="text-base text-[#1D2939] ml-1 font-semibold">/{subject.denominator}</span>
                            </div>
                        </div>
                        <div className="relative w-16 h-16">
                            <CircularProgress percentage={percentage} />
                        </div>
                    </button>
                );
            })}
            {showBottomSheet && <BottomSheet closeModal={closeBottomSheet} subjectName={selectedSubject} />}
        </div>


    );
};

export default SubjectLayout;
