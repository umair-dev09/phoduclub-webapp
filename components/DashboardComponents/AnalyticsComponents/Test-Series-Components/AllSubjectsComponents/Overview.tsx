function overview() {
    return (
        <div className="mb-8">
            <div className="h-[44px] flex flex-col justify-end mt-8 mb-4 gap-1">
                <span className="text-[#1D2939] text-lg font-semibold">Overview</span>
                <span className="font-normal text-[#475467] text-sm">Summary of marks scored in the test</span>
            </div>
            {/* Overall Data */}
            <div className="mb-4">
                <div className="bg-white p-4 flex flex-col rounded-2xl border border-lightGrey">
                    <div className="flex flex-row justify-between">
                        {/* Total Questions */}
                        <div className="flex flex-1 flex-row justify-between pr-4">
                            <div className="flex flex-col gap-2">
                                <div className="font-normal text-xs text-[#667085]">Total Questions</div>
                                <h3 className="text-[15px]">3000</h3>
                            </div>
                            <div className="flex justify-center items-center">
                                <div className="w-px bg-lightGrey h-4/5"></div>
                            </div>
                        </div>
                        {/* Attempted Questions */}
                        <div className="flex flex-1 flex-row justify-between pr-4">
                            <div className="flex flex-col gap-2">
                                <div className="font-normal text-xs text-[#667085]">Attempted Questions</div>
                                <h3 className="text-[15px]">2000</h3>
                            </div>
                            <div className="flex justify-center items-center">
                                <div className="w-px bg-lightGrey h-4/5"></div>
                            </div>
                        </div>
                        {/* Time Taken */}
                        <div className="flex flex-1 flex-col gap-2">
                            <div className="font-normal text-xs text-[#667085]">Time Taken</div>
                            <h3 className="text-[15px]">80 of 100 hrs</h3>
                        </div>
                    </div>
                    {/* Additional Stats */}
                    <div className="flex flex-row justify-between mt-9">
                        <div className="flex flex-1 flex-row justify-between pr-4">
                            <div className="flex flex-col gap-2">
                                <div className="font-normal text-xs text-[#667085]">Answered Correct</div>
                                <h3 className="text-[15px]">800</h3>
                            </div>
                            <div className="flex justify-center items-center">
                                <div className="w-px bg-lightGrey h-4/5"></div>
                            </div>
                        </div>
                        <div className="flex flex-1 flex-row justify-between pr-4">
                            <div className="flex flex-col gap-2">
                                <div className="font-normal text-xs text-[#667085]">Answered Incorrect</div>
                                <h3 className="text-[15px]">200</h3>
                            </div>
                            <div className="flex justify-center items-center">
                                <div className="w-px bg-lightGrey h-4/5"></div>
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col gap-2">
                            <div className="font-normal text-xs text-[#667085]">Total Score</div>
                            <h3 className="text-[15px]">568</h3>
                        </div>
                    </div>
                </div>
            </div>
            {/* Overall Data Table */}
            <div className="h-auto rounded-xl bg-[#FFFFFF] border border-solid border-[#EAECF0]">
                <table className="w-full rounded-xl bg-white text-sm font-medium">
                    <thead>
                        <tr className="text-[#667085]">
                            <th className="w-[10%] px-8 py-3 text-left">Subject</th>
                            <th className="w-[10%] text-center">Score</th>
                            <th className="w-[10%] text-center">Correct</th>
                            <th className="w-[10%] text-center">Incorrect</th>
                            <th className="w-[10%] text-center">Unattempted</th>
                            <th className="w-[10%] text-center">Not visted</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t border-[#EAECF0]">
                            <td className="px-8 py-3 text-left text-[#1D2939] font-semibold text-sm">Overall</td>
                            <td className="px-8 py-3 text-center text-[#1D2939] font-normal text-sm">200/300</td>
                            <td className="px-8 py-3 text-center text-[#1D2939] font-normal text-sm">5/75</td>
                            <td className="px-8 py-3 text-center text-[#1D2939] font-normal text-sm">10/25</td>
                            <td className="px-8 py-3 text-center text-[#1D2939] font-normal text-sm">20/25</td>
                            <td className="px-8 py-3 text-center text-[#1D2939] font-normal text-sm">0/75</td>
                        </tr>
                        <tr className="border-t border-[#EAECF0]">
                            <td className="px-8 py-3 text-left text-[#1D2939] font-semibold text-sm">Physics</td>
                            <td className="px-8 py-3 text-center text-[#1D2939] font-normal text-sm">100/300</td>
                            <td className="px-8 py-3 text-center text-[#1D2939] font-normal text-sm">5/75</td>
                            <td className="px-8 py-3 text-center text-[#1D2939] font-normal text-sm">1/25</td>
                            <td className="px-8 py-3 text-center text-[#1D2939] font-normal text-sm">20/25</td>
                            <td className="px-8 py-3 text-center text-[#1D2939] font-normal text-sm">0/75</td>
                        </tr>
                        <tr className="border-t border-[#EAECF0]">
                            <td className="px-8 py-3 text-left text-[#1D2939] font-semibold text-sm">Chemistry</td>
                            <td className="px-8 py-3 text-center text-[#1D2939] font-normal text-sm">250/300</td>
                            <td className="px-8 py-3 text-center text-[#1D2939] font-normal text-sm">50/75</td>
                            <td className="px-8 py-3 text-center text-[#1D2939] font-normal text-sm">10/25</td>
                            <td className="px-8 py-3 text-center text-[#1D2939] font-normal text-sm">40/25</td>
                            <td className="px-8 py-3 text-center text-[#1D2939] font-normal text-sm">0/75</td>
                        </tr>
                        <tr className="border-t border-[#EAECF0]">
                            <td className="px-8 py-3 text-left text-[#1D2939] font-semibold text-sm">Mathmatics</td>
                            <td className="px-8 py-3 text-center text-[#1D2939] font-normal text-sm">20/300</td>
                            <td className="px-8 py-3 text-center text-[#1D2939] font-normal text-sm">5/75</td>
                            <td className="px-8 py-3 text-center text-[#1D2939] font-normal text-sm">1/25</td>
                            <td className="px-8 py-3 text-center text-[#1D2939] font-normal text-sm">16/25</td>
                            <td className="px-8 py-3 text-center text-[#1D2939] font-normal text-sm">0/75</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default overview;