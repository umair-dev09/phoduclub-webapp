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
import { db } from "@/firebase";
import { collection, getDoc, onSnapshot, doc as firestoreDoc, getDocs, query, where, deleteDoc } from "firebase/firestore";
import LoadingData from "@/components/Loading";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { format } from "date-fns";

// Define types for students attempted data
interface StudentsAttempts {
    userId: string;
    attemptDate: {
        seconds: number;
        nanoseconds: number;
    };
    score: number;
    timeTaken: number;
    ranking: number;
    name: string;
    profilePic: string;
    isPremium: boolean;
    displayUserId: string;
}

interface StudentsAttemptsProps {
    quizId: string;
}

const formatTime = (seconds: number): string => {
    if (seconds < 60) {
        return `${seconds}s`;
    } else if (seconds < 3600) {
        return `${Math.floor(seconds / 60)}m`;
    } else {
        return `${Math.floor(seconds / 3600)}hrs`;
    }
};

function StudentsAttemptedQuiz({ quizId }: StudentsAttemptsProps) {
    const [data, setData] = useState<StudentsAttempts[]>([]);
    const [filteredAttempts, setFilteredAttempts] = useState<StudentsAttempts[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();
    const [isSelcetDateOpen, setIsSelectDateOpen] = useState(false);
    const [dateFilter, setDateFilter] = useState<Date | null>(null);
    const [popoveropen, setPopoveropen] = useState<number | null>(null);
    const isTextSearch = searchTerm.trim().length > 0 && !dateFilter;

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                handleRemoveUser(userToRemove);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    // Fetch StudentAttempts when component mounts
    useEffect(() => {
        const loadStudentsAttempts = async () => {
            setLoading(true);
            try {
                const attemptsRef = collection(db, 'quiz', quizId, 'attempts');
                const attemptsSnapshot = await getDocs(attemptsRef);

                // Group all user IDs to fetch them in a single batch
                const userIds = new Set(attemptsSnapshot.docs.map(doc => doc.data().userId));

                // Fetch all user data in a single batch
                const userRefs = Array.from(userIds).map(uid => firestoreDoc(db, 'users', uid));
                const userDocs = await getDocs(query(collection(db, 'users'), where('__name__', 'in', Array.from(userIds))));

                // Create a map of user data for quick lookup
                const userDataMap = new Map();
                userDocs.forEach(doc => {
                    userDataMap.set(doc.id, doc.data());
                });

                // Process attempts data with user info
                const attemptsData = attemptsSnapshot.docs.map(doc => {
                    const attemptData = doc.data();
                    const userData = userDataMap.get(attemptData.userId) || {};

                    return {
                        userId: attemptData.userId,
                        attemptDate: attemptData.attemptDate,
                        score: attemptData.score,
                        timeTaken: attemptData.timeTaken,
                        name: userData.name || 'Unknown',
                        profilePic: userData.profilePic || '',
                        isPremium: userData.isPremium || false,
                        displayUserId: userData.userId || '',
                        ranking: 0 // Will be calculated after sorting
                    };
                });

                // Sort by score and assign rankings
                attemptsData.sort((a, b) => b.score - a.score);
                attemptsData.forEach((attempt, index) => {
                    attempt.ranking = index + 1;
                });

                setData(attemptsData);
            } catch (error) {
                console.error('Error fetching attempts:', error);
            } finally {
                setLoading(false);
            }
        };

        loadStudentsAttempts();
    }, [quizId]);

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = data.slice(firstItemIndex, lastItemIndex);

    const [sortConfig, setSortConfig] = useState<{
        key: string;
        direction: 'asc' | 'desc' | null;
    }>({
        key: '',
        direction: null
    });

    const handleRemoveUser = async (userId: string) => {
        try {
            const attemptRef = firestoreDoc(db, 'quiz', quizId, 'attempts', userId);
            await deleteDoc(attemptRef);

            // Update local state to remove the user
            setData(prev => prev.filter(student => student.userId !== userId));

            // Close the remove dialog
            closeRemove();
        } catch (error) {
            console.error('Error removing user attempt:', error);
        }
    };

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
    const [userToRemove, setUserToRemove] = useState('');

    // Check if all fields are filled
    const isAddButtonDisabled = !uniqueId || !startDate || !endDate;

    const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Store selected date as Date object

    const convertTimeToString = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        const parts = [];
        if (hours > 0) {
            parts.push(`${hours} hr`);
        }
        if (minutes > 0) {
            parts.push(`${minutes} min`);
        }
        if (remainingSeconds > 0 || parts.length === 0) {
            parts.push(`${remainingSeconds} sec`);
        }

        return parts.join(' ');
    };

    useEffect(() => {
        let filterStudentsAttempts = data;

        // Filter by search term
        if (searchTerm) {
            filterStudentsAttempts = filterStudentsAttempts.filter(student =>
                student.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by selected date
        if (selectedDate) {
            const selectedDateString = selectedDate instanceof Date && !isNaN(selectedDate.getTime())
                ? selectedDate.toISOString().split('T')[0] // Convert to YYYY-MM-DD
                : null;

            if (selectedDateString) {
                filterStudentsAttempts = filterStudentsAttempts.filter(student => {
                    const studentAttemptsDate = new Date(student.attemptDate.seconds * 1000); // Convert StudentAttempts.date string to Date object
                    const studentAttemptsDateString = studentAttemptsDate instanceof Date && !isNaN(studentAttemptsDate.getTime())
                        ? studentAttemptsDate.toISOString().split('T')[0]
                        : null;

                    return studentAttemptsDateString === selectedDateString; // Compare only the date part (not time)
                });
            }
        }

        // Sort by StudentAttemptsPublishedDate in ascending order (earliest date first)
        filterStudentsAttempts = filterStudentsAttempts.sort((a, b) => {
            const dateA = new Date(a.attemptDate.seconds * 1000).getTime();
            const dateB = new Date(b.attemptDate.seconds * 1000).getTime();

            // Handle invalid date values (e.g., when date cannot be parsed)
            if (isNaN(dateA) || isNaN(dateB)) {
                console.error("Invalid date value", a.attemptDate, b.attemptDate);
                return 0; // If dates are invalid, no sorting will occur
            }

            return dateA - dateB; // Sort by time in ascending order (earliest first)
        });

        if (sortConfig.key && sortConfig.direction) {
            filterStudentsAttempts = filterStudentsAttempts.sort((a, b) => {
                if (sortConfig.key === 'score') {
                    return sortConfig.direction === 'asc'
                        ? a.score - b.score
                        : b.score - a.score;
                }
                if (sortConfig.key === 'ranking') {
                    return sortConfig.direction === 'asc'
                        ? a.ranking - b.ranking
                        : b.ranking - a.ranking;
                }
                if (sortConfig.key === 'timeTaken') {
                    return sortConfig.direction === 'asc'
                        ? a.timeTaken - b.timeTaken
                        : b.timeTaken - a.timeTaken;
                }
                return 0;
            });
        }

        // Update state with filtered and sorted StudentAttempts
        setFilteredAttempts(filterStudentsAttempts);
        setCurrentPage(1); // Reset to first page when filters change
    }, [searchTerm, data, selectedDate, sortConfig]);

    const handleSort = (key: string) => {
        if (key === 'score' || key === 'ranking' || key === 'timeTaken') {  // Added 'timeTaken'
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
        }
    };

    // Format selected date as 'Nov 9, 2024'
    const formattedDate = selectedDate
        ? selectedDate.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })
        : "Select dates";

    const handlePopoverOpen = (index: number) => {
        setPopoveropen(index);
    };

    if (loading) {
        return <LoadingData />;
    }

    return (
        <div className="flex flex-col w-full mt-4 gap-4">
            <div className="flex flex-row justify-between items-center">
                <span className="text-lg font-semibold text-[#1D2939]">Students attempted ({data.length || 0})</span>
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
                                    className="min-w-[84px] min-h-[30px] rounded-md bg-[#9012FF] border border-[#800EE2] shadow-inner-button transition-colors duration-150 hover:bg-[#6D0DCC] text-[14px] font-medium text-white mb-2"
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
                                <th
                                    className="text-center px-8 py-4 text-[#667085] font-medium text-sm cursor-pointer [&_*]:select-none [&_*]:-webkit-user-select-none [&_*]:-moz-user-select-none [&_*]:-ms-user-select-none"
                                    onClick={() => handleSort('score')}
                                >
                                    <div className="flex flex-row justify-center gap-1">
                                        <p>Score</p>
                                        <Image src='/icons/unfold-more-round.svg' alt="" width={16} height={16} />
                                    </div>
                                </th>
                                <th className="text-center px-8 py-4 text-[#667085] font-medium text-sm cursor-pointer"
                                    onClick={() => handleSort('timeTaken')}
                                >
                                    <div
                                        className="flex flex-row justify-center gap-1"
                                    >
                                        <p>Time Taken</p>
                                        <Image src='/icons/unfold-more-round.svg' alt="" width={16} height={16} />
                                    </div>
                                </th>
                                <th className="text-center px-8 py-4 rounded-tr-xl text-[#667085] font-medium text-sm cursor-pointer"
                                    onClick={() => handleSort('ranking')}
                                >
                                    <div
                                        className="flex flex-row justify-center gap-1"
                                    >
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
                                                        <Image className="rounded-full w-10 h-10" src={students.profilePic || '/images/DP_Lion.svg'} alt="DP" width={40} height={40} />
                                                        {students.isPremium && <Image className="absolute right-0 bottom-0" src='/icons/winnerBatch.svg' alt="Batch" width={18} height={18} />}
                                                    </div>
                                                </div>
                                                <div className="flex items-start justify-start flex-col">
                                                    <div className="font-semibold">{students.name}</div>
                                                    <div className="flex justify-start items-start text-[13px] text-[#667085]">{students.displayUserId}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4 text-center text-[#101828] text-sm">{students.attemptDate ? format(new Date(students.attemptDate.seconds * 1000), 'MMM d, yyyy h:mm a') : '-'}</td>
                                        <td className="px-8 py-4 text-center text-[#101828] text-sm">{students.score || 0}</td>
                                        <td className="px-8 py-4 text-center text-[#101828] text-sm">{formatTime(students.timeTaken || 0)}</td>
                                        <td className="px-8 py-4 text-center text-[#101828] text-sm">{students.ranking || 0}</td>
                                        <td className="flex items-center justify-center px-8 py-4 text-[#101828] text-sm">
                                            <Popover placement="bottom-end"
                                                isOpen={popoveropen === index}
                                                onOpenChange={(open) => open ? handlePopoverOpen(index) : setPopoveropen(null)}>
                                                <PopoverTrigger>
                                                    <button
                                                        className="w-[32px] h-[32px] rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]"

                                                    >
                                                        <button>
                                                            <Image
                                                                src="/icons/three-dots.svg"
                                                                width={20}
                                                                height={20}
                                                                alt="More Actions"
                                                            />
                                                        </button>
                                                    </button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-[10.438rem]  px-0 py-1 bg-white border border-lightGrey rounded-md">

                                                    <button className="flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#F2F4F7]"
                                                        onClick={() => handleTabClick(`/admin/userdatabase/${students.name.toLowerCase().replace(/\s+/g, '-')}?uId=${students.userId}`)}>
                                                        <Image src='/icons/user-account.svg' alt="user profile" width={18} height={18} />
                                                        <p className="text-sm text-[#0C111D] font-normal">Go to Profile</p>
                                                    </button>
                                                    <button className=" flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#FEE4E2]"
                                                        onClick={() => {
                                                            setIsRemoveOpen(true);
                                                            setUserToRemove(students.userId);
                                                            setPopoveropen(null);
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
                                    <td colSpan={6} className="text-center py-8">
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
            {/* {isRemoveOpen && < Remove onClose={() => setIsRemoveOpen(false)} open={isRemoveOpen} />} */}

            <Modal isOpen={isRemoveOpen} onOpenChange={(isOpen) => !isOpen && setIsRemoveOpen(false)} hideCloseButton >
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-row justify-between items-center gap-1">
                            <h3 className=" font-bold task-[#1D2939]">Remove user from quiz attempt?</h3>
                            <button
                                className="w-[32px] h-[32px] rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]"
                                onClick={() => setIsRemoveOpen(false)}
                            >
                                <Image
                                    src="/icons/cancel.svg"
                                    alt="Cancel"
                                    width={20}
                                    height={20}
                                />
                            </button>
                        </ModalHeader>
                        <ModalBody >
                            <p className="pb-2 text-sm font-normal text-[#667085]"> Are you sure you want to remove this user from the quiz attempt? This action cannot be undone.</p>
                        </ModalBody>
                        <ModalFooter className="border-t border-lightGrey">
                            <Button
                                className="py-[0.625rem] px-6 border border-solid border-[#EAECF0] bg-white font-semibold text-sm text-[#1D2939] rounded-md hover:bg-[#F2F4F7]"
                                onClick={() => setIsRemoveOpen(false)}
                            >Cancel
                            </Button>
                            <Button onClick={() => handleRemoveUser(userToRemove)} className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#BB241A] border border-[#DE3024] hover:bg-[#B0201A] font-semibold rounded-md">Remove</Button>
                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal >
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

export default StudentsAttemptedQuiz;