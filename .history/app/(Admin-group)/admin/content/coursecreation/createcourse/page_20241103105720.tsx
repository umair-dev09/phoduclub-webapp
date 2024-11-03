function createcourse() {
    return (
        <div className="m-[20px] w-full">
            {/* Header part*/}
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
            <div className="flex justify-center">
                <div className="mt-4 h-auto p-6 gap-4  rounded-md bg-[#FFFFFF] border border-solid border-[#EAECF0] w-[684px]">
                    <div className='flex flex-col gap-2'>
                        <span className='text-[#1D2939] text-sm font-semibold'>Name</span>
                        <input
                            className="font-medium pl-3 text-[#1D2939] text-sm placeholder:text-[#A1A1A1] rounded-md placeholder:font-normal
                        focus:outline-none focus:ring-0 
                        border border-solid border-[#D0D5DD] h-[40px] 
                        shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] 
                        transition duration-200 ease-in-out "
                            placeholder="Name"
                            type="text"

                        />
                    </div>

                </div>
            </div>

        </div>
    )

}
export default createcourse;