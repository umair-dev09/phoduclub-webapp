import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Checkbox } from "@nextui-org/react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Calendar } from "@nextui-org/calendar";

interface BottomUpSheet {
    isOpen: boolean;
    closeModal: () => void;
    subjectName: string | null;
}

const BottomSheet: React.FC<BottomUpSheet> = ({ closeModal, isOpen, subjectName }) => {
    const [numRows, setNumRows] = useState(10);
    const [numColumns, setNumColumns] = useState(5);



    const initializeCheckboxes = (rows: number, columns: number): boolean[][] => {
        return Array.from({ length: rows }, () => Array(columns).fill(false));
    };

    const [checkboxes, setCheckboxes] = useState<boolean[][]>(initializeCheckboxes(numRows, numColumns));
    const subjectChapterNames: Record<string, string[]> = {
        'Maths': [
            'Algebra',
            'Calculus',
            'Geometry',
            'Trigonometry',
            'Probability',
            'Statistics',
            'Linear Programming',
            'Set Theory',
            'Matrices',
            'Complex Numbers'
        ],
        'Overall': [
            'History',
            'Geography',
            'Civics',
            'Economics',
            'Political Science',
            'Environmental Studies',
            'World History',
            'Indian History',
            'Constitution of India'
        ],
        'Physics': [
            'Motion',
            'Energy',
            'Newton',
            'Momentum',
            'Work Done',
            'Electricity',
            'Magnetism',
            'Gravitation',
            'Optics',
            'Thermodynamics',
            'Waves',
            'Modern Physics'
        ],
        'Chemistry': [
            'Organic Chemistry',
            'Inorganic Chemistry',
            'Physical Chemistry',
            'Atomic Structure',
            'Chemical Bonding',
            'Thermochemistry',
            'Equilibrium',
            'Electrochemistry',
            'Periodic Table',
            'Coordination Compounds',
            'Kinetics',
            'Biomolecules'
        ]
    };

    const chapterPriorityMapping: Record<string, string> = {
        'Algebra': 'Medium',
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
        if (isOpen) {
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
        }
    }, [isOpen, subjectName]); // Dependency on `isOpen` and `subjectName`

    useEffect(() => {
        setCheckboxes(initializeCheckboxes(numRows, numColumns));
    }, [numRows, numColumns]);

    const handleCheckboxChange = (rowIndex: number, checkboxIndex: number) => {
        const updatedCheckboxes = [...checkboxes];
        updatedCheckboxes[rowIndex][checkboxIndex] = !updatedCheckboxes[rowIndex][checkboxIndex];
        setCheckboxes(updatedCheckboxes);
    };

    const getProgress = (rowIndex: number): number => {
        const checkedCount = checkboxes[rowIndex].filter(checked => checked).length;
        return (checkedCount / checkboxes[rowIndex].length) * 100;
    };

    const [selectedPriority, setSelectedPriority] = useState(getPriorityText(chapterName));

    const handlePriorityChange = (priority) => {
        setSelectedPriority(priority); // Update the selected priority
    };
    const getContent = () => {
        return (
            <>
                {chapterNames.map((chapterName, rowIndex) => (
                    <tr key={rowIndex} className='h-[84px] border-t border-lightGrey'>
                        <td>
                            <div className='ml-6 text-[14px] font-medium'>
                                <p>{chapterName}</p>
                            </div>
                            <div className="flex flex-row items-center ml-6">
                                <div
                                    className="relative w-1/2 h-2 rounded-lg bg-[#F1F5F9] overflow-hidden"
                                    style={{ appearance: 'none' }}
                                >
                                    <div
                                        className="absolute top-0 left-0 h-full bg-[#7B2CBF] rounded-lg"
                                        style={{ width: `${getProgress(rowIndex)}%` }}
                                    ></div>
                                </div>
                                <div className="ml-2 text-sm font-normal">
                                    <p>{getProgress(rowIndex)}%</p>
                                </div>
                            </div>
                        </td>
                        <td>

                            <Popover placement="bottom">
                                <PopoverTrigger>
                                    <button className="inline-flex items-center border border-gray-300 rounded-full bg-white text-sm font-medium text-gray-700 gap-1 w-fit h-auto px-[10px] py-1 whitespace-nowrap overflow-hidden shadow-sm">
                                        <div
                                            className={`w-2 h-2 rounded-full ${selectedPriority === 'Low' ? 'bg-[#0B9055]' :
                                                    selectedPriority === 'Medium' ? 'bg-[#DB6704]' :
                                                        selectedPriority === 'High' ? 'bg-[#DE3024]' : 'bg-red-500'
                                                }`}
                                        ></div>
                                        <p className="text-sm text-gray-700">{selectedPriority}</p>
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto py-1 px-0 bg-white border border-lightGrey rounded-md">
                                    <button
                                        onClick={() => handlePriorityChange('Low')}
                                        className="flex flex-row items-center justify-start w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7]"
                                    >
                                        <span className="w-2 h-2 bg-[#0B9055] rounded-full"></span>
                                        <span className="font-medium text-[#344054] text-sm">Low</span>
                                    </button>
                                    <button
                                        onClick={() => handlePriorityChange('Medium')}
                                        className="flex flex-row items-center justify-start w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7]"
                                    >
                                        <span className="w-2 h-2 bg-[#DB6704] rounded-full"></span>
                                        <span className="font-medium text-[#344054] text-sm">Medium</span>
                                    </button>
                                    <button
                                        onClick={() => handlePriorityChange('High')}
                                        className="flex flex-row items-center justify-start w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7]"
                                    >
                                        <span className="w-2 h-2 bg-[#DE3024] rounded-full"></span>
                                        <span className="font-medium text-[#344054] text-sm">High</span>
                                    </button>
                                </PopoverContent>
                            </Popover>
                        </td>
                        <td>

                            <Popover placement="bottom">
                                <PopoverTrigger>
                                    <button className="rounded-md bg-[#FFFFFF] flex items-center justify-center w-full p-3">
                                        <span className="font-normal text-sm text-[#475467] leading-5">01-10-2024</span>
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className="flex flex-col gap-2 p-0 h-auto">
                                    <Calendar
                                        showMonthAndYearPickers
                                        color="secondary" />
                                    <button
                                        className="min-w-[84px] min-h-[30px] rounded-md bg-[#9012FF] text-[14px] font-medium text-white mb-2">
                                        Clear
                                    </button>

                                </PopoverContent>
                            </Popover>
                        </td>
                        {checkboxes[rowIndex].map((checked, index) => (
                            <td key={index} className='pl-[4.7%]'>
                                <Checkbox
                                    color="primary"
                                    size="md"
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
        <>
            <Drawer
                open={isOpen}

                direction="bottom"
                className="rounded-tl-md rounded-tr-md "
                style={{ height: "98vh" }}
            >
                <div className="flex flex-col h-full justify-between">
                    {/* jabir ali */}
                    <div className="flex flex-col h-full overflow-auto">
                        <div className="flex flex-row items-center justify-between rounded-t-xl h-[69px]">
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

                        <div className="overflow-auto h-auto">
                            <table className="w-full table-fixed border-t border-[#EAECF0]">
                                <thead className="bg-[#F9FAFB] h-11">
                                    <tr className="text-xs text-gray-700">
                                        <th className="text-left pl-6 w-1/4">Chapter</th>
                                        <th>
                                            <button className="flex flex-row gap-1 justify-center my-4 items-center focus:outline-none">
                                                <th className="w-1/8">Priority</th>
                                            </button>
                                        </th>
                                        <th className="w-1/8">Target Date</th>
                                        <th className="w-1/10">Theory</th>
                                        <th className="w-1/10">Practice</th>
                                        <th className="w-1/10">PYQ's</th>
                                        <th className="w-1/10">Revision 1</th>
                                        <th className="w-1/10">Revision 2</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getContent()}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="flex flex-row items-center gap-4 justify-end border-t border-[#EAECF0] h-[76px] pr-6">
                        <button
                            className="h-11 w-22 py-4 px-6 shadow-inner-button flex flex-row items-center justify-center rounded-md bg-[#FFFFFF] border-2 border-solid border-[#EAECF0]"
                            onClick={closeModal}
                        >
                            <p className="font-semibold text-sm text-[#1D2939]">Cancel</p>
                        </button>
                        <button className="h-11 w-22 py-4 px-6 shadow-inner-button flex flex-row items-center justify-center rounded-md bg-[#9012FF]">
                            <p className="text-sm font-semibold text-[#FFFFFF]">Save</p>
                        </button>
                    </div>
                </div>


            </Drawer >
        </>
    );
};

export default BottomSheet;

