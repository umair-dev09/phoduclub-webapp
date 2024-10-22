import Image from "next/image"

function QuizCreated() {
    return (
        <div className="h- full w-full flex items-center justify-center">
            <div className="flex items-center justify-center flex-col h-[503px] w-[598px]">
                <Image
                    src="/icons/Big-rightMark.svg"
                    width={92}
                    height={92}
                    alt="Big-rightMark" />


            </div>


        </div>

    )
}
export default QuizCreated;