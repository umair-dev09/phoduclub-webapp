"use client";
function discussion() {
    return (
        <div className="flex flex-col overflow-y-auto h-[1144px] ">
            <span className="ml-[24px] mt-[20px] w-[149px] h-[24px] text-1g text-[#1D2939] font-medium">Share your doubts</span>
            <div className="mr-[24px] h-[140px] mt-[20px] ml-[24px] bg-[#F7F8FB] border border-solid border-[#EAECF0] rounded-[12px]">
                <div className="h-[72px] bg-[#F7F8FB] border-b border-solid border-b-[#EAECF0] rounded-tl-[12px] rounded-tr-[12px] ">



                    <textarea
                        placeholder="Type your response here..."
                        className="w-full h-full bg-transparent border-0 text-1g text-[#1D2939] opacity-[50%] focus:outline-none resize-none"
                    />

                </div>

                <div className="h-[66px] bg-[#F7F8FB] rounded-bl-[12px] rounded-br-[12px]"></div>

            </div>

        </div>
    )
}
export default discussion; 