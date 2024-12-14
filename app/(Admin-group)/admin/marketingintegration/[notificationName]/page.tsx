"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from "@/firebase";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from 'next/navigation';
import QuizStatus from "@/components/AdminComponents/StatusDisplay";
import LoadingData from "@/components/Loading";

// Define types for quiz data
type Quiz = {
    userId: string;
    date: string;
    time: string;
}

type NotificationData = {
    name: string;
    description: string;
    createdAt: string;
    cta: string;
    endDate: string;
    hyperLink: string;
    notificationIcon: string;
    notificationId: string;
    startDate: string;
    status: string;

}


function NotificationName () { 
    const searchParams = useSearchParams();
    const notiId = searchParams.get('nId');
    const [data, setData] = useState<NotificationData | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotiData = async () => {
          if (!notiId) return;
    
          try {
            const notiDocRef = doc(db, 'notifications', notiId);
            const notiDocSnap = await getDoc(notiDocRef);
    
            if (notiDocSnap.exists()) {
              setData(notiDocSnap.data() as NotificationData);
              setLoading(false);
            } else {
              console.error('Notification data not found');
              setLoading(false);

            }
    
          } catch (error) {
            console.error('Error fetching noti data:', error);
            setLoading(false);
          }
        };
    
        fetchNotiData();
      }, [notiId]);

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    // const currentItems = data.slice(firstItemIndex, lastItemIndex);
   
    if(loading){
        return <LoadingData />
    }
    return (
        <div className="py-8 flex flex-col w-full h-auto overflow-y-auto">
            <div className="flex flex-col px-8 gap-1">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-2 items-center">
                        <Image
                            src={data?.notificationIcon || ''}
                            width={24}
                            height={24}
                            alt="idea-icon" />
                        <h1 className="text-[#1D2939] font-semibold text-2xl">{data?.name}</h1>
                            <div>{<QuizStatus status={data?.status || ''}/>}</div>
                        
                    </div>
                    <div className="flex flex-row gap-2">
                        {/* Button for Pause Quiz */}
                        {/* <button className="w-auto p-3 gap-2 flex-row flex bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center">
                            <Image src="/icons/pausequiz.svg" width={18} height={18} alt="Paused-quiz" />
                            <span className="text-sm text-[#0C111D] font-normal">Pause Quiz</span>
                        </button> */}
                        {/* Button for End Quiz */}
                        {/* <button className="w-auto p-3 gap-2 flex-row flex bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center">
                            <Image src="/icons/endquiz.svg" width={18} height={18} alt="End-quiz" />
                            <span className="text-sm text-[#DE3024]  font-normal">End Quiz</span>
                        </button> */}
                        {/* Button for Resume Quiz */}
                        {/* <button
                            className="w-auto p-3 gap-2 flex-row flex rounded-[8px] h-[40px] items-center">
                            <Image src="/icons/resume.svg" width={18} height={18} alt="Resume Quiz" />
                            <span className="text-sm text-[#9012FF]  font-medium">Resume Quiz</span>
                        </button> */}
                        {/* Button for Delete Quiz */}
                        {/* <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] w-full items-center">
                            <Image src="/icons/delete.svg" width={18} height={18} alt="delete-quiz" />
                            <span className="text-sm text-[#DE3024] font-normal">Delete Quiz</span>
                        </button> */}
                        <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] items-center">
                            <Image src="/icons/edit-icon.svg" width={18} height={18} alt="Edit-quiz" />
                            <span className="text-sm text-[#0C111D] font-normal">Edit Quiz</span>
                        </button>
                    </div>
                </div>
                <div className="flex flex-row gap-2">
                    <div className="bg-[#EAECF0] rounded-[8px] p-2 flex flex-row gap-1">
                        <Image
                            src="/icons/information-circle.svg"
                            width={20}
                            height={20}
                            alt="information-icon"
                        />
                        <span className="text-[#475467] font-normal text-[13px]">Notification shceduled on 12 Jan, 2024   05:30 PM</span>
                    </div>
                    <button>
                        <Image src="/icons/edit-icon.svg" width={18} height={18} alt="Edit-quiz" />
                    </button>
                </div>
                <span className="font-normal text-sm text-[#1D2939]">{data?.description}</span>
            </div>
            <hr className="my-8" />
            <h2 className="mb-4 px-8 text-base text-[#1D2939] font-semibold">Notification Click Activity</h2>
            <div className="flex flex-col justify-between h-full px-8">
                <div className="flex border border-[#EAECF0] rounded-xl">
                    <table className="w-full h-auto bg-white rounded-xl">
                        <thead>
                            <tr>
                                <th className="text-left px-8 py-4 text-[#667085] font-medium text-sm">Name</th>
                                <th className="text-center px-8 py-4 text-[#667085] font-medium text-sm">User ID</th>
                                <th className="text-center px-8 py-4 text-[#667085] font-medium text-sm">Date</th>
                                <th className="text-center px-8 py-4 text-[#667085] font-medium text-sm">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {currentItems.map((quiz, index) => (
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
                                                >
                                                    Jenny Wilson
                                                </div>
                                                <div className="flex justify-start items-start text-[13px] text-[#667085]">jenny#8547</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-4 text-center text-[#101828] text-sm">{quiz.userId}</td>
                                    <td className="px-8 py-4 text-center text-[#101828] text-sm">{quiz.date}</td>
                                    <td className="px-8 py-4 text-center text-[#101828] text-sm">{quiz.time}</td>
                                </tr>
                            ))} */}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Section */}
                <div className="flex items-end justify-end h-auto">
                    <div className="flex justify-right h-auto">
                        {/* <PaginationSection
                            totalItems={data.length}
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        /> */}
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

export default NotificationName;