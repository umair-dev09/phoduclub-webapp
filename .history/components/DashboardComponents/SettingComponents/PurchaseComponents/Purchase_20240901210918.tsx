"use client";

import { useState } from 'react';
import styles from './Purchase.module.css';

function Purchase() {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };

    const data = [
        { item: 'Item 1', date: '2024-09-01', price: '$10', paymentType: 'Credit Card', actions: '' },
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
