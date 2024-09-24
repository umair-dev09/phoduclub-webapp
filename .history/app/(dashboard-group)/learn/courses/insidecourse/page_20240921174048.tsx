import Image from "next/image";
function sidebutton() {
    return (
        <div className="flex flex-row w-screen" >
            <div className="MainCourseLayout flex flex-col w-[75%]  overflow-y-auto py-3">
                {/* THIS IS THE HEADER PART OF MAIN---COURSE-----LAYOUT */}
                <div>
                    <div className="h-[64px]  ml-8 flex items-center ">
                        <div className="flex flex-row gap-[4px]">
                            <span className="text-[#1D2939] h-[24px] " style={{ fontSize: "16px", fontWeight: "600" }}>
                                Courses
                            </span>
                            <span className="">
                                <Image
                                    src="/icons/course-left.svg"
                                    width={6}
                                    height={2}
                                    alt="coursesleft-arrow "

                                />
                            </span>

                            <span className="text-[#667085] h-[24px]" style={{ fontSize: "16px", fontWeight: "500" }}>
                                BITSET Full Course

                            </span>
                        </div>

                    </div>
                </div>
                {/* THIS IS END  */}
                {/* THIS IS THE MAIN {MIDDLE} PART OF MAIN---COURSE-----LAYOUT */}
                <div>

                </div>
                {/* THIS IS END  */}
                {/* THIS IS THE FOOTER PART OF MAIN---COURSE-----LAYOUT */}
                <div>

                </div>
                {/* THIS IS END  */}

            </div>
            {/* THIS IS SIDE LAYOUT WHERE ALL THE SIDE BUTTONS ARE PLACED */}
            <div className="SideLayout w-[25%] flex flex-col bg-[#FFFFFF] overflow-y-auto p-3">
                {/* THIS IS START OF FIRST BUTTON */}
                <div className="bg-[#F8F0FF] h-[64px] gap-[16px] rounded-[8px]">
                    <button className="flex justify-between">
                        <div className=" flex flex-row mt-3 ml-4">
                            <Image
                                src="/icons/read.svg"
                                width={20}
                                height={20}
                                alt="" />

                        </div>
                        <div className="flex flex-col h-[52px] gap-[4px]  ml-5 mt-2">
                            <span className="gap-[4px] text-1g text-[#1D2939] font-bold">1. Welcome and Introduction</span>
                            <div className="flex flex-row items-center ">
                                <span >
                                    <Image
                                        src="/icons/read.svg"
                                        width={16}
                                        height={16}
                                        alt="" />
                                </span>
                                <span className=" ml-2 text-sm font-normal text-[#667085]">10:00</span>
                            </div>

                        </div>



                    </button>

                </div>
                {/* THIS IS END OF FIRST BUTTON */}



            </div>


        </div>
    )
}
export default sidebutton;