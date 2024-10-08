import React from "react";
import Image from "next/image";

function MockTest() {
    return (
        <div className="w-full h-auto">
            <div className="mb-3 px-[6px]"><h3 className="text-base text-[#182230]">Mock test</h3></div>
            <div className="flex flex-col gap-3">
                <div className="flex flex-row items-center justify-between pr-3 group rounded-[7px] transition-colors hover:bg-[#F8F0FF]">
                    <div className="flex flex-row items-center gap-2 p-[6px]">
                        <Image src='/icons/PhyiscsQuicktest.png' alt="bookstack icon" width={16} height={24} />
                        <p className="text-[13px] font-semibold text-[#4B5563]">Physics 101</p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-white transition-colors group-hover:bg-[#DE3024]"></div>
                </div>
                <div className="flex flex-row items-center justify-between pr-3 group rounded-[7px] transition-colors hover:bg-[#F8F0FF]">
                    <div className="flex flex-row items-center gap-2 p-[6px]">
                        <Image src='/icons/ChemistryQuicktest.png' alt="bookstack icon" width={16} height={24} />
                        <p className="text-[13px] font-semibold text-[#4B5563]">Chemistry</p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-white transition-colors group-hover:bg-[#DE3024]"></div>
                </div>
                <div className="flex flex-row items-center justify-between pr-3 group rounded-[7px] transition-colors hover:bg-[#F8F0FF]">
                    <div className="flex flex-row items-center gap-2 p-[6px]">
                        <Image src='/icons/MathsQuicktest.png' alt="bookstack icon" width={16} height={24} />
                        <p className="text-[13px] font-semibold text-[#4B5563]">Maths</p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-white transition-colors group-hover:bg-[#DE3024]"></div>
                </div>
            </div>
        </div>
    );
}

{/* <div className="flex flex-row items-center justify-between pr-3 group rounded-[7px] transition-colors hover:bg-[#F8F0FF]">
    <div className="flex flex-row items-center gap-2 p-[6px]">
        <Image src='/icons/studymaterial.png' alt="bookstack icon" width={16} height={24} />
        <p className="text-[13px] font-semibold text-[#4B5563]">Study materials</p>
    </div>
    <div className="w-2 h-2 rounded-full bg-white transition-colors group-hover:bg-[#DE3024]"></div>
</div> */}

export default MockTest;