import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Addchapterdialog from "./AddchapterDialog";
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
import SubjectPriority from './SubjectPriority';
import LoadingData from '@/components/Loading';
import DeleteDialog from './DeleteDialog';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase';

// Define types for subjects data
type Subject = {
    chapterName: string;
    priority: 'Low' | 'Medium' | 'High';
    subject: string;
    chapterId: string;
}


function Chemisty() {
    const [addchapterdialog, setAddchapterdialog] = useState(false);
    const [isdelete, setIsdelete] = useState(false);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<Subject[]>([]);
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [activePopover, setActivePopover] = useState<number | null>(null);
    const [chapterName, setChapterName] = useState('');
    const [priority, setPriority] = useState('');
    const [chapterId, setChapterId] = useState('');
    const isTextSearch = searchTerm.trim().length > 0;

    // Real-time listener to fetch users and update state when data changes
    useEffect(() => {
        const sptCollection = collection(db, 'spt');
        const unsubscribe = onSnapshot(sptCollection, (snapshot) => {
            const updatedSubjects: Subject[] = snapshot.docs
                .map((doc) => {
                    const subjectData = doc.data();
                    return {
                        chapterId: subjectData.chapterId,
                        chapterName: subjectData.chapterName,
                        priority: subjectData.priority,
                        subject: subjectData.subject,
                    } as Subject;
                })
                .filter((subject) => subject.subject === 'chemistry'); // Filter only Chemistry subjects

            setSubjects(updatedSubjects);
            setData(updatedSubjects); // Update data for pagination and search
            setLoading(false);
        });

        // Cleanup listener on component unmount
        return () => unsubscribe();
    }, []);

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = data.slice(firstItemIndex, lastItemIndex);

    useEffect(() => {
        let filteredTests = subjects;

        // Filter by search term
        if (searchTerm) {
            filteredTests = filteredTests.filter(subject =>
                subject.chapterName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Update state with filtered and sorted quizzes
        setData(filteredTests);
        setCurrentPage(1); // Reset to first page when filters change
    }, [searchTerm, subjects]);

    const handlePopoverOpen = (index: number) => {
        setActivePopover(index);
    };

    return (
        <div className="flex flex-col w-full gap-4 ">
            <div className="flex flex-row justify-between items-center">
                <h2 className="text-lg font-semibold text-[#1D2939]">
                    Chapters
                </h2>
                <div className="flex flex-row gap-3">
                    {/* Search Button */}
                    <button className="h-[44px] w-[250px] rounded-md bg-[#FFFFFF] border border-gray-300 focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB] focus-within:border-[#D7BBFC] focus-within:ring-4 focus-within:ring-[#E8DEFB] focus-within:outline-none transition-colorsflex items-center">
                        <div className="flex flex-row items-center gap-2 pl-2">
                            <Image
                                src="/icons/search-button.svg"
                                width={20}
                                height={20}
                                alt="Search Button"
                            />
                            <input
                                className="font-normal text-[#667085] text-sm placeholder:text-[#A1A1A1] rounded-md px-1 py-1 outline-none focus:outline-none focus:ring-0 border-none"
                                placeholder="Search"
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </button>
                    <button className=' w-[168px] h-11 flex  outline-none items-center justify-center  rounded-md flex-row gap-2 shadow-inner-button bg-[#9012FF] border border-[#800EE2] border-solid hover:bg-[#6D0DCC] '
                        onClick={() => {
                            setAddchapterdialog(true); // Open the dialog
                            setChapterName('');
                            setPriority('');
                            setChapterId('');
                        }}>
                        <Image
                            src="/icons/plus-white-sign.svg"
                            width={18}
                            height={18}
                            alt="plus-icon"
                        />
                        <span className='font-semibold text-[#FFFFFF] text-sm'>Add Chapter</span>
                    </button>
                </div>
            </div>
            {loading ? (
                <div className="flex justify-center items-center h-48">
                    <LoadingData />
                </div>
            ) : (
                <div className="flex flex-1 flex-col justify-between">
                    <div className="h-full">
                        <div className="border border-[#EAECF0] rounded-xl overflow-x-auto">
                            <table className="w-full bg-white rounded-xl">
                                <thead>
                                    <tr>
                                        <th className="w-[53%] text-left px-8 py-4 pl-8 rounded-tl-xl text-[#667085] font-medium text-sm">Chapter</th>
                                        <th className="flex px-8 py-4 rounded-tr-xl text-[#667085] font-medium text-sm">Priority</th>
                                        <th className="text-right px-8 py-4 rounded-tr-xl text-[#667085] font-medium text-sm">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.length > 0 ? (
                                        currentItems.map((subject, index) => (
                                            <tr key={index} className="border-t border-solid border-[#EAECF0]">
                                                <td>
                                                    <p className="px-8 text-start text-sm text-[#1D2939] font-normal leading-6 whitespace-nowrap">{"phodu chapter"}</p>
                                                </td>
                                                <td className="px-8 py-4 text-center text-[#101828] text-sm">
                                                    <span className='flex justify-start rounded-full'>
                                                        <SubjectPriority Priority={"phodu priority"} />
                                                    </span>
                                                </td>
                                                <td className="text-right px-8 py-4 text-[#101828] text-sm">
                                                    <Popover placement="bottom-end"
                                                        isOpen={activePopover === index}
                                                        onOpenChange={(open) => open ? handlePopoverOpen(index) : setActivePopover(null)}
                                                    >
                                                        <PopoverTrigger>
                                                            <button type='button' className="ml-[60%] p-1 rounded-full outline-none transition-colors duration-150 hover:bg-[#F2F4F7]"

                                                            >
                                                                <Image
                                                                    src="/icons/three-dots.svg"
                                                                    width={20}
                                                                    height={20}
                                                                    alt="More Actions"
                                                                />
                                                            </button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-[118px] px-0 py-1 rounded-md border border-lightGrey">
                                                            <div className='w-full'>
                                                                <button
                                                                    className='flex flex-row items-center w-full px-4 py-[10px] gap-1 transition-colors duration-150 hover:bg-[#F2F4F7]'
                                                                    onClick={() => {
                                                                        setAddchapterdialog(true); // Open the dialog
                                                                        setActivePopover(null);
                                                                        setChapterId(subject.chapterId);
                                                                        setChapterName(subject.chapterName);
                                                                        setPriority(subject.priority);
                                                                    }}
                                                                >
                                                                    <Image src='/icons/edit-02.svg' alt='edit' width={18} height={18} />
                                                                    <p className='text-sm text-[#0C111D] font-normal leading-5'>Edit</p>
                                                                </button>
                                                                <button
                                                                    className="flex flex-row items-center w-full px-4 py-[10px] gap-1 transition-colors duration-150 hover:bg-[#FEE4E2]"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation(); // Prevent propagation to other elements
                                                                        setIsdelete(true); // Trigger delete action
                                                                        setActivePopover(null);
                                                                        setChapterId(subject.chapterId);
                                                                        setChapterName(subject.chapterName);
                                                                    }}
                                                                >
                                                                    <Image src="/icons/delete.svg" alt="edit" width={18} height={18} />
                                                                    <p className="text-sm text-[#DE3024] font-normal leading-5">Delete</p>
                                                                </button>
                                                            </div>
                                                        </PopoverContent>
                                                    </Popover>

                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr className='border-t border-lightGrey'>
                                            <td colSpan={6} className="text-center py-8">
                                                {isTextSearch && (
                                                    <p className="text-[#667085] text-sm">
                                                        No chapters found for &quot;{searchTerm}&quot;
                                                    </p>
                                                )}
                                                {!isTextSearch && (
                                                    <p className="text-[#667085] text-sm">
                                                        No chapters found
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
            {addchapterdialog && (
                <Addchapterdialog
                    open={addchapterdialog}
                    onClose={() => {
                        setAddchapterdialog(false);
                        setIsdelete(false);
                    }}
                    subject='chemistry'
                    chapterName={chapterName}
                    setChapterName={setChapterName}
                    priority={priority}
                    setPriority={setPriority}
                    chapterId={chapterId}
                />
            )}
            {isdelete && (
                <DeleteDialog open={isdelete} onClose={() => setIsdelete(false)} chapterId={chapterId} chapterName={chapterName} />
            )}
        </div>
    )
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

export default Chemisty;