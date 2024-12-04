"use client";

import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover';

function Purchase() {
    const data = [
        { item: 'JEE Crash Course', date: '1st Jul, 2024', price: '₹2400', paymentType: 'Credit Card', duration: '3 Months', actions: '' },
        { item: 'BITSET Crash Course', date: '1st Jul, 2024', price: '₹2400', paymentType: 'Credit Card', duration: '3 Months', actions: '' },
        { item: 'KCET Crash Course', date: '1st Jul, 2024', price: '₹2400', paymentType: 'Credit Card', duration: '3 Months', actions: '' },
        { item: 'MIT Crash Course', date: '1st Jul, 2024', price: '₹2400', paymentType: 'Credit Card', duration: '3 Months', actions: '' },
        { item: 'JEE Crash Course', date: '1st Jul, 2024', price: '₹2400', paymentType: 'Credit Card', duration: '3 Months', actions: '' },
        { item: 'BITSET Crash Course', date: '1st Jul, 2024', price: '₹2400', paymentType: 'Credit Card', duration: '3 Months', actions: '' },
        { item: 'KCET Crash Course', date: '1st Jul, 2024', price: '₹2400', paymentType: 'Credit Card', duration: '3 Months', actions: '' },
        { item: 'MIT Crash Course', date: '1st Jul, 2024', price: '₹2400', paymentType: 'Credit Card', duration: '3 Months', actions: '' }
        // Add more rows as needed
    ];


    return (
        <div className="mx-6  border border-solid border-[#EAECF0] rounded-lg h-full">
            <table className="w-full border-collapse border-spacing-0 ">
                <thead className="bg-gray-100">
                    <tr className="text-gray-600">
                        <th className="text-left py-4 px-6 font-medium w-[40%]">ITEMS</th>
                        <th className="text-left py-4 px-6 font-medium w-[15%]">DATE</th>
                        <th className="text-left py-4 px-6 font-medium w-[15%]">PRICE</th>
                        <th className="text-left py-4 px-6 font-medium w-[20%]">PAYMENT TYPE</th>
                        <th className="text-left py-4 px-6 font-medium w-[10%]">ACTIONS</th>
                    </tr>
                </thead>
            </table>
            <div className="overflow-y-auto max-h-90"> {/* Set a max-height for scrollable body */}
                <table className="w-full border-collapse border-spacing-0 ">
                    <tbody className="divide-y divide-gray-200">
                        {data.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-gray-800">{row.item}</span>
                                        <span className="text-sm text-gray-500">{row.duration}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-600">{row.date}</td>
                                <td className="px-6 py-4 text-gray-600">{row.price}</td>
                                <td className="px-6 py-4 text-gray-600">{row.paymentType}</td>
                                <td className="px-6 py-4">
                                    <div className="text-xl text-right cursor-pointer">⋮</div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div >

    );
}

export default Purchase;
