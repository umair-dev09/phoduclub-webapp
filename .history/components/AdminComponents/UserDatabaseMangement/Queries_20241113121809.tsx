import Image from "next/image";
import QueriesStatus from '@/components/AdminComponents/UserDatabaseMangement/QueriesStatus';

function Queries() {
    const courses = [
        { name: "BITSET Full Course", date: "Jan 6, 2024", queriesstatus: "Open" },
        { name: "BITSET Full Course", date: "Jan 6, 2024", queriesstatus: "Resolved" },
        { name: "BITSET Full Course", date: "Jan 6, 2024", queriesstatus: "Resolved" },
        { name: "BITSET Full Course", date: "Jan 6, 2024", queriesstatus: "Resolved" },
        { name: "BITSET Full Course", date: "Jan 6, 2024", queriesstatus: "Resolved" },
    ];

    return (
        <div className="flex flex-col gap-6 ">
            <div className="overflow-x-auto mx-8 mt-6 border border-gray-200 rounded-xl">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="w-1/2 px-6 py-3 text-left text-sm font-medium text-[#667085]">
                                Queries & Reporting
                            </th>
                            <th className="w-1/4 px-6 py-3 text-center text-sm font-medium text-[#667085]">
                                <div className="flex items-center justify-center gap-1">
                                    <p>Date</p>
                                    <Image
                                        src="/icons/unfold-more-round.svg"
                                        alt="unfold more"
                                        width={16}
                                        height={16}
                                    />
                                </div>
                            </th>
                            <th className="w-1/4 px-6 py-3 text-center text-sm font-medium text-[#667085]">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course, index) => (
                            <tr key={index} className="border-t hover:bg-gray-50">
                                <td className="w-full px-6 py-4 flex flex-col items-left gap-2 text-left text-sm font-normal">
                                    <p className="w-full">I am scammed in the group</p>
                                    <div className="flex flex-row w-full gap-1">
                                        <div className="hidden w-fit px-3 py-2 text-xs text-[#182230] font-medium bg-[#F2F4F7] rounded-[0.375rem]">
                                            General
                                        </div>
                                        <div className="w-fit px-3 py-2 text-xs text-[#182230] font-medium bg-[#F2F4F7] rounded-[0.375rem]">
                                            Product
                                        </div>
                                        <div className="w-fit px-3 py-2 text-xs text-[#182230] font-medium bg-[#F2F4F7] rounded-[0.375rem]">
                                            Transaction ID: 254784523698
                                        </div>
                                    </div>
                                </td>
                                <td className="w-1/4 px-6 py-4 text-sm text-center text-gray-700">
                                    {course.date}
                                </td>
                                <td className="w-1/4 px-6 py-4 text-center text-gray-700">
                                    <span className="flex items-center ml-[38%]">
                                        <QueriesStatus queriesstatus={course.queriesstatus} />
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Queries;