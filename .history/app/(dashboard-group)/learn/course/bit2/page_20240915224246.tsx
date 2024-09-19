import Image from "next/image";

export default function bit2() {
    return (
        <div>
            {/* Header Section */}
            <div className="my-5 flex items-center">
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

            {/* Placeholder for full screen div */}
            <div className="w-[374px] h-full">
                {/* Content or additional sections can go here */}
            </div>
        </div>
    )
}
