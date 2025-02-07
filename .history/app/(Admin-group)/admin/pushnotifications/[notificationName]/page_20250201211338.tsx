"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { doc, getDoc, collection, getDocs, onSnapshot } from 'firebase/firestore';
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
import EndDialog from "@/components/AdminComponents/QuizInfoDailogs/EndDailogue";
import PausedDialog from "@/components/AdminComponents/QuizInfoDailogs/PauseDailogue";
import Resume from "@/components/AdminComponents/QuizInfoDailogs/ResumeDailogue";

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
    premiumUsersClicks: { userId: string, clickedAt: string }[];
    freeUsersClicks: { userId: string, clickedAt: string }[];
}

type UserClickData = {
    userId: string;
    displayUserId: string;
    userName: string;
    userTag: string;
    profilePic: string;
    isPremium: boolean;
    clickedAt: string;
}

function NotificationName() {
    const searchParams = useSearchParams();
    const notiId = searchParams.get('nId');
    const [data, setData] = useState<NotificationData | null>(null);
    const [userClicksData, setUserClicksData] = useState<UserClickData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);
    const [isPausedDialogOpen, setIsPausedDialogOpen] = useState(false);
    const [isResumeOpen, setIsResumeOpen] = useState(false);
    const [isEndDialogOpen, setIsEndDialogOpen] = useState(false);

    useEffect(() => {
        if (!notiId) return;

        // Set up real-time listener for notification document
        const notiDocRef = doc(db, 'notifications', notiId);
        const unsubscribe = onSnapshot(notiDocRef, async (docSnapshot) => {
            try {
                if (docSnapshot.exists()) {
                    const notificationData = docSnapshot.data() as NotificationData;
                    setData(notificationData);

                    // Combine premium and free user clicks
                    const allClicks = [
                        ...notificationData.premiumUsersClicks.map(click => ({ ...click, isPremium: true })),
                        ...notificationData.freeUsersClicks.map(click => ({ ...click, isPremium: false }))
                    ];

                    // Fetch user details for each click
                    const userClicksWithDetails = await Promise.all(
                        allClicks.map(async (click) => {
                            const userDocRef = doc(db, 'users', click.userId);
                            const userDocSnap = await getDoc(userDocRef);

                            if (userDocSnap.exists()) {
                                const userData = userDocSnap.data();
                                return {
                                    userId: click.userId,
                                    displayUserId: userData.userId || 'Unknown ID',
                                    userName: userData.name || 'Unknown User',
                                    userTag: userData.userTag || `user#${click.userId.slice(0, 4)}`,
                                    profilePic: userData.profilePic || '/images/DP_Lion.svg',
                                    isPremium: click.isPremium,
                                    clickedAt: click.clickedAt
                                };
                            }
                            return null;
                        })
                    );

                    // Filter out null values and sort by clickedAt date
                    const validUserClicks = userClicksWithDetails
                        .filter((click): click is UserClickData => click !== null)
                        .sort((a, b) => new Date(b.clickedAt).getTime() - new Date(a.clickedAt).getTime());

                    setUserClicksData(validUserClicks);
                    setLoading(false);
                } else {
                    console.error('Notification data not found');
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [notiId]);

    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;
    const currentItems = userClicksData.slice(firstItemIndex, lastItemIndex);

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return {
            date: date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
            time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
        };
    };

    if (loading) {
        return <LoadingData />
    }

    return (
        <div className="py-8 flex flex-col w-full h-auto overflow-y-auto">
            <div className="flex flex-col px-8 gap-1">
                <div className="flex flex-row w-full justify-between items-center">
                    <div className="flex flex-row gap-2 items-center">
                        <Image
                            src={data?.notificationIcon || ''}
                            width={24}
                            height={24}
                            alt="idea-icon" />
                        <h1 className="text-[#1D2939] font-semibold text-2xl">{data?.name}</h1>
                        <div>{<QuizStatus status={data?.status || ''} />}</div>
                    </div>
                    <div className="flex flex-row gap-2 ">
                        {data?.status === 'live' && (
                            <button className=" p-3 gap-2 flex-row flex bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center"
                                onClick={() => setIsPausedDialogOpen(true)}>
                                <Image src="/icons/pausequiz.svg" width={18} height={18} alt="Paused-quiz" />
                                <span className="text-sm text-[#0C111D] font-normal">Pause</span>
                            </button>
                        )}
                        {data?.status === 'live' && (
                            <button className=" p-3 gap-2 flex-row flex bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] h-[40px] items-center"
                                onClick={() => setIsEndDialogOpen(true)}>
                                <Image src="/icons/endquiz.svg" width={18} height={18} alt="End-quiz" />
                                <span className="text-sm text-[#DE3024]  font-normal">End </span>
                            </button>
                        )}
                        {data?.status === 'paused' && (
                            <button
                                className=" p-3 gap-2 flex-row flex rounded-[8px] h-[40px] items-center"
                                onClick={() => setIsResumeOpen(true)}>
                                <Image src="/icons/resume.svg" width={18} height={18} alt="Resume Quiz" />
                                <span className="text-sm text-[#9012FF]  font-medium">Resume </span>
                            </button>
                        )}
                        {(data?.status === 'paused' || data?.status === 'scheduled') && (
                            <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7] bg-[#FFFFFF] border border-solid border-[#EAECF0] rounded-[8px] items-center">
                                <Image src="/icons/edit-icon.svg" width={18} height={18} alt="Edit" />
                                <span className="text-sm text-[#0C111D] font-normal">Edit</span>
                            </button>
                        )}
                        {(data?.status === 'finished' || data?.status === 'paused' || data?.status === 'scheduled') && (
                            <button className=" p-3 gap-2 flex-row flex h-[40px] hover:bg-[#F2F4F7]  items-center">
                                <Image src="/icons/delete.svg" width={18} height={18} alt="delete-quiz" />
                                <span className="text-sm text-[#DE3024] font-normal">Delete </span>
                            </button>
                        )}
                    </div>
                </div>
                {/* <div className="flex flex-row gap-2">
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
                </div> */}
                <span className="font-normal text-sm text-[#1D2939]">{data?.description}</span>
                <div className="w-full h-auto mt-4 flex flex-row gap-4 ">
                    <div className="w-full flex flex-col p-4 border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-xl">
                        <span className="text-[#667085] font-normal text-sm">Notification starts</span>
                        <span className="font-medium text-[#1D2939] text-base">[today]</span>
                    </div>
                    <div className="w-full flex flex-col p-4 border border-solid border-[#EAECF0] bg-[#FFFFFF] rounded-xl">
                        <span className="text-[#667085] font-normal text-sm">Notification ends</span>
                        <span className="font-medium text-[#1D2939] text-base">[tomorrow]</span>
                    </div>
                </div>
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
                            {currentItems.length > 0 ? (
                                currentItems.map((user, index) => {
                                    const dateTime = formatDateTime(user.clickedAt);
                                    return (
                                        <tr key={`${user.userId}-${index}`} className="h-auto border-t border-solid border-[#EAECF0]">
                                            <td className="py-2">
                                                <div className="flex flex-row ml-8 gap-2">
                                                    <div className="flex items-center">
                                                        <div className="relative">
                                                            <Image src={user.profilePic} alt="DP" width={40} height={40} />
                                                            {user.isPremium && (
                                                                <Image
                                                                    className="absolute right-0 bottom-0"
                                                                    src='/icons/winnerBatch.svg'
                                                                    alt="Premium Badge"
                                                                    width={18}
                                                                    height={18}
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start justify-center flex-col">
                                                        <div className="font-semibold cursor-pointer">
                                                            {user.userName}
                                                        </div>

                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-4 text-center text-[#101828] text-sm">{user.displayUserId}</td>
                                            <td className="px-8 py-4 text-center text-[#101828] text-sm">{dateTime.date}</td>
                                            <td className="px-8 py-4 text-center text-[#101828] text-sm">{dateTime.time}</td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr className='border-t border-lightGrey'>
                                    <td colSpan={4} className="text-center py-8">
                                        <p className="text-[#667085] text-sm">
                                            No notification click activity found
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>

                {/* Pagination Section */}

                {userClicksData.length > itemsPerPage && (
                    <div className="flex items-end justify-end h-auto">
                        <div className="flex justify-right h-auto">
                            <PaginationSection
                                totalItems={userClicksData.length}
                                itemsPerPage={itemsPerPage}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            />
                        </div>
                    </div>
                )}
            </div>

            {isEndDialogOpen && <EndDialog onClose={() => setIsEndDialogOpen(false)} fromContent="notifications" contentId={notiId || ''} />}
            {isPausedDialogOpen && <PausedDialog onClose={() => setIsPausedDialogOpen(false)} fromContent="notifications" contentId={notiId || ''} />}
            {isResumeOpen && < Resume open={isResumeOpen} onClose={() => setIsResumeOpen(false)} fromContent="notifications" contentId={notiId || ''} />}
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