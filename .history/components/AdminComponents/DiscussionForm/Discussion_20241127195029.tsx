import Image from "next/image";
function discussion() {
    return (
        <div className="flex-1 w-full h-auto flex flex-col gap-4 pt-2">

            <div className="flex flex-col gap-4">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-2">
                        <Image
                            src="/images/photo.png"
                            width={36}
                            height={36}
                            alt="profile-icon" />
                        <div className="flex flex-col">
                            <h1 className="font-semibold text-sm text-[#182230]">Marvin McKinney</h1>
                            <span className="font-normal text-sm text-[#667085]">devon#8852</span>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2">
                        <span className="text-xs font-normal text-[#475467]">3:24 PM</span>
                        <Image
                            src="/icons/three-dots.svg"
                            width={24}
                            height={24}
                            alt="three-icon" />
                    </div>
                </div>
                <div className="border border-solid border-[#EAECF0] rounded-[16px] bg-[#FFFFFF] px-4 py-3 h-auto ml-10">
                    <p className="font-normal text-sm text-[#182230]">The BITSET Full Course is designed to provide students with an in-depth understanding of bit manipulation techniques and the use of bitsets in data structures. This course will cover fundamental concepts, practical applications, and advanced techniques used in competitive programming and software development. Students will learn how to efficiently solve problems using bitwise operations and gain hands-on experience through coding exercises and projects.</p>
                </div>
                <button className="ml-10 flex flex-row gap-2 items-center">
                    <Image
                        src="/icons/comment-icon.svg"
                        width={20}
                        height={20}
                        alt="three-icon" />
                    <span className="text-[#1D2939] font-normal text-sm">30 Reply</span>
                </button>
            </div>
            <div className="flex flex-col gap-4 ml-10">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-2">
                        <Image
                            src="/images/photo.png"
                            width={36}
                            height={36}
                            alt="profile-icon" />
                        <div className="flex flex-col">
                            <h1 className="font-semibold text-sm text-[#182230]">Marvin McKinney</h1>
                            <span className="font-normal text-sm text-[#667085]">devon#8852</span>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2">
                        <span className="text-xs font-normal text-[#475467]">3:24 PM</span>
                        <Image
                            src="/icons/three-dots.svg"
                            width={24}
                            height={24}
                            alt="three-icon" />
                    </div>
                </div>
                <div className="border border-solid border-[#EAECF0] rounded-[16px] bg-[#FFFFFF] px-4 py-3 h-auto ml-10">
                    <p className="font-normal text-sm text-[#182230]">The BITSET Full Course is designed to provide students with an in-depth understanding of bit manipulation techniques and the use of bitsets in data structures. This course will cover fundamental concepts, practical applications, and advanced techniques used in competitive programming and software development. Students will learn how to efficiently solve problems using bitwise operations and gain hands-on experience through coding exercises and projects.</p>
                </div>
                <button className="ml-10 flex flex-row gap-2 items-center">
                    <Image
                        src="/icons/comment-icon.svg"
                        width={20}
                        height={20}
                        alt="three-icon" />
                    <span className="text-[#1D2939] font-normal text-sm">30 Reply</span>
                </button>
            </div>

        </div>
    )
}
export default discussion;