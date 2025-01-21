import React from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { Modal, ModalContent, ModalHeader, ModalBody, Button } from "@nextui-org/react";

interface TestDialogprops {
    open: boolean;
    onClose: () => void;
    forallsubject?: boolean;
    attemptedDetails: AttemptedDetails[];
    sectionName: string;
    setDetailedAnalyticsOpen: (value: boolean) => void;
    setAttemptId: (value: string) => void;

}
interface AttemptedDetails {
    userId: string | undefined;
    attemptCount: any;
    attemptedQuestions: string;
    score: string;
    accuracy: string;
    answeredCorrect: string;
    answeredIncorrect: string;
    timeTaken: string;
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

function TestDialog({ open, onClose, forallsubject = false, attemptedDetails, sectionName, setDetailedAnalyticsOpen, setAttemptId }: TestDialogprops) {
    const router = useRouter();

    const handleTabClick = (tabName: string, path: string) => {
        router.push(path);
    };

    return (
        <Modal
            isOpen={open}
            onOpenChange={(isOpen) => !isOpen && onClose()}
            hideCloseButton
            size="4xl"
        >
            <ModalContent>
                <>
                    <ModalHeader className="flex flex-row justify-between items-center gap-1">
                        <h1 className="text-[#1D2939] font-bold text-lg">{sectionName}</h1>
                        <button
                            className="w-[32px] h-[32px] rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]"
                            onClick={onClose}
                        >
                            <Image
                                src="/icons/cancel.svg"
                                alt="Cancel"
                                width={20}
                                height={20}
                            />
                        </button>
                    </ModalHeader>
                    <ModalBody>
                        <span className="font-normal pb-2 text-[16px] text-[#344054]">
                            You have attempted {attemptedDetails.length || '0'} times this test, please select which attempts
                            analytics you would like to see.
                        </span>
                        <div className="overflow-y-auto pb-2 rounded-md max-h-[300px]">
                            <table className="w-full rounded-md text-left bg-white border border-lightGrey">
                                <thead className="border border-lightGrey rounded-md  sticky top-0 bg-white z-10">
                                    <tr>
                                        <th className="px-4 py-2 text-[#667085] font-medium text-sm rounded-tl-xl">
                                            Attempts
                                        </th>
                                        <th className="px-4 py-2 text-[#667085] font-medium text-sm">
                                            <div className="flex flex-row gap-1 items-center">
                                                Date & Times
                                                <Image
                                                    src="/icons/unfold-more-round.svg"
                                                    alt="more"
                                                    width={16}
                                                    height={16}
                                                />
                                            </div>
                                        </th>
                                        <th className="px-4 py-2 text-[#667085] font-medium text-sm">
                                            <div className="flex flex-row gap-1 items-center">
                                                Accuracy
                                                <Image
                                                    src="/icons/unfold-more-round.svg"
                                                    alt="more"
                                                    width={16}
                                                    height={16}
                                                />
                                            </div>
                                        </th>
                                        <th className="px-4 py-2 text-[#667085] font-medium text-sm">
                                            <div className="flex flex-row gap-1 items-center">
                                                Score
                                                <Image
                                                    src="/icons/unfold-more-round.svg"
                                                    alt="more"
                                                    width={16}
                                                    height={16}
                                                />
                                            </div>
                                        </th>
                                        <th className="pl-8 py-2  text-[#667085] font-medium text-sm">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[...attemptedDetails]
                                        .sort((a, b) => b.attemptDateAndTime.seconds - a.attemptDateAndTime.seconds)
                                        .map((attempt, index) => (
                                        <tr key={index} className="border border-lightGrey">
                                            <td className="px-4 py-3 text-[#1D2939] font-normal text-sm">
                                                {index + 1}
                                            </td>
                                            <td className="px-4 py-2 text-[#1D2939] font-normal text-sm">
                                                {formatFirestoreTimestamp(attempt.attemptDateAndTime)}
                                            </td>
                                            <td className="px-4 py-2 text-[#1D2939] font-normal text-sm">
                                                {attempt.accuracy}
                                            </td>
                                            <td className="px-4 py-2 text-[#1D2939] font-normal text-sm">
                                                {attempt.score}
                                            </td>
                                            <td className="px-4 py-2 text-[#1D2939] font-normal text-sm">
                                                <button
                                                    onClick={() => {
                                                        setDetailedAnalyticsOpen(true);
                                                        onClose();
                                                        setAttemptId(attempt.attemptId || '');
                                                    }}
                                                    className="font-semibold text-[#9012FF] text-sm hover:underline"
                                                >
                                                    Detail View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </ModalBody>
                </>
            </ModalContent>
        </Modal>
    );
}

export default TestDialog;
