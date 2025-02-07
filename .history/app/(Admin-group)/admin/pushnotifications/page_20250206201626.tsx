"use client";
import { useState, useEffect } from "react";
import React from 'react';
import Image from "next/image";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
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
import QuizStatus from '@/components/AdminComponents/StatusDisplay';
import { DatePicker } from "@nextui-org/react";
import { now, today, CalendarDate, getLocalTimeZone, parseDateTime } from "@internationalized/date";
import { db } from '@/firebase';
import { collection, getDocs, query, where, doc, getDoc, onSnapshot, deleteDoc, addDoc, setDoc } from 'firebase/firestore';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LoadingData from "@/components/Loading";
import EndDialog from "@/components/AdminComponents/QuizInfoDailogs/EndDailogue";
import PausedDialog from "@/components/AdminComponents/QuizInfoDailogs/PauseDailogue";
import ResumeQuiz from "@/components/AdminComponents/QuizInfoDailogs/ResumeDailogue";
// Define types for quiz data

interface NotificationData {
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
    usersClosedNotification: string[];
    premiumUsersClicks: { userId: string, clickedAt: string }[];
    freeUsersClicks: { userId: string, clickedAt: string }[];

}

type TruncatedTextProps = {
    text: string;
    maxLength: number;
};

const TruncatedText: React.FC<TruncatedTextProps> = ({ text, maxLength }) => {
    const truncatedText =
        text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

    return <span>{truncatedText}</span>;
};
function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}


const formatScheduleDate = (dateString: string | null): string => {
    if (!dateString) return "-"; // Return "-" if the date is null or undefined

    try {
        const dateObj = new Date(dateString);

        if (isNaN(dateObj.getTime())) {
            // If date is invalid
            return "-";
        }

        // Format the date manually to match "MM/DD/YYYY,HH:mm"
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const day = String(dateObj.getDate()).padStart(2, "0");
        const hours = String(dateObj.getHours()).padStart(2, "0");
        const minutes = String(dateObj.getMinutes()).padStart(2, "0");

        return `${month}/${day}/${year},${hours}:${minutes}`;
    } catch (error) {
        console.error("Error formatting date:", error);
        return "-";
    }
};

function Messenger() {
    const router = useRouter();
    const [data, setData] = useState<NotificationData[]>([]);
    const [notification, setNotification] = useState<NotificationData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const [notiIconPop, setNotiIconPop] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [name, setName] = useState('');
    const [notificationId, setNotificationId] = useState('');
    const [description, setDescription] = useState("");
    const [isScheduledDialogOpen, setIsScheduledDialogOpen] = useState(false);
    const [cta, setCta] = useState("");
    const [hyperLink, setHyperLink] = useState("");
    const [timer, setTimer] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [timerIcon, setTimerIcon] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [datapickerforEnd, setDatapickerforEnd] = useState(false);
    const [datapickerforStart, setDatapickerforStart] = useState(false);
    const [sectionScheduleDate, setSectionScheduleDate] = useState("");
    const [scrollBehavior, setScrollBehavior] = useState<"inside" | "outside">("outside");
    const isFormValid = name && description && cta && hyperLink && startDate && endDate;
    const isEditFormValid = name && description && cta && hyperLink;
    const isScheduleFormValid = startDate && endDate;
    // const [activePopover, setActivePopover] = useState<number | null>(null);
    const [remove, setRemove] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isPausedDialogOpen, setIsPausedDialogOpen] = useState(false);
    const [isResumeOpen, setIsResumeOpen] = useState(false);
    const [isEndDialogOpen, setIsEndDialogOpen] = useState(false);
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
    // Handler to open the dialog
    const handleCreate = () => {
        setIsOpen(true);
        setDatapickerforStart(false);
        setDatapickerforEnd(false);
    };

    // -------------------------------------------------------------------------------
    // State to track the selected icon
    const [notificationIcon, setNotificationIcon] = useState("/icons/idea-2.svg");

    // Function to handle icon selection
    const handleIconSelect = (iconPath: React.SetStateAction<string>) => {
        setNotificationIcon(iconPath); // Update the selected icon state
    };

    // -------------------------------------------------------------------------------
    const [selectedIconforimage, setSelectedIconforimage] = useState("/icons/annocement.png");

    // Function to handle icon selection
    const handleIconSelectforimage = (iconPath: React.SetStateAction<string>) => {
        setSelectedIconforimage(iconPath); // Update the selected icon state
    };
    // -------------------------------------------------------------------------------
    // State for Description words(0/100)
    const handleInputChange = (e: any) => {
        const inputText = e.target.value;
        if (inputText.length <= 100) {
            setDescription(inputText);
        }
    };
    // -------------------------------------------------------------------------------
    // State for Name words(0/100)
    const handleInputChangeforName = (e: any) => {
        const inputText = e.target.value;
        if (inputText.length <= 50) {
            setName(inputText);
        }
    };
    // -------------------------------------------------------------------------------
    // State for  words(0/100)
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

    const [totalPremiumClicks, setTotalPremiumClicks] = useState(0);
    const [totalFreeClicks, setTotalFreeClicks] = useState(0);

    useEffect(() => {
        const usersCollection = collection(db, 'notifications');
        const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
            const updatedNoti: NotificationData[] = snapshot.docs.map((doc) => {
                const userData = doc.data();
                return {
                    name: userData.name,
                    description: userData.description,
                    cta: userData.cta,
                    createdAt: userData.createdAt,
                    endDate: userData.endDate,
                    hyperLink: userData.hyperLink,
                    notificationIcon: userData.notificationIcon,
                    notificationId: userData.notificationId,
                    startDate: userData.startDate,
                    status: userData.status,
                    usersClosedNotification: userData.usersClosedNotification,
                    premiumUsersClicks: userData.premiumUsersClicks || [],
                    freeUsersClicks: userData.freeUsersClicks || [],
                } as NotificationData;
            });

            // Calculate total premium and free clicks
            const premiumClicks = updatedNoti.reduce((total, notification) => {
                return total + (notification.premiumUsersClicks?.length || 0);
            }, 0);

            const freeClicks = updatedNoti.reduce((total, notification) => {
                return total + (notification.freeUsersClicks?.length || 0);
            }, 0);

            setTotalPremiumClicks(premiumClicks);
            setTotalFreeClicks(freeClicks);
            setNotification(updatedNoti);
            setData(updatedNoti);
            setLoading(false);
        });

        // Cleanup listener on component unmount
        return () => unsubscribe();
    }, []);

    const checkNotificationOverlap = async () => {
        try {
            // Get all notifications
            const notificationsRef = collection(db, "notifications");
            const notificationsSnapshot = await getDocs(notificationsRef);
            const notifications = notificationsSnapshot.docs.map(doc => doc.data());

            const newStartDate = new Date(startDate);
            const newEndDate = new Date(endDate);
            const currentDate = new Date();

            // Check for live notifications
            const liveNotification = notifications.find(n => n.status === 'live');
            if (liveNotification) {
                // Check if new notification overlaps with live notification's date range
                const liveStartDate = new Date(liveNotification.startDate);
                const liveEndDate = new Date(liveNotification.endDate);

                if (newStartDate >= liveStartDate && newStartDate <= liveEndDate) {
                    toast.error("A notification is already live during this time period. Please select a different start time.");
                    return false;
                }
            }

            // Check for paused notifications
            const pausedNotification = notifications.find(n => n.status === 'paused');
            if (pausedNotification) {
                // Check if new notification overlaps with live notification's date range
                const liveStartDate = new Date(pausedNotification.startDate);
                const liveEndDate = new Date(pausedNotification.endDate);

                if (newStartDate >= liveStartDate && newStartDate <= liveEndDate) {
                    toast.error("A notification is currently paused and already available during this time period. Please resume or delete it before creating a new notification.");
                    return false;
                }
            }

            // Check for scheduling conflicts with other scheduled notifications
            const hasConflict = notifications.some(notification => {
                if (notification.status === 'scheduled') {
                    const existingStart = new Date(notification.startDate);
                    const existingEnd = new Date(notification.endDate);

                    // Check if new notification overlaps with existing scheduled notification
                    return (
                        (newStartDate >= existingStart && newStartDate <= existingEnd) ||
                        (newEndDate >= existingStart && newEndDate <= existingEnd) ||
                        (newStartDate <= existingStart && newEndDate >= existingEnd)
                    );
                }
                return false;
            });

            if (hasConflict) {
                toast.error("This time slot conflicts with another scheduled notification. Please choose different dates.");
                return false;
            }

            // Additional validation checks
            if (newStartDate >= newEndDate) {
                toast.error("End date must be after start date.");
                return false;
            }

            if (newStartDate < currentDate) {
                toast.error("Start date cannot be in the past.");
                return false;
            }

            return true;
        } catch (error) {
            console.error("Error checking notification overlap:", error);
            toast.error("Error validating notification schedule. Please try again.");
            return false;
        }
    };

    const updateNotificationSchedule = async () => {
        try {
            // Validate required dates
            if (!startDate || !endDate) {
                toast.error("Please select both start and end dates");
                return;
            }

            // Get the notification document to check its current dates
            const notificationRef = doc(db, "notifications", notificationId);
            const notificationDoc = await getDoc(notificationRef);

            if (!notificationDoc.exists()) {
                toast.error("Notification not found");
                return;
            }

            const currentData = notificationDoc.data();
            const oldStartDate = new Date(currentData.startDate);
            const oldEndDate = new Date(currentData.endDate);
            const newStartDate = new Date(startDate);
            const newEndDate = new Date(endDate);

            // Basic validation of dates
            if (newStartDate >= newEndDate) {
                toast.error("End date must be after start date");
                return;
            }

            // Only check for overlaps with other notifications if the new dates
            // are outside the current notification's time window
            if (!(newStartDate >= oldStartDate && newEndDate <= oldEndDate)) {
                const isValid = await checkNotificationOverlap();
                if (!isValid) {
                    return;
                }
            }

            // Update notification schedule in Firestore
            await setDoc(notificationRef, {
                startDate,
                endDate,
            }, { merge: true });

            toast.success("Notification schedule updated successfully!");
            setIsScheduledDialogOpen(false);
            // Reset form
            setStartDate('');
            setEndDate('');
            setNotificationId('');

        } catch (error) {
            console.error("Error updating notification schedule:", error);
            toast.error("Failed to update notification schedule. Please try again.");
        }
    };

    const handleSendNotification = async () => {
        try {
            // Validate form data
            if (!isFormValid) {
                toast.error("Please fill in all required fields.");
                return;
            }

            // Check for overlaps and conflicts
            const isValid = await checkNotificationOverlap();
            if (!isValid) {
                return;
            }

            // Get current date/time
            const currentDate = new Date();
            const startDateTime = new Date(startDate);

            // Determine status based on start date comparison
            const status = startDateTime <= currentDate ? 'live' : 'scheduled';

            // Add new notification to Firestore
            const docRef = await addDoc(collection(db, "notifications"), {
                name,
                description,
                cta,
                hyperLink,
                startDate,
                endDate,
                notificationIcon,
                status,
                createdAt: new Date().toISOString(),
                usersClosedNotification: [],
                premiumUsersClicks: [],
                freeUsersClicks: [],
            });

            // Update the document with the generated notificationId
            await setDoc(docRef, { notificationId: docRef.id }, { merge: true });

            toast.success("Notification Added Successfully!");
            setIsOpen(false);

            // Reset form
            setName('');
            setDescription('');
            setCta('');
            setHyperLink('');
            setStartDate('');
            setEndDate('');
            setNotificationIcon('/icons/idea-2.svg');

        } catch (error) {
            console.error("Error adding notification in Firestore:", error);
            toast.error("Failed to add notification. Please try again.");
        }
    };

    const updateNotification = async () => {
        try {
            // Validate required dates
            if (!isEditFormValid) {
                toast.error("Please fill in all required fields.");
                return;
            }

            // Get the notification document to check its current dates
            const notificationRef = doc(db, "notifications", notificationId);
            // Update notification schedule in Firestore
            await setDoc(notificationRef, {
                name,
                description,
                cta,
                hyperLink,
                startDate,
                endDate,
                notificationIcon,
            }, { merge: true });

            toast.success("Notification updated successfully!");
            setIsScheduledDialogOpen(false);
            // Reset form
            setName('');
            setDescription('');
            setCta('');
            setHyperLink('');
            setStartDate('');
            setEndDate('');
            setNotificationIcon('/icons/idea-2.svg');
            setNotificationId('');
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating notification :", error);
            toast.error("Failed to update notification. Please try again.");
        }
    };


    const handleRemoveNotification = async (notificationId: string) => {
        try {
            // Remove notification from Firestore
            await deleteDoc(doc(db, 'notifications', notificationId));
            toast.success("Notification removed successfully!");
            setRemove(false);
        } catch (error) {
            console.error("Error removing notification:", error);
            toast.error("Failed to remove notification. Please try again.");
        }
    };




    if (loading) {
        return <LoadingData />
    }
    // const handlePopoverOpen = (index: number) => {
    //     setActivePopover(index);
    // };

    return (
        <div className="flex flex-col h-full gap-3 w-full p-8 overflow-y-auto">
            <div className="flex flex-row justify-between h-[44px] items-center ">
                <h1 className="font-semibold text-lg text-[#1D2939]">Messenger</h1>
                <button
                    onClick={() => {
                        handleCreate();
                        setIsEditing(false);
                        setName('');
                        setDescription('');
                        setCta('');
                        setHyperLink('');
                        setStartDate('');
                        setEndDate('');
                        setNotificationIcon('/icons/idea-2.svg');
                        setNotificationId('');

                    }}
                    className="h-[44px] w-auto px-6 py-2 bg-[#8501FF] rounded-md shadow-inner-button border border-solid border-[#800EE2] flex items-center justify-center transition-colors duration-150 hover:bg-[#6D0DCC]"
                >
                    <span className="text-[#FFFFFF] font-semibold text-sm">Create Push Notification</span>
                </button>
            </div>

            <div className="w-full h-auto flex flex-row gap-1">
                <div className="w-full flex flex-col p-4 border border-solid border-[#EAECF0] bg-[#FFFFFF] justify-center rounded-xl h-[82px]">
                    <span className="text-[#667085] font-normal text-sm">All Clicks</span>
                    <span className="font-medium text-[#1D2939] text-base">{totalFreeClicks + totalPremiumClicks || 0}</span>
                </div>
                <div className="w-full flex flex-col p-4 border border-solid border-[#EAECF0] bg-[#FFFFFF] justify-center rounded-xl h-[82px]">
                    <span className="text-[#667085] font-normal text-sm">Premium User Clicks</span>
                    <span className="font-medium text-[#1D2939] text-base">{totalPremiumClicks || 0}</span>
                </div>
                <div className="w-full flex flex-col p-4 border border-solid border-[#EAECF0] bg-[#FFFFFF] justify-center rounded-xl h-[82px]">
                    <span className="text-[#667085] font-normal text-sm">Free User Clicks</span>
                    <span className="font-medium text-[#1D2939] text-base">{totalFreeClicks || 0}</span>
                </div>
            </div>

            <div className="flex flex-col justify-between h-full">
                <div className="flex border border-[#EAECF0] rounded-xl ">
                    <table className="w-full bg-white rounded-xl">
                        <thead>
                            <tr>
                                <th className="text-center w-14 px-2 pl-5 py-4 rounded-tl-xl text-[#667085] font-medium text-sm">
                                    Sr.No.
                                </th>
                                <th className="text-left w-1/3 px-8 py-4 pl-8 text-[#667085] font-medium text-sm">
                                    Notification
                                </th>
                                {/* <th className="text-center px-8 py-4 text-[#667085] font-medium text-sm">
                                    Created On
                                </th> */}
                                <th className="text-center px-8 py-4 text-[#667085] font-medium text-sm whitespace-nowrap">
                                    Scheduled On
                                </th>
                                <th className="text-center px-8 py-4 text-[#667085] font-medium text-sm whitespace-nowrap">
                                    End Date
                                </th>
                                <th className="text-center px-8 py-4 text-[#667085] font-medium text-sm">
                                    Clicked
                                </th>
                                <th className="text-left px-8 pl-[4.7%] pr-4 text-[#667085] font-medium text-sm">
                                    Status
                                </th>
                                <th className="text-center w-14 px-8 py-4 rounded-tr-xl text-[#667085] font-medium text-sm">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...currentItems]
                                .sort((a, b) => {
                                    // First sort by status (live first)
                                    if (a.status === 'live' && b.status !== 'live') return -1;
                                    if (a.status !== 'live' && b.status === 'live') return 1;
                                    // Then sort by createdAt date (most recent first)
                                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                                })
                                .map((noti, index) => (
                                    <tr key={index} className="border-t border-solid border-[#EAECF0] ">
                                        <td className="text-[#667085] text-center font-medium text-sm">
                                            {index + 1}
                                        </td>
                                        <td className="py-2">
                                            <div className="flex flex-row items-start ml-8 gap-2">
                                                <Image className='w-5 h-5' src={noti.notificationIcon} alt="idea" width={24} height={24} />
                                                <div className="flex items-start justify-start flex-col whitespace-nowrap">
                                                    <button
                                                        className="text-sm text-[#9012FF] font-semibold underline"
                                                        onClick={() => handleButtonClick(`/admin/pushnotifications/${noti.name.toLowerCase().replace(/\s+/g, '-')}?nId=${noti.notificationId}`)}
                                                    >
                                                        {"phodu notification"}
                                                    </button>
                                                    <p className="text-[0.813rem] text-[#667085] font-medium truncate">
                                                        <TruncatedText text={noti.description} maxLength={50} />
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        {/* <td className="px-8 py-4 text-center text-[#101828] text-sm whitespace-nowrap">{formatDate(noti.createdAt)}</td> */}
                                        <td className="px-8 py-4 text-center text-[#101828] text-sm whitespace-nowrap">{formatScheduleDate(noti.startDate)}</td>
                                        <td className="px-8 py-4 text-center text-[#101828] text-sm whitespace-nowrap">{formatScheduleDate(noti.endDate)}</td>
                                        <td className="px-8 py-4 text-center text-[#101828] text-sm">{noti.freeUsersClicks.length + noti.premiumUsersClicks.length || 0}</td>
                                        <td className="px-8 py-4 text-[#101828] text-sm">
                                            <span className='flex items-start justify-start ml-[25%] rounded-full'>
                                                <QuizStatus status={noti.status} />
                                            </span>
                                        </td>
                                        <td className="flex items-center justify-center px-8 py-4 text-[#101828] text-sm">
                                            <Popover placement="bottom-end"
                                                isOpen={!!openPopovers[index]}
                                                onOpenChange={() => closePopover(index)}>
                                                <PopoverTrigger>
                                                    <button className="w-[32px] h-[32px] outline-none  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]"
                                                        onClick={() => togglePopover(index)}>
                                                        <Image
                                                            src="/icons/three-dots.svg"
                                                            width={20}
                                                            height={20}
                                                            alt="More Actions"
                                                        />

                                                    </button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-[10.438rem] py-1 px-0 bg-white border border-lightGrey rounded-md">
                                                    <div className="w-full">
                                                        {(noti?.status === 'paused' || noti?.status === 'scheduled') && (
                                                            <button className="flex flex-row items-center justify-start w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7]"
                                                                onClick={() => {
                                                                    closePopover(index);
                                                                    setName(noti.name);
                                                                    setDescription(noti.description);
                                                                    setCta(noti.cta);
                                                                    setHyperLink(noti.hyperLink);
                                                                    setNotificationIcon(noti.notificationIcon || '/icons/idea-2.svg');
                                                                    setNotificationId(noti.notificationId);
                                                                    setIsEditing(true);
                                                                }}>

                                                                <Image src="/icons/edit-02.svg" width={18} height={18} alt="edit" />
                                                                <span className="text-sm text-[#0C111D] font-normal">Edit details</span>
                                                            </button>
                                                        )}
                                                        {(noti?.status === 'finished' || noti?.status === 'paused' || noti?.status === 'scheduled') && (
                                                            <button className=" flex flex-row items-center justify-start w-full px-4 py-[0.625rem] gap-2 hover:bg-[#FEE4E2]"
                                                                onClick={() => {
                                                                    setRemove(true);
                                                                    setNotificationId(noti.notificationId);
                                                                    closePopover(index);
                                                                }}
                                                            >
                                                                <Image src='/icons/delete.svg' alt="user profile" width={18} height={18} />
                                                                <p className="text-sm text-[#DE3024] font-normal">Remove</p>
                                                            </button>
                                                        )}
                                                        {noti?.status === 'live' && (
                                                            <button className="flex flex-row w-[10.438rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                onClick={() => { closePopover(index); setIsPausedDialogOpen(true); setNotificationId(noti.notificationId); }}>
                                                                <Image src='/icons/pause-dark.svg' alt="pause quiz" width={18} height={18} />
                                                                <p>Pause</p>
                                                            </button>
                                                        )}
                                                        {noti?.status === 'paused' && (
                                                            <button className="flex flex-row w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                onClick={() => { closePopover(index); setIsResumeOpen(true); setNotificationId(noti.notificationId); }} >
                                                                <Image src='/icons/play-dark.svg' alt="resume quiz" width={20} height={20} />
                                                                <p>Resume</p>
                                                            </button>
                                                        )}
                                                        {noti?.status === 'scheduled' && (
                                                            <button className="flex flex-row w-full px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                onClick={() => { closePopover(index); setIsScheduledDialogOpen(true); setNotificationId(noti.notificationId); setStartDate(noti.startDate); setEndDate(noti.endDate) }} >
                                                                <Image src='/icons/calendar-03.svg' alt="schedule" width={18} height={18} />
                                                                <p>Reschedule</p>
                                                            </button>
                                                        )}
                                                        {noti?.status === 'live' && (
                                                            <button className="flex flex-row w-[10.438rem] px-4 py-[0.625rem] gap-2 hover:bg-[#F2F4F7] transition-colors"
                                                                onClick={() => { closePopover(index); setIsEndDialogOpen(true); setNotificationId(noti.notificationId); }} >
                                                                <Image src='/icons/license-no.svg' alt="end quiz" width={18} height={18} />
                                                                <p className="text-[#DE3024]">End</p>
                                                            </button>
                                                        )}
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
            {/* Dialog for Create push Notification */}
            <Modal
                isOpen={isOpen}
                onOpenChange={(isOpen) => !isOpen && setIsOpen(false)}
                hideCloseButton
                scrollBehavior={scrollBehavior}
            >
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-row justify-between items-center gap-1">
                            <h3 className="text-lg font-bold text-[#1D2939]">Create Push Notification</h3>
                            <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                                <button onClick={() => setIsOpen(false)}>
                                    <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                                </button>
                            </button>
                        </ModalHeader>

                        <ModalBody>
                            <div className="flex flex-col w-full gap-1 ">
                                <label className="text-[#1D2939] text-sm font-medium">Name</label>
                                <div className="flex flex-row p-2 w-full gap-2 border border-gray-300  h-10 focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB] rounded-md ">
                                    {/* <Popover placement="bottom" isOpen={notiIconPop}> */}
                                    <Popover placement="bottom" onOpenChange={(open) => setNotiIconPop(open)} isOpen={notiIconPop}>
                                        <PopoverTrigger>
                                            <button className="flex flex-row w-[44px] items-center rounded-md transition duration-200 ease-in-out justify-between focus:outline-none"
                                            // onClick={() => setNotiIconPop(true)}>
                                            >
                                                <Image
                                                    src={notificationIcon}
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
                                        <PopoverContent className="flex flex-col gap-1 px-0 w-12 rounded-md">
                                            {/* Idea Button */}
                                            <button
                                                className="flex flex-row w-full p-1 hover:bg-[#F2F4F7] justify-center items-center outline-none"
                                                onClick={() => { handleIconSelect("/icons/idea-2.svg"); setNotiIconPop(false); }}
                                            // onClick={() => { handleIconSelect("/icons/idea-2.svg") }}
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
                                                className="flex flex-row w-full p-1 hover:bg-[#F2F4F7] justify-center items-center outline-none"
                                                onClick={() => { handleIconSelect("/icons/megaphone.svg"); setNotiIconPop(false); }}
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
                                                className="flex flex-row w-full p-1 hover:bg-[#F2F4F7] justify-center items-center outline-none"
                                                onClick={() => { handleIconSelect("/icons/read-2.svg"); setNotiIconPop(false); }}
                                            >
                                                <Image
                                                    src="/icons/read-2.svg"
                                                    width={24}
                                                    height={24}
                                                    alt="Read Button"
                                                />
                                            </button>
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
                                    className="w-full py-2 px-4 text-sm font-medium text-[#1D2939] border border-gray-300  h-10 focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB] rounded-md"
                                    type="text"
                                    placeholder="Notification Content"
                                    value={description}
                                    onChange={handleInputChange}
                                />
                                <span className="text-[#475467] font-normal text-right text-sm">{description.length}/100</span>
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <label className="text-[#1D2939] text-sm font-medium">CTA</label>
                                <input
                                    className="w-full py-2 px-4 text-sm font-medium text-[#1D2939] border border-gray-300  h-10 focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB] rounded-md"
                                    type="text"
                                    placeholder="Button Name"
                                    value={cta}
                                    onChange={handleInputChangeforCta}
                                />
                                <span className="text-[#475467] font-normal text-right text-sm">{cta.length}/30</span>
                            </div>
                            <div className="flex flex-col gap-1 w-full ">
                                <label className="text-[#1D2939] text-sm font-medium">Hyperlink</label>
                                <input
                                    className="w-full py-2 px-4 text-sm font-medium text-[#1D2939] border border-gray-300  h-10 focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB] rounded-md"
                                    type="text"
                                    placeholder="Add hyperlink"
                                    onChange={(e) => setHyperLink(e.target.value)} // Controlled input for quiz name
                                />
                            </div>
                            <hr className="my-3" />
                            <h1 className="text-[#1D2939] font-semibold text-lg mb-2">Schedule notification</h1>
                            <div className="flex flex-col gap-4">
                                <div className='flex flex-col w-full gap-1'>
                                    <span className='font-medium text-[#1D2939] text-sm'>Start Date & Time</span>
                                    {/* <div className="flex flex-row justify-between items-center mb-3">
                                        <p className="text-[#1D2939] text-sm font-medium">  {formatScheduleDate(startDate) || " "}</p>
                                        <button
                                            className="flex flex-row gap-1 rounded-md border-[2px] border-solid border-[#9012FF] hover:bg-[#F5F0FF] bg-[#FFFFFF] p-2 "
                                            onClick={() => setDatapickerforStart(!datapickerforStart)}>
                                            <span className="text-[#9012FF] font-semibold text-sm">{isEditing ? 'Change Date' : 'Select Date'}</span>
                                        </button>
                                    </div> */}
                                    <DatePicker
                                        granularity="minute"
                                        minValue={today(getLocalTimeZone())}
                                        value={startDate ? parseDateTime(startDate) : undefined}
                                        hideTimeZone
                                        onChange={(date) => {
                                            const dateString = date ? date.toString() : "";
                                            setStartDate(dateString);

                                        }}

                                    />

                                </div>
                                <div className='flex flex-col w-full gap-1'>
                                    <span className='font-medium text-[#1D2939] text-sm'>End Date & Time</span>

                                    {/* <div className="flex flex-row justify-between items-center mb-3">
                                        <p className="text-[#1D2939] text-sm font-medium">  {formatScheduleDate(endDate) || " "}</p>
                                        <button
                                            className="flex flex-row gap-1 rounded-md border-[2px] border-solid border-[#9012FF] hover:bg-[#F5F0FF] bg-[#FFFFFF] p-2 "
                                            onClick={() => setDatapickerforEnd(!datapickerforEnd)}>
                                            <span className="text-[#9012FF] font-semibold text-sm">{isEditing ? 'Change Date' : 'Select Date'}</span>
                                        </button>
                                    </div> */}

                                    <DatePicker
                                        granularity="minute"
                                        minValue={today(getLocalTimeZone())}
                                        value={endDate ? parseDateTime(endDate) : undefined}
                                        hideTimeZone
                                        onChange={(date) => {
                                            const dateString = date ? date.toString() : "";
                                            setEndDate(dateString);

                                        }}

                                    />


                                </div>
                            </div>
                        </ModalBody>

                        <ModalFooter className='border-t border-lightGrey'>
                            <Button
                                variant="light"
                                onClick={() => setIsOpen(false)}
                                className="py-2 px-6 border rounded-md text-[#1D2939] font-semibold text-sm hover:bg-[#F2F4F7]">
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSendNotification}
                                disabled={!isFormValid}
                                className={`py-2 px-6 ${!isFormValid ? 'bg-[#CDA0FC] border-[#CCA6F2]' : 'bg-[#9012FF] border-[#800EE2] transition-colors duration-150 hover:bg-[#6D0DCC]'} text-white shadow-inner-button border rounded-md font-semibold text-sm`}>
                                Send Notification
                            </Button>
                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal>

            {/* Dialog for Edit push Notification */}
            <Modal
                isOpen={isEditing}
                onOpenChange={(isEditing) => !isEditing && setIsEditing(false)}
                hideCloseButton
                scrollBehavior={scrollBehavior}
            >
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-row justify-between items-center gap-1">
                            <h3 className="text-lg font-bold text-[#1D2939]">Edit Push Notification</h3>
                            <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]">
                                <button onClick={() => setIsEditing(false)}>
                                    <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                                </button>
                            </button>
                        </ModalHeader>

                        <ModalBody>
                            <div className="flex flex-col w-full gap-1 ">
                                <label className="text-[#1D2939] text-sm font-medium">Name</label>
                                <div className="flex flex-row p-2 w-full gap-2 border border-gray-300  h-10 focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB] rounded-md ">
                                    {/* <Popover placement="bottom" isOpen={notiIconPop}> */}
                                    <Popover placement="bottom" onOpenChange={(open) => setNotiIconPop(open)} isOpen={notiIconPop}>
                                        <PopoverTrigger>
                                            <button className="flex flex-row w-[44px] items-center rounded-md transition duration-200 ease-in-out justify-between focus:outline-none"
                                            // onClick={() => setNotiIconPop(true)}>
                                            >
                                                <Image
                                                    src={notificationIcon}
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
                                        <PopoverContent className="flex flex-col gap-1 px-0 w-12 rounded-md">
                                            {/* Idea Button */}
                                            <button
                                                className="flex flex-row w-full p-1 hover:bg-[#F2F4F7] justify-center items-center outline-none"
                                                onClick={() => { handleIconSelect("/icons/idea-2.svg"); setNotiIconPop(false); }}
                                            // onClick={() => { handleIconSelect("/icons/idea-2.svg") }}
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
                                                className="flex flex-row w-full p-1 hover:bg-[#F2F4F7] justify-center items-center outline-none"
                                                onClick={() => { handleIconSelect("/icons/megaphone.svg"); setNotiIconPop(false); }}
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
                                                className="flex flex-row w-full p-1 hover:bg-[#F2F4F7] justify-center items-center outline-none"
                                                onClick={() => { handleIconSelect("/icons/read-2.svg"); setNotiIconPop(false); }}
                                            >
                                                <Image
                                                    src="/icons/read-2.svg"
                                                    width={24}
                                                    height={24}
                                                    alt="Read Button"
                                                />
                                            </button>
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
                                    className="w-full py-2 px-4 text-sm font-medium text-[#1D2939] border border-gray-300  h-10 focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB] rounded-md"
                                    type="text"
                                    placeholder="Notification Content"
                                    value={description}
                                    onChange={handleInputChange}
                                />
                                <span className="text-[#475467] font-normal text-right text-sm">{description.length}/100</span>
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <label className="text-[#1D2939] text-sm font-medium">CTA</label>
                                <input
                                    className="w-full py-2 px-4 text-sm font-medium text-[#1D2939] border border-gray-300  h-10 focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB] rounded-md"
                                    type="text"
                                    placeholder="Button Name"
                                    value={cta}
                                    onChange={handleInputChangeforCta}
                                />
                                <span className="text-[#475467] font-normal text-right text-sm">{cta.length}/30</span>
                            </div>
                            <div className="flex flex-col gap-1 w-full ">
                                <label className="text-[#1D2939] text-sm font-medium">Hyperlink</label>
                                <input
                                    className="w-full py-2 px-4 text-sm font-medium text-[#1D2939] border border-gray-300  h-10 focus:outline focus:outline-[1.5px] focus:outline-[#D6BBFB] hover:outline hover:outline-[1.5px] hover:outline-[#D6BBFB] rounded-md"
                                    type="text"
                                    placeholder="Add hyperlink"
                                    onChange={(e) => setHyperLink(e.target.value)} // Controlled input for quiz name
                                />
                            </div>
                            <hr className="my-3" />

                        </ModalBody>

                        <ModalFooter className='border-t border-lightGrey'>
                            <Button
                                variant="light"
                                onClick={() => setIsEditing(false)}
                                className="py-2 px-6 border rounded-md text-[#1D2939] font-semibold text-sm hover:bg-[#F2F4F7]">
                                Cancel
                            </Button>
                            <Button
                                onClick={updateNotification}
                                disabled={!isEditFormValid}
                                className={`py-2 px-6 ${!isEditFormValid ? 'bg-[#CDA0FC] border-[#CCA6F2]' : 'bg-[#9012FF] border-[#800EE2] transition-colors duration-150 hover:bg-[#6D0DCC]'} text-white shadow-inner-button border rounded-md font-semibold text-sm`}>
                                Save Changes
                            </Button>
                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal>
            {/* Dialog for Remove */}
            <Modal
                isOpen={remove}
                onOpenChange={(isOpen) => !isOpen && setRemove(false)}
                hideCloseButton
            >
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-row justify-between items-center gap-1">
                            <h3 className=" font-bold task-[#1D2939]">Delete notification</h3>
                            <button className="w-[32px] h-[32px]  rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7] ">
                                <button className="" onClick={() => setRemove(false)}>
                                    <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                                </button>
                            </button>
                        </ModalHeader>

                        <ModalBody>
                            <p className=" text-sm font-normal pb-2 text-[#667085]">Once the notification is deleted you cannot restore it again.</p>
                        </ModalBody>

                        <ModalFooter className='border-t border-lightGrey'>
                            <Button variant="light" className="py-[0.625rem] px-6 border-[1.5px] border-lightGrey font-semibold text-sm text-[#1D2939] rounded-md hover:bg-[#F2F4F7]" onClick={() => setRemove(false)}>Cancel</Button>
                            <Button className={`py-[0.625rem] px-6 text-white shadow-inner-button hover:bg-[#B0201A] font-semibold bg-[#BB241A] border border-white rounded-md`} onClick={() => handleRemoveNotification(notificationId)}>Delete</Button>
                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal>
            <ToastContainer />
            {isEndDialogOpen && <EndDialog onClose={() => setIsEndDialogOpen(false)} fromContent="notifications" contentId={notificationId || ''} />}
            {isPausedDialogOpen && <PausedDialog onClose={() => setIsPausedDialogOpen(false)} fromContent="notifications" contentId={notificationId || ''} />}
            {isResumeOpen && < ResumeQuiz open={isResumeOpen} onClose={() => setIsResumeOpen(false)} fromContent="notifications" contentId={notificationId || ''} />}

            <Modal
                isOpen={isScheduledDialogOpen}
                onClose={() => setIsScheduledDialogOpen(false)}
                size="2xl"
                hideCloseButton
                classNames={{
                    base: "max-w-2xl mx-auto",
                    header: "border-b border-[#E5E7EB] pb-4",
                    body: "py-6",
                    footer: "border-t border-[#E5E7EB] pt-4"
                }}
            >
                <ModalContent>
                    <>
                        <ModalHeader className="flex justify-between items-center">
                            <h3 className="text-xl font-semibold text-[#1D2939]">
                                Schedule notification
                            </h3>
                            <button
                                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#F2F4F7] transition-all duration-300"
                                onClick={() => setIsScheduledDialogOpen(false)}
                            >
                                <Image src="/icons/cancel.svg" alt="Cancel" width={20} height={20} />
                            </button>
                        </ModalHeader>

                        <ModalBody>
                            <div className="space-y-6">

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <span className="font-medium text-[#1D2939] text-sm">Start Date & Time</span>
                                        <DatePicker
                                            granularity="minute"
                                            minValue={today(getLocalTimeZone())}
                                            value={startDate ? parseDateTime(startDate) : undefined}
                                            hideTimeZone
                                            onChange={(date) => {
                                                const dateString = date ? date.toString() : "";
                                                setStartDate(dateString);
                                            }}
                                        />

                                    </div>

                                    <div className="space-y-2">
                                        <span className="font-medium text-[#1D2939] text-sm">End Date & Time</span>
                                        <DatePicker
                                            granularity="minute"
                                            minValue={today(getLocalTimeZone())}
                                            value={endDate ? parseDateTime(endDate) : undefined}
                                            hideTimeZone
                                            onChange={(date) => {
                                                const dateString = date ? date.toString() : "";
                                                setEndDate(dateString);
                                            }}
                                        />

                                    </div>
                                </div>
                            </div>
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                variant="light"
                                className="px-6 py-2.5 border border-[#E5E7EB] text-[#1D2939] hover:bg-[#F2F4F7] font-semibold text-sm rounded-md"
                                onClick={() => setIsScheduledDialogOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                className={`px-6 py-2.5 rounded-md text-white font-medium ${!isScheduleFormValid ? 'bg-[#CDA0FC]' : 'bg-[#9012FF] hover:bg-[#6D0DCC]'
                                    } transition-colors`}
                                onClick={() => updateNotificationSchedule()}
                                disabled={!isScheduleFormValid}
                            >
                                Schedule notification
                            </Button>
                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal>
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
        <Pagination className="mt-4 justify-end pb-4">
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
