import Image from "next/image";
function section() {
    return (
        <>
            <div className="bg-[#FFFFFF] border border-solid border-[#EAECF0] h-auto rounded-[16px] mt-4">



                <div className="bg-[#FFFFFF] border border-solid border-[#EAECF0] h-[184px] p-6 items-center flex flex-col gap-2 rounded-[16px]  ">


                    <span className="text-[#1D2939] font-semibold text-lg">Create section/questions</span>
                    <span className="font-normal text-xs text-[#667085]">Test Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups. Name</span>
                    <div className="flex flex-row gap-4 mt-2">
                        <button className="flex flex-row gap-1 items-center rounded-md  border-[2px] border-solid border-[#9012FF] h-[44px] w-[162px] justify-center">
                            <Image
                                src="/icons/plus-sign.svg"
                                height={18}
                                width={18}
                                alt="Plus sign" />
                            <span className="text-[#9012FF] font-semibold text-sm">Add Section</span>
                        </button>
                        <button className="flex flex-row gap-1 items-center rounded-md border-[2px]  border-solid border-[#9012FF] h-[44px] w-[162px] justify-center">
                            <Image
                                src="/icons/plus-sign.svg"
                                height={18}
                                width={18}
                                alt="Plus sign" />
                            <span className="text-[#9012FF] font-semibold text-sm">Add Question</span>
                        </button>

                    </div>


                </div>
            </div>
        </>
    )
}
export default section;