function CompleteAnalysis() {
    return (
        <div className="h-auto mx-8 rounded-xl  bg-[#FFFFFF] border border-solid border-[#EAECF0]">
            <table className="w-full rounded-xl bg-white text-sm font-medium">
                <thead>
                    <tr className="text-[#667085]">
                        <th className="w-[7%] px-8 py-3 text-left">Q. no.</th>
                        <th className="w-[10%] text-center">Chapter</th>
                        <th className="w-[10%] text-center">Difficulty</th>
                        <th className="w-[10%] text-center">Allotted</th>
                        <th className="w-[10%] text-center">Spent</th>
                        <th className="w-[10%] text-center">Attempted</th>
                        <th className="w-[10%] text-center">Answer</th>
                        <th className="w-[10%] text-center">Remarks</th>
                    </tr>
                </thead>
                <tbody className="border-b border-[#EAECF0]">
                    <tr className="border-t border-[#EAECF0]">
                        <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">1</td>
                        <td className="px-8 py-3 text-left text-[#1D2939] font-semibold text-sm">Current Electricity</td>
                        <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">Easy</td>
                        <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">217s</td>
                        <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">50s</td>
                        <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">Yes</td>
                        <td className="px-8 py-3 text-left text-[#0B9055] font-medium text-sm">Correct</td>
                        <td className="px-8 py-3 text-left text-[#0B9055] font-medium text-sm">Perfect</td>
                    </tr>
                    <tr className="border-t border-[#EAECF0]">
                        <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">1</td>
                        <td className="px-8 py-3 text-left text-[#1D2939] font-semibold text-sm">Current Electricity</td>
                        <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">Easy</td>
                        <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">217s</td>
                        <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">50s</td>
                        <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">Yes</td>
                        <td className="px-8 py-3 text-left text-[#DE3024] font-medium text-sm">Incorrect</td>
                        <td className="px-8 py-3 text-left text-[#667085] font-medium text-sm">Confused</td>
                    </tr>
                    <tr className="border-t border-[#EAECF0]">
                        <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">1</td>
                        <td className="px-8 py-3 text-left text-[#1D2939] font-semibold text-sm">Current Electricity</td>
                        <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">Easy</td>
                        <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">217s</td>
                        <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">50s</td>
                        <td className="px-8 py-3 text-left text-[#1D2939] font-normal text-sm">Yes</td>
                        <td className="px-8 py-3 text-left text-[#DE3024] font-medium text-sm">Incorrect</td>
                        <td className="px-8 py-3 text-left text-[#C74FE6] font-medium text-sm">Overtime</td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}
export default CompleteAnalysis;