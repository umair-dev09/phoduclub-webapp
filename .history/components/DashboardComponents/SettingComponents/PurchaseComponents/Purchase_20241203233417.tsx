"use client";

import styles from './Purchase.module.css';

function Purchase() {
    const data = [
        { item: 'JEE Crash Course', date: '1st Jul, 2024', price: '₹2400', paymentType: 'Credit Card', duration: '3 Months', actions: '' },
        { item: 'BITSET Crash Course', date: '1st Jul, 2024', price: '₹2400', paymentType: 'Credit Card', duration: '3 Months', actions: '' },
        { item: 'KCET Crash Course', date: '1st Jul, 2024', price: '₹2400', paymentType: 'Credit Card', duration: '3 Months', actions: '' },
        { item: 'MIT Crash Course', date: '1st Jul, 2024', price: '₹2400', paymentType: 'Credit Card', duration: '3 Months', actions: '' }
        // Add more rows as needed
    ];


    return (
        <div className="mx-6 overflow-x-auto border border-solid border-[#EAECF0]">
            <table className="w-full border-collapse border-spacing-0 rounded-t-lg overflow-hidden">
                <thead className="bg-gray-100">
                    <tr className="text-gray-600">
                        <th className="text-left py-4 px-6 font-medium w-[30%]">ITEMS</th>
                        <th className="text-left py-4 px-6 font-medium w-[15%]">DATE</th>
                        <th className="text-left py-4 px-6 font-medium w-[15%]">PRICE</th>
                        <th className="text-left py-4 px-6 font-medium w-[20%]">PAYMENT TYPE</th>
                        <th className="text-left py-4 px-6 font-medium w-[20%]">ACTIONS</th>
                    </tr>
                </thead>
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
                                <div className="text-xl cursor-pointer">⋮</div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Purchase;
