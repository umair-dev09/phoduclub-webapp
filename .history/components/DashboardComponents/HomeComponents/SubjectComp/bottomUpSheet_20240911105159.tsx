"use client";

import styles from './bottomUpSheet.module.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
interface BottomUpSheet {
    closeModal: () => void;
    subjectName: string | null;
}

const BottomSheet: React.FC<BottomUpSheet> = ({ closeModal, subjectName }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const handleDateChange = (date: Date | null) => {
        console.log("Selected Date: ", date);
        setSelectedDate(date);
    };


    const getContent = () => {
        switch (subjectName) {
            case 'Chemistry':
                return (
                    <>




                        <tr>
                            <td>
                                <div className='ml-6 text-[14px] font-medium'>
                                    <p>Errors and Measurements</p>
                                </div>
                                <div className='flex flex-row items-center ml-6'>
                                    <progress value="80" max="100" className={styles.progressBar} />
                                    <div className="ml-2 text-sm font-normal">
                                        <p>80%</p>
                                    </div>
                                </div>
                            </td>
                            <td><div>
                                <div className="inline-flex items-center justify-center border border-gray-300 rounded-full bg-white text-sm font-medium text-gray-700 p-2 max-w-full whitespace-nowrap overflow-hidden shadow-sm" style={{ width: '67px', height: '28px' }}>
                                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                                    <p className="m-0 text-sm text-gray-700">High</p>
                                </div>

                            </div></td>
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
                return <>

                    <tr>
                        <td>
                            <div className='ml-6 text-[14px] font-medium'>
                                <p>Algebra</p>
                            </div>
                            <div className='flex flex-row items-center ml-6'>
                                <progress value="80" max="100" className={styles.progressBar} />
                                <div className="ml-2 text-sm font-normal">
                                    <p>80%</p>
                                </div>
                            </div>
                        </td>
                        <td><div>
                            <div className="inline-flex items-center justify-center border border-gray-300 rounded-full bg-white text-sm font-medium text-gray-700 p-2 max-w-full whitespace-nowrap overflow-hidden shadow-sm" style={{ width: '67px', height: '28px' }}>
                                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                                <p className="m-0 text-sm text-gray-700">High</p>
                            </div>

                        </div></td>
                        <td className='text-sm font-normal'><p>12-8-2024</p></td>
                        <td><input className={styles.customCheckbox} type='checkbox' /></td>
                        <td><input className={styles.customCheckbox} type='checkbox' /></td>
                        <td><input className={styles.customCheckbox} type='checkbox' /></td>
                        <td><input className={styles.customCheckbox} type='checkbox' /></td>
                        <td><input className={styles.customCheckbox} type='checkbox' /></td>
                    </tr>
                </>;
            case 'Overall':
                return (
                    <>
                        <tr>
                            <td>
                                <div className='ml-6 text-[14px] font-medium'>
                                    <p>Errors and Measurements</p>
                                </div>
                                <div className='flex flex-row items-center ml-6'>
                                    <progress value="80" max="100" className={styles.progressBar} />
                                    <div className="ml-2 text-sm font-normal">
                                        <p>80%</p>
                                    </div>
                                </div>

                            </td>
                            <td>
                                <div>
                                    <div className="inline-flex items-center justify-center border border-gray-300 rounded-full bg-white text-sm font-medium text-gray-700 p-2 max-w-full whitespace-nowrap overflow-hidden shadow-sm" style={{ width: '67px', height: '28px' }}>
                                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                                        <p className="m-0 text-sm text-gray-700">High</p>
                                    </div>

                                </div>
                            </td>


                            <td className='text-sm font-normal'><p>12-8-2024</p></td>
                            <td><input className={styles.customCheckbox} type='checkbox' /></td>
                            <td><input className={styles.customCheckbox} type='checkbox' /></td>
                            <td><input className={styles.customCheckbox} type='checkbox' /></td>
                            <td><input className={styles.customCheckbox} type='checkbox' /></td>
                            <td><input className={styles.customCheckbox} type='checkbox' /></td>
                        </tr>
                    </>
                );
            case 'Physics':
                return (
                    <>

                        <tr>
                            <td>
                                <div className='ml-6 text-[14px] font-medium'>
                                    <p>Errors and Measurements</p>
                                </div>
                                <div className='flex flex-row items-center ml-6'>
                                    <progress value="80" max="100" className={styles.progressBar} />
                                    <div className="ml-2 text-sm font-normal">
                                        <p>80%</p>
                                    </div>
                                </div>
                            </td>
                            <td><div>
                                <div className="inline-flex items-center justify-center border border-gray-300 rounded-full bg-white text-sm font-medium text-gray-700 p-2 max-w-full whitespace-nowrap overflow-hidden shadow-sm" style={{ width: '67px', height: '28px' }}>
                                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                                    <p className="m-0 text-sm text-gray-700">High</p>
                                </div>

                            </div></td>
                            <td >
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={handleDateChange}
                                    dateFormat="MM-dd-yyyy"
                                    className={styles.datePickerInput}

                                />

                            </td>
                            <td><input className={styles.customCheckbox} type='checkbox' /></td>
                            <td><input className={styles.customCheckbox} type='checkbox' /></td>
                            <td><input className={styles.customCheckbox} type='checkbox' /></td>
                            <td><input className={styles.customCheckbox} type='checkbox' /></td>
                            <td><input className={styles.customCheckbox} type='checkbox' /></td>
                        </tr>

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
                closeModal();
            }
        };
        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [onclose]);

    return (
        <div className={styles.container}>
            {/* <div id="bottomSheet" className={styles.bottomUpSheet}> */}
            <div
                id="bottomSheet"
                className="w-full bg-white p-6 rounded-t-lg shadow-lg animate-slideUp"
                style={{ height: '98vh', maxHeight: '98vh', overflowY: 'auto' }}
            >

                <div className="flex flex-row items-center justify-between rounded-t-xl">
                    <h3 className="ml-6">{subjectName || "Subject"}</h3>
                    <button onClick={closeModal}>
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
                        onClick={closeModal}
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
};

export default BottomSheet;
