"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Addnewuser from "@/components/AdminComponents/RoleMangement/AddNewUser";
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
import Roles from '@/components/AdminComponents/RoleMangement/Roles';

// Define types for quiz data
interface Quiz {
    userid: string;
    moblieid: string;
    role: string;
    status: 'Live' | 'Paused' | 'Finished' | 'Scheduled' | 'Cancelled' | 'Saved';
}

// Mock fetchQuizzes function with types
const fetchQuizzes = async (): Promise<Quiz[]> => {
    const allQuizzes: Quiz[] = [
        {
            userid: "jenny#8547",
            moblieid: "+919164588441",
            role: "Admin",
            status: "Live"
        },
        {
            userid: "jenny#8547",
            moblieid: "+919164588441",
            role: "Customer Care",
            status: "Saved"
        },
        {
            userid: "jenny#8547",
            moblieid: "+919164588441",
            role: "Teacher",
            status: "Paused"
        },
        {
            userid: "jenny#8547",
            moblieid: "+919164588441",
            role: "Chief Moderator",
            status: "Finished"
        },
        {
            userid: "jenny#8547",
            moblieid: "+919164588441",
            role: "Guide",
            status: "Scheduled"
        },
        {
            userid: "jenny#8547",
            moblieid: "+919164588441",
            role: "Editor",
            status: "Cancelled"
        },
        {
            userid: "jenny#8547",
            moblieid: "85%",
            role: "Admin",
            status: "Live"
        },
        {
            userid: "jenny#8547",
            moblieid: "+919164588441",
            role: "Customer Care",
            status: "Saved"
        },
        {
            userid: "jenny#8547",
            moblieid: "+919164588441",
            role: "Teacher",
            status: "Paused"
        },
        {
            userid: "jenny#8547",
            moblieid: "+919164588441",
            role: "Chief Moderator",
            status: "Finished"
        }
    ];
    return allQuizzes;
};

function rolemangement() {
    const [data, setData] = useState<Quiz[]>([]);
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();
    // for Edit profile dailog
    const [isAddUser, setisAddUser] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // New state to track if editing

    const openAddUser = (editMode = false) => {
        setisAddUser(true);
        setIsEditing(editMode);
    };
    const closeAddUser = () => {
        setisAddUser(false);
        setIsEditing(false); // Reset editing mode when closing
    };

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

    return (
        <div className="flex flex-col w-full  gap-4 p-8">
            <div className="flex flex-row justify-between items-center">
                <span className="text-lg font-semibold text-[#1D2939]">Users</span>
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
                    <button className="h-[44px] w-[143px] rounded-md bg-[#FFFFFF] border justify-between border-solid border-[#D0D5DD] flex items-center p-3">
                        <span className="font-medium text-sm text-[#667085] ml-2">By Role</span>
                        <Image
                            src="/icons/by-role-arrow-down.svg"
                            width={20}
                            height={20}
                            alt="Select-date Button"
                        />
                    </button>
                    <button
                        className="h-[44px] w-auto px-6 py-2 bg-[#8501FF] rounded-md shadow-inner-button border border-solid border-[#800EE2] flex items-center justify-center"
                        onClick={() => openAddUser()} >
                        <span className="text-[#FFFFFF] font-semibold text-sm">Add New User</span>
                    </button>
                </div>
            </div>

            <div className="flex flex-col justify-between h-full">
                <div className="flex border border-[#EAECF0] rounded-xl">
                    <table className="w-full bg-white rounded-xl">
                        <thead>
                            <tr>
                                <th className="w-[25%] text-left px-8 py-4 pl-8 rounded-tl-xl flex flex-row ">
                                    <span className="text-[#667085] font-medium text-sm">Name</span>
                                </th>
                                <th className=" w-[22%] text-center px-8 py-4 text-[#667085] font-medium text-sm">
                                    <div className="flex flex-row justify-center gap-1">
                                        <p>User Id</p>
                                    </div>
                                </th>
                                <th className=" w-[22%] text-center px-8 py-4 text-[#667085] font-medium text-sm">
                                    <div className="flex flex-row justify-center gap-1">
                                        <p>Moblie No.</p>
                                    </div>
                                </th>
                                <th className=" w-[22%] px-8 py-4 text-[#667085] font-medium text-sm">
                                    <div className="flex flex-row ml-3 gap-1">
                                        <p>Role</p>
                                    </div>
                                </th>
                                <th className="w-[9%] text-center px-8 py-4 rounded-tr-xl text-[#667085] font-medium text-sm">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((quiz, index) => (
                                <tr key={index} className="border-t border-solid border-[#EAECF0]">
                                    <td className="py-2">
                                        <div className="flex flex-row ml-8 gap-2">
                                            <Image src='/icons/Profile-pic.png' alt="DP" width={40} height={40} />
                                            <div className="flex items-start justify-start flex-col">
                                                <div className="font-semibold">Jenny Wilson</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-4 text-center text-[#101828] text-sm">{quiz.userid}</td>
                                    <td className="px-8 py-4 text-center text-[#101828] text-sm">{quiz.moblieid}</td>
                                    <td className="py-4 text-center text-[#101828] text-sm">
                                        <span className='flex items-center justify-start ml-[17%] rounded-full'>
                                            <Roles roles={quiz.role} />
                                        </span>
                                    </td>
                                    <td className="flex items-center justify-center ml-[20%] px-8 py-4 text-[#101828] text-sm">
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
                                            <PopoverContent className="w-[10.438rem] py-1 bg-white border border-lightGrey rounded-md ">
                                                <div className="w-[10.438rem] py-1 bg-white border border-lightGrey rounded-md px-0">
                                                    <button className="flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#F2F4F7]"
                                                        onClick={() => openAddUser(true)} >
                                                        <Image src="/icons/edit-02.svg" width={18} height={18} alt="edit" />
                                                        <span className="text-sm text-[#0C111D] font-normal">Edit details</span>
                                                    </button>
                                                    <button className=" flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#F2F4F7]"
                                                    >
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
                <div className="flex justify-end">
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
            {isRemoveOpen && < Remove onClose={closeRemove} open={true} />}
            {/* Dialog Component  for AddNewUser*/}
            {isAddUser && <Addnewuser close={closeAddUser} open={true} isEditing={isEditing} />}
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

export default rolemangement;