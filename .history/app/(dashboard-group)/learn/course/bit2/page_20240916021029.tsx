import Image from "next/image";

export default function Bit2() {
    return (
        <div className="relative flex flex-col flex-1 pb-8">
            <div className="absolute top-0 right-0 w-[363px] h-[581px] bg-[#FFFFFF] border border-b border-r">
                <div className="h-[480px] bg-[#FFFFFF]" style={{ borderRight: '1px solid #EAECF0' }}>
                    <div className="w-[331px] h-[70px] rounded-tl-lg m-3" style={{ paddingLeft: "10px", borderRadius: '8px 0 0 0' }}>
                        {/* Use a flex container with `flex-col` to stack items vertically */}
                        <div className="flex flex-col h-full justify-start">
                            <button className="w-full h-[70px] bg-[#ee2f2f] text-[#1D2939] text-base font-bold rounded-lg flex items-start"

                            >
                                <div className="flex items-center justify-between w-full">
                                    {/* First Section */}
                                    <div className="flex items-center flex-1">
                                        <Image
                                            src="/icons/course-circle.svg"
                                            width={20}
                                            height={20}
                                            alt="circle-course"
                                            className="mr-2 mt-2" // Margin for spacing
                                        />
                                        <span className="mt-2">1. Welcome and Introduction</span>
                                    </div>

                                    {/* Second Section */}
                                    <div className="flex items-center flex-1 justify-end">
                                        <Image
                                            src="/icons/course-learn.svg"
                                            width={20}
                                            height={20}
                                            alt="course-learn"
                                            className="mr-2 mt-2" // Margin for spacing
                                        />
                                        <span className="mt-2">10:10</span>
                                    </div>
                                </div>

                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
