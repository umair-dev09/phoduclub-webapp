import Image from "next/image";
function PersonalDetails() {
    return (
        <div className="flex flex-col m-8  gap-6">
            <h1 className="text-[#1D2939] font-semibold text-lg">Personal Details</h1>
            <div className="flex flex-row justify-between w-full h-[72px]">
                <div className="flex flex-row gap-2">

                    <div className="relative">
                        <Image src='/images/DP_Lion.svg' alt="DP" width={72} height={72} />
                        <Image className="absolute right-0 bottom-0" src='/icons/winnerBatch.svg' alt="Batch" width={32} height={32} />
                    </div>
                    <div className="flex items-start justify-start flex-col">
                        <div className="font-semibold">Jenny Wilson</div>
                        <div className="flex justify-start items-start text-[13px] text-[#667085]">jenny#8547</div>
                    </div>


                </div>
                <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] items-center ">
                    <Image src="/icons/edit-icon.svg" width={18} height={18} alt="Edit-quiz" />
                    <span className="text-sm text-[#0C111D] font-normal">Edit Quiz</span>
                </button>
            </div>

        </div>

    )
}
export default PersonalDetails;