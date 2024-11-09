import Image from "next/image";
function PersonalDetails() {
    return (
        <div className="flex flex-col m-8  gap-6">
            <h1 className="text-[#1D2939] font-semibold text-lg">Personal Details</h1>
            <div className="flex flex-row justify-between w-full h-[72px]">
                <div className="flex flex-row gap-3">

                    <div className="relative">
                        <Image src='/images/DP_Lion.svg' alt="DP" width={72} height={72} />
                        <Image className="absolute right-0 bottom-0" src='/icons/winnerBatch.svg' alt="Batch" width={32} height={32} />
                    </div>
                    <div className="flex items-start flex-col justify-center">
                        <div className="font-semibold text-[#1D2939] text-2xl">Jenny Wilson</div>
                        <div className="flex justify-start items-start text-[16px] font-medium text-[#667085]">jenny#8547</div>
                    </div>


                </div>
                <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] w-[84px] items-center ">
                    <Image src="/icons/edit-icon.svg" width={18} height={18} alt="Edit-quiz" />
                    <span className="text-sm text-[#0C111D] font-normal">Edit</span>
                </button>
            </div>
            <hr />
            <div className="flex flex-row w-full">
                <div className="flex flex-col w-1/2">
                    <span className="font-normal text-[#667085] text-[16px]">First Name</span>
                    <span className="font-semibold text-[#1D2939] text-[16px]">Jenny</span>
                </div>
                <div className="flex flex-col w-1/2">
                    <span className="font-normal text-[#667085] text-[16px]">Last Name</span>
                    <span className="font-semibold text-[#1D2939] text-[16px]">Wilson</span>
                </div>
            </div>
            <div className="flex flex-row w-full">
                <div className="flex flex-col w-1/2">
                    <span className="font-normal text-[#667085] text-[16px]">User ID</span>
                    <span className="font-semibold text-[#1D2939] text-[16px]">jenny#8745</span>
                </div>
                <div className="flex flex-col w-1/2">
                    <span className="font-normal text-[#667085] text-[16px]">Mobile No.</span>
                    <span className="font-semibold text-[#1D2939] text-[16px]">+918431823329</span>
                </div>
            </div>

        </div>

    )
}
export default PersonalDetails;