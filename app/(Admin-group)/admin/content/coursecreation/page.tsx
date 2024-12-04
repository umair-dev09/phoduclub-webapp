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
import { Pause } from "lucide-react";
import ScheduledDialog from "@/components/AdminComponents/QuizInfoDailogs/scheduledDailog";
import Delete from "@/components/AdminComponents/QuizInfoDailogs/DeleteDailogue";
import End from "@/components/AdminComponents/QuizInfoDailogs/EndDailogue";
import Paused from "@/components/AdminComponents/QuizInfoDailogs/PauseDailogue";
import MakeLiveNow from "@/components/AdminComponents/QuizInfoDailogs/MakeLiveNow";
import Resume from "@/components/AdminComponents/QuizInfoDailogs/ResumeDailogue";
import ViewAnalytics from "@/components/AdminComponents/QuizInfoDailogs/ViewAnalytics";
import Status from '@/components/AdminComponents/QuizzesManagement/quizStatus';

// Define types for course data
interface Course {
    title: string;
    price: number; // Replaced 'questions' with 'price'
    date: string; // Can be Date type if desired
    opted: number;
    participated: number;
    status: 'live' | 'paused' | 'finished' | 'scheduled' | 'ended' | 'saved'; // Converted to lowercase
}

// Mock fetchCourses function with updated types
const fetchCourses = async (): Promise<Course[]> => {
    const allCourses: Course[] = [
        { title: 'Maths', price: 250, date: 'Jan 6, 2024', opted: 2147, participated: 2147, status: 'live' },
        { title: 'Ancient Civilizations', price: 180, date: 'Mar 15, 2024', opted: 900, participated: 900, status: 'saved' },
        { title: 'Science', price: 300, date: 'Jan 8, 2024', opted: 1875, participated: 1875, status: 'paused' },
        { title: 'Astronomy', price: 220, date: 'Mar 17, 2024', opted: 1250, participated: 1250, status: 'saved' },
        { title: 'History', price: 270, date: 'Jan 10, 2024', opted: 1290, participated: 1290, status: 'finished' },
        { title: 'Geography', price: 150, date: 'Jan 12, 2024', opted: 950, participated: 950, status: 'ended' },
        { title: 'Physics', price: 320, date: 'Feb 1, 2024', opted: 1800, participated: 1800, status: 'scheduled' },
        { title: 'Chemistry', price: 290, date: 'Feb 3, 2024', opted: 1600, participated: 1600, status: 'live' },
        { title: 'Creative Writing', price: 210, date: 'Mar 22, 2024', opted: 1400, participated: 1400, status: 'saved' },
        { title: 'English Literature', price: 200, date: 'Feb 5, 2024', opted: 1950, participated: 1950, status: 'paused' },
        { title: 'Marine Biology', price: 310, date: 'Mar 20, 2024', opted: 1150, participated: 1150, status: 'saved' },
        { title: 'Biology', price: 280, date: 'Feb 8, 2024', opted: 2100, participated: 2100, status: 'finished' },
        { title: 'Computer Science', price: 400, date: 'Feb 10, 2024', opted: 2200, participated: 2200, status: 'ended' },
        { title: 'Anthropology', price: 180, date: 'Mar 28, 2024', opted: 1100, participated: 1100, status: 'saved' },
        { title: 'Art History', price: 220, date: 'Feb 12, 2024', opted: 1700, participated: 1700, status: 'live' },
        { title: 'Philosophy', price: 260, date: 'Feb 15, 2024', opted: 1300, participated: 1300, status: 'scheduled' },
        { title: 'Economics', price: 290, date: 'Feb 18, 2024', opted: 1450, participated: 1450, status: 'finished' },
        { title: 'Public Health', price: 200, date: 'Apr 2, 2024', opted: 1450, participated: 1450, status: 'saved' },
        { title: 'Political Science', price: 240, date: 'Feb 20, 2024', opted: 1900, participated: 1900, status: 'paused' },
        { title: 'Neuroscience', price: 310, date: 'Apr 6, 2024', opted: 1250, participated: 1250, status: 'saved' },
        { title: 'Sociology', price: 230, date: 'Feb 25, 2024', opted: 1750, participated: 1750, status: 'live' },
        { title: 'Psychology', price: 280, date: 'Mar 1, 2024', opted: 2000, participated: 2000, status: 'ended' },
        { title: 'Environmental Science', price: 190, date: 'Mar 3, 2024', opted: 1500, participated: 1500, status: 'scheduled' },
        { title: 'World History', price: 250, date: 'Mar 5, 2024', opted: 1850, participated: 1850, status: 'finished' },
        { title: 'Ethics', price: 220, date: 'Mar 30, 2024', opted: 1000, participated: 1000, status: 'saved' },
        { title: 'Statistics', price: 300, date: 'Mar 8, 2024', opted: 1700, participated: 1700, status: 'live' },
        { title: 'Robotics', price: 280, date: 'Apr 4, 2024', opted: 1350, participated: 1350, status: 'saved' },
        { title: 'Business Studies', price: 310, date: 'Mar 10, 2024', opted: 1400, participated: 1400, status: 'paused' },
        { title: 'Music Theory', price: 150, date: 'Mar 12, 2024', opted: 1200, participated: 1200, status: 'ended' },
        { title: 'Genetics', price: 270, date: 'Mar 25, 2024', opted: 1300, participated: 1300, status: 'saved' },
        { title: 'Linguistics', price: 200, date: 'Apr 10, 2024', opted: 1050, participated: 1050, status: 'saved' }
    ]
    return allCourses;
};

type Option = 'Saved' | 'Live' | 'Scheduled' | 'Pause' | 'Finished' | 'Canceled';

function Course() {
    const [data, setData] = useState<Course[]>([]);
    const [Courses, setCourses] = useState<Course[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    // Fetch courses when component mounts
    useEffect(() => {
        const loadCourses = async () => {
            setLoading(true);
            const coourses = await fetchCourses();
            setCourses(coourses);
            setData(coourses);
            setLoading(false);
        };
        loadCourses();
    }, []);

    // Filter courses based on search term
    useEffect(() => {
        const filteredCourses = Courses.filter(course =>
            course.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setData(filteredCourses);
        setCurrentPage(1); // Reset to first page on new search
    }, [searchTerm, Courses]);

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
    const [isResumeOpen, setIsResumeOpen] = useState(false);
    const [isViewAnalyticsOpen, setIsViewAnalyticsOpen] = useState(false);
    const [isSelcetDateOpen, setIsSelectDateOpen] = useState(false);

    // Handlers for ScheduledDialog
    const openScheduledDialog = () => setIsScheduledDialogOpen(true);
    const closeScheduledDialog = () => setIsScheduledDialogOpen(false);

    // Handlers for DeleteCourse dialog
    const openDeleteDialog = () => setIsDeleteDialogOpen(true);
    const closeDeleteDialog = () => setIsDeleteDialogOpen(false);

    // Handlers for EndCourse dialog
    const openEnd = () => setIsEndDialogOpen(true);
    const closeEnd = () => setIsEndDialogOpen(false);

    // Handlers for  Paused dialog
    const openPaused = () => setIsPausedDialogOpen(true);
    const closePaused = () => setIsPausedDialogOpen(false);

    // Handlers for  MakeLiveNow dialog
    const openMakeLiveNow = () => setIsMakeLiveNowDialogOpen(true);
    const closeMakeLiveNow = () => setIsMakeLiveNowDialogOpen(false);

    // Handlers for Resume dialog
    const openResume = () => setIsResumeOpen(true);
    const closeResume = () => setIsResumeOpen(false);

    // Handlers for ViewAnalytics dialog
    const openViewAnalytics = () => setIsViewAnalyticsOpen(true);
    const closeViewAnalytics = () => setIsViewAnalyticsOpen(false);

    const options: Option[] = ["Saved", "Live", "Scheduled", "Pause", "Finished", "Canceled"];

    const statusMapping: Record<Option, string[]> = {
        'Saved': ['saved'],
        'Live': ['live'],
        'Scheduled': ['scheduled'],
        'Pause': ['paused'],
        'Finished': ['finished'],
        'Canceled': ['ended']  // Map 'Canceled' to 'ended' status
    };

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

    // Format selected date as 'Nov 9, 2024'
    const formattedDate = selectedDate
        ? selectedDate.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })
        : "Select dates";

    const toggleCheckbox = (option: Option) => {
        setCheckedState((prevState) => ({
            ...prevState,
            [option]: !prevState[option],
        }));
    };

    useEffect(() => {
        let filteredCourses = Courses;

        // Filter by search term
        if (searchTerm) {
            filteredCourses = filteredCourses.filter(course =>
                course.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by selected statuses
        const selectedStatuses = Object.entries(checkedState)
            .filter(([_, isChecked]) => isChecked)
            .map(([status]) => statusMapping[status as Option])
            .flat();

        if (selectedStatuses.length > 0) {
            filteredCourses = filteredCourses.filter(course =>
                selectedStatuses.includes(course.status)
            );
        }

        // Filter by selected date
        if (selectedDate) {
            const selectedDateString = selectedDate instanceof Date && !isNaN(selectedDate.getTime())
                ? selectedDate.toISOString().split('T')[0] // Convert to YYYY-MM-DD
                : null;

            if (selectedDateString) {
                filteredCourses = filteredCourses.filter(course => {
                    const courseDate = new Date(course.date); // Convert quiz.date string to Date object
                    const courseDateString = courseDate instanceof Date && !isNaN(courseDate.getTime())
                        ? courseDate.toISOString().split('T')[0]
                        : null;

                    return courseDateString === selectedDateString; // Compare only the date part (not time)
                });
            }
        }

        // Sort by quizPublishedDate in ascending order (earliest date first)
        filteredCourses = filteredCourses.sort((a, b) => {
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
        setData(filteredCourses);
        setCurrentPage(1); // Reset to first page when filters change
    }, [searchTerm, checkedState, Courses, selectedDate]);

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
                <span className="text-lg font-semibold text-[#1D2939]">Courses</span>
                <div className="flex flex-row gap-3">
                    {/* Search Button */}
                    <button className="h-[44px] w-[250px] rounded-md bg-[#FFFFFF] border border-solid border-[#D0D5DD] flex items-center">
                        <div className="flex flex-row items-center gap-2 w-full pl-2">
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
                    <Popover placement="bottom" isOpen={isSelcetDateOpen}>
                        <PopoverTrigger>
                            <button className="h-[44px] w-[143px] rounded-md bg-[#FFFFFF] border border-solid border-[#D0D5DD] flex items-center p-3" onClick={() => setIsSelectDateOpen(true)}>
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
                                color="secondary"
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
                            <button className="h-[44px] w-[126px] rounded-md bg-[#FFFFFF] outline-none border border-solid border-[#D0D5DD] flex items-center justify-between p-3 cursor-pointer">
                                <p className={`flex flex-row font-medium text-sm ${selectedCount > 0 ? 'text-[#182230]' : 'text-[#667085]'}`}>
                                    {selectedCount > 0 ? `${selectedCount} selected` : 'By status'}
                                </p>
                                <Image
                                    src="/icons/selectdate-Arrowdown.svg"
                                    width={20}
                                    height={20}
                                    alt="Arrow-Down Button"
                                />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="flex flex-col w-full h-auto px-0 bg-white border border-lightGrey rounded-md">
                            <div>
                                {options.map((option) => (
                                    <div
                                        key={option}
                                        className="flex flex-row items-center w-full py-[0.625rem] px-4 gap-2 cursor-pointer transition-colors hover:bg-[#F2F4F7]"
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

                    {/* Create Course Button */}
                    <button
                        className="h-[44px] w-[135px] bg-[#8501FF] rounded-md shadow-inner-button border border-solid border-[#800EE2] flex items-center justify-center"
                        onClick={() => handleTabClick('/admin/content/coursecreation/createcourse')}
                    >
                        <span className="text-[#FFFFFF] font-semibold text-sm">Create Course</span>
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-48">
                    <span className="text-lg">Loading courses...</span>
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
                                        <th className="w-[28%] text-left px-8 py-4 pl-8 rounded-tl-xl text-[#667085] font-medium text-sm">
                                            Courses
                                        </th>
                                        <th className="text-center px-8 py-4 text-[#667085] font-medium text-sm">
                                            <div className="flex flex-row justify-center gap-1">
                                                <p>Price</p>
                                                <Image src='/icons/unfold-more-round.svg' alt="more" width={16} height={16} />
                                            </div>
                                        </th>
                                        <th className="text-center px-8 py-4 text-[#667085] font-medium text-sm">
                                            <div className="flex flex-row justify-center gap-1">
                                                <p>Published on</p>
                                                <Image src='/icons/unfold-more-round.svg' alt="more" width={16} height={16} />
                                            </div>
                                        </th>
                                        <th className="text-center px-8 py-4 text-[#667085] font-medium text-sm">
                                            <div className="flex flex-row justify-center gap-1">
                                                <p>Opted</p>
                                                <Image src='/icons/unfold-more-round.svg' alt="more" width={16} height={16} />
                                            </div>
                                        </th>
                                        <th className="text-center px-8 py-4 text-[#667085] font-medium text-sm">
                                            <div className="flex flex-row justify-center gap-1">
                                                <p>Participated</p>
                                                <Image src='/icons/unfold-more-round.svg' alt="more" width={16} height={16} />
                                            </div>
                                        </th>
                                        <th className="flex px-8 py-4 rounded-tr-xl text-[#667085] font-medium text-sm">
                                            <span className="">
                                                Status
                                            </span>
                                        </th>
                                        <th className="w-[12%] text-center px-8 py-4 rounded-tr-xl text-[#667085] font-medium text-sm">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((course, index) => (
                                        <tr key={index} className="border-t border-solid border-[#EAECF0]">
                                            <td onClick={() => handleTabClick('/admin/content/coursecreation/courseinfo')}>
                                                <button className="flex flex-row items-center px-8 py-3 gap-2 text-[#9012FF] underline text-sm font-medium">
                                                    <Image src='/images/TSM-DP.png' alt="DP" width={40} height={40} />
                                                    <p className="text-start">BITSET Full Course</p>
                                                </button>
                                            </td>
                                            <td className="px-8 py-4 text-center text-[#101828] text-sm"><span className="mr-1">&#8377;</span>{course.price}</td>
                                            <td className="px-8 py-4 text-center text-[#101828] text-sm">{course.date}</td>
                                            <td className="px-8 py-4 text-center text-[#101828] text-sm">{course.opted}</td>
                                            <td className="px-8 py-4 text-center text-[#101828] text-sm">{course.participated}</td>
                                            <td className="px-8 py-4 text-[#101828] text-sm">
                                                <span className='flex items-center justify-start rounded-full'>
                                                    <Status status={course.status} />
                                                </span>
                                            </td>
                                            <td className="flex items-center justify-center px-8 py-4 text-[#101828] text-sm">
                                                <Popover placement="bottom-end">
                                                    <PopoverTrigger className="outline-none">
                                                        <button className="ml-[30%]">
                                                            <Image
                                                                src="/icons/three-dots.svg"
                                                                width={20}
                                                                height={20}
                                                                alt="More Actions"
                                                            />
                                                        </button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className={`flex flex-col items-start text-sm font-normal py-1 px-0 bg-white border border-lightGrey rounded-md ${course.status === 'paused' ? 'w-[11.563rem]' : 'w-[10.438rem]'}`}>
                                                        {/* Option 1: Edit Course */}
                                                        <div>
                                                            {course.status === 'paused' && (
                                                                <div className="flex flex-row w-[11.563rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={() => handleTabClick('/admin/content/quizzesmanagement/createquiz')}>
                                                                    <Image src='/icons/edit-icon.svg' alt="edit" width={18} height={18} />
                                                                    <p>Edit</p>
                                                                </div>
                                                            )}
                                                            {course.status === 'scheduled' && (
                                                                <div className="flex flex-row w-[10.438rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={() => handleTabClick('/admin/content/quizzesmanagement/createquiz')}>
                                                                    <Image src='/icons/edit-icon.svg' alt="edit" width={18} height={18} />
                                                                    <p>Edit</p>
                                                                </div>
                                                            )}
                                                            {course.status === 'saved' && (
                                                                <div className="flex flex-row w-[10.438rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={() => handleTabClick('/admin/content/quizzesmanagement/createquiz')}>
                                                                    <Image src='/icons/edit-icon.svg' alt="edit" width={18} height={18} />
                                                                    <p>Edit</p>
                                                                </div>
                                                            )}
                                                            {course.status === 'live' && (
                                                                <div className="flex flex-row w-[10.438rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={openPaused}>
                                                                    <Image src='/icons/pause-dark.svg' alt="pause" width={18} height={18} />
                                                                    <p>Pause</p>
                                                                </div>
                                                            )}
                                                            {course.status === 'finished' && (
                                                                <div className="flex flex-row w-[10.438rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={openViewAnalytics}>
                                                                    <Image src='/icons/analytics-01.svg' alt="view analytics" width={18} height={18} />
                                                                    <p>View Analytics</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                        {/* Option 3: Resume Course (only if status is Paused) */}
                                                        {course.status === 'paused' && (
                                                            <div className="flex flex-row w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                onClick={openResume}>
                                                                <Image src='/icons/play-dark.svg' alt="resume" width={20} height={20} />
                                                                <p>Resume</p>
                                                            </div>
                                                        )}
                                                        {/* Option 3: Schedule Course (only if status is Paused) */}
                                                        {course.status === 'paused' && (
                                                            <Popover placement="left-start">
                                                                <PopoverTrigger>
                                                                    <div className="flex flex-row justify-between w-[11.563rem] px-4 py-[0.625rem] hover:bg-[#F2F4F7] transition-colors">
                                                                        <div className="flex flex-row gap-2">
                                                                            <Image src='/icons/calendar-03.svg' alt="schedule" width={18} height={18} />
                                                                            <p>Schedule</p>
                                                                        </div>
                                                                        <Image src='/icons/collapse-right-02.svg' alt="schedule popup" width={18} height={18} />
                                                                    </div>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="flex flex-col items-start text-sm font-normal py-1 px-0 bg-white border border-lightGrey rounded-md w-[11.25rem]">
                                                                    <div className="w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors" onClick={openScheduledDialog}>Schedule</div>
                                                                    <div className="w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors">Make Live Now</div>
                                                                </PopoverContent>
                                                            </Popover>
                                                        )}
                                                        {/* Option 4: Delete Course */}
                                                        <div>
                                                            {course.status === 'paused' && (
                                                                <div className="flex flex-row w-[11.563rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={openDeleteDialog}>
                                                                    <Image src='/icons/delete.svg' alt="delete" width={18} height={18} />
                                                                    <p className="text-[#DE3024]">Delete</p>
                                                                </div>
                                                            )}
                                                            {course.status === 'scheduled' && (
                                                                <div className="flex flex-row w-[10.438rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={openDeleteDialog}>
                                                                    <Image src='/icons/delete.svg' alt="delete" width={18} height={18} />
                                                                    <p className="text-[#DE3024]">Delete</p>
                                                                </div>
                                                            )}
                                                            {course.status === 'finished' && (
                                                                <div className="flex flex-row w-[10.438rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={openDeleteDialog}>
                                                                    <Image src='/icons/delete.svg' alt="delete" width={18} height={18} />
                                                                    <p className="text-[#DE3024]">Delete</p>
                                                                </div>
                                                            )}
                                                            {course.status === 'saved' && (
                                                                <div className="flex flex-row w-[10.438rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={openDeleteDialog}>
                                                                    <Image src='/icons/delete.svg' alt="delete" width={18} height={18} />
                                                                    <p className="text-[#DE3024]">Delete</p>
                                                                </div>
                                                            )}
                                                            {course.status === 'live' && (
                                                                <div className="flex flex-row w-[10.438rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={openEnd}>
                                                                    <Image src='/icons/license-no.svg' alt="end" width={18} height={18} />
                                                                    <p className="text-[#DE3024]">End</p>
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
            {isDeleteDialogOpen && <Delete onClose={closeDeleteDialog} open={true} />}
            {isEndDialogOpen && <End onClose={closeEnd} />}
            {isPausedDialogOpen && <Paused onClose={closePaused} />}
            {isMakeLiveNowDialogOpen && < MakeLiveNow onClose={closeMakeLiveNow} open={true} />}
            {isResumeOpen && < Resume onClose={closeResume} open={true} />}
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

export default Course;