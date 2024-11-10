"use client";
import { useState } from "react";
import React from 'react';
import Image from "next/image";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { useRouter } from 'next/navigation';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

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
            role: "Dec 1, 2023",
            status: "Live"
        },
        {
            userid: "jenny#8547",
            moblieid: "+919164588441",
            role: "Nov 15, 2023",
            status: "Saved"
        },
        {
            userid: "jenny#8547",
            moblieid: "+919164588441",
            role: "Oct 1, 2023",
            status: "Paused"
        },
        {
            userid: "jenny#8547",
            moblieid: "+919164588441",
            role: "Sep 1, 2023",
            status: "Finished"
        },
        {
            userid: "jenny#8547",
            moblieid: "+919164588441",
            role: "Jan 1, 2024",
            status: "Scheduled"
        },
        {
            userid: "jenny#8547",
            moblieid: "+919164588441",
            role: "Feb 1, 2024",
            status: "Cancelled"
        },
        {
            userid: "jenny#8547",
            moblieid: "85%",
            role: "Jul 15, 2023",
            status: "Live"
        },
        {
            userid: "jenny#8547",
            moblieid: "+919164588441",
            role: "Dec 10, 2023",
            status: "Saved"
        },
        {
            userid: "jenny#8547",
            moblieid: "+919164588441",
            role: "Nov 25, 2023",
            status: "Paused"
        },
        {
            userid: "jenny#8547",
            moblieid: "+919164588441",
            role: "Aug 20, 2023",
            status: "Finished"
        }
    ];
    return allQuizzes;
};

function Messenger() {
    const router = useRouter();
    const [data, setData] = useState<Quiz[]>([]);
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const [isOpen, setIsOpen] = useState(false);
    // Handler to open the dialog
    const handleCreate = () => setIsOpen(true);

    // -------------------------------------------------------------------------------
    // State to track the selected icon
    const [selectedIcon, setSelectedIcon] = useState("/icons/idea-2.svg");

    // Function to handle icon selection
    const handleIconSelect = (iconPath: React.SetStateAction<string>) => {
        setSelectedIcon(iconPath); // Update the selected icon state
    };

    // -------------------------------------------------------------------------------
    const [selectedIconforimage, setSelectedIconforimage] = useState("/icons/annocement.png");

    // Function to handle icon selection
    const handleIconSelectforimage = (iconPath: React.SetStateAction<string>) => {
        setSelectedIconforimage(iconPath); // Update the selected icon state
    };
    // -------------------------------------------------------------------------------
    // State for Description words(0/100)
    const [description, setDescription] = useState("");
    const handleInputChange = (e: any) => {
        const inputText = e.target.value;
        if (inputText.length <= 100) {
            setDescription(inputText);
        }
    };
    // -------------------------------------------------------------------------------
    // State for Name words(0/100)
    const [name, setName] = useState("");
    const handleInputChangeforName = (e: any) => {
        const inputText = e.target.value;
        if (inputText.length <= 50) {
            setName(inputText);
        }
    };
    // -------------------------------------------------------------------------------
    // State for  words(0/100)
    const [cta, setCta] = useState("");
    const handleInputChangeforCta = (e: any) => {
        const inputText = e.target.value;
        if (inputText.length <= 30) {
            setCta(inputText);
        }
    };

    const handleButtonClick = (path: string) => {
        router.push(path);
    }

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = data.slice(firstItemIndex, lastItemIndex);

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between h-[44px] items-center mt-4">
                <h1 className="font-semibold text-lg text-[#1D2939]">Messenger</h1>
                <button
                    // onClick={handleCreate}
                    onClick={() => handleButtonClick('/admin/marketingintegration/marketinfo')}
                    className="h-[44px] w-auto px-6 py-2 bg-[#8501FF] rounded-md shadow-inner-button border border-solid border-[#800EE2] flex items-center justify-center"
                >
                    <span className="text-[#FFFFFF] font-semibold text-sm">Create Push Notification</span>
                </button>
            </div>

            <div className="w-full h-auto flex flex-row gap-1">
                <div className="w-full flex flex-col p-4 border border-solid border-[#EAECF0] bg-[#FFFFFF] justify-center rounded-xl h-[82px]">
                    <span className="text-[#667085] font-normal text-sm">All Clicks</span>
                    <span className="font-medium text-[#1D2939] text-base">2599</span>
                </div>
                <div className="w-full flex flex-col p-4 border border-solid border-[#EAECF0] bg-[#FFFFFF] justify-center rounded-xl h-[82px]">
                    <span className="text-[#667085] font-normal text-sm">Premium User Clicks</span>
                    <span className="font-medium text-[#1D2939] text-base">5599</span>
                </div>
                <div className="w-full flex flex-col p-4 border border-solid border-[#EAECF0] bg-[#FFFFFF] justify-center rounded-xl h-[82px]">
                    <span className="text-[#667085] font-normal text-sm">Free User Clicks</span>
                    <span className="font-medium text-[#1D2939] text-base">329494</span>
                </div>
            </div>

            <div className="flex flex-col justify-between h-full">
                <div className="flex border border-[#EAECF0] rounded-xl">
                    <table className="w-full bg-white rounded-xl">
                        <thead>
                            <tr>
                                <th className="w-1/4 text-left px-8 py-4 pl-8 rounded-tl-xl flex flex-row ">
                                    <span className="text-[#667085] font-medium text-sm">Name</span>
                                    <Image src="/icons/expandall.svg" width={28} height={18} alt="Expand all icon" />
                                </th>
                                <th className=" w-[17%] text-center px-8 py-4 text-[#667085] font-medium text-sm">
                                    <div className="flex flex-row justify-center gap-1">
                                        <p>User Id</p>
                                        <Image src='/icons/unfold-more-round.svg' alt="" width={16} height={16} />
                                    </div>
                                </th>
                                <th className=" w-[17%] text-center px-8 py-4 text-[#667085] font-medium text-sm">
                                    <div className="flex flex-row justify-center gap-1">
                                        <p>Moblie No.</p>
                                        <Image src='/icons/unfold-more-round.svg' alt="" width={16} height={16} />
                                    </div>
                                </th>
                                <th className=" w-[17%] text-center px-8 py-4 text-[#667085] font-medium text-sm">
                                    <div className="flex flex-row justify-center gap-1">
                                        <p>Role</p>
                                        <Image src='/icons/unfold-more-round.svg' alt="" width={16} height={16} />
                                    </div>
                                </th>
                                <th className="w-[12%] text-center px-8 py-4 rounded-tr-xl text-[#667085] font-medium text-sm">Action</th>
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
                                    <td className="px-8 py-4 text-center text-[#101828] text-sm">{quiz.role}</td>
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

            {/* Dialog Component */}
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 flex items-center justify-center">
                    <DialogPanel className="bg-white rounded-2xl w-[500px] h-auto ">
                        <div className="flex flex-col relative px-6 ">
                            <div className="flex flex-row justify-between my-6">
                                <h3 className="text-lg font-bold text-[#1D2939]">Create Push Notification</h3>
                                <button onClick={() => setIsOpen(false)}>
                                    <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                                </button>
                            </div>

                            <div className="flex flex-col w-full gap-1 ">

                                <label className="text-[#1D2939] text-sm font-medium">Name</label>
                                <div className="flex flex-row p-2 w-full gap-2 border border-solid border-[#D0D5DD] rounded-md ">
                                    <Popover placement="bottom">
                                        <PopoverTrigger>
                                            <button className="flex flex-row w-[44px] items-center rounded-md transition duration-200 ease-in-out justify-between">
                                                <Image
                                                    src={selectedIcon}
                                                    width={24}
                                                    height={24}
                                                    alt="Selected Icon"
                                                />
                                                <Image
                                                    src="/icons/chevron-down.svg"
                                                    width={20}
                                                    height={20}
                                                    alt="Dropdown Arrow"
                                                />
                                            </button>
                                        </PopoverTrigger>

                                        <PopoverContent>
                                            <div className="py-1 w-[56px] border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-md flex flex-col shadow-lg">
                                                {/* Idea Button */}
                                                <button
                                                    className="flex flex-row w-full p-1 hover:bg-[#F2F4F7] justify-center items-center"
                                                    onClick={() => handleIconSelect("/icons/idea-2.svg")}
                                                >
                                                    <Image
                                                        src="/icons/idea-2.svg"
                                                        width={24}
                                                        height={24}
                                                        alt="Idea Button"
                                                    />
                                                </button>

                                                {/* Megaphone Button */}
                                                <button
                                                    className="flex flex-row w-full p-1 hover:bg-[#F2F4F7] justify-center items-center"
                                                    onClick={() => handleIconSelect("/icons/megaphone.svg")}
                                                >
                                                    <Image
                                                        src="/icons/megaphone.svg"
                                                        width={24}
                                                        height={24}
                                                        alt="Megaphone Button"
                                                    />
                                                </button>

                                                {/* Read Button */}
                                                <button
                                                    className="flex flex-row w-full p-1 hover:bg-[#F2F4F7] justify-center items-center"
                                                    onClick={() => handleIconSelect("/icons/read-2.svg")}
                                                >
                                                    <Image
                                                        src="/icons/read-2.svg"
                                                        width={24}
                                                        height={24}
                                                        alt="Read Button"
                                                    />
                                                </button>
                                            </div>
                                        </PopoverContent>
                                    </Popover>


                                    <input
                                        className="w-full text-sm font-medium text-[#1D2939] placeholder:font-normal placeholder:text-[#A1A1A1] rounded-md outline-none"
                                        type="text"
                                        placeholder="Notification Heading"
                                        value={name}
                                        onChange={handleInputChangeforName}
                                    />
                                </div>
                                <span className="text-[#475467] font-normal text-right text-sm">{name.length}/50</span>


                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <label className="text-[#1D2939] text-sm font-medium">Description</label>
                                <input
                                    className="w-full py-2 px-4 text-sm font-medium text-[#1D2939] border border-[#D0D5DD] rounded-md"
                                    type="text"
                                    placeholder="Button Name"
                                    value={description}
                                    onChange={handleInputChange}
                                />
                                <span className="text-[#475467] font-normal text-right text-sm">{description.length}/100</span>
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <label className="text-[#1D2939] text-sm font-medium">CTA</label>
                                <input
                                    className="w-full py-2 px-4 text-sm font-medium text-[#1D2939] border border-[#D0D5DD] rounded-md"
                                    type="text"
                                    placeholder="Notification Content"
                                    value={cta}
                                    onChange={handleInputChangeforCta}
                                />
                                <span className="text-[#475467] font-normal text-right text-sm">{cta.length}/30</span>
                            </div>
                            <div className="flex flex-col gap-1 w-full ">
                                <label className="text-[#1D2939] text-sm font-medium">Hyperlink</label>
                                <input
                                    className="w-full py-2 px-4 text-sm font-medium text-[#1D2939] border border-[#D0D5DD] rounded-md"
                                    type="text"
                                    placeholder="Add hyperlink"
                                />
                            </div>
                            <div className="flex flex-col gap-1 w-full mt-4">
                                <label className="text-[#1D2939] text-sm font-medium">Countdown Timer</label>
                                <div className="flex flex-row p-2 w-full justify-between border border-solid border-[#D0D5DD] rounded-md ">
                                    <div className="flex flex-row gap-2">
                                        <Image
                                            src="/icons/clock-01.svg"
                                            width={24}
                                            height={24}
                                            alt="calender" />
                                        <input
                                            className="w-full text-sm font-medium text-[#1D2939] placeholder:font-normal placeholder:text-[#A1A1A1] rounded-md outline-none"
                                            type="text"
                                            placeholder="Select Time"
                                        />
                                    </div>
                                    <div>
                                        <Popover placement="bottom">
                                            <PopoverTrigger>
                                                <button className="flex flex-row w-[44px] items-center rounded-md transition duration-200 ease-in-out justify-between">
                                                    <Image
                                                        src={selectedIconforimage}
                                                        width={24}
                                                        height={24}
                                                        alt="Selected Icon"
                                                    />
                                                    <Image
                                                        src="/icons/chevron-down.svg"
                                                        width={20}
                                                        height={20}
                                                        alt="Dropdown Arrow"
                                                    />
                                                </button>
                                            </PopoverTrigger>

                                            <PopoverContent>
                                                <div className="py-1 w-[56px] border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-md flex flex-col shadow-lg">
                                                    {/* Idea Button */}
                                                    <button
                                                        className="flex flex-row w-full p-1 hover:bg-[#F2F4F7] justify-center items-center"
                                                        onClick={() => handleIconSelectforimage("/icons/annocement.png")}
                                                    >
                                                        <Image
                                                            src="/icons/annocement.png"
                                                            width={24}
                                                            height={24}
                                                            alt="Idea Button"
                                                        />
                                                    </button>

                                                    {/* Megaphone Button */}
                                                    <button
                                                        className="flex flex-row w-full p-1 hover:bg-[#F2F4F7] justify-center items-center"
                                                        onClick={() => handleIconSelectforimage("/icons/megaphone.svg")}
                                                    >
                                                        <Image
                                                            src="/icons/megaphone.svg"
                                                            width={24}
                                                            height={24}
                                                            alt="Megaphone Button"
                                                        />
                                                    </button>

                                                    {/* Read Button */}
                                                    <button
                                                        className="flex flex-row w-full p-1 hover:bg-[#F2F4F7] justify-center items-center"
                                                        onClick={() => handleIconSelectforimage("/icons/read-2.svg")}
                                                    >
                                                        <Image
                                                            src="/icons/read-2.svg"
                                                            width={24}
                                                            height={24}
                                                            alt="Read Button"
                                                        />
                                                    </button>
                                                </div>
                                            </PopoverContent>
                                        </Popover>


                                    </div>
                                </div>

                            </div>
                            <hr className="my-5" />
                            <h1 className="text-[#1D2939] font-semibold text-lg ">Schedule notification</h1>
                            <div className="flex flex-row w-full gap-4  mt-1">
                                <div className="flex flex-col gap-1 w-1/2 flex-grow">
                                    <label htmlFor="rating" className="text-[#1D2939] text-sm font-medium">
                                        Date
                                    </label>
                                    <div className="flex flex-row p-2 w-full gap-2 border border-solid border-[#D0D5DD] rounded-md  ">
                                        <Image
                                            src="/icons/calendar-03.svg"
                                            width={24}
                                            height={24}
                                            alt="calender" />
                                        <input

                                            className="w-full text-sm font-medium text-[#1D2939] placeholder:font-normal placeholder:text-[#A1A1A1] rounded-md outline-none"
                                            type="text"
                                            placeholder="Select Date"
                                        />

                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 w-1/2 flex-grow">
                                    <label htmlFor="num-ratings" className="text-[#1D2939] text-sm font-medium">
                                        Time
                                    </label>
                                    <div className="flex flex-row p-2 w-full gap-2 border border-solid border-[#D0D5DD] rounded-md ">
                                        <Image
                                            src="/icons/clock-01.svg"
                                            width={24}
                                            height={24}
                                            alt="calender" />
                                        <input
                                            className="w-full text-sm font-medium text-[#1D2939] placeholder:font-normal placeholder:text-[#A1A1A1] rounded-md outline-none"
                                            type="text"
                                            placeholder="Select Time"
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="flex flex-row justify-end mt-6 gap-4 border-t border-[#EAECF0] pt-4 p-4 rounded-md">
                            <button
                                onClick={() => setIsOpen(false)}
                                className="py-2 px-6 border rounded-md text-[#1D2939] font-semibold text-sm">
                                Cancel
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="py-2 px-6 bg-[#9012FF] text-white rounded-md font-semibold text-sm">
                                Send Notification
                            </button>
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

export default Messenger;
