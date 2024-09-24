"use client";
import Image from "next/image";
function discussion() {
    return (
        <div className="flex flex-col overflow-y-auto h-auto  w-auto">
            <span className="ml-[24px] mt-[20px] w-[149px] h-[24px] text-1g text-[#1D2939] font-medium">Share your doubts</span>
            <div className="mr-[24px] h-[140px] mt-[20px] ml-[24px] bg-[#F7F8FB] border border-solid border-[#EAECF0] rounded-[12px]">
                <div className="h-[72px] bg-[#F7F8FB] border-b border-solid border-b-[#EAECF0] rounded-tl-[12px] rounded-tr-[12px] ">


                    <textarea
                        placeholder="Type your response here..."
                        className="w-full h-full bg-transparent border-0 text-[#1D2939] focus:outline-none resize-none"
                        style={{ padding: "1.5rem", minHeight: "72px" }} // Adjust padding for vertical centering
                    />
                    <style jsx>{`
                        textarea::placeholder {
                            color: #667085; /* Placeholder color */
                            opacity: 0.5; /* Placeholder opacity */
                        }
                    `}</style>
                </div>

                <div className="h-[66px] bg-[#F7F8FB] rounded-bl-[12px] rounded-br-[12px]"></div>

            </div>
            <hr className="mt-[30px] border border-solid border-[#EAECF0]" />
            <div className="gap-[20px]">

                <div className="mr-[24px] ml-[24px]  mt-[24px] h-auto">
                    <div className="h-[48px] justify-between flex flex-row">
                        <span>
                            <Image
                                src="/icons/10.svg"
                                width={46}
                                height={46}
                                alt=" Proflie -Image" />
                        </span>
                        <span className="text-sm font-normal text-[#1D2939] opacity-[50%]">
                            3 min ago
                        </span>

                    </div>
                </div>
            </div>



        </div>
    )
}
export default discussion; 