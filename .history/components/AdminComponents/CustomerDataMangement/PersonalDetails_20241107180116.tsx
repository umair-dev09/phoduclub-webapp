import Image from "next/image";
function PersonalDetails() {
    return (
        <div className="flex flex-col m-8  gap-6">
            <h1 className="text-[#1D2939] font-semibold text-lg">Personal Details</h1>
            <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-2">
                    <div className="flex flex-col gap-2">
                        <div className="relative">
                            <Image src='/images/DP_Lion.svg' alt="DP" width={40} height={40} />
                            <Image className="absolute right-0 bottom-0" src='/icons/winnerBatch.svg' alt="Batch" width={18} height={18} />
                        </div>
                    </div>
                </div>
                <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] items-center w-full">
                    <Image src="/icons/edit-icon.svg" width={18} height={18} alt="Edit-quiz" />
                    <span className="text-sm text-[#0C111D] font-normal">Edit Quiz</span>
                </button>
            </div>

        </div>

    )
}
export default PersonalDetails;