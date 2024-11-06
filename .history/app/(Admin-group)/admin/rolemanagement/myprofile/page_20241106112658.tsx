import Image from "next/image"
function myprofile() {
    return (
        <div className="flex justify-center">
            <div className="mt-8 flex h-[298px] w-auto bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-md p-6">
                <div className="flex justify-between">
                    <div className="flex flex-row gap-2 h-10 items-center">
                        <Image src='/icons/Profile-pic.png' alt="DP" width={72} height={72} />
                        <div className="flex flex-col gap-1">
                            <span className="text-[#1D2939] font-semibold text-2xl">Jenny Wilson</span>
                            <span className="font-normal text-[#667085] text-base">Admin</span>
                        </div>
                    </div>
                    <div className="flex flex-row gap-3">

                    </div>
                </div>
            </div>
        </div>

    )
}
export default myprofile;