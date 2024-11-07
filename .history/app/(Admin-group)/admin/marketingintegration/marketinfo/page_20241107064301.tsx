import Image from "next/image";
function marketinfo() {
    return (
        <div className="p-8 flex flex-col">
            <div className="flex flex-col">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-2 items-center">
                        <Image
                            src="/icons/idea-01.svg"
                            width={24}
                            height={24}
                            alt="idea-icon" />
                        <h1 className="text-[#1D2939] font-semibold text-2xl">Quiz competition</h1>
                        <div className="bg-[#EDE4FF] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                            <span className="w-[6px] h-[6px] bg-[#7400E0] rounded-full "></span>
                            <span className="font-medium text-[#7400E0] text-xs">Live</span>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2">

                    </div>

                </div>

            </div>

        </div>

    )
}
export default marketinfo;