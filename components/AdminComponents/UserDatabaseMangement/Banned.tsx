"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import PhoneInput from "react-phone-input-2";
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
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import Ban from "@/components/AdminComponents/UserDatabaseMangement/Ban";
import Delete from "@/components/AdminComponents/UserDatabaseMangement/Delete";
import { Checkbox } from "@nextui-org/react";

// Define types for banned data
interface Banned {
    name: string;
    email: string;
    MobileNo: string;
    joiningDate: string;
}

// Mock fetchBans function with types
const fetchBans = async (): Promise<Banned[]> => {
    const allData = [
        { name: "John Doe", MobileNo: "50%", joiningDate: "Dec 1, 2023", email: "user1@example.com" },
        { name: "Jane Smith", MobileNo: "30%", joiningDate: "Nov 15, 2023", email: "user2@example.com" },
        { name: "Alice Johnson", MobileNo: "75%", joiningDate: "Oct 1, 2023", email: "user3@example.com" },
        { name: "Bob Brown", MobileNo: "100%", joiningDate: "Sep 1, 2023", email: "user4@example.com" },
        { name: "Charlie Davis", MobileNo: "10%", joiningDate: "Jan 1, 2024", email: "user5@example.com" },
        { name: "Dana Evans", MobileNo: "0%", joiningDate: "Feb 1, 2024", email: "user6@example.com" },
        { name: "Eve Foster", MobileNo: "85%", joiningDate: "Jul 15, 2023", email: "user7@example.com" },
        { name: "Frank Green", MobileNo: "20%", joiningDate: "Dec 10, 2023", email: "user8@example.com" },
        { name: "Grace Hill", MobileNo: "45%", joiningDate: "Nov 25, 2023", email: "user9@example.com" },
        { name: "Henry Adams", MobileNo: "100%", joiningDate: "Aug 20, 2023", email: "user10@example.com" },
    ];
    return allData;
};

function Banned() {
    const [data, setData] = useState<Banned[]>([]);
    const [bans, setBans] = useState<Banned[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const router = useRouter();
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

    // Fetch bans when component mounts
    useEffect(() => {
        const loadBans = async () => {
            setLoading(true);
            const banned = await fetchBans();
            setBans(banned);
            setData(banned);
            setLoading(false);
        };
        loadBans();
    }, []);

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = data.slice(firstItemIndex, lastItemIndex);

    // Function to handle tab click and navigate to a new route
    const handleTabClick = (path: string) => {
        router.push(path);
    };
    // THIS STATE IS USED FOR THE DAILOG OF BAN
    const [isBanOpen, setIsBanOpen] = useState(false);
    const openBan = () => setIsBanOpen(true);
    const closeBan = () => setIsBanOpen(false);

    // THIS STATE IS USED FOR THE DAILOG OF DELETE
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const openDelete = () => setIsDeleteOpen(true);
    const closeDelete = () => setIsDeleteOpen(false);

    const [uniqueId, setUniqueId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Check if all fields are filled
    const isAddButtonDisabled = !uniqueId || !startDate || !endDate;

    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const closeDialog = () => {
        setOpenDialog(false);
    };
    const [phone, setPhone] = useState("");

    // Function to handle header checkbox selection
    const handleHeaderCheckboxSelect = () => {
        if (selectedRows.size === currentItems.length) {
            // If all rows are already selected, unselect all
            setSelectedRows(new Set());
        } else {
            // Select all current page rows
            const allCurrentPageIds = currentItems.map(item => item.name);
            setSelectedRows(new Set(allCurrentPageIds));
        }
    };

    // Function to handle row selection
    const handleRowSelect = (bannedId: string) => {
        const newSelectedRows = new Set(selectedRows);
        if (newSelectedRows.has(bannedId)) {
            newSelectedRows.delete(bannedId);
        } else {
            newSelectedRows.add(bannedId);
        }
        setSelectedRows(newSelectedRows);
    };

    return (
        <div className="flex flex-col w-full gap-4 ">
            <div className="flex flex-row justify-between items-center">
                <h2 className="text-lg font-semibold text-[#1D2939]">
                    Users
                </h2>
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

                    {/* Select Students Button */}
                    <Popover
                        placement="bottom"
                        isOpen={isPopoverOpen}
                        onOpenChange={(open) => setIsPopoverOpen(open)}
                    >
                        <PopoverTrigger>
                            <button className={`h-[44px] w-[143px] rounded-md bg-[#FFFFFF] border border-solid border-[#D0D5DD] outline-none justify-between flex items-center p-3 transition-colors ${isPopoverOpen
                                ? "border-[#C7A5FF] ring-4 ring-[#E2D9F8]"
                                : "border-[#D0D5DD]"
                                }`}>
                                <span className="font-medium text-sm text-[#182230] ml-2">All</span>
                                <Image
                                    src="/icons/by-role-arrow-down.svg"
                                    width={20}
                                    height={20}
                                    alt="down arrow"
                                />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[8.875rem] px-0 py-1 border border-lightGrey rounded-md shadow-[0_12px_16px_-4px_rgba(16,24,40,0.08)]">
                            <div className="w-full bg-white">
                                <button className="w-full py-[0.625rem] px-4 text-base text-left text-primary-900 font-normal transition-colors hover:bg-[#F9FAFB]">All</button>
                                <button className="w-full py-[0.625rem] px-4 text-base text-left text-primary-900 font-normal transition-colors hover:bg-[#F9FAFB]">Premium</button>
                                <button className="w-full py-[0.625rem] px-4 text-base text-left text-primary-900 font-normal transition-colors hover:bg-[#F9FAFB]">Free</button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            {selectedRows.size > 0 && (
                <div
                    className="flex flex-row items-center justify-between
                                min-h-9
                                transition-all duration-300 ease-in-out 
                                transform opacity-100 translate-y-0 
                                overflow-hidden"
                >
                    <div className="flex flex-row gap-3 text-sm font-semibold leading-5">
                        <p className="text-[#1D2939]">({selectedRows.size}) Selected</p>
                        {selectedRows.size < data.length && (
                            <button
                                onClick={() => {
                                    const allCurrentPageIds = currentItems.map(item => item.name);
                                    setSelectedRows(new Set(allCurrentPageIds));
                                }}
                                className="text-[#9012FF] underline"
                            >
                                Select all {data.length}
                            </button>
                        )}
                    </div>
                    <div className="flex flex-row gap-2">
                        <button className="flex flex-row items-center px-[0.875rem] py-[0.625rem] gap-1 bg-white border border-lightGrey rounded-md">
                            <Image src='/icons/user-block-green-01.svg' alt="revoke ban" width={20} height={20} />
                            <p className="text-sm text-[#0B9055] font-medium leading-[1.125rem]">Revoke Ban</p>
                        </button>
                        <button className="flex flex-row items-center px-[0.875rem] py-[0.625rem] gap-1 bg-white border border-lightGrey rounded-md">
                            <Image src='/icons/delete.svg' alt="revoke ban" width={20} height={20} />
                            <p className="text-sm text-[#DE3024] font-medium leading-[1.125rem]">Delete</p>
                        </button>
                    </div>
                </div>
            )}

            <div className="flex border border-[#EAECF0] rounded-xl">
                <table className="w-full h-auto bg-white rounded-xl">
                    <thead>
                        <tr>
                            <th className="w-[5%] pl-8 py-4 rounded-tl-xl">
                                <Checkbox
                                    size="md"
                                    color="primary"
                                    isSelected={selectedRows.size === currentItems.length && currentItems.length > 0}
                                    isIndeterminate={selectedRows.size > 0 && selectedRows.size < currentItems.length}
                                    onChange={handleHeaderCheckboxSelect}
                                />
                            </th>
                            <th className="text-left px-8 py-4 flex flex-row">
                                <span className="text-[#667085] font-medium text-sm">Name</span>
                            </th>
                            <th className="text-center px-8 py-4 text-[#667085] font-medium text-sm">
                                <div className="flex flex-row justify-center gap-1">
                                    <p>Email</p>
                                </div>
                            </th>
                            <th className="text-center px-8 py-4 text-[#667085] font-medium text-sm">
                                <div className="flex flex-row justify-center gap-1">
                                    <p>Mobile No.</p>
                                </div>
                            </th>
                            <th className="text-center px-8 py-4 text-[#667085] font-medium text-sm">
                                <div className="flex flex-row justify-center gap-1">
                                    <p>Joining Date</p>
                                </div>
                            </th>
                            <th className="w-[12%] text-center px-8 py-4 rounded-tr-xl text-[#667085] font-medium text-sm">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((banned, index) => (
                            <tr key={index} className="h-auto border-t border-solid border-[#EAECF0]">
                                <td className="text-center pl-8">
                                    <Checkbox
                                        size="md"
                                        color="primary"
                                        isSelected={selectedRows.has(banned.name)}
                                        onChange={() => handleRowSelect(banned.name)}
                                        onClick={(e) => e.stopPropagation()} // Prevent row click when checking checkbox
                                    />
                                </td>
                                <td className="py-2">
                                    <div className="flex flex-row ml-8 gap-2">
                                        <div className="flex items-center">
                                            <div className="relative">
                                                <Image src='/images/DP_Lion.svg' alt="DP" width={40} height={40} />
                                                <Image className="absolute right-0 bottom-0" src='/icons/winnerBatch.svg' alt="Batch" width={18} height={18} />
                                            </div>
                                        </div>
                                        <div className="flex items-start justify-start flex-col">
                                            <div
                                                className="font-semibold cursor-pointer"
                                                onClick={() => handleTabClick('/admin/userdatabase/userdatabaseinfo')}
                                            >
                                                {banned.name}
                                            </div>
                                            <div className="flex justify-start items-start text-[13px] text-[#667085]">jenny#8547</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-4 text-center text-[#101828] text-sm">{banned.email}</td>
                                <td className="px-8 py-4 text-center text-[#101828] text-sm">{banned.MobileNo}</td>
                                <td className="px-8 py-4 text-center text-[#101828] text-sm">{banned.joiningDate}</td>
                                <td className="flex items-center justify-center px-8 py-4 text-[#101828] text-sm">
                                    <Popover placement="bottom-end">
                                        <PopoverTrigger>
                                            <button className="ml-[25%] outline-none">
                                                <Image
                                                    src="/icons/three-dots.svg"
                                                    width={20}
                                                    height={20}
                                                    alt="More Actions"
                                                />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className=" w-[167px] px-0 border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-md  shadow-lg">
                                            <button className=" flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#F2F4F7]">
                                                <Image src='/icons/user-block-green-01.svg' alt="Revoke Ban" width={18} height={18} />
                                                <p className="text-sm text-[#0B9055] font-normal">Revoke Ban</p>
                                            </button>
                                            <button className=" flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#F2F4F7]"
                                                onClick={openDelete}>
                                                <Image src='/icons/delete.svg' alt="Delete" width={18} height={18} />
                                                <p className="text-sm text-[#DE3024] font-normal">Delete</p>
                                            </button>
                                        </PopoverContent>
                                    </Popover>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isBanOpen && <Ban onClose={closeBan} open={true} />}
            {isDeleteOpen && <Delete onClose={closeDelete} open={true} />}
            {/* Dialog Component */}
            <Dialog open={openDialog} onClose={closeDialog} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 flex items-center justify-center">
                    <DialogPanel className="bg-white rounded-2xl w-[500px] h-auto ">
                        <div className="flex flex-col relative gap-6">
                            <div className="flex flex-col px-6 gap-6">
                                <div className="flex flex-row justify-between mt-6">
                                    <h3 className="text-lg font-bold text-[#1D2939]">Add New User</h3>
                                    <button onClick={closeDialog}>
                                        <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                                    </button>
                                </div>
                                <div className="flex flex-col gap-3 items-center">
                                    <div className="relative">
                                        <Image src="/images/DP_Lion.svg" alt="DP" width={152} height={152} />
                                        <Image
                                            className="absolute right-0 bottom-0"
                                            src="/icons/winnerBatch.svg"
                                            alt="Batch"
                                            width={68}
                                            height={68}
                                        />
                                    </div>
                                    <span className="font-semibold text-sm text-[#9012FF]">Change</span>
                                </div>
                                {/* Input Fields */}
                                <div className="flex flex-row w-full gap-4">
                                    <div className="flex flex-col gap-1 w-1/2 flex-grow">
                                        <label className="text-[#1D2939] text-sm font-medium">First Name</label>
                                        <input
                                            className="w-full text-sm font-medium text-[#1D2939] placeholder:text-[#A1A1A1] rounded-md border border-[#D0D5DD] px-4 py-2"
                                            type="text"
                                            placeholder="First Name"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1 w-1/2 flex-grow">
                                        <label className="text-[#1D2939] text-sm font-medium">Last Name</label>
                                        <input
                                            className="w-full text-sm font-medium text-[#1D2939] placeholder:text-[#A1A1A1] rounded-md border border-[#D0D5DD] px-4 py-2"
                                            type="text"
                                            placeholder="Last Name"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 w-full ">
                                    <label htmlFor="num-ratings" className="text-[#1D2939] text-sm font-medium">
                                        User Id
                                    </label>
                                    <div className="flex flex-row py-2 px-4 w-full gap-2 border border-solid border-[#D0D5DD] rounded-md transition duration-200 ease-in-out ">
                                        <input

                                            className="w-full text-sm font-medium text-[#1D2939] placeholder:font-normal placeholder:text-[#A1A1A1] rounded-md outline-none"
                                            type="text"
                                            placeholder="User Id"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-[#344054] text-sm font-medium">Mobile No.</label>
                                    <PhoneInput
                                        country="in"
                                        value={phone}
                                        onChange={(value) => setPhone(value)}
                                        inputProps={{ required: true }}
                                        inputStyle={{
                                            width: "100%",
                                            borderRadius: "8px",
                                            border: "1px solid #D0D5DD",
                                            height: "42px",
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-4 border-t p-4">
                                <button onClick={closeDialog} className="px-6 py-2 border rounded-md text-sm font-semibold">
                                    Discard
                                </button>
                                <button onClick={closeDialog} className="px-6 py-2 bg-[#9012FF] text-white rounded-md text-sm">
                                    Add New User
                                </button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    );
}

export default Banned;