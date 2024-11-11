import Image from "next/image";
function Products() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-row gap-3 border-b border-solid border-[#EAECF0] p-8">
                <div className="relative">
                    <Image src="/images/DP_Lion.svg" alt="DP" width={72} height={72} />
                    <Image
                        className="absolute right-0 bottom-0"
                        src="/icons/winnerBatch.svg"
                        alt="Batch"
                        width={32}
                        height={32}
                    />
                </div>
                <div className="flex items-start flex-col justify-center">
                    <div className="font-semibold text-[#1D2939] text-2xl">Jenny Wilson</div>
                    <div className="flex justify-start items-start text-[16px] font-medium text-[#667085]">jenny#8547</div>
                </div>
            </div>
            <p className="font-semibold text-[#1D2939] text-lg px-8">Products</p>


        </div>

    )
}
export default Products;