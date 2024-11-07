function PersonalDetails() {
    return (
        <div className="flex flex-col m-8  gap-6">
            <h1 className="text-[#1D2939] font-semibold text-lg">Personal Details</h1>
            <div className="flex flex-row justify-between">
                <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] items-center w-full">
                    <Image src="/icons/edit-icon.svg" width={18} height={18} alt="Edit-quiz" />
                    <span className="text-sm text-[#0C111D] font-normal">Edit Quiz</span>
                </button>
            </div>

        </div>

    )
}
export default PersonalDetails;