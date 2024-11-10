import Image from "next/image";
function ExamDetails() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-row gap-3 border-b border-solid border-[#EAECF0] p-8">
                <div className="relative">
                    <Image src="/images/DP_Lion.svg" alt="DP" width={72} height={72} />
                    <Image
                        className="absolute right-0 bottom-0"
                        src="/icons/winnerBatch.svg"
                        alt="Batch"
                        width={32}
                        height={32}
                    />
                </div>
                <div className="flex items-start flex-col justify-center">
                    <div className="font-semibold text-[#1D2939] text-2xl">Jenny Wilson</div>
                    <div className="flex justify-start items-start text-[16px] font-medium text-[#667085]">jenny#8547</div>
                </div>
            </div>
            <p className="font-semibold text-[#1D2939] text-lg px-8">Exam Details</p>
            <div className="flex flex-col gap-2 px-8">
                <span className="text-[#667085] font-normal text-base">Preparing Exams</span>
                <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 font-semibold  border border-solid border-[#D0D5DD] rounded-full cursor-pointer hover:bg-gray-100">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span> JEE
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-[#344054] font-semibold  border border-solid border-[#D0D5DD] rounded-full cursor-pointer hover:bg-gray-100">
                        <span className="w-2 h-2 rounded-full bg-orange-500"></span> BITSAT
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 font-semibold border border-solid border-[#D0D5DD] rounded-full cursor-pointer hover:bg-gray-100">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span> VITEEE
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 font-semibold border border-solid border-[#D0D5DD] rounded-full cursor-pointer hover:bg-gray-100">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span> SRMJEEE
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 font-semibold border border-solid border-[#D0D5DD]rounded-full cursor-pointer hover:bg-gray-100">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span> KCET
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 font-semibold border border-solid border-[#D0D5DD] rounded-full cursor-pointer hover:bg-gray-100">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span> COMEDK
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 font-semibold border border-solid border-[#D0D5DD] rounded-full cursor-pointer hover:bg-gray-100">
                        <span className="w-2 h-2 rounded-full bg-orange-500"></span> MET
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2 px-8">
                <span className="text-[#667085] font-normal text-base">Target Year</span>
                <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 font-semibold  border border-solid border-[#D0D5DD] rounded-full cursor-pointer hover:bg-gray-100">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span> 2024
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-[#344054] font-semibold  border border-solid border-[#D0D5DD] rounded-full cursor-pointer hover:bg-gray-100">
                        <span className="w-2 h-2 rounded-full bg-orange-500"></span> 2025
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 font-semibold border border-solid border-[#D0D5DD]rounded-full cursor-pointer hover:bg-gray-100">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span> 2026
                    </div>

                </div>
            </div>
        </div>

    )
}
export default ExamDetails;