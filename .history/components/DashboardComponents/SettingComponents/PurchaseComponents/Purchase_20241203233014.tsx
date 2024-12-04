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

        // <>
        //     {data.map((row, index) => (
        //         <tr key={index} className="hover:bg-gray-50">
        //             <td className="py-4 px-6">
        //                 <div className="flex flex-col">
        //                     <div className="font-semibold text-black">{row.item}</div>
        //                     <div className="text-sm text-gray-500 mt-1">{row.duration}</div>
        //                 </div>
        //             </td>
        //             <td className="py-4 px-6 text-gray-500">{row.date}</td>
        //             <td className="py-4 px-6 text-gray-500">{row.price}</td>
        //             <td className="py-4 px-6 text-gray-500">{row.paymentType}</td>
        //             <td className="py-4 px-6 relative cursor-pointer">
        //                 <div className="text-2xl">⋮</div>
        //                 <div className="hidden absolute right-0 top-full bg-white border border-gray-300 rounded-lg shadow-lg w-24 group-hover:block">
        //                     <ul className="py-1">
        //                         <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">View</li>
        //                         <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Edit</li>
        //                         <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Delete</li>
        //                     </ul>
        //                 </div>
        //             </td>
        //         </tr>
        //     ))}
        // </>
        <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
                <thead className="bg-gray-100">
                    <tr className="text-gray-600">
                        <th className="px-6 py-3 text-left">ITEMS</th>
                        <th className="px-6 py-3 text-left">DATE</th>
                        <th className="px-6 py-3 text-left">PRICE</th>
                        <th className="px-6 py-3 text-left">PAYMENT TYPE</th>
                        <th className="px-6 py-3 text-left">ACTIONS</th>
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
