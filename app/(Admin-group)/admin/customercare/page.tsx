"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import "react-phone-input-2/lib/style.css";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import CustomerCareStatus from '@/components/AdminComponents/CustomerCare/CustomerCareStatus';
import CustomerCareImportance from '@/components/AdminComponents/CustomerCare/CustomerCareImportance';
import { Calendar } from "@nextui-org/calendar";
import { today, getLocalTimeZone } from "@internationalized/date";
import { Checkbox } from "@nextui-org/react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";

// Define types for customer care data
type Customer = {
    uniqueId: string;
    title: string;
    email: string;
    Priority: 'Low' | 'Medium' | 'Hard';
    joiningDate: string;
    status: 'Latest' | 'Opened' | 'Resolved' | 'Reopened' | 'Blocker' | 'Replied';
}

type Option = 'Latest' | 'Opened' | 'Resolved' | 'Reopened' | 'Blocker' | 'Replied';

// Mock fetchCustomerCares function with types
const fetchCustomerCare = async (): Promise<Customer[]> => {
    const allCustomerCare: Customer[] = [
        { uniqueId: "Alice#8547", title: "Alice Johnson", Priority: "Medium", joiningDate: "Dec 1, 2023", email: "alice.johnson@example.com", status: "Opened" },
        { uniqueId: "Bob#1298", title: "Bob Smith", Priority: "Low", joiningDate: "Nov 15, 2023", email: "bob.smith@example.com", status: "Resolved" },
        { uniqueId: "Charlie#4521", title: "Charlie Davis", Priority: "Medium", joiningDate: "Oct 1, 2023", email: "charlie.davis@example.com", status: "Reopened" },
        { uniqueId: "Diana#7845", title: "Diana Martinez", Priority: "Hard", joiningDate: "Sep 1, 2023", email: "diana.martinez@example.com", status: "Resolved" },
        { uniqueId: "Ethan#3264", title: "Ethan Brown", Priority: "Low", joiningDate: "Jan 1, 2024", email: "ethan.brown@example.com", status: "Latest" },
        { uniqueId: "Fiona#9087", title: "Fiona Clark", Priority: "Low", joiningDate: "Feb 1, 2024", email: "fiona.clark@example.com", status: "Blocker" },
        { uniqueId: "George#6721", title: "George Wilson", Priority: "Hard", joiningDate: "Jul 15, 2023", email: "george.wilson@example.com", status: "Replied" },
        { uniqueId: "Hannah#4532", title: "Hannah White", Priority: "Low", joiningDate: "Dec 10, 2023", email: "hannah.white@example.com", status: "Resolved" },
        { uniqueId: "Isaac#8974", title: "Isaac Lewis", Priority: "Medium", joiningDate: "Nov 25, 2023", email: "isaac.lewis@example.com", status: "Opened" },
        { uniqueId: "Julia#1453", title: "Julia Walker", Priority: "Hard", joiningDate: "Aug 20, 2023", email: "julia.walker@example.com", status: "Latest" }
    ];
    return allCustomerCare;
};

function CustomerCare() {
    const [data, setData] = useState<Customer[]>([]);
    const [customerCare, setCustomerCare] = useState<Customer[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isSelcetDateOpen, setIsSelectDateOpen] = useState(false);

    // Fetch customer care when component mounts
    useEffect(() => {
        const loadCustomerCare = async () => {
            setLoading(true);
            const customerCare = await fetchCustomerCare();
            setCustomerCare(customerCare);
            setData(customerCare);
            setLoading(false);
        };
        loadCustomerCare();
    }, []);

    // Function to handle tab click and navigate to a new route
    const handleTabClick = (path: string) => {
        router.push(path);
    };

    const [uniqueId, setUniqueId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Check if all fields are filled
    const isAddButtonDisabled = !uniqueId || !startDate || !endDate;

    const [selectedStatus, setSelectedStatus] = useState({
        text: "Repiled",
        bgColor: "#FFEFC6",
        dotColor: "#93360D",
        textColor: "#93360D"
    });

    const handleIconSelect = (status: {
        text: string;
        bgColor: string;
        dotColor: string;
        textColor: string;
    }) => {
        setSelectedStatus(status);
    };

    const [selectedforpriority, setSelectedforpriority] = useState({
        text: "High",
        bgColor: "#FEE4E2",
        dotColor: "#9A221A]",
        textColor: "#9A221A]"
    });
    const handleIconSelectforpriority = (status: {
        text: string;
        bgColor: string;
        dotColor: string;
        textColor: string;
    }) => {
        setSelectedforpriority(status);
    };

    const statusMapping: Record<Option, string[]> = {
        Latest: ['Latest'],
        Opened: ['Opened'],
        Resolved: ['Resolved'],
        Reopened: ['Reopened'],    // Maps to 'paused' status in lowercase
        Blocker: ['Blocker'],
        Replied: ['Replied']   // Maps to 'ended' status in lowercase
    };

    const [checkedState, setCheckedState] = useState<Record<Option, boolean>>({
        Latest: false,
        Opened: false,
        Resolved: false,
        Reopened: false,
        Blocker: false,
        Replied: false,
    });

    const toggleCheckbox = (option: Option) => {
        setCheckedState((prevState) => ({
            ...prevState,
            [option]: !prevState[option],
        }));
    };

    const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Store selected date as Date object
    const options: Option[] = ["Latest", "Opened", "Resolved", "Reopened", "Blocker", "Replied"];
    const selectedCount = Object.values(checkedState).filter(Boolean).length;

    useEffect(() => {
        let filteredCustomerCare = customerCare;

        // Filter by search term
        if (searchTerm) {
            filteredCustomerCare = filteredCustomerCare.filter(customer =>
                customer.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by selected statuses
        const selectedStatuses = Object.entries(checkedState)
            .filter(([_, isChecked]) => isChecked)
            .map(([status]) => statusMapping[status as Option])
            .flat();

        if (selectedStatuses.length > 0) {
            filteredCustomerCare = filteredCustomerCare.filter(quiz =>
                selectedStatuses.includes(quiz.status)
            );
        }

        // Filter by selected date
        if (selectedDate) {
            const selectedDateString = selectedDate instanceof Date && !isNaN(selectedDate.getTime())
                ? selectedDate.toISOString().split('T')[0] // Convert to YYYY-MM-DD
                : null;

            if (selectedDateString) {
                filteredCustomerCare = filteredCustomerCare.filter(quiz => {
                    const quizDate = new Date(quiz.joiningDate); // Convert quiz.date string to Date object
                    const quizDateString = quizDate instanceof Date && !isNaN(quizDate.getTime())
                        ? quizDate.toISOString().split('T')[0]
                        : null;

                    return quizDateString === selectedDateString; // Compare only the date part (not time)
                });
            }
        }

        // Sort by quizPublishedDate in ascending order (earliest date first)
        filteredCustomerCare = filteredCustomerCare.sort((a, b) => {
            const dateA = new Date(a.joiningDate).getTime();
            const dateB = new Date(b.joiningDate).getTime();

            // Handle invalid date values (e.g., when date cannot be parsed)
            if (isNaN(dateA) || isNaN(dateB)) {
                console.error("Invalid date value", a.joiningDate, b.joiningDate);
                return 0; // If dates are invalid, no sorting will occur
            }

            return dateA - dateB; // Sort by time in ascending order (earliest first)
        });

        // Update state with filtered and sorted quizzes
        setData(filteredCustomerCare);
        setCurrentPage(1); // Reset to first page when filters change
    }, [searchTerm, checkedState, customerCare, selectedDate]);

    // Format selected date as 'Nov 9, 2024'
    const formattedDate = selectedDate
        ? selectedDate.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })
        : "Select dates";

    const selectedStatuses = options.filter((option) => checkedState[option]);

    const statusColors: Record<Option, string> = {
        Latest: '#7400E0',
        Opened: '#7400E0',
        Resolved: '#7400E0',
        Reopened: '#7400E0',
        Blocker: '#7400E0',
        Replied: '#7400E0',
    };

    // ------------------------------------------ checkbox logic ------------------------------------------

    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

    // Compute current page items
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = data.slice(firstItemIndex, lastItemIndex);

    // Compute if all items on current page are selected and handle indeterminate state
    const { isAllSelected, isIndeterminate } = useMemo(() => {
        const totalItems = data.length; // Total items in the dataset
        const selectedItemsCount = data.filter(item => selectedRows.has(item.uniqueId)).length;

        return {
            // Check if all items in the dataset are selected
            isAllSelected: totalItems > 0 && selectedItemsCount === totalItems,
            // Check if there are some selected but not all
            isIndeterminate: selectedItemsCount > 0 && selectedItemsCount < totalItems
        };
    }, [data, selectedRows]);

    const deselectAllRows = () => {
        setSelectedRows(new Set()); // Clear all selected rows
    };

    // Function to toggle selection of a single row
    const toggleRowSelection = (uniqueId: string) => {
        setSelectedRows(prev => {
            const newSelectedRows = new Set(prev);
            if (newSelectedRows.has(uniqueId)) {
                newSelectedRows.delete(uniqueId);
            } else {
                newSelectedRows.add(uniqueId);
            }
            return newSelectedRows;
        });
    };

    const toggleAllRowsSelection = () => {
        setSelectedRows(prev => {
            const newSelectedRows = new Set(prev);

            // Check if ALL items are currently selected across all pages
            const allItemsSelected = data.every(item => newSelectedRows.has(item.uniqueId));

            if (allItemsSelected) {
                // If all items are selected, clear the selection completely
                newSelectedRows.clear();
            } else {
                // Select ALL items across all pages
                data.forEach(item => {
                    newSelectedRows.add(item.uniqueId);
                });
            }

            return newSelectedRows;
        });
    };

    return (
        <div className="flex flex-col w-full gap-4 p-6">
            <div className="flex flex-row justify-between items-center">
                <h2 className="text-lg font-semibold text-[#1D2939]">
                    Users
                </h2>
                <div className="flex flex-row gap-3">
                    {/* Search Button */}
                    <button className="h-[44px] w-[250px] rounded-md bg-[#FFFFFF] border border-solid border-[#D0D5DD] flex items-center shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]">
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

                    {/* Filter Button */}
                    <div className="relative">
                        <Popover
                            placement="bottom-end"
                            isOpen={isPopoverOpen}
                            onOpenChange={(open) => setIsPopoverOpen(open)}
                        >
                            <PopoverTrigger>
                                <button className={`h-[44px] justify-center rounded-md bg-[#FFFFFF] border border-solid outline-none flex items-center p-3 transition-colors ${isPopoverOpen
                                    ? "border-[#C7A5FF] ring-4 ring-[#E2D9F8]"
                                    : "border-[#D0D5DD]"
                                    }`}>
                                    <Image src='/icons/Frame.svg' alt="filter" width={20} height={20} />
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[12.875rem] items-start py-2 px-0 h-auto gap-1 border border-lightGrey rounded-md shadow-[0_12px_16px_-4px_rgba(16,24,40,0.08)]">
                                <div className="flex flex-col w-full ">
                                    <span className="text-xs font-normal text-[#475467] mb-1 px-2 ">Students</span>
                                    <button className="flex flex-row w-full gap-2  items-center  hover:bg-neutral-100 h-10 px-2">
                                        <Checkbox color="primary" />
                                        <span className="text-[#1D2939] font-medium text-sm">Free</span>
                                    </button>
                                    <button className="flex flex-row w-full gap-2  items-center hover:bg-neutral-100 h-10 px-2">
                                        <Checkbox color="primary" />
                                        <span className="text-[#1D2939] font-medium text-sm">Premium</span>
                                    </button>
                                </div>
                                <hr className="w-[12.875rem]" />
                                <div className="flex flex-col w-full ">
                                    <span className="text-xs font-normal text-[#475467] mb-1 px-2 ">Priority</span>
                                    <button className="flex flex-row w-full gap-2  items-center  hover:bg-neutral-100 h-10 px-2">
                                        <Checkbox color="primary" />
                                        <span className="text-[#1D2939] font-medium text-sm">Low</span>
                                    </button>
                                    <button className="flex flex-row w-full gap-2  items-center hover:bg-neutral-100 h-10 px-2">
                                        <Checkbox color="primary" />
                                        <span className="text-[#1D2939] font-medium text-sm">Medium</span>
                                    </button>
                                    <button className="flex flex-row w-full gap-2  items-center hover:bg-neutral-100 h-10 px-2">
                                        <Checkbox color="primary" />
                                        <span className="text-[#1D2939] font-medium text-sm">High</span>
                                    </button>
                                </div>
                                <hr className="w-[12.875rem]" />

                                <span className="text-xs font-normal text-[#475467]  px-2">Assignee</span>
                                <div className="flex flex-col w-full  ">
                                    <button className="flex flex-row items-center hover:bg-neutral-100 h-10 px-2">
                                        <Checkbox color="primary" />
                                        <Image
                                            src="/icons/big-profile-pic.svg"
                                            width={24}
                                            height={24}
                                            alt="profile" />
                                        <span className="text-[#1D2939] font-medium text-sm ml-2">Assigned to me</span>
                                    </button>
                                    <button className="flex flex-row items-center hover:bg-neutral-100 h-10 px-2">
                                        <Checkbox color="primary" />
                                        <Image
                                            src="/icons/big-profile-pic.svg"
                                            width={24}
                                            height={24}
                                            alt="profile" />
                                        <span className="text-[#1D2939] font-medium text-sm ml-2">Theresa Webb</span>
                                    </button>
                                    <button className="flex flex-row items-center hover:bg-neutral-100 h-10 px-2">
                                        <Checkbox color="primary" />
                                        <Image
                                            src="/icons/big-profile-pic.svg"
                                            width={24}
                                            height={24}
                                            alt="profile" />
                                        <span className="text-[#1D2939] font-medium text-sm ml-2">Darrell Steward</span>
                                    </button>
                                </div>
                            </PopoverContent>
                        </Popover>
                        <div className="absolute -top-1 -right-1 w-3 h-3 z-10 bg-[#F04438] rounded-full"></div>
                    </div>
                </div>
            </div>

            <div>
                {(selectedRows.size > 0) && (
                    <div
                        className="flex flex-row items-center justify-between
                                    min-h-9 -mb-2 -pb-2
                                    transition-all duration-300 ease-in-out
                                    transform opacity-100 translate-y-0
                                    overflow-hidden"
                    >
                        <div className="flex flex-row gap-3 text-sm font-semibold leading-5">
                            <p className="text-[#1D2939]">
                                ({selectedRows.size}) Selected
                            </p>
                            {!isAllSelected && (
                                <button
                                    className="text-[#9012FF] underline mr-2"
                                    onClick={toggleAllRowsSelection}
                                >
                                    Select all {data.length}
                                </button>
                            )}
                            {isAllSelected && (
                                <button
                                    className="text-[#9012FF] underline"
                                    onClick={deselectAllRows}
                                >
                                    Deselect all
                                </button>
                            )}
                        </div>
                        <div className="flex flex-row gap-2">
                            <Popover placement="bottom">
                                <PopoverTrigger>
                                    <button className="flex flex-row items-center gap-1 px-[0.875rem] py-[0.625rem] outline-none bg-white border border-lightGrey rounded-md">
                                        <Image src='/icons/user.svg' alt="assignee" width={20} height={20} />
                                        <p className="text-sm text-[#1D2939] font-medium leading-[1.125rem]">Assignee</p>
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[11.375rem] px-0 border border-[#EAECF0] rounded-md">
                                    <div className="w-full">
                                        <button className="flex flex-row items-center w-full px-4 py-[0.625rem] hover:bg-[#F2F4F7]">
                                            <Image
                                                src="/icons/big-profile-pic.svg"
                                                width={24}
                                                height={24}
                                                alt="profile" />
                                            <span className="text-[#1D2939] font-medium text-sm ml-2">Darrell Steward</span>
                                        </button>
                                        <button className="flex flex-row items-center w-full px-4 py-[0.625rem] hover:bg-[#F2F4F7]">
                                            <Image
                                                src="/icons/big-profile-pic.svg"
                                                width={24}
                                                height={24}
                                                alt="profile" />
                                            <span className="text-[#1D2939] font-medium text-sm ml-2">Darrell Steward</span>
                                        </button>
                                        <button className="flex flex-row items-center w-full px-4 py-[0.625rem] hover:bg-[#F2F4F7]">
                                            <Image
                                                src="/icons/big-profile-pic.svg"
                                                width={24}
                                                height={24}
                                                alt="profile" />
                                            <span className="text-[#1D2939] font-medium text-sm ml-2">Darrell Steward</span>
                                        </button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                            <Popover placement="bottom">
                                <PopoverTrigger>
                                    <button className="flex flex-row items-center gap-1 px-[0.875rem] py-[0.625rem] bg-white border border-lightGrey rounded-md">
                                        <p className="text-sm text-[#1D2939] font-medium leading-[1.125rem]">Status</p>
                                        <Image src='/icons/chevron-down-dark.svg' alt="status" width={20} height={20} />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto py-1 px-0 bg-white border border-lightGrey rounded-md">
                                    <button className="flex flex-row items-center justify-start w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7]"
                                        onClick={() =>
                                            handleIconSelect({
                                                text: "Blocker",
                                                bgColor: "#FEE4E2",
                                                dotColor: "#9A221A",
                                                textColor: "#9A221A",
                                            })
                                        }
                                    >
                                        <div className="bg-[#FEE4E2] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6 w-auto">
                                            <span className="w-[6px] h-[6px] bg-[#9A221A] rounded-full "></span>
                                            <span className="font-medium text-[#9A221A] text-xs">Blocker</span>
                                        </div>
                                    </button>
                                    <button className="flex flex-row items-center justify-start w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7]"
                                        onClick={() =>
                                            handleIconSelect({
                                                text: "Resolved",
                                                bgColor: "#D3F8E0",
                                                dotColor: "#0A5B39",
                                                textColor: "#0A5B39",
                                            })
                                        }
                                    >
                                        <div className="bg-[#D3F8E0] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6 w-auto">
                                            <span className="w-[6px] h-[6px] bg-[#0A5B39] rounded-full "></span>
                                            <span className="font-medium text-[#0A5B39] text-xs">Resolved</span>
                                        </div>
                                    </button>
                                </PopoverContent>
                            </Popover>
                            <Popover placement="bottom">
                                <PopoverTrigger>
                                    <button className="flex flex-row items-center gap-1 px-[0.875rem] py-[0.625rem] bg-white border border-lightGrey rounded-md">
                                        <p className="text-sm text-[#1D2939] font-medium leading-[1.125rem]">Priority</p>
                                        <Image src='/icons/chevron-down-dark.svg' alt="status" width={20} height={20} />
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto py-1 px-0 bg-white border border-lightGrey rounded-md">
                                    <button className="flex flex-row items-center justify-start w-full px-4 py-[0.625rem]  gap-2 hover:bg-[#F2F4F7]"
                                        onClick={() =>
                                            handleIconSelectforpriority({
                                                text: "Low",
                                                bgColor: "#F2F4F7",
                                                dotColor: "#182230",
                                                textColor: "#182230",
                                            })
                                        }
                                    >
                                        <div className="bg-[#F2F4F7] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6 w-auto">
                                            <span className="w-[6px] h-[6px] bg-[#182230] rounded-full "></span>
                                            <span className="font-medium text-[#182230] text-xs">Low</span>
                                        </div>
                                    </button>
                                    <button className="flex flex-row items-center justify-start w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7]"
                                        onClick={() =>
                                            handleIconSelectforpriority({
                                                text: "Medium",
                                                bgColor: "#FFEFC6",
                                                dotColor: "#93360D",
                                                textColor: "#93360D",
                                            })
                                        }
                                    >
                                        <div className="bg-[#FFEFC6] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6 w-auto">
                                            <span className="w-[6px] h-[6px] bg-[#93360D] rounded-full "></span>
                                            <span className="font-medium text-[#93360D] text-xs">Medium</span>
                                        </div>
                                    </button>
                                    <button className="flex flex-row items-center justify-start w-full px-4 py-[0.625rem]  gap-2 hover:bg-[#F2F4F7]"
                                        onClick={() =>
                                            handleIconSelectforpriority({
                                                text: "High",
                                                bgColor: "#FEE4E2",
                                                dotColor: "#9A221A]",
                                                textColor: "#9A221A]",
                                            })
                                        }
                                    >
                                        <div className="bg-[#FEE4E2] py-2 px-3 gap-1 flex flex-row rounded-[6px] items-center h-6 w-auto">
                                            <span className="w-[6px] h-[6px] bg-[#9A221A] rounded-full "></span>
                                            <span className="font-medium text-[#9A221A] text-xs">High</span>
                                        </div>
                                    </button>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                )}

                {selectedStatuses.map((status) => (
                    <div className="flex flex-row items-center justify-between w-full">
                        <div className="flex flex-row gap-2">
                            {selectedStatuses.map((status) => (
                                <div key={status} className="flex flex-row items-center w-fit px-3 py-2 gap-1 text-xs font-medium bg-[#EDE4FF] rounded-[0.375rem]" style={{ color: statusColors[status] }}>
                                    {status}
                                    <button onClick={() => toggleCheckbox(status)}>
                                        <Image src='/icons/multiplication-sign.svg' alt="close" width={16} height={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        {selectedStatuses.length > 0 && (
                            <button className="text-sm text-[#9012FF] font-semibold" onClick={() => setCheckedState({ Latest: false, Opened: false, Resolved: false, Reopened: false, Blocker: false, Replied: false })}>
                                clear all
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex flex-col justify-between h-full">
                <div className="flex border border-[#EAECF0] rounded-xl">
                    <table className="w-full h-auto bg-white rounded-xl">
                        <thead>
                            <tr>
                                <th className="w-10 pl-8">
                                    <Checkbox
                                        size="md"
                                        color="primary"
                                        isSelected={isAllSelected}
                                        isIndeterminate={isIndeterminate}
                                        onChange={toggleAllRowsSelection}
                                    />
                                </th>
                                <th className="w-10 pl-4 py-4 text-center text-[#667085] font-medium text-sm">
                                    <p>Sr.No.</p>
                                </th>
                                <th className="text-left w-[10%] pl-4 py-4 rounded-tl-xl flex flex-row text-[#667085] font-medium text-sm">
                                    Name
                                </th>
                                <th className="text-left w-[20%] py-4 text-[#667085] font-medium text-sm">
                                    Tickets
                                </th>
                                <th className="text-left pl-10 py-4 text-[#667085] font-medium text-sm">
                                    Priority
                                </th>
                                <th className="text-center py-4 text-[#667085] font-medium text-sm">
                                    <div className="flex flex-row justify-center gap-1">
                                        <p>Date</p>
                                        <Image src='/icons/unfold-more-round.svg' alt="more" width={16} height={16} />
                                    </div>
                                </th>
                                <th className="text-left py-4 text-[#667085] font-medium text-sm">
                                    Assigned
                                </th>
                                <th className="text-left py-4 rounded-tr-xl text-[#667085] font-medium text-sm">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((customer, index) => (
                                <tr key={customer.uniqueId} onClick={() => handleTabClick('/admin/customercare/customerinfo')} className="h-auto border-t border-solid border-[#EAECF0] cursor-pointer">
                                    <td className="pl-8 py-4 text-center text-[#101828] text-sm">
                                        <Checkbox
                                            size="md"
                                            color="primary"
                                            isSelected={selectedRows.has(customer.uniqueId)}
                                            onChange={() => toggleRowSelection(customer.uniqueId)}
                                        />
                                    </td>
                                    <td className="py-4 text-center text-[#101828] text-sm">
                                        {index + 1}
                                    </td>
                                    <td className="pl-6 py-0">
                                        <div className="flex flex-row gap-2">
                                            <div className="flex items-center">
                                                <div className="relative">
                                                    <Image src='/images/DP_Lion.svg' alt="DP" width={40} height={40} />
                                                    <Image className="absolute right-0 bottom-0" src='/icons/winnerBatch.svg' alt="Batch" width={18} height={18} />
                                                </div>
                                            </div>
                                            <div className="flex items-start justify-start flex-col">
                                                <div className="text-sm font-semibold whitespace-nowrap">
                                                    {customer.title}
                                                </div>
                                                <div className="flex justify-start items-start text-[13px] text-[#667085]">{customer.uniqueId}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <div className="flex flex-col gap-1">
                                            <p className="text-[#101828] text-left text-sm whitespace-nowrap overflow-hidden text-ellipsis">This message is not relevant to study.</p>
                                            <div className="flex flex-col justify-start gap-1">
                                                <div className="flex flex-row gap-1">
                                                    <p className="w-fit px-3 py-1 text-xs text-[#475467] border border-solid border-[#EAECF0] font-medium bg-[#FFFFFF] rounded-[0.375rem]">Scam</p>
                                                    {/* <p className="w-fit px-3 py-1 text-xs text-white font-medium bg-[#344054] rounded-[0.375rem]">General</p>
                                                    <p className="w-fit px-3 py-1 text-xs text-white font-medium bg-[#344054] rounded-[0.375rem]">Product</p> */}
                                                </div>
                                                {/* <p className="w-fit px-3 py-1 text-xs text-white font-medium bg-[#0A5B39] rounded-[0.375rem]">Transaction ID: 254784523698</p> */}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="flex items-centre justify-left h-full pl-10 py-4 text-[#101828] text-sm">
                                        <CustomerCareImportance Priority={customer.Priority} />
                                    </td>
                                    <td className="py-4 text-center text-[#101828] text-sm">Mon Jan 6, 2024</td>
                                    <td className="py-4 text-[#101828] text-sm">
                                        <div className="flex flex-row items-center gap-2">
                                            <Image
                                                src="/icons/profile-pic2.svg"
                                                width={24}
                                                height={24}
                                                alt="profile-icons"
                                            />
                                            <p className="text-[#1D2939] font-medium text-sm whitespace-nowrap">Jenny Wilson</p>
                                        </div>
                                    </td>
                                    <td className="flex items-center justify-start pr-4 py-4 text-[#101828] text-sm">
                                        <CustomerCareStatus status={customer.status} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Section */}
                <div className="flex items-end justify-end h-auto">
                    <div className="flex justify-right h-auto">
                        <PaginationSection
                            totalItems={data.length}
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                </div>
            </div>
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

export default CustomerCare;