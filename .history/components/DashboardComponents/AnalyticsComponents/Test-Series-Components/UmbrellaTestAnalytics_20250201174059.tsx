"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Graphicalviewofoverview from "@/components/DashboardComponents/AnalyticsComponents/Test-Series-Components/AllSubjectsComponents/Graphicalviewofoverview";
import TimeAccuracy from "@/components/DashboardComponents/AnalyticsComponents/Test-Series-Components/AllSubjectsComponents/TimeAccuracy";
import Attempts from "@/components/DashboardComponents/AnalyticsComponents/Test-Series-Components/AllSubjectsComponents/AttemptsGraph";
import DifficultyAnalysis from "@/components/DashboardComponents/AnalyticsComponents/Test-Series-Components/AllSubjectsComponents/DifficultyAnalysis";
import Attemptsoverthehours from "@/components/DashboardComponents/AnalyticsComponents/Test-Series-Components/AllSubjectsComponents/Attemptsoverthehours";
import CompleteAnalysis from "@/components/DashboardComponents/AnalyticsComponents/Test-Series-Components/AllSubjectsComponents/CompleteAnalysis";
import Overview from "@/components/DashboardComponents/AnalyticsComponents/Test-Series-Components/AllSubjectsComponents/Overview";
import { Tooltip } from "@nextui-org/react"
import { Tabs, Tab } from "@nextui-org/react";
import { Key } from '@react-types/shared';
import React, { useEffect, useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
interface UmbrellaTestAnalyticsprops {
    onClose: () => void;
    attemptedDetails: AttemptedDetails[];
    sectionName: string;
    testAttemptId: string;
    setTestAttemptId: (attemptId: string) => void;
}

interface SubAttemptDetails {
    attemptedQuestions: string;
    score: string;
    accuracy: string;
    answeredCorrect: string;
    answeredIncorrect: string;
    timeTaken: number;
    questions: AnsweredQuestion[];
    sectionName: string;
    attemptId: string;
}

interface AttemptedDetails {
    userId: string | undefined;
    attemptCount: any;
    attemptedQuestions: string;
    score: string;
    testTime: number;
    accuracy: string;
    sectionName: string;
    answeredCorrect: string;
    answeredIncorrect: string;
    timeTaken: number;
    isUmbrellaTest: boolean;
    questions: AnsweredQuestion[];
    subattempts: SubAttemptDetails[];
    attemptDateAndTime: {
        seconds: number;
        nanoseconds: number;
    };
    attemptId: string;
}
interface FirestoreTimestamp {
    seconds: number;
    nanoseconds: number;
}

type DifficultyLevel = 'Easy' | 'Medium' | 'Hard';


interface AnsweredQuestion {
    questionId: string;
    status: string;
    answered: boolean;
    selectedOption: string | null;
    answeredCorrect: boolean | null;
    allotedTime: number;
    spentTime: number;
    difficulty: DifficultyLevel;
    remarks: string;

}

function formatFirestoreTimestamp(timestamp: FirestoreTimestamp): string {
    const date = new Date(timestamp.seconds * 1000);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}  ${(hours % 12 || 12).toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
}

function formatTimeInSeconds(seconds: number | string): string {
    const totalSeconds = Number(seconds);
    const hours = Math.floor(totalSeconds / 3600); // Calculate hours
    const minutes = Math.floor((totalSeconds % 3600) / 60); // Calculate remaining minutes
    let formattedTime = '';

    if (hours > 0) {
        formattedTime += `${hours}h`; // Add hours if present
    }
    if (minutes > 0 || hours === 0) {
        formattedTime += (formattedTime ? ' ' : '') + `${minutes}m`; // Add minutes
    }

    return formattedTime;
}

function generateTestSummary(attempt: AttemptedDetails | undefined): string {
    if (!attempt) return "No test attempt data available.";

    // Parse key metrics
    const totalQuestions = parseInt(attempt.attemptedQuestions.split('/')[1]);
    const attemptedQuestions = parseInt(attempt.attemptedQuestions.split('/')[0]);
    const correctQuestions = parseInt(attempt.answeredCorrect.split('/')[0]);
    const incorrectQuestions = parseInt(attempt.answeredIncorrect.split('/')[0]);
    const unattemptedQuestions = totalQuestions - attemptedQuestions;
    const accuracy = parseFloat(attempt.accuracy);
    const timeTaken = attempt.timeTaken;
    const totalTestTime = attempt.testTime;

    // Analyze question remarks, ignoring '-'
    const questionRemarks = attempt.questions
        .filter(question => question.remarks !== '-')
        .reduce((acc, question) => {
            acc[question.remarks] = (acc[question.remarks] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

    // Generate summary text
    let summaryText = "";

    // Overall performance assessment
    const performanceScore = (correctQuestions / totalQuestions) * 100;
    let performanceDescription = "";
    if (performanceScore >= 90) performanceDescription = "Excellent";
    else if (performanceScore >= 75) performanceDescription = "Very Good";
    else if (performanceScore >= 60) performanceDescription = "Good";
    else if (performanceScore >= 40) performanceDescription = "Needs Improvement";
    else performanceDescription = "Requires Significant Work";

    summaryText += `1. Overall Performance: ${performanceDescription} (${performanceScore.toFixed(2)}%)\n`;

    // Question breakdown
    summaryText += `2. Question Analysis:\n`;
    summaryText += `   - Total Questions: ${totalQuestions}\n`;
    summaryText += `   - Attempted Questions: ${attemptedQuestions}\n`;
    summaryText += `   - Correct Answers: ${correctQuestions}\n`;
    summaryText += `   - Incorrect Answers: ${incorrectQuestions}\n`;
    summaryText += `   - Unattempted Questions: ${unattemptedQuestions}\n`;

    // Remarks breakdown
    if (Object.keys(questionRemarks).length > 0) {
        summaryText += `3. Question Remarks:\n`;
        Object.entries(questionRemarks).forEach(([remark, count]) => {
            summaryText += `   - ${remark}: ${count} question(s)\n`;
        });
    }

    // Time management
    const timeUtilization = (timeTaken / totalTestTime) * 100;
    summaryText += `4. Time Management:\n`;
    summaryText += `   - Time Taken: ${formatTimeInSeconds(timeTaken)} of ${formatTimeInSeconds(totalTestTime)}\n`;
    summaryText += `   - Time Utilization: ${timeUtilization.toFixed(2)}%\n`;

    // Accuracy insights
    summaryText += `5. Accuracy:\n`;
    summaryText += `   - Overall Accuracy: ${accuracy.toFixed(2)}%\n`;

    // Performance improvement suggestions
    summaryText += `\nImprovement Suggestions:\n`;
    if (unattemptedQuestions > 0) {
        summaryText += `- Focus on time management to attempt all questions.\n`;
    }
    if (incorrectQuestions > correctQuestions) {
        summaryText += `- Review and understand the concepts behind incorrect answers.\n`;
    }
    if (questionRemarks['Overtime'] || questionRemarks['Wasted']) {
        summaryText += `- Work on optimizing your problem-solving speed and question selection strategy.\n`;
    }

    return summaryText;
}

function generateSubTestSummary(attempt: SubAttemptDetails | undefined, totalTestTime: number): string {
    if (!attempt) return "No test attempt data available.";

    // Parse key metrics
    const totalQuestions = parseInt(attempt.attemptedQuestions.split('/')[1]);
    const attemptedQuestions = parseInt(attempt.attemptedQuestions.split('/')[0]);
    const correctQuestions = parseInt(attempt.answeredCorrect.split('/')[0]);
    const incorrectQuestions = parseInt(attempt.answeredIncorrect.split('/')[0]);
    const unattemptedQuestions = totalQuestions - attemptedQuestions;
    const accuracy = parseFloat(attempt.accuracy);
    const timeTaken = attempt.timeTaken;

    // Analyze question remarks, ignoring '-'
    const questionRemarks = attempt.questions
        .filter(question => question.remarks !== '-')
        .reduce((acc, question) => {
            acc[question.remarks] = (acc[question.remarks] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

    // Generate summary text
    let summaryText = "";

    // Overall performance assessment
    const performanceScore = (correctQuestions / totalQuestions) * 100;
    let performanceDescription = "";
    if (performanceScore >= 90) performanceDescription = "Excellent";
    else if (performanceScore >= 75) performanceDescription = "Very Good";
    else if (performanceScore >= 60) performanceDescription = "Good";
    else if (performanceScore >= 40) performanceDescription = "Needs Improvement";
    else performanceDescription = "Requires Significant Work";

    summaryText += `1. ${attempt.sectionName} Performance: ${performanceDescription} (${performanceScore.toFixed(2)}%)\n`;

    // Question breakdown
    summaryText += `2. Question Analysis:\n`;
    summaryText += `   - Total Questions: ${totalQuestions}\n`;
    summaryText += `   - Attempted Questions: ${attemptedQuestions}\n`;
    summaryText += `   - Correct Answers: ${correctQuestions}\n`;
    summaryText += `   - Incorrect Answers: ${incorrectQuestions}\n`;
    summaryText += `   - Unattempted Questions: ${unattemptedQuestions}\n`;

    // Remarks breakdown
    if (Object.keys(questionRemarks).length > 0) {
        summaryText += `3. Question Remarks:\n`;
        Object.entries(questionRemarks).forEach(([remark, count]) => {
            summaryText += `   - ${remark}: ${count} question(s)\n`;
        });
    }

    // Time management
    const timeUtilization = (timeTaken / totalTestTime) * 100;
    summaryText += `4. Time Management:\n`;
    summaryText += `   - Time Taken: ${formatTimeInSeconds(timeTaken)} of ${formatTimeInSeconds(totalTestTime)}\n`;
    summaryText += `   - Time Utilization: ${timeUtilization.toFixed(2)}%\n`;

    // Accuracy insights
    summaryText += `5. Accuracy:\n`;
    summaryText += `   - ${attempt.sectionName} Accuracy: ${accuracy.toFixed(2)}%\n`;

    // Performance improvement suggestions
    summaryText += `\nImprovement Suggestions:\n`;
    if (unattemptedQuestions > 0) {
        summaryText += `- Focus on time management to attempt all questions.\n`;
    }
    if (incorrectQuestions > correctQuestions) {
        summaryText += `- Review and understand the concepts behind incorrect answers.\n`;
    }
    if (questionRemarks['Overtime'] || questionRemarks['Wasted']) {
        summaryText += `- Work on optimizing your problem-solving speed and question selection strategy.\n`;
    }

    return summaryText;
}

function UmbrellaTestAnalytics({ onClose, attemptedDetails = [], sectionName, testAttemptId, setTestAttemptId }: UmbrellaTestAnalyticsprops) {
    const router = useRouter();
    const [attemptPopover, setAttemptPopover] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");
    const sectionMap = {
        'overview': '#overview',
        'graphical-view': '#Graphicalviewofoverview',
        'time-accuracy': '#TimeAccuracy',
        'attempts': '#Attempts',
        'difficulty-analysis': '#DifficultyAnalysis',
        'attempts-3-hours': '#Attemptsoverthe3hours',
        'complete-analysis': '#CompleteAnalysis',
        'summary': '#Summary'
    } as const;

    const handleTabChange = React.useCallback((key: Key) => {
        const sectionSelector = sectionMap[key as keyof typeof sectionMap];
        const element = document.querySelector(sectionSelector);

        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, [sectionMap]);
    const currentAttempt = attemptedDetails.find(attempt => attempt.attemptId === testAttemptId);

    const scrollContainerRef = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
        const handleScroll = () => {
            if (!scrollContainerRef.current) return;

            const scrollContainer = scrollContainerRef.current;
            const containerTop = scrollContainer.getBoundingClientRect().top;
            const containerHeight = scrollContainer.clientHeight;
            const scrollPosition = scrollContainer.scrollTop;

            // Find the section that takes up the most space in the viewport
            let maxVisibleSection = {
                key: activeTab,
                visibility: 0
            };

            Object.entries(sectionMap).forEach(([key, id]) => {
                const section = document.querySelector(id);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    const sectionTop = rect.top - containerTop;
                    const sectionBottom = rect.bottom - containerTop;

                    // Calculate how much of the section is visible
                    const visibleTop = Math.max(0, sectionTop);
                    const visibleBottom = Math.min(containerHeight, sectionBottom);
                    const visibleHeight = Math.max(0, visibleBottom - visibleTop);

                    // Update if this section has more visible area
                    if (visibleHeight > maxVisibleSection.visibility) {
                        maxVisibleSection = {
                            key,
                            visibility: visibleHeight
                        };
                    }
                }
            });

            // Only update if we found a section with better visibility
            if (maxVisibleSection.key !== activeTab) {
                setActiveTab(maxVisibleSection.key);
            }
        };

        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener("scroll", handleScroll);
            // Initial check
            handleScroll();
        }

        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener("scroll", handleScroll);
            }
        };
    }, [activeTab, sectionMap]);

    return (
        <div className="flex flex-1 flex-col h-auto overflow-y-auto pt-3">

            <div>
                <div className="flex flex-row gap-5 ml-8 items-center mb-1">
                    <div className="hover:bg-[#EDE4FF]  rounded-2xl px-3 py-1">
                        <button className="flex flex-row items-center gap-[6px]" onClick={() => onClose()}>
                            <Image src='/icons/arrow-left-02-round.svg' alt='back' width={20} height={20} />
                            <span className="font-bold text-[#1D2939] text-base">{sectionName}</span>
                        </button>
                    </div>
                    <Popover placement="bottom-start" isOpen={attemptPopover} onOpenChange={(open) => setAttemptPopover(open)} >
                        <PopoverTrigger>
                            <div onClick={() => setAttemptPopover(true)} className="bg-[#EDE4FF] rounded-md  items-center justify-center flex  outline-none transition-colors duration-150 cursor-pointer">
                                <div className="flex flex-row items-center gap-2 p-2">
                                    <span className="font-medium text-xs text-[#9012FF]">  {currentAttempt ? `Attempt ${[...attemptedDetails].sort((a, b) => b.attemptDateAndTime.seconds - a.attemptDateAndTime.seconds).indexOf(currentAttempt) + 1} - ${formatFirestoreTimestamp(currentAttempt.attemptDateAndTime)}` : 'Select Attempt'}</span>
                                    <Image
                                        src="/icons/arrow-down-01-round.svg"
                                        width={18}
                                        height={18}
                                        alt="Arrow-button"
                                    />
                                </div>

                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto px-0 py-1 rounded-md border border-lightGrey max-h-[400px] overflow-y-auto block ">
                            {[...attemptedDetails]
                                .sort((a, b) => b.attemptDateAndTime.seconds - a.attemptDateAndTime.seconds)
                                .map((attempt, index) => (
                                    <button
                                        key={attempt.attemptId}
                                        onClick={() => { setTestAttemptId(attempt.attemptId); setAttemptPopover(false) }}
                                        className='flex flex-row items-center w-full my-1  px-4 py-[10px] gap-1 transition-colors duration-150 hover:bg-[#EDE4FF]'
                                    >
                                        <p className='text-sm text-[#0C111D] font-normal'>
                                            Attempt {index + 1} - {formatFirestoreTimestamp(attempt.attemptDateAndTime)}
                                        </p>
                                    </button>
                                ))}
                        </PopoverContent>
                    </Popover>
                </div>

                {/* scroll anchoring */}
                <div className="h-[50px] px-8 border-b border-solid border-[#EAECF0] flex flex-row overflow-x-scroll w-full overflow-y-hidden [&::-webkit-scrollbar]:h-[4px] [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:bg-gray-100">
                    <Tabs
                        aria-label="Analytics Tabs"
                        color="primary"
                        variant="underlined"
                        selectedKey={activeTab}
                        onSelectionChange={(key) => {
                            const sectionId = String(key);
                            setTimeout(() => {
                                handleTabChange(key);
                            }, 100);
                            setActiveTab(sectionId);
                            document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
                        }}
                        classNames={{
                            tabList: "gap-6 w-full relative rounded-none p-0 min-w-max", // Added min-w-max
                            cursor: "w-full bg-[#7400E0]",
                            tab: "max-w-fit px-0 h-12 whitespace-nowrap", // Added whitespace-nowrap
                            tabContent: "group-data-[selected=true]:text-[#7400E0] hover:text-[#7400E0] text-[15px] font-medium",
                        }}
                    >
                        <Tab key="overview" title="Overview" />
                        <Tab key="graphical-view" title="Graphical view of overview" />
                        <Tab key="time-accuracy" title="Time & Accuracy" />
                        <Tab key="attempts" title="Attempts" />
                        <Tab key="difficulty-analysis" title="Difficulty Analysis" />
                        {/* <Tab key="attempts-3-hours" title="Attempts over the 3 hours" /> */}
                        <Tab key="complete-analysis" title="Complete Analysis" />
                        <Tab key="summary" title="Summary" />
                    </Tabs>
                </div>
            </div>
            <div ref={scrollContainerRef} className="overflow-y-auto flex-1 flex flex-col h-auto px-8">
                {/* overview Line */}
                <div id="overview" className="flex flex-col gap-6 pt-6">
                    {/* <Overview /> */}
                    {/* Overall Data */}
                    <div className="h-[44px] flex flex-col justify-end  gap-1">
                        <span className="text-[#1D2939] text-lg font-semibold">Overview</span>
                        <span className="font-normal text-[#475467] text-sm">Summary of marks scored in the test</span>
                    </div>
                    <div className="  ">
                        <div className="bg-white p-4 flex flex-col rounded-2xl border border-lightGrey">
                            <div className="flex flex-row justify-between">
                                {/* Total Questions */}
                                <div className="flex flex-1 flex-row justify-between pr-4">
                                    <div className="flex flex-col gap-2">
                                        <div className="font-normal text-xs text-[#667085]">Total Questions</div>
                                        <h3 className="text-[15px]">{currentAttempt?.attemptedQuestions.split('/')[1]}</h3>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <div className="w-px bg-lightGrey h-4/5"></div>
                                    </div>
                                </div>

                                {/* Attempted Questions */}
                                <div className="flex flex-1 flex-row justify-between pr-4">
                                    <div className="flex flex-col gap-2">
                                        <div className="font-normal text-xs text-[#667085]">Attempted Questions</div>
                                        <h3 className="text-[15px]">{currentAttempt?.attemptedQuestions.split('/')[0]}</h3>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <div className="w-px bg-lightGrey h-4/5"></div>
                                    </div>
                                </div>

                                {/* Time Taken */}
                                <div className="flex flex-1 flex-col gap-2">
                                    <div className="font-normal text-xs text-[#667085]">Time Taken</div>
                                    <h3 className="text-[15px]">{formatTimeInSeconds(currentAttempt?.timeTaken || '0')} of {formatTimeInSeconds(currentAttempt?.testTime || '0')}</h3>
                                </div>
                            </div>

                            {/* Additional Stats */}
                            <div className="flex flex-row justify-between mt-9">
                                <div className="flex flex-1 flex-row justify-between pr-4">
                                    <div className="flex flex-col gap-2">
                                        <div className="font-normal text-xs text-[#667085]">Answered Correct</div>
                                        <h3 className="text-[15px]">{currentAttempt?.answeredCorrect.split('/')[0]}</h3>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <div className="w-px bg-lightGrey h-4/5"></div>
                                    </div>
                                </div>

                                <div className="flex flex-1 flex-row justify-between pr-4">
                                    <div className="flex flex-col gap-2">
                                        <div className="font-normal text-xs text-[#667085]">Answered Incorrect</div>
                                        <h3 className="text-[15px]">{currentAttempt?.answeredIncorrect.split('/')[0]}</h3>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <div className="w-px bg-lightGrey h-4/5"></div>
                                    </div>
                                </div>

                                <div className="flex flex-1 flex-col gap-2">
                                    <div className="font-normal text-xs text-[#667085]">Total Score</div>
                                    <h3 className="text-[15px]">{currentAttempt?.score.split('/')[0]}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Overall Data Table */}
                    <div className="h-auto rounded-xl bg-[#FFFFFF] border border-solid border-[#EAECF0]">
                        <table className="w-full rounded-xl bg-white text-sm font-medium">
                            <thead>
                                <tr className="text-[#667085]">
                                    <th className="w-[10%] px-8 py-3 text-left">Subject</th>
                                    <th className="w-[10%] text-center">Score</th>
                                    <th className="w-[10%] text-center">Correct</th>
                                    <th className="w-[10%] text-center">Incorrect</th>
                                    <th className="w-[10%] text-center">Unattempted</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-t border-[#EAECF0]">
                                    <td className="px-8 py-3 text-left text-[#1D2939] font-semibold text-sm">Overall</td>
                                    <td className="px-8 py-3 text-center text-[#1D2939] font-normal text-sm">{currentAttempt?.score}</td>
                                    <td className="px-8 py-3 text-center text-[#1D2939] font-normal text-sm">{currentAttempt?.answeredCorrect}</td>
                                    <td className="px-8 py-3 text-center text-[#1D2939] font-normal text-sm">{currentAttempt?.answeredIncorrect}</td>
                                    <td className="px-8 py-3 text-center text-[#1D2939] font-normal text-sm">
                                        {currentAttempt?.attemptedQuestions ?
                                            `${Number(currentAttempt.attemptedQuestions.split('/')[1]) - Number(currentAttempt.attemptedQuestions.split('/')[0])}/${currentAttempt.attemptedQuestions.split('/')[1]}`
                                            : '0/0'}
                                    </td>
                                </tr>
                                {currentAttempt?.subattempts.map((subattempt, index) => (
                                    <tr key={index} className="border-t border-[#EAECF0]">
                                        <td className="px-8 py-3 text-left text-[#1D2939] font-semibold text-sm">{subattempt.sectionName}</td>
                                        <td className="px-8 py-3 text-center text-[#1D2939] font-normal text-sm">{subattempt.score}</td>
                                        <td className="px-8 py-3 text-center text-[#1D2939] font-normal text-sm">{subattempt.answeredCorrect}</td>
                                        <td className="px-8 py-3 text-center text-[#1D2939] font-normal text-sm">{subattempt.answeredIncorrect}</td>
                                        <td className="px-8 py-3 text-center text-[#1D2939] font-normal text-sm">{subattempt?.attemptedQuestions ?
                                            `${Number(subattempt.attemptedQuestions.split('/')[1]) - Number(subattempt.attemptedQuestions.split('/')[0])}/${subattempt.attemptedQuestions.split('/')[1]}`
                                            : '0/0'}</td>
                                    </tr>
                                ))}


                            </tbody>
                        </table>
                    </div>
                </div>
                {/* --------------------------------------******************************************************---------------------------------------------- */}
                {/* Graphical view of overview */}
                <div id="Graphicalviewofoverview" className=" flex flex-col">
                    <div className="h-[44px] flex flex-col justify-end mb-4">
                        <span className="text-[#1D2939] text-lg font-semibold">Graphical view of overview</span>
                    </div>
                    <div>
                        <Graphicalviewofoverview questions={currentAttempt?.questions || []} subattempts={currentAttempt?.subattempts || []} />
                    </div>
                </div>
                {/* --------------------------------------******************************************************---------------------------------------------- */}
                {/* Time & Accuracy */}
                <div id="TimeAccuracy" className="flex flex-col">
                    <div className="h-[44px] flex flex-row  mb-2 items-center gap-2">
                        <span className="text-[#1D2939] text-lg font-semibold ">Time & Accuracy</span>
                    </div>
                    <div>
                        <TimeAccuracy questions={currentAttempt?.questions || []} subattempts={currentAttempt?.subattempts || []} overallAccuracy={currentAttempt?.accuracy || ''} overallTimeTaken={currentAttempt?.timeTaken || 0} />
                    </div>
                </div>
                {/* --------------------------------------******************************************************---------------------------------------------- */}
                {/* Attempts */}
                <div id="Attempts" className=" flex flex-col">
                    <div className="h-[44px] flex flex-col justify-end mb-4">
                        <span className="text-[#1D2939] text-lg font-semibold">Attempts</span>
                    </div>
                    {/* Attempts table */}
                    <div className="h-auto w-full mb-4 rounded-xl border border-lightGrey">
                        <table className="w-full rounded-xl bg-white text-sm font-medium">
                            <thead>
                                <tr className="text-[#667085]">
                                    <th className="w-[20%] py-3">
                                        <div className="flex flex-row text-left pl-6 ">
                                            Subject
                                        </div>
                                    </th>
                                    <th className="w-[20%] py-3">
                                        <div className="flex flex-row justify-center">
                                            Perfect
                                            <Tooltip
                                                content="Correct attempt within the time limit"
                                                placement="right"
                                                placement="top"
                                                offset={15}
                                                closeDelay={100}
                                                classNames={{
                                                    content: [
                                                        "bg-black text-white py-3 max-w-[240px]",
                                                        "rounded-md text-center font-normal text-[12px]",
                                                        "after:content-[''] after:absolute after:top-full after:left-1/2 after:-ml-2",
                                                        "after:border-8 after:border-transparent after:border-t-black",
                                                    ],
                                                }}
                                            >
                                                <Image
                                                    src="/icons/information-circle.svg"
                                                    width={16}
                                                    height={16}
                                                    alt="information-icon"
                                                    className="ml-1"
                                                />
                                            </Tooltip>
                                        </div>
                                    </th>
                                    <th className="w-[20%] py-3">
                                        <div className="flex flex-row justify-center">
                                            Wasted
                                            <Tooltip
                                                content=" Incorrect attempt solved quickly"
                                                placement="right"
                                                offset={15}
                                                closeDelay={100}
                                                classNames={{
                                                    content: [
                                                        "bg-[#222222] text-white text-sm py-2 px-4 rounded-md",
                                                    ],
                                                }}
                                            >
                                                <Image
                                                    src="/icons/information-circle.svg"
                                                    width={16}
                                                    height={16}
                                                    alt="information-icon"
                                                    className="ml-1"
                                                />
                                            </Tooltip>
                                        </div>
                                    </th>
                                    <th className="w-[20%] py-3">
                                        <div className="flex flex-row justify-center">
                                            Overtime
                                            <Tooltip
                                                content="Correct attempt exceeding the time limit"
                                                placement="right"
                                                offset={15}
                                                closeDelay={100}
                                                classNames={{
                                                    content: [
                                                        "bg-[#222222] text-white text-sm py-2 px-4 rounded-md",
                                                    ],
                                                }}
                                            >
                                                <Image
                                                    src="/icons/information-circle.svg"
                                                    width={16}
                                                    height={16}
                                                    alt="information-icon"
                                                    className="ml-1"
                                                />
                                            </Tooltip>
                                        </div>
                                    </th>
                                    <th className="w-[20%] py-3">
                                        <div className="flex flex-row justify-center">
                                            Confused
                                            <Tooltip
                                                content="Time spent but no attempt made"
                                                placement="right"
                                                offset={15}
                                                closeDelay={100}
                                                classNames={{
                                                    content: [
                                                        "bg-[#222222] text-white text-sm py-2 px-4 rounded-md",
                                                    ],
                                                }}
                                            >
                                                <Image
                                                    src="/icons/information-circle.svg"
                                                    width={16}
                                                    height={16}
                                                    alt="information-icon"
                                                    className="ml-1"
                                                />
                                            </Tooltip>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-t border-[#EAECF0]">
                                    <td className="py-3 text-left pl-6 text-[#1D2939] font-semibold text-sm">Overall</td>
                                    <td className="py-3 text-center text-[#1D2939] font-normal text-sm">
                                        {currentAttempt?.questions.filter(q => q.remarks === 'Perfect').length}
                                    </td>
                                    <td className="py-3 text-center text-[#1D2939] font-normal text-sm">
                                        {currentAttempt?.questions.filter(q => q.remarks === 'Wasted').length}
                                    </td>
                                    <td className="py-3 text-center text-[#1D2939] font-normal text-sm">
                                        {currentAttempt?.questions.filter(q => q.remarks === 'Overtime').length}
                                    </td>
                                    <td className="py-3 text-center text-[#1D2939] font-normal text-sm">
                                        {currentAttempt?.questions.filter(q => q.remarks === 'Confused').length}
                                    </td>
                                </tr>
                                {currentAttempt?.subattempts.map((subattempt, index) => (
                                    <tr key={index} className="border-t border-[#EAECF0]">
                                        <td className="py-3 text-left pl-6 text-[#1D2939] font-semibold text-sm">{subattempt.sectionName}</td>
                                        <td className="py-3 text-center text-[#1D2939] font-normal text-sm">{subattempt?.questions.filter(q => q.remarks === 'Perfect').length}</td>
                                        <td className="py-3 text-center text-[#1D2939] font-normal text-sm">{subattempt?.questions.filter(q => q.remarks === 'Wasted').length}
                                        </td>
                                        <td className="py-3 text-center text-[#1D2939] font-normal text-sm">{subattempt?.questions.filter(q => q.remarks === 'Overtime').length}
                                        </td>
                                        <td className="py-3 text-center text-[#1D2939] font-normal text-sm">{subattempt?.questions.filter(q => q.remarks === 'Confused').length}
                                        </td>
                                    </tr>
                                ))}


                            </tbody>
                        </table>
                    </div>

                    {/* Attempts Graph */}
                    <div >
                        <Attempts questions={currentAttempt?.questions || []} subattempts={currentAttempt?.subattempts || []} />
                    </div>
                </div>
                {/* --------------------------------------******************************************************---------------------------------------------- */}
                {/* Difficulty Analysis */}
                <div id="DifficultyAnalysis" className="flex flex-col">
                    <div className="h-[44px] flex flex-row  mb-2 items-center gap-2">
                        <span className="text-[#1D2939] text-lg font-semibold "> Difficulty Analysis</span>
                    </div>
                    {/* Difficulty Analysis  graph*/}
                    <div>
                        <  DifficultyAnalysis questions={currentAttempt?.questions || []} subattempts={currentAttempt?.subattempts || []} />
                    </div>
                </div>
                {/* --------------------------------------******************************************************---------------------------------------------- */}
                {/* Attempts over the 3 hours */}
                {/* <div id="Attemptsoverthe3hours" className="flex flex-col">
                    <div className="h-[44px] flex flex-row items-center gap-2 mb-2">
                        <span className="text-[#1D2939] text-lg font-semibold ">  Attempts over the 3 hours</span>
                    </div>
                    <div>
                        <  Attemptsoverthehours />
                    </div>
                </div> */}

                {/* --------------------------------------******************************************************---------------------------------------------- */}
                {/* Complete Analysis */}
                <div id="CompleteAnalysis" className="flex flex-col">
                    <div className="h-[44px] flex flex-col mt-2">
                        <span className="text-[#1D2939] text-lg font-semibold">Complete Analysis </span>
                    </div>
                    <div className="h-auto rounded-xl  bg-[#FFFFFF] border border-solid border-[#EAECF0]">
                        <table className="w-full rounded-xl bg-white text-sm font-medium">
                            <thead>
                                <tr className="text-[#667085]">
                                    <th className="w-[7%] px-8 py-3 text-center">Q. no.</th>
                                    {/* <th className="w-[10%] text-left">Chapter</th> */}
                                    <th className="w-[10%] text-center">Difficulty</th>
                                    <th className="w-[10%] text-center">Allotted</th>
                                    <th className="w-[10%] text-center">Spent</th>
                                    <th className="w-[10%] text-center">Attempted</th>
                                    <th className="w-[10%] text-center">Answer</th>
                                    <th className="w-[10%] text-center">Remarks</th>
                                </tr>
                            </thead>
                            <tbody className="border-b border-[#EAECF0]">
                                {currentAttempt?.questions.map((question, index) => (
                                    <tr key={index} className="border-t border-[#EAECF0]">
                                        <td className="py-3 text-center text-[#1D2939] font-normal text-sm">{index + 1}</td>
                                        {/* <td className="py-3 text-left text-[#1D2939] font-semibold text-sm">Current Electricity</td> */}
                                        <td className="py-3 text-center text-[#1D2939] font-normal text-sm">{question.difficulty}</td>
                                        <td className="py-3 text-center text-[#1D2939] font-normal text-sm">{question.allotedTime}s</td>
                                        <td className="py-3 text-center text-[#1D2939] font-normal text-sm">{question.spentTime}s</td>
                                        <td className="py-3 text-center text-[#1D2939] font-normal text-sm">{question.answered ? 'Yes' : 'No'}</td>
                                        <td className={`py-3 text-center ${question.answered ? question.answeredCorrect ? 'text-[#0B9055]' : 'text-[#DE3024]' : 'text-[#667085]'} font-medium text-sm`}>{question.answered ? question.answeredCorrect ? 'Correct' : 'Incorrect' : '-'}</td>
                                        <td className={`py-3 text-center font-medium text-sm ${question.remarks === 'Perfect' ? 'text-[#0B9055]' :
                                            question.remarks === 'Overtime' ? 'text-[#C74FE6]' :
                                                question.remarks === 'Wasted' ? 'text-[#DE3024]' :
                                                    'text-[#667085]'
                                            }`}>{question.remarks}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
                {/* --------------------------------------******************************************************---------------------------------------------- */}
                {/* Summary */}
                <div id="Summary" className="flex flex-col">
                    <div className="h-[44px] flex flex-row items-center  mb-2 gap-2">
                        <span className="text-[#1D2939] text-lg font-semibold ">Summary</span>
                    </div>

                    <div className="flex flex-col mb-8 gap-4">
                        <div className="h-auto bg-[#FFFFFF] border border-solid border-[#EAECF0] p-3  rounded-md">
                            <div className=" flex flex-col gap-2 ml-2">
                                <span className="font-semibold text-[#1D2939] text-sm">Overall</span>
                                <div className="h-auto mb-6 text-[#667085] font-normal text-sm whitespace-pre-line">
                                    {generateTestSummary(currentAttempt)}
                                </div>
                            </div>
                        </div>
                        {currentAttempt?.subattempts.map((subattempt, index) => (
                            <div key={index} className="h-auto bg-[#FFFFFF] border border-solid border-[#EAECF0] p-3  rounded-md">
                                <div className=" flex flex-col gap-2 ml-2">
                                    <span className="font-semibold text-[#1D2939] text-sm">{subattempt.sectionName}</span>
                                    <div className="h-auto mb-6 text-[#667085] font-normal text-sm whitespace-pre-line">
                                        {generateSubTestSummary(subattempt, currentAttempt?.testTime || 0)}
                                    </div>
                                </div>
                            </div>
                        ))}


                    </div>
                </div>
            </div>
            {/* --------------------------------------******************************************************---------------------------------------------- */}

        </div>
    )
}
export default UmbrellaTestAnalytics;