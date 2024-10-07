import React from "react";

function GroupIcons() {
    return (
        <div className="flex flex-col justify-start items-center pt-[15px]">
            <div className="flex items-center justify-center w-[46x] h-[46px] mb-[10px] rounded-full border-2 border-darkPurple">
                <div className="flex items-center justify-center w-[42px] h-[42px] rounded-full bg-[#FFECC0] border-2 border-white text-[624C18] font-bold"><h3>J</h3></div>
            </div>
            <div className="flex items-center justify-center w-[46x] h-[46px] mb-[10px] rounded-full">
                <div className="flex items-center justify-center w-[42px] h-[42px] rounded-full bg-[#C0D5FF] border-2 border-[#C0D5FF] text-[624C18] font-bold"><h3>C</h3></div>
            </div>
            <div className="flex items-center justify-center w-[46x] h-[46px] mb-[10px] rounded-full">
                <div className="flex items-center justify-center w-[42px] h-[42px] rounded-full bg-[#C0EAFF] border-2 border-[#C0EAFF] text-[624C18] font-bold"><h3>S</h3></div>
            </div>
            <div className="flex items-center justify-center w-[46x] h-[46px] mb-[10px] rounded-full">
                <div className="flex items-center justify-center w-[42px] h-[42px] rounded-full bg-[#FFC0C5] border-2 border-[#FFC0C5] text-[624C18] font-bold"><h3>V</h3></div>
            </div>
        </div>
    );
}

export default GroupIcons;