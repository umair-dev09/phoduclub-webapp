import Image from "next/image"
function notfoundpage() {
    return (
        <div className="h-full w-full flex items-center justify-center ">
            <div className="flex flex-col items-center gap-3">
                <Image
                    src="/icons/not-found-image.svg"
                    width={140}
                    height={140}
                    alt="not-found"
                />
                <h1 className="text-[#101828] font-bold text-2xl">Something went wrong</h1>
                <span className="font-medium text-base text-[#667085]">Sorry, we couldn’t find the page you were looking for</span>

                <span className="font-semibold text-base text-[#9012FF]">Go back home</span>
            </div>

        </div>
    )
}
export default notfoundpage;