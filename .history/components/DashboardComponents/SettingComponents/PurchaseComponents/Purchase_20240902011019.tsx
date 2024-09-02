
"use client";

import { useState } from 'react';
import styles from './Purchase.module.css';

function Purchase() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggleMenu = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const handleDownload = (action: string) => {
        // Replace with actual download logic
        alert(`Trigger ${action} download`);
    };

    const data = [
        { item: 'BITSET Crash Course', date: '1st Jul, 2024', price: '₹2400', paymentType: 'Credit Card', duration: '3 Months' },
        { item: 'BITSET Crash Course', date: '1st Jul, 2024', price: '₹2400', paymentType: 'Credit Card', duration: '3 Months' },
        { item: 'BITSET Crash Course', date: '1st Jul, 2024', price: '₹2400', paymentType: 'Credit Card', duration: '3 Months' },
        { item: 'BITSET Crash Course', date: '1st Jul, 2024', price: '₹2400', paymentType: 'Credit Card', duration: '3 Months' }
        // Add more rows as needed
    ];

    return (
        <tbody>
            {data.map((row, index) => (
                <tr key={index} className={styles.tableRow}>
                    <td className={styles.tableCell}>
                        <div className={styles.itemCell}>
                            <div className={styles.itemName}>{row.item}</div>
                            <div className={styles.itemDuration}>{row.duration}</div>
                        </div>
                    </td>
                    <td className={styles.tableCell}>
                        <div className={styles.date}>{row.date}</div>
                    </td>
                    <td className={styles.tableCell}>
                        <div className={styles.price}>{row.price}</div>
                    </td>
                    <td className={styles.tableCell}>
                        <div className={styles.payment}>{row.paymentType}</div>
                    </td>
                    <td className={styles.tableCell}>
                        <div className={styles.actions} onClick={() => handleToggleMenu(index)}>
                            <div className={styles.dots}>⋮</div>
                            {openIndex === index && (
                                <div className={styles.dropdownMenu}>
                                    <ul>
                                        <li onClick={() => handleDownload('Receipt')}>Download Receipt</li>
                                        <li onClick={() => handleDownload('Invoice')}>Download Invoice</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </td>
                </tr>
            ))}
        </tbody>
    );
}

export default Purchase;
