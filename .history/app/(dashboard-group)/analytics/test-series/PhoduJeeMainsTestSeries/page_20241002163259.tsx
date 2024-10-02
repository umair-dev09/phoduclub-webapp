"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

function JeeMains() {
    const router = useRouter();

    return (
        <div className="flex flex-1 flex-col">
            <div className="h-[64px] ml-8 flex items-center">
                <div className="my-5 flex items-center">
                    <button className="flex items-center ml-1" onClick={() => router.back()}>
                        <div className="text-[#1D2939] h-[24px] w-auto" style={{ fontSize: "16px", fontWeight: "600" }}>
                            Test-Series
                        </div>
                        <div className="ml-3 w-[24px]">
                            <Image src="/icons/course-left.svg" width={7} height={12} alt="left-arrow" />
                        </div>
                    </button>
                    <div className="text-[#667085] h-full w-auto -ml-1" style={{ fontSize: "16px", fontWeight: "500" }}>
                        Phodu JEE Mains Test Series 2025
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-[17px] ml-8">
                <span className="font-bold text-[#1D2939] text-1g">Phodu JEE Mains Test Series 2025</span>
            </div>
        </div>
    )
}
export default JeeMains;