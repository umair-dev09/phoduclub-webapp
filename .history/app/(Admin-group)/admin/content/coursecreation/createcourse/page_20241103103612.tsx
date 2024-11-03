function createcourse() {
    return (
        <div className="m-[20px] w-full">
            <div className="flex flex-row justify-between h-[60px] border-b border-solid border-[#D0D5DD]">
                <div className="flex flex-row items-center">
                    <span className="text-[#1D2939] text-lg font-semibold ">Create course</span>
                </div>
                <div className="flex flex-row ">
                    <button className="h-[44px] w-[120px] rounded-md items-center flex border border-solid border-[#EAECF0] bg-[#FFFFFF] justify-center">
                        <span className="text-[#1D2939] font-semibold text-sm">Cancel</span>
                    </button>
                    <button className="h-[44px] w-[120px] ml-4 rounded-md items-center flex border border-solid border-[#800EE2] bg-[#9012FF] justify-center shadow-inner-button">
                        <span className="text-[#FFFFFF] font-semibold text-sm">Create</span>
                    </button>
                </div>
            </div>
        </div>
    )

}
export default createcourse;