'use client'

import React from "react";
import TableComps from '@/components/DashboardComponents/AnalyticsComponents/Test-Series-Components/TestSeriesComp';

function TestSeries() {
    return (
        <div className="flex flex-1 flex-col pt-6 mx-8">
            {/* Table Section */}
            <table className="flex flex-col w-full h-min border border-lightGrey rounded-xl bg-white text-sm font-medium">
                <tr className="flex flex-1 py-3 text-neutral-500">
                    <td className="w-[30%] px-8">Test</td>
                    <td className="w-[15%] text-center"><p>Scores</p></td>
                    <td className="w-[15%] text-center"><p>Attempted Question</p></td>
                    <td className="w-[15%] text-center"><p>Accuracy</p></td>
                    <td className="w-[15%] text-center"><p>Time Taken</p></td>
                    <td className="w-[15%] text-center"><p>Total Time</p></td>
                </tr>
                <TableComps />
                <TableComps />
                <TableComps />
                <TableComps />
            </table>
        </div>
    );
}

export default TestSeries;
