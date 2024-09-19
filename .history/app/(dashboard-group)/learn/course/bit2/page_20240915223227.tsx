import Image from "next/image"
export default function bit2() {
    return (
        <div className='flex flex-col flex-1 px-8 overflow-auto'>
            <div className=" width-[100x] bg-slate-600">


                <button className='flex items-center ml-1'>
                    <div
                        className="text-[#1D2939] h-[24px] w-auto"
                        style={{ fontSize: "16px", fontWeight: "600" }}
                    >
                        Courses
                    </div>
                    <div className="ml-3 w-[24px]">
                        <Image
                            src="/icons/course-left.svg"
                            width={6}
                            height={12}
                            alt="left-arrow"
                        />
                    </div>
                </button>

                <div
                    className="text-[#667085] h-full w-auto -ml-1"
                    style={{ fontSize: "16px", fontWeight: "500" }}
                >
                    BITSET Full Course
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}