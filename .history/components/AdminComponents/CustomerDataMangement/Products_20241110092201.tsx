import Image from "next/image";
function Products() {
    const courses = [
        { id: 1, name: "BITSET Full Course", price: "₹ 2499", date: "Jan 6, 2024" },
        { id: 2, name: "BITSET Full Course", price: "₹ 2499", date: "Jan 6, 2024" },
        { id: 3, name: "BITSET Full Course", price: "₹ 2499", date: "Jan 6, 2024" },
        { id: 4, name: "BITSET Full Course", price: "₹ 2499", date: "Jan 6, 2024" },
    ];
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-row gap-3 border-b border-solid border-[#EAECF0] p-8">
                <div className="relative">
                    <Image src="/images/DP_Lion.svg" alt="DP" width={72} height={72} />
                    <Image
                        className="absolute right-0 bottom-0"
                        src="/icons/winnerBatch.svg"
                        alt="Batch"
                        width={32}
                        height={32}
                    />
                </div>
                <div className="flex items-start flex-col justify-center">
                    <div className="font-semibold text-[#1D2939] text-2xl">Jenny Wilson</div>
                    <div className="flex justify-start items-start text-[16px] font-medium text-[#667085]">jenny#8547</div>
                </div>
            </div>
            <p className="font-semibold text-[#1D2939] text-lg px-8">Products</p>
            <div className="overflow-x-auto px-6">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                    <thead>
                        <tr className="border-b">
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Courses</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Price</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Purchased On</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <tr key={course.id} className="border-b hover:bg-gray-50">
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <img
                                        src="https://via.placeholder.com/40"
                                        alt="Course Icon"
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <a href="#" className="text-purple-600 font-medium hover:underline">
                                        {course.name}
                                    </a>
                                </td>
                                <td className="px-6 py-4 text-gray-700">{course.price}</td>
                                <td className="px-6 py-4 text-gray-700">{course.date}</td>
                                <td className="px-6 py-4 text-gray-500">
                                    <button className="text-xl font-bold">⋮</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>

    )
}
export default Products;