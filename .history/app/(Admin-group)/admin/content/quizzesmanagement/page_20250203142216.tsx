"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import LoadingData from '@/components/Loading';
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
import { Calendar } from "@nextui-org/calendar";
import { Pause } from "lucide-react";
import { today, getLocalTimeZone } from "@internationalized/date";
import ScheduledDialog from "@/components/AdminComponents/QuizInfoDailogs/scheduledDailog";
import ResumeQuiz from "@/components/AdminComponents/QuizInfoDailogs/ResumeDailogue";
import ViewAnalytics from "@/components/AdminComponents/QuizInfoDailogs/ViewAnalytics";
import { collection, getDocs, query, where, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from "@/firebase";
import type { DateValue } from "@react-types/calendar"; // Correct import for DateValue from React Spectrum
import StatusDisplay from "@/components/AdminComponents/StatusDisplay";
import DeleteDialog from "@/components/AdminComponents/QuizInfoDailogs/DeleteDailogue";
import { ToastContainer } from "react-toastify";
import EndDialog from "@/components/AdminComponents/QuizInfoDailogs/EndDailogue";
import PausedDialog from "@/components/AdminComponents/QuizInfoDailogs/PauseDailogue";
import React from "react";

// Define types for quiz data
interface Quiz {
    title: string;
    questions: number;
    quizId: string;
    date: string; // Can be Date type if desired
    students: number;
    status: string;
    quizPublishedDate: string;
    startDate: string;
    endDate: string;
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

type Option = 'Saved' | 'Live' | 'Scheduled' | 'Pause' | 'Finished' | 'Canceled';

// Mock fetchQuizzes function with types
const fetchQuizzes = (callback: (quizzes: Quiz[]) => void) => {
    const quizzesCollection = collection(db, 'quiz');

    const unsubscribe = onSnapshot(quizzesCollection, async (quizzesSnapshot) => {
        const quizzesData = await Promise.all(
            quizzesSnapshot.docs.map(async (quizDoc) => {
                const quizData = quizDoc.data();
                const quizId = quizDoc.id;

                const questionsCollection = collection(db, 'quiz', quizId, 'Questions');
                const questionsSnapshot = await getDocs(questionsCollection);
                const questionsCount = questionsSnapshot.size;

                const studentsAttemptedCollection = collection(db, 'quiz', quizId, 'attempts');
                const studentsAttemptedSnapshot = await getDocs(studentsAttemptedCollection);
                const studentsCount = studentsAttemptedSnapshot.size;

                return {
                    title: quizData.quizName,
                    questions: questionsCount,
                    quizId: quizData.quizId,
                    date: formatDate(quizData.quizPublishedDate),
                    students: studentsCount,
                    status: quizData.status,
                    startDate: quizData.startDate,
                    endDate: quizData.endDate,
                } as Quiz;
            })
        );

        // Sort by date (or any stable key) before passing data
        quizzesData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        callback(quizzesData);
    });

    return unsubscribe;
};

type SortDirection = 'asc' | 'desc' | null;

const Quizz = () => {
    const [data, setData] = useState<Quiz[]>([]);
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [quizId, setQuizId] = useState('');
    const [quizName, setQuizName] = useState('');
    const router = useRouter();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [liveCourseNow, setLiveCourseNow] = useState(false);
    const [isScheduledDialogOpen, setIsScheduledDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isEndDialogOpen, setIsEndDialogOpen] = useState(false);
    const [isPausedDialogOpen, setIsPausedDialogOpen] = useState(false);
    const [isResumeOpen, setIsResumeOpen] = useState(false);
    const [isViewAnalyticsOpen, setIsViewAnalyticsOpen] = useState(false);
    const [isSelcetDateOpen, setIsSelectDateOpen] = useState(false);
    const options: Option[] = ["Saved", "Live", "Scheduled", "Pause", "Finished", "Canceled"];
    const [checkedState, setCheckedState] = useState<Record<Option, boolean>>({
        Saved: false,
        Live: false,
        Scheduled: false,
        Pause: false,
        Finished: false,
        Canceled: false,
    });
    const selectedCount = Object.values(checkedState).filter(Boolean).length;
    const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Store selected date as Date object
    const [dateFilter, setDateFilter] = useState(null);
    const [statusFilter, setStatusFilter] = useState(null);
    const isTextSearch = searchTerm.trim().length > 0 && !dateFilter && !statusFilter;

    // Fetch quizzes when component mounts
    useEffect(() => {
        const loadQuizzes = () => {
            setLoading(true);

            // Fetch quizzes and update state
            const unsubscribe = fetchQuizzes((quizzes) => {
                setQuizzes(quizzes);
                setLoading(false); // Set loading to false only after fetching is complete
            });

            return () => unsubscribe(); // Clean up the listener on unmount
        };

        loadQuizzes();
    }, []);

    const [sortConfig, setSortConfig] = useState<{
        key: string;
        direction: 'asc' | null | 'desc';
    }>({
        key: 'publishedOn',
        direction: 'desc'
    });

    useEffect(() => {
        if (quizzes.length === 0) return;

        let filteredQuizzes = [...quizzes];

        // Apply existing filters
        if (searchTerm) {
            filteredQuizzes = filteredQuizzes.filter((quiz) =>
                quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply status filters
        const selectedStatuses = Object.entries(checkedState)
            .filter(([_, isChecked]) => isChecked)
            .map(([status]) => statusMapping[status as Option])
            .flat();

        if (selectedStatuses.length > 0) {
            filteredQuizzes = filteredQuizzes.filter((quiz) =>
                selectedStatuses.includes(quiz.status)
            );
        }

        // Apply date filter
        if (selectedDate) {
            const selectedDateString = selectedDate instanceof Date && !isNaN(selectedDate.getTime())
                ? selectedDate.toISOString().split('T')[0]
                : null;

            if (selectedDateString) {
                filteredQuizzes = filteredQuizzes.filter((quiz) => {
                    const quizDate = new Date(quiz.date);
                    const quizDateString = quizDate instanceof Date && !isNaN(quizDate.getTime())
                        ? quizDate.toISOString().split('T')[0]
                        : null;

                    return quizDateString === selectedDateString;
                });
            }
        }

        if (sortConfig.key && sortConfig.direction) {
            filteredQuizzes = filteredQuizzes.sort((a, b) => {
                if (sortConfig.key === 'questions') {
                    return sortConfig.direction === 'asc'
                        ? a.questions - b.questions
                        : b.questions - a.questions;
                }
                if (sortConfig.key === 'publishedOn') {
                    const dateA = new Date(a.date).getTime();
                    const dateB = new Date(b.date).getTime();
                    return sortConfig.direction === 'asc'
                        ? dateA - dateB
                        : dateB - dateA;
                }
                if (sortConfig.key === 'students') {
                    return sortConfig.direction === 'asc'
                        ? a.students - b.students
                        : b.students - a.students;
                }
                return 0;
            });
        }

        setData(filteredQuizzes);
        setCurrentPage(1);
    }, [searchTerm, checkedState, quizzes, selectedDate, sortConfig]);

    const handleSort = (key: string) => {
        if (key === 'questions' || key === 'publishedOn' || key === 'students') {
            setSortConfig((prevConfig) => {
                // If clicking on a new column or the column wasn't sorted
                if (prevConfig.key !== key) {
                    return { key, direction: 'desc' }; // Default to descending order
                }

                // If clicking on the same column, cycle through: desc -> asc -> null
                switch (prevConfig.direction) {
                    case 'desc':
                        return { key, direction: 'asc' };
                    case 'asc':
                        return { key: '', direction: null };
                    default:
                        return { key, direction: 'desc' };
                }
            });
        }
    };

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;

    // Ensure `data` is correctly sliced for the current page
    const currentItems = data.slice(firstItemIndex, lastItemIndex);

    const [openPopovers, setOpenPopovers] = React.useState<{ [key: number]: boolean }>({});
    const togglePopover = (index: number) => {
        setOpenPopovers((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const closePopover = (index: number) => {
        setOpenPopovers((prev) => ({
            ...prev,
            [index]: false,
        }));
    };

    // Function to handle tab click and navigate to a new route
    const handleTabClick = (path: string) => {
        router.push(path);
    };

    // function changing the color border and shadow
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const handlePopoverOpen = () => setIsPopoverOpen(true);
    const handlePopoverClose = () => setIsPopoverOpen(false);

    // State to manage each dialog's visibility


    // Handlers for ScheduledDialog
    const openScheduledDialog = (quizId: string, startDate: string, endDate: string) => {
        setQuizId(quizId);
        setStartDate(startDate);
        setEndDate(endDate);
        setIsScheduledDialogOpen(true);

    }
    const closeScheduledDialog = () => setIsScheduledDialogOpen(false);

    // Handlers for DeleteQuiz dialog
    const openDeleteDialog = (quizId: string, quizName: string) => {
        setIsDeleteDialogOpen(true);
        setQuizId(quizId);
        setQuizName(quizName);
    }
    const closeDeleteDialog = () => setIsDeleteDialogOpen(false);

    // Handlers for EndQuiz dialog
    const openEndQuiz = (quizId: string) => {
        setQuizId(quizId);
        setIsEndDialogOpen(true);
    }
    const closeEndQuiz = () => setIsEndDialogOpen(false);

    // Handlers for  PausedQuiz dialog
    const openPausedQuiz = (quizId: string) => {
        setQuizId(quizId);
        setIsPausedDialogOpen(true);
    }
    const closePausedQuiz = () => setIsPausedDialogOpen(false);

    // Handlers for ResumeQuiz dialog
    const openResumeQuiz = (quizId: string) => {
        setQuizId(quizId);
        setIsResumeOpen(true);
    }
    const closeResumeQuiz = () => setIsResumeOpen(false);

    // Handlers for ViewAnalytics dialog
    const openViewAnalytics = () => setIsViewAnalyticsOpen(true);
    const closeViewAnalytics = () => setIsViewAnalyticsOpen(false);

    const statusMapping: Record<Option, string[]> = {
        Saved: ['saved'],
        Live: ['live'],
        Scheduled: ['scheduled'],
        Pause: ['paused'],    // Maps to 'paused' status in lowercase
        Finished: ['finished'],
        Canceled: ['ended']   // Maps to 'ended' status in lowercase
    };


    const toggleCheckbox = (option: Option) => {
        setCheckedState((prevState) => ({
            ...prevState,
            [option]: !prevState[option],
        }));
    };

    // Format selected date as 'Nov 9, 2024'
    const formattedDate = selectedDate
        ? selectedDate.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })
        : "Select dates";

    const statusColors: Record<Option, string> = {
        Saved: '#7400E0',
        Live: '#7400E0',
        Scheduled: '#7400E0',
        Pause: '#7400E0',
        Finished: '#7400E0',
        Canceled: '#7400E0',
    };

    // Get selected statuses to render as indicators.
    const selectedStatuses = options.filter((option) => checkedState[option]);

    return (
        <div className="flex flex-col px-[32px] w-full gap-4 h-auto my-5 overflow-y-auto">
            <div className="flex flex-row justify-between items-center">
                <span className="text-lg font-semibold text-[#1D2939]">Quizzes</span>
                <div className="flex flex-row gap-3">
                    {/* Search Button */}
                    <button className="h-[44px] w-[250px] rounded-md bg-[#FFFFFF] border border-solid border-[#D0D5DD] flex items-center outline-none">
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
                                maxLength={50}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </button>

                    {/* Select Date Button */}
                    <Popover placement="bottom" isOpen={isSelcetDateOpen} onOpenChange={(open) => setIsSelectDateOpen(open)}>
                        <PopoverTrigger>
                            <button className="h-[44px] w-[143px] rounded-md bg-[#FFFFFF] border border-solid border-[#D0D5DD] flex items-center p-3 outline-none hover:bg-[#F2F4F7]">
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

                    {/* By Status Button */}
                    <Popover placement="bottom-start">
                        <PopoverTrigger>
                            <div className="h-[44px] w-[126px] hover:bg-[#F2F4F7] rounded-md bg-[#FFFFFF] border border-solid border-[#D0D5DD] flex items-center justify-between p-3 cursor-pointer outline-none">
                                <p className={`flex flex-row font-medium text-sm ${selectedCount > 0 ? 'text-[#182230]' : 'text-[#667085]'}`}>
                                    {selectedCount > 0 ? `${selectedCount} selected` : 'By status'}
                                </p>
                                <Image
                                    src="/icons/selectdate-Arrowdown.svg"
                                    width={20}
                                    height={20}
                                    alt="Arrow-Down Button"
                                />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="flex flex-col w-[10.438rem] h-auto px-0 py-1 bg-white border border-lightGrey rounded-md">
                            <div>
                                {options.map((option) => (
                                    <div
                                        key={option}
                                        className="flex flex-row items-center w-[10.313rem] my-0 py-[0.625rem] px-4 gap-2 cursor-pointer transition-colors hover:bg-[#F2F4F7]"
                                        onClick={() => toggleCheckbox(option)}
                                    >
                                        <div
                                            className={`flex items-center justify-center w-4 h-4 border border-[#D0D5DE] rounded-sm ${checkedState[option] ? 'bg-purple border-purple' : 'bg-white'}`}
                                        >
                                            {checkedState[option] && (
                                                <Image src="/icons/check.svg" alt="choose" width={12} height={12} />
                                            )}
                                        </div>
                                        <p className="text-sm text-[#0C111D] font-normal">{option}</p>
                                    </div>
                                ))}
                            </div>
                        </PopoverContent>
                    </Popover>

                    {/* Create Quiz Button */}
                    <button
                        className="h-[44px] w-[135px] bg-[#9012FF] rounded-md shadow-inner-button border border-solid border-[#800EE2] flex items-center justify-center outline-none transition-colors duration-150 hover:bg-[#6D0DCC]"
                        onClick={() => handleTabClick('/admin/content/quizzesmanagement/createquiz')}
                    >
                        <span className="text-[#FFFFFF] font-semibold text-sm">Create Quiz</span>
                    </button>
                </div>
            </div>

            {loading ? (
                <div>
                    <LoadingData />
                </div>
            ) : (
                <div className="flex flex-1 flex-col">
                    <div className="flex flex-row items-center justify-between w-full">
                        <div className="flex flex-row gap-2">
                            {selectedStatuses.map((status) => (
                                <div key={status} className="flex flex-row items-center w-fit mb-4 px-3 py-2 gap-1 text-xs font-medium bg-[#EDE4FF] rounded-[0.375rem]" style={{ color: statusColors[status] }}>
                                    {status}
                                    <button onClick={() => toggleCheckbox(status)}>
                                        <Image src='/icons/multiplication-sign.svg' alt="close" width={16} height={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        {selectedStatuses.length > 0 && (
                            <button className="text-sm text-[#9012FF] font-semibold" onClick={() => setCheckedState({ Saved: false, Live: false, Scheduled: false, Pause: false, Finished: false, Canceled: false })}>
                                clear all
                            </button>
                        )}
                    </div>
                    <div className="h-full">
                        <div className="border border-[#EAECF0] rounded-xl overflow-x-auto">
                            <table className="w-full bg-white rounded-xl">
                                <thead>
                                    <tr>
                                        <th className="w-1/4 text-left px-8 py-4 pl-8 rounded-tl-xl text-[#667085] font-medium text-sm">Quizzes</th>
                                        <th className="w-[17%] text-center px-8 py-4 text-[#667085] font-medium text-sm">
                                            <div
                                                className="flex flex-row justify-center gap-1 cursor-pointer"
                                                onClick={() => handleSort('questions')}
                                            >
                                                <p>Questions</p>
                                                <Image src='/icons/unfold-more-round.svg' alt="more" width={16} height={16} />
                                            </div>
                                        </th>
                                        <th className="w-[17%] text-center px-8 py-4 text-[#667085] font-medium text-sm">
                                            <div
                                                className="flex flex-row justify-center gap-1 cursor-pointer"
                                                onClick={() => handleSort('publishedOn')}
                                            >
                                                <p>Published on</p>
                                                <Image src='/icons/unfold-more-round.svg' alt="more" width={16} height={16} />
                                            </div>
                                        </th>
                                        <th className="w-[17%] text-center px-8 py-4 text-[#667085] font-medium text-sm">
                                            <div
                                                className="flex flex-row justify-center gap-1 cursor-pointer"
                                                onClick={() => handleSort('students')}
                                            >
                                                <p className="whitespace-nowrap">Students Attempted</p>
                                                <Image
                                                    src={'/icons/unfold-more-round.svg'}
                                                    alt="sort"
                                                    width={16}
                                                    height={16}
                                                />
                                            </div>
                                        </th>
                                        <th className="w-[17%] text-center px-8 py-4 rounded-tr-xl text-[#667085] font-medium text-sm">Status</th>
                                        <th className="w-[12%] text-center px-8 py-4 rounded-tr-xl text-[#667085] font-medium text-sm">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="overflow-y-auto">
                                    {data.length > 0 ? (
                                        currentItems.map((quiz, index) => (
                                            <tr key={index} className="border-t border-solid border-[#EAECF0]">
                                                <td onClick={() => handleTabClick(`/admin/content/quizzesmanagement/${quiz.title.toLowerCase().replace(/\s+/g, '-')}/?qId=${quiz.quizId}`)}><button className="px-8 py-4 text-[#9012FF] text-left underline text-sm font-medium whitespace-nowrap">{quiz.title}</button></td>
                                                <td className="px-8 py-4 text-center text-[#101828] text-sm"><button>{quiz.questions}</button></td>
                                                <td className="px-8 py-4 text-center text-[#101828] text-sm whitespace-nowrap">{quiz.date}</td>
                                                <td className="px-8 py-4 text-center text-[#101828] text-sm">{quiz.students}</td>
                                                <td className="px-8 py-4 text-center text-[#101828] text-sm">
                                                    <span className='flex items-center justify-start ml-[30%] rounded-full'>
                                                        <StatusDisplay status={quiz.status} />
                                                    </span>
                                                </td>
                                                <td className="flex items-center justify-center px-8 py-4 text-[#101828] text-sm">
                                                    <Popover placement="bottom-end" isOpen={!!openPopovers[index]}
                                                        onOpenChange={() => closePopover(index)}>
                                                        <PopoverTrigger className="ml-[50%] outline-none">
                                                            <button onClick={(e) => { e.stopPropagation(); togglePopover(index) }}>
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

                                                            {quiz.status === 'paused' && (
                                                                <button className="flex flex-row w-[11.563rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={() => { closePopover(index); handleTabClick(`/admin/content/quizzesmanagement/createquiz/?s=${quiz.status}&qId=${quiz.quizId}`) }}>
                                                                    <Image src='/icons/edit-icon.svg' alt="edit" width={18} height={18} />
                                                                    <p>Edit</p>
                                                                </button>
                                                            )}
                                                            {quiz.status === 'scheduled' && (
                                                                <button className="flex flex-row w-[10.438rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={() => { closePopover(index); handleTabClick(`/admin/content/quizzesmanagement/createquiz/?s=${quiz.status}&qId=${quiz.quizId}`) }}>
                                                                    <Image src='/icons/edit-icon.svg' alt="edit" width={18} height={18} />
                                                                    <p>Edit</p>
                                                                </button>
                                                            )}
                                                            {quiz.status === 'saved' && (
                                                                <button className="flex flex-row w-[10.438rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={() => { closePopover(index); handleTabClick(`/admin/content/quizzesmanagement/createquiz/?s=${quiz.status}&qId=${quiz.quizId}`) }}>
                                                                    <Image src='/icons/edit-icon.svg' alt="edit" width={18} height={18} />
                                                                    <p>Edit</p>
                                                                </button>
                                                            )}
                                                            {quiz.status === 'live' && (
                                                                <button className="flex flex-row w-[10.438rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={() => { closePopover(index); openPausedQuiz(quiz.quizId) }}>
                                                                    <Image src='/icons/pause-dark.svg' alt="pause quiz" width={18} height={18} />
                                                                    <p>Pause</p>
                                                                </button>
                                                            )}
                                                            {quiz.status === 'finished' && (
                                                                <button className="flex flex-row w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={() => { openViewAnalytics(); closePopover(index); }}>
                                                                    <Image src='/icons/analytics-01.svg' alt="view analytics" width={18} height={18} />
                                                                    <p>View Analytics</p>
                                                                </button>
                                                            )}


                                                            {/* Option 3: Resume Quiz (only if status is Paused) */}
                                                            {quiz.status === 'paused' && (
                                                                <button className="flex flex-row w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={() => { closePopover(index); openResumeQuiz(quiz.quizId) }}>
                                                                    <Image src='/icons/play-dark.svg' alt="resume quiz" width={20} height={20} />
                                                                    <p>Resume</p>
                                                                </button>
                                                            )}
                                                            {quiz.status === 'saved' && (
                                                                <button className="flex flex-row w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors">
                                                                    <Image src='/icons/copy.svg' alt="resume quiz" width={18} height={18} />
                                                                    <p>Duplicate</p>
                                                                </button>
                                                            )}

                                                            {/* Option 3: Schedule Quiz (only if status is Paused) */}
                                                            {quiz.status === 'paused' && (
                                                                <button className="flex flex-row w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors" onClick={() => { closePopover(index); openScheduledDialog(quiz.quizId, quiz.startDate, quiz.endDate) }}>
                                                                    <Image src='/icons/calendar-03.svg' alt="schedule" width={18} height={18} />
                                                                    <p>Schedule</p>
                                                                </button>
                                                            )}

                                                            {/* Option 4: Delete Quiz */}

                                                            {quiz.status === 'paused' && (
                                                                <button className="flex flex-row w-full px-4 py-[0.625rem] gap-2 hover:bg-[#FEE4E2]  transition-colors"
                                                                    onClick={() => { closePopover(index); openDeleteDialog(quiz.quizId, quiz.title) }}>
                                                                    <Image src='/icons/delete.svg' alt="delete" width={18} height={18} />
                                                                    <p className="text-[#DE3024]">Delete</p>
                                                                </button>
                                                            )}
                                                            {quiz.status === 'scheduled' && (
                                                                <button className="flex flex-row w-full px-4 py-[0.625rem] gap-2 hover:bg-[#FEE4E2]  transition-colors"
                                                                    onClick={() => { closePopover(index); openDeleteDialog(quiz.quizId, quiz.title) }}>
                                                                    <Image src='/icons/delete.svg' alt="delete" width={18} height={18} />
                                                                    <p className="text-[#DE3024]">Delete</p>
                                                                </button>
                                                            )}
                                                            {quiz.status === 'finished' && (
                                                                <button className="flex flex-row w-full px-4 py-[0.625rem] gap-2 hover:bg-[#FEE4E2] transition-colors"
                                                                    onClick={() => { closePopover(index); openDeleteDialog(quiz.quizId, quiz.title) }}>
                                                                    <Image src='/icons/delete.svg' alt="delete" width={18} height={18} />
                                                                    <p className="text-[#DE3024]">Delete</p>
                                                                </button>
                                                            )}
                                                            {quiz.status === 'saved' && (
                                                                <button className="flex flex-row w-full px-4 py-[0.625rem] gap-2 hover:bg-[#FEE4E2]  transition-colors"
                                                                    onClick={() => { closePopover(index); openDeleteDialog(quiz.quizId, quiz.title) }}>
                                                                    <Image src='/icons/delete.svg' alt="delete" width={18} height={18} />
                                                                    <p className="text-[#DE3024]">Delete</p>
                                                                </button>
                                                            )}
                                                            {quiz.status === 'live' && (
                                                                <button className="flex flex-row w-full px-4 py-[0.625rem] gap-2 hover:bg-[#FEE4E2]  transition-colors"
                                                                    onClick={() => { closePopover(index); openEndQuiz(quiz.quizId) }}>
                                                                    <Image src='/icons/license-no.svg' alt="end quiz" width={18} height={18} />
                                                                    <p className="text-[#DE3024]">End</p>
                                                                </button>
                                                            )}

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
                                                        No quizzes found for &quot;{searchTerm}&quot;
                                                    </p>
                                                )}
                                                {!isTextSearch && (
                                                    <p className="text-[#667085] text-sm">
                                                        No quizzes found
                                                    </p>
                                                )}
                                            </td>
                                        </tr>
                                    )}
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
            {isDeleteDialogOpen && <DeleteDialog onClose={closeDeleteDialog} open={true} fromContent="quiz" contentId={quizId} contentName={quizName} />}
            {isScheduledDialogOpen && <ScheduledDialog onClose={() => setIsScheduledDialogOpen(false)} fromContent="quiz" contentId={quizId || ''} startDate={startDate} endDate={endDate} setEndDate={setEndDate} setLiveNow={setLiveCourseNow} liveNow={liveCourseNow} setStartDate={setStartDate} />}
            {isEndDialogOpen && <EndDialog onClose={() => setIsEndDialogOpen(false)} fromContent="quiz" contentId={quizId || ''} />}
            {isPausedDialogOpen && <PausedDialog onClose={() => setIsPausedDialogOpen(false)} fromContent="quiz" contentId={quizId || ''} />}
            {isResumeOpen && < ResumeQuiz open={isResumeOpen} onClose={() => setIsResumeOpen(false)} fromContent="quiz" contentId={quizId || ''} />}
            {isViewAnalyticsOpen && < ViewAnalytics onClose={closeViewAnalytics} open={true} />}
            <ToastContainer />
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