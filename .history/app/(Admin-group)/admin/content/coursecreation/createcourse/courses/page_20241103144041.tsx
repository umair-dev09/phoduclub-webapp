import { useRouter } from "next/navigation";
import Image from "next/image";
function courses() {
    const router = useRouter();
    return (
        <div className="px-[20px] pt-[20px] w-full h-auto overflow-y-auto pb-24 flex flex-col gap-3">
            <div className="my-5 flex items-center">
                <button className="flex items-center ml-1" onClick={() => router.back()}>
                    <div className="text-[#1D2939] h-[24px] w-auto" style={{ fontSize: "16px", fontWeight: "600" }}>
                        Courses
                    </div>
                    <div className="ml-3 w-[24px]">
                        <Image src="/icons/course-left.svg" width={6} height={12} alt="left-arrow" />
                    </div>
                </button>
                <div className="text-[#667085] h-full w-auto -ml-1" style={{ fontSize: "16px", fontWeight: "500" }}>
                    BITSET Full Course
                </div>
            </div>


        </div>
    )
}
export default courses;