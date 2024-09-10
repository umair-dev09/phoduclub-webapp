"use client";

import styles from './bottomUpSheet.module.css';

function TableData() {
    return (
        <tr>
            <td>
                <div className='ml-6 text-[14px] font-medium'><p>Errors and Measurements</p></div>
                <div className='flex flex-row items-center ml-6'>
                    <progress value="80" max="100" className={styles.progressBar} />
                    <div className="ml-2 text-sm font-normal"><p>80%</p></div>
                </div>
            </td>
            <td></td>
            <td className='text-sm font-normal'><p>12-8-2024</p></td>
            <td><input className={styles.customCheckbox} type='checkbox' /></td>
            <td><input className={styles.customCheckbox} type='checkbox' /></td>
            <td><input className={styles.customCheckbox} type='checkbox' /></td>
            <td><input className={styles.customCheckbox} type='checkbox' /></td>
            <td><input className={styles.customCheckbox} type='checkbox' /></td>
        </tr>
    );
}

export default TableData;
