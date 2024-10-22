import Image from "next/image";
function Questions() {
    return (
        <div className='mt-2 h-auto rounded-md border border-solid border-[#EAECF0] bg-[#FFFFFF] flex flex-col p-5 gap-2'>
            <div className="h-auto  flex flex-row justify-between bg-slate-700">
                <div className="gap-2">
                    <span>1</span>
                    <span>Questions</span>

                </div>
                <Image
                    src="/icons/three-dots.svg"
                    width={20}
                    height={20}
                    alt="Three-dots"
                />

            </div>

        </div>

    )
}
export default Questions;