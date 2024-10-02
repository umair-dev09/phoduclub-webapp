"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Collapsible from 'react-collapsible';
import { useState } from "react";
function JeeMains() {
    const router = useRouter();
    // -------------------------------------------------------------------------------------
    const [isOpenArray, setIsOpenArray] = useState([false, false, false]); // Initialize with false for each collapsible

    // Function to toggle a specific collapsible's state
    const toggleCollapsible = (index: number) => {
        const newIsOpenArray = [...isOpenArray];
        newIsOpenArray[index] = !newIsOpenArray[index]; // Toggle the specific index
        setIsOpenArray(newIsOpenArray);
    };

    return (
        <div className="flex flex-1 flex-col">
            <div className="h-[64px] ml-8 flex items-center">
                <div className="my-5 flex items-center">
                    <button className="flex items-center ml-1" onClick={() => router.back()}>
                        <div className="text-[#1D2939] h-[24px] w-auto" style={{ fontSize: "16px", fontWeight: "600" }}>
                            Test-Series
                        </div>
                        <div className="ml-3 w-[24px]">
                            <Image src="/icons/course-left.svg" width={7} height={12} alt="left-arrow" />
                        </div>
                    </button>
                    <div className="text-[#667085] h-full w-auto -ml-1" style={{ fontSize: "16px", fontWeight: "500" }}>
                        Phodu JEE Mains Test Series 2025
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-[17px] ml-8 mt-5">
                <span className="font-bold text-[#1D2939] text-1g">Physics</span>
            </div>
            <div className="gap-2 flex flex-col ">
                {/* First Accordian */}
                <div className='bg-white border border-lightGrey rounded-xl ml-8'>
                    <Collapsible
                        className='flex flex-col'
                        trigger={
                            <div className=''>
                                <div
                                    className="flex items-center justify-between h-[56px] mx-5 relative"
                                    onClick={() => toggleCollapsible(0)} // Toggle first accordion
                                >
                                    <p className="text-base font-bold">Lesson: Lorem ipsum dolor sit amet.</p>
                                    <Image
                                        src={isOpenArray[0] ? "/icons/arrowdown.svg" : "/icons/arrowup.svg"} // Arrow based on first accordion state
                                        width={24}
                                        height={24}
                                        alt="arrow"
                                    />
                                </div>
                            </div>
                        }
                        transitionTime={350}
                        onOpening={() => toggleCollapsible(0)}  // Set the state to open when expanding
                        onClosing={() => toggleCollapsible(0)} // Set the state to closed when collapsing
                    >
                        <tr className="flex flex-1 py-3 text-neutral-500">
                            <td className="w-[30%] px-8">Test</td>
                            <td className="w-[15%] text-center"><p>Scores</p></td>
                            <td className="w-[15%] text-center"><p>Attempted Question</p></td>
                            <td className="w-[15%] text-center"><p>Accuracy</p></td>
                            <td className="w-[15%] text-center"><p>Time Taken</p></td>
                            <td className="w-[15%] text-center"><p>Total Time</p></td>
                        </tr>

                    </Collapsible>
                </div>


            </div>
        </div>
    )
}
export default JeeMains;