import Image from "next/image";
function Quizinfo() {
    return (
        <div className="flex  w-full h-auto overflow-y-auto flex-col m-8">

            <div className="w-full  h-auto  flex flex-col border-b border-solid border-[#D0D5DD] pb-2">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-3 py-1">
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

                        <button className=" w-auto p-3 gap-2 flex-row flex ">
                            <Image
                                src="/icons/publish-quiz.svg"
                                width={18}
                                height={18}
                                alt="publish-quiz" />
                            <span className="text-sm text-[#0C111D] font-normal">Publish Quiz</span>

                        </button>
                        {/* Edit Quiz Button */}
                        <button className=" w-auto p-3 gap-2 flex-row flex ">
                            <Image
                                src="/icons/edit-icon.svg"
                                width={18}
                                height={18}
                                alt="Edit-quiz" />
                            <span className="text-sm text-[#0C111D] font-normal">Edit Quiz</span>

                        </button>
                        {/* Delete Quiz Button */}
                        <button className=" w-auto p-3 gap-2 flex-row flex ">
                            <Image
                                src="/icons/delete.svg"
                                width={18}
                                height={18}
                                alt="delete-quiz" />
                            <span className="text-sm text-[#DE3024] font-normal">Delete Quiz</span>

                        </button>


                    </div>

                </div>

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
            <div className="w-full h-auto mt-8 flex flex-row gap-4">

                <div className="w-full">

                </div>
                <div className="w-full">

                </div>
                <div className="w-full">

                </div>
                <div className="w-full">

                </div>

            </div>

        </div>
    )

}
export default Quizinfo;