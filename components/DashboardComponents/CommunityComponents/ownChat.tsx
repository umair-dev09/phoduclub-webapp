import React from "react";

function OwnChat() {
    return (
        <div className=" flex flex-col w-full px-6 pt-6 text-sm text-white">

            {/* TEXT MESSAGE */}
            <div className="flex flex-col items-end gap-2 group">
                <p className="text-xs text-[#475467]">3:24 PM</p>
                <div className="flex flex-row items-center gap-3">
                    <div className="hidden w-fit h-fit gap-1 px-2 py-1 bg-neutral-100 border border-[#6770A9] rounded-full transition-all hover:bg-neutral-300 group-hover:flex">
                        <p className="text-black">ABCD</p>
                    </div>
                    <p className="max-w-prose px-4 py-3 bg-customPurple rounded-xl">
                        Hello Guys, Looking forward to learning with all of you
                    </p>
                </div>
                <div className="px-2 py-1 bg-neutral-100 border border-neutral-300 rounded-full">
                    <p>1</p>
                </div>
            </div>



        </div>
    );
}

export default OwnChat;

// ---------------------------------------------------------------------------------------------------