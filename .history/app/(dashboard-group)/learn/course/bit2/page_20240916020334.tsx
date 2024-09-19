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
                                <div className="flex items-center
                                flex-1">
                                    <Image
                                        src="/icons/course-circle.svg"
                                        width={20}
                                        height={20}
                                        alt="circle-course"
                                        className="" style={{ marginTop: "9px", marginLeft: '15px' }}
                                    />
                                    <span className=" flex "
                                        style={{ marginTop: "9px", marginLeft: '15px' }}
                                    >1. Welcome and Introduction</span>
                                </div>

                                {/* <div>
                                    <Image
                                        src="/icons/course-learn.svg"
                                        width={16}
                                        height={16}

                                        alt="read"
                                    />

                                    <span>10:00</span>
                                </div> */}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
