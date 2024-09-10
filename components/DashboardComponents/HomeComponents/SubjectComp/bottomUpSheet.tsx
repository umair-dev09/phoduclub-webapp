"use client";

import styles from './bottomUpSheet.module.css';
import Image from 'next/image';
import TableData from './tableData';

function BottomUpSheet({ onClose }: { onClose: () => void }) {
    return (
        <div className={styles.container}>
            <div className={styles.bottomUpSheet}>
                <div className="flex flex-row items-center justify-between rounded-t-xl">
                    <h3 className="ml-6">Chemistry</h3>
                    <button onClick={onClose}>
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
                                <TableData />
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex flex-row items-center justify-end border-t border-lightGrey">
                    <button
                        className="border rounded-lg py-2.5 px-6 text-sm border-lightGrey text-blackLike"
                        onClick={onClose}
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

export default BottomUpSheet;
