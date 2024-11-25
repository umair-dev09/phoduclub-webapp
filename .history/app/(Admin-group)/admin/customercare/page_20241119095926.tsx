"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import "react-phone-input-2/lib/style.css";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import CustomerCareStatus from '@/components/AdminComponents/CustomerCare/CustomerCareStatus';
import CustomerCareImportance from '@/components/AdminComponents/CustomerCare/CustomerCareImportance';
import { Calendar } from "@nextui-org/calendar";
import { Checkbox } from "@nextui-org/react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
// Define types for quiz data
type Quiz = {
    id: string;
    email: string;
    Importance: 'Low' | 'Medium' | 'Hard';
    joiningDate: string;
    status: 'New' | 'Open' | 'Answered' | 'Resolved';
}

// Mock fetchQuizzes function with types
const fetchQuizzes = async (): Promise<Quiz[]> => {
    const allQuizzes: Quiz[] = [
        { id: "1", Importance: "Medium", joiningDate: "Dec 1, 2023", email: "Jun 1, 2024", status: "New" },
        { id: "2", Importance: "Low", joiningDate: "Nov 15, 2023", email: "May 15, 2024", status: "Open" },
        { id: "3", Importance: "Medium", joiningDate: "Oct 1, 2023", email: "Apr 1, 2024", status: "Answered" },
        { id: "4", Importance: "Hard", joiningDate: "Sep 1, 2023", email: "Mar 1, 2024", status: "Resolved" },
        { id: "5", Importance: "Low", joiningDate: "Jan 1, 2024", email: "Jul 1, 2024", status: "New" },
        { id: "6", Importance: "Low", joiningDate: "Feb 1, 2024", email: "Aug 1, 2024", status: "Open" },
        { id: "7", Importance: "Hard", joiningDate: "Jul 15, 2023", email: "Jan 15, 2024", status: "Answered" },
        { id: "8", Importance: "Low", joiningDate: "Dec 10, 2023", email: "Jun 10, 2024", status: "Resolved" },
        { id: "9", Importance: "Medium", joiningDate: "Nov 25, 2023", email: "May 25, 2024", status: "New" },
        { id: "10", Importance: "Hard", joiningDate: "Aug 20, 2023", email: "Feb 20, 2024", status: "Answered" }
    ];
    return allQuizzes;
};

function CustomerCare() {
    const [data, setData] = useState<Quiz[]>([]);
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
    const router = useRouter();

    // Fetch quizzes when component mounts
    useEffect(() => {
        const loadQuizzes = async () => {
            setLoading(true);
            const quizzes = await fetchQuizzes();
            setQuizzes(quizzes);
            setData(quizzes);
            setLoading(false);
        };
        loadQuizzes();
    }, []);

    // Filter quizzes based on search term
    // useEffect(() => {
    //     const filteredQuizzes = quizzes.filter(quiz =>
    //         quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
    //     );
    //     setData(filteredQuizzes);
    //     setCurrentPage(1); // Reset to first page on new search
    // }, [searchTerm, quizzes]);

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = data.slice(firstItemIndex, lastItemIndex);

    // Function to handle tab click and navigate to a new route
    const handleTabClick = (path: string) => {
        router.push(path);
    };

    const [uniqueId, setUniqueId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Check if all fields are filled
    const isAddButtonDisabled = !uniqueId || !startDate || !endDate;

    // const handleCheckboxChange = (id: string) => {
    //     const newSelected = new Set(selectedItems);
    //     if (newSelected.has(id)) {
    //         newSelected.delete(id);
    //     } else {
    //         newSelected.add(id);
    //     }
    //     setSelectedItems(newSelected);
    // };

    // // Handle "select all" checkbox
    // const handleSelectAll = (checked: boolean) => {
    //     if (checked) {
    //         // Select all items on the current page
    //         const currentIds = currentItems.map(item => item.id);
    //         setSelectedItems(new Set(currentIds));
    //     } else {
    //         // Deselect all items
    //         setSelectedItems(new Set());
    //     }
    // };

    // // Check if all items on current page are selected
    // const isAllSelected = currentItems.length > 0 &&
    //     currentItems.every(item => selectedItems.has(item.id));

    const [globalSelectedItems, setGlobalSelectedItems] = useState<Set<string>>(new Set());

    const handleCheckboxChange = (id: string) => {
        setGlobalSelectedItems(prev => {
            const newSelected = new Set(prev);
            if (newSelected.has(id)) {
                newSelected.delete(id);
            } else {
                newSelected.add(id);
            }
            return newSelected;
        });
    };

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            // Select ALL items across all pages
            const allIds = quizzes.map(item => item.id);
            setGlobalSelectedItems(new Set(allIds));
        } else {
            // Deselect all items
            setGlobalSelectedItems(new Set());
        }
    };

    // Update the isAllSelected check
    const isAllSelected = quizzes.length > 0 &&
        quizzes.every(item => globalSelectedItems.has(item.id));

    return (
        <div className="flex flex-col w-full gap-4 p-6">
            <div className="flex flex-row justify-between items-center">
                <h2 className="text-lg font-semibold text-[#1D2939]">
                    Users
                </h2>
                <div className="flex flex-row gap-3">
                    {/* Search Button */}
                    <button className="h-[44px] w-[250px] rounded-md bg-[#FFFFFF] border border-solid border-[#D0D5DD] flex items-center shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]">
                        <div className="flex flex-row items-center gap-2 pl-2">
                            <Image
                                src="/icons/search-button.svg"
                                width={20}
                                height={20}
                                alt="Search Button"
                            />
                            <input
                                className="font-normal text-[#667085] text-sm placeholder:text-[#A1A1A1] rounded-md px-1 py-1 focus:outline-none focus:ring-0 border-none"
                                placeholder="Search"
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </button>

                    {/* Select Date Button */}
                    <button className="h-[44px] w-[143px] rounded-md bg-[#FFFFFF] border border-solid border-[#D0D5DD] flex items-center p-3 shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]">
                        <Image
                            src="/icons/select-date.svg"
                            width={20}
                            height={20}
                            alt="Select-date Button"
                        />
                        <span className="font-medium text-sm text-[#667085] ml-2">Select dates</span>
                    </button>

                    {/* By Status Button */}
                    <div className="h-[44px] w-[126px] rounded-md bg-[#FFFFFF] border border-solid border-[#D0D5DD] flex items-center justify-between p-3 cursor-pointer shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]">
                        <p className="font-medium text-sm text-[#667085] ml-2">
                            By status
                        </p>
                        <Image
                            src="/icons/selectdate-Arrowdown.svg"
                            width={20}
                            height={20}
                            alt="Arrow-Down Button"
                        />
                    </div>


                    <Popover
                        placement="bottom-end">
                        <PopoverTrigger>
                            <button className="flex items-center justify-center px-[0.875rem] py-[0.625rem] bg-white border border-[#D0D5DD] rounded-md shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]">
                                <Image src='/icons/Frame.svg' alt="filter" width={20} height={20} />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className="border border-solid border-[#EAECF0] p-3 gap-2  hover:bg-[#667085]">
                                <span className="text-xs font-normal text-[#475467]">Students</span>
                                <div className="flex flex-row gap-2">
                                    <Checkbox color="primary" />
                                    <span className="text-[#0C111D] font-normal text-xs">Free</span>
                                </div>

                            </div>
                        </PopoverContent>
                    </Popover>



















                </div>
            </div>

            <div className="flex flex-col justify-between h-full">
                <div className="flex border border-[#EAECF0] rounded-xl">
                    <table className="w-full h-auto bg-white rounded-xl">
                        <thead>
                            <tr>
                                <th className="w-10 pl-8">
                                    {/* <input
                                        type="checkbox"
                                        checked={isAllSelected}
                                        onChange={(e) => handleSelectAll(e.target.checked)}
                                    /> */}
                                    <Checkbox
                                        size="md"
                                        color="primary"
                                        checked={isAllSelected}
                                        onChange={(e) => handleSelectAll(e.target.checked)}
                                    />
                                </th>
                                <th className="w-10 pl-4 py-4 text-center text-[#667085] font-medium text-sm">
                                    <p>Sr.No.</p>
                                </th>
                                <th className="text-left w-[10%] pl-4 py-4 rounded-tl-xl flex flex-row text-[#667085] font-medium text-sm">
                                    Name
                                </th>
                                <th className="text-left w-[20%] py-4 text-[#667085] font-medium text-sm">
                                    Tickets
                                </th>
                                <th className="text-left pl-10 py-4 text-[#667085] font-medium text-sm">
                                    Importance
                                </th>
                                <th className="text-center py-4 text-[#667085] font-medium text-sm">
                                    Date
                                </th>
                                <th className="text-left py-4 text-[#667085] font-medium text-sm">
                                    Assigned
                                </th>
                                <th className="text-left py-4 rounded-tr-xl text-[#667085] font-medium text-sm">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((quiz, index) => (
                                <tr key={quiz.id} className="h-auto border-t border-solid border-[#EAECF0]">
                                    <td className="pl-8 py-4 text-center text-[#101828] text-sm">
                                        {/* <input
                                            type="checkbox"
                                            checked={globalSelectedItems.has(quiz.id)}
                                            onChange={() => handleCheckboxChange(quiz.id)}
                                        /> */}
                                        <Checkbox
                                            size="md"
                                            color="primary"
                                            isSelected={globalSelectedItems.has(quiz.id)}
                                            onValueChange={() => handleCheckboxChange(quiz.id)}
                                        />
                                    </td>
                                    <td className="py-4 text-center text-[#101828] text-sm">
                                        {index + 1}
                                    </td>
                                    <td className="pl-6 py-2">
                                        <div className="flex flex-row gap-2">
                                            <div className="flex items-center">
                                                <div className="relative">
                                                    <Image src='/images/DP_Lion.svg' alt="DP" width={40} height={40} />
                                                    <Image className="absolute right-0 bottom-0" src='/icons/winnerBatch.svg' alt="Batch" width={18} height={18} />
                                                </div>
                                            </div>
                                            <div className="flex items-start justify-start flex-col">
                                                <div className="text-sm font-semibold whitespace-nowrap">
                                                    Jenny Wilson
                                                </div>
                                                <div className="flex justify-start items-start text-[13px] text-[#667085]">jenny#8547</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <button onClick={() => handleTabClick('/admin/customercare/customerinfo')} className="flex flex-col gap-1">
                                            <p className="text-[#101828] text-left text-sm whitespace-nowrap overflow-hidden text-ellipsis">This message is not relevant to study.</p>
                                            <div className="flex flex-col justify-start gap-1">
                                                <div className="flex flex-row gap-1">
                                                    <p className="w-fit px-3 py-1 text-xs text-white font-medium bg-[#344054] rounded-[0.375rem]">Scam</p>
                                                    {/* <p className="w-fit px-3 py-1 text-xs text-white font-medium bg-[#344054] rounded-[0.375rem]">General</p>
                                                    <p className="w-fit px-3 py-1 text-xs text-white font-medium bg-[#344054] rounded-[0.375rem]">Product</p> */}
                                                </div>
                                                {/* <p className="w-fit px-3 py-1 text-xs text-white font-medium bg-[#0A5B39] rounded-[0.375rem]">Transaction ID: 254784523698</p> */}
                                            </div>
                                        </button>
                                    </td>
                                    <td className="flex items-centre justify-left h-full pl-10 py-4 text-[#101828] text-sm">
                                        <CustomerCareImportance importance={quiz.Importance} />
                                    </td>
                                    <td className="py-4 text-center text-[#101828] text-sm">Mon Jan 6, 2024</td>
                                    <td className="py-4 text-[#101828] text-sm">
                                        <div className="flex flex-row items-center gap-2">
                                            <Image
                                                src="/icons/profile-pic2.svg"
                                                width={24}
                                                height={24}
                                                alt="profile-icons"
                                            />
                                            <p className="text-[#1D2939] font-medium text-sm whitespace-nowrap">Jenny Wilson</p>
                                        </div>
                                    </td>
                                    <td className="flex items-center justify-start pr-4 py-4 text-[#101828] text-sm">
                                        <CustomerCareStatus status={quiz.status} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Section */}
                <div className="flex items-end justify-end h-auto">
                    <div className="flex justify-right h-auto">
                        <PaginationSection
                            totalItems={data.length}
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                </div>
            </div>
            <div className={`fixed right-[33%] flex flex-row items-center p-4 gap-4 bg-white border border-[#D0D5DD] rounded-xl shadow-[4px_8px_13px_0_rgba(0,0,0,0.05), 4px_4px_12px_0_rgba(0,0,0,0.05), 4px_8px_14px_0_rgba(0,0,0,0.04)] transition-all duration-500 transform ${globalSelectedItems.size > 0 ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                } bottom-8`}>
                <p className="text-balance text-[#1D2939] font-semibold">{globalSelectedItems.size} Selected</p>
                <div className="flex flex-row gap-2">
                    <button
                        onClick={() => {
                            const allIds = quizzes.map(item => item.id);
                            setGlobalSelectedItems(new Set(allIds));
                            handleSelectAll(true);
                        }}
                        className="px-4 py-[0.625rem] text-sm text-[#1D2939] font-medium border border-lightGrey rounded-md"
                    >
                        Select all
                    </button>
                    <button
                        onClick={() => {
                            setGlobalSelectedItems(new Set());
                            handleSelectAll(false);
                        }}
                        className="px-4 py-[0.625rem] text-sm text-[#1D2939] font-medium border border-lightGrey rounded-md"
                    >
                        Unselect all
                    </button>
                </div>
                <div className="w-0 h-9 border-[0.5px] border-lightGrey rounded-full"></div>
                <button className="flex flex-row justify-between w-[6.438rem] px-4 py-[0.625rem] text-xs text-[#182230] font-medium bg-[#EDE4FF] rounded-[0.375rem]">
                    New
                    <Image src='/icons/arrow-down-01-round.svg' alt="open" width={18} height={18} />
                </button>
            </div>
        </div>
    );
}

// Pagination Component
function PaginationSection({
    totalItems,
    itemsPerPage,
    currentPage,
    setCurrentPage,
}: {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const renderPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 4; // Maximum visible pages in pagination
        const visiblePagesAroundCurrent = Math.floor(maxVisiblePages / 2);

        let startPage = Math.max(1, currentPage - visiblePagesAroundCurrent);
        let endPage = Math.min(totalPages, currentPage + visiblePagesAroundCurrent);

        if (currentPage <= visiblePagesAroundCurrent) {
            endPage = Math.min(totalPages, maxVisiblePages);
        } else if (currentPage + visiblePagesAroundCurrent >= totalPages) {
            startPage = Math.max(1, totalPages - maxVisiblePages + 1);
        }

        // First page with ellipsis if needed
        if (startPage > 1) {
            pages.push(
                <PaginationItem key={1}>
                    <PaginationLink onClick={() => setCurrentPage(1)}>1</PaginationLink>
                </PaginationItem>
            );
            if (startPage > 2) {
                pages.push(
                    <PaginationItem key="start-ellipsis">
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }
        }

        // Visible pages
        for (let page = startPage; page <= endPage; page++) {
            pages.push(
                <PaginationItem key={page}>
                    <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        className={`${currentPage === page ? "bg-purple text-white hover:bg-purple hover:text-white" : "hover:bg-neutral-200"}`}
                    >
                        {page}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        // Last page with ellipsis if needed
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(
                    <PaginationItem key="end-ellipsis">
                        <PaginationEllipsis />
                    </PaginationItem>
                );
            }
            pages.push(
                <PaginationItem key={totalPages}>
                    <PaginationLink onClick={() => setCurrentPage(totalPages)}>{totalPages}</PaginationLink>
                </PaginationItem>
            );
        }

        return pages;
    };

    return (
        <Pagination className="mt-4 justify-end">
            <PaginationContent className="bg-white border border-lightGrey rounded-md flex flex-row items-center">
                <PaginationItem>
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="disabled:opacity-50"
                    >
                        <PaginationPrevious />
                    </button>
                </PaginationItem>
                <div className="flex flex-row items-center gap-1">
                    {renderPageNumbers()}
                </div>
                <PaginationItem>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="disabled:opacity-50"
                    >
                        <PaginationNext />
                    </button>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}

export default CustomerCare;