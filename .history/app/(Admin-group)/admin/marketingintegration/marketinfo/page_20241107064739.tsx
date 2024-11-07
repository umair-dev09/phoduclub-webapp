import Image from "next/image";
function marketinfo() {
    return (
        <div className="p-8 flex flex-col w-full h-auto">
            <div className="flex flex-col h-[68px]">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-2 items-center">
                        <Image
                            src="/icons/idea-01.svg"
                            width={24}
                            height={24}
                            alt="idea-icon" />
                        <h1 className="text-[#1D2939] font-semibold text-2xl">Quiz competition</h1>
                        <div className="bg-[#EDE4FF] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                            <span className="w-[6px] h-[6px] bg-[#7400E0] rounded-full "></span>
                            <span className="font-medium text-[#7400E0] text-xs">Live</span>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2">
                        {/* Button for Pause Quiz */}
                        <button className="w-auto p-3 gap-2 flex-row flex bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center">

                            <Image src="/icons/pausequiz.svg" width={18} height={18} alt="Paused-quiz" />
                            <span className="text-sm text-[#0C111D] font-normal">Pause Quiz</span>
                        </button>
                        {/* Button for End Quiz */}
                        {/* <button className="w-auto p-3 gap-2 flex-row flex bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center">

                            <Image src="/icons/endquiz.svg" width={18} height={18} alt="End-quiz" />
                            <span className="text-sm text-[#DE3024]  font-normal">End Quiz</span>
                        </button> */}
                        {/* Button for Resume Quiz */}
                        <button
                            className="w-auto p-3 gap-2 flex-row flex rounded-[8px] h-[40px] items-center">
                            <Image src="/icons/resume.svg" width={18} height={18} alt="Resume Quiz" />
                            <span className="text-sm text-[#9012FF]  font-medium">Resume Quiz</span>
                        </button>
                        {/* Button for Delete Quiz */}
                        <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full">
                            <Image src="/icons/delete.svg" width={18} height={18} alt="delete-quiz" />
                            <span className="text-sm text-[#DE3024] font-normal">Delete Quiz</span>
                        </button>
                    </div>

                </div>

            </div>

        </div>

    )
}
export default marketinfo;