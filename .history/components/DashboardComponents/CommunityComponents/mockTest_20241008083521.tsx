import React from "react";
import Image from "next/image";

function MockTest() {
    return (
        <div className="w-full h-auto">
            <div className="mb-3 px-[6px]"><h3 className="text-base text-[#182230]">Mock test</h3></div>
            <div className="flex flex-col gap-3">
                <div className="flex flex-row items-center gap-2 p-[6px] rounded-[7px] transition-colors hover:bg-[#F8F0FF]">
                    <Image src='/icons/PhysicsQuicktest.png' alt="bookstack icon" width={16} height={24} />
                    <p className="text-[13px] font-semibold text-[#4B5563]">Physics 101</p>
                </div>
                <div className="flex flex-row items-center gap-2 p-[6px] rounded-[7px] transition-colors hover:bg-[#F8F0FF]">
                    <Image src='/icons/ChemistryQuicktest.png' alt="bookstack icon" width={16} height={24} />
                    <p className="text-[13px] font-semibold text-[#4B5563]">Chemistry</p>
                </div>
                <div className="flex flex-row items-center gap-2 p-[6px] rounded-[7px] transition-colors hover:bg-[#F8F0FF]">
                    <Image src='/icons/MathsQuicktest.png' alt="bookstack icon" width={16} height={24} />
                    <p className="text-[13px] font-semibold text-[#4B5563]">Maths</p>
                </div>
            </div>
        </div>
    );
}

export default MockTest;