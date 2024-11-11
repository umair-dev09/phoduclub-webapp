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
import Remove from "@/components/AdminComponents/QuizInfoDailogs/Remove";

// Define types for quiz data
interface Quiz {
    email: string;
    MobileNo: string;
    joiningDate: string;
    status: 'Live' | 'Paused' | 'Finished' | 'Scheduled' | 'Cancelled' | 'Saved';
}

// Mock fetchQuizzes function with types
const fetchQuizzes = async (): Promise<Quiz[]> => {
    const allQuizzes: Quiz[] = [
        {

            MobileNo: "50%",
            joiningDate: "Dec 1, 2023",
            email: "Jun 1, 2024",
            status: "Live"
        },
        {

            MobileNo: "30%",
            joiningDate: "Nov 15, 2023",
            email: "May 15, 2024",
            status: "Saved"
        },
        {

            MobileNo: "75%",
            joiningDate: "Oct 1, 2023",
            email: "Apr 1, 2024",
            status: "Paused"
        },
        {

            MobileNo: "100%",
            joiningDate: "Sep 1, 2023",
            email: "Mar 1, 2024",
            status: "Finished"
        },
        {

            MobileNo: "10%",
            joiningDate: "Jan 1, 2024",
            email: "Jul 1, 2024",
            status: "Scheduled"
        },
        {

            MobileNo: "0%",
            joiningDate: "Feb 1, 2024",
            email: "Aug 1, 2024",
            status: "Cancelled"
        },
        {

            MobileNo: "85%",
            joiningDate: "Jul 15, 2023",
            email: "Jan 15, 2024",
            status: "Live"
        },
        {

            MobileNo: "20%",
            joiningDate: "Dec 10, 2023",
            email: "Jun 10, 2024",
            status: "Saved"
        },
        {

            MobileNo: "45%",
            joiningDate: "Nov 25, 2023",
            email: "May 25, 2024",
            status: "Paused"
        },
        {

            MobileNo: "100%",
            joiningDate: "Aug 20, 2023",
            email: "Feb 20, 2024",
            status: "Finished"
        }
    ];

    return allQuizzes;
};

function customerData() {
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
    // useEffect(() => {
    //     const filteredQuizzes = quizzes.filter(quiz =>
    //         quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
    //     );
    //     setData(filteredQuizzes);
    //     setCurrentPage(1); // Reset to first page on new search
    // }, [searchTerm, quizzes]);

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = data.slice(firstItemIndex, lastItemIndex);

    // Function to handle tab click and navigate to a new route
    const handleTabClick = (path: string) => {
        router.push(path);
    };

    const [isRemoveOpen, setIsRemoveOpen] = useState(false);

    const openRemove = () => setIsRemoveOpen(true);
    const closeRemove = () => setIsRemoveOpen(false);

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
    return (
        <div className="flex flex-col w-full  gap-4 p-6">
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

                    {/* Select Date Button */}
                    <button className="h-[44px] w-[143px] rounded-md bg-[#FFFFFF] border border-solid border-[#D0D5DD] justify-between flex items-center p-3">
                        <span className="font-medium text-sm text-[#667085] ml-2">All Students</span>
                        <Image
                            src="/icons/by-role-arrow-down.svg"
                            width={20}
                            height={20}
                            alt="down arrow"
                        />
                    </button>
                    <button
                        onClick={handleOpenDialog}
                        className="h-[44px] w-auto px-6 py-2 bg-[#8501FF] rounded-md shadow-inner-button border border-solid border-[#800EE2] flex items-center justify-center">
                        <span className="text-[#FFFFFF] font-semibold text-sm">Add New User</span>
                    </button>
                </div>
            </div>

            <div className="flex flex-col justify-between h-full">
                <div className="flex border border-[#EAECF0] rounded-xl">
                    <table className="w-full h-auto bg-white rounded-xl">
                        <thead>
                            <tr>
                                <th className="w-1/4 text-left px-8 py-4 pl-8 rounded-tl-xl flex flex-row">
                                    <span className="text-[#667085] font-medium text-sm">Name</span>
                                </th>
                                <th className=" w-[17%] text-center px-8 py-4 text-[#667085] font-medium text-sm">
                                    <div className="flex flex-row justify-center gap-1">
                                        <p>Email</p>
                                    </div>
                                </th>
                                <th className=" w-[17%] text-center px-8 py-4 text-[#667085] font-medium text-sm">
                                    <div className="flex flex-row justify-center gap-1">
                                        <p>Mobile No.</p>
                                    </div>
                                </th>
                                <th className=" w-[17%] text-center px-8 py-4 text-[#667085] font-medium text-sm">
                                    <div className="flex flex-row justify-center gap-1">
                                        <p>Joining Date</p>
                                    </div>
                                </th>
                                <th className="w-[12%] text-center px-8 py-4 rounded-tr-xl text-[#667085] font-medium text-sm">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((quiz, index) => (
                                <tr key={index} className="h-auto border-t border-solid border-[#EAECF0]">
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
                                                    onClick={() => handleTabClick('/admin/customerdatamanagement/customerinfo')}
                                                >
                                                    Jenny Wilson
                                                </div>
                                                <div className="flex justify-start items-start text-[13px] text-[#667085]">jenny#8547</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-4 text-center text-[#101828] text-sm">{quiz.email}</td>
                                    <td className="px-8 py-4 text-center text-[#101828] text-sm">{quiz.MobileNo}</td>
                                    <td className="px-8 py-4 text-center text-[#101828] text-sm">{quiz.joiningDate}</td>
                                    <td className="flex items-center justify-center px-8 py-4 text-[#101828] text-sm">
                                        <Popover placement="bottom-end">
                                            <PopoverTrigger>
                                                <button>
                                                    <Image
                                                        src="/icons/three-dots.svg"
                                                        width={20}
                                                        height={20}
                                                        alt="More Actions"
                                                    />
                                                </button>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <div className="w-[10.438rem] py-1 bg-white border border-lightGrey rounded-md">
                                                    <button className="flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#F2F4F7]">
                                                        <Image src='/icons/user-account.svg' alt="user profile" width={18} height={18} />
                                                        <p className="text-sm text-[#0C111D] font-normal">Go to Profile</p>
                                                    </button>
                                                    <button className=" flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#F2F4F7]"
                                                        onClick={openRemove}>
                                                        <Image src='/icons/delete.svg' alt="user profile" width={18} height={18} />
                                                        <p className="text-sm text-[#DE3024] font-normal">Remove</p>
                                                    </button>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
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
            {isRemoveOpen && < Remove onClose={closeRemove} open={true} />}
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

export default customerData;