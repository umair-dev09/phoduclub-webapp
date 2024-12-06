import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Checkbox } from "@nextui-org/react";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";

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
        'Maths': ['Algebra', 'Calculus', 'Geometry'],
        'Overall': ['History', 'Geography', 'Civics'],
        'Physics': ['Motion', 'Energy', 'Newton', 'Momentum', 'Work Done'],
        'Chemistry': ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry'],
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

    const getContent = () => {
        return (
            <>
                {chapterNames.map((chapterName, rowIndex) => (
                    <tr key={rowIndex} className='h-[84px]'>
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
                            <div>
                                <div className="inline-flex items-center justify-center border border-gray-300 rounded-full bg-white text-sm font-medium text-gray-700 gap-2 w-auto h-auto p-4 whitespace-nowrap overflow-hidden shadow-sm" style={{ width: '67px', height: '28px' }}>
                                    <span className="w-2 h-2 bg-red-500 rounded-full "></span>
                                    <p className="m-0 text-sm text-gray-700">{getPriorityText(chapterName)}</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <p>01-10-2024</p>
                        </td>
                        {checkboxes[rowIndex].map((checked, index) => (
                            <td key={index}>
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
                            <table className="w-full table-fixed border border-solid border-[#EAECF0]">
                                <thead className="bg-[#F9FAFB] h-11">
                                    <tr className="text-xs text-gray-700">
                                        <th className="text-left pl-6 w-1/4">Chapter</th>
                                        <Popover placement="bottom">
                                            <PopoverTrigger>
                                                <button className="flex flex-row gap-1 justify-center items-center focus:outline-none">
                                                    {/* Remove 'flex' from 'th' and wrap the content in a div */}
                                                    <div className="flex justify-center items-center w-full">
                                                        <span className="text-center">Priority</span>
                                                    </div>
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto py-1 px-0 bg-white border border-lightGrey rounded-md">
                                                <button className="flex flex-row items-center justify-start w-full px-4 py-[0.625rem]  gap-2 hover:bg-[#F2F4F7]">

                                                    <span className="w-[6px] h-[6px] bg-[#182230] rounded-full "></span>
                                                    <span className="font-medium text-[#182230] text-xs">Low</span>

                                                </button>
                                                <button className="flex flex-row items-center justify-start w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7]" >

                                                    <span className="w-[6px] h-[6px] bg-[#93360D] rounded-full "></span>
                                                    <span className="font-medium text-[#93360D] text-xs">Medium</span>

                                                </button>
                                                <button className="flex flex-row items-center justify-start w-full px-4 py-[0.625rem]  gap-2 hover:bg-[#F2F4F7]">


                                                    <span className="w-[6px] h-[6px] bg-[#9A221A] rounded-full "></span>
                                                    <span className="font-medium text-[#9A221A] text-xs">High</span>

                                                </button>
                                            </PopoverContent>
                                        </Popover>




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
                        <h1>jabir</h1>
                        <h1>jabir</h1>

                        <h1>jabir</h1>
                        <h1>jabir</h1>
                        <h1>jabir</h1>
                        <h1>jabir</h1>
                        <h1>jabir</h1>
                        <h1>jabir</h1>
                        <h1>jabir</h1>
                        <h1>jabir</h1>
                        <h1>jabir</h1>

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

