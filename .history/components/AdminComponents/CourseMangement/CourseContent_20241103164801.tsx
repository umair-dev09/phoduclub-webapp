import Image from "next/image";
function CourseContent() {
    return (
        <div className="flex flex-col gap-4 ">
            <div className="flex flex-row justify-between h-[64px]">
                <div className="flex flex-col justify-between">
                    <span className="text-[#1D2939] font-semibold text-lg">Course Content</span>

                </div>
                <button
                    className="flex flex-row gap-1 items-center rounded-md border-[2px] border-solid border-[#9012FF] h-[44px] w-[162px] justify-center"
                >
                    <Image src="/icons/plus-sign.svg" height={18} width={18} alt="Plus Sign" />
                    <span className="text-[#9012FF] font-semibold text-sm">Add Section</span>
                </button>

            </div>

        </div>

    )
}
export default CourseContent;