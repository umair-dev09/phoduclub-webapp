"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useState } from "react";
import AttemptsDifficultyAnalysis from "@/components/DashboardComponents/AnalyticsComponents/Test-Series-Components/PhysicsComponents/AttemptsDifficultyAnalysis"
import Attemptsoverthehours from "@/components/DashboardComponents/AnalyticsComponents/Test-Series-Components/PhysicsComponents/Attemptsoverthehours"
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Tabs, Tab } from "@nextui-org/react";
import { Key } from '@react-types/shared';
function JeeMains() {

    const router = useRouter();

    let [showQuizDialog, setShowQuizDialog] = useState(false);
    const onStartQuiz = () => {
        setShowQuizDialog(true);
    };
    const sectionMap = {
        'overview': '#overview',
        'attempts-difficulty-analysis': '#Attempts',
        'attempts-over-3-hours': '#Attemptsoverthe3hours',
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

    return (
        <div className="flex flex-1 flex-col h-auto overflow-y-auto">
            {/* heading */}
            <div className="h-[64px] flex items-center mx-8">
                <div className="my-5 flex items-center flex-row">
                    <button className="flex items-center ml-1" onClick={() => router.replace('/analytics/test-series')}>
                        <div className="text-[#1D2939] h-[24px] w-auto  text-base font-semibold">
                            Test-Series
                        </div>
                        <div className="ml-3 w-[24px]">
                            <Image src="/icons/course-left.svg" width={7} height={12} alt="left-arrow" />
                        </div>
                    </button>

                    <button className="text-[#667085] h-full w-auto -ml-1  text-base font-medium" onClick={() => router.replace('/analytics/test-series/PhoduJeeMainsTestSeries')}>
                        Phodu JEE Mains Test Series 2025
                    </button>
                    <div className="ml-3 w-[24px]">
                        <Image src="/icons/course-left.svg" width={7} height={12} alt="left-arrow" />
                    </div>
                    <div className="text-[#667085] h-full w-auto -ml-1  text-base font-medium">
                        Physics
                    </div>
                </div>
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

            </div>

            <div className="overflow-y-auto flex-1 flex flex-col h-auto px-8">
                {/* overview Line */}
                <div onClick={onStartQuiz} id="overview" className="h-[44px] flex flex-col justify-end py-2 cursor-pointer">
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
                                    <h3 className="text-[15px]">3000</h3>
                                </div>
                                <div className="flex justify-center items-center">
                                    <div className="w-px bg-lightGrey h-4/5"></div>
                                </div>
                            </div>

                            {/* Attempted Questions */}
                            <div className="flex flex-1 flex-row justify-between pr-4">
                                <div className="flex flex-col gap-2">
                                    <div className="font-normal text-xs text-[#667085]">Attempted Questions</div>
                                    <h3 className="text-[15px]">2000</h3>
                                </div>
                                <div className="flex justify-center items-center">
                                    <div className="w-px bg-lightGrey h-4/5"></div>
                                </div>
                            </div>

                            {/* Time Taken */}
                            <div className="flex flex-1 flex-col gap-2">
                                <div className="font-normal text-xs text-[#667085]">Time Taken</div>
                                <h3 className="text-[15px]">80 of 100 hrs</h3>
                            </div>
                        </div>

                        {/* Additional Stats */}
                        <div className="flex flex-row justify-between mt-9">
                            <div className="flex flex-1 flex-row justify-between pr-4">
                                <div className="flex flex-col gap-2">
                                    <div className="font-normal text-xs text-[#667085]">Answered Correct</div>
                                    <h3 className="text-[15px]">800</h3>
                                </div>
                                <div className="flex justify-center items-center">
                                    <div className="w-px bg-lightGrey h-4/5"></div>
                                </div>
                            </div>

                            <div className="flex flex-1 flex-row justify-between pr-4">
                                <div className="flex flex-col gap-2">
                                    <div className="font-normal text-xs text-[#667085]">Answered Incorrect</div>
                                    <h3 className="text-[15px]">200</h3>
                                </div>
                                <div className="flex justify-center items-center">
                                    <div className="w-px bg-lightGrey h-4/5"></div>
                                </div>
                            </div>

                            <div className="flex flex-1 flex-col gap-2">
                                <div className="font-normal text-xs text-[#667085]">Total Score</div>
                                <h3 className="text-[15px]">568</h3>
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
                        < AttemptsDifficultyAnalysis />
                    </div>
                </div>
                {/* Attempts over the 3 hours */}
                <div id="Attemptsoverthe3hours" className="flex flex-col">
                    <div className="h-[44px] flex flex-col justify-end mb-2">
                        <span className="text-[#1D2939] text-lg font-semibold">Attempts over the 3 hours</span>
                    </div>
                    <div>
                        <Attemptsoverthehours />
                    </div>

                </div>
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
                                    <th className="w-[10%] text-left">Chapter</th>
                                    <th className="w-[10%] text-center">Difficulty</th>
                                    <th className="w-[10%] text-center">Allotted</th>
                                    <th className="w-[10%] text-center">Spent</th>
                                    <th className="w-[10%] text-center">Attempted</th>
                                    <th className="w-[10%] text-center">Answer</th>
                                    <th className="w-[10%] text-center">Remarks</th>
                                </tr>
                            </thead>
                            <tbody className="border-b border-[#EAECF0]">
                                <tr className="border-t border-[#EAECF0]">
                                    <td className="py-3 text-center text-[#1D2939] font-normal text-sm">1</td>
                                    <td className="py-3 text-left text-[#1D2939] font-semibold text-sm">Current Electricity</td>
                                    <td className="py-3 text-center text-[#1D2939] font-normal text-sm">Easy</td>
                                    <td className="py-3 text-center text-[#1D2939] font-normal text-sm">217s</td>
                                    <td className="py-3 text-center text-[#1D2939] font-normal text-sm">50s</td>
                                    <td className="py-3 text-center text-[#1D2939] font-normal text-sm">Yes</td>
                                    <td className="py-3 text-center text-[#0B9055] font-medium text-sm">Correct</td>
                                    <td className="py-3 text-center text-[#0B9055] font-medium text-sm">Perfect</td>
                                </tr>
                                <tr className="border-t border-[#EAECF0]">
                                    <td className="py-3 text-center text-[#1D2939] font-normal text-sm">1</td>
                                    <td className="py-3 text-left text-[#1D2939] font-semibold text-sm">Current Electricity</td>
                                    <td className="py-3 text-center text-[#1D2939] font-normal text-sm">Easy</td>
                                    <td className="py-3 text-center text-[#1D2939] font-normal text-sm">217s</td>
                                    <td className="py-3 text-center text-[#1D2939] font-normal text-sm">50s</td>
                                    <td className="py-3 text-center text-[#1D2939] font-normal text-sm">Yes</td>
                                    <td className="py-3 text-center text-[#0B9055] font-medium text-sm">Correct</td>
                                    <td className="py-3 text-center text-[#0B9055] font-medium text-sm">Perfect</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Summary */}
                <div id="Summary" className="flex flex-col">
                    <div className="h-[44px] flex flex-col justify-end mb-2 ">
                        <span className="text-[#1D2939] text-lg font-semibold">Summary</span>
                    </div>
                    <div className="h-auto mb-8 p-4 rounded-xl bg-[#FFFFFF] border border-[#EAECF0] text-[#667085] font-normal text-sm flex">
                        Great! You did not miss any concept.
                    </div>
                </div>
            </div>
            <div>
                {/* CLICK OVERALL HEADING TO SEE THE DIALOG */}
                <Dialog open={showQuizDialog} onClose={() => setShowQuizDialog(false)} className="relative z-50">
                    <DialogBackdrop className="fixed inset-0 bg-black/30 " />
                    <div className="fixed inset-0 flex items-center justify-center ">
                        <DialogPanel transition className="bg-[#FFFFFF] rounded-2xl w-[37.5rem]">
                            <div className="flex flex-1 relative w-full border-b-2 border-solid border-[#EAECF0] flex-col rounded-t-xl">
                                <div className="absolute right-6 top-6">
                                    <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                                        <button onClick={() => setShowQuizDialog(false)}>
                                            <Image src="/icons/cancel.svg" alt="cancel" width={18} height={18} />
                                        </button>
                                    </button>
                                </div>
                                <div className="flex flex-col w-full mt-8">
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
                            </div>
                            <div
                                style={{
                                    borderTopLeftRadius: '0px',
                                    borderTopRightRadius: '0px',
                                    borderBottomLeftRadius: '12px',
                                    borderBottomRightRadius: '12px',
                                }}>
                                <div className="flex w-auto justify-end my-4">
                                    <button
                                        className="bg-[#FFFFFF] text-[#1D2939] text-sm font-semibold py-2 px-5 rounded-md w-auto h-[44px] shadow-inner-button hover:bg-[#F2F4F7]"
                                        style={{ border: "1.5px solid #EAECF0" }}
                                        onClick={() => setShowQuizDialog(false)}>
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-[#8501FF] text-[#FFFFFF] text-sm font-semibold mr-6 ml-4 py-2 px-5 rounded-md w-auto h-[44px] shadow-inner-button"
                                        style={{
                                            border: "1px solid #800EE2",
                                        }}
                                    >Explore Courses
                                    </button>
                                </div>
                            </div>
                        </DialogPanel>
                    </div>
                </Dialog>
            </div>
        </div >
    )
}
export default JeeMains;