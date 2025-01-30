import Image from "next/image";
import { PopoverContent, PopoverTrigger, Popover } from '@nextui-org/popover';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { useState } from "react";
function Products() {
    const [popoveropen1, setPopoveropen1] = useState<number | null>(null);
    const [pausedialog, setPausedialog] = useState(false);
    const handlePopoverOpen1 = (index: number) => {
        setPopoveropen1(index);
    };
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
            <div className="overflow-x-auto mx-6 border border-gray-200 rounded-lg">
                <table className="min-w-full border-none bg-white border">
                    <thead>
                        <tr>
                            <th className="w-1/2 px-6 py-3 text-left text-sm font-medium text-gray-600">Courses</th>
                            <th className="w-[20%] px-6 py-3 text-center text-sm font-medium text-gray-600">Price</th>
                            <th className="w-[20%] px-6 py-3 text-center text-sm font-medium text-gray-600">Purchased On</th>
                            <th className="w-[10%] px-6 py-3 text-center text-sm font-medium text-gray-600">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <tr key={course.id} className="border-t hover:bg-gray-50">
                                <td className="w-1/2 px-6 py-4 flex items-left gap-3  text-[#9012FF] text-left underline text-sm font-medium">
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
                                <td className="w-[20%] px-6 py-4 text-center text-gray-700">{course.price}</td>
                                <td className="w-[20%] px-6 py-4 text-center text-gray-700">{course.date}</td>
                                <td className="w-[10%] px-6 py-4 text-right text-gray-500">
                                    <Popover placement="bottom-end"
                                        isOpen={popoveropen1 === course.id}
                                        onOpenChange={(open) => open ? handlePopoverOpen1(course.id) : setPopoveropen1(null)}>
                                        <PopoverTrigger className="outline-none">
                                            <button className="mr-[25%] text-xl font-bold">⋮</button>
                                        </PopoverTrigger>
                                        <PopoverContent className=" w-[167px] px-0 border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-md  shadow-lg">
                                            <button
                                                className="flex flex-row h-[40px] w-full p-3  gap-2 hover:bg-[#F2F4F7] items-center"
                                                onClick={() => { setPopoveropen1(null); setPausedialog(true) }}>
                                                <Image
                                                    src="/icons/pausequiz.svg"
                                                    width={18}
                                                    height={18}
                                                    alt="Delete"
                                                />
                                                <span className="text-[#0C111D] text-sm font-medium">Pause</span>
                                            </button>
                                            <button
                                                onClick={() => { setPopoveropen1(null); setPausedialog(true) }}
                                                className="flex flex-row h-[40px] w-full p-3  gap-2 hover:bg-[#F2F4F7] items-center">
                                                <Image
                                                    src="/icons/resume-2.svg"
                                                    width={18}
                                                    height={18}
                                                    alt="Delete"
                                                />
                                                <span className="text-[#0C111D] text-sm font-medium">Resume</span>
                                            </button>
                                            <button
                                                onClick={() => { setPopoveropen1(null); setPausedialog(true) }}
                                                className="flex flex-row h-[40px] w-full p-3  gap-2 hover:bg-[#F2F4F7] items-center">
                                                <Image
                                                    src="/icons/delete.svg"
                                                    width={18}
                                                    height={18}
                                                    alt="Delete"
                                                />
                                                <span className="text-[#DE3024] text-sm font-medium">Remove Access</span>
                                            </button>
                                        </PopoverContent>
                                    </Popover>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* MODAL FOR PAUSE */}
            <Modal isOpen={pausedialog} onOpenChange={(isOpen) => !isOpen && setPausedialog(false)} hideCloseButton >
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-row justify-between items-center gap-1">
                            <h3 className=" font-bold task-[#1D2939]">
                                Pause

                            </h3>
                            <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7] ">
                                <button className="" onClick={() => setPausedialog(false)}>
                                    <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                                </button>
                            </button>
                        </ModalHeader>
                        <ModalBody >
                            <p className=" text-sm  pb-2 font-normal text-[#667085]">Lorem ipsum is placeholder text commonly used</p>
                        </ModalBody>
                        <ModalFooter className="border-t border-lightGrey">
                            <Button variant="light" className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey rounded-md font-semibold text-sm hover:bg-[#F2F4F7] " onClick={() => setPausedialog(false)}>Cancel</Button>
                            <Button onClick={() => setPausedialog(false)} className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#BB241A] font-semibold text-sm  hover:bg-[#B0201A] border border-[#DE3024] rounded-md">Pause
                            </Button>
                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal >

        </div>

    )
}
export default Products;










