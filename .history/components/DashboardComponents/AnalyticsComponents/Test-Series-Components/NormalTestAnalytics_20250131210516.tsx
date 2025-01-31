"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AttemptsDifficultyAnalysis from "@/components/DashboardComponents/AnalyticsComponents/Test-Series-Components/PhysicsComponents/AttemptsDifficultyAnalysis"
import Attemptsoverthehours from "@/components/DashboardComponents/AnalyticsComponents/Test-Series-Components/PhysicsComponents/Attemptsoverthehours"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Tabs, Tab } from "@nextui-org/react";
import { Key } from '@react-types/shared';
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import React, { useState, useEffect, useCallback } from "react";
interface NormalTestAnalyticsprops {
    onClose: () => void;
    forallsubject?: boolean;
    attemptedDetails: AttemptedDetails[];
    sectionName: string;
    testAttemptId: string;
    setTestAttemptId: (attemptId: string) => void;
}

interface AttemptedDetails {
    userId: string | undefined;
    attemptCount: any;
    attemptedQuestions: string;
    score: string;
    testTime: number;
    accuracy: string;
    answeredCorrect: string;
    isUmbrellaTest: boolean;
    answeredIncorrect: string;
    timeTaken: number;
    questions: AnsweredQuestion[];
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
    let summaryText = "Test Performance Summary:\n\n";

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
function NormalTestAnalytics({ onClose, forallsubject = false, attemptedDetails, sectionName, testAttemptId, setTestAttemptId }: NormalTestAnalyticsprops) {

    const router = useRouter();
    let [showpremiumDialog, setShowpremiumDialog] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");
    const sectionMap = {
        'overview': '#overview',
        'attempts-difficulty-analysis': '#Attempts',
        'attempts-over-3-hours': '#Attemptsoverthe3hours',
        'complete-analysis': '#CompleteAnalysis',
        'summary': '#Summary'
    } as const;
    const [attemptPopover, setAttemptPopover] = useState(false);

    const handleTabChange = React.useCallback((key: Key) => {
        const sectionSelector = sectionMap[key as keyof typeof sectionMap];
        const element = document.querySelector(sectionSelector);

        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, [sectionMap]);
    const currentAttempt = attemptedDetails.find(attempt => attempt.attemptId === testAttemptId);

    useEffect(() => {
        const observerOptions = {
            root: null, // Observe relative to the viewport
            threshold: 0.5, // Trigger when 50% of the section is visible
        };

        const observerCallback = (entries: any[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveTab(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        Object.values(sectionMap).forEach((id: string) => {
            const section = document.getElementById(id.substring(1));
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);




    return (
        <div className="flex flex-1 flex-col h-auto overflow-y-auto pt-3">
            {/* heading */}
            <div>
                <div className="flex flex-row gap-5 ml-8 items-center mb-1">

                    <div className="hover:bg-[#EDE4FF] rounded-2xl px-3 py-1">
                        <button className="flex flex-row items-center gap-[6px]" onClick={() => onClose()}>
                            <Image src='/icons/arrow-left-02-round.svg' alt='back' width={20} height={20} />
                            <span className="font-bold text-[#1D2939] text-base">{sectionName}</span>
                        </button>
                    </div>
                    <Popover placement="bottom-start" isOpen={attemptPopover} onOpenChange={(open) => setAttemptPopover(open)} >
                        <PopoverTrigger>
                            <button onClick={() => setAttemptPopover(true)} className="bg-[#EDE4FF] rounded-md  items-center justify-center flex  outline-none transition-colors duration-150">
                                <div className="flex flex-row items-center gap-2 p-2">
                                    <span className="font-medium text-xs text-[#9012FF]">  {currentAttempt ? `Attempt ${[...attemptedDetails].sort((a, b) => b.attemptDateAndTime.seconds - a.attemptDateAndTime.seconds).indexOf(currentAttempt) + 1} - ${formatFirestoreTimestamp(currentAttempt.attemptDateAndTime)}` : 'Select Attempt'}</span>
                                    <Image
                                        src="/icons/arrow-down-01-round.svg"
                                        width={18}
                                        height={18}
                                        alt="Arrow-button"
                                    />
                                </div>

                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto px-0 py-1 rounded-md border border-lightGrey max-h-[400px] overflow-y-auto block"
                        >
                            {[...attemptedDetails]
                                .sort((a, b) => b.attemptDateAndTime.seconds - a.attemptDateAndTime.seconds)
                                .map((attempt, index) => (
                                    <button
                                        key={attempt.attemptId}
                                        onClick={() => { setTestAttemptId(attempt.attemptId); setAttemptPopover(false) }}
                                        className='flex flex-row items-center w-full my-1 px-4 py-[10px] gap-1 transition-colors duration-150 hover:bg-[#EDE4FF]'
                                    >
                                        <p className='text-sm text-[#0C111D] font-normal'>
                                            Attempt {index + 1} - {formatFirestoreTimestamp(attempt.attemptDateAndTime)}
                                        </p>
                                    </button>
                                ))}
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="h-[50px] border-b border-solid border-[#EAECF0] flex flex-row gap-[16px] mt-2 px-8 w-full overflow-x-auto">
                    <Tabs
                        aria-label="Analytics Tabs"
                        color="primary"
                        variant="underlined"
                        onSelectionChange={handleTabChange}
                        classNames={{
                            tabList: "gap-6 w-full relative rounded-none p-0",
                            cursor: "w-full bg-[#7400E0]",
                            tab: "max-w-fit px-0 h-12",
                            tabContent: "group-data-[selected=true]:text-[#7400E0] hover:text-[#7400E0] text-[15px] font-medium",
                        }}
                    >
                        <Tab key="overview" title="Overview" />
                        <Tab key="attempts-difficulty-analysis" title="Attempts & Difficulty Analysis" />
                        <Tab key="attempts-over-3-hours" title="Attempts over the 3 hours" />
                        <Tab key="complete-analysis" title="Complete Analysis" />
                        <Tab key="summary" title="Summary" />
                    </Tabs>
                    {/* <div className="space-y-20">
                        {Object.entries(sectionMap).map(([key, id]) => (
                            <div key={key} id={id.substring(1)} className="h-screen flex items-center justify-center border">
                                <h2 className="text-2xl font-bold capitalize">{key.replace(/-/g, " ")}</h2>
                            </div>
                        ))}
                    </div> */}
                </div>
            </div>
            <div className="overflow-y-auto flex-1 flex flex-col h-auto px-8">
                {/* overview Line */}
                <div id="overview" className="h-[44px] flex flex-col justify-end py-2">
                    <span className="text-[#1D2939] text-lg font-semibold">Overview</span>
                </div>
                {/* Overall Data */}
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
                {/* Attempts & Difficulty Analysis */}
                <div id="Attempts" className=" flex flex-col">
                    <div className="h-[44px] flex flex-col justify-end mb-2">
                        <span className="text-[#1D2939] text-lg font-semibold">Attempts & Difficulty Analysis</span>
                    </div>
                    <div>
                        < AttemptsDifficultyAnalysis questions={currentAttempt?.questions || []} />
                    </div>
                </div>
                {/* Attempts over the 3 hours */}
                {/* <div id="Attemptsoverthe3hours" className="flex flex-col">
                    <div className="h-[44px] flex flex-col justify-end mb-2">
                        <span className="text-[#1D2939] text-lg font-semibold">Attempts over the 3 hours</span>
                    </div>
                    <div>
                        <Attemptsoverthehours />
                    </div>

                </div> */}
                {/* Complete Analysis */}
                <div id="CompleteAnalysis" className="flex flex-col">
                    <div className="h-[44px] flex flex-col justify-end mb-2 ">
                        <span className="text-[#1D2939] text-lg font-semibold">Complete Analysis</span>
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
                {/* Summary */}
                <div id="Summary" className="flex flex-col">
                    <div className="h-[44px] flex flex-col justify-end mb-2 ">
                        <span className="text-[#1D2939] text-lg font-semibold">Summary</span>
                    </div>
                    <div className="h-auto mb-8 p-4 rounded-xl bg-[#FFFFFF] border border-[#EAECF0] text-[#667085] font-normal text-sm whitespace-pre-line">
                        {generateTestSummary(currentAttempt)}
                    </div>
                </div>
            </div>
            <div>
                {/* CLICK OVERALL HEADING TO SEE THE DIALOG */}
                <Modal isOpen={showpremiumDialog} onOpenChange={(isOpen) => !isOpen && setShowpremiumDialog(false)} hideCloseButton
                    size="lg"
                >

                    <ModalContent>
                        <>
                            <ModalHeader className="flex flex-row justify-between items-center gap-1">
                                <h1 className='text-[#1D2939] font-bold text-lg'></h1>
                                <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                                    <button><Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} onClick={() => setShowpremiumDialog(false)} /></button>
                                </button>
                            </ModalHeader>
                            <ModalBody>
                                <div className="flex flex-col w-full">
                                    <div className="flex justify-center">
                                        <Image src='/images/physicDailogImg.svg' alt="cool image" width={120} height={120} />
                                    </div>
                                    <div className="flex justify-center text-xl font-bold">
                                        <h2>Upgrade to premium</h2>
                                    </div>
                                </div>
                                <div className="flex flex-col mt-9 mb-6 font-medium text-base text-[#1D2939]">
                                    <div className="flex flex-row w-full pl-8 mb-6">
                                        <div className="flex flex-row w-1/2"><div><Image className="mr-2" src='/icons/checkmark-circle-02.svg' alt="tick circle" width={24} height={24} /></div><p>Unlock the premiun <br /> Analytics</p></div>
                                        <div className="flex flex-row w-1/2 ml-6"><div><Image className="mr-2" src='/icons/checkmark-circle-02.svg' alt="tick circle" width={24} height={24} /></div><p>Special badge for  <br /> premiun users</p></div>
                                    </div>
                                    <div className="flex flex-row w-full pl-8">
                                        <div className="flex flex-row w-1/2"><div><Image className="mr-2" src='/icons/checkmark-circle-02.svg' alt="tick circle" width={24} height={24} /></div><p>Be part of the premium  <br /> groups</p></div>
                                        <div className="flex flex-row w-1/2 ml-6"><div><Image className="mr-2" src='/icons/checkmark-circle-02.svg' alt="tick circle" width={24} height={24} /></div><p>Get dedicated  <br /> mentorship by IIT/NITians</p></div>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter className="border-t border-lightGrey">
                                <Button variant="light" className="py-[0.625rem] px-6 border-2  border-solid border-[#EAECF0] font-semibold text-sm text-[#1D2939] rounded-md hover:bg-[#F2F4F7]" onClick={() => setShowpremiumDialog(false)}>Cancel</Button>
                                <Button className="py-[0.625rem] px-6 text-white text-sm shadow-inner-button font-semibold border border-solid  border-white bg-[#9012FF] hover:bg-[#6D0DCC]  rounded-md">Explore Courses</Button>
                            </ModalFooter>
                        </>
                    </ModalContent>
                </Modal >
            </div>
        </div >
    )
}
export default NormalTestAnalytics;
