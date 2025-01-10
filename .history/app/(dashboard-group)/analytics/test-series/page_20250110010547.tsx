// import React from "react";
// import TableComps from '@/components/DashboardComponents/AnalyticsComponents/Test-Series-Components/TestSeriesComp';

// function TestSeries() {
//     return (
//         <div className="flex flex-1 flex-col pt-6 mx-8">
//             {/* Table Section */}
//             {/* <table className="flex flex-col w-full h-min border border-lightGrey rounded-xl bg-white text-sm font-medium">
//                 <tr className="flex flex-1 py-3 text-neutral-500">
//                     <td className="w-[30%] px-8">Test</td>
//                     <td className="w-[15%] text-center"><p>Scores</p></td>
//                     <td className="w-[15%] text-center"><p>Attempted Question</p></td>
//                     <td className="w-[15%] text-center"><p>Accuracy</p></td>
//                     <td className="w-[15%] text-center"><p>Time Taken</p></td>
//                     <td className="w-[15%] text-center"><p>Total Time</p></td>
//                 </tr>
//                 <TableComps />
//                 <TableComps />
//                 <TableComps />
//                 <TableComps />
//             </table> */}
//             jabir
//         </div>
//     );
// }

// export default TestSeries;
import React from "react";
import TableComps from '@/components/DashboardComponents/AnalyticsComponents/Test-Series-Components/TestSeriesComp';

function TestSeries() {
    return (
        <div className="flex flex-1 flex-col pt-6 mx-8">
            {/* Table Section */}
            <table className="w-full h-min border border-lightGrey rounded-xl bg-white text-sm font-medium">
                <thead>
                    <tr className="py-3 text-neutral-500">
                        <th className="w-[30%] px-8 text-left">Test</th>
                        <th className="w-[15%] text-center">Scores</th>
                        <th className="w-[15%] text-center">Attempted Question</th>
                        <th className="w-[15%] text-center">Accuracy</th>
                        <th className="w-[15%] text-center">Time Taken</th>
                        <th className="w-[15%] text-center">Total Time</th>
                    </tr>
                </thead>
                <tbody>
                    <TableComps />
                    <TableComps />
                    <TableComps />
                    <TableComps />
                </tbody>
            </table>
        </div>
    );
}

export default TestSeries;
