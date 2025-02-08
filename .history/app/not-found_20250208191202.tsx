import Image from "next/image"
function notfoundpage() {
    return (
        <div className="h-full w-full flex items-center justify-center ">
            <div className="flex flex-row items-center gap-3">
                <Image
                    src="/icons/not-found.svg"
                    width={140}
                    height={140}
                    alt="not-found"
                />
            </div>

        </div>
    )
}
export default notfoundpage();