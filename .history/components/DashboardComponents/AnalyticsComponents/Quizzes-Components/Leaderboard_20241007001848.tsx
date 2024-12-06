import React from "react";
import Image from "next/image";

function Leaderboard() {
    return (
        <div>
            <tr className="flex flex-1 py-3 text-[#1D2939] border-t border-lightGrey">
                <td className="flex items-center justify-center w-[8%]">
                    <Image src='/icons/actualCrown.svg' alt="Crown" width={25.07} height={21} />
                </td>
                <td className="flex flex-row w-[20%] gap-2">
                    <div className="flex items-center">
                        <div className="relative">
                            <Image src='/images/DP_Lion.svg' alt="DP" width={40} height={40} />
                            <Image className="absolute right-0 bottom-0" src='/icons/winnerBatch.svg' alt="Batch" width={18} height={18} />
                        </div>
                    </div>
                    <div className="flex items-start justify-start flex-col">
                        <div className="font-semibold">Jenny Wilson</div>
                        <div className="flex justify-start items-start text-[13px] text-[#667085]">jenny#8547</div>
                    </div>
                </td>
                <td className="flex items-center justify-center w-[12%]"><p>9632</p></td>
                <td className="flex items-center justify-center w-[12%]"><p>10000/10000</p></td>
                <td className="flex items-center justify-center w-[12%]"><p>9500</p></td>
                <td className="flex items-center justify-center w-[12%]"><p>500</p></td>
                <td className="flex items-center justify-center w-[12%]"><p>99%</p></td>
                <td className="flex items-center justify-center w-[12%]"><p className="w-20 text-end">350h</p></td>
            </tr>
            <tr className="flex flex-1 py-3 text-[#1D2939] border-t border-lightGrey">
                <td className="flex items-center justify-center w-[8%]">
                    <Image src='/icons/rank-2.svg' alt="2nd rank" width={25.07} height={21} />
                </td>
                <td className="flex flex-row w-[20%] gap-2">
                    <div className="flex items-center">
                        <div className="relative">
                            <Image src='/images/DP_Lion.svg' alt="DP" width={40} height={40} />
                            <Image className="absolute right-0 bottom-0" src='/icons/winnerBatch.svg' alt="Batch" width={18} height={18} />
                        </div>
                    </div>
                    <div className="flex items-start justify-start flex-col">
                        <div className="font-semibold">Jenny Wilson</div>
                        <div className="flex justify-start items-start text-[13px] text-[#667085]">jenny#8547</div>
                    </div>
                </td>
                <td className="flex items-center justify-center w-[12%]"><p>9632</p></td>
                <td className="flex items-center justify-center w-[12%]"><p>10000/10000</p></td>
                <td className="flex items-center justify-center w-[12%]"><p>9500</p></td>
                <td className="flex items-center justify-center w-[12%]"><p>500</p></td>
                <td className="flex items-center justify-center w-[12%]"><p>99%</p></td>
                <td className="flex items-center justify-center w-[12%]"><p className="w-20 text-end">350h</p></td>
            </tr>
            <tr className="flex flex-1 py-3 text-[#1D2939] border-t border-lightGrey">
                <td className="flex items-center justify-center w-[8%]">
                    <Image src='/icons/rank-3.svg' alt="3rd rank" width={25.07} height={21} />
                </td>
                <td className="flex flex-row w-[20%] gap-2">
                    <div className="flex items-center">
                        <div className="relative">
                            <Image src='/images/DP_Lion.svg' alt="DP" width={40} height={40} />
                            <Image className="absolute right-0 bottom-0" src='/icons/winnerBatch.svg' alt="Batch" width={18} height={18} />
                        </div>
                    </div>
                    <div className="flex items-start justify-start flex-col">
                        <div className="font-semibold">Jenny Wilson</div>
                        <div className="flex justify-start items-start text-[13px] text-[#667085]">jenny#8547</div>
                    </div>
                </td>
                <td className="flex items-center justify-center w-[12%]"><p>9632</p></td>
                <td className="flex items-center justify-center w-[12%]"><p>10000/10000</p></td>
                <td className="flex items-center justify-center w-[12%]"><p>9500</p></td>
                <td className="flex items-center justify-center w-[12%]"><p>500</p></td>
                <td className="flex items-center justify-center w-[12%]"><p>99%</p></td>
                <td className="flex items-center justify-center w-[12%]"><p className="w-20 text-end">350h</p></td>
            </tr>
            <tr className="flex flex-1 py-3 text-[#1D2939] border-t border-lightGrey">
                <td className="flex items-center justify-center w-[8%]">
                    <Image src='/icons/rank-4.svg' alt="4th rank" width={25.07} height={21} />
                </td>
                <td className="flex flex-row w-[20%] gap-2">
                    <div className="flex items-center">
                        <div className="relative">
                            <Image src='/images/DP_Lion.svg' alt="DP" width={40} height={40} />
                            <Image className="absolute right-0 bottom-0" src='/icons/winnerBatch.svg' alt="Batch" width={18} height={18} />
                        </div>
                    </div>
                    <div className="flex items-start justify-start flex-col">
                        <div className="font-semibold">Jenny Wilson</div>
                        <div className="flex justify-start items-start text-[13px] text-[#667085]">jenny#8547</div>
                    </div>
                </td>
                <td className="flex items-center justify-center w-[12%]"><p>9632</p></td>
                <td className="flex items-center justify-center w-[12%]"><p>10000/10000</p></td>
                <td className="flex items-center justify-center w-[12%]"><p>9500</p></td>
                <td className="flex items-center justify-center w-[12%]"><p>500</p></td>
                <td className="flex items-center justify-center w-[12%]"><p>99%</p></td>
                <td className="flex items-center justify-center w-[12%]"><p className="w-20 text-end">350h</p></td>
            </tr>
        </div>
    );
}

export default Leaderboard;