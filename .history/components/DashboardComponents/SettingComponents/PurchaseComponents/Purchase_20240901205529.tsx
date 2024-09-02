"use client";


import styles from './Purchase.module.css';
function Purchase() {
    // Sample data for demonstration
    const data = [
        { item: 'Item 1', date: '2024-09-01', price: '$10', paymentType: 'Credit Card', actions: 'View' },
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
                    <td>{row.actions}</td>
                </tr>
            ))}
        </>
    );
}

export default Purchase;
