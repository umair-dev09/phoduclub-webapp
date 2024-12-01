"use client";

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
import { Checkbox } from "@nextui-org/react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";

// Define types for customer care data
type Customer = {
    id: string;
    email: string;
    Priority: 'Low' | 'Medium' | 'Hard';
    joiningDate: string;
    status: 'Latest' | 'Opened' | 'Resolved' | 'Re-opened' | 'Blocker' | 'Replied';
}

// Mock fetchCustomerCares function with types
const fetchCustomerCare = async (): Promise<Customer[]> => {
    const allCustomerCare: Customer[] = [
        { id: "1", Priority: "Medium", joiningDate: "Dec 1, 2023", email: "Jun 1, 2024", status: "Opened" },
        { id: "2", Priority: "Low", joiningDate: "Nov 15, 2023", email: "May 15, 2024", status: "Resolved" },
        { id: "3", Priority: "Medium", joiningDate: "Oct 1, 2023", email: "Apr 1, 2024", status: "Re-opened" },
        { id: "4", Priority: "Hard", joiningDate: "Sep 1, 2023", email: "Mar 1, 2024", status: "Resolved" },
        { id: "5", Priority: "Low", joiningDate: "Jan 1, 2024", email: "Jul 1, 2024", status: "Latest" },
        { id: "6", Priority: "Low", joiningDate: "Feb 1, 2024", email: "Aug 1, 2024", status: "Blocker" },
        { id: "7", Priority: "Hard", joiningDate: "Jul 15, 2023", email: "Jan 15, 2024", status: "Replied" },
        { id: "8", Priority: "Low", joiningDate: "Dec 10, 2023", email: "Jun 10, 2024", status: "Resolved" },
        { id: "9", Priority: "Medium", joiningDate: "Nov 25, 2023", email: "May 25, 2024", status: "Opened" },
        { id: "10", Priority: "Hard", joiningDate: "Aug 20, 2023", email: "Feb 20, 2024", status: "Latest" }

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
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

    // Global Selection State
    const [selectedItems, setSelectedItems] = useState<{
        pageSelected: Set<string>,
        allSelected: Set<string>
    }>({
        pageSelected: new Set(),
        allSelected: new Set()
    });

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

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = data.slice(firstItemIndex, lastItemIndex);

    const handlePageSelectAll = () => {
        const currentPageIds = currentItems.map(item => item.id);

        // Toggle between fully selected and not selected
        if (selectedItems.pageSelected.size === currentItems.length) {
            // If all are currently selected, deselect everything
            setSelectedItems(prev => ({
                pageSelected: new Set(),
                allSelected: new Set()
            }));
        } else {
            // Select all items on the current page
            setSelectedItems(prev => ({
                pageSelected: new Set(currentPageIds),
                allSelected: new Set() // Reset global selection when page selection changes
            }));
        }
    };

    // Calculation for checkbox states
    const isPageFullySelected = selectedItems.pageSelected.size === currentItems.length && currentItems.length > 0;
    const isPagePartiallySelected = selectedItems.pageSelected.size > 0 && selectedItems.pageSelected.size < currentItems.length;

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

    // Uncomment and modify search useEffect
    useEffect(() => {
        const filteredCustomerCare = customerCare.filter(customer =>
            // Search across multiple fields
            customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.Priority.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.status.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setData(filteredCustomerCare);
        setCurrentPage(1); // Reset to first page on new search
    }, [searchTerm, customerCare]);

    // Update handleItemSelect to handle both page and global selection
    const handleItemSelect = (itemId: string) => {
        const newPageSelected = new Set(selectedItems.pageSelected);
        const newAllSelected = new Set(selectedItems.allSelected);

        if (newPageSelected.has(itemId)) {
            newPageSelected.delete(itemId);
            newAllSelected.delete(itemId);
        } else {
            newPageSelected.add(itemId);
        }

        setSelectedItems(prev => ({
            pageSelected: newPageSelected,
            allSelected: newAllSelected
        }));
    };

    const selectAllItems = () => {
        setSelectedItems(prev => ({
            pageSelected: new Set(),
            allSelected: new Set(data.map(item => item.id))
        }));
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
                    <button className="h-[44px] w-[143px] rounded-md bg-[#FFFFFF] border border-solid border-[#D0D5DD] flex items-center p-3 shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]">
                        <Image
                            src="/icons/select-date.svg"
                            width={20}
                            height={20}
                            alt="Select-date Button"
                        />
                        <span className="font-medium text-sm text-[#667085] ml-2">Select dates</span>
                    </button>

                    {/* By Status Button */}
                    <div className="h-[44px] w-[126px] rounded-md bg-[#FFFFFF] border border-solid border-[#D0D5DD] flex items-center justify-between p-3 cursor-pointer shadow-[0_1px_2px_0_rgba(16,24,40,0.05)]">
                        <p className="font-medium text-sm text-[#667085] ml-2">
                            By status
                        </p>
                        <Image
                            src="/icons/selectdate-Arrowdown.svg"
                            width={20}
                            height={20}
                            alt="Arrow-Down Button"
                        />
                    </div>
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

            {(selectedItems.pageSelected.size > 0 || selectedItems.allSelected.size > 0) && (
                <div
                    className="flex flex-row items-center justify-between
                                min-h-9
                                transition-all duration-300 ease-in-out 
                                transform opacity-100 translate-y-0 
                                overflow-hidden"
                >
                    <div className="flex flex-row gap-3 text-sm font-semibold leading-5">
                        <p className="text-[#1D2939]">
                            {selectedItems.allSelected.size > 0
                                ? `(${selectedItems.allSelected.size}) Selected`
                                : `(${selectedItems.pageSelected.size}) Selected`}
                        </p>
                        {selectedItems.allSelected.size === data.length ? (
                            <button
                                className="text-[#9012FF] underline"
                                onClick={() => {
                                    // Deselect all logic
                                    selectedItems.allSelected.clear(); // Or update your state logic
                                }}
                            >
                                Deselect all
                            </button>
                        ) : (
                            <button
                                className="text-[#9012FF] underline"
                                onClick={selectAllItems}
                            >
                                Select all {data.length}
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

            <div className="flex flex-col justify-between h-full">
                <div className="flex border border-[#EAECF0] rounded-xl">
                    <table className="w-full h-auto bg-white rounded-xl">
                        <thead>
                            <tr>
                                <th className="w-10 pl-8">
                                    <Checkbox
                                        size="md"
                                        color="primary"
                                        isSelected={isPageFullySelected}
                                        isIndeterminate={isPagePartiallySelected}
                                        onChange={handlePageSelectAll}
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
                                <tr key={customer.id} onClick={() => handleTabClick('/admin/customercare/customerinfo')} className="h-auto border-t border-solid border-[#EAECF0] cursor-pointer">
                                    <td className="pl-8 py-4 text-center text-[#101828] text-sm">
                                        <Checkbox
                                            size="md"
                                            color="primary"
                                            isSelected={
                                                selectedItems.allSelected.has(customer.id) ||
                                                selectedItems.pageSelected.has(customer.id)
                                            }
                                            onChange={() => handleItemSelect(customer.id)}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </td>
                                    <td className="py-4 text-center text-[#101828] text-sm">
                                        {index + 1}
                                    </td>
                                    <td className="pl-6 py-2">
                                        <div className="flex flex-row gap-2">
                                            <div className="flex items-center">
                                                <div className="relative">
                                                    <Image src='/images/DP_Lion.svg' alt="DP" width={40} height={40} />
                                                    <Image className="absolute right-0 bottom-0" src='/icons/winnerBatch.svg' alt="Batch" width={18} height={18} />
                                                </div>
                                            </div>
                                            <div className="flex items-start justify-start flex-col">
                                                <div className="text-sm font-semibold whitespace-nowrap">
                                                    Jenny Wilson
                                                </div>
                                                <div className="flex justify-start items-start text-[13px] text-[#667085]">jenny#8547</div>
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