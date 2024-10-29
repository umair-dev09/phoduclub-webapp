import Image from "next/image";
function Quizinfo() {
    return (
        <div className="flex h-auto overflow-y-auto flex-col">

            <div className="w-full m-8 h-auto">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-3">
                        <span className="text-[#1D2939] text-2xl font-semibold">Maths</span>
                        <Image
                            src="/icons/saved.svg"
                            width={74}
                            height={24}
                            alt="saved "
                        />

                    </div>
                    <div className="flex flex-row gap-1">
                        {/* Publish Quiz Button */}
                        <button className=" w-full p-3 gap-1 flex-row flex">
                            <Image
                                src="/icons/publish-quiz.svg"
                                width={18}
                                height={18}
                                alt="publish-quiz" />
                            <span className="text-sm text-[#0C111D] font-normal">Publish Quiz</span>

                        </button>


                    </div>

                </div>


            </div>

        </div>
    )

}
export default Quizinfo;