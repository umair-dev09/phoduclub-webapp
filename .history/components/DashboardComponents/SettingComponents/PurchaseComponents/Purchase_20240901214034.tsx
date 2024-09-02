"use client";

import styles from './Purchase.module.css';

function Purchase() {
    const data = [
        {
            item: 'BITSET Crash Course',
            date: '1st Jul, 2024',
            price: '₹2400',
            paymentType: 'Credit Card',
            duration: '3 Months',
            actions: '',
        },
        // Add more rows as needed
    ];

    return (
        <>
            {data.map((row, index) => (
                <tr key={index}>
                    <td>
                        <div className={styles.itemCell}>
                            <div className={styles.itemName}>{row.item}</div>
                            <div className={styles.itemDuration}>{row.duration}</div>
                        </div>
                    </td>
                    <td>
                        <div className={styles.Date}>
                            {row.date}
                        </div>
                    </td>

                    <td>
                        <div className={styles.price}>{row.price}</div>
                    </td>
                    <td>
                        <div className={styles.Payment}>
                            {row.paymentType}
                        </div>
                    </td>
                    <td>
                        <div className={styles.actions}>
                            <div className={styles.dots}>⋮</div>
                        </div>
                    </td>
                </tr>
            ))}
        </>
    );
}

export default Purchase;
