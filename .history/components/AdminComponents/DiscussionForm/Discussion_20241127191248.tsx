import Image from "next/image";
function discussion() {
    return (
        <div className="flex-1 w-full h-auto flex flex-col gap-4">

            <div className="flex flex-col gap-4">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-1">
                        <Image
                            src="/icons/big-profile-1"
                            width={36}
                            height={36}
                            alt="profile-icon" />
                    </div>
                </div>
            </div>


        </div>
    )
}
export default discussion;