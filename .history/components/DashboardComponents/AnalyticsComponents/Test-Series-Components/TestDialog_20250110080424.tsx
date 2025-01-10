import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
interface TestDialogprops {
    open: boolean;
    onClose: () => void;
    forallsubject?: boolean;
}
function TestDialog({ open, onClose, forallsubject }: TestDialogprops) {
    const router = useRouter();

    const handleTabClick = (tabName: string, path: string) => {
        router.push(path);
    }

    return (
        <Modal isOpen={open} onOpenChange={(isOpen) => !isOpen && onClose} hideCloseButton
            size='4xl'
        >

            <ModalContent>
                <>
                    <ModalHeader className="flex flex-row justify-between items-center gap-1">
                        <h1 className='text-[#1D2939] font-bold text-lg'>Send Request</h1>
                        <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                            <button><Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} onClick={() => onClose} /></button>
                        </button>
                    </ModalHeader>
                    <ModalBody>
                        <span className="font-normal pb-2 text-[16px] text-[#344054]">You have attempted 5 times this test, please select which attempts analytics you would like to see.</span>
                        <div className="overflow-y-auto pb-2 rounded-md max-h-[300px]">
                            <table className="w-full rounded-md text-left bg-white border border-lightGrey">
                                <thead className="  border border-lightGrey rounded-md">
                                    <tr>
                                        <th className="px-4 py-2 rounded-tl-md text-[#667085] font-medium text-sm">
                                            <span>Attempts</span>

                                        </th>
                                        <th className="px-4 py-2 text-[#667085] font-medium text-sm">
                                            <div className='flex flex-row gap-1 items-center'>
                                                <span>  Date & Times</span>
                                                <Image src='/icons/unfold-more-round.svg' alt="more" width={16} height={16} />
                                            </div>
                                        </th>
                                        <th className="px-4 py-2 text-[#667085] font-medium text-sm">
                                            <div className='flex flex-row gap-1 items-center'>
                                                <span>  Accuracy</span>
                                                <Image src='/icons/unfold-more-round.svg' alt="more" width={16} height={16} />
                                            </div>
                                        </th>
                                        <th className="px-4 py-2 text-[#667085] font-medium text-sm">

                                            <div className='flex flex-row gap-1 items-center'>
                                                <span>Score</span>
                                                <Image src='/icons/unfold-more-round.svg' alt="more" width={16} height={16} />
                                            </div>
                                        </th>
                                        <th className="pl-8 py-2 rounded-tr-md text-[#667085] font-medium text-sm">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border border-lightGrey">
                                        <td className="px-4 py-2 text-[#1D2939] font-normal text-sm">1</td>
                                        <td className="px-4 py-2 text-[#1D2939] font-normal text-sm">Jan 6, 2024  05:32 PM</td>
                                        <td className="px-4 py-2 text-[#1D2939] font-normal text-sm">82%</td>
                                        <td className="px-4 py-2 text-[#1D2939] font-normal text-sm">32</td>
                                        <td className="px-4 py-2 text-[#1D2939] font-normal text-sm">
                                            <button
                                                onClick={() => forallsubject
                                                    ? handleTabClick("AllSubjects", "/analytics/test-series/PhoduJeeMainsTestSeries/AllSubjects")
                                                    : handleTabClick("Physics", "/analytics/test-series/PhoduJeeMainsTestSeries/Physics")}
                                                className="font-semibold text-[#9012FF] text-sm hover:underline"
                                            >
                                                Detail View
                                            </button>

                                        </td>
                                    </tr>
                                    <tr className="border border-lightGrey">
                                        <td className="px-4 py-2 text-[#1D2939] font-normal text-sm">2</td>
                                        <td className="px-4 py-2 text-[#1D2939] font-normal text-sm">Jan 6, 2024  05:32 PM</td>
                                        <td className="px-4 py-2 text-[#1D2939] font-normal text-sm">82%</td>
                                        <td className="px-4 py-2 text-[#1D2939] font-normal text-sm">32</td>
                                        <td className="px-4 py-2 text-[#1D2939] font-normal text-sm">
                                            <button
                                                onClick={() => handleTabClick("Physics", "/analytics/test-series/PhoduJeeMainsTestSeries/Physics")}
                                                className="font-semibold text-[#9012FF] text-sm hover:underline"
                                            >
                                                Detail View
                                            </button>
                                        </td>
                                    </tr>
                                    <tr className="border border-lightGrey">
                                        <td className="px-4 py-2 text-[#1D2939] font-normal text-sm">3</td>
                                        <td className="px-4 py-2 text-[#1D2939] font-normal text-sm">Jan 6, 2024  05:32 PM</td>
                                        <td className="px-4 py-2 text-[#1D2939] font-normal text-sm">82%</td>
                                        <td className="px-4 py-2 text-[#1D2939] font-normal text-sm">32</td>
                                        <td className="px-4 py-2 text-[#1D2939] font-normal text-sm">
                                            <button
                                                onClick={() => handleTabClick("Physics", "/analytics/test-series/PhoduJeeMainsTestSeries/Physics")}
                                                className="font-semibold text-[#9012FF] text-sm hover:underline"
                                            >
                                                Detail View
                                            </button>
                                        </td>
                                    </tr>


                                </tbody>
                            </table>
                        </div>

                    </ModalBody>

                </>
            </ModalContent>
        </Modal >
    )
}
export default TestDialog;