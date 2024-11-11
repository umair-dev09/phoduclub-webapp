import Image from "next/image";
import { PopoverContent, PopoverTrigger, Popover } from '@nextui-org/popover';
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
            <div className="overflow-x-auto px-6 rounded-lg">
                <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-sm">
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
                                <td className="px-6 py-4 flex items-center gap-3  text-[#9012FF] text-left underline text-sm font-medium">
                                    <Image
                                        src="/icons/course.png"
                                        width={42}
                                        height={42}
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
                                    <Popover placement="bottom">
                                        <PopoverTrigger className="outline-none">

                                            <button className="text-xl font-bold">⋮</button>
                                        </PopoverTrigger>
                                        <PopoverContent>


                                            <button
                                                className="flex flex-row h-[40px] w-full px-3 gap-2 hover:bg-[#F2F4F7] items-center">
                                                <Image
                                                    src="/icons/delete.svg"
                                                    width={18}
                                                    height={18}
                                                    alt="Delete"
                                                />
                                                <span className="text-[#DE3024] text-sm font-medium">Delete</span>
                                            </button>

                                        </PopoverContent>
                                    </Popover>
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










