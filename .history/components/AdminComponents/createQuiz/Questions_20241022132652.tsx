import Image from "next/image";
function Questions() {
    return (
        <div className='mt-2 h-auto rounded-md border border-solid border-[#EAECF0] bg-[#FFFFFF] flex flex-col p-5 gap-2'>
            <div className="h-auto  flex flex-row justify-between ">
                <div className="flex gap-2">
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
            <div className="flex flex-col gap-2">
                <span className="font-semibold text-base text-[#1D2939]">Questions</span>
                <textarea
                    className="font-normal pl-3 text-[#667085] text-sm placeholder:text-[#A1A1A1] rounded-md 
        focus:outline-none focus:ring-0 
        border border-solid border-[#D0D5DD] h-[40px] 
        shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] 
        transition duration-200 ease-in-out 
        focus:border-[#D6BBFB] 
        focus:shadow-[0px_0px_0px_4px_rgba(158,119,237,0.25),0px_1px_2px_0px_rgba(16,24,40,0.05)]
        focus:text-[#1D2939]
        focus:font-medium 
        resize-vertical
        overflow-hidden"
                    placeholder="Enter questions"
                    rows="1"
                    maxLength="500"
                />


            </div>

        </div>

    )
}
export default Questions;