import Image from "next/image";
function discussion() {
    return (
        <div className="flex-1 w-full h-auto flex flex-col gap-4">

            <div className="flex flex-col gap-4">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-2">
                        <Image
                            src="/images/photo.png"
                            width={36}
                            height={36}
                            alt="profile-icon" />
                        <div className="flex flex-col">
                            <h1 className="font-semibold text-sm text-[#182230]">Marvin McKinney</h1>
                            <span className="font-normal text-sm text-[#1D2939]">#1D2939</span>
                        </div>
                    </div>
                    <div className="flex flex-row ">
                        <span className="text-xs font-normal text-[#475467]">3:24 PM</span>
                        <Image
                            src="/icons/three-dots.svg"
                            width={20}
                            height={20}
                            alt="three-icon" />
                    </div>
                </div>
            </div>


        </div>
    )
}
export default discussion;