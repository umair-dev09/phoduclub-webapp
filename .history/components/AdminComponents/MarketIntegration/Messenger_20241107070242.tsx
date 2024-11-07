function Messenger() {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between h-[44px] items-center mt-4">
                <h1 className="font-semibold text-lg text-[#1D2939]">Messenger</h1>
                <button
                    className="h-[44px] w-auto px-6 py-2 bg-[#8501FF] rounded-md shadow-inner-button border border-solid border-[#800EE2] flex items-center justify-center"
                >
                    <span className="text-[#FFFFFF] font-semibold text-sm">Create Push Notification</span>
                </button>
            </div>
            <div className="w-full h-auto  flex flex-row gap-1 ">
                <div className="w-full flex flex-col p-4 border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-xl">
                    <span className="text-[#667085] font-normal text-sm">Quiz starts</span>
                    <span className="font-medium text-[#1D2939] text-base">06 Jan, 2024  05:30 PM</span>
                </div>
                <div className="w-full flex flex-col p-4 border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-xl">
                    <span className="text-[#667085] font-normal text-sm">Quiz ends</span>
                    <span className="font-medium text-[#1D2939] text-base">06 Jan, 2024  07:30 PM</span>
                </div>
                <div className="w-full flex flex-col p-4 border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-xl">
                    <span className="text-[#667085] font-normal text-sm">Marks per questions</span>
                    <span className="font-medium text-[#1D2939] text-base">3</span>
                </div>
            </div>


        </div>

    )
}
export default Messenger;