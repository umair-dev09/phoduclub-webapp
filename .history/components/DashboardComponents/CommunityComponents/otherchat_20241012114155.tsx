"use client";
import Image from "next/image";
function ChartArea() {



    return (

        <div className="mx-6 bg-red-500 h-full w-full mt-6 ">
            <div className="w-full h-auto flex bg-rose-200 flex-col">
                <div className="gap-2 flex flex-row items-center">
                    <Image
                        src="/icons/profile-pic.png"
                        width={36}
                        height={36}
                        alt="Others-chat-profile-Image" />
                    <span className="text-[#182230] font-semibold text-sm">Brooklyn Simmons</span>
                    <span className="font-normal text-xs text-[#475467]">3:24 PM</span>
                </div>
            </div>




        </div>






    );
}

export default ChartArea;
