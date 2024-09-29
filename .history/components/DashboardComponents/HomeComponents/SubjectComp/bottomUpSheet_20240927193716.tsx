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
    const [tempDate, setTempDate] = useState<Date | null>(new Date());
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [numRows, setNumRows] = useState(10);
    const [numColumns, setNumColumns] = useState(5);
    const [isOpen, setIsOpen] = useState(false); // New state for transition

    const initializeCheckboxes = (rows: number, columns: number): boolean[][] => {
        return Array.from({ length: rows }, () => Array(columns).fill(false));
    };

    const [checkboxes, setCheckboxes] = useState<boolean[][]>(initializeCheckboxes(numRows, numColumns));
    const subjectChapterNames: Record<string, string[]> = {
        'Maths': ['Algebra', 'Calculus', 'Geometry'],
        'Overall': ['History', 'Geography', 'Civics'],
        'Physics': ['Motion', 'Energy', 'Newton', 'Momentum', 'Work Done'],
        'Chemistry': ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry'],
    };

    const chapterPriorityMapping: Record<string, string> = {
        'Algebra': 'High',
        'Calculus': 'easy',
        'Geometry': 'Low',
        'History': 'High',
        'Geography': 'easy',
        'Civics': 'Low',
        'Motion': 'easy',
        'Energy': 'easy',
        'Newton': 'easy',
        'Momentum': 'low',
        'Work Done': 'High',
        'Organic Chemistry': 'High',
        'Inorganic Chemistry': 'easy',
        'Physical Chemistry': 'Low',
    };

    const chapterNames = subjectChapterNames[subjectName || ''] || [];

    const getPriorityText = (chapterName: string) => {
        return chapterPriorityMapping[chapterName] || 'Priority';
    };

    useEffect(() => {
        setIsOpen(true); // Open the sheet when component mounts
        if (subjectName === 'Physics') {
            setNumRows(chapterNames.length);
            setNumColumns(5);
        } else if (subjectName === 'Maths') {
            setNumRows(chapterNames.length);
            setNumColumns(5);
        } else if (subjectName === 'Overall') {
            setNumRows(chapterNames.length);
            setNumColumns(5);
        } else if (subjectName === 'Chemistry') {
            setNumRows(chapterNames.length);
            setNumColumns(5);
        }
    }, [subjectName]);

    useEffect(() => {
        setCheckboxes(initializeCheckboxes(numRows, numColumns));
    }, [numRows, numColumns]);

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
    }, [closeModal]);

    const handleDateChange = (date: Date | null) => {
        setTempDate(date);
    };

    const applyDate = () => {
        setSelectedDate(tempDate);
        setCalendarVisible(false);
    };

    const cancelDate = () => {
        setTempDate(selectedDate);
        setCalendarVisible(false);
    };

    const CustomCalendarContainer = ({ className, children }: any) => (
        <div className={`${className} ${styles.customCalendarContainer}`}>
            {children}
            <div className={styles.customButtons}>
                <button onClick={cancelDate} className={styles.cancelButton}>Cancel</button>
                <button onClick={applyDate} className={styles.applyButton}>Apply</button>
            </div>
        </div>

    );

    const handleCheckboxChange = (rowIndex: number, checkboxIndex: number) => {
        const updatedCheckboxes = [...checkboxes];
        updatedCheckboxes[rowIndex][checkboxIndex] = !updatedCheckboxes[rowIndex][checkboxIndex];
        setCheckboxes(updatedCheckboxes);
    };

    const getProgress = (rowIndex: number): number => {
        const checkedCount = checkboxes[rowIndex].filter(checked => checked).length;
        return (checkedCount / checkboxes[rowIndex].length) * 100;
    };

    const getContent = () => {
        return (
            <>
                {chapterNames.map((chapterName, rowIndex) => (
                    <tr key={rowIndex} className='h-[84px]'>
                        <td>
                            <div className='ml-6 text-[14px] font-medium'>
                                <p>{chapterName}</p>
                            </div>
                            <div className='flex flex-row items-center ml-6'>
                                <progress value={getProgress(rowIndex)} max="100" className={styles.progressBar} />
                                <div className="ml-2 text-sm font-normal">
                                    <p>{getProgress(rowIndex)}%</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div>
                                <div className="inline-flex items-center justify-center border border-gray-300 rounded-full bg-white text-sm font-medium text-gray-700 p-2 max-w-full whitespace-nowrap overflow-hidden shadow-sm" style={{ width: '67px', height: '28px' }}>
                                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                                    <p className="m-0 text-sm text-gray-700">{getPriorityText(chapterName)}</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <DatePicker
                                selected={tempDate}
                                onChange={handleDateChange}
                                calendarContainer={CustomCalendarContainer}
                                onClickOutside={cancelDate}
                                onCalendarOpen={() => setCalendarVisible(true)}
                                onCalendarClose={() => setCalendarVisible(false)}
                                dateFormat="dd-MM-yyyy"
                                className={styles.datePickerInput}
                            />
                        </td>
                        {checkboxes[rowIndex].map((checked, index) => (
                            <td key={index} className={styles.checkBlock}>
                                <input
                                    className={styles.customCheckbox}
                                    type='checkbox'
                                    checked={checked}
                                    onChange={() => handleCheckboxChange(rowIndex, index)}
                                />
                            </td>
                        ))}
                    </tr>
                ))}
            </>
        );
    };

    return (
        <div className={styles.container}>
            <div className={`${styles.bottomUpSheet} ${isOpen ? styles.open : ''}`}>
                <div className="flex flex-row items-center justify-between rounded-t-xl">
                    <h3 className="ml-6">{subjectName || "Subject"}</h3>
                    <button onClick={() => setIsOpen(false)}>
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
                        onClick={() => setIsOpen(false)}
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
