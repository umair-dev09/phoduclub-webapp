"use client";

import styles from './bottomUpSheet.module.css';
import Image from 'next/image';
import { useEffect } from 'react';
// import TableData from './tableData';
interface BottomUpSheet {
    onclose: () => void;
    subjectName: string | null;
}
const BottomSheet: React.FC<BottomUpSheet> = ({ onclose, subjectName }) => {
    const getContent = () => {
        switch (subjectName) {
            case 'Chemistry':
                return (
                    <>
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

                    </>


                );
            case 'Maths':
                return (
                    <>

                    </>
                );
            case 'Overall':
                return (
                    <>
                        <h2 className='text-2xl font-bold mb-4'>Overall</h2>
                        <p className='text-gray-700 mb-6'>Detailed content for Overall</p>
                    </>
                );
            case 'Physics':
                return (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Physics</h2>
                        <p className="text-gray-700 mb-6">Detailed content for Physics.</p>
                    </>
                );
            default:
                return null;
        }
    };
    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            const bottomSheet = document.getElementById('bottomSheet');
            if (bottomSheet && !bottomSheet.contains(e.target as Node)) {
                onclose();
            }
        };
        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [onclose]);


    return (
        <div className={styles.container}>
            <div className={styles.bottomUpSheet}>
                <div className="flex flex-row items-center justify-between rounded-t-xl">
                    <h3 className="ml-6">Chemistry</h3>
                    <button onClick={onclose}>
                        <Image
                            className="mr-6"
                            src="/icons/VectorcloseButton.svg"
                            alt="close button"
                            width={11.67}
                            height={11.67}
                        />
                    </button>
                </div>
                <div>
                    <div className={styles.tableWrapper}>
                        <table>
                            <thead className={styles.tableHead}>
                                <tr className='text-xs'>
                                    <th><p className='flex justify-start ml-6'>Chapter</p></th>
                                    <th><p>Priority</p></th>
                                    <th><p>Target Date</p></th>
                                    <th><p>Theory</p></th>
                                    <th><p>Practice</p></th>
                                    <th><p>PYQ's</p></th>
                                    <th><p>Revision 1</p></th>
                                    <th><p>Revision 2</p></th>
                                </tr>
                            </thead>
                            <tbody className='h-[84px] border-b'>
                                {getContent()}

                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-end border-t border-lightGrey">
                    <button
                        className="border rounded-lg py-2.5 px-6 text-sm border-lightGrey text-blackLike"
                        onClick={onclose}
                    >
                        <p>Cancel</p>
                    </button>
                    <button className="mr-6 ml-2.5 border rounded-lg py-2.5 px-6 text-sm bg-purple text-white border-darkPurple">
                        <p>Save</p>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BottomSheet;
