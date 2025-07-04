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
import Resume from "@/components/AdminComponents/QuizInfoDailogs/ResumeDailogue";
import ViewAnalytics from "@/components/AdminComponents/QuizInfoDailogs/ViewAnalytics";
import StatusDisplay from "@/components/AdminComponents/StatusDisplay";
import { collection, getDocs, query, where, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from "@/firebase";
import LoadingData from "@/components/Loading";
import React from "react";
import EndDialog from "@/components/AdminComponents/QuizInfoDailogs/EndDailogue";
import PausedDialog from "@/components/AdminComponents/QuizInfoDailogs/PauseDailogue";
import ResumeQuiz from "@/components/AdminComponents/QuizInfoDailogs/ResumeDailogue";
import DeleteDialog from "@/components/AdminComponents/QuizInfoDailogs/DeleteDailogue";
interface Course {
    courseName: string;
    price: number;
    discountPrice: number;
    courseId: string;
    date: string; // Can be Date type if desired
    courseImage: string;
    status: string;
    publishDate: string;
    startDate: string;
    endDate: string;
    studentsPurchased: number;
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


function Course() {
    const [data, setData] = useState<Course[]>([]);
    const [Courses, setCourses] = useState<Course[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();
    const [courseId, setCourseId] = useState('');
    const [courseName, setCourseName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [liveCourseNow, setLiveCourseNow] = useState(false);
    const [isScheduledDialogOpen, setIsScheduledDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isEndDialogOpen, setIsEndDialogOpen] = useState(false);
    const [isPausedDialogOpen, setIsPausedDialogOpen] = useState(false);
    // const [isMakeLiveNowDialogOpen, setIsMakeLiveNowDialogOpen] = useState(false);

    const [isResumeOpen, setIsResumeOpen] = useState(false);
    const [isViewAnalyticsOpen, setIsViewAnalyticsOpen] = useState(false);
    const [isSelcetDateOpen, setIsSelectDateOpen] = useState(false);
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
    useEffect(() => {
        const coursesCollection = collection(db, 'course');
        const unsubscribe = onSnapshot(coursesCollection, async (snapshot) => {
            // Use Promise.all to wait for all student counts to be fetched
            const coursesData = await Promise.all(snapshot.docs.map(async (courseDoc) => {
                const courseData = courseDoc.data();
                const courseDocId = courseDoc.id;

                // Get StudentsPurchased collection count
                const studentsPurchasedRef = collection(db, 'course', courseDocId, 'StudentsPurchased');
                const studentsPurchasedSnapshot = await getDocs(studentsPurchasedRef);
                const studentsPurchasedCount = studentsPurchasedSnapshot.size;

                return {
                    courseName: courseData.courseName,
                    courseId: courseData.courseId,
                    date: formatDate(courseData.publishDate),
                    status: courseData.status,
                    courseImage: courseData.courseImage,
                    price: courseData.price,
                    discountPrice: courseData.discountPrice,
                    studentsPurchased: studentsPurchasedCount
                } as Course;
            }));

            setCourses(coursesData);
            setData(coursesData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const [sortConfig, setSortConfig] = useState<{
        key: string;
        direction: 'asc' | null | 'desc';
    }>({
        key: 'publishedOn',
        direction: 'desc'
    });

    useEffect(() => {
        let filteredCourses = Courses;

        // Filter by search term
        if (searchTerm) {
            filteredCourses = filteredCourses.filter(course =>
                course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
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

        if (sortConfig.key && sortConfig.direction) {
            filteredCourses = filteredCourses.sort((a, b) => {
                if (sortConfig.key === 'studentsPurchased') {
                    return sortConfig.direction === 'asc'
                        ? a.studentsPurchased - b.studentsPurchased
                        : b.studentsPurchased - a.studentsPurchased;
                }
                if (sortConfig.key === 'discountPrice') {
                    return sortConfig.direction === 'asc'
                        ? a.discountPrice - b.discountPrice
                        : b.discountPrice - a.discountPrice;
                }
                if (sortConfig.key === 'publishedOn') {
                    const dateA = new Date(a.date).getTime();
                    const dateB = new Date(b.date).getTime();
                    return sortConfig.direction === 'asc'
                        ? dateA - dateB
                        : dateB - dateA;
                }
                return 0;
            });
        }

        // Update state with filtered and sorted quizzes
        setData(filteredCourses);
        setCurrentPage(1); // Reset to first page when filters change
    }, [searchTerm, checkedState, selectedDate, sortConfig]);

    const handleSort = (key: string) => {
        if (key === 'discountPrice' || key === 'publishedOn' || key === 'studentsPurchased') {
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

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = data.slice(firstItemIndex, lastItemIndex);

    // Function to handle tab click and navigate to a new route
    const handleTabClick = (path: string) => {
        router.push(path);

    };
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

    // State to manage each dialog's visibility


    const openScheduledDialog = (courseId: string, startDate: string, endDate: string) => {
        setCourseId(courseId);
        setStartDate(startDate);
        setEndDate(endDate);
        setIsScheduledDialogOpen(true);

    }
    const closeScheduledDialog = () => setIsScheduledDialogOpen(false);

    // Handlers for DeleteQuiz dialog
    const openDeleteDialog = (courseId: string, courseName: string) => {
        setIsDeleteDialogOpen(true);
        setCourseId(courseId);
        setCourseName(courseName);
    }
    const closeDeleteDialog = () => setIsDeleteDialogOpen(false);

    // Handlers for EndQuiz dialog
    const openEndQuiz = (courseId: string) => {
        setCourseId(courseId);
        setIsEndDialogOpen(true);
    }
    const closeEndQuiz = () => setIsEndDialogOpen(false);

    // Handlers for  PausedQuiz dialog
    const openPausedQuiz = (courseId: string) => {
        setCourseId(courseId);
        setIsPausedDialogOpen(true);
    }
    const closePausedQuiz = () => setIsPausedDialogOpen(false);

    // Handlers for ResumeQuiz dialog
    const openResumeQuiz = (courseId: string) => {
        setCourseId(courseId);
        setIsResumeOpen(true);
    }
    const closeResumeQuiz = () => setIsResumeOpen(false);

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
        <div className="flex flex-col px-[32px] w-full gap-4 overflow-y-auto overflow-x-hidden h-auto my-5">
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
                                maxLength={50}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </button>

                    {/* Select Date Button */}
                    <Popover placement="bottom" isOpen={isSelcetDateOpen} onOpenChange={(open) => setIsSelectDateOpen(open)}>
                        <PopoverTrigger>
                            <button className="h-[44px] w-[143px] hover:bg-[#F2F4F7] rounded-md bg-[#FFFFFF] border border-solid border-[#D0D5DD] flex items-center p-3 outline-none">
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

                    {/* By Status Button */}
                    <Popover placement="bottom-start">
                        <PopoverTrigger>
                            <button className="h-[44px]  hover:bg-[#F2F4F7] w-[126px] rounded-md bg-[#FFFFFF] outline-none border border-solid border-[#D0D5DD] flex items-center justify-between p-3 cursor-pointer">
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
                        className="h-[44px] w-[135px] bg-[#8501FF] rounded-md shadow-inner-button border border-[#800EE2] flex items-center justify-center transition-colors duration-150 hover:bg-[#6D0DCC]"
                        onClick={() => handleTabClick('/admin/content/coursecreation/createcourse')}
                    >
                        <span className="text-[#FFFFFF] font-semibold text-sm">Create Course</span>
                    </button>
                </div>
            </div>

            {loading ? (
                <LoadingData />
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
                        <div className="border border-[#EAECF0] rounded-xl overflow-x-auto h-full">
                            <table className="w-full bg-white rounded-xl">
                                <thead>
                                    <tr>
                                        <th className="w-[28%] text-left px-8 py-4 pl-8 rounded-tl-xl text-[#667085] font-medium text-sm">
                                            Courses
                                        </th>
                                        <th
                                            className="text-center px-8 py-4 text-[#667085] font-medium text-sm cursor-pointer"
                                            onClick={() => handleSort('discountPrice')}
                                        >
                                            <div
                                                className="flex flex-row justify-center gap-1"
                                            >
                                                <p>Price</p>
                                                <Image src='/icons/unfold-more-round.svg' alt="more" width={16} height={16} />
                                            </div>
                                        </th>
                                        <th
                                            className="text-center px-8 py-4 text-[#667085] font-medium text-sm cursor-pointer"
                                            onClick={() => handleSort('publishedOn')}
                                        >
                                            <div className="flex flex-row justify-center gap-1">
                                                <p>Published on</p>
                                                <Image src='/icons/unfold-more-round.svg' alt="more" width={16} height={16} />
                                            </div>
                                        </th>
                                        <th
                                            className="w-[20%] text-center px-8 py-4 text-[#667085] font-medium text-sm cursor-pointer"
                                            onClick={() => handleSort('studentsPurchased')}
                                        >
                                            <div className="flex flex-row justify-center gap-1">
                                                <p className="whitespace-nowrap">Students Purchased</p>
                                                <Image src='/icons/unfold-more-round.svg' alt="more" width={16} height={16} />
                                            </div>
                                        </th>
                                        <th className="w-[12%] text-center px-8 py-4 rounded-tr-xl text-[#667085] font-medium text-sm">
                                            <span className="">
                                                Status
                                            </span>
                                        </th>
                                        <th className="w-[12%] text-center px-8 py-4 rounded-tr-xl text-[#667085] font-medium text-sm">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.length > 0 ? (
                                        currentItems.map((course, index) => (
                                            <tr key={index} className="border-t border-solid border-[#EAECF0]">
                                                <td onClick={() => handleTabClick(`/admin/content/coursecreation/${course.courseName.toLowerCase().replace(/\s+/g, '-')}/?cId=${course.courseId}`)}>
                                                    <button className="flex flex-row items-center px-8 py-3 gap-2 text-[#9012FF] underline text-sm font-medium">
                                                        <Image className="w-10 h-10 rounded-full object-cover" src={course.courseImage || '/icons/Default_DP.svg'} alt="DP" width={40} height={40} />
                                                        <p className="text-start whitespace-nowrap">{course.courseName || '-'}</p>
                                                    </button>
                                                </td>
                                                <td className="px-8 py-4 text-center text-[#101828] text-sm"><span className="mr-1">&#8377;</span>{course.discountPrice || '-'}</td>
                                                <td className="px-8 py-4 text-center text-[#101828] text-sm whitespace-nowrap">{course.date || '-'}</td>
                                                <td className="px-8 py-4 text-center text-[#101828] text-sm">{course.studentsPurchased || 0}</td>
                                                {/* <td className="px-8 py-4 text-center text-[#101828] text-sm">134</td> */}
                                                <td className="px-8 py-4 text-[#101828] text-sm">
                                                    <span className='flex items-center justify-center rounded-full'>
                                                        <StatusDisplay status={course.status} />
                                                    </span>
                                                </td>
                                                <td className="flex items-center justify-center px-8 py-4 text-center text-[#101828] text-sm">
                                                    <Popover placement="bottom-end" isOpen={!!openPopovers[index]}
                                                        onOpenChange={() => closePopover(index)}>
                                                        <PopoverTrigger className="flex outline-none">
                                                            <button className="ml-[30%]" onClick={(e) => { e.stopPropagation(); togglePopover(index) }}>
                                                                <button className="w-[32px] h-[32px] rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                                                                    <Image
                                                                        src="/icons/three-dots.svg"
                                                                        width={20}
                                                                        height={20}
                                                                        alt="More Actions"
                                                                    />
                                                                </button>
                                                            </button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className={`flex flex-col items-center text-sm font-normal py-1 px-0 bg-white border border-lightGrey rounded-md ${course.status === 'paused' ? 'w-[11.563rem]' : 'w-[10.438rem]'}`}>
                                                            {/* Option 1: Edit Course */}

                                                            {course.status === 'paused' && (
                                                                <button className="flex flex-row w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={() => router.push(`/admin/content/coursecreation/createcourse/?s=${course.status}&cId=${course.courseId}`)}>
                                                                    <Image src='/icons/edit-icon.svg' alt="edit" width={18} height={18} />
                                                                    <p>Edit</p>
                                                                </button>
                                                            )}
                                                            {course.status === 'scheduled' && (
                                                                <button className="flex flex-row w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={() => router.push(`/admin/content/coursecreation/createcourse/?s=${course.status}&cId=${course.courseId}`)}>
                                                                    <Image src='/icons/edit-icon.svg' alt="edit" width={18} height={18} />
                                                                    <p>Edit</p>
                                                                </button>
                                                            )}
                                                            {course.status === 'saved' && (
                                                                <button className="flex flex-row w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={() => router.push(`/admin/content/coursecreation/createcourse/?s=${course.status}&cId=${course.courseId}`)}>
                                                                    <Image src='/icons/edit-icon.svg' alt="edit" width={18} height={18} />
                                                                    <p>Edit</p>
                                                                </button>
                                                            )}
                                                            {course.status === 'live' && (
                                                                <button className="flex flex-row w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={() => { closePopover(index); openPausedQuiz(course.courseId) }}>
                                                                    <Image src='/icons/pause-dark.svg' alt="pause" width={18} height={18} />
                                                                    <p>Pause</p>
                                                                </button>
                                                            )}
                                                            {course.status === 'finished' && (
                                                                <button className="flex flex-row w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={() => { closePopover(index); openViewAnalytics; setIsViewAnalyticsOpen(true) }}>
                                                                    <Image src='/icons/analytics-01.svg' alt="view analytics" width={18} height={18} />
                                                                    <p>View Analytics</p>
                                                                </button>
                                                            )}

                                                            {/* Option 3: Resume Course (only if status is Paused) */}
                                                            {course.status === 'paused' && (
                                                                <button className="flex flex-row w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={() => { closePopover(index); openResumeQuiz(course.courseId) }}>
                                                                    <Image src='/icons/play-dark.svg' alt="resume" width={20} height={20} />
                                                                    <p>Resume</p>
                                                                </button>
                                                            )}
                                                            {/* Option 3: Schedule Course (only if status is Paused) */}
                                                            {course.status === 'paused' && (
                                                                <button className="flex flex-row w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={() => { closePopover(index); openScheduledDialog(course.courseId, course.startDate, course.endDate) }}>
                                                                    <Image src='/icons/calendar-03.svg' alt="schedule" width={18} height={18} />
                                                                    <p>Schedule</p>
                                                                </button>
                                                            )}
                                                            {/* Option 4: Delete Course */}

                                                            {course.status === 'paused' && (
                                                                <button className="flex flex-row w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={() => { closePopover(index); openDeleteDialog(course.courseId, course.courseName) }}>
                                                                    <Image src='/icons/delete.svg' alt="delete" width={18} height={18} />
                                                                    <p className="text-[#DE3024]">Delete</p>
                                                                </button>
                                                            )}
                                                            {course.status === 'scheduled' && (
                                                                <button className="flex flex-row w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={() => { closePopover(index); openDeleteDialog(course.courseId, course.courseName) }}>
                                                                    <Image src='/icons/delete.svg' alt="delete" width={18} height={18} />
                                                                    <p className="text-[#DE3024]">Delete</p>
                                                                </button>
                                                            )}
                                                            {course.status === 'finished' && (
                                                                <button className="flex flex-row w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={() => { closePopover(index); openDeleteDialog(course.courseId, course.courseName) }}>
                                                                    <Image src='/icons/delete.svg' alt="delete" width={18} height={18} />
                                                                    <p className="text-[#DE3024]">Delete</p>
                                                                </button>
                                                            )}
                                                            {course.status === 'saved' && (
                                                                <button className="flex flex-row w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={() => { closePopover(index); openDeleteDialog(course.courseId, course.courseName) }}>
                                                                    <Image src='/icons/delete.svg' alt="delete" width={18} height={18} />
                                                                    <p className="text-[#DE3024]">Delete</p>
                                                                </button>
                                                            )}
                                                            {course.status === 'live' && (
                                                                <button className="flex flex-row w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={() => { closePopover(index); openEndQuiz(course.courseName) }}>
                                                                    <Image src='/icons/license-no.svg' alt="end" width={18} height={18} />
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
                                            <td colSpan={7} className="text-center py-8">
                                                {isTextSearch && (
                                                    <p className="text-[#667085] text-sm">
                                                        No courses found for &quot;{searchTerm}&quot;
                                                    </p>
                                                )}
                                                {!isTextSearch && (
                                                    <p className="text-[#667085] text-sm">
                                                        No courses found
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
            {isScheduledDialogOpen && <ScheduledDialog onClose={() => setIsScheduledDialogOpen(false)} fromContent="course" contentId={courseId || ''} startDate={startDate} endDate={endDate} setEndDate={setEndDate} setLiveNow={setLiveCourseNow} liveNow={liveCourseNow} setStartDate={setStartDate} />}
            {isEndDialogOpen && <EndDialog onClose={() => setIsEndDialogOpen(false)} fromContent="course" contentId={courseId || ''} />}
            {isPausedDialogOpen && <PausedDialog onClose={() => setIsPausedDialogOpen(false)} fromContent="course" contentId={courseId || ''} />}
            {isResumeOpen && < ResumeQuiz open={isResumeOpen} onClose={() => setIsResumeOpen(false)} fromContent="course" contentId={courseId || ''} />}
            {isDeleteDialogOpen && <DeleteDialog onClose={closeDeleteDialog} open={true} fromContent="course" contentId={courseId || ''} contentName={courseName} />}
            {isViewAnalyticsOpen && < ViewAnalytics onClose={() => setIsViewAnalyticsOpen(false)} open={isViewAnalyticsOpen} />}

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