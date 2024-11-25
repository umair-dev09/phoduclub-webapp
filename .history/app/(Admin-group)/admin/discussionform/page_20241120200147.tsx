function discussionform() {
    return (
        <div className=" w-full bg-slate-500">
            <div className="w-[90px] h-full bg-slate-50 p-6 flex flex-col gap-2">
                <div className=" border-2 border-solid border-[#7400E0] rounded-full w-[42px] h-[42px]">
                    <div className="rounded-full w-[42px] h-[42px] bg-[#FFECC0] items-center flex justify-center border-2 border-solid border-[#FFFFFF]">
                        <h1 className="text-[#624C18] text-base font-bold">B</h1>
                    </div>
                </div>
                <div className="rounded-full w-[42px] h-[42px] bg-[#C0D5FF] items-center flex justify-center ">
                    <h1 className="text-[#122368] text-base font-bold">C</h1>
                </div>
                <div className="rounded-full w-[42px] h-[42px] bg-[#C0EAFF] items-center flex justify-center ">
                    <h1 className="text-[#124B68] text-base font-bold">S</h1>
                </div>
                <div className="rounded-full w-[42px] h-[42px] bg-[#FFC0C5] items-center flex justify-center ">
                    <h1 className="text-[#681219] text-base font-bold">V</h1>
                </div>
            </div>
        </div>
    )
}
export default discussionform;