import Image from "next/image"
function myprofile() {
    return (
        <div className=" flex justify-center w-full h-full">
            <div className="mt-8 flex h-[298px] w-[540px] bg-[#FFFFFF]  justify-between flex-row border border-solid border-[#EAECF0] rounded-md p-6">

                <div className="flex flex-row gap-2 h-10 items-center">
                    <Image src='/icons/Profile-pic.png' alt="DP" width={72} height={72} />
                    <div className="flex flex-col gap-1">
                        <span className="text-[#1D2939] font-semibold text-2xl">Jenny Wilson</span>
                        <span className="font-normal text-[#667085] text-base">Admin</span>
                    </div>
                </div>
                <div className="flex flex-row gap-3">
                    <button className="p-4 bg-[#FFFFFF] h-[40px] border border-solid border-[#EAECF0] rounded-[8px] flex flex-row justify-between ">
                        <Image src="/icons/logout-03.svg" width={18} height={18} alt="delete-quiz" />
                        <span className="text-sm text-[#DE3024] font-normal">Log out</span>
                    </button>


                </div>
            </div>
        </div>

    )
}
export default myprofile;