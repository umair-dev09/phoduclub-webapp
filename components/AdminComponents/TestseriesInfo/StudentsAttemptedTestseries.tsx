"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Calendar } from "@nextui-org/calendar";
import { today, getLocalTimeZone } from "@internationalized/date";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import Remove from "@/components/AdminComponents/QuizInfoDailogs/Remove";

// Define types for StudentAttempts data
interface StudentAttempts {
    title: string;
    uniqueId: string;
    enrollmentType: string;
    progress: string;
    enrolledDate: string;
    expiryDate: string;
}

// Mock fetchStudentAttempts function with types
const fetchStudentAttempts = async (): Promise<StudentAttempts[]> => {
    const allStudentAttempts: StudentAttempts[] = [
        { title: "Alice", uniqueId: "alice#1234", enrollmentType: "Free", progress: "50%", enrolledDate: "Dec 1, 2023", expiryDate: "Jun 1, 2024" },
        { title: "Bob", uniqueId: "bob#5678", enrollmentType: "Paid", progress: "30%", enrolledDate: "Nov 15, 2023", expiryDate: "May 15, 2024" },
        { title: "Charlie", uniqueId: "charlie#9101", enrollmentType: "Free", progress: "75%", enrolledDate: "Oct 1, 2023", expiryDate: "Apr 1, 2024" },
        { title: "Diana", uniqueId: "diana#1121", enrollmentType: "Paid", progress: "100%", enrolledDate: "Sep 1, 2023", expiryDate: "Mar 1, 2024" },
        { title: "Eve", uniqueId: "eve#3141", enrollmentType: "Free", progress: "10%", enrolledDate: "Jan 1, 2024", expiryDate: "Jul 1, 2024" },
        { title: "Frank", uniqueId: "frank#5161", enrollmentType: "Paid", progress: "0%", enrolledDate: "Feb 1, 2024", expiryDate: "Aug 1, 2024" },
        { title: "Grace", uniqueId: "grace#7181", enrollmentType: "Free", progress: "85%", enrolledDate: "Jul 15, 2023", expiryDate: "Jan 15, 2024" },
        { title: "Hank", uniqueId: "hank#9202", enrollmentType: "Paid", progress: "20%", enrolledDate: "Dec 10, 2023", expiryDate: "Jun 10, 2024" },
        { title: "Ivy", uniqueId: "ivy#1233", enrollmentType: "Free", progress: "45%", enrolledDate: "Nov 25, 2023", expiryDate: "May 25, 2024" },
        { title: "Jack", uniqueId: "jack#4567", enrollmentType: "Paid", progress: "100%", enrolledDate: "Aug 20, 2023", expiryDate: "Feb 20, 2024" }
    ];
    return allStudentAttempts;
};

function StudentsAttemptedTestseries() {
    const [data, setData] = useState<StudentAttempts[]>([]);
    const [studentAttempts, setStudentAttempts] = useState<StudentAttempts[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();
    const [popoveropen, setPopoveropen] = useState(false);
    const [isSelcetDateOpen, setIsSelectDateOpen] = useState(false);
    const [dateFilter, setDateFilter] = useState(null);
    const [statusFilter, setStatusFilter] = useState(null);
    const isTextSearch = searchTerm.trim().length > 0 && !dateFilter && !statusFilter;

    // Fetch StudentAttempts when component mounts
    useEffect(() => {
        const loadStudentAttempts = async () => {
            setLoading(true);
            const studentAttempts = await fetchStudentAttempts();
            setStudentAttempts(studentAttempts);
            setData(studentAttempts);
            setLoading(false);
        };
        loadStudentAttempts();
    }, []);

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = data.slice(firstItemIndex, lastItemIndex);

    // Function to handle tab click and navigate to a new route
    const handleTabClick = (path: string) => {
        router.push(path);
    };

    const [isRemoveOpen, setIsRemoveOpen] = useState(false);

    const openRemove = () => setIsRemoveOpen(true);
    const closeRemove = () => setIsRemoveOpen(false);

    const [uniqueId, setUniqueId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Store selected date as Date object

    useEffect(() => {
        let filterStudentsAttempts = studentAttempts;

        // Filter by search term
        if (searchTerm) {
            filterStudentsAttempts = filterStudentsAttempts.filter(student =>
                student.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by selected date
        if (selectedDate) {
            const selectedDateString = selectedDate instanceof Date && !isNaN(selectedDate.getTime())
                ? selectedDate.toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })
                : null;

            if (selectedDateString) {
                filterStudentsAttempts = filterStudentsAttempts.filter(student =>
                    student.enrolledDate === selectedDateString ||
                    student.expiryDate === selectedDateString
                );
            }
        }

        // Sort by studentsAttemptsPublishedDate in ascending order (earliest date first)
        filterStudentsAttempts = filterStudentsAttempts.sort((a, b) => {
            // Parse dates for both enrolled and expiry dates
            const dateA = new Date(a.enrolledDate).getTime();
            const dateB = new Date(b.enrolledDate).getTime();

            // Optionally, you can add a secondary sort by expiry date if enrolled dates are the same
            const expiryDateA = new Date(a.expiryDate).getTime();
            const expiryDateB = new Date(b.expiryDate).getTime();

            // Handle invalid date values
            if (isNaN(dateA) || isNaN(dateB)) {
                console.error("Invalid date value", a.enrolledDate, b.enrolledDate);
                return 0;
            }

            // Primary sort by enrolled date
            return dateA - dateB;
        });

        // Update state with filtered and sorted StudentsAttempts
        setData(filterStudentsAttempts);
        setCurrentPage(1); // Reset to first page when filters change
    }, [searchTerm, studentAttempts, selectedDate]);

    // Format selected date as 'Nov 9, 2024'
    const formattedDate = selectedDate
        ? selectedDate.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })
        : "Select dates";

    // Check if all fields are filled
    const isAddButtonDisabled = !uniqueId || !startDate || !endDate;

    return (
        <div className="flex flex-col w-full pt-4 gap-4">
            <div className="flex flex-row justify-between items-center">
                <button className="h-[44px] w-[250px] rounded-md bg-[#FFFFFF] shadow-sm border border-solid border-[#D0D5DD] flex items-center">
                    <div className="flex flex-row items-center w-full gap-2 pl-2">
                        <Image
                            src="/icons/search-button.svg"
                            width={20}
                            height={20}
                            alt="Search Button"
                        />
                        <input
                            className="font-normal text-[#667085] text-sm placeholder:text-[#A1A1A1] rounded-md w-full px-1 py-1 focus:outline-none focus:ring-0 border-none"
                            placeholder="Search"
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </button>
                <div className="flex flex-row gap-3">
                    {/* Select Date Button */}
                    <Popover placement="bottom" isOpen={isSelcetDateOpen} onOpenChange={(open) => setIsSelectDateOpen(open)}>
                        <PopoverTrigger>
                            <button className="h-[44px] w-[143px] rounded-md bg-[#FFFFFF] border border-solid border-[#D0D5DD] outline-none flex items-center p-3">
                                <Image
                                    src="/icons/select-Date.svg"
                                    width={20}
                                    height={20}
                                    alt="Select-date Button"
                                />
                                <span className="font-medium text-sm text-[#667085] ml-2">{formattedDate}</span>
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="flex flex-col gap-2 p-0 h-auto">
                            <Calendar
                                defaultValue={today(getLocalTimeZone())}
                                showMonthAndYearPickers
                                onChange={(value) => {
                                    const date = new Date(value.year, value.month - 1, value.day); // Adjust for zero-based month index
                                    setSelectedDate(date); // Update state with the new Date object
                                    setIsSelectDateOpen(false);
                                }}
                            />

                            {/* Conditionally render the "Clear" button */}
                            {selectedDate && (
                                <button
                                    className="min-w-[84px] min-h-[30px] rounded-md bg-[#9012FF] border border-[#800EE2] shadow-inner-button text-[14px] font-medium text-white mb-2 transition-colors duration-150 hover:bg-[#6D0DCC]"
                                    onClick={() => {
                                        setSelectedDate(null); // Clear the selected date
                                        setIsSelectDateOpen(false);
                                    }}
                                >
                                    Clear
                                </button>
                            )}
                        </PopoverContent>
                    </Popover>

                    <button className="h-[44px] w-[105px] rounded-md bg-[#FFFFFF] border border-solid border-[#D0D5DD] flex items-center justify-center gap-2">
                        <span className="font-medium text-sm text-[#667085] ml-2">Sort By</span>
                        <Image
                            src="/icons/chevron-down-dark-1.svg"
                            width={20}
                            height={20}
                            alt="arrow-down-dark-1"
                        />
                    </button>

                    <Popover placement="bottom-end"
                        isOpen={popoveropen}
                        onOpenChange={() => setPopoveropen(!popoveropen)} >
                        <PopoverTrigger>
                            <button className="flex flex-row items-center py-[0.625rem] px-6 gap-1 bg-purple border border-[#800EE2] rounded-md shadow-inner-button outline-none">
                                <Image src='/icons/plus-sign-white.svg' alt="add" width={18} height={18} />
                                <p className="text-sm text-white font-semibold">Add User</p>
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="flex flex-col w-[304px] h-auto p-6 gap-4 bg-white border border-lightGrey rounded-xl">
                            <div className="flex flex-col gap-2 w-full">
                                <div className="flex flex-col items-start gap-2">
                                    <p>Unique ID</p>
                                    <input
                                        type="text"
                                        placeholder="Enter Unique ID"
                                        className="w-full px-4 py-2 border border-[#D0D5DD] rounded-md outline-none placeholder:text-sm placeholder:text-[#667085]"
                                        value={uniqueId}
                                        onChange={(e) => setUniqueId(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col items-start gap-2">
                                    <p>Start Date</p>
                                    <div className="flex flex-row w-full px-3 py-2 gap-2 border border-[#D0D5DD] rounded-md">
                                        <Image src='/icons/calendar-03.svg' alt="date" width={24} height={24} />
                                        <input
                                            type="text"
                                            placeholder="Enter Start Date"
                                            className="w-full outline-none placeholder:text-sm placeholder:text-[#667085]"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col items-start gap-2">
                                    <p>End Date</p>
                                    <div className="flex flex-row w-full px-3 py-2 gap-2 border border-[#D0D5DD] rounded-md">
                                        <Image src='/icons/calendar-03.svg' alt="date" width={24} height={24} />
                                        <input
                                            type="text"
                                            placeholder="Enter End Date"
                                            className="w-full outline-none placeholder:text-sm placeholder:text-[#667085]"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row justify-between gap-4">
                                <button className="w-[120px] px-6 py-[0.625rem] h-11 text-sm text-[#1D2939] font-semibold border border-lightGrey rounded-md hover:bg-[#F2F4F7]"
                                    onClick={() => setPopoveropen(false)}>
                                    Cancel
                                </button>
                                <button
                                    className={`w-[120px] px-6 py-[0.625rem] h-11 text-sm font-semibold border shadow-inner-button rounded-md transition-opacity ease-in-out duration-150 
                                                    bg-[#9012FF] border-[#800EE2] text-white 
                                                    ${isAddButtonDisabled ? 'opacity-35 cursor-not-allowed' : 'opacity-100'}`}
                                    disabled={isAddButtonDisabled}
                                    onClick={() => { setPopoveropen(false); }}>
                                    Add
                                </button>
                            </div>

                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <div className="flex flex-col">
                <div className="border border-[#EAECF0] rounded-xl">
                    <table className="w-full bg-white rounded-xl">
                        <thead>
                            <tr>
                                <th className="w-1/4 text-left px-8 py-4 pl-8 rounded-tl-xl flex flex-row ">
                                    <span className="text-[#667085] font-medium text-sm">Name</span>
                                    <Image src="/icons/expandall.svg" width={28} height={18} alt="Expand all icon" />
                                </th>
                                <th className=" w-[17%] text-center px-8 py-4 text-[#667085] font-medium text-sm">
                                    <div className="flex flex-row justify-center gap-1">
                                        <p>Enrollment Type</p>
                                        <Image src='/icons/unfold-more-round.svg' alt="" width={16} height={16} />
                                    </div>
                                </th>
                                <th className=" w-[17%] text-center px-8 py-4 text-[#667085] font-medium text-sm">
                                    <div className="flex flex-row justify-center gap-1">
                                        <p>Progress</p>
                                        <Image src='/icons/unfold-more-round.svg' alt="" width={16} height={16} />
                                    </div>
                                </th>
                                <th className=" w-[17%] text-center px-8 py-4 text-[#667085] font-medium text-sm">
                                    <div className="flex flex-row justify-center gap-1">
                                        <p>Enrollment Date</p>
                                        <Image src='/icons/unfold-more-round.svg' alt="" width={16} height={16} />
                                    </div>
                                </th>
                                <th className=" w-[17%] text-center px-8 py-4 rounded-tr-xl text-[#667085] font-medium text-sm">
                                    <div className="flex flex-row justify-center gap-1">
                                        <p>Expiry Date</p>
                                        <Image src='/icons/unfold-more-round.svg' alt="" width={16} height={16} />
                                    </div>
                                </th>
                                <th className="w-[12%] text-center px-8 py-4 rounded-tr-xl text-[#667085] font-medium text-sm">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                currentItems.map((students, index) => (
                                    <tr key={index} className="border-t border-solid border-[#EAECF0]">
                                        <td className="py-2">
                                            <div className="flex flex-row ml-8 gap-2">
                                                <div className="flex items-center">
                                                    <div className="relative">
                                                        <Image src='/images/DP_Lion.svg' alt="DP" width={40} height={40} />
                                                        <Image className="absolute right-0 bottom-0" src='/icons/winnerBatch.svg' alt="Batch" width={18} height={18} />
                                                    </div>
                                                </div>
                                                <div className="flex items-start justify-start flex-col">
                                                    <div className="font-semibold">{students.title}</div>
                                                    <div className="flex justify-start items-start text-[13px] text-[#667085]">{students.uniqueId}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4 text-center text-[#101828] text-sm">{students.enrollmentType}</td>
                                        <td className="px-8 py-4 text-center text-[#101828] text-sm">{students.progress}</td>
                                        <td className="px-8 py-4 text-center text-[#101828] text-sm">{students.enrolledDate}</td>
                                        <td className="px-8 py-4 text-center text-[#101828] text-sm">{students.expiryDate}</td>
                                        <td className="flex items-center justify-center px-8 py-4 text-[#101828] text-sm">
                                            <Popover placement="bottom-end">
                                                <PopoverTrigger>
                                                    <button className="outline-none">
                                                        <Image
                                                            src="/icons/three-dots.svg"
                                                            width={20}
                                                            height={20}
                                                            alt="More Actions"
                                                        />
                                                    </button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-[10.438rem] py-1 px-0 bg-white border border-lightGrey rounded-md">
                                                    <button className="flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#F2F4F7] outline-none">
                                                        <Image src='/icons/user-account.svg' alt="user profile" width={18} height={18} />
                                                        <p className="text-sm text-[#0C111D] font-normal">Go to Profile</p>
                                                    </button>
                                                    <button className=" flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#F2F4F7] outline-none"
                                                        onClick={openRemove}>
                                                        <Image src='/icons/delete.svg' alt="user profile" width={18} height={18} />
                                                        <p className="text-sm text-[#DE3024] font-normal">Remove</p>
                                                    </button>
                                                </PopoverContent>
                                            </Popover>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className='border-t border-lightGrey'>
                                    <td colSpan={6} className="text-center py-8">
                                        {isTextSearch && (
                                            <p className="text-[#667085] text-sm">
                                                No students found for &quot;{searchTerm}&quot;
                                            </p>
                                        )}
                                        {!isTextSearch && (
                                            <p className="text-[#667085] text-sm">
                                                No students found
                                            </p>
                                        )}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Section */}
                <div>
                    <div className="flex justify-right">
                        <PaginationSection
                            totalItems={data.length}
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                </div>
            </div>
            {isRemoveOpen && < Remove onClose={closeRemove} open={true} />}
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

export default StudentsAttemptedTestseries;