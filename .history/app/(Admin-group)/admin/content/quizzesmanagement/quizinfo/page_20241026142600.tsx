import Image from "next/image";
function Quizinfo() {
    return (
        <div className="flex  w-full h-auto overflow-y-auto flex-col m-8">

            <div className="w-full  h-auto bg-fuchsia-200">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-3">
                        <span className="text-[#1D2939] text-2xl font-semibold">Maths</span>
                        <Image
                            src="/icons/saved.svg"
                            width={74}
                            height={24}
                            alt="saved "
                            className="pb-2"
                        />

                    </div>
                    <div className="flex flex-row gap-1">
                        {/* Publish Quiz Button */}
                        <button className=" w-auto p-3 gap-1 flex-row flex bg-green-100">
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