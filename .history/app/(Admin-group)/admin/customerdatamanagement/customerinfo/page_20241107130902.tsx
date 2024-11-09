function customerinfo() {
    return (
        <div className="mx-8 mt-8 bg-[#FFFFFF] border border-solid border-[#E5E7EB] h-auto w-full rounded-t-[12px] flex flex-row">
            <div className="w-[273px] border-r border-solid border-[#E5E7EB] px-8 pt-8 gap-2 flex flex-col">
                <button className="h-12 text-left bg-[#F5F0FF] border border-solid border-[#DDCDFF] rounded-md px-4 py-2">
                    <span className="font-medium text-[#7400E0] text-base">Personal Details</span>
                </button>
                <button className="h-12 text-left  rounded-md px-4 py- hover:bg-[#F5F0FF]">
                    <span className="font-medium text-[#1D2939] text-base">Exam Details</span>
                </button>
                <button className="h-12 text-left  rounded-md px-4 py-2 hover:bg-[#F5F0FF]">
                    <span className="font-medium text-[#1D2939] text-base">Products</span>
                </button>
                <button className="h-12 text-left  rounded-md px-4 py-2 hover:bg-[#F5F0FF]">
                    <span className="font-medium text-[#1D2939] text-base">Community</span>
                </button>
                <button className="h-12 text-left  rounded-md px-4 py-2 hover:bg-[#F5F0FF]">
                    <span className="font-medium text-[#1D2939] text-base">Support</span>
                </button>
            </div>
        </div>
    )
}
export default customerinfo;