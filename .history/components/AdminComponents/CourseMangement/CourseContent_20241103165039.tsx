import Image from "next/image";
function CourseContent() {
    return (
        <div className="flex flex-col gap-4 ">
            <div className="flex flex-row justify-between h-16">
                <div className="flex flex-col justify-between">
                    <span className="text-[#1D2939] font-semibold text-lg">Course Content</span>
                    <div className='flex flex-row '>
                        <div className='flex flex-row'>
                            <div className='mr-2'>
                                <Image src="/icons/read.svg" alt="learn-icon" width={20} height={20} />
                            </div>
                            <div className='mr-3 font-normal text-sm text-[#1D2939]'>3 Lessons</div>
                        </div>
                        <div className='flex flex-row'>
                            <div className='mr-2'>
                                <Image src="/icons/vedio.svg" alt="video-icon" width={20} height={20} />
                            </div>
                            <div className='mr-3 font-normal text-sm text-[#1D2939]'>4 Videos</div>
                        </div>
                        <div className='flex flex-row'>
                            <div className='mr-2'>
                                <Image src="/icons/test.svg" alt="test-icon" width={20} height={20} />
                            </div>
                            <div className='mr-3 font-normal text-sm text-[#1D2939]'>2 Tests</div>
                        </div>
                    </div>

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