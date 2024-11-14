function customerinfo() {
    return (
        <div className="h-screen w-full flex flex-row">
            <div className="h-full w-[68%]">
                jabir
            </div>
            <div className="w-[32%] h-full flex flex-col bg-[#FFFFFF] ml-auto overflow-y-auto border-l border-solid border-[#EAECF0]">
                <div className="h-[72px] border-b border-solid border-[#EAECF0] flex flex-row items-center px-6">
                    <p className="text-[#182230] text-base font-semibold">Details</p>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {/* Add your scrollable content here */}
                    <p>Content goes here...</p>

                </div>
            </div>
        </div>


    )
}
export default customerinfo;