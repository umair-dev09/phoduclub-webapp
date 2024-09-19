import Image from "next/image";

export default function Bit2() {
    return (
        <div className="relative flex flex-col flex-1 pb-8">
            <div className="absolute top-0 right-0 w-[363px] h-[581px] bg-[#FFFFFF] border border-b border-r">
                <div className="h-[480px] bg-[#FFFFFF]" style={{ borderRight: '1px solid #EAECF0' }}>
                    <div className="w-[331px] h-[70px] rounded-tl-lg m-3" style={{ paddingLeft: "10px", borderRadius: '8px 0 0 0' }}>
                        {/* Use a flex container with `flex-col` to stack items vertically */}
                        <div className="flex flex-col h-full justify-start">
                            <button className="w-full h-[70px] bg-[#FFFFFF] text-[#1D2939] text-base font-medium rounded-lg flex items-start"

                            >
                                <div className="flex-1 flex  itmes-center flex-col">
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
                                    <div className="flex items-center 
                                           flex-1"
                                        style={{ marginTop: "6px" }}>
                                        <Image
                                            src="/icons/course-learn.svg"
                                            width={16}
                                            height={16}
                                            alt="circle-course"
                                            className="" style={{ marginLeft: '45px' }}
                                        />
                                        <span className=" flex font-normal text-[#667085]"
                                            style={{ marginLeft: '10px' }}
                                        >10:10</span>
                                    </div>
                                </div>

                            </button>
                        </div>
                        <div>
                            <button className="w-full h-[70px] bg-[#FFFFFF] text-[#1D2939] text-base font-medium rounded-lg flex items-start"

                            >
                                <div className="flex-1 flex  itmes-center flex-col">
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
                                        >2. Chapter 01 Introduction</span>
                                    </div>
                                    <div className="flex items-center 
                                                   flex-1"
                                        style={{ marginTop: "6px" }}>
                                        <Image
                                            src="/icons/vedio.svg"
                                            width={16}
                                            height={16}
                                            alt="circle-course"
                                            className="" style={{ marginLeft: '45px' }}
                                        />
                                        <span className=" flex font-normal text-[#667085]"
                                            style={{ marginLeft: '10px' }}
                                        >9:20</span>
                                    </div>
                                </div>

                            </button>
                        </div>
                        <div>
                            <button className="w-full h-[70px] bg-[#FFFFFF] text-[#1D2939] text-base font-medium rounded-lg flex items-start"

                            >
                                <div className="flex-1 flex  itmes-center flex-col">
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
                                        >3. Chapter 01 heading</span>
                                    </div>
                                    <div className="flex items-center 
                                                   flex-1"
                                        style={{ marginTop: "6px" }}>
                                        <Image
                                            src="/icons/vedio.svg"
                                            width={16}
                                            height={16}
                                            alt="circle-course"
                                            className="" style={{ marginLeft: '45px' }}
                                        />
                                        <span className=" flex  font-normal text-[#667085]"
                                            style={{ marginLeft: '10px' }}
                                        >11:45</span>
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
