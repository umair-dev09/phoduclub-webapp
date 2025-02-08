import Image from "next/image"
function notfoundpage() {
    return (
        <div className="h-auto w-full flex items-center justify-center ">
            <div className="flex flex-col items-center justify-center gap-3">
                <Image
                    src="/icons/not-found-image.svg"
                    width={140}
                    height={140}
                    alt="not-found"
                />
                <h1 className="text-[#101828] font-bold text-2xl">Something went wrong</h1>
                <span className="font-medium text-base text-[#667085]">Sorry, we couldn’t find the page you were looking for</span>

                <button className="font-semibold text-base text-[#9012FF] hover:bg-[#F5F0FF]  px-2  py-1 rounded-xl ">Go back home</button>
            </div>

        </div>
    )
}
export default notfoundpage;