import Image from "next/image"

function QuizCreated() {
    return (
        <div className="h- full w-full flex  justify-center mt-10">
            <div className="flex items-center justify-center flex-col h-[503px] w-[598px]">
                <div className="flex flex-col h-[156px] mx-10 mb-6 gap-6">
                    <Image
                        src="/icons/Big-rightMark.svg"
                        width={92}
                        height={92}
                        alt="Big-rightMark" />
                    <span className="text-[#1D2939] text-[32px] font-semibold mt-6 mx-[90px]">Quiz created successfully</span>

                </div>



            </div>


        </div>

    )
}
export default QuizCreated;