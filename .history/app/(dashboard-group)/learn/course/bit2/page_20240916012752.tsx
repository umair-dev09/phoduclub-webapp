import Image from "next/image";

export default function Bit2() {
    return (
        <div className="relative flex flex-col flex-1 pb-8">
            <div className="absolute top-0 right-0 w-[363px] h-[581px] bg-[#FFFFFF] border border-b border-r">
                <div className="h-[480px] bg-[#FFFFFF] "
                    style={{ borderRight: '1px solid #EAECF0' }}>
                    <div className="w-[331px] h-[70px] rounded-tl-lg m-3"
                        style={{
                            paddingLeft: "10px",
                            borderRadius: '8px 0 0 0',
                        }}>


                        <button className="w-full h-full bg-[#ee2f2f] text-[#1D2939]  text-base font-bold rounded-lg  flex items-center space-x-2 mb-5">
                            <Image
                                src="/icons/course-circle.svg"
                                width={20}
                                height={20}
                                alt="circle-course"
                                className="ml-4"
                            />
                            <span className=" flex-1 ">1. Welcome and Introduction</span>
                        </button>
                    </div>




                </div>
            </div>
        </div>
    );
}
