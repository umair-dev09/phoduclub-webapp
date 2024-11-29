import Image from "next/image";
function discussion() {
    return (
        <div className="flex-1 w-full h-auto flex flex-col gap-4">

            <div className="flex flex-col gap-4">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-1">
                        <Image
                            src="/images/photo.png"
                            width={36}
                            height={36}
                            alt="profile-icon" />
                        <div className="flex flex-col gap-1">
                            <h1 className="font-semibold text-sm text-[#182230]"></h1>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
export default discussion;