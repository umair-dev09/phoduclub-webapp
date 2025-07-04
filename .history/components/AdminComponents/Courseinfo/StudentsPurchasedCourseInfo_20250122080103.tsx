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

// Define types for student data
interface StudentPurchased {
    title: string;
    uniqueId: string;
    enrollmentType: string;
    progress: number;
    enrolledDate: string;
    status: 'Live' | 'Paused' | 'Finished' | 'Scheduled' | 'Cancelled' | 'Saved';
}

// Mock fetchstudents function with types
const fetchStudents = async (): Promise<StudentPurchased[]> => {
    const allStudents: StudentPurchased[] = [
        { title: "John Doe", uniqueId: "john#1234", enrollmentType: "Free", progress: 50, enrolledDate: "Dec 1, 2023", status: "Live" },
        { title: "Jane Smith", uniqueId: "jane#5678", enrollmentType: "Paid", progress: 30, enrolledDate: "Nov 15, 2023", status: "Saved" },
        { title: "Alice Johnson", uniqueId: "alice#9101", enrollmentType: "Free", progress: 75, enrolledDate: "Oct 1, 2023", status: "Paused" },
        { title: "Robert Brown", uniqueId: "robert#1122", enrollmentType: "Paid", progress: 100, enrolledDate: "Sep 1, 2023", status: "Finished" },
        { title: "Emily Davis", uniqueId: "emily#3344", enrollmentType: "Free", progress: 10, enrolledDate: "Jan 1, 2024", status: "Scheduled" },
        { title: "Michael Wilson", uniqueId: "michael#5566", enrollmentType: "Paid", progress: 0, enrolledDate: "Feb 1, 2024", status: "Cancelled" },
        { title: "Sophia Moore", uniqueId: "sophia#7788", enrollmentType: "Free", progress: 85, enrolledDate: "Jul 15, 2023", status: "Live" },
        { title: "Chris Taylor", uniqueId: "chris#9900", enrollmentType: "Paid", progress: 20, enrolledDate: "Dec 10, 2023", status: "Saved" },
        { title: "Olivia Martinez", uniqueId: "olivia#1112", enrollmentType: "Free", progress: 45, enrolledDate: "Nov 25, 2023", status: "Paused" },
        { title: "Daniel Garcia", uniqueId: "daniel#1314", enrollmentType: "Paid", progress: 100, enrolledDate: "Aug 20, 2023", status: "Finished" }
    ];
    return allStudents;
};

function StudentsPurchasedCourseInfo() {
    const [data, setData] = useState<StudentPurchased[]>([]);
    const [students, setStudents] = useState<StudentPurchased[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [popoveropen, setPopoveropen] = useState(false);
    const router = useRouter();
    const [isSelcetDateOpen, setIsSelectDateOpen] = useState(false);
    const [dateFilter, setDateFilter] = useState(null);
    const [statusFilter, setStatusFilter] = useState(null);
    const isTextSearch = searchTerm.trim().length > 0 && !dateFilter && !statusFilter;
    const [popoveropen2, setPopoveropen2] = useState<number | null>(null);
    const [popoveropen1, setPopoveropen1] = useState(false);
    // Fetch students when component mounts
    useEffect(() => {
        const loadStudents = async () => {
            setLoading(true);
            const students = await fetchStudents();
            setStudents(students);
            setData(students);
            setLoading(false);
        };
        loadStudents();
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

    // Format selected date as 'Nov 9, 2024'
    const formattedDate = selectedDate
        ? selectedDate.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })
        : "Select dates";

    const [enrollmentFilter, setEnrollmentFilter] = useState<string | null>(null);
    const [sortConfig, setSortConfig] = useState<{
        key: string;
        direction: 'asc' | 'desc' | null;
    }>({
        key: '',
        direction: null
    });

    const handleClear = () => {
        setSortConfig({ key: '', direction: null }); // Reset sorting
        setSearchTerm(''); // Clear search term
        setSelectedDate(null); // Clear selected date
        setEnrollmentFilter(null); // Clear enrollment filter
        setData(students); // Reset table data to the original list
        setCurrentPage(1); // Reset to the first page
    };

    useEffect(() => {
        let filteredStudentsPurchased = students;

        // Filter by search term
        if (searchTerm) {
            filteredStudentsPurchased = filteredStudentsPurchased.filter(course =>
                course.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (enrollmentFilter) {
            filteredStudentsPurchased = filteredStudentsPurchased.filter(student =>
                student.enrollmentType === enrollmentFilter
            );
        }

        // Filter by selected date
        if (selectedDate) {
            const selectedDateString = selectedDate instanceof Date && !isNaN(selectedDate.getTime())
                ? selectedDate.toISOString().split('T')[0] // Convert to YYYY-MM-DD
                : null;

            if (selectedDateString) {
                filteredStudentsPurchased = filteredStudentsPurchased.filter(course => {
                    const courseDate = new Date(course.enrolledDate); // Convert quiz.date string to Date object
                    const courseDateString = courseDate instanceof Date && !isNaN(courseDate.getTime())
                        ? courseDate.toISOString().split('T')[0]
                        : null;

                    return courseDateString === selectedDateString; // Compare only the date part (not time)
                });
            }
        }

        // Sort by quizPublishedDate in ascending order (earliest date first)
        filteredStudentsPurchased = filteredStudentsPurchased.sort((a, b) => {
            const dateA = new Date(a.enrolledDate).getTime();
            const dateB = new Date(b.enrolledDate).getTime();

            // Handle invalid date values (e.g., when date cannot be parsed)
            if (isNaN(dateA) || isNaN(dateB)) {
                console.error("Invalid date value", a.enrolledDate, b.enrolledDate);
                return 0; // If dates are invalid, no sorting will occur
            }

            return dateA - dateB; // Sort by time in ascending order (earliest first)
        });

        if (sortConfig.key && sortConfig.direction) {
            filteredStudentsPurchased = filteredStudentsPurchased.sort((a, b) => {
                if (sortConfig.key === 'progress') {
                    return sortConfig.direction === 'asc'
                        ? a.progress - b.progress
                        : b.progress - a.progress;
                } else if (sortConfig.key === 'enrolledDate') {
                    const dateA = new Date(a[sortConfig.key]).getTime();
                    const dateB = new Date(b[sortConfig.key]).getTime();
                    return sortConfig.direction === 'asc'
                        ? dateA - dateB
                        : dateB - dateA;
                }
                return 0;
            });
        }

        // Update state with filtered and sorted quizzes
        setData(filteredStudentsPurchased);
        setCurrentPage(1); // Reset to first page when filters change
    }, [searchTerm, students, selectedDate, sortConfig]);

    const handleSort = (key: string) => {
        setSortConfig((prevConfig) => {
            // Cycle through: no sort -> asc -> desc -> no sort
            if (prevConfig.key !== key || !prevConfig.direction) {
                return { key, direction: 'asc' };
            } else if (prevConfig.direction === 'asc') {
                return { key, direction: 'desc' };
            } else {
                return { key: '', direction: null }; // Reset to original order
            }
        });
    };

    const handlePopoverOpen = (index: number) => {
        setPopoveropen2(index);
    };


    return (
        <div className="flex flex-col w-full mt-4 gap-4">
            <div className="flex flex-row justify-between items-center">
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
                                    className="min-w-[84px] min-h-[30px] rounded-md bg-[#9012FF] text-[14px] font-medium text-white mb-2 shadow-inner-button transition-colors duration-150 hover:bg-[#6D0DCC]"
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

                    {/* Sort Button */}
                    <Popover placement="bottom"
                        isOpen={popoveropen1}
                        onOpenChange={(open) => setPopoveropen1(open)}>
                        <PopoverTrigger>
                            <button className="h-[44px] w-[105px] rounded-md bg-[#FFFFFF] border border-solid border-[#D0D5DD] flex items-center justify-center gap-2 outline-none">
                                <span className="font-medium text-sm text-[#667085] ml-2">
                                    {enrollmentFilter || "Sort By"}
                                </span>
                                <Image
                                    src="/icons/chevron-down-dark-1.svg"
                                    width={20}
                                    height={20}
                                    alt="arrow-down-dark-1"
                                />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="flex flex-col w-28 h-auto px-0 py-1 bg-white border border-lightGrey rounded-md">
                            <div
                                className="flex flex-row items-center w-full my-0 py-[0.625rem] px-4 gap-2 cursor-pointer transition-colors hover:bg-[#F2F4F7]"
                                onClick={() => {
                                    setEnrollmentFilter('Free');
                                    setSortConfig({ key: '', direction: null });
                                    setPopoveropen1(false);
                                }}
                            >
                                <p className={`text-sm ${enrollmentFilter === 'Free' ? 'font-medium text-purple' : 'font-normal text-[#0C111D]'}`}>
                                    Free
                                </p>
                                {enrollmentFilter === 'Free' && (
                                    <Image src="/icons/check.svg" width={16} height={16} alt="Selected" />
                                )}
                            </div>
                            <div
                                className="flex flex-row items-center w-full my-0 py-[0.625rem] px-4 gap-2 cursor-pointer transition-colors hover:bg-[#F2F4F7]"
                                onClick={() => {
                                    setEnrollmentFilter('Paid');
                                    setSortConfig({ key: '', direction: null });
                                    setPopoveropen1(false);
                                }}
                            >
                                <p className={`text-sm ${enrollmentFilter === 'Paid' ? 'font-medium text-purple' : 'font-normal text-[#0C111D]'}`}>
                                    Paid
                                </p>
                                {enrollmentFilter === 'Paid' && (
                                    <Image src="/icons/check.svg" width={16} height={16} alt="Selected" />
                                )}
                            </div>
                            {enrollmentFilter && (
                                <div
                                    className="flex flex-row items-center w-full my-0 py-[0.625rem] px-4 gap-2 cursor-pointer transition-colors hover:bg-[#F2F4F7] border-t border-lightGrey"
                                    onClick={() => { handleClear(); setPopoveropen1(false); }}
                                >
                                    <p className="text-sm font-normal text-[#0C111D]">Clear</p>
                                </div>
                            )}
                        </PopoverContent>
                    </Popover>

                    {/* <Popover placement="bottom-end"
                        isOpen={popoveropen}
                        onOpenChange={() => setPopoveropen(!popoveropen)} >
                        <PopoverTrigger>
                            <button className="flex flex-row items-center py-[0.625rem] px-6 gap-1 bg-purple border border-[#800EE2] rounded-md shadow-inner-button transition-colors duration-150 hover:bg-[#6D0DCC]">
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
                                <button className="w-[120px] px-6 py-[0.625rem] h-11 text-sm text-[#1D2939] font-semibold border border-lightGrey rounded-md"
                                    onClick={() => setPopoveropen(false)}>
                                    Cancel
                                </button>
                                <button
                                    className={`w-[120px] px-6 py-[0.625rem] h-11 text-sm font-semibold border shadow-inner-button rounded-md transition-all ease-in-out duration-150 
                                                    bg-[#9012FF] border-[#800EE2] text-white 
                                                    ${isAddButtonDisabled ? 'opacity-35 cursor-not-allowed' : 'opacity-100 hover:bg-[#6D0DCC]'}`}
                                    disabled={isAddButtonDisabled}
                                    onClick={() => { setPopoveropen(false); }}>
                                    Add
                                </button>
                            </div>

                        </PopoverContent>
                    </Popover> */}
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
                                        <p>Enrollment</p>
                                    </div>
                                </th>
                                <th className="text-center px-8 py-4 text-[#667085] font-medium text-sm cursor-pointer"
                                    onClick={() => handleSort('progress')}
                                >
                                    <div className="flex flex-row justify-center gap-1">
                                        <p>Progress</p>
                                        <Image src='/icons/unfold-more-round.svg' alt="" width={16} height={16} />
                                    </div>
                                </th>
                                <th className="text-center px-8 py-4 text-[#667085] font-medium text-sm cursor-pointer"
                                    onClick={() => handleSort('enrolledDate')}
                                >
                                    <div className="flex flex-row justify-center gap-1">
                                        <p>Enrollment Date</p>
                                        <Image src='/icons/unfold-more-round.svg' alt="" width={16} height={16} />
                                    </div>
                                </th>
                                <th className="w-[12%] text-center px-8 py-4 rounded-tr-xl text-[#667085] font-medium text-sm">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                currentItems.map((student, index) => (
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
                                                    <div className="font-semibold">{student.title}</div>
                                                    <div className="flex justify-start items-start text-[13px] text-[#667085]">{student.uniqueId}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4 text-center text-[#101828] text-sm">{student.enrollmentType}</td>
                                        <td className="px-8 py-4 text-center text-[#101828] text-sm">{student.progress}%</td>
                                        <td className="px-8 py-4 text-center text-[#101828] text-sm">{student.enrolledDate}</td>
                                        <td className="flex items-center justify-center px-8 py-4 text-[#101828] text-sm">
                                            <Popover placement="bottom-end"
                                                isOpen={popoveropen2 === index}
                                                onOpenChange={(open) => open ? handlePopoverOpen(index) : setPopoveropen2(null)}>
                                                <PopoverTrigger>
                                                    <button
                                                        className="w-[32px] h-[32px] rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]"

                                                    >
                                                        <button className="focus:outline-none">
                                                            <Image
                                                                src="/icons/three-dots.svg"
                                                                width={20}
                                                                height={20}
                                                                alt="More Actions"
                                                            />
                                                        </button>
                                                    </button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-[10.438rem] py-1 px-0 bg-white border border-lightGrey rounded-md">
                                                    <button className="flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#F2F4F7]">
                                                        <Image src='/icons/user-account.svg' alt="user profile" width={18} height={18} />
                                                        <p className="text-sm text-[#0C111D] font-normal">Go to Profile</p>
                                                    </button>
                                                    <button className=" flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2  hover:bg-[#FEE4E2]"
                                                        onClick={() => {
                                                            { setIsRemoveOpen(true) };
                                                            setPopoveropen2(null);
                                                        }}>
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
                                    <td colSpan={5} className="text-center py-8">
                                        {isTextSearch && (
                                            <p className="text-[#667085] text-sm">
                                                No users found for &quot;{searchTerm}&quot;
                                            </p>
                                        )}
                                        {!isTextSearch && (
                                            <p className="text-[#667085] text-sm">
                                                No users found
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
            {isRemoveOpen && < Remove onClose={() => setIsRemoveOpen(false)} open={isRemoveOpen} />}
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

export default StudentsPurchasedCourseInfo;