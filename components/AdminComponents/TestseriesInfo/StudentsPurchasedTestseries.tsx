"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { Calendar } from "@nextui-org/calendar";
import { today, getLocalTimeZone } from "@internationalized/date";
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
import { collection, deleteDoc, doc, Firestore, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "@/firebase";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { toast } from "react-toastify";
import LoadingData from "@/components/Loading";

// Define types for StudentAttempts data
interface StudentAttempts {
    enrollmentDate: string;
    enrollmentType: string;
    userId: string;
    name: string;
    profilePic: string;
    isPremium: boolean;
    displayUserId: string;
    studentProgress: number;
}

interface StudentsAttemptsProps {
    testId: string;
}

// Function to format date string to "Jan 6, 2024" format
function formatDateString(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}

function StudentsPurchasedTestseries({ testId }: StudentsAttemptsProps) {
    const [data, setData] = useState<StudentAttempts[]>([]);
    const [studentAttempts, setStudentAttempts] = useState<StudentAttempts[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();
    const [popoveropen, setPopoveropen] = useState(false);
    const [isSelcetDateOpen, setIsSelectDateOpen] = useState(false);
    const [dateFilter, setDateFilter] = useState(null);
    const [statusFilter, setStatusFilter] = useState(null);
    const isTextSearch = searchTerm.trim().length > 0 && !dateFilter && !statusFilter;
    const [popoveropen2, setPopoveropen2] = useState<number | null>(null);
    const [popoveropen1, setPopoveropen1] = useState(false);
    // Fetch StudentAttempts when component mounts
    // Fetch StudentAttempts when component mounts
    useEffect(() => {
        const loadStudentsAttempts = async () => {
            setLoading(true);
            try {
                const attemptsRef = collection(db, 'testseries', testId, 'StudentsPurchased');
                const attemptsSnapshot = await getDocs(attemptsRef);

                // Group all user IDs to fetch them in a single batch
                const userIds = new Set(attemptsSnapshot.docs.map(doc => doc.data().userId));

                // Fetch all user data in a single batch
                const userDocs = await getDocs(query(collection(db, 'users'), where('__name__', 'in', Array.from(userIds))));

                // Create a map of user data for quick lookup
                const userDataMap = new Map();
                userDocs.forEach(doc => {
                    userDataMap.set(doc.id, doc.data());
                });

                // Initialize a map to store user progress
                const userProgressMap = new Map();

                // Calculate progress for each user
                for (const doc of attemptsSnapshot.docs) {
                    const userId = doc.data().userId;
                    let sectionsWithQuestionsCount = 0;
                    let sectionsWithAttemptsCount = 0;

                    // Function to count sections and attempts
                    const countSectionsWithQuestionsAndAttempts = async (path: string) => {
                        const sectionCollection = collection(db, path);
                        const sectionSnapshot = await getDocs(sectionCollection);

                        for (const sectionDoc of sectionSnapshot.docs) {
                            const sectionData = sectionDoc.data();

                            // Count sections with questions or umbrella tests
                            if ((sectionData.hasQuestions === true && !sectionData.isParentUmbrellaTest) ||
                                (sectionData.isUmbrellaTest === true && !sectionData.isParentUmbrellaTest)) {
                                sectionsWithQuestionsCount += 1;

                                // Check attempts for this user
                                const attemptsCollection = collection(sectionDoc.ref, 'attempts');
                                const attemptsSnapshot = await getDocs(query(
                                    attemptsCollection,
                                    where('userId', '==', userId)
                                ));

                                if (attemptsSnapshot.docs.length > 0) {
                                    sectionsWithAttemptsCount += 1;
                                }
                            }

                            // Check subsections
                            await countSectionsWithQuestionsAndAttempts(`${path}/${sectionDoc.id}/sections`);
                        }
                    };

                    // Calculate progress for this user
                    await countSectionsWithQuestionsAndAttempts(`testseries/${testId}/sections`);
                    const progress = sectionsWithQuestionsCount > 0
                        ? Math.round((sectionsWithAttemptsCount / sectionsWithQuestionsCount) * 100)
                        : 0;

                    userProgressMap.set(userId, progress);
                }

                // Process attempts data with user info
                const attemptsData = attemptsSnapshot.docs.map(doc => {
                    const attemptData = doc.data();
                    const userData = userDataMap.get(attemptData.userId) || {};

                    return {
                        userId: attemptData.userId,
                        name: userData.name || 'Unknown',
                        profilePic: userData.profilePic || '',
                        isPremium: userData.isPremium || false,
                        displayUserId: userData.userId || '',
                        enrollmentDate: attemptData.enrollmentDate || '',
                        enrollmentType: attemptData.enrollmentType || '',
                        studentProgress: userProgressMap.get(attemptData.userId) || 0
                    };
                });

                // // Sort by score and assign rankings
                // attemptsData.sort((a, b) => b.score - a.score);
                // attemptsData.forEach((attempt, index) => {
                //     attempt.ranking = index + 1;
                // });

                setStudentAttempts(attemptsData);
                setData(attemptsData);
            } catch (error) {
                console.error('Error fetching attempts:', error);
            } finally {
                setLoading(false);
            }
        };

        loadStudentsAttempts();
    }, [testId]);

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
    const [userToRemove, setUserToRemove] = useState('');

    const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Store selected date as Date object

    const [enrollmentFilter, setEnrollmentFilter] = useState<string | null>(null);
    const [sortConfig, setSortConfig] = useState<{
        key: string;
        direction: 'asc' | 'desc' | null;
    }>({
        key: '',
        direction: null
    });


    const handleRemoveUser = useCallback(async (userId: string) => {
        try {
            const attemptRef = doc(db, 'testseries', testId, 'StudentsPurchased', userId);
            const transactionRef = doc(db, 'users', userId, 'transactions', testId);
            await deleteDoc(attemptRef);
            await deleteDoc(transactionRef);
            // Update local state to remove the user
            setStudentAttempts(prev => prev.filter(student => student.userId !== userId));
            setData(prev => prev.filter(student => student.userId !== userId));

            // Close the remove dialog
            closeRemove();
        } catch (error) {
            console.error('Error removing user attempt:', error);
        }
    }, [testId, closeRemove]);

    const handleAddUser = async (userId: string) => {
        try {
            // Query the users collection for the document with matching userId
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('userId', '==', userId));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                console.error('User not found');
                return;
            }

            // Get the first matching document
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
            // const uniqueId = userData.uniqueId;

            // Add the user to the StudentsPurchased subcollection
            const studentRef = doc(db, 'testseries', testId, 'StudentsPurchased', userDoc.id);
            await setDoc(studentRef, {
                userId: userDoc.id,
                enrollmentDate: new Date().toISOString(),
                enrollmentType: 'free',
                // uniqueId: uniqueId
            });
            const transactionRef = doc(db, 'users', userDoc.id, 'transactions', testId);
            await setDoc(transactionRef, {
                contentId: testId,
                contentType: "testseries",
                dateOfPurchase: new Date().toISOString(),
                paymentType: 'free',
            });
            // Update local state
            setStudentAttempts(prev => [...prev, {
                userId: userDoc.id,
                name: userData.name || 'Unknown',
                profilePic: userData.profilePic || '',
                isPremium: userData.isPremium || false,
                displayUserId: userData.userId || '',
                enrollmentDate: new Date().toISOString(),
                enrollmentType: 'free',
                studentProgress: 0
            }]);

            setPopoveropen(false);
            setUniqueId('');
            toast.success('User added successfully');
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const handleClear = () => {
        setSortConfig({ key: '', direction: null }); // Reset sorting
        setSearchTerm(''); // Clear search term
        setSelectedDate(null); // Clear selected date
        setEnrollmentFilter(null); // Clear enrollment filter
        setData(studentAttempts); // Reset table data to the original list
        setCurrentPage(1); // Reset to the first page
    };

    useEffect(() => {
        let filterStudentsAttempts = studentAttempts;

        // Filter by search term
        if (searchTerm) {
            filterStudentsAttempts = filterStudentsAttempts.filter(student =>
                student.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (enrollmentFilter) {
            filterStudentsAttempts = filterStudentsAttempts.filter(student =>
                student.enrollmentType === enrollmentFilter
            );
        }

        // Filter by selected date
        if (selectedDate) {
            filterStudentsAttempts = filterStudentsAttempts.filter(student => {
                const studentDate = new Date(student.enrollmentDate);
                return studentDate.toDateString() === selectedDate.toDateString();
            });
        }

        // Sort by studentsAttemptsPublishedDate in ascending order (earliest date first)
        filterStudentsAttempts = filterStudentsAttempts.sort((a, b) => {
            // Parse dates for both enrolled and expiry dates
            const dateA = new Date(a.enrollmentDate).getTime();
            const dateB = new Date(b.enrollmentDate).getTime();

            // Handle invalid date values
            if (isNaN(dateA) || isNaN(dateB)) {
                console.error("Invalid date value", a.enrollmentDate, b.enrollmentDate);
                return 0;
            }

            // Primary sort by enrolled date
            return dateA - dateB;
        });

        // if (sortConfig.key && sortConfig.direction) {
        //     filterStudentsAttempts = filterStudentsAttempts.sort((a, b) => {
        //         if (sortConfig.key === 'progress') {
        //             return sortConfig.direction === 'asc'
        //                 ? a.progress - b.progress
        //                 : b.progress - a.progress;
        //         } else if (sortConfig.key === 'enrolledDate' || sortConfig.key === 'expiryDate') {
        //             const dateA = new Date(a[sortConfig.key]).getTime();
        //             const dateB = new Date(b[sortConfig.key]).getTime();
        //             return sortConfig.direction === 'asc'
        //                 ? dateA - dateB
        //                 : dateB - dateA;
        //         }
        //         return 0;
        //     });
        // }

        // Update state with filtered and sorted StudentsAttempts
        setData(filterStudentsAttempts);
        setCurrentPage(1); // Reset to first page when filters change
    }, [enrollmentFilter, searchTerm, studentAttempts, selectedDate, sortConfig]);

    // const handleSort = (key: string) => {
    //     if (key === 'progress') {  // Added 'timeTaken'
    //         setSortConfig((prevConfig) => {
    //             // Cycle through: no sort -> asc -> desc -> no sort
    //             if (prevConfig.key !== key || !prevConfig.direction) {
    //                 return { key, direction: 'asc' };
    //             } else if (prevConfig.direction === 'asc') {
    //                 return { key, direction: 'desc' };
    //             } else {
    //                 return { key: '', direction: null }; // Reset to original order
    //             }
    //         });
    //     }
    // };
    const handleSort = (key: string) => {
        setSortConfig((prevConfig) => {
            // Cycle through: no sort -> asc -> desc -> no sort
            if (prevConfig.key !== key || !prevConfig.direction) {
                return { key, direction: 'asc' };
            } else if (prevConfig.direction === 'asc') {
                return { key, direction: 'desc' };
            } else {
                return { key: '', direction: null }; // Reset to original order
            }
        });
    };

    // Format selected date as 'Nov 9, 2024'
    const formattedDate = selectedDate
        ? selectedDate.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' })
        : "Select dates";

    // Check if all fields are filled
    const isAddButtonDisabled = !uniqueId;

    const handlePopoverOpen = (index: number) => {
        setPopoveropen2(index);
    };

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === "Enter" && isRemoveOpen) {
                handleRemoveUser(userToRemove);
                setIsRemoveOpen(false);
            }
            // Add Escape key handler for closing modal
            if (event.key === "Escape" && isRemoveOpen) {
                setIsRemoveOpen(false);
            }
        };

        if (isRemoveOpen) {
            document.addEventListener("keydown", handleKeyPress);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [isRemoveOpen, userToRemove, handleRemoveUser]);

    if (loading) {
        return <LoadingData />
    }

    return (
        <div className="flex flex-col w-full pt-4 gap-4">
            <div className="flex flex-row justify-between items-center">
                <button className="h-[44px] w-[250px] rounded-md bg-[#FFFFFF] shadow-sm border border-solid border-[#D0D5DD] flex items-center">
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
                <div className="flex flex-row gap-3">
                    {/* Select Date Button */}
                    <Popover placement="bottom" isOpen={isSelcetDateOpen} onOpenChange={(open) => setIsSelectDateOpen(open)}>
                        <PopoverTrigger>
                            <button className="h-[44px] w-[143px] rounded-md bg-[#FFFFFF] border border-solid border-[#D0D5DD] outline-none flex items-center p-3">
                                <Image
                                    src="/icons/select-Date.svg"
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
                                onChange={(value) => {
                                    const date = new Date(value.year, value.month - 1, value.day); // Adjust for zero-based month index
                                    setSelectedDate(date); // Update state with the new Date object
                                    setIsSelectDateOpen(false);
                                }}
                            />

                            {/* Conditionally render the "Clear" button */}
                            {selectedDate && (
                                <button
                                    className="min-w-[84px] min-h-[30px] rounded-md bg-[#9012FF] border border-[#800EE2] shadow-inner-button text-[14px] font-medium text-white mb-2 transition-colors duration-150 hover:bg-[#6D0DCC]"
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

                    <Popover
                        placement="bottom"
                        isOpen={popoveropen1}
                        onOpenChange={(open) => setPopoveropen1(open)}
                    >
                        <PopoverTrigger>
                            <button className="h-[44px] w-[105px] rounded-md bg-[#FFFFFF] border border-solid border-[#D0D5DD] flex items-center justify-center gap-2 outline-none">
                                <span className="font-medium text-sm text-[#667085] ml-2">
                                    {enrollmentFilter ? enrollmentFilter.charAt(0).toUpperCase() + enrollmentFilter.slice(1) : "Sort By"}
                                </span>
                                <Image
                                    src="/icons/chevron-down-dark-1.svg"
                                    width={20}
                                    height={20}
                                    alt="arrow-down-dark-1"
                                />
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="flex flex-col w-28 h-auto px-0 py-1 bg-white border border-lightGrey rounded-md">
                            <div
                                className="flex flex-row items-center w-full my-0 py-[0.625rem] px-4 gap-2 cursor-pointer transition-colors hover:bg-[#F2F4F7]"
                                onClick={() => {
                                    setEnrollmentFilter('free');
                                    setSortConfig({ key: '', direction: null });
                                    setPopoveropen1(false); // Explicitly close the popover
                                }}
                            >
                                <p className={`text-sm ${enrollmentFilter === 'free' ? 'font-medium text-purple' : 'font-normal text-[#0C111D]'}`}>
                                    Free
                                </p>
                                {enrollmentFilter === 'free' && (
                                    <Image src="/icons/check.svg" width={16} height={16} alt="Selected" />
                                )}
                            </div>
                            <div
                                className="flex flex-row items-center w-full my-0 py-[0.625rem] px-4 gap-2 cursor-pointer transition-colors hover:bg-[#F2F4F7]"
                                onClick={() => {
                                    setEnrollmentFilter('paid');
                                    setSortConfig({ key: '', direction: null });
                                    setPopoveropen1(false); // Explicitly close the popover
                                }}
                            >
                                <p className={`text-sm ${enrollmentFilter === 'paid' ? 'font-medium text-purple' : 'font-normal text-[#0C111D]'}`}>
                                    Paid
                                </p>
                                {enrollmentFilter === 'paid' && (
                                    <Image src="/icons/check.svg" width={16} height={16} alt="Selected" />
                                )}
                            </div>
                            {enrollmentFilter && (
                                <div
                                    className="flex flex-row items-center w-full my-0 py-[0.625rem] px-4 gap-2 cursor-pointer transition-colors hover:bg-[#F2F4F7] border-t border-lightGrey"
                                    onClick={() => {
                                        handleClear();
                                        setPopoveropen1(false); // Explicitly close the popover
                                    }}
                                >
                                    <p className="text-sm font-normal text-[#0C111D]">Clear</p>
                                </div>
                            )}
                        </PopoverContent>
                    </Popover>

                    <Popover placement="bottom-end"
                        isOpen={popoveropen}
                        onOpenChange={() => setPopoveropen(!popoveropen)} >
                        <PopoverTrigger>
                            <button className="flex flex-row items-center py-[0.625rem] px-6 gap-1 bg-purple border border-[#800EE2] rounded-md shadow-inner-button outline-none">
                                <Image src='/icons/plus-sign-white.svg' alt="add" width={18} height={18} />
                                <p className="text-sm text-white font-semibold">Add User</p>
                            </button>
                        </PopoverTrigger>
                        <PopoverContent className="flex flex-col w-[304px] h-auto p-6 gap-4 bg-white border border-lightGrey rounded-xl">
                            <div className="flex flex-col gap-2 w-full">
                                <div className="flex flex-col items-start gap-2">
                                    <p>Unique ID</p>
                                    <input
                                        type="text"
                                        placeholder="Enter Unique ID"
                                        className="w-full px-4 py-2 border border-[#D0D5DD] rounded-md outline-none placeholder:text-sm placeholder:text-[#667085]"
                                        value={uniqueId}
                                        onChange={(e) => setUniqueId(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row justify-between gap-4">
                                <button className="w-[120px] px-6 py-[0.625rem] h-11 text-sm text-[#1D2939] font-semibold border border-lightGrey rounded-md hover:bg-[#F2F4F7]"
                                    onClick={() => setPopoveropen(false)}>
                                    Cancel
                                </button>
                                <button
                                    className={`w-[120px] px-6 py-[0.625rem] h-11 text-sm font-semibold border shadow-inner-button rounded-md transition-opacity ease-in-out duration-150 
                                                    bg-[#9012FF] border-[#800EE2] text-white 
                                                    ${isAddButtonDisabled ? 'opacity-35 cursor-not-allowed' : 'opacity-100'}`}
                                    disabled={isAddButtonDisabled}
                                    onClick={() => { handleAddUser(uniqueId); }}>
                                    Add
                                </button>
                            </div>

                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <div className="flex flex-col">
                <div className="border border-[#EAECF0] rounded-xl">
                    <table className="w-full bg-white rounded-xl">
                        <thead>
                            <tr>
                                <th className="w-1/4 text-left px-8 py-4 pl-8 rounded-tl-xl flex flex-row ">
                                    <span className="text-[#667085] font-medium text-sm">Name</span>
                                    <Image src="/icons/expandall.svg" width={28} height={18} alt="Expand all icon" />
                                </th>
                                <th className=" w-[22%] text-center px-8 py-4 text-[#667085] font-medium text-sm">
                                    <div className="flex flex-row justify-center gap-1">
                                        <p>Enrollment Type</p>
                                        <Image src='/icons/unfold-more-round.svg' alt="" width={16} height={16} />
                                    </div>
                                </th>
                                <th className=" w-[22%] text-center px-8 py-4 text-[#667085] font-medium text-sm cursor-pointer"
                                    onClick={() => handleSort('progress')}
                                >
                                    <div className="flex flex-row justify-center gap-1">
                                        <p>Progress</p>
                                        <Image src='/icons/unfold-more-round.svg' alt="" width={16} height={16} />
                                    </div>
                                </th>
                                <th className=" w-[22%] text-center px-8 py-4 text-[#667085] font-medium text-sm cursor-pointer"
                                    onClick={() => handleSort('enrolledDate')}
                                >
                                    <div className="flex flex-row justify-center gap-1">
                                        <p>Enrollment Date</p>
                                        <Image src='/icons/unfold-more-round.svg' alt="" width={16} height={16} />
                                    </div>
                                </th>

                                <th className="w-[12%] text-center px-8 py-4 rounded-tr-xl text-[#667085] font-medium text-sm">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                currentItems.map((students, index) => (
                                    <tr key={index} className="border-t border-solid border-[#EAECF0]">
                                        <td className="py-2">
                                            <div className="flex flex-row ml-8 gap-2">
                                                <div className="flex items-center">
                                                    <div className="relative">
                                                        <Image className="rounded-full w-10 h-10" src={students.profilePic || '/images/DP_Lion.svg'} alt="DP" width={40} height={40} />
                                                        {students.isPremium && <Image className="absolute right-0 bottom-0" src='/icons/winnerBatch.svg' alt="Batch" width={18} height={18} />}
                                                    </div>
                                                </div>
                                                <div className="flex items-start justify-start flex-col">
                                                    <div className="font-semibold">{students.name || "phodu user"}</div>
                                                    <div className="flex justify-start items-start text-[13px] text-[#667085]">{students.displayUserId || "phodu id"}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4 text-center text-[#101828] text-sm">{students.enrollmentType.charAt(0).toUpperCase() + students.enrollmentType.slice(1).toLowerCase()}</td>
                                        <td className="px-8 py-4 text-center text-[#101828] text-sm">{students.studentProgress || 0}%</td>
                                        <td className="px-8 py-4 text-center text-[#101828] text-sm">{formatDateString(students.enrollmentDate)}</td>
                                        <td className="flex items-center justify-center px-8 py-4 text-[#101828] text-sm">
                                            <Popover placement="bottom-end"
                                                isOpen={popoveropen2 === index}
                                                onOpenChange={(open) => open ? handlePopoverOpen(index) : setPopoveropen2(null)}>
                                                <PopoverTrigger>
                                                    <button
                                                        className="w-[32px] h-[32px] rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]"

                                                    >
                                                        <button className="outline-none">
                                                            <Image
                                                                src="/icons/three-dots.svg"
                                                                width={20}
                                                                height={20}
                                                                alt="More Actions"
                                                            />
                                                        </button>
                                                    </button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-[10.438rem] py-1 px-0 bg-white border border-lightGrey rounded-md">
                                                    <button className="flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#F2F4F7] outline-none"
                                                        onClick={() => handleTabClick(`/admin/userdatabase/${students.name.toLowerCase().replace(/\s+/g, '-')}?uId=${students.userId}`)}>
                                                        <Image src='/icons/user-account.svg' alt="user profile" width={18} height={18} />
                                                        <p className="text-sm text-[#0C111D] font-normal">Go to Profile</p>
                                                    </button>
                                                    <button className=" flex flex-row items-center justify-start w-full py-[0.625rem] px-4 gap-2 hover:bg-[#FEE4E2] outline-none"
                                                        onClick={() => {
                                                            setIsRemoveOpen(true);
                                                            setPopoveropen2(null);
                                                            setUserToRemove(students.userId);
                                                        }}>
                                                        <Image src='/icons/delete.svg' alt="user profile" width={18} height={18} />
                                                        <p className="text-sm text-[#DE3024] font-normal">Remove</p>
                                                    </button>
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
                                                No users found for &quot;{searchTerm}&quot;
                                            </p>
                                        )}
                                        {!isTextSearch && (
                                            <p className="text-[#667085] text-sm">
                                                No users found
                                            </p>
                                        )}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
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
            {/* {isRemoveOpen && < Remove onClose={() => setIsRemoveOpen(false)} open={isRemoveOpen} />} */}
            <Modal isOpen={isRemoveOpen} onOpenChange={(isOpen) => !isOpen && setIsRemoveOpen(false)} hideCloseButton >
                <ModalContent>
                    <>
                        <ModalHeader className="flex flex-row justify-between items-center gap-1">
                            <h3 className=" font-bold task-[#1D2939]">Remove user from this testseries?</h3>
                            <button
                                className="w-[32px] h-[32px] rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-[#F2F4F7]"
                                onClick={() => setIsRemoveOpen(false)}
                            >
                                <Image
                                    src="/icons/cancel.svg"
                                    alt="Cancel"
                                    width={20}
                                    height={20}
                                />
                            </button>
                        </ModalHeader>
                        <ModalBody >
                            <p className="pb-2 text-sm font-normal text-[#667085]"> Are you sure you want to remove this user from the testseries? This action cannot be undone.</p>
                        </ModalBody>
                        <ModalFooter className="border-t border-lightGrey">
                            <Button
                                className="py-[0.625rem] px-6 border border-solid border-[#EAECF0] bg-white font-semibold text-sm text-[#1D2939] rounded-md hover:bg-[#F2F4F7]"
                                onClick={() => setIsRemoveOpen(false)}
                            >Cancel
                            </Button>
                            <Button onClick={() => handleRemoveUser(userToRemove)} className="py-[0.625rem] px-6 text-white shadow-inner-button bg-[#BB241A] border border-[#DE3024] hover:bg-[#B0201A] font-semibold rounded-md">Remove</Button>
                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal >
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

export default StudentsPurchasedTestseries;

