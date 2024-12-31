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

// Define types for students attempted data
interface StudentsAttempts {
    title: string;
    uniqueId: string;
    dateTime: string;
    score: string;
    timeTaken: string;
    ranking: string;
}

// Mock fetchStudentAttempts function with types
const fetchStudentsAttempts = async (): Promise<StudentsAttempts[]> => {
    const allStudentsAttempts: StudentsAttempts[] = [
        { title: "Jenny", uniqueId: "jenny#8547", dateTime: "06 Jan, 2024 07:30 PM", score: "78", timeTaken: "1 hr 15 mins", ranking: "15" },
        { title: "Tom", uniqueId: "tom#7453", dateTime: "08 Jan, 2024 06:00 PM", score: "65", timeTaken: "50 mins", ranking: "45" },
        { title: "Alice", uniqueId: "alice#1234", dateTime: "10 Jan, 2024 09:15 AM", score: "85", timeTaken: "1 hr", ranking: "8" },
        { title: "Harry", uniqueId: "harry#5678", dateTime: "12 Jan, 2024 11:45 AM", score: "92", timeTaken: "1 hr 20 mins", ranking: "3" },
        { title: "Sophia", uniqueId: "sophia#9801", dateTime: "14 Jan, 2024 04:00 PM", score: "54", timeTaken: "35 mins", ranking: "80" },
        { title: "Mia", uniqueId: "mia#3210", dateTime: "16 Jan, 2024 08:20 PM", score: "47", timeTaken: "40 mins", ranking: "120" },
        { title: "Oliver", uniqueId: "oliver#1112", dateTime: "18 Jan, 2024 01:10 PM", score: "88", timeTaken: "1 hr 10 mins", ranking: "12" },
        { title: "Emma", uniqueId: "emma#3345", dateTime: "20 Jan, 2024 03:25 PM", score: "73", timeTaken: "55 mins", ranking: "25" },
        { title: "Liam", uniqueId: "liam#7689", dateTime: "22 Jan, 2024 07:00 AM", score: "67", timeTaken: "50 mins", ranking: "40" },
        { title: "Ava", uniqueId: "ava#5567", dateTime: "24 Jan, 2024 02:30 PM", score: "95", timeTaken: "1 hr 25 mins", ranking: "1" }
    ];
    return allStudentsAttempts;
};

function StudentsAttemptedTestseries() {
    const [data, setData] = useState<StudentsAttempts[]>([]);
    const [StudentsAttempts, setStudentAttempts] = useState<StudentsAttempts[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();
    const [isSelcetDateOpen, setIsSelectDateOpen] = useState(false);
    const [dateFilter, setDateFilter] = useState(null);
    const isTextSearch = searchTerm.trim().length > 0 && !dateFilter;

    // Fetch StudentAttempts when component mounts
    useEffect(() => {
        const loadStudentsAttempts = async () => {
            setLoading(true);
            const studentsAttempts = await fetchStudentsAttempts();
            setStudentAttempts(studentsAttempts);
            setData(studentsAttempts);
            setLoading(false);
        };
        loadStudentsAttempts();
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

    // Check if all fields are filled
    const isAddButtonDisabled = !uniqueId || !startDate || !endDate;

    const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Store selected date as Date object

    useEffect(() => {
        let filterStudentsAttempts = StudentsAttempts;

        // Filter by search term
        if (searchTerm) {
            filterStudentsAttempts = filterStudentsAttempts.filter(student =>
                student.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by selected date
        if (selectedDate) {
            const selectedDateString = selectedDate instanceof Date && !isNaN(selectedDate.getTime())
                ? selectedDate.toISOString().split('T')[0] // Convert to YYYY-MM-DD
                : null;

            if (selectedDateString) {
                filterStudentsAttempts = filterStudentsAttempts.filter(student => {
                    const studentAttemptsDate = new Date(student.dateTime); // Convert StudentAttempts.date string to Date object
                    const studentAttemptsDateString = studentAttemptsDate instanceof Date && !isNaN(studentAttemptsDate.getTime())
                        ? studentAttemptsDate.toISOString().split('T')[0]
                        : null;

                    return studentAttemptsDateString === selectedDateString; // Compare only the date part (not time)
                });
            }
        }

        // Sort by StudentAttemptsPublishedDate in ascending order (earliest date first)
        filterStudentsAttempts = filterStudentsAttempts.sort((a, b) => {
            const dateA = new Date(a.dateTime).getTime();
            const dateB = new Date(b.dateTime).getTime();

            // Handle invalid date values (e.g., when date cannot be parsed)
            if (isNaN(dateA) || isNaN(dateB)) {
                console.error("Invalid date value", a.dateTime, b.dateTime);
                return 0; // If dates are invalid, no sorting will occur
            }

            return dateA - dateB; // Sort by time in ascending order (earliest first)
        });

        // Update state with filtered and sorted StudentAttempts
        setData(filterStudentsAttempts);
        setCurrentPage(1); // Reset to first page when filters change
    }, [searchTerm, StudentsAttempts, selectedDate]);

    // Format selected date as 'Nov 9, 2024'
    const formattedDate = selectedDate
        ? selectedDate.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })
        : "Select dates";

    return (
        <div className="flex flex-col w-full mt-4 gap-4">
            <div className="flex flex-row justify-between items-center">
                <span className="text-lg font-semibold text-[#1D2939]">Students attempted (2547)</span>
                <div className="flex flex-row gap-3">
                    {/* Search Button */}
                    <button className="h-[44px] w-[250px] rounded-md bg-[#FFFFFF] border border-solid border-[#D0D5DD] flex items-center">
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
                                    className="min-w-[84px] min-h-[30px] rounded-md bg-[#9012FF] text-[14px] font-medium text-white mb-2"
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


                </div>
            </div>

            <div className="flex flex-col">
                <div className="border border-[#EAECF0] rounded-xl">
                    <table className="w-full bg-white rounded-xl">
                        <thead>
                            <tr>
                                <th className="text-left px-8 py-4 pl-8 rounded-tl-xl flex flex-row ">
                                    <span className="text-[#667085] font-medium text-sm">Name</span>
                                </th>
                                <th className="text-center px-8 py-4 text-[#667085] font-medium text-sm">
                                    <div className="flex flex-row justify-center gap-1">
                                        <p>Date & Time</p>
                                        <Image src='/icons/unfold-more-round.svg' alt="" width={16} height={16} />
                                    </div>
                                </th>
                                <th className="text-center px-8 py-4 text-[#667085] font-medium text-sm">
                                    <div className="flex flex-row justify-center gap-1">
                                        <p>Score</p>
                                        <Image src='/icons/unfold-more-round.svg' alt="" width={16} height={16} />
                                    </div>
                                </th>
                                <th className="text-center px-8 py-4 text-[#667085] font-medium text-sm">
                                    <div className="flex flex-row justify-center gap-1">
                                        <p>Time Taken</p>
                                        <Image src='/icons/unfold-more-round.svg' alt="" width={16} height={16} />
                                    </div>
                                </th>
                                <th className="text-center px-8 py-4 rounded-tr-xl text-[#667085] font-medium text-sm">
                                    <div className="flex flex-row justify-center gap-1">
                                        <p>Ranking</p>
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
                                        <td className="px-8 py-4 text-center text-[#101828] text-sm">{students.dateTime}</td>
                                        <td className="px-8 py-4 text-center text-[#101828] text-sm">{students.score}</td>
                                        <td className="px-8 py-4 text-center text-[#101828] text-sm">{students.timeTaken}</td>
                                        <td className="px-8 py-4 text-center text-[#101828] text-sm">{students.ranking}</td>
                                        <td className="flex items-center justify-center px-8 py-4 text-[#101828] text-sm">
                                            <Popover placement="bottom-end">
                                                <PopoverTrigger>
                                                    <button>
                                                        <Image
                                                            src="/icons/three-dots.svg"
                                                            width={20}
                                                            height={20}
                                                            alt="More Actions"
                                                        />
                                                    </button>
                                                </PopoverTrigger>
                                                <PopoverContent>
                                                    <div className="w-[10.438rem] py-1 bg-white border border-lightGrey rounded-md">
                                                        <button className="flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#F2F4F7]">
                                                            <Image src='/icons/user-account.svg' alt="user profile" width={18} height={18} />
                                                            <p className="text-sm text-[#0C111D] font-normal">Go to Profile</p>
                                                        </button>
                                                        <button className=" flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#F2F4F7]"
                                                            onClick={openRemove}>
                                                            <Image src='/icons/delete.svg' alt="user profile" width={18} height={18} />
                                                            <p className="text-sm text-[#DE3024] font-normal">Remove</p>
                                                        </button>
                                                    </div>
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