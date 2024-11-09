import Image from "next/image"
function myprofile() {
    return (
        <div className=" flex justify-center w-full h-full">
            <div className="mt-8 flex h-[298px] w-auto bg-[#FFFFFF]  gap-4 flex-col border border-solid border-[#EAECF0] rounded-md ">

                <div className="flex flex-row justify-between h-auto w-auto">
                    <div className="flex flex-row gap-2 h-10 items-center">
                        <Image src='/icons/Profile-pic.png' alt="DP" width={72} height={72} />
                        <div className="flex flex-col gap-1">
                            <span className="text-[#1D2939] font-semibold text-2xl">Jenny Wilson</span>
                            <span className="font-normal text-[#667085] text-base">Admin</span>
                        </div>
                    </div>
                    <div className="flex flex-row gap-3">
                        <button className="py-2 px-4 bg-[#FFFFFF] gap-2 h-[40px] w-auto items-center border border-solid border-[#EAECF0] rounded-[8px] flex flex-row justify-between ">
                            <Image src="/icons/logout-03.svg" width={18} height={18} alt="delete-quiz" />
                            <span className="text-sm text-[#DE3024] font-normal">Log out</span>
                        </button>
                        <button className="py-2 px-4 bg-[#FFFFFF] gap-2 h-[40px] w-auto items-center border border-solid border-[#EAECF0] rounded-[8px] flex flex-row justify-between ">
                            <Image src="/icons/pencil-edit.svg" width={18} height={18} alt="delete-quiz" />
                            <span className="text-sm text-[#1D2939] font-normal">Edit</span>
                        </button>


                    </div>

                </div>
            </div>
        </div>

    )
}
export default myprofile;