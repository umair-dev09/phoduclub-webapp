"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
// Define types for quiz data
interface Quiz {
    title: string;
    questions: number;
    date: string; // Can be Date type if desired
    students: number;
    status: 'Live' | 'Paused' | 'Finished' | 'Scheduled' | 'Cancelled' | 'Saved';
}

// Mock fetchQuizzes function with types
const fetchQuizzes = async (): Promise<Quiz[]> => {
    const allQuizzes: Quiz[] = [
        { title: 'Maths', questions: 10, date: 'Jan 6, 2024', students: 2147, status: 'Live' },
        { title: 'Ancient Civilizations', questions: 10, date: 'Mar 15, 2024', students: 900, status: 'Saved' },
        { title: 'Science', questions: 8, date: 'Jan 8, 2024', students: 1875, status: 'Paused' },
        { title: 'Astronomy', questions: 7, date: 'Mar 17, 2024', students: 1250, status: 'Saved' },
        { title: 'History', questions: 12, date: 'Jan 10, 2024', students: 1290, status: 'Finished' },
        { title: 'Geography', questions: 6, date: 'Jan 12, 2024', students: 950, status: 'Cancelled' },
        { title: 'Physics', questions: 15, date: 'Feb 1, 2024', students: 1800, status: 'Scheduled' },
        { title: 'Chemistry', questions: 9, date: 'Feb 3, 2024', students: 1600, status: 'Live' },
        { title: 'Creative Writing', questions: 12, date: 'Mar 22, 2024', students: 1400, status: 'Saved' },
        { title: 'English Literature', questions: 12, date: 'Feb 5, 2024', students: 1950, status: 'Paused' },
        { title: 'Marine Biology', questions: 9, date: 'Mar 20, 2024', students: 1150, status: 'Saved' },
        { title: 'Biology', questions: 10, date: 'Feb 8, 2024', students: 2100, status: 'Finished' },
        { title: 'Computer Science', questions: 8, date: 'Feb 10, 2024', students: 2200, status: 'Cancelled' },
        { title: 'Anthropology', questions: 6, date: 'Mar 28, 2024', students: 1100, status: 'Saved' },
        { title: 'Art History', questions: 7, date: 'Feb 12, 2024', students: 1700, status: 'Live' },
        { title: 'Philosophy', questions: 10, date: 'Feb 15, 2024', students: 1300, status: 'Scheduled' },
        { title: 'Economics', questions: 11, date: 'Feb 18, 2024', students: 1450, status: 'Finished' },
        { title: 'Public Health', questions: 10, date: 'Apr 2, 2024', students: 1450, status: 'Saved' },
        { title: 'Political Science', questions: 9, date: 'Feb 20, 2024', students: 1900, status: 'Paused' },
        { title: 'Neuroscience', questions: 10, date: 'Apr 6, 2024', students: 1250, status: 'Saved' },
        { title: 'Sociology', questions: 12, date: 'Feb 25, 2024', students: 1750, status: 'Live' },
        { title: 'Psychology', questions: 8, date: 'Mar 1, 2024', students: 2000, status: 'Cancelled' },
        { title: 'Environmental Science', questions: 7, date: 'Mar 3, 2024', students: 1500, status: 'Scheduled' },
        { title: 'World History', questions: 10, date: 'Mar 5, 2024', students: 1850, status: 'Finished' },
        { title: 'Ethics', questions: 11, date: 'Mar 30, 2024', students: 1000, status: 'Saved' },
        { title: 'Statistics', questions: 9, date: 'Mar 8, 2024', students: 1700, status: 'Live' },
        { title: 'Robotics', questions: 8, date: 'Apr 4, 2024', students: 1350, status: 'Saved' },
        { title: 'Business Studies', questions: 8, date: 'Mar 10, 2024', students: 1400, status: 'Paused' },
        { title: 'Music Theory', questions: 6, date: 'Mar 12, 2024', students: 1200, status: 'Cancelled' },
        { title: 'Genetics', questions: 8, date: 'Mar 25, 2024', students: 1300, status: 'Saved' },
        { title: 'Linguistics', questions: 7, date: 'Apr 10, 2024', students: 1050, status: 'Saved' }
    ];
    return allQuizzes;
};

function Quizz() {
    const [data, setData] = useState<Quiz[]>([]);
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
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
    useEffect(() => {
        const filteredQuizzes = quizzes.filter(quiz =>
            quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setData(filteredQuizzes);
        setCurrentPage(1); // Reset to first page on new search
    }, [searchTerm, quizzes]);

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = data.slice(firstItemIndex, lastItemIndex);

    // Function to handle tab click and navigate to a new route
    const handleTabClick = (path: string) => {
        router.push(path);
    };



    return (
        <div className="flex flex-col  w-full gap-4   my-5">
            <div className="flex flex-row justify-between items-center">
                <span className="text-lg font-semibold text-[#1D2939]">Students attempted (2547)</span>
                <div className="flex flex-row gap-3">
                    {/* Search Button */}
                    <button className="h-[44px] w-[250px] rounded-md bg-[#FFFFFF] border border-solid border-[#D0D5DD] flex items-center">
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
                    <button className="h-[44px] w-[143px] rounded-md bg-[#FFFFFF] border border-solid border-[#D0D5DD] flex items-center p-3">
                        <Image
                            src="/icons/select-date.svg"
                            width={20}
                            height={20}
                            alt="Select-date Button"
                        />
                        <span className="font-medium text-sm text-[#667085] ml-2">Select dates</span>
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-48">
                    <span className="text-lg">Loading quizzes...</span>
                </div>
            ) : (
                <div className="flex flex-1 flex-col">
                    <div className="h-full">
                        <div className="border border-[#EAECF0] rounded-xl">
                            <table className="w-full bg-white rounded-xl">
                                <thead>
                                    <tr>
                                        <th className="w-1/4 text-left px-8 py-4 pl-8 rounded-tl-xl text-[#667085] font-medium text-sm">Name</th>
                                        <th className="w-[17%] text-center px-8 py-4 text-[#667085] font-medium text-sm">Date & Time</th>
                                        <th className="w-[17%] text-center px-8 py-4 text-[#667085] font-medium text-sm">Score</th>
                                        <th className="w-[17%] text-center px-8 py-4 text-[#667085] font-medium text-sm">Time Taken</th>
                                        <th className="w-[17%] text-center px-8 py-4 rounded-tr-xl text-[#667085] font-medium text-sm">Ranking</th>
                                        <th className="w-[12%] text-center px-8 py-4 rounded-tr-xl text-[#667085] font-medium text-sm">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((quiz, index) => (
                                        <tr key={index} className="border-t border-solid border-[#EAECF0]">
                                            <td onClick={() => handleTabClick('/admin/content/quizzesmanagement/quizinfo')}><button className="px-8 py-4 text-[#9012FF] underline text-sm font-medium">{quiz.title}</button></td>
                                            <td className="px-8 py-4 text-center text-[#101828] text-sm">{quiz.questions}</td>
                                            <td className="px-8 py-4 text-center text-[#101828] text-sm">{quiz.date}</td>
                                            <td className="px-8 py-4 text-center text-[#101828] text-sm">{quiz.students}</td>
                                            <td className="px-8 py-4 text-center text-[#101828] text-sm">
                                                <span className='flex items-center justify-center rounded-full'>
                                                    <Image
                                                        src={`/icons/${quiz.status}.svg`}
                                                        width={74}
                                                        height={24}
                                                        alt={quiz.status}
                                                        className="text-xs font-medium"
                                                    />
                                                </span>
                                            </td>
                                            <td className="flex items-center justify-center px-8 py-4 text-[#101828] text-sm">


                                                <button>
                                                    <Image
                                                        src="/icons/three-dots.svg"
                                                        width={20}
                                                        height={20}
                                                        alt="More Actions"
                                                    />
                                                </button>

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
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
            )}

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

export default Quizz;