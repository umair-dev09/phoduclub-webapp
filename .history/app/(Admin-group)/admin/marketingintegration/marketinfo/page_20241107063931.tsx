import Image from "next/image";
function marketinfo() {
    return (
        <div className="p-8 flex flex-col">
            <div className="flex flex-col">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-2">
                        <Image
                            src="/icons/idea-01.svg"
                            width={24}
                            height={24}
                            alt="idea-icon" />
                        <h1 className="text-[#1D2939] font-semibold text-2xl">Quiz competition</h1>
                        <div className="bg-[#D3F8E0] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                            <span className="w-[6px] h-[6px] bg-[#0A5B39] rounded-full "></span>
                            <span className="font-medium text-[#0A5B39] text-xs">Finished</span>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2">

                    </div>

                </div>

            </div>

        </div>

    )
}
export default marketinfo();