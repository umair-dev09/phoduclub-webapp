import Image from "next/image";
function marketinfo() {
    return (
        <div className="p-8 flex flex-col w-full h-auto">
            <div className="flex flex-col gap-1">
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
                        {/* <button className="w-auto p-3 gap-2 flex-row flex bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center">

                            <Image src="/icons/pausequiz.svg" width={18} height={18} alt="Paused-quiz" />
                            <span className="text-sm text-[#0C111D] font-normal">Pause Quiz</span>
                        </button> */}
                        {/* Button for End Quiz */}
                        {/* <button className="w-auto p-3 gap-2 flex-row flex bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center">

                            <Image src="/icons/endquiz.svg" width={18} height={18} alt="End-quiz" />
                            <span className="text-sm text-[#DE3024]  font-normal">End Quiz</span>
                        </button> */}
                        {/* Button for Resume Quiz */}
                        {/* <button
                            className="w-auto p-3 gap-2 flex-row flex rounded-[8px] h-[40px] items-center">
                            <Image src="/icons/resume.svg" width={18} height={18} alt="Resume Quiz" />
                            <span className="text-sm text-[#9012FF]  font-medium">Resume Quiz</span>
                        </button> */}
                        {/* Button for Delete Quiz */}
                        {/* <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full items-center">
                            <Image src="/icons/delete.svg" width={18} height={18} alt="delete-quiz" />
                            <span className="text-sm text-[#DE3024] font-normal">Delete Quiz</span>
                        </button> */}
                        <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] items-center w-full">
                            <Image src="/icons/edit-icon.svg" width={18} height={18} alt="Edit-quiz" />
                            <span className="text-sm text-[#0C111D] font-normal">Edit Quiz</span>
                        </button>
                    </div>

                </div>
                <div className="flex flex-row gap-2">
                    <div className="bg-[#EAECF0] rounded-[8px] p-2 flex flex-row gap-1">
                        <Image
                            src="/icons/information-circle.svg"
                            width={20}
                            height={20}
                            alt="information-icon"
                        />
                        <span className="text-[#475467] font-normal text-[13px]">Quiz will be live on 12 Jan, 2024  05:30 PM</span>
                    </div>
                    <button>
                        <Image src="/icons/edit-icon.svg" width={18} height={18} alt="Edit-quiz" />
                    </button>
                </div>
                <span className="font-normal text-sm text-[#1D2939]">Ready to test your knowledge? Join our quiz competition and compete for exciting prizes!</span>
            </div>

        </div>

    )
}
export default marketinfo;