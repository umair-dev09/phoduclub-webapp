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
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Pause } from "lucide-react";
import ScheduledDialog from "@/components/AdminComponents/QuizInfoDailogs/scheduledDailog";
import DeleteQuiz from "@/components/AdminComponents/QuizInfoDailogs/DeleteQuiz";
import EndQuiz from "@/components/AdminComponents/QuizInfoDailogs/EndQuiz";
import PausedQuiz from "@/components/AdminComponents/QuizInfoDailogs/PausedQuiz";
import MakeLiveNow from "@/components/AdminComponents/QuizInfoDailogs/MakeLiveNow";
import ResumeQuiz from "@/components/AdminComponents/QuizInfoDailogs/ResumeQuiz";
import ViewAnalytics from "@/components/AdminComponents/QuizInfoDailogs/ViewAnalytics";
import QuizStatus from '@/components/AdminComponents/QuizzesManagement/quizStatus';

// Define types for quiz data
interface Quiz {
    questions: number;
    date: string; // Can be Date type if desired
    students: number;
    status: 'Live' | 'Paused' | 'Finished' | 'Scheduled' | 'Ended' | 'Saved';
}

// Mock fetchQuizzes function with types
const fetchQuizzes = async (): Promise<Quiz[]> => {
    const allQuizzes: Quiz[] = [
        { questions: 10, date: 'Jan 6, 2024', students: 2147, status: 'Live' },
        { questions: 10, date: 'Mar 15, 2024', students: 900, status: 'Saved' },
        { questions: 8, date: 'Jan 8, 2024', students: 1875, status: 'Paused' },
        { questions: 7, date: 'Mar 17, 2024', students: 1250, status: 'Saved' },
        { questions: 12, date: 'Jan 10, 2024', students: 1290, status: 'Finished' },
        { questions: 6, date: 'Jan 12, 2024', students: 950, status: 'Ended' },
        { questions: 15, date: 'Feb 1, 2024', students: 1800, status: 'Scheduled' },
        { questions: 9, date: 'Feb 3, 2024', students: 1600, status: 'Live' },
        { questions: 12, date: 'Mar 22, 2024', students: 1400, status: 'Saved' },
        { questions: 12, date: 'Feb 5, 2024', students: 1950, status: 'Paused' },
        { questions: 9, date: 'Mar 20, 2024', students: 1150, status: 'Saved' },
        { questions: 10, date: 'Feb 8, 2024', students: 2100, status: 'Finished' },
        { questions: 8, date: 'Feb 10, 2024', students: 2200, status: 'Ended' },
        { questions: 6, date: 'Mar 28, 2024', students: 1100, status: 'Saved' },
        { questions: 7, date: 'Feb 12, 2024', students: 1700, status: 'Live' },
        { questions: 10, date: 'Feb 15, 2024', students: 1300, status: 'Scheduled' },
        { questions: 11, date: 'Feb 18, 2024', students: 1450, status: 'Finished' },
        { questions: 10, date: 'Apr 2, 2024', students: 1450, status: 'Saved' },
        { questions: 9, date: 'Feb 20, 2024', students: 1900, status: 'Paused' },
        { questions: 10, date: 'Apr 6, 2024', students: 1250, status: 'Saved' },
        { questions: 12, date: 'Feb 25, 2024', students: 1750, status: 'Live' },
        { questions: 8, date: 'Mar 1, 2024', students: 2000, status: 'Ended' },
        { questions: 7, date: 'Mar 3, 2024', students: 1500, status: 'Scheduled' },
        { questions: 10, date: 'Mar 5, 2024', students: 1850, status: 'Finished' },
        { questions: 11, date: 'Mar 30, 2024', students: 1000, status: 'Saved' },
        { questions: 9, date: 'Mar 8, 2024', students: 1700, status: 'Live' },
        { questions: 8, date: 'Apr 4, 2024', students: 1350, status: 'Saved' },
        { questions: 8, date: 'Mar 10, 2024', students: 1400, status: 'Paused' },
        { questions: 6, date: 'Mar 12, 2024', students: 1200, status: 'Ended' },
        { questions: 8, date: 'Mar 25, 2024', students: 1300, status: 'Saved' },
        { questions: 7, date: 'Apr 10, 2024', students: 1050, status: 'Saved' }
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

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = data.slice(firstItemIndex, lastItemIndex);

    // Function to handle tab click and navigate to a new route
    const handleTabClick = (path: string) => {
        router.push(path);
    };

    // function changing the color border and shadow
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const handlePopoverOpen = () => setIsPopoverOpen(true);
    const handlePopoverClose = () => setIsPopoverOpen(false);

    // State to manage each dialog's visibility
    const [isScheduledDialogOpen, setIsScheduledDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isEndDialogOpen, setIsEndDialogOpen] = useState(false);
    const [isPausedDialogOpen, setIsPausedDialogOpen] = useState(false);
    const [isMakeLiveNowDialogOpen, setIsMakeLiveNowDialogOpen] = useState(false);
    const [isResumeQuizOpen, setIsResumeQuizOpen] = useState(false);
    const [isViewAnalyticsOpen, setIsViewAnalyticsOpen] = useState(false);

    // Handlers for ScheduledDialog
    const openScheduledDialog = () => setIsScheduledDialogOpen(true);
    const closeScheduledDialog = () => setIsScheduledDialogOpen(false);

    // Handlers for DeleteQuiz dialog
    const openDeleteDialog = () => setIsDeleteDialogOpen(true);
    const closeDeleteDialog = () => setIsDeleteDialogOpen(false);

    // Handlers for EndQuiz dialog
    const openEndQuiz = () => setIsEndDialogOpen(true);
    const closeEndQuiz = () => setIsEndDialogOpen(false);

    // Handlers for  PausedQuiz dialog
    const openPausedQuiz = () => setIsPausedDialogOpen(true);
    const closePausedQuiz = () => setIsPausedDialogOpen(false);

    // Handlers for  MakeLiveNow dialog
    const openMakeLiveNowQuiz = () => setIsMakeLiveNowDialogOpen(true);
    const closeMakeLiveNowQuiz = () => setIsMakeLiveNowDialogOpen(false);

    // Handlers for ResumeQuiz dialog
    const openResumeQuiz = () => setIsResumeQuizOpen(true);
    const closeResumeQuiz = () => setIsResumeQuizOpen(false);

    // Handlers for ViewAnalytics dialog
    const openViewAnalytics = () => setIsViewAnalyticsOpen(true);
    const closeViewAnalytics = () => setIsViewAnalyticsOpen(false);

    return (
        <div className="flex flex-col px-[32px] w-full gap-4 overflow-y-auto h-auto my-5">
            <div className="flex flex-row justify-between items-center">
                <span className="text-lg font-semibold text-[#1D2939]">Test series</span>
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

                    {/* By Status Button */}
                    <button className="h-[44px] w-[122px] rounded-md bg-[#FFFFFF] border border-solid border-[#D0D5DD] flex items-center p-3">
                        <span className="font-medium text-sm text-[#667085]">By status</span>
                        <Image
                            src="/icons/selectdate-Arrowdown.svg"
                            width={20}
                            height={20}
                            alt="Arrow-Down Button"
                            className="ml-2"
                        />
                    </button>

                    {/* Create Quiz Button */}
                    <button
                        className="h-[44px] w-auto px-6 py-2 bg-[#8501FF] rounded-md shadow-inner-button border border-solid border-[#800EE2] flex items-center justify-center"
                        onClick={() => handleTabClick('/admin/content/testseriesmanagement/createtestseries')}
                    >
                        <span className="text-[#FFFFFF] font-semibold text-sm">Create Test Series</span>
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-48">
                    <span className="text-lg">Loading test series...</span>
                </div>
            ) : (
                <div className="flex flex-1 flex-col">
                    <div className="h-full">
                        <div className="border border-[#EAECF0] rounded-xl">
                            <table className="w-full bg-white rounded-xl">
                                <thead>
                                    <tr>
                                        <th className="w-[30%] text-left px-8 py-4 pl-8 rounded-tl-xl text-[#667085] font-medium text-sm">Test Series</th>
                                        <th className="w-[20%] text-center px-8 py-4 text-[#667085] font-medium text-sm">Price</th>
                                        <th className="w-[20%] text-center px-8 py-4 text-[#667085] font-medium text-sm">Published on</th>
                                        <th className="w-[20%] text-center px-8 py-4 rounded-tr-xl text-[#667085] font-medium text-sm">Status</th>
                                        <th className="w-[10%] text-center px-8 py-4 rounded-tr-xl text-[#667085] font-medium text-sm">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((quiz, index) => (
                                        <tr key={index} className="border-t border-solid border-[#EAECF0]">
                                            <td onClick={() => handleTabClick('/admin/content/quizzesmanagement/quizinfo')}>
                                                <button className="flex flex-row items-center px-8 py-3 gap-2 text-[#9012FF] underline text-sm font-medium">
                                                    <Image src='/images/TSM-DP.png' alt="DP" width={40} height={40} />
                                                    <p className="text-start">Phodu JEE Mains Test Series 2025</p>
                                                </button>
                                            </td>
                                            <td className="px-8 py-4 text-center text-[#101828] text-sm">&#8377;{quiz.students}</td>
                                            <td className="px-8 py-4 text-center text-[#101828] text-sm">{quiz.date}</td>
                                            <td className="px-8 py-4 text-center text-[#101828] text-sm">
                                                <span className='flex items-center justify-start ml-[39%] rounded-full'>                                                    <QuizStatus status={quiz.status} />
                                                </span>
                                            </td>
                                            <td className="text-center px-8 py-4 text-[#101828] text-sm">
                                                <Popover placement="bottom-end">
                                                    <PopoverTrigger className="outline-none">
                                                        <button className="ml-[60%]">
                                                            <Image
                                                                src="/icons/three-dots.svg"
                                                                width={20}
                                                                height={20}
                                                                alt="More Actions"
                                                            />
                                                        </button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className={`flex flex-col items-start text-sm font-normal py-1 px-0 bg-white border border-lightGrey rounded-md ${quiz.status === 'Paused' ? 'w-[11.563rem]' : 'w-[10.438rem]'}`}>
                                                        {/* Option 1: Edit Quiz */}
                                                        <div>
                                                            {quiz.status === 'Paused' && (
                                                                <div className="flex flex-row w-[11.563rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={() => handleTabClick('/admin/content/quizzesmanagement/createquiz')}>
                                                                    <Image src='/icons/edit-icon.svg' alt="edit" width={18} height={18} />
                                                                    <p>Edit Quiz</p>
                                                                </div>
                                                            )}
                                                            {quiz.status === 'Scheduled' && (
                                                                <div className="flex flex-row w-[10.438rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={() => handleTabClick('/admin/content/quizzesmanagement/createquiz')}>
                                                                    <Image src='/icons/edit-icon.svg' alt="edit" width={18} height={18} />
                                                                    <p>Edit Quiz</p>
                                                                </div>
                                                            )}
                                                            {quiz.status === 'Saved' && (
                                                                <div className="flex flex-row w-[10.438rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={() => handleTabClick('/admin/content/quizzesmanagement/createquiz')}>
                                                                    <Image src='/icons/edit-icon.svg' alt="edit" width={18} height={18} />
                                                                    <p>Edit Quiz</p>
                                                                </div>
                                                            )}
                                                            {quiz.status === 'Live' && (
                                                                <div className="flex flex-row w-[10.438rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={openPausedQuiz}>
                                                                    <Image src='/icons/pause-dark.svg' alt="pause quiz" width={18} height={18} />
                                                                    <p>Paused Quiz</p>
                                                                </div>
                                                            )}
                                                            {quiz.status === 'Finished' && (
                                                                <div className="flex flex-row w-[10.438rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={openViewAnalytics}>
                                                                    <Image src='/icons/analytics-01.svg' alt="view analytics" width={18} height={18} />
                                                                    <p>View Analytics</p>
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Option 3: Resume Quiz (only if status is Paused) */}
                                                        {quiz.status === 'Paused' && (
                                                            <div className="flex flex-row w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                onClick={openResumeQuiz}>
                                                                <Image src='/icons/play-dark.svg' alt="resume quiz" width={20} height={20} />
                                                                <p>Resume Quiz</p>
                                                            </div>
                                                        )}

                                                        {/* Option 3: Schedule Quiz (only if status is Paused) */}
                                                        {quiz.status === 'Paused' && (
                                                            <Popover placement="left-start">
                                                                <PopoverTrigger>
                                                                    <div className="flex flex-row justify-between w-[11.563rem] px-4 py-[0.625rem] hover:bg-[#F2F4F7] transition-colors">
                                                                        <div className="flex flex-row gap-2">
                                                                            <Image src='/icons/calendar-03.svg' alt="schedule" width={18} height={18} />
                                                                            <p>Schedule quiz</p>
                                                                        </div>
                                                                        <Image src='/icons/collapse-right-02.svg' alt="schedule popup" width={18} height={18} />
                                                                    </div>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="flex flex-col items-start text-sm font-normal py-1 px-0 bg-white border border-lightGrey rounded-md w-[11.25rem]">
                                                                    <div className="w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors" onClick={openScheduledDialog}>Schedule Quiz</div>
                                                                    <div className="w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors">Make Live Now</div>
                                                                </PopoverContent>
                                                            </Popover>
                                                        )}

                                                        {/* Option 4: Delete Quiz */}
                                                        <div>
                                                            {quiz.status === 'Paused' && (
                                                                <div className="flex flex-row w-[11.563rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={openDeleteDialog}>
                                                                    <Image src='/icons/delete.svg' alt="delete" width={18} height={18} />
                                                                    <p className="text-[#DE3024]">Delete Quiz</p>
                                                                </div>
                                                            )}
                                                            {quiz.status === 'Scheduled' && (
                                                                <div className="flex flex-row w-[10.438rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={openDeleteDialog}>
                                                                    <Image src='/icons/delete.svg' alt="delete" width={18} height={18} />
                                                                    <p className="text-[#DE3024]">Delete Quiz</p>
                                                                </div>
                                                            )}
                                                            {quiz.status === 'Finished' && (
                                                                <div className="flex flex-row w-[10.438rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={openDeleteDialog}>
                                                                    <Image src='/icons/delete.svg' alt="delete" width={18} height={18} />
                                                                    <p className="text-[#DE3024]">Delete Quiz</p>
                                                                </div>
                                                            )}
                                                            {quiz.status === 'Saved' && (
                                                                <div className="flex flex-row w-[10.438rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={openDeleteDialog}>
                                                                    <Image src='/icons/delete.svg' alt="delete" width={18} height={18} />
                                                                    <p className="text-[#DE3024]">Delete Quiz</p>
                                                                </div>
                                                            )}
                                                            {quiz.status === 'Live' && (
                                                                <div className="flex flex-row w-[10.438rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={openEndQuiz}>
                                                                    <Image src='/icons/license-no.svg' alt="end quiz" width={18} height={18} />
                                                                    <p className="text-[#DE3024]">End Quiz</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
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
            {/* Dialog components with conditional rendering */}
            {isScheduledDialogOpen && <ScheduledDialog onClose={closeScheduledDialog} />}
            {isDeleteDialogOpen && <DeleteQuiz onClose={closeDeleteDialog} open={true} />}
            {isEndDialogOpen && <EndQuiz onClose={closeEndQuiz} />}
            {isPausedDialogOpen && <PausedQuiz onClose={closePausedQuiz} />}
            {isMakeLiveNowDialogOpen && < MakeLiveNow onClose={closeMakeLiveNowQuiz} open={true} />}
            {isResumeQuizOpen && < ResumeQuiz onClose={closeResumeQuiz} open={true} />}
            {isViewAnalyticsOpen && < ViewAnalytics onClose={closeViewAnalytics} open={true} />}
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