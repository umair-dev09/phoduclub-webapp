import React from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { Modal, ModalContent, ModalHeader, ModalBody, Button } from "@nextui-org/react";

interface TestDialogprops {
    open: boolean;
    onClose: () => void;
    forallsubject?: boolean;
}

const dummyData = [
    { attempt: 1, date: "Jan 6, 2024 05:32 PM", accuracy: "82%", score: 32 },
    { attempt: 2, date: "Jan 7, 2024 04:15 PM", accuracy: "85%", score: 34 },
    { attempt: 3, date: "Jan 8, 2024 02:45 PM", accuracy: "78%", score: 30 },
    { attempt: 4, date: "Jan 9, 2024 01:20 PM", accuracy: "90%", score: 36 },

];

function TestDialog({ open, onClose, forallsubject = false }: TestDialogprops) {
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
                        <h1 className="text-[#1D2939] font-bold text-lg">Test 01</h1>
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
                            You have attempted 5 times this test, please select which attempts
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
                                    {dummyData.map((item, index) => (
                                        <tr key={index} className="border border-lightGrey">
                                            <td className="px-4 py-2 text-[#1D2939] font-normal text-sm">
                                                {item.attempt}
                                            </td>
                                            <td className="px-4 py-2 text-[#1D2939] font-normal text-sm">
                                                {item.date}
                                            </td>
                                            <td className="px-4 py-2 text-[#1D2939] font-normal text-sm">
                                                {item.accuracy}
                                            </td>
                                            <td className="px-4 py-2 text-[#1D2939] font-normal text-sm">
                                                {item.score}
                                            </td>
                                            <td className="px-4 py-2 text-[#1D2939] font-normal text-sm">
                                                <button
                                                    onClick={() => {
                                                        if (forallsubject) {
                                                            handleTabClick(
                                                                "AllSubjects",
                                                                "/analytics/test-series/PhoduJeeMainsTestSeries/AllSubjects"
                                                            );
                                                        } else {
                                                            handleTabClick(
                                                                "Physics",
                                                                "/analytics/test-series/PhoduJeeMainsTestSeries/Physics"
                                                            );
                                                        }
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
