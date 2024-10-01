import React from "react";

function Leaderboard() {
    return (
        <div>
            <tr className="flex flex-1 py-3 text-[#1D2939] border-t border-lightGrey">
                <td className="flex items-center justify-center w-[11%]"><p>1</p></td>
                <td className="flex flex-row w-[23%] gap-2">
                    <div className="flex items-center">DP</div>
                    <div className="flex items-start justify-start flex-col">
                        <div className="font-semibold">Jenny Wilson</div>
                        <div className="flex justify-start items-start text-[13px] text-[#667085]">jenny#8547</div>
                    </div>
                </td>
                <td className="flex items-center justify-center w-[11%]"><p>9632</p></td>
                <td className="flex items-center justify-center w-[11%]"><p>10000/10000</p></td>
                <td className="flex items-center justify-center w-[11%]"><p>9500</p></td>
                <td className="flex items-center justify-center w-[11%]"><p>500</p></td>
                <td className="flex items-center justify-center w-[11%]"><p>99%</p></td>
                <td className="flex items-center justify-center w-[11%]"><p className="w-20 text-end">350h</p></td>
            </tr>
        </div>
    );
}

export default Leaderboard;