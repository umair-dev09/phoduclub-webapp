import Image from "next/image"

function QuizCreated() {
    return (
        <div className="h- full w-full flex  justify-center mt-10">
            <div className="flex   flex-col h-[503px] w-[598px]">
                <div className="flex flex-col h-[156px] mx-10 mb-6 gap-6 items-center">
                    <Image
                        src="/icons/Big-rightMark.svg"
                        width={92}
                        height={92}
                        alt="Big-rightMark" />
                    <span className="text-[#1D2939] text-[32px] font-semibold ">Quiz created successfully</span>

                </div>
                <div className="p-5 gap-5 flex flex-col w-full rounded-md h-[334px] bg-[#FFFFFF] ">
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
                    <div className="h-[48px]  w-full flex flex-row">
                        <div className="flex flex-col justify-between h-full w-auto">
                            <span className="text-sm font-normal text-[#667085]">Time Duration</span>
                            <span className="text-lg font-semibold text-[#1D2939]">
                                10:00<span className="text-sm"> Min</span>
                            </span>
                        </div>


                    </div>
                    <div className="h-[62px] w-full rounded-md bg-[#F2F4F7]">
                        <div className="px-4 py-3">
                            <span className="text-[#475467] font-normal text-sm italic">This quiz will be available for 2 hours, starting from January 6th, 2024, 5:30 PM, and ending at 7:30 PM.</span>


                        </div>
                    </div>
                </div>

            </div>






        </div>

    )
}
export default QuizCreated;