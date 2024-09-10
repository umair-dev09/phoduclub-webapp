
// "use client";

// import styles from '../homeComponents.module.css';
// import Image from 'next/image';
// import { useState } from 'react';
// import { BottomSheet } from 'react-spring-bottom-sheet';
// import 'react-spring-bottom-sheet/dist/style.css';


// interface CircularProgressProps {
//     percentage: number;
// }

// const CircularProgress: React.FC<CircularProgressProps> = ({ percentage }) => {
//     const normalizedPercentage = Math.min(Math.max(percentage, 0), 100);
//     const progressColor = normalizedPercentage === 100 ? '#98A2B3' : '#7400E0';
//     // function for POPUP

//     return (
//         <div className={styles.progressValue}>
//             <svg className={styles.circular} viewBox="0 0 36 36">
//                 <path
//                     className={styles.circleBackground}
//                     d="M18 2.0845 A 15.9155 15.9155 0 0 1 18 33.9155 A 15.9155 15.9155 0 0 1 18 2.0845"
//                 />
//                 <path
//                     className={styles.circleProgress}
//                     style={{ stroke: progressColor }}
//                     strokeDasharray={`${normalizedPercentage} ${100 - normalizedPercentage}`}
//                     d="M18 2.0845 A 15.9155 15.9155 0 0 1 18 33.9155 A 15.9155 15.9155 0 0 1 18 2.0845"
//                 />
//             </svg>
//             <div className={styles.label}>
//                 {normalizedPercentage}%
//             </div>
//         </div>
//     );
// };

// const SubjectLayout: React.FC = () => {

//     const handleButtonClickAndOpen = (subjectName: string) => {
//         handleButtonClick(subjectName);
//         setOpen(true);
//     };
//     const [open, setOpen] = useState(false);
//     const renderCheckmark = (percentage: number) => {
//         return percentage === 100 ? (
//             <div className={styles.checkIcon}>
//                 <Image
//                     src="/icons/checkmark.svg"
//                     alt="checkmark-icon"
//                     width={14}
//                     height={14}
//                 />
//             </div>
//         ) : null;
//     };

//     const subjectsData = [
//         { name: 'Overall', numerator: 98, denominator: 98, icon: '/icons/overall.svg' },
//         { name: 'Physics', numerator: 0, denominator: 33, icon: '/icons/physics.svg' },
//         { name: 'Chemistry', numerator: 8, denominator: 34, icon: '/icons/chemistry.svg' },
//         { name: 'Maths', numerator: 15, denominator: 31, icon: '/icons/maths.svg' },
//     ];

//     const calculatePercentage = (numerator: number, denominator: number) => {
//         if (denominator == 0) return 0;
//         return Math.round((numerator / denominator) * 100);
//     };

//     return (
//         <div className={styles.container}>
//             {subjectsData.map(subject => {
//                 const percentage = calculatePercentage(subject.numerator, subject.denominator);
//                 return (
//                     <button
//                         onClick={() => handleButtonClickAndOpen(subject.name)}
//                         className={styles.Buttons}
//                         key={subject.name}
//                     >
//                         <div className={styles.box1}>
//                             <div className={styles.IconContainer}>
//                                 <Image
//                                     src={subject.icon}
//                                     alt={`${subject.name}-icon`}
//                                     width={20}
//                                     height={20}
//                                     className={styles[subject.name.toLowerCase()]}
//                                 />
//                                 <div className={styles.work}>{subject.name}</div>
//                                 {renderCheckmark(percentage)}
//                             </div>
//                             <div className={styles.totalMarks}>
//                                 <span className={styles.numerator}>{subject.numerator}</span>
//                                 <span className={styles.denominator}>/{subject.denominator}</span>
//                             </div>
//                         </div>
//                         <div className={styles.progressValue}>
//                             <CircularProgress percentage={percentage} />
//                         </div>
//                     </button>
//                 );
//             })}
//             <BottomSheet
//                 open={open}
//                 onDismiss={() => setOpen(false)}
//             >
//                 <h2>Popup Content</h2>
//                 <button onClick={() => setOpen(false)}>Close</button>
//             </BottomSheet>
//         </div>
//     );
// };

// export default SubjectLayout;
"use client";

import styles from '../homeComponents.module.css';
import Image from 'next/image';
import { useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';

interface CircularProgressProps {
    percentage: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ percentage }) => {
    const normalizedPercentage = Math.min(Math.max(percentage, 0), 100);
    const progressColor = normalizedPercentage === 100 ? '#98A2B3' : '#7400E0';

    return (
        <div className={styles.progressValue}>
            <svg className={styles.circular} viewBox="0 0 36 36">
                <path
                    className={styles.circleBackground}
                    d="M18 2.0845 A 15.9155 15.9155 0 0 1 18 33.9155 A 15.9155 15.9155 0 0 1 18 2.0845"
                />
                <path
                    className={styles.circleProgress}
                    style={{ stroke: progressColor }}
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
    const [open, setOpen] = useState(false);



    const handleButtonClickAndOpen = (subjectName: string) => {
        handleButtonClickAndOpen(subjectName);
        setOpen(true);
    };

    const renderCheckmark = (percentage: number) => {
        return percentage === 100 ? (
            <div className={styles.checkIcon}>
                <Image
                    src="/icons/checkmark.svg"
                    alt="checkmark-icon"
                    width={14}
                    height={14}
                />
            </div>
        ) : null;
    };

    const subjectsData = [
        { name: 'Overall', numerator: 98, denominator: 98, icon: '/icons/overall.svg' },
        { name: 'Physics', numerator: 0, denominator: 33, icon: '/icons/physics.svg' },
        { name: 'Chemistry', numerator: 8, denominator: 34, icon: '/icons/chemistry.svg' },
        { name: 'Maths', numerator: 15, denominator: 31, icon: '/icons/maths.svg' },
    ];

    const calculatePercentage = (numerator: number, denominator: number) => {
        if (denominator === 0) return 0;
        return Math.round((numerator / denominator) * 100);
    };

    return (
        <div className={styles.container}>
            {subjectsData.map(subject => {
                const percentage = calculatePercentage(subject.numerator, subject.denominator);
                return (
                    <button
                        onClick={() => handleButtonClickAndOpen(subject.name)}
                        className={styles.Buttons}
                        key={subject.name}
                    >
                        <div className={styles.box1}>
                            <div className={styles.IconContainer}>
                                <Image
                                    src={subject.icon}
                                    alt={`${subject.name}-icon`}
                                    width={20}
                                    height={20}
                                    className={styles[subject.name.toLowerCase()]}
                                />
                                <div className={styles.work}>{subject.name}</div>
                                {renderCheckmark(percentage)}
                            </div>
                            <div className={styles.totalMarks}>
                                <span className={styles.numerator}>{subject.numerator}</span>
                                <span className={styles.denominator}>/{subject.denominator}</span>
                            </div>
                        </div>
                        <div className={styles.progressValue}>
                            <CircularProgress percentage={percentage} />
                        </div>
                    </button>
                );
            })}
            <BottomSheet
                open={open}
                onDismiss={() => setOpen(false)}
            >
                <h2>Popup Content for {open}</h2>
                <button onClick={() => setOpen(false)}>Close</button>
            </BottomSheet>
        </div>
    );
};

export default SubjectLayout;

