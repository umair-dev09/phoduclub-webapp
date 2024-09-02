"use client";

import { useState } from 'react';
import styles from './Purchase.module.css';

function Purchase() {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };

    const data = [
        { item: 'BITSET Crash Course', date: '1st Jul, 2024', price: '₹2400', paymentType: 'Credit Card', actions: '' },

        // Add more rows as needed
    ];

    return (
        <>
            {data.map((row, index) => (
                <tr key={index}>
                    <td>{row.item}</td>
                    <td>{row.date}</td>
                    <td>{row.price}</td>
                    <td>{row.paymentType}</td>
                    <td>
                        <div className={styles.actions}>
                            <div className={styles.dots} onClick={handleMenuToggle}>⋮</div>
                            {menuOpen && (
                                <div className={styles.dropdownMenu}>
                                    <ul>
                                        <li>View</li>
                                        <li>Edit</li>
                                        <li>Delete</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </td>
                </tr>
            ))}
        </>
    );
}

export default Purchase;
