function courses() {
    return (
        <div className="flex flex-row w-full h-full">
            <div className="w-[270px] overflow-y-auto flex flex-col border-r border-solid border-[#EAECF0]">
                <div className="h-[72px] p-6  flex flex-row items-center gap-2 border-b border-solid border-[#EAECF0] bg-[#FFFFFF]">
                    <div className="rounded-full w-[42px] h-[42px] bg-[#FFECC0] items-center flex justify-center border-2 border-solid border-[#FFFFFF]">
                        <h1 className="text-[#624C18] text-base font-bold">B</h1>
                    </div>
                    <span className="text-[#182230] font-semibold text-sm">BITSET Full Course</span>
                </div>
            </div>
            <div className="border-l border-solid border-[#EAECF0] h-auto flex-1 flex flex-col">
                <div className="h-[72px] p-6  flex items-center border-b border-solid border-[#EAECF0] bg-[#FFFFFF]">
                    <span className="text-[#182230] font-semibold text-base">1. Welcome and Introduction</span>
                </div>
            </div>
        </div>
    )
}
export default courses;