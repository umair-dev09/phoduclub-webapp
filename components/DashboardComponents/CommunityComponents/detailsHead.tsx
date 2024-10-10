import React from "react";
import Image from "next/image";

function DetailsHead() {
    return (
        <div className="mt-6 px-6 transition-all">
            <div className="group h-auto">
                <div className="flex flex-row justify-between mb-3">
                    <div className="flex flex-row gap-2">
                        <Image className="hidden group-hover:flex" src='/icons/premium-02.svg' alt="premiun" width={20} height={20} />
                        <h3 className="text-[#182230]">Admin</h3>
                    </div>
                    <div className="flex justify-center items-center w-6 h-6 bg-[#F7F8FB] border border-[#D4D9E9] rounded-sm text-xs text-[#4B5563]">1</div>
                </div>
            </div>
        </div>
    );
}

export default DetailsHead;