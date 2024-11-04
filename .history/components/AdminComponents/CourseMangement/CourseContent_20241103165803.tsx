import Image from "next/image";
function CourseContent() {
    return (
        <div className="flex flex-col gap-4 ">
            <div className="flex flex-row justify-between h-16">
                <div className="flex flex-col justify-between">
                    <span className="text-[#1D2939] font-semibold text-lg">Course Content</span>
                    <div className="flex flex-row gap-4">
                        <div className="flex items-center ">
                            <Image src="/icons/read.svg" alt="learn-icon" width={20} height={20} className="mr-2" />
                            <span className="font-normal text-base text-[#1D2939]">3 Lessons</span>
                        </div>
                        <div className="flex items-center ">
                            <Image src="/icons/vedio.svg" alt="video-icon" width={20} height={20} className="mr-2" />
                            <span className="font-normal text-base text-[#1D2939]">4 Videos</span>
                        </div>
                        <div className="flex items-center">
                            <Image src="/icons/test.svg" alt="test-icon" width={20} height={20} className="mr-2" />
                            <span className="font-normal text-base text-[#1D2939]">2 Tests</span>
                        </div>
                    </div>
                </div>
                <button
                    className="flex flex-row gap-1 items-center rounded-md border-[2px] border-solid border-[#9012FF] h-[44px] w-[162px] justify-center">
                    <Image src="/icons/plus-sign.svg" height={18} width={18} alt="Plus Sign" />
                    <span className="text-[#9012FF] font-semibold text-sm">Add Section</span>
                </button>
            </div>
            <div className="bg-[#FFFFFF] h-[184px] p-6 items-center flex flex-col gap-2 rounded-[16px]">
                <span className="text-[#1D2939] font-semibold text-lg">Create section/questions</span>
                <span className="font-normal text-xs text-[#667085]">
                    Test Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
                </span>
                <div className="flex flex-row gap-4 mt-2">
                    <button
                        className="flex flex-row gap-1 items-center rounded-md border-[2px] border-solid border-[#9012FF] h-[44px] w-[162px] justify-center">
                        <Image src="/icons/plus-sign.svg" height={18} width={18} alt="Plus Sign" />
                        <span className="text-[#9012FF] font-semibold text-sm">Add Section</span>
                    </button>
                </div>
            </div>
        </div>

    )
}
export default CourseContent;