import Image from "next/image";
function sidebutton() {
    return (
        <div className="flex flex-row w-screen" >
            <div className="MainCourseLayout flex flex-col w-[75%] bg-slate-700 overflow-y-auto p-3">
                {/* THIS IS THE HEADER PART OF MAIN---COURSE-----LAYOUT */}
                <div>

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