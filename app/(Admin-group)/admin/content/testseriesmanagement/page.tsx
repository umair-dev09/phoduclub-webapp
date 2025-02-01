"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
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
import Status from '@/components/AdminComponents/StatusDisplay';
import test from "node:test";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";
import LoadingData from "@/components/Loading";
import EndDialog from "@/components/AdminComponents/QuizInfoDailogs/EndDailogue";
import PausedDialog from "@/components/AdminComponents/QuizInfoDailogs/PauseDailogue";
import ResumeQuiz from "@/components/AdminComponents/QuizInfoDailogs/ResumeDailogue";
import DeleteDialog from "@/components/AdminComponents/QuizInfoDailogs/DeleteDailogue";
import { ToastContainer } from "react-toastify";

interface Test {
    testName: string;
    price: number;
    discountPrice: string;
    testId: string;
    date: string; // Can be Date type if desired
    testImage: string;
    status: string;
    publishDate: string;
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

function TesstseriesInfo() {
    const [data, setData] = useState<Test[]>([]);
    const [tests, setTests] = useState<Test[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();
    const [testId, setTestId] = useState('');
    const [testName, setTestName] = useState('');
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
    const isInitiallySorted = useRef(false); // To track initial sorting
    const [dateFilter, setDateFilter] = useState(null);
    const [statusFilter, setStatusFilter] = useState(null);
    const isTextSearch = searchTerm.trim().length > 0 && !dateFilter && !statusFilter;

    const [sortConfig, setSortConfig] = useState<{
        key: string;
        direction: 'asc' | null | 'desc';
    }>({
        key: 'publishedOn',
        direction: 'desc'
    });

    useEffect(() => {
        const testCollection = collection(db, "testseries");
        const unsubscribe = onSnapshot(testCollection, (snapshot) => {
            const testseriesData = snapshot.docs.map((courseDoc) => {
                const testData = courseDoc.data();
                const courseId = courseDoc.id;

                return {
                    testName: testData.testName,
                    testId: testData.testId,
                    date: formatDate(testData.publishDate),
                    status: testData.status,
                    testImage: testData.testImage,
                    price: testData.price,
                    discountPrice: testData.discountPrice,
                    startDate: testData.startDate,
                    endDate: testData.endDate,
                } as Test;
            });

            setTests(testseriesData);

            // Only set the initial data once, to avoid re-sorting
            if (!isInitiallySorted.current) {
                isInitiallySorted.current = true;
                const initialSortedData = [...testseriesData].sort((a, b) => {
                    const dateA = new Date(a.date).getTime();
                    const dateB = new Date(b.date).getTime();
                    return dateA - dateB;
                });
                setData(initialSortedData);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);
    useEffect(() => {
        let filteredTests = [...tests]; // Use a shallow copy to avoid mutating state

        // Filter by search term
        if (searchTerm) {
            filteredTests = filteredTests.filter((test) =>
                test.testName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by selected statuses
        const selectedStatuses = Object.entries(checkedState)
            .filter(([_, isChecked]) => isChecked)
            .map(([status]) => statusMapping[status as Option])
            .flat();

        if (selectedStatuses.length > 0) {
            filteredTests = filteredTests.filter((test) =>
                selectedStatuses.includes(test.status)
            );
        }

        // Filter by selected date
        if (selectedDate) {
            const selectedDateString =
                selectedDate instanceof Date && !isNaN(selectedDate.getTime())
                    ? selectedDate.toISOString().split("T")[0]
                    : null;

            if (selectedDateString) {
                filteredTests = filteredTests.filter((test) => {
                    const testDate = new Date(test.date);
                    const testDateString =
                        testDate instanceof Date && !isNaN(testDate.getTime())
                            ? testDate.toISOString().split("T")[0]
                            : null;

                    return testDateString === selectedDateString;
                });
            }
        }

        // Sort only if filteredTests changes or sorting criteria change
        const sortedTests = filteredTests.sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateA - dateB;
        });

        // Only update data if the sorted list changes
        if (JSON.stringify(sortedTests) !== JSON.stringify(data)) {
            setData(sortedTests);
        }

        if (sortConfig.key && sortConfig.direction) {
            filteredTests.sort((a, b) => {
                if (sortConfig.key === 'price') {
                    const priceA = parseFloat(a.discountPrice.replace(/[^0-9.-]+/g, ""));
                    const priceB = parseFloat(b.discountPrice.replace(/[^0-9.-]+/g, ""));
                    return sortConfig.direction === 'asc' ? priceA - priceB : priceB - priceA;
                }
                if (sortConfig.key === 'publishedOn') {
                    const dateA = new Date(a.date).getTime();
                    const dateB = new Date(b.date).getTime();
                    return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
                }
                return 0;
            });
        } else if (!sortConfig.key) {
            // Only apply default date sorting if no other sort is active
            filteredTests.sort((a, b) => {
                const dateA = new Date(a.date).getTime();
                const dateB = new Date(b.date).getTime();
                return dateA - dateB;
            });
        }

        setData(filteredTests);
        setCurrentPage(1); // Reset to first page when filters change
    }, [searchTerm, checkedState, tests, selectedDate, sortConfig]);

    const handleSort = (key: string) => {
        if (key === 'questions' || key === 'publishedOn') {
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

    const openScheduledDialog = (testId: string, startDate: string, endDate: string) => {
        setTestId(testId);
        setStartDate(startDate);
        setEndDate(endDate);
        setIsScheduledDialogOpen(true);

    }
    const closeScheduledDialog = () => setIsScheduledDialogOpen(false);

    // Handlers for DeleteQuiz dialog
    const openDeleteDialog = (testId: string, testName: string) => {
        setIsDeleteDialogOpen(true);
        setTestId(testId);
        setTestName(testName);
    }
    const closeDeleteDialog = () => setIsDeleteDialogOpen(false);

    // Handlers for EndQuiz dialog
    const openEndQuiz = (testId: string) => {
        setTestId(testId);
        setIsEndDialogOpen(true);
    }
    const closeEndQuiz = () => setIsEndDialogOpen(false);

    // Handlers for  PausedQuiz dialog
    const openPausedQuiz = (testId: string) => {
        setTestId(testId);
        setIsPausedDialogOpen(true);
    }
    const closePausedQuiz = () => setIsPausedDialogOpen(false);

    // Handlers for ResumeQuiz dialog
    const openResumeQuiz = (testId: string) => {
        setTestId(testId);
        setIsResumeOpen(true);
    }
    const closeResumeQuiz = () => setIsResumeOpen(false);


    // Handlers for ViewAnalytics dialog
    const openViewAnalytics = () => setIsViewAnalyticsOpen(true);
    const closeViewAnalytics = () => setIsViewAnalyticsOpen(false);

    const statusMapping: Record<Option, string[]> = {
        'Saved': ['saved'],
        'Live': ['live'],
        'Scheduled': ['scheduled'],
        'Pause': ['paused'],
        'Finished': ['finished'],
        'Canceled': ['ended']  // Map 'Canceled' to 'ended' status
    };
    const toggleCheckbox = (option: Option) => {
        setCheckedState((prevState) => ({
            ...prevState,
            [option]: !prevState[option],
        }));
    };

    const options: Option[] = ["Saved", "Live", "Scheduled", "Pause", "Finished", "Canceled"];


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
        <div className="flex flex-col px-[32px] w-full gap-4 overflow-y-auto h-auto py-5">
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
                                maxLength={50}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </button>

                    {/* Select Date Button */}
                    <Popover placement="bottom" isOpen={isSelcetDateOpen} onOpenChange={(open) => setIsSelectDateOpen(open)}>
                        <PopoverTrigger>
                            <button className="h-[44px] w-[143px]  hover:bg-[#F2F4F7] rounded-md bg-[#FFFFFF] border border-solid border-[#D0D5DD] outline-none flex items-center p-3">
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
                                    className="min-w-[84px] min-h-[30px] rounded-md bg-[#9012FF] text-[14px] font-medium text-white mb-2 border border-[#800EE2] shadow-inner-button transition-colors duration-150 hover:bg-[#6D0DCC]"
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

                    {/* Create TestSeries Button */}
                    <button
                        className="h-[44px] w-auto px-6 py-2 bg-[#8501FF] rounded-md shadow-inner-button border border-solid border-[#800EE2] flex items-center justify-center transition-colors duration-150 hover:bg-[#6D0DCC]"
                        onClick={() => handleTabClick('/admin/content/testseriesmanagement/createtestseries')}
                    >
                        <span className="text-[#FFFFFF] font-semibold text-sm">Create Test Series</span>
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
                        <div className="border border-[#EAECF0] rounded-xl overflow-x-auto">
                            <table className="w-full bg-white rounded-xl">
                                <thead>
                                    <tr>
                                        <th className="w-[30%] text-left px-8 py-4 pl-8 rounded-tl-xl text-[#667085] font-medium text-sm">Test Series</th>
                                        <th className="w-[20%] text-center px-8 py-4 text-[#667085] font-medium text-sm">
                                            <div
                                                className="flex flex-row justify-center gap-1 cursor-pointer"
                                                onClick={() => handleSort('price')}
                                            >
                                                <p>Price</p>
                                                <Image src='/icons/unfold-more-round.svg' alt="more" width={16} height={16} />
                                            </div>
                                        </th>
                                        <th className="w-[20%] text-center px-8 py-4 text-[#667085] font-medium text-sm">
                                            <div
                                                className="flex flex-row justify-center gap-1 cursor-pointer"
                                                onClick={() => handleSort('publishedOn')}
                                            >
                                                <p>Published on</p>
                                                <Image src='/icons/unfold-more-round.svg' alt="more" width={16} height={16} />
                                            </div>
                                        </th>
                                        <th className="flex w-[20%] ml-[15%] px-8 py-4 rounded-tr-xl text-[#667085] font-medium text-sm">Status</th>
                                        <th className="w-[10%] text-center px-8 py-4 rounded-tr-xl text-[#667085] font-medium text-sm">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.length > 0 ? (
                                        currentItems.map((test, index) => (
                                            <tr key={index} className="border-t border-solid border-[#EAECF0]">
                                                <td onClick={() => handleTabClick(`/admin/content/testseriesmanagement/${test.testName.toLowerCase().replace(/\s+/g, '-')}/?tId=${test.testId}`)}>
                                                    <button className="flex flex-row items-center px-8 py-3 gap-2 text-[#9012FF] underline text-sm font-medium">
                                                        <Image className="w-10 h-10 rounded-full object-cover" src={test.testImage || '/icons/Default_DP.svg'} alt="DP" width={40} height={40} />
                                                        <p className="text-start whitespace-nowrap">{test.testName}</p>
                                                    </button>
                                                </td>
                                                <td className="px-8 py-4 text-center text-[#101828] text-sm"><span className="mr-1">&#8377;</span>{test.discountPrice}</td>
                                                <td className="px-8 py-4 text-center text-[#101828] text-sm whitespace-nowrap">{test.date}</td>
                                                <td className="px-8 py-4 text-center text-[#101828] text-sm">
                                                    <span className='flex items-center justify-start ml-[20%] rounded-full'>
                                                        <Status status={test.status} />
                                                    </span>
                                                </td>
                                                <td className="text-center px-8 py-4 text-[#101828] text-sm">
                                                    <Popover placement="bottom-end" isOpen={!!openPopovers[index]}
                                                        onOpenChange={() => closePopover(index)}>
                                                        <PopoverTrigger>
                                                            <button onClick={(e) => { e.stopPropagation(); togglePopover(index) }} type='button' className="ml-[60%] outline-none cursor-pointer">
                                                                <Image
                                                                    src="/icons/three-dots.svg"
                                                                    width={20}
                                                                    height={20}
                                                                    alt="More Actions"
                                                                />
                                                            </button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className={`flex flex-col items-start text-sm font-normal py-1 px-0 bg-white border border-lightGrey rounded-md ${test.status === 'paused' ? 'w-[11.563rem]' : 'w-[10.438rem]'}`}>
                                                            {test.status === 'paused' && (
                                                                <button className="flex flex-row w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors" onClick={() => { closePopover(index); openScheduledDialog(test.testId, test.startDate, test.endDate) }}>
                                                                    <Image src='/icons/calendar-03.svg' alt="schedule" width={18} height={18} />
                                                                    <p>Schedule</p>
                                                                </button>

                                                            )}
                                                            {test.status === 'paused' && (
                                                                <button className="flex flex-row w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={() => { closePopover(index); openResumeQuiz(test.testId) }}>
                                                                    <Image src='/icons/play-dark.svg' alt="resume quiz" width={20} height={20} />
                                                                    <p>Resume</p>
                                                                </button>

                                                            )}

                                                            {/* Option 1 */}
                                                            <div>
                                                                {test.status === 'paused' && (
                                                                    <button className="flex flex-row w-[11.563rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                        onClick={() => router.push(`/admin/content/testseriesmanagement/createtestseries/?s=${test.status}&tId=${test.testId}`)}>
                                                                        <Image src='/icons/edit-icon.svg' alt="edit" width={18} height={18} />
                                                                        <p>Edit</p>
                                                                    </button>
                                                                )}
                                                                {test.status === 'scheduled' && (
                                                                    <button className="flex flex-row w-[10.438rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                        onClick={() => router.push(`/admin/content/testseriesmanagement/createtestseries/?s=${test.status}&tId=${test.testId}`)}>
                                                                        <Image src='/icons/edit-icon.svg' alt="edit" width={18} height={18} />
                                                                        <p>Edit</p>
                                                                    </button>
                                                                )}
                                                                {test.status === 'saved' && (
                                                                    <button className="flex flex-row w-[10.438rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                        onClick={() => router.push(`/admin/content/testseriesmanagement/createtestseries/?s=${test.status}&tId=${test.testId}`)}>
                                                                        <Image src='/icons/edit-icon.svg' alt="edit" width={18} height={18} />
                                                                        <p>Edit</p>
                                                                    </button>
                                                                )}
                                                                {test.status === 'live' && (
                                                                    <button className="flex flex-row w-[10.438rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                        onClick={() => { closePopover(index); openPausedQuiz(test.testId) }}>
                                                                        <Image src='/icons/pause-dark.svg' alt="pause" width={18} height={18} />
                                                                        <p>Pause</p>
                                                                    </button>
                                                                )}
                                                            </div>
                                                            {/* Option 3: Resume test (only if status is Paused) */}
                                                            {/* {test.status === 'Paused' && (
                                                                <div className="flex flex-row w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                    onClick={openResume}>
                                                                    <Image src='/icons/play-dark.svg' alt="resume" width={20} height={20} />
                                                                    <p>Resume</p>
                                                                </div>
                                                            )} */}
                                                            {/* Option 4: Delete test */}
                                                            <div>
                                                                {test.status === 'paused' && (
                                                                    <button className="flex flex-row w-[11.563rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                        onClick={() => { closePopover(index); openDeleteDialog(test.testId, test.testName) }}>
                                                                        <Image src='/icons/delete.svg' alt="delete" width={18} height={18} />
                                                                        <p className="text-[#DE3024]">Delete</p>
                                                                    </button>
                                                                )}
                                                                {test.status === 'scheduled' && (
                                                                    <button className="flex flex-row w-[10.438rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                        onClick={() => { closePopover(index); openDeleteDialog(test.testId, test.testName) }}>
                                                                        <Image src='/icons/delete.svg' alt="delete" width={18} height={18} />
                                                                        <p className="text-[#DE3024]">Delete</p>
                                                                    </button>
                                                                )}
                                                                {test.status === 'finished' && (
                                                                    <button className="flex flex-row w-[10.438rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                        onClick={() => { closePopover(index); openDeleteDialog(test.testId, test.testName) }}>
                                                                        <Image src='/icons/delete.svg' alt="delete" width={18} height={18} />
                                                                        <p className="text-[#DE3024]">Delete</p>
                                                                    </button>
                                                                )}
                                                                {test.status === 'saved' && (
                                                                    <button className="flex flex-row w-[10.438rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                        onClick={() => { closePopover(index); openDeleteDialog(test.testId, test.testName) }}>
                                                                        <Image src='/icons/delete.svg' alt="delete" width={18} height={18} />
                                                                        <p className="text-[#DE3024]">Delete</p>
                                                                    </button>
                                                                )}
                                                                {test.status === 'live' && (
                                                                    <button className="flex flex-row w-[10.438rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                        onClick={() => { closePopover(index); openEndQuiz(test.testId) }}>
                                                                        <Image src='/icons/license-no.svg' alt="end" width={18} height={18} />
                                                                        <p className="text-[#DE3024]">End</p>
                                                                    </button>
                                                                )}
                                                            </div>
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
                                                        No test series found for &quot;{searchTerm}&quot;
                                                    </p>
                                                )}
                                                {!isTextSearch && (
                                                    <p className="text-[#667085] text-sm">
                                                        No test series found
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
            {isScheduledDialogOpen && <ScheduledDialog onClose={() => setIsScheduledDialogOpen(false)} fromContent="testseries" contentId={testId || ''} startDate={startDate} endDate={endDate} setEndDate={setEndDate} setLiveNow={setLiveCourseNow} liveNow={liveCourseNow} setStartDate={setStartDate} />}
            {isEndDialogOpen && <EndDialog onClose={() => setIsEndDialogOpen(false)} fromContent="testseries" contentId={testId || ''} />}
            {isPausedDialogOpen && <PausedDialog onClose={() => setIsPausedDialogOpen(false)} fromContent="testseries" contentId={testId || ''} />}
            {isResumeOpen && < ResumeQuiz open={isResumeOpen} onClose={() => setIsResumeOpen(false)} fromContent="testseries" contentId={testId || ''} />}
            {isDeleteDialogOpen && <DeleteDialog onClose={closeDeleteDialog} open={true} fromContent="testseries" contentId={testId || ''} contentName={testName} />}
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

export default TesstseriesInfo;