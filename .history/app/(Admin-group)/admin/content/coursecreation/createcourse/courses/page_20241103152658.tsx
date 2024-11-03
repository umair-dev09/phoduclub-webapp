"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
function courses() {
    const router = useRouter();
    // this logic is for rating 

    interface StarIconProps {
        filled: boolean;
        isHalf: boolean;
    }
    const StarIcon: React.FC<StarIconProps> = ({ filled, isHalf }) => (
        <Image
            src={filled ? (isHalf ? "/icons/half-star.svg" : "/icons/full-star.svg") : "/icons/empty-star.svg"}
            width={20}
            height={20}
            alt={isHalf ? "half star" : filled ? "full star" : "empty star"}
        />
    );

    const rating = 1.5; // The rating value
    const totalStars = 5;
    return (
        <div className="px-[32px] pt-[25px] w-full h-auto overflow-y-auto pb-24 flex flex-col gap-5">
            {/* BreadCrumbs */}
            <div className="flex items-center">
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
            {/* Course content */}
            <div className="bg-[#FFFFFF] p-6 border border-solid border-[#EAECF0] rounded-[16px] flex flex-row  gap-4 h-auto">
                <Image
                    src="/icons/image.png"
                    width={437}
                    height={271}
                    alt="left-arrow" />
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex flex-row justify-between items-center h-[40px]">
                        <div className="bg-[#F2F4F7] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6">
                            <span className="w-[6px] h-[6px] bg-[#182230] rounded-full "></span>
                            <span className="font-medium text-[#182230] text-xs">Saved</span>
                        </div>
                        <div className="flex flex-row gap-2">
                            <button className="w-auto p-3 gap-2 flex-row flex bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center"
                            >
                                <Image src="/icons/publish-quiz.svg" width={18} height={18} alt="publish-quiz" />
                                <span className="text-sm text-[#0C111D] font-normal">Publish Quiz</span>
                            </button>
                            <button
                                className="w-10 p-[10px] h-[40px] gap-1 flex-row flex  bg-[#FFFFFF] rounded-md 
                                        border border-solid border-[#EAECF0] shadow-none"
                                style={{ outline: "none" }}
                            >
                                <Image src="/icons/three-dots.svg" width={18} height={18} alt="three-dots" />
                            </button>
                        </div>
                    </div>
                    <span className="text-[#1D2939] font-bold text-lg">BITSET Full Course</span>
                    <div className=' text-[#667085] text-sm font-normal '>
                        <p>The BITSET Full Course is designed to provide students with an in-depth understanding of bit manipulation techniques and the use of bitsets in data structures.</p>
                    </div>
                    {/* this code below is for rating  */}
                    <div className="flex items-center gap-2 flex-row h-[24px] flex-row">
                        <div>
                            {[...Array(Math.floor(rating))].map((_, index) => (
                                <StarIcon key={`filled-${index}`} filled={true} isHalf={false} />
                            ))}
                            {rating % 1 >= 0.5 && <StarIcon filled={true} isHalf={true} />}
                            {[...Array(totalStars - Math.ceil(rating))].map((_, index) => (
                                <StarIcon key={`empty-${index}`} filled={false} isHalf={false} />
                            ))}
                        </div>
                        <div className="text-[#1D2939] text-sm font-bold">
                            {rating.toFixed(1)}
                            <span className="text-[#1D2939] font-normal text-sm ml-1">
                                <span className="flex items-center">
                                    <span className="inline-block">({`500+`}</span>
                                    <span className="inline-block">Ratings)</span>
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-row gap-3">
                        <div className="text-[#1D2939] text-2xl font-bold">
                            ₹ 3,990
                        </div>
                        <div className="text-[#667085] text-base font-normal line-through">
                            ₹ 7,499
                        </div>
                        <div className="bg-[#DB6704] w-[76px] h-[25px] flex items-center justify-center rounded-full text-white text-xs font-semibold">
                            86% off
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}
export default courses;








{/* <div className="flex flex-col flex-1 h-full ">
<div className="flex flex-1 flex-col h-[105px] p-4">
    <div className='text-[#1D2939] mt-2 ml-2'>
        <h3>BITSET Full Course</h3>
    </div>
    <div className=' text-[#667085] text-sm font-normal mt-4 ml-2'>
        <p>The BITSET Full Course is designed to provide students with an in-depth understanding of bit manipulation techniques and the use of bitsets in data structures.</p>
    </div>
</div>
{/* this code below is for rating  

<div className="flex items-center justify-between w-[255px] h-[24px] mt-10">
    <div className="flex items-center ml-5">

        {[...Array(Math.floor(rating))].map((_, index) => (
            <StarIcon key={`filled-${index}`} filled={true} isHalf={false} />
        ))}


        {rating % 1 >= 0.5 && <StarIcon filled={true} isHalf={true} />}


        {[...Array(totalStars - Math.ceil(rating))].map((_, index) => (
            <StarIcon key={`empty-${index}`} filled={false} isHalf={false} />
        ))}
    </div>


    <div className="text-[#1D2939] text-sm font-bold flex items-center mt-1 ml-2">
        {rating.toFixed(1)}
        <span className="text-[#1D2939] font-normal text-sm ml-1">
            <span className="flex items-center">
                <span className="inline-block">({`500+`}</span>
                <span className="inline-block">Ratings)</span>
            </span>
        </span>
    </div>
</div>



<div className="flex items-center justify-between h-full">
    <div className="flex items-center ml-7 mb-7 mt-7 space-x-3">
        <div className="text-[#1D2939] text-2xl font-bold">
            ₹ 3,990
        </div>
        <div className="text-[#667085] text-base font-normal line-through">
            ₹ 7,499
        </div>
        <div className="bg-[#DB6704] w-[76px] h-[25px] flex items-center justify-center rounded-full text-white text-xs font-semibold">
            86% off
        </div>
    </div>


    <div className="m-7">
        <button
            className="text-white text-sm font-semibold py-3 px-6 rounded-md shadow-inner-button"
            style={{
                width: "182px",
                height: "44px",
                backgroundColor: "#9012FF",
                borderWidth: "1px 0 0 0",
                borderColor: "#9012FF",
            }}
        >
            Buy Course
        </button>
    </div>
</div>
</div> */}