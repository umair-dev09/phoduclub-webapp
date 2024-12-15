"use client";
import Image from "next/image";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";

interface ActionButtonProps {
    src: string;
    alt: string;
    label: string;
}

function ActionButton({ src, alt, label }: ActionButtonProps) {
    return (
        <button className="flex items-center p-3 hover:bg-[#F2F4F7] w-full">
            <Image src={src} width={20} height={20} alt={alt} />
            <p className="text-sm text-[#000000] font-normal ml-2">{label}</p>
        </button>
    );
}

interface PurchaseData {
    item: string;
    date: string;
    price: string;
    paymentType: string;
    duration: string;
}

function Purchase() {
    const data: PurchaseData[] = [
        { item: "JEE Crash Course", date: "1st Jul, 2024", price: "₹2400", paymentType: "Credit Card", duration: "3 Months" },
        { item: "BITSET Crash Course", date: "1st Jul, 2024", price: "₹2400", paymentType: "Credit Card", duration: "3 Months" },
        // { item: "KCET Crash Course", date: "1st Jul, 2024", price: "₹2400", paymentType: "Credit Card", duration: "3 Months" },
        // { item: "MIT Crash Course", date: "1st Jul, 2024", price: "₹2400", paymentType: "Credit Card", duration: "3 Months" },
        // { item: "JEE Crash Course", date: "1st Jul, 2024", price: "₹2400", paymentType: "Credit Card", duration: "3 Months" },
        // { item: "BITSET Crash Course", date: "1st Jul, 2024", price: "₹2400", paymentType: "Credit Card", duration: "3 Months" },
        // { item: "KCET Crash Course", date: "1st Jul, 2024", price: "₹2400", paymentType: "Credit Card", duration: "3 Months" },
        // { item: "MIT Crash Course", date: "1st Jul, 2024", price: "₹2400", paymentType: "Credit Card", duration: "3 Months" },
        // { item: "MIT Crash Course", date: "1st Jul, 2024", price: "₹2400", paymentType: "Credit Card", duration: "3 Months" },
    ];

    return (
        <div
            className="mx-6 border border-solid border-[#EAECF0] rounded-lg h-[calc(100vh-200px)] overflow-y-auto 
            scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        >
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border-spacing-0">
                    <thead className="bg-gray-100 sticky top-0 z-10">
                        <tr className="text-[#667085]">
                            <th className="text-xs text-left py-4 px-6 font-semibold leading-[18px]">ITEMS</th>
                            <th className="text-xs text-center py-4 px-6 font-semibold leading-[18px]">DATE</th>
                            <th className="text-xs text-center py-4 px-6 font-semibold leading-[18px]">PRICE</th>
                            <th className="text-xs text-center py-4 px-6 font-semibold leading-[18px]">PAYMENT TYPE</th>
                            <th className="text-xs text-left py-4 px-6 font-semibold leading-[18px]">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {data.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50 text-sm">
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="text-[#1D2939] font-semibold leading-6">{row.item}</span>
                                        <span className="text-xs text-gray-500 font-normal leading-[18px]">{row.duration}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center text-[#667085] font-normal leading-6 whitespace-nowrap">{row.date}</td>
                                <td className="px-6 py-4 text-center text-[#667085] font-normal leading-6">{row.price}</td>
                                <td className="px-6 py-4 text-center text-[#667085] font-normal leading-6 whitespace-nowrap">{row.paymentType}</td>
                                <td className="px-6 py-4 text-right">
                                    <Popover placement="bottom-end">
                                        <PopoverTrigger>
                                            <button className="focus:outline-none">
                                                <Image
                                                    src="/icons/three-dots.svg"
                                                    width={24}
                                                    height={24}
                                                    alt="Actions Menu"
                                                />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="flex flex-col bg-white border border-lightGrey rounded-md w-[195px] px-0 shadow-md">
                                            <ActionButton
                                                src="/icons/download-reciepts.svg"
                                                alt="Download Receipt"
                                                label="Download Receipt"
                                            />
                                            <ActionButton
                                                src="/icons/Download Invoice.svg"
                                                alt="Download Invoice"
                                                label="Download Invoice"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Purchase;