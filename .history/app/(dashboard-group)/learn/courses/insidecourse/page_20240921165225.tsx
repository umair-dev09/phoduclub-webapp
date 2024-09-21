import Image from "next/image";
function sidebutton() {
    return (
        <div className="flex flex-row w-screen" >
            <div className="MainCourseLayout flex flex-col w-[75%] bg-slate-700 overflow-y-auto p-3">
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
                <h3>Main..........</h3>
            </div>
            <div className="SideLayout w-[25%] flex flex-col bg-[#FFFFFF] overflow-y-auto p-3">
                <div className="bg-[#F8F0FF] h-[64px] gap-[16px] rounded-[8px]">
                    <button className="flex justify-between">
                        <div className=" flex flex-row mt-3 ml-4">
                            <Image
                                src="/icons/read.svg"
                                width={20}
                                height={20}
                                alt="" />

                        </div>
                        <div className="flex flex-col h-[52px] gap-[8px] bg-green-400 ml-4 mt-2">
                            <span className="gap-[4px]">1. Welcome and Introduction</span>
                            <span>
                                <Image
                                    src="/icons/read.svg"
                                    width={16}
                                    height={16}
                                    alt="" />
                            </span>
                        </div>



                    </button>

                </div>



            </div>

        </div>
    )
}
export default sidebutton;