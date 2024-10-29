"use client";
import Image from "next/image"
import { useRouter } from "next/navigation";

function QuizCreated() {
    const router = useRouter();

    // Function to handle tab click and navigate to a new route
    const handleTabClick = (tab: string, path: string) => {
        router.push(path);
    };

    return (
        <div className="h- full w-full flex  justify-center mt-10">
            <div className="flex   flex-col h-auto w-[598px]">
                <div className="flex flex-col h-[156px] mx-10 mb-6 gap-6 items-center">
                    <Image
                        src="/icons/Big-rightMark.svg"
                        width={92}
                        height={92}
                        alt="Big-rightMark" />
                    <span className="text-[#1D2939] text-[32px] font-semibold ">Quiz created successfully</span>

                </div>
                <div className="p-5 gap-5 flex flex-col w-full rounded-md h-auto bg-[#FFFFFF] border border-solid border-[#EAECF0]">
                    <div className=" flex flex-col">
                        <span className="text-[#1D2939] text-[24px] font-semibold">Physics</span>
                        <div className="p-1 flex flex-col">
                            <div className="flex items-center">
                                <span className="w-1 h-1 bg-[#1D2939] rounded-full mr-2"></span>
                                <span className="text-[#1D2939] text-sm font-normal">This quiz contains - 10 Questions</span>
                            </div>
                            <div className="flex items-center">
                                <span className="w-1 h-1 bg-[#1D2939] rounded-full mr-2"></span>
                                <span className="text-[#1D2939] text-sm font-normal">Each question will be of 3 Marks</span>
                            </div>
                            <div className="flex items-center">
                                <span className="w-1 h-1 bg-[#1D2939] rounded-full mr-2"></span>
                                <span className="text-[#1D2939] text-sm font-normal">There’s negative marking (-1) for each wrong</span>
                            </div>
                        </div>



                    </div>
                    <div className="h-[48px] w-auto flex flex-row items-center gap-[23px]">
                        <div className="flex flex-col justify-between h-full flex-1">
                            <span className="text-sm font-normal text-[#667085]">Time Duration</span>
                            <span className="text-lg font-semibold text-[#1D2939] ml-3">
                                10:00<span className="text-sm"> Min</span>
                            </span>
                        </div>

                        <div className="w-[35px] h-12 border-l border-[#EAECF0]"></div>

                        <div className="flex flex-col justify-between h-full flex-1">
                            <span className="text-sm font-normal text-[#667085]">No. of Questions</span>
                            <span className="text-lg font-semibold text-[#1D2939] flex justify-center">
                                10
                            </span>
                        </div>

                        <div className="w-[35px] h-12 border-l border-[#EAECF0]"></div>

                        <div className="flex flex-col justify-between h-full flex-1">
                            <span className="text-sm font-normal text-[#667085]">Marks Per Question</span>
                            <span className="text-lg font-semibold text-[#1D2939] flex justify-center">
                                3
                            </span>
                        </div>
                    </div>

                    <div className="h-auto w-full rounded-md bg-[#F2F4F7] p-2">

                        <span className="text-[#475467] font-normal text-sm italic ">This quiz will be available for 2 hours, starting from January 6th, 2024, 5:30 PM, and ending at 7:30 PM.</span>



                    </div>
                </div>
                <div className="flex justify-center">
                    <button
                        className="h-[44px] w-[263px] bg-[#8501FF] rounded-md shadow-inner-button border border-solid border-[#800EE2] flex items-center justify-center mt-4"
                        onClick={() => handleTabClick("quizzesmanagement", "/admin/content/quizzesmanagement")}
                    >
                        <span className="text-[#FFFFFF] font-semibold text-sm">Back to Quizzes Management</span>
                    </button>

                </div>

            </div>






        </div>

    )
}
export default QuizCreated;