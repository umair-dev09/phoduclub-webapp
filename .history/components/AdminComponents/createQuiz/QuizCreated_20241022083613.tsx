import Image from "next/image"

function QuizCreated() {
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
                <div className="p-5 gap-5 flex flex-col w-full rounded-md h-[334px] bg-[#FFFFFF] border border-solid border-[#EAECF0]">
                    <div className=" flex flex-col">
                        <span className="text-[#1D2939] text-[24px] font-semibold">Physics</span>
                        <div className="p-1 flex flex-col">
                            <span className="text-[#1D2939] text-[16px] font-normal">This quiz contains - 10 Questions

                            </span>
                            <span className="text-[#1D2939] text-[16px] font-normal">
                                Each question will be of 3
                                Marks
                            </span>
                            <span className="text-[#1D2939] text-[16px] font-normal">
                                There’s negative marking (-1) for each wrong</span>

                        </div>


                    </div>
                    <div className="h-[48px]  w-full flex flex-row gap-[23px]">
                        <div className="flex flex-col justify-between h-full w-auto">
                            <span className="text-sm font-normal text-[#667085]">Time Duration</span>
                            <span className="text-lg font-semibold text-[#1D2939] ml-3">
                                10:00<span className="text-sm"> Min</span>
                            </span>
                        </div>
                        <div className="w-[35px] h-12 py-2 border-l border-[#EAECF0] "></div>


                        <div className="flex flex-col justify-between h-full w-auto">
                            <span className="text-sm font-normal text-[#667085]">No. of Questions</span>
                            <span className="text-lg font-semibold text-[#1D2939] flex justify-center">
                                10</span>

                        </div>
                        <div className="w-[35px] h-12 py-2 border-l border-[#EAECF0]"></div>

                        <div className="flex flex-col justify-between h-full w-auto">
                            <span className="text-sm font-normal text-[#667085]">Marks Per Question</span>
                            <span className="text-lg font-semibold text-[#1D2939] flex justify-center">
                                3</span>

                        </div>


                    </div>
                    <div className="h-[62px] w-full rounded-md bg-[#F2F4F7] ">

                        <div className="text-[#475467] font-normal text-sm italic p-4 ">This quiz will be available for 2 hours, starting from January 6th, 2024, 5:30 PM, and ending at 7:30 PM.</div>



                    </div>
                </div>
                <button
                    className="h-[44px] w-[263px] bg-[#8501FF] rounded-md shadow-inner-button border border-solid border-[#800EE2] flex items-center justify-center mt-4"
                // onClick={() => handleTabClick("createquiz", "/admin/content/quizzesmanagement/createquiz")}
                >
                    <span className="text-[#FFFFFF] font-semibold text-sm">Back to Quizzes Management</span>
                </button>

            </div>






        </div>

    )
}
export default QuizCreated;