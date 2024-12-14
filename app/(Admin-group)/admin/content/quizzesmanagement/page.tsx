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
import DeleteQuiz from "@/components/AdminComponents/QuizInfoDailogs/DeleteDailogue";
import EndQuiz from "@/components/AdminComponents/QuizInfoDailogs/EndDailogue";
import PausedQuiz from "@/components/AdminComponents/QuizInfoDailogs/PauseDailogue";
import MakeLiveNow from "@/components/AdminComponents/QuizInfoDailogs/MakeLiveNow";
import ResumeQuiz from "@/components/AdminComponents/QuizInfoDailogs/ResumeDailogue";
import ViewAnalytics from "@/components/AdminComponents/QuizInfoDailogs/ViewAnalytics";
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { db } from "@/firebase";
import type { DateValue } from "@react-types/calendar"; // Correct import for DateValue from React Spectrum
import StatusDisplay from "@/components/AdminComponents/StatusDisplay";

// Define types for quiz data
interface Quiz {
    title: string;
    questions: number;
    quizId: string;
    date: string; // Can be Date type if desired
    students: number;
    status: string;
    quizPublishedDate: string;
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
const fetchQuizzes = async (): Promise<Quiz[]> => {
    const quizzesCollection = collection(db, 'quiz');
    const quizzesSnapshot = await getDocs(quizzesCollection);

    const quizzesData = await Promise.all(
        quizzesSnapshot.docs.map(async (quizDoc) => {
            const quizData = quizDoc.data();
            const quizId = quizDoc.id;

            // Get subcollection counts
            const questionsCollection = collection(db, 'quiz', quizId, 'Questions');
            const questionsSnapshot = await getDocs(questionsCollection);
            const questionsCount = questionsSnapshot.size;

            const studentsAttemptedCollection = collection(db, 'quiz', quizId, 'studentsAttempted');
            const studentsAttemptedSnapshot = await getDocs(studentsAttemptedCollection);
            const studentsCount = studentsAttemptedSnapshot.size;

            return {
                title: quizData.quizName,
                questions: questionsCount,
                quizId: quizData.quizId,
                date: formatDate(quizData.quizPublishedDate),
                students: studentsCount,
                status: quizData.quizStatus,
            } as Quiz;
        })
    );

    return quizzesData;
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

    // Ensure `data` is correctly sliced for the current page
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
    const [isSelcetDateOpen, setIsSelectDateOpen] = useState(false);

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

    const statusMapping: Record<Option, string[]> = {
        Saved: ['saved'],
        Live: ['live'],
        Scheduled: ['scheduled'],
        Pause: ['paused'],    // Maps to 'paused' status in lowercase
        Finished: ['finished'],
        Canceled: ['ended']   // Maps to 'ended' status in lowercase
    };

    const [checkedState, setCheckedState] = useState<Record<Option, boolean>>({
        Saved: false,
        Live: false,
        Scheduled: false,
        Pause: false,
        Finished: false,
        Canceled: false,
    });

    const toggleCheckbox = (option: Option) => {
        setCheckedState((prevState) => ({
            ...prevState,
            [option]: !prevState[option],
        }));
    };

    const options: Option[] = ["Saved", "Live", "Scheduled", "Pause", "Finished", "Canceled"];

    const selectedCount = Object.values(checkedState).filter(Boolean).length;
    const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Store selected date as Date object

    useEffect(() => {
        let filteredQuizzes = quizzes;

        // Filter by search term
        if (searchTerm) {
            filteredQuizzes = filteredQuizzes.filter(quiz =>
                quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by selected statuses
        const selectedStatuses = Object.entries(checkedState)
            .filter(([_, isChecked]) => isChecked)
            .map(([status]) => statusMapping[status as Option])
            .flat();

        if (selectedStatuses.length > 0) {
            filteredQuizzes = filteredQuizzes.filter(quiz =>
                selectedStatuses.includes(quiz.status)
            );
        }

        // Filter by selected date
        if (selectedDate) {
            const selectedDateString = selectedDate instanceof Date && !isNaN(selectedDate.getTime())
                ? selectedDate.toISOString().split('T')[0] // Convert to YYYY-MM-DD
                : null;

            if (selectedDateString) {
                filteredQuizzes = filteredQuizzes.filter(quiz => {
                    const quizDate = new Date(quiz.date); // Convert quiz.date string to Date object
                    const quizDateString = quizDate instanceof Date && !isNaN(quizDate.getTime())
                        ? quizDate.toISOString().split('T')[0]
                        : null;

                    return quizDateString === selectedDateString; // Compare only the date part (not time)
                });
            }
        }

        // Sort by quizPublishedDate in ascending order (earliest date first)
        filteredQuizzes = filteredQuizzes.sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();

            // Handle invalid date values (e.g., when date cannot be parsed)
            if (isNaN(dateA) || isNaN(dateB)) {
                console.error("Invalid date value", a.date, b.date);
                return 0; // If dates are invalid, no sorting will occur
            }

            return dateA - dateB; // Sort by time in ascending order (earliest first)
        });

        // Update state with filtered and sorted quizzes
        setData(filteredQuizzes);
        setCurrentPage(1); // Reset to first page when filters change
    }, [searchTerm, checkedState, quizzes, selectedDate]);

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
        <div className="flex flex-col px-[32px] w-full gap-4 overflow-y-auto h-auto my-5">
            <div className="flex flex-row justify-between items-center">
                <span className="text-lg font-semibold text-[#1D2939]">Quizzes</span>
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
                    <Popover placement="bottom" isOpen={isSelcetDateOpen} onOpenChange={(open) => setIsSelectDateOpen(open)}>
                        <PopoverTrigger>
                            <button className="h-[44px] w-[143px] rounded-md bg-[#FFFFFF] outline-none border border-solid border-[#D0D5DD] flex items-center p-3">
                                <Image
                                    src="/icons/select-date.svg"
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

                    {/* By Status Button */}
                    <Popover placement="bottom-start">
                        <PopoverTrigger>
                            <div className="h-[44px] w-[126px] rounded-md bg-[#FFFFFF] border border-solid border-[#D0D5DD] flex items-center justify-between p-3 cursor-pointer">
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
                        className="h-[44px] w-[135px] bg-[#8501FF] rounded-md shadow-inner-button border border-solid border-[#800EE2] flex items-center justify-center"
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
                        <div className="border border-[#EAECF0] rounded-xl">
                            <table className="w-full bg-white rounded-xl">
                                <thead>
                                    <tr>
                                        <th className="w-1/4 text-left px-8 py-4 pl-8 rounded-tl-xl text-[#667085] font-medium text-sm">Quizzes</th>
                                        <th className="w-[17%] text-center px-8 py-4 text-[#667085] font-medium text-sm">
                                            <div className="flex flex-row justify-center gap-1">
                                                <p>Questions</p>
                                                <Image src='/icons/unfold-more-round.svg' alt="more" width={16} height={16} />
                                            </div>
                                        </th>
                                        <th className="w-[17%] text-center px-8 py-4 text-[#667085] font-medium text-sm">
                                            <div className="flex flex-row justify-center gap-1">
                                                <p>Published on</p>
                                                <Image src='/icons/unfold-more-round.svg' alt="more" width={16} height={16} />
                                            </div>
                                        </th>
                                        <th className="w-[17%] text-center px-8 py-4 text-[#667085] font-medium text-sm">
                                            <div className="flex flex-row justify-center gap-1">
                                                <p className="whitespace-nowrap">Students Attempted</p>
                                                <Image src='/icons/unfold-more-round.svg' alt="more" width={16} height={16} />
                                            </div>
                                        </th>
                                        <th className="w-[17%] text-center px-8 py-4 rounded-tr-xl text-[#667085] font-medium text-sm">Status</th>
                                        <th className="w-[12%] text-center px-8 py-4 rounded-tr-xl text-[#667085] font-medium text-sm">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((quiz, index) => (
                                        <tr key={index} className="border-t border-solid border-[#EAECF0]">
                                            <td onClick={() => handleTabClick(`/admin/content/quizzesmanagement/${quiz.title.toLowerCase().replace(/\s+/g, '-')}/?qId=${quiz.quizId}`)}><button className="px-8 py-4 text-[#9012FF] text-left underline text-sm font-medium">{quiz.title}</button></td>
                                            <td className="px-8 py-4 text-center text-[#101828] text-sm">{quiz.questions}</td>
                                            <td className="px-8 py-4 text-center text-[#101828] text-sm">{quiz.date}</td>
                                            <td className="px-8 py-4 text-center text-[#101828] text-sm">{quiz.students}</td>
                                            <td className="px-8 py-4 text-center text-[#101828] text-sm">
                                                <span className='flex items-center justify-start ml-[30%] rounded-full'>
                                                    <StatusDisplay status={quiz.status} />
                                                </span>
                                            </td>
                                            <td className="flex items-center justify-center px-8 py-4 text-[#101828] text-sm">
                                                <Popover placement="bottom-end">
                                                    <PopoverTrigger className="ml-[50%] outline-none">
                                                        <button>
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
                                                            {quiz.status === 'paused' && (
                                                                <button className="flex flex-row w-[11.563rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={() => handleTabClick('/admin/content/quizzesmanagement/createquiz')}>
                                                                    <Image src='/icons/edit-icon.svg' alt="edit" width={18} height={18} />
                                                                    <p>Edit</p>
                                                                </button>
                                                            )}
                                                            {quiz.status === 'scheduled' && (
                                                                <button className="flex flex-row w-[10.438rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={() => handleTabClick('/admin/content/quizzesmanagement/createquiz')}>
                                                                    <Image src='/icons/edit-icon.svg' alt="edit" width={18} height={18} />
                                                                    <p>Edit</p>
                                                                </button>
                                                            )}
                                                            {quiz.status === 'saved' && (
                                                                <button className="flex flex-row w-[10.438rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={() => handleTabClick('/admin/content/quizzesmanagement/createquiz')}>
                                                                    <Image src='/icons/edit-icon.svg' alt="edit" width={18} height={18} />
                                                                    <p>Edit</p>
                                                                </button>
                                                            )}
                                                            {quiz.status === 'live' && (
                                                                <button className="flex flex-row w-[10.438rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={openPausedQuiz}>
                                                                    <Image src='/icons/pause-dark.svg' alt="pause quiz" width={18} height={18} />
                                                                    <p>Pause</p>
                                                                </button>
                                                            )}
                                                            {quiz.status === 'finished' && (
                                                                <button className="flex flex-row w-[10.438rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={openViewAnalytics}>
                                                                    <Image src='/icons/analytics-01.svg' alt="view analytics" width={18} height={18} />
                                                                    <p>View Analytics</p>
                                                                </button>
                                                            )}
                                                        </div>

                                                        {/* Option 3: Resume Quiz (only if status is Paused) */}
                                                        {quiz.status === 'paused' && (
                                                            <button className="flex flex-row w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                onClick={openResumeQuiz}>
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
                                                            <Popover placement="left-start">
                                                                <PopoverTrigger>
                                                                    <button className="flex flex-row justify-between w-[11.563rem] px-4 py-[0.625rem] hover:bg-[#F2F4F7] transition-colors">
                                                                        <div className="flex flex-row gap-2">
                                                                            <Image src='/icons/calendar-03.svg' alt="schedule" width={18} height={18} />
                                                                            <p>Schedule</p>
                                                                        </div>
                                                                        <Image src='/icons/collapse-right-02.svg' alt="schedule popup" width={18} height={18} />
                                                                    </button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="flex flex-col items-start text-sm font-normal py-1 px-0 bg-white border border-lightGrey rounded-md w-[11.25rem]">
                                                                    <button className="w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors" onClick={openScheduledDialog}>Schedule</button>
                                                                    <button className="w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors">Make Live Now</button>
                                                                </PopoverContent>
                                                            </Popover>
                                                        )}

                                                        {/* Option 4: Delete Quiz */}
                                                        <div>
                                                            {quiz.status === 'paused' && (
                                                                <button className="flex flex-row w-[11.563rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={openDeleteDialog}>
                                                                    <Image src='/icons/delete.svg' alt="delete" width={18} height={18} />
                                                                    <p className="text-[#DE3024]">Delete</p>
                                                                </button>
                                                            )}
                                                            {quiz.status === 'scheduled' && (
                                                                <button className="flex flex-row w-[10.438rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={openDeleteDialog}>
                                                                    <Image src='/icons/delete.svg' alt="delete" width={18} height={18} />
                                                                    <p className="text-[#DE3024]">Delete</p>
                                                                </button>
                                                            )}
                                                            {quiz.status === 'finished' && (
                                                                <button className="flex flex-row w-[10.438rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={openDeleteDialog}>
                                                                    <Image src='/icons/delete.svg' alt="delete" width={18} height={18} />
                                                                    <p className="text-[#DE3024]">Delete</p>
                                                                </button>
                                                            )}
                                                            {quiz.status === 'saved' && (
                                                                <button className="flex flex-row w-[10.438rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={openDeleteDialog}>
                                                                    <Image src='/icons/delete.svg' alt="delete" width={18} height={18} />
                                                                    <p className="text-[#DE3024]">Delete</p>
                                                                </button>
                                                            )}
                                                            {quiz.status === 'live' && (
                                                                <button className="flex flex-row w-[10.438rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={openEndQuiz}>
                                                                    <Image src='/icons/license-no.svg' alt="end quiz" width={18} height={18} />
                                                                    <p className="text-[#DE3024]">End</p>
                                                                </button>
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